document.addEventListener("DOMContentLoaded", function () {
    var botaoForm = document.querySelector("#adicionar-paciente");

    botaoForm.addEventListener("click", function (event) {
        event.preventDefault();

        var form = document.querySelector("#form-adiciona");
        removeAllErrors(form);

        if (validatePacient(form)) {
            return;
        }

        var paciente = getFormValues(form);
        salvarPaciente(paciente);
        form.reset();

        window.location.href = "index.html";
    });

    document.getElementById("cancelar").addEventListener("click", function() {
        // Remove pacienteEditando da localStorage
        localStorage.removeItem("pacienteEditando");

        // Reseta o formulário
        var form = document.querySelector("#form-adiciona");
        form.reset();

        // Redireciona para a página de cadastro
        window.location.href = "index.html";
    });

    function getFormValues(form) {
        const peso = parseFloat(form.peso.value);
        const altura = parseFloat(form.altura.value);

        return {
            id: gerarId(),
            nome: form.nome.value.trim(),
            peso: peso,
            altura: altura,
            gordura: parseFloat(form.gordura.value),
            imc: calculaImc(peso, altura).toFixed(2) 
        };
    }

    function gerarId() {
        return Date.now().toString();
    }

    function calculaImc(peso, altura) {
        if (peso && altura) {
            return peso / (altura * altura);
        }
        return 0;
    }

    function salvarPaciente(paciente) {
        let pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];

        let pacienteEditando = JSON.parse(localStorage.getItem("pacienteEditando"));

        if (pacienteEditando) {
            let index = pacientes.findIndex(p => p.id === pacienteEditando.id);
            if (index !== -1) {
                pacientes[index] = paciente; 
            }
            localStorage.removeItem("pacienteEditando");
        } else {
            pacientes.push(paciente);
        }

        localStorage.setItem("pacientes", JSON.stringify(pacientes));
    }

    function validatePacient(form) {
        let hasErrors = false;

        if (!form.peso.value || form.peso.value <= 0 || form.peso.value >= 350) {
            showError(form.peso, "#error-message-peso", "Peso é inválido!");
            hasErrors = true;
        }

        if (!form.altura.value || form.altura.value <= 0 || form.altura.value >= 2.5) {
            showError(form.altura, "#error-message-altura", "Altura é inválida!");
            hasErrors = true;
        }

        if (!form.gordura.value || form.gordura.value <= 0 || form.gordura.value >= 100) {
            showError(form.gordura, "#error-message-gordura", "Gordura é inválida!");
            hasErrors = true;
        }

        let nome = form.nome.value.trim();
        if (nome.length === 0) {
            showError(form.nome, "#error-message-nome", "Nome não pode ser vazio!");
            hasErrors = true;
        } else if (nome.length > 100) {
            showError(form.nome, "#error-message-nome", "Nome muito longo! Máximo de 100 caracteres.");
            hasErrors = true;
        }

        return hasErrors;
    }

    function showError(inputField, errorSelector, errorMessage) {
        var errorMessageElement = document.querySelector(errorSelector);
        errorMessageElement.textContent = errorMessage;
        inputField.classList.add("campo-invalido");

        inputField.addEventListener("input", function () {
            if (inputField.value.trim() !== "") {
                removeError(inputField, errorSelector);
            }
        });
    }

    function removeError(inputField, errorSelector) {
        var errorMessageElement = document.querySelector(errorSelector);
        errorMessageElement.textContent = "";
        inputField.classList.remove("campo-invalido");
    }

    function removeAllErrors(form) {
        var errorMessages = form.querySelectorAll(".error-message");
        errorMessages.forEach(error => error.textContent = "");

        var invalidFields = form.querySelectorAll(".campo-invalido");
        invalidFields.forEach(field => field.classList.remove("campo-invalido"));
    }

    const pacienteEditando = JSON.parse(localStorage.getItem("pacienteEditando"));

    if (pacienteEditando) {
        document.getElementById("nome").value = pacienteEditando.nome;
        document.getElementById("peso").value = pacienteEditando.peso;
        document.getElementById("altura").value = pacienteEditando.altura;
        document.getElementById("gordura").value = pacienteEditando.gordura;

        const imc = calculaImc(pacienteEditando.peso, pacienteEditando.altura).toFixed(2);

        const tituloForm = document.getElementById("titulo-form");
        tituloForm.textContent = "Editar paciente";
    } else {
        console.log("Nenhum paciente encontrado para editar.");
    }
});
