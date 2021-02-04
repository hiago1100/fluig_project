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
	
	mandatoryFields.addField('numSM', [Activity.ZERO, Activity.INICIAR]);
	mandatoryFields.addField('nmSolicitante', [Activity.ZERO, Activity.INICIAR]);
	mandatoryFields.addField('dtHrSolicitacao', [Activity.ZERO, Activity.INICIAR]);
	mandatoryFields.addField('solicitadoPor', [Activity.ZERO, Activity.INICIAR]);
	mandatoryFields.addField('nmContratada', [Activity.ZERO, Activity.INICIAR]);
	mandatoryFields.addField('contrato', [Activity.ZERO, Activity.INICIAR]);
	mandatoryFields.addField('secao', [Activity.ZERO, Activity.INICIAR]);
	mandatoryFields.addField('descSM', [Activity.ZERO, Activity.INICIAR]);

	mandatoryFields.addField('descSMProposta', [Activity.ELABORAR_SM]);
	mandatoryFields.addField('respElaboracao', [Activity.ELABORAR_SM]);
	mandatoryFields.addField('nmDemandante', [Activity.ELABORAR_SM]);
	mandatoryFields.addField('nmDemandado', [Activity.ELABORAR_SM]);
	mandatoryFields.addField('dataLimiteDemanda', [Activity.ELABORAR_SM]);
	mandatoryFields.addField('descDemanda', [Activity.ELABORAR_SM]);
	mandatoryFields.addField('impactoEscopo', [Activity.ELABORAR_SM]);
	mandatoryFields.addField('impactoMetodologia', [Activity.ELABORAR_SM]);
	mandatoryFields.addField('impactoPrazo', [Activity.ELABORAR_SM]);
	mandatoryFields.addField('impactoSecoes', [Activity.ELABORAR_SM]);
	mandatoryFields.addField('impactoCusto', [Activity.ELABORAR_SM]);
	
	mandatoryFields.addField('respQualificarSM', [Activity.QUALIFICAR_SM]);
	mandatoryFields.addField('qualificarSM', [Activity.QUALIFICAR_SM]);
	mandatoryFields.addField('descQualificaca', [Activity.QUALIFICAR_SM]);

	mandatoryFields.addField('respPreCGM', [Activity.PRE_CGM]);
	mandatoryFields.addField('pautaPreCGM', [Activity.PRE_CGM]);
	
	mandatoryFields.addField('respCGM', [Activity.CGM]);
	mandatoryFields.addField('pautaCGM', [Activity.CGM]);
	mandatoryFields.addField('escopoDeliberacaoCGM', [Activity.CGM]);
	mandatoryFields.addField('metodologiaDeliberacaoCGM', [Activity.CGM]);
	mandatoryFields.addField('prazoDeliberacaoCGM', [Activity.CGM]);
	mandatoryFields.addField('custoDeliberacaoCGM', [Activity.CGM]);
	mandatoryFields.addField('pendenciasDeliberacaoCGM', [Activity.CGM]);
	mandatoryFields.addField('confirmarQualificarSM', [Activity.CGM]);
	
	mandatoryFields.addField('numAditivoApostilamento', [Activity.AGUARDAR]);
	mandatoryFields.addField('statusApostilamento', [Activity.AGUARDAR]);

 
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