
import React, { useCallback, useEffect, useState } from 'react';
import { Button } from './ui/button';  // Ensure this path is correct
import { usePlaidLink } from 'react-plaid-link';
import { useNavigate } from 'react-router-dom';  // React Router alternative


const PlaidLink = ({ user, variant }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState('');

  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(user);  // Call the API function
      setToken(data?.linkToken);
    };

    getLinkToken();
  }, [user]);

  const onSuccess = useCallback(async (public_token) => {
    await exchangePublicToken({
      publicToken: public_token,
      user,
    });

    navigate('/');
  }, [user, navigate]);

  const config = {
    token,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <>
      {variant === 'primary' ? (
        <Button onClick={() => open()} disabled={!ready} className="plaidlink-primary">
          Connect bank
        </Button>
      ) : variant === 'ghost' ? (
        <Button onClick={() => open()} className="plaidlink-ghost" variant="ghost">
          <img src="/icons/connect-bank.svg" alt="connect bank" width={24} height={24} />
          <p className="hidden text-[16px] font-semibold text-black-2 xl:block">Connect bank</p>
        </Button>
      ) : (
        <Button onClick={() => open()} className="plaidlink-default">
          <img src="/icons/connect-bank.svg" alt="connect bank" width={24} height={24} />
          <p className="text-[16px] font-semibold text-black-2">Connect bank</p>
        </Button>
      )}
    </>
  );
};

export default PlaidLink;
