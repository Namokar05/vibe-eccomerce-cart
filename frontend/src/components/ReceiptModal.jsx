import React from 'react';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';

const ReceiptModal = ({ receipt, onClose }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  return (
    <div className="receipt-overlay">
      <div className="receipt-modal">
        <button className="modal-close" onClick={onClose}>
          <FaTimes />
        </button>
        
        <div className="receipt-header">
          <FaCheckCircle className="success-icon" size={64} />
          <h2>Order Successful!</h2>
          <p>Thank you for your purchase</p>
        </div>
        
        <div className="receipt-content">
          <div className="receipt-section">
            <h3>Order Details</h3>
            <div className="receipt-info">
              <div className="info-row">
                <span>Order ID:</span>
                <strong>{receipt.orderId}</strong>
              </div>
              <div className="info-row">
                <span>Customer:</span>
                <strong>{receipt.customerName}</strong>
              </div>
              <div className="info-row">
                <span>Email:</span>
                <strong>{receipt.customerEmail}</strong>
              </div>
              <div className="info-row">
                <span>Date:</span>
                <strong>{formatDate(receipt.timestamp)}</strong>
              </div>
              <div className="info-row">
                <span>Payment:</span>
                <strong>{receipt.paymentMethod}</strong>
              </div>
            </div>
          </div>
          
          <div className="receipt-section">
            <h3>Items Ordered</h3>
            <div className="receipt-items">
              {receipt.items.map((item, index) => (
                <div key={index} className="receipt-item">
                  <div>
                    <div className="item-name">{item.name}</div>
                    <div className="item-qty">Quantity: {item.quantity}</div>
                  </div>
                  <div className="item-price">{formatPrice(item.subtotal)}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="receipt-section">
            <div className="receipt-totals">
              <div className="total-row">
                <span>Subtotal:</span>
                <span>{formatPrice(receipt.subtotal)}</span>
              </div>
              <div className="total-row">
                <span>Tax (GST 18%):</span>
                <span>{formatPrice(receipt.tax)}</span>
              </div>
              <div className="total-row total-final">
                <strong>Total:</strong>
                <strong>{formatPrice(receipt.total)}</strong>
              </div>
            </div>
          </div>
          
          <div className="receipt-footer">
            <p className="receipt-note">
              A confirmation email has been sent to {receipt.customerEmail}
            </p>
          </div>
        </div>
        
        <button className="btn-close-receipt" onClick={onClose}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default ReceiptModal;