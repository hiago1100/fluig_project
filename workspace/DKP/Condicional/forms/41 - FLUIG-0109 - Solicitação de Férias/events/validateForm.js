function validateForm(form)
{
    var atv_inicio = [0, 1, 2];
	var atv_reabertura = [2];
	var atv_aprovacao_gestor = [11];
	var atv_conferencia_solicitacao = [16];
	var atv_processamento = [20];
	var atv_conferencia_recibo = [24];
	var atv_ajuste = [26];
	var atv_substituicao = [40];
	var atv_integracao_manual = [118];
	
    var regras_do_formulario = [ 
    	
    	
    	{ campo: 'cpHaveraAbono', label: 'Haverá Abono', atividades: atv_inicio, regras: ['obrigatorio'] },
    	{ campo: 'cpAntecipar13Salario', label: 'Antecipar o pagamento da 1ª parcela do 13º?', atividades: atv_inicio, regras: ['obrigatorio'] },
    	{ campo: 'cpHaveraSubstituto', label: 'Haverá Substituto?', atividades: atv_inicio, regras: ['obrigatorio'] },
    	
		 { tablename: 'DatasFerias', label: 'Periodos de férias', atividades: [0,1,2], regras: ['pai_e_filho'], regras_filhos: [
	         {campo: 'cpDataInicioFerias', label: 'Data Inicio', regras: ['filho_obrigatorio']},
	         {campo: 'cpDataFimFerias', label: 'Data Fim', regras: ['filho_obrigatorio']},
	     ]},
    	
    	{ campo: 'cpReaberturaChamado', label: 'Aprovação', atividades: atv_reabertura, regras: ['obrigatorio'] },
     	{ campo: 'cpParecerReabertura', label: 'Parecer', atividades: atv_reabertura, regras: ['obrigatorio'] },
     	
     	// Gestor imediato
     	{ campo: 'cpAprovacaoGestor', label: 'Aprovação', atividades: atv_aprovacao_gestor, regras: ['obrigatorio'] },
       	{ campo: 'cpParecerGestor', label: 'Parecer ', atividades: atv_aprovacao_gestor, regras: ['obrigatorio'], condicoes: [{campo: 'cpAprovacaoGestor', valores: ['2']}] },
       	
       	//Conferência da solicitação de férias
       	{ campo: 'cpAprovacaoConfSolicitacao', label: 'Aprovação', atividades: atv_conferencia_solicitacao, regras: ['obrigatorio'] },
       	{ campo: 'cpParecerConfSolicitacao', label: 'Parecer ', atividades: atv_conferencia_solicitacao, regras: ['obrigatorio'], condicoes: [{campo: 'cpAprovacaoConfSolicitacao', valores: ['2']}] },
       	
       	//Processamento das férias e envio do aviso/Recibo
       	{ campo: 'cpAprovacaoProcessamento', label: 'Aprovação', atividades: atv_processamento, regras: ['obrigatorio'] },
       	{ campo: 'cpDataPagamento', label: 'Data de pagamento', atividades: atv_processamento, regras: ['obrigatorio'] },
       	{ campo: 'cpParecerProcessamento', label: 'Parecer ', atividades: atv_processamento, regras: ['obrigatorio'], condicoes: [{campo: 'cpAprovacaoProcessamento', valores: ['2']}] },
       	
       	//Conferência e assinatura do aviso/recibo de férias
       	{ campo: 'cpAprovacaoConfAssinatura', label: 'Aprovação', atividades: atv_conferencia_recibo, regras: ['obrigatorio'] },
       	{ campo: 'cpParecerConfAssinatura', label: 'Parecer ', atividades: atv_conferencia_recibo, regras: ['obrigatorio'], condicoes: [{campo: 'cpAprovacaoConfAssinatura', valores: ['2']}] },
       	
       	//Ajuste/cancelamento da solicitação de férias
       	{ campo: 'cpAprovacaoAjustes', label: 'Aprovação', atividades: atv_ajuste, regras: ['obrigatorio'] },
       	{ campo: 'cpParecerAjustes', label: 'Parecer ', atividades: atv_ajuste, regras: ['obrigatorio'], condicoes: [{campo: 'cpAprovacaoAjustes', valores: ['2']}] },
       	
       	//Substituição de colaborador em férias
       	{ campo: 'cpAprovacaoSubstituicao', label: 'Aprovação', atividades: atv_substituicao, regras: ['obrigatorio'] },
       	{ campo: 'cpParecerSubstituicao', label: 'Parecer ', atividades: atv_substituicao, regras: ['obrigatorio'], condicoes: [{campo: 'cpAprovacaoSubstituicao', valores: ['2']}] },
       	
       	//Integração RM
       	{ campo: 'cpAprovacaoIntegracaoRM', label: 'Aprovação', atividades: atv_integracao_manual, regras: ['obrigatorio'] },
       	{ campo: 'cpParecerIntegracaoRM', label: 'Parecer ', atividades: atv_integracao_manual, regras: ['obrigatorio'], condicoes: [{campo: 'cpAprovacaoIntegracaoRM', valores: ['2']}] },
     	
    ];
  
    var Validador = new ValidaFormulario(form, getValue("WKNumState"));
    
    if (!Validador.validar(regras_do_formulario)) 
    {
        throw Validador.mensagem_de_erro();
    }
    
    /*VALIDAÇÔES DE REGRA DE NEGOCIO*/
    
	if(form.getValue('cpDiasFerias') > 30)
	{
		throw 'Voce selecionou mais dias de férias do que tem direito!'
	}

}