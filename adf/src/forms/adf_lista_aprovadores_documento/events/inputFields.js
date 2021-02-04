/*eslint-disable*/
/*jshint -W116 */
function inputFields(form) {

  const aprovadores = getChildren(form, 'aprovadores', ['aprovadorCodUsuario']);
  const tipoDocumento = adfService.getTipoDocumento(value(form, 'codTipoDocto'), ['codigo', 'descricao', 'displaykey'])[0];
  const estabelecimento = erpService.getEstabelecimento(value(form, 'codEstab'), ['codigo', 'descricao', 'displaykey'])[0];
  
  const displaykey = 'Estab: ' + (estabelecimento.displaykey) + ' | Tipo Documento: ' + (tipoDocumento.displaykey);

  form.setValue('displaykey', displaykey);
  form.setValue('tipoDocumento', JSON.stringify(tipoDocumento));
  form.setValue('tipoDocumento_input', tipoDocumento.displaykey);
  form.setValue('estabelecimento', JSON.stringify(estabelecimento));
  form.setValue('estabelecimento_input', estabelecimento.displaykey);
  
  aprovadores.forEach((aprovador, index) => {
    const usuario = fluigService.getUsuarios(aprovador.aprovadorCodUsuario, ['colleagueId', 'colleagueName', 'mail'])[0];

    form.setValue('aprovadorUsuario___' + index + 1, JSON.stringify(usuario));
    form.setValue('aprovadorUsuarioInput___' + index + 1, usuario.colleagueName);
  });

}
