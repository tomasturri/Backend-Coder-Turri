const express = require('express');
const router = express.Router();
const CartManager = require('../dao/db/cart-manager-db');
const manager = new CartManager();
const ProductManager = require('../dao/db/product-manager-db');
const productManager = new ProductManager();
const CartController = require('../controllers/CartController');
const cartController = new CartController();

router.get('/carts', async (req, res) => {
    try {
        const carts = await manager;
        res.json(carts);
    } catch (error) {
        console.error('Fallo al obtener el carrito');
        res.json({ error: 'Error del servidor' });
    }
});
router.get('/carts/:cid', (req, res) => cartController.getCartById(req, res));
router.post('/carts', (req, res) => cartController.createCart(req, res));
router.post('/cart/:cid/purchase', (req, res) =>
    cartController.purchaseCart(req, res)
);
router.post('/carts/:cid/products/:pid', (req, res) =>
    cartController.addProductToCart(req, res)
);
router.put('/carts/:cid/products/:pid', (req, res) =>
    cartController.updateQuantityByProduct(req, res)
);
router.put('/carts/:cid', (req, res) =>
    cartController.updateCartById(req, res)
);
router.delete('/carts/:cid/products/:pid', (req, res) =>
    cartController.deleteProductToCart(req, res)
);
router.delete('/carts/:cid', (req, res) =>
    cartController.deleteProductsByCart(req, res)
);

module.exports = router;

//