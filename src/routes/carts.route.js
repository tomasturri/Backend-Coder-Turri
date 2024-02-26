const express = require('express');
const router = express.Router();
const CartManager = require('../dao/db/cart-manager-db');
const ProductManager = require('../dao/db/product-manager-db');
const cartManager = new CartManager();
const productManager = new ProductManager();

// Crear carrito
router.post('/carts', async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.status(201).json({ message: 'Carrito creado correctamente', cart: newCart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener id del carrito creado y agregar productos
router.post('/carts/:cartId/products', async (req, res) => {
    const cartId = req.params.cartId;
    const productId = req.body.productId;
    const quantity = req.body.quantity;

    try {
        // Verificar si el producto existe
        const product = await productManager.getProductById(productId);
        
        // Agregar producto al carrito
        const updatedCart = await cartManager.addProductToCart(cartId, productId, quantity);
        
        res.status(200).json({ message: 'Producto agregado al carrito', cart: updatedCart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Agregar productos al carrito creado
router.put('/carts/:cartId/products/:productId', async (req, res) => {
    const cartId = req.params.cartId;
    const productId = req.params.productId;
    const quantity = req.body.quantity;

    try {
        // Verificar si el producto existe
        const product = await productManager.getProductById(productId);
        
        // Editar cantidad del producto en el carrito
        const updatedCart = await cartManager.updateQuantityByProduct(cartId, productId, quantity);
        
        res.status(200).json({ message: 'Cantidad del producto editada en el carrito', cart: updatedCart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Traer todos los productos de un carrito
router.get('/carts/:cartId/products', async (req, res) => {
    const cartId = req.params.cartId;

    try {
        const cart = await cartManager.getCartById(cartId);
        const products = cart.products;
        
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar un producto del carrito
router.delete('/carts/:cartId/products/:productId', async (req, res) => {
    const cartId = req.params.cartId;
    const productId = req.params.productId;

    try {
        // Eliminar producto del carrito
        await cartManager.deleteProductFromCart(cartId, productId);
        
        res.status(204).json({ message: 'Producto eliminado del carrito' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;