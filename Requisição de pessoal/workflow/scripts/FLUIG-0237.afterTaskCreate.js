function afterTaskCreate(colleagueId) 
{
	var atividade = getValue('WKCurrentState');
	var numProcesso = getValue("WKNumProces");
	var numEmpresa = getValue("WKCompany");
	var numAtividade = getValue("WKNumState");
	var usuario = getValue("WKUser");
	var actualThread = hAPI.getActualThread(numEmpresa, numProcesso, numAtividade);
	
	//CENTRAL DE TAREFAS
	addCentralTarefasInfo(getValue("WKDef"),getValue("WKNumProces"));  
	
	gravarDebugLog(isDebug(getValue("WKDef")), numProcesso);

	adicionarComentarios(numProcesso,numEmpresa, numAtividade, usuario, actualThread);

	setSlaAtividade(atividade, colleagueId);

	// em determinadas atividades faz a exclusao da vaga no OCR Kapture
	// 321, 87, 91 - atividades de cancelamento 
	kaptureOCRExcluir(atividade);

	// caso a documentacao capturada seja rejeitada ao voltar nessa atividade
	// flag que o documento nao foi cpaturado
	if(atividade == 274 || atividade == 269)
	{
		hAPI.setCardValue( "cpIntegracaoOcrDocumentoGed", "0");
	}
}

