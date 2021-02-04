function afterTaskCreate(colleagueId) 
{
	var processo = getValue("WKDef");
	var numProcesso = getValue("WKNumProces");
	var numEmpresa = getValue("WKCompany");
	var numAtividade = getValue("WKNumState");
	var usuario = getValue("WKUser");
	var actualThread = hAPI.getActualThread(numEmpresa, numProcesso, numAtividade);
	
	//CENTRAL DE TAREFAS
	addCentralTarefasInfo(processo,numProcesso);  
	
	gravarDebugLog(isDebug(processo),numProcesso);

	adicionarComentarios(numProcesso,numEmpresa, numAtividade, usuario, actualThread);
		
}

