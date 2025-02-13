const socket = io("http://localhost:3000"); // Cambia por tu URL si estás en producción

// Escuchar cuando se actualiza una mesa
socket.on("mesaActualizada", (mesa) => {
  console.log("Mesa actualizada:", mesa);
  actualizarInterfaz(mesa);
});

// Escuchar cuando se finaliza una venta
socket.on("ventaFinalizada", (mesa) => {
  console.log("Venta finalizada en mesa:", mesa);
  actualizarInterfaz(mesa);
});

// Función para actualizar la interfaz (debes implementarla según tu frontend)
function actualizarInterfaz(mesa) {
  // Aquí puedes modificar el DOM o actualizar tu estado en React/Vue
}