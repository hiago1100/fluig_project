function displayFields(form,customHTML) 
{
	var atividade = getValue("WKNumState");
	var modo = form.getFormMode();
	var	user = getValue("WKUser");
	var processo = getValue("WKDef");
	
    customHTML.append("<script>function getAtividade(){ return " + atividade + "; }</script>");
    customHTML.append("<script>function getModo(){ return '" + modo + "'; }</script>");
    customHTML.append("<script>function getUser(){ return '" + user + "'; }</script>");
    customHTML.append("<script>function getServerTime(){ return " + (new Date().getTime()) + "; }</script>");
    customHTML.append("<script>function getCodProcess(){ return '" + processo + "'; }</script>");
	
	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);
	
	//PARA RESOLVER O PROBLEMA DA DATA, ONDE SE APROVADO PELO FLUIG MOBILE A DATA FICA NO FORMATO AMERICANO
	var arrayCamposData = [""
    	];
	   
	CorrecaoDatas(form,arrayCamposData);
}