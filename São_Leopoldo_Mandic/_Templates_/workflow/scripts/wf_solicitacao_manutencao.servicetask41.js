function servicetask41(attempt, message) {

    log.info("====== Integracao Combio DKP (Inicio) ======");

  try {
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
      log.info('idFluig: ' +numDoc + 'numeroProcesso: ' + numProces + 'numeroDocumento: ' + numeroDocumento);
      log.info('Equipamento: ' +equipamento +' Manutencao: ' + manutencao + ' Descricao: ' + descricao + 'Equipe:' + equipe);

      var param = [
                      {dataType:"character",name:"pNomeUsuario",value:"" +mail,type:"input"},
                      {dataType:"character",name:"pCdEquipto",value:""+equipamento,type:"input"},
                      {dataType:"character",name:"pCdManut",value:""+manutencao,type:"input"},
                      {dataType:"character",name:"pDescricao",value:""+descricao,type:"input"},
                      {dataType:"character",name:"pCdEquipRes",value:""+equipe,type:"input"},
                      {dataType:"integer",name:"idProcesso",value:""+numProces,type:"input"},
                      {dataType:"integer",name:"pNrSoliServ",value:0,type:"output"},
                      {dataType:"integer",name:"pNrOrdProdu",value:0,type:"output"},
                      {dataType:"character",name:"pMsgErro",value:"0",type:"output"}
                  ]
      
      log.info("========= Parametros:");
      log.info(param);
      var jsonParams = JSON.stringify(param);
      log.info("========= Parametros da procedure convertido:");
      log.info(jsonParams);

      // Faz login e recebe o token de autenticacao
      var token = service.userLogin(mail);
      log.info("========= TOKEN: " + token);

      var resp = service.callProcedureWithToken(token, "esdkp/esdkp0002.p", "SolicitaOrdemManut", jsonParams);
      
      // Converte o resultado para um objeto
      var respObj = JSON.parse(resp);
      log.info('============= RetornoJSON:');    
      log.info(respObj);    
     

      for(var i in respObj){
        var numSolicita = respObj[0].value;
        var numOrdem = respObj[1].value;
        var msgSucesso = respObj[2].value;
        log.info(numOrdem + " ======" + "==========" + numSolicita + "===========" +  msgSucesso);
      }
      
      hAPI.setCardValue("numOrdem", numOrdem);

      if(msgSucesso != 'OK'){
        log.info('====Msg ' + msgSucesso);
        throw msgSucesso;
      }

       
    }catch(error) {    
      log.error("==== Erro na Integracao " + error + " / " + error.message); 
      hAPI.setCardValue("msErro", error);

    }


    log.info("====== Integracao Combio DKP (FIM) ======");
}