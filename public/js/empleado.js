document.addEventListener("DOMContentLoaded", async () => {
  const categoriaSelect = document.getElementById("categoria");
  const productoSelect = document.getElementById("producto");
  const cantidadInput = document.getElementById("cantidad");
  const submitButton = document.querySelector('button[type="submit"]');

  const obtenerCategorias = async () => {
    try {
      const response = await fetch("/api/categorias");
      return await response.json();
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
    }
  };

  const datos = await obtenerCategorias();

  // Poblar el selector de categorías
  datos.forEach(({ categoria, productos }) => {
    const option = document.createElement("option");
    option.value = categoria;
    option.textContent = categoria;
    categoriaSelect.appendChild(option);
  });

  categoriaSelect.addEventListener("change", () => {
    const categoriaSeleccionada = categoriaSelect.value;

    // Reiniciar el selector de productos
    productoSelect.innerHTML ='<option value="">Selecciona un producto</option>';
    productoSelect.disabled = true;

    if (categoriaSeleccionada) {
      const productos = datos.find((d) => d.categoria === categoriaSeleccionada).productos;
        productos.forEach((producto) => {
        const option = document.createElement("option");
        option.value = producto.nombre;
        option.textContent = producto.nombre;
        productoSelect.appendChild(option);
      });
      productoSelect.disabled = false;
      cantidadInput.disabled = false;
      submitButton.disabled = false;
    }
  });

  document.getElementById("pedidoForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const producto = productoSelect.value;
      const cantidad = cantidadInput.value;

      try {
        const response = await fetch("/api/pedido", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ producto, cantidad }),
        });

        const data = await response.json();
        Swal.fire("¡Éxito!", data.message, "success");
      } catch (error) {
        Swal.fire("Error", "No se pudo guardar el pedido", "error");
      }
    });
});
