// se importa express
const express = require('express');
// se importa el path para las rutas
const path = require('path');
// importamos la configuracion de conexion con mongo
require('./config/database')

const app = express();

// Especificamos el puerto de conexion 
const PORT = 3000;

app.use(express.static(path.join(__dirname, '../public')));

//Rutas


// ruta principal para cargar las vistas(empleado, cocina)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
}); 

app.get('/cocina', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/cocina.html'));
}); 

// iniciar el servidor

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})