/*eslint-disable*/
/*jshint -W116 */
function inputFields(form) {

  const permissoes = getChildren(form, 'permissoes', ['permissaoCodTipoDocto']);
  const usuario = fluigService.getUsuarios(value(form, 'codUsuario'), ['colleagueId', 'colleagueName', 'mail'])[0];
  const estabelecimento = erpService.getEstabelecimento(value(form, 'codEstab'), ['codigo', 'descricao', 'displaykey'])[0];

  const displaykey = 'Usuário: ' + (usuario.colleagueName) + ' | Estab: ' + (estabelecimento.displaykey);

  form.setValue('displaykey', displaykey);
  form.setValue('usuario', JSON.stringify(usuario));
  form.setValue('usuario_input', usuario.displaykey);
  form.setValue('estabelecimento', JSON.stringify(estabelecimento));
  form.setValue('estabelecimento_input', estabelecimento.displaykey);

  permissoes.forEach((permissao, index) => {
    const tipoDocumento = fluigService.getTipoDocumento(permissao.permissaoCodTipoDocto, ['codigo', 'descricao', 'displaykey'])[0];

    form.setValue('permissaoTipoDocumento___' + index + 1, JSON.stringify(tipoDocumento));
    form.setValue('permissaoTipoDocumentoInput___' + index + 1, tipoDocumento.displaykey);
  });

}
