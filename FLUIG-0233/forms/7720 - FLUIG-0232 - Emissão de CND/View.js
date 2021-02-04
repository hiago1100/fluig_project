$(document).ready(function () {
	var currentState = Compartilhados.getCurrentState();

	VIEW.getInstance().Inicializar(currentState);

	//Função CLICK
	$("#btObra").click(function () {
		ZOOM.getInstance().GetTodosCentroCusto();

	});

	$(".SolicitaValidacaoObra").click(function () {
		var checkboxes = ['chResUnifamiliar', 'chResMultifamiliar', 'chResHotelfamiliar', 'chAreaUnifamiliar', 'chAndaresUnifamiliar',
			'chSalasfamiliar', 'chGalpaofamiliar', 'chCasaUnifamiliar', 'chConjuntoUnifamiliar']
		VIEW.getInstance().VerificarCheckbox('SolicitaValidacaoObra', checkboxes);
		VIEW.getInstance().LiberarCamposTabela(checkboxes);

	});

	$(".SolicitaValidacaoDemol").click(function () {
		var checkboxes = ['chDemolResUnifamiliar', 'chDemolResMultifamiliar', 'chDemolResHotelfamiliar', 'chDemolAreaUnifamiliar',
			'chDemolAndaresUnifamiliar', 'chDemolSalasfamiliar', 'chDemolGalpaofamiliar', 'chDemolCasaUnifamiliar', 'chDemolConjuntoUnifamiliar']
		VIEW.getInstance().VerificarCheckbox('SolicitaValidacaoDemol', checkboxes);
		VIEW.getInstance().LiberarCamposTabela(checkboxes);

	});

	//Função CHANGE
	$("#cpAditivoInfo").change(function () {

		$("#divQuantosInfo").toggle($("#cpAditivoInfo").val() == '1');
	});

	$("#cpTpCNDInfo").change(function () {

		$("#divTbObraDemolicao").toggle($("#cpTpCNDInfo").val() == '1');
	});

	$("#cpAprovarConfirmacao").change(function () {

		$("#divAvaliacaoAtendimento").toggle($("#cpAprovarConfirmacao").val() == '1');
	});

	$("#cpSatisfacaoSolicitante").change(function () {
		var $cpSatisfacaoSolicitante = $("#cpSatisfacaoSolicitante").val();
		$("#divObservacoesJustificativa").toggle($cpSatisfacaoSolicitante == '3' || $cpSatisfacaoSolicitante == '4');
	});

	//Função BLUR
	$("#TbObraInformacao").find('input').blur(function () {
		var classes = ['chResUnifamiliar', 'chResMultifamiliar', 'chResHotelfamiliar', 'chAreaUnifamiliar',
			'chAndaresUnifamiliar', 'chSalasfamiliar', 'chGalpaofamiliar', 'chCasaUnifamiliar', 'chConjuntoUnifamiliar']

		VIEW.getInstance().ValidarCamposTabela(classes)
	});

	$("#TbObraDemolicao").find('input').blur(function () {
		var classes = ['chDemolResUnifamiliar', 'chDemolResMultifamiliar', 'chDemolResHotelfamiliar', 'chDemolAreaUnifamiliar',
			'chDemolAndaresUnifamiliar', 'chDemolSalasfamiliar', 'chDemolGalpaofamiliar', 'chDemolCasaUnifamiliar',
			'chDemolConjuntoUnifamiliar']

		VIEW.getInstance().ValidarCamposTabela(classes)
	});

	$('#cpDataAgendamento').blur(function () {

		var dataAgendamento = $('#cpDataAgendamento').val();
		
		dataSplit = dataAgendamento.split('/');

		var posData = new Date("'" + dataSplit[1] + "/" + dataSplit[0] + "/" + dataSplit[2] + " 18:00:00  GMT-0300'"); //Horário Oficial de Brasília

		posData.setDate(posData.getDate() + 1);

		$("#cpDataEmissaoCND").val(Date.parse(posData));

	});

	/*
	TRIGGUER ZOOM
	*/
	$(document).on('ZoomSecaoSelecionada', function (ev, retorno) {
		window.loadingLayer.show();

		setTimeout(function () {

			$('#cpObra').val(retorno.SECAO);
			VIEW.getInstance().PreencherDescritor();
			window.loadingLayer.hide();
		}, 100);
	});
});

var VIEW = (function () {
	var instance;

	function init() {

		function Inicializar(currentState) {

			SetStatusElement(currentState);

			FLUIGC.calendar('#cpDtAlvara', { pickDate: true, pickTime: false });
			FLUIGC.calendar('#cpDtVistoria', { pickDate: true, pickTime: false });
			FLUIGC.calendar('#cpDtInicio', { pickDate: true, pickTime: false });
			FLUIGC.calendar('#cpDtTermino', { pickDate: true, pickTime: false });
			FLUIGC.calendar('#cpDataInfo', { pickDate: true, pickTime: false });
			FLUIGC.calendar('#cpDataAgendamento', { pickDate: true, pickTime: false });
			FLUIGC.calendar('#cpHoraAgendamento', { pickDate: false, pickTime: true });
			FLUIGC.calendar('#cpDataRecebimento', { pickDate: true, pickTime: false });

			Compartilhados.enabledButtonZoom(['#btObra'], ['0', '1', '2', '12']);

			if (currentState == '18') {
				$('#cpExecutorAtividade6').val(FLUIGC.sessionStorage.getItem('userInformation').values[0].NOME);
				$('#cpChapaExecutorAtividade6').val(FLUIGC.sessionStorage.getItem('userInformation').values[0].CHAPA);

				var dados = Model.get_DS1000('SP_FLUIG_1024', '')

				dados.values.array.forEach(dado => {
					if (dado.CODSECAO == '01.1.00001.42.006') {//SEÇÃO - DCSC - INSUMOS DE FOLHA BENEFICIOS
						var dadosGestor = Model.get_DS1000('SP_FLUIG_1005', `'${dado.CHAPA_GG}', '${dado.CODCOLIGADA}'`)
						$('#cpEmailGestor').val(dadosGestor.values[0].EMAIL);
					}
				});
			}
		};

		var PreencherDescritor = function () {

			var $obraDepartamento = $("#cpObra").val();
			var $SolicitanteNome = $("#cpSolicitanteNome").val();

			$('#cpDescritor').val($obraDepartamento + ' | ' + $SolicitanteNome);
		}

		var SetStatusElement = function (currentState) {
			$("#divReaberturaIncorporacao").toggle(currentState == '2');
			$("#divReaberturaJuridico").toggle(currentState == '12');
			$("#divTbObraDemolicao").toggle($("#cpTpCNDInfo").val() == '1');
			$("#divTbInfoAreaObra").toggle($("#cpTpCNDInfo").val() == '1');			
		}

		var VerificarCheckbox = function (classe, checkboxes) {
			var campo;
			if (classe == 'SolicitaValidacaoObra') {
				campo = 'Obra'
			} else {
				campo = 'Demol'
			}
			checkboxes.some(checkbox => {
				if ($(`input[id='${checkbox}']:checked`).val() == 'on') {
					$(`#cpValidaCheck${campo}`).val('1');
					return true
				} else {
					$(`#cpValidaCheck${campo}`).val('0');
				}
				return
			});
		}
		var LiberarCamposTabela = function (checkboxes) {
			checkboxes.some(checkbox => {
				if ($(`input[id='${checkbox}']:checked`).val() == 'on') {
					$(`.${checkbox}`).prop('readonly', false)

				} else {
					$(`.${checkbox}`).prop('readonly', true)
					Compartilhados.LimparCampos([checkbox]);
				}
				return
			});
		}

		var ValidarCamposTabela = function (classes) {

			classes.forEach(classe => {
				var inputs = new Array()
				$(`.${classe}`).each(function () {
					inputs.push($(this).val())
				})

				inputs.some((input) => {
					if (input != '') {
						$(`#hdd${classe}`).val('1');
						return true
					} else {
						$(`#hdd${classe}`).val('0');
					}
				})
			});
		}

		return {
			Inicializar,
			PreencherDescritor,
			VerificarCheckbox,
			LiberarCamposTabela,
			ValidarCamposTabela
		};
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