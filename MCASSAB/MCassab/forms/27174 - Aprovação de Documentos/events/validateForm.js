/*eslint-disable*/
/*jshint -W116 */
function validateForm(form) {
  log.info("validateForm adf_aprovadao_docto");
  var Errors = value(form, 'Errors');
  var codTipoDocto = value(form, 'codTipoDocto');
  var codDoctoTemplate = value(form, 'codDoctoTemplate');
  var codEmpresa = value(form, 'codEmpresa');
  var Aprovadores = getChildren(form, 'tabelaAprovadores', ['aprovadorSeq', 'aprovadorEmail']);

  if (codTipoDocto == '') {
    throw 'O tipo do documento deve ser informado.';
  }

  var active = DatasetFactory.createConstraint('metadata#active', true, true, ConstraintType.MUST);
  var constraints = new Array(active, DatasetFactory.createConstraint('codigo', codTipoDocto, codTipoDocto, ConstraintType.MUST));

  var dataset = DatasetFactory.getDataset('adf_tipo_documento', null, constraints, null);

  if (!dataset || dataset.rowsCount == 0) {
    throw 'Tipo de documento ' + codTipoDocto + ' n\xE3o encontrado';
  }

  if (codDoctoTemplate == '') {
    throw 'O código do documento com o template deve ser informado.';
  }
  if (codEmpresa == '') {
    throw 'O código da empresa deve ser informado.';
  }

  // if (Aprovadores.length == 0) {
  //   throw 'Os aprovadores devem ser informados';
  // }

  // Aprovadores.forEach((aprovador, index) => {
  //   if (aprovador.aprovadorSeq == '') {
  //     throw `A sequência deve ser informada para o aprovador. Linha ${index + 1}`;
  //   }

  //   if (aprovador.aprovadorEmail == '') {
  //     throw `O email deve ser informado para o aprovador. Linha ${index + 1}`;
  //   }

  //   const constraints = new Array(DatasetFactory.createConstraint('mail', aprovador.aprovadorEmail, aprovador.aprovadorEmail, ConstraintType.MUST));

  //   const dataset = DatasetFactory.getDataset('colleague', null, constraints, null);

  //   if (!dataset || dataset.rowsCount == 0) {
  //     throw `Usuário não encontrado com o email informado: ${aprovador.aprovadorEmail}`;
  //   }
  // });
}

function value(form, field, def) {
  return form.getValue(field) == null ? null : isJson(form.getValue(field)) ? JSON.parse(form.getValue(field)) : def || form.getValue(field);
}

function getChildren(form, tablename, inputs) {
  var array = [];
  var indexes = form.getChildrenIndexes(tablename);

  for (var i = 0; i < indexes.length; i++) {
    var obj = {};
    for (var t = 0; t < inputs.length; t++) {
      obj[inputs[t]] = value(form, inputs[t] + '___' + indexes[i]);
    }
    array.push(obj);
  }
  return array;
}

var isJson = function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};