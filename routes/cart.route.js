const router = require('express').Router();
const controller = require('../controllers/cart.controller');

router.get('/', controller.index);
router.get('/add/:productId', controller.addToCart);
router.get('/remove/:productId', controller.removeFromCart, controller.index);

module.exports = router;