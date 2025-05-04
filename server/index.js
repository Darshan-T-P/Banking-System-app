import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config(); // Loads environment variables from .env file
const app = express();
const PORT = process.env.PORT || 3001;



const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox, // or PlaidEnvironments.production
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_KEY,
      'PLAID-SECRET': process.env.PLAID_SECERET,
    },
  },
});

const plaidClient = new PlaidApi(configuration);

// Middleware
app.use(bodyParser.json());

app.post('/api/create_link_token', async (req, res) => {
  const { user, client_name, products, country_codes, language } = req.body;

  if (!user || !user.client_user_id || !client_name) {
    return res.status(400).json({ error: 'Missing userId or clientName' });
  }

  try {
    const linkTokenResponse = await plaidClient.linkTokenCreate({
      user: {
        client_user_id: user.client_user_id,
      },
      client_name: client_name,
      products: products || ['auth'], // default to 'auth' if no products provided
      country_codes: country_codes || ['US'], // default to 'US' if no country_codes provided
      language: language || 'en', // default to 'en' if no language provided
    });

    res.json({ link_token: linkTokenResponse.data.link_token });
  } catch (error) {
    console.error('Error creating link token:', error);
    res.status(500).json({ error: 'Error creating link token' });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
