const express = require("express");
const path = require("path");
require("./config/database");

const apiRoutes = require("../routes/api");
const { Server } = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Manejo de WebSocket
io.on("connection", (socket) => {
  console.log("Cliente conectado");
  socket.on("nuevo-pedido", (pedido) => {
    io.emit("actualizar-pedidos", pedido);
  });
});

// Middleware para procesar JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar evento de pedidos
app.set("io", io);

// Configuraciones de Express
app.use(express.static(path.join(__dirname, "../public")));

app.use("/socket.io", express.static(path.join(__dirname, "../node_modules/socket.io/client-dist")));

app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

app.get("/cocina", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/cocina.html"));
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
