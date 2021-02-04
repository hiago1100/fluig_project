/*eslint-disable*/
/*jshint -W116 */
function inputFields(form) {

  const aprovadores = getChildren(form, 'aprovadores', ['aprovadorCodUsuario']);
  const familia = erpService.getFamilia(value(form, 'codFamilia'), ['codigo', 'descricao', 'displaykey'])[0];
  const estabelecimento = erpService.getEstabelecimento(value(form, 'codEstab'), ['codigo', 'descricao', 'displaykey'])[0];

  const displaykey = 'Estab: ' + (estabelecimento.displaykey) + ' | Família: ' + (familia.displaykey);

  form.setValue('displaykey', displaykey);
  form.setValue('familia', JSON.stringify(familia));
  form.setValue('familia_input', familia.displaykey);
  form.setValue('estabelecimento', JSON.stringify(estabelecimento));
  form.setValue('estabelecimento_input', estabelecimento.displaykey);

  aprovadores.forEach((aprovador, index) => {
    const usuario = fluigService.getUsuarios(aprovador.aprovadorCodUsuario, ['colleagueId', 'colleagueName', 'mail'])[0];

    form.setValue('aprovadorUsuario___' + index + 1, JSON.stringify(usuario));
    form.setValue('aprovadorUsuarioInput___' + index + 1, usuario.colleagueName);
  });

}
