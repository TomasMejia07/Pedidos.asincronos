const mongoose = require('mongoose');

const PedidoSchema = new mongoose.Schema({
    producto: { type: String, required: true },
    cantidad: { type: Number, required: true },
    estado: { type: String, default: 'pendiente' },
})

module.exports = mongoose.model('Pedido', PedidoSchema);