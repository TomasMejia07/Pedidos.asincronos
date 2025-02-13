const mongoose = require("mongoose");

const VentaSchema = new mongoose.Schema({
  mesa: { type: mongoose.Schema.Types.ObjectId, ref: "Mesa", required: true },
  productos: [
    {
      producto: { type: mongoose.Schema.Types.ObjectId, ref: "Producto" },
      cantidad: { type: Number, required: true },
      precio: { type: Number, required: true }
    }
  ],
  total: { type: Number, required: true },
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Venta", VentaSchema);
