function afterProcessing(form)
{
	var atual = getValue("WKNumState");
	var criar_revisar_doc = "14";
	
	if ( atual == criar_revisar_doc)
	{
		log.info("\n\n\n========================== AFTER PROCESSING - ATV 14==============================");
		var ind1 = form.getChildrenIndexes("tb_reg_ocorr");
		var ind2 = form.getChildrenIndexes("tb_revisao");
		
		form.setValue("txt_index_ficha",ind1.length);
		form.setValue("txt_index_revisao",ind2.length);
		log.info("\n========================== FIM AFTER PROCESSING - ATV 14==============================\n\n\n");
	}
}