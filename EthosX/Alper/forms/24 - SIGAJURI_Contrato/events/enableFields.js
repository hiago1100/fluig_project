function enableFields(form){
	var INICIO = 1;
	var ABRIR = 2;
	var VALIDADOC = 4;
	var REVISADOC = 21;
	var GERARMINUTA = 6;
	var PREENCHEMINUT = 8;
	var VALIDAMINUTA = 13;
	var MINUTAFINAL = 15;
	var FINALIZACONTRATO = 17;
	
	var step = parseInt(getValue("WKNumState"));
	var fields = new Array();
	
	switch(step){
	case 0:
		break;
	case VALIDADOC:
	case REVISADOC:			
	case PREENCHEMINUT:			
	case VALIDAMINUTA:
	case MINUTAFINAL:
	case FINALIZACONTRATO:
		fields.push("cbRenova");
		break;
	default:
		break;
	}
	
	if (fields.length > 0){
		disableAllFields(form);
		enableSelectedFields(form, fields);
	}
	
}

function disableAllFields(form) {
	var fields = form.getCardData();
	var iterator = fields.keySet().iterator();
	while (iterator.hasNext()) {
		var curField = iterator.next();
		form.setEnabled(curField, false);
	}
}

function enableSelectedFields(form, fields) {
	for (var i = 0; i < fields.length; i++) {
		form.setEnabled(fields[i], true);
	}
}