import React, { useState } from 'react';
import './BankAccountModal.css'; // Add CSS below

const BankAccountModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    accountType: 'savings',
    bankName: '',
    balance: 0,
    accountNumber: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add Bank Account</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <label>
            Bank Name:
            <input type="text" name="bankName" value={formData.bankName} onChange={handleChange} required />
          </label>
          <label>
            Account Number:
            <input type="text" name="accountNumber" value={formData.accountNumber} onChange={handleChange} required />
          </label>
          <label>
            Account Type:
            <select name="accountType" value={formData.accountType} onChange={handleChange}>
              <option value="savings">Savings</option>
              <option value="checking">Checking</option>
            </select>
          </label>
          <label>
            Balance:
            <input type="number" name="balance" value={formData.balance} onChange={handleChange} required />
          </label>
          <div className="modal-actions">
            <button type="submit">Add Account</button>
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BankAccountModal;
