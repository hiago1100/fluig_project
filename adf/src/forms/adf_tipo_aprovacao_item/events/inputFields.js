/*eslint-disable*/
/*jshint -W116 */
function inputFields(form) {

  const tipos = getChildren(form, 'tipos', ['tipoCodTipoAprovacao']);
  const item = erpService.getItem(value(form, 'codItem'), ['codigo', 'descricao', 'displaykey'])[0];

  const displaykey = 'Item: ' + item.displaykey;

  form.setValue('displaykey', displaykey);
  form.setValue('item', JSON.stringify(item));
  form.setValue('item_input', item.displaykey);

  tipos.forEach((childTipo, index) => {
    const tipo = adfService.getTipoAprovacao(childTipo.tipoCodTipoAprovacao, ['codigo', 'descricao', 'displaykey'])[0];

    form.setValue('tipoTipoAprovacao___' + index + 1, JSON.stringify(tipo));
    form.setValue('tipoTipoAprovacao_input' + index + 1, tipo.colleagueName);
  });

}
