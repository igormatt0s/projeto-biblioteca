// Armazena a lista de livros
const books = [];
let id = 1;

exports.getAllBooks = () => books;

exports.getBookById = (id) => books.find(book => book.id === id);

exports.createBook = (book) => {
    const newBook = { id, ...book };
    books.push(newBook);
    id++;
    return newBook;
};

exports.updateBook = (id, updatedBook) => {
    const index = books.findIndex(book => book.id === id);

    if(index === -1){
        return null;
    }

    books[index] = { ...books[index], ...updatedBook };
    return books[index];
};

exports.deleteBook = (id) => {
    const index = books.findIndex(book => book.id === id);

    if(index === -1){
        return null;
    }

    return books.splice(index, 1)[0];
};

// Função para buscar livros com filtros
exports.searchBooks = (author, year) => {
    return books.filter(book => {
        if (author && book.author !== author) return false;
        if (year && book.year !== year) return false;
        return true;
    });
};

// Função para ordenar livros por campo e ordem
exports.getSortedBooks = (field, order) => {
    // Clona o array de livros para evitar mutação
    const sortedBooks = [...books];

    // Realiza a ordenação baseada no campo e na ordem
    sortedBooks.sort((a, b) => {
        if (a[field] < b[field]) return order === 'asc' ? -1 : 1;
        if (a[field] > b[field]) return order === 'asc' ? 1 : -1;
        return 0;
    });

    return sortedBooks;
};
