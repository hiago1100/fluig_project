function afterProcessCreate(processId) 
{
	log.warn('[DEBUGANDO] FLUIG-0185 - afterProcessCreate');
	
    var numSolicitacao = getValue("WKNumProces"),
    
        hoje = new Date(),
        d = hoje.getDate() < 10 ? '0' + hoje.getDate() : hoje.getDate(),
        m = hoje.getMonth() < 10 ? '0' + hoje.getMonth() : hoje.getMonth(),
        dtAbertura = d + '/' + m + '/' + hoje.getFullYear();
    
    hAPI.setCardValue("cpNumeroSolicitacao", numSolicitacao);
    hAPI.setCardValue("cpDataAbertura", dtAbertura);
    
	//identificador 
	var Colaborador = hAPI.getCardValue("cpColaboradorInfo");
	var DtAdmissao = hAPI.getCardValue("cpDataAdmissaoInfo");
	var Departamento = hAPI.getCardValue("cpObraDepartamentoInfo");

	var Ident = Colaborador + "-" + Departamento + "-" + DtAdmissao;
	hAPI.setCardValue('cpIdentificador', Ident);
	
	//CENTRAL DE TAREFAS
	addCentralTarefasInfo(getValue("WKDef"),getValue("WKNumProces"));  
}
