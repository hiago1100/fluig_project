/*eslint-disable*/
/*jshint -W116 */
function validateForm(form) {
  const Errors = value(form, 'Errors');
  const tipoAprovacao = value(form, 'tipoAprovacao');

  const aprovadores = getChildren(form, 'aprovadores', ['aprovadorCodUsuario']);

  if (Errors && Errors.length > 0) {
    throw Errors.join('\n');
  }
  if (tipoAprovacao == '') {
    throw 'O tipo de aprovação deve ser informado.';
  }

  aprovadores.forEach((aprovador, index) => {
    if (aprovador.aprovadorCodUsuario == '') {
      throw `O aprovador deve ser informado na linha ${index + 1}`;
    }
  });
}
