function validateForm(form) {

	/*
	 * resumo das atividades
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


	var regras_do_formulario = [

		{ campo: 'cpReaberturaChamado', label: 'Aprovação', atividades: atv_reabertura, regras: ['obrigatorio'] },
		{ campo: 'cpParecerReabertura', label: 'Parecer', atividades: atv_reabertura, regras: ['obrigatorio'] },
		{ campo: 'cpObraDepSolicitanteExcecao', label: 'Obra / Departamento', atividades: atv_inicio, regras: ['obrigatorio'] },
		{ campo: 'cpColabSolicitanteExcecao', label: 'Colaborador', atividades: atv_inicio, regras: ['obrigatorio'] },
		{ campo: 'cpTipoExcecao', label: 'Tipo de Exceção', atividades: atv_inicio, regras: ['obrigatorio'] },

		{ campo: 'cpAdmissaoRemuneracao', label: 'Motivo da Exceção', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpTipoExcecao', valores: ['1'] }] },
		{ campo: 'cpOutro', label: 'Outros', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAdmissaoRemuneracao', valores: ['outros'] }] },
		{ campo: 'cpObraDepartamentoF', label: 'Obra / Departamento', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpTipoExcecao', valores: ['1'] }] },
		{ campo: 'cpColaboradorF', label: 'Novo Colaborador', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpTipoExcecao', valores: ['1'] }] },
		{ campo: 'cpFuncaoF', label: 'Função', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpTipoExcecao', valores: ['1'] }] },
		{ campo: 'cpSalarioAdmissao', label: 'Salário', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpTipoExcecao', valores: ['1'] }] },
		{ campo: 'cpHorarioTrabalho2', label: 'Horário de Trabalho', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpTipoExcecao', valores: ['1'] }] },
		{ campo: 'cpTipoPostoTrabalho', label: 'Tipo de posto de trabalho', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpTipoExcecao', valores: ['1'] }] },
		{ campo: 'cpNomePostoTrabalho', label: 'Nome do posto de trabalho', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpTipoExcecao', valores: ['1'] }] },
		{ campo: 'cpMotivoAdmissao', label: 'Motivo da admissão', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpTipoExcecao', valores: ['1'] }] },
		{ campo: 'cpResponsavelDoc', label: 'Responsável por recolher Documentação', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpEhObra', valores: ['SIM'] }] },

		{ campo: 'cpFerias', label: 'Motivo da Exceção', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpTipoExcecao', valores: ['3'] }] },
		{ campo: 'cpOutroFerias', label: 'Outros', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpFerias', valores: ['outros'] }] },
		{ campo: 'cpObraDepartamento', label: 'Obra / Departamento', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpTipoExcecao', valores: ['3'] }] },
		{ campo: 'cpColaboradorFerias', label: 'Colaborador', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpTipoExcecao', valores: ['3'] }] },
		{ campo: 'cpInicioFerias', label: 'Início das Férias', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpTipoExcecao', valores: ['3'] }] },
		{ campo: 'cpTerminoFerias', label: 'Término das Férias', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpTipoExcecao', valores: ['3'] }] },
		{ campo: 'cpDiasFerias', label: 'Dias de Férias', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpTipoExcecao', valores: ['3'] }] },
		{ campo: 'cpHaveraAbono', label: 'Haverá abono?', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpTipoExcecao', valores: ['3'] }] },
		{ campo: 'cpAnteciparPagamento', label: 'Deseja antecipar pagamento da 1ª parcela do 13º salário?', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpTipoExcecao', valores: ['3'] }] },

		{ campo: 'cpMovimentacao', label: 'Motivo da Exceção', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpTipoExcecao', valores: ['5'] }] },
		{ campo: 'cpOutroM', label: 'Outros', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpMovimentacao', valores: ['outros'] }] },
		{ campo: 'cpObraDepartamentoM', label: 'Obra / Departamento', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpTipoExcecao', valores: ['5'] }] },
		{ campo: 'cpColaboradorFeriasM', label: 'Colaborador', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpTipoExcecao', valores: ['5'] }] },
		{ campo: 'cpHaveraTransferencia', label: 'Haverá transferência?', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpTipoExcecao', valores: ['5'] }] },
		{ campo: 'cpAcima300Km', label: 'Acima de 300 km?', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpHaveraTransferencia', valores: ['1'] }] },
		{ campo: 'cpNovaObraDepartamentoM', label: 'Nova Obra / Departamento', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpHaveraTransferencia', valores: ['1'] }] },
		{ campo: 'cpAltPostTrab', label: 'Alteração no Posto de trabalho?', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpTipoExcecao', valores: ['5'] }] },
		{ campo: 'cpTipoNovoPost', label: 'Tipo do novo Posto de Trabalho', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAltPostTrab', valores: ['1'] }] },
		{ campo: 'cpNomeNovoPostTrab', label: 'Nome do novo Posto de trabalho', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAltPostTrab', valores: ['1'] }] },
		{ campo: 'cpTipoAlteracaoSalarial', label: 'Tipo de alteração salarial', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpTipoExcecao', valores: ['5'] }] },
		{ campo: 'cpNovaFunc', label: 'Nova Função', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpTipoAlteracaoSalarial', valores: ['1'] }] },
		{ campo: 'cpNovoSalario', label: 'Novo Salário', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpTipoAlteracaoSalarial', valores: ['1'] }] },
		{ campo: 'cpAumentoSalarial', label: '% Aumento Salarial', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpTipoAlteracaoSalarial', valores: ['1'] }] },
		{ campo: 'cpAdicionalTransferencia', label: '% de adicional de transferência', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpTipoAlteracaoSalarial', valores: ['1'] }] },
		{ campo: 'cpNovoSalarioProg', label: 'Novo Salário', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpTipoAlteracaoSalarial', valores: ['2'] }] },
		{ campo: 'cpAdicionalTransferenciaProg', label: '% de adicional de transferência', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpTipoAlteracaoSalarial', valores: ['2'] }] },
		{ campo: 'cpNovoSalarioEnq', label: 'Novo Salário', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpTipoAlteracaoSalarial', valores: ['3'] }] },
		{ campo: 'cpAdicionalTransferenciaEnq', label: '% de adicional de transferência', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpTipoAlteracaoSalarial', valores: ['3'] }] },
		{ campo: 'cpNovaFuncRec', label: 'Nova Função', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpTipoAlteracaoSalarial', valores: ['4'] }] },
		{ campo: 'cpAdicionalTransferenciaRec', label: '% de adicional de transferência', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpTipoAlteracaoSalarial', valores: ['4'] }] },
		{ campo: 'cpAdicionalTransferenciaSemAlt', label: '% de adicional de transferência', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpTipoAlteracaoSalarial', valores: ['5'] }] },
		{ campo: 'cpRespRecolDoc', label: 'Responsável por Recolher Documentação', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpEhObraM', valores: ['SIM'] }] },
		{ campo: 'cpDtMov', label: 'Data da movimentação', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpTipoExcecao', valores: ['5'] }] },
		{ campo: 'cpColbSubstuido', label: 'Colaborador Substituido', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpMotivoAdmissao', valores: ['3', '4', '5', '6', '7'] }] },
		{ campo: 'cpNomeFuncaoSubs', label: 'Função', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpMotivoAdmissao', valores: ['3', '4', '5', '6', '7'] }] },

		{ campo: 'cpAprovacaoSolicitanteExcecao', label: 'Aprovação', atividades: aprov_SolExcecao, regras: ['obrigatorio'] },
		{ campo: 'cpParecerSolicitanteExcecao', label: 'Parecer', atividades: aprov_SolExcecao, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovacaoSolicitanteExcecao', valores: ['2'] }] },
		{ campo: 'cpAprovacaoConsultoriaExcecao', label: 'Aprovação', atividades: aprov_ConsultRh, regras: ['obrigatorio'] },
		{ campo: 'cpParecerConsultoriaRhExcecao', label: 'Parecer', atividades: aprov_ConsultRh, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovacaoConsultoriaExcecao', valores: ['2'] }] },
		{ campo: 'cpAprovacaoRemuneracao', label: 'Aprovação', atividades: aprov_Remuneracao, regras: ['obrigatorio'] },
		{ campo: 'cpParecerRemuneracao', label: 'Parecer', atividades: aprov_Remuneracao, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovacaoRemuneracao', valores: ['2'] }] },
		{ campo: 'cpAprovacaoGestorAreaExcecao', label: 'Aprovação', atividades: aprov_GestorExc, regras: ['obrigatorio'] },
		{ campo: 'cpParecerGestorAreaExcecao', label: 'Parecer', atividades: aprov_GestorExc, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovacaoGestorAreaExcecao', valores: ['2'] }] },
		{ campo: 'cpAprovacaoGerenteAreaExcecao', label: 'Aprovação', atividades: aprov_GGExc, regras: ['obrigatorio'] },
		{ campo: 'cpParecerGerenteAreaExcecao', label: 'Parecer', atividades: aprov_GGExc, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovacaoGerenteAreaExcecao', valores: ['2'] }] },
		{ campo: 'cpAprovacaoSupAreaExcecao', label: 'Aprovação', atividades: aprov_SuperExc, regras: ['obrigatorio'] },
		{ campo: 'cpParecerSupAreaExcecao', label: 'Parecer', atividades: aprov_SuperExc, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovacaoSupAreaExcecao', valores: ['2'] }] },
		{ campo: 'cpAprovacaoDiretorAreaExcecao', label: 'Aprovação', atividades: aprov_DiretorExc, regras: ['obrigatorio'] },
		{ campo: 'cpParecerDiretorAreaExcecao', label: 'Parecer', atividades: aprov_DiretorExc, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovacaoDiretorAreaExcecao', valores: ['2'] }] },
		{ campo: 'cpAprovacaoGestorDestino', label: 'Aprovação', atividades: aprov_GestorDestino, regras: ['obrigatorio'] },
		{ campo: 'cpParecerGestorDestino', label: 'Parecer', atividades: aprov_GestorDestino, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovacaoGestorDestino', valores: ['2'] }] },
		{ campo: 'cpAprovacaoGestorCSC', label: 'Aprovação', atividades: aprov_GestorCSC, regras: ['obrigatorio'] },
		{ campo: 'cpParecerGestorCSC', label: 'Parecer', atividades: aprov_GestorCSC, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovacaoGestorCSC', valores: ['2'] }] },
		{ campo: 'cpAprovacaoGestorRH', label: 'Aprovação', atividades: aprov_GestorRH, regras: ['obrigatorio'] },
		{ campo: 'cpParecerGestorRH', label: 'Parecer', atividades: aprov_GestorRH, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovacaoGestorRH', valores: ['2'] }] },

		{ campo: 'cpAprovacaoRecolhimentoDoc', label: 'Aprovação', atividades: aprov_RecDocum, regras: ['obrigatorio'] },
		{ campo: 'cpParecerRecolhimentoDoc', label: 'Parecer', atividades: aprov_RecDocum, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovacaoRecolhimentoDoc', valores: ['2'] }] },
		{ campo: 'cpDtAdmiss', label: 'Data de Admissão', atividades: aprov_RecDocum, regras: ['obrigatorio'], condicoes: [{ campo: 'cpValData', valores: ['SIM'] }] },

		{ campo: 'cpAprovacaoExcecaoCSC', label: 'Aprovação', atividades: aprov_ProcExcecao, regras: ['obrigatorio'] },
		{ campo: 'cpParecerExcecaoCSC', label: 'Parecer', atividades: aprov_ProcExcecao, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovacaoExcecaoCSC', valores: ['2'] }] },

		{ campo: 'cpAprovacaoAjuste', label: 'Aprovação', atividades: aprov_AjusteProce, regras: ['obrigatorio'] },
		{ campo: 'cpParecerAjuste', label: 'Parecer', atividades: aprov_AjusteProce, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovacaoAjuste', valores: ['2'] }] },


		{ campo: 'cpAprovacaoConferencia', label: 'Aprovação', atividades: aprov_ConfProcess, regras: ['obrigatorio'] },
		{ campo: 'cpParecerConferencia', label: 'Parecer', atividades: aprov_ConfProcess, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovacaoConferencia', valores: ['2'] }] },
		{ campo: 'cpGrauSatisfacao', label: 'Qual o seu grau de satisfação quanto ao atendimento desse chamado?', atividades: aprov_ConfProcess, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovacaoConferencia', valores: ['1'] }] },
		{ campo: 'cpJustifObs', label: 'Observações / Justificativas', atividades: aprov_ConfProcess, regras: ['obrigatorio'], condicoes: [{ campo: 'cpGrauSatisfacao', valores: ['3', '4'] }] },

	];

	var Validador = new ValidaFormulario(form, getValue("WKNumState"));

	if (!Validador.validar(regras_do_formulario)) {
		throw Validador.mensagem_de_erro();
	}
};