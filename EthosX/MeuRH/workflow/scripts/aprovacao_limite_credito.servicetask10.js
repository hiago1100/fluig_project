function servicetask10(attempt, message) {

	log.info("=======================================================");
	log.info("INICIO DE APROVAÇAO DE CREDITO");
	log.info("=======================================================");
	
	var processo = getValue("WKNumProces");
	var campos   = hAPI.getCardData(processo);
	var itens = createjson(campos);	
	var obj = createJsonToApi(itens); 	
	var api = sendToApi(obj)

	if (api != true) {
		throw api;
	}

	log.info("=======================================================");
	log.info("FIM DE APROVAÇAO DE CREDITO");
	log.info("=======================================================");
	
}


var createjson = function (campos) {
	
	var vetor = [];
	var contador = campos.keySet().iterator();	
	while (contador.hasNext()) {
		var id = contador.next();
	
		if (id.match('tdsafra___')) { 
			var campo = campos.get(id);
			var seq   = id.split("___");
	
			var CODVENDA = campos.get("tdaprovacao___" + seq[1]).trim();
			var GRPVENDA = campos.get("tdgrpvenda___" + seq[1]).trim();
			var SAFRA = campos.get("tdsafra___" + seq[1]).trim();
			var LMTDISPONIVEL = campos.get("tdlmtdisponivel___" + seq[1]).trim();
			var LMTCALCULADO = campos.get("tdlmtcalculado___" + seq[1]).trim();
			var LMTTEMPORARIO = campos.get("tdlmttemporario___" + seq[1]).trim();
			var ORIGEM = campos.get("tdorigem___" + seq[1]).trim();
			var LMTCLEAN = campos.get("tdlmtclean___" + seq[1]).trim();
			var PDBLOQUEADO = campos.get("tdpdbloqueado___" + seq[1]).trim();
			var PDLIBERADO = campos.get("tdpdliberado___" + seq[1]).trim();
			var SLDDUPLICADO = campos.get("tdsldduplicado___" + seq[1]).trim();			
			var MOTIVO = campos.get("tdmotivo___" + seq[1]).trim();			
			var APROVACAO = (LMTTEMPORARIO == ORIGEM);

			var json = { 
				"grupovenda" :  CODVENDA + "" ,
				"safra" : SAFRA + "" ,
				"aprova" : APROVACAO,
				"limitetemp" : convertToFloat(LMTTEMPORARIO) + "",
				"motivo" : MOTIVO + ""
			};
			
			vetor.push(json);

		}
	}
		
	return vetor;
	
}

function createJsonToApi(vetor) {

	var obj = {
		"companyId" : "1",
		"serviceCode" : "RESTPROTHEUS",
		"endpoint" : "/aprovcredito",
		"method" : "post",
		"params" : {
	  		"aprovacoes" : 
	  			vetor	
		}
	};

	log.dir(obj);
	
	obj = JSON.stringify(obj);
	return obj;
}


function sendToApi(json) {
	
	var c1 = DatasetFactory.createConstraint('retorno', json, json, ConstraintType.MUST);	
	var dataset = DatasetFactory.getDataset('ds_sendAprovLimiteCreditoApi', null, new Array(c1), null);
	var retorno = dataset.getValue(0, "retorno");

	log.info("=======================================================");
	log.info("RETORNO DA API");
	log.info("=======================================================");
	
	log.info(retorno);

	if (retorno == '{"message":"The request has been fulfilled and resulted in a new resource being created."}') {
		return true;		
	}
	else{
		return retorno;
	}

}

var convertToFloat = function(valor){

	valor = valor.trim();
    valor = valor.replace("R$","");
    valor = valor.replace(".","");
	valor = valor.replace(",",".");	
	valor = parseFloat(valor);
    return valor;

}