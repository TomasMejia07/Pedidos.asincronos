const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://tomas_mejia:Tomas125@cluster0.a2sqo.mongodb.net/'

mongoose
    .connect(MONGODB_URI)
    .then(()=>console.log('conectado con exito a la base de datos'))
    .catch((err)=>console.error('Error al conectar a la base de datos:', err));

module.exports = mongoose;