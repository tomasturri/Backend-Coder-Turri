const express = require("express");
const router = express.Router();
const { ProductManager } = require("../controllers/ProductManager");
const path = require("path");
const filePath = path.join(__dirname, '../models/productos.json');
const productManager = new ProductManager(filePath);

router.get('/', (req, res) => {
  res.send('¡Bienvenido a la aplicación!');
});

// Ruta para agregar un nuevo producto
router.post('/', async (req, res) => {
  try {
    const { title, description, code, price, status, stock, category } = req.body;

    // Generar un nuevo ID único (puedes implementar tu lógica específica aquí)
    const newProductId = await productManager.generateUniqueId();

    // Crear el nuevo producto
    const newProduct = {
      id: newProductId,
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
    };

    // Agregar el nuevo producto al archivo
    await productManager.addProduct(newProduct);

    res.status(201).json(newProduct); // 201: Created
  } catch (error) {
    console.error('Error al agregar un nuevo producto:', error.message);
    res.status(500).json({ error: 'Error al agregar un nuevo producto' });
  }
});

// Ruta para actualizar un producto existente
router.put('/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const { title, description, code, price, status, stock, category } = req.body;

    // Obtener el producto existente por ID
    const existingProduct = await productManager.getProductById(productId);

    if (existingProduct) {
      // Actualizar los campos del producto con los valores proporcionados desde el body
      existingProduct.title = title;
      existingProduct.description = description;
      existingProduct.code = code;
      existingProduct.price = price;
      existingProduct.status = status;
      existingProduct.stock = stock;
      existingProduct.category = category;

      // Guardar el producto actualizado en el archivo
      await productManager.updateProduct(existingProduct);

      res.json(existingProduct);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar el producto:', error.message);
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
});

// Ruta para eliminar un producto por ID
router.delete('/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);

    // Eliminar el producto por ID
    await productManager.deleteProduct(productId);

    res.json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el producto:', error.message);
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
});

module.exports = router;
