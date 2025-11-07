const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

router.post('/', async (req, res, next) => {
  try {
    const { name, email, cartItems } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required'
      });
    }

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }

    const total = cartItems.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);

    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    const taxRate = 0.18;
    const subtotal = total;
    const tax = parseFloat((subtotal * taxRate).toFixed(2));
    const totalWithTax = parseFloat((subtotal + tax).toFixed(2));

    const receipt = {
      orderId,
      customerName: name,
      customerEmail: email,
      items: cartItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.price * item.quantity
      })),
      subtotal: subtotal,
      tax: tax,
      total: totalWithTax,
      timestamp: new Date().toISOString(),
      paymentMethod: 'Mock Payment',
      status: 'completed'
    };

    try {
      const cart = await Cart.findOne({ userId: 'mock-user-001' });
      if (cart) {
        cart.items = [];
        cart.totalAmount = 0;
        await cart.save();
      }
    } catch (error) {
      console.log('Could not clear cart:', error.message);
    }

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: receipt
    });

  } catch (error) {
    next(error);
  }
});

module.exports = router;