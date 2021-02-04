function beforeTaskSave(colleagueId,nextSequenceId,userList){
	if(getValue("WKCompletTask") == "true"){
		var atividade = getValue("WKNumState");
		
		if(atividade == 66){
			if(hAPI.getCardValue("acaoImplementada1") == "Devolvida" && getValue("WKUserComment") == ""){
				throw "\n É necessário inserir um comentário na aba Complementos para devolver uma ação do plano";
			}else if(hAPI.getCardValue("acaoImplementada1") == "Finalizado"){
				hAPI.setCardValue("dtExecucao1",tools.buscaDataAtual("dd/MM/yyyy"));
			}
				
		}
		else if(atividade == 68){
			if(hAPI.getCardValue("acaoImplementada2") == "Devolvida" && getValue("WKUserComment") == ""){
				throw "\n É necessário inserir um comentário na aba Complementos para devolver uma ação do plano";
			}else if(hAPI.getCardValue("acaoImplementada2") == "Finalizado"){
				hAPI.setCardValue("dtExecucao2",tools.buscaDataAtual("dd/MM/yyyy"));
			}
		}
		else if(atividade == 70){
			if(hAPI.getCardValue("acaoImplementada3") == "Devolvida" && getValue("WKUserComment") == ""){
				throw "\n É necessário inserir um comentário na aba Complementos para devolver uma ação do plano";
			}else if(hAPI.getCardValue("acaoImplementada3") == "Finalizado"){
				hAPI.setCardValue("dtExecucao3",tools.buscaDataAtual("dd/MM/yyyy"));
			}
		}
		else if(atividade == 72){
			if(hAPI.getCardValue("acaoImplementada4") == "Devolvida" && getValue("WKUserComment") == ""){
				throw "\n É necessário inserir um comentário na aba Complementos para devolver uma ação do plano";
			}else if(hAPI.getCardValue("acaoImplementada4") == "Finalizado"){
				hAPI.setCardValue("dtExecucao4",tools.buscaDataAtual("dd/MM/yyyy"));
			}
		}
		else if(atividade == 74){
			if(hAPI.getCardValue("acaoImplementada5") == "Devolvida" && getValue("WKUserComment") == ""){
				throw "\n É necessário inserir um comentário na aba Complementos para devolver uma ação do plano";
			}else if(hAPI.getCardValue("acaoImplementada5") == "Finalizado"){
				hAPI.setCardValue("dtExecucao5",tools.buscaDataAtual("dd/MM/yyyy"));
			}
		}
		else if(atividade == 76){
			if(hAPI.getCardValue("acaoImplementada6") == "Devolvida" && getValue("WKUserComment") == ""){
				throw "\n É necessário inserir um comentário na aba Complementos para devolver uma ação do plano";
			}else if(hAPI.getCardValue("acaoImplementada6") == "Finalizado"){
				hAPI.setCardValue("dtExecucao6",tools.buscaDataAtual("dd/MM/yyyy"));
			}
		}
		else if(atividade == 78){
			if(hAPI.getCardValue("acaoImplementada7") == "Devolvida" && getValue("WKUserComment") == ""){
				throw "\n É necessário inserir um comentário na aba Complementos para devolver uma ação do plano";
			}else if(hAPI.getCardValue("acaoImplementada7") == "Finalizado"){
				hAPI.setCardValue("dtExecucao7",tools.buscaDataAtual("dd/MM/yyyy"));
			}
		}
		else if(atividade == 80){
			if(hAPI.getCardValue("acaoImplementada8") == "Devolvida" && getValue("WKUserComment") == ""){
				throw "\n É necessário inserir um comentário na aba Complementos para devolver uma ação do plano";
			}else if(hAPI.getCardValue("acaoImplementada8") == "Finalizado"){
				hAPI.setCardValue("dtExecucao8",tools.buscaDataAtual("dd/MM/yyyy"));
			}
		}
		
		if(hAPI.getCardValue("numeroNC") == "") inserirNumeracaoNC();
		
		registraStatus(atividade,nextSequenceId);
		
		if( atividade == 4 || (atividade == 12 && nextSequenceId == 15) || atividade == 34 || atividade == 41 ){
			registraQNC(atividade,nextSequenceId);
		}
		
		if((atividade == 92 && nextSequenceId == 65) || (atividade == 82 || atividade == 28 || atividade == 30 || atividade == 34)){
			registraPlanoAcao(atividade,nextSequenceId);
		}
	}
}