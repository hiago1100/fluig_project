function onNotify(subject, receivers, template, params){
	
	 var QualTemplate = template;
	 var QualParametro = params;
		
		log.info("*** CRM *** - Entrei OnNotify T0004");
		log.info("*** CRM *** - Template do E-mail "+QualTemplate);
		log.info("*** CRM *** - Parametro do E-mail "+QualParametro);
		
		
		receivers.add("nilson.ferreira@slmandic.edu.br"); 
	
	
}