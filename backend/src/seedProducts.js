require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
    {
        name: "Wireless Headphones",
        price: 79.99,
        image: "/images/headphones.jpg",
        description: "High-quality over-ear wireless headphones."
    },
    {
        name: "Smart Watch",
        price: 199.99,
        image: "/images/watch.jpg",
        description: "Fitness tracking smart watch with heart rate monitor."
    },
    {
        name: "Laptop Backpack",
        price: 49.99,
        image: "/images/backpack.jpg",
        description: "Durable and stylish backpack for laptops up to 15 inches."
    }
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ MongoDB Connected");

        await Product.deleteMany({});
        await Product.insertMany(products);
        console.log("🌱 Products added successfully!");

        mongoose.connection.close();
    } catch (error) {
        console.error("❌ Error seeding data:", error);
        process.exit(1);
    }
}

seed();
