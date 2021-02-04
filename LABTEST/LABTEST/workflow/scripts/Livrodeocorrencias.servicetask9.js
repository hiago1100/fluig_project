function servicetask9(attempt, message) {
 
 var NomAbrev    = hAPI.getCardValue("cpNomeAbrev");
 var NroPedCli   = hAPI.getCardValue("cpPedidoCli"); //cpPedidoCli
 var NrSequencia = hAPI.getCardValue("cpNumeroSequencia"); // numero sequencia caso seja por item
 var CodItem     = hAPI.getCardValue("cpCodItem"); // cod item adicionar caso seja por item
 var CodRefer    = ""; // VAZIO
 var PercDesc    = hAPI.getCardValue("cpPercentual");
 var ValDesc     = convertStringFloat(hAPI.getCardValue("cpValorDesconto"));

  try{
      var jsonParams = '[{"name":"ttPedItem",'+
                   '"type":"input",' + 
                   '"dataType":"temptable",' + 
                   '"value":{"name":"ttPedItem",' + 
                            '"fields" :[{"name":"NomAbrev","type":"character"},' + 
                                       '{"name":"NroPedCli","type":"character"},' +
                                       '{"name":"NrSequencia","type":"character"},' +
                                       '{"name":"CodItem","type":"character"},' +
                                       '{"name":"CodRefer","type":"character"},' +
                                       '{"name":"PercDesc","type":"character"},' +
                                       '{"name":"ValDesc","type":"character"},],' + 
                             '"records":[{"NomAbrev":'+NomAbrev+'},' +
                                        '{"NroPedCli":'+NroPedCli+'},' +
                                        '{"NrSequencia":'+NrSequencia+'},' +
                                        '{"CodItem":'+CodItem+'},' +
                                        '{"CodRefer":'+CodRefer+'},' +
                                        '{"PercDesc":'+PercDesc+'},' +
                                        '{"ValDesc":'+ValDesc+'},]' + 
                     '}},'+
               '{"name":"RowErrors",'+
                   '"type":"output",' + 
                   '"dataType":"temptable",' + 
                   '"value":{"name":"RowErrors",' + 
                            '"fields" :[{"name":"errorSequence","type":"integer"},' + 
                                       '{"name":"errorNumber","type":"integer"},' +
                                       '{"name":"errorDescription","type":"character"},' +
                                       '{"name":"errorParameters","type":"character"},' +
                                       '{"name":"errorType","type":"character"},' +
                                       '{"name":"errorHelp","type":"character"},' +
                                       '{"name":"errorsubtype","type":"character"}],' + 
                             '"records":[]' + 
                     '}}]';

     var c1 = DatasetFactory.createConstraint('email', token, token, ConstraintType.MUST);
     var c2 = DatasetFactory.createConstraint('programName', "chamadorServices.p", "chamadorServices.p", ConstraintType.MUST);
     var c3 = DatasetFactory.createConstraint('procedureName', "setAtualizaPedidoVenda", "setAtualizaPedidoVenda", ConstraintType.MUST);
     var c4 = DatasetFactory.createConstraint('json', jsonParams, jsonParams, ConstraintType.MUST);

     var datasul = DatasetFactory.getDataset('integradorDATASUL', null, [c1,c2,c3,c4], null);


     log.info("*********** PASSOU DA INTEGRAÇÃO ");
    
     // for (i = 0; i < datasul.values.length; i++) {
     //    log.info("*********** RESULT : "+ i);
     //    var resp = datasul.getValue(i, "response");
     //    var respObj = JSON.parse(resp);
     //    log.warn(respObj[0].value);   
     // }

        }catch(e){
	    
			throw e;
		} 

}


function convertStringFloat(valor) {

    if (valor.indexOf(',') == -1) {
    } else {
        valor = String(valor).split(".").join("").replace(",",".");
    }
    valor = parseFloat(valor);
    return valor;
}