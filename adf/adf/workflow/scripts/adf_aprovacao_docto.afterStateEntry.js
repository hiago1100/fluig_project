function afterStateEntry(sequenceId) {

  log.info('>>>>>>>> afterStateEntry, sequenceId: ' + sequenceId);

  var Params = parametros();

  if (sequenceId == Params.atividades.aprovarDocumento || sequenceId == Params.atividades.reprovarDocumento) {

    var aprovado = sequenceId == Params.atividades.aprovarDocumento;
    var currentAprovadorSeq = hAPI.getCardValue("currentAprovadorSeq");
    var lastAprovadorSeq = hAPI.getCardValue("lastAprovadorSeq");

    if (aprovado) {
      if (Number(currentAprovadorSeq) == Number(lastAprovadorSeq)) {
        hAPI.setCardValue("status", 'A');
      }
    } else {
      hAPI.setCardValue("status", 'R');
    }

    var users = new java.util.ArrayList();
    users.add("System:Auto")

    hAPI.setAutomaticDecision(Params.atividades.pendente, users, aprovado ? "Documento Aprovado" : "Documento Reprovado");
  }
}
