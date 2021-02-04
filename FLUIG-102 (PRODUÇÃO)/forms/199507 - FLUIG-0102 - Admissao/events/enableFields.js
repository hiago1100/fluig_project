function enableFields(form, customHTML) {

	log.info("Carregando o formulário FLUIG-0102 - Cadastro de novos colaboradores - enableFields - Inicio");

	var atividade = parseInt(getValue("WKNumState"));

	log.info("Carregando o formulario FLUIG-0102 - Admissao - Atividade - " + atividade);

	var lstPensaoEstado = ["SP", "AM", "RJ", "RO", "CE"];
	var lstPensaoCC = ["01.2.31601.01.002", "01.2.31601.01.001", "01.2.31601.01.005", "01.2.31601.01.003", "01.2.31601.01.004"];
	var lstCargoObra = ["GERENTE ADMINISTRATIVO", "GERENTE DE ACOMPANHAMENTO E CONTROLE", "GERENTE DE CONTABILIDADE", "GERENTE DE CONTAS A RECEBER", "GERENTE DE CONTRATOS", "GERENTE DE DESENVOLVIMENTO ORGANIZACIONA", "GERENTE DE FINANCAS CORPORATIVAS", "GERENTE DE FINANCIAMENTO IMOBILIARIO", "GERENTE DE INCORPORACAO", "GERENTE DE MARKETING", "GERENTE DE MARKETING DE PRODUTO", "GERENTE DE OBRAS", "GERENTE DE ORCAMENTOS", "GERENTE DE PLANEJAMENTO DE VENDAS", "GERENTE DE PLANEJAMENTO E CONTROLE", "GERENTE DE PROJETOS", "GERENTE DE QUALIDADE", "GERENTE DE RELACIONAMENTO COM O CLIENTE", "GERENTE DE SEGURANCA DO TRABALHO", "GERENTE DE SUPRIMENTOS", "GERENTE DE TECNOLOGIA DA INFORMACAO", "GERENTE NACIONAL DE SUPRIMENTOS", "GERENTE DE ASSISTENCIA TECNICA", "GERENTE DE COMUNICACAO E MKT", "GERENTE DE CONTROLADORIA E PLANEJAMENTO", "GERENTE DE DESENVOLVIMENTO TECNOLOGICO", "GERENTE DE DOCUMENTACAO", "GERENTE DE INFRAESTRUTURA", "GERENTE DE MANUTENCAO DE EQUIPAMENTOS", "GERENTE DE ORCAMENTOS E CONTROLE", "GERENTE DE PROCESSOS", "GERENTE DE PRODUÇÃO", "GERENTE DE RELACIONAMENTO COM SOCIOS", "GERENTE DE RH", "GERENTE DE SUSTENTABILIDADE", "GERENTE DE TESOURARIA", "ENGENHEIRO", "ENGENHEIRO CIVIL", "ENGENHEIRO CIVIL JR", "ENGENHEIRO CIVIL PL", "ENGENHEIRO CIVIL SR", "ENGENHEIRO DE INFRA ESTRUTURA TR", "ENGENHEIRO DE INFRAESTRUTURA SR", "ENGENHEIRO DE INSTALACOES JR", "ENGENHEIRO DE INSTALACOES SR", "ENGENHEIRO DE ORCAMENTOS TR", "ENGENHEIRO DE PLANEJAMENTO E CONTROLE JR", "ENGENHEIRO DE PLANEJAMENTO E CONTROLE PL", "ENGENHEIRO DE PLANEJAMENTO E CONTROLE TR", "ENGENHEIRO DE PLANEJAMENTO JR", "ENGENHEIRO DE PLANEJAMENTO TR", "ENGENHEIRO DE SEGURANCA DO TRABALHO", "ENGENHEIRO MECANICO", "ENGENHEIRO TR", "ENGENHEIRO DE DESENVOLV TECNOLOGICO JR", "ENGENHEIRO DE DESENVOLV TECNOLOGICO PL", "ENGENHEIRO DE DESENVOLV TECNOLOGICO SR", "ENGENHEIRO DE DESENVOLV TECNOLOGICO TR", "ENGENHEIRO DE INSTALACOES PL", "ENGENHEIRO DE ORCAMENTOS JR.", "ENGENHEIRO DE ORCAMENTOS PL.", "ENGENHEIRO DE ORCAMENTOS SR.", "ENGENHEIRO DE PLANEJAMENTO E CONTROLE SR", "ENGENHEIRO DE PLANEJAMENTO PL", "ENGENHEIRO DE PLANEJAMENTO SR", "ENGENHEIRO DE SEGURANÇA DO TRABALHO JR.", "ENGENHEIRO DE SEGURANÇA DO TRABALHO PL.", "ENGENHEIRO DE SEGURANÇA DO TRABALHO SR.", "SUPERINTENDENTE ADMINISTRATIVO DE OBRA", "SUPERINTENDENTE COMERCIAL", "SUPERINTENDENTE DE ENGENHARIA", "SUPERINTENDENTE DE FINANCIAMENTO IMOB", "SUPERINTENDENTE DE INCORPORACAO", "SUPERINTENDENTE DE OBRAS", "SUPERINTENDENTE DE PLANEJAMEN E CONTROLE", "DIRETOR SUPERINTENDENTE", "SUPERINTENDENTE FINANCEIRO", "SUPERINTENDENTE REGIONAL", "DIRETOR COMERCIAL", "DIRETOR DE ENGENHARIA", "DIRETOR DE RH", "DIRETOR FINANCEIRO E RI", "DIRETOR JURIDICO", "DIRETOR PRESIDENTE", "DIRETOR ADMINISTRATIVO", "DIRETOR DE ENGENHARIA TECNICA", "DIRETOR SUPERINTENDENTE"];
	var lstSeguroOdonto = ["AGENTE DE PORTARIA", "AGENTE DE RECRUTAMENTO", "AJUDANTE PRATICO DE ELETRICISTA", "AJUDANTE PRATICO DE HIDRAULICA", "APONTADOR", "APRENDIZ", "APRENDIZ SENAI", "ARMADOR", "AUTONOMO A", "AUTONOMO B", "AUXILIAR DE ALMOXARIFE", "AUXILIAR DE ELETRICA", "AUXILIAR DE ELETRICISTA", "AUXILIAR DE LABORATORIO DE CONCRETO", "AUXILIAR DE SEGURANCA DO TRABALHO", "AUXILIAR DE TOPOGRAFIA", "AZULEJISTA", "BETONEIRO", "BOMBEIRO", "BOMBEIRO HIDRAULICO", "CARPINTEIRO", "CARPINTEIRO DE ESQUADRIA", "ELETRICISTA", "ELETRICISTA PL", "ENCANADOR", "ESTAGIARIO", "ESTAGIARIO DE ENGENHARIA", "ESTAGIARIO DE TECNICO EM EDIFICACOES", "ESTAGIARIO DE TECNICO EM SEGURANCA ", "ESTAGIARIO DE TECNOLOGIA DE EDIFICIOS", "ESTAGIARIO DO ENSINO SUPERIOR", "ESTAGIARIO DO ENSINO TECNICO", "FAXINEIRO", "FERREIRO ARMADOR", "GESSEIRO", "GUINCHEIRO", "IMPERMEABILIZADOR", "INSTRUTOR DE FORMA", "LADRILHEIRO", "LIDER INSTRUTOR DE FORMA", "MARCENEIRO", "MARTELETEIRO", "MECANICO DE MANUTENCAO", "MEIO OFICIAL", "MEIO OFICIAL ARMADOR", "MEIO OFICIAL CARPINTEIRO", "MEIO OFICIAL DE BOMBEIRO", "MEIO OFICIAL DE GESSEIRO", "MEIO OFICIAL DE MONTADOR",
		"MEIO OFICIAL ELETRICISTA", "MEIO OFICIAL ENCANADOR", "MEIO OFICIAL PEDREIRO", "MEIO OFICIAL PINTOR", "MEIO OFICIAL SOLDADOR", "MONTADOR", "MOTOBOY", "MOTORISTA", "OPERADOR DE BETONEIRA", "OPERADOR DE GRADALL", "OPERADOR DE GRUA", "OPERADOR DE GUINCHO", "OPERADOR DE MANIPULADORES TELESCOPICOS", "OPERADOR DE MAQUINA", "OPERADOR DE POLICORTE", "OPERADOR DE PRANCHA", "OPERADOR DE REFRATARIA", "PEDREIRO", "PEDREIRO DE FACHADA", "PINTOR", "PORTEIRO", "PROFISSIONAL LIDER", "REJUNTADOR", "SERRALHEIRO", "SERVENTE", "SERVENTE HABILITADO", "SINALIZADOR DE GRUA", "SOLDADOR", "TECNICO DE ESTRADAS", "TECNICO DE MANUTENCAO", "TECNICO EM INSTALACOES", "TOPOGRAFO", "VIDRACEIRO", "VIGIA", "AJUDANTE DE ALMOXARIFE", "AJUDANTE PRATICO DE BOMBEIRO", "AJUDANTE PRATICO DE PEDREIRO", "ARMADOR PL", "AUX. DE MANUTENÇÃO MECÂNICA", "AUXILIAR DE ALOJAMENTO", "AUXILIAR DE HIDRAULICA", "AUXILIAR DE MANUTENCAO", "AUXILIAR DE OBRA", "BOMBEIRO PL", "BOMBEIRO SUB-OFICIAL", "CARPINTEIRO DE FORMA", "CARPINTEIRO PL", "CASEIRO", "COPEIRO", "ELETRICISTA OFICIAL", "ELETRICISTA SUB-OFICIAL", "ESTAGIARIO DE TECNOLOGIA EM CONSTRUCAO ", "GREIDISTA", "GUARDIAO OBRA", "INSTRUTOR DE FORMA I", "INSTRUTOR DE FORMA II", "JARDINEIRO", "LUBRIFICADOR DE VEICULOS AUTOMOTIVOS", "MEIO OFICIAL DE DRENAGEM", "MEIO OFICIAL DE MONTADOR ESTRUTURAL", "MENOR APRENDIZ", "MONTADOR DE PRÉ-MOLDADO", "MONTADOR E MANUNTENTOR DE GRUA", "MOTORISTA CARRETEIRO", "OFICIAL PL", "OPERADOR DE  RETRO ESCAVADEIRA", "OPERADOR DE DAMPER ", "OPERADOR DE EQUIPAMENTO", "OPERADOR DE ESCAVADEIRA", "OPERADOR DE GUINDAUTO", "OPERADOR DE MAQUINA LEVE", "OPERADOR DE MAQUINA PESADA", "OPERADOR DE MOTONIVELADORA", "OPERADOR DE RETROESCAVADEIRA", "OPERADOR DE ROLO COMPACTADOR", "OPERADOR DE SERRA CIRCULAR", "PEDREIRO OFICIAL", "PEDREIRO PL", "PEDREIRO POLIVALENTE", "POCEIRO"];

	var atividadesCampos = [
		{ "campo": "cpDataInicio", "atividade": "105" },
		{ "campo": "cpCadastroCancelado", "atividade": "28" },
		{ "campo": "cpDataAdmissao", "atividade": "3,85" },
		{ "campo": "cpSeguroSaude", "atividade": "3,85" },
		{ "campo": "cpValeTransporte", "atividade": "3,85" },
		{ "campo": "cpPlanoOdontologico", "atividade": "3,85" },
		{ "campo": "cpCestaBasica", "atividade": "3,85" },
		{ "campo": "cpValeAlimRefeicao", "atividade": "3,85" },
		{ "campo": "cpConvenioFarmacia", "atividade": "3,85" },
		{ "campo": "cpParecerRecolhimento", "atividade": "3,85" },
		{ "campo": "cpNomeCompleto", "atividade": "3,85" },
		{ "campo": "cpCpf", "atividade": "3,85" },
		{ "campo": "cpDBCartaoAtivo", "atividade": "3,85" },
		{ "campo": "cpDBTipoConta", "atividade": "3,85" },
		{ "campo": "cpDBAgencia", "atividade": "3,85" },
		{ "campo": "cpDBNConta", "atividade": "3,85" },
		{ "campo": "cpDBOperacao", "atividade": "3,85" },
		{ "campo": "cpSituacao", "atividade": "3,85" },
		{ "campo": "cpHorarioTrabalho", "atividade": "3,85" },
		{ "campo": "cpViasDesemprego", "atividade": "3,85" },
		{ "campo": "cpColaboradorKitGerado", "atividade": "8" },
		{ "campo": "cpMatriculaKitGerado", "atividade": "8" },
		{ "campo": "cpDataAdmissaoKitGerado", "atividade": "8" },
		{ "campo": "cpDocumentacaoEntregue", "atividade": "8" },
		{ "campo": "cpAprovacaoDocumentacao", "atividade": "8" },
		{ "campo": "cpMotivoReprovacao", "atividade": "8" },
		{ "campo": "cpParecerDocumentacao", "atividade": "8" },
		{ "campo": "cpKitValeTransporte", "atividade": "8" },
		{ "campo": "cpKitPlanoOdontologico", "atividade": "8" },
		{ "campo": "cpKitCestaBasica", "atividade": "8" },
		{ "campo": "cpKitGoodCard", "atividade": "8" },
		{ "campo": "cpKitValeAlimRefeicao", "atividade": "8" },
		{ "campo": "cpConferenciaKitAdmissional", "atividade": "18" },
		{ "campo": "cpConfKitParecer", "atividade": "18" },
		{ "campo": "cpMotivoReprovacaoConfKit", "atividade": "18" },
		{ "campo": "cpRecolAssinatura", "atividade": "22,114" },
		{ "campo": "cpRecolAssinaturaParecer", "atividade": "22,114" },
		{ "campo": "cpEnvioNome", "atividade": "27,117" },
		{ "campo": "cpEnvioSecao", "atividade": "27,117" },
		{ "campo": "cpEnvioFuncao", "atividade": "27,117" },
		{ "campo": "cpEnvioDtAdmissao", "atividade": "27,117" },
		{ "campo": "cpSeguroCadastrado", "atividade": "34" },
		{ "campo": "cpCadastroCancelado", "atividade": "28,121" },
		{ "campo": "cpCadastroCanceladoParecer", "atividade": "28,121" },
		{ "campo": "cpEncerramentoParecer", "atividade": "125" },
		{ "campo": "cpDataProgramadaAdmissao", "atividade": "105,111" },
		{ "campo": "cpCentroCusto", "atividade": "105,111" },
		//{"campo":"cpCodigoSecao","atividade":"105,111"},
		{ "campo": "cpGestor", "atividade": "105,111" },
		{ "campo": "cpEstado", "atividade": "105,111" },
		{ "campo": "cpSalario", "atividade": "105,111" },
		{ "campo": "cpSeguroParecer", "atividade": "34" },
		{ "campo": "cpCadVT", "atividade": "191" },
		{ "campo": "cpParecerCadVT", "atividade": "191" },
		{ "campo": "cpAprovacaopostoTrabalhoManual", "atividade": "211" },
		{ "campo": "cpParecerpostoTrabalhoManual", "atividade": "211" },

	];
	for (var indice in atividadesCampos) {
		var campo = atividadesCampos[indice],
			atividades = campo["atividade"].split(",");

		if (atividades.indexOf(atividade.toString()) >= 0) {
			form.setEnabled(campo["campo"], true);
		}
		else {
			form.setEnabled(campo["campo"], false);
		}
	}
	//

	/** PolyFill - para função FIND, usada em Array */
	if (!Array.prototype.find) {
		Array.prototype.find = function (predicate) {

			if (this === null) { throw new TypeError('Falha da função: [Array.prototype.find]'); }
			if (typeof predicate !== 'function') { throw new TypeError('falha na chamada da função FIND'); }

			var list = Object(this);
			var length = list.length >>> 0;
			var thisArg = arguments[1];
			var value;

			for (var i = 0; i < length; i++) {
				value = list[i];
				if (predicate.call(thisArg, value, i, list)) {
					return value;
				}
			}
			return undefined;
		};
	};

	// INICIO E RECOLHIMENTO DA DOCUMENCAO
	if (atividade == 3 || atividade == 85) {

		//CONTROLE DE CAMPOS A PARTIR DE VALOR DE CAMPO DE FORMULARIO
		var cargo = form.getValue("cpFuncao");
		var obrasede = form.getValue("cpObraSede");
		var regional = form.getValue("cpRegional");
		var maoObra = form.getValue("cpMaoDeObra");
		var centrocusto = form.getValue("cpCentroCusto");
		var estado = form.getValue("cpEstado");
		var codSecao = form.getValue("cpCodigoSecao");
		var camposEstagiario = [];

		var encontrouCargo = lstSeguroOdonto.find(function (element) { return element == cargo; });
		var encontrouEstado = lstPensaoEstado.find(function (element) { return element == estado });
		var encontrouSecao = lstPensaoCC.find(function (element) { return element == codSecao });
		var encontrouObra = lstCargoObra.find(function (element) { return element == cargo });

		//Cesta Basica é sempre bloqueada;
		camposEstagiario.push("cpCestaBasica");

		if (centrocusto.indexOf("ERCMG") >= 0 || centrocusto.indexOf("ERIMG") >= 0) {
			obrasede = "0";		//SEDE
		}

		if (estado != "AM" && estado != "GO") {
			camposEstagiario.push("cpConvenioFarmacia");
		}

		if (encontrouCargo != undefined) {
			camposEstagiario.push("cpSeguroSaude");
			camposEstagiario.push("cpPlanoOdontologico");
		}

		if (regional == 1 && (maoObra == 1 || maoObra == 2)) {
			camposEstagiario.push("cpValeAlimRefeicao");
		}

		if ((cargo.indexOf("APRENDIZ") > 0) || (obrasede == "1" && encontrouObra == undefined)) {
			camposEstagiario.push("cpValeAlimRefeicao");
		}

		if ((cargo.indexOf("ESTAGIARIO") >= 0 && estado == "MG") || (centrocusto.indexOf("ERC") > 0 || centrocusto.indexOf("ERI") > 0)) {
			camposEstagiario.push("cpSeguroSaude");
			camposEstagiario.push("cpPlanoOdontologico");
			camposEstagiario.push("cpConvenioFarmacia");
			camposEstagiario.push("cpValeAlimRefeicao");

		} else if (cargo.indexOf("ESTAGIARIO") >= 0 && obrasede == "0") {
			camposEstagiario.push("cpSeguroSaude");
			camposEstagiario.push("cpPlanoOdontologico");
			camposEstagiario.push("cpConvenioFarmacia");

		} else if (cargo.indexOf("ESTAGIARIO") >= 0 && obrasede == "1") {
			camposEstagiario.push("cpSeguroSaude");
			camposEstagiario.push("cpPlanoOdontologico");
			camposEstagiario.push("cpConvenioFarmacia");
			camposEstagiario.push("cpValeAlimRefeicao");
		}
		/**Campos desabilitados temporariamente, aguardando especificação de nova
		 * versão do processo
		for(var indice in camposEstagiario){
			var campoBeneficio = camposEstagiario[indice];
			form.setEnabled(campoBeneficio,false); 
		}
		*/
	}

	/* Habilita campos Kit Beneficio */
	if (atividade == 8) {

		var planoOdonto = form.getValue("cpPlanoOdontologico");
		var cestaBasica = form.getValue("cpCestaBasica");
		var convenioFarmacia = form.getValue("cpConvenioFarmacia");
		var valeAlimRefeicao = form.getValue("cpValeAlimRefeicao");
		var valeTransporte = form.getValue("cpValeTransporte");

		var camposKitBeneficio = [
			{ "campo": "cpKitPlanoOdontologico", "valor": planoOdonto },
			{ "campo": "cpKitCestaBasica", "valor": cestaBasica },
			{ "campo": "cpKitGoodCard", "valor": convenioFarmacia },
			{ "campo": "cpKitValeAlimRefeicao", "valor": valeAlimRefeicao },
			{ "campo": "cpKitValeTransporte", "valor": valeTransporte }
		];
		camposKitBeneficio.forEach(function (camposKit) {
			if (camposKit.valor == 1) { form.setEnabled(camposKit.campo, true); }
			else { form.setEnabled(camposKit.campo, false); }
		});
	}

	log.info("Fim do EnableFields do formulário FLUIG-0102 - Cadastro de novos colaboradores");
}