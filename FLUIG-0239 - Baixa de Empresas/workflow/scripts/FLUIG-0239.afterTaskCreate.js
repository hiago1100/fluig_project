function afterTaskCreate(colleagueId){
var atividade = getValue('WKCurrentState');
var horaDoPrazo = (24*60*60) - 1;
var numeroDaSolicitacao = getValue('WKNumProces');
var prazoFormulario;
var threadDaSolicitacao = 0;
var responsavelPelaTarefa = colleagueId;

if (atividade == 70) {
    	prazoFormulario = tratamentoDeData(hAPI.getCardValue("dtPrevisaoReg"));
    if (prazoFormulario != undefined && prazoFormulario != '') {             
        // Altera o prazo de conclusão
        hAPI.setDueDate(numeroDaSolicitacao, threadDaSolicitacao, responsavelPelaTarefa, prazoFormulario, horaDoPrazo);
        
        log.warn("PASSOUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU");
    }
} 

if (atividade == 74) {
        prazoFormulario = tratamentoDeData(hAPI.getCardValue("dtPrevRegCont"));
    if (prazoFormulario != undefined && prazoFormulario != '') {             
        // Altera o prazo de conclusão
        hAPI.setDueDate(numeroDaSolicitacao, threadDaSolicitacao, responsavelPelaTarefa, prazoFormulario, horaDoPrazo);
    }
}

if (atividade == 78) {
        prazoFormulario = tratamentoDeData(hAPI.getCardValue("dtPrevRegCont"));
    if (prazoFormulario != undefined && prazoFormulario != '') {             
        // Altera o prazo de conclusão
        hAPI.setDueDate(numeroDaSolicitacao, threadDaSolicitacao, responsavelPelaTarefa, prazoFormulario, horaDoPrazo);
    }
}

if (atividade == 82) {
        prazoFormulario = tratamentoDeData(hAPI.getCardValue("dtFisVer"));
    if (prazoFormulario != undefined && prazoFormulario != '') {             
        // Altera o prazo de conclusão
        hAPI.setDueDate(numeroDaSolicitacao, threadDaSolicitacao, responsavelPelaTarefa, prazoFormulario, horaDoPrazo);
    }
}

if (atividade == 86) {
        prazoFormulario = tratamentoDeData(hAPI.getCardValue("dtAdmVer"));
    if (prazoFormulario != undefined && prazoFormulario != '') {             
        // Altera o prazo de conclusão
        hAPI.setDueDate(numeroDaSolicitacao, threadDaSolicitacao, responsavelPelaTarefa, prazoFormulario, horaDoPrazo);
    }
}

if (atividade == 90) {
        prazoFormulario = tratamentoDeData(hAPI.getCardValue("dtDepVer"));
    if (prazoFormulario != undefined && prazoFormulario != '') {             
        // Altera o prazo de conclusão
        hAPI.setDueDate(numeroDaSolicitacao, threadDaSolicitacao, responsavelPelaTarefa, prazoFormulario, horaDoPrazo);
    }
}

if (atividade == 94) {
        prazoFormulario = tratamentoDeData(hAPI.getCardValue("dtCpVer"));
    if (prazoFormulario != undefined && prazoFormulario != '') {             
        // Altera o prazo de conclusão
        hAPI.setDueDate(numeroDaSolicitacao, threadDaSolicitacao, responsavelPelaTarefa, prazoFormulario, horaDoPrazo);
    }
}

if (atividade == 109) {
        prazoFormulario = tratamentoDeData(hAPI.getCardValue("dtAssVer"));
    if (prazoFormulario != undefined && prazoFormulario != '') {             
        // Altera o prazo de conclusão
        hAPI.setDueDate(numeroDaSolicitacao, threadDaSolicitacao, responsavelPelaTarefa, prazoFormulario, horaDoPrazo);
    }
}

if (atividade == 114) {
        prazoFormulario = tratamentoDeData(hAPI.getCardValue("dtCrVer"));
    if (prazoFormulario != undefined && prazoFormulario != '') {             
        // Altera o prazo de conclusão
        hAPI.setDueDate(numeroDaSolicitacao, threadDaSolicitacao, responsavelPelaTarefa, prazoFormulario, horaDoPrazo);
    }
}

if (atividade == 119) {
        prazoFormulario = tratamentoDeData(hAPI.getCardValue("dtGesVer"));
    if (prazoFormulario != undefined && prazoFormulario != '') {             
        // Altera o prazo de conclusão
        hAPI.setDueDate(numeroDaSolicitacao, threadDaSolicitacao, responsavelPelaTarefa, prazoFormulario, horaDoPrazo);
    }
}


} 

function tratamentoDeData(value){
    // Normalmente 0, quando não for atividade paralela             
    var arrayPrazoConclusao = value.split("/");
    var dia = arrayPrazoConclusao[0]; 
    var mes = arrayPrazoConclusao[1] - 1; 
    var ano = arrayPrazoConclusao[2];    
    var dataDoPrazo = new Date();
    dataDoPrazo.setDate(dia);
    dataDoPrazo.setMonth(mes);
    dataDoPrazo.setFullYear(ano);

    return dataDoPrazo;
}