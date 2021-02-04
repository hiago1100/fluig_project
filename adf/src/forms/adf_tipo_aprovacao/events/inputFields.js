/*eslint-disable*/
/*jshint -W116 */
function inputFields(form) {

  const displaykey = (value(form, 'codigo')) + ' - ' + (value(form, 'descricao'));

  form.setValue('displaykey', displaykey);

}
