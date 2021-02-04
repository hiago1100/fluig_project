function servicetask25(attempt, message) {

try{
    // var tipo = hAPI.getCardValue("tipoSolicitacao");
    var periodicService = ServiceManager.getService("ws_FechamentoCaixa");
    var serviceHelper = periodicService.getBean();
    var serviceLocator = serviceHelper.instantiate("br.com.oncoclinicas.webservices.wsfechamentocaixa_apw.WSFECHAMENTOCAIXA");
    var service = serviceLocator.getWSFECHAMENTOCAIXASOAP();
    var dados = serviceHelper.instantiate("br.com.oncoclinicas.webservices.wsfechamentocaixa.WSDADOSTRANSFERENCIA");
	var filial = hAPI.getCardValue('cpCodFiliais');
    var strXml = gerarCabecalhoXML();
    dados.setFILIAL(filial);
    dados.setMOVIMENTO(strXml);
    var webService = service.wstransferencia(dados);
    var mensagem = webService.getWSRETTRANSFERENCIA().get(0);
    var SUCESSO = mensagem.getSUCESSO();
    var MENSAGEM = mensagem.getMENSAGEM();

    log.info("MENSAGEM SUCESSO    : " + SUCESSO);
    log.info("MENSAGEM PADRÃO  	  : " + MENSAGEM);
    log.info("strXml PARA INTEGRAÇÃO : " + strXml); 

	if(SUCESSO == 'false'){

     	hAPI.setCardValue('statusIntegracao', "ERRO DE INTEGRAÇAO");
    	throw MENSAGEM;
    }
}catch(e){
	    
	throw e;
}   
}


function gerarCabecalhoXML() {
	 
	   var indices = getChildrenIndexes('dtDeposito');
	   var xml = "";
	   xml +=  "<movimentos>";

	   for (var i = 0; i < indices.length; i++) {
    		
	   		var dataFormat = hAPI.getCardValue('dtDeposito___' + indices[i]).split("/");
	   		var novaData   = dataFormat[0] + "/" + dataFormat[1] + "/" + dataFormat[2];
	   		var valorProtheus = hAPI.getCardValue('cpValor___' + indices[i]).replace('.','');

	        
		    xml +=        "<movimento>";
			xml +=            "<data>"    +novaData+ "</data>";
			xml +=            "<tipo>"    +hAPI.getCardValue('seleTipoPgmt___' + indices[i])+  "</tipo>";
			xml +=            "<banco>"   +hAPI.getCardValue('cpCodigoBanco___' + indices[i])+  "</banco>";
			xml +=            "<agencia>" +hAPI.getCardValue('cpAgencia___' + indices[i])+  "</agencia>";
			xml +=            "<conta>"   +hAPI.getCardValue('cpConta___' + indices[i])+  "</conta>";
			xml +=            "<valor>"   +valorProtheus+  "</valor>";
		    xml +=        "</movimento>";
	        

			log.info("dados integração = "+novaData);
			log.info("dados integração = "+hAPI.getCardValue('seleTipoPgmt___' + indices[i]));
			log.info("dados integração = "+hAPI.getCardValue('cpCodigoBanco___' + indices[i]));
			log.info("dados integração = "+hAPI.getCardValue('cpAgencia___' + indices[i]));
			log.info("dados integração = "+hAPI.getCardValue('cpConta___' + indices[i]));
			log.info("dados integração = "+ valorProtheus);


	    }    
	    
	    xml +=    "</movimentos>";
	
	    return xml ;

	}

	function formatNumIten(num) {
	    num.toString()
	    for (var i = num.length; i <= 4; i++) {
	        num = "0" + num
	    }
	    return num;
	}

	function dataAtual() {
	    var data = new Date();
	    var dia = data.getDate();
	    var mes = data.getMonth() + 1;
	    var ano = data.getFullYear();
	    if (dia < 10) { dia = "0" + dia }
	    if (mes < 10) { mes = "0" + mes }
	    return '' + ano + mes + dia;
	}

	function gethoras() {
	    var data = new Date();
	    var horas = data.getHours();
	    var minutos = data.getMinutes();
	    var segundos = data.getSeconds()
	    return horas + ":" + minutos + ":" + segundos
	}

	function removeAcentos(string) {
	    string = new java.lang.String(string);
	    string = string.toUpperCase();
	    string = string.replaceAll("Á|À|Â|Ã|Ä", "A");
	    string = string.replaceAll("É|È|Ê|Ë", "E");
	    string = string.replaceAll("Í|Ì|Î|Ï", "I");
	    string = string.replaceAll("Ó|Ò|Ô|Õ|Ö", "O");
	    string = string.replaceAll("Ú|Ù|Û|Ü", "U");
	    string = string.replaceAll("Ç", "C");
	    return string
	}

	function removeMascaraMonetaria(valor) {
	    if (valor != undefined && valor != "" && valor != null) {
	        valor = valor.replace("R$", "");
	        valor = valor.replace(" ", "");
	        valor = valor.replace(".", "");
	        valor = valor.replace(".", "");
	        valor = valor.replace(".", "");
	        valor = valor.replace(".", "");
	        valor = valor.replace(".", "");
	        valor = valor.replace(",", ".");
	        valor = parseFloat(valor);
	        return valor.toFixed(4);
	    } else {
	        return 0.0000;
	    }
	}

	function converteData(data) {
	    var dia = data.split("-")[2];
	    var mes = data.split("-")[1];
	    var ano = data.split("-")[0];
	    return '' + ano + mes + dia
	}
	
function getChildrenIndexes(fieldName){

	
	log.info('@@@ NUMERO DO PROCESSO : ' + getValue("WKNumProces"));

	var dados = hAPI.getCardData(getValue("WKNumProces"));
	var entries = dados.entrySet().iterator();
	var indexes = [];

	while (entries.hasNext()) {
		var e = entries.next();
		log.info('>>> fieldName : ' + fieldName);
		log.info('>>> e.getKey(): ' + e.getKey());
		if (e.getKey().match(fieldName + "___")) {
//			if (e.getKey().startWith(fieldName + "___")) {
//			log.info('@@@ getChildrenIndexes indice: ' + e.getKey().split("___")[1]);
			indexes.push(e.getKey().split("___")[1])
		}
	}
	return indexes;
};
