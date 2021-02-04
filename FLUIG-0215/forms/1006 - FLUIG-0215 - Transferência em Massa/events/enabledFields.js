function enableFields(form)
{
    form.setEnhancedSecurityHiddenInputs(true);
    var atvAtual = parseInt(getValue("WKNumState"));
	
    var atv_inicio = [0, 1,2];
    var atv_reabertura = [2];
    var atv_rh_origem = [6];
    var atv_gestor_origem = [7];
    var atv_gerente_geral_origem = [8];
    var atv_superintendente_origem = [9];
    var atv_rh_destino = [10];
    var atv_gestor_destino = [11];
    var atv_gerente_geral_destino = [12];
    var atv_superintendente_destino = [13];
    var atv_recolhimento_aso = [14];
    var atv_conferencia_solicitante = [16];
    var atv_processamento_folha_manual= [17];
    var atv_funcionarios_inaptos = [169];
    var atv_Processamento_Folha = [238];
    
	
    var listaCampos = [

        //Inicio
        [['cpTransf300km'], atv_inicio],
        //Reabertura
        [['cpReaberturaChamado','cpParecerReabertura'], atv_reabertura],
    	//Aprovacao do Gestor
        [['cpaprovacaoRhOrigem','cpParecerRHOrigem'], atv_rh_origem],
        //Aprovacao Gestor Origem
        [['cpAprovacaoGestorOrigem','cpPareceraGestorOrigem'], atv_gestor_origem],
        //Aprovacao Gerente Geral Origem
        [['cpaprovacaoGGOrigem','cpParecerGGOrigem'], atv_gerente_geral_origem],
        //Aprovacao Superintende Origem
        [['cpaprovacaoSuperOrigem','cpParecerSuperOrigem'], atv_superintendente_origem],
        //Aprovacao RH Destino
        [['cpaprovacaoRHDestino','cpParecerRHDestino'], atv_rh_destino],
        //Aprovacao Gestor Destino
        [['cpaprovacaoGestorDestino','cpParecerGestorDestino'], atv_gestor_destino],
        //Aprovacao Gerente Geral Destino
        [['cpAprovacaoGGDestino','cpParecercGGDestino'], atv_gerente_geral_destino],
        //Aprovacao Superintendente Destino
        [['cpaprovacaoSuperDestino','cpParecerSuperDestino'], atv_superintendente_destino],
        //Ciencia do solicitante - funcionarios inaptos
        [['cpAprovacaoInapto','cpParecerInapto'], atv_funcionarios_inaptos],
        //Processamento manual
        [['cpAprovacaoprocessamentoManual','cpParecerProcessamentoManual'], atv_processamento_folha_manual],
        //Conferência do processamento – Solicitante
        [['cpAprovacaoConfSolicitante','cpParecerConfSolicitante','cpAvaliacao','cpAvaliacaoJustificativa'], atv_conferencia_solicitante],
    ];
        
    var listaPaiFilho = [
        ['tableRecolhimentoASO', ['cpAsoRecolhido','cpNomeColaboradorASO','cpMatriculaColaboradorASO'], atv_recolhimento_aso],
        ['tableProscFolha', ['cpProcessadoFolha','cpParecerFolha'], atv_Processamento_Folha],
        ['tableProscManual', ['cpSituacaoColaboradorManual'], atv_processamento_folha_manual],
        
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