const PUERTO = 8080;
const express = require('express');
const ProductManager = require('./dao/fs/ProductManager');

const productsRouter = require('./routes/products.route.js');
const cartsRouter = require('./routes/carts.route.js');
const viewRouter = require('./routes/view.route.js');
const path = require('path');
const socket = require('socket.io');
const { engine, create} = require('express-handlebars');
const MessageModel = require('./dao/models/message.model.js');
require('./database.js');

const hbs = create({
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  }
});

const manager = new ProductManager('./src/models/productos.json');

// creamos el servidor
const app = express();

// Configuramos para funcione la carpeta public
app.use(express.static('./src/public'));

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// rutas
app.use('/api', productsRouter);
app.use('/api', cartsRouter);
app.use('/', viewRouter);

hbs.handlebars.registerHelper('multiply', (a, b) => a * b);

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, './views'));

const httpServer = app.listen(PUERTO, () => {
  console.log('El servidor esta corriendo en el puerto ' + PUERTO);
});

// socket.io

const io = new socket.Server(httpServer); //note creamos una instancia de socket


// establecemos la conexión

io.on('connection', (socket) => {
  socket.on('message', async(data) => {
    await MessageModel.create(data);
    const messages = await MessageModel.find();
    io.sockets.emit('messagesLogs', messages);
  });
});