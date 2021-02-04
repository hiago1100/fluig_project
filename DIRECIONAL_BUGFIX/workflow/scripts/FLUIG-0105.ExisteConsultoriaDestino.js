function ExisteConsultoriaDestino(){
	
	var cpConsultoriaDestino= hAPI.getCardValue("cpConsultoriaDestino"); 
	
		if(cpConsultoriaDestino != ""){
			return 1;
		}else 
			return 2;
	
	
}