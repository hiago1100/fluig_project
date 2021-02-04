function displayFields(form,customHTML) 
{
	var modo = form.getFormMode();

	customHTML.append("<script>function getModo(){ return '" + modo + "'; }</script>");
    customHTML.append("<script>function getWKNumState(){ return " + getValue("WKNumState") + "; }</script>");
    customHTML.append("<script>function WKDef(){ return '" + getValue("WKDef") + "'; }</script>");
    customHTML.append("<script>function WKUser(){ return '" + getValue("WKUser") + "'; }</script>");
    
	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);
	
	//PARA RESOLVER O PROBLEMA DA DATA, ONDE SE APROVADO PELO FLUIG MOBILE A DATA FICA NO FORMATO AMERICANO
	var arrayCamposData = ["cpDataAbertura"];
	   
	CorrecaoDatas(form,arrayCamposData);
}

