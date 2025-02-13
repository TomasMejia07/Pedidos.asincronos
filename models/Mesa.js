const mongoose = require("mongoose");

const MesaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  width: { type: Number, required: true, default: 60 },
  height: { type: Number, required: true, default: 60 },
  estado: { type: String, enum: ["libre", "ocupada"], default: "libre" }
});

module.exports = mongoose.model("Mesa", MesaSchema);



