// Dataset : Processo de encerramentro de Contrato.
// Caso haja necessidade para alteração de parâmetro tratar como MELHORIA.
function createDataset(fields, constraints, sortFields) {	     
    var dataset = DatasetFactory.newDataset();    
    dataset.addColumn("MENSAGEM");
    dataset.addColumn("SUCESSO");
    var periodicService = ServiceManager.getService('ws_contrato');
    var serviceHelper = periodicService.getBean();
    var serviceLocator = serviceHelper.instantiate('br.com.oncoclinicas.webservices.wscontrato_apw.WSCONTRATO');
    var service = serviceLocator.getWSCONTRATOSOAP();
    var dados = serviceHelper.instantiate("br.com.oncoclinicas.webservices.wscontrato.WSENCERRACONTRATO");    
    var CONTRATO = "";
    var FILIAL = "";
    var TIPOENCERRAMENTO = "1"; // parametro 1 = CANCELAMENTO || parametro 2 = FINALIZAR (Manter parametro 1 para esta demanda).     
    for ( var i in constraints) {
        if(constraints[i].fieldName == "CONTRATO"){
            CONTRATO = constraints[i].initialValue;
        }
        if(constraints[i].fieldName == "FILIAL"){
            FILIAL = constraints[i].initialValue;
        }
        if(constraints[i].fieldName == "TIPOENCERRAMENTO"){
            TIPOENCERRAMENTO = constraints[i].initialValue;
        }      
    }   
    dados.setCONTRATO(CONTRATO);
    dados.setFILIAL(FILIAL);
    dados.setTIPOENCERRAMENTO(TIPOENCERRAMENTO);
    var resultObj = service.wsencerrarcontrato(dados);
    var result = resultObj.getWSRETCONTRATO().get(0);  
    dataset.addRow(new Array(result.getMENSAGEM(),
    						 result.getSUCESSO())); 
    return dataset;
}