var INICIO = '4';
var VALIDAR_FORMULARIO = '5';
var CORRIGIR_INCONSISTENCIA = '9';
var RETORNO_FORNECEDOR = '37';
var COLETA_REGISTRA_NFD = '13';
var AGUARDANDO_RETORNO_FORNECEDOR = '14';
var APROVACAO_SOLICITANTE = '15';
var SOLUCAO_INCONSISTENCIA = '18';

function beforeTaskSave(colleagueId,nextSequenceId,userList){
	var CURRENT_STATE = getValue('WKNumState');
    var NEXTATV  = getValue("WKNextState");
    
    if(CURRENT_STATE == INICIO || CURRENT_STATE == '0' ) {
    	
    	if(hAPI.getCardValue("aceiteEvidencia") == "SIM"){
    		//Validando se existe anexo
	        var anexo   = hAPI.listAttachments();
	        var temAnexo = false;
	        	
	        if (anexo.size() > 0) {
	            temAnexo = true;
	            hAPI.setCardValue("anexos", hAPI.listAttachments().size());
	        }
	
	        if (anexo.size() == 0) {
	            throw "É preciso anexar a evidencia para dar continuidade ao processo!";
	        }
    	}
    }
    
    if(CURRENT_STATE == COLETA_REGISTRA_NFD ) {
		
		if( hAPI.getCardValue("equipamentoRecolhido") == "SIM" && hAPI.getCardValue("hiddenSituacaoEstoque") == "SIM"){
			//Validando se existe anexo
			var anexoColetaNFD   = hAPI.listAttachments();
	        var temAnexo = false;
	        var anexos = new Array();
	        
	        for (var i = 0; i < anexoColetaNFD.size(); i++) {
                var doc = anexoColetaNFD.get(i);		        
		        anexos.push(parseInt(doc.getDocumentId()));
	        }
	        
	        // Obtendo o número do documentoId do anexo
	        for (var b = 0; b < anexos.length; b++) {
	           if ( anexos[b] > hAPI.getCardValue("numAnexoNF")) {
	              hAPI.setCardValue("numAnexoNF", anexos[b]);
	           }
	        }
	   
	        if (anexoColetaNFD.size() > hAPI.getCardValue("anexos")) {
	            temAnexo = true;
	            hAPI.setCardValue("anexos", hAPI.listAttachments().size());
	        }
	        else {
	            throw "É preciso anexar a NF Devolução para continuar o processo!";
	        }
    	}
    }
    
    if(CURRENT_STATE == AGUARDANDO_RETORNO_FORNECEDOR) {

	    if(hAPI.getCardValue("laudoEnviado") == "SIM"){
	    	//Validando se existe anexo
	        var anexoRetornoFornecedor  = hAPI.listAttachments();
	        var temAnexo = false;
	        
	        if (anexoRetornoFornecedor.size() > hAPI.getCardValue("anexos")) {
	            temAnexo = true;
	            hAPI.setCardValue("anexos", hAPI.listAttachments().size());
	        }
	        else {
	            throw "É preciso anexar o Laudo de Análise para continuar o processo!";
	        }
	    }
    }
}