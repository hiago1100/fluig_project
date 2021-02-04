function atribuiAprovadores() {

  var Params = parametros();

  var Aprovadores = [];

  var valor = String(hAPI.getCardValue("valor"));
  var codLotacao = String(hAPI.getCardValue("codLotacao"));
  var codTipoDocto = String(hAPI.getCardValue("codTipoDocto"));
  var codEmpresa = String(hAPI.getCardValue("codEmpresa"));
  var codEstab = String(hAPI.getCardValue("codEstab"));
  var codItem = String(hAPI.getCardValue("codItem"));
  var codFamilia = String(hAPI.getCardValue("codFamilia"));
  var codReferencia = String(hAPI.getCardValue("codReferencia"));

  var consGetAprovadores = new Array(
    DatasetFactory.createConstraint("valor", valor, valor, ConstraintType.MUST),
    DatasetFactory.createConstraint("lotacao", codLotacao, codLotacao, ConstraintType.MUST),
    DatasetFactory.createConstraint("tipDoc", codTipoDocto, codTipoDocto, ConstraintType.MUST),
    DatasetFactory.createConstraint("epCodigo", codEmpresa, codEmpresa, ConstraintType.MUST),
    DatasetFactory.createConstraint("codEstab", codEstab, codEstab, ConstraintType.MUST),
    DatasetFactory.createConstraint("codItem", codItem, codItem, ConstraintType.MUST),
    DatasetFactory.createConstraint("codFamilia", codFamilia, codFamilia, ConstraintType.MUST),
    DatasetFactory.createConstraint("codReferencia", codReferencia, codReferencia, ConstraintType.MUST)
  );

  var aprovadores = DatasetFactory.getDataset("adf_get_aprovadores", null, consGetAprovadores, null);
  var lastAprovadorSeq = 0;

  log.info('>>>>>> aprovadores.rowsCount: ' + aprovadores.rowsCount);

  if (!aprovadores || aprovadores.rowsCount == 0) {
    //return "Aprovadores não encontrados.";
  } else {
    for (var i = 0; i < aprovadores.rowsCount; i++) {

      log.info('>>>>>> aprovadores i: ' + i);

      var aprovadorCodigo = String(aprovadores.getValue(i, "usuario"));
      var aprovadorSeq = String(aprovadores.getValue(i, "sequencia"));
      var aprovadorQtdMinima = String(aprovadores.getValue(i, "qtdMinima"));
      var aprovadorEmail = "";
      var colleagueId = 0;

      lastAprovadorSeq = aprovadorSeq;

      var consColleague = new Array(DatasetFactory.createConstraint("login", aprovadorCodigo, aprovadorCodigo, ConstraintType.MUST));

      var colleague = DatasetFactory.getDataset("colleague", null, consColleague, null);

      if (colleague && colleague.rowsCount > 0) {
        aprovadorEmail = colleague.getValue(0, "mail");
        colleagueId = colleague.getValue(0, "colleaguePK.colleagueId");
      } else {
        consColleague = new Array(DatasetFactory.createConstraint("colleaguePK.colleagueId", aprovadorCodigo, aprovadorCodigo, ConstraintType.MUST));

        colleague = DatasetFactory.getDataset("colleague", null, consColleague, null);

        if (colleague && colleague.rowsCount > 0) {
          aprovadorEmail = colleague.getValue(0, "mail");
          colleagueId = colleague.getValue(0, "colleaguePK.colleagueId");
        }
      }

      log.info("adicionou: " + aprovadorEmail + " / " + aprovadorCodigo);

      var childData = new java.util.HashMap();
      log.info("aprovadorEmail: " + String(aprovadorEmail));
      childData.put("aprovadorEmail", String(aprovadorEmail));
      log.info("colleagueId: " + String(colleagueId));
      childData.put("aprovadorCodigo", String(colleagueId));
      log.info("aprovadorSeq: " + String(aprovadorSeq));
      childData.put("aprovadorSeq", String(aprovadorSeq));
      log.info("aprovadorQtdMinima: " + String(aprovadorQtdMinima));
      childData.put("aprovadorQtdMinima", String(aprovadorQtdMinima));

      hAPI.addCardChild("tabelaAprovadores", childData);

      Aprovadores.push({
        "i": i + 1,
        "email": aprovadorEmail,
        "codigo": colleagueId,
        "qtdMinima": aprovadorQtdMinima,
        "seq": aprovadorSeq
      })

    }
  }

  hAPI.setCardValue("lastAprovadorSeq", lastAprovadorSeq);

  var users = new java.util.ArrayList();
  users.add("System:Auto")

  hAPI.setAutomaticDecision(Params.atividades.selecionarAprovadores, users, "Selecionar Aprovadores");

  return Aprovadores;

}
