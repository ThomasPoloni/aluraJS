function calcularIMC(peso, altura) {
    return (peso / (altura * altura)).toFixed(2);
}

function preencherTabela(pacientes) {
    const tabelaPacientes = document.getElementById('tabela-pacientes');
    tabelaPacientes.innerHTML = '';  

    pacientes.forEach(paciente => {
        const imc = calcularIMC(paciente.peso, paciente.altura); 

        const tr = document.createElement('tr');
        tr.classList.add('paciente');
        
        tr.innerHTML = `
            <td class="info-nome">${paciente.nome}</td>
            <td class="info-peso">${paciente.peso}</td>
            <td class="info-altura">${paciente.altura}</td>
            <td class="info-gordura">${paciente.gordura}</td>
            <td class="info-imc">${imc}</td>
            <td class="acoes">
                <button class="editar"><i class="fas fa-edit"></i></button>
                <button class="excluir"><i class="fas fa-trash"></i></button>
            </td>
        `;
        
        tabelaPacientes.appendChild(tr);
    });
}

document.getElementById('buscar').addEventListener('click', function() {
    fetch('https://raw.githubusercontent.com/loresgarcia/Pacientes-API/master/pacientes.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar os dados da URL.');
            }
            return response.json(); 
        })
        .then(data => {
            if (Array.isArray(data)) { 
                preencherTabela(data);
            } else {
                throw new Error('Formato de dados inesperado.');
            }
        })
        .catch(error => {
            console.error('Erro ao buscar os dados:', error.message);
            alert('Houve um erro ao buscar os dados. Veja o console para mais detalhes.');
        });
});
