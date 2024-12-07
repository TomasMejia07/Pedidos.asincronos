document.addEventListener("DOMContentLoaded", () => {
    const pedidosContainer = document.getElementById("pedidosContainer");
    const socket = io(); // Conexión con el servidor WebSocket
  
    // Función para agregar un pedido al DOM
    function agregarPedido(pedido) {
      const pedidoDiv = document.createElement("div");
      pedidoDiv.classList.add("pedido");
      pedidoDiv.innerHTML = `
        <h4>Producto: ${pedido.producto}</h4>
        <p>Cantidad: ${pedido.cantidad}</p>
        <p>Estado: ${pedido.estado}</p>
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
  