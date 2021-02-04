function afterTaskCreate(colleagueId) {
    
	log.warn('[DEBUGANDO] FLUIG-0185 - afterTaskCreate - INICIO');
	
    var proxAtividade = getValue('WKNextState');
	var numProcesso = getValue("WKNumProces");
	var numEmpresa = getValue("WKCompany");
	
	//addCentralTarefasInfo(getValue("WKDef"),getValue("WKNumProces"));  
    
	if (proxAtividade == '25') 
	{
		var DataAdmissao = hAPI.getCardValue('cpDataAdmissaoInfo');
		
		var arrayPrazoConclusao = DataAdmissao.split("/");
        var dia = arrayPrazoConclusao[0]; 
        var mes = arrayPrazoConclusao[1]; // Posição 1 do array é o mês (Subtraímos 1 porque na data do Javascript o mês vai de 0 a 11)
        var ano = arrayPrazoConclusao[2];
        
        var dataDoPrazo = new Date();
        dataDoPrazo.setDate(parseFloat(dia)+parseFloat(45));
        dataDoPrazo.setMonth(mes);
        dataDoPrazo.setFullYear(ano);
		
		// Seta o prazo para as 18:00
		hAPI.setDueDate(numProcesso, hAPI.getActualThread(numEmpresa,
				numProcesso, proxAtividade), colleagueId, dataDoPrazo, 64800);

	}
	
	log.warn('[DEBUGANDO] FLUIG-0185 - afterTaskCreate - FIM');
}