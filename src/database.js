const mongoose = require('mongoose');
const configObject = require('./config/config');
const { mongo_url } = configObject;

mongoose
    .connect(mongo_url)
    .then(() => console.log('Conexión exitosa'))
    .catch(() => console.log('Error al conectarse a la base de datos.'));
    
    //cambios 10/4/24