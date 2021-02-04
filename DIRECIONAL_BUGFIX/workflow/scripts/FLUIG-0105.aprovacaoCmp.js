function aprovacaoCmp(){
	
	var aprovarCMP= hAPI.getCardValue("aprovarCMP"); 
	
	if(aprovarCMP == "1"){
		return 1;
	}else if(aprovarCMP == "2")
		return 2;	

}