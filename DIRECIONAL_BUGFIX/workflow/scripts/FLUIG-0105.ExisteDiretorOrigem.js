function ExisteDiretorOrigem(){
	
	var cpDiretorOrigem = hAPI.getCardValue("cpDiretorOrigem"); 
	
		if(cpDiretorOrigem != ""){
			return 1;
		}else 
			return 2;
}