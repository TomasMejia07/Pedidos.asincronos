const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://localhost:27017/fast-food'

mongoose
    .connect(MONGODB_URI)
    .then(()=>console.log('conectado con exito a la base de datos'))
    .catch((err)=>console.error('Error al conectar a la base de datos:', err));

module.exports = mongoose;