function displayFields(form, customHTML) {

    var Params = {};
    Params.formMode = String(form.getFormMode());
    Params.edit = Params.formMode == "ADD" || Params.formMode == "MOD";
    Params.numState = String(parseInt(getValue('WKNumState')));
    Params.responsavel = String(getValue('WKUser'));
    Params.substituto = String(getValue('WKReplacement'));
    Params.mobile = form.getMobile();
    Params.numProcess = String(getValue("WKNumProces")) || "0";

    var user = getValue('WKReplacement') != null ? getValue('WKReplacement') : getValue('WKUser');

    switch (parseInt(getValue('WKNumState'))) {
        case 1:
            Params.etapa = "inicio";
            Params.digitacao = true;
            break;
        case 2:
            Params.etapa = "aprovarDespesasCcusto";
            Params.aprovacao = true;
            break;
        case 5:
            Params.etapa = "revisarSolicitacao";
            Params.digitacao = true;
            break;
        case 6:
            Params.etapa = "aprovarDespesasGestor";
            Params.aprovacao = true;
            break;
        case 7:
            Params.etapa = "criarTituloPagamento";
            Params.relatorio = true;
            Params.aprovado = true;
            break;
        case 9:
            Params.etapa = "analisarErrosIntegracao";
            Params.integracao = true;
            Params.relatorio = true;
            Params.aprovado = true;
            break;
        case 10:
            Params.etapa = "efetuarReembolso";
            Params.integracao = true;
            Params.relatorio = true;
            Params.aprovado = true;
            break;
        case 11:
            Params.etapa = "baixarTitulo";
            Params.integracao = true;
            Params.relatorio = true;
            Params.aprovado = true;
            break;
        case 12:
            Params.etapa = "final";
            Params.integracao = true;
            Params.relatorio = true;
            Params.aprovado = true;
            break;

        case 35:
            Params.etapa = "selecionarAprovadores";
            Formulario.relatorio = true;
            break;
        default:
            Params.etapa = "inicio";
            if (Params.edit) {
                Params.digitacao = true;
            } else {
                //Params.relatorio = true;
                Params.integracao = true;
            }
            
            break;
    }

    form.setValue("Params", JSON.stringify(Params));

    form.setShowDisabledFields(true);

    setChildren(form, "Despesas", "despesa");
    //setChildren(form, "Ccustos", "ccusto");
}

function setChildren(form, tablename, input) {
    var array = [];
    var indexes = form.getChildrenIndexes(tablename);
    for (var i = 0; i < indexes.length; i++) {
        array.push(JSON.parse(form.getValue(input + "___" + indexes[i])));
    }
    form.setValue(tablename, JSON.stringify(array));
}