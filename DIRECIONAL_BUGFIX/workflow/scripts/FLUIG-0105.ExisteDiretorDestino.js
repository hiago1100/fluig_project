function ExisteDiretorDestino(){
	
	var cpDiretorDestino= hAPI.getCardValue("cpDiretorDestino"); 
	
		if(cpDiretorDestino != ""){
			return 1;
		}else 
			return 2;
}