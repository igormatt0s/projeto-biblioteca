const bookService = require('../services/bookService');

exports.getAllBooks = (req, res) => {
    const books = bookService.getAllBooks();
    res.status(200).json(books);
}

exports.getBookById = (req, res) => {
    const book = bookService.getBookById(parseInt(req.params.id, 10));

    if(!book){
        return res.status(404).json({ message: 'Livro não encontrado.' });
    }

    res.status(200).json(book);
}

exports.createBook = (req, res) => {
    const newBook = bookService.createBook(req.body);
    res.status(201).json(newBook);
}

exports.updateBook = (req, res) => {
    const updatedBook = bookService.updateBook(parseInt(req.params.id, 10), req.body);
    
    if (!updatedBook) {
        return res.status(404).json({ message: 'Livro não encontrado.' });
    }

    res.status(200).json(updatedBook);
};

exports.deleteBook = (req, res) => {
    const deletedBook = bookService.deleteBook(parseInt(req.params.id, 10));

    if(!deletedBook){
        return res.status(404).json({ message: 'Livro não encontrado.' });
    }

    res.status(200).json(deletedBook);
};

exports.searchBooks = (req, res) => {
    const { author, year } = req.query;
    const results = bookService.searchBooks(author, parseInt(year, 10));
    res.status(200).json(results);
};

exports.getSortedBooks = (req, res) => {
    const { field, order = 'asc' } = req.query;
    const sortedBooks = bookService.getSortedBooks(field, order);
    res.status(200).json(sortedBooks);
};