function createDataset(fields, constraints, sortFields) {
    
    var dataset = DatasetFactory.newDataset();
    
    dataset.addColumn("EXTRATO");
    dataset.addColumn("MENSAGEM");
    
    var periodicService = ServiceManager.getService('ws_FechamentoCaixa');
    var serviceHelper = periodicService.getBean();
    // GET
    var serviceLocator = serviceHelper.instantiate('br.com.oncoclinicas.webservices.wsfechamentocaixa_apw.WSFECHAMENTOCAIXA');
    var service = serviceLocator.getWSFECHAMENTOCAIXASOAP();
    // SET + FILIAL PARAMETRO
    var dados = serviceHelper.instantiate("br.com.oncoclinicas.webservices.wsfechamentocaixa.WSDADOSCAIXAGERAL");
    

    var filial = "";    
    
    for ( var i in constraints) {
        if(constraints[i].fieldName == "FILIAL"){
            filial = constraints[i].initialValue;
        }
    }
    
    dados.setFILIAL(filial);
    
    var resultObj = service.wsextratocaixa(dados);
    var result = resultObj.getWSRETCAIXAGERAL().get(0);
    
    log.info("RESULTADO DA INTEGRAÇÃO"+ result.getSALDO());
    
    dataset.addRow(new Array(result.getEXTRATO(),
            result.getMENSAGEM()));
    
    return dataset;
    
}


