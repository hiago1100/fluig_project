function enableFields(form) {
  /*  
      0,1 - Inicio
      2 - Reabertura de processo
      14 - Aprovação - Gestor
      19 - Conferência da solicitação - Suprimentos
      199 - Executar API de retorno do fornecedor vencedor
      206 - Erro na integração 1
      20 - Realizar mapa de cotação no UAU
      200 - Executar API de retorno do fornecedor vencedor
      227 - Erro na integração 2
      201 - Executar webservice de consulta de verba
      240 - Erro na integração 3       
      21 - Aprovação do fornecedor e Análise da verba - Gestor
      15 - Aprovação da compra / contratação - Gerente Geral
      16 - Aprovação da compra / contratação - Superintendente
      17 - Aprovação da compra / contratação - Diretor
      18 - Abertura do subprocesso de Liberação de Verba 
      150 - Executar API de validação da aprovação do fornecedor
      282 - Erro na integração 4           
      22 - Lançamento da ordem de compra no UAU / Requisição de produto em estoque        
      23 - Conferência do atendimento - Solicitante        
      32 - Confirmar previsão do fornecedor
      313 - Lançamento da NF no UAU       
  */

  form.setEnhancedSecurityHiddenInputs(true);

  var atv_inicio = [0, 1, 2];
  var atv_reabertura = [2];
  var atv_aprovaN1 = [14];
  var atv_conferencia_solicitacao = [19];
  var atv_erro_integracao1 = [206];
  var atv_cotacao_uau = [20];
  var atv_erro_integracao2 = [227];
  var atv_erro_integracao3 = [240];
  var atv_analise_verba = [21];
  var atv_aprovacao_compra_N2 = [15];
  var atv_aprovacao_compra_N3 = [16];
  var atv_aprovacao_compra_N4 = [17];
  var atv_erro_integracao4 = [282];
  var atv_lancamento_ordem_compra = [22];
  var atv_conferencia_solicitante = [23];
  var atv_confirmar_previsao = [32];
  var atv_lancamento_nf = [313];

  var atvAtual = parseInt(getValue("WKNumState"));

  var listaCampos = [
    //Atividade Inicio
    [['cpTipoSolicitacao', 'tpCompra', 'cpDataEntregaContratacao', 'cpEmpresa',
      'cpCentroCustoUau', 'cpEndereco', 'cpBairro', 'cpCidade', 'cbEstado', 'cpCEP',
      'cpEspecificacaoServicos', 'cpCronogramaExecucao', 'cpRelacaoProjetos',
      'cpEspecificacaoMateriais', 'cpNBR', 'cpObrigacaoFornecedores', 'cpFornecedoresIndicados',
      'cpCriterioMedicao', 'cpObservacao'], atv_inicio],

    //Atividade Reabertura 
    [['cpReaberturaChamado', 'cpParecerReabertura'], atv_reabertura],

    //Atividade Aprovação N1
    [['cpAprovaN1', 'cpPareceN1'], atv_aprovaN1],

    //Atividade Conferência da Solicitação
    [['cpAprovaConfSuprimentos', 'cpPossuiEstoque', 'cpPareceConfSuprimentos'], atv_conferencia_solicitacao],

    // Erro na integração 1
    [['cpAprovaIntegracao1', 'cpPareceIntegracao1'], atv_erro_integracao1],

    // Realizar mapa de cotação no UAU
    [['cpAprovaCotacao', 'cpNumeroCotacao', 'cpPareceCotacao'], atv_cotacao_uau],

    // Erro na integração 2
    [['cpAprovaIntegracao2', 'cpPareceIntegracao2'], atv_erro_integracao2],

    // Erro na integração 3
    [['cpAprovaIntegracao3', 'cpPareceIntegracao3'], atv_erro_integracao3],

    // Aprovação do fornecedor e Análise da verba - N1
    [['cpAprovaFornecedoreVerba', 'cpDataCotacao', 'cpTotalPedido', 'cpPareceFornecedoreVerba',
      'cpReprovaFornecedoreVerba'], atv_analise_verba],

    //Aprovação da compra / contratação - N2
    [['cpAprovaAprovaCompraN2', 'cpPareceAprovaCompraN2', 'cpReprovaCompraN2'], atv_aprovacao_compra_N2],

    //Aprovação da compra / contratação - N3
    [['cpAprovaCompraN3', 'cpPareceCompraN3', 'cpReprovaCompraN3'], atv_aprovacao_compra_N3],

    //Aprovação da compra / contratação - N4
    [['cpAprovaCompraN4', 'cpPareceCompraN4', 'cpReprovaCompraN4'], atv_aprovacao_compra_N4],

    // Erro na integração 4
    [['cpAprovaIntegracao4', 'cpPareceIntegracao4'], atv_erro_integracao4],

    // Lançamento da ordem de compra no UAU / Requisição de produto em estoque
    [['cpAprovaOrdemCompra', 'cpPrevisaoEntrega', 'cpPareceOrdemCompra'], atv_lancamento_ordem_compra],

    //Conferência do atendimento - Solicitante
    [['cpAprovaConfSolicitante', 'cpPareceConfSolicitante', 'cpReprovadoConfSolicitante'], atv_conferencia_solicitante],

    //Confirmar previsão do fornecedor
    [['cpAprovaPrevisaoFornecedor', 'cpParecePrevisaoFornecedor'], atv_confirmar_previsao],

    //Lançamento da NF no UAU
    [['cpAprovaLancamentoNF', 'cpPareceLancamentoNF'], atv_lancamento_nf],

  ];

  var listaPaiFilho = [
    ['tbItensTi', ['cpInsumoItensTi', 'cpUnidadeItensTi', 'cpQuantidadeItensTi', 'cpProdutoUAUItensTi',
      'cpServicoItensTi', 'cpInsumoPlanejItensTi', 'cpObservacoesItensTi'], [atv_inicio]],

    ['tbDemaisCompras', ['cpInsumoDemaisCompras', 'cpUnidadeDemaisCompras', 'cpQuantidadeDemaisCompras',
      'cpProdutoUAUDemaisCompras', 'cpServicoDemaisCompras', 'cpInsumoPlanejDemaisCompras', 'cpObservacoesDemaisCompras'], [atv_inicio]],

    ['tbContratacaoServicos', ['cpComposicaoServicos', 'cpUnidadeServicos', 'cpQuantidadeServicos',
      'cpProdutoUAU', 'cpServico', 'cpInsumoPlanejServicos', 'cpObservacoesServicos'], [atv_inicio]],

    ['tbSolicitacaoVerba', ['cpTipoSolicitacaoVerba', 'cpEmpresaUAU', 'cpObraUAU', 'cpValorLiberar',
      'cpNumPedidoCompras', 'cpNumChamadoCompras', 'cpProdutoLiberacao', 'cpPeriodoLiberacao', 'cpInsumoPlanej',
      'cpProdutoOrigem', 'cpProdutoDestino', 'cpInsumoOrigem', 'cpInsumoDestino',
      'cpPeriodoOrigemVerba', 'cpPeriodoDestinoVerba'], [atv_analise_verba]],
  ];

  listaCampos.forEach(function ([campos, atividades]) {
    if (!inArray(atvAtual, atividades)) {
      campos.forEach(function (campo) {
        form.setEnabled(campo, false);
      });
    }
  });

  listaPaiFilho.forEach(function ([tablename, campos, atividades]) {
    if (!inArray(atvAtual, atividades)) {
      var indexes = form.getChildrenIndexes(tablename);
      indexes.forEach(function (index) {
        campos.forEach(function (campo) {
          form.setEnabled(campo + '___' + index, false);
        });
      });
    }
  });
}
