import express from 'express';
import { 
    signUp, 
    signIn, 
    updateUser, 
    deleteUser, 
    getUserProfile,
    addBankAccount,
    getBankAccounts
} from '../controllers/user-controller.js';

const router = express.Router();

// Auth routes
router.post('/signup', signUp);
router.post('/signin', signIn);

// User profile routes
router.get('/profile/:id', getUserProfile);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);

// Bank Account routes
router.post('/:userId/account', addBankAccount);  // Add a bank account for a user
router.get('/:userId/accounts', getBankAccounts);

export default router;
