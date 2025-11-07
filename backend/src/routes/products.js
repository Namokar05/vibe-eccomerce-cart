const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const mockProducts = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 6499,
        description: "Premium noise-cancelling wireless headphones",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
        category: "Electronics",
        stock: 50
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 16499,
        description: "Fitness tracking smartwatch with heart rate monitor",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
        category: "Electronics",
        stock: 30
    },
    {
        id: 3,
        name: "Laptop Backpack",
        price: 3999,
        description: "Water-resistant backpack with laptop compartment",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
        category: "Accessories",
        stock: 75
    },
    {
        id: 4,
        name: "USB-C Hub",
        price: 2899,
        description: "7-in-1 USB-C hub with HDMI and card reader",
        image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500",
        category: "Electronics",
        stock: 100
    },
    {
        id: 5,
        name: "Mechanical Keyboard",
        price: 10499,
        description: "RGB mechanical gaming keyboard with blue switches",
        image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500",
        category: "Electronics",
        stock: 40
    },
    {
        id: 6,
        name: "Wireless Mouse",
        price: 2499,
        description: "Ergonomic wireless mouse with precision tracking",
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500",
        category: "Electronics",
        stock: 120
    },
    {
        id: 7,
        name: "Phone Stand",
        price: 1599,
        description: "Adjustable aluminum phone stand for desk",
        image: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=500",
        category: "Accessories",
        stock: 200
    },
    {
        id: 8,
        name: "Bluetooth Speaker",
        price: 4999,
        description: "Portable waterproof Bluetooth speaker",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
        category: "Electronics",
        stock: 60
    }
];

router.get('/', async (req, res, next) => {
    try {
        let products = await Product.find();

        if (products.length === 0) {
            await Product.insertMany(mockProducts);
            products = await Product.find();
        }

        res.json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        res.json({
            success: true,
            count: mockProducts.length,
            data: mockProducts,
            note: "Using mock data (DB unavailable)"
        });
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const product = await Product.findOne({ id: req.params.id });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.json({
            success: true,
            data: product
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;