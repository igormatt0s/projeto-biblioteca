const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/loans', loanController.createLoan);
router.get('/loans', loanController.getLoans);
router.get('/loans/:id', loanController.getLoanById);
router.put('/loans/:id', loanController.updateLoanStatus);
router.delete('/loans/:id', loanController.deleteLoan);

module.exports = router;
