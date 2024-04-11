const CartService = require('../services/CartService');
const cartService = new CartService();
const ProductService = require('../services/ProductService');
const productService = new ProductService();

class CartController {
    async purchaseCart(req, res) {
        try {
            // const products= await cartService.getCartById(req.body.id);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getCartById(req, res) {
        try {
            const cartId = req.params.cid;
            const cart = await cartService.getCartById(cartId);
            res.status(200).json({ message: 'Carrito encontrado', cart: cart });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async createCart(req, res) {
        try {
            const cartSaved = cartService.createCart();
            res.status(201).json({
                message: 'Carrito creado correctamente',
                cart: cartSaved,
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async addProductToCart(req, res) {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const quantity = req.body.quantity;
        try {
            const { cart, productExists } = await cartService.addProductToCart(
                cartId,
                productId,
                quantity
            );
            if (productExists) {
                res.status(200).json({
                    message: 'El producto se actualizo en el carrito',
                });
            } else {
                res.status(201).json({
                    message: 'Producto agregado al carrito',
                    cart: cart,
                });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async updateQuantityByProduct(req, res) {
        try {
            const cartId = req.params.cid;
            const productId = req.params.pid;
            const quantity = req.body.quantity;
            const foundProduct = await productService.getProductById(productId);
            if (foundProduct === 'Producto no encontrado') {
                res.status(500).json({
                    message: 'El producto con el id ingresado no existe',
                });
                return;
            }
            const cart = await cartService.updateQuantityByProduct(
                cartId,
                productId,
                quantity
            );
            res.status(200).json({ cart });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async updateCartById(req, res) {
        try {
            const cartId = req.params.cid;
            const products = req.body;
            await manager.updateCartbyId(cartId, products);
            res.status(200).json({
                message: 'carrito actualizado correctamente',
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async deleteProductToCart(req, res) {
        const cartId = req.params.cid;
        const productId = req.params.pid;

        try {
            const foundProduct = await productService.getProductById(productId);
            if (foundProduct === 'Producto no encontrado') {
                res.status(500).json({
                    message: 'El producto con el id ingresado no existe',
                });
                return;
            }

            manager.deleteProductToCart(cartId, productId);
            res.status(204).json({
                message: 'producto eliminado correctamente',
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async deleteProductsByCart(req, res) {
        try {
            const cartId = req.params.cid;
            const cart = await manager.deleteProductsByCart(cartId);
            res.status(200).json({ cart });
        } catch (error) {
            res.status(500).json({ error: error.message });
            throw new Error({ error: error.message });
        }
    }
}

module.exports = CartController;