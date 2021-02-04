function aprovacaoConsultoriaDestino(){
	
	var aprovarConsultoriaDestino= hAPI.getCardValue("aprovarConsultoriaDestino"); 
	
	if(aprovarConsultoriaDestino == "1"){
		return 1;
	}else if(aprovarConsultoriaDestino == "2")
		return 2;
	
	
}