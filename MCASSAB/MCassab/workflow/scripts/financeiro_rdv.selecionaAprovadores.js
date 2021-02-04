function selecionaAprovadores() {

    log.info(">>>>>>>>>>> selecionaAprovadores");

    var Ccustos = JSON.parse(String(hAPI.getCardValue("Ccustos")).escape());
    var DespesaIds = JSON.parse(String(hAPI.getCardValue("DespesaIds")).escape());
    var Despesas = getChildren("despesa", DespesaIds);
    var aprovadores = new java.util.ArrayList();
    var aprovadoresArray = [];

    Despesas.forEach(function (despesa, index) {

        if (despesa.status == "R") {
            despesa.status = null;
            despesa.done = false;
        } else {
            if (despesa.status == "A") {
                despesa.done = true;
            }
        }

        var i = Ccustos.map(function (x) {
            return x.cod_empresa + "-" + x.cod_ccusto;
        }).indexOf(despesa.ccusto.cod_empresa + "-" + despesa.ccusto.cod_ccusto);

        if (!despesa.status && !Ccustos[i].done) {

            Ccustos[i].done = true;

            var a = aprovadoresArray.map(function (x) {
                return x.colleagueId;
            }).indexOf(Ccustos[i].aprovador.colleagueId);

            if (a < 0) {
                aprovadoresArray.push(Ccustos[i].aprovador);
                aprovadores.add(Ccustos[i].aprovador.colleagueId.toString());
            }
        }

        Despesas[index] = despesa;

        hAPI.setCardValue("despesa___" + String(despesa.fluigId), JSON.stringify(despesa));


    })

    if (aprovadores.size() > 0) {
        hAPI.setAutomaticDecision(2, aprovadores, "Solicitação liberada para aprovação");
    } else {
        aprovadores.add("System:Auto")
        hAPI.setAutomaticDecision(3, aprovadores, "Solicitação sem pendência de aprovações");
    }

}