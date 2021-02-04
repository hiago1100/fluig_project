package snippet;

public class Snippet {
	function beforeStateEntry(sequenceId){
	    log.info("@@@@@@@@@@beforeStateEntry" + new String(sequenceId));
	
	    var integra = hAPI.getCardValue("modoIntegracao");
	
	    try {
	
	
	        if(sequenceId == "5"){
	            /*___________________Integração_datasul____________________________________________________________________*/
	            log.info("@@@@@@@@@@passou" + new String(sequenceId));
	
	
	            /*_____________________________________Variaveis_pro_db_____________________________________________________*/
	
	            var empresadb           =   hAPI.getCardValue("Empr");
	            var unidadedb           =   hAPI.getCardValue("Unidad");
	            var numSolicitacaodb    =   hAPI.getCardValue("numSolicitacao");
	            var dataSolicitacaodb   =   hAPI.getCardValue("dataSolicitacao").split('/').reverse().join('-');
	            var dataLancamtodb  =   hAPI.getCardValue("dataLancamto").split('/').reverse().join('-');
	            var emitentedb          =   hAPI.getCardValue("emitente");
	            var despesadb           =   hAPI.getCardValue("Despesa");
	            var numDoctodb      =   hAPI.getCardValue("numDocto");
	            var tipodb              =   hAPI.getCardValue("tipoMvto");
	            var valMovtodb          =   hAPI.getCardValue("vlTotal").replace(',', '.');
	            var status              =   '0' ;
	
	            /*______________________________Fim_variaveis_pro_db___________________________________________________________*/
	
	            /*___________________________________________DB_INSERT__________________________________________________________________*/
	
	            var fieldsdb = new Array(empresadb, unidadedb, numSolicitacaodb, dataSolicitacaodb, dataLancamtodb, emitentedb, despesadb, numDoctodb, tipodb, valMovtodb, status);
	            log.info(fieldsdb);
	            var dsCaixaInternoInsert = DatasetFactory.getDataset('dsCaixaInternoInsert', fieldsdb, null, null);
	
	            for(i = 0; i < dsCaixaInternoInsert.values.length; i++){
	                retorno = dsCaixaInternoInsert.getValue(i, 'retorno');
	            }
	
	
	            /*___________________________________________DB_INSERT__END_____________________________________________________________*/
	
	        }
	        if(sequenceId == "14"){
	
	            if(integra == "Automatico"){
	                // Utiliza o ServiceManager para obter uma referencia ao servico.
	                var serviceProvider = ServiceManager.getService('TotvsProducao');
	                var serviceLocator = serviceProvider.instantiate('com.totvs.framework.ws.execbo.service.WebServiceExecBO');
	                var service = serviceLocator.getWebServiceExecBOPort();
	
	                var params = new Array();
	                var numProces = getValue("WKNumProces");
	                var programa  = "esp/apiCaixaInterno.p";
	                var procedure = "pi-caixa-interno";
	
	
	
	                // Prepara os parametros da procedure a ser chamada no Progress
	                params[0]            = new Object();
	                params[0].dataType   = "character";
	                params[0].name       = "p-cod-empresa";
	                params[0].type       = "input";
	                params[0].value      = new String(hAPI.getCardValue("empresa"));
	
	                params[1]            = new Object();
	                params[1].dataType   = "character";
	                params[1].name       = "p-cod-estabel";
	                params[1].type       = "input";
	                params[1].value      = new String(hAPI.getCardValue("estabelecimento"));
	
	
	                params[2]            = new Object();
	                params[2].dataType   = "character";
	                params[2].name       = "p-conta-contabil";
	                params[2].type       = "input";
	                params[2].value      = new String(hAPI.getCardValue("contaContabil"));
	
	
	                params[3]            = new Object();
	                params[3].dataType   = "character";
	                params[3].name       = "p-tipo-fluxo";
	                params[3].type       = "input";
	                params[3].value      = new String(hAPI.getCardValue("tipoFluxo"));
	
	
	                params[4]            = new Object();
	                params[4].dataType   = "character";
	                params[4].name       = "p-tipo-trans";
	                params[4].type       = "input";
	                params[4].value      = new String(hAPI.getCardValue("tipoTrans"));
	
	                params[5]            = new Object();
	                params[5].dataType   = "character";
	                params[5].name       = "p-tipo-movto";
	                params[5].type       = "input";
	                params[5].value      = new String(hAPI.getCardValue("tipoMvto"));
	
	                params[6]            = new Object();
	                params[6].dataType   = "character";
	                params[6].name       = "p-dt-transacao";
	                params[6].type       = "input";
	                params[6].value      = new String(hAPI.getCardValue("dataLancamto").split("-").reverse().join("/"));
	
	
	                params[7]            = new Object();
	                params[7].dataType   = "character";
	                params[7].name       = "p-valor-total";
	                params[7].type       = "input";
	                params[7].value      = new String(hAPI.getCardValue("vlTotal").toString().replace(",","."));
	
	                params[8]            = new Object();
	                params[8].dataType   = "character";
	                params[8].name       = "p-docto";
	                params[8].type       = "input";
	                params[8].value      = new String(hAPI.getCardValue("numSolicitacao"));
	
	                params[9]            = new Object();
	                params[9].dataType   = "character";
	                params[9].name       = "p-conta-corrente";
	                params[9].type       = "input";
	                params[9].value      = new String(hAPI.getCardValue("contaC"));
	
	                params[10]            = new Object();
	                params[10].dataType   = "character";
	                params[10].name       = "p-observacoes";
	                params[10].type       = "input";
	                params[10].value      = new String(hAPI.getCardValue("obs").toString().replace("Desc: undefined -   Quant: undefined -  Dinheiro: undefined #        ", ""));
	
	                params[11]            = new Object();
	                params[11].dataType   = "character";
	                params[11].name       = "p-status";
	                params[11].type       = "output";
	
	                params[12]            = new Object();
	                params[12].dataType   = "character";
	                params[12].name       = "p-mensagem";
	                params[12].type       = "output";
	
	
	                log.info("@@@@@@@@@@1");
	
	
	                log.info("###############aqui")
	                var jsonParams = JSON.stringify(params);
	                log.info(">>> Parametros da procedure:");
	                log.info("###############jsonParams" + jsonParams);
	
	                // Recuperar o e-mail do usuário corrente
	                var usuario = "admin";
	                var constraint1 = DatasetFactory.createConstraint(
	                    "colleaguePK.colleagueId", usuario, usuario,
	                    ConstraintType.MUST);
	                var constraints = new Array(constraint1);
	                var colaborador = DatasetFactory.getDataset("colleague", null,
	                    constraints, null);
	                var userEmail = colaborador.getValue(0, "mail");
	
	                log.info(' --> userEmail: ' + userEmail);
	
	                // Faz login e recebe o token de autenticacao
	                // var token = service.userLogin(userEmail);
	                var token = service.userLogin("super");
	                // Chama a procedure passando os parametros e o tok'en de autenticacao.
	                var resp = service.callProcedureWithToken(token, programa, procedure, jsonParams);
	                // Converte o resultado para um objeto
	                log.info("@@@@@@@@@@1" + resp);
	
	                respObj = JSON.parse(resp);
	                // Apresenta o resultado no log.
	                log.info("#######passou" + new String(hAPI.getCardValue("tipoFluxo")));
	
	
	                //var statusForm = "DS: " + respObj[0].value + " - DB: OK";
	                //var resultadoForm = "DS: " + respObj[1].value + "\n \n \n - DB: " + retorno;
	
	                hAPI.setCardValue("resultadoIntegracaoTxtArea", respObj[1].value );
	                hAPI.setCardValue("statusIntegracao", respObj[0].value );
	                log.info("@@@@@@@@@@tentou");
	            }
	        }
	
	
	
	        if(sequenceId == "24"){
	
	            /*___________________________________________DB_UPDATE_STATUS___________________________________________________________*/
	
	            var numSolicitacaodb    =   hAPI.getCardValue("numSolicitacao");
	            var status = "2";
	            var fieldsUpdate = new Array(status, numSolicitacaodb);
	            log.info(fieldsUpdate);
	            var dsCaixaInternoUpdate = DatasetFactory.getDataset('dsCaixaInternoUpdate', fieldsUpdate, null, null);
	
	            for(i = 0; i < dsCaixaInternoUpdate.values.length; i++){
	                retorno = dsCaixaInternoUpdate.getValue(i, 'retorno');
	            }
	            /*__________________________________________________________________________________________________________________________*/
	
	        }
	
	    } catch (error) {
	        log.info("ERRO NO CATCH: " + error.message);
	        hAPI.setCardValue("resultadoIntegracaoTxtArea", error.message);
	        hAPI.setCardValue("statusIntegracao", "NOK");
	    }
	
	}
}

