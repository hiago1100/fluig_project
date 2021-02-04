function validateForm(form) {

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


    var regras_do_formulario = [

        { campo: 'cpNecessarioInternet', label: 'Perfil de acesso a internet?', atividades: atv_solic_acessos, regras: ['obrigatorio'] },
        { campo: 'cpNecessarioEmail', label: 'Necessário E-mail?', atividades: atv_solic_acessos, regras: ['obrigatorio'] },
        { campo: 'cpSecaoNovoColaborador', label: 'Obra/Departamento não informada.', atividades: atv_inicio, regras: ['obrigatorio'] },
        { campo: 'cpInfCodSecao', label: 'Cód. Secão não informada.', atividades: atv_inicio, regras: ['obrigatorio'] },
        { campo: 'cpNomeNovoColaborador', label: 'Colaborador não informado.', atividades: atv_inicio, regras: ['obrigatorio'] },
        { campo: 'cpDtAdmissaoNovoColaborador', label: 'Data de admissão não carregada.', atividades: atv_inicio, regras: ['obrigatorio'] },
        { campo: 'cpChapaNovoColaborador', label: 'Matrícula não carregada.', atividades: atv_inicio, regras: ['obrigatorio'] },
        { campo: 'cpInfFuncao', label: 'Função não carregada.', atividades: atv_inicio, regras: ['obrigatorio'] },
        { campo: 'cpInfColigada', label: 'Coligada não carregada.', atividades: atv_inicio, regras: ['obrigatorio'] },
        { campo: 'cpInfCodColigada', label: 'Cód. coligada não carregada.', atividades: atv_inicio, regras: ['obrigatorio'] },
        { campo: 'cpInfGestor', label: 'Gestor não carregado.', atividades: atv_inicio, regras: ['obrigatorio'] },
        

        { campo: 'cpLoginNovoUsuario', label: 'Login de rede não informado.', atividades: atv_lib_aces_iniciais, regras: ['obrigatorio'] },
        { campo: 'cpEmailNovoUsuario', label: 'Email não informado.', atividades: atv_lib_aces_iniciais, regras: ['obrigatorio'] },
        { campo: 'cpUsuarioCriadoCSC', label: 'Criação de usuário CSC não informada.', atividades: atv_lib_aces_iniciais, regras: ['obrigatorio'] },
        { campo: 'cpUsuarioPortalRH', label: 'Criação de usuário RH não informada.', atividades: atv_lib_aces_iniciais, regras: ['obrigatorio'] },

        { campo: 'cpNaSede', label: 'Colaborador ficará lotado na sede não preenchido.', atividades: atv_solic_acessos, regras: ['obrigatorio'] },
        { campo: 'cpNotebook', label: 'Colaborador utilizará notebook não preenchido.', atividades: atv_solic_acessos, regras: ['obrigatorio'], condicoes: [{ campo: 'cpNaSede', valores: ['1'] }] },
        { campo: 'cpNecessidadeUAU', label: 'Necessidade de acesso UAU não informada.', atividades: atv_solic_acessos, regras: ['obrigatorio'] },
        { campo: 'cpGrupoUAU', label: 'Grupo UAU não informado.', atividades: atv_solic_acessos, regras: ['obrigatorio'], condicoes: [{ campo: 'cpNecessidadeUAU', valores: ['1'] }] },
        { campo: 'cpObrasUAU', label: 'Obra UAU não informado.', atividades: atv_solic_acessos, regras: ['obrigatorio'], condicoes: [{ campo: 'cpNecessidadeUAU', valores: ['1'] }] },
        { campo: 'cpNecessidadeRM', label: 'Necessidade de acesso RM não informada.', atividades: atv_solic_acessos, regras: ['obrigatorio'] },
        { campo: 'cpColigadaRM', label: 'Coligada RM não informada.', atividades: atv_solic_acessos, regras: ['obrigatorio'], condicoes: [{ campo: 'cpNecessidadeRM', valores: ['1'] }] },
        { campo: 'cpPerfilLabore', label: 'Perfil Labore não informado.', atividades: atv_solic_acessos, regras: ['obrigatorio'], condicoes: [{ campo: 'cpNecessidadeRM', valores: ['1'] }] },
        { campo: 'cpPerfilChronus', label: 'Perfil Chronus não informado.', atividades: atv_solic_acessos, regras: ['obrigatorio'], condicoes: [{ campo: 'cpNecessidadeRM', valores: ['1'] }] },
        { campo: 'cpPerfilVitae', label: 'Perfil Vitae não informado.', atividades: atv_solic_acessos, regras: ['obrigatorio'], condicoes: [{ campo: 'cpNecessidadeRM', valores: ['1'] }] },
        { campo: 'cpNecessidadePastas', label: 'Necessidade de acesso a pastas não informada', atividades: atv_solic_acessos, regras: ['obrigatorio'] },
        { campo: 'cpTipoPermissaoPastas', label: 'Tipo de permissão não informada', atividades: atv_solic_acessos, regras: ['obrigatorio'], condicoes: [{ campo: 'cpNecessidadePastas', valores: ['1'] }] },

        { campo: 'cpNaSede2', label: 'Colaborador ficará lotado na sede não preenchido.', atividades: atv_solic_acess_parceiro, regras: ['obrigatorio'] },
        { campo: 'cpNotebook2', label: 'Colaborador utilizará notebook não preenchido.', atividades: atv_solic_acess_parceiro, regras: ['obrigatorio'], condicoes: [{ campo: 'cpNaSede2', valores: ['1'] }] },
        { campo: 'cpNecessidadeUAU2', label: 'Necessidade de acesso UAU não informada.', atividades: atv_solic_acess_parceiro, regras: ['obrigatorio'] },
        { campo: 'cpGrupoUAU2', label: 'Grupo UAU não informado.', atividades: atv_solic_acess_parceiro, regras: ['obrigatorio'], condicoes: [{ campo: 'cpNecessidadeUAU2', valores: ['1'] }] },
        { campo: 'cpObrasUAU2', label: 'Obra UAU não informado.', atividades: atv_solic_acess_parceiro, regras: ['obrigatorio'], condicoes: [{ campo: 'cpNecessidadeUAU2', valores: ['1'] }] },
        { campo: 'cpNecessidadeRM2', label: 'Necessidade de acesso RM não informada.', atividades: atv_solic_acess_parceiro, regras: ['obrigatorio'] },
        { campo: 'cpColigadaRM2', label: 'Coligada RM não informada.', atividades: atv_solic_acess_parceiro, regras: ['obrigatorio'], condicoes: [{ campo: 'cpNecessidadeRM2', valores: ['1'] }] },
        { campo: 'cpPerfilLabore2', label: 'Perfil Labore não informado.', atividades: atv_solic_acess_parceiro, regras: ['obrigatorio'], condicoes: [{ campo: 'cpNecessidadeRM2', valores: ['1'] }] },
        { campo: 'cpPerfilChronus2', label: 'Perfil Chronus não informado.', atividades: atv_solic_acess_parceiro, regras: ['obrigatorio'], condicoes: [{ campo: 'cpNecessidadeRM2', valores: ['1'] }] },
        { campo: 'cpPerfilVitae2', label: 'Perfil Vitae não informado.', atividades: atv_solic_acess_parceiro, regras: ['obrigatorio'], condicoes: [{ campo: 'cpNecessidadeRM2', valores: ['1'] }] },
        { campo: 'cpNecessidadePastas2', label: 'Necessidade de acesso a pastas não informada', atividades: atv_solic_acess_parceiro, regras: ['obrigatorio'] },
        { campo: 'cpNecessarioEmailParceiro', label: 'Campo Necessário E-mail não foi informado', atividades: atv_solic_acess_parceiro, regras: ['obrigatorio'] },
        { campo: '_cpNecessarioInternetParceiro', label: 'Campo Perfil de acesso à Internet não foi informado', atividades: atv_solic_acess_parceiro, regras: ['obrigatorio'] },
        { campo: 'cpTipoPermissaoPastas2', label: 'Tipo de permissão não informada', atividades: atv_solic_acess_parceiro, regras: ['obrigatorio'], condicoes: [{ campo: 'cpNecessidadePastas2', valores: ['1'] }] },

        { campo: 'cpAprovacaoGestorDP', label: 'Aprovação não informada', atividades: atv_aprov_gestor, regras: ['obrigatorio'] },
        { campo: 'cpParecerAprGestorDP', label: 'Parecer não informado.', atividades: atv_aprov_gestor, regras: ['obrigatorio'] },

        { campo: 'cpAprovacaoCriacao', label: 'Aprovação não informada.', atividades: atv_criacao_acess_solic, regras: ['obrigatorio'] },
        { campo: 'cpSecaoResponsavel', label: 'Seção do responsável não informada.', atividades: atv_criacao_acess_solic, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovacaoCriacao', valores: ['3'] }] },
        { campo: 'cpResponsavel', label: 'Responsável não informado ou não existe no fluig.', atividades: atv_criacao_acess_solic, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovacaoCriacao', valores: ['3'] }] },

        { campo: 'cpAprovacaoResponsavel', label: 'Aprovação não informada.', atividades: atv_aprov_responsavel, regras: ['obrigatorio'] },

        { campo: 'cpConfirmacao', label: 'Confirmação de atendimento Gestor não informada.', atividades: atv_confirm_atend, regras: ['obrigatorio'] },
        { campo: 'cpGrauSatisfacao', label: 'Avaliação do atendimento', atividades: atv_confirm_atend, regras: ['obrigatorio'], condicoes: [{ campo: 'cpConfirmacao', valores: ['1'] }] },
        { campo: 'cpJustifObs', label: 'Observações/Justificativas', atividades: atv_confirm_atend, regras: ['obrigatorio'], condicoes: [{ campo: 'cpGrauSatisfacao', valores: ['3', '4'] }] },
        
        { campo: 'cpParecerGerenteGeral', label: 'Parecer', atividades: atv_aprov_gerente_geral, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovacaoGerenteGeral', valores: ['2'] }] },
        { campo: 'cpParecerSuperintendente', label: 'Parecer', atividades: atv_aprov_superintendente, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovacaoSuperintendente', valores: ['2'] }] },
    ];

    var Validador = new ValidaFormulario(form, getValue("WKNumState"));

    if (!Validador.validar(regras_do_formulario)) {
        throw Validador.mensagem_de_erro();
    }

}