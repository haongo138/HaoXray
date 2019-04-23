const db = require('../db');		

let products = db.get('products').value();

module.exports.index = (req, res, next) => {
  let sessionId = req.signedCookies.sessionId;
  let productsInCart = db.get('sessions')
                         .find({id: sessionId})
                         .get('cart')
                         .value();
  res.render('cart', {
    productsInCart: productsInCart
  });
}

module.exports.addToCart = (req, res, next) => {
    let productId = req.params.productId;
    let sessionId = req.signedCookies.sessionId;
    let chosenProduct = db.get('products')
                          .find({id : productId})
                          .value();
    let cart = db.get('sessions')
                 .find({id : sessionId})
                 .get('cart');           

// check whether a sessionId existed    
    if(!sessionId) {
      res.redirect('/products');
      return;
    }
// whether chosenProduct existed or not..
    let alreadyExisted = cart.value().filter(product => product.id === productId);
    
    if(alreadyExisted.length <= 0) {
      cart.push(chosenProduct)
          .write();
    // set product quantity     
      cart.find({id : productId})
          .set('quantity', 1)
          .write();
      res.redirect('/products');
      return;
    }

    // in case chosen product've existed in Cart
    else {
      productQuantity = cart.find({id : productId})
                            .value()
                            .quantity;
      // update product quantity                      
      cart.find({id : productId})
          .assign({quantity: productQuantity + 1})
          .write();
      res.redirect('/products');
    }
}

module.exports.removeFromCart = (req, res, next) => {
  let productId = req.params.productId;
  let sessionId = req.signedCookies.sessionId;
  let cart = db.get('sessions')
               .find({id : sessionId})
               .get('cart');
  
  let productQuantity = cart.find({id : productId})
                            .value()
                            .quantity;
 
  // decrease or remove a product base on productQuantity
  if(productQuantity>1) {
    cart.find({id : productId})
        .assign({quantity: productQuantity - 1})
        .write();
  }
  else {
    cart.remove({id : productId}).write();
  }
  
  next();
}