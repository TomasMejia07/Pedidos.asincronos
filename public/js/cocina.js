document.addEventListener("DOMContentLoaded", () => {
  const pedidosContainer = document.getElementById("pedidosContainer");
  const socket = io(); // Conexión con el servidor WebSocket

  // Función para agregar un pedido al DOM
  function agregarPedido(pedido) {
    const pedidoDiv = document.createElement("div");
    pedidoDiv.classList.add("pedido");
    pedidoDiv.innerHTML = `
        <h4>Producto: ${pedido.producto}</h4>
        <p class="pPedido">Cantidad: ${pedido.cantidad}</p>
        <p class="pPedido">Estado: <span class="estado">${pedido.estado}</span></p>
        <a class="icono" data-id="${pedido._id}">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-delete">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M4 7h16" />
            <path d="M10 11v6" />
            <path d="M14 11v6" />
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
            <path d="M9 7v-3h6v3" />
          </svg>
        </a>
      `;
    pedidosContainer.prepend(pedidoDiv);
  }

  // Obtener pedidos iniciales al cargar la página
  async function obtenerPedidos() {
    try {
      const response = await fetch("/api/pedidos");
      const pedidos = await response.json();

      // Limpia y muestra los pedidos existentes
      pedidosContainer.innerHTML = "";
      pedidos.forEach(agregarPedido);
    } catch (error) {
      console.error("Error al obtener pedidos:", error);
    }
  }

  // Escuchar el evento `nuevo-pedido` del servidor
  socket.on("nuevo-pedido", (pedido) => {
    agregarPedido(pedido);
  });

  // Inicializar pedidos
  obtenerPedidos();

  async function eliminarPedido(id) {
    try {
      const response = await fetch(`/api/eliminarPedido/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log(`Pedido con ID ${id} eliminado`);
        const pedidoDiv = document.querySelector(`.icono[data-id="${id}"]`).closest(".pedido");
        if (pedidoDiv) {
          pedidoDiv.remove(); // Elimina el pedido del DOM
        }
      } else {
        console.error("Error al eliminar el pedido en el servidor");
      }
    } catch (error) {
      console.error("Error al eliminar pedido:", error);
    }
  }

  socket.on("pedido-eliminado", (id) => {
    const pedidoDiv = document.querySelector(`.icono[data-id="${id}"]`).closest(".pedido");
    if (pedidoDiv) {
      pedidoDiv.remove();
    }
  });

  pedidosContainer.addEventListener("click", (event) => {
    const icono = event.target.closest(".icono");
    if (icono) {
      const id = icono.getAttribute("data-id");
      eliminarPedido(id); // Llama a la función para eliminar el pedido
      socket.emit("eliminar-pedido", id); // Notifica al servidor
    }
  });
});
