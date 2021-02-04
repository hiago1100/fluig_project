function selecionaAprovadores(Aprovadores) {

  var Params = parametros();
  
  var currentAprovadorSeq = String(hAPI.getCardValue("currentAprovadorSeq"));

  var aprovadorSeq = Number(currentAprovadorSeq) + 1;

  hAPI.setCardValue("currentAprovadorSeq", aprovadorSeq);

  var users = new java.util.ArrayList();

  Aprovadores.forEach(function (aprovador) {
    if (aprovador.seq == aprovadorSeq) {
      users.add(aprovador.codigo);
    }
  });

  //users.add("admin.adf");

  hAPI.setAutomaticDecision(Params.atividades.aprovacaoDocumento, users, "Aprovação de Documento Fluig");
  log.info(users);

  return "OK";

}
