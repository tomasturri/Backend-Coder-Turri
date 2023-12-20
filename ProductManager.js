const fs = require('fs/promises');

class ProductManager {
  async getAllProducts(limit) {
    try {
      const data = await fs.readFile('productos.json', 'utf8');
      const products = JSON.parse(data);

      if (limit) {
        return products.slice(0, parseInt(limit));
      } else {
        return products;
      }
    } catch (error) {
      throw error;
    }
  }

  async getProductById(productId) {
    try {
      const data = await fs.readFile('productos.json', 'utf8');
      const products = JSON.parse(data);

      return products.find(product => product.id === productId);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = { ProductManager };




