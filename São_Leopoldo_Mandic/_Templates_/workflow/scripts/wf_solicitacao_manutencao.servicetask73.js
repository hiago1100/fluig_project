function servicetask73(attempt, message) {
	log.info("====== Integracao Combio DKP (Inicio) ======");

  try {
      // Utiliza o ServiceManager para obter uma referencia ao servico.
      var serviceProvider = ServiceManager.getService('WSEXECBO');
      var serviceLocator  = serviceProvider.instantiate('com.totvs.framework.ws.execbo.service.WebServiceExecBO');
      var service = serviceLocator.getWebServiceExecBOPort();
      var numeroOrden =  hAPI.getCardValue("numOrdem");
      var equipamento = hAPI.getCardValue('descricaoEquipamento_aux');
      var manutencao = hAPI.getCardValue('manutencao_aux');
      var descricao = hAPI.getCardValue('descSituacao');
      var equipe = hAPI.getCardValue('equipe_aux');
      var mail = hAPI.getCardValue('emailSolicitante');
      var numDoc = getValue("WKCardId");
      var numProces = getValue("WKNumProces"); // esse aqui 
      var numeroDocumento = getValue("WDNrDocto");
      log.info('idFluig: ' +numDoc + 'numeroProcesso: ' + numProces + 'numeroDocumento: ' + numeroDocumento);
      log.info('Equipamento: ' +equipamento +' Manutencao: ' + manutencao + ' Descricao: ' + descricao + 'Equipe:' + equipe);

      var param = [{
                               dataType: "integer",
                               name: "piOrdemServic",
                               value: ""+numeroOrden,
                               type: "input"
                   },
                   {
                               dataType: "character",
                               name: "pcDataEntrega",
                               value: "",
                               type: "output"
                   }              
                   ]

/*      var param = [{
                               "dataType": "integer",
                               "name": "piOrdemServic",
                               "value": "607371",
                               "type": "input"
                },
{
                               "dataType": "character",
                               "name": "pcDataEntrega",
                               "value": "",
                               "type": "output"
                               }              
                               ]*/

      log.info("========= Parametros getData:");
      log.info(param);
      var jsonParams = JSON.stringify(param);
      log.info("========= Parametros da procedure convertido getData:");
      log.info(jsonParams);

      // Faz login e recebe o token de autenticacao
      var token = service.userLogin(mail);
      log.info("========= TOKEN: " + token);

      var resp = service.callProcedureWithToken(token, "esdkp/esdkp0001.p", "getDataEntrega", jsonParams);
      
      // Converte o resultado para um objeto
      var respObj = JSON.parse(resp);
      log.info('============= RetornoJSON dtEntrega:');    
      log.info(resp);    
     

      for(var i in respObj){
        var dtEntrega = respObj[0].value;
       
        log.info("=============== data de entrega: " + dtEntrega + " ======");
      }
       hAPI.setCardValue("dtEntrega", dtEntrega);


      // if(msgSucesso != 'OK'){
      //   log.info('====Msg ' + msgSucesso);
      //   throw msgSucesso;
      // }

    }catch(error) {    
      log.error("==== Erro na Integracao " + error + " / " + error.message); 
     

    }


    log.info("====== Integracao Combio DKP (FIM) ======");
}