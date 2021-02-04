$("#addPlanoAcao").click(function(){
	addLineAndInitCalendar('tablePlanoAcao', 'prazo');
})


function addLineAndInitCalendar(tableName, idCalendar){
	var id = wdkAddChild(tableName);
	initCalendar(idCalendar, id);
	
	setTimeout(function(){setRequiredPaiFilho(["acaoCorretiva","responsavelPlacoAcao"],id);});
}

function initCalendar(idCalendar, id){
	FLUIGC.calendar("#"+idCalendar+"___"+id);
}

function setRequiredPaiFilho(campos,id){
	for (var i=0 ; i < campos.length ; i++){
		definirObrigatorioTab(campos[i]+"___"+id);
	}
}