function VerificarCadastroCan(){
	
	var cpCadastroCancelado = hAPI.getCardValue("cpCadastroCancelado"); 
		
		if(cpCadastroCancelado == "1"){
			return 1;
		}else if(cpCadastroCancelado == "2")
			return 2;
}