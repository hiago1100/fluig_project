/*eslint-disable*/
/*jshint -W116 */
function inputFields(form) {

  // const codTipoAprovacao = value(form, 'codTipoAprovacao');
  const childrenFaixa = [{
    name: 'faixas',
    fields: ['faixaCodigo', 'faixaDescricao', 'faixaLimiteInicial', 'faixaLimiteFinal']
  }];

  const aprovadores = getChildren(form, 'aprovadores', ['aprovadorCodUsuario']);
  const tipoDocumento = adfService.getTipoDocumento(value(form, 'codTipoDocto'), ['codigo', 'descricao', 'displaykey'])[0];
  const estabelecimento = erpService.getEstabelecimento(value(form, 'codEstab'), ['codigo', 'descricao', 'displaykey'])[0];
  const lotacao = adfService.getLotacao(value(form, 'codLotacao'), ['codigo', 'descricao', 'displaykey'])[0];
  const faixasAprovacao = adfService.getFaixasAprovacao(estabelecimento.codigo, lotacao.codigo, tipoDocumento.codigo, ['displaykey'], childrenFaixa);
  const faixa = faixasAprovacao.filter(faixa => faixa.faixaCodigo == value(form, 'codFaixa'))[0];

  const displaykey = 'Estab:: ' + (estabelecimento.displaykey) + ' | Lotação: ' + (lotacao.displaykey) + ' | Tipo Documento: ' + (tipoDocumento.displaykey) + ' | Faixa: ' + (faixa.faixaCodigo);

  form.setValue('displaykey', displaykey);
  form.setValue('tipoDocumento', JSON.stringify(tipoDocumento));
  form.setValue('tipoDocumento_input', tipoDocumento.displaykey);
  form.setValue('estabelecimento', JSON.stringify(estabelecimento));
  form.setValue('estabelecimento_input', estabelecimento.displaykey);
  form.setValue('lotacao', JSON.stringify(lotacao));
  form.setValue('lotacao_input', lotacao.displaykey);

  aprovadores.forEach((aprovador, index) => {
    const usuario = fluigService.getUsuarios(aprovador.aprovadorCodUsuario, ['colleagueId', 'colleagueName', 'mail'])[0];

    form.setValue('aprovadorUsuario___' + index + 1, JSON.stringify(usuario));
    form.setValue('aprovadorUsuarioInput___' + index + 1, usuario.colleagueName);
  });

}
