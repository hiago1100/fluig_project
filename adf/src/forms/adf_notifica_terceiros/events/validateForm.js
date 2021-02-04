/*eslint-disable*/
/*jshint -W116 */
function validateForm(form) {
  const Errors = value(form, 'Errors');
  const tipoDocumento = value(form, 'tipoDocumento');
  const notificados = getChildren(form, 'notificados', ['email']);

  if (Errors && Errors.length > 0) {
    throw Errors.join('\n');
  }
  if (tipoDocumento == '') {
    throw 'O tipo do documento deve ser informado.';
  }
  notificados.forEach((notificado, index) => {
    if (notificado.email == '') {
      throw `O email deve ser informado na linha ${index + 1}`;
    }
  });
}

function value(form, field, def) {
  return isJson(form.getValue(field)) ? JSON.parse(form.getValue(field)) : def || form.getValue(field);
}

function getChildren(form, tablename, inputs) {
  const array = [];
  const indexes = form.getChildrenIndexes(tablename);
  for (let i = 0; i < indexes.length; i++) {
    const obj = {};
    for (let t = 0; t < inputs.length; t++) {
      obj[inputs[t]] = value(form, `${inputs[t]}___${indexes[i]}`);
    }
    array.push(obj);
  }
  return array;
}

function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
