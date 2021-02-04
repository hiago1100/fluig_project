function beforeStateEntry(sequenceId){
	
	
   if (sequenceId == 19) {
		
		var nivelAtualAprovacao = hAPI.getCardValue("nivelAtualAprovacao");
		var nivelMaximoAprovacao = hAPI.getCardValue("nivelMaximoAprovacao");
		
		if(nivelAtualAprovacao < nivelMaximoAprovacao){
			
			nivelAtualAprovacao = parseInt(nivelAtualAprovacao) + 1;
			hAPI.setCardValue("proximoAprovador", hAPI.getCardValue("idAprovGestor" + nivelAtualAprovacao));
			//hAPI.setCardValue("codigoAprovador", hAPI.getCardValue("idAprovGestor" + nivelAtualAprovacao));
			
		} else {
			
			hAPI.setCardValue("proximoAprovador", "");
			
		}
		
	}
	
	
	
}