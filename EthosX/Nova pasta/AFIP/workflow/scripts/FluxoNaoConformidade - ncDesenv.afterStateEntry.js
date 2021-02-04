function afterStateEntry(sequenceId){
	if(sequenceId == 66){ //Ação 1
		hAPI.setCardValue("acaoImplementada1","");
	}
	else if(sequenceId == 68){ //Ação 2
		hAPI.setCardValue("acaoImplementada2","");
	}
	else if(sequenceId == 70){ //Ação 3
		hAPI.setCardValue("acaoImplementada3","");
	}
	else if(sequenceId == 72){ //Ação 4
		hAPI.setCardValue("acaoImplementada4","");
	}
	else if(sequenceId == 74){ //Ação 5
		hAPI.setCardValue("acaoImplementada5","");
	}
	else if(sequenceId == 76){ //Ação 6
		hAPI.setCardValue("acaoImplementada6","");
	}
	else if(sequenceId == 78){ //Ação 7
		hAPI.setCardValue("acaoImplementada7","");
	}
	else if(sequenceId == 80){ //Ação 8
		hAPI.setCardValue("acaoImplementada8","");
	}
	else if(sequenceId == 15){//Área responsável valida
		if(hAPI.getCardValue("conferenciaNaoConformidade") == "Nao"){
			hAPI.setCardValue("conferenciaNaoConformidade","");
			hAPI.setCardValue("justificativaNaoProcede","");
		}
	}
	
	registraStatus(sequenceId);
	
	if(sequenceId == 28 || sequenceId == 34){
		registraPlanoAcao(sequenceId,getValue("WKNextState"));
	}
	
}