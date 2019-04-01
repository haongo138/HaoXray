const router = require('express').Router();
const controller = require('../controllers/user.controller');
const validate = require('../validate/user.validate');
const authMiddleware = require('../middlewares/auth.middleware');

// GET
router.get('/', authMiddleware.requireAuth, controller.index);
router.get('/search', authMiddleware.requireAuth, controller.search);
router.get('/register', controller.register);
router.get('/:id', authMiddleware.requireAuth, controller.getUserInfo);

// POST
router.post('/register', validate.postRegister, controller.postRegister);

module.exports = router;
