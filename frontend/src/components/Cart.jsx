import React, { useState, useEffect } from 'react';
import { getCart, updateCartItem, removeFromCart } from '../services/api';
import { FaTrash, FaMinus, FaPlus, FaSpinner } from 'react-icons/fa';

const Cart = ({ onCheckoutClick, onCartUpdate, refreshTrigger }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState({});

  useEffect(() => {
    fetchCart();
  }, [refreshTrigger]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await getCart();
      setCart(response.data);
    } catch (err) {
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      setUpdating(prev => ({ ...prev, [productId]: true }));
      await updateCartItem(productId, newQuantity);
      await fetchCart();
      onCartUpdate();
    } catch (err) {
      console.error('Error updating quantity:', err);
      alert('Failed to update quantity');
    } finally {
      setUpdating(prev => ({ ...prev, [productId]: false }));
    }
  };

  const handleRemove = async (productId) => {
    try {
      setUpdating(prev => ({ ...prev, [productId]: true }));
      await removeFromCart(productId);
      await fetchCart();
      onCartUpdate();
    } catch (err) {
      console.error('Error removing item:', err);
      alert('Failed to remove item');
    } finally {
      setUpdating(prev => ({ ...prev, [productId]: false }));
    }
  };

  const formatPrice = (price) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  if (loading) {
    return (
      <div className="cart-container">
        <div className="loading-container">
          <FaSpinner className="spinner" size={32} />
          <p>Loading cart...</p>
        </div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="cart-container">
        <div className="empty-cart">
          <h2>Your Cart is Empty</h2>
          <p>Add some products to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2 className="section-title">Shopping Cart</h2>
      
      <div className="cart-items">
        {cart.items.map((item) => (
          <div key={item.productId} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p className="cart-item-price">{formatPrice(item.price)}</p>
            </div>
            
            <div className="cart-item-actions">
              <div className="quantity-controls">
                <button
                  onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                  disabled={updating[item.productId] || item.quantity <= 1}
                  className="btn-quantity"
                >
                  <FaMinus size={12} />
                </button>
                
                <span className="quantity-display">{item.quantity}</span>
                
                <button
                  onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                  disabled={updating[item.productId]}
                  className="btn-quantity"
                >
                  <FaPlus size={12} />
                </button>
              </div>
              
              <button
                onClick={() => handleRemove(item.productId)}
                disabled={updating[item.productId]}
                className="btn-remove"
              >
                <FaTrash />
              </button>
            </div>
            
            <div className="cart-item-subtotal">
              {formatPrice(item.price * item.quantity)}
            </div>
          </div>
        ))}
      </div>
      
      <div className="cart-summary">
        <div className="cart-total">
          <span>Total:</span>
          <span className="total-amount">{formatPrice(cart.totalAmount)}</span>
        </div>
        
        <button 
          className="btn-checkout"
          onClick={onCheckoutClick}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;