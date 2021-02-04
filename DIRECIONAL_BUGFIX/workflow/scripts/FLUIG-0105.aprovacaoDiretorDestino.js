function aprovacaoDiretorDestino(){
	
	
	var aprovarDiretorDestino= hAPI.getCardValue("aprovarDiretorDestino"); 
	
	if(aprovarDiretorDestino == "1"){
		return 1;
	}else if(aprovarDiretorDestino == "2")
		return 2;

}