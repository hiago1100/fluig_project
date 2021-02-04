function enableFields(form) {

    /**
     *  1 - Inicio
     *  59 - Abertura do chamado
     * 143 - Liberação de acessos iniciais
     * 13 - Criação de acessos específicos solicitados
     * 3 - Solicitação de Acessos  específicos gestor
     * 21 - Confirmação de atendimento - Gestor 
     * 97 - Solicitação de Acessos específicos Parceiro 
     * 8 - Aprovação gestor DP    
     * 19 - Aprovação especifica - responsavel area tecnica
     */


    form.setEnhancedSecurityHiddenInputs(true);

    var atv_inicio = [0, 1];
    var atv_solic_acessos = [3];
    var atv_aprov_gestor = [8];
    var atv_criacao_acess_solic = [13];
    var atv_aprov_responsavel = [19];
    var atv_confirm_atend = [21];
    var atv_solic_acess_parceiro = [97];
    var atv_lib_aces_iniciais = [143];
    var atv_aprov_gerente_geral = [211];
    var atv_aprov_superintendente = [212];

    var atvAtual = parseInt(getValue("WKNumState"));

    var listaCampos = [

        [['cpNaSede', 'cpNecessarioInternet', 'cpNecessarioEmail', 
        'cpNotebook', 'cpNecessidadeUAU', 'cpGrupoUAU', 
        'cpObrasUAU', 'cpObsUAU', 'cpNecessidadeRM', 
        'cpColigadaRM', 'cpObsRM', 'cpPerfilLabore', 
        'cpPerfilChronus', 'cpPerfilVitae', 'cpNecessidadePastas', 
        'cpTipoPermissaoPastas', 'ObsPastas', 'cpUsuarioEspelho', 
        'cpUsuarioRedeEspelho', 'cpObsUsuario'], atv_solic_acessos],

        [['cpAprovacaoGestorDP', 'cpParecerAprGestorDP'], atv_aprov_gestor],


        [['cpLoginNovoUsuario', 'cpSenhaNovoUsuario', 'cpEmailNovoUsuario', 
        'cpUsuarioCriadoCSC', 'cpUsuarioPortalRH', 'cpObsAcessosIniciais'], atv_lib_aces_iniciais],

        [['cpAprovacaoCriacao', 'cpSecaoResponsavel', 'cpResponsavel',
         'cpObsCriacao', 'historicoCriacao', 'cpHistData',
          'cpHistAprovacao', 'cpHistAtendente', 'cpHistParecer'], atv_criacao_acess_solic],

        [['cpAprovacaoResponsavel', 'cpParecerResponsavel', 'historicoCriacao2',
         'cpHistData2', 'cpHistAprovacao2', 'cpHistAtendente2', 'cpHistParecer2'], atv_aprov_responsavel],

        [['cpConfirmacao', 'cpParecerConfirmacao', 'cpGrauSatisfacao', 'cpJustifObs'], atv_confirm_atend],

        [['cpSecaoNovoColaborador', 'cpInfCodSecao', 'cpNomeNovoColaborador', 
        'cpChapaNovoColaborador', 'cpInfFuncao', 'cpDtAdmissaoNovoColaborador',
        'cpInfCodColigada','cpReqCadastro', 'cpObsInfColab'], atv_inicio],

        [['cpNaSede2', 'cpNotebook2', 'cpNecessidadeUAU2', 
        'cpGrupoUAU2', 'cpObrasUAU2', 'cpObsUAU2', 
        'cpNecessidadeRM2', 'cpColigadaRM2', 'cpPerfilLabore2', 
        'cpPerfilChronus2', 'cpPerfilVitae2', 'cpNecessidadePastas2', 
        'cpTipoPermissaoPastas2', 'cpObsRM2', 'ObsPastas2', 
        'cpUsuarioEspelho2', 'cpUsuarioRedeEspelho2', 'cpObsUsuario2',
        'cpNecessarioInternetParceiro','cpNecessarioEmailParceiro'], atv_solic_acess_parceiro],

        [['cpAprovacaoGerenteGeral','cpParecerGerenteGeral'], atv_aprov_gerente_geral],

        [['cpAprovacaoSuperintendente','cpParecerSuperintendente'], atv_aprov_superintendente],
    ];

    listaCampos.forEach(function ([campos, atividades]) {
        if (!inArray(atvAtual, atividades)) {
            campos.forEach(function (campo) {
                form.setEnabled(campo, false);
            });
        }
    });

}