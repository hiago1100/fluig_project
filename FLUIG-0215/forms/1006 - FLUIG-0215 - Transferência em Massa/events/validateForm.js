function validateForm(form)
{
    var atv = getValue("WKNumState");    

    var atv_inicio = [0, 1, 2];
    var atv_reabertura = [2];
    var aprovacao_ConsultoriaRH_Origem = [6];
    var aprovacao_Gestor_Origem = [7];
    var aprovacao_GerenteGeral_Origem = [8];
    var aprovacao_Superintendente_Origem = [9];
    var aprovacao_ConsultoriaRH_Destino = [10];
    var aprovacao_Gestor_Destino = [11];
    var aprovacao_GerenteGeral_Destino = [12];
    var aprovacao_Superintendente_Destino = [13];
    var aprovacao_processamento_rotina_folha = [238];
    var conferencia_solicitante = [16];
    
    var regras_do_formulario = [ 
        // Dados Departamento Origem
        { campo: 'cpObraDpOrigem', label: 'Obra/ Departamento- Origem', atividades: atv_inicio, regras: ['obrigatorio'] },
        { campo: 'cpEmpressaOrigem', label: 'Empresa - Origem', atividades: atv_inicio, regras: ['obrigatorio'] },
        { campo: 'cpCodEmpressaOrigem', label: 'Cod. Empresa - Origem', atividades: atv_inicio, regras: ['obrigatorio'] },
        { campo: 'cpEstadoOrigem', label: 'Estado – Origem', atividades: atv_inicio, regras: ['obrigatorio'] },
        { campo: 'cpGestorOrigem', label: 'Gestor - Origem', atividades: atv_inicio, regras: ['obrigatorio'] },
        { campo: 'cpObraParceiraOrigem', label: 'Obra Parceira?', atividades: atv_inicio, regras: ['obrigatorio'] },
        { campo: 'cpNomeParceiroOrigem', label: 'Nome do Parceiro', atividades: atv_inicio, regras: ['obrigatorio'] },
        { campo: 'cpConstrutorOrigem', label: 'Construtor', atividades: atv_inicio, regras: ['obrigatorio'] },
        
        //Dados Departamento Destino
        { campo: 'cpObraDpDestino', label: 'Obra/ Departamento- Destino', atividades: atv_inicio, regras: ['obrigatorio'] },
        { campo: 'cpEmpressaDestino', label: 'Empresa - Destino', atividades: atv_inicio, regras: ['obrigatorio'] },
        { campo: 'cpCodEmpressaDestino', label: 'Cod. Empresa - Destino', atividades: atv_inicio, regras: ['obrigatorio'] },
        { campo: 'cpEstadoDestino', label: 'Estado – Destino', atividades: atv_inicio, regras: ['obrigatorio'] },
        { campo: 'cpGestorDestino', label: 'Gestor - Destino', atividades: atv_inicio, regras: ['obrigatorio'] },
        { campo: 'cpObraParceiraDestino', label: 'Obra Parceira?', atividades: atv_inicio, regras: ['obrigatorio'] },
        { campo: 'cpNomeParceiroDestino', label: 'Nome do Parceiro?', atividades: atv_inicio, regras: ['obrigatorio'] },
        { campo: 'cpConstrutorDestino', label: 'Construtor', atividades: atv_inicio, regras: ['obrigatorio'] },
        
        { campo: 'cpTransf300km', label: 'Transferência mais de 300 km', atividades: atv_inicio, regras: ['obrigatorio'] },
        
        // Mínimo de filhos
        { tablename: 'tableColaboradores', label: 'Colaborador', atividades: atv_inicio, regras: ['minimo_de_filhos|1']},

        // Regras para campos do pai e filho
	    { tablename: 'tableColaboradores', label: 'Adicionar colaborador', atividades: atv_inicio, regras: ['pai_e_filho'], regras_filhos: [
	    	{campo: 'cpNomeColaborador', label: 'Colaborador', regras: ['filho_obrigatorio']},
	    	{campo: 'cpMatriculaColaborador', label: 'Matricula', regras: ['filho_obrigatorio']},
            {campo: 'cpPcdColaborador', label: 'Colaborador PCD', regras: ['filho_obrigatorio']},
            {campo: 'cpFuncAtualColaborador', label: 'Função atual', regras: ['filho_obrigatorio']},
            {campo: 'cpDtAdimissaoColaborador', label: 'Data de admissão', regras: ['filho_obrigatorio']},
            {campo: 'cpSalarioColaborador', label: 'Salário atual', regras: ['filho_obrigatorio']},
            {campo: 'cpSituacaoColaborador', label: 'Situação', regras: ['filho_obrigatorio']},
            {campo: 'cpPerFeriasColaborador', label: 'Período de Férias', regras: ['filho_obrigatorio']},
            {campo: 'cpCpfColaborador', label: 'CPF', regras: ['filho_obrigatorio']},
        ]},

        //Reabertura de processo
        { campo: 'cpReaberturaChamado', label: 'Aprovação', atividades: atv_reabertura, regras: ['obrigatorio'] },
        {campo: 'cpParecerReabertura', label: 'Parecer', atividades: atv_reabertura, regras: ['obrigatorio'], condicoes: [{campo: 'cpReaberturaChamado', valores: ['2']}]},
        
        //Aprovação Consultoria de RH - Origem
        { campo: 'cpaprovacaoRhOrigem', label: 'Aprovação', atividades: aprovacao_ConsultoriaRH_Origem, regras: ['obrigatorio'] },
        {campo: 'cpParecerRHOrigem', label: 'Parecer', atividades: aprovacao_ConsultoriaRH_Origem, regras: ['obrigatorio'], condicoes: [{campo: 'cpaprovacaoRhOrigem', valores: ['2']
        }]},

        //Aprovação Gestor - Origem
        { campo: 'cpAprovacaoGestorOrigem', label: 'Aprovação', atividades: aprovacao_Gestor_Origem, regras: ['obrigatorio'] },
        {campo: 'cpPareceraGestorOrigem', label: 'Parecer', atividades: aprovacao_Gestor_Origem, regras: ['obrigatorio'], condicoes: [{campo: 'cpAprovacaoGestorOrigem', valores: ['2']
        }]},
        
        //Aprovação Gerente Geral - Origem
        { campo: 'cpaprovacaoGGOrigem', label: 'Aprovação', atividades: aprovacao_GerenteGeral_Origem, regras: ['obrigatorio'] },
        {campo: 'cpParecerGGOrigem', label: 'Parecer', atividades: aprovacao_GerenteGeral_Origem, regras: ['obrigatorio'], condicoes: [{campo: 'cpaprovacaoGGOrigem', valores: ['2']
        }]},
        
        //Aprovação Superintendente - Origem
        { campo: 'cpaprovacaoSuperOrigem', label: 'Aprovação', atividades: aprovacao_Superintendente_Origem, regras: ['obrigatorio'] },
        {campo: 'cpParecerSuperOrigem', label: 'Parecer', atividades: aprovacao_Superintendente_Origem, regras: ['obrigatorio'], condicoes: [{campo: 'cpaprovacaoSuperOrigem', valores: ['2']}]},

        //Aprovação Consultoria de RH - Destino
        { campo: 'cpaprovacaoRHDestino', label: 'Aprovação', atividades: aprovacao_ConsultoriaRH_Destino, regras: ['obrigatorio'] },
        {campo: 'cpParecerRHDestino', label: 'Parecer', atividades: aprovacao_ConsultoriaRH_Destino, regras: ['obrigatorio'], condicoes: [{
            campo: 'cpaprovacaoRHDestino', valores: ['2']
        }]},

        //Aprovação Gestor - Destino
        { campo: 'cpaprovacaoGestorDestino', label: 'Aprovação', atividades: aprovacao_Gestor_Destino, regras: ['obrigatorio'] },
        {campo: 'cpParecerGestorDestino', label: 'Parecer', atividades: aprovacao_Gestor_Destino, regras: ['obrigatorio'], condicoes: [{
            campo: 'cpaprovacaoGestorDestino', valores: ['2']
        }]},

        //Aprovação Gerente Geral - Destino
        { campo: 'cpAprovacaoGGDestino', label: 'Aprovação', atividades: aprovacao_GerenteGeral_Destino, regras: ['obrigatorio'] },
        {campo: 'cpParecercGGDestino', label: 'Parecer', atividades: aprovacao_GerenteGeral_Destino, regras: ['obrigatorio'], condicoes: [{
            campo: 'cpAprovacaoGGDestino', valores: ['2']
        }]},

        //Aprovação Superintendente - Destino
        { campo: 'cpaprovacaoSuperDestino', label: 'Aprovação', atividades: aprovacao_Superintendente_Destino, regras: ['obrigatorio'] },
        {campo: 'cpParecerSuperDestino', label: 'Parecer', atividades: aprovacao_Superintendente_Destino, regras: ['obrigatorio'], condicoes: [{campo: 'cpaprovacaoSuperDestino', valores: ['2']}]},
        
        //Processamento da solicitação – Rotinas de folha
        { tablename: 'tableProscFolha', label: 'Aprovação', atividades: aprovacao_processamento_rotina_folha, regras: ['pai_e_filho'], regras_filhos: [
	    	{campo: 'cpProcessadoFolha', label: 'Processado', regras: ['filho_obrigatorio']},
	    	{campo: 'cpParecerFolha', label: 'Parecer', regras: ['filho_obrigatorio'], condicoes: [{campo: 'cpProcessadoFolha', valores: ['2']}]},
        ]},

         //16 - Conferência do atendimento - Solicitante
        { campo: 'cpAprovacaoConfSolicitante', label: 'Aprovação', atividades: conferencia_solicitante, regras: ['obrigatorio'] },
        { campo: 'cpParecerConfSolicitante', label: 'Parecer ', atividades: conferencia_solicitante, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovacaoConfSolicitante', valores: ['2'] }] },
        { campo: 'cpAvaliacao', label: 'Qual o seu grau de satisfação quanto ao atendimento dessa solictação? ', atividades: conferencia_solicitante, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovacaoConfSolicitante', valores: ['1'] }] },
        { campo: 'cpAvaliacaoJustificativa', label: 'Justificativa ', atividades: conferencia_solicitante, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAvaliacao', valores: ['2', '1'] }] }, 



    ];
  
    var Validador = new ValidaFormulario(form, getValue("WKNumState"));
    
    if (!Validador.validar(regras_do_formulario)) 
    {
        throw Validador.mensagem_de_erro();
    }

    //validacoes especificas
    var indexes = form.getChildrenIndexes("tableColaboradores");

    for(var i = 0; i < indexes.length; i++)
    {
        log.warn('¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨');
        log.warn(indexes[i]);
        log.warn(form.getValue("cpPcdColaborador___" + indexes[i]));
        log.warn(form.getValue("cpPerFeriasColaborador___" + indexes[i]));

        if (form.getValue("cpPcdColaborador___" + indexes[i]) == 'SIM')
        {
            throw 'o colaborador '+form.getValue("cpNomeColaborador___" + indexes[i]) +' não poderá ser transferido por este chamado. Colaboradores PCD só podem ser transferidos através do chamado de "Movimentação de pessoal"';
        }

        if (form.getValue("cpPerFeriasColaborador___" + indexes[i]) == 'SIM')
        {
            throw 'o colaborador '+form.getValue("cpNomeColaborador___" + indexes[i]) +' possui ferias marcadas e não pode ser movimentado por este chamado!';
        }
    }

}

