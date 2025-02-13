const btnSwitch = document.querySelector("#switch");

// Verificar si hay un estado guardado en localStorage
if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark");
}

// Evento para cambiar el modo
btnSwitch.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    // Guardar en localStorage el estado del modo oscuro
    if (document.body.classList.contains("dark")) {
        localStorage.setItem("darkMode", "enabled");
    } else {
        localStorage.setItem("darkMode", "disabled");
    }
});
