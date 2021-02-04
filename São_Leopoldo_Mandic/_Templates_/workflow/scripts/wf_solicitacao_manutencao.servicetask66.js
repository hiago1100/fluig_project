function servicetask66(attempt, message) {
	log.info("====== Integracao Combio DKP (Inicio) ======");

	try{
	 
		var mail = hAPI.getCardValue('emailSolicitante');
		log.info("======= PASSO 1");
		 var serviceProvider = ServiceManager.getService('WSEXECBO');
		
		log.info("======= PASSO 2");
	    var serviceLocator  = serviceProvider.instantiate('com.totvs.framework.ws.execbo.service.WebServiceExecBO');
	    
	    log.info("======= PASSO 3");
	    var service = serviceLocator.getWebServiceExecBOPort();
	     
	    log.info("======= PASSO 4 TOKEN: ");
	    log.info("=========Email usuario: " + mail);
	    var token = service.userLogin(mail);
	    log.info(token);

	    var numeroOrden =  hAPI.getCardValue("numOrdem");
	    var idForm = getValue("WKCardId");
	    var dataManut = hAPI.getCardValue("dtManutencao");
	    var dataTermino = hAPI.getCardValue("dtTermino");
	    var planejador = hAPI.getCardValue("planejador_aux");
	    var quantidadeSolicitada = hAPI.getCardValue("qtdItem");
	    var quantidadeEstoque = hAPI.getCardValue("item_quantidade");
	    var codigoItem = hAPI.getCardValue("item_aux");


	    //PARAMETROS ------------------------------------------------------------------------
	    var pcNrOrdManut = new Object();
	    pcNrOrdManut.dataType = "integer";
	    pcNrOrdManut.name = "pcNrOrdManut";
	    pcNrOrdManut.value = ""+parseInt(numeroOrden);
	    pcNrOrdManut.type = "input";

	   
	    // var quantSaldo = new Object();
	    // quantSaldo.dataType = "decimal";
	    // quantSaldo.name = "quantSaldo";
	    // quantSaldo.value = ""+quantidadeEstoque;
	    // quantSaldo.type = "input";

	    // var quantSolic = new Object();
	    // quantSolic.dataType = "decimal";
	    // quantSolic.name = "quantSolic";
	    // quantSolic.value = ""+quantidadeSolicitada;
	    // quantSolic.type = "input";

	    

	  
		var itCodigo = new Object();
	    itCodigo.name = "itCodigo";
	    itCodigo.label = "itCodigo";
	    itCodigo.type = "character";

	    var quantSaldo = new Object();
	    quantSaldo.name = "quantSaldo";
	    quantSaldo.label = "quantSaldo";
	    quantSaldo.type = "decimal";


	    var quantSolic = new Object();
	    quantSolic.name = "quantSolic";
	    quantSolic.label = "quantSolic";
	    quantSolic.type = "decimal";

	    var ttOrdItem_fields = [itCodigo, quantSaldo, quantSolic]; 
	    
	    // var process = getValue("WKNumProces");
	    
	       var process = getValue("WKNumProces");
	    	    var ttOrdItem_value = new Array();
	    	    var i = 0;
	            var cardData = new java.util.HashMap();
	        	cardData = hAPI.getCardData(process);
	        	var keys = cardData.keySet().toArray();

	        	for ( var key in keys) {
	        		var field = keys[key];
	        		if (field.indexOf("item_aux___") > -1) {
	        			var row = field.replace("item_aux___", "");
	        			var valores = new Object();
	        	    	valores.itCodigo    = ""+(hAPI.getCardValue("item_aux" + "___" + row));
	    				valores.quantSaldo   = ""+ hAPI.getCardValue("item_quantidade" + "___" + row);
	    				valores.quantSolic      = ""+ hAPI.getCardValue("qtdItem" + "___" + row);
	        			ttOrdItem_value[i] = valores;
	        			i++;
	        		}
	        	}
    	

    	// var valores = new Object();
    	// valores.itCodigo = ""+codigoItem;
    	// valores.quantSaldo = ""+quantidadeEstoque;
    	// valores.quantSolic = ""+quantidadeSolicitada;
    	// var ttOrdItem_value = new Array();
    	// ttOrdItem_value[0] = valores;

	    //formador do paremetro value para temp-table -------------------------------------------------------


	    var ttOrdItem_tabela = new Object();
	    ttOrdItem_tabela.name = "ttOrdItem";
	    ttOrdItem_tabela.fields = ttOrdItem_fields;
	    ttOrdItem_tabela.records = ttOrdItem_value;

	    var ttOrdItem = new Object();
	    ttOrdItem.name = "ttOrdItem";
	    ttOrdItem.type = "input";
	    ttOrdItem.dataType = "temptable";    
	    ttOrdItem.value = ttOrdItem_tabela;

	    //TEMP-TABLE DE RETORNO
	    var pcMsgErro = new Object();
	    pcMsgErro.dataType = "character";
	    pcMsgErro.name = "pcMsgErro";
	    pcMsgErro.value = "";
	    pcMsgErro.type = "output";

	    //array para receber os parametros input da chamada da função
	    var params = [pcNrOrdManut,  ttOrdItem, pcMsgErro]; 

	    //conversor dos parametros de input para Json
		var jsonParams = JSON.stringify(params);

		log.info(jsonParams);

		//CHAMA API PASSANDO SEUS PAREMETROS
		log.info("======= PASSO 5 SLC");
		var resp = service.callProcedureWithToken(token, "esdkp/esdkp0002.p", "integracaoSolicCompraFluig", jsonParams);

		log.warn("======= PASSO 6 SLC");
		var respObj = JSON.parse(resp);

		log.info(JSON.stringify(respObj));

		for(var i in respObj){
        var msgRetorno = respObj[i].value;
        // log.info(numOrdem + " ======" + "==========" + numSolicita + "===========" +  msgSucesso);
      }

		if (msgRetorno != "OK") {
			throw (msgRetorno);
		}

		log.info("====== Integracao Combio DKP (Fim) ======");

	}catch(error) {    

		throw(error);
      	log.error("==== Erro na Integracao " + error + " / " + error.message); 
      	hAPI.setCardValue("msErro", error);
  }


}