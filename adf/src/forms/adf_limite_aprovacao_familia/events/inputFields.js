/*eslint-disable*/
/*jshint -W116 */
function inputFields(form) {

  const limites = getChildren(form, 'limites', ['limiteCodUsuario']);
  const tipoDocumento = adfService.getTipoDocumento(value(form, 'codTipoDocto'), ['codigo', 'descricao', 'displaykey'])[0];
  const familia = erpService.getFamilia(value(form, 'codFamilia'), ['codigo', 'descricao', 'displaykey'])[0];

  const displaykey = 'Família: ' + (familia.displaykey) + ' | Tipo Documento:' + (tipoDocumento.displaykey);

  form.setValue('displaykey', displaykey);
  form.setValue('tipoDocumento', JSON.stringify(tipoDocumento));
  form.setValue('tipoDocumento_input', tipoDocumento.displaykey);
  form.setValue('familia', JSON.stringify(familia));
  form.setValue('familia_input', familia.displaykey);

  limites.forEach((limite, index) => {
    const usuario = fluigService.getUsuarios(limite.limiteCodUsuario, ['colleagueId', 'colleagueName', 'mail'])[0];

    form.setValue('limiteUsuario___' + index + 1, JSON.stringify(usuario));
    form.setValue('limiteUsuarioInput___' + index + 1, usuario.colleagueName);
  });

}
