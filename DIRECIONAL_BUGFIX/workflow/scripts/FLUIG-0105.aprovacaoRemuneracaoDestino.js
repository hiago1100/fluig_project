function aprovacaoRemuneracaoDestino(){
	
	var aprovarRemuneracaoDestino = hAPI.getCardValue("aprovarRemuneracaoDestino"); 
	
	if(aprovarRemuneracaoDestino == "1"){
		return 1;
	}else if(aprovarRemuneracaoDestino == "2")
		return 2;
	
}