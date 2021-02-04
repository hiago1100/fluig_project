function afterTaskCreate(colleagueId) {

	var numEmpresa = getValue("WKCompany");
	var numProcesso = getValue("WKNumProces");
	var nrProxAtividade = getValue("WKNextState");

	//CENTRAL DE TAREFAS
	addCentralTarefasInfo(getValue("WKDef"), getValue("WKNumProces"));

	var lstPensaoEstado = ["SP", "AM", "RJ", "RO", "CE"];
	var lstPensaoCC = ["01.2.31601.01.002", "01.2.31601.01.001", "01.2.31601.01.005", "01.2.31601.01.003", "01.2.31601.01.004"];
	var lstCargoObra = ["GERENTE ADMINISTRATIVO", "GERENTE DE ACOMPANHAMENTO E CONTROLE", "GERENTE DE CONTABILIDADE", "GERENTE DE CONTAS A RECEBER", "GERENTE DE CONTRATOS", "GERENTE DE DESENVOLVIMENTO ORGANIZACIONA", "GERENTE DE FINANCAS CORPORATIVAS", "GERENTE DE FINANCIAMENTO IMOBILIARIO", "GERENTE DE INCORPORACAO", "GERENTE DE MARKETING", "GERENTE DE MARKETING DE PRODUTO", "GERENTE DE OBRAS", "GERENTE DE ORCAMENTOS", "GERENTE DE PLANEJAMENTO DE VENDAS", "GERENTE DE PLANEJAMENTO E CONTROLE", "GERENTE DE PROJETOS", "GERENTE DE QUALIDADE", "GERENTE DE RELACIONAMENTO COM O CLIENTE", "GERENTE DE SEGURANCA DO TRABALHO", "GERENTE DE SUPRIMENTOS", "GERENTE DE TECNOLOGIA DA INFORMACAO", "GERENTE NACIONAL DE SUPRIMENTOS", "GERENTE DE ASSISTENCIA TECNICA", "GERENTE DE COMUNICACAO E MKT", "GERENTE DE CONTROLADORIA E PLANEJAMENTO", "GERENTE DE DESENVOLVIMENTO TECNOLOGICO", "GERENTE DE DOCUMENTACAO", "GERENTE DE INFRAESTRUTURA", "GERENTE DE MANUTENCAO DE EQUIPAMENTOS", "GERENTE DE ORCAMENTOS E CONTROLE", "GERENTE DE PROCESSOS", "GERENTE DE PRODUÇÃO", "GERENTE DE RELACIONAMENTO COM SOCIOS", "GERENTE DE RH", "GERENTE DE SUSTENTABILIDADE", "GERENTE DE TESOURARIA", "ENGENHEIRO", "ENGENHEIRO CIVIL", "ENGENHEIRO CIVIL JR", "ENGENHEIRO CIVIL PL", "ENGENHEIRO CIVIL SR", "ENGENHEIRO DE INFRA ESTRUTURA TR", "ENGENHEIRO DE INFRAESTRUTURA SR", "ENGENHEIRO DE INSTALACOES JR", "ENGENHEIRO DE INSTALACOES SR", "ENGENHEIRO DE ORCAMENTOS TR", "ENGENHEIRO DE PLANEJAMENTO E CONTROLE JR", "ENGENHEIRO DE PLANEJAMENTO E CONTROLE PL", "ENGENHEIRO DE PLANEJAMENTO E CONTROLE TR", "ENGENHEIRO DE PLANEJAMENTO JR", "ENGENHEIRO DE PLANEJAMENTO TR", "ENGENHEIRO DE SEGURANCA DO TRABALHO", "ENGENHEIRO MECANICO", "ENGENHEIRO TR", "ENGENHEIRO DE DESENVOLV TECNOLOGICO JR", "ENGENHEIRO DE DESENVOLV TECNOLOGICO PL", "ENGENHEIRO DE DESENVOLV TECNOLOGICO SR", "ENGENHEIRO DE DESENVOLV TECNOLOGICO TR", "ENGENHEIRO DE INSTALACOES PL", "ENGENHEIRO DE ORCAMENTOS JR.", "ENGENHEIRO DE ORCAMENTOS PL.", "ENGENHEIRO DE ORCAMENTOS SR.", "ENGENHEIRO DE PLANEJAMENTO E CONTROLE SR", "ENGENHEIRO DE PLANEJAMENTO PL", "ENGENHEIRO DE PLANEJAMENTO SR", "ENGENHEIRO DE SEGURANÇA DO TRABALHO JR.", "ENGENHEIRO DE SEGURANÇA DO TRABALHO PL.", "ENGENHEIRO DE SEGURANÇA DO TRABALHO SR.", "SUPERINTENDENTE ADMINISTRATIVO DE OBRA", "SUPERINTENDENTE COMERCIAL", "SUPERINTENDENTE DE ENGENHARIA", "SUPERINTENDENTE DE FINANCIAMENTO IMOB", "SUPERINTENDENTE DE INCORPORACAO", "SUPERINTENDENTE DE OBRAS", "SUPERINTENDENTE DE PLANEJAMEN E CONTROLE", "DIRETOR SUPERINTENDENTE", "SUPERINTENDENTE FINANCEIRO", "SUPERINTENDENTE REGIONAL", "DIRETOR COMERCIAL", "DIRETOR DE ENGENHARIA", "DIRETOR DE RH", "DIRETOR FINANCEIRO E RI", "DIRETOR JURIDICO", "DIRETOR PRESIDENTE", "DIRETOR ADMINISTRATIVO", "DIRETOR DE ENGENHARIA TECNICA", "DIRETOR SUPERINTENDENTE"];
	var lstSeguroOdonto = ["AGENTE DE PORTARIA", "AGENTE DE RECRUTAMENTO", "AJUDANTE PRATICO DE ELETRICISTA", "AJUDANTE PRATICO DE HIDRAULICA", "APONTADOR", "APRENDIZ", "APRENDIZ SENAI", "ARMADOR", "AUTONOMO A", "AUTONOMO B", "AUXILIAR DE ALMOXARIFE", "AUXILIAR DE ELETRICA", "AUXILIAR DE ELETRICISTA", "AUXILIAR DE LABORATORIO DE CONCRETO", "AUXILIAR DE SEGURANCA DO TRABALHO", "AUXILIAR DE TOPOGRAFIA", "AZULEJISTA", "BETONEIRO", "BOMBEIRO", "BOMBEIRO HIDRAULICO", "CARPINTEIRO", "CARPINTEIRO DE ESQUADRIA", "ELETRICISTA", "ELETRICISTA PL", "ENCANADOR", "ESTAGIARIO", "ESTAGIARIO DE ENGENHARIA", "ESTAGIARIO DE TECNICO EM EDIFICACOES", "ESTAGIARIO DE TECNICO EM SEGURANCA ", "ESTAGIARIO DE TECNOLOGIA DE EDIFICIOS", "ESTAGIARIO DO ENSINO SUPERIOR", "ESTAGIARIO DO ENSINO TECNICO", "FAXINEIRO", "FERREIRO ARMADOR", "GESSEIRO", "GUINCHEIRO", "IMPERMEABILIZADOR", "INSTRUTOR DE FORMA", "LADRILHEIRO", "LIDER INSTRUTOR DE FORMA", "MARCENEIRO", "MARTELETEIRO", "MECANICO DE MANUTENCAO", "MEIO OFICIAL", "MEIO OFICIAL ARMADOR", "MEIO OFICIAL CARPINTEIRO", "MEIO OFICIAL DE BOMBEIRO", "MEIO OFICIAL DE GESSEIRO", "MEIO OFICIAL DE MONTADOR", "MEIO OFICIAL ELETRICISTA", "MEIO OFICIAL ENCANADOR", "MEIO OFICIAL PEDREIRO", "MEIO OFICIAL PINTOR", "MEIO OFICIAL SOLDADOR", "MONTADOR", "MOTOBOY", "MOTORISTA", "OPERADOR DE BETONEIRA", "OPERADOR DE GRADALL", "OPERADOR DE GRUA", "OPERADOR DE GUINCHO", "OPERADOR DE MANIPULADORES TELESCOPICOS", "OPERADOR DE MAQUINA", "OPERADOR DE POLICORTE", "OPERADOR DE PRANCHA", "OPERADOR DE REFRATARIA", "PEDREIRO", "PEDREIRO DE FACHADA", "PINTOR", "PORTEIRO", "PROFISSIONAL LIDER", "REJUNTADOR", "SERRALHEIRO", "SERVENTE", "SERVENTE HABILITADO", "SINALIZADOR DE GRUA", "SOLDADOR", "TECNICO DE ESTRADAS", "TECNICO DE MANUTENCAO", "TECNICO EM INSTALACOES", "TOPOGRAFO", "VIDRACEIRO", "VIGIA", "AJUDANTE DE ALMOXARIFE", "AJUDANTE PRATICO DE BOMBEIRO", "AJUDANTE PRATICO DE PEDREIRO", "ARMADOR PL", "AUX. DE MANUTENÇÃO MECÂNICA", "AUXILIAR DE ALOJAMENTO", "AUXILIAR DE HIDRAULICA", "AUXILIAR DE MANUTENCAO", "AUXILIAR DE OBRA", "BOMBEIRO PL", "BOMBEIRO SUB-OFICIAL", "CARPINTEIRO DE FORMA", "CARPINTEIRO PL", "CASEIRO", "COPEIRO", "ELETRICISTA OFICIAL", "ELETRICISTA SUB-OFICIAL", "ESTAGIARIO DE TECNOLOGIA EM CONSTRUCAO ", "GREIDISTA", "GUARDIAO OBRA", "INSTRUTOR DE FORMA I", "INSTRUTOR DE FORMA II", "JARDINEIRO", "LUBRIFICADOR DE VEICULOS AUTOMOTIVOS", "MEIO OFICIAL DE DRENAGEM", "MEIO OFICIAL DE MONTADOR ESTRUTURAL", "MENOR APRENDIZ", "MONTADOR DE PRÉ-MOLDADO", "MONTADOR E MANUNTENTOR DE GRUA", "MOTORISTA CARRETEIRO", "OFICIAL PL", "OPERADOR DE  RETRO ESCAVADEIRA", "OPERADOR DE DAMPER ", "OPERADOR DE EQUIPAMENTO", "OPERADOR DE ESCAVADEIRA", "OPERADOR DE GUINDAUTO", "OPERADOR DE MAQUINA LEVE", "OPERADOR DE MAQUINA PESADA", "OPERADOR DE MOTONIVELADORA", "OPERADOR DE RETROESCAVADEIRA", "OPERADOR DE ROLO COMPACTADOR", "OPERADOR DE SERRA CIRCULAR", "PEDREIRO OFICIAL", "PEDREIRO PL", "PEDREIRO POLIVALENTE", "POCEIRO"];

	var hoje = new Date();

	//Converte data do formato dd/mm/aaaa para objeto Date()
	function converteData(dateString) {
		var dtArray = String(dateString).split('/');
		return new Date(dtArray[2], dtArray[1] - 1, dtArray[0]);
	}

	/** PolyFill - para função FIND, usada em Array */
	if (!Array.prototype.find) {
		Array.prototype.find = function (predicate) {

			if (this === null) { throw new TypeError('Array.prototype.find called on null or undefined'); }
			if (typeof predicate !== 'function') { throw new TypeError('predicate must be a function'); }

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

	if (nrProxAtividade == 20) {
		var conferenciaKit = hAPI.getCardValue('cpConferenciaKitAdmissional') == 1 ? "Documentação Correta" : "Ajustar Documentação";
		var motivoReprovacao = hAPI.getCardValue('cpMotivoReprovacaoConfKit');
		var motivos = ["", "Falta documentação", "Dado Incorreto"];
		var parecerKit = hAPI.getCardValue('cpConfKitParecer');

		var dia = hoje.getDate();
		var mes = hoje.getMonth() + 1;

		if (dia < 10) { dia = "0" + dia; }
		if (mes < 10) { mes = "0" + mes; }

		var dateString = dia + '/' + mes + '/' + hoje.getFullYear() + ' - ' + hoje.getHours() + ':' + hoje.getMinutes() + ':' + hoje.getSeconds();
		var childData = new java.util.HashMap();

		childData.put("aprovacaoKit", conferenciaKit);
		childData.put("dataAprovacaoKit", dateString);
		childData.put("MotivoKit", motivos[motivoReprovacao]);
		childData.put("dataParecerKit", parecerKit);
		hAPI.addCardChild("histKit", childData);
	}

	if (nrProxAtividade == "8") {
		var novoPrazo;
		var horasPrazoMilesegundos;

		if (hAPI.getCardValue('cpObraSede') == '0') {
			novoPrazo = converteData(hAPI.getCardValue('cpDataInicio'));
			horasPrazoMilesegundos = 64800; //18:00hrs
		} else {
			novoPrazo = converteData(hAPI.getCardValue('cpDataAdmissao'));
			horasPrazoMilesegundos = 43200; //12:00hrs

			//Dia util predecessor ao prazo 
			novoPrazo.setDate(novoPrazo.getDate() - 1);

			while (novoPrazo.getDay() == 0 || novoPrazo.getDay() == 6) {
				novoPrazo.setDate(novoPrazo.getDate() - 1);
			}
		}

		hAPI.setDueDate(numProcesso, hAPI.getActualThread(numEmpresa, numProcesso, nrProxAtividade), colleagueId, novoPrazo, horasPrazoMilesegundos);

		var planoOdont = hAPI.getCardValue("cpPlanoOdontologico");
		var cestaBasica = hAPI.getCardValue("cpCestaBasica");
		var convenioFarm = hAPI.getCardValue("cpConvenioFarmacia");
		var setValeAlmRef = hAPI.getCardValue("cpValeAlimRefeicao");
		var valeTransporte = hAPI.getCardValue("cpValeTransporte");

		var beneficios = [
			{ "kit": "cpKitPlanoOdontologico", "opcaoSelecionada": planoOdont },
			{ "kit": "cpKitCestaBasica", "opcaoSelecionada": cestaBasica },
			{ "kit": "cpKitGoodCard", "opcaoSelecionada": convenioFarm },
			{ "kit": "cpKitValeTransporte", "opcaoSelecionada": valeTransporte }
		];

		if (setValeAlmRef == 3) {
			hAPI.setCardValue("cpKitValeAlimRefeicao", "2");
		} else {
			hAPI.setCardValue("cpKitValeAlimRefeicao", setValeAlmRef);
		}

		beneficios.forEach(function (beneficio) {
			if (beneficio.opcaoSelecionada == 2) {
				hAPI.setCardValue(beneficio.kit, beneficio.opcaoSelecionada);
			} else {
				hAPI.setCardValue(beneficio.kit, 0);
			}
		});

		// limpar campo motivo
		hAPI.setCardValue('cpMotivoReprovacaoConfKit', '');
		hAPI.setCardValue("cpMotivoReprovacao", '');

	}  //Recolhimento da Documentação Sede 
	else if (nrProxAtividade == "85") {
		var dataInicio = converteData(hAPI.getCardValue('cpDataInicio'));
		var i = 1
		while (i <= 3) {
			dataInicio.setDate(dataInicio.getDate() - 1);
			if (dataInicio.getDay() == 0 || dataInicio.getDay() == 6) {
				//Nao incrementa o contador, se for final de semana.
			} else {
				i++;
			}
		}
		var dataPrazo = dataInicio;
		var horarioPrazoMilesegundos = 64800; //18:00hrs
		hAPI.setDueDate(numProcesso, hAPI.getActualThread(numEmpresa, numProcesso, nrProxAtividade), colleagueId, dataPrazo, horarioPrazoMilesegundos);

	} else if (nrProxAtividade == "3") {

		var TipoMaoObra = hAPI.getCardValue("cpMaoDeObra");
		if (TipoMaoObra == "3" || TipoMaoObra == "4") {
			var DataInicio = hAPI.getCardValue("cpDataProgramadaAdmissao");
			var DataSplit = DataInicio.split("/");
			var NovoPrazo = new Date(DataSplit[2], (parseInt(DataSplit[1] - 1)), DataSplit[0]);
			var DiasParaDiminuir = 3;

			while (DiasParaDiminuir > 0) {
				NovoPrazo.setDate(NovoPrazo.getDate() - 1);
				if (NovoPrazo.getDay() != 0 && NovoPrazo.getDay() != 6) {
					DiasParaDiminuir -= 1;
				}
			}
			hAPI.setDueDate(numProcesso, hAPI.getActualThread(numEmpresa, numProcesso, nrProxAtividade), colleagueId, NovoPrazo, 64800);
		}

	} else if (nrProxAtividade == "22") {

		var DataInicio = hAPI.getCardValue("cpDataAdmissao");
		var DataSplit = DataInicio.split("/");
		var NovoPrazo = new Date(DataSplit[2], (parseInt(DataSplit[1] - 1)), DataSplit[0]);
		hAPI.setDueDate(numProcesso, hAPI.getActualThread(numEmpresa, numProcesso, nrProxAtividade), colleagueId, NovoPrazo, 50400);

	} else if (nrProxAtividade == "114") {

		var DataInicio = hAPI.getCardValue("cpDataInicio");
		var DataSplit = DataInicio.split("/");
		var NovoPrazo = new Date(DataSplit[2], (parseInt(DataSplit[1] - 1)), DataSplit[0]);

		var DiasParaAdicionar = 1;
		while (DiasParaAdicionar > 0) {
			NovoPrazo.setDate(NovoPrazo.getDate() + 1);
			if (NovoPrazo.getDay() != 0 && NovoPrazo.getDay() != 6) {
				DiasParaAdicionar -= 1;
			}
		}

		hAPI.setDueDate(numProcesso, hAPI.getActualThread(numEmpresa, numProcesso, nrProxAtividade), colleagueId, NovoPrazo, 43200);
	}

	//CONTROLE DE CAMPOS A PARTIR DE VALOR DE CAMPO DE FORMULARIO
	if (nrProxAtividade == 3 || nrProxAtividade == 85) {

		//CONTROLE DE CAMPOS A PARTIR DE VALOR DE CAMPO DE FORMULARIO
		var cargo = hAPI.getCardValue("cpFuncao");
		var obrasede = parseInt(hAPI.getCardValue("cpObraSede"));
		var regional = hAPI.getCardValue("cpRegional");
		var maoObra = hAPI.getCardValue("cpMaoDeObra");
		var centrocusto = hAPI.getCardValue("cpCentroCusto");
		var estado = hAPI.getCardValue("cpEstado");
		var codSecao = hAPI.getCardValue("cpCodigoSecao");

		var encontrouCargo = lstSeguroOdonto.find(function (element) { return element == cargo; });
		var encontrouEstado = lstPensaoEstado.find(function (element) { return element == estado });
		var encontrouSecao = lstPensaoCC.find(function (element) { return element == codSecao });
		var encontrouObra = lstCargoObra.find(function (element) { return element == cargo });


		//SEDE
		if (centrocusto.indexOf("ERCMG") >= 0 || centrocusto.indexOf("ERIMG") >= 0) {
			obrasede = 0;
		}

		if (estado != "AM" && estado != "GO") {
			hAPI.setCardValue("cpConvenioFarmacia", 2);
		}

		if (encontrouCargo != undefined) {
			hAPI.setCardValue("cpSeguroSaude", 2);
			hAPI.setCardValue("cpPlanoOdontologico", 2);
		}

		if (encontrouEstado != undefined || encontrouSecao != undefined) {
			hAPI.setCardValue("cpCestaBasica", 1);
		} else {
			hAPI.setCardValue("cpCestaBasica", 2);
		}

		if (regional == 1 && (maoObra == 1 || maoObra == 2)) {
			hAPI.setCardValue("cpValeAlimRefeicao", 3);
		}

		if (estado == "RJ" && (codSecao == "01.2.32401.01.001" || codSecao == "01.2.32401.01.002")) {
			hAPI.setCardValue("cpCestaBasica", 2);
		}

		if ((cargo.indexOf("APRENDIZ") > 0) || (obrasede == "1" && encontrouObra == undefined)) {
			hAPI.setCardValue("cpValeAlimRefeicao", 3);
		}

		if ((cargo.indexOf("ESTAGIARIO") >= 0 && estado == "MG") || (centrocusto.indexOf("ERC") > 0 || centrocusto.indexOf("ERI") > 0)) {
			hAPI.setCardValue("cpSeguroSaude", 2);
			hAPI.setCardValue("cpPlanoOdontologico", 2);
			hAPI.setCardValue("cpCestaBasica", 2);
			hAPI.setCardValue("cpConvenioFarmacia", 2);
			hAPI.setCardValue("cpValeAlimRefeicao", 3);

		} else if (cargo.indexOf("ESTAGIARIO") >= 0 && obrasede == "0") {
			hAPI.setCardValue("cpSeguroSaude", 2);
			hAPI.setCardValue("cpPlanoOdontologico", 2);
			hAPI.setCardValue("cpCestaBasica", 1);
			hAPI.setCardValue("cpConvenioFarmacia", 2);

		} else if (cargo.indexOf("ESTAGIARIO") >= 0 && obrasede == "1") {
			hAPI.setCardValue("cpSeguroSaude", 2);
			hAPI.setCardValue("cpPlanoOdontologico", 2);
			hAPI.setCardValue("cpCestaBasica", 1);
			hAPI.setCardValue("cpConvenioFarmacia", 2);
			hAPI.setCardValue("cpValeAlimRefeicao", 3);
		}

	}

	//CAMPO DESCRITOR
	var centroCusto = hAPI.getCardValue("cpCentroCusto"),
		funcao = hAPI.getCardValue("cpFuncao");

	if (nrProxAtividade == 3) {
		hAPI.setCardValue("cpDescritor", centroCusto + ' - ' + funcao);
	} else {
		hAPI.setCardValue("cpDescritor", centroCusto);
	}

}