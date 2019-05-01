const faker = require('faker');
const Product = require('../models/product.model');

module.exports.index = async function(req, res) {
  const products = await Product.find();
  res.render('products/index', {
    products: products
  });
}

module.exports.search = async function(req, res) {
  let q = req.query.q;
  const products = await Product.find();
  matchedProducts = products.filter((product) => {
    return product.product_name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  res.render('products/index', {
    	products: matchedProducts
  });
};

module.exports.paginate = (req, res, next) => {
  const elementsPerPage = 6;
  let page = req.params.page || 1;
  Product
        .find({})
        .skip((elementsPerPage * page) - elementsPerPage)
        .limit(elementsPerPage)
        .exec((err, products) => {
          Product
                .count()
                .exec((err, count) => {
                  if(err) return next(err);
                  res.render('products/index', {
                    products: products,
                    current: page,
                    pages: Math.ceil(count/elementsPerPage)
                  });
                })
        })
};

module.exports.addProduct = (req, res, next) => {
  res.render('products/add-product');
}

module.exports.generateProductData = (req, res, next) => {
  for (let i = 0; i < 50; i++) {
      let product = new Product();
      product.description = faker.lorem.sentences();
      product.product_name = faker.commerce.productName();
      product.product_image = faker.image.image();
      product.save(function(err) {
          if (err) throw err;
      })
  }
  res.redirect('/products');
}