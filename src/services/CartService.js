const CartModel = require("../dao/models/cart.model");

class CartService {

    constructor() {
        this.carts = [];
    }
    async createCart(){
        try {
            const newCart = new CartModel({products: []});
            await newCart.save();
            return newCart;
        } catch (error) {
            throw new Error('Error al crear un nuevo carrito', error);
        }
    }
    async getCartById(id){
    try {
        const cart = await CartModel.findById(id).populate('products.product');
        if(!cart) throw new Error('no existe el carrito con el id solicitado');
        return cart;
    } catch (error) {
        throw new Error(error);
    }
    }
    async addProductToCart(id, productId, quantity = 1){
        try {
            const cart = await this.getCartById(id);
            const productExists = cart.products.find(item => item.product.toString() === productId);
            if(productExists){
                productExists.quantity += quantity;
            }else {
                cart.products.push({product: productId, quantity});
            }
            cart.markModified('products');
            await cart.save();
            return cart;
        } catch (error) {
            throw new Error('error al agregar producto en el cart', error);
        }
    }
    async deleteProductToCart(cartId, productId) {
        try {
            const cart = await this.getCartById(cartId);
            const productIndex = cart.products.findIndex(item => item.product.toString() === productId);
            if (productIndex !== -1) {
                // Si se encuentra el producto, eliminarlo del array
                cart.products.splice(productIndex, 1);
                cart.markModified('products');
                await cart.save();
            }else {
                throw new Error('El producto no existe en el carrito');
                }
        } catch (error) {
            throw new Error('error al eliminar producto en el cart ', error);
        }
    }
    async updateCartbyId(cartId, products){
        try {
            const cart = await this.getCartById(cartId);
            cart.products = products;
            cart.markModified('products');
            await cart.save();
        } catch (error) {
            throw new Error('Error al actualizar el carrito ', error);
        }
    }
    async updateQuantityByProduct(cartId, productId, quantity){
        try {
            const cart = await this.getCartById(cartId);
            const productExists = cart.products.find(item => item.product.toString() === productId);
            if(productExists){
                productExists.quantity = quantity;
            }else {
                throw new Error('Producto no existe');
            }
            cart.markModified('products');
            await cart.save();
            return cart;
        } catch (error) {
            throw new Error('Error al actualizar la cantidad de productos', error);
        }
    }
    async deleteProductsByCart(cartId){
        try {
            const cart = await this.getCartById(cartId);
            cart.products = [];
            cart.markModified('products');
            await cart.save();
            return cart;
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = CartService;
