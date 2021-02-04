function ExisteGerenteGeralOrigem(){
	
	var cpGerenteGeralOrigem = hAPI.getCardValue("cpGerenteGeralOrigem");
		
	if(cpGerenteGeralOrigem != ""){
		return 1;
	} else {
		return 2;
	}
}