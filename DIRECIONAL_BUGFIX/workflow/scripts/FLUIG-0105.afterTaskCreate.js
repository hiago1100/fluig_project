
function afterTaskCreate(colleagueId){
	
	log.info("------------------------------------------------")
	log.info("Movimentação de Pessoal - EVENTO afterTaskCreate");
	
	var numProcesso = getValue("WKNumProces");
	var	transferencia = hAPI.getCardValue("cpTransferencia");
	var	proxAtividade = getValue("WKNextState");
	
	if (proxAtividade == 80) {

		var Prazo  = DataProcessamento();
		
	   hAPI.setDueDate(numProcesso, 0, colleagueId, Prazo, 64800);
	}
	
	log.info("----------------------------")
	log.info("Alterando campo descritor...");
	
	var descricao = getDescricao(proxAtividade, transferencia);
	
	hAPI.setCardValue("cpDescritor", descricao);
	
	log.info("----------------------------------------------------")
	log.info("Movimentação de Pessoal - FIM EVENTO afterTaskCreate");
	log.info("----------------------------------------------------")
	
	addCentralTarefasInfo(getValue("WKDef"),getValue("WKNumProces"));  
}

///////////////////////////////////////////////////////////////////////

var getDescricao = function(atividade, transferecia) {

    var descricao = '';
    
    if (atividade == 80 || atividade == 84) {
        descricao += 'Transferência ';
        descricao += transferecia == 1 ? 'Sim' : 'Não';
        
    } else {
        descricao += hAPI.getCardValue("cpColaborador");
    }
    
    if (transferecia == 1) {
        descricao += ', Origem: ' + hAPI.getCardValue("cpZoomObraDep");
        descricao += ', Destino: ' + hAPI.getCardValue("cpZoomNovaObraDepTransPadrao");
    } else {
        descricao += ', Departamento: ' + hAPI.getCardValue("cpZoomObraDep");
    }
    
    return descricao;
};

var recheckFerias = function() {
    var chapa = hAPI.getCardValue('cpMatricula'),
        coligada = hAPI.getCardValue('cpCodEmpresa');
    
    return checkFerias(chapa, coligada);
};

var checkFerias = function(chapa, coligada) {
    var periodosAquisitivos = getPeriodosAquisitivos(chapa, coligada);

    return periodosAquisitivos.some(function(periodo){
        return checkFeriasCadastradas(periodo, chapa, coligada);
    });
};

var checkFeriasCadastradas = function(periodo, chapa, coligada) {
    var feriasCadastradas = getFeriasCadastradas(chapa, coligada, String(periodo[3]).substring(0,10));

    return feriasCadastradas.some(function(ferias){
        return checkFeriasMarcada(ferias);
    });
};


var checkFeriasMarcada = function(ferias) {

    var dataInicio = converteData(ferias[4], true),
        dataFim = converteData(ferias[5], true),
        mes = String(ferias[5]).substring(5, 7),
        ano = String(ferias[5]).substring(0, 4),
        hoje = new Date();
    
    if (dataFim > hoje) {
        
        var periodoFerias = converteData(ferias[4]) + ' até ' + converteData(ferias[5]);
        
        hAPI.setCardValue('cpPeriodoFerias', periodoFerias);
        
        var comp = getMesCompetencia(getMeses(dataInicio, dataFim));
        
        hAPI.setCardValue('cpMesCompetencia', comp);
        
        return true;
    }
    return false;
};


// DATASETS
var getPeriodosAquisitivos = function(chapa, coligada) {
    var datasetResult = DatasetFactory.getDataset("DS_FLUIG_0017", [chapa, coligada], null, null),
        periodos = datasetResult.values;
    periodos.reverse();
    return periodos;
};

var getFeriasCadastradas = function(chapa, coligada, fimPeriodoAquisitivo) {
    var datasetResult = DatasetFactory.getDataset("DS_FLUIG_0018", [chapa, coligada, fimPeriodoAquisitivo ], null, null);
    return datasetResult.values;
};

// Utils
var converteData = function(dateString, toObj) {

    dateString = String(dateString).substring(0, 10).split('-');
    var converted = new Date();
    
    converted.setYear(dateString[0]);
    converted.setMonth(dateString[1] - 1);
    converted.setDate(dateString[2]);
    
    if (toObj) {
        return converted;
    }
    
    var dia = converted.getDate() > 9 ? converted.getDate() : '0' + converted.getDate(),
        mes = converted.getMonth() + 1 > 9 ? converted.getMonth() + 1 : '0' + (converted.getMonth() + 1);
        
    return dia + '/' + mes + '/' + converted.getFullYear();
}

var getMeses = function(inicio, fim) {
    
    var meses = [];
    
    while ((inicio.getMonth() <= fim.getMonth() && inicio.getFullYear() <= fim.getFullYear()) || inicio.getFullYear() < fim.getFullYear()) {
        meses.push({
            mes: inicio.getMonth(),
            ano: inicio.getFullYear()
        });
        inicio.setMonth(inicio.getMonth() + 1);
    }
    
    return meses;
};

var isLastDayOfMonth = function(date) {
    var mesAtual = date.getMonth();
    date.setDate(date.getDate() + 1);
    
    return mesAtual == date.getDate();
};

//cal data 
var DataProcessamento = function() {
    var competencia = new Date();
    
    competencia.setDate(01);
    
    competencia.setMonth(competencia.getMonth() + 1);
    
    var mesesFerias= hAPI.getCardValue("cpPeriodoFimFerias");
	var Transferencia= hAPI.getCardValue("cpTransferencia"); 
	if (mesesFerias) {
		var fim = new Date(mesesFerias);
		if(fim>competencia){
        competencia.setMonth(fim.getMonth());
        competencia.setYear(fim.getFullYear());
          competencia.setMonth(competencia.getMonth() + 1);
		}
	}
	
	if (competencia.getMonth() === 11 && Transferencia=="1") {
	    competencia.setMonth(competencia.getMonth() + 1);
	    
	    
	}

	 var mes = competencia.getMonth() + 1;
	    
	    if (mes < 10) {
	        mes = '0' + mes;
	    }
	    var numProcesso = getValue("WKNumProces");
		var prazo = new Date(mes + '/' + 10 + '/' + competencia.getFullYear())
		log.info("Andre prazo"+ prazo)
		var novoMesCompetencia = (mes + "/" + competencia.getFullYear());
		log.info("Andre novoMesCompetencia"+ novoMesCompetencia)
	    hAPI.setCardValue("cpMesCompetencia", novoMesCompetencia);
	 
		return prazo;
	    
}

var getMesCompetencia = function(mesesFerias) {
    var competencia = new Date();
    
    competencia.setDate(01);
    
    competencia.setMonth(competencia.getMonth() + 1);
    
   /* if(isLastDayOfMonth(competencia) && competencia.getHours() > 17){
        competencia.setMonth(competencia.getMonth() + 1);
    }*/
	var cpTransferencia= hAPI.getCardValue("cpTransferencia"); 
    if (mesesFerias && (mesesFerias[0].mes <= competencia.getMonth() || 
    		mesesFerias[0].ano < competencia.getFullYear())) {
        var fim = mesesFerias.pop()
        
        competencia.setMonth(fim.mes);
        competencia.setYear(fim.ano);
        competencia.setMonth(competencia.getMonth() + 1);
    }
    
    if (competencia.getMonth() === 11 && cpTransferencia=="1") {
        competencia.setMonth(competencia.getMonth() + 1);
    }
    
    var mes = competencia.getMonth() + 1;
    
    if (mes < 10) {
        mes = '0' + mes;
    }

    return (mes + "/" + competencia.getFullYear());
}

//Converte data do formato mm/aaaa ou dd/mm/aaaa para objeto Date()
function converteData(dateString) {
	var dateArray = String(dateString).split("/");
	
	if (dateArray.length == 3) {
		return new Date(dateArray[2], dateArray[1] - 1, dateArray[0]);
	}
	
	return new Date(dateArray[1], dateArray[0] - 1);
}

function inArray(array, value) {
	var i;
	for (i = 0; i < array.length; i++) {
		if (array[i] == value) {
			return true;
		}
	}
	return false;
};