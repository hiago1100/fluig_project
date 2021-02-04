function preencherSolicitante() {

	var user = getUser();
	var login = DatasetHelper.getLogin(user);
	var colaborador = DatasetHelper.getSolicitante(login);

	$("#cpMatriculaSolicitante").val(user);
	$("#cpLoginFluig").val(login);
	$("#cpCargo").val(colaborador.FUNCAO);
	$("#cpEmail").val(colaborador.EMAIL);
	$("#cpDepto").val(colaborador.SECAO);
	$("#cpEstado").val(colaborador.ESTADO);
	$("#cpColigadaSol").val(colaborador.CODCOLIGADA);
	$("#cpCodSecaoSol").val(colaborador.CODSECAO);
	$("#cpNomeSolicitante").val(colaborador.NOME);
	$("#cpFuncaoSolicitante").val(colaborador.FUNCAO);
	$("#cpDepartamentoObraSolicitante").val(colaborador.SECAO);
	$("#cpEmpresaSolicitante").val(colaborador.EMPRESA);
	$("#cpColigadaDep").val(colaborador.CODCOLIGADA);
	$("#cpCodUsuarioRedeSolicitante").val(login);
	$("#cpCodFuncao").val(colaborador.CHAPA);
}

function preencherDataAbertura() {
	$("#cpDataAbertura").val(getDataAbertura());
}

var DatasetHelper = {
	getLogin: function (user) {
		var datasetReturn = getDatasetValues('colleague', { 'colleaguePK.colleagueId': user });
		return datasetReturn[0]["login"];
	},

	getSolicitante: function (login) {
		var datasetReturn = Model.get_DS1000('SP_FLUIG_1000', login);
		return datasetReturn.values[0];
	},
};

var getDataAbertura = function () {
	var hoje = new Date(getServerTime()),
		dia = hoje.getDate(),
		mes = hoje.getMonth() + 1;

	if (dia < 10) { dia = '0' + dia; }
	if (mes < 10) { mes = '0' + mes; }

	return (dia + '/' + mes + '/' + hoje.getFullYear());
};

// ESCONDE CAMPOS QUANDO TIPO MAO DE OBRA FOR 0
function escondeCampos() {

	var MudarTipo = $("#cpTipoMaoObra").val();

	if (MudarTipo == 1 || MudarTipo == 2) {
		$("#InfoRequisicao").show();
		$("#InfoObraDepartamento").show();
		$("#AdicionarNovosColaboradoresProducao").show();
		$("#AdministrativoEstrategico").hide();
		$("#recrutamento_selecao").hide();

	} else if (MudarTipo == 3 || MudarTipo == 4) {
		$("#InfoRequisicao").show();
		$("#InfoObraDepartamento").show();
		$("#AdministrativoEstrategico").show();
		$("#AdicionarNovosColaboradoresProducao").show();
		$("#recrutamento_selecao").show();

	} else if (MudarTipo == 0) {
		$("#InfoRequisicao").hide();
		$("#InfoObraDepartamento").hide();
		$("#AdministrativoEstrategico").hide();
		$("#AdicionarNovosColaboradoresProducao").hide();
		$("#recrutamento_selecao").hide();

	}

	if (MudarTipo == "3" || MudarTipo == "4") {
		$("#tbSalario tbody tr").last().find(".estrategico").show();

	} else {
		$("#tbSalario tbody tr").last().find(".estrategico").hide();
	}

	if (MudarTipo == 1) {
		$("#cpFiltroCargo").val("Produção");

	} else if (MudarTipo == 2) {
		$("#cpFiltroCargo").val("Encarregado de Produção");

	} else if (MudarTipo == 3) {
		$("#cpFiltroCargo").val("Administrativo");

	} else if (MudarTipo == 4) {
		$("#cpFiltroCargo").val("Estratégico");
	}
}

function MudarTipoColaborador(element, onload) {

	var valor = $(element).val();

	if (valor == "0") {
		$(element).closest("tr").find(".inputItm").hide();
		$(element).closest("tr").find(".itmColaboradorCCO").attr("readonly", "readonly");

	} else if (valor == "1") {
		$(element).closest("tr").find(".inputItm").show();
		$(element).closest("tr").find(".interno").show();
		$(element).closest("tr").find(".itmColaboradorCCO").attr("readonly", "readonly");

		$(element).closest("tr").find(".labelcargo").html("Novo Cargo");
		$(element).closest("tr").find(".labelnovosalario").html("Novo Salário");
		$(element).closest("tr").find(".labelsalario").html("Salário atual");

	} else if (valor == "2") {
		$(element).closest("tr").find(".inputItm").show();
		$(element).closest("tr").find(".interno").hide();
		$(element).closest("tr").find(".labelcargo").html("Cargo");
		$(element).closest("tr").find(".labelnovosalario").html("Salário");
		$(element).closest("tr").find(".labelsalario").html("Salário");

		if (!onload) {
			$(element).closest("tr").find(".itmColaboradorCCO").attr("readonly", false);
		}

	} if (!onload) {
		$(element).closest("tr").find(".itmColaboradorCCO").val("");
	}

}

// VARIAVEIS
var ZoomHorarioAdm;
var ZoomCargoProd;
var ZoomSalarioProd;

function load() {

	var atividade = parseInt(getWKNumState());

	//Define o Campo Descritor
	$('#cpDescritor').val($('#cpObraDepProd').val() + ' | ' + $('#cpTipoMaoObra option:selected').text());



	if (atividade != 93) {
		$("#consultaCadastralBlock").hide();
	}

	if (!$("#reqCadastro").val()) {
		$("#requisicoesCadastro").hide();
	}

	if (!$("#reqMovimentacao").val()) {
		$("#requisicoesMovimentacao").hide();
	}

	// COM PARECER
	$("#aprovacoes textarea").each(function () {
		var self = $(this);
		if (self.val().length > 0) {
			self.closest(".panel")
				.find(".panel-title")
				.append('&nbsp;<span class="label label-warning">Contém Parecer</span>');
		};
	});

	//DESTACA APROVACAO OU REPROVACAO
	$("[aprovacao]").each(function () {
		if (this.value == 1) {
			$(this).closest(".panel").addClass("panel-success");
		} else if (this.value == 2) {
			$(this).closest(".panel").addClass("panel-danger")
		}
	});

	escondeCampos();

	$(".itmHaIndicacao").each(function () {
		AlterarIndicacao(this);
	});

	AlterarMotivoProd();
	AlterarMotivoAE();
	AlterarEscolaridade();
	AlterarDispViagens();
	AddTabelaEspanhol($("#cpEspanhol"));
	AddTabelaIngles($("#cpIngles"));
	ChecarRecolherDocumentacao();

	$("input").css("fontSize", "12px");

	// HORARIO
	ZoomHorarioAdm = new Zoom();

	ZoomHorarioAdm.Id = "IDZoomHorario";
	ZoomHorarioAdm.DataSet = "DS_FLUIG_0019";
	ZoomHorarioAdm.FieldsName = new Array("cpCodColigadaDepartamento");
	ZoomHorarioAdm.Colunas = new Array(
		{
			"title": "Horário", "name": "HORARIO"
		} // 0
	);
	ZoomHorarioAdm.Titulo = "Buscar Horário";

	// NOME CARGO PROD
	ZoomCargoProd = new Zoom();
	ZoomCargoProd.FieldsName = new Array("cpCodColigadaDepartamento", "cpCodSecaoProd", "cpFiltroCargo");
	ZoomCargoProd.Id = "IDZoomCargoProd";
	ZoomCargoProd.DataSet = "DS_FLUIG_0005";
	ZoomCargoProd.Colunas = new Array(
		{
			"title": "Cargo", "name": "NOME"
		}, // 0
		{
			"title": "Código", "name": "CODIGO", "display": false
		} // 1
	);
	ZoomCargoProd.Titulo = "Buscar Cargo";
	ZoomCargoProd.Retorno = function (retorno, ElementoLinha) {
		$("#itmNomeCargoProd").val(retorno[0]);
		$("#cpCodFuncao").val(retorno[1].replace("A", ""));
		$("#itmSalarioProd").val("");


	};

	// ZOOM OBRA DEPARTAMENTO PRODUCAO
	var ZoomColaboradorProd = new Zoom();
	ZoomColaboradorProd.FieldsName = new Array("cpLoginFluig");
	ZoomColaboradorProd.Id = "IDZoomColaboradorProd";
	ZoomColaboradorProd.DataSet = "DS_FLUIG_0007";
	ZoomColaboradorProd.Colunas = new Array(
		{
			"title": "Obra/Departamento", "name": "DEPARTAMENTO"
		}, // 0
		{
			"title": "Código da seção", "name": "CODSECAO"
		}, // 1
		{
			"title": "Estado", "name": "ESTADO"
		}, // 2
		{
			"title": "Código Coligada", "name": "CODCOLIGADA", "display": false
		}, // 3
		{
			"title": "Consultora", "name": "CHAPA_CONSULTORA", "display": false
		}, // 4
		{
			"title": "Gestor", "name": "GESTOR", "display": false
		}, // 5
		{
			"title": "Gerente Geral", "name": "CHAPA_GG", "display": false
		}, // 6
		{
			"title": "Obra ou Sede", "name": "OBRAOUSEDE", "display": false
		}, // 7
		{
			"title": "Superintendente", "name": "SUP", "display": false
		}, // 8
		{
			"title": "Diretor", "name": "DIRETOR", "display": false
		}, // 9
		{
			"title": "Nome Gestor", "name": "NOME_GESTOR", "display": false
		}, // 10
		{
			"title": "Bloqueia Contratação", "name": "BLOQUEIACONTRATACAO", "display": false
		}, // 11
		{
			"title": "Empresa", "name": "EMPRESA", "display": false
		} // 12
	);
	ZoomColaboradorProd.Titulo = "Busca de Obra/Departamento";
	ZoomColaboradorProd.Retorno = function (retorno) {
		$("#cpObraDepProd").val(retorno[0]);
		$("#cpCodSecaoProd").val(retorno[1]);
		$("#cpCodSecaoPadrao").val(retorno[1]);
		$("#cpEstadoProd").val(retorno[2]);
		$("#cpCodColigadaDepartamento").val(retorno[3]);
		$("#cpConsultora").val(retorno[4]);
		$("#cpGestor").val(retorno[5]);
		$("#cpGerenteGeral").val(retorno[6]);
		$("#cpSuperintendente").val(retorno[8]);
		$("#cpDiretor").val(retorno[9]);
		$("#cpNomeGestor").val(retorno[10]);
		$("#cpEmpresa").val(retorno[12]);
		$("#cpCodColigadaObraDep").val(retorno[3]);
		$("#cpObraSede").val(retorno[7]);


		// NAO PERMITE CONTRATACAO SE FOR = 1
		var BloqueiaContratacao = retorno[11];

		if (BloqueiaContratacao == "true") BloqueiaContratacao = "1";

		$("#cpBloqueiaContratacao").val(BloqueiaContratacao);

		if (BloqueiaContratacao == "1") {
			alert("Esta Obra/Departamento não permite Contratação");
		}

		//Obra =1; Sede=2;
		var ObraSede = getTipoSecao(retorno[1], retorno[3]);


		var ObraDepProd = retorno[0];
		var MudarTipo = $("#cpTipoMaoObra").val();

		if (ObraDepProd == "ERCMG - ASSISTENCIA TECNICA" && (MudarTipo == 1 || MudarTipo == 2)) {
			ObraSede = 1;
			$("#cpObraSede").val(ObraSede);

		} else if (ObraDepProd == "ERCMG - ASSISTENCIA TECNICA" && (MudarTipo == 3 || MudarTipo == 4)) {
			ObraSede = 2;
			$("#cpObraSede").val(ObraSede);
		}

		if (ObraSede == "0") ObraSede = "2";

		$("#cpObraSede").val(ObraSede);

		$("#cpRecolherDocProd").val("");

		DefinePapelPadraoRecolhimentoDoc();

		ChecarRecolherDocumentacao();
	};

	$("#BuscarCpObraDepProd").click(function () {
		ZoomColaboradorProd.Abrir();
	});

	// BUSCAR RESPONSAVEL PELO DP / OBRA
	var ZoomDpResponsavelProd = new Zoom();
	ZoomDpResponsavelProd.FieldsName = new Array("cpCodColigadaDepartamento", "cpCodSecaoProd");
	ZoomDpResponsavelProd.Id = "IDZoomDpResponsavelProd";
	ZoomDpResponsavelProd.DataSet = "DS_FLUIG_0034";
	ZoomDpResponsavelProd.Colunas = new Array(
		{
			"title": "Nome do responsável", "name": "NOME"
		}, // 0
		{
			"title": "CHAPA", "name": "CHAPA", "display": false
		} // 1
	);
	ZoomDpResponsavelProd.Titulo = "Buscar DP";
	ZoomDpResponsavelProd.Retorno = function (retorno) {
		$("#cpRecolherDocProd").val(retorno[0]);
		$("#cpRecolherDocProdChapa").val(retorno[1]);

		DefineChapaDpRecolherDoc();
	};
	$("#BuscarRecolherDocProd").click(function () {
		ZoomDpResponsavelProd.Linhas = new Array();
		ZoomDpResponsavelProd.Renderizado = false;
		ZoomDpResponsavelProd.Abrir();
	});

	// SALARIO PROD
	ZoomSalarioProd = new Zoom();
	ZoomSalarioProd.Id = "IDZoomSalarioProd";
	ZoomSalarioProd.DataSet = "DS_FLUIG_0016";
	ZoomSalarioProd.Colunas = new Array(
		{
			"title": "Salário", "name": "SALARIO"
		} // 0
	);
	ZoomSalarioProd.Titulo = "Buscar Salário";
	ZoomSalarioProd.Retorno = function (retorno) {
		$("#itmSalarioProd").val(retorno[0]);
	};

	// SUBSTITUICAO E DEMISSAO E SUBSTITUICAO/TRANSFERENCIA(TODAS AS SITUACOES)
	var ZoomSubstituicaoDemissaoAdm = new Zoom();
	ZoomSubstituicaoDemissaoAdm.FieldsName = new Array("cpCodColigadaDepartamento", "cpCodSecaoProd");
	ZoomSubstituicaoDemissaoAdm.Id = "IDZoomZoomSubstituicaoDemissaoAdm";
	ZoomSubstituicaoDemissaoAdm.DataSet = "DS_FLUIG_0010";
	ZoomSubstituicaoDemissaoAdm.Colunas = new Array(
		{
			"title": "Colaborador", "name": "NOME"
		}, // 0
		{
			"title": "Função", "name": "NOMEFUNCAO"
		} // 1
	);
	ZoomSubstituicaoDemissaoAdm.Titulo = "Buscar Colaborador";
	ZoomSubstituicaoDemissaoAdm.Retorno = function (retorno) {
		$("#cpColaboradorAdm").val(retorno[0]);
		$("#cpFuncaoSDAdm").val(retorno[1]);
	};
	$("#BuscarColaboradorSubsDemiAdm").click(function () {
		ZoomSubstituicaoDemissaoAdm.Abrir();
	});

	var ZoomSubstituicaoDemissaoProd = new Zoom();
	ZoomSubstituicaoDemissaoProd.FieldsName = new Array("cpCodSecaoProd", "cpCodColigadaDepartamento");
	ZoomSubstituicaoDemissaoProd.Id = "IDZoomZoomSubstituicaoDemissaoAdm";
	ZoomSubstituicaoDemissaoProd.DataSet = "DS_FLUIG_0020";
	ZoomSubstituicaoDemissaoProd.Colunas = new Array(
		{
			"title": "Colaborador", "name": "NOME"
		}, // 0
		{
			"title": "Função", "name": "FUNCAO"
		} // 1
	);
	ZoomSubstituicaoDemissaoProd.Titulo = "Buscar Colaborador";
	ZoomSubstituicaoDemissaoProd.Retorno = function (retorno) {
		$("#cpColaboradorMA").val(retorno[0]);
		$("#cpFuncaoSDTP").val(retorno[1]);
	};
	$("#BuscarColaboradorSDTP").click(function () {
		ZoomSubstituicaoDemissaoProd.Linhas = new Array();
		ZoomSubstituicaoDemissaoProd.Renderizado = false;
		ZoomSubstituicaoDemissaoProd.Abrir();
	});

	// SUBSTITUICAO DE FERIAS ("A" OU "F")
	var ZoomSubstituicaoColaboradorSF = new Zoom();
	ZoomSubstituicaoColaboradorSF.FieldsName = new Array("cpCodSecaoProd", "cpCodColigadaDepartamento");
	ZoomSubstituicaoColaboradorSF.Id = "IDZoomSubstituicaoColaboradorSF";
	ZoomSubstituicaoColaboradorSF.DataSet = "DS_FLUIG_0020";
	ZoomSubstituicaoColaboradorSF.Colunas = new Array(
		{
			"title": "Colaborador", "name": "NOME"
		}, // 0
		{
			"title": "Função", "name": "FUNCAO"
		} // 1
	);
	ZoomSubstituicaoColaboradorSF.Titulo = "Buscar Colaborador";
	ZoomSubstituicaoColaboradorSF.Retorno = function (retorno) {
		$("#cpColaboradorSF").val(retorno[0]);
		$("#cpFuncaoSF").val(retorno[1]);
	};
	$("#BuscarColaboradorSF").click(function () {
		ZoomSubstituicaoColaboradorSF.Linhas = new Array();
		ZoomSubstituicaoColaboradorSF.Renderizado = false;
		ZoomSubstituicaoColaboradorSF.Abrir();
	});

	var ZoomSubstituicaoFeriasAdm = new Zoom();
	ZoomSubstituicaoFeriasAdm.FieldsName = new Array("cpCodSecaoProd", "cpCodColigadaDepartamento");
	ZoomSubstituicaoFeriasAdm.Id = "IDZoomSubstituicaoFeriasAdm";
	ZoomSubstituicaoFeriasAdm.DataSet = "DS_FLUIG_0020";
	ZoomSubstituicaoFeriasAdm.Colunas = new Array(
		{
			"title": "Colaborador", "name": "NOME"
		}, // 0
		{
			"title": "Função", "name": "FUNCAO"
		} // 1
	);
	ZoomSubstituicaoFeriasAdm.Titulo = "Buscar Colaborador";
	ZoomSubstituicaoFeriasAdm.Retorno = function (retorno) {
		$("#cpColaboradorSFAdm").val(retorno[0]);
		$("#cpFuncaoSFAdm").val(retorno[1]);
	};
	$("#BuscarColaboradorSubsFeriasAdm").click(function () {
		ZoomSubstituicaoFeriasAdm.Linhas = new Array();
		ZoomSubstituicaoFeriasAdm.Renderizado = false;
		ZoomSubstituicaoFeriasAdm.Abrir();
	});

	// SUBSTITUICAO  DE LICENCA MATERNIDADE ("A" OU "E")
	var ZoomSubstituicaoLicencaMatAdm = new Zoom();
	ZoomSubstituicaoLicencaMatAdm.FieldsName = new Array("cpCodSecaoProd", "cpCodColigadaDepartamento");
	ZoomSubstituicaoLicencaMatAdm.Id = "IDZoomSubstituicaoLicencaMatAdm";
	ZoomSubstituicaoLicencaMatAdm.DataSet = "DS_FLUIG_0020";
	ZoomSubstituicaoLicencaMatAdm.Colunas = new Array(
		{
			"title": "Colaborador", "name": "NOME"
		}, // 0
		{
			"title": "Função", "name": "FUNCAO"
		} // 1
	);
	ZoomSubstituicaoLicencaMatAdm.Titulo = "Buscar Colaborador";
	ZoomSubstituicaoLicencaMatAdm.Retorno = function (retorno) {
		$("#cpColaboradorLMAdm").val(retorno[0]);
		$("#cpFuncaoLMAdm").val(retorno[1]);
	};
	$("#BuscarColaboradorLicMatAdm").click(function () {
		ZoomSubstituicaoLicencaMatAdm.Linhas = new Array();
		ZoomSubstituicaoLicencaMatAdm.Renderizado = false;
		ZoomSubstituicaoLicencaMatAdm.Abrir();
	});

	var ZoomSubstituicaoLicencaMatProd = new Zoom();
	ZoomSubstituicaoLicencaMatProd.FieldsName = new Array("cpCodSecaoProd", "cpCodColigadaDepartamento");
	ZoomSubstituicaoLicencaMatProd.Id = "IDZoomSubstituicaoLicencaMatAdm";
	ZoomSubstituicaoLicencaMatProd.DataSet = "DS_FLUIG_0020";
	ZoomSubstituicaoLicencaMatProd.Colunas = new Array(
		{
			"title": "Colaborador", "name": "NOME"
		}, // 0
		{
			"title": "Função", "name": "FUNCAO"
		} // 1
	);
	ZoomSubstituicaoLicencaMatProd.Titulo = "Buscar Colaborador";
	ZoomSubstituicaoLicencaMatProd.Retorno = function (retorno) {
		$("#cpColaboradorLM").val(retorno[0]);
		$("#cpFuncaoLM").val(retorno[1]);
	};
	$("#BuscarColaboradorLM").click(function () {
		ZoomSubstituicaoLicencaMatProd.Abrir();
	});

	// SUBSTITUICAO ACIDENTE DE TRABALHO OU DOENÃ?A (DIFERENTE DE "D" e "F")
	var ZoomSubstituicaoAcidenteTrabProd = new Zoom();
	ZoomSubstituicaoAcidenteTrabProd.FieldsName = new Array("cpCodSecaoProd", "cpCodColigadaDepartamento");
	ZoomSubstituicaoAcidenteTrabProd.Id = "IDZoomSubstituicaoAcidenteTrabProd";
	ZoomSubstituicaoAcidenteTrabProd.DataSet = "DS_FLUIG_0020";
	ZoomSubstituicaoAcidenteTrabProd.Colunas = new Array(
		{
			"title": "Colaborador", "name": "NOME"
		}, // 0
		{
			"title": "Função", "name": "FUNCAO"
		} // 1
	);
	ZoomSubstituicaoAcidenteTrabProd.Titulo = "Buscar Colaborador";
	ZoomSubstituicaoAcidenteTrabProd.Retorno = function (retorno) {
		$("#cpColaboradorATD").val(retorno[0]);
		$("#cpFuncaoATD").val(retorno[1]);
	};
	$("#BuscarColaboradorATD").click(function () {
		ZoomSubstituicaoAcidenteTrabProd.Linhas = new Array();
		ZoomSubstituicaoAcidenteTrabProd.Renderizado = false;
		ZoomSubstituicaoAcidenteTrabProd.Abrir();
	});

	var ZoomSubstituicaoAcidenteTrabAE = new Zoom();
	ZoomSubstituicaoAcidenteTrabAE.FieldsName = new Array("cpCodSecaoProd", "cpCodColigadaDepartamento");
	ZoomSubstituicaoAcidenteTrabAE.Id = "IDZoomSubstituicaoAcidenteTrabProd";
	ZoomSubstituicaoAcidenteTrabAE.DataSet = "DS_FLUIG_0020";
	ZoomSubstituicaoAcidenteTrabAE.Colunas = new Array(
		{
			"title": "Colaborador", "name": "NOME"
		}, // 0
		{
			"title": "Função", "name": "FUNCAO"
		} // 1
	);
	ZoomSubstituicaoAcidenteTrabAE.Titulo = "Buscar Colaborador";
	ZoomSubstituicaoAcidenteTrabAE.Retorno = function (retorno) {
		$("#cpColaboradorATDAdm").val(retorno[0]);
		$("#cpFuncaoATDAdm").val(retorno[1]);
	};
	$("#BuscarColaboradorAcidenteTDAdm").click(function () {
		ZoomSubstituicaoAcidenteTrabAE.Abrir();
	});

	// DP RECOLHER DOCUMENTACAO ADMINISTRATIVO
	var ZoomDpResponsavel = new Zoom();
	ZoomDpResponsavel.FieldsName = new Array("cpCodColigadaDepartamento", "cpCodSecaoProd");
	ZoomDpResponsavel.Id = "IDZoomDpResponsavel";
	ZoomDpResponsavel.DataSet = "DS_FLUIG_0034";
	ZoomDpResponsavel.Colunas = new Array(
		{
			"title": "Nome do responsável", "name": "NOME"
		}, // 0
		{
			"title": "CHAPA", "name": "CHAPA", "display": false
		} // 1
	);
	ZoomDpResponsavel.Titulo = "Buscar Salário";
	ZoomDpResponsavel.Retorno = function (retorno) {
		$("#cpRecolherDocAE").val(retorno[0]);
		$("#cpRecolherDocAEChapa").val(retorno[1]);
	};
	$("#BuscarRecolherDocAE").click(function () {
		ZoomDpResponsavel.Abrir();
	});
	// NOME DO CARGO
	var ZoomCargo = new Zoom();
	ZoomCargo.FieldsName = new Array("cpCodColigadaDepartamento", "cpCodSecaoProd", "cpFiltroCargo");
	ZoomCargo.Id = "IDZoomCargo";
	ZoomCargo.DataSet = "DS_FLUIG_0005";
	ZoomCargo.Colunas = new Array(
		{
			"title": "Cargo", "name": "NOME"
		}, // 0
		{
			"title": "Código", "name": "CODIGO", "display": false
		} // 1
	);
	ZoomCargo.Titulo = "Busca de Cargo";
	// SALARIO
	var ZoomSalarioAdm = new Zoom();
	ZoomSalarioAdm.Id = "IDZoomSalario";
	ZoomSalarioAdm.DataSet = "DS_FLUIG_0001";
	ZoomSalarioAdm.Colunas = new Array(
		{
			"title": "Salário", "name": "SALARIO"
		} // 0
	);
	ZoomSalarioAdm.Titulo = "Buscar Salário";
	// PRODUCAO- ZOOM - NOME DO CARGO
	$("#tbSalario tbody tr").each(function () {
		/*
		$(this).find("i").attr("onclick", "Javascript:RemoverColaborador(this);fnWdkRemoveChild(this);");
		*/
		var tipoMaoObra = $("#cpTipoMaoObra").val();
		if (tipoMaoObra == "3" || tipoMaoObra == "4") {
			$("#tbSalario tbody tr").find(".estrategico").show();
		}
		else {
			$("#tbSalario tbody tr").find(".estrategico").hide();
		}
	});

	$("#btnAdicionarNovoColaborador").click(function () {
		$("#cpQuantidadeColaboradores").val(parseInt($("#cpQuantidadeColaboradores").val()) + 1);
		var index = wdkAddChild('tbSalario');
		AdicionarColaboradores(index);
	});

	if (atividade == 3 && parseInt($("#tbSalarioTotal").val()) > 0) {
		for (var i = 1; i <= $("#tbSalarioTotal").val(); i++) {
			AdicionarColaboradores(i);
		}
	}

	// RECRUTAMENTO DE SELECAO - CANDIDATO INTERNO - CENTRO DE CUSTO
	$(".itmTipo").each(function () {
		$(this).change(function () {
			MudarTipoColaborador($(this), false);
		});
		MudarTipoColaborador($(this), true);
	});

	var ZoomCandidatoInternoCCO = new Zoom();
	ZoomCandidatoInternoCCO.FieldsName = new Array();
	ZoomCandidatoInternoCCO.Id = "IDZoomZoomCandidatoInternoCCO";
	ZoomCandidatoInternoCCO.DataSet = "DS_FLUIG_0006";
	ZoomCandidatoInternoCCO.Colunas = new Array(
		{
			"title": "Centro de Custo de Origem", "name": "SECAO"
		},// 0
		{
			"title": "CODCOLIGADA", "name": "CODCOLIGADA", "display": false
		},// 1,
		{
			"title": "CODSECAO", "name": "CODSECAO", "display": false
		},// 2
		{
			"title": "EMPRESA", "name": "DEPARTAMENTO", "display": false
		},// 3
		{ "title": "Estado", "name": "ESTADO", "display": false },// 4
		{ "title": "Nome do Gestor", "name": "NOME_GESTOR", "display": false },// 5
		{ "title": "Chapa do Gestor", "name": "CHAPA_GESTOR", "display": false }// 6
	);

	ZoomCandidatoInternoCCO.Titulo = "Busca de Centro de Custo";
	// RECRUTAMENTO DE SELECAO - CANDIDATO INTERNO - COLABORADOR
	var ZoomCandidatoInternoColaborador = new Zoom();
	ZoomCandidatoInternoColaborador.Id = "ZoomCandidatoInternoColaborador";
	ZoomCandidatoInternoColaborador.DataSet = "DS_FLUIG_0013";
	ZoomCandidatoInternoColaborador.Colunas = new Array(
		{
			"title": "Nome", "name": "NOME"
		},// 0
		{
			"title": "Cargo", "name": "FUNCAO"
		}, // 1
		{
			"title": "Salário", "name": "SALARIO"
		}, // 2
		{
			"title": "CODFUNCAO", "name": "CODFUNCAO", "display": false
		}, // 3
		{
			"title": "CHAPA", "name": "CHAPA", "display": false
		}, // 4
		{
			"title": "DATAADMISSAO", "name": "DATAADMISSAO", "display": false
		});
	ZoomCandidatoInternoColaborador.Titulo = "Busca de Colaborador";
	ZoomCandidatoInternoColaborador.Retorno = function (retorno) {
		$("#itmColaboradorCCO").val(retorno[0]);
	};

	// RECRUTAMENTO DE SELECAO - CANDIDATO INTERNO - NOVO SALARIO
	var ZoomNovoSalario = new Zoom();
	ZoomNovoSalario.Id = "IDZoomNovoSalario";
	ZoomNovoSalario.DataSet = "DS_FLUIG_0016";
	ZoomNovoSalario.Colunas = new Array(
		{
			"title": "Novo Salário", "name": "SALARIO"
		} // 0
	);
	ZoomNovoSalario.Titulo = "Buscar Novo Salário";
	// CLICK
	$("#NovoCandidatoInterno").click(function () {
		var index = wdkAddChild('tbCandidatoInterno');
		$("#tbCandidatoInternoTotal").val(index);
		//
	});
	// RECRUTAMENTO DE SELECAO - BOTAO - CANDIDATO EXTERNO ZOOM PAI E FILHO -
	// CARGO
	var ZoomCargoCandidatoExterno = new Zoom();
	ZoomCargoCandidatoExterno.FieldsName = new Array("cpCodColigadaDepartamento", "cpCodSecaoPadrao", "cpFiltroCargo");
	ZoomCargoCandidatoExterno.Id = "IDZoomCargoCandidatoExterno";
	ZoomCargoCandidatoExterno.DataSet = "DS_FLUIG_0005";
	ZoomCargoCandidatoExterno.Colunas = new Array(
		{
			"title": "Cargo", "name": "NOME"
		}, // 0
		{
			"title": "Código", "name": "CODIGO", "display": false
		} // 1
	);

	ZoomCargoCandidatoExterno.Titulo = "Busca de Cargo";
	// RECRUTAMENTO DE SELECAO - BOTÃ?O - CANDIDATO EXTERNO ZOOM PAI E FILHO -
	// SALARIO
	var ZoomSalarioExterno = new Zoom();
	ZoomSalarioExterno.Id = "IDZoomSalarioExterno";
	ZoomSalarioExterno.DataSet = "DS_FLUIG_0016";
	ZoomSalarioExterno.Colunas = new Array(
		{
			"title": "Salário", "name": "SALARIO"
		} // 0
	);

	ZoomSalarioExterno.Titulo = "Buscar Salário";
	// CLICK
	$("#NovoCandidatoExterno").click(function () {
		var index = wdkAddChild('tbCandidatoExterno');
		$("#tbCandidatoExternoTotal").val(index);
		$(".tbCandidatoExterno tbody tr:last .BuscarCargo").click(function () {
			ZoomCargoCandidatoExterno.Linhas = new Array();
			ZoomCargoCandidatoExterno.Abrir();
			ZoomCargoCandidatoExterno.Retorno = function (retorno) {
				$("#itmCargo___" + index).val(retorno[0]);
				$("#itmCargoCod___" + index).val(retorno[1].replace("A", ""));
				$("#itmSalario___" + index).val("");
			};
		});
		$(".tbCandidatoExterno tbody tr:last .BuscarSalario").click(function () {
			ZoomSalarioExterno.FieldsName = new Array("cpCodColigadaDepartamento", "cpCodSecaoPadrao", "itmCargoCod___" + index, 'cpSalarioMinimo');
			ZoomSalarioExterno.Linhas = new Array();
			ZoomSalarioExterno.Renderizado = false;
			ZoomSalarioExterno.Abrir();
			ZoomSalarioExterno.Retorno = function (retorno) {
				var salario = parseFloat(retorno[0]);
				$("#itmSalario___" + index).val(salario.toFixed(2));
			};
		});
	});

	// ZOOM PRODUCAO
	if (atividade > 3) {
		$("#BuscarCpObraDepProd").remove();
		$("#BuscarRecolherDocProd").remove();
		// MOTIVO SUBSTITUIÃ?Ã?O DEMISSÃ?O
		$("#BuscarColaboradorSDTP").remove();
		// SUBSTITUIÃ?Ã?O FÃ?RIAS
		$("#BuscarColaboradorSF").remove();
		// LICENÃ?A MATERNIDADE
		$("#BuscarColaboradorLM").remove();
		// ACIDENTE DE TRABALHO OU DOENCA
		$("#BuscarColaboradorATD").remove();

		$("#BuscarRecolherDocAE").remove();
		$("#BuscarNomeCargoAE").remove();
		$("#BuscarSalarioAE").remove();
		// MOTIVO SUBSTITUIÃ?Ã?O DEMISSÃ?O
		$("#BuscarColaboradorSubsDemiAdm").remove();
		// SUBSTITUIÃ?Ã?O FÃ?RIAS
		$("#BuscarColaboradorSubsFeriasAdm").remove();
		// LICENÃ?A MATERNIDADE
		$("#BuscarColaboradorLicMatAdm").remove();
		// ACIDENTE DE TRABALHO OU DOENÃ?A
		$("#BuscarColaboradorAcidenteTDAdm").remove();
	}
	// ZOOM RECRUTAMENTO DA SELECAO
	if (atividade == 93) {
		$(".BuscarCentroCustoOrigem").show();
		$(".BuscarSalario").show();
		$(".BuscarCargo").show();
		$(".BuscarNovoSalarioCCO").show();
		$(".BuscarColaboradorCCO").show();
		$(".tbCandidatos tbody tr").each(
			function (index) {
				if (index > 0) {

					$(this).find(".BuscarNovoSalarioCCO").click(function () {

						var row = $(this).closest("tr");
						var selecTipo = row.find(".itmTipo");
						var tipo = selecTipo.val();

						var rowId = selecTipo[0].id.slice(10);
						var rowID

						var cargo = $("#itmCargoCCO___" + rowId).val();
						var idCargo = getIdCargo(cargo);
						var codigo = $("#itmCodCargo___" + rowId).val();

						ZoomNovoSalario.DataSet = "DS_FLUIG_0016";

						if (tipo == "1") {
							//ZoomNovoSalario.FieldsName = new Array("itmCodCargo___" + candidatoindex, "cpCodSecaoProd", "cpCodColigadaDepartamento", "itmSalarioCCO___" + candidatoindex);
						} else {
							ZoomNovoSalario.FieldsName = new Array("itmCodCargo___" + idCargo, "cpCodSecaoProd", "cpCodColigadaDepartamento", 'cpSalarioMinimo');
						}

						ZoomNovoSalario.Linhas = new Array();
						ZoomNovoSalario.Abrir();
						ZoomNovoSalario.Retorno = function (retorno) {
							$("#itmNovoSalarioCCO___" + rowId).val(retorno[0]);
						};
					});

					/*
					var tempIndex = $(this).find(".itmIndexCandidato").val();

					var candidatoindex = parseInt($("#tbSalario .itmIndexSalario[value=" + tempIndex + "]").attr("id").replace("itmIndexSalario___", ""));
					
					var rowIndex = $(this).index();
					$(this).find(".BuscarCentroCustoOrigem").click(function()
					{
						ZoomCandidatoInternoCCO.Abrir();
						ZoomCandidatoInternoCCO.Retorno = function(retorno)
						{
							$("#itmCetroCustoOrigem___" + rowIndex).val(retorno[0]);
							$("#itmCentroCustoColigada___" + rowIndex).val(retorno[1]);
							$("#itmCentroCustoCodSecao___" + rowIndex).val(retorno[2]);
							$("#itmEmpresaCCO___" + rowIndex).val(retorno[3]);
							$("#itmEmpresaUF___" + rowIndex).val(retorno[4]);
							$("#itmEmpresaNomeGestor___" + rowIndex).val(retorno[5]);
							$("#itmEmpresaChapaGestor___" + rowIndex).val(retorno[6]);
						};
					});

					$(this).find(".BuscarColaboradorCCO").click(
							function()
							{
								ZoomCandidatoInternoColaborador.Linhas = new Array();
								ZoomCandidatoInternoColaborador.FieldsName = new Array("itmCentroCustoCodSecao___" + rowIndex,
										"itmCentroCustoColigada___" + rowIndex);
								ZoomCandidatoInternoColaborador.Abrir();
								ZoomCandidatoInternoColaborador.Retorno = function(retorno)
								{
									$("#itmColaboradorCCO___" + rowIndex + " , #_itmColaboradorCCO___" + rowIndex).val(retorno[0]);
									$("#itmCargoAtualCCO___" + rowIndex).val(retorno[1]);
									$("#itmSalarioCCO___" + rowIndex).val(retorno[2]);
									$("#itmCodFuncao___" + rowIndex).val(retorno[3]);
									
									
									$("#itmMatriculaCCO___" + rowIndex).val(retorno[4]);
									$("#itmDtAdmissaoCCO___" + rowIndex).val(retorno[5]);
								};
							});
					*/
				}
			});
	}
	else {
		$(".BuscarCentroCustoOrigem").remove();
		$(".BuscarSalario").remove();
		$(".BuscarCargo").remove();
		$(".BuscarNovoSalarioCCO").remove();
		$(".BuscarColaboradorCCO").remove();
	}
	// ABA ABERTA
	$('.collapse').collapse(
		{
			toggle: false
		});
	if (atividade > 3) {
		$(".panel-ativ-1 button, .panel-ativ-1 input[type=button], .panel-ativ-1 i").remove();
		$(".panel-ativ-1 select").each(
			function () {
				$(this).attr("disabled", "disabled");
				$(this).after(
					"<input type='hidden' name='" + $(this).attr("name") + "' id='" + $(this).attr("id") + "' value='" + $(this).val()
					+ "' />");
			});
	}
	if (atividade != 93) {
		$("#NovoCandidatoInterno").remove();
		$("#NovoCandidatoExterno").remove();
		$("#tbCandidatoInterno :input").attr("readonly", "readonly");
	}

	//ABA DE APROVACAO ABERTA EM CADA ATIVIDADE
	$('#panelAtividade_' + atividade).collapse("show");

	$(".itmTableIndex").each(
		function () {
			var value = $(this).val();
			var recrutados = $("#cpRecrutados").val().split(",");
			var OSs = $("#cpOS").val().split(",");
			for (var item in recrutados) {
				if (recrutados[item] == value) {
					$("#itmRecrutado___" + value).val("Recrutado");
					$("#itmRecrutadoOS___" + value).val(OSs[item]);
					$("#itmRecrutado___" + value).closest("tr").find(".btn-info").remove();
					var tipovalue = $("#itmTipo___" + value).val();

					$("#itmTipo___" + value).attr("disabled", "disabled").after(
						"<input type='hidden' name='itmTipo___" + value + "' id='itmTipo___" + value + "' value='" + tipovalue + "' />");
				}
			}
		});
	$(".itmCandidato").each(
		function () {
			var index = $(this).closest("tr").find(".itmTableIndexExperiencia").val();
			var nome = $("#itmColaboradorCCO___" + index).val();
			var recrutado = $("#itmRecrutado___" + index).val();
			if (nome == "") {
				$(this).closest("tr").hide();
			}
			else {
				if (recrutado == "Recrutado") {
					$("#itmExperiencia___" + index).attr("disabled", "disabled").after(
						"<input type='hidden' name='itmExperiencia___" + index + "' id='itmExperiencia___" + index + "' value='"
						+ $("#itmExperiencia___" + index).val() + "' />");
				}
				$("#itmCandidato___" + index).val(nome);
			}
		});

} // FIM DO LOAD

function RemoverColaborador(index) {
	if (index != "") {
		$("#tbCandidatos .itmIndexCandidato[value=" + index + "]").closest("tr").remove();
		$("#tbExperiencia .itmIndexCandidatoExperiencia[value=" + index + "]").closest("tr").remove();
	}
}

// OPCOES TIPO DE MAO DE OBRA ESCONDE CAMPOS
function AlterarTipo() {

	var DisplayBotaoZoomDpObraTipoMaoObra = $("#cpTipoMaoObra").val();

	if (DisplayBotaoZoomDpObraTipoMaoObra == 3 || DisplayBotaoZoomDpObraTipoMaoObra == 4) {

		$("#BuscarRecolherDocProd").show();
	}

	escondeCampos();
	LimpaCamposTipoMaoObra();

}

// LIMPA CAMPOS DEPENDENDO DO TIPO DE MAO DE OBRA
function LimpaCamposTipoMaoObra(atividade) {
	var LimparCamposTipoMaoObra = $("#cpTipoMaoObra").val();
	if (LimparCamposTipoMaoObra == 1 || LimparCamposTipoMaoObra == 2 || LimparCamposTipoMaoObra == 3 || LimparCamposTipoMaoObra == 4) {
		$("#cpObraDepProd").val("");
		$("#cpCodSecaoProd").val("");
		$("#cpEstadoProd").val("");
		$("#cpMotivoAdmissaoProd").val("0");
		$("#MotivoRequisicao").val("");
		$("#cpRecolherDocProd").val("");
		$("#CpEscolaridade").val("0");
		$("#cpAreaFormacao").val("");
		$("#CpTempoExperiencia").val("0");
		$("#cpExperienciaComprovada").val("");
		$("#cpExperienciaDesejada").val("");
		$("#cpCompetencias").val("");
		$("#cpAtribuicoesCargo").val("");
		$("#cpConhecimentosTecnicos").val("");
		$("#cpDiferenciais").val("");
		$("#CpDisponibilidadeViagens").val("0");
		$("#cpIngles").val("0");
		$("#cpEspanhol").val("0");
		$("#OutrosIdiomas").val("");
		$("#cpColaboradorMA").val("");
		$("#cpFuncaoSDTP").val("");
		$("#cpColaboradorSF").val("");
		$("#cpFuncaoSF").val("");
		$("#cpColaboradorLM").val("");
		$("#cpFuncaoLM").val("");
		$("#cpColaboradorATD").val("");
		$("#cpFuncaoATD").val("");
		$("#cpColaboradorMA").val("");
		$("#cpFuncaoSDTP").val("");

	}
	//LIMPA TABELA SALARIO PAI E FILHO E REMOVE
	$("#tbSalario tbody tr").each(function () {
		if (this.style.display == "table-row") {
			$(this).remove();
		}
	});

	//LIMPA TABELA CANDIDATOS PAI E FILHO E REMOVE
	$("#tbCandidatos tbody tr").each(function () {
		if (this.style.display == "table-row") {
			$(this).remove();
		}
	});

	//LIMPA TABELA EXPERIENCIA PAI E FILHO E REMOVE
	/**$("#tbExperiencia tbody tr").each(function(){
		if (this.style.display == "table-row") {
			$(this).remove();
		}
	});**/
}

// OPCAO HA INDICACAO
function AlterarIndicacao(element) {

	var MudarIndicacao = $(element).val();

	if (MudarIndicacao == 1) {
		$(element).closest("tr").find(".indicacao").show();

	} else if (MudarIndicacao == 2) {
		$(element).closest("tr").find(".indicacao").hide();

	} else {
		$(element).closest("tr").find(".indicacao").hide();
	}
}

// DESCRICAO MOTIVO DE ADMISSAO PRODUCAO
function AlterarMotivoProd() {
	var OpcoesMotivoProd = $("#cpMotivoAdmissaoProd").val();
	if (OpcoesMotivoProd == 2 || OpcoesMotivoProd == 7) {
		if (OpcoesMotivoProd == 7) {
			$("#cpColaboradorMA").removeAttr("readonly");
			$("#cpFuncaoSDTP").removeAttr("readonly");
			$("#cpColaboradorAdm").removeAttr("readonly");
			$("#cpFuncaoSDAdm").removeAttr("readonly");
		} else {
			$("#cpColaboradorMA").removeAttr("readonly");
			$("#cpFuncaoSDTP").removeAttr("readonly");
			$("#cpColaboradorAdm").attr("readonly");
			$("#cpFuncaoSDAdm").attr("readonly");
		}
		$("#SubstituicaoDemissao").show();
		$("#SubstituicaoFerias").hide();
		$("#SubstituicaoLMaternidade").hide();
		$("#SubstituicaoATD").hide();
	} else if (OpcoesMotivoProd == 3) {
		$("#SubstituicaoDemissao").hide();
		$("#SubstituicaoFerias").show();
		$("#SubstituicaoLMaternidade").hide();
		$("#SubstituicaoATD").hide();
		$("#cpColaboradorSF").removeAttr("readonly");
		$("#cpFuncaoSF").removeAttr("readonly");
	} else if (OpcoesMotivoProd == 4) {
		$("#SubstituicaoDemissao").hide();
		$("#SubstituicaoFerias").hide();
		$("#SubstituicaoLMaternidade").show();
		$("#SubstituicaoATD").hide();
		$("#cpColaboradorLM").removeAttr("readonly");
		$("#cpFuncaoLM").removeAttr("readonly");
	} else if (OpcoesMotivoProd == 5) {
		$("#SubstituicaoDemissao").hide();
		$("#SubstituicaoFerias").hide();
		$("#SubstituicaoLMaternidade").hide();
		$("#SubstituicaoATD").show();
		$("#cpColaboradorATD").removeAttr("readonly");
		$("#cpFuncaoATD").removeAttr("readonly");
	} else {
		$("#SubstituicaoDemissao").hide();
		$("#SubstituicaoFerias").hide();
		$("#SubstituicaoLMaternidade").hide();
		$("#SubstituicaoATD").hide();
	}
}

// DESCRICAO MOTIVO DE ADMISSAO ADMINISTRATIVO E ESTRATEGICO
function AlterarMotivoAE() {
	var OpcoesMotivoAE = $("#cpMotivoAdmissaoAE").val();
	if (OpcoesMotivoAE == 2 || OpcoesMotivoAE == 7) {
		if (OpcoesMotivoAE == 7) {
			$("#cpColaboradorMA").removeAttr("readonly");
			$("#cpFuncaoSDTP").removeAttr("readonly");
			$("#cpColaboradorAdm").removeAttr("readonly");
			$("#cpFuncaoSDAdm").removeAttr("readonly");

		} else {
			$("#cpColaboradorMA").attr("readonly", "readonly");
			$("#cpFuncaoSDTP").attr("readonly", "readonly");
			$("#cpColaboradorAdm").attr("readonly");
			$("#cpFuncaoSDAdm").attr("readonly");
		}
		$("#SubsDemiADMEST").show();
		$("#SubsFeriasADMEST").hide();
		$("#SubsLMatADMEST").hide();
		$("#SubsAcidenteTDADMEST").hide();
	} else if (OpcoesMotivoAE == 3) {
		$("#SubsDemiADMEST").hide();
		$("#SubsFeriasADMEST").show();
		$("#SubsLMatADMEST").hide();
		$("#SubsAcidenteTDADMEST").hide();
	} else if (OpcoesMotivoAE == 4) {
		$("#SubsDemiADMEST").hide();
		$("#SubsFeriasADMEST").hide();
		$("#SubsLMatADMEST").show();
		$("#SubsAcidenteTDADMEST").hide();
	} else if (OpcoesMotivoAE == 5) {
		$("#SubsDemiADMEST").hide();
		$("#SubsFeriasADMEST").hide();
		$("#SubsLMatADMEST").hide();
		$("#SubsAcidenteTDADMEST").show();
	} else {
		$("#SubsDemiADMEST").hide();
		$("#SubsFeriasADMEST").hide();
		$("#SubsLMatADMEST").hide();
		$("#SubsAcidenteTDADMEST").hide();
	}
}

// SUPERIOR CURSANDO GRAU
function AlterarEscolaridade() {
	var MudarEscolaridade = $("#CpEscolaridade").val();
	if (MudarEscolaridade == 4) {
		$("#grau").show();
	} else {
		$("#grau").hide();
	}
}

// PERIODICIDADE
function AlterarDispViagens() {
	var MudarDisponibilidade = $("#CpDisponibilidadeViagens").val();
	if (MudarDisponibilidade == 1) {
		$("#Periodicidade").show();
	} else {
		$("#Periodicidade").hide();
	}
}

// TABELA INGLES
function AddTabelaIngles(campoValor) {
	if ($(campoValor).is(":checked")) {
		$("#tabelaIngles").show();
	} else {
		$("#tabelaIngles").hide();
	}
}
// TABELA ESPANHOL
function AddTabelaEspanhol(campoValor) {
	if ($(campoValor).is(":checked")) {
		$("#tabelaEspanhol").show();
	} else {
		$("#tabelaEspanhol").hide();
	}
}
// DEFINE RESPONSAVEL PELA ATIVIDADE RECOLHER DOCUMENTACAO DO FORMULARIO DE CADASTRO DE NOVOS COLABORADORES
// ESCONDE E MOSTRA BOTAO ZOOM DP RECOLHER DOCUMENTACAO
// IMPRIME NO CAMPO QUEM QUAL PAPEL A ATIVIDADE RECEBERA
function DefinePapelPadraoRecolhimentoDoc() {
	var Secao = $("#cpCodSecaoProd").val();
	var TipoMaoObra = $("#cpTipoMaoObra").val();
	var ObraOuSede = $("#cpObraSede").val();
	var estado = $("#cpEstadoProd").val();
	var papelPadrao = "";
	var secao = $("#cpCodSecaoProd").val();
	$("#cpPapelPadraoRecolhimentoDoc").val("");

	if (ObraOuSede == 1 && (TipoMaoObra == 1 || TipoMaoObra == 2)) {
		if (estado == "MG" && Secao.substring(5, 10) != "26201") {
			papelPadrao = "Pool:Role:ERC.001"; //MINAS GERAIS
			$("#BuscarRecolherDocProd").hide();
			$("#cpRecolherDocProd").val("ERCMG: Central de Obras MG");
			$("#cpPapelPadraoRecolhimentoDoc").val(papelPadrao);
		} else if (estado == "RJ" && secao != '01.2.32401.01.001' && secao != '01.2.32401.01.002') {
			papelPadrao = "Pool:Role:ERC.002"; //RIO DE JANEIRO
			$("#BuscarRecolherDocProd").hide();
			$("#cpRecolherDocProd").val("ERCRJ: Central de Obras RJ");
			$("#cpPapelPadraoRecolhimentoDoc").val(papelPadrao);
		} else if (estado == "CE") {
			papelPadrao = "Pool:Role:ERC.003"; //CEARA
			$("#BuscarRecolherDocProd").hide();
			$("#cpRecolherDocProd").val("ERCCE: Central de Obras CE");
			$("#cpPapelPadraoRecolhimentoDoc").val(papelPadrao);
		} else if (estado == "DF") {
			papelPadrao = "Pool:Role:ERC.006"; //BRASILIA
			$("#BuscarRecolherDocProd").hide();
			$("#cpRecolherDocProd").val("ERCDF - Central de Obras DF");
			$("#cpPapelPadraoRecolhimentoDoc").val(papelPadrao);
		} else if (estado == "GO") {
			papelPadrao = "Pool:Role:ERC.018"; //GOIAS
			$("#BuscarRecolherDocProd").hide();
			$("#cpRecolherDocProd").val("ERC – Central de Obras GO");
			$("#cpPapelPadraoRecolhimentoDoc").val(papelPadrao);
		} else if (estado == "RS") {
			papelPadrao = "Pool:Role:ERC.021"; //RS
			$("#BuscarRecolherDocProd").hide();
			$("#cpRecolherDocProd").val("ERC – Central de Obras RS");
			$("#cpPapelPadraoRecolhimentoDoc").val(papelPadrao);
		} else if (estado == "SP" && secao == "01.2.37201.01.001" || estado == "SP" && secao == "01.2.37201.01.002" ||
			estado == "SP" && secao == "01.2.40501.01.001" || estado == "SP" && secao == "01.2.40501.01.002") {
			papelPadrao = "Pool:Role:ERC.023"; //SP
			$("#BuscarRecolherDocProd").hide();
			$("#cpRecolherDocProd").val("ERC – Central de Obras SP");
			$("#cpPapelPadraoRecolhimentoDoc").val(papelPadrao);
		}
		else {
			$("#BuscarRecolherDocProd").show();
		}
	} else {
		$("#BuscarRecolherDocProd").show();
	}
}
function DefineChapaDpRecolherDoc() {

	var PapelPadraoRecolherDoc = $("#cpPapelPadraoRecolhimentoDoc").val();

	if (PapelPadraoRecolherDoc == "") {
		$("#cpPapelPadraoRecolhimentoDoc").val($("#cpRecolherDocProdChapa").val());
	}
}
// ESCONDE E MOSTRA O CAMPO RECOLHER DOCUMENTACAO
function ChecarRecolherDocumentacao() {
	if ($("#cpObraSede").val() == "2") {
		$("#dpRecolherDoc").hide();
	} else {
		$("#dpRecolherDoc").show();
	}
}

var indexCandidatos;
// TABELA DINAMICA ADICIONAR COLABORADORES
function AdicionarColaboradores(index) {

	//Zera os indices dos Pai-Filhos para reabertura do chamado. 
	if (Compartilhados.getCurrentState() == 3) {
		$('table[tablename=tbCandidatos] tbody tr').not(':first').remove();
		$('table[tablename=tbExperiencia] tbody tr').not(':first').remove();
		$('#itmQuantidade___1').val('');
		$('.itmCandidato').remove();
		$('.itmExperiencia').remove();
		$('.itmTableIndexExperiencia').remove();
		$('.itmIndexCandidatoExperiencia').remove();
		tbExperiencia
	}

	indexCandidatos = new Array();

	var tipoMaoObra = $("#cpTipoMaoObra").val();

	if (tipoMaoObra == "3" || tipoMaoObra == "4") {
		$("#tbSalario tbody tr").last().find(".estrategico").show();

	} else {
		$("#tbSalario tbody tr").last().find(".estrategico").hide();
	}

	$("#itmIndexSalario___" + index).val(index);

	$("#tbSalario tbody tr").last().find('i').attr('onclick', 'Javascript:RemoverColaborador(' + index + ');fnCustomDelete(this);');

	$("#tbSalarioTotal").val(index);

	$("#itmQuantidade___" + index).change(function () {
		cargo = $("#itmNomeCargo___" + index).val();

		if (cargo) {
			AlterarQuantidade(index, this.value);
		} else {
			alert("Antes de selecionar a quantidade favor informar o cargo!");
			$("#itmQuantidade___" + index).val(0);
		}

	});

	$(".tbSalario tbody tr:last .BuscarNomeCargoProd").click(function () {

		ZoomCargoProd.Linhas = new Array();
		ZoomCargoProd.Abrir();
		ZoomCargoProd.Retorno = function (retorno) {
			$("#itmIndexSalario___" + index).val("");
			$("#itmSalario___" + index).val("");
			$("#itmNomeCargo___" + index).val(retorno[0]);
			$("#itmCargoCCO___" + index).val(retorno[0]);
			$("#itmQuantidade___" + index).val("");
			$("#itmCodCargo___" + index).val(retorno[1].replace("A", ""));
		};
	});

	$(".tbSalario tbody tr:last .btInfTipoPosto").mouseenter(function () {
		$(".divInf").show();
	});

	$(".tbSalario tbody tr:last .btInfTipoPosto").mouseleave(function () {
		$(".divInf").hide();
	});

	//TIPO MAO DE OBRA XXXXXXXXXXXX
	$(".tbSalario tbody tr:last .BuscarNomeTipoMaoObra").click(function () {

		var codColigada = $("#cpCodColigadaObraDep").val();
		var tipoPostoTrab = $("#itmTipoPostoComSemAlt___" + index).val();



		if (tipoPostoTrab == "") {

			alert("Antes selecionar o nome do posto, favor informar o TIPO DE POSTO!");

		} else {

			//var codColigada = $("#cpCodColigadaObraDep").val();

			if (tipoPostoTrab == '1') {
				nomeTipoDoPosto = "COM ALTURA";
			}
			else {
				nomeTipoDoPosto = "SEM ALTURA";
			}


			ZOOM.getInstance().getPostoTrabalho(codColigada, nomeTipoDoPosto)
			FLUIGC.sessionStorage.setItem('clickBotao' + index, index)

			/* FLUIGC.sessionStorage.setItem('postoTrabalho', true);
			ZOOM.getInstance().getPostoTrabalho(codColigada, nomeTipoDoPosto); */
		}



		$(document).on('ZoomPostoTrabalho', function (ev, retorno) {

			preencherTipoDePosto(retorno, 'clickBotao' + index, index)

		});

	});

	// PRODUCAO - ZOOM - SALARIO
	$(".tbSalario tbody tr:last .BuscarSalarioProd").click(function () {
		$("#cpTipoMov").val("1");
		$("#cpTempMatricula").val("0212312");

		ZoomSalarioProd.FieldsName = new Array("itmCodCargo___" + index, "cpCodSecaoProd", "cpCodColigadaDepartamento", "cpSalarioMinimo");
		ZoomSalarioProd.Renderizado = false;
		ZoomSalarioProd.Linhas = new Array();
		ZoomSalarioProd.Abrir();
		ZoomSalarioProd.Retorno = function (retorno) {
			var salario = parseFloat(retorno[0]);
			$("#itmSalario___" + index).val(salario.toFixed(2));
		};
	});

	$(".tbSalario tbody tr:last .BuscarHorarioAE").click(function () {
		ZoomHorarioAdm.Linhas = new Array();
		ZoomHorarioAdm.Retorno = function (retorno) {
			$("#itmHorario___" + index).val(retorno[0]);
		};
		ZoomHorarioAdm.Abrir();
	});

	function preencherTipoDePosto(retorno, index, i) {

		if (FLUIGC.sessionStorage.getItem(index)) {

			window.loadingLayer.show();
			setTimeout(function () {

				/*	$('#itmDescMaoObra___' + i).val(retorno.SECAO);
					$('#itmCodPosto___' + i).val(retorno.SECAO);
					$('#itmTipoPosto___' + i).val(retorno.SECAO);*/

				$('#itmDescMaoObra___' + i).val(retorno.DESCRICAO);
				$('#itmCodPosto___' + i).val(retorno.CODPOSTO);
				$('#itmTipoPosto___' + i).val(retorno.TIPOPOSTO);

				window.loadingLayer.hide();
			}, 1000);

			FLUIGC.sessionStorage.setItem(index, false);

		}
	}
}

function AlterarQuantidade(index, nroCand) {

	RemoverColaborador(index);

	$(".itmIndexCandidato[value=" + index + "]").closest("tr").remove();
	$(".itmIndexCandidatoExperiencia[value=" + index + "]").closest("tr").remove();


	var data = new Date();
	var stringData = data.getDate() + "/" + (data.getMonth() + 1) + "/" + data.getFullYear();


	for (var i = 1; i <= nroCand; i++) {
		var temp_index = wdkAddChild('tbCandidatos');
		wdkAddChild('tbExperiencia');
		indexCandidatos.push(temp_index);
		$("#itmIndexCandidato___" + temp_index).val(index);
		$("#itmIndexCandidatoExperiencia___" + temp_index).val(index);

		if ($("#itmRecrutado___" + temp_index).val() == "") {
			$("#itmRecrutado___" + temp_index).val("Aguardando");
		}

		$("#itmCargoCCO___" + temp_index).val($("#itmNomeCargo___" + index).val());


		$("#itmColaboradorCCOCodFuncao___" + temp_index).val($("#itmCodCargo___" + index).val());

		$("#itmTableIndex___" + temp_index).val(temp_index);
		$("#itmTableIndexExperiencia___" + temp_index).val(temp_index);

	}
	$(".itmTipo").each(function () {
		MudarTipoColaborador($(this), false);
	});

	var count = 0;
	$("#tbCandidatos tbody tr").each(function () {
		if (count > 0) {
			$(this).find(":input").each(function () {
				var name = $(this).data("name") + "___" + count;
				$(this).attr("name", name);
			});

			$(this).find(".itmTableIndex").val(count);
		}
		count++;
	});

	count = 0;
	$("#tbExperiencia tbody tr").each(function () {
		if (count > 0) {
			$(this).find(":input").each(function () {
				var name = $(this).data("name") + "___" + count;
				$(this).attr("name", name);
			});

			$(this).find(".itmTableIndexExperiencia").val(count);
		}
		count++;
	});
}
function alterarNomeCandidato(element) {

	var nome = $(element).val();
	var index = $(element).closest("tr").find(".itmTableIndex").val();
	$("#itmCandidato___" + index).val(nome);
}
function getIdCargo(cargo) {
	var id = null;
	$("#tbSalario tbody tr").each(function () {
		if (this.style.display != 'none') {
			var campo = $(this).find('input[value="' + cargo + '"]');
			if (campo.length > 0) {
				var itmId = $(this).find('input[value="' + cargo + '"]')[0].id.slice(15);
				id = itmId;
			}
		}
	});
	return id;
}
function fnCustomDelete(oElement) {

	$("#cpQuantidadeColaboradores").val(parseInt($("#cpQuantidadeColaboradores").val()) - 1);
	// Chamada a funcao padrao, NAO RETIRAR
	fnWdkRemoveChild(oElement);
}
$(document).ready(function () {
	var getDescricaoProcesso = function (codProcesso) {
		var c1 = DatasetFactory.createConstraint('processDefinitionPK.processId', codProcesso, codProcesso, ConstraintType.MUST);
		return DatasetFactory.getDataset('processDefinition', ['processDescription'], [c1]).values[0].processDescription;
	};

	var codigoProcesso = 'FLUIG-0104', // Código do processo
		targetID = 'descricaoProcesso', // ID do elemento que receberá o nome
		descricaoProcesso = getDescricaoProcesso(codigoProcesso);

	$("#" + targetID).html(descricaoProcesso);
	targetID = 'descricaoProcessoDesc';
	$("#" + targetID).html(descricaoProcesso);
});

$(document).ready(function () {

	var CODIGO_PROCESSO = "FLUIG-0104";
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
var getTipoSecao = function (secao, coligada) {
	var datasetResult = DatasetFactory.getDataset('DS_FLUIG_0050', [secao + '', coligada + ''], null, null),
		tipoSecao = datasetResult.values[0].TIPOSECAO;

	return tipoSecao.indexOf('SEDE') > -1 ? 2 : 1;
};