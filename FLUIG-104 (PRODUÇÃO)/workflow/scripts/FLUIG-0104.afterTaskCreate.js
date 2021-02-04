function afterTaskCreate(colleagueId)
{
	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
	log.warn('ENTROU NO AFTER TASK DO 0104')
	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
	
	 var numEmpresa = getValue("WKCompany");
	 var numProcesso = getValue("WKNumProces");
	 var nrProxAtividade = getValue("WKNextState");
	 
	//CENTRAL DE TAREFAS 
	 addCentralTarefasInfo(getValue("WKDef"),getValue("WKNumProces"));
	 
	 var hoje = new Date();
	 
	 if(nrProxAtividade == "93")
	 { 
		 var prazoRecrutamento = hAPI.getCardValue("cpPrazoRecrutamento");
		 var novoPrazo;
		 
		 if(prazoRecrutamento == "")
		 {
			 hoje.setDate(hoje.getDate() + 20);
			 novoPrazo = hoje;
			 
			 var prazoString = novoPrazo.getDate()+"/"+novoPrazo.getMonth()+"/"+novoPrazo.getFullYear();
			 
			 hAPI.setCardValue("cpPrazoRecrutamento", prazoString);
		 }
		 else
		 {
			 var SplitDate = prazoRecrutamento.split("/");
			 novoPrazo = new Date(SplitDate[2],SplitDate[1],SplitDate[0]);
		 } 
		   
		 hAPI.setDueDate(numProcesso, hAPI.getActualThread(numEmpresa, numProcesso, nrProxAtividade), colleagueId, novoPrazo, 64800);
	 }
	 
	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
	log.warn('SAIU NO AFTER TASK DO 0104')
	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
}