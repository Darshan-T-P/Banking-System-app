// BankAccountLink.js (Frontend - React Component)

import React, { useState, useEffect } from 'react';
import { PlaidLink } from 'react-plaid-link';
import axios from 'axios';

const BankAccountLink = () => {
  const [linkToken, setLinkToken] = useState(null);  // Initialize state for link token

  // Fetch the link token from the backend when the component is mounted
  useEffect(() => {
    const fetchLinkToken = async () => {
      try {
        const response = await axios.post('http://localhost:3001/api/create_link_token');
        setLinkToken(response.data.link_token);  // Set link token when response is received
      } catch (error) {
        console.error('Error fetching link token:', error);
      }
    };

    fetchLinkToken();
  }, []);

  // This function will be called once the user successfully links their bank account
  const onSuccess = async (public_token, metadata) => {
    console.log('Public Token:', public_token);
    console.log('Metadata:', metadata);

    try {
      // Send the public token to the backend to exchange it for an access token
      const response = await axios.post('http://localhost:3001/api/exchange_public_token', {
        public_token,
      });
      
      console.log('Access Token:', response.data.access_token);
      // You can now use the access token to retrieve account info, transactions, etc.
    } catch (error) {
      console.error('Error exchanging public token:', error);
    }
  };

  // If the link token is not available, display a loading state
  if (!linkToken) {
    return <div>Loading Plaid Link...</div>;
  }

  return (
    <div>
      <h2>Link Your Bank Account</h2>
      <PlaidLink
        token={linkToken}  // Only pass the link token once it's available
        onSuccess={onSuccess}
        onExit={(error, metadata) => {
          if (error) {
            console.error('Error linking bank account:', error);
          } else {
            console.log('Exit metadata:', metadata);
          }
        }}
      >
        Link Bank Account
      </PlaidLink>
    </div>
  );
};

export default BankAccountLink;
