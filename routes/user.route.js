const router = require('express').Router();
const multer = require('multer');

const controller = require('../controllers/user.controller');
const validate = require('../validate/user.validate');
const authMiddleware = require('../middlewares/auth.middleware');

const upload = multer({ dest: './public/uploads/' });

// GET
router.get('/', authMiddleware.requireAuth, controller.index);

router.get('/search', authMiddleware.requireAuth, controller.search);

router.get('/logout', controller.logout);

router.get('/register', controller.register);

router.get('/:id', authMiddleware.requireAuth, controller.getUserInfo);

// POST
router.post('/register',
    upload.single('profileAvatar'),
    validate.postRegister,
    controller.postRegister
);

module.exports = router;
