const API_URL = 'http://localhost:5000/api/users';

export const createLinkToken = async (user) => {
  try {
    const res = await fetch(`${API_URL}/createLinkToken`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user }),
    });

    if (!res.ok) throw new Error('Failed to create link token');

    const data = await res.json();
    return data; // { linkToken: "..." }
  } catch (error) {
    console.error('Error creating link token:', error);
    return null;
  }
};

export const exchangePublicToken = async ({ publicToken, user }) => {
  try {
    const res = await fetch(`${API_URL}/exchange-public-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ publicToken, user }),
    });

    if (!res.ok) throw new Error('Failed to exchange public token');

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error exchanging public token:', error);
    return null;
  }
};
