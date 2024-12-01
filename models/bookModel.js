const { readFile, writeFile } = require('../utils/fileUtils');
const fileName = 'books';

exports.getAllBooks = async () => {
    return await readFile(fileName);
};

exports.getBookById = async (id) => {
    const books = await readFile(fileName);
    return books.find(book => book.id === id);
};

exports.createBook = async (book) => {
    const books = await readFile(fileName);
    const id = books.length ? books[books.length - 1].id + 1 : 1;
    const newBook = { id, ...book };
    books.push(newBook);
    await writeFile(fileName, books);
    return newBook;
};

exports.updateBook = async (id, updatedBook) => {
    const books = await readFile(fileName);
    const index = books.findIndex(book => book.id === id);

    if (index === -1) {
        return null;
    }

    books[index] = { ...books[index], ...updatedBook };
    await writeFile(fileName, books);
    return books[index];
};

exports.deleteBook = async (id) => {
    const books = await readFile(fileName);
    const index = books.findIndex(book => book.id === id);

    if (index === -1) {
        return null;
    }

    const deletedBook = books.splice(index, 1)[0];
    await writeFile(fileName, books);
    return deletedBook;
};

exports.searchBooks = async (author, year) => {
    const books = await readFile(fileName);
    return books.filter(book => {
        if (author && book.author !== author) return false;
        if (year && book.year !== year) return false;
        return true;
    });
};

exports.getSortedBooks = async (field, order) => {
    const books = await readFile(fileName);
    const sortedBooks = [...books];

    sortedBooks.sort((a, b) => {
        if (a[field] < b[field]) return order === 'asc' ? -1 : 1;
        if (a[field] > b[field]) return order === 'asc' ? 1 : -1;
        return 0;
    });

    return sortedBooks;
};
