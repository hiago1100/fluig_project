function displayFields(form,customHTML){

	form.setHidePrintLink(true);
	form.setShowDisabledFields(true);
	
	var currentState = getValue('WKNumState');
	var numProcess = getValue('WKNumProces');
	var emEdicao = (form.getFormMode() == "ADD" || form.getFormMode() == "MOD") 
	var currentUser = fluigAPI.getUserService().getCurrent();
	var mobile = form.getMobile();

	log.info('##### displayFields - PR-008 - numProcess: ' + numProcess)
	/* log.info('##### displayFields - PR-008 - currentState: ' + currentState)
	log.info('##### displayFields - PR-008 - emEdicao: ' + emEdicao)
	log.info('##### displayFields - PR-008 - mobile: ' + mobile) */
	log.info('##### displayFields - PR-008 - currentUser ID: ' + currentUser.getCode() + ' - currentUser NAME: ' + currentUser.getFullName())
	
	customHTML.append('<script type="text/javascript" >');
	customHTML.append('	let CONTEXT = {');
	customHTML.append('		"MODE": "' + form.getFormMode()	+ '"');
	customHTML.append('		, "IS_EDITING": ' + emEdicao);
	customHTML.append('		, "CURRENT_STATE": ' + currentState );
	customHTML.append('		, "NUM_PROCESS": ' + numProcess );
	customHTML.append('		, "USER": "' + currentUser.getCode() + '"');
	customHTML.append('		, "NAME_USER": "' + currentUser.getFullName() + '"');
	customHTML.append('		, "IS_MOBILE": ' + mobile);
	customHTML.append('		, "NEW_LINE": ' + ((mobile) ? "' \\n'" : "' <br/>'")); 
	customHTML.append('	};');
	customHTML.append('</script>');

	if(!emEdicao || (currentState != Activity.ZERO && currentState != Activity.INICIAR)){
		form.setHideDeleteButton(true);
	}
	if(currentState == Activity.ZERO 
				|| currentState == Activity.INICIAR && emEdicao){
		form.setValue('id_solicitante', currentUser.getCode());
		form.setValue('nm_solicitante', currentUser.getFullName());
	}
	else if(currentState == Activity.VALIDAR_COMPOSICAO && emEdicao){
		form.setValue('id_resp_valida_composicao', currentUser.getCode());
		form.setValue('nm_resp_valida_composicao', currentUser.getFullName());
	}
	else if(currentState == Activity.ELABORAR_DOCUMENTAL_ACODE && emEdicao){
		form.setValue('id_resp_analise_acode', currentUser.getCode());
		form.setValue('nm_resp_analise_acode', currentUser.getFullName());
	}
	else if(currentState == Activity.COLHER_ASSINATURAS && emEdicao){
		form.setValue('id_resp_assinaturas_acode', currentUser.getCode());
		form.setValue('nm_resp_assinaturas_acode', currentUser.getFullName());
	}
	else if(currentState == Activity.AVALIAR_MINUTA && emEdicao){
		form.setValue('id_resp_avalicao_aditivo', currentUser.getCode());
		form.setValue('nm_resp_avalicao_aditivo', currentUser.getFullName());
	}
	else if(currentState == Activity.ATUALIZAR_CONTRATO && emEdicao){
		form.setValue('id_resp_atualizacao_contrato', currentUser.getCode());
		form.setValue('nm_resp_atualizacao_contrato', currentUser.getFullName());
	}
}