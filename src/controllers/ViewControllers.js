const ProductService = require('../services/ProductService');
const productService = new ProductService();
const CartService = require('../services/CartService');
const cartService = new CartService();
const jwt = require('jsonwebtoken');
const userModel = require('../dao/models/user.model.js');
const userDTO = require('../dto/UserDto');
const { adminEmail } = require('../config/config');
const UserDTO = require('../dto/UserDto');
class ViewController {
    async login(req, res) {
        {
            // if(req.session.login){
            // return res.redirect('/products');
            // }
            res.render('login', {
                style: '../css/style.css',
                title: 'Inicio Sesión',
            });
        }
    }

    async getAllProducts(req, res) {
        try {
            const limit = parseInt(req.query.limit) || 10;
            const page = parseInt(req.query.page) || 1;
            let result = await productService.getProducts(limit, page);
            const token = req.cookies.coderCookieToken;
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
            // if (!decoded.email === adminEmail) {
            //     const user = await userModel.findOne({ email: decoded.email });
            //     userDto = new userDTO(
            //         user.first_name,
            //         user.last_name,
            //         user.role,
            //         user.age,
            //         user.email
            //     );
            // } else {
            //     const adminUser = {
            //         username: 'admin',
            //         first_name: 'admin',
            //         last_name: 'admin',
            //         age: 'Private',
            //         email: adminEmail,
            //         role: 'admin',
            //     };
            //     userDto = new UserDTO(
            //         adminUser.first_name,
            //         adminUser.last_name,
            //         adminUser.role,
            //         adminUser.age,
            //         adminUser.email
            //     );
            // }
            const products = result.payload;
            res.render('index', {
                products,
                style: '../css/style.css',
                hasPrevPage: result.hasPrevPage,
                hasNextPage: result.hasNextPage,
                prevLink: result.prevLink,
                nextLink: result.nextLink,
                limit,
                user: userDto,
                title: 'Productos',
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getProductById(req, res) {
        try {
            const productId = req.params.cid;
            const product = await productService.getProductById(productId);
            if (!product) throw new Error('Producto no existente');
            const thumbnail0 = product.thumbnail[0];
            const thumbnail1 = product.thumbnail[1];
            const thumbnail2 = product.thumbnail[2];
            const thumbnail3 = product.thumbnail[3];

            const token = req.cookies.coderCookieToken;
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

            res.render('product', {
                product,
                thumbnail0,
                thumbnail1,
                thumbnail2,
                thumbnail3,
                user: userDto,
                style: '../css/style.css',
                title: 'Detalle de producto',
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getCartById(req, res) {
        try {
            const cartId = req.params.cid;
            const { products } = await cartService.getCartById(cartId);
            const token = req.cookies.coderCookieToken;
            const decoded = jwt.verify(
                token,
                'coderhouse'
            );
            console.log({ decoded });
            let userDto = new UserDTO(
                decoded.first_name,
                decoded.last_name,
                decoded.role,
                decoded.age,
                decoded.email
            );
            res.render('cart', {
                products,
                style: '../css/style.css',
                user: userDto,
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async realTimeProducts(req, res) {
        try {
            res.render('realTimeProducts', { style: './css/style.css' });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    async chat(req, res) {
        res.render('chat');
    }
}

module.exports = ViewController;