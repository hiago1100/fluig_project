function displayFields(form, customHTML) {
	
	var atividade = parseInt(getValue("WKNumState"));
	
	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);
	
	customHTML.append("<script>function getWKNumState(){ return " + atividade + "; }</script>");
	customHTML.append("<script>function getTodayDate(){ return " + new java.util.Date().getTime() + "; }</script>");
	customHTML.append("<script>function getFormMode(){ return '" + form.getFormMode() + "'; }</script>");
	customHTML.append("<script>function getUser(){ return '" + getValue("WKUser") + "'; }</script>");
	customHTML.append("<script>function getCompany(){ return " + getValue("WKCompany") + "; }</script>");
	customHTML.append("<script>function getMobile(){ return " + form.getMobile() + "; };</script>");
	customHTML.append("<script>function getServerTime(){ return " + (new Date().getTime()) + "; }</script>");
}