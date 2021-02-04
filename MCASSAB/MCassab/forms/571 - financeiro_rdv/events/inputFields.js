function inputFields(form) {

    fillChildren(form, "Despesas", "despesa", "DespesaIds");
    //fillChildren(form, "Ccustos", "ccusto");

}

function fillChildren(form, tablename, input, inputIds) {
    var array = JSON.parse(form.getValue(tablename));
    var ids = [];

    array.forEach(function (o, index) {
        var fluigId = o.fluigId;
        o.fluigId = index + 1;
        ids.push(o.fluigId);
        form.setValue(input + "___" + String(fluigId), JSON.stringify(o));
    })

    form.setValue(tablename, "");
    form.setValue(inputIds, JSON.stringify(ids));
}