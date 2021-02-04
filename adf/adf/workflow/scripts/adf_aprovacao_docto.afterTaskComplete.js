function afterTaskComplete(colleagueId, nextSequenceId, userList) {

  var WKUser = getValue('WKUser');
  var WKNumState = getValue('WKNumState');
  var WKCompletTask = getValue('WKCompletTask');
  var WKNumProces = String(getValue("WKNumProces"));
  var statusNarrativa = hAPI.getCardValue('statusNarrativa') || '';

  if (WKNumState == 3 && WKCompletTask && statusNarrativa != '') {
    hAPI.setTaskComments(WKUser, WKNumProces, 0, statusNarrativa);
  }
}
