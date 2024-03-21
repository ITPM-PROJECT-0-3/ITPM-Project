const express = require('express');
const authenticate = require('../middlewares/authenticate'); // Ensure this path matches your project structure
const UserController = require('../controllers/UserController'); // Adjust the path as necessary

const router = express.Router();

// Route for user registration
router.post('/register', UserController.registerUser);

// Route for user login
router.post('/login', UserController.loginUser);

// Route to get user profile (Protected)
router.get('/profile', authenticate, UserController.getUserProfile);

// Route to update user profile (Protected)
router.put('/profile', authenticate, UserController.updateUserProfile);

// Route to delete user (Protected)
router.delete('/delete', authenticate, UserController.deleteUser);

module.exports = router;
