function ExisteSuperintendenteDestino(){
	
	var cpSuperintendenteDestino= hAPI.getCardValue("cpSuperintendenteDestino"); 
	
		if(cpSuperintendenteDestino != ""){
			return 1;
		}else 
			return 2;
}