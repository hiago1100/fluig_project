function enableFields(form) {
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
    form.setEnhancedSecurityHiddenInputs(true);

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

    var atvAtual = parseInt(getValue("WKNumState"));

    var listaCampos = [

        //Inicio
        [[
            /////////////////////Dados da Obra
            'cpObra', 'cpIdentificacao', 'cpMatriculaCEI', 'cpLogradouro', 'cpNumero', 'cpComplemento', 'cpLotes', 'cpQuadra',
            'cpBairro', 'cpMunicipio', 'cpUF', 'cpCEP', 'cpTelefone', 'cpNumAlvara', 'cpDtAlvara', 'cpNumVistoria', 'cpDtVistoria',
            'cpDtInicio', 'cpDtTermino', 'cpTrataObra',

            /////////////////////Informações Contratuais
            'cpNumeroInfo', 'cpRegistroInfo', 'cpDataInfo', 'cpValorInfo', 'cpAditivoInfo',
            'cpQuantosInfo', 'cpTpCNDInfo',

            /////////////////////Dados da Obra - Informações Contidas no Processo
            'chAlvenaria', 'chMadeira', 'chResUnifamiliar', 'cpUniNumUnidade', 'cpUniNumPavimento',
            'cpUniNumUnidade2', 'cpUniNumUnidade3', 'cpUniNumUnidade4', 'chResMultifamiliar', 'cpMultiNumUnidade', 'cpMultiNumPavimento',
            'cpMultiNumUnidade2', 'cpMultiNumUnidade3', 'cpMultiNumUnidade4', 'chResHotelfamiliar', 'cpHotelNumUnidade', 'cpHotelNumPavimento',
            'cpHotelNumUnidade2', 'cpHotelNumUnidade3', 'cpHotelNumUnidade4', 'chAreaUnifamiliar', 'cpAreaNumUnidade', 'cpAreaNumPavimento',
            'cpAreaNumUnidade2', 'cpAreaNumUnidade3', 'cpAreaNumUnidade4', 'chAndaresUnifamiliar', 'cpAndaresNumUnidade', 'cpAndaresNumPavimento', 'chSalasfamiliar',
            'cpSalasNumUnidade', 'cpSalasNumPavimento', 'chGalpaofamiliar', 'cpGalpaoNumUnidade', 'chCasaUnifamiliar', 'cpCasaNumUnidade',
            'chConjuntoUnifamiliar', 'cpConjuntoNumUnidade', 'cpConjuntoNumPavimento', 'cpConjuntoNumUnidade2', 'cpConjuntoNumUnidade3',
            'cpConjuntoNumUnidade4',

            /////////////////////Dados do Enquadramento para obra com Demolição
            'chAlvenariaDemol', 'chMadeiraDemol', 'chDemolResUnifamiliar', 'cpDemolUniNumUnidade', 'cpDemolUniNumPavimento',
            'cpDemolUniNumUnidade2', 'cpDemolUniNumUnidade3', 'cpDemolUniNumUnidade4', 'chDemolResMultifamiliar', 'cpDemolMultiNumUnidade', 'cpDemolMultiNumPavimento',
            'cpDemolMultiNumUnidade2', 'cpDemolMultiNumUnidade3', 'cpDemolMultiNumUnidade4', 'chDemolResHotelfamiliar', 'cpDemolHotelNumUnidade', 'cpDemolHotelNumPavimento',
            'cpDemolHotelNumUnidade2', 'cpDemolHotelNumUnidade3', 'cpDemolHotelNumUnidade4', 'chDemolAreaUnifamiliar', 'cpDemolAreaNumUnidade', 'cpDemolAreaNumPavimento',
            'cpDemolAreaNumUnidade2', 'cpDemolAreaNumUnidade3', 'cpDemolAreaNumUnidade4', 'chDemolAndaresUnifamiliar', 'cpDemolAndaresNumUnidade',
            'cpDemolAndaresNumPavimento', 'chDemolSalasfamiliar', 'cpDemolSalasNumUnidade', 'cpDemolSalasNumPavimento', 'chDemolGalpaofamiliar', 'cpDemolGalpaoNumUnidade',
            'chDemolCasaUnifamiliar', 'cpDemolCasaNumUnidade', 'chDemolConjuntoUnifamiliar', 'cpDemolConjuntoNumUnidade', 'cpDemolConjuntoNumPavimento',
            'cpDemolConjuntoNumUnidade2', 'cpDemolConjuntoNumUnidade3', 'cpDemolConjuntoNumUnidade4',

            /////////////////////Informação sobre a área da obra
            'cpUniNova', 'cpUniPavimento', 'cpUniExistente', 'cpUniDemolicao', 'cpUniReforma', 'cpUniAcrescimo', 'cpUniParcial', 'cpUniInacabada',
            'cpMultiNova', 'cpMultiPavimento', 'cpMultiExistente', 'cpMultiDemolicao', 'cpMultiReforma', 'cpMultiAcrescimo', 'cpMultiParcial', 'cpMultiInacabada',
            'cpHotelNova', 'cpHotelPavimento', 'cpHotelExistente', 'cpHotelDemolicao', 'cpHotelReforma', 'cpHotelAcrescimo', 'cpHotelParcial', 'cpHotelInacabada',
            'cpAreaNova', 'cpAreaPavimento', 'cpAreaExistente', 'cpAreaDemolicao', 'cpAreaReforma', 'cpAreaAcrescimo', 'cpAreaParcial', 'cpAreaInacabada',
            'cpAndaresNova', 'cpAndaresPavimento', 'cpAndaresExistente', 'cpAndaresDemolicao', 'cpAndaresReforma', 'cpAndaresAcrescimo', 'cpAndaresParcial', 'cpAndaresInacabada',
            'cpSalasNova', 'cpSalasPavimento', 'cpSalasExistente', 'cpSalasDemolicao', 'cpSalasReforma', 'cpSalasAcrescimo', 'cpSalasParcial', 'cpSalasInacabada',
            'cpGalpaoNova', 'cpGalpaoPavimento', 'cpGalpaoExistente', 'cpGalpaoDemolicao', 'cpGalpaoReforma', 'cpGalpaoAcrescimo', 'cpGalpaoParcial', 'cpGalpaoInacabada',
            'cpCasaNova', 'cpCasaPavimento', 'cpCasaExistente', 'cpCasaDemolicao', 'cpCasaReforma', 'cpCasaAcrescimo', 'cpCasaParcial', 'cpCasaInacabada',
            'cpConjuntoNova', 'cpConjuntoPavimento', 'cpConjuntoExistente', 'cpConjuntoDemolicao', 'cpConjuntoReforma', 'cpConjuntoAcrescimo', 'cpConjuntoParcial', 'cpConjuntoInacabada',
            'cpReducao50Nova', 'cpReducao50Pavimento', 'cpReducao50Existente', 'cpReducao50Demolicao', 'cpReducao50Reforma', 'cpReducao50Acrescimo', 'cpReducao50Parcial', 'cpReducao50Inacabada',
            'cpReducao75Nova', 'cpReducao75Pavimento', 'cpReducao75Existente', 'cpReducao75Demolicao', 'cpReducao75Reforma', 'cpReducao75Acrescimo',
            'cpReducao75Parcial', 'cpReducao75Inacabada', 'cpArea', 'cpParecerInfo'], atv_inicio],

        //Reabertura de processo - Demanda de Incorporação
        [['cpReaberturaIncorporacao', 'cpParecerIncorporacao'], atv_reabertura_incorporacao],

        //Reabertura de processo - Demanda do Jurídico
        [['cpReaberturaJuridico', 'cpParecerReaberturaJuridico'], atv_reabertura_juridico],

        //Conferência da documentação- Jurídico
        [['cpAprovaConfJuridico', 'cpPareceConfJuridico'], atv_conferencia_juridico],

        //Conferência dos dados Técnicos da documentação
        [['cpAprovaConfDados', 'cpPareceConfDados'], atv_conferencia_dados],

        //Agendamento de senha na Receita Federal
        [['cpAgendamento', 'cpDataAgendamento', 'cpHoraAgendamento', 'cpPareceAgendamento'], atv_agendamento],

        //Emissão de CND
        [['cpAprovaCND', 'cpPareceCND'], atv_emissao_cnd],

        //Recebimento da averbação do habite-se
        [['cpProtocolado', 'cpPareceAverbacao'], atv_solicitacao_averbacao],

        //Solicitar averbação do habite-se
        [['cpProtocoladoRecebimento', 'cpDataRecebimento', 'cpMatriculaRecebimento', 'cpPareceRecebimento'], atv_recebimento_averbacao],

        //Conferência do processamento – Solicitante
        [['cpAprovaConfSolicitante', 'cpPareceConfSolicitante', 'cpSatisfacaoSolicitante', 'cpJustificativaSolicitante'], atv_conferencia_solicitante],

    ];

    listaCampos.forEach(function ([campos, atividades]) {
        if (!inArray(atvAtual, atividades)) {
            campos.forEach(function (campo) {
                form.setEnabled(campo, false);
            });
        }
    });
  
}