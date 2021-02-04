function buscaApontamentos() {

  log.info('*** buscaApontamentos');

  var receita = getDataset('TIG01-Receitas', null, [{ field: 'codReceita', value: hAPI.getCardValue("codReceita") }])[0];

  log.info(receita);

  if (!receita) {
    return "";
  }

  var etapas = buscaEtapas();
  var processHistory = getDataset('processHistory', null, [{ field: 'processHistoryPK.processInstanceId', value: getValue("WKNumProces") }]);

  var xml = "";

  etapas.forEach(function (etapa) {
    if (receita[etapa.campoCheck] == 'on') {
      var qtdReal = 0;
      var history = processHistory.filter(function (h) {
        return h.stateSequence == etapa.codigo;
      });
      var next;

      history.forEach(function (h) {

        var index = 0;
        processHistory.forEach(function (entry, i) {
          if (entry['processHistoryPK.movementSequence'] == h['processHistoryPK.movementSequence']) {
            index = i;
          }
        });
        log.info('index: ' + index);

        log.info('*** loop history. h.realDateTime: ' + h.realDateTime);
        log.info('*** index: ' + index);

        if (processHistory[index + 1]) {
          log.info('*** processHistory[index + 1]: ' + processHistory[index + 1].realDateTime);
          next = processHistory[index + 1].realDateTime;
        } else {
          log.info('*** new Date: ' + new Date());
          next = new Date();
        }
        log.info('*** loop history. next: ' + next);

        qtdReal += calculaTotalHoras(h.realDateTime.getTime(), next.getTime());

      });

      log.info('*** qtdReal: ' + qtdReal);

      var qtdPrevistaArray = receita[etapa.campoQuantidade].split(":");
      var qtdPrevista = (qtdPrevistaArray[0] * 60) + (qtdPrevistaArray[1] * 1) + (qtdPrevistaArray[2] / 60);

      log.info('*** qtdPrevista: ' + qtdPrevista);

      xml = xml +
        "<RTAPONTAMENTO>" +
        "<SERVICO>" + receita[etapa.campoServico] + "</SERVICO>" +
        "<CODIGOPECA>" + receita[etapa.campoProduto] + "</CODIGOPECA>" +
        "<QUANTIDADE>" + numeroToProtheus(qtdPrevista / 60) + "</QUANTIDADE>" +
        "<QUANTIDADEREAL>" + numeroToProtheus(qtdReal) + "</QUANTIDADEREAL>" +
        "</RTAPONTAMENTO>";
    }
  });

  log.info('*** xml buscaApontamento ' + xml);

  return xml;
}
