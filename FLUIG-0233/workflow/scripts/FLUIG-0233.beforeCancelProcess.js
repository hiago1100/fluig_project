function beforeCancelProcess(colleagueId, processId) {

    var atividadeAtual = getValue("WKNumState");

    if (atividadeAtual == '18' || atividadeAtual == '19' || atividadeAtual == '206' || atividadeAtual == '20' ||
        atividadeAtual == '282' || atividadeAtual == '22' || atividadeAtual == '23' || atividadeAtual == '32' ||
        atividadeAtual == '313') {
        throw "<br/><strong style='color: red'> Processo não pode ser cancelado nesta atividade! </strong>"
    }
}