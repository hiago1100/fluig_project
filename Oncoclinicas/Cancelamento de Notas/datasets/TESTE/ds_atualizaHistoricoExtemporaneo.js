function createDataset(fields, constraints, sortFields) {
	 
	 log.info("INICIO DATASET"); 
    
    var dataset = DatasetFactory.newDataset();
    
    dataset.addColumn("SUCESSO");
    dataset.addColumn("MENSAGEM");


    var periodicService = ServiceManager.getService('ws_cancelamentoNota');
    var serviceHelper = periodicService.getBean();
    // GET
    var serviceLocator = serviceHelper.instantiate('br.com.oncoclinicas.webservices.wsexclusaonf_apw.WSEXCLUSAONF');
    var service = serviceLocator.getWSEXCLUSAONFSOAP();
    // SET + FILIAL PARAMETRO
    var dados = serviceHelper.instantiate("br.com.oncoclinicas.webservices.wsexclusaonf.WSDADOSNOTAFISCAL");

    log.info("INICIO DAS CHAMADAS"+dados);    

    var filial = "";

    var idFluig = "";
    var numeroNF = "";
    var serieNF = "";  
    
    for ( var i in constraints) {
        if(constraints[i].fieldName == "FILIAL"){
            filial = constraints[i].initialValue;
        }
        if(constraints[i].fieldName == "IDFLUIG"){
            idFluig = constraints[i].initialValue;
        }
        if(constraints[i].fieldName == "NUMERONF"){
            numeroNF = constraints[i].initialValue;
        }
        if(constraints[i].fieldName == "SERIENF"){
            serieNF = constraints[i].initialValue;
        }        
    }
    

    dados.setFILIAL(filial);
    dados.setIDFLUIG(idFluig);
    dados.setNUMERONF(numeroNF);
    dados.setSERIENF(serieNF);
    
    // dados.setNOTAFISCAL("04101","0000","000009195","1");
     
     log.info("PASSAGEM DOS DADOS");
     



    var resultObj = service.wsatualizahistoricoextemporaneo(dados);
    var result = resultObj.getWSRETEXCLUINF().get(0);
    
    log.info("RESULTADO DA INTEGRAÇÃO"+ result.getTITULO());
    
    dataset.addRow(new Array(result.getSUCESSO(),
    						 result.getTITULO()));

    log.info("RESULTADO DA INTEGRAÇÃO FINAL");
    
    return dataset;
    
}


