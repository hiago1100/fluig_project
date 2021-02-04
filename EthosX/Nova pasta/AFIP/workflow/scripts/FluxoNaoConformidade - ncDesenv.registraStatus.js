function registraStatus(atividade,nextSequenceId){
	baseStatus = {	"codigo"	: hAPI.getCardValue("codSituacao"),
					"descricao"	: hAPI.getCardValue("situacao")};
	
	if(atividade == 4){ //Inicio
		baseStatus.codigo		= "1";
		baseStatus.descricao	= "Registrada";
	}
	else if(atividade == 54 && hAPI.getCardValue("validarSelecionarQualidade") == "Sim"){
		baseStatus.codigo		= "2";
		baseStatus.descricao	= "Em Analise";
	}
	else if(atividade == 15 && hAPI.getCardValue("confirmacaoNaoConformidade") == "Sim"){
		baseStatus.codigo		= "3";
		baseStatus.descricao	= "Procede";
	}
	else if(atividade == 41 && hAPI.getCardValue("confirmacaoNaoProcede") == "Sim"){
		baseStatus.codigo		= "4";
		baseStatus.descricao	= "Não Procede";
	}
		
	hAPI.setCardValue("codSituacao",baseStatus.codigo);
	hAPI.setCardValue("situacao",baseStatus.descricao);
	
}