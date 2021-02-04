/*eslint-disable*/
/*jshint -W116 */
function displayFields(form, customHTML) {
  const Params = {};
  Params.formMode = String(form.getFormMode());
  Params.edit = Params.formMode == 'ADD' || Params.formMode == 'MOD';
  Params.numProcess = String(getValue('WKNumProces')) || '0';
  Params.mobile = form.getMobile();
  Params.user = String(getValue('WKUser'));

  form.setValue('Params', JSON.stringify(Params));
  form.setValue('statusRejeicao', '');
  form.setValue('statusNarrativa', '');

  form.setShowDisabledFields(true);
}
