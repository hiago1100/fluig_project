function afterTaskCreate(colleagueId) {
	
	var numProcesso = getValue("WKNumProces");
	var numEmpresa = getValue("WKCompany");
	var numAtividade = getValue("WKNumState");
	var usuario = getValue("WKUser");
	var actualThread = hAPI.getActualThread(numEmpresa, numProcesso, numAtividade);

	//CENTRAL DE TAREFAS
	addCentralTarefasInfo(getValue("WKDef"), numProcesso);

	gravarDebugLog(isDebug(getValue("WKDef")));

	adicionarComentarios(numProcesso, numEmpresa, numAtividade, usuario, actualThread);
	
}