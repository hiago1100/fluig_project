/*eslint-disable*/
/*jshint -W116 */
function validateForm(form) {
  const Errors = value(form, 'Errors');
  const usuario = value(form, 'usuario');

  const lotacoes = getChildren(form, 'lotacoes', ['lotacaoCodigo', 'lotacaoDataInicial', 'lotacaoDataFinal']);

  if (Errors && Errors.length > 0) {
    throw Errors.join('\n');
  }
  if (usuario == '') {
    throw 'O usuário deve ser informado.';
  }

  lotacoes.forEach((lotacao, index) => {
    if (lotacao.lotacaoCodigo == '') {
      throw `A lotação deve ser informada na linha ${index + 1}`;
    }
    if (lotacao.lotacaoDataInicial == '') {
      throw `A data inicial da lotação deve ser informada na linha ${index + 1}`;
    }

    if (lotacao.lotacaoDataFinal != '') {
      if (new Date(lotacao.lotacaoDataFinal) < new Date(lotacao.lotacaoDataInicial)) { throw `A data final da lotação deve ser menor que data inicial na linha ${index + 1}`; }
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
