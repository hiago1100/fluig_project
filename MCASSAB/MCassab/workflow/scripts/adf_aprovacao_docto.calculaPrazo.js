function calculaPrazo(colleagueId) {

  var prazoPadrao = 0;
  var prazo = 0;
  var prazoInformado = "";
  var codTipoDocto = hAPI.getCardValue("codTipoDocto");
  var processo = getValue("WKNumProces");

  var constraintsTipoDocto = new Array(DatasetFactory.createConstraint("codigo", codTipoDocto, codTipoDocto, ConstraintType.MUST));

  var tipoDocto = DatasetFactory.getDataset("adf_tipo_documento", null, constraintsTipoDocto, null);

  if (tipoDocto) {
    prazoPadrao = Number(tipoDocto.getValue(0, "prazoPadrao"));
  }

  if (hAPI.getCardValue("prazo") != "") {
    
    // prazoInformado = Date.parse(String(hAPI.getCardValue("prazo")));
    // prazoInformado = new Date(String(hAPI.getCardValue("prazo")));
    var arrPrazoInformado = hAPI.getCardValue("prazo")
      .split("T")[0].split("-");

    prazoInformado = new Date();
    prazoInformado.setDate(arrPrazoInformado[2]);
    prazoInformado.setMonth(arrPrazoInformado[1] - 1);
    prazoInformado.setFullYear(arrPrazoInformado[0]);

    var segundos = prazoInformado.getSeconds() + (prazoInformado.getMinutes() * 60) + (prazoInformado.getHours() * 3600);

    hAPI.setDueDate(processo, 0, colleagueId, prazoInformado, segundos);

  } else {

    if (hAPI.getCardValue("nivelEmergencial") != "") {

      var nivelEmergencial = hAPI.getCardValue("nivelEmergencial");

      var tempo = "";

      var constraints = new Array(DatasetFactory.createConstraint("codTipoDocto", codTipoDocto, codTipoDocto, ConstraintType.MUST));

      var dataset = DatasetFactory.getDataset("adf_nivel_emergencial", null, constraints, null);

      if (dataset) {
        for (var i = 0; i < dataset.rowsCount; i++) {
          var documentId = dataset.getValue(i, "metadata#id");
          var documentVersion = dataset.getValue(i, "metadata#version");

          //Cria as constraints para buscar os campos filhos, passando o tablename, número da formulário e versão
          var c1 = DatasetFactory.createConstraint("tablename", "niveis", "niveis", ConstraintType.MUST);
          var c2 = DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST);
          var c3 = DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST);
          var constraintsFilhos = new Array(c1, c2, c3);

          //Busca o dataset
          var datasetFilhos = DatasetFactory.getDataset("adf_nivel_emergencial", null, constraintsFilhos, null);

          for (var j = 0; j < datasetFilhos.rowsCount; j++) {
            var nivel = JSON.parse(datasetFilhos.getValue(j, "nivel"));
            if (Number(nivel.codigo) == Number(nivelEmergencial)) {
              tempo = datasetFilhos.getValue(j, "tempo");
            }
          }
        }

        if (tempo != "") {
          prazo = (Number(tempo.split(":")[0])) + (Number(tempo.split(":")[1] / 60));
        }
      }
    } else {
      prazo = prazoPadrao;
    }

    if (prazo != 0) {

      var hoje = new Date();
      var hojeSeconds = hoje.getSeconds() + (hoje.getMinutes() * 60) + (hoje.getHours() * 3600);

      var obj = hAPI.calculateDeadLineHours(hoje, hojeSeconds, prazo, "Default");
      var dt = obj[0];
      var segundos = obj[1];

      hAPI.setDueDate(processo, 0, colleagueId, dt, segundos);
    }
  }

}
