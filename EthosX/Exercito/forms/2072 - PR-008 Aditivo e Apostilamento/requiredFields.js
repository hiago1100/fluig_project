/**
 * Inclui um * vermelho no label dos campos obrigatorios de acordo com a atividade corrente.
 * 
 * @returns void.
 */
function requiredFields(){
	var mandatoryFields = new Fields();
	var fields = [];
		
	//INICIO,REALIZAR_AJUSTE da parte editavel
	//	mandatoryFields.addField("XXXX",[Activity.ZERO, Activity.INICIAR]);
	
	mandatoryFields.addField('num_adt_apo', [Activity.ZERO, Activity.INICIAR]);
	mandatoryFields.addField('nm_solicitante', [Activity.ZERO, Activity.INICIAR]);
	mandatoryFields.addField('dt_solicitacao', [Activity.ZERO, Activity.INICIAR]);
	mandatoryFields.addField('rb_SM_de', [Activity.ZERO, Activity.INICIAR]);
	mandatoryFields.addField('nm_contratada', [Activity.ZERO, Activity.INICIAR]);
	mandatoryFields.addField('nm_contrato', [Activity.ZERO, Activity.INICIAR]);
	mandatoryFields.addField('desc_finalidade', [Activity.ZERO, Activity.INICIAR]);
	
	mandatoryFields.addField('nm_resp_valida_composicao', [Activity.VALIDAR_COMPOSICAO]);
	mandatoryFields.addField('dt_valida_composicao', [Activity.VALIDAR_COMPOSICAO]);

	mandatoryFields.addField('nm_resp_analise_acode', [Activity.ELABORAR_DOCUMENTAL_ACODE]);
	mandatoryFields.addField('dt_analise_acode', [Activity.ELABORAR_DOCUMENTAL_ACODE]);
	
	mandatoryFields.addField('nm_resp_assinaturas_acode', [Activity.COLHER_ASSINATURAS]);
	mandatoryFields.addField('dt_assinaturas_acode', [Activity.COLHER_ASSINATURAS]);
	
	mandatoryFields.addField('dt_assinaturas', [Activity.ELABORAR_DOCUMENTAL_ACODE,Activity.COLHER_ASSINATURAS]);
	mandatoryFields.addField('dt_inicio_vigencia', [Activity.ELABORAR_DOCUMENTAL_ACODE,Activity.COLHER_ASSINATURAS]);
	mandatoryFields.addField('dt_termino_vigencia', [Activity.ELABORAR_DOCUMENTAL_ACODE,Activity.COLHER_ASSINATURAS]);
	mandatoryFields.addField('txt_ref_dou_bi', [Activity.ELABORAR_DOCUMENTAL_ACODE,Activity.COLHER_ASSINATURAS]);
	mandatoryFields.addField('dt_pub_dou_bi', [Activity.ELABORAR_DOCUMENTAL_ACODE,Activity.COLHER_ASSINATURAS]);

	mandatoryFields.addField('nm_resp_avalicao_aditivo', [Activity.AVALIAR_MINUTA]);
	mandatoryFields.addField('dt_avalicao_aditivo', [Activity.AVALIAR_MINUTA]);
	
	mandatoryFields.addField('nm_resp_atualizacao_contrato', [Activity.ATUALIZAR_CONTRATO]);
	mandatoryFields.addField('dt_atualizacao_contrato', [Activity.ATUALIZAR_CONTRATO]);
	 
	//Fim da parte editavel
	
	fields = mandatoryFields.getFields();
	
	for(var i=Activity.ZERO; i<fields.length; i++){
		if(fields[i].activities.indexOf(CONTEXT.CURRENT_STATE) >= Activity.ZERO) setRequired(fields[i].id, true);
	}
}

/**
 * Classe para agrupar os campos e atividades.
 * 
 * @returns void.
 */
function Fields(){
	this.fields = [];
	
	this.addField = function(id, arrayActivities){
		this.fields.push({"id":id,"activities":arrayActivities});
	}
	
	this.getFields = function(){
		return this.fields;
	}
}

/**
 * Inclui o * vermelho nos labels a partir do nome do campo.
 * 
 * @param name: name do campo. Utiliza o name para ser compativel com os campos do tipo radio.
 * @returns void.
 */
function setRequired(name, isRequired){
	var $label = $('label[for="'+name+'"]');
	
	if(isRequired == true) $label.addClass('required');
	else $label.removeClass('required');
}