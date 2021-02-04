function afterTaskSave(colleagueId,nextSequenceId,userList){
    var atv      = getValue("WKNumState");
    var user     = getValue("WKUser");
    var processo = getValue("WKNumProces");
    var ops = hAPI.getCardValue("txtAprovacaoPreAProvador");
    var obs      = '';
    obs += '<span style="color:#FF0000">'; 
   

    if (atv == 0 || atv == 4) {

    } else if (atv == 5 && hAPI.getCardValue("txtAprovaRequisicao") =="Duvida" ) {

    	obs += 'Dúvida do Verificador: '  + hAPI.getCardValue("txtDuvidaVerificador") + '<br>'; 

    } else if (atv == 114) { 

    	obs += 'Resposta ' + hAPI.getCardValue("txtRespostaDuvidaVerificador") + '<br>';

    } else if (atv == 19 && hAPI.getCardValue("txtAprovaRequisicaoCompras") =="Duvida" ) {
    	
    	obs += 'Dúvida do Comprador: '  + hAPI.getCardValue("txtDuvidaCompras") + '<br>'; 

    } else if (atv == 69) {
    	
    	obs += 'Resposta do Solicitante: '  + hAPI.getCardValue("txtRespostaCompras") + '<br>'; 

    } else if (atv == 24 && ops == "Duvida_Solicitante") {
    	
    	obs += 'Duvida do Pré-Aprovador: '  + hAPI.getCardValue("DuvidaPreAprovadorS") + '<br>'; 
    	
    } else if (atv == 72 ) {
    	
    	obs += 'Resposta do Solicitante: '  + hAPI.getCardValue("RespostaPreAprovadorS") + '<br>'; 
    	
    } else if (atv == 24 && ops == "Duvida_Comprador") {
    	
    	obs += 'Duvida do Pré-Aprovador: '  + hAPI.getCardValue("DuvidaPreAprovadorC") + '<br>'; 
    	
    } else if (atv == 32 ) {
    	
    	obs += 'Resposta do Comprador: '  + hAPI.getCardValue("RespostaPreAprovadorC") + '<br>'; 
    	
    }

    obs += '</span>';

    if (atv == 5 || atv == 114 || atv == 19 || atv == 69 || atv ==  24 || atv ==  72 || atv ==  32 ) {
        hAPI.setTaskComments(user, processo, 0, obs);
    }
    if (atv == 24) {
        hAPI.setCardValue('ativAtual', atv)
    }
    if (atv == 124) {
        hAPI.setCardValue('ativAtual', atv)
    }
}