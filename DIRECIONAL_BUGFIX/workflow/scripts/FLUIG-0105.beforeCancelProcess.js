function beforeCancelProcess(colleagueId,processId){
 var atividadeAtual = getValue("WKNumState");
	 
	 if(atividadeAtual!="0" && atividadeAtual!="1" && atividadeAtual!="374" && atividadeAtual!="391" && atividadeAtual!="45"
		 && atividadeAtual!="341" && atividadeAtual!="339"){
			throw("Esse tipo de operação não é permitida.");
	 }

}