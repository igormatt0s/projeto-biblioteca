const { body, param, query, validationResult } = require('express-validator');

// Validação para o JSON do livro
const validateBook = [
    body('title')
        .notEmpty().withMessage('O título é obrigatório.')
        .isLength({ min: 3 }).withMessage('O título deve ter pelo menos 3 caracteres.'),
    body('author')
        .notEmpty().withMessage('O autor é obrigatório.')
        .isLength({ min: 3 }).withMessage('O nome do autor deve ter pelo menos 3 caracteres.'),
    body('year')
        .optional()
        .isInt({ min: 1000, max: 9999 }).withMessage('Ano deve ser um número válido.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Validação para o ID do livro
const validateBookId = [
    param('id')
        .isInt({ min: 1 }).withMessage('ID do livro deve ser um número inteiro positivo.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Middleware para validar se pelo menos um dos parâmetros 'author' ou 'year' foi informado na busca
const validateSearchParams = [
    query('author').optional().isString().withMessage('O autor deve ser uma string.'),
    query('year').optional().isInt({ min: 0 }).withMessage('O ano de publicação deve ser um número inteiro positivo.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Verifica se ao menos 'author' ou 'year' foram fornecidos
        const { author, year } = req.query;
        if (!author && !year) {
            return res.status(400).json({ message: 'É necessário fornecer ao menos um dos parâmetros: author ou year.' });
        }

        next();
    }
];

// Middleware para validar parâmetros de ordenação
const validateSortParams = [
    query('field')
        .isIn(['title', 'author', 'year'])
        .withMessage('O campo de ordenação deve ser "title", "author" ou "year".'),
    query('order')
        .optional()
        .isIn(['asc', 'desc'])
        .withMessage('A ordem de ordenação deve ser "asc" ou "desc".'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateBook, validateBookId, validateSearchParams, validateSortParams };
