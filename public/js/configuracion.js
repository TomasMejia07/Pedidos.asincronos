document.addEventListener("DOMContentLoaded", async function () {
    const stageWidth = 800;
    const stageHeight = 500;
    const gridSize = 50;

    const stage = new Konva.Stage({
        container: "contenedorCanvas",
        width: stageWidth,
        height: stageHeight
    });

    const layer = new Konva.Layer();
    stage.add(layer);

    async function cargarMesas() {
        try {
            const response = await fetch("/api/mesas");
            const mesasDB = await response.json();
            mesasDB.forEach(mesa => agregarMesa(mesa));
        } catch (error) {
            console.error("Error al cargar las mesas:", error);
        }
    }

    async function guardarMesaEnDB(mesa) {
        try {
            const response = await fetch("/api/mesas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(mesa)
            });
            const nuevaMesa = await response.json();
            return nuevaMesa._id;
        } catch (error) {
            console.error("Error al guardar la mesa:", error);
        }
    }

    async function eliminarMesaDeDB(id) {
        try {
            await fetch(`/api/mesas/${id}`, { method: "DELETE" });
        } catch (error) {
            console.error("Error al eliminar la mesa:", error);
        }
    }

    function agregarMesa(mesaData = null) {
        const id = mesaData ? mesaData._id : Math.random().toString(36).substr(2, 9);
        const nombre = mesaData ? mesaData.nombre : `Mesa ${id}`;
        const x = mesaData ? mesaData.x : Math.random() * (stageWidth - 60);
        const y = mesaData ? mesaData.y : Math.random() * (stageHeight - 60);
        
        let mesa = new Konva.Rect({
            x, y,
            width: 60, height: 60,
            fill: "orange",
            draggable: true,
            id
        });

        let texto = new Konva.Text({
            x, y: y - 20,
            text: nombre,
            fontSize: 16,
            fill: "black"
        });

        mesa.on("dragmove", function () {
            texto.x(mesa.x());
            texto.y(mesa.y() - 20);
        });

        mesa.on("dblclick", function () {
            let nuevoNombre = prompt("Nuevo nombre:", texto.text());
            if (nuevoNombre) texto.text(nuevoNombre);
        });

        mesa.on("click", async function () {
            if (confirm("¿Eliminar esta mesa?")) {
                layer.remove(mesa);
                layer.remove(texto);
                layer.draw();
                await eliminarMesaDeDB(id);
            }
        });

        layer.add(mesa);
        layer.add(texto);
        layer.draw();

        if (!mesaData) {
            guardarMesaEnDB({ nombre, x, y, width: 60, height: 60 }).then(dbId => mesa.id(dbId));
        }
    }

    document.getElementById("agregarMesa").addEventListener("click", () => agregarMesa());

    cargarMesas();
});
