Overview
This web application allows users to sign up, log in, and record their trip information. The application stores user data and trip logs in a MongoDB Atlas database.

Features
User authentication (signup and login)
Secure password handling

Trip information form with:

Name
Departure location (From)
Destination (To)
Car brand
Car number
Data persistence in MongoDB Atlas

Installation
Prerequisites
Node.js (v14 or later recommended)
npm or yarn
MongoDB Atlas account with a configured cluster
Modern web browser

Setup Instructions
Clone the repository:

bash
git clone [repository-url]
cd trip-logger-app

Install dependencies:
bash
npm install

Configure environment variables:
Create a .env file in the root directory with the following:

MONGODB_ATLAS_URI=your_mongodb_atlas_connection_string
SESSION_SECRET=your_session_secret_key
PORT=7000 (or your preferred port)
Start the application:

bash
npm start
Access the application in your browser at:

http://localhost:3000


Usage
User Flow


Sign Up Page:
New users can create an account
Requires First name,last name,phone number and password

Login Page:
Existing users can log in with their credentials
Successful login redirects to the trip logging page

Trip Logging Page:
Authenticated users can fill out the trip information form
Form includes:
Name
From (departure location)
To (destination)
Car brand
Car number

Submitted data is saved to MongoDB Atlas

Database Schema
The application uses two main collections:

Users Collection:

javascript
{
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    phoneNumber: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    confirmPassword: { type: String, required: true, minlength: 6 }
}, { timestamps: true })


Trips Collection:

javascript
{
    firstName: { type: String, required: true, trim: true },
    surname: { type: String, required: true, trim: true },
    From: { type: String, required: true, trim: true },
    To: { type: String, required: true, trim: true },
    carBrand: { type: String, required: true, trim: true },
    carNumber: { type: String, required: true, trim: true }
}, { timestamps: true }


Configuration
The application can be configured via the .env file:

MONGODB_ATLAS_URI: Connection string for MongoDB Atlas

SESSION_SECRET: Secret key for session encryption

PORT: Server port (default: 7000)

Deployment
For production deployment, consider:

Using a process manager like PM2

Setting up HTTPS

Configuring proper CORS settings if using a separate frontend

Implementing proper logging

Troubleshooting
Connection issues with MongoDB Atlas:

Verify your connection string

Check your IP whitelist in Atlas

Ensure your cluster is running

Authentication problems:

Verify user credentials are being stored properly

Check session configuration

Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
