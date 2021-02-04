function enableFields(form)
{
	form.setEnhancedSecurityHiddenInputs(true);
	
    var atv_inicio = [0, 1, 2];
	var atv_reabertura = [2];
	var atv_consultoria_rh = [10];
	var atv_remuneracao = [12];
	var atv_gestor_rh = [13];
	var atv_aprovacao_n1 = [14];
	var atv_aprovacao_n2 = [15];
	var atv_aprovacao_n3 = [16];
	var atv_aprovacao_n4 = [17];
	
    var atvAtual = parseInt(getValue("WKNumState"));
    
    var listaCampos = [

        [['cpReaberturaChamado','cpReaberturaChamado'], atv_reabertura],
        	
        [['cpTipoMaoObra','cpObs'], atv_inicio],

        [['cpAprovacaoRH','cpParecerAprovacaoRH'], atv_consultoria_rh],
        [['cpAprovacaoRemuneracao','cpParecerRemuneracao'], atv_remuneracao],
        [['cpAprovacaoGestorRH','cpParecerGestorRH'], atv_gestor_rh],

        [['cpAprovacaoN1','cpParecerAprovacaoN1'], atv_aprovacao_n1],
        [['cpAprovacaoN2','cpParecerAprovacaoN2'], atv_aprovacao_n2],
        [['cpAprovacaoN3','cpParecerAprovacaoN3'], atv_aprovacao_n3],
        [['cpAprovacaoN4','cpParecerAprovacaoN4'], atv_aprovacao_n4],
        
    ];
    
    var listaPaiFilho = [];

    listaPaiFilho.push(['pfVagas', [
        'cpVagaQuantidade','cpTipoPostoTrabalho','cpMotivoAdmissao',
    'cpVagaDescricaoDetalhada','cpVagaConfidencial','cpVagaInterna',
    'cpVagaTipo','cpVagaAreaFormacao','cpVagaGrauInstrucao',
    'cpVagaTempoExp','cpVagaExpComprovada','cpVagaExpDesejada',
    'cpVagaCompetenciaComportamento','cpVagaAtribuicoes','cpVagaConhecimento',
    'cpVagaDiferenciais','cpDisponibilidadeViagens','cpPeriodicidadeViagens',
    'cpInglesNivel','cpEspanholNivel','cpOutroIdioma',
    'cpVagaIndicacao'
    ], atv_inicio]);

    listaPaiFilho.push(['pfVagas', [
    'cpAprovacaoRHAltSalario','cpAprovacaoRHASalarioAlterado',
    'cpAprovacaoRHMotivoSalario',
    'cpParecerRecursoHumanos'
    ], atv_consultoria_rh]);
   
    listaCampos.forEach(function([campos, atividades])
    {
        if (!inArray(atvAtual, atividades)) 
        {
            campos.forEach(function(campo)
            {
                form.setEnabled(campo, false);
            });
        }
    });


    listaPaiFilho.forEach(function([tablename, campos, atividades])
    {
        if (!inArray(atvAtual, atividades))
        {
            var indexes = form.getChildrenIndexes(tablename);
            
            indexes.forEach(function(index)
            {
                campos.forEach(function(campo)
                {
                    form.setEnabled(campo + '___' + index, false);
                });
            });
        }
    });

 
}