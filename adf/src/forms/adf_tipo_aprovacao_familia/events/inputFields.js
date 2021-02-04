/*eslint-disable*/
/*jshint -W116 */
function inputFields(form) {

  const tipos = getChildren(form, 'tipos', ['tipoCodTipoAprovacao']);
  const familia = erpService.getFamilia(value(form, 'codFamilia'), ['codigo', 'descricao', 'displaykey'])[0];

  const displaykey = 'Família: ' + familia.displaykey;

  form.setValue('displaykey', displaykey);
  form.setValue('familia', JSON.stringify(familia));
  form.setValue('familia_input', familia.displaykey);

  tipos.forEach((childTipo, index) => {
    const tipo = adfService.getTipoAprovacao(childTipo.tipoCodTipoAprovacao, ['codigo', 'descricao', 'displaykey'])[0];

    form.setValue('tipoTipoAprovacao___' + index + 1, JSON.stringify(tipo));
    form.setValue('tipoTipoAprovacao_input' + index + 1, tipo.colleagueName);
  });

}
