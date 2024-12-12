const loanService = require('../services/loanService');
const { paginate } = require('../utils/paginationUtils');

exports.createLoan = async (req, res) => {
    try {
        const newLoan = await loanService.registerLoan(req.body);
        res.status(201).json(newLoan);
    } catch (err) {
        next(err);
    }
};

exports.getLoans = async (req, res) => {
    try {
        const { limite, pagina } = req.query;

        const loans = await loanService.getAllLoans();
        const result = paginate(loans, limite, pagina);

        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

exports.getLoanById = async (req, res) => {
    try {
        const loan = await loanService.getLoanById(parseInt(req.params.id, 10));
        if (!loan) {
            return res.status(404).json({ message: 'Empréstimo não encontrado.' });
        }
        res.status(200).json(loan);
    } catch (err) {
        next(err);
    }
};

exports.updateLoanStatus = async (req, res) => {
    try {
        const updatedLoan = await loanService.updateLoan(parseInt(req.params.id, 10), req.body);
        if (!updatedLoan) {
            return res.status(404).json({ message: 'Empréstimo não encontrado.' });
        }
        res.status(200).json({ message: 'Empréstimo atualizado com sucesso.', loan: updatedLoan });
    } catch (err) {
        next(err);
    }
};

exports.deleteLoan = async (req, res) => {
    try {
        const deletedLoan = await loanService.deleteLoan(parseInt(req.params.id, 10));
        if (!deletedLoan) {
            return res.status(404).json({ message: 'Empréstimo não encontrado.' });
        }
        res.status(200).json({ message: 'Empréstimo excluído com sucesso.', loan: deletedLoan });
    } catch (err) {
        next(err);
    }
};