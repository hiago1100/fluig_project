// Retorna número da atividade
var getAtividade = function() {
	if (getWKNumState() === null) {
		return 1;
	}
	return parseInt(getWKNumState());

};

$(document).ready(function() {
	startProcess();
	
	var aprov = $("#aprovarCMP").val();

	if (aprov == "1") {
		$("#blockAvaliacao").show();
	} else {
		$("#blockAvaliacao").hide();
	}
	$("#cpTransferencia").change(function() {
		
		$("#cpMesCompetencia").val(getMesCompTransf());
	});

});


function getMesCompTransf () {
	var mesesFerias = $("#cpPeriodoFimFerias").val();
	var Transferencia = $("#cpTransferencia").val();
    var competencia = new Date();
    
    competencia.setDate(01);
	competencia.setMonth(competencia.getMonth() + 1);
/*	
	if(isLastDayOfMonth(competencia) && (competencia.getHours() > 17)){
		competencia.setMonth(competencia.getMonth() + 1);
	}*/
	
	if (mesesFerias) {
		var fim = new Date(mesesFerias);
		if(fim>competencia){
        
        
        competencia.setMonth(fim.getMonth());
        competencia.setYear(fim.getFullYear());
          competencia.setMonth(competencia.getMonth() + 1);
		}
        
      
	}
	
	if (competencia.getMonth() === 11 && Transferencia=="1") {
	    competencia.setMonth(competencia.getMonth() + 1);
	    
	    
	}

	 var mes = competencia.getMonth() + 1;
	    
	    if (mes < 10) {
	        mes = '0' + mes;
	    }

	 return (mes + "/" + + competencia.getFullYear());
};
var startProcess = function() {

	// Captura número da atividade
	var atividade = getAtividade(), formMode = getFormMode();

	if (atividade == "85") {
		$("#aprovarCMP").change(function() {
			var aprov = $("#aprovarCMP").val();

			if (aprov == "1") {
				$("#blockAvaliacao").show();
			} else {
				$("#blockAvaliacao").hide();
			}
		});
	}

	// se tiver transf aparece a opcao de mandar de volta para correcao na
	// remuneracao, se nao nao tem essa opcao no preenchimento da folha
	var Transf = $("#cpTransferencia").val();
	if (Transf == "1") {
		$(".obra").show();
	} else {
		$(".obra").hide();

	}

	if (((atividade == 1) || (atividade == 0) || (atividade == 141) || (atividade == 374))
			&& (formMode != "VIEW")) {

		/***********************************************************************
		 * Eventos Zoom
		 **********************************************************************/

		// Abre zoom de seleção do obra/departamento de origem
		$("#BuscarCpObraDep").click(function() {
			FormularioDeMovimentacao.buscarObraDep();
		});

		// Abre zoom de seleção do colaborador
		$("#BuscarCpColaborador").click(function() {
			FormularioDeMovimentacao.buscarColaborador();
		});

		// Abre zoom da obra/departamento de destino
		$("#BuscarCpNovaObraDep").click(function() {
			FormularioDeMovimentacao.buscarNovaObraDep();
		});

		// Abre zoom para selecao de responsavel pelo preenchimento dos dados da
		// movimentacao
		$('#BuscarPreenchedor').click(function() {
			FormularioDeMovimentacao.buscarPreenchedor();
		});

		$('#BuscarRecolhedorASO').click(function() {
			FormularioDeMovimentacao.buscarRecolhedorASO();
		});

		$('#apagaPreenchedor').click(function() {
			FormularioDeMovimentacao.apagaPreenchedor();
		});

		$('#apagaRecolhedorASO').click(function() {
			FormularioDeMovimentacao.apagaRecolhedorASO();
		});

		/***********************************************************************
		 * Eventos Zoom - Pos Selecao
		 **********************************************************************/

		// Evento de resposta pós seleção da obra/departamento de origem
		$("#FormMovimentacaoDePessoal").on("selectedObraDep",
				function(ev, secao) {
					FormularioDeMovimentacao.selectedObraDep(secao);
				});

		// Evento de resposta pós seleção do colaborador
		$("#FormMovimentacaoDePessoal").on(
				"selectedColaborador",
				function(ev, colaborador) {
					var coligada = $("#cpCodEmpresa").val();
					FormularioDeMovimentacao.selectedColaborador(colaborador,
							coligada);
				});

		// Evento de resposta pós seleção de obra/departamento de destino
		$("#FormMovimentacaoDePessoal").on("selectedNovaObraDep",
				function(ev, secao) {
					FormularioDeMovimentacao.selectedNovaObraDep(secao);
				});

		$("#FormMovimentacaoDePessoal")
				.on(
						"selectedPreenchedor",
						function(ev, preenchedor) {
							var solicitante = $("#cpMatriculaSolicitante")
									.val(), tipoMaoObra = $("#cpTipoMaoObra")
									.val();

							FormularioDeMovimentacao.selectedPreenchedor(
									solicitante, preenchedor, tipoMaoObra);
						});

		$("#FormMovimentacaoDePessoal").on("selectedRecolhedorASO",
				function(ev, recolhedor) {
					FormularioDeMovimentacao.preencheRecolhedorASO(recolhedor);
				});

		/***********************************************************************
		 * FIM - Eventos Zoom
		 **********************************************************************/

		/***********************************************************************
		 * Eventos da interface - HIDE/SHOW e Cálculos pós seleção de
		 * informações
		 **********************************************************************/

		$("#cpTransferencia").change(function() {
			FormularioDeMovimentacao.selectedTransferencia(this.value);
		});

		/***********************************************************************
		 * FIM - Eventos da interface - HIDE/SHOW
		 **********************************************************************/
	}

	if (((atividade == 1) || (atividade == 0) || (atividade == 374)
			|| (atividade == 141) || (atividade == 45) || (atividade == 313))
			&& (formMode != "VIEW")) {

		// Abre zoom de seleção de novo cargo
		$("#BuscarNovoCargo").click(function() {
			FormularioDeMovimentacao.buscarNovoCargo();
		});

		// Abre zoom de seleção de novo salário
		$("#BuscarNovoSalario").click(function() {
			FormularioDeMovimentacao.buscarNovoSalario();
		});

		// Evento de resposto pós seleção de novo cargo
		$("#FormMovimentacaoDePessoal").on("selectedNovoCargo", function() {
			FormularioDeMovimentacao.selectedNovoCargo();
		});

		// Evento de resposto pós seleção de novo salário
		$("#FormMovimentacaoDePessoal").on("selectedNovoSalario", function() {
			FormularioDeMovimentacao.selectedNovoSalario();
		});

		$("#cpTransferenciaKm").change(function() {
			FormularioDeMovimentacao.selectedTransferenciaKm(this.value);
		});

		$("#cpMudanca").change(function() {
			FormularioDeMovimentacao.selectedMudanca(this.value);
		});

		$("#cpTipoMoradia").change(function() {
			FormularioDeMovimentacao.selectedMoradia(this.value);
		});

		$("#cpAuxilioInstalacao").change(function() {
			FormularioDeMovimentacao.selectedAuxilioInstalacao(this.value);
		});

		$("#cpTransporteMobiliario").change(function() {
			FormularioDeMovimentacao.selectedTransporteMobiliario(this.value);
		});

		$("#cpTransVeiculo").change(function() {
			FormularioDeMovimentacao.selectedTransVeiculo(this.value);
		});

		$("#cpPassagemRetorno").change(function() {
			FormularioDeMovimentacao.selectedPassagemRetorno(this.value);
		});

		// Quando tipo de movimentação é selecionado, limpa dados a serem
		// inseridos
		$("#cpTipoMovimentacao").change(function() {
			FormularioDeMovimentacao.selectedTipoMovimentacao(this.value);
			FormularioDeMovimentacao.clickedSemAdicional();
		});

		$("#semAdicional").click(function() {
			//FormularioDeMovimentacao.clickedSemAdicional();
			FormularioDeMovimentacao.semAdicionalChanged();
		});
		
		$("#cpAdicionalTransferencia").change(function(){
			FormularioDeMovimentacao.adicionalTrasferênciaChanged(parseInt(this.value));
		});

		$(".openDatepicker").click(function() {
			FormularioDeMovimentacao.openDatepicker(this);
		});

	}

	FormularioDeMovimentacao.iniciar(atividade, formMode);
};

$(document)
		.ready(
				function() {
					var getDescricaoProcesso = function(codProcesso) {
						var c1 = DatasetFactory.createConstraint(
								'processDefinitionPK.processId', codProcesso,
								codProcesso, ConstraintType.MUST);
						return DatasetFactory.getDataset('processDefinition',
								[ 'processDescription' ], [ c1 ]).values[0].processDescription;
					};

					var codigoProcesso = 'FLUIG-0105', // Código do processo
					targetID = 'descricaoProcesso', // ID do elemento que
													// receberá o nome
					descricaoProcesso = getDescricaoProcesso(codigoProcesso);

					$("#" + targetID).html(descricaoProcesso);
					targetID = 'descricaoProcessoDesc';
					$("#" + targetID).html(descricaoProcesso);
				});

$(document)
		.ready(
				function() {

					var CODIGO_PROCESSO = "FLUIG-0105";
					var ID_LINK_MANUAL = "ID_LINK_MANUAL";

					var getCodigoManual = function(codigoProcesso) {
						var c1 = DatasetFactory.createConstraint(
								'advancedProcessPropertiesPK.processId',
								codigoProcesso, codigoProcesso,
								ConstraintType.MUST), c2 = DatasetFactory
								.createConstraint(
										'advancedProcessPropertiesPK.propertyId',
										'NumeroManual', 'NumeroManual',
										ConstraintType.MUST);
						return DatasetFactory.getDataset(
								'advancedProcessProperties',
								[ 'propertieValue' ], [ c1, c2 ]).values[0].propertieValue;
					};

					var carregaManual = function(codigoProcesso, targetElement) {
						var urlPrefix = "http://csc.direcional.com.br:8080/portal/p/1/ecmnavigation?app_ecm_navigation_doc=";
						var numeroManual = getCodigoManual(codigoProcesso);
						$("#" + targetElement).attr('href',
								urlPrefix + numeroManual);
					};

					carregaManual(CODIGO_PROCESSO, ID_LINK_MANUAL);

				});
