const Session = require('../models/session.model');
const Product = require('../models/product.model');

module.exports.index = async (req, res, next) => {
  let sessionId = req.signedCookies.sessionId;
  let currentSession = await Session.findOne({ sessionId: sessionId});
  let productsInCart = currentSession.cart;
  res.render('cart', {
    productsInCart: productsInCart
  });
}

module.exports.addToCart = async (req, res, next) => {
    productId = req.params.productId;
    currentSession = await Session.findOne({ sessionId: req.signedCookies.sessionId});
    chosenProduct = await Product.findOne({ _id: productId});
    
    if(currentSession.cart.some(product => product._id.toString() === productId)) {
      currentSession.cart.find(e => e._id.toString() === productId).quantity += 1;
      currentSession.cart._markModified();
      currentSession.save();
    }
    else {
      chosenProduct.quantity = 1;
      currentSession.cart.push(chosenProduct);
      currentSession.save();
    }
    res.redirect('/products/index');
}

module.exports.removeFromCart = async (req, res, next) => {
  let productId = req.params.productId;
  let sessionId = req.signedCookies.sessionId;
  currentSession = await Session.findOne({ sessionId: req.signedCookies.sessionId});
  let chosenProduct = currentSession.cart.find(e => e._id.toString() === productId);
  if(currentSession.cart) {
    if (chosenProduct.quantity <= 1) {
      currentSession.cart.remove(chosenProduct);
    }
    else {
      chosenProduct.quantity -= 1;
    }
    currentSession.cart._markModified();
    currentSession.save();
  }
  res.redirect('/cart');
}