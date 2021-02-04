var addDiasUteis = function (date, dias, apos12) {
	while (dias > 0) {
		date.setDate(date.getDate() + 1);
		if (date.getDay() != 0 && date.getDay() != 6) {
			dias--;
		}
	}

	if (apos12 && date.getHours() >= 12) {
		date.setDate(date.getDate() + 1);
	}

	return date;
};

var startPickerOpener = function (btn, picker) {
	$("#" + btn).click(function () {
		$('#' + picker).datepicker('show');
	});
};

var createPicker = function (picker, minDate) {
	$('#' + picker).datepicker({
		minDate: minDate,
		showOn: 'button',
		changeMonth: true,
		changeYear: true,
		beforeShowDay: function (date) {
			var isValid = date.getDate() <= 20 && date.getDay() != 0 && date.getDay() != 6;
			return [isValid, ''];
		}
	});
};

/**
 * Regras das Datas
 * [Data Programada] (Obras)
 * usamos a que for maior, para contratações programadas pela Obra.
 * */
var getMinDtAdmissao = function () {
	var dtInicio = $("#cpDataProgramadaAdmissao").val(),
		hoje = new Date(),
		dtMinProgramada = addDiasUteis(hoje, 5, false);

	if (dtInicio) {
		dtInicio = dtInicio.split('/');
		dtInicio = new Date(dtInicio[2], parseInt(dtInicio[1]) - 1, dtInicio[0]);
	} else {
		dtInicio = hoje;
	}

	return dtInicio > dtMinProgramada ? dtInicio : dtMinProgramada;
};

var createDatasPicker = function (idCampo, openPickerBtn, dtMinPadrao) {
	var minDate = new Date();

	if (dtMinPadrao) {
		minDate = addDiasUteis(minDate, 4, false);
	} else {
		minDate = getMinDtAdmissao();
	}

	createPicker(idCampo, minDate);
	startPickerOpener(openPickerBtn, idCampo);
};

////////////////////////////////////////////////////////////////////////////////

function load() {

	$.datepicker.setDefaults($.datepicker.regional["pt-BR"]);

	var atividade = parseInt(getWKNumState());
	var modo = getFormMode();

	if (atividade == 3 || atividade == 105) {
		$("#cpNomeCompleto").removeAttr('readonly');
	} else {
		$("#consultaCadastralBlock").hide();
	}


	//BLOQUEIA ABERTURA DE PROCESSO
	if (atividade == 0) {
		alert("Este processo só pode ser aberto através do formulário Requisição de Pessoal");
		window.top.onbeforeunload = null;
		//window.top.location.href = "http://"+window.top.location.hostname+":8080/portal/p/1/pageprocessstart";
	}


	var tipoMaoObra = $("#cpMaoDeObra").val();
	if (tipoMaoObra != 1 && tipoMaoObra != 2) {
		$("#consultaCadastralBlock").hide();
	}

	if (atividade != 105 && atividade != 111) {
		$("#consultaCadastralBlockInicio").hide();
	}

	//CAMPO DESCRITOR
	function setDescritor(select) {
		var descricao = (select.value != 0) ? select.options[select.options.selectedIndex].innerHTML : '';
		$("#cpDescritor").val(descricao);
	}

	//COM PARECER
	$("#aprovacoes textarea").each(function () {
		var self = $(this);
		if (self.val().length > 0) {
			self.closest(".panel")
				.find(".panel-title")
				.append('&nbsp;<span class="label label-warning">Contém Parecer</span>');
		};
	});

	//DESTACA APROVACAO
	$("[aprovacao]").each(function () {
		if (this.value == 1) {
			$(this).closest(".panel").addClass("panel-success");
		} else if (this.value == 2) {
			$(this).closest(".panel").addClass("panel-danger")
		}
	});

	// ESCONDE BOTAO ZOOM OBRA DEP NA ATIDIDADE CADASTRO DE KIT ADMISSIONAL
	if (atividade == 8) {
		$("#BuscarColaboradorKitGerado").show();
	} else {
		$("#BuscarColaboradorKitGerado").hide();
	}

	// NUMERO DA CARTEINHA
	$("#nCarteirinhaSeguro").hide();

	$("#cpSeguroCadastrado").change(function () { nCarteirinha(); });

	nCarteirinha();

	// MOSTRA SITUACAO E VIA DE DESEMPREGO
	var ObraSede = $("#cpObraSede").val();
	if (ObraSede == "1") {
		$(".obra").show();
	}

	//CHAT
	var ChatConferencia = new Chat();
	ChatConferencia.OrderDESC = true;
	ChatConferencia.TableName = "tbConferencia";
	ChatConferencia.DisplayTable = "tbConferenciaChat";
	ChatConferencia.Fields = new Array({
		"name": "itmAprovado",
		"busca": "cpAprovacaoDocumentacao",
		"tipo": "nome"
	}, {
			"name": "itmData",
			"tipo": "data"
		}, {
			"name": "itmParecer",
			"busca": "cpParecerDocumentacao",
			"tipo": "descricao"
		}, {
			"name": "itmMotivo",
			"busca": "cpMotivoReprovacao",
			"tipo": "motivo"
		});
	var campoAprovacao = $("#cpAprovacaoDocumentacao").val();
	var textoMotivo = "({motivo})";
	if (campoAprovacao == "1") { textoMotivo = ""; }
	ChatConferencia.TemplateLine = "<h5> {nome} " + textoMotivo + " - {data} <br /> {descricao} </h5>";
	ChatConferencia.ReplaceValues = new Array({
		"name": "itmAprovado",
		"IfValue": "1",
		"NewValue": "Aprovado"
	}, {
			"name": "itmAprovado",
			"IfValue": "2",
			"NewValue": "Reprovado"
		}, {
			"name": "itmMotivo",
			"IfValue": "1",
			"NewValue": "Documentação Ilegivel"
		}, {
			"name": "itmMotivo",
			"IfValue": "2",
			"NewValue": "Falta Documentação"
		});
	ChatConferencia.Exibir();

	// GERA CHAT NA ATIVIDADE 8
	if (atividade == 8) {
		ChatConferencia.Gerar();
	}

	var hoje = new Date(),
		diasParaAvancar = 4;

	// AVANCA 3 DIAS UTEIS DA DATA  ATUAL(HOJE)
	while (diasParaAvancar > 0) {
		hoje.setDate(hoje.getDate() + 1);
		while (hoje.getDay() == 0 || hoje.getDay() == 6) {
			hoje.setDate(hoje.getDate() + 1);
		}
		diasParaAvancar -= 1;
	}

	var dataMinima = hoje;

	//Data Atual
	hoje = hoje.getDate() + "/" + (hoje.getMonth() + 1) + "/" + hoje.getFullYear();

	var BuscaData = new BuscarDatas();

	// SEDE - Picker DtInicio
	if (atividade == 105) createDatasPicker('cpDataInicio', 'openDtInicioPicker', true);

	// OBRA - Picker DtPrograma
	if (atividade == 111) createDatasPicker('cpDataProgramadaAdmissao', 'openDtProgramadaPicker', true);

	// Definição do RH
	if (atividade == 3 && modo != "VIEW") createDatasPicker('cpDataAdmissao', 'openDtAdmissaoPicker', true);

	$("#cpDataInicio, #cpDataProgramadaAdmissao, #cpDataAdmissao").change(function () {
		var novaData = $(this).val().split("/");
		var novaDataFormatada = new Date(novaData[2],
			parseInt(novaData[1]) - 1, novaData[0]);

		var ValidaData = dataMinima;

		if (novaDataFormatada.getFullYear() <= ValidaData.getFullYear()) {
			if (novaDataFormatada.getMonth() <= ValidaData.getMonth()) {
				if (novaDataFormatada.getDate() < ValidaData.getDate()) {
					$(this).val("");
				}
			}
		}
	});

	// DATA DE INICIO E DATA PROGRAMADA
	if (atividade == 105 || atividade == 111) {
		$("#cpDataInicio").val("");
		$("#cpDataProgramadaAdmissao").val("");
	}

	// RECOLHIMENTO DE DOCUMENTAÇÃO
	if (atividade == 85 || atividade == 3) {
		$("#cpDataAdmissao").val("");
	}

	// SEDE E GRUPO OBRA - (0->SEDE  | 1->OBRA)
	var ObraSede = $("#cpObraSede").val();
	if (ObraSede == "0") {
		$("#grupoDataAdmissao").hide();
		$("#grupoDataInicio").show();

	} else if (ObraSede == "1") {
		$("#grupoDataAdmissao").show();
		$("#grupoDataInicio").hide();
	}

	var nome = $("#cpNomeCompleto").val();
	if (atividade == 0 || atividade == 85 || atividade == 3) {
		if (nome == "") {
			$("#cpNomeCompleto").removeAttr("readonly");
			$("#cpNomeCompleto").blur(function () {
				$("#_cpEnvioNome,#cpEnvioNome").val($(this).val());
			});
		}
		$("#cpCpf").removeAttr("readonly");
		$("#cpTransferir").val("1");

		if (atividade == 3) {

			var ZoomDpResponsavelProd = new Zoom();
			ZoomDpResponsavelProd.FieldsName = new Array("cpCodColigada", "cpCodigoSecao");
			ZoomDpResponsavelProd.Id = "IDZoomDpResponsavelProd";
			ZoomDpResponsavelProd.DataSet = "ds_BuscarResponsavelDPObra";
			ZoomDpResponsavelProd.Colunas = new Array({
				"title": "Nome do responsável",
				"name": "NOME"
			}, // 0
				{
					"title": "CHAPA",
					"name": "CHAPA",
					"display": false
				} // 1
			);
			ZoomDpResponsavelProd.Titulo = "Buscar DP";
			ZoomDpResponsavelProd.Retorno = function (retorno) {
				$("#cpDpDestino").val(retorno[0]);
				$("#cpMatriculaDP").val(retorno[1]);
			};

			$("#BuscarDpDestino").click(function () {
				ZoomDpResponsavelProd.Abrir();
			});

			$(".divacao").show();
			$(".transferir").click(
				function () {
					var value = $("#cpTransferir").val();
					if (value == 2) {
						$(".transferir.cadastrar").removeClass(
							"btn-default").addClass("btn-info");
						$(".transferir.transf").removeClass("btn-info")
							.addClass("btn-default");
						$("#cpTransferir").val("1");
						$(".divcadastro").show();
						$(".divtransferir").hide();
					} else if (value == 1) {
						$(".transferir.transf").removeClass("btn-default")
							.addClass("btn-info");
						$(".transferir.cadastrar").removeClass("btn-info")
							.addClass("btn-default");
						$("#cpTransferir").val("2");
						$(".divcadastro").hide();
						$(".divtransferir").show();
					}
				});
		} else {
			$(".divacao").hide();
			$(".divtransferir").hide();
		}
	}

	aprovacaoConferenciaCadastro();

	// REMOVER ZOOM DE OUTRAS ATIVIDADES
	if (atividade == 0 || atividade == 3 || atividade == 85) {
		$("#BucarHorarioTrabalho").show();

	} else {
		$("#BucarHorarioTrabalho").hide();
	}

	// DATA DE ADMISSAO
	var opcoesSedeObra = $("#cpObraSede").val();
	if (opcoesSedeObra == 0) {
		$("#cpDataAdmProducao").remove();

	} else {
		$("#cpDataAdmProducao").show();
	}

	//ABA DE APROVACAO ABERTA EM CADA ATIVIDADE
	$('#panelAtividade_' + atividade).collapse("show").closest(".panel");

	//SE ATIVIDADE DIFERENTE E PANEL IGUAL
	if (atividade == 114) {// RECOLHIMENTO DAS ASSINATURAS
		$('#panelAtividade_22').collapse("show");

	} else if (atividade == 117) { // ENVIO DE DADOS DO COLABORADOR
		$('#panelAtividade_27').collapse("show");

	} else if (atividade == 121) { //CANCELAMENTO DE CADASTRO
		$('#panelAtividade_28').collapse("show");
	}

	// DATA DE ADMISSAO
	var Hoje = new Date();
	var NovaData = new Date(Hoje);
	NovaData.setDate(Hoje.getDate() + 4);

	var BuscaData = new BuscarDatas();

	var mySimpleCalendar = FLUIGC.calendar('#cpCalendarioDtAdmissao', {
		minDate: NovaData,
		disabledDates: BuscaData.Gerar(21, 31)
	});


	var ZoomHorarioTrabalho = new Zoom();
	ZoomHorarioTrabalho.FieldsName = new Array("cpCodColigada");
	ZoomHorarioTrabalho.Id = "IDZoomHorarioTrabalho";
	ZoomHorarioTrabalho.DataSet = "DS_FLUIG_0019";
	ZoomHorarioTrabalho.Colunas = new Array({
		"title" : "Horário",
		"name" : "HORARIO"
	} // 0
	);
	ZoomHorarioTrabalho.Titulo = "Buscar Horário de trabalho";
	ZoomHorarioTrabalho.Retorno = function(retorno) {
		$("#cpHorarioTrabalho").val(retorno[0]);
	};

	$("#BucarHorarioTrabalho").click(function () {
		if (atividade == 3 && modo != "VIEW") {
			ZoomHorarioTrabalho.Abrir();
		}
	});

	// ZOOM BUSCA COLABORADOR NA ATIVIDADE CADASTRO DE KIT ADMISSIONAL
	/*
	var ZoomColaboradorKitGerado = new Zoom();
	ZoomColaboradorKitGerado.FieldsName = new Array("cpCodigoSecao","cpCodColigada");
	ZoomColaboradorKitGerado.Id = "IDZoomColaboradorKitGerado";
	ZoomColaboradorKitGerado.DataSet = "DS_FLUIG_0013";
	ZoomColaboradorKitGerado.Colunas = new Array(
	{"title" : "Nome",
		"name" : "NOME"},
	{"title" : "Matricula",
		"name" : "CHAPA"},
	{"title" : "Data de Admissão",
		"name" : "DATAADMISSAO"}
	);

	ZoomColaboradorKitGerado.Titulo = "Buscar Colaborador";
	ZoomColaboradorKitGerado.Retorno = function(retorno) {
		$("#cpColaboradorKitGerado").val(retorno[0]);
		$("#cpMatriculaKitGerado").val(retorno[1]);
		$("#cpDataAdmissaoKitGerado").val(retorno[2]);
	};
	*/
	$("#BuscarColaboradorKitGerado").click(function () {
		ZOOM.getInstance().getColaborador($('#cpCodigoSecao').val(), $('#cpCodColigada').val());
	});


	toggleExperiencia();
	carregaHistorico();
	toggleMotivoReprovacao();

} // FIM DO LOAD

function aprovacaoConferenciaCadastro() {
	DocumentacaoNaoEntregue();
	kitGerado();
}

// MOSTRA E ESCONDE GRUPO DOCUMENTACAO NAO ENTREUE
function DocumentacaoNaoEntregue() {
	var Documentacao = $("#cpAprovacaoDocumentacao").val();
	$("#cpMotivoReprovacao").val('');
	$("#cpParecerDocumentacao").val('');
	if (Documentacao == 0 || Documentacao == 1) {
		$("#DocNaoEntregue").hide();

	} else {
		$("#DocNaoEntregue").show();
	}
}

//MOSTRA CADASTRO DE KIT
function kitGerado(aprovacao) {
	var aprovacao = $("#cpAprovacaoDocumentacao").val();

	if (aprovacao == 1) {
		$("#tabelaKitGerado").show();

	} else {
		$("#tabelaKitGerado").hide();
	}
}

//MOSTRA E ESCONDE CAMPO NUMERO DA CARTEIRINHA
function nCarteirinha() {

}

var toggleExperiencia = function () {
	var tipoMaoObra = $("#cpMaoDeObra").val();

	if (tipoMaoObra == 1 || tipoMaoObra == 2) {
		$("#xpBlock").hide();
	}
}

$(document).ready(function () {

	var atividade = parseInt(getWKNumState()),
		modo = getFormMode();

	$('#cpValeTransporte').change(function () {
		if (this.value == "1") {
			$("#ValeTransporte").show();
		} else {
			$("#ValeTransporte").hide();
		}
	});

	var cpValeTransporte = $("#cpValeTransporte").val();
	if (cpValeTransporte == "1") {
		$("#ValeTransporte").show();

	} else {
		$("#ValeTransporte").hide();
	}

	if (atividade == 18 && modo != "VIEW") {
		$('#cpConfKitParecer').val('');
		$('#cpConferenciaKitAdmissional').change(function () {
			toggleMotivoReprovacao();
			clearMotivoReprovacao();
		});
	}

	if ((atividade == 85 || atividade == 3) && (modo != "VIEW")) {
		$("#cpRecolhedor").val(getUser());
	}
});

function toggleMotivoReprovacao() {

	var aprovacaoConferenciaKit = $("#cpConferenciaKitAdmissional").val();

	if (aprovacaoConferenciaKit == 2) {
		$('#motivoReprovacao').show();

	} else {
		$('#motivoReprovacao').hide();
	}
}

function clearMotivoReprovacao() { $('#cpMotivoReprovacaoConfKit').val("0"); }

function carregaHistorico() {
	var historico = "";

	$("#histKit tbody tr:not(:first-child)").each(function () {
		var campos = $("input", this);

		var msgAviso = "<div class='alert alert-warning'>";

		// Aprovação/Reprovação  -  Motivo da Reprovação - Data - Parecer
		msgAviso += campos[0].value + " - " + campos[1].value + " - " + campos[2].value;
		msgAviso += "<br/>" + campos[3].value + "</div>";

		historico += msgAviso;
	});

	if (historico) {
		$("#boxHist").html(historico);
	} else {
		$("#boxHist").hide();
	}
}


$(document).ready(function () {
	var atividade = getWKNumState();

	if (atividade == 22 || atividade == 114) {

		var user = getUser();
		var c1 = DatasetFactory.createConstraint('colleaguePK.colleagueId', user, user, ConstraintType.MUST);
		login = DatasetFactory.getDataset('colleague', ['login'], [c1]).values.map(function (c) {
			return c.login;
		});
		$("#cpLoginRecolhedor").val(login[0]);
		$("#cpMatriculaRecolhedor").val(user);
	}

	var solAcesso = $("#cpSolAcessoCriada").val();

	if (!solAcesso) {
		$("#blockReqAcesso").hide();
	}
});

$(document).ready(function () {
	var getDescricaoProcesso = function (codProcesso) {
		var c1 = DatasetFactory.createConstraint('processDefinitionPK.processId', codProcesso, codProcesso, ConstraintType.MUST);
		return DatasetFactory.getDataset('processDefinition', ['processDescription'], [c1]).values[0].processDescription;
	};

	var codigoProcesso = 'FLUIG-0102', // Código do processo
		targetID = 'descricaoProcesso', // ID do elemento que receberá o nome
		descricaoProcesso = getDescricaoProcesso(codigoProcesso);

	$("#" + targetID).html(descricaoProcesso);
	targetID = 'descricaoProcessoDesc';
	$("#" + targetID).html(descricaoProcesso);
});

$(document).ready(function () {

	var CODIGO_PROCESSO = "FLUIG-0102";
	var ID_LINK_MANUAL = "ID_LINK_MANUAL";

	var getCodigoManual = function (codigoProcesso) {
		var c1 = DatasetFactory.createConstraint('advancedProcessPropertiesPK.processId', codigoProcesso, codigoProcesso, ConstraintType.MUST),
			c2 = DatasetFactory.createConstraint('advancedProcessPropertiesPK.propertyId', 'NumeroManual', 'NumeroManual', ConstraintType.MUST);
		return DatasetFactory.getDataset('advancedProcessProperties', ['propertieValue'], [c1, c2]).values[0].propertieValue;
	};

	var carregaManual = function (codigoProcesso, targetElement) {
		var urlPrefix = "http://csc.direcional.com.br:8080/portal/p/1/ecmnavigation?app_ecm_navigation_doc=";
		var numeroManual = getCodigoManual(codigoProcesso);
		$("#" + targetElement).attr('href', urlPrefix + numeroManual);
	};

	carregaManual(CODIGO_PROCESSO, ID_LINK_MANUAL);

});