function AprovacaoConferencia(){
	
	var cpAprovacaoDocumentacao= hAPI.getCardValue("cpAprovacaoDocumentacao"); 
	
		if(cpAprovacaoDocumentacao == "1"){
			return 1;
		}else if(cpAprovacaoDocumentacao == "2")
			return 2;
	
	
	
}