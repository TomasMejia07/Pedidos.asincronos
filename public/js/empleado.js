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

    // Aquí podrás realizar el fetch para enviar datos al backend
});


