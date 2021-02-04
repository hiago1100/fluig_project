/*eslint-disable*/
/*jshint -W116 */
function validateForm(form) {
  const Errors = value(form, 'Errors');
  const codigo = value(form, 'codigo');
  const descricao = value(form, 'descricao');

  if (Errors && Errors.length > 0) {
    throw Errors.join('\n');
  }
  if (codigo == '') {
    throw 'O código da lotação deve ser informado.';
  }
  if (descricao == '') {
    throw 'A descrição da lotação deve ser informada.';
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
