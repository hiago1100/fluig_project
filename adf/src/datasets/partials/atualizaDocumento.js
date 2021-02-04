function atualizaDocumento(docto, ParamGeral, tbAprovadores) {

  var cardServiceProvider = ServiceManager.getServiceInstance("CardService");
  var cardServiceLocator = cardServiceProvider.instantiate("com.totvs.technology.ecm.dm.ws.ECMCardServiceService");
  var cardService = cardServiceLocator.getCardServicePort();
  var cardFieldDtoArray = cardServiceProvider.instantiate("com.totvs.technology.ecm.dm.ws.CardFieldDtoArray");

  let sequence = 0;
  ['statusIntegracao', 'integrado', 'notifica', 'notificaErro'].forEach((field, index) => {
    let cardField = cardServiceProvider.instantiate("com.totvs.technology.ecm.dm.ws.CardFieldDto");

    log.info(field + ': ' + docto[field] || '');
    cardField.setField(field);
    cardField.setValue(docto[field] || '');
    cardFieldDtoArray.getItem()
      .add(index, cardField);

    sequence++;
  });

  log.info('adicionando campos da tabela');
  for (let i = 0; i < tbAprovadores.rowsCount; i++) {

    log.info('adicionando primeira linha');

    let cf1 = cardServiceProvider.instantiate("com.totvs.technology.ecm.dm.ws.CardFieldDto");
    let cf2 = cardServiceProvider.instantiate("com.totvs.technology.ecm.dm.ws.CardFieldDto");
    let cf3 = cardServiceProvider.instantiate("com.totvs.technology.ecm.dm.ws.CardFieldDto");
    let cf4 = cardServiceProvider.instantiate("com.totvs.technology.ecm.dm.ws.CardFieldDto");

    log.info('campo: aprovadorEmail - ' + tbAprovadores.getValue(i, "aprovadorEmail"));
    log.info('campo: aprovadorStatus - ' + tbAprovadores.getValue(i, "aprovadorStatus"));
    log.info('campo: aprovadorSeq - ' + tbAprovadores.getValue(i, "aprovadorSeq"));
    log.info('campo: aprovadorData - ' + tbAprovadores.getValue(i, "aprovadorData"));
    log.info("aprovadorEmail___" + i);

    cf1.setField("aprovadorEmail___" + (i + 1) );
    cf1.setValue(tbAprovadores.getValue(i, "aprovadorEmail") || '');
    cardFieldDtoArray.getItem()
      .add(sequence, cf1);
    sequence++;

    cf2.setField("aprovadorStatus___" + (i + 1));
    cf2.setValue(tbAprovadores.getValue(i, "aprovadorStatus") || '');
    cardFieldDtoArray.getItem()
      .add(sequence, cf2);
    sequence++;

    cf3.setField("aprovadorSeq___" + (i + 1));
    cf3.setValue(tbAprovadores.getValue(i, "aprovadorSeq") || '');
    cardFieldDtoArray.getItem()
      .add(sequence, cf3);
    sequence++;

    cf4.setField("aprovadorData___" + (i + 1));
    cf4.setValue(tbAprovadores.getValue(i, "aprovadorData") || '');
    cardFieldDtoArray.getItem()
      .add(sequence, cf4);
    sequence++;

    log.info('adicionando primeira linha fim');
  }

  log.info('antes updateCardData');

  cardService.updateCardData(ParamGeral.empresaFluig, ParamGeral.usuarioFluig, ParamGeral.senhaFluig, docto.documentid, cardFieldDtoArray);

  log.info('depois updateCardData');

}
