const router = require('express').Router();
const controller = require('../controllers/auth.controller');

// GET
router.get('/login', controller.login);

// POST
router.post('/login', controller.postLogin);

module.exports = router;