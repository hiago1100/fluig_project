function beforeStateEntry(sequenceId){

	// Atividades
	var inicio = "7";
	var criar_revisar_doc = "14";
	var aprovar_gestor = "8";
	var realizar_consenso = "22";
	var validar_conteudo = "29";
	var validar_gestao = "31";
	var aprovar_diretoria = "43";
	var publicar_pdf = "18";
	var fim_processo = "20";
	var ATTACHMENT_ERROR_MESSAGE = "Antes de prosseguir, anexe o arquivo";
	var estado = getValue("WKNumState");
	var atv      = getValue("WKNumState");
    var nextAtv  = getValue("WKNextState");
    //var nomeCod = form.getValue("txt_cfg_codigo_docto");
    //var nomeCod = document.getElementById("txt_cfg_codigo_docto").value;
    var nomeCod = hAPI.getCardValue( 'txt_cfg_codigo_docto' );

	if (atv == criar_revisar_doc || atv == validar_gestao){
		
		sleep(5000);
		
		// Coleta os anexos
		var docs = hAPI.listAttachments();
		if(docs.size()==0){
			// Verifica se existe anexos 
			throw ATTACHMENT_ERROR_MESSAGE;
		}else{
			var doc1 = docs.get(0);
			doc1 = String(doc1.getDocumentDescription());
			
			//Verfica se o anexo tem o mesmo nome do campo Código do Documento
			if (nomeCod+".DOCX" != doc1.toUpperCase()){
				throw "O documento anexado deve conter o mesmo nome do Codigo do documento ("+nomeCod+".docx). Por favor remova o anexo atual ("+doc1+").";
			}else{
				// Pega o primeiro anexo
				var doc = docs.get(0);
				// Armazena o id do anexo
				hAPI.setCardValue("txt_modelo_id", doc.getDocumentId());
				
			}
			
		}
	}


}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}