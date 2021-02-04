/*eslint-disable*/
/*jshint -W116 */
function validateForm(form) {
  const Errors = value(form, 'Errors');
  const usuario = value(form, 'usuario');
  const estabelecimento = value(form, 'estabelecimento');
  const lotacao = value(form, 'lotacao');
  const moeda = value(form, 'moeda');

  if (Errors && Errors.length > 0) {
    throw Errors.join('\n');
  }
  if (usuario == '') {
    throw 'O usuário deve ser informado.';
  }
  if (estabelecimento == '') {
    throw 'O estabelecimento deve ser informado.';
  }
  if (lotacao == '') {
    throw 'A lotação deve ser informada.';
  }
  if (moeda == '') {
    throw 'A moeda deve ser informada.';
  }
}

function value(form, field, def) {
  if (!form.getValue(field)) { return def || ''; }

  return isJson(form.getValue(field)) ? JSON.parse(form.getValue(field)) : def || form.getValue(field);
}

function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
