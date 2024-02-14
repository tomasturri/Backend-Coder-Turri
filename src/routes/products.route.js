const express = require('express');
const router = express.Router();
const ProductManager = require('../dao/db/product-manager-db');
const manager = new ProductManager();

// get para productos con limit
router.get('/products', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const queryParam = req.query.query || null
    const query =queryParam ? JSON.parse(queryParam) : {};
    const sort = parseInt(req.query.sort) || null;
    const products = await manager.getProducts(limit, page, query, sort);
    res.json({
      status: 'success',
      ...products
    })
    
  } catch (error) {
    res.status(500).json('Error interno del servidor: '+ error);
  }
});

// get para un producto especifico
router.get('/products/:pid', async (req, res) => {
  try {
    const id = req.params.pid;
    const found = await manager.getProductById(id);
    if (found) {
      return res.send(found);
    } else {
      res.status(404).json({ error: 'El producto no existe' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// router.get('/realtimeproducts', (req, res) => {
//   console.log('hola');
//   res.render('index');
// });

router.post('/products', async (req, res) => {
  try {
    const productReq = req.body;
    const product = await manager.addProduct(productReq);
    res.status(201).json({ message: 'Producto agregado correctamente', product: product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/products/:pid', async (req, res) => {
  try {
    const id = req.params.pid;
    const productUpdate = await manager.updateProduct(id, req.body);
    res.status(200).json({ message: 'Producto actualizado correctamente', product: productUpdate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/products/:pid', async (req, res) => {
  try {
    const id = req.params.pid;
    const deletedProduct = await manager.deleteProduct(id);
    res.status(200).json({ message: 'Producto eliminado correctamente', product: deletedProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;