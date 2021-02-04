/*eslint-disable*/
/*jshint -W116 */
function validateForm(form) {
  const Errors = value(form, 'Errors');
  const tipoDocumento = value(form, 'tipoDocumento');
  const estabelecimento = value(form, 'estabelecimento');
  const lotacao = value(form, 'lotacao');

  const faixas = getChildren(form, 'faixas', ['faixaCodigo', 'faixaDescricao', 'faixaLimiteInicial', 'faixaLimiteFinal']);

  if (Errors && Errors.length > 0) {
    throw Errors.join('\n');
  }
  if (estabelecimento == '') {
    throw 'O estabelecimento deve ser informado.';
  }
  if (lotacao == '') {
    throw 'A lotação deve ser informada.';
  }
  if (tipoDocumento == '') {
    throw 'O tipo do documento deve ser informado.';
  }
  faixas.forEach((faixa, index) => {
    if (faixa.faixaCodigo == '') {
      throw `O código da faixa deve ser informado na linha ${index + 1}`;
    }
    if (faixa.faixaDescricao == '') {
      throw `A descrição da faixa deve ser informado na linha ${index + 1}`;
    }
    // if (faixa.faixaLimiteInicial == '') {
    //   throw `O limite inicial da faixa deve ser informado na linha ${index + 1}`;
    // }
    if (faixa.faixaLimiteFinal == '') {
      throw `O limite final da faixa deve ser informado na linha ${index + 1}`;
    }

    if (Number(faixa.faixaLimiteFinal) < Number(faixa.faixaLimiteInicial)) {
      throw `O limite final da faixa deve ser maior ou igual ao limite inicial na linha ${index + 1}`;
    }
  });
}

function value(form, field, def) {
  return isJson(form.getValue(field)) ? JSON.parse(form.getValue(field)) : def || form.getValue(field);
}

function getChildren(form, tablename, inputs) {
  const array = [];
  const indexes = form.getChildrenIndexes(tablename);
  if (indexes) { 
    for (let i = 0; i < indexes.length; i++) {
      const obj = {};
      for (let t = 0; t < inputs.length; t++) {
        obj[inputs[t]] = value(form, `${inputs[t]}___${indexes[i]}`);
      }
      array.push(obj);
    }
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
};
