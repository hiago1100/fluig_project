function validateForm(form)
{
    var atv_inicio = [0, 1, 2];
	var atv_reabertura = [2];
	var atv_consultoria_rh = [10];
	var atv_remuneracao = [12];
	var atv_gestor_rh = [13];
	var atv_aprovacao_n1 = [14];
	var atv_aprovacao_n2 = [15];
	var atv_aprovacao_n3 = [16];
	var atv_aprovacao_n4 = [17];

    var regras_do_formulario = [ 
    	
    	{ campo: 'cpReaberturaChamado', label: 'Aprovação', atividades: atv_reabertura, regras: ['obrigatorio'] },
     	{ campo: 'cpParecerReabertura', label: 'Parecer', atividades: atv_reabertura, regras: ['obrigatorio'] },
     	
    	{ campo: 'cpTipoMaoObra', label: 'Tipo de mão de obra', atividades: atv_inicio, regras: ['obrigatorio'] },
		{ campo: 'cpReqDepartamentoObra', label: 'Obra / Departamento', atividades: atv_inicio, regras: ['obrigatorio'] },
		{ campo: 'cpReqNomeResponsRecolhimento', label: 'Responsável pelo recolhimento da documentação da admissão', atividades: atv_inicio, regras: ['obrigatorio'] },
		
		{ campo: 'cpCodObra', label: 'O codigo para essa obra/departamento não foi cadastrado no RM', atividades: atv_inicio, regras: ['obrigatorio'] },
		{ campo: 'cpMatriculaConsultoraObraDep', label: 'Não existe consultor(a) cadastrado para essa obra/departamento', atividades: atv_inicio, regras: ['obrigatorio'] },
		
		{
            tablename: 'pfVagas', label: 'Função', atividades: atv_inicio, regras: ['pai_e_filho_condicional'], condicoes: [{ campo: 'cpTipoMaoObra', valores: ['Administrativo','Estratégico'] }],  regras_filhos: [
			{ campo: 'cpVagaFuncao', label: 'Função', regras: ['aba_filho_obrigatorio'] },
			{ campo: 'cpVagaSalario', label: 'Salario', regras: ['aba_filho_obrigatorio'] },
			{ campo: 'cpVagaHorario', label: 'Horário', regras: ['aba_filho_obrigatorio'] },
			{ campo: 'cpTipoPostoTrabalho', label: 'Tipo de posto de trabalho', regras: ['aba_filho_obrigatorio'] },
			{ campo: 'cpNomePostoTrabalho', label: 'Nome do posto de trabalho', regras: ['aba_filho_obrigatorio'] },
			{ campo: 'cpMotivoAdmissao', label: 'Motivo da admissão', regras: ['aba_filho_obrigatorio'] },
			{ campo: 'cpVagaIndicacao', label: 'Há indicação?', regras: ['aba_filho_obrigatorio'] },
			{ campo: 'cpVagaConfidencial', label: 'Vaga confidencial', regras: ['aba_filho_obrigatorio'] },
			{ campo: 'cpVagaTipo', label: 'Tipo de vaga ', regras: ['aba_filho_obrigatorio'] },
			{ campo: 'cpVagaAreaFormacao', label: 'Área de formação', regras: ['aba_filho_obrigatorio'] },
			{ campo: 'cpVagaGrauInstrucao', label: 'Grau de instrução', regras: ['aba_filho_obrigatorio'] },
			{ campo: 'cpVagaTempoExp', label: 'Tempo de experiência mínima comprovada', regras: ['aba_filho_obrigatorio'] },
			{ campo: 'cpVagaExpComprovada', label: 'Experiência comprovada em alguma área especifica?', regras: ['aba_filho_obrigatorio'] },
			{ campo: 'cpVagaExpDesejada', label: 'Experiência desejada em alguma área específica?', regras: ['aba_filho_obrigatorio'] },
			{ campo: 'cpVagaCompetenciaComportamento', label: 'Competências comportamentais', regras: ['aba_filho_obrigatorio'] },
			{ campo: 'cpVagaAtribuicoes', label: 'Atribuições do cargo (Tarefas a serem executadas)', regras: ['aba_filho_obrigatorio'] },
			{ campo: 'cpVagaConhecimento', label: 'Descreva o conhecimentos técnicos necessários', regras: ['aba_filho_obrigatorio'] },
			{ campo: 'cpVagaDiferenciais', label: 'Diferenciais a serem considerados e outras observações', regras: ['aba_filho_obrigatorio'] },
			{ campo: 'cpDisponibilidadeViagens', label: 'Disponibilidade para viagens', regras: ['aba_filho_obrigatorio'] },
			{ campo: 'cpPeriodicidadeViagens', label: 'Periodicidade das viagens ', regras: ['aba_filho_obrigatorio'] },
			{ campo: 'cpInglesNivel', label: 'Inglês ', regras: ['aba_filho_obrigatorio'] },
			{ campo: 'cpEspanholNivel', label: 'Espanhol', regras: ['aba_filho_obrigatorio'] },
			]
			
        },

     	//Aprovação da Consultoria de RH
     	{ campo: 'cpAprovacaoRH', label: 'Aprovação', atividades: atv_consultoria_rh, regras: ['obrigatorio'] },
     	{ campo: 'cpParecerAprovacaoRH', label: 'Parecer ', atividades: atv_consultoria_rh, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovacaoRH', valores: ['2'] }] },
		 
		 //Aprovação da Remuneração
		 { campo: 'cpAprovacaoRemuneracao', label: 'Aprovação', atividades: atv_remuneracao, regras: ['obrigatorio'] },
     	{ campo: 'cpParecerRemuneracao', label: 'Parecer ', atividades: atv_remuneracao, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovacaoRemuneracao', valores: ['2'] }] },
		 
		 //Aprovação do Gestor RH
		 { campo: 'cpAprovacaoGestorRH', label: 'Aprovação', atividades: atv_gestor_rh, regras: ['obrigatorio'] },
     	{ campo: 'cpParecerGestorRH', label: 'Parecer ', atividades: atv_gestor_rh, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovacaoGestorRH', valores: ['2'] }] },
		 
		 //Aprovação - N1
		 { campo: 'cpAprovacaoN1', label: 'Aprovação', atividades: atv_aprovacao_n1, regras: ['obrigatorio'] },
     	{ campo: 'cpParecerAprovacaoN1', label: 'Parecer ', atividades: atv_aprovacao_n1, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovacaoN1', valores: ['2'] }] },
		 
		 //Aprovação - N2
		 { campo: 'cpAprovacaoN2', label: 'Aprovação', atividades: atv_aprovacao_n2, regras: ['obrigatorio'] },
     	{ campo: 'cpParecerAprovacaoN2', label: 'Parecer ', atividades: atv_aprovacao_n2, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovacaoN2', valores: ['2'] }] },
		 
		 //Aprovação - N3
		 { campo: 'cpAprovacaoN3', label: 'Aprovação', atividades: atv_aprovacao_n3, regras: ['obrigatorio'] },
     	{ campo: 'cpParecerAprovacaoN3', label: 'Parecer ', atividades: atv_aprovacao_n3, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovacaoN3', valores: ['2'] }] },
		 
		 //Aprovação - N4
		 { campo: 'cpAprovacaoN4', label: 'Aprovação', atividades: atv_aprovacao_n4, regras: ['obrigatorio'] },
     	{ campo: 'cpParecerAprovacaoN4', label: 'Parecer ', atividades: atv_aprovacao_n4, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovacaoN4', valores: ['2'] }] },
		 
     	
    ];
  
    var Validador = new ValidaFormulario(form, getValue("WKNumState"));
    
    if (!Validador.validar(regras_do_formulario)) 
    {
        throw Validador.mensagem_de_erro();
	}
}