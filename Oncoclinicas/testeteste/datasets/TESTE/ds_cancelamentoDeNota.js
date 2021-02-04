 function createDataset(fields, constraints, sortFields) {
	 
	 log.info("INICIO DATASET"); 
    
    var dataset = DatasetFactory.newDataset();
    
    dataset.addColumn("MENSAGEM");
    dataset.addColumn("SUCESSO");
    
    var periodicService = ServiceManager.getService('ws_cancelamentoNota');
    var serviceHelper   = periodicService.getBean();
    // GET
    var serviceLocator = serviceHelper.instantiate('br.com.oncoclinicas.webservices.wsexclusaonf_apw.WSEXCLUSAONF');
    var service = serviceLocator.getWSEXCLUSAONFSOAP();
    // SET + FILIAL PARAMETRO
    var dados = serviceHelper.instantiate("br.com.oncoclinicas.webservices.wsexclusaonf.WSDADOSNOTAFISCAL");

    var serviceExclusao = serviceHelper.instantiate("br.com.oncoclinicas.webservices.wsexclusaonf.WSEXCLUINOTA");

    log.info("INICIO DAS CHAMADAS");    

    var filial   = "";      //hAPI.getCardValue("");
    var idFluig  = "";       //hAPI.getCardValue("");
    var numeroNF = "";  //hAPI.getCardValue("");
    var serieNF  = "";          //hAPI.getCardValue("");
    
    for ( var i in constraints) {
        if(constraints[i].fieldName == "FILIAL"){
            filial = constraints[i].initialValue;
        }
        if(constraints[i].fieldName == "NUMERONF"){
            numeroNF = constraints[i].initialValue;
        }
        if(constraints[i].fieldName == "IDFLUIG"){
            idFluig = constraints[i].initialValue;
        }
        if(constraints[i].fieldName == "SERIENF"){
            serieNF = constraints[i].initialValue;
        }
        
    }
    
    dados.setFILIAL(filial);
    dados.setIDFLUIG(idFluig);
    dados.setNUMERONF(numeroNF);
    dados.setSERIENF(serieNF);
    
    serviceExclusao.setNOTAFISCAL(dados);

    log.info("PASSAGEM DOS DADOS");

    var resultObj = service.wsexcluinota(dados);
    var result = resultObj.getWSRETEXCLUINF().get(0);
    
     log.info("RESULTADO DA INTEGRAÇÃO"+ result.getMENSAGEM());
    
    dataset.addRow(new Array(result.getMENSAGEM(),
            result.getSUCESSO()));

    log.info("RESULTADO DA INTEGRAÇÃO FINAL");
    
    return dataset;
    
}