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
        <a href="/" class="icono"><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-status-change"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M18 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M6 12v-2a6 6 0 1 1 12 0v2" /><path d="M15 9l3 3l3 -3" /></svg></a>
      `;
      pedidosContainer.appendChild(pedidoDiv);
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
  });
  