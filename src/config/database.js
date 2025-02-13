const mongoose = require("mongoose");
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

mongoose
    .connect(MONGO_URI)
    .then(()=>console.log('conectado con exito a la base de datos'))
    .catch((err)=>console.error('Error al conectar a la base de datos:', err));

module.exports = mongoose;