function beforeCancelProcess(colleagueId,processId){
	
	 var atividadeAtual = getValue("WKNumState");
	 
	 if(atividadeAtual!="0" && atividadeAtual!="4" && atividadeAtual!="11" && 
	 atividadeAtual!="10"  && atividadeAtual!="7" && atividadeAtual!="223" && atividadeAtual!="247"){
			throw("Esse tipo de operação não é permitida.");
	 }

}