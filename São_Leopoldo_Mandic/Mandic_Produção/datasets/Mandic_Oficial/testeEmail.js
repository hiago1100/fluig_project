function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	var fnEmail = loadLiv(["com.totvsNacoesUnidas.fluig.js.ds.CustomEmail"]);
	
	var ds = DatasetBuilder.newDataset();
	ds.addColumn("OK");

    // var solicitante     = "Hiago Oliveira";
    // var centroCusto     = "Centro Teste";
    // var dataSolicitacao = "29/08/2018";
    // var unidade         = "São Paulo";
    // var fornecedor      = "Teste";
    // var status          = "Aprovado";

    log.info("Dentro do dataset Produção");
 
	    		
		    	fnEmail.mail.sendCustomEmail({
		    		companyId: getValue("WKCompany"),
	                 subject: "TITULO",
	                 from: "hiago.oliveira@live.com", 
	                 to: "hiago.oliveira@live.com",
	                 templateId: "tempEmailReqMaterial", // ID do template criado no Fluig
	                 templateDialect: "pt_BR", 
	                 templateHtml: "statusAprovacao.html", // nome do arquivo html
	                 dados: {   // Essa parte dos dados, serão os dados do form para enviar por email
						"numProcesso": "1234"
						// "solicitante": solicitante,
						// "centroCusto": centroCusto,
						// "dataSolicitacao": dataSolicitacao,
						// "unidade":unidade, //ok
						// "fornecedor":fornecedor, // ok
						// "status":status //ok  
	                 }
		    	});
		    	
		    	
		    	ds.addRow(["OK"]);
		    	
	
    	
	return ds;
	
}function onMobileSync(user) {
}
//loadLiv - v1.0 - All rights reserverd
function loadLiv(e){var t={};if(e==null){return t}var n=function(e,t){for(var n=0;n<e.length;n++){if(e[n]==t)return true}return false};var r=DatasetFactory.getDataset("tnuCustomJS",null,null,null);for(var i=0;i<r.rowsCount;i++){var s=r.getValue(i,"liv");if(n(e,s)){var o=r.getValue(i,"src");var u=r.getValue(i,"name");try{var a=new Function("liv","return "+o);t[u]=a(t)}catch(f){log.error("*** Erro ao compilar livraria "+s+":"+f)}}}return t}


