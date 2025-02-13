const express = require("express");
const router = express.Router();
const Venta = require("../models/Venta");
const Mesa = require("../models/Mesa");

// Registrar una venta y liberar la mesa
router.post("/", async (req, res) => {
  try {
    const { mesaId, productos } = req.body;

    // Calcular el total de la venta
    const total = productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

    // Crear la venta
    const nuevaVenta = new Venta({ mesa: mesaId, productos, total });
    await nuevaVenta.save();

    // Marcar la mesa como libre
    await Mesa.findByIdAndUpdate(mesaId, { estado: "libre" });

    res.status(201).json(nuevaVenta);
  } catch (error) {
    res.status(500).json({ error: "Error al registrar la venta" });
  }
});

// Obtener todas las ventas
router.get("/", async (req, res) => {
  try {
    const ventas = await Venta.find().populate("mesa").populate("productos.producto");
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las ventas" });
  }
});

module.exports = router;
