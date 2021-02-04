/*eslint-disable*/
/*jshint -W116 */
function inputFields(form) {

  var WKUser = getValue('WKUser');
  var WKNumState = getValue('WKNumState');
  var WKNextState = getValue('WKNextState');
  var WKCompletTask = getValue('WKCompletTask');

  const Aprovadores = getChildren(form, 'tabelaAprovadores', ['aprovadorSeq', 'aprovadorCodigo']);
  const currentAprovadorSeq = value(form, 'currentAprovadorSeq');

  if (WKNumState == 3 && WKCompletTask) {
    Aprovadores.forEach((aprovador, index) => {
      if (aprovador.aprovadorSeq == currentAprovadorSeq && aprovador.aprovadorCodigo == WKUser) {
        form.setValue('aprovadorStatus___' + (index + 1), WKNextState == 4 ? 'A' : 'R');
        form.setValue('aprovadorRejeicao___' + (index + 1), value(form, 'statusRejeicao'));
        form.setValue('aprovadorNarrativa___' + (index + 1), value(form, 'statusNarrativa'));
        form.setValue('aprovadorData___' + (index + 1), new Date());

        // hAPI.setTaskComments(WKUser, WKNumProces,  0, value(form, 'statusNarrativa'));
      }
    })
  }

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
