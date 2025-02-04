document.getElementById('filtro').addEventListener('input', function() {
    let filtro = this.value.toLowerCase();
    let pacientes = document.querySelectorAll('#tabela-pacientes .paciente');  

    pacientes.forEach(function(paciente) {
        let nomePaciente = paciente.querySelector('.info-nome').textContent.toLowerCase();  

        if (nomePaciente.includes(filtro)) {
            paciente.style.display = '';  
        } else {
            paciente.style.display = 'none';  
        }
    });
});
