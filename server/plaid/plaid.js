// import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';
// import dotenv from 'dotenv';

// // This loads the .env file
// dotenv.config();

// if (!process.env.PLAID_CLIENT_ID || !process.env.PLAID_SECRET) {
//   throw new Error('Missing Plaid environment variables.');
// }

// const env = process.env.PLAID_ENV || 'sandbox';  // Defaults to 'sandbox' if not provided

// // Ensure the environment is valid
// if (!PlaidEnvironments[env]) {
//   throw new Error(`Invalid Plaid environment: ${env}`);
// }

// const configuration = new Configuration({
//   basePath: PlaidEnvironments[env],
//   baseOptions: {
//     headers: {
//       'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
//       'PLAID-SECRET': process.env.PLAID_SECRET,
//     },
//   },
// });

// // export const plaidClient = new PlaidApi(configuration);
