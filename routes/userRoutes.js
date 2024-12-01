const express = require('express');
const userController = require('../controllers/userController');
const { validateUser, validateLogin, validateUserId } = require('../validation/userValidation');

const router = express.Router();

// Rotas abertas apenas para administradores

// Rotas abertas para os usuários
router.post('/register', validateUser, userController.registerUser);
router.get('/:id', validateUserId, userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
