function inputFields(form){

    var numProcess = getValue('WKNumProces');
    var currentState = getValue('WKNumState');
    var nextState = getValue("WKNextState");
	var currentUser = fluigAPI.getUserService().getCurrent();

    log.info('##### inputFields - PR-008 - numProcess: ' + numProcess +
                                            ' - currentUser ID: ' + currentUser.getCode() + 
                                            ' - currentUser NAME: ' + currentUser.getFullName() +
                                            ' - currentState: ' + currentState +
                                            ' - nextState: ' + nextState)
        
    if(currentState == Activity.VALIDAR_COMPOSICAO && nextState == Activity.ELABORAR_ANALISES){
        form.setValue('id_resp_valida_composicao', currentUser.getCode());
        form.setValue('nm_resp_valida_composicao', currentUser.getFullName());
        form.setValue('dt_valida_composicao', getCurrentDate('PT_BR') + " " + getCurrentTime());
        form.setValue('dt_valida_composicao_filtro', getCurrentDate('EN_US'));
    }
    else if(currentState == Activity.ELABORAR_DOCUMENTAL_ACODE && nextState == Activity.GATEWAY_ADITIVO){
        form.setValue('id_resp_analise_acode', currentUser.getCode());
        form.setValue('nm_resp_analise_acode', currentUser.getFullName());
        form.setValue('dt_analise_acode', getCurrentDate('PT_BR') + " " + getCurrentTime());
        form.setValue('dt_analise_acode_filtro', getCurrentDate('EN_US'));
    }
    else if(currentState == Activity.COLHER_ASSINATURAS && nextState == Activity.ATUALIZAR_CONTRATO){
        form.setValue('id_resp_assinaturas_acode', currentUser.getCode());
        form.setValue('nm_resp_assinaturas_acode', currentUser.getFullName());
        form.setValue('dt_assinaturas_acode', getCurrentDate('PT_BR') + " " + getCurrentTime());
        form.setValue('dt_assinaturas_acode_filtro', getCurrentDate('EN_US'));
    }
    else if(currentState == Activity.AVALIAR_MINUTA && nextState == Activity.COLHER_ASSINATURAS){
        form.setValue('id_resp_avalicao_aditivo', currentUser.getCode());
        form.setValue('nm_resp_avalicao_aditivo', currentUser.getFullName());
        form.setValue('dt_avalicao_aditivo', getCurrentDate('PT_BR') + " " + getCurrentTime());
        form.setValue('dt_avalicao_aditivo_filtro', getCurrentDate('EN_US'));
    }
    else if(currentState == Activity.ATUALIZAR_CONTRATO && nextState == Activity.SERVICO_ATUALIZAR_SMS){
        form.setValue('id_resp_atualizacao_contrato', currentUser.getCode());
        form.setValue('nm_resp_atualizacao_contrato', currentUser.getFullName());
        form.setValue('dt_atualizacao_contrato', getCurrentDate('PT_BR') + " " + getCurrentTime());
        form.setValue('dt_atualizacao_contrato_filtro', getCurrentDate('EN_US'));
    }
}