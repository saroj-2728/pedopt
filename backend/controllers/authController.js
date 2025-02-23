const User = require('../models/User')
const bcrypt = require('bcrypt');

// Register a new user
const registerUser = async (req, res) => {
    const { name, username, address, phone, password } = req.body;

    // Validate input
    if (!username || !password || !name || !phone || !address) {
        return res.status(400).json({ error: 'Invalid input! Please fill out all the forms' });
    }

    try {
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this username already exists' });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create the user
       await User.create({ name, username, address,  phone, password: hashedPassword });

        res.status(201).json({
            success: true,
            message: 'Sign up successful'
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to sign up. Please try again!' });
    }
};


// Login an existing user
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            error: 'Username and password are required'
        });
    }

    try {
        const user = await User.findOne({
            where: { username }
        });
        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        // Verify the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                error: 'Invalid credentials'
            });
        }

        // Remove password before sending to frontend
        delete user.dataValues.password;

        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: user.dataValues
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Login failed. Please try again!' });
    }
};

module.exports = { loginUser, registerUser }