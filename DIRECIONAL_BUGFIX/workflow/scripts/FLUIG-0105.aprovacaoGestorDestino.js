function aprovacaoGestorDestino(){
	
	var aprovarConsultoria= hAPI.getCardValue("aprovarGestorDestino"); 
	
	if(aprovarConsultoria == "1"){
		return 1;
	}else if(aprovarConsultoria == "2") {
		return 2;
	} else if (aprovarConsultoria == "3") {
		return 3;
	}

}