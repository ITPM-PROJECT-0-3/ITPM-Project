const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'yourSecretKey';

const authenticate = (req, res, next) => {
    // Get the token from the Authorization header
    const token = req.header('Authorization')?.split(' ')[1]; // Authorization: Bearer TOKEN

    // If no token is found, return an error
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied.' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // Attach the decoded user to the request object
        req.user = decoded.user;
        
        next(); // Move to the next middleware or route handler
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid.' });
    }
};

module.exports = authenticate;
