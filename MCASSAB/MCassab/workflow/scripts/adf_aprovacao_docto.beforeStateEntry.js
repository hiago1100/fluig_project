function beforeStateEntry(sequenceId) {

  log.info('>>>>> beforeStateEntry');

  var Params = parametros();

  if (sequenceId == Params.atividades.selecionarAprovadores) {
    try {

      var codProcesso = hAPI.getCardValue('codProcesso');
      var WKNumProces = String(getValue("WKNumProces"));

      log.info('>>>>>>> codProcesso: ' + codProcesso);
      log.info('>>>>>>> WKNumProces: ' + WKNumProces);

      if (!codProcesso || codProcesso == '') {
        log.info('>>>>>>> seta codProcesso ');

        hAPI.setCardValue("codProcesso", WKNumProces);
      }

      var aprovacaoAutomatica = hAPI.getCardValue("aprovacaoAutomatica");

      if (aprovacaoAutomatica == "true") {
        var users = new java.util.ArrayList();
        users.add("System:Auto");

        hAPI.setAutomaticDecision(Params.atividades.aprovarDocumento, users, "Aprovação Automática");
      } else {

        var Aprovadores = getAprovadores();

        if (Aprovadores.length == 0) {
          Aprovadores = atribuiAprovadores();
        }

        if (Aprovadores.length == 0) {
          throw "Não foi possível definir os aprovadores do documento.";
        }

        Aprovadores.forEach(function (aprovador) {

          if (!aprovador || aprovador.email == "") {
            throw "Email não informado ou usuário não encontrado. Código do usuário: " + aprovador.codigo;
          }

          var constraints = new Array(
            DatasetFactory.createConstraint("mail", aprovador.email, aprovador.email, ConstraintType.SHOULD),
            DatasetFactory.createConstraint("colleaguePK.colleagueId", aprovador.codigo, aprovador.codigo, ConstraintType.SHOULD),
            DatasetFactory.createConstraint("login", aprovador.codigo, aprovador.codigo, ConstraintType.SHOULD)
          );

          var dataset = DatasetFactory.getDataset("colleague", null, constraints, null);

          if (!dataset || dataset.rowsCount == 0) {
            throw "Usuário não encontrado com o email informado: " + aprovador.email;
          }

        })

        selecionaAprovadores(Aprovadores);
      }

    } catch (error) {
      log.info(error);
      throw "Não foi possível definir os aprovadores do documento.";
    }

  }
}
