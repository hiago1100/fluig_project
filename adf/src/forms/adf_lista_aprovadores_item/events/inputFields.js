/*eslint-disable*/
/*jshint -W116 */
function inputFields(form) {

  const aprovadores = getChildren(form, 'aprovadores', ['aprovadorCodUsuario']);
  const item = erpService.getItem(value(form, 'codItem'), ['codigo', 'descricao', 'displaykey'])[0];
  const estabelecimento = erpService.getEstabelecimento(value(form, 'codEstab'), ['codigo', 'descricao', 'displaykey'])[0];

  const displaykey = 'Estab: ' + (estabelecimento.displaykey) + ' | Item: ' + (item.displaykey);

  form.setValue('displaykey', displaykey);
  form.setValue('item', JSON.stringify(item));
  form.setValue('item_input', item.displaykey);
  form.setValue('estabelecimento', JSON.stringify(estabelecimento));
  form.setValue('estabelecimento_input', estabelecimento.displaykey);

  aprovadores.forEach((aprovador, index) => {
    const usuario = fluigService.getUsuarios(aprovador.aprovadorCodUsuario, ['colleagueId', 'colleagueName', 'mail'])[0];

    form.setValue('aprovadorUsuario___' + index + 1, JSON.stringify(usuario));
    form.setValue('aprovadorUsuarioInput___' + index + 1, usuario.colleagueName);
  });

}
