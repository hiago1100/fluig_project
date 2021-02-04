function DocAssinado(){
	
	var SeguroSaude = hAPI.getCardValue("cpSeguroSaude"); 
	var cpRecolAssinatura = hAPI.getCardValue("cpRecolAssinatura"); 
	

	if(cpRecolAssinatura == "1" && SeguroSaude == "1"){
		return 2;
	}  

	if(cpRecolAssinatura == "1"){
		return 1;
	}
	
	if(cpRecolAssinatura == "2"){
		return 3;
	}
	
}