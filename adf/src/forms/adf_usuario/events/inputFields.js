/*eslint-disable*/
/*jshint -W116 */
function inputFields(form) {

  const usuario = fluigService.getUsuarios(value(form, 'codUsuario'), ['colleagueId', 'colleagueName', 'mail'])[0];

  const displaykey = 'Usuário: ' + (usuario.colleagueName);

  form.setValue('displaykey', displaykey);
  form.setValue('usuario', JSON.stringify(usuario));
  form.setValue('usuario_input', usuario.displaykey);

}
