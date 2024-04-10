const jwt = require('jsonwebtoken');

const checkUserRole = (allowedRoles) => (req, res, next) => {
    const token = req.cookies.coderCookieToken;
    if (token) {
        jwt.verify(
            token,
            'coderhouse',
            (err, decoded) => {
                if (err) {
                    return res.status(401).json({ error: 'Unauthorized' });
                }
                if (allowedRoles.includes(decoded.role)) {
                    // verificamos que el arreglo contenga admin
                    next();
                } else {
                    return res.status(403).json({ error: 'Unauthorized' });
                }
            }
        );
    }
};

module.exports = checkUserRole;