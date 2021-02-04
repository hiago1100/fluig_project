function aprovacaoSuperintendente(){
	
	var aprovarSuperintendente= hAPI.getCardValue("aprovarSuperintendente"); 
	
	if(aprovarSuperintendente == "1"){
		return 1;
	}else if(aprovarSuperintendente == "2")
		return 2;

}