# Audio File Management API

This project is part of the NTI (National Telecommunication Institute) program and is currently under active development.

## Project Status

🚧 **Work in Progress** 🚧

Currently implementing:

- User authentication and authorization
- Password reset flow
- Audio file management
- Email verification system

## Features

- User registration with email verification
- JWT-based authentication
- Password reset functionality
- Audio file upload and management
- Role-based access control (User/Admin)

## Tech Stack

- Node.js & Express
- MongoDB with Mongoose
- JWT for authentication
- Nodemailer for email services
- Jest for testing
- Winston for logging

## Environment Setup

Required environment variables:

```env
MONGO_URI=your_mongodb_connection_string
JWT_KEY=your_jwt_secret
MAIL_ADDRESS=your_email_for_sending
MAIL_PASSWORD=your_email_app_password
CLIENT_URL=your_frontend_url
```

## Installation

```bash
npm install
npm start
```

## Testing

```bash
npm test
```

## Project Structure

- `/config` - Configuration files
- `/controllers` - Route controllers
- `/middlewares` - Express middlewares
- `/modules` - Database models
- `/routes` - Express routes
- `/utils` - Utility functions
- `/tests` - Test files

## API Routes

- `/login` - User login
- `/register` - User registration
- `/verify/:token` - Email verification
- `/forgetPassword` - Password reset request
- `/resetPassword/:token` - Password reset
- `/dashboard` - Protected route example

## Contributing

This project is part of the NTI program and is still under development. More features and documentation will be added as development continues.
