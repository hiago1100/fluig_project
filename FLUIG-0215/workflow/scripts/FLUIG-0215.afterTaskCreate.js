function afterTaskCreate(colleagueId) 
{
	//CENTRAL DE TAREFAS
	addCentralTarefasInfo(getValue("WKDef"),getValue("WKNumProces"));  
	
	gravarDebugLog(isDebug(getValue("WKDef")));
}
