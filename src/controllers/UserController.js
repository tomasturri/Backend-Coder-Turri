const UserModel = require('../dao/models/user.model.js');
const generateToken = require('../utils/Jwt.js');
const { createHash, isValidPassword } = require('../utils/hashBcrypt.js');
const jwt = require('jsonwebtoken');
const { adminEmail } = require('../config/config');
const private_key = 'coderhouse';
const UserDTO = require('../dto/UserDto');
const CartManager = require('../dao/db/cart-manager-db');
const cartManager = new CartManager();

class UserController {
    async register(req, res) {
        const { email, password, first_name, last_name, age } = req.body;

        // if (!req.user)
        //     return res
        //         .status(400)
        //   .send({ status: 'error', message: 'Credenciales invalidas' });

        const userExist = await UserModel.findOne({ email });
        if (userExist) {
            return res.status(400).json({
                message: 'el usuario ya existe',
            });
        }
        const newCart = await cartManager.createCart();

        const newUser = new UserModel({
            email,
            password: createHash(password),
            first_name,
            last_name,
            age,
            role: 'user',
            cart: newCart._id,
        });

        await newUser.save();
        const token = jwt.sign(
            {
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                email: newUser.email,
                role: newUser.role,
                age: newUser.age,
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
        // res.json({ message: 'registrado correctamente' });
        res.redirect('/products');
    }

    async login(req, res) {
        const { email, password } = req.body;
        console.log(typeof email, email);
        console.log(typeof adminEmail, adminEmail);
        let userExist;
        if (email != adminEmail) {
            userExist = await UserModel.findOne({ email });
            if (!userExist) {
                return res.status(400).json({
                    message: 'credenciales invalidas',
                });
            }

            if (!isValidPassword(password, userExist)) {
                return res.status(400).json({
                    message: 'credenciales invalidas',
                });
            }

            const token = jwt.sign(
                {
                    first_name: userExist.first_name,
                    last_name: userExist.last_name,
                    email: userExist.email,
                    role: userExist.role,
                    age: userExist.age,
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

            const cartId = userExist.cart.toString();
            res.cookie('cart', cartId, {
                maxAge: 24 * 60 * 60 * 1000,
            });
        }
        // res.json({ message: 'logeado correctamente' });
        res.redirect('/products');
    }

    async current(req, res) {
        const token = req.cookies.coderCookieToken;
        if (token) {
            const decoded = jwt.verify(
                token,
                'coderhouse'
            );
            let userDto = new UserDTO(
                decoded.first_name,
                decoded.last_name,
                decoded.role,
                decoded.age,
                decoded.email
            );
            res.json({ user: userDto });
            return;
        }
        res.json({ user: null });
    }

    async logout(req, res) {
        res.clearCookie('coderCookieToken');
        res.redirect('/login');
    }

    async failedRegister(req, res) {
        res.json({ message: 'registro fallido' });
    }
}

module.exports = UserController;