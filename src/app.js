const configObject = require('./config/config');
const { PUERTO } = configObject;
const express = require('express');
const cookieParser = require('cookie-parser');
const ProductManager = require('./dao/db/product-manager-db.js');
const productManager = new ProductManager('');
const ProductService = require('./services/ProductService');
const productService = new ProductService();

const {
    productsRouter,
    cartsRouter,
    viewRouter,
    userRouter,
    sessionRouter,
} = require('./routes');
const path = require('path');
const socket = require('socket.io');
const { engine, create } = require('express-handlebars');
const MessageModel = require('./dao/models/message.model.js');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const initializePassword = require('./config/passport.config.js');
require('./database.js');

const hbs = create({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
});

// creamos el servidor
const app = express();

// Configuramos para funcione la carpeta public
app.use(express.static('./src/public'));

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
//app.use(session({
//secret: 'secretCoder', //note: valor para firmar cookie
//resave: true,
//saveUninitialized: true,
// store: new fileStore({path: './src/sessions', ttl: 50, retries: 1}) 
//el ttl esta en segundos, retries es la cantidad de veces que el servidor tratara de leer el archivo
//store: MongoStore.create({
//    mongoUrl: 'mongodb+srv://tomast:tomast@tomast.olnv4zc.mongodb.net/?retryWrites=true&w=majority&appName=tomast',
//    ttl: 100
//})
//}));


// rutas
app.use('/api', productsRouter);
app.use('/api', cartsRouter);
app.use('/', viewRouter);
app.use('/api/users', userRouter);
// app.use('/api/sessions', sessionRouter);
app.use(passport.initialize());
// app.use(passport.session());
initializePassword();

hbs.handlebars.registerHelper('multiply', (a, b) => a * b);

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, './views'));

const httpServer = app.listen(PUERTO, () => {
    console.log('El servidor esta corriendo en el puerto ' + PUERTO);
});

// socket.io

const io = new socket.Server(httpServer); //note creamos una isntancia de socket

// establecemos la conexión

// io.on('connection', (socket) => {
//   socket.on('message', async(data) => {
//     await MessageModel.create(data);
//     const messages = await MessageModel.find();
//     io.sockets.emit('messagesLogs', messages);
//   });
// });
//

io.on('connection', async (socket) => {
    const limit = 30;
    const products = await productManager.getProducts(limit);

    socket.emit('products', { products: products.payload });

    socket.on('deleteProduct', async (id) => {
        await productManager.deleteProduct(id);
        const products = await productManager.getProducts();
        io.sockets.emit('products', products);
    });

    socket.on('addProduct', async (product) => {
        try {
            await productManager.addProduct(product);
            const products = await productManager.getProducts();
            io.sockets.emit('products', { products: products.payload });
        } catch (error) {
            console.log('Error al cargar producto');
        }
    });

    socket.on('updateProduct', async ({ id, product }) => {
        console.log({ id, product });
        await productService.updateProduct(id, product);
        const products = await productService.getProducts;
        io.sockets.emit('products', products);
    });
});