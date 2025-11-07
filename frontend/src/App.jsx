import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import CheckoutForm from './components/CheckoutForm';
import ReceiptModal from './components/ReceiptModal';
import { getCart } from './services/api';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('products'); 
  const [cartItems, setCartItems] = useState([]);
  const [receipt, setReceipt] = useState(null);
  const [cartRefresh, setCartRefresh] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    updateCartCount();
  }, []);

  const updateCartCount = async () => {
    try {
      const response = await getCart();
      const items = response.data?.items || [];
      const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

      setCartCount(totalItems);
      setCartItems(items);
    } catch (err) {
      console.error('Error updating cart count:', err);
    }
  };

  const handleCartUpdate = () => {
    updateCartCount();
    setCartRefresh(prev => prev + 1);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    setCurrentView('checkout');
  };

  const handleCheckoutSuccess = (receiptData) => {
    setReceipt(receiptData);
    setCurrentView('products');
    updateCartCount();
  };

  const handleCloseReceipt = () => {
    setReceipt(null);
  };

  return (
    <div className="App">
      <Navbar
        cartCount={cartCount}
        onCartClick={() => setCurrentView('cart')}
        onHomeClick={() => setCurrentView('products')}
      />
      
      <main className="main-content">
        {currentView === 'products' && (
          <ProductGrid onCartUpdate={handleCartUpdate} />
        )}
        
        {currentView === 'cart' && (
          <Cart
            onCheckoutClick={handleCheckout}
            onCartUpdate={handleCartUpdate}
            refreshTrigger={cartRefresh}
          />
        )}
        
        {currentView === 'checkout' && (
          <CheckoutForm
            cartItems={cartItems}
            onSuccess={handleCheckoutSuccess}
            onCancel={() => setCurrentView('cart')}
          />
        )}
      </main>
      
      {receipt && (
        <ReceiptModal
          receipt={receipt}
          onClose={handleCloseReceipt}
        />
      )}
      
      <footer className="footer">
        <p>© 2025 Vibe Commerce. Made by Namokar Jain with 💌 .</p>
      </footer>
    </div>
  );
}

export default App;
