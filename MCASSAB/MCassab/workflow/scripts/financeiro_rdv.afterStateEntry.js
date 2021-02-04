
function afterStateEntry(sequenceId) {

    log.info(">>>>>>>>> afterStateEntry " + sequenceId);

    if (sequenceId == 35) {
        selecionaAprovadores();
    }

    if (sequenceId == 7) {

        var users = new java.util.ArrayList();

        var Integracao = JSON.parse(String(hAPI.getCardValue("Integracao")).escape());

        if (Integracao.ttErro && Integracao.ttErro.length > 0) {
            users.add("Pool:Role:RevisaoRDV");
            hAPI.setAutomaticDecision(9, users, "Criação do título");
        } else {
            
            users.add("Pool:Role:RespFinanceiro");
            hAPI.setAutomaticDecision(10, users, "Criação do título");
        }
    }

    if (sequenceId == 10) {
        criaWorkflowDespesa();
    }
}

String.prototype.escape = function () {
    return this.replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t");
}