const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Read products.js as a string and extract the array
const productsFile = path.join(__dirname, '../Frontend/src/data/products.js');
const fileContent = fs.readFileSync(productsFile, 'utf-8');
const match = fileContent.match(/export const products = (\[.*\]);/s);
if (!match) {
  console.error('Could not find products array in products.js');
  process.exit(1);
}
const products = require('../Frontend/src/data/products.js');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  size: String,
  image: String,
  description: String,
  tags: [String]
});
const Product = mongoose.model('Product', productSchema);

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log('Products seeded!');
  await mongoose.disconnect();
}

seed(); 