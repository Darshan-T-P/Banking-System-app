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

// Plaid-related Routes
// Route to create the link token
app.post('/api/create_link_token', async (req, res) => {
    try {
      const linkTokenResponse = await plaidClient.createLinkToken({
        user: {
          client_user_id: 'unique_user_id', // Unique user ID from your app
        },
        client_name: 'Plaid React Integration',
        products: ['auth'], // You can also add other products like 'transactions'
        country_codes: ['US'],
        language: 'en',
      });
      
      res.json({ link_token: linkTokenResponse.link_token });
    } catch (error) {
      console.error('Error creating link token', error);
      res.status(500).send('Error generating link token');
    }
  });
  
  // Route to exchange public token for access token
  app.post('/api/exchange_public_token', async (req, res) => {
    const { public_token } = req.body;
  
    try {
      const exchangeResponse = await plaidClient.exchangePublicToken(public_token);
      const accessToken = exchangeResponse.access_token;
      const itemId = exchangeResponse.item_id;
  
      // Store access token securely (not in the database directly) for future use
      res.json({ access_token: accessToken, item_id: itemId });
    } catch (error) {
      console.error('Error exchanging public token', error);
      res.status(500).send('Error exchanging public token');
    }
  });
export default router;
