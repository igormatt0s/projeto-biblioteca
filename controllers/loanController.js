const { readJSON, writeJSON } = require('../utils/jsonHandler');
const { v4: uuidv4 } = require('uuid');

const fileName = 'loans.json';

exports.createLoan = async (req, res) => {
    try {
        const { bookId, userId, loanDate, returnDate } = req.body;

        const loans = await readJSON(fileName);

        const newLoan = {
            id: uuidv4(),
            bookId,
            userId,
            loanDate,
            returnDate,
            status: 'loaned',
        };

        loans.push(newLoan);
        await writeJSON(fileName, loans);

        res.status(201).json(newLoan);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar empréstimo!' });
    }
};

// Listar empréstimos
exports.getLoans = async (req, res) => {
    try {
        const { page = 1, limit = 5 } = req.query;
        const loans = await readJSON(fileName);

        const allowedLimits = [5, 10, 30];
        const perPage = allowedLimits.includes(parseInt(limit)) ? parseInt(limit) : 5;

        const startIndex = (page - 1) * perPage;
        const paginatedLoans = loans.slice(startIndex, startIndex + perPage);

        res.status(200).json(paginatedLoans);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar empréstimos.' });
    }
};

// Buscar empréstimo por ID
exports.getLoanById = async (req, res) => {
    try {
        const { id } = req.params;
        const loans = await readJSON(fileName);
        const loan = loans.find((l) => l.id === id);

        if (!loan) {
            return res.status(404).json({ message: 'Empréstimo não encontrado.' });
        }

        res.status(200).json(loan);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar empréstimo.' });
    }
};

// Atualização do status do empréstimo
exports.updateLoanStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const loans = await readJSON(fileName);
        const loanIndex = loans.findIndex((l) => l.id === id);

        if (loanIndex === -1) {
            return res.status(404).json({ message: 'Empréstimo não encontrado.' });
        }

        loans[loanIndex].status = status;
        await writeJSON(fileName, loans);

        res.status(200).json(loans[loanIndex]);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar empréstimo.' });
    }
};

exports.deleteLoan = async (req, res) => {
    try {
        const { id } = req.params;
        const loans = await readJSON(fileName);
        const updatedLoans = loans.filter((l) => l.id !== id);

        if (loans.length === updatedLoans.length) {
            return res.status(404).json({ message: 'Empréstimo não encontrado.' });
        }

        await writeJSON(fileName, updatedLoans);

        res.status(200).json({ message: 'Empréstimo excluído com sucesso.' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir empréstimo.' });
    }
};
