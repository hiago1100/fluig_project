function beforeTaskSave(colleagueId, nextSequenceId, userList) {

    log.info(">>>>>>> beforeTaskSave");

    var atividade = getValue("WKNumState");
    var numeroProcessoLog = getValue("WKNumProces");
    if (atividade == 1 || atividade == 5) {
        selecionaCcustos();
    }

    /*
    if (atividade == 1 || atividade == 5 || nextSequenceId == 7) {
        integraTitulo(nextSequenceId == 7 ? "S" : "N");
    }
    */
    if (nextSequenceId == 7) {
        integraTitulo(nextSequenceId == 7 ? "S" : "N");
        log.info("Solicitacao: " + numeroProcessoLog + " chamou o programa CriaTituloAPB");
    }
}

String.prototype.escape = function () {
    return this.replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t");
}

Date.prototype.addDays = function (days) {
    var result = this;
    result.setDate(result.getDate() + days);
    return result;
}


Date.prototype.toProgress = function () {
    var dd = this.getDate();
    var mm = this.getMonth() + 1; //January is 0!

    var yyyy = this.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    return dd + '/' + mm + '/' + yyyy;
}

String.prototype.toNumberProgress = function () {
    return this.replace(".",",");
}