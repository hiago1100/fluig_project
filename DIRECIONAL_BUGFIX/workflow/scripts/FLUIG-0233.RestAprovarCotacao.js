function AprovarConfirmacaoCotacaoPorObra(token, tabela) {

    token = token.replace('"', '');
    var clientService = fluigAPI.getAuthorizeClientService();
    var data =
    {
        companyId: getValue("WKCompany") + '',
        serviceCode: "UAU_AprovarConfirmacaoCotacaoPorObra",
        endpoint: "/api/v1.0/Cotacao/AprovarConfirmacaoCotacaoPorObra",
        method: "post",
        timeoutService: "100",
        params: {
            "listaConfirmarAprovacaoCotacao": [
                {
                    "empresa": '' + getPedido().COD_EMPRESA + '',
                    "obra": '' + getPedido().COD_OBRA + '',
                    "NumCotacao": '' + hAPI.getCardValue('cpNumeroCotacao') + '',
                    "numSimulacao": '' + hAPI.getCardValue('cpNumSimulacao' + tabela) + '',
                    "tipoCotacao": '' + hAPI.getCardValue('cpTipoCotacao' + tabela) + '',
                    "totalCotacao": '' + hAPI.getCardValue('cpTotalPedido').replace('.', '').replace(',', '.') + '',
                    "usuario": "prouau"
                }
            ]
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

    var vo = clientService.invoke(JSON.stringify(data));

    if (vo.getResult() == null || vo.getResult().isEmpty()) {
        hAPI.setCardValue('cpStatus150', 'ERRO')
        throw new Erro("Retorno está vazio");
    }
    if (vo.getHttpStatusResult() != 200) {
        hAPI.setCardValue('cpStatus150', 'ERRO')
        var msgErro = vo.getResult()
        throw msgErro;
    }

}