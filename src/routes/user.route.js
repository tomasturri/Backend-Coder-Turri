const express = require('express');
const UserModel = require('../dao/models/user.model');
const router = express.Router();
const { createHash } = require('../utils/hashBcrypt');
const passport = require('passport');
const UserController = require('../controllers/UserController');
const userController = new UserController();
const { adminEmail, adminPassword } = require('../config/config');
const jwt = require('jsonwebtoken');
const UserDTO = require('../dto/UserDto');

const private_key = 'coderhouse';

const isAdmin = (req, res, next) => {
    const { email, password } = req.body;
    const adminUser = {
        username: 'admin',
        first_name: 'admin',
        last_name: 'admin',
        age: 'Private',
        email: adminEmail,
        password: adminPassword,
        role: 'admin',
    };

    if (email === adminEmail && password === adminPassword) {
        const token = jwt.sign(
            {
                first_name: adminUser.first_name,
                last_name: adminUser.last_name,
                email: adminUser.email,
                role: adminUser.role,
                age: adminUser.age,
            },
            private_key,
            {
                expiresIn: '1h',
            }
        );
        res.cookie('coderCookieToken', token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
        res.redirect('/products');
        return;
    }
    next();
};

// router.post(
//     '/',
//     passport.authenticate('register', {
//         failureRedirect: '/register',
//     }),
//     (req, res) => userController.register(req, res)
// );
router.post('/login', isAdmin, (req, res) => userController.login(req, res));
router.post('/register', (req, res) => userController.register(req, res));
router.get('/logout', (req, res) => userController.logout(req, res));
router.get('/current', (req, res) => userController.current(req, res));

// router.post('/',passport.authenticate('register',{
//     failureRedirect: '/failedregister'
// }), async(req, res)=>{
//     if(!req.user) return res.status(400).send({status: 'error', message: 'credenciales invalidas'});

//     res.redirect('/login');
// });

router.get('failedregister', (req, res) =>
    userController.failedRegister(req, res)
);

module.exports = router;