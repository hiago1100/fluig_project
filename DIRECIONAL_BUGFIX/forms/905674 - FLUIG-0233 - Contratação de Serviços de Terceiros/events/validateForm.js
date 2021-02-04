function validateForm(form) {
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
   
    var atv_inicio = [0, 1, 2];
    var atv_reabertura = [2];
    var atv_aprovaN1 = [14];
    var atv_conferencia_solicitacao = [19];
    var atv_erro_integracao1 = [206];
    var atv_cotacao_uau = [20];
    var atv_erro_integracao2 = [227];
    var atv_erro_integracao3 = [240];
    var atv_analise_verba = [21];
    var atv_aprovacao_compra_gg = [15];
    var atv_aprovacao_compra_super = [16];
    var atv_aprovacao_compra_diretor = [17];
    var atv_erro_integracao4 = [282];
    var atv_lancamento_ordem_compra = [22];
    var atv_conferencia_solicitante = [23];
    var atv_confirmar_previsao = [32];
    var atv_lancamento_nf = [313];


    var regras_do_formulario = [

        { campo: 'cpTipoSolicitacao', label: 'Tipo de solicitação', atividades: atv_inicio, regras: ['obrigatorio'] },
        { campo: 'tpCompra', label: 'Tipo de compra', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpTipoSolicitacao', valores: ['1'] }] },
        { campo: 'cpDataEntregaContratacao', label: 'Data para entrega', atividades: atv_inicio, regras: ['obrigatorio'] },
        { campo: 'cpEmpresa', label: 'Empresa', atividades: atv_inicio, regras: ['obrigatorio'] },
        { campo: 'cpCentroCustoUau', label: 'Centro de custo UAU', atividades: atv_inicio, regras: ['obrigatorio'] },
        { campo: 'cpEndereco', label: 'Endereço', atividades: atv_inicio, regras: ['obrigatorio'] },
        { campo: 'cpBairro', label: 'Bairro', atividades: atv_inicio, regras: ['obrigatorio'] },
        { campo: 'cpCidade', label: 'Cidade', atividades: atv_inicio, regras: ['obrigatorio'] },
        { campo: 'cbEstado', label: 'Estado', atividades: atv_inicio, regras: ['obrigatorio'] },
        { campo: 'cpCEP', label: 'CEP', atividades: atv_inicio, regras: ['obrigatorio'] },

        { campo: 'cpEspecificacaoServicos', label: 'Especificação dos Serviços', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpTipoSolicitacao', valores: ['2'] }] },
        { campo: 'cpCronogramaExecucao', label: 'Cronograma de Execução', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpTipoSolicitacao', valores: ['2'] }] },
        { campo: 'cpEspecificacaoMateriais', label: 'Especificação dos materiais a serem aplicados nos serviços', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpTipoSolicitacao', valores: ['2'] }] },
        { campo: 'cpObrigacaoFornecedores', label: 'Obrigações do fornecedor', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpTipoSolicitacao', valores: ['2'] }] },
        { campo: 'cpCriterioMedicao', label: 'Critério de medição', atividades: atv_inicio, regras: ['obrigatorio'], condicoes: [{ campo: 'cpTipoSolicitacao', valores: ['2'] }] },
      
        //Pai e FIlho Itens de Ti
        { tablename: 'tbItensTi', label: 'Adicionar Itens Ti', atividades: atv_inicio, regras: ['minimo_de_filhos_condicional'], minimoFilhos: 1, condicoes: [{ campo: 'tpCompra', valores: ['1'] }], },
        {
            tablename: 'tbItensTi', label: 'Adicionar Itens Ti', atividades: atv_inicio, regras: ['pai_e_filho'],
            regras_filhos: [
                { campo: 'cpInsumoItensTi', label: 'Insumo', atividades: atv_inicio, regras: ['filho_obrigatorio'] },
                { campo: 'cpUnidadeItensTi', label: 'Unidade', atividades: atv_inicio, regras: ['filho_obrigatorio'] },
                { campo: 'cpQuantidadeItensTi', label: 'Quantidade', atividades: atv_inicio, regras: ['filho_obrigatorio'] },
                { campo: 'cpProdutoUAUItensTi', label: 'Produto UAU', atividades: atv_inicio, regras: ['filho_obrigatorio'] },
                { campo: 'cpServicoItensTi', label: 'Serviço', atividades: atv_inicio, regras: ['filho_obrigatorio'] },
                { campo: 'cpInsumoPlanejItensTi', label: 'Insumo de planejamento', atividades: atv_inicio, regras: ['filho_obrigatorio'] },
                { campo: 'cpCodInsumoItensTi', label: 'Código do Insumo no UAU', atividades: atv_inicio, regras: ['filho_obrigatorio'] },
                { campo: 'cpCodServicoItensTi', label: 'Código do Serviço no UAU', atividades: atv_inicio, regras: ['filho_obrigatorio'] },
                { campo: 'cpCodProdutoPlanItensTi', label: 'Código do produto de planejamento no UAU', atividades: atv_inicio, regras: ['filho_obrigatorio'] },
                { campo: 'cpCodInsumoPlanejItensTi', label: 'Código de Insumo do Planejamento no UAU', atividades: atv_inicio, regras: ['filho_obrigatorio'] },
                { campo: 'cpCodItemPlanejItensTi', label: 'Código do item do Planejamento no UAU', atividades: atv_inicio, regras: ['filho_obrigatorio'] },
                { campo: 'cpCodContratoPlItensTi', label: 'Código de contrato do Planejamento no UAU', atividades: atv_inicio, regras: ['filho_obrigatorio'] },
                { campo: 'cpCAPItensTi', label: 'Código CAP no UAU', atividades: atv_inicio, regras: ['filho_obrigatorio'] },               
                
            ]
        },
        //Fim Pai e Filho Itens de Ti

        //Pai e FIlho Demais Compras
        { tablename: 'tbDemaisCompras', label: 'Adicionar Insumos', atividades: atv_inicio, regras: ['minimo_de_filhos_condicional'], minimoFilhos: 1, condicoes: [{ campo: 'tpCompra', valores: ['2'] }], },
        {
            tablename: 'tbDemaisCompras', label: 'Adicionar Insumos', atividades: atv_inicio, regras: ['pai_e_filho'],
            regras_filhos: [
                { campo: 'cpInsumoDemaisCompras', label: 'Insumo de compra', atividades: atv_inicio, regras: ['filho_obrigatorio'] },
                { campo: 'cpUnidadeDemaisCompras', label: 'Unidade', atividades: atv_inicio, regras: ['filho_obrigatorio'] },
                { campo: 'cpQuantidadeDemaisCompras', label: 'Quantidade', atividades: atv_inicio, regras: ['filho_obrigatorio'] },
                { campo: 'cpProdutoUAUDemaisCompras', label: 'Produto UAU', atividades: atv_inicio, regras: ['filho_obrigatorio'] },
                { campo: 'cpServicoDemaisCompras', label: 'Serviço', atividades: atv_inicio, regras: ['filho_obrigatorio'] },
                { campo: 'cpInsumoPlanejCompras', label: 'Insumo de planejamento', atividades: atv_inicio, regras: ['filho_obrigatorio'] },
                { campo: 'cpCodInsumoDemaisCompras', label: 'Código do Insumo no UAU', atividades: atv_inicio, regras: ['filho_obrigatorio'] },
                { campo: 'cpCodServicoDemaisCompras', label: 'Código do Serviço no UAU', atividades: atv_inicio, regras: ['filho_obrigatorio'] },
                { campo: 'cpCodProdutoPlanDemaisCompras', label: 'Código do produto de planejamento no UAU', atividades: atv_inicio, regras: ['filho_obrigatorio'] },
                { campo: 'cpCodInsumoPlanejDemaisCompras', label: 'Código de Insumo do Planejamento no UAU', atividades: atv_inicio, regras: ['filho_obrigatorio'] },
                { campo: 'cpCodItemPlanejDemaisCompras', label: 'Código do item do Planejamento no UAU', atividades: atv_inicio, regras: ['filho_obrigatorio'] },
                { campo: 'cpCodContratoPlDemaisCompras', label: 'Código de contrato do Planejamento no UAU', atividades: atv_inicio, regras: ['filho_obrigatorio'] },
                { campo: 'cpCAPDemaisCompras', label: 'Código CAP no UAU', atividades: atv_inicio, regras: ['filho_obrigatorio'] },
                                
            ]
        },
        //Fim Pai e Filho Demais Compras

        //Pai e FIlho Servico
        { tablename: 'tbContratacaoServicos', label: 'Adicionar Serviços', atividades: atv_inicio, regras: ['minimo_de_filhos_condicional'], minimoFilhos: 1, condicoes: [{ campo: 'cpTipoSolicitacao', valores: ['2'] }], },
        {
            tablename: 'tbContratacaoServicos', label: 'Adicionar Serviços', atividades: atv_inicio, regras: ['pai_e_filho'],
            regras_filhos: [
                { campo: 'cpComposicaoServicos', label: 'Composição', atividades: atv_inicio, regras: ['filho_obrigatorio'] },
                { campo: 'cpUnidadeServicos', label: 'Unidade', atividades: atv_inicio, regras: ['filho_obrigatorio'] },
                { campo: 'cpQuantidadeServicos', label: 'Quantidade', atividades: atv_inicio, regras: ['filho_obrigatorio'] },
                { campo: 'cpServicoServicos', label: 'Serviço', atividades: atv_inicio, regras: ['filho_obrigatorio'] },
                { campo: 'cpProdutoUAUServicos', label: 'Produto UAU', atividades: atv_inicio, regras: ['filho_obrigatorio'] },
                { campo: 'cpComposicaoPlanejServicos', label: 'Composição de planejamento', atividades: atv_inicio, regras: ['filho_obrigatorio'] },
                { campo: 'cpCodInsumoServicos', label: 'Códidgo do Insumo no UAU', atividades: atv_inicio, regras: ['filho_obrigatorio'] },
                { campo: 'cpCodServicoServicos', label: 'Código do Serviço no UAU', atividades: atv_inicio, regras: ['filho_obrigatorio'] },
                { campo: 'cpCodProdutoPlanServicos', label: 'Código do produto de planejamento no UAU', atividades: atv_inicio, regras: ['filho_obrigatorio'] },
                { campo: 'cpCodInsumoPlanejServicos', label: 'Código de Insumo do Planejamento no UAU', atividades: atv_inicio, regras: ['filho_obrigatorio'] },
                { campo: 'cpCodItemPlanejServicos', label: 'Código do item do Planejamento no UAU', atividades: atv_inicio, regras: ['filho_obrigatorio'] },
                { campo: 'cpCodContratoPlServicos', label: 'Código de contrato do Planejamento no UAU', atividades: atv_inicio, regras: ['filho_obrigatorio'] },
                { campo: 'cpCAPServicos', label: 'Código CAP no UAU', atividades: atv_inicio, regras: ['filho_obrigatorio'] },                
            ]
        },

        //Fim pai e Filho Servico       

        //Reabertura de processo
        { campo: 'cpReaberturaChamado', label: 'Aprovação', atividades: atv_reabertura, regras: ['obrigatorio'] },
        { campo: 'cpParecerReabertura', label: 'Parecer', atividades: atv_reabertura, regras: ['obrigatorio'], condicoes: [{ campo: 'cpReaberturaChamado', valores: ['2'] }] },

        //Atividade Aprovação N1
        { campo: 'cpAprovaN1', label: 'Aprovação', atividades: atv_aprovaN1, regras: ['obrigatorio'] },
        { campo: 'cpPareceN1', label: 'Parecer', atividades: atv_aprovaN1, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovaN1', valores: ['2'] }] },

        // Conferência da solicitação - Suprimentos
        { campo: 'cpAprovaConfSuprimentos', label: 'Aprovação', atividades: atv_conferencia_solicitacao, regras: ['obrigatorio'] },
        { campo: 'cpPossuiEstoque', label: 'Tem estoque', atividades: atv_conferencia_solicitacao, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovaConfSuprimentos', valores: ['1'] , campo: 'tpCompra', valores: ['1']}] },
        { campo: 'cpPareceConfSuprimentos', label: 'Parecer', atividades: atv_conferencia_solicitacao, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovaConfSuprimentos', valores: ['2'] }] },

        // Erro na integração 1
        { campo: 'cpAprovaIntegracao1', label: 'Aprovação', atividades: atv_erro_integracao1, regras: ['obrigatorio'] },
        { campo: 'cpPareceIntegracao1', label: 'Parecer', atividades: atv_erro_integracao1, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovaIntegracao1', valores: ['2'] }] },

        // Realizar mapa de cotação no UAU
        { campo: 'cpAprovaCotacao', label: 'Aprovação', atividades: atv_cotacao_uau, regras: ['obrigatorio'] },
        { campo: 'cpNumeroCotacao', label: 'Número da cotação aprovada', atividades: atv_cotacao_uau, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovaCotacao', valores: ['1'] }] },
        { campo: 'cpPareceCotacao', label: 'Parecer', atividades: atv_cotacao_uau, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovaCotacao', valores: ['2'] }] },

        // Erro na integração 2
        { campo: 'cpAprovaIntegracao2', label: 'Aprovação', atividades: atv_erro_integracao2, regras: ['obrigatorio'] },
        { campo: 'cpPareceIntegracao2', label: 'Parecer', atividades: atv_erro_integracao2, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovaIntegracao2', valores: ['2'] }] },

        // Erro na integração 3
        { campo: 'cpAprovaIntegracao3', label: 'Aprovação', atividades: atv_erro_integracao3, regras: ['obrigatorio'] },
        { campo: 'cpPareceIntegracao3', label: 'Parecer', atividades: atv_erro_integracao3, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovaIntegracao3', valores: ['2'] }] },

        // Aprovação do fornecedor e Análise da verba - Gestor
        { campo: 'cpAprovaFornecedoreVerba', label: 'Aprovação', atividades: atv_analise_verba, regras: ['obrigatorio'] },        
        { campo: 'cpDataCotacao', label: 'Data da cotação', atividades: atv_analise_verba, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovaCotacao', valores: ['1'] }] },
        { campo: 'cpTotalPedido', label: 'R$ Total do pedido', atividades: atv_analise_verba, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovaCotacao', valores: ['1'] }] },
        { campo: 'cpPareceFornecedoreVerba', label: 'Parecer', atividades: atv_analise_verba, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovaFornecedoreVerba', valores: ['2'] }] },
        { campo: 'cpReprovaFornecedoreVerba', label: 'Informe o problema', atividades: atv_analise_verba, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovaFornecedoreVerba', valores: ['2'] }] },
                      
        //Pai e FIlho Solicitação de Verbas 
        { tablename: 'tbSolicitacaoVerba', label: 'Solicitação de Verba', atividades: atv_analise_verba, regras: ['minimo_de_filhos_condicional'], minimoFilhos: 1, condicoes: [{ campo: 'hasSaldoOrcadoNegativo', valores: ['1'] }], },
        {
            tablename: 'tbSolicitacaoVerba', label: 'Solicitação de Verba', atividades: atv_analise_verba, regras: ['pai_e_filho'], condicoes: [{ campo: 'hasSaldoOrcadoNegativo', valores: ['1'] }],
            regras_filhos: [
                { campo: 'cpTipoSolicitacaoVerba', label: 'Tipo de Solicitação', atividades: atv_analise_verba, regras: ['filho_obrigatorio'] },
                { campo: 'cpEmpresaUAU', label: 'Empresa UAU para liberar a verba', atividades: atv_analise_verba, regras: ['filho_obrigatorio'] },
                { campo: 'cpObraUAU', label: 'Obra UAU para liberar a verba', atividades: atv_analise_verba, regras: ['filho_obrigatorio'] },
                { campo: 'cpValorLiberar', label: 'Valor a liberar', atividades: atv_analise_verba, regras: ['filho_obrigatorio'] },
                { campo: 'cpNumPedidoCompras', label: 'Número do pedido de compras', atividades: atv_analise_verba, regras: ['filho_obrigatorio'] },
                { campo: 'cpNumChamadoCompras', label: 'Número do chamado de compras', atividades: atv_analise_verba, regras: ['filho_obrigatorio'] },

                { campo: 'cpProdutoLiberacao', label: 'Produto', atividades: atv_analise_verba, regras: ['filho_obrigatorio_condicional'], condicoes: [{ campo: 'cpTipoSolicitacaoVerba', valores: ['1'] }] },
                { campo: 'cpPeriodoLiberacao', label: 'Período', atividades: atv_analise_verba, regras: ['filho_obrigatorio_condicional'], condicoes: [{ campo: 'cpTipoSolicitacaoVerba', valores: ['1'] }] },
                { campo: 'cpInsumoPlanej', label: 'Insumo de planejamento', atividades: atv_analise_verba, regras: ['filho_obrigatorio_condicional'], condicoes: [{ campo: 'cpTipoSolicitacaoVerba', valores: ['1'] }] },
                
                { campo: 'cpProdutoOrigem', label: 'Produto origem da verba', atividades: atv_analise_verba, regras: ['filho_obrigatorio_condicional'], condicoes: [{ campo: 'cpTipoSolicitacaoVerba', valores: ['2'] }] },
                { campo: 'cpProdutoDestino', label: 'Produto destino da verba', atividades: atv_analise_verba, regras: ['filho_obrigatorio_condicional'], condicoes: [{ campo: 'cpTipoSolicitacaoVerba', valores: ['2'] }] },
                { campo: 'cpInsumoOrigem', label: 'Insumo de origem da verba', atividades: atv_analise_verba, regras: ['filho_obrigatorio_condicional'], condicoes: [{ campo: 'cpTipoSolicitacaoVerba', valores: ['2'] }] },
                { campo: 'cpInsumoDestino', label: 'Insumo de destino da verba', atividades: atv_analise_verba, regras: ['filho_obrigatorio_condicional'], condicoes: [{ campo: 'cpTipoSolicitacaoVerba', valores: ['2'] }] },
                { campo: 'cpPeriodoOrigemVerba', label: 'Período', atividades: atv_analise_verba, regras: ['filho_obrigatorio_condicional'], condicoes: [{ campo: 'cpTipoSolicitacaoVerba', valores: ['2'] }] },
                { campo: 'cpPeriodoDestinoVerba', label: 'Período', atividades: atv_analise_verba, regras: ['filho_obrigatorio_condicional'], condicoes: [{ campo: 'cpTipoSolicitacaoVerba', valores: ['2'] }] },               
            ]
        },
        //Fim pai e Filho Solicitação de Verbas 

        //Aprovação da compra / contratação - Gerente Geral
        { campo: 'cpAprovaAprovaCompraGG', label: 'Aprovação', atividades: atv_aprovacao_compra_gg, regras: ['obrigatorio'] },
        { campo: 'cpPareceAprovaCompraGG', label: 'Parecer', atividades: atv_aprovacao_compra_gg, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovaAprovaCompraGG', valores: ['2'] }] },
        { campo: 'cpReprovaCompraGG', label: 'Informe o problema', atividades: atv_aprovacao_compra_gg, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovaAprovaCompraGG', valores: ['2'] }] },
        
        //Aprovação da compra / contratação - Superintendente
        { campo: 'cpAprovaCompraSuper', label: 'Aprovação', atividades: atv_aprovacao_compra_super, regras: ['obrigatorio'] },
        { campo: 'cpPareceCompraSuper', label: 'Parecer', atividades: atv_aprovacao_compra_super, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovaCompraSuper', valores: ['2'] }] },
        { campo: 'cpReprovaCompraSuper', label: 'Informe o problema', atividades: atv_aprovacao_compra_super, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovaCompraSuper', valores: ['2'] }] },

        //Aprovação da compra / contratação - Diretor
        { campo: 'cpAprovaCompraDiretor', label: 'Aprovação', atividades: atv_aprovacao_compra_diretor, regras: ['obrigatorio'] },
        { campo: 'cpPareceCompraDiretor', label: 'Parecer', atividades: atv_aprovacao_compra_diretor, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovaCompraDiretor', valores: ['2'] }] },
        { campo: 'cpReprovaCompraDiretor', label: 'Informe o problema', atividades: atv_aprovacao_compra_diretor, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovaCompraDiretor', valores: ['2'] }] },

        // Erro na integração 4
        { campo: 'cpAprovaIntegracao4', label: 'Aprovação', atividades: atv_erro_integracao4, regras: ['obrigatorio'] },
        { campo: 'cpPareceIntegracao4', label: 'Parecer', atividades: atv_erro_integracao4, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovaIntegracao4', valores: ['2'] }] },

        // Lançamento da ordem de compra no UAU / Requisição de produto em estoque
        { campo: 'cpAprovaOrdemCompra', label: 'Aprovação', atividades: atv_lancamento_ordem_compra, regras: ['obrigatorio'] },
        { campo: 'cpPrevisaoEntrega', label: 'Aprovação', atividades: atv_lancamento_ordem_compra, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovaOrdemCompra', valores: ['1'] }] },
        { campo: 'cpPareceOrdemCompra', label: 'Parecer', atividades: atv_lancamento_ordem_compra, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovaOrdemCompra', valores: ['2'] }] },

        //Conferência do atendimento - Solicitante
        { campo: 'cpAprovaConfSolicitante', label: 'Aprovação', atividades: atv_conferencia_solicitante, regras: ['obrigatorio'] },
        { campo: 'cpPareceConfSolicitante', label: 'Parecer', atividades: atv_conferencia_solicitante, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovaConfSolicitante', valores: ['2'] }] },
        { campo: 'cpReprovadoConfSolicitante', label: 'Informe o problema', atividades: atv_conferencia_solicitante, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovaConfSolicitante', valores: ['2'] }] },

        //Confirmar previsão do fornecedor
        { campo: 'cpAprovaPrevisaoFornecedor', label: 'Aprovação', atividades: atv_confirmar_previsao, regras: ['obrigatorio'] },
        { campo: 'cpParecePrevisaoFornecedor', label: 'Parecer', atividades: atv_confirmar_previsao, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovaPrevisaoFornecedor', valores: ['2'] }] },

        //Lançamento da NF no UAU
        //{ campo: 'cpAprovaLancamentoNF', label: 'Aprovação', atividades: atv_confirmar_previsao, regras: ['obrigatorio'] },
        //{ campo: 'cpPareceLancamentoNF', label: 'Parecer', atividades: atv_confirmar_previsao, regras: ['obrigatorio'], condicoes: [{ campo: 'cpAprovaLancamentoNF', valores: ['2'] }] },

    ];

    var Validador = new ValidaFormulario(form, getValue("WKNumState"));

    if (!Validador.validar(regras_do_formulario)) {
        throw Validador.mensagem_de_erro();
    }
     
}  