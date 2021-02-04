/**
 * [getPedido description]
 * @return {[type]} [description]
 */
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

/**
 * [getDadosIntegracao description]
 * @param  {[string]} token         [description]
 * @param  {[object]} header_pedido [description]
 * @param  {[object]} json_itens    [description]
 * @return {[object]}               [description]
 */
function getDadosIntegracao(token, header_pedido, json_itens){
	var dados;
	var tipo_solicitacao = hAPI.getCardValue('cpTipoSolicitacao');

	if(tipo_solicitacao == '1') {
		if(!isPedidoUrgente()) {
			dados = createJSONPedidoMateriais(token, header_pedido, json_itens);
		}
		else{
			dados = createJSONPedidoUrgente(token, header_pedido, json_itens);
		}
	}
	else{
		dados = createJSONPedidoServico(token, header_pedido, json_itens);
	}

	return dados;
}

/**
 * @description Monta o JSON da lista de demais materiais
 * @param  {[int]} index  [index de filhos da tabela]
 * @return {[string]}        [retorna o objeto como stringify]
 */
function createListaItensTI(index) {
    var dados = getDataTabelaItensTI(index);
    var json_itens = {
        "codigoInsumo": new String(dados.COD_INSUMO),
        "CAP": new String(dados.CAP),
        "unidade": new String(dados.UNIDADE),
        "controleEstoque": 0,
        "dataEntrega": new String(dados.DATA_ENTREGA),
        "quantidade": parseInt(dados.QUANTIDADE),
        "observacao": new String(dados.OBSERVACAO_ITEM),
        "listaVinculo": [
            {
                "produtoPl": parseInt(dados.COD_PRODUTO_PL),
                "contratoPl": parseInt(dados.CONTRATO_PL),
                "itemPl": new String(dados.COD_ITEM_PL),
                "servicoPl": new String(dados.COD_SERVICO),
                "mesPl": new String(dados.MES_PL),
                "codigoInsumoPl": new String(dados.COD_INSUMO_PL),
                "quantidadeVinculo": parseInt(dados.QUANTIDADE)
            }
        ]
    }

    return json_itens;
}

/**
 * @description Monta o JSON da lista de materiais de TI
 * @param  {[int]} index  [index de filhos da tabela]
 * @return {[string]}        [retorna o objeto como stringify]
 */
function createListaDemaisItens(index) {
    var dados = getDataTabelaDemaisItens(index);
    var json_itens = {
        "codigoInsumo": new String(dados.COD_INSUMO),
        "CAP": new String(dados.CAP),
        "unidade": new String(dados.UNIDADE),
        "controleEstoque": 0,
        "dataEntrega": new String(dados.DATA_ENTREGA),
        "quantidade": parseInt(dados.QUANTIDADE),
        "observacao": new String(dados.OBSERVACAO_ITEM),
        "listaVinculo": [
            {
                "produtoPl": parseInt(dados.COD_PRODUTO_PL),
                "contratoPl": parseInt(dados.CONTRATO_PL),
                "itemPl": new String(dados.COD_ITEM_PL),
                "servicoPl": new String(dados.COD_SERVICO),
                "mesPl": new String(dados.MES_PL),
                "codigoInsumoPl": new String(dados.COD_INSUMO_PL),
                "quantidadeVinculo": parseInt(dados.QUANTIDADE)
            }
        ]
    }

    return json_itens;
}

/**
 * @description Monta o JSON da lista de serviços
 * @param  {[int]} index  [index de filhos da tabela]
 * @return {[string]}        [retorna o objeto como stringify]
 */
function createListaServicos(index) {
    var dados = getDataTabelaServicos(index);
    var json_itens = {
        "codigoServico": new String(dados.COD_SERVICO),
        "quantidade": parseInt(dados.QUANTIDADE),
        "unidade": new String(dados.UNIDADE),
        "origemServico": 0,
        "mesPl": new String(dados.MES_PL),
        "produtoPl": parseInt(dados.COD_PRODUTO_PL),
        "contratoPl": parseInt(dados.CONTRATO_PL),
        "CAP": new String(dados.CAP),
        "dataInicio": new String(dados.DATA_INICIO),
        "observacao": new String(dados.OBSERVACAO_ITEM),
        "listaVinculo": [
            {
                "produtoPl": parseInt(dados.COD_PRODUTO_PL),
                "contratoPl": parseInt(dados.CONTRATO_PL),
                "itemPl": new String(dados.COD_ITEM_PL),
                "servicoPl": new String(dados.COD_SERVICO_PL),
                "mesPl": new String(dados.MES_PL),
                "codigoInsumoPl": new String(dados.COD_INSUMO_PL),
                "quantidadeVinculo": parseInt(dados.QUANTIDADE)
            }
        ]
    }

    return json_itens;
}

/**
 * [getDataTabelaDemaisItens description]
 * @param  {[string]} index [description]
 * @return {[type]}       [description]
 */
function getDataTabelaDemaisItens(index) {
    var COD_INSUMO = hAPI.getCardValue('cpCodInsumoDemaisCompras___' + index);
    var CAP = hAPI.getCardValue('cpCAPDemaisCompras___' + index);
    var UNIDADE = hAPI.getCardValue('cpUnidadeDemaisCompras___' + index);
    var DATA_ENTREGA = formatDataEntrega(hAPI.getCardValue('cpDataEntregaContratacao'));
    var QUANTIDADE = hAPI.getCardValue('cpQuantidadeDemaisCompras___' + index);
    var OBSERVACAO_ITEM = hAPI.getCardValue('cpObservacoesDemaisCompras___' + index);
    //Lista de Vinculos
    var COD_PRODUTO_PL = hAPI.getCardValue('cpCodProdutoPlanDemaisCompras___' + index);
    var CONTRATO_PL = hAPI.getCardValue('cpCodContratoPlDemaisCompras___' + index);
    var COD_ITEM_PL = hAPI.getCardValue('cpCodItemPlanejDemaisCompras___' + index);
    var COD_SERVICO = hAPI.getCardValue('cpCodServicoDemaisCompras___' + index);
    var MES_PL = getMesAnoData(hAPI.getCardValue('cpMesPl'));
    var COD_INSUMO_PL = hAPI.getCardValue('cpCodInsumoPlanejDemaisCompras___' + index);

    return {
        COD_INSUMO: COD_INSUMO,
        CAP: CAP,
        UNIDADE: UNIDADE,
        DATA_ENTREGA: DATA_ENTREGA,
        QUANTIDADE: QUANTIDADE,
        OBSERVACAO_ITEM: OBSERVACAO_ITEM,
        COD_PRODUTO_PL: COD_PRODUTO_PL,
        CONTRATO_PL: CONTRATO_PL,
        COD_ITEM_PL: COD_ITEM_PL,
        COD_SERVICO: COD_SERVICO,
        MES_PL: MES_PL,
        COD_INSUMO_PL: COD_INSUMO_PL
    }
}

/**
 * [getDataTabelaDemaisItens description]
 * @param  {[string]} index [description]
 * @return {[type]}       [description]
 */
function getDataTabelaItensTI(index) {
    var COD_INSUMO = hAPI.getCardValue('cpCodInsumoItensTi___' + index);
    var CAP = hAPI.getCardValue('cpCAPItensTi___' + index);
    var UNIDADE = hAPI.getCardValue('cpUnidadeItensTi___' + index);
    var DATA_ENTREGA = formatDataEntrega(hAPI.getCardValue('cpDataEntregaContratacao'));
    var QUANTIDADE = hAPI.getCardValue('cpQuantidadeItensTi___' + index);
    var OBSERVACAO_ITEM = hAPI.getCardValue('cpObservacoesItensTi___' + index);
    //Lista de Vinculos
    var COD_PRODUTO_PL = hAPI.getCardValue('cpCodProdutoPlanItensTi___' + index);
    var CONTRATO_PL = hAPI.getCardValue('cpCodContratoPlItensTi___' + index);
    var COD_ITEM_PL = hAPI.getCardValue('cpCodItemPlanejItensTi___' + index);
    var COD_SERVICO = hAPI.getCardValue('cpCodServicoItensTi___' + index);
    var MES_PL = getMesAnoData(hAPI.getCardValue('cpMesPl'));
    var COD_INSUMO_PL = hAPI.getCardValue('cpCodInsumoPlanejItensTi___' + index);

    return {
        COD_INSUMO: COD_INSUMO,
        CAP: CAP,
        UNIDADE: UNIDADE,
        DATA_ENTREGA: DATA_ENTREGA,
        QUANTIDADE: QUANTIDADE,
        OBSERVACAO_ITEM: OBSERVACAO_ITEM,
        COD_PRODUTO_PL: COD_PRODUTO_PL,
        CONTRATO_PL: CONTRATO_PL,
        COD_ITEM_PL: COD_ITEM_PL,
        COD_SERVICO: COD_SERVICO,
        MES_PL: MES_PL,
        COD_INSUMO_PL: COD_INSUMO_PL
    }
}

/**
 * [getDataTabelaServicos description]
 * @param  {[type]} index  [description]
 * @return {[type]}        [description]
 */
function getDataTabelaServicos(index) {
    var COD_SERVICO = hAPI.getCardValue('cpCodInsumoServicos___' + index);
    var QUANTIDADE = hAPI.getCardValue('cpQuantidadeServicos___' + index);
    var UNIDADE = hAPI.getCardValue('cpUnidadeServicos___' + index);
    var MES_PL = getMesAnoData(hAPI.getCardValue('cpMesPl'));
    var ITEM_PL = hAPI.getCardValue('cpCodItemPlanejServicos___' + index);
    var PRODUTO_PL = hAPI.getCardValue('cpCodProdutoPlanServicos___' + index);
    var CONTRATO_PL = hAPI.getCardValue('cpCodContratoPlServicos___' + index);
    var CAP = hAPI.getCardValue('cpCAPServicos___' + index);
    var DATA_INICIO = formatDataEntrega(hAPI.getCardValue('cpDataEntregaContratacao'));
    var OBSERVACAO_ITEM = hAPI.getCardValue('cpObservacoesServicos___' + index);
    //Lista Vinculo
    var COD_INSUMO_PL = hAPI.getCardValue('cpCodInsumoPlanejServicos___' + index);
    var COD_SERVICO_PL = hAPI.getCardValue('cpCodServicoServicos___' + index);

    return {
        COD_SERVICO: COD_SERVICO,
        QUANTIDADE: QUANTIDADE,
        UNIDADE: UNIDADE,
        MES_PL: MES_PL,
        ITEM_PL: ITEM_PL,
        PRODUTO_PL: PRODUTO_PL,
        CONTRATO_PL: CONTRATO_PL,
        CAP: CAP,
        DATA_INICIO: DATA_INICIO,
        OBSERVACAO_ITEM: OBSERVACAO_ITEM,
        COD_INSUMO_PL: COD_INSUMO_PL,
        COD_SERVICO_PL: COD_SERVICO_PL
    }
}

/**
 * [createJSONPedidoUrgente description]
 * @param  {[string]} token         [token de integração]
 * @param  {[object]} header_pedido [dados principais do pedido]
 * @param  {[object]} json_itens    [json de itens do pedido]
 * @return {[object]}               [description]
 */
function createJSONPedidoUrgente(token, header_pedido, json_itens) {
	var json_pedido = {
		"dadosPedido": {
			"codigoEmpresa": parseInt(header_pedido.COD_EMPRESA),
			"codigoObra": new String(header_pedido.COD_OBRA),
			"codigoObraFiscal": new String(header_pedido.COD_OBRA_FISCAL),
			"usuario": "prouau",
			"observacao": "Pedido gerado via integração Fluig: NOME USUÁRIO - " + header_pedido.NOME_SOLICITANTE + "| ID USUÁRIO - " + header_pedido.MATRICULA_SOLICITANTE + "| PROCESSO -" + header_pedido.NUM_PROCESSO + ""
		},
		"listaDadosItemPedido": json_itens
	}

	var json_servico = {
		companyId: getValue("WKCompany") + '',
		serviceCode: "UAU_GravarPedidoUrgente",
		endpoint: "/api/v1.0/PedidoCompra/GravarPedidoDeCompraDoTipoEmergencial",
		method: "post",
		timeoutService: "300",
		params: json_pedido,
		options: {
			encoding: "UTF-8",
			mediaType: "application/json"
		},
		headers: {
			'X-INTEGRATION-Authorization': "eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..ZDdhitIz4xq6vaNlM5g5WQ.CE2EK4_oz7GJ6kHJYvXsx4id-ogXiTq298jAj_u7ZKzc6HkysDfEhlD-mUVKtSc_k1NUkNEJTBNma5rdSXMHYsqN5-AgDs16QB7yhBG71pDSsZNqea0C9VYwXIwN9RdSBB6YYZM3AIuGd28C39j3DS78tZI02UB_h5eRBVOwLE8.y0vmHmblqDUYhVF88hXZ6A",
			'Authorization': '' + token + '',
			'Content-Type': 'application/json; charset=utf-8'
		}
	}

	return json_servico;
}

/**
 * [createJSONPedidoMateriais description]
 * @param  {[string]} token         [token de integração]
 * @param  {[object]} header_pedido [dados principais do pedido]
 * @param  {[object]} json_itens    [json de itens do pedido]
 * @return {[object]}               [description]
 */
function createJSONPedidoMateriais(token, header_pedido, json_itens) {
	var json_pedido = {
		"dadosPedido": {
			"codigoEmpresa": parseInt(header_pedido.COD_EMPRESA),
			"codigoObra": new String(header_pedido.COD_OBRA),
			"codigoObraFiscal": new String(header_pedido.COD_OBRA_FISCAL),
			"usuario": "prouau",
			"observacao": "Pedido gerado via integração Fluig: NOME USUÁRIO - " + header_pedido.NOME_SOLICITANTE + "| ID USUÁRIO - " + header_pedido.MATRICULA_SOLICITANTE + "| PROCESSO -" + header_pedido.NUM_PROCESSO + ""
		},
		"listaDadosItemPedido": json_itens
	}

	var json_servico = {
		companyId: getValue("WKCompany") + '',
		serviceCode: "UAU_GravarPedidoDeCompraDoTipoMaterial",
		endpoint: "/api/v1.0/PedidoCompra/GravarPedidoDeCompraDoTipoMaterial",
		method: "post",
		timeoutService: "300",
		params: json_pedido,

		options: {
			encoding: "UTF-8",
			mediaType: "application/json"
		},
		headers: {
			'X-INTEGRATION-Authorization': "eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..ZDdhitIz4xq6vaNlM5g5WQ.CE2EK4_oz7GJ6kHJYvXsx4id-ogXiTq298jAj_u7ZKzc6HkysDfEhlD-mUVKtSc_k1NUkNEJTBNma5rdSXMHYsqN5-AgDs16QB7yhBG71pDSsZNqea0C9VYwXIwN9RdSBB6YYZM3AIuGd28C39j3DS78tZI02UB_h5eRBVOwLE8.y0vmHmblqDUYhVF88hXZ6A",
			'Authorization': '' + token + '',
			'Content-Type': 'application/json; charset=utf-8'
		}
	}

	return json_servico;
}

/**
 * [createJSONPedidoServico description]
 * @param  {[string]} token         [token de integração]
 * @param  {[object]} header_pedido [dados principais do pedido]
 * @param  {[object]} json_itens    [json de itens do pedido]
 * @return {[object]}               [description]
 */
function createJSONPedidoServico(token, header_pedido, json_itens) {
	var json_pedido = {
		"dadosPedido": {
			"codigoEmpresa": parseInt(header_pedido.COD_EMPRESA),
			"codigoObra": new String(header_pedido.COD_OBRA),
			"codigoObraFiscal": new String(header_pedido.COD_OBRA_FISCAL),
			"usuario": "prouau",
			"observacao": "Pedido gerado via integração Fluig: NOME USUÁRIO - " + header_pedido.NOME_SOLICITANTE + "| ID USUÁRIO - " + header_pedido.MATRICULA_SOLICITANTE + "| PROCESSO -" + header_pedido.NUM_PROCESSO + ""
		},
		"listaDadosItemPedido": json_itens
	}

	var json_servico = {
		companyId: getValue("WKCompany") + '',
		serviceCode: "UAU_GravarPedidoDeCompraDoTipoServico",
		endpoint: "/api/v1.0/PedidoCompra/GravarPedidoDeCompraDoTipoServico",
		method: "post",
		timeoutService: "300",
		params: json_pedido,

		options: {
			encoding: "UTF-8",
			mediaType: "application/json"
		},
		headers: {
			'X-INTEGRATION-Authorization': "eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..ZDdhitIz4xq6vaNlM5g5WQ.CE2EK4_oz7GJ6kHJYvXsx4id-ogXiTq298jAj_u7ZKzc6HkysDfEhlD-mUVKtSc_k1NUkNEJTBNma5rdSXMHYsqN5-AgDs16QB7yhBG71pDSsZNqea0C9VYwXIwN9RdSBB6YYZM3AIuGd28C39j3DS78tZI02UB_h5eRBVOwLE8.y0vmHmblqDUYhVF88hXZ6A",
			'Authorization': '' + token + '',
			'Content-Type': 'application/json; charset=utf-8'
		}
	}

	return json_servico;
}
