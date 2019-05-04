const Product = require('../../models/product.model');

module.exports.index = async function(req, res) {
  const products = await Product.find();
  res.json(products);
};

module.exports.addProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.json(product);
};

module.exports.deleleAProduct = async (req, res, next) => {
    const productID = req.query.id;
    const deletedProduct = await Product.remove({ _id : productID });
    res.json(deletedProduct);
};
