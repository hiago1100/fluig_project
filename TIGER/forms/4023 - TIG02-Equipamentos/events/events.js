/*eslint-disable*/
/*jshint -W116 */

function value(form, field, def) {
  return isJson(form.getValue(field)) ? JSON.parse(form.getValue(field)) : def || form.getValue(field);
}

function getChildren(form, tablename, inputs) {
  var array = [];
  var indexes = form.getChildrenIndexes(tablename);
  for (var i = 0; i < indexes.length; i++) {
    var obj = {};
    for (var t = 0; t < inputs.length; t++) {
      obj[inputs[t]] = value(form, inputs[t] + "___" + indexes[i]);
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
};