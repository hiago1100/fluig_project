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
	
	gravarDebugLog(isDebug(getValue("WKDef")));

	adicionarComentarios(numProcesso,numEmpresa, numAtividade, usuario, actualThread);

	setSlaAtividade(atividade, colleagueId);

	// em determinadas atividades faz a exclusao da vaga no OCR Kapture
	//kaptureOCRExcluir(atividade);
}

