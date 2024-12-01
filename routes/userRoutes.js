const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { authenticate } = require('../middlewares/authMiddleware');
const { validateUser, validateLogin, validateUserId } = require('../validation/userValidation');

const router = express.Router();

// Rotas abertas apenas para administradores

router.post('/register', validateUser, userController.registerUser);
router.post('/login', validateLogin, authController.login);
router.get('/:id', validateUserId, authenticate, userController.getUserById);
router.put('/:id', validateUserId, validateUser, authenticate, userController.updateUser);
router.delete('/:id', validateUserId, authenticate, userController.deleteUser);

module.exports = router;
