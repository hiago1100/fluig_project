function ExisteUsuario(){
	var cpMatriculaSolicitante = hAPI.getCardValue("cpMatriculaSolicitante"); 
	var cpGerenteGeral = hAPI.getCardValue("cpGerenteGeral"); 
	var cpSuperintendente = hAPI.getCardValue("cpSuperintendente"); 
	var cpDiretor = hAPI.getCardValue("cpDiretor");
	var cpGestor = hAPI.getCardValue("cpGestor"); 
	
	if(cpGestor == ""){ // Verifica se h? gestor
		return 1;
	}else if(cpGerenteGeral == ""){ // Verifica se h? gerente geral
		return 2;
	}else if(cpSuperintendente == ""){// Verifica se h? super intendente
		return 3;
	}else if(cpDiretor == ""){ // Verifica se h? diretor
		return 4;
	}
}