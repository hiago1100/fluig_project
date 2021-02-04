/*eslint-disable*/
/*jshint -W116 */
function inputFields(form) {

  const tipoDocumento = adfService.getTipoDocumento(value(form, 'codTipoDocto'), ['codigo', 'descricao', 'displaykey'])[0];
  const estabelecimento = erpService.getEstabelecimento(value(form, 'codEstab'), ['codigo', 'descricao', 'displaykey'])[0];
  const lotacao = adfService.getLotacao(value(form, 'codLotacao'), ['codigo', 'descricao', 'displaykey'])[0];

  const displaykey = 'Estab: ' + (estabelecimento.displaykey) + ' | Lotação: ' + (lotacao.displaykey) + ' | Tipo Documento: ' + (tipoDocumento.displaykey);

  form.setValue('displaykey', displaykey);
  form.setValue('tipoDocumento', JSON.stringify(tipoDocumento));
  form.setValue('tipoDocumento_input', tipoDocumento.displaykey);
  form.setValue('estabelecimento', JSON.stringify(estabelecimento));
  form.setValue('estabelecimento_input', estabelecimento.displaykey);
  form.setValue('lotacao', JSON.stringify(lotacao));
  form.setValue('lotacao_input', lotacao.displaykey);

}
