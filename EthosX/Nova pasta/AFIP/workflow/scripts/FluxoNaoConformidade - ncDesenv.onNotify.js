function onNotify(subject, receivers, template, params){
	var atividade = getValue("WKNumState");
	
	if(atividade == 66){ //Ação 1
		if(template == "TPLOVERDUE_TASK_TO_MANAGER" || template == "TPLOVERDUE_TASK_TO_MANAGER_TO_SUBSTITUTE"){
			receivers.clear();
			receivers.add(buscaSuperior(hAPI.getCardValue("idResponsavelPlacoAcao1")));
		}
	}
	else if(atividade == 68){ //Ação 2
		if(template == "TPLOVERDUE_TASK_TO_MANAGER" || template == "TPLOVERDUE_TASK_TO_MANAGER_TO_SUBSTITUTE"){
			receivers.clear();
			receivers.add(buscaSuperior(hAPI.getCardValue("idResponsavelPlacoAcao2")));
		}
	}
	else if(atividade == 70){ //Ação 3
		if(template == "TPLOVERDUE_TASK_TO_MANAGER" || template == "TPLOVERDUE_TASK_TO_MANAGER_TO_SUBSTITUTE"){
			receivers.clear();
			receivers.add(buscaSuperior(hAPI.getCardValue("idResponsavelPlacoAcao3")));
		}
	}
	else if(atividade == 72){ //Ação 4
		if(template == "TPLOVERDUE_TASK_TO_MANAGER" || template == "TPLOVERDUE_TASK_TO_MANAGER_TO_SUBSTITUTE"){
			receivers.clear();
			receivers.add(buscaSuperior(hAPI.getCardValue("idResponsavelPlacoAcao4")));
		}
	}
	else if(atividade == 74){ //Ação 5
		if(template == "TPLOVERDUE_TASK_TO_MANAGER" || template == "TPLOVERDUE_TASK_TO_MANAGER_TO_SUBSTITUTE"){
			receivers.clear();
			receivers.add(buscaSuperior(hAPI.getCardValue("idResponsavelPlacoAcao5")));
		}
	}
	else if(atividade == 76){ //Ação 6
		if(template == "TPLOVERDUE_TASK_TO_MANAGER" || template == "TPLOVERDUE_TASK_TO_MANAGER_TO_SUBSTITUTE"){
			receivers.clear();
			receivers.add(buscaSuperior(hAPI.getCardValue("idResponsavelPlacoAcao6")));
		}
	}
	else if(atividade == 78){ //Ação 7
		if(template == "TPLOVERDUE_TASK_TO_MANAGER" || template == "TPLOVERDUE_TASK_TO_MANAGER_TO_SUBSTITUTE"){
			receivers.clear();
			receivers.add(buscaSuperior(hAPI.getCardValue("idResponsavelPlacoAcao7")));
		}
	}
	if(atividade == 80){ //Ação 8
		if(template == "TPLOVERDUE_TASK_TO_MANAGER" || template == "TPLOVERDUE_TASK_TO_MANAGER_TO_SUBSTITUTE"){
			receivers.clear();
			receivers.add(buscaSuperior(hAPI.getCardValue("idResponsavelPlacoAcao8")));
		}
	}
}

function buscaSuperior(matricula){
	var wsProvider = ServiceManager.getService("UX3READ").getBean();
	var wsLocator = wsProvider.instantiate("Protheus.UX3READ");
	var wsService = wsLocator.getUX3READSOAP();
	
	var properties = {};
	properties["disable.chunking"] = "true";
	properties["log.soap.messages"] = "true";
	properties["receive.timeout"] = "100000";
	
	var customClient = wsProvider.getCustomClient(wsService, "Protheus.UX3READSOAP", properties);
	
	var result = customClient.supermat(cCPF);
	
	return result.getCPF();
}