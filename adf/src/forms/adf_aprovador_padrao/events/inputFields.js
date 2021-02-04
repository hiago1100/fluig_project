/*eslint-disable*/
/*jshint -W116 */
function inputFields(form) {

  const codTipoAprovacao = value(form, 'codTipoAprovacao');
  const aprovadores = getChildren(form, 'aprovadores', ['aprovadorCodUsuario']);
  const tipoAprovacao = adfService.getTipoAprovacao(codTipoAprovacao, ['codigo', 'descricao', 'displaykey'])[0];

  const displaykey = 'Tipo Aprovação: ' + (tipoAprovacao.displaykey);

  form.setValue('displaykey', displaykey);
  form.setValue('tipoAprovacao', JSON.stringify(tipoAprovacao));
  form.setValue('tipoAprovacao_input', tipoAprovacao.displaykey);

  aprovadores.forEach((aprovador, index) => {
    const usuario = fluigService.getUsuarios(aprovador.aprovadorCodUsuario, ['colleagueId', 'colleagueName', 'mail'])[0];

    form.setValue('aprovadorUsuario___' + index + 1, JSON.stringify(usuario));
    form.setValue('aprovadorUsuarioInput___' + index + 1, usuario.colleagueName);
  });

}
