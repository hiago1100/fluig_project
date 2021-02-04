/*eslint-disable*/
/*jshint -W116 */
function inputFields(form) {

  const tipoDocumento = adfService.getTipoDocumento(value(form, 'codTipoDocto'), ['codigo', 'descricao', 'displaykey'])[0];

  const displaykey = 'Tipo Documento: ' + (tipoDocumento.displaykey);

  form.setValue('displaykey', displaykey);
  form.setValue('tipoDocumento', JSON.stringify(tipoDocumento));
  form.setValue('tipoDocumento_input', tipoDocumento.displaykey);

}
