function enableFields(form) {
	form.setEnhancedSecurityHiddenInputs(true);

	/*
		  0,1 - Inicio
		2 - Reabertura de processo
		18 - Aprovação do Solicitante da Exceção
		20 - Aprovação da Consultoria de RH da Exceção
		22 - Parecer da área de Remuneração
		25 - Aprovação do Gestor da área da Exceção
		26 - Aprovação do Gerente Geral da área da Exceção
		28 - Aprovação do Superintendente da área da Exceção
		30 - Aprovação do Diretor da área da Exceção
		32 - Aprovação do Gestor (Destino)
		34 - Aprovação do Gestor CSC
		37 - Aprovação do Gestor RH
		40 - Recolhimento da Documentação
		42 - Processamento da Exceção - Área CSC
		43 - Ajuste do Processamento - área CSC
		44 - Conferência do Processamento
	*/

	var atv_inicio = [0, 1, 2];
	var atv_reabertura = [2];
	var aprov_SolExcecao = [18];
	var aprov_ConsultRh = [20];
	var aprov_Remuneracao = [22];
	var aprov_GestorExc = [25];
	var aprov_GGExc = [26];
	var aprov_SuperExc = [28];
	var aprov_DiretorExc = [30];
	var aprov_GestorDestino = [32];
	var aprov_GestorCSC = [34];
	var aprov_GestorRH = [37];
	var aprov_RecDocum = [40];
	var aprov_ProcExcecao = [42];
	var aprov_AjusteProce = [43];
	var aprov_ConfProcess = [44];




	var atvAtual = parseInt(getValue("WKNumState"));

	var listaCampos = [

		[['cpReaberturaChamado', 'cpParecerReabertura'], atv_reabertura],
		[['cpReaberturaChamado', 'cpParecerReabertura', 'cpObraDepSolicitanteExcecao', 'cpColabSolicitanteExcecao', 'cpFuncaoSolicitanteExcecao',
			'cpMatriculaSolicitanteExcecao', 'cpTipoExcecao', 'cpAdmissaoRemuneracao', 'cpObraDepartamentoF', 'cpCodSecaoF', 'cpCodColigF',
			'cpColaboradorF', 'cpFuncaoF', 'cpSalarioAdmissao', 'cpTipoMaoDeObra', 'cpHorarioTrabalho2', 'cpGestorAdm', 'cpGGAdmiss', 'cpTipoPostoTrabalho',
			'cpNomePostoTrabalho', 'cpMotivoAdmissao', 'cpColbSubstuido', 'cpNomeFuncaoSubs', 'cpParAdmisColSubst', 'cpResponsavelDoc', 'cpFerias', 'cpOutroFerias',
			'cpObraDepartamento', 'cpCodSecaoL', 'cpCodColig', 'cpColaboradorFerias', 'cpFuncao', 'cpMatriulaFer', 'cpDtAdmiFer', 'cpPeriodoAquisitivo', 'cpDtNasc', 'cpIdade',
			'cpInicioFerias', 'cpTerminoFerias', 'cpDiasFerias', 'cpHaveraAbono', 'cpDiasAbono', 'cpAnteciparPagamento', 'cpOutro', 'cpMovimentacao', 'cpOutroM', 'cpObraDepartamentoM', 'cpCodSecaoM',
			'cpCodColigM', 'cpColaboradorFeriasM', 'cpFuncaoM', 'cpMatriulaM', 'cpTipoMaoObraM', 'cpDtAdmissaoM', 'cpSalarioAtualM', 'cpGestorAdmM', 'cpGGAdmissM',
			'cpHaveraTransferencia', 'cpAcima300Km', 'cpInformacoesTransferencia', 'cpNovaObraDepartamentoM', 'cpCodSecaoMM', 'cpCodColigMm', 'cpNomeNovoGestorM',
			'cpPostTrabAtual', 'cpAltPostTrab', 'cpTipoNovoPost', 'cpNomeNovoPostTrab', 'cpTipoAlteracaoSalarial', 'cpNovaFunc', 'cpNovoSalario',
			'cpAumentoSalarial', 'cpAdicionalTransferencia', 'cpSalarioAdicionalTrans', 'cpNovoSalarioProg', 'cpAumentoSalarialProg', 'cpAdicionalTransferenciaProg',
			'cpSalarioAdicionalTransProg', 'cpNovoSalarioEnq', 'cpAumentoSalarialEnq', 'cpAdicionalTransferenciaEnq', 'cpSalarioAdicionalTransEnq',
			'cpNovaFuncRec', 'cpAdicionalTransferenciaRec', 'cpSalarioAdicionalTransRec', 'cpAdicionalTransferenciaSemAlt', 'cpSalarioAdicionalTransSemAlt',
			'cpRespRecolDoc', 'cpDtMov'], atv_inicio],
		[['cpAprovacaoSolicitanteExcecao', 'cpParecerSolicitanteExcecao'], aprov_SolExcecao],
		[['cpAprovacaoConsultoriaExcecao', 'cpParecerConsultoriaRhExcecao'], aprov_ConsultRh],
		[['cpAprovacaoRemuneracao', 'cpParecerRemuneracao'], aprov_Remuneracao],
		[['cpAprovacaoGestorAreaExcecao', 'cpParecerGestorAreaExcecao'], aprov_GestorExc],
		[['cpAprovacaoGerenteAreaExcecao', 'cpParecerGerenteAreaExcecao'], aprov_GGExc],
		[['cpAprovacaoSupAreaExcecao', 'cpParecerSupAreaExcecao'], aprov_SuperExc],
		[['cpAprovacaoDiretorAreaExcecao', 'cpParecerDiretorAreaExcecao'], aprov_DiretorExc],
		[['cpAprovacaoGestorDestino', 'cpParecerGestorDestino'], aprov_GestorDestino],
		[['cpAprovacaoGestorCSC', 'cpParecerGestorCSC'], aprov_GestorCSC],
		[['cpAprovacaoGestorRH', 'cpParecerGestorRH'], aprov_GestorRH],
		[['cpAprovacaoRecolhimentoDoc', 'cpParecerRecolhimentoDoc', 'cpDtAdmiss'], aprov_RecDocum],
		[['cpAprovacaoExcecaoCSC', 'cpParecerExcecaoCSC'], aprov_ProcExcecao],
		[['cpAprovacaoConferencia', 'cpParecerConferencia'], aprov_ConfProcess],
		[['cpAprovacaoAjuste', 'cpParecerAjuste'], aprov_AjusteProce],

	];

	listaCampos.forEach(function ([campos, atividades]) {
		if (!inArray(atvAtual, atividades)) {
			campos.forEach(function (campo) {
				form.setEnabled(campo, false);
			});
		}
	});
}
