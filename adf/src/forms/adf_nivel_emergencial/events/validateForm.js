/*eslint-disable*/
/*jshint -W116 */
function validateForm(form) {
  const Errors = value(form, 'Errors');
  const tipoDocumento = value(form, 'tipoDocumento');
  const estabelecimento = value(form, 'estabelecimento');
  const niveis = getChildren(form, 'niveis', ['nivel', 'tempo']);

  if (Errors && Errors.length > 0) {
    throw Errors.join('\n');
  }
  if (tipoDocumento == '') {
    throw 'O tipo do documento deve ser informado.';
  }
  if (estabelecimento == '') {
    throw 'O estabelecimento deve ser informado.';
  }

  if (niveis.length == 0) {
    throw 'Os níveis emergenciais devem ser informados';
  }

  niveis.forEach((nivel, index) => {
    if (nivel.nivel == '') {
      throw `O nível deve ser informado na linha ${index + 1}`;
    }
    if (nivel.tempo == '') {
      throw `O tempo deve ser informado na linha ${index + 1}`;
    }

    if (Number(nivel.tempo.split(':')[1]) > 0) {
      throw `O tempo deve ser informado em horas exatas. Linha: ${String(index + 1)}`;
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
