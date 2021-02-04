function aprovacaoConsultoria(){
	
	var aprovarConsultoria= hAPI.getCardValue("aprovarConsultoria"); 
	
	if(aprovarConsultoria == "1"){
		return 1;
	}else if(aprovarConsultoria == "2")
		return 2;

}