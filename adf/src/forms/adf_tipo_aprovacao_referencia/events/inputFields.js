/*eslint-disable*/
/*jshint -W116 */
function inputFields(form) {

  const tipos = getChildren(form, 'tipos', ['tipoCodTipoAprovacao']);
  const tipoDocumento = adfService.getTipoDocumento(value(form, 'codTipoDocto'), ['codigo', 'descricao', 'displaykey'])[0];
  const referencias = adfService.getReferencias(tipoDocumento.codigo, ['displaykey'], vm.childrenReferencias)[0];
  const referencia = referencias.filter(referencia => referencia.referenciaCodigo == value(form, 'codReferencia'))[0];

  const displaykey = 'Tipo Documento: ' + (tipoDocumento.displaykey) + ' | Referência: ' + (referencia.referenciaDescricao);

  form.setValue('displaykey', displaykey);
  form.setValue('tipoDocumento', JSON.stringify(tipoDocumento));
  form.setValue('tipoDocumento_input', tipoDocumento.displaykey);

  tipos.forEach((childTipo, index) => {
    const tipo = adfService.getTipoAprovacao(childTipo.tipoCodTipoAprovacao, ['codigo', 'descricao', 'displaykey'])[0];

    form.setValue('tipoTipoAprovacao___' + index + 1, JSON.stringify(tipo));
    form.setValue('tipoTipoAprovacao_input' + index + 1, tipo.colleagueName);
  });

}
