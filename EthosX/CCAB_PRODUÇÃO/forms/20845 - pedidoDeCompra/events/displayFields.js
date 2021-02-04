function displayFields(form,customHTML){
	form.setValue("seqProcesso", getValue('WKNumState'));
	
	var nCount;

	if (getValue('WKNumState') == 5 && form.getValue("primeiro") == "1"){

		var cUsuario 	= form.getValue("matAprovador");
		var cNumero		= form.getValue("numPedido");
		var cFilial		= form.getValue("codFilial");
		var cCc			= form.getValue("codCC");

		var aUsuario = cUsuario.split(",");
		
		var cConsNumero = DatasetFactory.createConstraint("numero",
				cNumero, cNumero, ConstraintType.MUST);
		
		var cConsUsuario = DatasetFactory.createConstraint("usuario",
				aUsuario[0], aUsuario[0], ConstraintType.MUST);
		
		var cConsFilial = DatasetFactory.createConstraint("filial",
				cFilial, cFilial, ConstraintType.MUST);
		
		var cConsCc = DatasetFactory.createConstraint("cc",
				cCc, cCc, ConstraintType.MUST);
		
		var dsRetorno = DatasetFactory.getDataset("ds_vlTotal_qr", null, [ cConsNumero, cConsUsuario, cConsFilial, cConsCc ], null);

		var indexes 	= form.getChildrenIndexes("tbItens");
		
		customHTML.append("<script>");

		for (i = 1; i <= dsRetorno.rowsCount; i++){

			for (j = 1; j <= indexes.length; j++){
				
				nCount = i-1;

				if (dsRetorno.getValue(nCount,"DBM_ITEM") == form.getValue("seqItem___" + j.toString())){

					customHTML.append("$('table[tablename=tbItens] tbody tr').eq(" + (j-nCount).toString() + ").remove();");
					
				}
				
			}
			
		}
		
		customHTML.append("</script>");

	}
	
}

