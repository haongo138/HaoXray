const router = require('express').Router();
const controller = require('../controllers/products.controller');

//GET
router.get('/', controller.index);
router.get('/search', controller.search);
router.get('/new', controller.addNewProduct);
module.exports = router;