function beforeTaskSave(colleagueId,nextSequenceId,userList, form, customHTML)
{
	// Atividades
	var atual 			  = getValue("WKNumState");
	var inicio 			  = "7";
	var criar_revisar_doc = "14";
	var aprovar_gestor 	  = "8";
	var realizar_consenso = "22";
	var validar_conteudo  = "29";
	var validar_gestao 	  = "31";
	var aprovar_diretoria = "43";
	var cria_treinamento  = "18";
	var fim_processo 	  = "20";

	// Marca x para os processos finalizados
	if ( nextSequenceId == fim_processo )
	{
		hAPI.setCardValue("txt_finalizado","X");
	}

	//------------------------------------------------------------------------------------------------------------------------------------------------//

	// define status da solicitação
	if (nextSequenceId == criar_revisar_doc) {
		
		hAPI.setCardValue("txt_atv_corrente", "Etapa 2 - Criar/Revisar Documentos");

	} else if (nextSequenceId == aprovar_gestor){
		
		hAPI.setCardValue("txt_atv_corrente", "Etapa 3 - Aprovar Gestor");

	} else if (nextSequenceId == realizar_consenso){
		
		hAPI.setCardValue("txt_atv_corrente", "Etapa 3 - Aprovação Consenso");

	} else if (nextSequenceId == validar_conteudo){
		
		hAPI.setCardValue("txt_atv_corrente", "Etapa 3 - Aprovação Inteligência Operacional");

	} else if (nextSequenceId == validar_gestao){
		
		hAPI.setCardValue("txt_atv_corrente", "Etapa 3 - Aprovação Gestão");

	} else if (nextSequenceId == aprovar_diretoria){
		
		hAPI.setCardValue("txt_atv_corrente", "Etapa 3 - Aprovação da Diretoria");

	} else if (nextSequenceId == cria_treinamento){
		
		hAPI.setCardValue("txt_atv_corrente", "Etapa 4 - Cria Treinamento LMS");

	} else if (nextSequenceId == fim_processo){
		
		hAPI.setCardValue("txt_atv_corrente", "Atividade Concluída");

	}
}