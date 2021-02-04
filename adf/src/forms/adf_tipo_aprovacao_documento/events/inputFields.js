/*eslint-disable*/
/*jshint -W116 */
function inputFields(form) {

  const tipos = getChildren(form, 'tipos', ['tipoCodTipoAprovacao']);
  const tipoDocumento = adfService.getTipoDocumento(value(form, 'codTipoDocto'), ['codigo', 'descricao', 'displaykey'])[0];

  const displaykey = 'Tipo Documento: ' + (tipoDocumento.displaykey);

  form.setValue('displaykey', displaykey);
  form.setValue('tipoDocumento', JSON.stringify(tipoDocumento));
  form.setValue('tipoDocumento_input', tipoDocumento.displaykey);

  tipos.forEach((childTipo, index) => {
    const tipo = adfService.getTipoAprovacao(childTipo.tipoCodTipoAprovacao, ['codigo', 'descricao', 'displaykey'])[0];

    form.setValue('tipoTipoAprovacao___' + index + 1, JSON.stringify(tipo));
    form.setValue('tipoTipoAprovacao_input' + index + 1, tipo.colleagueName);
  });

}
