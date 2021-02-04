/*eslint-disable*/
/*jshint -W116 */
function validateForm(form) {
  const Errors = value(form, 'Errors');
  const usuario = value(form, 'usuario');
  const estabelecimento = value(form, 'estabelecimento');

  const permissoes = getChildren(form, 'permissoes', ['permissaoCodTipoDocto', 'permissaoValorLimite', 'permissaoDataInicial', 'permissaoDataFinal']);

  if (Errors && Errors.length > 0) {
    throw Errors.join('\n');
  }
  if (usuario == '') {
    throw 'O usuário deve ser informado.';
  }
  if (estabelecimento == '') {
    throw 'O estabelecimento deve ser informado.';
  }

  permissoes.forEach((permissao, index) => {
    if (permissao.permissaoCodTipoDocto == '') {
      throw `O tipo do documento deve ser informado na linha ${index + 1}`;
    }
    if (permissao.permissaoValorLimite == '') {
      throw `O valor limite deve ser informado na linha ${index + 1}`;
    }
    if (permissao.permissaoDataInicial == '') {
      throw `A data inicial da permissão deve ser informada na linha ${index + 1}`;
    }
    if (permissao.permissaoDataFinal != '') {
      if (new Date(permissao.permissaoDataFinal) < new Date(permissao.permissaoDataInicial)) { throw `A data final da permissão deve ser menor que a data inicial na linha ${index + 1}`; }
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
