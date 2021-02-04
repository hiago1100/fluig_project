function gravarDebugLog(bool, numeroChamado)
{
	if(bool == 'true')
	{
		log.warn('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
		log.warn('DEBUG - '+numeroChamado+' - FLUIG-0236');
		
		log.warn('isAprovadoConsultoriaRh ' + isAprovadoConsultoriaRh());
		log.warn('isAprovadoRemuneracao ' + isAprovadoRemuneracao());
		log.warn('isAprovadoGestorRh ' + isAprovadoGestorRh());
		log.warn('isAprovadoN1 ' + isAprovadoN1());
		log.warn('isAprovadoN2 ' + isAprovadoN2());
		log.warn('isAprovadoN3 ' + isAprovadoN3());
		log.warn('isAprovadoN4 ' + isAprovadoN4());
		log.warn('isReaberto ' + isReaberto());
		log.warn('isN1Obra ' + isN1Obra());
		log.warn('isN2Obra ' + isN2Obra());
		log.warn('isN3Obra ' + isN3Obra());
		log.warn('isN4Obra ' + isN4Obra());
		log.warn('tipoMaoObra ' + tipoMaoObra());
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