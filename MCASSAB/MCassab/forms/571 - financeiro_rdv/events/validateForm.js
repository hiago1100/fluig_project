function validateForm(form) {

    var Params = value(form, "Params");
    var Geral = value(form, "Geral");
    var Integracao = value(form, "Integracao");
    var Despesas = getChildren(form, "Despesas", "despesa");

    switch (Params.etapa) {
        case "inicio":
            validaLimiteDespesas(Despesas);

            break;
        case "aprovarDespesasCcusto":

            break;
        case "revisarSolicitacao":
            validaLimiteDespesas(Despesas);
            break;
        case "aprovarDespesasGestor":

            break;
        case "criarTituloPagamento":

            break;
        case "analisarErrosIntegracao":

            break;
        case "efetuarReembolso":

            break;
        case "baixarTitulo":

            break;

    }
}

function validaLimiteDespesas(Despesas) {
    var linha;
    Despesas.forEach(function (despesa, i) {
        linha = Despesas.length - i;

        if (!despesa.item) {
            throw "Despesa não informada na linha " + (linha).toString();
        }

        if (!despesa.ccusto) {
            throw "Centro de custo não informado na linha " + (linha).toString();
        }

        if (!despesa.valorTotal || despesa.valorTotal == 0) {
            throw "Valor não informado na linha " + (linha).toString();
        }

        if (despesa.item.valorLimite > 0 && despesa.valorTotal > despesa.item.valorLimite) {    
            throw "Valor da despesa " + despesa.item.descricao + " na linha " + (linha).toString() +  " maior que o limite";
        }

        if (!despesa.obs || despesa.obs == "") {
            throw "Observação não informada na linha " + (linha).toString();
        }

    });

}

function value(form, field, def) {
    return form.getValue(field) && form.getValue(field) != '' ? JSON.parse(form.getValue(field)) : def ? def : {};
}

function getChildren(form, tablename, input) {
    var array = [];
    var indexes = form.getChildrenIndexes(tablename);
    for (var i = 0; i < indexes.length; i++) {
        array.push(value(form, input + "___" + indexes[i]));
    }
    return array;
}