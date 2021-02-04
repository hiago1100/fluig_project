function solicitacaoAprovada() {

    var DespesaIds = JSON.parse(String(hAPI.getCardValue("DespesaIds")).escape());
    var Despesas = getChildren("despesa", DespesaIds);

    var solicitacaoAprovada = true;

    Despesas.forEach(function (despesa, i) {

        if (despesa.status == 'R') {
            solicitacaoAprovada = false;
        }
    })

    return solicitacaoAprovada;
}