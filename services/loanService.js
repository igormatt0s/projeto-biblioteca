const loanModel = require('../models/loanModel');

exports.registerLoan = async (loan) => await loanModel.registerLoan(loan);

exports.getAllLoans = async () => await loanModel.getAllLoans();

exports.getLoanById = async (id) => await loanModel.getLoanById(id);

exports.updateLoan = async (id, updatedLoan) => await loanModel.updateLoan(id, updatedLoan);

exports.deleteLoan = async (id) => await loanModel.deleteLoan(id);
