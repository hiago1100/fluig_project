function calculateAgreement(currentState, agreementData) {
  //Implementation here

  var Params = parametros();
  var Aprovadores = getAprovadores();

  var currentAprovadorSeq = String(hAPI.getCardValue("currentAprovadorSeq"));

  var aprovados = 0;
  var reprovados = 0;
  var aprovadorQtdMinima = 0;
  var aprovadorTotal = 0;
  var comStatus = 0;

  Aprovadores.forEach(function (aprovador) {
    if (Number(aprovador.seq) == Number(currentAprovadorSeq)) {
      if (aprovador.status && aprovador.status != '') {
        if (aprovador.status == 'R') {
          reprovados++;
        } else {
          if (aprovador.status == 'A') {
            aprovados++;
          }
        }
        comStatus++;
      }
      aprovadorQtdMinima = Number(aprovador.qtdMinima);
      aprovadorTotal++;
    }
  })

  if (aprovadorQtdMinima == 0 || !aprovadorQtdMinima || aprovadorQtdMinima > aprovadorTotal) {
    aprovadorQtdMinima = aprovadorTotal;
  }

  log.info('>>>> reprovados: ' + reprovados);
  log.info('>>>> aprovados: ' + aprovados);
  log.info('>>>> aprovadorQtdMinima: ' + aprovadorQtdMinima);
  log.info('>>>> comStatus: ' + comStatus);
  log.info('>>>> aprovadorTotal: ' + aprovadorTotal);

  // Se já atingiu a quantidade mínima de aprovações, 
  // ou se a quantidade que resta nao alcançar a quantidade mínima
  if (aprovados >= aprovadorQtdMinima || aprovadorTotal - comStatus + aprovados < aprovadorQtdMinima) {
    var users = new java.util.ArrayList();
    users.add("System:Auto");

    agreementData.put("currentPercentage", 100);
    agreementData.put("currentDestState", aprovados >= aprovadorQtdMinima ? Params.atividades.aprovarDocumento : Params.atividades.reprovarDocumento);
    agreementData.put("currentDestUsers", "System:Auto");
  }
}
