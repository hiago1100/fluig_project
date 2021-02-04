function beforeTaskSave(colleagueId,nextSequenceId,userList){
    
    var atividadeAtual = getValue("WKNumState");
    var tipoMaoObra = hAPI.getCardValue("cpMaoDeObra");
    
    if (atividadeAtual == 105 || atividadeAtual == 111 || atividadeAtual == 3 || atividadeAtual == 85) {
        if (hAPI.listAttachments() == "[]") {
            throw "Favor anexar o comprovante!";
        }
    }
}