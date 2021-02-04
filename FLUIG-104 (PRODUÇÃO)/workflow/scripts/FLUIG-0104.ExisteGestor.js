function ExisteGestor(){
	var cpGestor = hAPI.getCardValue("cpGestor"); 
	
	if(cpGestor == ""){ // Verifica se h? gestor
		return 2;
	}else{
		return 1;
	}
}