function VerificaUsuario(){
	
	var cpMatriculaSolicitante = hAPI.getCardValue("cpMatriculaSolicitante"); 
	var cpGerenteGeral = hAPI.getCardValue("cpGerenteGeral"); 
	var cpSuperintendente = hAPI.getCardValue("cpSuperintendente"); 
	var cpDiretor = hAPI.getCardValue("cpDiretor");
	var cpGestor = hAPI.getCardValue("cpGestor"); 
	
	
	if(cpMatriculaSolicitante == cpGestor){ // Verifica se o usu?rio ? gestor
		return 1;
	}else if(cpMatriculaSolicitante == cpGerenteGeral){ // Verifica se o usu?rio ? gerente geral
		return 2;
	}else if(cpMatriculaSolicitante == cpSuperintendente){ // Verifica se o usu?rio ? superintendente
		return 3;
	}else if(cpMatriculaSolicitante == cpDiretor){ // Verifica se o usu?rio ? diretor
		return 4;
	}else{
		return 5;
	}
	
}