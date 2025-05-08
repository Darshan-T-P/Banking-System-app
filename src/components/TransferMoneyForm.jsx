import React, { useState } from 'react';

const TransferMoneyForm = ({ accountId, onTransferCompleted }) => {
  const [amount, setAmount] = useState('');
  const [receiverAccountId, setReceiverAccountId] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form fields
    if (!amount || !receiverAccountId || parseFloat(amount) <= 0) {
      setError('Please provide valid data for all fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Call the backend API to process the transaction
      const response = await fetch('/api/transactions/transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderAccountId: accountId,
          receiverAccountId,
          amount: parseFloat(amount),
          description,
        }),
      });

      const data = await response.json();

      if (data.success) {
        onTransferCompleted(data.transaction);
        setAmount('');
        setReceiverAccountId('');
        setDescription('');
        setError(null);
      } else {
        setError(data.message || 'Transaction failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="transfer-form">
      <h3>Transfer Money</h3>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="receiverAccountId">Receiver Account ID</label>
          <input
            type="text"
            id="receiverAccountId"
            value={receiverAccountId}
            onChange={(e) => setReceiverAccountId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description (optional)</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Processing...' : 'Transfer'}
        </button>
      </form>
    </div>
  );
};

export default TransferMoneyForm;
