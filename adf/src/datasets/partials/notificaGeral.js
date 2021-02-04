function notificaGeral(ParamGeral, docto, status, detalhes, subject, descricaoEmail, to) {
  const dados = {
    tipoDocto: docto.tipoDocto,
    descricao: docto.descricao,
    empresa: docto.empresa,
    estab: docto.estab,
    valor: docto.valor ? Number(docto.valor).toMoney() : 'Não informado',
    dataRef: docto.dataRef || 'Não informada',
    labelDataRef: docto.labelDataRef || 'Data Referência',
    codProcesso: docto.codProcesso,
    status,
    detalhes,
    descricaoEmail
  };

  try {
    sendCustomEmail({
      companyId: ParamGeral.empresaFluig,
      from: ParamGeral.emailNotifica,
      subject,
      to,
      templateId: 'adf_notifica_geral',
      templateDialect: 'pt_BR',
      templateHtml: 'adf_notifica_geral.html',
      dados
    });

    log.info('*** notificaGeral - EMAIL ENVIADO COM SUCESSO! - ');
  } catch (e) {
    log.error(`*** ADF notificaGeral - ERRO AO ENVIAR EMAIL! ${e}`);
  }

}
