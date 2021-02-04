function afterTaskSave(colleagueId,nextSequenceId,userList)
{
	// Atividades
	var inicio = "7";
	var criar_revisar_doc = "14";
	var aprovar_gestor = "8";
	var realizar_consenso = "22";
	var validar_conteudo = "29";
	var validar_gestao = "31";
	var aprovar_diretoria = "43";
	var publicar_pdf = "18";
	var estado = getValue("WKNumState");
		
	// Atividade de consenso
	if ( estado == realizar_consenso )
	{
				try
		{
			/**
			 * Variaveis de configuracao do webservice ECMWorkflowEngineService
			 */
			var username = "ext.average.RicardoRamos";
			var password = "bk@average";
			var company  = getValue("WKCompany");
			var proceInst = hAPI.getCardValue('txt_cod_proc');
			var userId = "ext.average.RicardoRamos";
			var thread = 0;
			
			var opcao = '';
			if ( hAPI.getCardValue('op_consense') == 's' )
			{
				opcao = "Aprovado";
			}
			else
			{
				opcao = "Reprovado";
			}
			
			var comment = "O usuario " + getValue("WKUser") + " selecionou a opcao para consenso ["+opcao+"]";
			var servicename = "ECMWorkflowEngineService";
			var pacote = "ECMWorkflowEngineService";
			
			// Chamada do servico de workflow
			var service = ServiceManager.getService(servicename);
			var bean = service.getBean();
			var ows = bean.instantiate(pacote + ".ECMWorkflowEngineServiceService");
			var owsclient = ows.getWorkflowEngineServicePort();
			var request = owsclient.setTasksComments(username, password, company, proceInst, userId, thread, comment);
			
			log.info("\n\n\n+------------------------ bk_padronizacao_docto.afterTaskSave -------------------------------+");
			log.info("\n[+] Observacao adicionada na solicitacao");
			
			var aa = Object.keys(request);
			for ( a2 in aa)
			{
				log.info(a2);
			}
			
			
			log.info("\n[+] CompanyID = " + company);
			log.info("\n[+] Codigo porocesso = " + hAPI.getCardValue('txt_cod_proc'));
			log.info("\n[+] Codigo formulario = " + hAPI.getCardValue('txt_cod_form'));
			log.info("\n[+] Usuario atual = " + getValue("WKUser"));
			log.info("\n[+] Opcao selecionada = " + hAPI.getCardValue('op_consense'));
			log.info("\n+------------------------ FIM - bk_padronizacao_docto.afterTaskSave -------------------------------+\n\n\n");
			
			
		}
		catch( e )
		{
			log.info("\n\n\n+------------------------ ERROR - bk_padronizacao_docto.afterTaskSave -------------------------------+");
			log.info("\n[+] Ocorreu um erro ao tentar adicionar comentario na observcao do processo");
			log.info("\n[+] CompanyID = " + company);
			log.info("\n[+] Codigo porocesso = " + hAPI.getCardValue('txt_cod_proc'));
			log.info("\n[+] Codigo formulario = " + hAPI.getCardValue('txt_cod_form'));
			log.info("\n[+] Usuario atual = " + getValue("WKUser"));
			log.info("\n[+] Erro da catch ");
			log.info(e);
			log.info("\n+------------------------ FIM - bk_padronizacao_docto.afterTaskSave -------------------------------+\n\n\n");
		}
	}
}