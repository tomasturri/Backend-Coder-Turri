const ProductService = require('../services/ProductService');
const productService = new ProductService();
const CartService = require('../services/CartService');
const cartService = new CartService();


class ViewController {

    async login(req, res){
        {
            if(req.session.login){
              return res.redirect('/products');
            }
            res.render('login', {style: '../css/style.css', title: 'Inicio Sesión'});
          }
    }

    async getAllProducts(req, res){
        try {
            const limit = parseInt(req.query.limit) || 10;
            const page = parseInt(req.query.page) || 1;
            let result = await productService.getProducts(limit, page);
            const products = result.payload;
            res.render('index', {
              products,
              style: '../css/style.css',
              hasPrevPage: result.hasPrevPage,
              hasNextPage: result.hasNextPage,
              prevLink: result.prevLink,
              nextLink: result.nextLink,
              limit,
              user: req.session.user,
              title: 'Productos'
            });
          } catch (error) {
            res.status(500).json({error: error.message});
          }
      }
    async getProductById(req, res){
        try {
          const productId = req.params.cid;
          const product = await productService.getProductById(productId);
          if(!product) throw new Error('Producto no existente');
          const thumbnail0 = product.thumbnail[0];
          const thumbnail1 = product.thumbnail[1];
          const thumbnail2 = product.thumbnail[2];
          const thumbnail3 = product.thumbnail[3];
          res.render('product',{
            product,thumbnail0, thumbnail1,thumbnail2, thumbnail3, style: '../css/style.css', title: 'Detalle de producto'});
        } catch (error) {
          res.status(500).json({error: error.message});
        }
      }

    async getCartById(req, res){
        try {
            const cartId = req.params.cid;
            const {products} = await cartService.getCartById(cartId);
            console.log(products);
            res.render('cart',{products, style: '../css/style.css',});
          } catch (error) {
            res.status(500).json({error: error.message});
          }
    }
    
    async realTimeProducts(req, res) {
        try {
            res.render('realTimeProducts', {style: './css/style.css'});
          } catch (error) {
            res.status(500).json({ error: error });
          }
    }

    async chat(req, res){
      res.render("chat");
    }
}

module.exports = ViewController;