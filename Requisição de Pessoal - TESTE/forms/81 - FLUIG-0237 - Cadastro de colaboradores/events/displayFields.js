function displayFields(form,customHTML) 
{
	var modo = form.getFormMode();

    customHTML.append("<script>function getModo(){ return '" + modo + "'; }</script>");
    customHTML.append("<script>function isMobile(){ return '" + form.getMobile() + "'; }</script>");

	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);
	
	//PARA RESOLVER O PROBLEMA DA DATA, ONDE SE APROVADO PELO FLUIG MOBILE A DATA FICA NO FORMATO AMERICANO
	var arrayCamposData = ["cpDataAbertura","cpRecolhimentoSedeDataAdmissao",
	"cpRecolhimentoObraDataAdmissao","cpCadastroKitDataAdmissao"
		];
		   
	CorrecaoDatas(form,arrayCamposData);
}

