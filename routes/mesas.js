const express = require("express");
const router = express.Router();
const Mesa = require("../models/Mesa");

// Crear una nueva mesa
router.post("/", async (req, res) => {
  try {
      const { nombre, x, y, width, height } = req.body;
      const nuevaMesa = new Mesa({ nombre, x, y, width, height });
      await nuevaMesa.save();
      res.status(201).json(nuevaMesa);
  } catch (error) {
      res.status(500).json({ error: "Error al guardar la mesa" });
  }
});

// Obtener todas las mesas
router.get("/", async (req, res) => {
  try {
    const mesas = await Mesa.find();
    res.json(mesas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las mesas" });
  }
});

// Actualizar el estado de una mesa (libre/ocupada)
router.put("/:id", async (req, res) => {
  try {
    const { estado } = req.body;
    const mesa = await Mesa.findByIdAndUpdate(req.params.id, { estado }, { new: true });
    res.json(mesa);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la mesa" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
      await Mesa.findByIdAndDelete(req.params.id);
      res.json({ message: "Mesa eliminada correctamente" });
  } catch (error) {
      res.status(500).json({ error: "Error al eliminar la mesa" });
  }
});

module.exports = router;
