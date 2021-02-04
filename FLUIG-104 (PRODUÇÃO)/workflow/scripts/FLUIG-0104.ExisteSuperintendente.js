function ExisteSuperintendente(){
	var cpSuperintendente = hAPI.getCardValue("cpSuperintendente"); 
	
	if(cpSuperintendente == ""){ // Verifica se h? superintendente
		return 2;
	}else{
		return 1;
	}
}