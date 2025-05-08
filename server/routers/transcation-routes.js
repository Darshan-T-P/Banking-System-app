import express from 'express';
import { createTransaction, getTransactions,transferMoney } from '../controllers/user-controller.js';

const router = express.Router();

// Route to create a transaction
router.post('/create', createTransaction);

// Route to get transaction history of an account
router.get('/:accountId/history', getTransactions);

router.get('/transferMoney',transferMoney);

export default router;
