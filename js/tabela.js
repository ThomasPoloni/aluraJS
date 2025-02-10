document.addEventListener("DOMContentLoaded", function () {
    const tabela = document.getElementById("tabela-pacientes");

    carregarPacientes();

    function carregarPacientes() {
        const pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];
        tabela.innerHTML = "";
        pacientes.forEach(adicionarPacienteNaTabela);
        carregarEventosDeAcoes();
    }

    function adicionarPacienteNaTabela(paciente) {
        if (document.querySelector(`tr[data-id="${paciente.id}"]`)) return;

        const pacienteTr = document.createElement("tr");
        pacienteTr.classList.add("paciente");
        pacienteTr.setAttribute("data-id", paciente.id);

        pacienteTr.appendChild(createData(paciente.nome, "info-nome"));
        pacienteTr.appendChild(createData(paciente.peso, "info-peso"));
        pacienteTr.appendChild(createData(paciente.altura, "info-altura"));
        pacienteTr.appendChild(createData(paciente.gordura, "info-gordura"));
        pacienteTr.appendChild(createData(paciente.imc, "info-imc"));
        pacienteTr.appendChild(createAcoes(paciente.id));

        tabela.appendChild(pacienteTr);
    }

    function createData(value, className) {
        const td = document.createElement("td");
        td.classList.add(className);
        td.textContent = value;
        return td;
    }

    function createAcoes(id) {
        const td = document.createElement("td");
        td.classList.add("acoes");

        const editarBtn = document.createElement("button");
        editarBtn.classList.add("editar");
        editarBtn.innerHTML = '<i class="fas fa-edit"></i>';
        editarBtn.addEventListener("click", function () {
            editarPaciente(id);
        });

        const excluirBtn = document.createElement("button");
        excluirBtn.classList.add("excluir");
        excluirBtn.innerHTML = '<i class="fas fa-trash"></i>';


        td.appendChild(editarBtn);
        td.appendChild(excluirBtn);

        return td;
    }

    function editarPaciente(id) {
        const pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];
        const paciente = pacientes.find(p => p.id === id);

        if (paciente) {
            localStorage.setItem("pacienteEditando", JSON.stringify(paciente));
            window.location.href = "form.html";
        }
    }

    function excluirPaciente(id) {
        const confirmacao = confirm("Deseja excluir este paciente?");
        if (!confirmacao) return;

        let pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];
        pacientes = pacientes.filter(paciente => paciente.id !== id);
        localStorage.setItem("pacientes", JSON.stringify(pacientes));

        carregarPacientes();
    }

    function carregarEventosDeAcoes() {
        document.querySelectorAll(".editar").forEach(botao => {
            botao.addEventListener("click", function () {
                const id = this.closest("tr").getAttribute("data-id");
                editarPaciente(id);
            });
        });

        document.querySelectorAll(".excluir").forEach(botao => {
            botao.addEventListener("click", function () {
                const id = this.closest("tr").getAttribute("data-id");
                excluirPaciente(id);
            });
        });
    }

    function calcularIMC(peso, altura) {
        return (peso / (altura * altura)).toFixed(2);
    }

    function preencherTabela(pacientes) {
        tabela.innerHTML = "";

        pacientes.forEach(paciente => {
            if (!document.querySelector(`tr[data-id="${paciente.id}"]`)) {
                const imc = calcularIMC(paciente.peso, paciente.altura);
                paciente.imc = imc;

                adicionarPacienteNaTabela(paciente);
            }
        });

        carregarEventosDeAcoes();
    }

    document.getElementById('buscar').addEventListener('click', function () {
        fetch('pacientes.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao carregar o arquivo JSON.');
                }
                return response.json();
            })
            .then(data => {
                if (Array.isArray(data)) {
                    let pacientesExistentes = JSON.parse(localStorage.getItem('pacientes')) || [];

                    const novosPacientes = data.filter(paciente =>
                        !pacientesExistentes.some(p => p.id === paciente.id)
                    );

                    if (novosPacientes.length > 0) {
                        pacientesExistentes = [...pacientesExistentes, ...novosPacientes];
                        localStorage.setItem('pacientes', JSON.stringify(pacientesExistentes));
                        preencherTabela(pacientesExistentes);
                    }
                } else {
                    throw new Error('Formato de dados inesperado.');
                }
            })
            .catch(error => {
                console.error('Erro ao buscar os dados:', error.message);
                alert('Houve um erro ao carregar os dados. Veja o console para mais detalhes.');
            });
    });

    const pacientesSalvos = JSON.parse(localStorage.getItem('pacientes')) || [];
    preencherTabela(pacientesSalvos);
});

document.getElementById("novo-paciente").addEventListener("click", function() {
    window.location.href = "form.html";
});
