import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaUniversity, FaHistory, FaExchangeAlt } from 'react-icons/fa';
import './Sidebar.css'; // Optional: if you’re adding styles

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-title">Banking System</div>
      <nav className="nav-links">
        <NavLink to="/" className="nav-item">
          <FaHome className="nav-icon" />
          <span>Home</span>
        </NavLink>
        <NavLink to="/my-banks" className="nav-item">
          <FaUniversity className="nav-icon" />
          <span>My Banks</span>
        </NavLink>
        <NavLink to="/transaction-history" className="nav-item">
          <FaHistory className="nav-icon" />
          <span>Transaction History</span>
        </NavLink>
        <NavLink to="/payment-transfers" className="nav-item">
          <FaExchangeAlt className="nav-icon" />
          <span>Payment Transfers</span>
        </NavLink>
      </nav>
      <footer className='footer'>
        <div>
          <h4>Hello</h4>
        </div>
      </footer>
    </div>
  );
};

export default Sidebar;
