## Overview

This is a full-stack web application that enables users to register, log in, and manage their details. The admin can view all registered users, update user information, and reset passwords. The frontend is built using **React** and **Tailwind CSS**, while the backend is implemented using **Node.js**, **Express**, and **MongoDB**.

---

## Features

### User Features
- **User Registration**: Users can register by providing their first name, last name, email, country, phone number and password.
- **Email Verification**: After registration, an email verification link is sent to the user's email.
- **Login**: Users can log in only after verifying their email.
- **Update Profile**: Users can update their personal information.
- **Password Change**: Users can change their password.

### Admin Features
- **User Management**: Admin can view all users, update user details, or reset passwords.
- **Email Verification Status**: Admin can check whether users have verified their email.

---

## Technologies Used

### Frontend
- **React.js**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for styling.

### Backend
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js**: A minimal and flexible Node.js web application framework.
- **MongoDB**: A NoSQL database for storing user data.
- **Mongoose**: A orm for mongodb
---

## Getting Started

### Prerequisites

- **Node.js**: Install Node.js from [here](https://nodejs.org/).
- **MongoDB**: use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Navigate to the backend folder and install dependencies:

```bash
cd backend
npm install
```

3. Set up environment variables for the backend. Create a `.env` file in the `backend` directory with the following values:

```
MONGODB_URI = <Your MongoDB URI>
EMAIL_USER = <Your Email Address>
EMAIL_PASS = <Your Email Password (app password created on google account, dont forget to enable two factor authentication)>
```

4. Start the backend server:

```bash
npm run start
```

5. Navigate to the frontend folder and install dependencies:

```bash
cd ../frontend
npm install
```

6. Set up environment variables for the frontend. Create a `.env` file in the `frontend/src` folder with:

```
REACT_APP_SITE_KEY_V2 = <Your reCAPTCHA Key> (for reCaptcha api from google)
```

7. Start the frontend server:

```bash
npm start
```

---

## Project Structure

```bash
├── backend
|   ├── config
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── server.js
│   └── .env
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── App.js
│   │   └── .env
│   └── tailwind.config.js
└── README.md
```

### Backend Structure
- **config**: Contains logic to connect to mongoDB
- **controllers**: Contains business logic for sending emails, verifying passwords.
- **models**: MongoDB models (User schema).
- **routes**: API routes for user and admin functionalities.
- **server.js**: Main file to set up the Express server.

### Frontend Structure
- **components**: Contains page-level components such as Login, Register, Admin Dashboard, Update Details, etc.

---

## API Endpoints

### User APIs
- **POST /register**: Registers a new user.
- **POST /login**: Logs in a user after verifying their credentials.
- **GET /verify/:token**: Verifies the user email via token.
- **POST /update-details/:id**: Updates user details.
- **POST /change-password/:id**: Changes the user password.
- **POST /resend-verification**: for resending the verification link to registered email
- **GET /get-details/:id**: to get detail of a user

### Admin API
- **GET /admin/get-users**: Fetches all registered users.

---

## Usage

### Running the Frontend
```bash
cd frontend
npm start
```

### Running the Backend
```bash
cd backend
npm start
```

### Sending Verification Email
Upon user registration, an email with a verification link will be sent. Once verified, the user can log in.

---

## License

This project is licensed under the MIT License.

---

## Contributors

- **Kamal Choudhary** - Full-Stack Developer

---

## Issues

If you find any issues or bugs, feel free to open an issue in this repository.
