function aprovacaoPmp(){
	
	var aprovarPMP= hAPI.getCardValue("aprovarPMP"); 
	
	if(aprovarPMP == "1"){
		return 1;
	}else if(aprovarPMP == "2")
		return 2;
}