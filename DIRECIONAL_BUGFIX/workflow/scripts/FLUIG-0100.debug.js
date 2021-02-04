function gravarDebugLog(bool, dados) {
	if (bool) {
		log.warn('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
		log.warn('FLUIG-0100 - Excecao');
		log.warn('AprovSolicExcecao() ' + AprovSolicExcecao());
		log.warn('AprovConsultRH() ' + AprovConsultRH());
		log.warn('ParecerAreaRemun() ' + ParecerAreaRemun());
		log.warn('AprovGestorExc() ' + AprovGestorExc());
		log.warn('AprovGGIntExc() ' + AprovGGIntExc());
		log.warn('AprovSuperInIntExc() ' + AprovSuperInIntExc());
		log.warn('AprovDiretorIntExc() ' + AprovDiretorIntExc());
		log.warn('AprovGestorDestino() ' + AprovGestorDestino());
		log.warn('AprovGestorCSC() ' + AprovGestorCSC());
		log.warn('AprovGestorRH() ' + AprovGestorRH());
		log.warn('RecolhimentoDoc() ' + RecolhimentoDoc());
		log.warn('ProcExecCSC() ' + ProcExecCSC());
		log.warn('ConfProcessamento() ' + ConfProcessamento()); 
		log.warn('IsGestor() ' + IsGestor()); 
	}
}

function isDebug(processo) {
	var c = DatasetFactory.createConstraint("userSecurityId", "adm", "adm", ConstraintType.MUST);
	var constraints = new Array(c);
	var dados = DatasetFactory.getDataset('DS_FLUIG_1000', ['SP_FLUIG_1016', "'" + processo + "'"], constraints, null);

	if (dados == null && dados.rowsCount == 0) {
		throw "FALHA AO BUSCAR O DEBUG.";
	}

	return dados.getValue(0, "DEBUG");;
}