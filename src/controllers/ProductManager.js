const fs = require('fs/promises');
const path = require('path');

class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async getAllProducts(limit) {
    try {
      const data = await fs.readFile(this.filePath, 'utf8');
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
      const data = await fs.readFile(this.filePath, 'utf8');
      const products = JSON.parse(data);

      return products.find(product => product.id === productId);
    } catch (error) {
      throw error;
    }
  }
}


const filePath = path.join(__dirname, '../models/productos.json');
const productManager = new ProductManager(filePath);

module.exports = { ProductManager };




