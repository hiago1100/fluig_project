function enableFields(form)
{
	form.setEnhancedSecurityHiddenInputs(true);
	
    var atv_inicio = [0, 1, 2];
	var atv_reabertura = [2];
	
    var atvAtual = parseInt(getValue("WKNumState"));
    
    var listaCampos = [

        [['cpReaberturaChamado',
        	'cpReaberturaChamado'], atv_reabertura],
        	
        	
    ];
   
    listaCampos.forEach(function([campos, atividades]){
        if (!inArray(atvAtual, atividades)) {
            campos.forEach(function(campo){
                form.setEnabled(campo, false);
            });
        }
    });


    listaPaiFilho.forEach(function([tablename, campos, atividades]){
        if (!inArray(atvAtual, atividades)){
            var indexes = form.getChildrenIndexes(tablename);
            indexes.forEach(function(index){
                campos.forEach(function(campo){
                    form.setEnabled(campo + '___' + index, false);
                });
            });
        }
    });

 
}