import React, { useState } from 'react';
import './BankAccountModal.css'; // Import CSS for styling

const BankAccountModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    accountType: 'savings',
    bankName: '',
    balance: 0, // Set the balance to 0 as default
    accountNumber: ''
  });

  // Handle form field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add some validation (optional)
    if (formData.balance < 0) {
      alert("Balance can't be negative.");
      return;
    }

    if (!formData.bankName || !formData.accountNumber) {
      alert("Please fill out all fields.");
      return;
    }

    // Pass the form data back to the parent component
    onSubmit(formData);
    onClose(); // Close modal after submission
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add Bank Account</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <label>
            Bank Name:
            <input 
              type="text" 
              name="bankName" 
              value={formData.bankName} 
              onChange={handleChange} 
              required 
              aria-label="Bank Name"
            />
          </label>
          <label>
            Account Number:
            <input 
              type="text" 
              name="accountNumber" 
              value={formData.accountNumber} 
              onChange={handleChange} 
              required 
              aria-label="Account Number"
            />
          </label>
          <label>
            Account Type:
            <select 
              name="accountType" 
              value={formData.accountType} 
              onChange={handleChange}
              aria-label="Account Type"
            >
              <option value="savings">Savings</option>
              <option value="checking">Checking</option>
            </select>
          </label>
          <label>
            Balance:
            <input 
              type="number" 
              name="balance" 
              value={formData.balance} 
              onChange={handleChange} 
              required 
              min="0"  // Prevent negative balance input
              aria-label="Initial Balance"
            />
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
