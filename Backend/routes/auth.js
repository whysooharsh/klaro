const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({ name, email, phone, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Create JWT
    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone, // <-- Add this line
        isAdmin: user.isAdmin
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Wishlist APIs
router.post('/wishlist/add', async (req, res) => {
  const { userId, productId } = req.body;
  try {
    await User.findByIdAndUpdate(userId, { $addToSet: { wishlist: productId } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/wishlist/remove', async (req, res) => {
  const { userId, productId } = req.body;
  try {
    await User.findByIdAndUpdate(userId, { $pull: { wishlist: productId } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/wishlist/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('wishlist');
    res.json({ wishlist: user.wishlist });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Cart APIs
router.post('/cart/add', async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    const user = await User.findById(userId);
    const existing = user.cart.find(item => item.product.toString() === productId);
    if (existing) {
      existing.quantity += quantity || 1;
    } else {
      user.cart.push({ product: productId, quantity: quantity || 1 });
    }
    await user.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/cart/update', async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    const user = await User.findById(userId);
    const item = user.cart.find(item => item.product.toString() === productId);
    if (item) {
      item.quantity = quantity;
      await user.save();
      res.json({ success: true });
    } else {
      res.status(404).json({ message: 'Item not found in cart' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/cart/remove', async (req, res) => {
  const { userId, productId } = req.body;
  try {
    await User.findByIdAndUpdate(userId, { $pull: { cart: { product: productId } } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/cart/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('cart.product');
    res.json({ cart: user.cart });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
