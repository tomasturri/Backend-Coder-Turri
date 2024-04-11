const ProductService = require('../services/ProductService');
const productService = new ProductService();
.
class ProductController {
    async getProducts(req, res){
        try {
            const limit = parseInt(req.query.limit) || 10;
            const page = parseInt(req.query.page) || 1;
            const queryParam = req.query.query || null
            const query =queryParam ? JSON.parse(queryParam) : {};
            const sort = parseInt(req.query.sort) || null;
            const response = await productService.getProducts(limit, page, query, sort);
            res.json({
                status: 'success',
                ...response
              })
          } catch (error) {
            res.status(500).json('Error interno del servidor: '+ error.message);
          }
    }
    async getProductById(req, res){
        try {
            const id = req.params.pid;
            const found = await productService.getProductById(id);
            if (found) {
              return res.send(found);
            } else {
              res.status(404).json({ error: 'El producto no existe' });
            }
        }catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
    async addProduct(req, res){
        try {
            const productReq = req.body;
            const product = await productService.addProduct(productReq);
            res.status(201).json({ message: 'Producto agregado correctamente', product: product });
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
    }
    async updateProduct(req, res){
        try {
            const id = req.params.pid;
            const productUpdate = await productService.updateProduct(id, req.body);
            res.status(200).json({ message: 'Producto actualizado correctamente', product: productUpdate });
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
    }
    async deleteProduct(req, res){
        try {
            const id = req.params.pid;
            const deletedProduct = await productService.deleteProduct(id);
            res.status(200).json({ message: 'Producto eliminado correctamente', product: deletedProduct });
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
    }
}

module.exports = ProductController;