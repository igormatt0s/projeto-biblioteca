const { json } = require('express');
const bookService = require('../services/bookService');
const { paginate } = require('../utils/paginationUtils');

exports.getAllBooks = async (req, res) => {
    try {
        const { limite, pagina } = req.query;

        const books = await bookService.getAllBooks();
        const result = paginate(books, limite, pagina);

        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

exports.getBookById = async (req, res) => {
    const book = await bookService.getBookById(parseInt(req.params.id, 10));

    if(!book){
        return res.status(404).json({ message: 'Livro não encontrado.' });
    }

    res.status(200).json(book);
}

exports.createBook = async (req, res) => {
    const newBook = await bookService.createBook(req.body);
    res.status(201).json(newBook);
}

exports.updateBook = async (req, res) => {
    const updatedBook = await bookService.updateBook(parseInt(req.params.id, 10), req.body);
    
    if (!updatedBook) {
        return res.status(404).json({ message: 'Livro não encontrado.' });
    }

    res.status(200).json(updatedBook);
};

exports.deleteBook = async (req, res) => {
    const deletedBook = await bookService.deleteBook(parseInt(req.params.id, 10));

    if(!deletedBook){
        return res.status(404).json({ message: 'Livro não encontrado.' });
    }

    res.status(200).json(deletedBook);
};

exports.searchBooks = async (req, res) => {
    const { author, year } = req.query;
    const results = await bookService.searchBooks(author, parseInt(year, 10));
    res.status(200).json(results);
};

exports.getSortedBooks = async (req, res) => {
    const { field, order = 'asc' } = req.query;
    const sortedBooks = await bookService.getSortedBooks(field, order);
    res.status(200).json(sortedBooks);
};