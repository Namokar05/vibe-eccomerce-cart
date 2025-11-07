# 🛍️ Vibe Commerce - Full Stack E-Commerce Cart

A modern, full-stack shopping cart application built for Vibe Commerce internship screening. Features a React frontend, Node.js/Express backend, and MongoDB database integration.

## 📸 Screenshots

### Products Page

![Products Grid](vibe-commmerce-cart/public/products.jpg)
_Browse through product catalog with beautiful card layouts_

### Shopping Cart

![Cart View](vibe-commmerce-cart/public/shopping.jpg)
_Manage your cart items with quantity controls_

### Checkout

![Checkout Form](vibe-commmerce-cart/public/checkout.jpg)
_Simple and secure checkout process_

### Order Receipt

![Receipt Modal](vibe-commmerce-cart/public/receipt.jpg)
_Detailed order confirmation with receipt_

## 🚀 Features

### Core Features

- ✅ **Product Catalog**: Browse 8 mock products with images and descriptions
- ✅ **Shopping Cart**: Add, update, and remove items
- ✅ **Quantity Management**: Increase/decrease item quantities
- ✅ **Real-time Total**: Dynamic cart total calculation
- ✅ **Checkout Flow**: Name/email validation with order processing
- ✅ **Order Receipt**: Detailed receipt with order ID and timestamp
- ✅ **Responsive Design**: Mobile-first, works on all devices

### Bonus Features Implemented

- ✅ **MongoDB Persistence**: Cart data persists across sessions
- ✅ **Error Handling**: Comprehensive error handling and validation
- ✅ **Mock User System**: Simulates user-specific carts
- ✅ **Loading States**: Smooth loading indicators
- ✅ **Fallback Mode**: Works even if MongoDB is unavailable

## 🛠️ Tech Stack

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database (with in-memory fallback)
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

### Frontend

- **React 18** - UI library
- **Axios** - HTTP client
- **React Icons** - Icon library
- **CSS3** - Styling (no external UI frameworks)

## 📁 Project Structure

```
vibe-commerce-cart/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js          # MongoDB connection
│   │   ├── models/
│   │   │   ├── Product.js           # Product schema
│   │   │   └── Cart.js              # Cart schema
│   │   ├── routes/
│   │   │   ├── products.js          # Product endpoints
│   │   │   ├── cart.js              # Cart endpoints
│   │   │   └── checkout.js          # Checkout endpoint
│   │   ├── middleware/
│   │   │   └── errorHandler.js      # Error handling
│   │   └── server.js                # Express server
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx           # Navigation bar
│   │   │   ├── ProductGrid.jsx      # Products display
│   │   │   ├── Cart.jsx             # Cart view
│   │   │   ├── CheckoutForm.jsx     # Checkout form
│   │   │   └── ReceiptModal.jsx     # Order receipt
│   │   ├── services/
│   │   │   └── api.js               # API service layer
│   │   ├── App.jsx                  # Main app component
│   │   ├── App.css                  # Styles
│   │   └── index.js                 # Entry point
│   ├── package.json
│   └── .env
└── README.md
```

## 🔧 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (optional - app works without it)
- npm or yarn

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/vibe-commerce-cart.git
cd vibe-commerce-cart
```

### Step 2: Backend Setup

```bash
cd backend
npm install

# Create .env file
echo "PORT=5000
MONGODB_URI=mongodb://localhost:27017/vibe-commerce
NODE_ENV=development" > .env

# Start MongoDB (optional)
# If you have MongoDB installed locally:
mongod

# Start the backend server
npm run dev
```

Backend will run on `http://localhost:5000`

### Step 3: Frontend Setup

```bash
cd ../frontend
npm install

# Create .env file
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env

# Start the frontend
npm start
```

Frontend will run on `http://localhost:3000`

## 📡 API Endpoints

### Products

- **GET** `/api/products` - Get all products
- **GET** `/api/products/:id` - Get single product

### Cart

- **GET** `/api/cart` - Get current cart
- **POST** `/api/cart` - Add item to cart
  ```json
  {
    "productId": 1,
    "quantity": 2
  }
  ```
- **PUT** `/api/cart/:productId` - Update item quantity
  ```json
  {
    "quantity": 3
  }
  ```
- **DELETE** `/api/cart/:productId` - Remove item from cart
- **DELETE** `/api/cart` - Clear entire cart

### Checkout

- **POST** `/api/checkout` - Process checkout
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "cartItems": [...]
  }
  ```

## 🧪 Testing the Application

### Manual Testing Checklist

1. ✅ View all products on the homepage
2. ✅ Add products to cart (check cart badge updates)
3. ✅ Click cart icon to view cart
4. ✅ Increase/decrease item quantities
5. ✅ Remove items from cart
6. ✅ Proceed to checkout
7. ✅ Fill checkout form (test validation)
8. ✅ Submit order and view receipt
9. ✅ Verify cart is cleared after checkout
10. ✅ Test responsive design on mobile

### API Testing with cURL

```bash
# Get products
curl http://localhost:5000/api/products

# Add to cart
curl -X POST http://localhost:5000/api/cart \
  -H "Content-Type: application/json" \
  -d '{"productId": 1, "quantity": 2}'

# Get cart
curl http://localhost:5000/api/cart

# Checkout
curl -X POST http://localhost:5000/api/checkout \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "cartItems": [...]
  }'
```

## 🎨 Design Decisions

### Architecture

- **RESTful API**: Clean, predictable endpoint structure
- **Component-based UI**: Reusable React components
- **Service Layer**: Centralized API calls in frontend
- **Error Boundaries**: Graceful error handling throughout

### Database Strategy

- **Primary**: MongoDB with Mongoose ODM
- **Fallback**: In-memory storage if MongoDB unavailable
- **Auto-seeding**: Products automatically populated on first run

### UX Enhancements

- **Real-time Updates**: Cart badge updates instantly
- **Loading States**: Spinners for async operations
- **Validation**: Form validation with clear error messages
- **Visual Feedback**: Hover effects and transitions
- **Mobile-first**: Responsive design for all screen sizes

## 🚨 Error Handling

The application handles various error scenarios:

- Database connection failures (falls back to in-memory)
- Network errors (user-friendly messages)
- Invalid input (form validation)
- Empty cart checkout (prevents submission)
- Product not found (404 handling)

## 🔄 Future Enhancements

- [ ] User authentication & multiple users
- [ ] Product search and filtering
- [ ] Product categories
- [ ] Wishlist functionality
- [ ] Order history
- [ ] Payment gateway integration
- [ ] Product reviews and ratings
- [ ] Admin panel for product management

## 📝 Assignment Requirements Checklist

### Backend APIs

- ✅ GET `/api/products` - Returns 8 mock products
- ✅ POST `/api/cart` - Add items with productId and quantity
- ✅ DELETE `/api/cart/:id` - Remove item from cart
- ✅ GET `/api/cart` - Get cart with total
- ✅ POST `/api/checkout` - Process checkout and return receipt

### Frontend Features

- ✅ Products grid with "Add to Cart" buttons
- ✅ Cart view with items, quantities, and total
- ✅ Remove and update quantity buttons
- ✅ Checkout form with name and email
- ✅ Receipt modal with order details
- ✅ Fully responsive design

### Bonus Features

- ✅ MongoDB persistence
- ✅ Comprehensive error handling
- ✅ Mock user system
- ✅ Clean code structure

## 👨‍💻 Development

### Running in Development Mode

```bash
# Backend (with auto-reload)
cd backend
npm run dev

# Frontend (with hot reload)
cd frontend
npm start
```

### Building for Production

```bash
# Frontend
cd frontend
npm run build

# Backend is production-ready as-is
cd backend
npm start
```

## 📧 Contact

For questions about this project:

- Email: namokar.jain2004@gmail.com
- GitHub: [@Namokar05](https://github.com/Namokar05)

---

**Built by Namokar for Vibe Commerce Internship Assignment**
