const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Helper function to generate JWT
const generateToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// Sign Up
exports.signUp = async (req, res) => {
    const { username, password, name, avatar } = req.body;

    try {
        // Check if username already exists
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create new user
        user = new User({
            username,
            password: hashedPassword,
            name,
            avatar
        });

        // Save user to the database
        await user.save();

        // Generate JWT token
        const token = generateToken(user);

        // Respond with the token and user info
        res.status(201).json({
            token,
            user: { name: user.name, avatar: user.avatar }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error signing up user', error: error.message });
    }
};

// Sign In
exports.signIn = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Compare entered password with hashed password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = generateToken(user);

        // Respond with token and user info
        res.status(200).json({
            token,
            user: { name: user.name, avatar: user.avatar }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error signing in user', error: error.message });
    }
};

// Update Profile
exports.updateProfile = async (req, res) => {
    const { name, avatar } = req.body;
    const userId = req.user.id; // Get user id from the token

    try {
        // Find user by id
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update name and avatar if provided
        user.name = name || user.name;
        user.avatar = avatar || user.avatar;

        // Save updated user profile to the database
        await user.save();

        // Respond with updated user info
        res.status(200).json({ name: user.name, avatar: user.avatar });
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile', error: error.message });
    }
};
