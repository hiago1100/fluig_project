function servicetask48(attempt, message) { 	

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

	    var piIdFluig = new Object();
	    piIdFluig.dataType = "integer";
	    piIdFluig.name = "piIdFluig";
	    piIdFluig.value = ""+parseInt(idForm);
	    piIdFluig.type = "input";

	    var pdPrevManut = new Object();
	    pdPrevManut.dataType = "character";
	    pdPrevManut.name = "pdPrevManut";
	    pdPrevManut.value = ""+dataManut;
	    pdPrevManut.type = "input";

	    var pdPrevTerm = new Object();
	    pdPrevTerm.dataType = "character";
	    pdPrevTerm.name = "pdPrevTerm";
	    pdPrevTerm.value = ""+dataTermino;
	    pdPrevTerm.type = "input";

	    var pcCodPlanej = new Object();
	    pcCodPlanej.dataType = "character";
	    pcCodPlanej.name = "pcCodPlanej";
	    pcCodPlanej.value = ""+planejador;
	    pcCodPlanej.type = "input";

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

	    //TEMP-TABLE DE PARAMETROS ------------------------------------------------------------
	    var cdTarefa = new Object();
	    cdTarefa.name = "cdTarefa";
	    cdTarefa.label = "cdTarefa";
	    cdTarefa.type = "integer";

	    var descricao = new Object();
	    descricao.name = "descricao";
	    descricao.label = "descricao";
	    descricao.type = "character";

	    var estadoTaref = new Object();
	    estadoTaref.name = "estadoTaref";
	    estadoTaref.label = "estadoTaref";
	    estadoTaref.type = "integer";

	    var cTempo = new Object();
	    cTempo.name = "cTempo";
	    cTempo.label = "cTempo";
	    cTempo.type = "character";

	    var tpEspecial = new Object();
	    tpEspecial.name = "tpEspecial";
	    tpEspecial.label = "tpEspecial";
	    tpEspecial.type = "character";

	    var nrHomem = new Object();
	    nrHomem.name = "nrHomem";
	    nrHomem.label = "nrHomem";
	    nrHomem.type = "integer";

	    var tempoEspec = new Object();
	    tempoEspec.name = "tempoEspec";
	    tempoEspec.label = "tempoEspec";
	    tempoEspec.type = "character";

	    var alocMinima = new Object();
	    alocMinima.name = "alocMinima";
	    alocMinima.label = "alocMinima";
	    alocMinima.type = "decimal";

	    var alocMaxima = new Object();
	    alocMaxima.name = "alocMaxima";
	    alocMaxima.label = "alocMaxima";
	    alocMaxima.type = "decimal";

	    var tipoEspec = new Object();
	    tipoEspec.name = "tipoEspec";
	    tipoEspec.label = "tipoEspec";
	    tipoEspec.type = "integer";

	    var tipoTempo = new Object();
	    tipoTempo.name = "tipoTempo";
	    tipoTempo.label = "tipoTempo";
	    tipoTempo.type = "integer";

	    var ttOrdTarefEspec_fields = [cdTarefa, descricao, estadoTaref, cTempo, tpEspecial, nrHomem, tempoEspec, alocMinima, alocMaxima, tipoEspec, tipoTempo];

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
	    
	    var process = getValue("WKNumProces");
	    var ttOrdTarefEspec_value = new Array();
	    var i = 0;
        var cardData = new java.util.HashMap();
    	cardData = hAPI.getCardData(process);
    	var keys = cardData.keySet().toArray();

    	for ( var key in keys) {
    		var field = keys[key];
    		if (field.indexOf("tarefa___") > -1) {
    			var row = field.replace("tarefa___", "");
    			var valor = new Object();
    	    	valor.cdTarefa    = parseInt(hAPI.getCardValue("tarefa" + "___" + row));
				valor.descricao   = ""+ hAPI.getCardValue("tbDescricao" + "___" + row);
				valor.estadoTaref = 0;
				valor.cTempo      = ""+ hAPI.getCardValue("tempoExecucao" + "___" + row);
				valor.tpEspecial  = ""+ hAPI.getCardValue("tbEspecialidade_aux" + "___" + row);
				valor.nrHomem     = parseInt(hAPI.getCardValue("homens" + "___" + row));
				valor.tempoEspec  = ""+ hAPI.getCardValue("tempoAlocacao" + "___" + row);
				valor.alocMinima  = parseInt(hAPI.getCardValue("tempoMinimo" + "___" + row));
				valor.alocMaxima  = parseInt(hAPI.getCardValue("tempoMaximo" + "___" + row));
				valor.tipoEspec   = parseInt(hAPI.getCardValue("tipo" + "___" + row));
				valor.tipoTempo   = parseInt(hAPI.getCardValue("tipo2" + "___" + row));
    			ttOrdTarefEspec_value[i] = valor;
    			i++;
    		}
    	}

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

    

	    //formador do paremetro value para temp-table -------------------------------------------------------
	    var tt_tabela = new Object();
	    tt_tabela.name = "ttOrdTarefEspec";
	    tt_tabela.fields = ttOrdTarefEspec_fields;
	    tt_tabela.records = ttOrdTarefEspec_value;

	    var ttOrdTarefEspec = new Object();
	    ttOrdTarefEspec.name = "ttOrdTarefEspec";
	    ttOrdTarefEspec.type = "input";
	    ttOrdTarefEspec.dataType = "temptable";    
	    ttOrdTarefEspec.value = tt_tabela;

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
	    var params = [pcNrOrdManut, piIdFluig, pdPrevManut, pdPrevTerm, pcCodPlanej, ttOrdTarefEspec, ttOrdItem, pcMsgErro]; 

	    //conversor dos parametros de input para Json
		var jsonParams = JSON.stringify(params);

		log.info(jsonParams);

		//CHAMA API PASSANDO SEUS PAREMETROS
		log.info("======= PASSO 5");
		var resp = service.callProcedureWithToken(token, "esdkp/esdkp0002.p", "integraOrdTarefEspec", jsonParams);

		log.warn("======= PASSO 6");
		var respObj = JSON.parse(resp);

		log.info(JSON.stringify(respObj));

		log.info("====== Integracao Combio DKP (Fim) ======");

		for(var i in respObj){
        var msgRetorno = respObj[i].value;
        log.info( "=====Mensagem: ======" +  msgRetorno);
        }


		if (msgRetorno != "OK") {
			throw (msgRetorno);
		}


	}catch(error) {    

		throw(error);
      	log.error("==== Erro na Integracao " + error + " / " + error.message); 
      	hAPI.setCardValue("msErro", error);
  }
}

