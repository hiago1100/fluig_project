/*eslint-disable*/
/*jshint -W116 */
function inputFields(form) {

  // const codTipoAprovacao = value(form, 'codTipoAprovacao');
  const childrenReferencias = [{
    name: 'referencias',
    fields: ['referenciaCodigo', 'referenciaDescricao']
  }];

  const aprovadores = getChildren(form, 'aprovadores', ['aprovadorCodUsuario']);
  const tipoDocumento = adfService.getTipoDocumento(value(form, 'codTipoDocto'), ['codigo', 'descricao', 'displaykey'])[0];
  const estabelecimento = erpService.getEstabelecimento(value(form, 'codEstab'), ['codigo', 'descricao', 'displaykey'])[0];
  const referencias = adfService.getReferencias(tipoDocumento.codigo, ['displaykey'], vm.childrenReferencias)[0];
  const referencia = referencias.filter(referencia => referencia.referenciaCodigo == value(form, 'codReferencia'))[0];

  const displaykey = 'Estab:: ' + (estabelecimento.displaykey) + ' | Lotação: ' + (lotacao.displaykey) + ' | Tipo Documento: ' + (tipoDocumento.displaykey) + ' | Faixa: ' + (faixa.faixaCodigo);

  form.setValue('displaykey', displaykey);
  form.setValue('tipoDocumento', JSON.stringify(tipoDocumento));
  form.setValue('tipoDocumento_input', tipoDocumento.displaykey);
  form.setValue('estabelecimento', JSON.stringify(estabelecimento));
  form.setValue('estabelecimento_input', estabelecimento.displaykey);
  form.setValue('referencia', JSON.stringify(referencia));
  form.setValue('referencia_input', referencia.displaykey);

  aprovadores.forEach((aprovador, index) => {
    const usuario = fluigService.getUsuarios(aprovador.aprovadorCodUsuario, ['colleagueId', 'colleagueName', 'mail'])[0];

    form.setValue('aprovadorUsuario___' + index + 1, JSON.stringify(usuario));
    form.setValue('aprovadorUsuarioInput___' + index + 1, usuario.colleagueName);
  });

}