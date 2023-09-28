function mostrarFormulario() {
    var selecao = document.getElementById("selecao");
    var formulario = document.getElementById("formulario");

    if (selecao.value === "mostrar") {
        formulario.style.display = "block";
    } else {
        formulario.style.display = "none";
    }
}