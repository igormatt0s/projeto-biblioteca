const express = require('express');
const adminController = require('../controllers/adminController');

const router = express.Router();

// Rota para instalar o sistema e criar um usuário administrador
router.get('/', adminController.installAdmin);

module.exports = router;
