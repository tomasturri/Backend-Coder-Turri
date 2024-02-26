const express = require('express');
const router = express.Router();
const CartManager = require('../dao/db/cart-manager-db');
const manager = new CartManager();
const ProductManager = require('../dao/db/product-manager-db');
const productManager = new ProductManager();

router.get('/carts', async (req, res) => {
  try {
    const carts = await manager;
    res.json(carts);
  } catch (error) {
    console.error('Fallo al obtener al carrito');
    res.json({ error: 'Error del servidor' });
  }
});

router.get('/carts/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await manager.getCartById(cartId);
    res.status(200).json({ message: 'Carrito encontrado', cart: cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/carts', async (req, res) => {
  try {
    const cartSaved = manager.createCart();
    res.status(201).json({ message: 'Carrito creado correctamente', cart: cartSaved });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/carts/:cid/products/:pid', async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = req.body.quantity;

  try {
  // verificamos que el id pasado sea correcto
  const foundProduct = await productManager.getProductById(productId);
  // if (foundProduct === 'Producto no encontrado') {
  //   res.status(500).json({ message: 'El producto con el id ingresado no existe' });
  //   return;
  // }

    const cart = await manager.addProductToCart(cartId, productId, quantity);
    res.status(201).json({ message: 'Producto agregado al carrito', cart: cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/carts/:cid/products/:pid', async(req,res)=>{
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity;
    const foundProduct = await productManager.getProductById(productId);
    if (foundProduct === 'Producto no encontrado') {
      res.status(500).json({ message: 'El producto con el id ingresado no existe' });
      return;
    }
    const cart = await manager.updateQuantityByProduct(cartId, productId, quantity);
    res.status(200).json({cart});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});


router.delete('/carts/:cid/products/:pid', async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;

  try {
  const foundProduct = await productManager.getProductById(productId);
  if (foundProduct === 'Producto no encontrado') {
    res.status(500).json({ message: 'El producto con el id ingresado no existe' });
    return;
  }
  
  manager.deleteProductToCart(cartId,productId);
  res.status(204).json({message: 'producto eliminado correctamente'});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/carts/:cid',async(req,res)=>{
  try {
    const cartId = req.params.cid;
    const products = req.body;
    await manager.updateCartbyId(cartId, products);
    res.status(200).json({message: 'carrito actualizado correctamente'});
  } catch (error) {
    res.status(500).json({message: error.message})
  }
});

router.delete('/carts/:cid',async(req,res)=>{
  try {
    const cartId = req.params.cid;
    const cart = await manager.deleteProductsByCart(cartId);
    res.status(200).json({cart});
  } catch (error) {
    res.status(500).json({error:error.message})
    throw new Error({error: error.message});
  }
});

module.exports = router;