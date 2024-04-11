// importamos file sytem
const fs = require('fs');

class ProductManager {
  static lastId = 0;
  // Constructor
  constructor(path) {
    this.products = [];
    this.path = path;
  }
  // método de agregar producto
  async addProduct(product) {
    const {
      title,
      description,
      price,
      status = true,
      category,
      thumbnail = 'Sin imagen',
      code,
      stock,
    } = product;

    this.products = await this.readFile();

    // validamos que todos los campos sean obligatorios
    if (!title || !description || !price || !thumbnail || !code || !stock || !category) {
      throw new Error('Todos los campos son obligatorios!!');
    }
    // validamos que el campo code no este repetido
    if (this.products.some((product) => product.code === code)) {
      throw new Error('El código debe ser único');
    }

    //obtenemos el ultimo id y lo asignamos a la clase
    const lastIdSaved = await this.getLastId();
    ProductManager.lastId = lastIdSaved + 1;

    //creamos productos para probar las clases
    const newProduct = {
      id: ProductManager.lastId,
      title: title,
      status: status,
      category: category,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
    };

    // agregamos el nuevo producto al array
    this.products.push(newProduct);

    // agregamo el nuevo producto al archivo
    await this.saveFile(this.products);
    return newProduct;
  }

  // método get productos
  getProducts() {
    return this.products;
  }

  // método getProductById
  async getProductById(idParam) {
    try {
      const products = await this.readFile();
      const found = products.find((item) => item.id === idParam);
      return found || 'Producto no encontrado';
    } catch (error) {
      console.log('Problemas al leer el archivo ', error);
    }
  }

  //función para leer archivos
  async readFile() {
    try {
      // convertimos
      const response = fs.readFileSync(this.path, 'utf-8');
      // convertimos la respuesta en un objeto de JavaScript
      const productsArray = JSON.parse(response);
      return productsArray;
    } catch (error) {
      console.log('Error al leer el archivo ', error);
    }
  }

  async saveFile(array) {
    try {
      // convertimos el array en una cadena en formato JSON
      const objetoJSON = JSON.stringify(array, null, 2);
      fs.writeFileSync(this.path, objetoJSON);
    } catch (error) {
      console.log(console.log('error al guardar el array '), error);
    }
  }

  // actualizar producto
  async updateProduct(idParam, productUpdate) {
    try {
      const products = await this.readFile();
      const index = products.findIndex((i) => i.id == idParam);
      if (index != -1) {
        products.splice(index, 1, productUpdate);
        await this.saveFile(products);
        return productUpdate;
      } else {
        throw new Error('El id ingresado no fue encontrado');
      }
    } catch (error) {
      throw new Error('Error al actualizar el producto', error);
    }
  }

  // eliminar producto
  async deleteProduct(idParam) {
    try {
      let products = await this.readFile();
      const index = products.findIndex((i) => i.id == idParam);
      if (index !== -1) {
        const deletedProduct = products.splice(index, 1)[0];
        await this.saveFile(products);
        return deletedProduct;
      } else {
        throw new Error('El id ingresado no fue encontrado');
      }
    } catch (error) {
      throw new Error('El id ingresado no es correcto');
    }
  }

  async getLastId() {
    const products = await this.readFile();
    return products.length > 0 ? Math.max(...products.map((product) => product.id)) : 0;
  }
}

module.exports = ProductManager;
