function validateForm(form)
{
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
    
	
    var regras_do_formulario = [ 
    
        { campo: 'cpCadTipoRecrutamento', label: 'Tipo de recrutamento', atividades: atv_recrutamento, regras: ['obrigatorio'] },
        { campo: 'cpCadExternoCandidato', label: 'Candidato aprovado', atividades: atv_recrutamento, regras: ['obrigatorio'], condicoes: [{ campo: 'cpCadTipoRecrutamento', valores: ['Recrutamento Externo'] }] },
        { campo: 'cpCadExternoCpf', label: 'CPF', atividades: atv_recrutamento, regras: ['obrigatorio','CPF'], condicoes: [{ campo: 'cpCadTipoRecrutamento', valores: ['Recrutamento Externo'] }] },
        { campo: 'cpCadExternoTelefone1', label: 'Telefone 1', atividades: atv_recrutamento, regras: ['obrigatorio'], condicoes: [{ campo: 'cpCadTipoRecrutamento', valores: ['Recrutamento Externo'] }] },
        { campo: 'cpCadExterno1Emprego', label: 'Primeiro emprego?', atividades: atv_recrutamento, regras: ['obrigatorio'], condicoes: [{ campo: 'cpCadTipoRecrutamento', valores: ['Recrutamento Externo'] }] },
        { campo: 'cpCadExternoPcd', label: 'PCD?', atividades: atv_recrutamento, regras: ['obrigatorio'], condicoes: [{ campo: 'cpCadTipoRecrutamento', valores: ['Recrutamento Externo'] }] },
        { campo: 'cpCadExternoAltSalario', label: 'Alteração de salário ou horário?', atividades: atv_recrutamento, regras: ['obrigatorio'], condicoes: [{ campo: 'cpCadTipoRecrutamento', valores: ['Recrutamento Externo'] }] },
        { campo: 'cpCadExternoAltSalarioFaixa', label: 'Salario fora da tabela salarial? ', atividades: atv_recrutamento, regras: ['obrigatorio'], condicoes: [{ campo: 'cpCadExternoAltSalario', valores: ['Sim'] }] },
        { campo: 'cpCadVagaFuncao', label: 'Função', atividades: atv_recrutamento, regras: ['obrigatorio'], condicoes: [{ campo: 'cpCadExternoAltSalario', valores: ['Sim'] }] },
        { campo: 'cpCadVagaSalario', label: 'Salario', atividades: atv_recrutamento, regras: ['obrigatorio'], condicoes: [{ campo: 'cpCadExternoAltSalario', valores: ['Sim'] }] },
        
        { campo: 'cpCadInternoObraDep', label: 'Obra/Departamento de origem', atividades: atv_recrutamento, regras: ['obrigatorio'], condicoes: [{ campo: 'cpCadTipoRecrutamento', valores: ['Recrutamento Interno'] }] },
        { campo: 'cpCadInternoColaborador', label: 'Colaborador selecionado', atividades: atv_recrutamento, regras: ['obrigatorio'], condicoes: [{ campo: 'cpCadTipoRecrutamento', valores: ['Recrutamento Interno'] }] },
        
        { campo: 'cpAprovacaoN1', label: 'Aprovado?', atividades: atv_aprovador_n1, regras: ['obrigatorio']},
        { campo: 'cpAprovacaoN1Experiencia', label: 'Candidato possui experiência na função?', atividades: atv_aprovador_n1, regras: ['obrigatorio']},
        { campo: 'cpParecerAprovacaoN1', label: 'Parecer', atividades: atv_aprovador_n1, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovacaoN1', valores: ['2'] }] },

        { campo: 'cpAprovacaoRecolhimentoSede', label: 'Aprovado?', atividades: atv_recolhimento_sede, regras: ['obrigatorio']},
        { campo: 'cpParecerRecolhimentoSede', label: 'Parecer', atividades: atv_recolhimento_sede, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovacaoRecolhimentoSede', valores: ['2'] }] },

        { campo: 'cpAprovacaoDataAdmissao', label: 'Aprovação', atividades: atv_data_admissao, regras: ['obrigatorio']},
        { campo: 'cpParecerDataAdmissao', label: 'Parecer', atividades: atv_data_admissao, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovacaoDataAdmissao', valores: ['2'] }] },
        
        { campo: 'cpRecolhimentoSedeDataAdmissao', label: 'Data de Admissão', atividades: atv_data_admissao, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovacaoDataAdmissao', valores: ['1'] }] },
        { campo: 'cpRecolhimentoSedeSituacao', label: 'Situação', atividades: atv_data_admissao, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovacaoDataAdmissao', valores: ['1'] }] },
        { campo: 'cpRecolhimentoSeguroDesemprego', label: 'O candidato está em vias de percepção de seguro desemprego?', atividades: atv_data_admissao, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovacaoDataAdmissao', valores: ['1'] }] },

        { campo: 'cpRecolhimentoObraDataAdmissao', label: 'Data de Admissão', atividades: atv_recolhimento_obra, regras: ['obrigatorio'], condicoes: [{ campo: 'cpCadTipoRecrutamento', valores: ['Recrutamento Externo'] }]},
        { campo: 'cpCadExternoSituacao', label: 'Situação', atividades: atv_recolhimento_obra, regras: ['obrigatorio'], condicoes: [{ campo: 'cpCadTipoRecrutamento', valores: ['Recrutamento Externo'] }] },
        { campo: 'cpCadExternoSeguroDesemprego', label: 'O candidato está em vias de percepção de seguro desemprego?', atividades: atv_recolhimento_obra, regras: ['obrigatorio'], condicoes: [{ campo: 'cpCadTipoRecrutamento', valores: ['Recrutamento Externo'] }]},
        { campo: 'cpCadTipoRecrutamentoParecer', label: 'Motivo / Justificativa', atividades: atv_recolhimento_obra, regras: ['obrigatorio'], condicoes: [{ campo: 'cpCadTipoRecrutamento', valores: ['Cancelar vaga'] }] },

        { campo: 'cpAprovacaoCadastroKit', label: 'Processamento do cadastro?', atividades: atv_cadastro_kit, regras: ['obrigatorio']},
        { campo: 'cpParecerCadastroKit', label: 'Parecer', atividades: atv_cadastro_kit, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovacaoCadastroKit', valores: ['6','7'] }] },
        { campo: 'cpCadastroKitMatricula', label: 'Matricula', atividades: atv_cadastro_kit, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovacaoCadastroKit', valores: ['5'] }] },
        { campo: 'cpCadastroKitManual', label: 'Digitar dados manualmente?', atividades: atv_cadastro_kit, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovacaoCadastroKit', valores: ['5'] }] },
        { campo: 'cpCadastroKitColaborador', label: 'Colaborador admitido', atividades: atv_cadastro_kit, regras: ['obrigatorio'], condicoes: [{ campo: 'cpCadastroKitManual', valores: ['Sim'] }] },
        { campo: 'cpCadastroKitCpf', label: 'CPF', atividades: atv_cadastro_kit, regras: ['obrigatorio','CPF'], condicoes: [{ campo: 'cpCadastroKitManual', valores: ['Sim'] }] },
        { campo: 'cpCadastroKitDataAdmissao', label: 'Data de admissão', atividades: atv_cadastro_kit, regras: ['obrigatorio'], condicoes: [{ campo: 'cpCadastroKitManual', valores: ['Sim'] }] },
        { campo: 'cpCadastroKitFuncao', label: 'Função', atividades: atv_cadastro_kit, regras: ['obrigatorio'], condicoes: [{ campo: 'cpCadastroKitManual', valores: ['Sim'] }] },
        { campo: 'cpCadastroKitSituacao', label: 'Situação', atividades: atv_cadastro_kit, regras: ['obrigatorio'], condicoes: [{ campo: 'cpCadastroKitManual', valores: ['Sim'] }] },
        { campo: 'cpCadastroKitSalario', label: 'Salário', atividades: atv_cadastro_kit, regras: ['obrigatorio'], condicoes: [{ campo: 'cpCadastroKitManual', valores: ['Sim'] }] },
        { campo: 'cpCadastroKitObraDepartamento', label: 'Obra/Departamento', atividades: atv_cadastro_kit, regras: ['obrigatorio'], condicoes: [{ campo: 'cpCadastroKitManual', valores: ['Sim'] }] },
        { campo: 'cpCadastroKitCodSecao', label: 'Código da seção', atividades: atv_cadastro_kit, regras: ['obrigatorio'], condicoes: [{ campo: 'cpCadastroKitManual', valores: ['Sim'] }] },
        { campo: 'cpCadastroKitCodColigada', label: 'Código da coligada', atividades: atv_cadastro_kit, regras: ['obrigatorio'], condicoes: [{ campo: 'cpCadastroKitManual', valores: ['Sim'] }] },

        { campo: 'cpAprovacaoAssinaturaKit', label: 'Aprovado?', atividades: atv_assinatura_kit, regras: ['obrigatorio']},
        { campo: 'cpParecerAssinaturaKit', label: 'Parecer', atividades: atv_assinatura_kit, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovacaoAssinaturaKit', valores: ['2'] }] },
        
        { campo: 'cpAprovacaoCadastroPonto', label: 'Aprovado?', atividades: atv_cadastro_ponto, regras: ['obrigatorio']},
        { campo: 'cpParecerCadastroPonto', label: 'Parecer', atividades: atv_cadastro_ponto, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovacaoCadastroPonto', valores: ['2'] }] },
        
        { campo: 'cpAprovacaoAjusteCadastro', label: 'Aprovado?', atividades: atv_cadastro_ajuste, regras: ['obrigatorio']},
        { campo: 'cpParecerAjusteCadastro', label: 'Parecer', atividades: atv_cadastro_ajuste, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovacaoAjusteCadastro', valores: ['2'] }] },
        
        { campo: 'cpAprovacaoCadastroCancelament', label: 'Aprovado?', atividades: atv_cadastro_cancelamento, regras: ['obrigatorio']},
        { campo: 'cpParecerCadastroCancelament', label: 'Parecer', atividades: atv_cadastro_cancelamento, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovacaoCadastroCancelament', valores: ['2'] }] },

        { campo: 'cpAprovacaoCadastroSSMTManual', label: 'Aprovado?', atividades: atv_cadastro_SSMT, regras: ['obrigatorio']},
        { campo: 'cpParecerCadastroSSMTManual', label: 'Parecer', atividades: atv_cadastro_SSMT, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovacaoCadastroSSMTManual', valores: ['2'] }] },
        
        { campo: 'cpAprovacaoMovimentacao', label: 'Realizar a abertura de chamado de movimentação de pessoal', atividades: atv_abertura_movimentacao, regras: ['obrigatorio']},
        { campo: 'cpParecerMovimentacao', label: 'Parecer', atividades: atv_abertura_movimentacao, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovacaoMovimentacao', valores: ['2'] }] },
        
        { campo: 'cpAprovacaoAberturaDesligament', label: 'Realizar abertura de chamado de Desligamento de colaboradores', atividades: atv_abertura_desligamento, regras: ['obrigatorio']},
        { campo: 'cpParecerAberturaDesligament', label: 'Parecer', atividades: atv_abertura_desligamento, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovacaoAberturaDesligament', valores: ['2'] }] },
        
        { campo: 'cpAprovacaoExcecaoConsultorRH', label: 'Aprovado?', atividades: atv_excecao_aprovacao_consultor, regras: ['obrigatorio']},
        { campo: 'cpParecerExcecaoConsultorRH', label: 'Parecer', atividades: atv_excecao_aprovacao_consultor, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovacaoExcecaoConsultorRH', valores: ['2'] }] },
        
        { campo: 'cpAprovacaoExcecaoGestorRH', label: 'Aprovado?', atividades: atv_excecao_aprovacao_gestor, regras: ['obrigatorio']},
        { campo: 'cpParecerExcecaoGestorRH', label: 'Parecer', atividades: atv_excecao_aprovacao_gestor, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovacaoExcecaoGestorRH', valores: ['2'] }] },

        { campo: 'cpAprovacaoExcecaoRemuneracao', label: 'Aprovado?', atividades: atv_excecao_aprovacao_remuneracao, regras: ['obrigatorio']},
        { campo: 'cpParecerExcecaoRemuneracao', label: 'Parecer', atividades: atv_excecao_aprovacao_remuneracao, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovacaoExcecaoRemuneracao', valores: ['2'] }] },
        
        { campo: 'cpAprovacaoExcecaoAprovadorN1', label: 'Aprovado?', atividades: atv_excecao_aprovacao_n1, regras: ['obrigatorio']},
        { campo: 'cpParecerExcecaoAprovadorN1', label: 'Parecer', atividades: atv_excecao_aprovacao_n1, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovacaoExcecaoAprovadorN1', valores: ['2'] }] },

        { campo: 'cpAprovacaoExcecaoAprovadorN2', label: 'Aprovado?', atividades: atv_excecao_aprovacao_n2, regras: ['obrigatorio']},
        { campo: 'cpParecerExcecaoAprovadorN2', label: 'Parecer', atividades: atv_excecao_aprovacao_n2, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovacaoExcecaoAprovadorN2', valores: ['2'] }] },

        { campo: 'cpAprovacaoExcecaoAprovadorN3', label: 'Aprovado?', atividades: atv_excecao_aprovacao_n3, regras: ['obrigatorio']},
        { campo: 'cpParecerExcecaoAprovadorN3', label: 'Parecer', atividades: atv_excecao_aprovacao_n3, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovacaoExcecaoAprovadorN3', valores: ['2'] }] },

        { campo: 'cpAprovacaoExcecaoAprovadorN4', label: 'Aprovado?', atividades: atv_excecao_aprovacao_n4, regras: ['obrigatorio']},
        { campo: 'cpParecerExcecaoAprovadorN4', label: 'Parecer', atividades: atv_excecao_aprovacao_n4, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovacaoExcecaoAprovadorN4', valores: ['2'] }] },

        { campo: 'cpAprovacaoErroTI146', label: 'Aprovado?', atividades: atv_ti_erro_servico_146, regras: ['obrigatorio']},
        { campo: 'cpParecerErroTI146', label: 'Parecer', atividades: atv_ti_erro_servico_146, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovacaoErroTI146', valores: ['2'] }] },
        
        { campo: 'cpAprovacaoErroTI170', label: 'Aprovado?', atividades: atv_ti_erro_servico_170, regras: ['obrigatorio']},
        { campo: 'cpParecerErroTI170', label: 'Parecer', atividades: atv_ti_erro_servico_170, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovacaoErroTI170', valores: ['2'] }] },

        { campo: 'cpAprovacaoErroTI77', label: 'Aprovado?', atividades: atv_ti_erro_servico_77, regras: ['obrigatorio']},
        { campo: 'cpParecerErroTI77', label: 'Parecer', atividades: atv_ti_erro_servico_77, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovacaoErroTI77', valores: ['2'] }] },
        
    ];
  
    var Validador = new ValidaFormulario(form, getValue("WKNumState"));
    
    if (!Validador.validar(regras_do_formulario)) 
    {
        throw Validador.mensagem_de_erro();
    }
}