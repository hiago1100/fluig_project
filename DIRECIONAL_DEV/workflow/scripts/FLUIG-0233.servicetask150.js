function servicetask150(attempt, message) {
    var msg_erro = '';

    try {
        execAprovacaoFornecedorUAU();
    }
    catch (erro) {
        hAPI.setCardValue('cpStatus150', 'ERRO');

        msg_erro += '' +
        '<br><b style="color: #FF0000"><i class="flaticon flaticon-alert icon-sm"></i> OCORREU UM ERRO NA APROVAÇÃO DO FORNECEDOR!</b><br>' +
        '<span class="text-muted">' + erro + '</span><br>';

        throw msg_erro;
    }
}
