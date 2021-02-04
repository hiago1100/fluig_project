function gravarDebugLog(bool, dados)
{
	if(bool == 'true')
	{
		log.warn('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
		log.warn('DEBUG - '+numeroChamado+' - FLUIG-0237');

		log.warn('isMaoObraAdmEstrategica ' + isMaoObraAdmEstrategica());
		log.warn('tipoRecrutamento ' + tipoRecrutamento());
		log.warn('isAprovacaoN1 ' + isAprovacaoN1());
		log.warn('isAprovacaoRecolhimento ' + isAprovacaoRecolhimento());
		log.warn('isAprovacaoErroTI77 ' + isAprovacaoErroTI77());
		log.warn('isAprovacaoErroTI170 ' + isAprovacaoErroTI170());
		log.warn('isAprovacaoErroTI146 ' + isAprovacaoErroTI146());
		log.warn('aprovacaoCadastroKit ' + aprovacaoCadastroKit());
		log.warn('aprovacaoAssinaturaKit ' + aprovacaoAssinaturaKit());
		log.warn('depoisMeioDia ' + depoisMeioDia());
		log.warn('isSede ' + isSede());
		log.warn('aprovacaoCadastroCancelamento ' + aprovacaoCadastroCancelamento());
		log.warn('isAprovacaoExcecaoConsultorRH ' + isAprovacaoExcecaoConsultorRH());
		log.warn('isAprovacaoExcecaoGestorRH ' + isAprovacaoExcecaoGestorRH());
		log.warn('isAprovacaoExcecaoRemuneracao ' + isAprovacaoExcecaoRemuneracao());
		log.warn('isAprovacaoExcecaoAprovadorN1 ' + isAprovacaoExcecaoAprovadorN1());
		log.warn('isAprovacaoExcecaoAprovadorN2 ' + isAprovacaoExcecaoAprovadorN2());
		log.warn('isAprovacaoExcecaoAprovadorN3 ' + isAprovacaoExcecaoAprovadorN3());
		log.warn('isAprovacaoExcecaoAprovadorN4 ' + isAprovacaoExcecaoAprovadorN4());
		log.warn('isAprovacaoMovimentacao ' + isAprovacaoMovimentacao());
		log.warn('temAprovadornN2 ' + temAprovadornN2());
		log.warn('temAprovadornN3 ' + temAprovadornN3());
		log.warn('isSalarioForaTabelaSalarial ' + isSalarioForaTabelaSalarial());
		
	}
}

function isDebug(processo)
{
	var c = DatasetFactory.createConstraint("userSecurityId", "adm", "adm", ConstraintType.MUST);
	var constraints = new Array(c);
	var dados =  DatasetFactory.getDataset('DS_FLUIG_1000', ['SP_FLUIG_1016', "'"+processo+"'"], constraints, null);
	
	if(dados == null && dados.rowsCount == 0)
	{
        throw  "FALHA AO BUSCAR O DEBUG.";
    }
	
	return dados.getValue(0,"DEBUG");;
}