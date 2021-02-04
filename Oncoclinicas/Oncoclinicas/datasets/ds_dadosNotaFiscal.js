 // Serviço para integração sobre cancelamento de notas
 //  ***** WSEXCLUSAONF ****
 //  Criar dataset para fazer chamada passando numero da nota e série,
 //  Obrigatório a passagem do parâmetro (IdFluig) > (DataSolicitação)
 // Webservice tem como retorno MENSAGEM (Integração OK > NOK)
 // Webservice retorna status da NF (extemporânea / Normal)

 function createDataset(fields, constraints, sortFields) {
	 
	 log.info("INICIO DATASET"); 
    
    var dataset = DatasetFactory.newDataset();
    
    dataset.addColumn("MENSAGEM");
    dataset.addColumn("SUCESSO");
    dataset.addColumn("TIPO");
    
    var periodicService = ServiceManager.getService('ws_cancelamentoNota');
    var serviceHelper = periodicService.getBean();
    // GET
    var serviceLocator = serviceHelper.instantiate('br.com.oncoclinicas.webservices.wsexclusaonf_apw.WSEXCLUSAONF');
    var service = serviceLocator.getWSEXCLUSAONFSOAP();
    // SET + FILIAL PARAMETRO
    var dados = serviceHelper.instantiate("br.com.oncoclinicas.webservices.wsexclusaonf.WSDADOSNOTAFISCAL");

    log.info("INICIO DAS CHAMADAS");    

    var filial = "04101";

    var idFluig = "0000";
    var numeroNF = "000009491";
    var serieNF = "1";  
    
    for ( var i in constraints) {
        if(constraints[i].fieldName == "FILIAL"){
            filial = constraints[i].initialValue;
        }
        if(constraints[i].fieldName == "NUMERONF"){
            numeroNF = constraints[i].initialValue;
        }
    }
    
    dados.setFILIAL(filial);
    dados.setIDFLUIG(idFluig);
    dados.setNUMERONF(numeroNF);
    dados.setSERIENF(serieNF);
    
    log.info("PASSAGEM DOS DADOS");

    var resultObj = service.wsvlddados(dados);
    var result = resultObj.getWSRETEXCLUINF().get(0);
    
    log.info("RESULTADO DA INTEGRAÇÃO"+ result.getMENSAGEM());
    
    var mensagem      =  result.getMENSAGEM();
    var retCase1      =  mensagem.match(/Não foi possivel excluir a(s) nota(s), pois o prazo para o cancelamento da(s)/);
    var retCase2      =  mensagem.match(/O prazo para exclusão de NF de serviço para o município de/);

    if (retCase1 == mensagem.match(/Não foi possivel excluir a(s) nota(s), pois o prazo para o cancelamento da(s)/) || retCase2 == mensagem.match(/O prazo para exclusão de NF de serviço para o município de/) ) {
        ret = "Extemporânea";
    }else{
        ret = "Normal";
    }

    
    dataset.addRow(new Array(result.getMENSAGEM(),
            result.getSUCESSO(),ret));

    log.info("RESULTADO DA INTEGRAÇÃO FINAL");
    
    return dataset;
    
}


