function beforeTaskSave(colleagueId,nextSequenceId,userList){

var codFilial = hAPI.getCardValue("cpCodFiliais");
var idFluig   = hAPI.getCardValue("cpNumeroSolicitacao");
var numeroSerie = hAPI.getCardValue("cpNumeSerie");
var nomeSolicitante = hAPI.getCardValue("nomeSolicitante");
var dataSolicitacao = hAPI.getCardValue("dataSolicitacao");
var filial = hAPI.getCardValue("cpFilial");
var numeroNota = hAPI.getCardValue("cpNumeroNota");
var cpDataEmissao = hAPI.getCardValue("cpDataEmissao");
var cnpj = hAPI.getCardValue("cpCnpjCliente");
var razaoSocial = hAPI.getCardValue("cpRazaoSocial");
var valorNota = hAPI.getCardValue("cpValorNf");
var statusNf = hAPI.getCardValue("cpStatusNf");
var motivoCanc = hAPI.getCardValue("cpMotivoCanc");
var observacao = hAPI.getCardValue("cpObservacao");

if (nextSequenceId == 39) {
var users = new java.util.ArrayList();
        users.add("Pool:Group:FIS");

        var fnEmail = loadLiv(["com.totvsNacoesUnidas.fluig.js.ds.CustomEmail"]);
        var valoresForm = new java.util.HashMap();

        valoresForm.put("codFilial", codFilial);
        valoresForm.put("idFluig", idFluig);
        valoresForm.put("serieNf", numeroSerie);
        valoresForm.put("nomeSolicitante", nomeSolicitante);
        valoresForm.put("dataSolicitacao", dataSolicitacao);
        valoresForm.put("cpFilial", filial);
        valoresForm.put("cpNumeroNota", numeroNota);
        valoresForm.put("cpDataEmissao", cpDataEmissao);
        valoresForm.put("cpCnpjCliente", cnpj);
        valoresForm.put("cpRazaoSocial", razaoSocial);
        valoresForm.put("cpValorNf", valorNota);
        valoresForm.put("cpStatusNf", statusNf);
        valoresForm.put("cpMotivo", motivoCanc);
        valoresForm.put("cpObservacao", observacao);

       var rest = hAPI.startProcess("AtendimentoProcessoAdministrativo", 0, users, "Solicitação inicializada do processo de Cancelamento de Notas", true, valoresForm, false);
        
        var numProcess = rest.get("iProcess").toString();
        var linkProcess = "http://oncoclinicastst.fluig.com/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID="+numProcess+" "; 
        var linkAux = "<a href='"+linkProcess+"' _blank>"+numProcess+"</a>";
        var emailSolicitante = hAPI.getCardValue("emailSolicitante");

        fnEmail.mail.sendCustomEmail({
                     companyId: getValue("WKCompany"),
                     subject: "Status Solicitação FLUIG",
                     from: "hiago.oliveira@live.com", 
                     to: emailSolicitante,
                     templateId: "tempEmailExt", 
                     templateDialect: "pt_BR", 
                     templateHtml: "cancelamentoExtemporaneo.html",
                     dados: {   
                         "solicitante": nomeSolicitante,
                         "numProcesso": linkAux 
                     }
                });
    }

}

function loadLiv(e){var t={};if(e==null){return t}var n=function(e,t){for(var n=0;n<e.length;n++){if(e[n]==t)return true}return false};var r=DatasetFactory.getDataset("tnuCustomJS",null,null,null);for(var i=0;i<r.rowsCount;i++){var s=r.getValue(i,"liv");if(n(e,s)){var o=r.getValue(i,"src");var u=r.getValue(i,"name");try{var a=new Function("liv","return "+o);t[u]=a(t)}catch(f){log.error("*** Erro ao compilar livraria "+s+":"+f)}}}return t}
