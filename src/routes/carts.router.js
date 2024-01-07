const express = require("express");
const router = express.Router();
const { ProductManager } = require("../controllers/ProductManager.js");
const path = require("path");

const filePath = path.join(__dirname, '../models/productos.json');
const productManager = new ProductManager(filePath);

// Rutas
router.get("/carts", async (req, res) => {
  try {
    const products = await productManager.getAllProducts();
    res.json(products);
  } catch (error) {
    console.error('Error al obtener los productos para el carrito:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
