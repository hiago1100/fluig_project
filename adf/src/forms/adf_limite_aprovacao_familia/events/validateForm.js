/*eslint-disable*/
/*jshint -W116 */
function validateForm(form) {
  const Errors = value(form, 'Errors');
  const familia = value(form, 'familia');
  const tipoDocumento = value(form, 'tipoDocumento');

  const limites = getChildren(form, 'limites', ['limiteCodUsuario', 'limiteValorLimite']);

  if (Errors && Errors.length > 0) {
    throw Errors.join('\n');
  }
  if (familia == '') {
    throw 'A família deve ser informada.';
  }
  if (tipoDocumento == '') {
    throw 'O tipo do documento deve ser informado.';
  }

  limites.forEach((limite, index) => {
    if (limite.limiteCodUsuario == '') {
      throw `O usuário deve ser informado na linha ${index + 1}`;
    }
    if (limite.limiteValorLimite == '') {
      throw `O valor limite deve ser informado na linha ${index + 1}`;
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

const isJson = function (str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};
