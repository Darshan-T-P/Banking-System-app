import express from 'express';
import { 
    signUp, 
    signIn, 
    updateUser, 
    deleteUser, 
    getUserProfile 
} from '../controllers/user-controller.js';

const router = express.Router();

// Auth routes
router.post('/signup', signUp);
router.post('/signin', signIn);

// User profile routes
router.get('/profile/:id', getUserProfile);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);

export default router;
