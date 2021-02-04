function VerificacaoTransferencia(){
	
	var cpTransferencia= hAPI.getCardValue("cpTransferencia"); 
	
	if(cpTransferencia == "1"){
		return 1;
	}else if(cpTransferencia == "2") {
		return 2;
	}
}