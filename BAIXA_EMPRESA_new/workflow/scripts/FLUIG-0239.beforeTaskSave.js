function beforeTaskSave(colleagueId,nextSequenceId,userList){

var tipoDaBaixa = "";
var nomeSolicitante = hAPI.getCardValue("cpSolicitanteNome");
var tipoBaixa = hAPI.getCardValue("slcTipoBaixa");
	if (tipoBaixa == "1") {
		tipoDaBaixa = "Distrato de empresa sem obra";
	}else if(tipoBaixa == "2"){
		tipoDaBaixa = "Distrato de empresa com obra concluída";
	}
var empresa = hAPI.getCardValue("cpNomeEmpresa");
var cnpj = hAPI.getCardValue("cpCnpj");
var motivo = hAPI.getCardValue("txtMotivo");
var motivoJuri = hAPI.getCardValue("txtParecerJuridico");
var fnEmail = loadLiv(["com.totvsNacoesUnidas.fluig.js.ds.CustomEmail"]);
var numProcess = getValue("WKNumProces");
var linkProcess = "http://cscdev.direcional.com.br:8443/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID="+numProcess+" "; 
var linkAux = "<a href='"+linkProcess+"' _blank>"+numProcess+"</a>";


if (nextSequenceId == 5) {
// var emailSolicitante = hAPI.getCardValue("emailSolicitante");
	fnEmail.mail.sendCustomEmail({
	             companyId: getValue("WKCompany"),
	             subject: "Solicitação de Baixa de empresa",
	             from: " csc@comunicacaodirecional.com.br", 
	             to: "qaggjhzi@sharklasers.com",
	             templateId: "baixaEmpresa", 
	             templateDialect: "pt_BR", 
	             templateHtml: "baixaEmpresa.html",
	             dados: {   
	                 "nomeSolicitante": nomeSolicitante,
	                 "numSolicitacao": linkAux,
	                 "tipoBaixa": tipoDaBaixa,
					 "empresa": empresa,
					 "cnpj": cnpj,
					 "motivo": motivo
	             }
        });
    } 

if (nextSequenceId == 36) {
// var emailSolicitante = hAPI.getCardValue("emailSolicitante");
	fnEmail.mail.sendCustomEmail({
	             companyId: getValue("WKCompany"),
	             subject: "Baixa de empresa cancelada - Pendência Judicial",
	             from: " csc@comunicacaodirecional.com.br", 
	             to: "qaggjhzi@sharklasers.com",
	             templateId: "baixaCancelada", 
	             templateDialect: "pt_BR", 
	             templateHtml: "baixaCancelada.html",
	             dados: {   
	                 "numSolicitacao": linkAux,
					 "empresa": empresa,
					 "cnpj": cnpj,
					 "motivo": motivoJuri
	            }
        });
    } 

if (nextSequenceId == 174) {
// var emailSolicitante = hAPI.getCardValue("emailSolicitante");
	fnEmail.mail.sendCustomEmail({
	             companyId: getValue("WKCompany"),
	             subject: "Centro de custo encerrado - Baixa de empresa",
	             from: " csc@comunicacaodirecional.com.br", 
	             to: "qaggjhzi@sharklasers.com",
	             templateId: "centroCustoEncerrado", 
	             templateDialect: "pt_BR", 
	             templateHtml: "centroCustoEncerrado.html",
	             dados: {   
	                 "numSolicitacao": linkAux,
	                 "tipoBaixa": tipoDaBaixa,
					 "empresa": empresa,
					 "cnpj": cnpj

	             }
        });
    }


if (nextSequenceId == 195) {
// var emailSolicitante = hAPI.getCardValue("emailSolicitante");
	fnEmail.mail.sendCustomEmail({
	             companyId: getValue("WKCompany"),
	             subject: " Baixa de empresa - Aprovação por Parte do Solicitante",
	             from: " csc@comunicacaodirecional.com.br", 
	             to: "qaggjhzi@sharklasers.com",
	             templateId: "baixaEmpresaFinal", 
	             templateDialect: "pt_BR", 
	             templateHtml: "baixaEmpresaFinal.html",
	             dados: {   
	                 "numSolicitacao": linkAux,
	                 "tipoBaixa": tipoDaBaixa,
					 "empresa": empresa,
					 "cnpj": cnpj

	             }
        });
    }
}

function loadLiv(e){var t={};if(e==null){return t}var n=function(e,t){for(var n=0;n<e.length;n++){if(e[n]==t)return true}return false};var r=DatasetFactory.getDataset("DKPcustom",null,null,null);for(var i=0;i<r.rowsCount;i++){var s=r.getValue(i,"liv");if(n(e,s)){var o=r.getValue(i,"src");var u=r.getValue(i,"name");try{var a=new Function("liv","return "+o);t[u]=a(t)}catch(f){log.error("*** Erro ao compilar livraria "+s+":"+f)}}}return t}
