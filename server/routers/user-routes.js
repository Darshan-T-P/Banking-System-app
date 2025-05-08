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

// Bank Account routes
router.post('/:id/account', addBankAccount);  // Add a bank account for a user
router.get('/:id/accounts', getBankAccounts);

// User profile routes
router.get('/:id', getUserProfile);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);



export default router;
