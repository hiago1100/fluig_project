/*eslint-disable*/
/*jshint -W116 */
function validateForm(form) {
  log.info("validateForm adf_aprovadao_docto");
  const Errors = value(form, 'Errors');
  const codTipoDocto = value(form, 'codTipoDocto');
  const codDoctoTemplate = value(form, 'codDoctoTemplate');
  const codEmpresa = value(form, 'codEmpresa');
  const Aprovadores = getChildren(form, 'tabelaAprovadores', ['aprovadorSeq', 'aprovadorEmail']);

  if (codTipoDocto == '') {
    throw 'O tipo do documento deve ser informado.';
  }

  const active = DatasetFactory.createConstraint('metadata#active', true, true, ConstraintType.MUST);
  const constraints = new Array(active, DatasetFactory.createConstraint('codigo', codTipoDocto, codTipoDocto, ConstraintType.MUST));

  const dataset = DatasetFactory.getDataset('adf_tipo_documento', null, constraints, null);

  if (!dataset || dataset.rowsCount == 0) {
    throw `Tipo de documento ${codTipoDocto} não encontrado`;
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

const isJson = function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};
