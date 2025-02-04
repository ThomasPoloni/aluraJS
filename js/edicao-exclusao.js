document.addEventListener("DOMContentLoaded", function () {
    const tabela = document.getElementById("tabela-pacientes");
    let pacienteEditando = null; 

    
    tabela.addEventListener("click", function (event) {
        if (event.target.closest(".editar")) {
            editarPaciente(event.target.closest("tr"));
        } else if (event.target.closest(".excluir")) {
            excluirPaciente(event.target.closest("tr"));
        }
    });

    
    function editarPaciente(linha) {
        
        const nome = linha.querySelector(".info-nome").textContent;
        const peso = linha.querySelector(".info-peso").textContent;
        const altura = linha.querySelector(".info-altura").textContent;
        const gordura = linha.querySelector(".info-gordura").textContent;
        const imc = linha.querySelector(".info-imc").textContent;

        document.getElementById("nome").value = nome;
        document.getElementById("peso").value = peso;
        document.getElementById("altura").value = altura;
        document.getElementById("gordura").value = gordura;
        document.getElementById("imc").value = imc;

        
        document.getElementById("titulo-form").textContent = "Editar paciente";

        
        pacienteEditando = linha;

       
        document.getElementById("formulario").classList.remove("hidden");
        document.getElementById("tabela").classList.add("hidden");

        
        document.getElementById("formulario").scrollIntoView({ behavior: "smooth" });
    }

    
    function excluirPaciente(linha) {
        if (confirm("Deseja excluir este paciente?")) {
            linha.remove();
        }
    }

    // Função para salvar ou editar um paciente
    document.getElementById("form-adiciona").addEventListener("submit", function (event) {
        event.preventDefault(); 

        // Captura dos dados do formulário
        const nome = document.getElementById("nome").value;
        const peso = document.getElementById("peso").value;
        const altura = document.getElementById("altura").value;
        const gordura = document.getElementById("gordura").value;
        const imc = calculaIMC(peso, altura); 

        if (pacienteEditando) {
            
            pacienteEditando.querySelector(".info-nome").textContent = nome;
            pacienteEditando.querySelector(".info-peso").textContent = peso;
            pacienteEditando.querySelector(".info-altura").textContent = altura;
            pacienteEditando.querySelector(".info-gordura").textContent = gordura;
            pacienteEditando.querySelector(".info-imc").textContent = imc;

            
            pacienteEditando = null;

            
            document.getElementById("titulo-form").textContent = "Adicionar novo paciente";
        } else {
            
            const pacienteTr = document.createElement("tr");
            pacienteTr.classList.add("paciente");
            pacienteTr.appendChild(createData(nome, "info-nome"));
            pacienteTr.appendChild(createData(peso, "info-peso"));
            pacienteTr.appendChild(createData(altura, "info-altura"));
            pacienteTr.appendChild(createData(gordura, "info-gordura"));
            pacienteTr.appendChild(createData(imc, "info-imc"));
            pacienteTr.appendChild(createAcoes());

            document.getElementById("tabela-pacientes").appendChild(pacienteTr);
        }

        
        document.getElementById("formulario").classList.add("hidden");
        document.getElementById("tabela").classList.remove("hidden");

       
        document.getElementById("form-adiciona").reset();
    });

    
    function createData(value, className) {
        const td = document.createElement("td");
        td.classList.add(className);
        td.textContent = value;
        return td;
    }

    
    function createAcoes() {
        const td = document.createElement("td");
        td.classList.add("acoes");

        const editarBtn = document.createElement("button");
        editarBtn.classList.add("editar");
        editarBtn.innerHTML = '<i class="fas fa-edit"></i>';

        const excluirBtn = document.createElement("button");
        excluirBtn.classList.add("excluir");
        excluirBtn.innerHTML = '<i class="fas fa-trash"></i>';

        td.appendChild(editarBtn);
        td.appendChild(excluirBtn);

        return td;
    }
});
