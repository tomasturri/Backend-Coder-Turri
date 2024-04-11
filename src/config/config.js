const dotenv = require('dotenv');

const program = require('../utils/commander.js');

const { mode } = program.opts();

dotenv.config({
    path: mode === 'production' ? './.env.production' : './.env.development',
});

const configObject = {
    mongo_url: process.env.MONGO_URL,
    adminEmail: process.env.ADMIN_EMAIL,
    adminPassword: process.env.ADMIN_PASSWORD,
    PUERTO: process.env.PUERTO,
};

module.exports = configObject;.