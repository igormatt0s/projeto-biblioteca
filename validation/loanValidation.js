const { body, param, validationResult } = require('express-validator');
const userService = require('../services/userService');
const bookService = require('../services/bookService');

const validStatuses = ['loaned', 'cancelled', 'returned'];

// Validação de dados de cadastro de um empréstimo
const validateLoan = [
    body('bookId')
        .notEmpty().withMessage('O ID do livro é obrigatório.')
        .isInt({ min: 1 }).withMessage('O ID do livro deve ser um número inteiro positivo.')
        .custom(async (value) => {
            const bookExists = await bookService.getBookById(value);
            if (!bookExists) {
                throw new Error('O livro especificado não existe.');
            }
            return true;
        }),
    body('userId')
        .notEmpty().withMessage('O ID do usuário é obrigatório.')
        .isInt({ min: 1 }).withMessage('O ID do usuário deve ser um número inteiro positivo.')
        .custom(async (value) => {
            const userExists = await userService.getUserById(value);
            if (!userExists) {
                throw new Error('O usuário especificado não existe.');
            }
            return true;
        }),
    body('loanDate')
        .notEmpty().withMessage('A data do empréstimo é obrigatória.')
        .isISO8601().withMessage('A data do empréstimo deve estar no formato ISO8601 (YYYY-MM-DD).'),
    body('returnDate')
        .notEmpty().withMessage('A data de devolução é obrigatória.')
        .isISO8601().withMessage('A data de devolução deve estar no formato ISO8601 (YYYY-MM-DD).')
        .custom((value, { req }) => {
            if (new Date(value) <= new Date(req.body.loanDate)) {
                throw new Error('A data de devolução deve ser posterior à data do empréstimo.');
            }
            return true;
        }),
    body('status')
        .notEmpty().withMessage('O status do empréstimo é obrigatório.')
        .isString().withMessage('O status do empréstimo deve ser uma string.')
        .isIn(validStatuses).withMessage(`O status deve ser um dos seguintes: ${validStatuses.join(', ')}.`),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Validar o ID
const validateLoanId = [
    param('id')
        .isInt({ min: 1 }).withMessage('O ID do empréstimo deve ser um número inteiro positivo.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validateLoan,
    validateLoanId
};
