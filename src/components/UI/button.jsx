// Button.jsx (if it's a custom component)
import React from 'react';

const Button = ({ children, onClick, variant }) => {
  return (
    <button className={`button ${variant}`} onClick={onClick}>
      {children}
    </button>
  );
};

export {Button};
