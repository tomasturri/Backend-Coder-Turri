const express = require('express');
const router = express.Router();
const ViewController = require('../controllers/ViewControllers');
const viewController = new ViewController();

// router.get('/', async (req, res) => {
//   if(req.session.login){
//     return res.redirect('/products');
//   }
//   res.render('login', {style: '../css/style.css', title: 'Inicio Sesión'});
// });

router.all(['/','/login'],(req, res) => viewController.login(req, res));

router.get('/products',(req,res)=> viewController.getAllProducts(req, res));

router.get('/products/:cid',(req,res)=> viewController.getProductById(req, res));

router.get('/carts/:cid',async(req,res)=> viewController.getCartById(req, res));

router.get('/realtimeproducts', async (req, res) => viewController.realTimeProducts(req, res));

router.get('/chat',(req,res)=> viewController.chat(req, res));

// router.get('/login',(req, res)=>{
//   if(req.session.login){
//     return res.redirect('/products');
//   }
//   res.render('login', {style: '../css/style.css', title: 'Inicio Sesión'});
// });

router.get('/register',(req, res) => {
  if(req.session.login){
    return res.redirect('/products');
  }
  res.render('register',  {style: '../css/style.css', title: 'Registro'});
});

module.exports = router;