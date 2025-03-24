const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]; // Extract token
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token

            req.user = await User.findById(decoded.id).select('-password'); // Attach user data to request

            next();
        } catch (error) {
            res.status(401).json({ message: 'Unauthorized, invalid token' });
        }
    } else {
        res.status(401).json({ message: 'Unauthorized, no token provided' });
    }
};
