var botaoForm = document.querySelector("#adicionar-paciente");

botaoForm.addEventListener("click", function(event) {
    event.preventDefault(); // Impede o envio do formulário ANTES de tudo

    var form = document.querySelector("#form-adiciona");
    var paciente = getFormValues(form);

    if (validatePacient(form, event)) {
        return;
    }

    var row = createRow(paciente);

    var tabela = document.querySelector("#tabela-pacientes");
    tabela.appendChild(row);

    form.reset();
    removeAllErrors(form); // Remove mensagens de erro após submissão bem-sucedida
});

function getFormValues(form) {
    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value, form.altura.value).toFixed(2)
    }
    return paciente;
}

function createRow(paciente) {
    var pacienteTr = document.createElement("tr");
    pacienteTr.classList.add("paciente");

    pacienteTr.appendChild(createData(paciente.nome, "info-nome"));
    pacienteTr.appendChild(createData(paciente.peso, "info-peso"));
    pacienteTr.appendChild(createData(paciente.altura, "info-altura"));
    pacienteTr.appendChild(createData(paciente.gordura, "info-gordura"));
    pacienteTr.appendChild(createData(paciente.imc, "info-imc"));
    
    var acoesTd = createData("", "acoes");

    
    var editarButton = document.createElement("button");
    editarButton.classList.add("editar");
    editarButton.innerHTML = '<i class="fas fa-edit"></i>'; 
    acoesTd.appendChild(editarButton);

    
    var excluirButton = document.createElement("button");
    excluirButton.classList.add("excluir");
    excluirButton.innerHTML = '<i class="fas fa-trash"></i>'; 
    acoesTd.appendChild(excluirButton);

    pacienteTr.appendChild(acoesTd); 

    return pacienteTr;
}

function createData(data, cssClass) {
    var td = document.createElement("td");
    td.classList.add(cssClass);
    td.textContent = data;
    return td;
}

function validatePacient(form, event) {
    let hasErrors = false;

    if (form.peso.value <= 0 || form.peso.value >= 350 || form.peso.value == null || form.peso.value == "") {
        showError(form.peso, "#error-message-peso", "Peso é inválido!");
        hasErrors = true;
    }

    if (form.altura.value <= 0 || form.altura.value >= 2.5 || form.altura.value == null || form.altura.value == "") {
        showError(form.altura, "#error-message-altura", "Altura é inválida!");
        hasErrors = true;
    }

    if (form.gordura.value <= 0 || form.gordura.value >= 100 || form.gordura.value == null || form.gordura.value == "") {
        showError(form.gordura, "#error-message-gordura", "Gordura é inválida!");
        hasErrors = true;
    }

    let nome = form.nome.value; 
    const limiteMaximo = 100;

    if (nome.length > limiteMaximo) {
        showError(form.nome, "#error-message-nome", `Nome muito longo! O limite é de ${limiteMaximo} caracteres.`);
        hasErrors = true;
    } else if (nome === "") {
        showError(form.nome, "#error-message-nome", "Nome não pode ser vazio!");
        hasErrors = true;
    }

    if (hasErrors) {
        event.preventDefault();
        return true;
    }
    return false;
}

function showError(inputField, errorSelector, errorMessage) {
    var errorMessageElement = document.querySelector(errorSelector);
    errorMessageElement.textContent = errorMessage;
    inputField.classList.add("campo-invalido");

    // Adiciona o ouvinte de evento para corrigir erros
    inputField.addEventListener("input", function() {
        if (inputField.value.trim() !== "") {
            removeError(inputField, errorSelector);
        }
    });
}

function removeError(inputField, errorSelector) {
    var errorMessageElement = document.querySelector(errorSelector);
    errorMessageElement.textContent = ""; // Remove o texto de erro
    inputField.classList.remove("campo-invalido"); // Remove a classe de erro
}

function removeAllErrors(form) {
    var errorMessages = form.querySelectorAll(".error-message");
    errorMessages.forEach(function(error) {
        error.textContent = "";
    });

    var invalidFields = form.querySelectorAll(".campo-invalido");
    invalidFields.forEach(function(field) {
        field.classList.remove("campo-invalido");
    });
}
