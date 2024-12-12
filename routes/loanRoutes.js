const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');
const { authenticate } = require('../middlewares/authMiddleware');
const { requireAdmin } = require('../middlewares/adminMiddleware');
const { validateLoan, validateLoanId } = require('../validation/loanValidation');

router.get('/', authenticate, loanController.getLoans);
router.get('/:id', validateLoanId, authenticate, loanController.getLoanById);
router.post('/', validateLoan, authenticate, loanController.createLoan);
router.put('/:id', validateLoanId, validateLoan, authenticate, requireAdmin, loanController.updateLoanStatus);
router.delete('/:id', validateLoanId, authenticate, requireAdmin, loanController.deleteLoan);

module.exports = router;
