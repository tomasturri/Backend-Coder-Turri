const ProductModel = require("../models/product.model");

class ProductManager {
    async addProduct(product) {
        try {
            const {
                title,
                description,
                price,
                status = true,
                category,
                thumbnail = 'Sin imagen',
                code,
                stock,
            } = product;
        
            if (!title || !description || !price || !thumbnail || !code || !stock || !category) {
                throw new Error('Todos los campos son obligatorios!!');
            }
            
            const productExist = await ProductModel.findOne({code});

            if (productExist) throw new Error('El código debe ser único');

            const newProduct = new ProductModel({
                title: title,
                status: status,
                category: category,
                description: description,
                price: price,
                thumbnail: thumbnail,
                code: code,
                stock: stock,
            });

            await newProduct.save(); //note: guardamos el producto con mongoose
        }catch(error){
            throw new Error(error);
        }
        }

    async getProducts(limit=10, page=1, query={}, sort=null){
        try{
            let products = '';
            let prevLink = '';
            let nextLink = '';
            
            if(sort) {
                products = await ProductModel.paginate(
                    query, //busqueda general creo que seria {} onda un objeto vacio
                    {   
                        limit,
                        page,
                        sort:{
                            price: sort
                        }
                    }
                    );
                prevLink = products.hasPrevPage
                ? `?limit=${limit}&page=${products.prevPage}&sort=${sort}&query=${JSON.stringify(query)}`
                :null;
    
                nextLink = products.hasNextPage 
                ? `?limit=${limit}&page=${products.nextPage}&sort=${sort}&query=${JSON.stringify(query)}`
                :null;
            }else {
                products = await ProductModel.paginate(
                    query, //busqueda general creo que seria {} onda un objeto vacio
                    {   
                        limit,
                        page
                    }
                    );
                prevLink = products.hasPrevPage
                ? `?limit=${limit}&page=${products.prevPage}&query=${JSON.stringify(query)}`
                :null;
    
                nextLink = products.hasNextPage 
                ? `?limit=${limit}&page=${products.nextPage}&query=${JSON.stringify(query)}`
                :null;
            }
            // products.map(product => console.log(product.price));
            // console.log(products);
            // if(Array.isArray(products.docs)){
            //     products.docs.map(product => console.log(product.price));
            // }else{
            //     console.log('no es un array');
            // }
            //note: urls para dirigir a pagina anterior y siguiente

            return {
                payload:products.docs,
                totalPages: products.totalPages,
                prevPages: products.prevPage || null,
                nextPages: products.nextPage || null,
                page: products.page,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                prevLink,
                nextLink,
            };
        }catch(error){
            throw new Error(error);
        }
    }

    async getProductById(id){
        try {
            const product = await ProductModel.findById(id);
            if(!product) throw new Error('Producto no encontrado');
            return product;
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateProduct(id, product){
        try {
            const updateProduct = await ProductModel.findByIdAndUpdate(id, product);
            if(!updateProduct) throw new Error('No se encuentra el producto');
            return updateProduct;
        }catch (error) {
            throw new Error('Error al actualizar el producto', error);
        }
        }

    async deleteProduct(id){
        try {
            const deletedProduct = await ProductModel.findByIdAndDelete(id);
            if(!deletedProduct) throw new Error('Error al borrar producto');
            return deletedProduct;
        }catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = ProductManager;