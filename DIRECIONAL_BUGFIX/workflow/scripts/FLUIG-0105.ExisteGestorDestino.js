function ExisteGestorDestino(){
	
	var cpGestorDestino= hAPI.getCardValue("cpGestorDestino"); 
	
		if(cpGestorDestino != ""){
			return 1;
		}else 
			return 2;
	
	
}