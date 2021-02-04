function ExisteGestorOrigem(){
	
	var cpGestorOrigem= hAPI.getCardValue("cpGestorOrigem"); 
	
	if(cpGestorOrigem != ""){
		return 1;
	}else 
		return 2;
}