function beforeCancelProcess(colleagueId,processId){

	log.info("Dentro do beforeCancelProcess");

	
	    // Utiliza o ServiceManager para obter uma referencia ao servico.
	    var serviceProvider = ServiceManager.getService('WSEXECBO');
	    var serviceLocator  = serviceProvider.instantiate('com.totvs.framework.ws.execbo.service.WebServiceExecBO');
	    var service = serviceLocator.getWebServiceExecBOPort();

	    var equipamento = hAPI.getCardValue('descricaoEquipamento_aux');
	    var manutencao = hAPI.getCardValue('manutencao_aux');
	    var descricao = hAPI.getCardValue('descSituacao');
	    var equipe = hAPI.getCardValue('equipe_aux');
	    var mail = hAPI.getCardValue('emailSolicitante');
	    var numDoc = getValue("WKCardId");
	    var numProces = getValue("WKNumProces"); // esse aqui 
	    var numeroDocumento = getValue("WDNrDocto");
	    var numeroOrden =  hAPI.getCardValue("numOrdem");
	    log.info('idFluig: ' +numDoc + 'numeroProcesso: ' + numProces + 'numeroDocumento: ' + numeroDocumento);
	  

	    var param = [{
							dataType: "integer",
							name: "pcNrOrdManut",
							value: ""+ numeroOrden,
							type: "input"
						},  {
							dataType: "character",
							name: "pcMsgErro",
							value: "",
							type: "output"
						}]
	    
	    log.info("========= Parametros beforeCancelProcess:");
	    log.info(param);
	    var jsonParams = JSON.stringify(param);
	    log.info("========= Parametros da procedure convertido:");
	    log.info(jsonParams);

	    // Faz login e recebe o token de autenticacao
	    var token = service.userLogin(mail);
	    log.info("========= TOKEN beforeCancelProcess: " + token);

	    if (numeroOrden == "") {
	    	log.info("dentro do if cancelamento");
	    	throw "Solicitação não foi cancelada";
	    }

	    var resp = service.callProcedureWithToken(token, "esdkp/esdkp0002.p", "EliminaOrdManut", jsonParams);
	    
	    // Converte o resultado para um objeto
	    var respObj = JSON.parse(resp);
	    log.info('============= RetornoJSON beforeCancelProcess:');    
	    log.info(respObj);    
	    log.info(resp);
	   

	    for(var i in respObj){
	      var pcMsgErro = respObj[0].value;
	      log.info("===========" +  pcMsgErro + "====================");
	    }

	    if(pcMsgErro != 'OK'){
	      log.info('====Msg ' + pcMsgErro);
	      throw "Solicitação não foi cancelada";
	    }

	     
	

	// log.info("###beforeCancelProcess");
	// 	log.info("processId: "+processId);
		
	// 	var atividade = getValue("WKNumState");
	// 	log.info("atividade: "+atividade);
		
	// 	if(atividade != 4){
	// 		throw "A solicitação só pode ser cancelada na atividade inicial e 'Corrigir NF!'";
	// 	}
}