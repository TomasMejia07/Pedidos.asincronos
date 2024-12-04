// se importa express
const express = require("express");
// se importa el path para las rutas
const path = require("path");
// importamos la configuracion de conexion con mongo
require("./config/database");

const apiRoutes = require("../routes/api");
const app = express();

const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("Cliente conectado");

  // Emitir nuevos pedidos
  socket.on("nuevo-pedido", (pedido) => {
    io.emit("actualizar-pedidos", pedido);
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});
// Especificamos el puerto de conexion
const PORT = 3000;

app.use(express.static(path.join(__dirname, "../public")));

//Rutas

app.use(express.json());
app.use("/api", apiRoutes);
// ruta principal para cargar las vistas(empleado, cocina)

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

app.get("/cocina", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/cocina.html"));
});

// iniciar el servidor

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
