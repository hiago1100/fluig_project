function beforeCancelProcess(colleagueId, processId) {

    var atividadeAtual = getValue("WKNumState");

    if ((atividadeAtual == '42') || (atividadeAtual == '44') || (atividadeAtual == '43')) {

        throw "</br><h2><strong>Esta atividade não permite cancelamento!</strong></h2>"
    }

}