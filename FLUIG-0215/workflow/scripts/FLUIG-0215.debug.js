function gravarDebugLog(bool)
{
	if(bool)
	{
		log.warn('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
		log.warn('DEBUG - FLUIG-0215');
	
		log.warn('getMatriculaSolicitante ' + getMatriculaSolicitante());
		log.warn('getChapaConsultorOrigem ' + getChapaConsultorOrigem());
		log.warn('getChapaGestorOrigem ' + getChapaGestorOrigem());
		log.warn('getChapaGGOrigem ' + getChapaGGOrigem());
		log.warn('getChapaSuperOrigem ' + getChapaSuperOrigem());
		log.warn('getChapaDiretorOrigem ' + getChapaDiretorOrigem());
		log.warn('getChapaGestorDestino ' + getChapaGestorDestino());
		log.warn('getChapaGGDestino ' + getChapaGGDestino());
		log.warn('getChapaSuperDestino ' + getChapaSuperDestino());
		log.warn('getChapaDiretorDestino ' + getChapaDiretorDestino());
		log.warn('isConsultorOrigem ' + isConsultorOrigem());
		log.warn('isGestorOrigem ' + isGestorOrigem());
		log.warn('isGerenteGeralOrigem ' + isGerenteGeralOrigem());
		log.warn('isSuperOrigem ' + isSuperOrigem());
		log.warn('isDiretorOrigem ' + isDiretorOrigem());
		log.warn('isConsultorDestino ' + isConsultorDestino());
		log.warn('isGestorDestino ' + isGestorDestino());
		log.warn('isGerenteGeralDestino ' + isGerenteGeralDestino());
		log.warn('isSuperDestino ' + isSuperDestino());
		log.warn('isConsultorAprovou ' + isConsultorAprovou());
		log.warn('isGestorAprovou ' + isGestorAprovou());
		log.warn('isGerenteGeralAprovou ' + isGerenteGeralAprovou());
		log.warn('isSuperintendenteAprovou ' + isSuperintendenteAprovou());
		log.warn('isConsultorDestinoAprovou ' + isConsultorDestinoAprovou());
		log.warn('isGestorDestinoAprovou ' + isGestorDestinoAprovou());
		log.warn('isGerenteGeralDestinoAprovou ' + isGerenteGeralDestinoAprovou());
		log.warn('isSuperintendenteDestinoAprovou ' + isSuperintendenteDestinoAprovou());
		log.warn('isAprovacaoManual ' + isAprovacaoManual());
		log.warn('isSolicitanteConferiu ' + isSolicitanteConferiu());
		log.warn('isAprovaFuncionariosInaptos ' + isAprovaFuncionariosInaptos());
		log.warn('isReaberto ' + isReaberto());
		log.warn('isRecolherAso ' + isRecolherAso());
		log.warn('isFuncionarioInapto ' + isFuncionarioInapto());
		log.warn('isSecaoTemSuperOrigem ' + isSecaoTemSuperOrigem());
		
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