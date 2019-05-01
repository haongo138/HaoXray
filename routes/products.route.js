const router = require('express').Router();
const controller = require('../controllers/products.controller');

//GET
router.get('/', controller.paginate);
router.get('/search', controller.search);
router.get('/add-product', controller.addProduct);
router.get('/generate-fake-data', controller.generateProductData);
router.get('/:page', controller.paginate);


module.exports = router;