var pacientes = document.querySelectorAll(".paciente");

for(var i = 0; i < pacientes.length; i++){
    var paciente = pacientes[i];

    var tdAltura = paciente.querySelector(".info-altura");
    var altura = parseFloat(tdAltura.textContent);

    var tdPeso = paciente.querySelector(".info-peso");
    var peso = parseFloat(tdPeso.textContent);

    var tdImc = paciente.querySelector(".info-imc");

    var imc = calculaImc(peso, altura);

    var pesoValido = validaPeso(peso);
    var alturaValido = validaAltura(altura);

    if(!pesoValido && !alturaValido){
        tdImc.textContent = "Altura e peso invalidos!";
        paciente.classList.add("linha-invalida");
    }
    else if(!alturaValido){
        tdImc.textContent = "Altura invalida!";
        paciente.classList.add("linha-invalida");
        
    }else if(!pesoValido){
        tdImc.textContent = "Peso invalido!";
        paciente.classList.add("linha-invalida");
    }else{
        tdImc.textContent = imc.toFixed(2);
    }
}

function calculaImc(peso,altura){
    var imc = 0;

    imc= peso / (altura*altura);

    return imc;
}


function validaPeso(peso){
    if(peso > 0 && peso <= 200){
        return true
    }else{
        return false;
    }
}

function validaAltura(altura){
    if(altura > 0 && altura <= 2.5){
        return true
    }else{
        return false;
    }
}






