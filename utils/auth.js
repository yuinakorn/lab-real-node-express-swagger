import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Function to generate JWT
export const generateToken = (userId, username) => {
    return jwt.sign({ id: userId, sub: username }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
};

// Function to authenticate JWT
export const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No Token Provided' });
    }
    try {
        // Verify token and decode information
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded; // Store user information in request object
        next(); // Call the next middleware or route handler
    } catch (error) {
        return res.status(403).json({ message: 'Invalid Token' });
    }
};