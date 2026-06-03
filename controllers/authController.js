// =============================================
//  controllers/authController.js
//  Handles: Register & Login
// =============================================

const jwt  = require('jsonwebtoken');
const User = require('../models/User');

// Helper: generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

// ---- @POST /api/auth/register ----
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already in use' });
    }

    // Create new user (password hashed inside User model via pre-save hook)
    const user = await User.create({ name, email, password });

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      token: generateToken(user._id),
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---- @POST /api/auth/login ----
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Compare entered password with hashed password in DB
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    res.json({
      success: true,
      message: 'Login successful',
      token: generateToken(user._id),
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---- @GET /api/auth/me ----
const getMe = async (req, res) => {
  // req.user is set by the protect middleware
  res.json({ success: true, user: req.user });
};

module.exports = { register, login, getMe };
