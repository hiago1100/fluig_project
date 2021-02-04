function enableFields(form)
{
	form.setEnhancedSecurityHiddenInputs(true);
	
    var atvAtual = parseInt(getValue("WKNumState"));
    var atv_inicio = [0, 1, 2];
	var atv_reabertura = [2];
	var atv_aprovacao_gestor = [11];
	var atv_conferencia_solicitacao = [16];
	var atv_processamento = [20];
	var atv_conferencia_recibo = [24];
	var atv_ajuste = [26];
	var atv_substituicao = [40];
	var atv_integracao_manual = [118];
	
    var listaCampos = [

        [['cpProprioOutroColaborador',
        'cpHaveraAbono',
		'cpAntecipar13Salario',
		'cpHaveraSubstituto',
		'cpObs'], atv_inicio],
        
        [['cpReaberturaChamado',
        	'cpReaberturaChamado'], atv_reabertura],
        	
    	[['cpAprovacaoGestor',
        	'cpParecerGestor'], atv_aprovacao_gestor],
        
     	[['cpAprovacaoConfSolicitacao', 'cpParecerConfSolicitacao'], atv_conferencia_solicitacao],
        
    	[['cpAprovacaoProcessamento',
        	'cpDataPagamento', 'cpParecerProcessamento'], atv_processamento],
        	
    	[['cpAprovacaoConfAssinatura',
        	'cpParecerConfAssinatura'], atv_conferencia_recibo],
        	
    	[['cpAprovacaoAjustes',
        	'cpParecerAjustes'], atv_ajuste],
        	
    	[['cpAprovacaoSubstituicao',
            'cpParecerSubstituicao'], atv_substituicao],
        	
    	[['cpAprovacaoIntegracaoRM',
        	'cpParecerIntegracaoRM'], atv_integracao_manual],
        	
    ];
    
    var listaPaiFilho = [
        ['DatasFerias', ['cpDataInicioFerias', "cpDataFimFerias"], [atv_inicio]],
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