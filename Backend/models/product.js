


const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  size: String,
  image: String,
  description: String,
  tags: [String]
});
module.exports = mongoose.model('Product', productSchema);