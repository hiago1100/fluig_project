/*eslint-disable*/
/*jshint -W116 */
function validateForm(form) {
  const Errors = value(form, 'Errors');
  const estabelecimento = value(form, 'estabelecimento');
  const familia = value(form, 'familia');

  const aprovadores = getChildren(form, 'aprovadores', ['aprovadorSeq', 'aprovadorCodUsuario']);

  if (Errors && Errors.length > 0) {
    throw Errors.join('\n');
  }
  if (estabelecimento == '') {
    throw 'O estabelecimento deve ser informado.';
  }
  if (familia == '') {
    throw 'A família deve ser informada.';
  }

  aprovadores.forEach((aprovador, index) => {
    if (aprovador.aprovadorSeq == '') {
      throw `A sequência do aprovador deve ser informada na linha ${index + 1}`;
    }
    if (aprovador.aprovadorCodUsuario == '') {
      throw `O aprovador deve ser informado na linha ${index + 1}`;
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
