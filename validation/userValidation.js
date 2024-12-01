const { body, param, validationResult } = require('express-validator');

// Validação de dados de cadastro de usuário
const validateUser = [
    body('name')
        .notEmpty().withMessage('O nome é obrigatório.')
        .isLength({ min: 3 }).withMessage('O nome deve ter pelo menos 3 caracteres.'),
    body('email')
        .notEmpty().withMessage('O email é obrigatório.')
        .isEmail().withMessage('O email deve ser válido.'),
    body('username')
        .notEmpty().withMessage('O nome de usuário é obrigatório.')
        .isLength({ min: 3 }).withMessage('O nome de usuário deve ter pelo menos 3 caracteres.'),
    body('password')
        .notEmpty().withMessage('A senha é obrigatória.')
        .isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Validação de login
const validateLogin = [
    body('username')
        .notEmpty().withMessage('O nome de usuário é obrigatório.'),
    body('password')
        .notEmpty().withMessage('A senha é obrigatória.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Validar o ID de um usuário
const validateUserId = [
    param('id')
        .isInt({ min: 1 }).withMessage('O ID do usuário deve ser um número inteiro positivo.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validateUser,
    validateLogin,
    validateUserId
};
