function aprovacaoRemuneracao(){
	
	var aprovarRemuneracao = hAPI.getCardValue("aprovarRemuneracao"); 
	
	if(aprovarRemuneracao == "1"){
		return 1;
	}else if(aprovarRemuneracao == "2")
		return 2;
	
}