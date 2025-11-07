import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';

const Navbar = ({ cartCount, onCartClick, onHomeClick }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand" onClick={onHomeClick}>
          <h1>🛍️ Vibe Commerce</h1>
        </div>
        <div className="navbar-cart" onClick={onCartClick}>
          <FaShoppingCart size={24} />
          {cartCount > 0 && (
            <span className="cart-badge">{cartCount}</span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;