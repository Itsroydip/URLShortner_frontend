# Mini Link Management Platform

A modern, feature-rich URL shortening and management platform built with React, Node.js, Express, and MongoDB. This platform allows users to create, manage, and analyze shortened URLs with advanced features like click tracking, analytics, and user management.

## Features

### URL Shortening
- Generate unique shortened URLs from long links
- Custom short link aliases
- Set expiration dates for links
- Hash-based link generation system

### User Management
- Secure user registration and login
- Password hashing for security
- Profile management
  - Update name and email (with automatic logout on email change)
  - Account deletion with cascade removal of associated data

### Link Management Dashboard
- Comprehensive link overview
- Edit existing links
- Delete individual links
- Pagination support for better navigation

### Advanced Analytics
- Detailed click tracking
  - Timestamp logging
  - IP address tracking
  - User agent details
- Device analytics
  - Mobile vs desktop vs tablet usage
  - Browser statistics
- Visual data representation
- Paginated analytics view

### Responsive Design
- Mobile-first approach
- Seamless experience across all devices
- Optimized UI for different screen sizes

## Technology Stack

### Frontend
- React.js
- Vanilla CSS for styling
- React Router for navigation
- Axios for API calls

### Backend
- Node.js
- Express.js
- MongoDB
- JWT for authentication

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

### Installation Steps

1. Clone the repository
```bash
git clone https://github.com/yourusername/mini-link-management.git
cd mini-link-management
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Configure environment variables
Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/link-manager
JWT_SECRET=your_jwt_secret
```

4. Install frontend dependencies
```bash
cd ../frontend
npm install
```

5. Configure frontend environment
Create a `.env` file in the frontend directory:
```
REACT_APP_API_URL=http://localhost:5000/api
```

6. Start the development servers

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm start
```

The application will be available at `http://localhost:3000`

## Database Schema

### User
```javascript
{
  email: String,
  password: String (hashed),
  name: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Link
```javascript
{
  userId: ObjectId,
  originalUrl: String,
  shortUrl: String,
  alias: String,
  expirationDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Click
```javascript
{
  linkId: ObjectId,
  timestamp: Date,
  ipAddress: String,
  userAgent: String,
  deviceType: String,
  browser: String
}
```

## Demo Credentials

You can use these credentials to test the application:

```
Email: demo@example.com
Password: Demo@123
```

## API Endpoints

### Authentication
- POST /api/auth/register
- POST /api/auth/login
- PUT /api/auth/profile

### Links
- POST /api/links
- GET /api/links
- PUT /api/links/:id
- DELETE /api/links/:id

### Analytics
- GET /api/analytics/link/:id
- GET /api/analytics/summary

