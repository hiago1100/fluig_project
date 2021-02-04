function gravarDebugLog(bool, dados)
{
	if(bool)
	{
		log.warn('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
		log.warn('DEBUG - XXX - FLUIG-XXXX');
	}
}

function isDebug(processo)
{
	var c = DatasetFactory.createConstraint("userSecurityId", "adm", "adm", ConstraintType.MUST);
	var constraints = new Array(c);
	var dados =  DatasetFactory.getDataset('DS_FLUIG_1000', ['SP_FLUIG_1016', "'"+processo+"'"], constraints, null);
	
	if(dados == null && dados.rowsCount == 0)
	{
        throw  "FALHA AO BUSCAR O DEBUG." ;
    }
	
	return dados.getValue(0,"DEBUG");;
}