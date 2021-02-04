function selecionaCcustos() {
    log.info(">>>>>>>>>>>> selecionaCcustos")
    
    var Geral = JSON.parse(String(hAPI.getCardValue("Geral")).escape());

    var DespesaIds = JSON.parse(String(hAPI.getCardValue("DespesaIds")).escape());
    var Despesas = getChildren("despesa", DespesaIds);

    var CcustoViajante = getParametroCcusto(Geral.viajante.colaborador.ccusto.cod_empresa, null, Geral.viajante.colaborador.ccusto.cod_ccusto);
    var Ccustos = [];

    if (!CcustoViajante || !CcustoViajante.responsavel) {
        throw "Responsável do centro de custo não parametrizado: " + Geral.viajante.colaborador.ccusto.displayKey;
    }

    Geral.gestorCcustoViajante = CcustoViajante.responsavel.colleagueId;

    Despesas.forEach(function (despesa, i) {

        var Ccusto = getParametroCcusto(despesa.ccusto.cod_empresa, despesa.ccusto.cod_plano_ccusto, despesa.ccusto.cod_ccusto);
        if (!Ccusto) {
            throw "Centro de custo não parametrizado: " + despesa.ccusto.displayKey;
        }

        var i = Ccustos.map(function (x) {
            return x.cod_empresa + "-" + x.cod_ccusto;
        }).indexOf(despesa.ccusto.cod_empresa + "-" + despesa.ccusto.cod_ccusto);

        if (i < 0) {
            Ccusto.valorTotal = 0;
            Ccustos.unshift(Ccusto);
            i = 0;
        }

        Ccustos[i].valorTotal = Ccustos[i].valorTotal + despesa.valorTotal;


    });

    Ccustos.forEach(function (ccusto, i) {

        var aprovadorGeral = null;

        ccusto.Aprovadores.forEach(function (aprovador, i) {

            //ccusto.aprovador = null;

            if (!aprovador.estabelecimentos || aprovador.estabelecimentos == "") {
                if (aprovador.usuario.colleagueId == Geral.viajante.colleagueId ||
                    (aprovador.limite != 0 && ccusto.valorTotal > aprovador.limite)) {
                    aprovadorGeral = ccusto.responsavel;
                } else {
                    aprovadorGeral = aprovador.usuario;
                }

            } else {

                aprovador.estabelecimentos.forEach(function (estabelecimento) {

                    if (estabelecimento.cod_empresa == Geral.estabelecimento.cod_empresa &&
                        estabelecimento.cod_estab == Geral.estabelecimento.cod_estab) {

                        if (aprovador.usuario.colleagueId == Geral.viajante.colleagueId ||
                            (aprovador.limite != 0 && ccusto.valorTotal > aprovador.limite)) {
                            ccusto.aprovador = ccusto.responsavel;
                        } else {
                            ccusto.aprovador = aprovador.usuario;

                        }
                    }
                })
            }
        })

        ccusto.Aprovadores = null;

        if (!ccusto.aprovador) ccusto.aprovador = aprovadorGeral;

        if (!ccusto.aprovador) {
            throw "Não foi encontrado aprovador para o centro de custo: " + ccusto.displayKey + " e estabelecimento: " + Geral.estabelecimento.nom_pessoa;
        }

        Ccustos[i] = ccusto;
        // var childData = new java.util.HashMap();
        // childData.put("ccusto", JSON.stringify(ccusto));
        // hAPI.addCardChild("Ccustos", childData);
    })

    hAPI.setCardValue("Ccustos", JSON.stringify(Ccustos));
    hAPI.setCardValue("Geral", JSON.stringify(Geral));
    hAPI.setCardValue("gestorCcustoViajante", Geral.gestorCcustoViajante);
}