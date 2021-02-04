function servicetask291(attempt, message) 
{
	try 
	{
		var c = DatasetFactory.createConstraint("userSecurityId", "adm", "adm", ConstraintType.MUST);
		var constraints = new Array(c);
		var dados =  DatasetFactory.getDataset('DS_FLUIG_1000', ['SP_FLUIG_OCR_DOCUMENTACAO', getValue("WKNumProces")], constraints, null);
		
		if(dados == null && dados.rowsCount == 0)
		{
			hAPI.setCardValue( "cpIntegracaoOcrDocumentoGed", "0");
			throw  "FALHA AO BUSCAR O DOCUMENTO.";
		}
		
		var arquivoBytes = dados.getValue(0,"DOCUMENTO");
				  
		publicaDocumentoGED(getValue("WKDef"), arquivoBytes)

		hAPI.setCardValue( "cpIntegracaoOcrDocumentoGed", "1");
	} 
	catch(error) 
	{ 
		hAPI.setCardValue( "cpIntegracaoOcrDocumentoGed", "0");
		throw "FALHA AO BUSCAR O DOCUMENTO.";
	}
}