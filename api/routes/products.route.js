const router = require('express').Router();
const controller = require('../controllers/products.controller');

// GET
router.get('/', controller.index);

// POST
router.post('/add-product', controller.addProduct);

// DELETE
router.delete('/delete', controller.deleleAProduct);
module.exports = router;