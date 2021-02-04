function enableFields(form) {
	var atividade = parseInt(getValue("WKNumState"));

	//INICIO
	if (atividade != 93) {

		var total = form.getValue("tbSalarioTotal");
		var Inicio = 0;
		for (var i = 1; i <= total; i++) {
			for (var j = Inicio + 1; j <= Inicio + parseInt(form.getValue("itmQuantidade___" + i)); j++) {
				form.setEnabled("itmTipo___" + j, false);
			}
			Inicio += parseInt(form.getValue("itmQuantidade___" + i));
		}
	}

	if (atividade != 54) {
		form.setEnabled("itmExperiencia", false);
		var total = form.getValue("tbSalarioTotal");
		var Inicio = 0;
		for (var i = 1; i <= total; i++) {
			for (var j = Inicio + 1; j <= Inicio + parseInt(form.getValue("itmQuantidade___" + i)); j++) {
				form.setEnabled("itmExperiencia___" + j, false);
			}
			Inicio += parseInt(form.getValue("itmQuantidade___" + i));
		}
	}

	if (atividade != 0 && atividade != 3) {
		var total = form.getValue("tbSalarioTotal");
		for (var i = 1; i <= total; i++) {
			form.setEnabled("itmQuemIndicou___" + i, false);
			form.setEnabled("itmNomeCandidato___" + i, false);
		}
	}

	if (atividade == 0 || atividade == 3) {

		form.setEnabled("cpAprovarConsultoria", false);
		form.setEnabled("cpParecerConsultoria", false);

		form.setEnabled("cpAprovarGestor", false);
		form.setEnabled("cpParecerGestor", false);

		form.setEnabled("cpAprovarGerenteGeral", false);
		form.setEnabled("cpParecerGerenteGeral", false);

		form.setEnabled("cpAprovarSuperintendente", false);
		form.setEnabled("cpParecerSuperintendente", false);

		form.setEnabled("cpAprovarDiretor", false);
		form.setEnabled("cpParecerDiretor", false);

		form.setEnabled("cpAprovarSalario", false);
		form.setEnabled("cpParecerSalario", false);

		form.setEnabled("cpAprovarCandidatos", false);
		form.setEnabled("cpParecerCandidatos", false);

		form.setEnabled("itmTipo", false);
		form.setEnabled("itmColaboradorCCO", false);


	} else if (atividade == 8) {// APROVACAO DA CONSULTORIA	

		form.setEnabled("cpTipoMaoObra", false);
		form.setEnabled("cpSuperiorCursando", false);
		form.setEnabled("MotivoRequisicao", false);
		form.setEnabled("cpSuperiorCursandoIngles", false);
		form.setEnabled("cpSuperiorCursandoEspanhol", false);

		// PRODUCAO
		form.setEnabled("cpObraDepProd", false);
		form.setEnabled("cpCodSecaoProd", false);
		form.setEnabled("cpEstadoProd", false);
		form.setEnabled("cpMotivoAdmissaoProd", false);

		form.setEnabled("DescreverMotivoProd", false);

		form.setEnabled("cpRecolherDocProd", false);

		//MOTIVO ADMISSAO PRODUCAO

		//SUBSTITUICAO DE DEMISSAO
		form.setEnabled("cpColaboradorMA", false);
		form.setEnabled("cpFuncaoSDTP", false);

		//SUBSTITUICAO DE FERIAS
		form.setEnabled("cpColaboradorSF", false);
		form.setEnabled("cpFuncaoSF", false);

		//SUBSTITUICAO DE LICENCA MATERNIDADE
		form.setEnabled("cpColaboradorLM", false);
		form.setEnabled("cpFuncaoLM", false);

		//SUBSTITUICAO DE ACIDENTE DE TRABALHO OU DOENCA
		form.setEnabled("cpColaboradorATD", false);
		form.setEnabled("cpFuncaoATD", false);

		form.setEnabled("itmNomeCargo", false);
		form.setEnabled("itmQuantidade", false);
		form.setEnabled("itmQuemIndicou", false);
		form.setEnabled("itmNomeCandidato", false);
		form.setEnabled("itmSalario", false);

		// ADMINISTRATIVO ESTRATEGICO
		form.setEnabled("cpObraDepAE", false);
		form.setEnabled("cpCodSecaoAE", false);
		form.setEnabled("cpEstadoAE", false);
		form.setEnabled("CpCaracteristicaAE", false);
		form.setEnabled("CpTipoVagaAE", false);
		form.setEnabled("cpMotivoAdmissaoAE", false);

		form.setEnabled("DescreverMotivoAE", false);

		form.setEnabled("cpRecolherDocAE", false);
		form.setEnabled("itmNomeCargoAE", false);
		form.setEnabled("itmQuantidadeAE", false);
		form.setEnabled("itmSalarioAE", false);
		form.setEnabled("itmHaIndicacao", false);

		// HA INDICACAO
		form.setEnabled("itmQuemIndicou", false);
		form.setEnabled("itmNomeCandidato", false);


		//MOTIVO ADMISSAO ADMINISTRACAO E ESTRATEGICO

		//SUBSTITUICAO DE DEMISSAO
		form.setEnabled("cpColaboradorAdm", false);
		form.setEnabled("cpFuncaoSDAdm", false);

		//SUBSTITUICAO DE FERIAS
		form.setEnabled("cpColaboradorSFAdm", false);
		form.setEnabled("cpFuncaoSFAdm", false);

		//SUBSTITUICAO DE LICENCA MATERNIDADE
		form.setEnabled("cpColaboradorLMAdm", false);
		form.setEnabled("cpFuncaoLMAdm", false);

		//SUBSTITUICAO DE ACIDENTE DE TRABALHO OU DOENCA
		form.setEnabled("cpColaboradorATDAdm", false);
		form.setEnabled("cpFuncaoATDAdm", false);

		form.setEnabled("itmNomeCargo", false);
		form.setEnabled("itmQuantidade", false);
		form.setEnabled("itmQuemIndicou", false);
		form.setEnabled("itmNomeCandidato", false);
		form.setEnabled("itmSalario", false);
		form.setEnabled("itmTipo", false);

		// DESCRICAO DO PERFIL PARA O CARGO
		form.setEnabled("cpAreaFormacao", false);
		form.setEnabled("CpEscolaridade", false);
		form.setEnabled("SuperiorCursando", false);
		form.setEnabled("cpIngles", false);
		form.setEnabled("cpEspanhol", false);

		form.setEnabled("OutrosIdiomas", false);

		form.setEnabled("CpTempoExperiencia", false);
		form.setEnabled("cpExperienciaComprovada", false);
		form.setEnabled("cpExperienciaDesejada", false);
		form.setEnabled("cpCompetencias", false);
		form.setEnabled("cpAtribuicoesCargo", false);
		form.setEnabled("cpConhecimentosTecnicos", false);
		form.setEnabled("CpDisponibilidadeViagens", false);
		form.setEnabled("cpPeriodicidade", false);
		form.setEnabled("cpDiferenciais", false);

		// APROVACOES
		form.setEnabled("cpAprovarGestor", false);
		form.setEnabled("cpParecerGestor", false);

		form.setEnabled("cpAprovarGerenteGeral", false);
		form.setEnabled("cpParecerGerenteGeral", false);

		form.setEnabled("cpAprovarSuperintendente", false);
		form.setEnabled("cpParecerSuperintendente", false);

		form.setEnabled("cpAprovarDiretor", false);
		form.setEnabled("cpParecerDiretor", false);

		form.setEnabled("cpAprovarSalario", false);
		form.setEnabled("cpParecerSalario", false);

		form.setEnabled("cpAprovarCandidatos", false);
		form.setEnabled("cpParecerCandidatos", false);

	} else if (atividade == 16) { // APROVACAO GESTOR

		form.setEnabled("cpTipoMaoObra", false);
		form.setEnabled("cpSuperiorCursando", false);
		form.setEnabled("MotivoRequisicao", false);
		form.setEnabled("cpSuperiorCursandoIngles", false);
		form.setEnabled("cpSuperiorCursandoEspanhol", false);

		// PRODUCAO
		form.setEnabled("cpObraDepProd", false);
		form.setEnabled("cpCodSecaoProd", false);
		form.setEnabled("cpEstadoProd", false);
		form.setEnabled("cpMotivoAdmissaoProd", false);

		form.setEnabled("DescreverMotivoProd", false);

		form.setEnabled("cpRecolherDocProd", false);

		//MOTIVO ADMISSAO PRODUCAO

		//SUBSTITUICAO DE DEMISSAO
		form.setEnabled("cpColaboradorMA", false);
		form.setEnabled("cpFuncaoSDTP", false);

		//SUBSTITUICAO DE FERIAS
		form.setEnabled("cpColaboradorSF", false);
		form.setEnabled("cpFuncaoSF", false);

		//SUBSTITUICAO DE LICENCA MATERNIDADE
		form.setEnabled("cpColaboradorLM", false);
		form.setEnabled("cpFuncaoLM", false);

		//SUBSTITUICAO DE ACIDENTE DE TRABALHO OU DOENCA
		form.setEnabled("cpColaboradorATD", false);
		form.setEnabled("cpFuncaoATD", false);

		form.setEnabled("itmNomeCargo", false);
		form.setEnabled("itmQuantidade", false);
		form.setEnabled("itmQuemIndicou", false);
		form.setEnabled("itmNomeCandidato", false);
		form.setEnabled("itmSalario", false);
		form.setEnabled("itmTipo", false);


		// ADMINISTRATIVO ESTRATEGICO
		form.setEnabled("cpObraDepAE", false);
		form.setEnabled("cpCodSecaoAE", false);
		form.setEnabled("cpEstadoAE", false);
		form.setEnabled("CpCaracteristicaAE", false);
		form.setEnabled("CpTipoVagaAE", false);
		form.setEnabled("cpMotivoAdmissaoAE", false);

		form.setEnabled("DescreverMotivoAE", false);

		form.setEnabled("cpRecolherDocAE", false);
		form.setEnabled("itmNomeCargoAE", false);
		form.setEnabled("itmQuantidadeAE", false);
		form.setEnabled("itmSalarioAE", false);
		form.setEnabled("itmHaIndicacao", false);

		// HA INDICACAO
		form.setEnabled("itmQuemIndicou", false);
		form.setEnabled("itmNomeCandidato", false);


		//MOTIVO ADMISSAO ADMINISTRACAO E ESTRATEGICO

		//SUBSTITUICAO DE DEMISSAO
		form.setEnabled("cpColaboradorAdm", false);
		form.setEnabled("cpFuncaoSDAdm", false);

		//SUBSTITUICAO DE FERIAS
		form.setEnabled("cpColaboradorSFAdm", false);
		form.setEnabled("cpFuncaoSFAdm", false);

		//SUBSTITUICAO DE LICENCA MATERNIDADE
		form.setEnabled("cpColaboradorLMAdm", false);
		form.setEnabled("cpFuncaoLMAdm", false);

		//SUBSTITUICAO DE ACIDENTE DE TRABALHO OU DOENCA
		form.setEnabled("cpColaboradorATDAdm", false);
		form.setEnabled("cpFuncaoATDAdm", false);

		form.setEnabled("itmNomeCargo", false);
		form.setEnabled("itmQuantidade", false);
		form.setEnabled("itmQuemIndicou", false);
		form.setEnabled("itmNomeCandidato", false);
		form.setEnabled("itmSalario", false);
		form.setEnabled("itmTipo", false);

		// DESCRICAO DO PERFIL PARA O CARGO
		form.setEnabled("cpAreaFormacao", false);
		form.setEnabled("CpEscolaridade", false);
		form.setEnabled("SuperiorCursando", false);
		form.setEnabled("cpIngles", false);
		form.setEnabled("cpEspanhol", false);

		form.setEnabled("OutrosIdiomas", false);

		form.setEnabled("CpTempoExperiencia", false);
		form.setEnabled("cpExperienciaComprovada", false);
		form.setEnabled("cpExperienciaDesejada", false);
		form.setEnabled("cpCompetencias", false);
		form.setEnabled("cpAtribuicoesCargo", false);
		form.setEnabled("cpConhecimentosTecnicos", false);
		form.setEnabled("CpDisponibilidadeViagens", false);
		form.setEnabled("cpPeriodicidade", false);
		form.setEnabled("cpDiferenciais", false);

		// APROVACOES
		form.setEnabled("cpAprovarConsultoria", false);
		form.setEnabled("cpParecerConsultoria", false);

		form.setEnabled("cpAprovarGerenteGeral", false);
		form.setEnabled("cpParecerGerenteGeral", false);

		form.setEnabled("cpAprovarSuperintendente", false);
		form.setEnabled("cpParecerSuperintendente", false);

		form.setEnabled("cpAprovarDiretor", false);
		form.setEnabled("cpParecerDiretor", false);

		form.setEnabled("cpAprovarSalario", false);
		form.setEnabled("cpParecerSalario", false);

		form.setEnabled("cpAprovarCandidatos", false);
		form.setEnabled("cpParecerCandidatos", false);

	} else if (atividade == 23) { // APROVACAO GERENTE GERAL

		form.setEnabled("cpTipoMaoObra", false);
		form.setEnabled("cpSuperiorCursando", false);
		form.setEnabled("MotivoRequisicao", false);
		form.setEnabled("cpSuperiorCursandoIngles", false);
		form.setEnabled("cpSuperiorCursandoEspanhol", false);

		// PRODUCAO
		form.setEnabled("cpObraDepProd", false);
		form.setEnabled("cpCodSecaoProd", false);
		form.setEnabled("cpEstadoProd", false);
		form.setEnabled("cpMotivoAdmissaoProd", false);

		form.setEnabled("DescreverMotivoProd", false);

		form.setEnabled("cpRecolherDocProd", false);

		//MOTIVO ADMISSAO PRODUCAO

		//SUBSTITUICAO DE DEMISSAO
		form.setEnabled("cpColaboradorMA", false);
		form.setEnabled("cpFuncaoSDTP", false);

		//SUBSTITUICAO DE FERIAS
		form.setEnabled("cpColaboradorSF", false);
		form.setEnabled("cpFuncaoSF", false);

		//SUBSTITUICAO DE LICENCA MATERNIDADE
		form.setEnabled("cpColaboradorLM", false);
		form.setEnabled("cpFuncaoLM", false);

		//SUBSTITUICAO DE ACIDENTE DE TRABALHO OU DOENCA
		form.setEnabled("cpColaboradorATD", false);
		form.setEnabled("cpFuncaoATD", false);

		form.setEnabled("itmNomeCargo", false);
		form.setEnabled("itmQuantidade", false);
		form.setEnabled("itmQuemIndicou", false);
		form.setEnabled("itmNomeCandidato", false);
		form.setEnabled("itmSalario", false);
		form.setEnabled("itmTipo", false);


		// ADMINISTRATIVO ESTRATEGICO
		form.setEnabled("cpObraDepAE", false);
		form.setEnabled("cpCodSecaoAE", false);
		form.setEnabled("cpEstadoAE", false);
		form.setEnabled("CpCaracteristicaAE", false);
		form.setEnabled("CpTipoVagaAE", false);
		form.setEnabled("cpMotivoAdmissaoAE", false);

		form.setEnabled("DescreverMotivoAE", false);

		form.setEnabled("cpRecolherDocAE", false);
		form.setEnabled("itmNomeCargoAE", false);
		form.setEnabled("itmQuantidadeAE", false);
		form.setEnabled("itmSalarioAE", false);
		form.setEnabled("itmHaIndicacao", false);

		// HA INDICACAO
		form.setEnabled("itmQuemIndicou", false);
		form.setEnabled("itmNomeCandidato", false);


		//MOTIVO ADMISSAO ADMINISTRACAO E ESTRATEGICO

		//SUBSTITUICAO DE DEMISSAO
		form.setEnabled("cpColaboradorAdm", false);
		form.setEnabled("cpFuncaoSDAdm", false);

		//SUBSTITUICAO DE FERIAS
		form.setEnabled("cpColaboradorSFAdm", false);
		form.setEnabled("cpFuncaoSFAdm", false);

		//SUBSTITUICAO DE LICENCA MATERNIDADE
		form.setEnabled("cpColaboradorLMAdm", false);
		form.setEnabled("cpFuncaoLMAdm", false);

		//SUBSTITUICAO DE ACIDENTE DE TRABALHO OU DOENCA
		form.setEnabled("cpColaboradorATDAdm", false);
		form.setEnabled("cpFuncaoATDAdm", false);

		form.setEnabled("itmNomeCargo", false);
		form.setEnabled("itmQuantidade", false);
		form.setEnabled("itmQuemIndicou", false);
		form.setEnabled("itmNomeCandidato", false);
		form.setEnabled("itmSalario", false);
		form.setEnabled("itmTipo", false);

		// DESCRICAO DO PERFIL PARA O CARGO
		form.setEnabled("cpAreaFormacao", false);
		form.setEnabled("CpEscolaridade", false);
		form.setEnabled("SuperiorCursando", false);
		form.setEnabled("cpIngles", false);
		form.setEnabled("cpEspanhol", false);

		form.setEnabled("OutrosIdiomas", false);

		form.setEnabled("CpTempoExperiencia", false);
		form.setEnabled("cpExperienciaComprovada", false);
		form.setEnabled("cpExperienciaDesejada", false);
		form.setEnabled("cpCompetencias", false);
		form.setEnabled("cpAtribuicoesCargo", false);
		form.setEnabled("cpConhecimentosTecnicos", false);
		form.setEnabled("CpDisponibilidadeViagens", false);
		form.setEnabled("cpPeriodicidade", false);
		form.setEnabled("cpDiferenciais", false);

		// APROVACOES
		form.setEnabled("cpAprovarConsultoria", false);
		form.setEnabled("cpParecerConsultoria", false);

		form.setEnabled("cpAprovarGestor", false);
		form.setEnabled("cpParecerGestor", false);

		form.setEnabled("cpAprovarSuperintendente", false);
		form.setEnabled("cpParecerSuperintendente", false);

		form.setEnabled("cpAprovarDiretor", false);
		form.setEnabled("cpParecerDiretor", false);

		form.setEnabled("cpAprovarSalario", false);
		form.setEnabled("cpParecerSalario", false);

		form.setEnabled("cpAprovarCandidatos", false);
		form.setEnabled("cpParecerCandidatos", false);

	} else if (atividade == 32) { // APROVACAO SUPERITENDENTE

		form.setEnabled("cpTipoMaoObra", false);
		form.setEnabled("cpSuperiorCursando", false);
		form.setEnabled("MotivoRequisicao", false);
		form.setEnabled("cpSuperiorCursandoIngles", false);
		form.setEnabled("cpSuperiorCursandoEspanhol", false);

		// PRODUCAO
		form.setEnabled("cpObraDepProd", false);
		form.setEnabled("cpCodSecaoProd", false);
		form.setEnabled("cpEstadoProd", false);
		form.setEnabled("cpMotivoAdmissaoProd", false);

		form.setEnabled("DescreverMotivoProd", false);

		form.setEnabled("cpRecolherDocProd", false);

		//MOTIVO ADMISSAO PRODUCAO

		//SUBSTITUICAO DE DEMISSAO
		form.setEnabled("cpColaboradorMA", false);
		form.setEnabled("cpFuncaoSDTP", false);

		//SUBSTITUICAO DE FERIAS
		form.setEnabled("cpColaboradorSF", false);
		form.setEnabled("cpFuncaoSF", false);

		//SUBSTITUICAO DE LICENCA MATERNIDADE
		form.setEnabled("cpColaboradorLM", false);
		form.setEnabled("cpFuncaoLM", false);

		//SUBSTITUICAO DE ACIDENTE DE TRABALHO OU DOENCA
		form.setEnabled("cpColaboradorATD", false);
		form.setEnabled("cpFuncaoATD", false);

		form.setEnabled("itmNomeCargo", false);
		form.setEnabled("itmQuantidade", false);
		form.setEnabled("itmQuemIndicou", false);
		form.setEnabled("itmNomeCandidato", false);
		form.setEnabled("itmSalario", false);
		form.setEnabled("itmTipo", false);

		// ADMINISTRATIVO ESTRATEGICO
		form.setEnabled("cpObraDepAE", false);
		form.setEnabled("cpCodSecaoAE", false);
		form.setEnabled("cpEstadoAE", false);
		form.setEnabled("CpCaracteristicaAE", false);
		form.setEnabled("CpTipoVagaAE", false);
		form.setEnabled("cpMotivoAdmissaoAE", false);

		form.setEnabled("DescreverMotivoAE", false);

		form.setEnabled("cpRecolherDocAE", false);
		form.setEnabled("itmNomeCargoAE", false);
		form.setEnabled("itmQuantidadeAE", false);
		form.setEnabled("itmSalarioAE", false);
		form.setEnabled("itmHaIndicacao", false);

		//HA INDICACAO
		form.setEnabled("itmQuemIndicou", false);
		form.setEnabled("itmNomeCandidato", false);


		//MOTIVO ADMISSAO ADMINISTRACAO E ESTRATEGICO

		//SUBSTITUICAO DE DEMISSAO
		form.setEnabled("cpColaboradorAdm", false);
		form.setEnabled("cpFuncaoSDAdm", false);

		//SUBSTITUICAO DE FERIAS
		form.setEnabled("cpColaboradorSFAdm", false);
		form.setEnabled("cpFuncaoSFAdm", false);

		//SUBSTITUICAO DE LICENCA MATERNIDADE
		form.setEnabled("cpColaboradorLMAdm", false);
		form.setEnabled("cpFuncaoLMAdm", false);

		//SUBSTITUICAO DE ACIDENTE DE TRABALHO OU DOENCA
		form.setEnabled("cpColaboradorATDAdm", false);
		form.setEnabled("cpFuncaoATDAdm", false);

		form.setEnabled("itmNomeCargo", false);
		form.setEnabled("itmQuantidade", false);
		form.setEnabled("itmQuemIndicou", false);
		form.setEnabled("itmNomeCandidato", false);
		form.setEnabled("itmSalario", false);
		form.setEnabled("itmTipo", false);

		// DESCRICAO DO PERFIL PARA O CARGO
		form.setEnabled("cpAreaFormacao", false);
		form.setEnabled("CpEscolaridade", false);
		form.setEnabled("SuperiorCursando", false);
		form.setEnabled("cpIngles", false);
		form.setEnabled("cpEspanhol", false);

		form.setEnabled("OutrosIdiomas", false);

		form.setEnabled("CpTempoExperiencia", false);
		form.setEnabled("cpExperienciaComprovada", false);
		form.setEnabled("cpExperienciaDesejada", false);
		form.setEnabled("cpCompetencias", false);
		form.setEnabled("cpAtribuicoesCargo", false);
		form.setEnabled("cpConhecimentosTecnicos", false);
		form.setEnabled("CpDisponibilidadeViagens", false);
		form.setEnabled("cpPeriodicidade", false);
		form.setEnabled("cpDiferenciais", false);

		// APROVACOES
		form.setEnabled("cpAprovarConsultoria", false);
		form.setEnabled("cpParecerConsultoria", false);

		form.setEnabled("cpAprovarGestor", false);
		form.setEnabled("cpParecerGestor", false);

		form.setEnabled("cpAprovarGerenteGeral", false);
		form.setEnabled("cpParecerGerenteGeral", false);

		form.setEnabled("cpAprovarDiretor", false);
		form.setEnabled("cpParecerDiretor", false);

		form.setEnabled("cpAprovarSalario", false);
		form.setEnabled("cpParecerSalario", false);

		form.setEnabled("cpAprovarCandidatos", false);
		form.setEnabled("cpParecerCandidatos", false);

	} else if (atividade == 38) { // APROVACAO DIRETOR

		form.setEnabled("cpTipoMaoObra", false);
		form.setEnabled("cpSuperiorCursando", false);
		form.setEnabled("MotivoRequisicao", false);
		form.setEnabled("cpSuperiorCursandoIngles", false);
		form.setEnabled("cpSuperiorCursandoEspanhol", false);

		// PRODUCAO
		form.setEnabled("cpObraDepProd", false);
		form.setEnabled("cpCodSecaoProd", false);
		form.setEnabled("cpEstadoProd", false);
		form.setEnabled("cpMotivoAdmissaoProd", false);

		form.setEnabled("DescreverMotivoProd", false);

		form.setEnabled("cpRecolherDocProd", false);

		//MOTIVO ADMISSAO PRODUCAO

		//SUBSTITUICAO DE DEMISSAO
		form.setEnabled("cpColaboradorMA", false);
		form.setEnabled("cpFuncaoSDTP", false);

		//SUBSTITUICAO DE FERIAS
		form.setEnabled("cpColaboradorSF", false);
		form.setEnabled("cpFuncaoSF", false);

		//SUBSTITUICAO DE LICENCA MATERNIDADE
		form.setEnabled("cpColaboradorLM", false);
		form.setEnabled("cpFuncaoLM", false);

		//SUBSTITUICAO DE ACIDENTE DE TRABALHO OU DOENCA
		form.setEnabled("cpColaboradorATD", false);
		form.setEnabled("cpFuncaoATD", false);

		form.setEnabled("itmNomeCargo", false);
		form.setEnabled("itmQuantidade", false);
		form.setEnabled("itmQuemIndicou", false);
		form.setEnabled("itmNomeCandidato", false);
		form.setEnabled("itmSalario", false);
		form.setEnabled("itmTipo", false);

		// ADMINISTRATIVO ESTRATEGICO
		form.setEnabled("cpObraDepAE", false);
		form.setEnabled("cpCodSecaoAE", false);
		form.setEnabled("cpEstadoAE", false);
		form.setEnabled("CpCaracteristicaAE", false);
		form.setEnabled("CpTipoVagaAE", false);
		form.setEnabled("cpMotivoAdmissaoAE", false);

		form.setEnabled("DescreverMotivoAE", false);

		form.setEnabled("cpRecolherDocAE", false);
		form.setEnabled("itmNomeCargoAE", false);
		form.setEnabled("itmQuantidadeAE", false);
		form.setEnabled("itmSalarioAE", false);
		form.setEnabled("itmHaIndicacao", false);

		// HA INDICACAO
		form.setEnabled("itmQuemIndicou", false);
		form.setEnabled("itmNomeCandidato", false);


		//MOTIVO ADMISSAO ADMINISTRACAO E ESTRATEGICO

		//SUBSTITUICAO DE DEMISSAO
		form.setEnabled("cpColaboradorAdm", false);
		form.setEnabled("cpFuncaoSDAdm", false);

		//SUBSTITUICAO DE FERIAS
		form.setEnabled("cpColaboradorSFAdm", false);
		form.setEnabled("cpFuncaoSFAdm", false);

		//SUBSTITUICAO DE LICENCA MATERNIDADE
		form.setEnabled("cpColaboradorLMAdm", false);
		form.setEnabled("cpFuncaoLMAdm", false);

		//SUBSTITUICAO DE ACIDENTE DE TRABALHO OU DOENCA
		form.setEnabled("cpColaboradorATDAdm", false);
		form.setEnabled("cpFuncaoATDAdm", false);

		form.setEnabled("itmNomeCargo", false);
		form.setEnabled("itmQuantidade", false);
		form.setEnabled("itmQuemIndicou", false);
		form.setEnabled("itmNomeCandidato", false);
		form.setEnabled("itmSalario", false);
		form.setEnabled("itmTipo", false);

		// DESCRICAO DO PERFIL PARA O CARGO
		form.setEnabled("cpAreaFormacao", false);
		form.setEnabled("CpEscolaridade", false);
		form.setEnabled("SuperiorCursando", false);
		form.setEnabled("cpIngles", false);
		form.setEnabled("cpEspanhol", false);

		form.setEnabled("OutrosIdiomas", false);

		form.setEnabled("CpTempoExperiencia", false);
		form.setEnabled("cpExperienciaComprovada", false);
		form.setEnabled("cpExperienciaDesejada", false);
		form.setEnabled("cpCompetencias", false);
		form.setEnabled("cpAtribuicoesCargo", false);
		form.setEnabled("cpConhecimentosTecnicos", false);
		form.setEnabled("CpDisponibilidadeViagens", false);
		form.setEnabled("cpPeriodicidade", false);
		form.setEnabled("cpDiferenciais", false);

		// APROVACOES
		form.setEnabled("cpAprovarConsultoria", false);
		form.setEnabled("cpParecerConsultoria", false);

		form.setEnabled("cpAprovarGestor", false);
		form.setEnabled("cpParecerGestor", false);

		form.setEnabled("cpAprovarGerenteGeral", false);
		form.setEnabled("cpParecerGerenteGeral", false);

		form.setEnabled("cpAprovarSuperintendente", false);
		form.setEnabled("cpParecerSuperintendente", false);

		form.setEnabled("cpAprovarSalario", false);
		form.setEnabled("cpParecerSalario", false);

		form.setEnabled("cpAprovarCandidatos", false);
		form.setEnabled("cpParecerCandidatos", false);

	} else if (atividade == 56) { // APROVACAO SALARIO

		form.setEnabled("cpTipoMaoObra", false);
		form.setEnabled("cpSuperiorCursando", false);
		form.setEnabled("MotivoRequisicao", false);
		form.setEnabled("cpSuperiorCursandoIngles", false);
		form.setEnabled("cpSuperiorCursandoEspanhol", false);

		// PRODUCAO
		form.setEnabled("cpObraDepProd", false);
		form.setEnabled("cpCodSecaoProd", false);
		form.setEnabled("cpEstadoProd", false);
		form.setEnabled("cpMotivoAdmissaoProd", false);

		form.setEnabled("DescreverMotivoProd", false);

		form.setEnabled("cpRecolherDocProd", false);

		//MOTIVO ADMISSAO PRODUCAO

		//SUBSTITUICAO DE DEMISSAO
		form.setEnabled("cpColaboradorMA", false);
		form.setEnabled("cpFuncaoSDTP", false);

		//SUBSTITUICAO DE FERIAS
		form.setEnabled("cpColaboradorSF", false);
		form.setEnabled("cpFuncaoSF", false);

		//SUBSTITUICAO DE LICENCA MATERNIDADE
		form.setEnabled("cpColaboradorLM", false);
		form.setEnabled("cpFuncaoLM", false);

		//SUBSTITUICAO DE ACIDENTE DE TRABALHO OU DOENCA
		form.setEnabled("cpColaboradorATD", false);
		form.setEnabled("cpFuncaoATD", false);

		form.setEnabled("itmNomeCargo", false);
		form.setEnabled("itmQuantidade", false);
		form.setEnabled("itmQuemIndicou", false);
		form.setEnabled("itmNomeCandidato", false);
		form.setEnabled("itmSalario", false);
		form.setEnabled("itmTipo", false);

		// ADMINISTRATIVO ESTRATEGICO
		form.setEnabled("cpObraDepAE", false);
		form.setEnabled("cpCodSecaoAE", false);
		form.setEnabled("cpEstadoAE", false);
		form.setEnabled("CpCaracteristicaAE", false);
		form.setEnabled("CpTipoVagaAE", false);
		form.setEnabled("cpMotivoAdmissaoAE", false);

		form.setEnabled("DescreverMotivoAE", false);

		form.setEnabled("cpRecolherDocAE", false);
		form.setEnabled("itmNomeCargoAE", false);
		form.setEnabled("itmQuantidadeAE", false);
		form.setEnabled("itmSalarioAE", false);
		form.setEnabled("itmHaIndicacao", false);

		// HA INDICACAO
		form.setEnabled("itmQuemIndicou", false);
		form.setEnabled("itmNomeCandidato", false);


		//MOTIVO ADMISSAO ADMINISTRACAO E ESTRATEGICO

		//SUBSTITUICAO DE DEMISSAO
		form.setEnabled("cpColaboradorAdm", false);
		form.setEnabled("cpFuncaoSDAdm", false);

		//SUBSTITUICAO DE FERIAS
		form.setEnabled("cpColaboradorSFAdm", false);
		form.setEnabled("cpFuncaoSFAdm", false);

		//SUBSTITUICAO DE LICENCA MATERNIDADE
		form.setEnabled("cpColaboradorLMAdm", false);
		form.setEnabled("cpFuncaoLMAdm", false);

		//SUBSTITUICAO DE ACIDENTE DE TRABALHO OU DOENCA
		form.setEnabled("cpColaboradorATDAdm", false);
		form.setEnabled("cpFuncaoATDAdm", false);

		form.setEnabled("itmNomeCargo", false);
		form.setEnabled("itmQuantidade", false);
		form.setEnabled("itmQuemIndicou", false);
		form.setEnabled("itmNomeCandidato", false);
		form.setEnabled("itmSalario", false);
		form.setEnabled("itmTipo", false);

		// DESCRICAO DO PERFIL PARA O CARGO
		form.setEnabled("cpAreaFormacao", false);
		form.setEnabled("CpEscolaridade", false);
		form.setEnabled("SuperiorCursando", false);
		form.setEnabled("cpIngles", false);
		form.setEnabled("cpEspanhol", false);

		form.setEnabled("OutrosIdiomas", false);

		form.setEnabled("CpTempoExperiencia", false);
		form.setEnabled("cpExperienciaComprovada", false);
		form.setEnabled("cpExperienciaDesejada", false);
		form.setEnabled("cpCompetencias", false);
		form.setEnabled("cpAtribuicoesCargo", false);
		form.setEnabled("cpConhecimentosTecnicos", false);
		form.setEnabled("CpDisponibilidadeViagens", false);
		form.setEnabled("cpPeriodicidade", false);
		form.setEnabled("cpDiferenciais", false);

		// APROVACOES
		form.setEnabled("cpAprovarConsultoria", false);
		form.setEnabled("cpParecerConsultoria", false);

		form.setEnabled("cpAprovarGestor", false);
		form.setEnabled("cpParecerGestor", false);

		form.setEnabled("cpAprovarGerenteGeral", false);
		form.setEnabled("cpParecerGerenteGeral", false);

		form.setEnabled("cpAprovarSuperintendente", false);
		form.setEnabled("cpParecerSuperintendente", false);

		form.setEnabled("cpAprovarDiretor", false);
		form.setEnabled("cpParecerDiretor", false);

		form.setEnabled("cpAprovarCandidatos", false);
		form.setEnabled("cpParecerCandidatos", false);

	} else if (atividade == 54) { // APROVACAO CANDIDATO

		form.setEnabled("cpTipoMaoObra", false);
		form.setEnabled("cpSuperiorCursando", false);
		form.setEnabled("MotivoRequisicao", false);
		form.setEnabled("cpSuperiorCursandoIngles", false);
		form.setEnabled("cpSuperiorCursandoEspanhol", false);

		// PRODUCAO
		form.setEnabled("cpObraDepProd", false);
		form.setEnabled("cpCodSecaoProd", false);
		form.setEnabled("cpEstadoProd", false);
		form.setEnabled("cpMotivoAdmissaoProd", false);

		form.setEnabled("DescreverMotivoProd", false);

		form.setEnabled("cpRecolherDocProd", false);

		//MOTIVO ADMISSAO PRODUCAO

		//SUBSTITUICAO DE DEMISSAO
		form.setEnabled("cpColaboradorMA", false);
		form.setEnabled("cpFuncaoSDTP", false);

		//SUBSTITUICAO DE FERIAS
		form.setEnabled("cpColaboradorSF", false);
		form.setEnabled("cpFuncaoSF", false);

		//SUBSTITUICAO DE LICENCA MATERNIDADE
		form.setEnabled("cpColaboradorLM", false);
		form.setEnabled("cpFuncaoLM", false);

		//SUBSTITUICAO DE ACIDENTE DE TRABALHO OU DOENCA
		form.setEnabled("cpColaboradorATD", false);
		form.setEnabled("cpFuncaoATD", false);

		form.setEnabled("itmNomeCargo", false);
		form.setEnabled("itmQuantidade", false);
		form.setEnabled("itmQuemIndicou", false);
		form.setEnabled("itmNomeCandidato", false);
		form.setEnabled("itmSalario", false);
		form.setEnabled("itmTipo", false);

		// ADMINISTRATIVO ESTRATEGICO
		form.setEnabled("cpObraDepAE", false);
		form.setEnabled("cpCodSecaoAE", false);
		form.setEnabled("cpEstadoAE", false);
		form.setEnabled("CpCaracteristicaAE", false);
		form.setEnabled("CpTipoVagaAE", false);
		form.setEnabled("cpMotivoAdmissaoAE", false);

		form.setEnabled("DescreverMotivoAE", false);

		form.setEnabled("cpRecolherDocAE", false);
		form.setEnabled("itmNomeCargoAE", false);
		form.setEnabled("itmQuantidadeAE", false);
		form.setEnabled("itmSalarioAE", false);
		form.setEnabled("itmHaIndicacao", false);

		// HA INDICACAO
		form.setEnabled("itmQuemIndicou", false);
		form.setEnabled("itmNomeCandidato", false);


		//MOTIVO ADMISSAO ADMINISTRACAO E ESTRATEGICO

		//SUBSTITUICAO DE DEMISSAO
		form.setEnabled("cpColaboradorAdm", false);
		form.setEnabled("cpFuncaoSDAdm", false);

		//SUBSTITUICAO DE FERIAS
		form.setEnabled("cpColaboradorSFAdm", false);
		form.setEnabled("cpFuncaoSFAdm", false);

		//SUBSTITUICAO DE LICENCA MATERNIDADE
		form.setEnabled("cpColaboradorLMAdm", false);
		form.setEnabled("cpFuncaoLMAdm", false);

		//SUBSTITUICAO DE ACIDENTE DE TRABALHO OU DOENCA
		form.setEnabled("cpColaboradorATDAdm", false);
		form.setEnabled("cpFuncaoATDAdm", false);

		form.setEnabled("itmNomeCargo", false);
		form.setEnabled("itmQuantidade", false);
		form.setEnabled("itmQuemIndicou", false);
		form.setEnabled("itmNomeCandidato", false);
		form.setEnabled("itmSalario", false);
		form.setEnabled("itmTipo", false);

		// DESCRICAO DO PERFIL PARA O CARGO
		form.setEnabled("cpAreaFormacao", false);
		form.setEnabled("CpEscolaridade", false);
		form.setEnabled("SuperiorCursando", false);
		form.setEnabled("cpIngles", false);
		form.setEnabled("cpEspanhol", false);

		form.setEnabled("OutrosIdiomas", false);

		form.setEnabled("CpTempoExperiencia", false);
		form.setEnabled("cpExperienciaComprovada", false);
		form.setEnabled("cpExperienciaDesejada", false);
		form.setEnabled("cpCompetencias", false);
		form.setEnabled("cpAtribuicoesCargo", false);
		form.setEnabled("cpConhecimentosTecnicos", false);
		form.setEnabled("CpDisponibilidadeViagens", false);
		form.setEnabled("cpPeriodicidade", false);
		form.setEnabled("cpDiferenciais", false);

		// APROVACOES
		form.setEnabled("cpAprovarConsultoria", false);
		form.setEnabled("cpParecerConsultoria", false);

		form.setEnabled("cpAprovarGestor", false);
		form.setEnabled("cpParecerGestor", false);

		form.setEnabled("cpAprovarGerenteGeral", false);
		form.setEnabled("cpParecerGerenteGeral", false);

		form.setEnabled("cpAprovarSuperintendente", false);
		form.setEnabled("cpParecerSuperintendente", false);

		form.setEnabled("cpAprovarDiretor", false);
		form.setEnabled("cpParecerDiretor", false);

		form.setEnabled("cpAprovarSalario", false);
		form.setEnabled("cpParecerSalario", false);

	} else if (atividade == 93) { // RECRUTAMENTO E SELECAO

		form.setEnabled("cpTipoMaoObra", false);
		form.setEnabled("cpSuperiorCursando", false);
		form.setEnabled("MotivoRequisicao", false);
		form.setEnabled("cpSuperiorCursandoIngles", false);
		form.setEnabled("cpSuperiorCursandoEspanhol", false);

		// PRODUCAO
		form.setEnabled("cpObraDepProd", false);
		form.setEnabled("cpCodSecaoProd", false);
		form.setEnabled("cpEstadoProd", false);
		form.setEnabled("cpMotivoAdmissaoProd", false);

		form.setEnabled("DescreverMotivoProd", false);

		form.setEnabled("cpRecolherDocProd", false);

		//MOTIVO ADMISSAO PRODUCAO

		//SUBSTITUICAO DE DEMISSAO
		form.setEnabled("cpColaboradorMA", false);
		form.setEnabled("cpFuncaoSDTP", false);

		//SUBSTITUICAO DE FERIAS
		form.setEnabled("cpColaboradorSF", false);
		form.setEnabled("cpFuncaoSF", false);

		//SUBSTITUICAO DE LICENCA MATERNIDADE
		form.setEnabled("cpColaboradorLM", false);
		form.setEnabled("cpFuncaoLM", false);

		//SUBSTITUICAO DE ACIDENTE DE TRABALHO OU DOENCA
		form.setEnabled("cpColaboradorATD", false);
		form.setEnabled("cpFuncaoATD", false);

		form.setEnabled("itmNomeCargo", false);
		form.setEnabled("itmQuantidade", false);
		form.setEnabled("itmQuemIndicou", false);
		form.setEnabled("itmNomeCandidato", false);
		form.setEnabled("itmSalario", false);
		form.setEnabled("itmTipo", false);

		// ADMINISTRATIVO ESTRATEGICO
		form.setEnabled("cpObraDepAE", false);
		form.setEnabled("cpCodSecaoAE", false);
		form.setEnabled("cpEstadoAE", false);
		form.setEnabled("CpCaracteristicaAE", false);
		form.setEnabled("CpTipoVagaAE", false);
		form.setEnabled("cpMotivoAdmissaoAE", false);

		form.setEnabled("DescreverMotivoAE", false);

		form.setEnabled("cpRecolherDocAE", false);
		form.setEnabled("itmNomeCargoAE", false);
		form.setEnabled("itmQuantidadeAE", false);
		form.setEnabled("itmSalarioAE", false);
		form.setEnabled("itmHaIndicacao", false);

		// HA INDICACAO
		form.setEnabled("itmQuemIndicou", false);
		form.setEnabled("itmNomeCandidato", false);


		//MOTIVO ADMISSAO ADMINISTRACAO E ESTRATEGICO

		//SUBSTITUICAO DE DEMISSAO
		form.setEnabled("cpColaboradorAdm", false);
		form.setEnabled("cpFuncaoSDAdm", false);

		//SUBSTITUICAO DE FERIAS
		form.setEnabled("cpColaboradorSFAdm", false);
		form.setEnabled("cpFuncaoSFAdm", false);

		//SUBSTITUICAO DE LICENCA MATERNIDADE
		form.setEnabled("cpColaboradorLMAdm", false);
		form.setEnabled("cpFuncaoLMAdm", false);

		//SUBSTITUICAO DE ACIDENTE DE TRABALHO OU DOENCA
		form.setEnabled("cpColaboradorATDAdm", false);
		form.setEnabled("cpFuncaoATDAdm", false);

		form.setEnabled("itmNomeCargo", false);
		form.setEnabled("itmQuantidade", false);
		form.setEnabled("itmQuemIndicou", false);
		form.setEnabled("itmNomeCandidato", false);
		form.setEnabled("itmSalario", false);
		form.setEnabled("itmTipo", false);

		// DESCRICAO DO PERFIL PARA O CARGO
		form.setEnabled("cpAreaFormacao", false);
		form.setEnabled("CpEscolaridade", false);
		form.setEnabled("SuperiorCursando", false);
		form.setEnabled("cpIngles", false);
		form.setEnabled("cpEspanhol", false);

		form.setEnabled("OutrosIdiomas", false);

		form.setEnabled("CpTempoExperiencia", false);
		form.setEnabled("cpExperienciaComprovada", false);
		form.setEnabled("cpExperienciaDesejada", false);
		form.setEnabled("cpCompetencias", false);
		form.setEnabled("cpAtribuicoesCargo", false);
		form.setEnabled("cpConhecimentosTecnicos", false);
		form.setEnabled("CpDisponibilidadeViagens", false);
		form.setEnabled("cpPeriodicidade", false);
		form.setEnabled("cpDiferenciais", false);

		// APROVACOES
		form.setEnabled("cpAprovarConsultoria", false);
		form.setEnabled("cpParecerConsultoria", false);

		form.setEnabled("cpAprovarGestor", false);
		form.setEnabled("cpParecerGestor", false);

		form.setEnabled("cpAprovarGerenteGeral", false);
		form.setEnabled("cpParecerGerenteGeral", false);

		form.setEnabled("cpAprovarSuperintendente", false);
		form.setEnabled("cpParecerSuperintendente", false);

		form.setEnabled("cpAprovarDiretor", false);
		form.setEnabled("cpParecerDiretor", false);

		form.setEnabled("cpAprovarSalario", false);
		form.setEnabled("cpParecerSalario", false);

		form.setEnabled("cpAprovarCandidatos", false);
		form.setEnabled("cpParecerCandidatos", false);

	} else if (atividade == 190) { // APROVAÇÃO DA REMUNERAÇÃO


		form.setEnabled("cpExperienciaComprovada", false);
		form.setEnabled("cpExperienciaDesejada", false);
		form.setEnabled("cpCompetencias", false);
		form.setEnabled("cpAtribuicoesCargo", false);
		form.setEnabled("cpConhecimentosTecnicos", false);
		form.setEnabled("cpDiferenciais", false);
		form.setEnabled("MotivoRequisicao", false);
		form.setEnabled("OutrosIdiomas", false);

	}
}