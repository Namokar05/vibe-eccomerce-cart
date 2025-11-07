# 🛍️ Vibe Commerce - Full Stack E-Commerce Cart

A modern, full-stack shopping cart application built for Vibe Commerce internship screening. Features a React frontend, Node.js/Express backend, and MongoDB database integration.

## 📸 Screenshots

### Products Page
![products](https://github.com/user-attachments/assets/c8c2d120-f066-4dfa-a553-e5eb1ae9d370)

### Shopping Cart
![shopping](https://github.com/user-attachments/assets/006ae1be-32b4-49ba-ab06-718eb2b52525)

### Checkout
![checkout](https://github.com/user-attachments/assets/2c1515a0-f8ba-4cc6-a227-1598cc897181)

### Order Receipt
![receipt](https://github.com/user-attachments/assets/a916def6-84a0-4a77-ad2e-7b0c9c014bc2)

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
- ✅ **MongoDB Atlas Cloud Database**: Cart data persists in cloud
- ✅ **Error Handling**: Comprehensive error handling and validation
- ✅ **Mock User System**: Simulates user-specific carts
- ✅ **Loading States**: Smooth loading indicators
- ✅ **Fallback Mode**: Works even if database is unavailable

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

### Frontend
- **React 18** - UI library
- **Axios** - HTTP client
- **React Icons** - Icon library
- **CSS3** - Custom styling

## 📁 Project Structure

```
vibe-commerce-cart/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js          # MongoDB Atlas connection
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
│   ├── public/
│   │   └── index.html               # HTML template
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
- MongoDB Atlas account (free tier works)
- npm or yarn

### Step 1: MongoDB Atlas Setup

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account
   - Create a new cluster (choose free tier)

2. **Configure Database Access**
   - Go to "Database Access" in Atlas dashboard
   - Click "Add New Database User"
   - Create username and password (save these!)
   - Set privileges to "Read and write to any database"

3. **Configure Network Access**
   - Go to "Network Access" in Atlas dashboard
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Or add your specific IP address

4. **Get Connection String**
   - Go to "Database" → Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

### Step 2: Clone the Repository
```bash
git clone https://github.com/yourusername/vibe-commerce-cart.git
cd vibe-commerce-cart
```

### Step 3: Backend Setup
```bash
cd backend
npm install

# Create .env file with your MongoDB Atlas credentials
cat > .env << EOL
PORT=5000
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/vibe-commerce?retryWrites=true&w=majority
NODE_ENV=development
EOL

# Replace YOUR_USERNAME, YOUR_PASSWORD, and cluster URL with your actual values

# Start the backend server
npm run dev
```

**Important**: Replace the MongoDB URI with your actual connection string from Atlas!

Backend will run on `http://localhost:5000`

### Step 4: Frontend Setup
```bash
cd ../frontend
npm install

# Create .env file
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env

# Start the frontend
npm start
```

Frontend will run on `http://localhost:3000`

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/vibe-commerce?retryWrites=true&w=majority
NODE_ENV=development
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

**Security Note**: Never commit `.env` files to GitHub. They are already in `.gitignore`.

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

### Verifying MongoDB Atlas Connection

Check your backend terminal for:
```
✅ MongoDB Connected Successfully
🚀 Server running on port 5000
```

You can also verify in MongoDB Atlas dashboard:
- Go to "Collections" to see your data
- Check "vibe-commerce" database
- See "products" and "carts" collections

### API Testing with cURL
```bash
# Health check
curl http://localhost:5000/api/health

# Get products
curl http://localhost:5000/api/products

# Add to cart
curl -X POST http://localhost:5000/api/cart \
  -H "Content-Type: application/json" \
  -d '{"productId": 1, "quantity": 2}'

# Get cart
curl http://localhost:5000/api/cart
```

## 🎨 Design Decisions

### Why MongoDB Atlas?
- **Cloud-hosted**: No local database installation needed
- **Free Tier**: Perfect for assignments and demos
- **Scalable**: Can handle production workloads
- **Reliable**: 99.95% uptime SLA
- **Easy Setup**: Simple connection string configuration

### Architecture
- **RESTful API**: Clean, predictable endpoint structure
- **Component-based UI**: Reusable React components
- **Service Layer**: Centralized API calls in frontend
- **Error Boundaries**: Graceful error handling throughout

### Database Strategy
- **Primary**: MongoDB Atlas cloud database
- **Fallback**: In-memory storage if Atlas unavailable
- **Auto-seeding**: Products automatically populated on first run
- **Persistence**: Cart data survives server restarts

## 🚨 Troubleshooting

### Common Issues

**1. MongoDB Connection Error**
```
Error: Could not connect to MongoDB Atlas
```
**Solutions**:
- Verify your connection string is correct
- Check username and password (no special characters or URL encode them)
- Ensure IP address is whitelisted in Network Access
- Wait 2-3 minutes after creating cluster

**2. CORS Error in Browser**
```
Access to XMLHttpRequest has been blocked by CORS policy
```
**Solution**: Make sure backend is running and CORS is configured

**3. Products Not Loading**
**Solution**: Check if backend seeded products. Delete database and restart backend.

**4. Port Already in Use**
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**: 
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9  # Mac/Linux
netstat -ano | findstr :5000   # Windows - note PID and kill it
```

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
- ✅ MongoDB Atlas cloud database persistence
- ✅ Comprehensive error handling
- ✅ Mock user system
- ✅ Clean code structure
- ✅ Loading states and user feedback

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

# The build folder will contain optimized production build

# Backend is production-ready as-is
cd backend
NODE_ENV=production npm start
```

## 📹 Demo Video

[Link to Loom/YouTube Demo Video]

---

**Built by Namokar for Vibe Commerce Internship Assignment**
**Repository**: [https://github.com/Namokar05/vibe-eccomerce-cart]
**Video**: [Demo Video Link]
