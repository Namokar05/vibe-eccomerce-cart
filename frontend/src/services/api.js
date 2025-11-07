import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getProducts = async () => {
    const response = await api.get('/products');
    return response.data;
};

export const getProduct = async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
};

export const getCart = async () => {
    const response = await api.get('/cart');
    return response.data;
};

export const addToCart = async (productId, quantity = 1) => {
    const response = await api.post('/cart', { productId, quantity });
    return response.data;
};

export const updateCartItem = async (productId, quantity) => {
    const response = await api.put(`/cart/${productId}`, { quantity });
    return response.data;
};

export const removeFromCart = async (productId) => {
    const response = await api.delete(`/cart/${productId}`);
    return response.data;
};

export const clearCart = async () => {
    const response = await api.delete('/cart');
    return response.data;
};

export const checkout = async (checkoutData) => {
    const response = await api.post('/checkout', checkoutData);
    return response.data;
};

export default api;