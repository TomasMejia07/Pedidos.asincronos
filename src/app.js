const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
require("./config/database");
const { Server } = require("socket.io");

// importacion de las rutas
const apiRoutes = require("../routes/api");
const mesasRoutes = require("../routes/mesas");
const ventasRoutes = require("../routes/ventas");

const http = require("http");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Manejo de WebSocket
io.on("connection", (socket) => {
  console.log("Cliente conectado", socket.id);

  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });

  socket.on("nuevo-pedido", (pedido) => {
    io.emit("actualizar-pedidos", pedido);
  });
});

// Middleware para procesar JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// configuracion de cors
app.use(cors({
  origin: "*",  // Permite cualquier origen (ajústalo según sea necesario)
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Configurar evento de pedidos
app.set("io", io);

// Configuraciones de Express
app.use(express.static(path.join(__dirname, "../public")));

app.use("/socket.io", express.static(path.join(__dirname, "../node_modules/socket.io/client-dist")));

app.use("/css", express.static(path.join(__dirname, "../node_modules/@fortawesome/fontawesome-free/css")));

app.use("/webfonts", express.static(path.join(__dirname, "../node_modules/@fortawesome/fontawesome-free/webfonts")));

app.use("/api", apiRoutes);
app.use("/api/mesas", mesasRoutes);
app.use("/api/ventas", ventasRoutes);

// Configuracion de ejs como motor de las vistas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.get("/", (req, res) => {
  res.render("index", { titulo: "Gestion - Ordenar"});
});


app.get("/cocina", (req, res) => {
  res.render("cocina", { titulo: "Gestion - cocina"});
});

app.get("/mesas", (req, res) => {
  res.render("mesas", { titulo: "Gestion - Mesas"});
});

app.get("/ventas", (req, res) => {
  res.render("ventas", { titulo: "Gestion - Ventas"});
});

app.get("/configuracion", (req, res) => {
  res.render("configuracion", { titulo: "Configuracion"});
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = { app, server, io };