const jwt = require('jsonwebtoken');

const authMiddleware = () => {
    return (req, res, next) => {
        const token = req.headers['authorization']?.split(' ')[1] || req.cookies.token; 

        if (!token) return res.sendStatus(401); 

        // Verify the token
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return res.sendStatus(403); 
            req.user = user; 
            next();
        });
    };
};
 
module.exports = authMiddleware;