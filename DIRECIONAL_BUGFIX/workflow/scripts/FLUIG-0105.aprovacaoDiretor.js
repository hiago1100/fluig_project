function aprovacaoDiretor(){
	
	var aprovarDiretor= hAPI.getCardValue("aprovarDiretor"); 
	
	if(aprovarDiretor == "1"){
		return 1;
	}else if(aprovarDiretor == "2")
		return 2;
	
}