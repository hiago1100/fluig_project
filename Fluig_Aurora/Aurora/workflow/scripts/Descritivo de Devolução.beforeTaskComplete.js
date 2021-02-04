function beforeTaskComplete(colleagueId,nextSequenceId,userList){
	
	var numProcesso = getValue("WKNumProces");
	var numThread = 0;
	var minhaLinha = hAPI.getCardValue("minhaLinha");
    var mensagem = hAPI.getCardValue("areaRespRegional___"+minhaLinha);
    // 
	var minhaLinha1 = hAPI.getCardValue("minhaLinha1");
    var mensagem1 = hAPI.getCardValue("areaRespPadrao___"+minhaLinha1);
    // 
	var minhaLinha2 = hAPI.getCardValue("minhaLinha2");
    var mensagem2 = hAPI.getCardValue("areaRespDiretor___"+minhaLinha2);
    // 
	var minhaLinha3 = hAPI.getCardValue("minhaLinha3");
    var mensagem3 = hAPI.getCardValue("areaRespPresidente___"+minhaLinha3);
    // 
    var mensagem4 = hAPI.getCardValue("obsCompara");
    // 
	var minhaLinha4 = hAPI.getCardValue("minhaLinha4");
    var mensagem5 = hAPI.getCardValue("areaRespDif___"+minhaLinha4);
    
    var user = getValue("WKUser");
    
    
    //var ativAtual = getValue("WKNumState");
    
    
	log.info("#### ENTRANDO NO BEFORE TASK SAVE mensagem encontro de NOTAS " + mensagem4 + "usuario "+ user );


	//	var user = getUser(getValue("WKUser"));	



	if(nextSequenceId == 16){
		 
		 hAPI.setTaskComments("userId", numProcesso,  numThread, mensagem1);

	}

	if(nextSequenceId == 18){
		 
		 hAPI.setTaskComments("userId", numProcesso,  numThread, mensagem);

	}
	
	if(nextSequenceId == 20){
		 
		 hAPI.setTaskComments("userId", numProcesso,  numThread, mensagem2);

	}
	
	if(nextSequenceId == 22){
		 
		 hAPI.setTaskComments("userId", numProcesso,  numThread, mensagem3);

	}

	if(nextSequenceId == 98){
		 
		 hAPI.setTaskComments(user, numProcesso,  numThread, mensagem4);
		 
		 log.info("#### mensagem encontro de NOTAS ", mensagem4);

	}


	if(nextSequenceId == 74){
		 
		 hAPI.setTaskComments(user, numProcesso,  numThread, mensagem5);
		 log.info("#### mensagem Aprovação diferença ", mensagem5);

	}


	
	
	
}