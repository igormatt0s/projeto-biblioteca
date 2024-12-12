const { readFile, writeFile } = require('../utils/fileUtils');
const fileName = 'loans';

exports.registerLoan = async (loan) => {
    const loans = await readFile(fileName);
    const id = loans.length ? loans[loans.length - 1].id + 1 : 1;
    const newLoan = { id, ...loan };
    loans.push(newLoan);
    await writeFile(fileName, loans);
    return newLoan;
};

exports.getAllLoans = async () => {
    return await readFile(fileName);
};

exports.getLoanById = async (id) => {
    const loans = await readFile(fileName);
    return loans.find(loan => loan.id === id);
};

exports.updateLoan = async (id, updatedLoan) => {
    const loans = await readFile(fileName);
    const index = loans.findIndex(loan => loan.id === id);

    if (index === -1) {
        return null;
    }

    loans[index] = { ...loans[index], ...updatedLoan };
    await writeFile(fileName, loans);
    return loans[index];
};

exports.deleteLoan = async (id) => {
    const loans = await readFile(fileName);
    const index = loans.findIndex(loan => loan.id === id);

    if (index === -1) {
        return null;
    }

    const deletedLoan = loans.splice(index, 1)[0];
    await writeFile(fileName, loans);
    return deletedLoan;
};
