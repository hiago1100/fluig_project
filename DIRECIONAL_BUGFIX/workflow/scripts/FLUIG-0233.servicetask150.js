function servicetask150(attempt, message) {
    try {
        var tabela;
        var tpCompra = hAPI.getCardValue('tpCompra')
        var hasEstoque = hAPI.getCardValue('cpPossuiEstoque') == '1'
        var tipoSolicitação = hAPI.getCardValue('cpTipoSolicitacao')

        if (!hasEstoque) {
            if (tipoSolicitação == 1) {
                if (tpCompra == 1) tabela = 'ItensTi';
                else tabela = 'DemaisCompras';
            }
            var token = AutenticarUsuarioCorporativo('cpStatus150');
            AprovarConfirmacaoCotacaoPorObra(token, tabela);
        }
    }
    catch (erro) {
        hAPI.setCardValue('cpStatus150', 'ERRO')
        throw 'OCORREU UM ERRO NA INTEGRAÇÃO DO PEDIDO COM O UAU :( ERRO: ' + erro.name + ' - ' + erro.message + ' - ' + erro;
    }
}