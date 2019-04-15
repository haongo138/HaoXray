const db = require('../db');

let products = db.get('products').value();

// GET
module.exports.index = (req, res) => {
	let page = parseInt(req.query.page) || 1;
  let elemPerPage = 3; 
  let totalPages = products.length / elemPerPage;
  let start = (page - 1) * elemPerPage;
  let end = (page - 1) * elemPerPage + elemPerPage;
  // Previous page value
  if(page > 1) {
    prevPage = page - 1;
  } else {
    prevPage = 1;
  }
  // Next page value
  if(page < totalPages) {
    nextPage = page + 1;
  } else {
    nextPage = totalPages;
  }

  res.render('products/index', {
		products: products.slice(start, end),
    totalPages: totalPages,
    prevPage: prevPage,
    nextPage: nextPage
	});
};

module.exports.search = (req, res) => {
  let q = req.query.q;
  matchedProducts = products.filter((product) => {
    return product.product_name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  res.render('products/index', {
    	products: matchedProducts
  });
};

module.exports.addNewProduct = (req, res) => {
  res.render('products/new');
};