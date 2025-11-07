import React, { useState, useEffect } from 'react';
import { getProducts, addToCart } from '../services/api';
import { FaPlus, FaSpinner } from 'react-icons/fa';

const ProductGrid = ({ onCartUpdate }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingToCart, setAddingToCart] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getProducts();
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load products. Please try again.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      setAddingToCart(prev => ({ ...prev, [productId]: true }));
      await addToCart(productId, 1);
      onCartUpdate();
      
      setTimeout(() => {
        setAddingToCart(prev => ({ ...prev, [productId]: false }));
      }, 500);
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Failed to add item to cart');
      setAddingToCart(prev => ({ ...prev, [productId]: false }));
    }
  };

  const formatPrice = (price) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <FaSpinner className="spinner" size={48} />
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={fetchProducts} className="btn-retry">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="products-section">
      <h2 className="section-title">Our Products</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-footer">
                <span className="product-price">{formatPrice(product.price)}</span>
                <button
                  className={`btn-add-cart ${addingToCart[product.id] ? 'adding' : ''}`}
                  onClick={() => handleAddToCart(product.id)}
                  disabled={addingToCart[product.id]}
                >
                  {addingToCart[product.id] ? (
                    <FaSpinner className="spinner-small" />
                  ) : (
                    <>
                      <FaPlus /> Add to Cart
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;