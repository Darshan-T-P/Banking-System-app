import React from 'react';

// Card Component to display Bank Account information
const Card = ({ bankName, accountType, balance, isActive, createdAt }) => {
  return (
    <div 
      style={{
        borderRadius: "15px",
        padding: "25px",
        minWidth: "280px",
        background: "linear-gradient(135deg, #f5f5f5, #e0e0e0)", // Gradient background
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s, box-shadow 0.3s ease, background-color 0.3s",
        cursor: "pointer",
        color: "#333",
        fontFamily: "'Roboto', sans-serif",  // Use modern font family
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.2)";
        e.currentTarget.style.backgroundColor = "#e0e0e0"; // Slight color shift on hover
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.1)";
        e.currentTarget.style.backgroundColor = "linear-gradient(135deg, #f5f5f5, #e0e0e0)"; 
      }}
    >
      <h3 style={{
        fontSize: "1.5rem",  // Larger font size
        margin: "0 0 15px 0",
        fontWeight: "600",   // Bold title for better visibility
        color: "#333",
        letterSpacing: "1px",
      }}>
        {bankName}
      </h3>
      <p style={{
        fontSize: "1.1rem",
        margin: "8px 0",
        fontWeight: "500",
        color: "#555",
      }}>
        <strong>Type:</strong> {accountType}
      </p>
      <p style={{
        fontSize: "1.2rem",
        margin: "8px 0",
        fontWeight: "600",
        color: isActive ? "#4CAF50" : "#f44336", // Green for active, red for inactive
      }}>
        <strong>Balance:</strong> ₹{balance.toLocaleString()}
      </p>
      <p style={{
        fontSize: "1rem",
        margin: "8px 0",
        color: "#777",
        fontWeight: "400",
      }}>
        <strong>Status:</strong> {isActive ? "Active" : "Inactive"}
      </p>
      <p style={{
        fontSize: "0.9rem",
        color: "#888",
        margin: "8px 0",
        fontStyle: "italic",
        letterSpacing: "0.5px",
      }}>
        Created: {new Date(createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default Card;
