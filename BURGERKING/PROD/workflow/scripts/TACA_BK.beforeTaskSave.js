function beforeTaskSave(colleagueId,nextSequenceId,userList){


var nomeSolicitante = hAPI.getCardValue("cpSolicitanteNome");
var tipo = hAPI.getCardValue("slcTipo");
var motivo = hAPI.getCardValue("txtParecerJuridico");
var cpEmail = hAPI.getCardValue("cpEmail");
var fnEmail = loadLiv(["com.totvsNacoesUnidas.fluig.js.ds.CustomEmail"]);	

if (nextSequenceId == 8) {
	fnEmail.mail.sendCustomEmail({
	             companyId: getValue("WKCompany"),
	             subject: "Solicitação TAÇA BK",
	             from: "hiagoliveira92@gmail.com", 
	             to: cpEmail,
	             templateId: "bktaca", 
	             templateDialect: "pt_BR", 
	             templateHtml: "emailBkTaca.html",
	             dados: {   
	                 "nome": nomeSolicitante,
	                 "tipo": tipo,
	                 "motivo": motivo

	             }
        });
    } 

}

function loadLiv(e){var t={};if(e==null){return t}var n=function(e,t){for(var n=0;n<e.length;n++){if(e[n]==t)return true}return false};var r=DatasetFactory.getDataset("DKPcustom",null,null,null);for(var i=0;i<r.rowsCount;i++){var s=r.getValue(i,"liv");if(n(e,s)){var o=r.getValue(i,"src");var u=r.getValue(i,"name");try{var a=new Function("liv","return "+o);t[u]=a(t)}catch(f){log.error("*** Erro ao compilar livraria "+s+":"+f)}}}return t}
