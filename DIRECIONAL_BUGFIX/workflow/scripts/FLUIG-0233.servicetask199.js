function servicetask199(attempt, message) {
    try {
        var indexes;
        var tipoSolicitação = hAPI.getCardValue('cpTipoSolicitacao')
        var tpCompra = hAPI.getCardValue('tpCompra')
        var ItensPedidoArray = [];

        if (tipoSolicitação == 1) {
            if (tpCompra == 1) {
                indexes = getIndexes('cpInsumoItensTi');
            } else {
                indexes = getIndexes('cpInsumoDemaisCompras');
            }
        } else {
            indexes = getIndexes('cpComposicaoServicos');
        }

        var iterator = indexes.iterator();

        while (iterator.hasNext()) {
            var index = iterator.next();
            var ItensPedido;

            if (tipoSolicitação == 1) {
                if (tpCompra == 1) {
                    ItensPedido = montarListaMaterial('ItensTi', index)
                    ItensPedidoArray.push(ItensPedido)
                } else {
                    ItensPedido = montarListaMaterial('DemaisCompras', index)
                    ItensPedidoArray.push(ItensPedido)
                }
            } else {
                ItensPedido = montarListaServico('Servicos', index)
                ItensPedidoArray.push(ItensPedido)
            }
        }

        var listaDadosItemPedido = '';

        for (var i = 0; i < ItensPedidoArray.length; i++) {
            if (i == ItensPedidoArray.length - 1) {
                listaDadosItemPedido += ItensPedidoArray[i]
            } else {
                listaDadosItemPedido += ItensPedidoArray[i] + ','
            }
        }
        var token = AutenticarUsuarioCorporativo('cpStatus199');
        gravarPedido(token, getPedido(), listaDadosItemPedido);
    }
    catch (erro) {
        hAPI.setCardValue('cpStatus199', 'ERRO')
        throw 'OCORREU UM ERRO NA INTEGRAÇÃO DO PEDIDO COM O UAU :( ERRO: ' + erro.name + ' - ' + erro.message + ' - ' + erro;
    }
}

function montarListaMaterial(tabela, index) {
    var dados = getdadosItensPedido(tabela, index)
    listaDadosItemPedido = '{'
        + '"codigoInsumo": "' + dados.COD_INSUMO + '",'
        + '"CAP": "' + dados.CAP + '",'
        + '"unidade": "' + dados.UNIDADE + '",'
        + '"controleEstoque": 0,'
        + '"dataEntrega": "' + dados.DATA_INICIO + '",'
        + '"quantidade": "' + dados.QUANTIDADE + '",'
        + '"observacao": "' + dados.OBSERVACAO_ITEM + '",'
        + '"listaVinculo": ['
        + ' {'
        + '"produtoPl": "' + dados.COD_PRODUTO_PL + '",'
        + '"contratoPl": "' + dados.CONTRATO_PL + '",'
        + '"itemPl": "' + dados.COD_ITEM_PL + '",'
        + '"servicoPl": "' + dados.COD_SERVICO + '",'
        + '"mesPl": "' + dados.MES_PL + '",'
        + '"codigoInsumoPl": "' + dados.COD_INSUMO_PL + '",'
        + '"quantidadeVinculo": "' + dados.QUANTIDADE + '"'
        + '}]}'

    return listaDadosItemPedido
}

function montarListaServico(tabela, index) {
    var dados = getdadosItensPedido(tabela, index)
    listaDadosItemPedido = '{ '
        + '"codigoServico": "' + dados.COD_INSUMO + '",'
        + '"quantidade": "' + dados.QUANTIDADE + '",'
        + '"unidade": "' + dados.UNIDADE + '",'
        + '"origemServico": 0,'
        + '"mesPl": "' + dados.MES_PL + '",'
        + '"produtoPl": "' + dados.COD_PRODUTO_PL + '",'
        + '"contratoPl": "' + dados.CONTRATO_PL + '",'
        + '"CAP": "' + dados.CAP + '",'
        + '"dataInicio": "' + dados.DATA_INICIO + '",'
        + '"observacao": "' + dados.OBSERVACAO_ITEM + '",'
        + '"listaVinculo": ['
        + ' {'
        + '"produtoPl": "' + dados.COD_PRODUTO_PL + '",'
        + '"contratoPl": "' + dados.CONTRATO_PL + '",'
        + '"itemPl": "' + dados.COD_ITEM_PL + '",'
        + '"servicoPl": "' + dados.COD_SERVICO + '",'
        + '"mesPl": "' + dados.MES_PL + '",'
        + '"codigoInsumoPl": "' + dados.COD_INSUMO_PL + '",'
        + '"quantidadeVinculo": "' + dados.QUANTIDADE + '"'
        + '}]}'

    return listaDadosItemPedido
}

function getdadosItensPedido(tabela, index) {

    var cpDataEntregaContratacao = hAPI.getCardValue('cpDataEntregaContratacao')
    var mesPl = hAPI.getCardValue('cpMesPl')
       
    if (isDataMobile(cpDataEntregaContratacao) || isDataMobile(mesPl)) { //DATA MOBILE AAAA-MM-DD
        cpDataEntregaContratacao = hAPI.getCardValue('cpDataEntregaContratacao').split('-')
        cpDataEntregaContratacao = cpDataEntregaContratacao[1] + '/' + cpDataEntregaContratacao[2] + '/' + cpDataEntregaContratacao[0]
        mesPl = hAPI.getCardValue('cpMesPl').split('-')
        mesPl = mesPl[1] + '/' + mesPl[0]
    } else { //DATA FORM DD/MM/AAAA
        cpDataEntregaContratacao = hAPI.getCardValue('cpDataEntregaContratacao').split('/')
        cpDataEntregaContratacao = cpDataEntregaContratacao[1] + '/' + cpDataEntregaContratacao[0] + '/' + cpDataEntregaContratacao[2]
        mesPl = hAPI.getCardValue('cpMesPl').split('/')
        mesPl = mesPl[1] + '/' + mesPl[2]

    }

    var COD_INSUMO_PL = hAPI.getCardValue('cpCodInsumoPlanej' + tabela + '___' + index);
    var MES_PL = mesPl;
    var DATA_INICIO = cpDataEntregaContratacao;
    var COD_SERVICO = hAPI.getCardValue('cpCodServico' + tabela + '___' + index);
    var COD_INSUMO = hAPI.getCardValue('cpCodInsumo' + tabela + '___' + index);
    var QUANTIDADE = hAPI.getCardValue('cpQuantidade' + tabela + '___' + index);
    var UNIDADE = hAPI.getCardValue('cpUnidade' + tabela + '___' + index);
    var COD_ITEM_PL = hAPI.getCardValue('cpCodItemPlanej' + tabela + '___' + index);
    var COD_PRODUTO_PL = hAPI.getCardValue('cpCodProdutoPlan' + tabela + '___' + index);
    var CONTRATO_PL = hAPI.getCardValue('cpCodContratoPl' + tabela + '___' + index);
    var CAP = hAPI.getCardValue('cpCAP' + tabela + '___' + index);
    var OBSERVACAO_ITEM = hAPI.getCardValue('cpObservacoes' + tabela + '___' + index);

    return {
        COD_INSUMO_PL: COD_INSUMO_PL,
        MES_PL: MES_PL,
        DATA_INICIO: DATA_INICIO,
        COD_SERVICO: COD_SERVICO,
        COD_INSUMO: COD_INSUMO,
        QUANTIDADE: QUANTIDADE,
        UNIDADE: UNIDADE,
        COD_ITEM_PL: COD_ITEM_PL,
        COD_PRODUTO_PL: COD_PRODUTO_PL,
        CONTRATO_PL: CONTRATO_PL,
        CAP: CAP,
        OBSERVACAO_ITEM: OBSERVACAO_ITEM
    }
}

function getPedido() {
    var cpDataEntregaContratacao = hAPI.getCardValue('cpDataEntregaContratacao').split('/')
    cpDataEntregaContratacao = cpDataEntregaContratacao[1] + '/' + cpDataEntregaContratacao[0] + '/' + cpDataEntregaContratacao[2]

    var COD_EMPRESA = hAPI.getCardValue('cpCodEmpresa');
    var COD_OBRA = hAPI.getCardValue('cpCodCentroCustoUau');
    var COD_OBRA_FISCAL = hAPI.getCardValue('cpCodObraFiscal');
    var NOME_SOLICITANTE = hAPI.getCardValue('cpSolicitanteNome');
    var MATRICULA_SOLICITANTE = hAPI.getCardValue('cpMatriculaSolicitante');
    var NUM_PROCESSO = hAPI.getCardValue("cpNumeroSolicitacao");
    var DATA_INICIO = cpDataEntregaContratacao;

    return {
        COD_EMPRESA: COD_EMPRESA,
        COD_OBRA: COD_OBRA,
        COD_OBRA_FISCAL: COD_OBRA_FISCAL,
        NOME_SOLICITANTE: NOME_SOLICITANTE,
        MATRICULA_SOLICITANTE: MATRICULA_SOLICITANTE,
        NUM_PROCESSO: NUM_PROCESSO,
        DATA_INICIO: DATA_INICIO
    }
}

function isDataMobile(data) {
    return data.indexOf('-') > -1
}
