const express = require('express');

const router = express.Router();
const controller = require('../controllers/user.controller');

// GET
router.get('/', controller.index);
router.get('/search', controller.search);
router.get('/register', controller.register);
router.get('/:id', controller.getUserInfo);
// POST
router.post('/register', controller.postRegister);

module.exports = router;
