function ExisteGerenteGeralDestino(){

	var cpGerenteGeralDestino= hAPI.getCardValue("cpGerenteGeralDestino"); 
	
		if(cpGerenteGeralDestino != ""){
			return 1;
		}else 
			return 2;
}