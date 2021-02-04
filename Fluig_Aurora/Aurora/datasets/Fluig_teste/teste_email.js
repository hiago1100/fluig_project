function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	var fnEmail = loadLiv(["com.totvsNacoesUnidas.fluig.js.ds.CustomEmail"]);
	
	var ds = DatasetBuilder.newDataset();
	ds.addColumn("OK");
 
    		try{
	    		
		    	fnEmail.mail.sendCustomEmail({
		    		companyId: getValue("WKCompany"),
	                 subject: "TITULO",
	                 from: "teste@teste.com.br", 
	                 to: "teste.teste@teste.com.br",
	                 templateId: "DestruicaoMercadoreia", // ID do template criado no Fluig
	                 templateDialect: "pt_BR", 
	                 templateHtml: "destruicao_mercadoria.html", // nome do arquivo html
	                 dados: {   // Essa parte dos dados, serão os dados do form para enviar por email
	                  "numeroSolicitacao": "12345",
	                  "nomeUser": "Hiago Oliveira",
	                  "aprovacao": "Aprovado"
	                 }
		    	});
		    	
		    	log.info("*** beforeTaskSave - EMAIL ENVIADO COM SUCESSO!");
		    	ds.addRow(["OK"]);
		    	
	    	} catch(e){
	    		log.error("*** beforeTaskSave - ERRO AO ENVIAR EMAIL! " + e);
	    		ds.addRow([e]);
	    	}
    	
	return ds;
	
}function onMobileSync(user) {
}
//loadLiv - v1.0 - All rights reserverd
function loadLiv(e){var t={};if(e==null){return t}var n=function(e,t){for(var n=0;n<e.length;n++){if(e[n]==t)return true}return false};var r=DatasetFactory.getDataset("tnuCustomJS",null,null,null);for(var i=0;i<r.rowsCount;i++){var s=r.getValue(i,"liv");if(n(e,s)){var o=r.getValue(i,"src");var u=r.getValue(i,"name");try{var a=new Function("liv","return "+o);t[u]=a(t)}catch(f){log.error("*** Erro ao compilar livraria "+s+":"+f)}}}return t}