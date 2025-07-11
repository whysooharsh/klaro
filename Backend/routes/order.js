const express = require('express');
const Order = require('../models/order');
const router = express.Router();

router.post('/place', async (req, res) => {
  const { userId, items, total } = req.body;
  const order = new Order({ user: userId, items, total });
  await order.save();
  res.json({ success: true, order });
});

router.get('/user/:userId', async (req, res) => {
  const orders = await Order.find({ user: req.params.userId }).populate('items.product');
  res.json(orders);
});

// Get all orders (admin)
router.get('/', async (req, res) => {
  const orders = await Order.find().populate('user').populate('items.product');
  res.json(orders);
});

// Update order status (admin)
router.put('/:id', async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  res.json(order);
});

module.exports = router;