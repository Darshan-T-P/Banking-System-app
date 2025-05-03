import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome, <span className="highlight">Adrian</span></h1>
        <p>Access & manage your account and transactions efficiently.</p>
      </header>

      <section className="summary">
        <div className="balance-box">
          <p>2 Bank Accounts</p>
          <h2>$2,698.12</h2>
          <button className="add-btn">+ Add bank</button>
        </div>
      </section>

      <section className="transactions">
        <h2>Recent Transactions</h2>
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Transaction</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Spotify</td><td className="red">- $15.00</td><td>Processing</td><td>Wed 1:00pm</td><td>Subscriptions</td></tr>
            <tr><td>Alexa Doe</td><td className="green">+ $88.00</td><td>Success</td><td>Wed 2:45am</td><td>Deposit</td></tr>
            <tr><td>Figma</td><td className="green">+ $18.99</td><td>Processing</td><td>Tue 6:10pm</td><td>Income</td></tr>
            <tr><td>FSV</td><td className="green">+ $80.00</td><td>Success</td><td>Tue 12:15pm</td><td>Groceries</td></tr>
            <tr><td>Sam Sulek</td><td className="red">- $20.00</td><td>Declined</td><td>Tue 4:50am</td><td>Food</td></tr>
          </tbody>
        </table>
      </section>
      
    </div>
  );
};

export default Dashboard;
