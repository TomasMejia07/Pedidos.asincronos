document.getElementById('pedidoForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const producto = document.getElementById('producto').value;
    const cantidad = document.getElementById('cantidad').value;

    if (!producto || cantidad <= 0) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, completa todos los campos correctamente.',
        });
        return;
    }

    // Simula el envío del pedido
    Swal.fire({
        icon: 'success',
        title: 'Pedido enviado',
        text: `Se ha enviado el pedido de ${cantidad} ${producto}(s).`,
    });

});


document.addEventListener('DOMContentLoaded', () => {
    // Datos de ejemplo
    const categorias = {
        "Comidas": ["Hamburguesa", "Pizza", "Tacos"],
        "Bebidas": ["Agua", "Gaseosa", "Jugo"],
        "Postres": ["Helado", "Pastel", "Flan"]
    };

    const categoriaSelect = document.getElementById('categoria');
    const productoSelect = document.getElementById('producto');
    const cantidadInput = document.getElementById('cantidad');
    const submitButton = document.querySelector('button[type="submit"]');

    // Poblar el select de categorías
    Object.keys(categorias).forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria;
        option.textContent = categoria;
        categoriaSelect.appendChild(option);
    });

    // Evento: cambiar categoría
    categoriaSelect.addEventListener('change', () => {
        const categoriaSeleccionada = categoriaSelect.value;

        // Reiniciar productos
        productoSelect.innerHTML = '<option value="">Selecciona un producto</option>';
        productoSelect.disabled = true;
        cantidadInput.disabled = true;
        submitButton.disabled = true;

        // Si hay una categoría seleccionada, cargar productos
        if (categoriaSeleccionada) {
            const productos = categorias[categoriaSeleccionada];
            productos.forEach(producto => {
                const option = document.createElement('option');
                option.value = producto;
                option.textContent = producto;
                productoSelect.appendChild(option);
            });
            productoSelect.disabled = false;
        }
    });

    // Evento: cambiar producto
    productoSelect.addEventListener('change', () => {
        const productoSeleccionado = productoSelect.value;

        if (productoSeleccionado) {
            cantidadInput.disabled = false;
        } else {
            cantidadInput.disabled = true;
            submitButton.disabled = true;
        }
    });

    // Evento: cambiar cantidad
    cantidadInput.addEventListener('input', () => {
        const cantidad = cantidadInput.value;

        if (cantidad > 0) {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    });
});


