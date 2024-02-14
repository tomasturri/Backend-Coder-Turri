const fs = require('fs');

class CartManager {
  static lastId = 0;
  constructor(path) {
    this.carts = [];
    this.path = path;
    this.id = 0;
  }

  async createCart() {
    this.carts = await this.readFile();
    const lastIdSaved = await this.getLastId();
    CartManager.lastId = lastIdSaved + 1;

    const newCart = {
      id: CartManager.lastId,
      products: [],
    };

    this.carts.push(newCart);
    this.saveCart();
    return newCart;
  }

  async getCartById(id) {
    const carts = await this.readFile();
    const cart = carts.find((cart) => cart.id === id);
    if (cart) {
      return cart;
    } else {
      throw new Error('Carrito no encontrado');
    }
  }

  async addProductToCart(cartId, productId, quantity = 1) {
    try {
      this.carts = await this.readFile();
      const cart = await this.getCartById(cartId);

      const product = cart.products.find((product) => {
        return product.productId === productId;
      });

      if (!product) {
        cart.products.push({ productId: productId, quantity: quantity });
      } else {
        product.quantity += quantity;
      }
      const carts = await this.readFile();
      const index = this.carts.findIndex((cart) => cart.id === cartId);
      this.carts[index] = cart;

      await this.saveCart();
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getLastId() {
    const carts = this.carts;
    return carts.length > 0 ? Math.max(...carts.map((cart) => cart.id)) : 0;
  }

  async readFile() {
    try {
      const response = fs.readFileSync(this.path, 'utf-8');
      const arrayCarts = JSON.parse(response);
      return arrayCarts;
    } catch (error) {
      throw new Error('Error al leer el archivo', error);
    }
  }

  async saveCart() {
    try {
      const objetoJSON = JSON.stringify(this.carts, null, 2);
      fs.writeFileSync(this.path, objetoJSON);
    } catch (error) {
      throw new Error('Error al guardar el archivo', error);
    }
  }
}

module.exports = CartManager;