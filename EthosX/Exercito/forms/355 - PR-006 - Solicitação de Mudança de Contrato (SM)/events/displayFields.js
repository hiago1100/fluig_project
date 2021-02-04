function displayFields(form,customHTML){

	form.setHidePrintLink(true);
	form.setShowDisabledFields(true);
	
	var currentState = getValue('WKNumState');
	var numProcess = getValue('WKNumProces');
	var emEdicao = (form.getFormMode() == "ADD" || form.getFormMode() == "MOD") 
	var currentUser = fluigAPI.getUserService().getCurrent();
	var mobile = form.getMobile();

	log.info('##### displayFields - PR-006 - numProcess: ' + numProcess)
	/* log.info('##### displayFields - PR-006 - currentState: ' + currentState)
	log.info('##### displayFields - PR-006 - emEdicao: ' + emEdicao)
	log.info('##### displayFields - PR-006 - mobile: ' + mobile) */
	log.info('##### displayFields - PR-006 - currentUser ID: ' + currentUser.getCode() + ' - currentUser NAME: ' + currentUser.getFullName())
	
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

	if(!emEdicao){
		form.setHideDeleteButton(true);
	}
	else if(currentState == Activity.ZERO 
				|| currentState == Activity.INICIAR){
		form.setValue('idSolicitante', currentUser.getCode());
		form.setValue('nmSolicitante', currentUser.getFullName());
	}
	else if(currentState == Activity.ELABORAR_SM){
		form.setValue('idRespElaboracao', currentUser.getCode());
		form.setValue('nmRespElaboracao', currentUser.getFullName());
	}
	else if(currentState == Activity.QUALIFICAR_SM){
		form.setValue('idRespQualificarSM', currentUser.getCode());
		form.setValue('respQualificarSM', currentUser.getFullName());
	}
	else if(currentState == Activity.PRE_CGM){
		form.setValue('idRespPreCGM', currentUser.getCode());
		form.setValue('respPreCGM', currentUser.getFullName());
	}
	else if(currentState == Activity.CGM){
		form.setValue('idRespCGM', currentUser.getCode());
		form.setValue('respCGM', currentUser.getFullName());
	}
}