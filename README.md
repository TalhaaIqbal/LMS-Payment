# 🎓 LMS Premium Course Payment System

<div align="center">

![LMS Logo](https://img.shields.io/badge/LMS-Premium%20Courses-blue?style=for-the-badge&logo=graduation-cap)

**A complete full-stack Learning Management System with integrated payment processing**

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)](https://mongodb.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payment-008CDD?style=flat-square&logo=stripe)](https://stripe.com/)
[![PayPal](https://img.shields.io/badge/PayPal-Payment-00457C?style=flat-square&logo=paypal)](https://paypal.com/)

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [API Documentation](#-api-documentation) • [Contributing](#-contributing)

</div>

---

## 🌟 Features

### 💳 **Dual Payment System**
- **Stripe Integration** - Secure credit card processing
- **PayPal Integration** - Popular digital wallet support
- **Real-time Payment Confirmation** - Instant course access

### 🔐 **Authentication & Security**
- JWT-based authentication
- Password encryption with bcrypt
- Protected routes and middleware
- Secure API endpoints

### 📚 **Course Management**
- Premium course catalog
- Course details and pricing
- Instructor information
- Category and difficulty levels

### 👤 **User Experience**
- Responsive design (mobile-first)
- Intuitive checkout process
- Purchase history tracking
- Access control for premium content

### 🎨 **Modern UI/UX**
- Built with Tailwind CSS
- Clean, professional design
- Loading states and animations
- Error handling with user feedback

---

## 🚀 Demo

### 📱 **Screenshots**

<div align="center">

| Premium Courses | Checkout Process | Payment Success |
|:---:|:---:|:---:|
| ![Courses](https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=Premium+Courses) | ![Checkout](https://via.placeholder.com/300x200/059669/FFFFFF?text=Checkout+Page) | ![Success](https://via.placeholder.com/300x200/DC2626/FFFFFF?text=Payment+Success) |

</div>

### 🎥 **Live Demo**
> 🔗 **[Try the Live Demo](https://your-demo-link.com)** *(Coming Soon)*

**Test Credentials:**
- Email: `demo@example.com`
- Password: `demo123`

**Test Payment:**
- Stripe: Use card `4242 4242 4242 4242`
- PayPal: Use sandbox account

---

## 🛠️ Tech Stack

<div align="center">

### **Frontend**
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

### **Backend**
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

### **Payment Processing**
![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white)
![PayPal](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)

</div>

---

## 📦 Installation

### **Prerequisites**
- Node.js 18.x or higher
- MongoDB Atlas account
- Stripe account (for payments)
- PayPal Developer account

### **Quick Start**

\`\`\`bash
# Clone the repository
git clone https://github.com/yourusername/lms-payment-system.git
cd lms-payment-system

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../
npm install
\`\`\`

### **Environment Setup**

#### **1. Backend Environment (`backend/.env`)**
\`\`\`env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lms-db

# Server
PORT=5000

# Authentication
JWT_SECRET=your-super-secret-jwt-key-here

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key

# PayPal
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
PAYPAL_ENV=sandbox
\`\`\`

#### **2. Frontend Environment (`src/.env`)**
\`\`\`env
VITE_BACKEND_URL=http://localhost:5000
VITE_STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
\`\`\`

### **Database Setup**

\`\`\`bash
# Seed the database with sample courses
cd backend
node scripts/seed-database.js
\`\`\`

### **Run the Application**

\`\`\`bash
# Terminal 1: Start backend server
cd backend
npm run dev

# Terminal 2: Start frontend development server
cd ../
npm run dev
\`\`\`

🎉 **Application will be running at:**
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

---

## 📁 Project Structure

\`\`\`
lms-payment-system/
├── 📁 backend/
│   ├── 📁 controllers/          # Route controllers
│   │   ├── authController.js
│   │   ├── courseController.js
│   │   └── paymentController.js
│   ├── 📁 models/              # Database models
│   │   ├── User.js
│   │   └── Course.js
│   ├── 📁 routes/              # API routes
│   │   ├── authRoutes.js
│   │   ├── courseRoutes.js
│   │   ├── paymentRoutes.js
│   │   └── userRoutes.js
│   ├── 📁 middleware/          # Custom middleware
│   │   └── authMiddleware.js
│   ├── 📁 utils/               # Utility functions
│   │   └── paypalClient.js
│   ├── 📄 server.js            # Main server file
│   └── 📄 package.json
├── 📁 src/
│   ├── 📁 api/                 # API configuration
│   │   └── axiosInstance.js
│   ├── 📁 components/          # Reusable components
│   │   ├── CourseCard.jsx
│   │   ├── StripeCheckoutForm.jsx
│   │   ├── PayPalButtonsWrapper.jsx
│   │   └── Navbar.jsx
│   ├── 📁 context/             # React Context
│   │   └── AuthContext.jsx
│   ├── 📁 pages/               # Page components
│   │   ├── PremiumCourses.jsx
│   │   ├── Checkout.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── 📁 routes/              # Route configuration
│   │   └── AppRoutes.jsx
│   ├── 📄 App.jsx              # Main App component
│   └── 📄 main.jsx             # Entry point
├── 📁 scripts/                 # Database scripts
│   └── seed-database.js
├── 📄 README.md
└── 📄 package.json
\`\`\`

---

## 🔌 API Documentation

### **Authentication Endpoints**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/register` | Register new user | ❌ |
| `POST` | `/api/auth/login` | User login | ❌ |

### **Course Endpoints**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/courses` | Get all premium courses | ❌ |
| `GET` | `/api/courses/:id` | Get course by ID | ❌ |

### **Payment Endpoints**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/payment/create-order` | Create payment order | ✅ |
| `POST` | `/api/payment/confirm-payment` | Confirm payment | ✅ |

### **User Endpoints**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/user/premium-courses` | Get user's purchased courses | ✅ |

### **Request/Response Examples**

<details>
<summary><strong>POST /api/auth/login</strong></summary>

**Request:**
\`\`\`json
{
  "email": "user@example.com",
  "password": "password123"
}
\`\`\`

**Response:**
\`\`\`json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "name": "John Doe",
    "email": "user@example.com"
  }
}
\`\`\`
</details>

<details>
<summary><strong>POST /api/payment/create-order</strong></summary>

**Request:**
\`\`\`json
{
  "courseId": "64f8a1b2c3d4e5f6a7b8c9d0",
  "paymentMethod": "stripe"
}
\`\`\`

**Response:**
\`\`\`json
{
  "clientSecret": "pi_1234567890_secret_abcdef",
  "orderId": "pi_1234567890"
}
\`\`\`
</details>

---

## 🧪 Testing

### **Run Tests**
\`\`\`bash
# Backend tests
cd backend
npm test

# Frontend tests
cd ../
npm test
\`\`\`

### **Test Payment Methods**

#### **Stripe Test Cards**
- **Success:** `4242 4242 4242 4242`
- **Declined:** `4000 0000 0000 0002`
- **Insufficient Funds:** `4000 0000 0000 9995`

#### **PayPal Sandbox**
Use PayPal sandbox accounts for testing payments.

---

## 🚀 Deployment

### **Frontend Deployment (Vercel)**
\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
\`\`\`

### **Backend Deployment (Railway/Heroku)**
\`\`\`bash
# For Railway
railway login
railway init
railway up

# For Heroku
heroku create your-app-name
git push heroku main
\`\`\`

### **Environment Variables for Production**
Make sure to set all environment variables in your deployment platform:
- `MONGODB_URI`
- `JWT_SECRET`
- `STRIPE_SECRET_KEY`
- `PAYPAL_CLIENT_ID`
- `PAYPAL_CLIENT_SECRET`

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   \`\`\`bash
   git checkout -b feature/amazing-feature
   \`\`\`
3. **Commit your changes**
   \`\`\`bash
   git commit -m 'Add some amazing feature'
   \`\`\`
4. **Push to the branch**
   \`\`\`bash
   git push origin feature/amazing-feature
   \`\`\`
5. **Open a Pull Request**

### **Development Guidelines**
- Follow ESLint configuration
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

<div align="center">

**Your Name**  
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/yourusername)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/yourprofile)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/yourusername)

</div>

---

## 🙏 Acknowledgments

- [Stripe](https://stripe.com/) for payment processing
- [PayPal](https://paypal.com/) for digital wallet integration
- [MongoDB Atlas](https://mongodb.com/atlas) for database hosting
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [React](https://reactjs.org/) for the frontend framework

---

## 📞 Support

If you have any questions or need help, please:

1. Check the [Issues](https://github.com/yourusername/lms-payment-system/issues) page
2. Create a new issue if your problem isn't already reported
3. Contact us at: support@yourdomain.com

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

![GitHub stars](https://img.shields.io/github/stars/yourusername/lms-payment-system?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/lms-payment-system?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/yourusername/lms-payment-system?style=social)

---

**Made with ❤️ for the developer community**

</div>
