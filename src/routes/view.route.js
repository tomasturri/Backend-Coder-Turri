const express = require('express');
const router = express.Router();
const ProductManager = require('../dao/db/product-manager-db');
const productManager = new ProductManager('');
const CartManager = require('../dao/db/cart-manager-db');
const cartManager = new CartManager('');

router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const page = parseInt(req.query.page) || 1;
    let result = await productManager.getProducts(limit, page);
    const products = result.payload;
    res.render('index', {
      products,
      style: '../css/style.css',
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.prevLink,
      nextLink: result.nextLink,
      limit
    });
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

router.get('/products',async(req,res)=>{
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    let result = await productManager.getProducts(limit, page);
    const products = result.payload;
    res.render('index', {
      products,
      style: '../css/style.css',
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.prevLink,
      nextLink: result.nextLink,
      limit
    });
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

router.get('/products/:cid',async(req,res)=>{
  try {
    const productId = req.params.cid;
    const product = await productManager.getProductById(productId);
    console.log(product);
    if(!product) throw new Error('Producto no existente');
    const thumbnail0 = product.thumbnail[0];
    const thumbnail1 = product.thumbnail[1];
    const thumbnail2 = product.thumbnail[2];
    const thumbnail3 = product.thumbnail[3];
    res.render('product',{
      product,thumbnail0, thumbnail1,thumbnail2, thumbnail3, style: '../css/style.css'});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

router.get('/carts/:cid',async(req,res)=>{
  try {
    const cartId = req.params.cid;
    const {products} = await cartManager.getCartById(cartId);
    console.log(products);
    res.render('cart',{products, style: '../css/style.css',});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

router.get('/realtimeproducts', async (req, res) => {
  try {
    res.render('realTimeProducts', {style: './css/style.css'});
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get('/chat',(req,res)=>{
  res.render("chat");
});

module.exports = router;