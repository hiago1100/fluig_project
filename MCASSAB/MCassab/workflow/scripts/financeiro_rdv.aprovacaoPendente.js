function aprovacaoPendente(){

    log.info(">>>>>>>>> aprovacaoPendente");
    
    var DespesaIds = JSON.parse(String(hAPI.getCardValue("DespesaIds")).escape());
    var Despesas = getChildren("despesa", DespesaIds);

    var aprovacaoPendente = false;

    Despesas.forEach(function (despesa, i) {
        if (!despesa.status) {
            aprovacaoPendente = true;
        }
    })

    return aprovacaoPendente;
}

// Função para remover quebras de linha
String.prototype.escape = function () {
    return this.replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t");
}