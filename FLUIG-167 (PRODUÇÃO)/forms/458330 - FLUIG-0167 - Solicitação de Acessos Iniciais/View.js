$(document).ready(function () {

	const currentState = Compartilhados.getCurrentState();
	console.log(currentState);
	VIEW.getInstance().inicializar(currentState, getModo());

	/**
	 * INPUT ACTIONS
	 */

	$('#btSenhaNovoUsuario').click(function () {
		VIEW.getInstance().revelarSenha();
	});

	$('#btBuscaSecaoNovoColaborador').click(function () {
		try {
			window.loadingLayer.show();

			setTimeout(function () {
				sessionStorage.setItem('BuscaSecaoNovoColaborador', '1');
				Compartilhados.LimparCampos(['limparCamposNovoColab']);
				ZOOM.getInstance().GetObraDepartamento();
				window.loadingLayer.hide();
			}, 1000);

		}
		catch (erro) {
			Compartilhados.WarningToast(Mensagens.M0003, '', 'danger');
			console.log(Mensagens.M0004.replace('{0}', '$("#buscaSecaoResponsavel").click').replace('{1}', erro))
		}
	});

	$('#btBuscaNovoColaboradorN').click(function () {
		sessionStorage.setItem('BuscaNovoColaborador', '1');
		ZOOM.getInstance().GetColaboradorAdmitido($("#cpInfCodSecao").val(), $("#cpCodColigada").val());
	});

	$("#buscaSecaoResponsavel").click(function () {
		try {
			window.loadingLayer.show();

			setTimeout(function () {
				Compartilhados.LimparCampos(['limparCamposNovoColab']);
				Compartilhados.LimparCampos(['limparCamposNovoColab']);
				sessionStorage.setItem('SecaoObraResponsavel', '1');
				ZOOM.getInstance().GetObraDepartamento();
				window.loadingLayer.hide();

			}, 1000);

		}
		catch (erro) {
			Compartilhados.WarningToast(Mensagens.M0003, '', 'danger');
			console.log(Mensagens.M0004.replace('{0}', '$("#buscaSecaoResponsavel").click').replace('{1}', erro))
		}
	});

	$("#buscaResponsavel").click(function () {

		try {
			window.loadingLayer.show();

			setTimeout(function () {
				sessionStorage.setItem('BuscaResponsavel', '1');
				ZOOM.getInstance().GetColaboradorAdmitido($("#cpSec").val(), $("#cpColg").val());
			}, 1000);
		}
		catch (erro) {
			Compartilhados.WarningToast(Mensagens.M0003, '', 'danger');
			console.log(Mensagens.M0004.replace('{0}', '$("#buscaSecaoResponsavel").click').replace('{1}', erro))
		}

	});

	$("#cpNaSede").change(function () {
		$("#cpNotebook").prop('disabled', this.value != '1');
	});

	$("#cpNecessidadeUAU").change(function () {
		$(".acessoUau").prop('disabled', this.value != '1');
	});

	$("#cpNecessidadeRM").change(function () {
		$(".acessoRm").prop('disabled', this.value != '1');
	});

	$("#cpNecessidadePastas").change(function () {
		$(".acessoPastaRede").prop('disabled', this.value != '1');
	});

	$("#cpNaSede2").change(function () {
		$("#blockNotebook2").toggle(this.value == '1');
	});

	$("#cpNecessidadeUAU2").change(function () {
		$("#divcpGrupoUAU2").toggle(this.value == '1');
		$('#blockUAU2').toggle(this.value == '1');
		$('#blockObsUAU2').toggle(this.value == '1');
	});

	$("#cpNecessidadeRM2").change(function () {
		$('#divColigadaRM2').toggle(this.value == '1');
		$('#divObsRM2').toggle(this.value == '1');
		$('#divPerfilLabore2').toggle(this.value == '1');
		$('#divPerfilChronus2').toggle(this.value == '1');
		$('#divPerfilVitae2').toggle(this.value == '1');

	});

	$("#cpNecessidadePastas2").change(function () {
		$('#divTipoPermissaoPastas2').toggle(this.value == '1');
		$('#divObsPastas2').toggle(this.value == '1');
	});

	$("#cpAprovacaoCriacao").change(function () {

		$('#blockResponsavel').toggle(this.value == '3');

		if ($('#cpAprovacaoCriacao').val() == '1') {
			Compartilhados.LimparCampos(['dadosResponsavel', 'limpaSecaoResp']);
		} else if ($('#cpAprovacaoCriacao').val() == '2') {
			Compartilhados.LimparCampos(['dadosResponsavel', 'limpaSecaoResp']);
		};

	});

	$("#cpConfirmacao").change(function () {
		$('#divSatisfacao').toggle(this.value == '1');
		//	$('#divJustificativaSatisfacao').toggle(this.value == '1');

		if ($('#cpConfirmacao').val() == '2') {
			Compartilhados.LimparCampos(['limparCampoGrauSatisfacao', 'limparCampoObservacao']);
		};
	});

	$("#cpGrauSatisfacao").change(function () {
		//	$('#divSatisfacao').toggle(this.value == '1');
		$('#divJustificativaSatisfacao').toggle((this.value == '3') || (this.value == '4'));

		if ($('#cpConfirmacao').val() == '2') {
			Compartilhados.LimparCampos(['limparCampoGrauSatisfacao', 'limparCampoObservacao']);
		};
	});


	/**
 * TRIGGUER ZOOM
 */
	$(document).on('ZoomObraSecao', function (ev, retorno) {

		if (sessionStorage.getItem('BuscaSecaoNovoColaborador') == '1') {

			$('#cpSecaoNovoColaborador').val(retorno.SECAO);
			$('#cpInfCodSecao').val(retorno.CODSECAO);
			$('#cpInfCodColigada').val(retorno.CODCOLIGADA);
			$('#cpInfColigada').val(retorno.NOME_EMPRESA);
			$('#cpInfGestor').val(retorno.NOME_GESTOR);
			$('#cpInfGerenteGeral').val(retorno.NOME_GG);
			$('#cpChapaGerenteGeral').val(retorno.CHAPA_GG);
			$('#cpChapaSuperintendente').val(retorno.CHAPA_SUPER);
			$('#cpCodColigada').val(retorno.CODCOLIGADA);
			$('#cpChapaGestor').val(retorno.CHAPA_GESTOR);
			sessionStorage.setItem('buscaColaborador', '1');

			VIEW.getInstance().getTemObra417();
		}
		else if (sessionStorage.getItem('SecaoObraResponsavel') == '1') {
			$("#cpSecaoResponsavel").val(retorno.SECAO);
			$("#cpSec").val(retorno.CODSECAO);
			$("#cpColg").val(retorno.CODCOLIGADA);
			sessionStorage.setItem('BuscaResponsavel', '1');
		};

		sessionStorage.setItem('BuscaSecaoNovoColaborador', '');
		sessionStorage.setItem('SecaoObraResponsavel', '');

		ZOOM.getInstance().GetColaboradorAdmitido(retorno.CODSECAO, retorno.CODCOLIGADA);

	});

	$(document).on('ZoomColaboradorSelecionado', function (ev, retorno) {
		if (sessionStorage.getItem('buscaColaborador') == '1') {
			$('#cpNomeNovoColaborador').val(retorno.NOME);
			$('#cpChapaNovoColaborador').val(retorno.CHAPA);
			$('#cpInfFuncao').val(retorno.FUNCAO);
			$('#cpDtAdmissaoNovoColaborador').val(retorno.DATAADMISSAO);
			$("#cpGestor").val(retorno.CHAPA_DIRETOR);

			sessionStorage.setItem('buscaColaborador', '');

		}
		else if (sessionStorage.getItem('BuscaResponsavel') == '1') {
			$("#cpResponsavel").val(retorno.NOME);
			$("#cpChapaGestor2").val(retorno.CHAPA);
			sessionStorage.setItem('BuscaResponsavel', '');

		};
	});

});

var VIEW = (function () {
	var instance;

	function init() {

		var inicializar = function (currentState, modoExibicao) {

			if (modoExibicao == 'MOD' || modoExibicao == 'ADD') {
				VIEW.getInstance().carregarInterfaceEmModificacao(currentState);
			}
			else {
				VIEW.getInstance().carregarInterfaceEmVisualizacao(currentState);
			}

		};

		var carregarInterfaceEmModificacao = function (currentState) {

			setStatusElementos(currentState);
			Compartilhados.enabledButtonZoom(['#buscaSecaoResponsavel', '#buscaResponsavel'], ['13']);
			Compartilhados.enabledButtonZoom(['#btBuscaSecaoNovoColaborador', '#btBuscaNovoColaboradorN'], ['0', '1']);
			VIEW.getInstance().setGestor_Superintendente(currentState);
			VIEW.getInstance().getTemObra417();
			$('#cpIsAberturaAutomatica').val() == 'true' ? VIEW.getInstance().setDadosAberturaAutomatica(currentState) : '';
		}

		var carregarInterfaceEmVisualizacao = function (currentState) {
			setStatusElementos(currentState);
			$('#cpIsAberturaAutomatica').val() == 'true' ? VIEW.getInstance().setDadosAberturaAutomatica(currentState) : '';
		}


		var setStatusElementos = function (currentState) {

			var isColaboradorLotadoSede = $('#cpNaSede').val() == '1';
			var isAcessoUau = $('#cpNecessidadeUAU').val() == '1';
			var isAcessoRm = $('#cpNecessidadeRM').val() == '1';
			var isAcessoPasta = $('#cpNecessidadePastas').val() == '1';

			if (currentState == 3) {
				$("#cpNotebook").prop('disabled', !isColaboradorLotadoSede);
				$(".acessoUau").prop('disabled', !isAcessoUau);
				$(".acessoRm").prop('disabled', !isAcessoRm);
				$(".acessoPastaRede").prop('disabled', !isAcessoPasta);
			}

			$('#blockNotebook2').toggle($('#cpNaSede2').val() == '1');
			$('#divcpGrupoUAU2').toggle($('#cpNecessidadeUAU2').val() == '1');
			$('#blockUAU2').toggle($('#cpNecessidadeUAU2').val() == '1');
			$('#blockObsUAU2').toggle($('#cpNecessidadeUAU2').val() == '1');
			$('#divColigadaRM2').toggle($('#cpNecessidadeRM2').val() == '1');
			$('#divObsRM2').toggle($('#cpNecessidadeRM2').val() == '1');
			$('#divPerfilLabore2').toggle($('#cpNecessidadeRM2').val() == '1');
			$('#divPerfilChronus2').toggle($('#cpNecessidadeRM2').val() == '1');
			$('#divPerfilVitae2').toggle($('#cpNecessidadeRM2').val() == '1');
			$('#divTipoPermissaoPastas2').toggle($('#cpNecessidadePastas2').val() == '1');
			$('#divObsPastas2').toggle($('#cpNecessidadePastas2').val() == '1');
			$('#blockResponsavel').toggle($('#cpAprovacaoCriacao').val() == '3');
			$('#divSatisfacao').toggle($('#cpConfirmacao').val() == '1');
			$('#divJustificativaSatisfacao').toggle(($('#cpGrauSatisfacao').val() == '3') || $('#cpGrauSatisfacao').val() == '4');
			$('#cpSenhaNovoUsuario').val('dire@123');

		};

		var getTemObra417 = function () {
			if ($('#cpSecaoNovoColaborador').val().indexOf('OBRA 417') != -1) {
				$('#cpAuxRegraSolicAcesso').val('StartWithObra');
			} else {
				$('#cpAuxRegraSolicAcesso').val('NotStartWithObra');
			};
		};

		var setGestor_Superintendente = (currentState) => {
			if (currentState == '143') {
				let codColigada = $('#cpCodColigada').val();
				let codSecao = $('#cpCodSecao').val() == '' ? $('#cpInfCodSecao').val() : $('#cpCodSecao').val();
				let dados = Model.get_DS1000('SP_FLUIG_1024', '').values;
				dados = dados.find(element => {
					return (element.CODCOLIGADA == codColigada && element.CODSECAO == codSecao);
				});
				$('#cpChapaGerenteGeral').val(dados.CHAPA_GG);
				$('#cpChapaSuperintendente').val(dados.CHAPA_SUPER);
			}
		}

		var setDadosAberturaAutomatica = (currentState) => {
			if ($('#cpIsAberturaAutomatica').val() == 'true') {
				$('#cpSolicitanteFuncao').parent().hide();
				$('#cpSolicitanteEmpresa').parent().hide();
				$('#cpSolicitanteObraDep').parent().hide();
				$('#cpSolicitanteEstado').parent().hide();
				$('#cpSolicitanteEmail').parent().hide();
				$('#cpSolicitanteNome').val('ABERTURA AUTOMÁTICA');
				VIEW.getInstance().dadosComplementares(currentState, $('#cpChapaNovoColaborador').val(), $('#cpInfCodColigada').val(), $('#cpInfCodSecao').val());
			}
		}

		var dadosComplementares = (currentState, chapa, codColigada, codSecao) => {
			var dados = Model.get_DS1000("SP_FLUIG_1005", `'${chapa}','${codColigada}'`).values[0];
			$('#cpInfColigada').val(dados.EMPRESA);
			$('#cpInfGestor').val(dados.NOME_GESTOR);
			$('#cpInfGerenteGeral').val(dados.NOME_GG);
			$('#cpChapaGerenteGeral').val(dados.CHAPA_GG);
			$('#cpChapaSuperintendente').val(dados.CHAPA_SUP);

			if (currentState == 143) {
				VIEW.getInstance().isObra417();

				var data = Model.get_DS1000('SP_FLUIG_1004', '').values;

				var dadosSecao = data.find(function (e) {
					return (e.CODSECAO == codSecao && e.CODCOLIGADA == codColigada);
				});

				$('#cpChapaGestor').val(dadosSecao.CHAPA_GESTOR);

			}
		}

		var isObra417 = () => {
			var obra = $("#cpAuxRegraSolicAcesso").val();
			if (obra == 'StartWithObra') {
				$('#cpChapaGestor2').val($('#cpChapaGestor').val());
			} else if (obra == 'NotStartWithObra') {
				$('#cpChapaGestor2').val('Pool:Role:DRH.0014');
			}
		};

		var revelarSenha = () => {
			var x = document.getElementsByClassName("senha")[0];
			if (x.type === "password") {
				x.type = "text";
			} else {
				x.type = "password";
			}
		}

		return {
			inicializar: inicializar,
			getTemObra417: getTemObra417,
			setStatusElementos: setStatusElementos,
			carregarInterfaceEmModificacao: carregarInterfaceEmModificacao,
			carregarInterfaceEmVisualizacao: carregarInterfaceEmVisualizacao,
			setGestor_Superintendente: setGestor_Superintendente,
			setDadosAberturaAutomatica: setDadosAberturaAutomatica,
			dadosComplementares: dadosComplementares,
			isObra417: isObra417,
			revelarSenha: revelarSenha
		}
	}

	return {
		getInstance: function () {
			if (!instance) {
				instance = init();
			}
			return instance;
		}
	}

})();