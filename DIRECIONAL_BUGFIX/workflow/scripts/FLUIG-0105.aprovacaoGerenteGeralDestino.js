function aprovacaoGerenteGeralDestino(){
	
	var aprovarGerenteGeralDestino= hAPI.getCardValue("aprovarGerenteGeralDestino"); 
	
	if(aprovarGerenteGeralDestino == "1"){
		return 1;
	}else if(aprovarGerenteGeralDestino == "2")
		return 2;	
}