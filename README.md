# Authentication & Authorization Project

A full-stack Node.js authentication and authorization system with role-based access control (Admin and User roles).

## Features

- **User Authentication** - Secure login and signup with bcrypt password hashing
- **JWT Tokens** - JSON Web Token-based authentication with 5-minute expiration
- **Role-Based Access Control** - Admin and User role distinction
- **Admin Management** - Only one admin allowed in the system
- **User Management** - Admins can view all users and delete users
- **Session Management** - Secure cookie-based session handling
- **EJS Templating** - Dynamic server-side rendering

## Project Structure

```
AuthProject/
├── controllers/
│   └── user.js              # User authentication and management logic
├── models/
│   └── User.model.js        # MongoDB User schema
├── middlewares/
│   └── auth.js              # JWT authentication middleware
├── routes/
│   ├── admin.js             # Admin-only routes
│   ├── auth.js              # Public auth routes
│   └── user.js              # User routes
├── views/
│   ├── login.ejs            # Login page
│   ├── signup.ejs           # Signup page
│   ├── home.ejs             # Home page
│   ├── dashboard.ejs        # Dashboard
│   ├── allUser.ejs          # List all users (admin only)
│   └── deleteUser.ejs       # Delete user page (admin only)
├── public/
│   └── style.css            # Styling
├── database/
│   └── db.js                # MongoDB connection
├── server.js                # Main server file
├── package.json             # Dependencies
└── .env                      # Environment variables
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AuthProject
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file**
   ```
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/authproject
   JWT_SECRET=your_secret_key_here
   ```

4. **Start MongoDB**
   ```bash
   mongod
   ```

5. **Run the server**
   ```bash
   npm start
   ```

   The server will start at `http://localhost:3000`

## Routes

### Public Routes
- `GET /login` - Login page
- `POST /login` - Login user
- `GET /signup` - Signup page
- `POST /signup` - Create new user

### Admin Routes (Protected)
- `GET /admin/home` - Admin dashboard
- `GET /admin/delete-user` - Delete user page
- `POST /admin/delete-user` - Delete a user
- `GET /admin/show-all-user` - View all users

### User Routes (Protected)
- `GET /user/home` - User home page
- `GET /allUser` - View all users
- `GET /dashboard` - User dashboard

## Authentication Flow

1. **Signup**
   - User enters name, email, password, and role (User or Admin)
   - Password is hashed using bcrypt
   - Admin creation is restricted - only one admin allowed
   - User is redirected to login page

2. **Login**
   - User enters email, password, and selects role
   - System validates role matches user's registered role
   - If credentials are valid, JWT token is issued
   - Token is stored in HTTP-only cookie
   - User is redirected based on role (Admin → `/admin/home`, User → `/user/home`)

3. **Authorization**
   - All protected routes use `authMiddleware`
   - Middleware extracts and verifies JWT token
   - User info is attached to `res.locals.user`
   - Admin-specific routes check user role

## User Roles

### Admin
- Full access to admin dashboard
- Can view all users
- Can delete users
- Automatic redirect to admin home after login
- Only one admin account allowed

### User
- Can access user dashboard
- Can view all users
- Cannot delete users
- Automatic redirect to user home after login

## User Deletion

When an admin deletes a user:
1. Admin navigates to the delete user page
2. Enters the email of the user to delete
3. Upon successful deletion, an alert appears with "User deleted successfully"
4. Admin is automatically redirected to the admin home page

## Security Features

- **Password Hashing** - bcrypt with salt rounds
- **JWT Authentication** - Secure token-based auth with expiration
- **HTTP-Only Cookies** - Prevents XSS attacks
- **Role-Based Access Control** - Route-level protection
- **Admin Restriction** - Only one admin can exist
- **Role Validation** - Login validates selected role matches database

## Technologies Used

- **Backend** - Node.js, Express.js
- **Database** - MongoDB, Mongoose
- **Authentication** - JWT, bcrypt
- **Templating** - EJS
- **Styling** - CSS
- **Environment** - dotenv

## Dependencies

```json
{
  "express": "^4.x.x",
  "mongoose": "^7.x.x",
  "bcrypt": "^5.x.x",
  "jsonwebtoken": "^9.x.x",
  "ejs": "^3.x.x",
  "dotenv": "^16.x.x",
  "cookie-parser": "^1.x.x"
}
```

## Environment Variables

Create a `.env` file in the root directory:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/authproject
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

## Usage Example

### Creating an Admin Account (First Time)
1. Go to `/signup`
2. Fill in details and select "Admin" role
3. Click signup - first admin account is created

### Creating a User Account
1. Go to `/signup`
2. Fill in details and select "User" role
3. Click signup

### Admin Login
1. Go to `/login`
2. Enter email and password
3. Select "Admin" role
4. Click login - redirected to admin dashboard

### Managing Users (Admin Only)
1. Navigate to "Show All Users" to view all registered users
2. Navigate to "Delete User" to remove a user account
3. Success message appears and admin is redirected to home

## Notes

- JWT tokens expire after 5 minutes
- Passwords are never stored in plain text
- All sensitive routes are protected with authentication middleware
- Admin role is restricted to prevent multiple admins

## Contributing

Feel free to fork and submit pull requests.

## License

MIT License

## Support

For issues or questions, please open an issue on GitHub.
