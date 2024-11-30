const express = require('express');
const bookController = require('../controllers/bookController');
const { validateBook, validateBookId, validateSearchParams, validateSortParams } = require('../validation/bookValidation');

const router = express.Router();

// Rota para buscar livros com filtros de autor e ano
router.get('/search', validateSearchParams, bookController.searchBooks);
// Rota para ordenação de livros por campo e ordem
router.get('/sorted', validateSortParams, bookController.getSortedBooks);

router.get('/', bookController.getAllBooks);
router.get('/:id', validateBookId, bookController.getBookById);
router.post('/', validateBook, bookController.createBook);
router.put('/:id', validateBookId, validateBook, bookController.updateBook);
router.delete('/:id', validateBookId, bookController.deleteBook);

module.exports = router;
