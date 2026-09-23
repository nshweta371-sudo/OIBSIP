# Login Authentication System

## 📌 Project Overview

This project is a simple client-side Login Authentication System developed as part of the Oasis Infobyte Web Development Internship – Level 2, Task 4.

The application provides user registration, login validation, protected dashboard access and logout functionality.

---

## 🎯 Objective

The objective of this project is to create an authentication system with:

- User registration
- Password validation
- Duplicate user checking
- Login validation
- Protected dashboard
- Logout functionality
- Password hashing
- Basic form validation

---

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript
- Browser localStorage
- Web Crypto API

---

## ✨ Features

### Registration

Users can register using:

- Username
- Email
- Password
- Confirm Password

### Password Validation

The password must:

- Contain at least 8 characters
- Contain at least one number

### Duplicate User Check

The application checks whether the username or email already exists before creating a new account.

### Login

Users can log in using their registered email and password.

### Incorrect Credentials

An error message is displayed when incorrect credentials are entered without revealing which field is incorrect.

### Protected Dashboard

The dashboard can only be accessed after successful login.

Users attempting to access the dashboard without a valid session are redirected to the login page.

### Logout

The logout button clears the current login session and redirects the user to the login page.

### Password Hashing

Passwords are hashed using SHA-256 before being stored in localStorage.

### Form Validation

Empty form submissions are prevented on both registration and login pages.

---

## 📂 Project Structure

```text
WebDev-L2-LoginAuth
│
├── index.html
├── register.html
├── dashboard.html
├── style.css
├── script.js
└── README.md