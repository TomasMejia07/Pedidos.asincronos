// Filtro de producto segun su categotria
const express = require("express");

const Producto = require("../models/Producto");
const Pedido = require("../models/Pedido");

const router = express.Router();


router.get("/categorias", async (req, res) => {
  try {
    const productos = await Producto.find();
    const categorias = [...new Set(productos.map((p) => p.categoria))];

    // Agrupar productos por categoría
    const datos = categorias.map((categoria) => ({
      categoria,
      productos: productos.filter((p) => p.categoria === categoria),
    }));

    res.json(datos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las categorias" });
  }
});

// Ruta para guardar pedidos
router.post('/pedido', async (req, res) => {
  try {
    const { producto, cantidad } = req.body;

    const nuevoPedido = new Pedido({ producto, cantidad });
    await nuevoPedido.save();

    const io = req.app.get("io");
    io.emit("nuevo-pedido", nuevoPedido);

    res.status(201).json({ message: 'Pedido guardado exitosamente', pedido: nuevoPedido });
  } catch (error) {
    res.status(500).json({ message: 'Error al guardar el pedido' });
  }
});

router.get("/pedidos", async (req, res) => {
  try {
    // Obtener todos los pedidos de la base de datos
    const pedidos = await Pedido.find();

    // Enviar los pedidos como respuesta 
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los pedidos" });
  }
});


module.exports = router;


