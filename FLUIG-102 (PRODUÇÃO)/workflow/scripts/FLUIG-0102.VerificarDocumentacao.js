function VerificarDocumentacao(){
	
	var cpObraSede = hAPI.getCardValue("cpObraSede");
	var AprovacaoDocumentacao = hAPI.getCardValue("cpAprovacaoDocumentacao"); 
	
	if(cpObraSede == "0"){
		// sede
		if(AprovacaoDocumentacao == "1"){
			return 1;
		}else if(AprovacaoDocumentacao == "2")
			return 2;
	}else{
		// obra
		if(AprovacaoDocumentacao == "1"){
			return 3;
		}else if(AprovacaoDocumentacao == "2")
			return 4;
	}
	
}