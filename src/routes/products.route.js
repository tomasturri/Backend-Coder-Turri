const express = require('express');
const router = express.Router();
const ProductManager = require('../dao/db/product-manager-db');
const ProductController = require('../controllers/ProductController');
const productController = new ProductController() ;

router.get('/products', (req,res) => productController.getProducts(req,res));
router.get('/products/:pid', (req, res) => productController.getProductById(req, res));
router.post('/products', (req,res) => productController.addProduct(req, res));
router.put('/products/:pid', (req, res) => productController.updateProduct(req, res));
router.delete('/products/:pid', (req, res) => productController.deleteProduct(req, res));

module.exports = router;

// router.get('/realtimeproducts', (req, res) => {
//   console.log('hola');
//   res.render('index');
// });