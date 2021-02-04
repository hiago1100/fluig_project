/**
 * [execAprovacaoFornecedorUAU description]
 * @return {[type]} [description]
 */
function execAprovacaoFornecedorUAU(){
    var service = fluigAPI.getAuthorizeClientService();
    var tipo_compra = hAPI.getCardValue('tpCompra');
    var token = getTokenUAU();
    var campo_possui_estoque = hAPI.getCardValue('cpPossuiEstoque');
    var tipo_solicitacao = hAPI.getCardValue('cpTipoSolicitacao');
    var msg_erro;
    var json_integracao;
    var json_param;
    var http_status;
    var vo;

    if (campo_possui_estoque != '1') {
        if (tipo_solicitacao == '1') {
            if (tipo_compra == '1'){
                json_param = createJSONAprovItensTI();
            }
            else{
                json_param = createJSONAprovDemaisCompras();
            }
        }
    }

    json_integracao = {
        companyId: getValue("WKCompany") + '',
        serviceCode: "UAU_AprovarConfirmacaoCotacaoPorObra",
        endpoint: "/api/v1.0/Cotacao/AprovarConfirmacaoCotacaoPorObra",
        method: "post",
        timeoutService: "100",
        params: json_param,
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

    vo = service.invoke(JSON.stringify(json_integracao));
    http_status = vo.getHttpStatusResult();


    if(parseInt(http_status) != 200){
        throw vo.getResult();
    }
}

/**
 * [createJSONAprovItensTI description]
 * @return {[json]} [description]
 */
function createJSONAprovItensTI(){
    var dados_pedido = getPedido();
    var json_request = {
        "listaConfirmarAprovacaoCotacao": [
            {
                "empresa": parseInt(dados_pedido.COD_EMPRESA),
                "obra": new String(dados_pedido.COD_OBRA),
                "NumCotacao": parseInt(hAPI.getCardValue('cpNumeroCotacao')),
                "numSimulacao": parseInt(hAPI.getCardValue('cpNumSimulacaoItensTi')),
                "tipoCotacao": parseInt(hAPI.getCardValue('cpTipoCotacaoItensTi')),
                "totalCotacao": parseFloat(hAPI.getCardValue('cpTotalPedido').replace('.', '').replace(',', '.')).toFixed(4),
                "usuario": "prouau"
            }
        ]
    }

    return json_request;
}

/**
 * [createJSONAprovDemaisCompras description]
 * @return {json} [description]
 */
function createJSONAprovDemaisCompras(){
    var dados_pedido = getPedido();
    var json_request = {
        "listaConfirmarAprovacaoCotacao": [
            {
                "empresa": parseInt(dados_pedido.COD_EMPRESA),
                "obra": new String(dados_pedido.COD_OBRA),
                "NumCotacao": parseInt(hAPI.getCardValue('cpNumeroCotacao')),
                "numSimulacao": parseInt(hAPI.getCardValue('cpNumSimulacaoDemaisCompras')),
                "tipoCotacao": parseInt(hAPI.getCardValue('cpTipoCotacaoDemaisCompras')),
                "totalCotacao": parseFloat(hAPI.getCardValue('cpTotalPedido').replace('.', '').replace(',', '.')).toFixed(4),
                "usuario": "prouau"
            }
        ]
    }

    return json_request;
}
