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
    dataset.addColumn("TITULO");
    
    var periodicService = ServiceManager.getService('ws_cancelamentoNota');
    var serviceHelper = periodicService.getBean();
    // GET
    var serviceLocator = serviceHelper.instantiate('br.com.oncoclinicas.webservices.wsexclusaonf_apw.WSEXCLUSAONF');
    var service = serviceLocator.getWSEXCLUSAONFSOAP();
    // SET + FILIAL PARAMETRO
    var dados = serviceHelper.instantiate("br.com.oncoclinicas.webservices.wsexclusaonf.WSDADOSNOTAFISCAL");

    log.info("INICIO DAS CHAMADAS");    

    var filial = "";

    var idFluig = "0000";
    var numeroNF = "";
    var serieNF = "";  
    
    for ( var i in constraints) {
        if(constraints[i].fieldName == "FILIAL"){
            filial = constraints[i].initialValue;
        }
        if(constraints[i].fieldName == "NUMERONF"){
            numeroNF = constraints[i].initialValue;
        }
        if(constraints[i].fieldName == "NUMEROSERIE"){
            serieNF = constraints[i].initialValue;
        }        
    }
    

    dados.setFILIAL(filial);
    dados.setIDFLUIG(idFluig);
    dados.setNUMERONF(numeroNF);
    dados.setSERIENF(serieNF);
    
    log.info("PASSAGEM DOS DADOS");


    var resultObj = service.wsvlddados(dados);
    var result = resultObj.getWSRETEXCLUINF().get(0);
    
     log.info("RESULTADO DA INTEGRAÇÃO"+ result.getTITULO());
    
    var mensagem      =  result.getMENSAGEM();
    // var retCase1      =  mensagem.match(/Não foi possivel excluir a(s) nota(s), pois o prazo para o cancelamento da(s)/);
    // var retCase2      =  mensagem.match(/O prazo para exclusão de NF de serviço para o município de/);


    var auxiliar = mensagem.split(":");
    var statusNota = auxiliar[0].trim();

    log.info("STATUS DA NOTA "+ statusNota);


    if (statusNota == "Extemporâneo") {
        ret = "Extemporâneo";
    }else{
        ret = "Normal";
    }


    // if (retCase1 == "Não foi possivel excluir a(s) nota(s), pois o prazo para o cancelamento da(s)" || retCase2 == "O prazo para exclusão de NF de serviço para o município de" || mensagem == "Verifique o fechamento do estoque.") {
    //     ret = "Extemporânea";
    // }else{
    //     ret = "Normal";
    // }

    
    dataset.addRow(new Array(result.getMENSAGEM(),
            result.getSUCESSO(),ret,result.getTITULO()));

    log.info("RESULTADO DA INTEGRAÇÃO FINAL");
    
    return dataset;
    
}


