function enableFields(form)
{
	form.setEnhancedSecurityHiddenInputs(true);
	
    var atv_recrutamento = [5,10];
    var atv_aprovador_n1 = [8];
    var atv_data_admissao = [313];
    var atv_recolhimento_sede = [9];
    var atv_recolhimento_obra = [10];
    var atv_cadastro_kit = [11];
    var atv_assinatura_kit = [12];
    var atv_cadastro_ponto = [14];
    var atv_cadastro_ajuste = [13];
    var atv_cadastro_cancelamento = [15];
    var atv_cadastro_SSMT = [143];
    var atv_abertura_movimentacao = [37];
    var atv_abertura_desligamento = [181];
    var atv_excecao_aprovacao_consultor = [239];
    var atv_excecao_aprovacao_gestor = [240];
    var atv_excecao_aprovacao_remuneracao = [241];
    var atv_excecao_aprovacao_n1 = [43];
    var atv_excecao_aprovacao_n2 = [222];
    var atv_excecao_aprovacao_n3 = [228];
    var atv_excecao_aprovacao_n4 = [232];
    var atv_ti_erro_servico_146 = [146];
    var atv_ti_erro_servico_170 = [170];
    var atv_ti_erro_servico_77 = [77];
    
	
    var atvAtual = parseInt(getValue("WKNumState"));
    
    var listaCampos = [

    [['cpCadExternoCandidato',
    'cpCadExternoCpf','cpCadExternoTelefone1','cpCadExternoTelefone2',
    'cpCadExterno1Emprego','cpCadExternoPcd','cpCadExternoAltSalario',
    'cpCadVagaFuncao','cpCadVagaSalario','cpCadVagaHorario',
    ,'cpCadInternoObraDep','cpCadInternoColaborador',
    'cpCadInternoCodSecao','cpCadInternoCodEmpresa','cpCadInternoFuncao',
    'cpCadInternoAprovadorN1','cpCadInternoAprovadorN2','cpCadTipoRecrutamento',
    'cpCadTipoRecrutamentoParecer','cpCadObservacoes',
     'cpCadExternoEmailPessoal','cpCadExternoAltSalarioFaixa'], atv_recrutamento],

    [['cpAprovacaoN1',
    'cpAprovacaoN1Experiencia','cpParecerAprovacaoN1'], atv_aprovador_n1],

    
    [['cpAprovacaoDataAdmissao','cpParecerDataAdmissao','cpRecolhimentoDataAdmissao',
    'cpRecolhimentoSeguroDesemprego','cpRecolhimentoSedeSituacao'], atv_data_admissao],

    
    [['cpAprovacaoExcecaoConsultorRH',
    'cpParecerExcecaoConsultorRH'], atv_excecao_aprovacao_consultor],

    [['cpParecerExcecaoGestorRH',
    'cpAprovacaoExcecaoGestorRH'], atv_excecao_aprovacao_gestor],

    [['cpRecolhimentoObraSegurDesempr','cpRecolhimentoObraBanco','cpRecolhimentoObraDataAdmissao',
    'cpRecolhimentoObraAgencia','cpRecolhimentoObraConta','cpRecolhimentoObraTipoConta','cpRecolhimentoObraCartaoAtivo',
    'cpRecolhimentoObraOperacao','cpRecolhimentoObraVR','cpRecolhimentoObraVA',
    'cpRecolhimentoObraPlanoSaude','cpRecolhimentoObraConvenOdonto',
    'cpRecolhimentoObraConvFarmacia','cpRecolhimentoObraCestaBasica','cpRecolhimentoObraCombustivel','cpRecolhimentoObraObs',
    'cpRecolhimentoObraSituacao','cpRecolhimentoObraSegurDesempr'], atv_recolhimento_obra],

    [['cpRecolhimentoBanco',
    'cpRecolhimentoAgencia','cpRecolhimentoConta','cpRecolhimentoTipoConta','cpRecolhimentoCartaoAtivo',
    'cpRecolhimentoOperacao','cpRecolhimentoVR','cpRecolhimentoVA','cpRecolhimentoPlanoSaude','cpRecolhimentoConvenioOdonto',
    'cpRecolhimentoConvenioFarmacia','cpRecolhimentoCestaBasica','cpRecolhimentoValeCombustivel','cpRecolhimentoObs',
    ,'cpAprovacaoRecolhimentoSede','cpParecerRecolhimentoSede'], atv_recolhimento_sede],
 
    [['cpAprovacaoCadastroKit','cpParecerCadastroKit',
    'cpCadastroKitMatricula','cpCadastroKitManual','cpCadastroKitColaborador',
    'cpCadastroKitCpf','cpCadastroKitDataAdmissao','cpCadastroKitFuncao',
    'cpCadastroKitSituacao','cpCadastroKitSalario','cpCadastroKitObraDepartamento',
    'cpCadastroKitCodSecao','cpCadastroKitCodColigada'], atv_cadastro_kit],

    [['cpAprovacaoAssinaturaKit',
    'cpParecerAssinaturaKit'], atv_assinatura_kit],

    [['cpAprovacaoCadastroPonto',
    'cpParecerCadastroPonto'], atv_cadastro_ponto],

    [['cpAprovacaoAjusteCadastro',
    'cpParecerAjusteCadastro'], atv_cadastro_ajuste],

    [['cpAprovacaoCadastroCancelament',
    'cpParecerCadastroCancelament'], atv_cadastro_cancelamento],
         
    [['cpAprovacaoCadastroSSMTManual',
    'cpParecerCadastroSSMTManual'], atv_cadastro_SSMT],

    [['cpAprovacaoMovimentacao',
    'cpParecerMovimentacao'], atv_abertura_movimentacao],

    [['cpAprovacaoAberturaDesligament',
    'cpParecerAberturaDesligament'], atv_abertura_desligamento],

    [['cpAprovacaoExcecaoRemuneracao',
    'cpParecerExcecaoRemuneracao'], atv_excecao_aprovacao_remuneracao],

    [['cpAprovacaoExcecaoAprovadorN1',
    'cpParecerExcecaoAprovadorN1'], atv_excecao_aprovacao_n1],

    [['cpAprovacaoExcecaoAprovadorN2',
    'cpParecerExcecaoAprovadorN2'], atv_excecao_aprovacao_n2],
    
    [['cpAprovacaoExcecaoAprovadorN3',
    'cpParecerExcecaoAprovadorN3'], atv_excecao_aprovacao_n3],
    
    [['cpAprovacaoExcecaoAprovadorN4',
    'cpParecerExcecaoAprovadorN4'], atv_excecao_aprovacao_n4],

    [['cpAprovacaoErroTI146',
    'cpAprovacaoErroTI146'], atv_ti_erro_servico_146],
    
    [['cpAprovacaoErroTI170',
    'cpAprovacaoErroTI170'], atv_ti_erro_servico_170],

    [['cpAprovacaoErroTI77',
    'cpAprovacaoErroTI77'], atv_ti_erro_servico_77],
    
    ];

    listaCampos.forEach(function([campos, atividades]){
        if (!inArray(atvAtual, atividades)) {
            campos.forEach(function(campo){
                form.setEnabled(campo, false);
            });
        }
    });

}