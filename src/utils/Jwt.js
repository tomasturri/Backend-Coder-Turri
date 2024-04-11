const jwt = require('jsonwebtoken');
const private_key = 'coderhouse';

const generateToken = (user) => {
    const token = jwt.sign(user, private_key, { expiresIn: '24h' });
    return token;
};

module.exports = generateToken;

//coderhouse