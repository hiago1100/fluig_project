function aprovacaoSuperintendenteDestino(){
	
	var aprovarSuperintendenteDestino= hAPI.getCardValue("aprovarSuperintendenteDestino"); 
	
	if(aprovarSuperintendenteDestino == "1"){
		return 1;
	}else if(aprovarSuperintendenteDestino == "2")
		return 2;

}