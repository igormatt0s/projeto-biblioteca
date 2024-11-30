const bookModel = require('../models/bookModel');

exports.getAllBooks = () => bookModel.getAllBooks();

exports.getBookById = (id) => bookModel.getBookById(id);

exports.createBook = (book) => bookModel.createBook(book);

exports.updateBook = (id, updatedBook) => bookModel.updateBook(id, updatedBook);

exports.deleteBook = (id) => bookModel.deleteBook(id);

// Função para buscar livros com filtros de autor e/ou ano
exports.searchBooks = (author, year) => bookModel.searchBooks(author, year);

// Função para ordenar livros por campo e ordem
exports.getSortedBooks = (field, order) => bookModel.getSortedBooks(field, order);
