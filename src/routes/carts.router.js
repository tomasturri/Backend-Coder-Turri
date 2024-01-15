const express = require('express');
const router = express.Router();
const CartManager = require('../controllers/CartManager');
const cartManager = new CartManager('../models/carrito.json');


// Ruta raíz POST /api/carts/
router.post('/', async (req, res) => {
    const cart = await cartManager.createCart();
    res.json(cart);
});

// Ruta GET /api/carts/:cid
router.get('/:cid', async (req, res) => {
    const cartId = parseInt(req.params.cid);
    const cart = await cartManager.getCartById(cartId);
    res.json(cart);
});

// Ruta POST /api/carts/:cid/product/:pid
router.post('/:cid/product/:pid', async (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    const { quantity } = req.body;

    const result = await cartManager.addToCart(cartId, productId, quantity);
    res.json(result);
});

module.exports = router;