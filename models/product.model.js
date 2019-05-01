const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    product_name: String,
    product_image: String,
    description: String,
    quantity: Number
});

const Product = new mongoose.model('Product', productSchema, 'products');

module.exports = Product;