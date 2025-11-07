const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');

let memoryCart = {
    userId: 'mock-user-001',
    items: [],
    totalAmount: 0,
};

const calculateTotal = (items) => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

router.get('/', async (req, res) => {
    try {
        let cart = await Cart.findOne({ userId: 'mock-user-001' });

        if (!cart) {
            cart = await Cart.create({
                userId: 'mock-user-001',
                items: [],
                totalAmount: 0,
            });
        }

        res.json({ success: true, data: cart });
    } catch (error) {
        console.error('DB fetch failed, using memory cart');
        res.json({
            success: true,
            data: memoryCart,
            note: 'Using in-memory cart',
        });
    }
});

router.post('/', async (req, res, next) => {
    try {
        const { productId, quantity = 1 } = req.body;

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: 'Product ID is required',
            });
        }

        const product = await Product.findOne({ id: Number(productId) });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }

        let cart = await Cart.findOne({ userId: 'mock-user-001' });
        if (!cart) cart = new Cart({ userId: 'mock-user-001', items: [] });

        const existingItemIndex = cart.items.findIndex(
            (item) => Number(item.productId) === Number(productId)
        );

        if (existingItemIndex > -1) {
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            cart.items.push({
                productId: product.id,
                name: product.name,
                price: product.price,
                quantity,
                image: product.image,
            });
        }

        cart.totalAmount = calculateTotal(cart.items);
        await cart.save();

        res.status(201).json({
            success: true,
            message: 'Item added to cart',
            data: cart,
        });
    } catch (error) {
        console.error('❌ Error adding to cart:', error);
        next(error);
    }
});

router.put('/:productId', async (req, res, next) => {
    try {
        const { productId } = req.params;
        const { quantity } = req.body;

        if (!quantity || quantity < 1) {
            return res.status(400).json({
                success: false,
                message: 'Valid quantity is required',
            });
        }

        let cart = await Cart.findOne({ userId: 'mock-user-001' });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found',
            });
        }

        const itemIndex = cart.items.findIndex(
            (item) => Number(item.productId) === Number(productId)
        );

        if (itemIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Item not found in cart',
            });
        }

        cart.items[itemIndex].quantity = quantity;
        cart.totalAmount = calculateTotal(cart.items);
        await cart.save();

        res.json({
            success: true,
            message: 'Cart updated',
            data: cart,
        });
    } catch (error) {
        next(error);
    }
});

router.delete('/:productId', async (req, res, next) => {
    try {
        const { productId } = req.params;
        let cart = await Cart.findOne({ userId: 'mock-user-001' });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found',
            });
        }

        cart.items = cart.items.filter(
            (item) => Number(item.productId) !== Number(productId)
        );

        cart.totalAmount = calculateTotal(cart.items);
        await cart.save();

        res.json({
            success: true,
            message: 'Item removed from cart',
            data: cart,
        });
    } catch (error) {
        next(error);
    }
});

router.delete('/', async (req, res, next) => {
    try {
        let cart = await Cart.findOne({ userId: 'mock-user-001' });

        if (cart) {
            cart.items = [];
            cart.totalAmount = 0;
            await cart.save();
        }

        res.json({
            success: true,
            message: 'Cart cleared',
            data: cart,
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
