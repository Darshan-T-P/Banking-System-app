import React, { useState } from "react";
import TransactionHistory from "../../../components/TransactionHistory";
import "./MyTransactions.css"; 

const MyTransactions = () => {
  const [showForm, setShowForm] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const accountId = "681c7069ca20d52521449b80"; // Sample ID

  const handleTransactionCreated = (newTransaction) => {
    setTransactions([newTransaction, ...transactions]);
    setShowForm(false); // Hide form after submission
  };

  return (
    <div className="transactions-page">
      <h1>My Transactions</h1>
{/* 
      <button className="toggle-form-button" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Close Form" : "New Transaction"}
      </button>

      {showForm && (
        <CreateTransactionForm
          accountId={accountId}
          onTransactionCreated={handleTransactionCreated}
        />
      )} */}

      <TransactionHistory accountId={accountId} />
    </div>
  );
};

export default MyTransactions;
