
const express = require('express');
const { ProductManager } = require('./ProductManager.js');

const app = express();
const PORT = 8080;

const productManager = new ProductManager();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('¡Bienvenido a la aplicación!');
});

app.get('/products', async (req, res) => {
  try {
    const limit = req.query.limit;
    const products = await productManager.getAllProducts(limit);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

app.get('/products/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const product = await productManager.getProductById(productId);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor Express iniciado en http://localhost:${PORT}`);
});
