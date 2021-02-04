function aprovacaoPendente() {

    var status = hAPI.getCardValue("status");

    return status == 'P' || status == '';
}