function afterTaskSave(colleagueId,nextSequenceId,userList){
	log.info("#### afterTaskSave")
	log.info("#### Solicitacao: "+getValue("WKNumProces"))
	log.info("#### Proxima nextSequenceId: "+nextSequenceId)
	var campos = hAPI.getCardData(getValue("WKNumProces"));
	
	var arrayCampos = campos.keySet().toArray();
	
	
	if(nextSequenceId == 6){
		hAPI.setCardValue("numeroFluig", getValue("WKNumProces"));
	}
	
	
	if(nextSequenceId == 4){
		hAPI.setCardValue("status", CRITICA)
	}
	
	if(nextSequenceId == 54){
		hAPI.setCardValue("status", ANALISE_QUALIDADE)
	}
	
	if(nextSequenceId == 15){
		hAPI.setCardValue("status", AGUARDANDO_RESPOSTA)
	}
	
	if(nextSequenceId == 65){
		
		hAPI.setCardValue("status", AGUARDANDO_IMPLEMENTACAO)
        
	}
	
	if(nextSequenceId == 28){
		hAPI.setCardValue("status", AGUARDANDO_VERIFICACAO_IMPL)
	}
	
	if(nextSequenceId == 34){
		hAPI.setCardValue("status", AGUARDANDO_VERIFICACAO_EFICACIA)
	}
	
}