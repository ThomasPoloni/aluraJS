document.addEventListener("DOMContentLoaded", function () {
    const menuLinks = document.querySelectorAll(".menu a"); // Seleciona os links corretamente
    const secaoTabela = document.getElementById("tabela");
    const secaoFormulario = document.getElementById("formulario");

    menuLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetSection = this.getAttribute("data-section"); // Obtém a seção alvo

            if (targetSection === "tabela") {
                secaoTabela.style.display = "block";
                secaoFormulario.style.display = "none";
            } else if (targetSection === "formulario") {
                secaoTabela.style.display = "none";
                secaoFormulario.style.display = "block";
            }
        });
    });
});
