function ExisteGerenteGeral(){
	var cpGerenteGeral = hAPI.getCardValue("cpGerenteGeral"); 
	
	if(cpGerenteGeral == ""){ // Verifica se h? gerente geral
		return 2;
	}else{
		return 1;
	}
}