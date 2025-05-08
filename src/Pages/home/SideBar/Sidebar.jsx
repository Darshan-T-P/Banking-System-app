import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaUniversity, FaHistory, FaExchangeAlt, FaSignOutAlt } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.clear(); // Clears all stored user data
    navigate('/signin');  // Redirects to sign-in page
  };

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

      <footer className="footer">
        {user && (
          <>
            <div className="user-email">
              <strong>User:</strong> {user.email}
            </div>
            <button onClick={handleLogout} className="logout-button">
              <FaSignOutAlt /> Logout
            </button>
          </>
        )}
      </footer>
    </div>
  );
};

export default Sidebar;
