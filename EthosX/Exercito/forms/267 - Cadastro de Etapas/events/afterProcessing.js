function afterProcessing(form){
	var indexes = form.getChildrenIndexes("table_versoes");
    
    if (indexes.length > 0) {        
        for (var i = 0; i < indexes.length; i++) {
        	if(form.getValue('controle_aprovacao___' + indexes[i]) == 'iniciar') { 
        		startStepProcess(form,indexes[i],indexes.length);
            } 
        }
    }
}