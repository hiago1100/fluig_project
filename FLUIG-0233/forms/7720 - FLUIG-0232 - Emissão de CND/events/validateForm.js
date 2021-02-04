function validateForm(form) {
    /* 
      * resumo das atividades
         0,1 - Inicio
         2 - Reabertura de processo - Demanda de Incorporação
         12 - Reabertura de processo - Demanda do Jurídico
         14 - Conferência da documentação- Jurídico
         15 - Conferência dos dados Técnicos da documentação
         18 - Agendamento de senha na Receita Federal
         98 - Comunicação de Agendamento 
         19 - Emissão de CND
         17 - Recebimento da averbação do habite-se
         16 - Solicitar averbação do habite-se
         13 - Conferência do processamento – Solicitante
 */
    var atv_inicio = [0, 1, 2, 12];
    var atv_reabertura_incorporacao = [2];
    var atv_reabertura_juridico = [12];
    var atv_conferencia_juridico = [14];
    var atv_conferencia_dados = [15];
    var atv_agendamento = [18];
    var atv_emissao_cnd = [19];
    var atv_recebimento_averbacao = [17];
    var atv_solicitacao_averbacao = [16];
    var atv_conferencia_solicitante = [13];

    var regras_do_formulario = [

        //Início
        /////////////////////Dados da Obra
        { campo: 'cpObra', label: 'Obra', atividades: atv_inicio, regras: ['obrigatorio'] },
        { campo: 'cpIdentificacao', label: 'Identificação do proprietário do imóvel, dono, incorporador ou condomínio', atividades: atv_inicio, regras: ['obrigatorio'] },
        { campo: 'cpMatriculaCEI', label: 'Matricula CEI ', atividades: atv_inicio, regras: ['obrigatorio'] },
        { campo: 'cpLogradouro', label: 'Logradouro', atividades: atv_inicio, regras: ['obrigatorio'] },
        { campo: 'cpNumero', label: 'Nº', atividades: atv_inicio, regras: ['obrigatorio'] },
        { campo: 'cpComplemento', label: 'Complemento', atividades: atv_inicio, regras: ['obrigatorio'] },
        { campo: 'cpLotes', label: 'Lotes', atividades: atv_inicio, regras: ['obrigatorio'] },
        { campo: 'cpQuadra', label: 'Quadra', atividades: atv_inicio, regras: ['obrigatorio'] },
        { campo: 'cpBairro', label: 'Bairro', atividades: atv_inicio, regras: ['obrigatorio'] },
        { campo: 'cpMunicipio', label: 'Município', atividades: atv_inicio, regras: ['obrigatorio'] },
        { campo: 'cpUF', label: 'UF', atividades: atv_inicio, regras: ['obrigatorio'] },
        { campo: 'cpCEP', label: 'CEP', atividades: atv_inicio, regras: ['obrigatorio'] },
        { campo: 'cpTelefone', label: 'Telefone', atividades: atv_inicio, regras: ['obrigatorio'] },
        { campo: 'cpNumAlvara', label: 'Nº do alvará/habite- se', atividades: atv_inicio, regras: ['obrigatorio'] },
        { campo: 'cpDtAlvara', label: 'Data alvará/habite-se', atividades: atv_inicio, regras: ['obrigatorio'] },
        { campo: 'cpNumVistoria', label: 'Nº vistoria de conclusão', atividades: atv_inicio, regras: ['obrigatorio'] },
        { campo: 'cpDtVistoria', label: 'Data da vistoria', atividades: atv_inicio, regras: ['obrigatorio'] },
        { campo: 'cpDtInicio', label: 'Data de início', atividades: atv_inicio, regras: ['obrigatorio'] },
        { campo: 'cpDtTermino', label: 'Data de término', atividades: atv_inicio, regras: ['obrigatorio'] },
        { campo: 'cpTrataObra', label: 'Trata-se de obra', atividades: atv_inicio, regras: ['obrigatorio'] },

        /////////////////////Informações Contratuais
        { campo: 'cpNumeroInfo', label: 'Número', atividades: atv_inicio, regras: ['obrigatorio'] },
        { campo: 'cpRegistroInfo', label: 'Registro', atividades: atv_inicio, regras: ['obrigatorio'] },
        { campo: 'cpDataInfo', label: 'Data', atividades: atv_inicio, regras: ['obrigatorio'] },
        { campo: 'cpValorInfo', label: 'Valor total com reajustes', atividades: atv_inicio, regras: ['obrigatorio'] },
        { campo: 'cpAditivoInfo', label: 'Contém aditivo?', atividades: atv_inicio, regras: ['obrigatorio'] },
        { campo: 'cpQuantosInfo', label: 'Quantos?', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAditivoInfo', valores: ['1'] }] },
        { campo: 'cpTpCNDInfo', label: 'Tipo de CND', atividades: atv_inicio, regras: ['obrigatorio'] },
 
        /////////////////////Dados da Obra - Informações Contidas no Processo
        { campo: 'chResUnifamiliar', label: 'Definição do Imóvel', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpValidaCheckObra', valores: ['0'] }] },
        { campo: 'chResMultifamiliar', label: 'Definição do Imóvel', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpValidaCheckObra', valores: ['0'] }] },
        { campo: 'chResHotelfamiliar', label: 'Definição do Imóvel', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpValidaCheckObra', valores: ['0'] }] },
        { campo: 'chAreaUnifamiliar', label: 'Definição do Imóvel', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpValidaCheckObra', valores: ['0'] }] },
        { campo: 'chAndaresUnifamiliar', label: 'Definição do Imóvel', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpValidaCheckObra', valores: ['0'] }] },
        { campo: 'chSalasfamiliar', label: 'Definição do Imóvel', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpValidaCheckObra', valores: ['0'] }] },
        { campo: 'chGalpaofamiliar', label: 'Definição do Imóvel', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpValidaCheckObra', valores: ['0'] }] },
        { campo: 'chCasaUnifamiliar', label: 'Definição do Imóvel', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpValidaCheckObra', valores: ['0'] }] },
        { campo: 'chConjuntoUnifamiliar', label: 'Definição do Imóvel', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpValidaCheckObra', valores: ['0'] }] },
        { campo: 'cpGalpaoNumUnidade', label: 'Nº Unidades', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'chGalpaofamiliar', valores: ['on'] }] },
        { campo: 'cpCasaNumUnidade', label: 'Nº Unidades', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'chCasaUnifamiliar', valores: ['on'] }] },

        //Reabertura de processo - Demanda de Incorporação
        { campo: 'cpReaberturaIncorporacao', label: 'Aprovação', atividades: atv_reabertura_incorporacao, regras: ['obrigatorio'] },
        { campo: 'cpParecerIncorporacao', label: 'Parecer', atividades: atv_reabertura_incorporacao, regras: ['obrigatorio'], condicoes: [{ campo: 'cpReaberturaIncorporacao', valores: ['1'] }], condicoes: [{ campo: 'cpReaberturaIncorporacao', valores: ['2'] }] },

        //Reabertura de processo - Demanda do Jurídico
        { campo: 'cpReaberturaJuridico', label: 'Aprovação', atividades: atv_reabertura_juridico, regras: ['obrigatorio'] },
        { campo: 'cpParecerReaberturaJuridico', label: 'Parecer', atividades: atv_reabertura_juridico, regras: ['obrigatorio'], condicoes: [{ campo: 'cpReaberturaJuridico', valores: ['2'] }] },

        //Conferência da documentação- Jurídico
        { campo: 'cpAprovaConfJuridico', label: 'Aprovação', atividades: atv_conferencia_juridico, regras: ['obrigatorio'] },
        { campo: 'cpPareceConfJuridico', label: 'Parecer', atividades: atv_conferencia_juridico, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovaConfJuridico', valores: ['2'] }] },

        //Conferência dos dados Técnicos da documentação
        { campo: 'cpAprovaConfDados', label: 'Aprovação', atividades: atv_conferencia_dados, regras: ['obrigatorio'] },
        { campo: 'cpPareceConfDados', label: 'Parecer', atividades: atv_conferencia_dados, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovaConfDados', valores: ['2'] }] },

        //Agendamento de senha na Receita Federal
        { campo: 'cpAgendamento', label: 'Aprovação', atividades: atv_agendamento, regras: ['obrigatorio'] },
        { campo: 'cpDataAgendamento', label: 'Data', atividades: atv_agendamento, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAgendamento', valores: ['1'] }] },
        { campo: 'cpHoraAgendamento', label: 'Hora', atividades: atv_agendamento, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAgendamento', valores: ['1'] }] },
        { campo: 'cpPareceAgendamento', label: 'Parecer', atividades: atv_agendamento, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAgendamento', valores: ['2'] }] },

        //Emissão de CND
        { campo: 'cpAprovaCND', label: 'Aprovação', atividades: atv_emissao_cnd, regras: ['obrigatorio'] },
        { campo: 'cpPareceCND', label: 'Parecer', atividades: atv_emissao_cnd, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovaCND', valores: ['2'] }] },

        //Solicitar averbação do habite-se
        { campo: 'cpProtocolado', label: 'Protocolado', atividades: atv_solicitacao_averbacao, regras: ['obrigatorio'] },
        { campo: 'cpPareceAverbacao', label: 'Parecer', atividades: atv_solicitacao_averbacao, regras: ['obrigatorio'], condicoes: [{ campo: 'cpProtocolado', valores: ['2'] }] },

        //Recebimento da averbação do habite-se
        { campo: 'cpProtocoladoRecebimento', label: 'Protocolado', atividades: atv_recebimento_averbacao, regras: ['obrigatorio'] },
        { campo: 'cpDataRecebimento', label: 'Data da averbação do habite-se', atividades: atv_recebimento_averbacao, regras: ['obrigatorio'], condicoes: [{ campo: 'cpProtocoladoRecebimento', valores: ['1'] }] },
        { campo: 'cpMatriculaRecebimento', label: 'Matricula', atividades: atv_recebimento_averbacao, regras: ['obrigatorio'], condicoes: [{ campo: 'cpProtocoladoRecebimento', valores: ['1'] }] },
        { campo: 'cpPareceRecebimento', label: 'Parecer', atividades: atv_recebimento_averbacao, regras: ['obrigatorio'], condicoes: [{ campo: 'cpProtocoladoRecebimento', valores: ['2'] }] },

        //Conferência do processamento – Solicitante
        { campo: 'cpAprovaConfSolicitante', label: 'Aprovação', atividades: atv_conferencia_solicitante, regras: ['obrigatorio'] },
        { campo: 'cpPareceConfSolicitante', label: 'Parecer', atividades: atv_conferencia_solicitante, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovaConfSolicitante', valores: ['2'] }] },
        { campo: 'cpSatisfacaoSolicitante', label: 'Qual o seu grau de satisfação quanto ao atendimento desse chamado?', atividades: atv_conferencia_solicitante, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovaConfSolicitante', valores: ['1'] }] },
        { campo: 'cpJustificativaSolicitante', label: 'Observações/Justificativa', atividades: atv_conferencia_solicitante, regras: ['obrigatorio'], condicoes: [{ campo: 'cpSatisfacaoSolicitante', valores: ['3', '4'] }] },
    ];

    setValidador(regras_do_formulario)

    //TABELA DADOS OBRA
    if (form.getValue('chResUnifamiliar') == "on") {
        var campos_ResUnifamiliar = [
            { campo: 'cpUniNumUnidade', label: 'Nº Unidades', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchResUnifamiliar', valores: ['0'] }] },
            { campo: 'cpUniNumPavimento', label: 'Nº Pavimentos', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchResUnifamiliar', valores: ['0'] }] },
            { campo: 'cpUniNumUnidade2', label: 'Nº Unid. com até 02 banheiros', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchResUnifamiliar', valores: ['0'] }] },
            { campo: 'cpUniNumUnidade3', label: 'Nº Unid. com 03 banheiros', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchResUnifamiliar', valores: ['0'] }] },
            { campo: 'cpUniNumUnidade4', label: 'Nº Unid. com 04 ou mais banheiros', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchResUnifamiliar', valores: ['0'] }] },
        ]
        setValidador(campos_ResUnifamiliar)
    }

    if (form.getValue('chResMultifamiliar') == "on") {
        var campos_ResMultifamiliar = [
            { campo: 'cpMultiNumUnidade', label: 'Nº Unidades', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchResMultifamiliar', valores: ['0'] }] },
            { campo: 'cpMultiNumPavimento', label: 'Nº Pavimentos', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchResMultifamiliar', valores: ['0'] }] },
            { campo: 'cpMultiNumUnidade2', label: 'Nº Unid. com até 02 banheiros', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchResMultifamiliar', valores: ['0'] }] },
            { campo: 'cpMultiNumUnidade3', label: 'Nº Unid. com 03 banheiros', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchResMultifamiliar', valores: ['0'] }] },
            { campo: 'cpMultiNumUnidade4', label: 'Nº Unid. com 04 ou mais banheiros', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchResMultifamiliar', valores: ['0'] }] },
        ]
        setValidador(campos_ResMultifamiliar)
    }

    if (form.getValue('chResHotelfamiliar') == "on") {
        var campos_ResHotelfamiliar = [
            { campo: 'cpHotelNumUnidade', label: 'Nº Unidades', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchResHotelfamiliar', valores: ['0'] }] },
            { campo: 'cpHotelNumPavimento', label: 'Nº Pavimentos', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchResHotelfamiliar', valores: ['0'] }] },
            { campo: 'cpHotelNumUnidade2', label: 'Nº Unid. com até 02 banheiros', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchResHotelfamiliar', valores: ['0'] }] },
            { campo: 'cpHotelNumUnidade3', label: 'Nº Unid. com 03 banheiros', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchResHotelfamiliar', valores: ['0'] }] },
            { campo: 'cpHotelNumUnidade4', label: 'Nº Unid. com 04 ou mais banheiros', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchResHotelfamiliar', valores: ['0'] }] },
        ]
        setValidador(campos_ResHotelfamiliar)
    }

    if (form.getValue('chAreaUnifamiliar') == "on") {
        var campos_AreaUnifamiliar = [
            { campo: 'cpAreaNumUnidade', label: 'Nº Unidades', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchAreaUnifamiliar', valores: ['0'] }] },
            { campo: 'cpAreaNumPavimento', label: 'Nº Pavimentos', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchAreaUnifamiliar', valores: ['0'] }] },
            { campo: 'cpAreaNumUnidade2', label: 'Nº Unid. com até 02 banheiros', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchAreaUnifamiliar', valores: ['0'] }] },
            { campo: 'cpAreaNumUnidade3', label: 'Nº Unid. com 03 banheiros', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchAreaUnifamiliar', valores: ['0'] }] },
            { campo: 'cpAreaNumUnidade4', label: 'Nº Unid. com 04 ou mais banheiros', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchAreaUnifamiliar', valores: ['0'] }] },
        ]
        setValidador(campos_AreaUnifamiliar)
    }

    if (form.getValue('chAndaresUnifamiliar') == "on") {
        var campos_AndaresUnifamiliar = [
            { campo: 'cpAndaresNumUnidade', label: 'Nº Unidades', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchAndaresUnifamiliar', valores: ['0'] }] },
            { campo: 'cpAndaresNumPavimento', label: 'Nº Pavimentos', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchAndaresUnifamiliar', valores: ['0'] }] },
        ]
        setValidador(campos_AndaresUnifamiliar)
    }

    if (form.getValue('chSalasfamiliar') == "on") {
        var campos_Salasfamiliar = [
            { campo: 'cpSalasNumUnidade', label: 'Nº Unidades', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchSalasfamiliar', valores: ['0'] }] },
            { campo: 'cpSalasNumPavimento', label: 'Nº Pavimentos', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchSalasfamiliar', valores: ['0'] }] },
        ]
        setValidador(campos_Salasfamiliar)
    }

    if (form.getValue('chConjuntoUnifamiliar') == "on") {
        var campos_ConjuntoUnifamiliar = [
            { campo: 'cpConjuntoNumUnidade', label: 'Nº Unidades', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchConjuntoUnifamiliar', valores: ['0'] }] },
            { campo: 'cpConjuntoNumPavimento', label: 'Nº Pavimentos', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchConjuntoUnifamiliar', valores: ['0'] }] },
            { campo: 'cpConjuntoNumUnidade2', label: 'Nº Unid. com até 02 banheiros', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchConjuntoUnifamiliar', valores: ['0'] }] },
            { campo: 'cpConjuntoNumUnidade3', label: 'Nº Unid. com 03 banheiros', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchConjuntoUnifamiliar', valores: ['0'] }] },
            { campo: 'cpConjuntoNumUnidade4', label: 'Nº Unid. com 04 ou mais banheiros', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchConjuntoUnifamiliar', valores: ['0'] }] },
        ];
        setValidador(campos_ConjuntoUnifamiliar)
    }

    //Tabela OBRA DEMOLIçÃO
    if (form.getValue('cpTpCNDInfo') == '1') {
        var campos_DadosEnquadramento = [
            /////////////////////Dados do Enquadramento para obra com Demolição
            { campo: 'chDemolResUnifamiliar', label: 'Definição do Imóvel', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpValidaCheckDemol', valores: ['0'] }] },
            { campo: 'chDemolResMultifamiliar', label: 'Definição do Imóvel', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpValidaCheckDemol', valores: ['0'] }] },
            { campo: 'chDemolResHotelfamiliar', label: 'Definição do Imóvel', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpValidaCheckDemol', valores: ['0'] }] },
            { campo: 'chDemolAreaUnifamiliar', label: 'Definição do Imóvel', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpValidaCheckDemol', valores: ['0'] }] },
            { campo: 'chDemolAndaresUnifamiliar', label: 'Definição do Imóvel', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpValidaCheckDemol', valores: ['0'] }] },
            { campo: 'chDemolSalasfamiliar', label: 'Definição do Imóvel', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpValidaCheckDemol', valores: ['0'] }] },
            { campo: 'chDemolGalpaofamiliar', label: 'Definição do Imóvel', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpValidaCheckDemol', valores: ['0'] }] },
            { campo: 'chDemolCasaUnifamiliar', label: 'Definição do Imóvel', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpValidaCheckDemol', valores: ['0'] }] },
            { campo: 'chDemolConjuntoUnifamiliar', label: 'Definição do Imóvel', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpValidaCheckDemol', valores: ['0'] }] },
            { campo: 'cpDemolGalpaoNumUnidade', label: 'Nº Unidades', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'chDemolGalpaofamiliar', valores: ['on'] }] },
            { campo: 'cpDemolCasaNumUnidade', label: 'Nº Unidades', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'chDemolCasaUnifamiliar', valores: ['on'] }] },
        ]
        setValidador(campos_DadosEnquadramento)

        if (form.getValue('chDemolResUnifamiliar') == "on") {
            var campos_DemolResUnifamiliar = [
                { campo: 'cpDemolUniNumUnidade', label: 'Nº Unidades', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchDemolResUnifamiliar', valores: ['0'] }] },
                { campo: 'cpDemolUniNumPavimento', label: 'Nº Pavimentos', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchDemolResUnifamiliar', valores: ['0'] }] },
                { campo: 'cpDemolUniNumUnidade2', label: 'Nº Unid. com até 02 banheiros', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchDemolResUnifamiliar', valores: ['0'] }] },
                { campo: 'cpDemolUniNumUnidade3', label: 'Nº Unid. com 03 banheiros', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchDemolResUnifamiliar', valores: ['0'] }] },
                { campo: 'cpDemolUniNumUnidade4', label: 'Nº Unid. com 04 ou mais banheiros', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchDemolResUnifamiliar', valores: ['0'] }] },
            ]
            setValidador(campos_DemolResUnifamiliar)
        }

        if (form.getValue('chDemolResMultifamiliar') == "on") {
            var campos_DemolResMultifamiliar = [
                { campo: 'cpDemolMultiNumUnidade', label: 'Nº Unidades', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchDemolResMultifamiliar', valores: ['0'] }] },
                { campo: 'cpDemolMultiNumPavimento', label: 'Nº Pavimentos', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchDemolResMultifamiliar', valores: ['0'] }] },
                { campo: 'cpDemolMultiNumUnidade2', label: 'Nº Unid. com até 02 banheiros', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchDemolResMultifamiliar', valores: ['0'] }] },
                { campo: 'cpDemolMultiNumUnidade3', label: 'Nº Unid. com 03 banheiros', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchDemolResMultifamiliar', valores: ['0'] }] },
                { campo: 'cpDemolMultiNumUnidade4', label: 'Nº Unid. com 04 ou mais banheiros', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchDemolResMultifamiliar', valores: ['0'] }] },
            ]
            setValidador(campos_DemolResMultifamiliar)
        }

        if (form.getValue('chDemolResHotelfamiliar') == "on") {
            var campos_DemolResHotelfamiliar = [
                { campo: 'cpDemolHotelNumUnidade', label: 'Nº Unidades', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchDemolResHotelfamiliar', valores: ['0'] }] },
                { campo: 'cpDemolHotelNumPavimento', label: 'Nº Pavimentos', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchDemolResHotelfamiliar', valores: ['0'] }] },
                { campo: 'cpDemolHotelNumUnidade2', label: 'Nº Unid. com até 02 banheiros', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchDemolResHotelfamiliar', valores: ['0'] }] },
                { campo: 'cpDemolHotelNumUnidade3', label: 'Nº Unid. com 03 banheiros', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchDemolResHotelfamiliar', valores: ['0'] }] },
                { campo: 'cpDemolHotelNumUnidade4', label: 'Nº Unid. com 04 ou mais banheiros', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchDemolResHotelfamiliar', valores: ['0'] }] },
            ]
            setValidador(campos_DemolResHotelfamiliar)
        }

        if (form.getValue('chDemolAreaUnifamiliar') == "on") {
            var campos_DemolAreaUnifamiliar = [
                { campo: 'cpDemolAreaNumUnidade', label: 'Nº Unidades', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchDemolAreaUnifamiliar', valores: ['0'] }] },
                { campo: 'cpDemolAreaNumPavimento', label: 'Nº Pavimentos', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchDemolAreaUnifamiliar', valores: ['0'] }] },
                { campo: 'cpDemolAreaNumUnidade2', label: 'Nº Unid. com até 02 banheiros', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchDemolAreaUnifamiliar', valores: ['0'] }] },
                { campo: 'cpDemolAreaNumUnidade3', label: 'Nº Unid. com 03 banheiros', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchDemolAreaUnifamiliar', valores: ['0'] }] },
                { campo: 'cpDemolAreaNumUnidade4', label: 'Nº Unid. com 04 ou mais banheiros', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchDemolAreaUnifamiliar', valores: ['0'] }] },
            ]
            setValidador(campos_DemolAreaUnifamiliar)
        }

        if (form.getValue('chDemolAndaresUnifamiliar') == "on") {
            var campos_DemolAndaresUnifamiliar = [
                { campo: 'cpDemolAndaresNumUnidade', label: 'Nº Unidades', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchDemolAndaresUnifamiliar', valores: ['0'] }] },
                { campo: 'cpDemolAndaresNumPavimento', label: 'Nº Pavimentos', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchDemolAndaresUnifamiliar', valores: ['0'] }] },
            ]
            setValidador(campos_DemolAndaresUnifamiliar)
        }

        if (form.getValue('chDemolSalasfamiliar') == "on") {
            var campos_DemolSalasfamiliar = [
                { campo: 'cpDemolSalasNumUnidade', label: 'Nº Unidades', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchDemolSalasfamiliar', valores: ['0'] }] },
                { campo: 'cpDemolSalasNumPavimento', label: 'Nº Pavimentos', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchDemolSalasfamiliar', valores: ['0'] }] },
            ]
            setValidador(campos_DemolSalasfamiliar)
        }

        if (form.getValue('chDemolConjuntoUnifamiliar') == "on") {
            var campos_DemolConjuntoUnifamiliar = [
                { campo: 'cpDemolConjuntoNumUnidade', label: 'Nº Unidades', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchDemolConjuntoUnifamiliar', valores: ['0'] }] },
                { campo: 'cpDemolConjuntoNumPavimento', label: 'Nº Pavimentos', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchDemolConjuntoUnifamiliar', valores: ['0'] }] },
                { campo: 'cpDemolConjuntoNumUnidade2', label: 'Nº Unid. com até 02 banheiros', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchDemolConjuntoUnifamiliar', valores: ['0'] }] },
                { campo: 'cpDemolConjuntoNumUnidade3', label: 'Nº Unid. com 03 banheiros', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchDemolConjuntoUnifamiliar', valores: ['0'] }] },
                { campo: 'cpDemolConjuntoNumUnidade4', label: 'Nº Unid. com 04 ou mais banheiros', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'hddchDemolConjuntoUnifamiliar', valores: ['0'] }] },
            ];
            setValidador(campos_DemolConjuntoUnifamiliar)
        }
    }

    function setValidador(regras_do_formulario) {
        var Validador = new ValidaFormulario(form, getValue("WKNumState"));

        if (!Validador.validar(regras_do_formulario)) {
            throw Validador.mensagem_de_erro();
        }
    }


}