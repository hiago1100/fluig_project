function afterTaskSave(colleagueId,nextSequenceId,userList){
    var atv      = getValue("WKNumState");
    var user     = getValue("WKUser");
    var processo = getValue("WKNumProces");
    var obs      = '';
    obs += '<span style="color:#FF0000">'; 
    
    var processo = getValue("WKNumProces");
    hAPI.setCardValue("cpNumSolicitacao", processo);

    if (atv == 12) { //Sysadmin
    	
    	if(hAPI.getCardValue("aprovacao_sysadmins") =="Nao") {

    	obs += 'Solicitação Não Aprovada: '  + hAPI.getCardValue("txtObservacoesSysadmins") + '<br>'; 
    	
    	}

    
    } else if(atv == 183 ) { //DBA
    	
    	if(hAPI.getCardValue("aprovacao_DBA") =="Nao") {

        	obs += 'Solicitação Não Aprovada: '  + hAPI.getCardValue("txtObservacoesDBA") + '<br>'; 
        	
    	}
    	
    	
    } else if(atv == 66  ) { //Telecom
    	
    	if(hAPI.getCardValue("aprovacao_Telecom_2") =="Nao") {

        	obs += 'Solicitação Não Aprovada: '  + hAPI.getCardValue("txtObservacoesTelecom") + '<br>'; 
        	
    	}
    	
    	
    } else if(atv == 21  ) { //Network
    	
    	if(hAPI.getCardValue("aprovacao_Network") =="Nao") {

        	obs += 'Solicitação Não Aprovada: '  + hAPI.getCardValue("txtObservacoesNetwork") + '<br>'; 
        	
    	}
    	
    	
    } else if(atv == 199  ) { //Seguranca
    	
    	if(hAPI.getCardValue("aprovacao_Seguranca") =="Nao") {

        	obs += 'Solicitação Não Aprovada: '  + hAPI.getCardValue("txtObservacoesSeguranca") + '<br>'; 
        	
    	}
    	
    	
    } else if(atv == 75  ) { //Workplace
    	
    	if(hAPI.getCardValue("aprovacao_Workplace") =="Nao") {

        	obs += 'Solicitação Não Aprovada: '  + hAPI.getCardValue("txtObservacoesWorkplace") + '<br>'; 
        	
    	}
    	
    }else if(atv == 28  ) { //Desenvolvimento
    	
    	if(hAPI.getCardValue("aprovacao_Desenvolvimento") =="Nao") {

        	obs += 'Solicitação Não Aprovada: '  + hAPI.getCardValue("txtObservacoesDesenvolvimento") + '<br>'; 
        	
    	}
    	
    	
    	
    } else if(atv == 42  ) { //Fornecedor
    	
    	if(hAPI.getCardValue("aprovacao_Fornecedor_2") =="Nao") {

        	obs += 'Solicitação Não Aprovada: '  + hAPI.getCardValue("txtObservacoesFornecedor") + '<br>'; 
        	
    	}
    	
    	      	
    	
    } else if(atv == 49  ) { //Gerente 1
    	
    	if(hAPI.getCardValue("aprovacao_Gerente_1") =="Nao") {

        	obs += 'Solicitação Não Aprovada: '  + hAPI.getCardValue("txtObservacoesGerente_1") + '<br>'; 
        	
    	}
    	
    	
    } else if(atv == 104  ) { //Gerente 2
    	
    	if(hAPI.getCardValue("aprovacao_Gerente_2") =="Nao") {

        	obs += 'Solicitação Não Aprovada: '  + hAPI.getCardValue("txtObservacoesGerente_2") + '<br>'; 
        	
    	}
    	
    	
    } else if(atv == 107  ) { //Gerente 3
    	
    	if(hAPI.getCardValue("aprovacao_Gerente_3") =="Nao") {

        	obs += 'Solicitação Não Aprovada: '  + hAPI.getCardValue("txtObservacoesGerente_3") + '<br>'; 
        	
    	}
    	
    	
    } else if(atv == 35  ) { //Diretoria TI
    	
    	if(hAPI.getCardValue("aprovacao_DiretoriaTI") =="Nao") {

        	obs += 'Solicitação Não Aprovada: '  + hAPI.getCardValue("txtObservacoesDiretoriaTI") + '<br>'; 
        	
    	}
    	
    	
    } else if(atv == 130  ) { //Area de Negocios
    	
    	if(hAPI.getCardValue("aprovacao_AreaNegocios") =="Nao") {

        	obs += 'Solicitação Não Aprovada: '  + hAPI.getCardValue("txtObservacoesAreaNegocios") + '<br>'; 
        	
    	}
    	
    	
    } else if(atv == 140  ) { //Diretoria - Area de Negocios
    	
    	if(hAPI.getCardValue("aprovacao_DiretoriaNegocios") =="Nao") {

        	obs += 'Solicitação Não Aprovada: '  + hAPI.getCardValue("txtObservacoesDNegocios") + '<br>'; 
        	
    	}
    	
    	
    }

    obs += '</span>';

    if (atv == 12 || atv == 183 || atv == 66 || atv == 21 || atv == 199 || atv == 75 || atv == 28 || atv == 42 || atv == 49 || atv == 104 || atv == 107 || atv == 35 || atv == 130 || atv == 140) {
        hAPI.setTaskComments(user, processo, 0, obs);
    }

 
}