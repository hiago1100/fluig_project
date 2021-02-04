function gravarPedido(token, dadosPedido, itensPedido) {

	token = token.replace('"', '');

	var clientService = fluigAPI.getAuthorizeClientService();

	var data = getDadosIntegracao(token, dadosPedido, itensPedido)

	var vo = clientService.invoke(JSON.stringify(data));
	
	if (vo.getResult() == null || vo.getResult().isEmpty()) {
		hAPI.setCardValue('cpStatus199', 'ERRO')
		throw new Erro("Retorno está vazio");
	}
	if (vo.getHttpStatusResult() != 200) {
		hAPI.setCardValue('cpStatus199', 'ERRO')
		var msgErro = vo.getResult()
		throw msgErro;
	} else {
		var result = vo.getResult().split(',')
		hAPI.setCardValue('cpNumeroPedido', result[0])
	}	
}

function getDadosIntegracao(token, dadosPedido, itensPedido) {
	var dados;
	if (hAPI.getCardValue('cpTipoSolicitacao') == 1) {

		if (!ehPedidoUrgente()) {

			dados = integraDadosMaterial(token, dadosPedido, itensPedido)
		} else {

			dados = integraDadosUrgente(token, dadosPedido, itensPedido)
		}
	} else if (hAPI.getCardValue('cpTipoSolicitacao') == 2) {
		dados = integraDadosServico(token, dadosPedido, itensPedido)
	}
	return dados
}

function integraDadosUrgente(token, dadosPedido, itensPedido) {
	itensPedido = '[' + itensPedido + ']'
	itensPedido = JSON.parse(itensPedido)

	data = {
		companyId: getValue("WKCompany") + '',
		serviceCode: "UAU_GravarPedidoUrgente",
		endpoint: "/api/v1.0/PedidoCompra/GravarPedidoDeCompraDoTipoEmergencial",
		method: "post",
		timeoutService: "100",
		params: {
			"dadosPedido": {
				"codigoEmpresa": '' + dadosPedido.COD_EMPRESA + '',
				"codigoObra": '' + dadosPedido.COD_OBRA + '',
				"codigoObraFiscal": '' + dadosPedido.COD_OBRA_FISCAL + '',
				"usuario": "prouau",
				"observacao": "Pedido gerado via integração Fluig: NOME USUÁRIO - " + dadosPedido.NOME_SOLICITANTE + "| ID USUÁRIO - " + dadosPedido.MATRICULA_SOLICITANTE + "| PROCESSO -" + dadosPedido.NUM_PROCESSO + ""
			}, "listaDadosItemPedido": itensPedido
		},

		options:
		{
			encoding: "UTF-8",
			mediaType: "application/json"
		},
		headers:
		{
			'X-INTEGRATION-Authorization': "eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..ZDdhitIz4xq6vaNlM5g5WQ.CE2EK4_oz7GJ6kHJYvXsx4id-ogXiTq298jAj_u7ZKzc6HkysDfEhlD-mUVKtSc_k1NUkNEJTBNma5rdSXMHYsqN5-AgDs16QB7yhBG71pDSsZNqea0C9VYwXIwN9RdSBB6YYZM3AIuGd28C39j3DS78tZI02UB_h5eRBVOwLE8.y0vmHmblqDUYhVF88hXZ6A",
			'Authorization': '' + token + '',
			'Content-Type': 'application/json; charset=utf-8'
		}
	}
	return data
}

function integraDadosMaterial(token, dadosPedido, itensPedido) {
	itensPedido = '[' + itensPedido + ']'
	itensPedido = JSON.parse(itensPedido)

	data = {
		companyId: getValue("WKCompany") + '',
		serviceCode: "UAU_GravarPedidoDeCompraDoTipoMaterial",
		endpoint: "/api/v1.0/PedidoCompra/GravarPedidoDeCompraDoTipoMaterial",
		method: "post",
		timeoutService: "100",
		params: {
			"dadosPedido": {
				"codigoEmpresa": '' + dadosPedido.COD_EMPRESA + '',
				"codigoObra": '' + dadosPedido.COD_OBRA + '',
				"codigoObraFiscal": '' + dadosPedido.COD_OBRA_FISCAL + '',
				"usuario": "prouau",
				"observacao": "Pedido gerado via integração Fluig: NOME USUÁRIO - " + dadosPedido.NOME_SOLICITANTE + "| ID USUÁRIO - " + dadosPedido.MATRICULA_SOLICITANTE + "| PROCESSO -" + dadosPedido.NUM_PROCESSO + ""
			}, "listaDadosItemPedido": itensPedido
		},

		options:
		{
			encoding: "UTF-8",
			mediaType: "application/json"
		},
		headers:
		{
			'X-INTEGRATION-Authorization': "eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..ZDdhitIz4xq6vaNlM5g5WQ.CE2EK4_oz7GJ6kHJYvXsx4id-ogXiTq298jAj_u7ZKzc6HkysDfEhlD-mUVKtSc_k1NUkNEJTBNma5rdSXMHYsqN5-AgDs16QB7yhBG71pDSsZNqea0C9VYwXIwN9RdSBB6YYZM3AIuGd28C39j3DS78tZI02UB_h5eRBVOwLE8.y0vmHmblqDUYhVF88hXZ6A",
			'Authorization': '' + token + '',
			'Content-Type': 'application/json; charset=utf-8'
		}
	}
	return data
}

function integraDadosServico(token, dadosPedido, itensPedido) {

	itensPedido = '[' + itensPedido + ']'
	itensPedido = JSON.parse(itensPedido)
	data = {
		companyId: getValue("WKCompany") + '',
		serviceCode: "UAU_GravarPedidoDeCompraDoTipoServico",
		endpoint: "/api/v1.0/PedidoCompra/GravarPedidoDeCompraDoTipoServico",
		method: "post",
		timeoutService: "100",
		params: {
			"dadosPedido": {
				"codigoEmpresa": '' + dadosPedido.COD_EMPRESA + '',
				"codigoObra": '' + dadosPedido.COD_OBRA + '',
				"codigoObraFiscal": '' + dadosPedido.COD_OBRA_FISCAL + '',
				"usuario": "prouau",
				"observacao": "Pedido gerado via integração Fluig: NOME USUÁRIO - " + dadosPedido.NOME_SOLICITANTE + "| ID USUÁRIO - " + dadosPedido.MATRICULA_SOLICITANTE + "| PROCESSO -" + dadosPedido.NUM_PROCESSO + ""
			}, "listaDadosItemPedido": itensPedido
		},
		options:
		{
			encoding: "UTF-8",
			mediaType: "application/json"
		},
		headers:
		{
			'X-INTEGRATION-Authorization': "eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..ZDdhitIz4xq6vaNlM5g5WQ.CE2EK4_oz7GJ6kHJYvXsx4id-ogXiTq298jAj_u7ZKzc6HkysDfEhlD-mUVKtSc_k1NUkNEJTBNma5rdSXMHYsqN5-AgDs16QB7yhBG71pDSsZNqea0C9VYwXIwN9RdSBB6YYZM3AIuGd28C39j3DS78tZI02UB_h5eRBVOwLE8.y0vmHmblqDUYhVF88hXZ6A",
			'Authorization': '' + token + '',
			'Content-Type': 'application/json; charset=utf-8'
		}
	}
	return data
}