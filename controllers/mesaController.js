const { io } = require("../src/app"); // Importa io desde app.js
const Mesa = require("../models/Mesa"); // Asegúrate de que el modelo está correcto

// Crear una mesa y notificar a los clientes
const crearMesa = async (req, res) => {
  try {
    const nuevaMesa = new Mesa(req.body);
    await nuevaMesa.save();

    io.emit("mesaActualizada", nuevaMesa); // 🔴 Notifica a todos los clientes

    res.status(201).json(nuevaMesa);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la mesa" });
  }
};

// Finalizar venta y actualizar el estado en tiempo real
const finalizarVenta = async (req, res) => {
  try {
    const { id } = req.params;
    const mesa = await Mesa.findByIdAndUpdate(id, { estado: "libre" }, { new: true });

    if (!mesa) {
      return res.status(404).json({ error: "Mesa no encontrada" });
    }

    io.emit("ventaFinalizada", mesa); // 🔴 Notifica que la venta se ha finalizado

    res.json(mesa);
  } catch (error) {
    res.status(500).json({ error: "Error al finalizar la venta" });
  }
};

module.exports = { crearMesa, finalizarVenta };
