function TransfdePCD(){
	var PCD = hAPI.getCardValue("cpPCD"); 
	var EmpreAtual = hAPI.getCardValue("cpCodEmpresa"); 
	var EmpreDestino = hAPI.getCardValue("cpCodigoEmpresaTransPadrao"); 
	var Transferencia = hAPI.getCardValue("cpTransferencia");  
	var retorno;
	
	if(Transferencia=="1" && PCD=="1" && EmpreAtual != EmpreDestino){
		retorno = 1;
	}else{
		retorno=2
	}
	return retorno;
	
}