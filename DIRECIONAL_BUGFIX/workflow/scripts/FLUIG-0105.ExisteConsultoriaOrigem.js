function ExisteConsultoriaOrigem(){
	
	var cpConsultoriaOrigem = hAPI.getCardValue("cpConsultoriaOrigem"); 
	
		if(cpConsultoriaOrigem != ""){
			return 1;
		}else 
			return 2;
}