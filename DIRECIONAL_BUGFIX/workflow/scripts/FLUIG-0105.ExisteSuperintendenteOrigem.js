function ExisteSuperintendenteOrigem(){
	
	var cpSuperintendenteOrigem= hAPI.getCardValue("cpSuperintendenteOrigem"); 
		
		if(cpSuperintendenteOrigem != ""){
			return 1;
		}else 
			return 2;
}