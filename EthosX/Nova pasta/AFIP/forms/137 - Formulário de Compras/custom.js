$(document).ready(function () {
	binds.init();
	compras.init();
	pre_aprovador.init();
	financeiro.init();
	classificacao.init();
	montaCalendario();
	ocultarLixeira();
	//MascaraMoeda();
	var data = [];
	var filtros = {
		'name': 'ds_pre_aprovadores',
		'fields': [],
		'constraints': []
	};


	$('#diretorFinanceiro').on('change', function () {

		$('#diretor').val($('#diretorFinanceiro').val());
	})

	setTimeout(function () { AlterarDescricaoCentroCusto(); }, 500)
});

var binds = (function () {

	var _init = function () {

		$("#duvidaVerificador").hide();
		$("#respostaVerificador").hide();
		$("#motivo").hide();
		$("#justificativa").hide();

		if ($("#numAtividade").val() == "114") {

			$("#duvidaVerificador").show();
			$("#respostaVerificador").show();
			$("#motivo").hide();
			$("#justificativa").hide();

		}

		if ($("#numAtividade").val() == "17") {

			$("#duvidaVerificador").hide();
			$("#respostaVerificador").hide();
			$("#motivo").show();
			$("#justificativa").show();

		}

		if ($("#numAtividade").val() == "24") {
			setTimeout(function () {
				if ($('#_RespostaPreAprovadorS').text() != "") {
					$($("[name^='txtAprovacaoPreAProvador']")[2]).attr('checked', true)
					$('#txtAprovacaoPreAProvador').parent().parent().parent().show()
					$("#DuvidaPreAprovador_Solicitante").show();
					$("#DuvidaPreAprovador_Comprador").hide();
					$("#Reprova_PreAprovador").hide();
					$("#Aprova_PreAprovador").hide();

					// $("#DuvidaPreAprovadorS").val("");
					$("#RespostaPreAprovadorS").val();
					$("#mensagemAprovarSolicitacao").hide();
				}
				if ($('#_RespostaPreAprovadorC').text() != "") {
					$($("[name^='txtAprovacaoPreAProvador']")[3]).attr('checked', true)
					$('#txtAprovacaoPreAProvador').parent().parent().parent().show()
					$("#DuvidaPreAprovador_Solicitante").hide();
					$("#DuvidaPreAprovador_Comprador").show();
					$("#Reprova_PreAprovador").hide();
					$("#Aprova_PreAprovador").hide();

					// $("#DuvidaPreAprovadorC").val("");
					$("#RespostaPreAprovadorC").val();
					$("#mensagemAprovarSolicitacao").hide();
				}
			}, 500)

			$('#txtAprovacaoPreAProvador').parent().parent().parent().hide()
			$('#undNegocio').change(function () {
				$("[name=txtAprovacaoPreAProvador]").attr('checked', false)
				if ($('#undNegocio').val() == "") {
					$('#txtObsPreAProvadorAprov').parent().hide();
					$('#diretor').parent().parent().hide();
					$('#mensagemAprovarSolicitacao').hide();
					$('#instrucao04').hide();
					$('#_RespostaPreAprovadorS').parent().parent().hide();
					$('#DuvidaPreAprovadorS').parent().parent().hide();
					$('#DuvidaPreAprovadorC').parent().parent().hide();
					$('#txtMotivoPreAProvador').parent().parent().parent().hide();
					$('#txtObsPreAProvador').parent().parent().parent().hide();
				}
				if ($('#undNegocio').val() != "") {
					$('#txtAprovacaoPreAProvador').parent().parent().parent().show()
				} else {
					$('#txtAprovacaoPreAProvador').parent().parent().parent().hide()
				}

			})
			$("[name=txtAprovacaoPreAProvador]").on('change', function () {
				if ($(this).val() == "Sim") {
					$("#DuvidaPreAprovador_Solicitante").hide();
					$("#DuvidaPreAprovador_Comprador").hide();
					$("#Reprova_PreAprovador").hide();
					$("#Aprova_PreAprovador").show();
					$('#diretor').parent().parent().show();
					$('#txtObsPreAProvadorAprov').parent().show();
					$("#mensagemAprovarSolicitacao").show();

				} else if ($(this).val() == "Nao") {
					$("#DuvidaPreAprovador_Solicitante").hide();
					$("#DuvidaPreAprovador_Comprador").hide();
					$("#Reprova_PreAprovador").show();
					$("#Aprova_PreAprovador").hide();

					$("#mensagemAprovarSolicitacao").hide();

				} else if ($(this).val() == "Duvida_Solicitante") {
					$("#DuvidaPreAprovador_Solicitante").show();
					$("#DuvidaPreAprovador_Comprador").hide();
					$("#Reprova_PreAprovador").hide();
					$("#Aprova_PreAprovador").hide();

					// $("#DuvidaPreAprovadorS").val("");
					$("#RespostaPreAprovadorS").val();
					$("#mensagemAprovarSolicitacao").hide();

				} else if ($(this).val() == "Duvida_Comprador") {

					$("#DuvidaPreAprovador_Solicitante").hide();
					$("#DuvidaPreAprovador_Comprador").show();
					$("#Reprova_PreAprovador").hide();
					$("#Aprova_PreAprovador").hide();

					// $("#DuvidaPreAprovadorC").val("");
					$("#RespostaPreAprovadorC").val();
					$("#mensagemAprovarSolicitacao").hide();
				} else if ($(this).val() == "") {

					$("#DuvidaPreAprovador_Solicitante").hide();
					$("#DuvidaPreAprovador_Comprador").hide();
					$("#Reprova_PreAprovador").hide();
					$("#Aprova_PreAprovador").hide();

					// $("#DuvidaPreAprovadorC").val("");
					// $("#RespostaPreAprovadorC").val("");
					$("#mensagemAprovarSolicitacao").hide();
					('#DuvidaPreAprovadorC').parent().parent().show();
					$('#_RespostaPreAprovadorC').parent().parent().show();
				}
			});
			// $("[name=txtAprovacaoPreAProvador]").change(function(){
			// 	if($('#undNegocio').val() == "AFIP" && $($("[name=txtAprovacaoPreAProvador]")[0]).is(':checked') == true) {
			// 		$('#diretor').parent().parent().show();
			// 		$('#txtAprovacaoPreAProvador').parent().parent().parent().show()
			// 		$('#txtObsPreAProvadorAprov').parent().parent().show();
			// 	}	
			// 	if($('#undNegocio').val() == "AFIP" && $($("[name=txtAprovacaoPreAProvador]")[1]).is(':checked') == true) {
			// 		$('#txtMotivoPreAProvador').parent().parent().parent().show();
			// 		$('#txtObsPreAProvador').parent().parent().parent().show();
			// 	}
			// 	if($('#undNegocio').val() == "AFIP" && $($("[name=txtAprovacaoPreAProvador]")[2]).is(':checked') == true) {
			// 		$('#DuvidaPreAprovadorS').parent().parent().show();
			// 		$('#_RespostaPreAprovadorS').parent().parent().show();
			// 	}
			// 	if($('#undNegocio').val() == "AFIP" && $($("[name=txtAprovacaoPreAProvador]")[3]).is(':checked') == true) {
			// 		$('#DuvidaPreAprovadorC').parent().parent().hide();
			// 		$('#_RespostaPreAprovadorC').parent().parent().hide();
			// 	}
			// }) 
		}

		$("[name=txtAprovaRequisicao]").on('click', function () {
			if ($(this).val() == "Sim") {
				$("#duvidaVerificador").hide();
				$("#respostaVerificador").hide();
				$("#motivo").hide();
				$("#justificativa").hide();

			} else if ($(this).val() == "Nao") {
				$("#duvidaVerificador").hide();
				$("#respostaVerificador").hide();
				$("#motivo").show();
				$("#justificativa").show();

			} else if ($(this).val() == "Duvida") {

				$("#duvidaVerificador").show();
				$("#respostaVerificador").show();
				$("#motivo").hide();
				$("#justificativa").hide();

				$("#txtDuvidaVerificador").val("");
				$("#txtRespostaDuvidaVerificador").val("");
			}
		});
	};

	return {
		init: _init
	}
})();

var compras = (function () {

	var _compras = function () {

		$("#justificativaCompras").hide();

		if (!document.getElementById('txtAprovaRequisicaoCompras1').checked)
			$("#Baixa_Manual").hide();
		$("#DuvidaCompras").hide();
		$("#cotacao").hide();

		if ($("#numAtividade").val() == "69") {

			$("#justificativaCompras").hide();
			if (!document.getElementById('txtAprovaRequisicaoCompras1').checked)
				$("#Baixa_Manual").hide();
			$("#DuvidaCompras").show();
			$("#cotacao").hide();

		}

		if ($("#numAtividade").val() == "24"
			|| $("#numAtividade").val() == "32"
			|| $("#numAtividade").val() == "72"
			|| $("#numAtividade").val() == "30"
			|| $("#numAtividade").val() == "35"
			|| $("#numAtividade").val() == "61"
			|| $("#numAtividade").val() == "41"
			|| $("#numAtividade").val() == "124"
			|| $("#numAtividade").val() == "95"
			|| $("#numAtividade").val() == "39") {

			$("#justificativaCompras").hide();

			if (!document.getElementById('txtAprovaRequisicaoCompras1').checked)
				$("#Baixa_Manual").show();
			$("#DuvidaCompras").hide();
			$("#cotacao").show();

		}

		if ($("#numAtividade").val() == "19") {

			$("#checkAprovacaoFornecedor").hide();


			$('input[name="txtAprovaRequisicaoCompras"]').change(function () {
				var resultado = $('input[name="txtAprovaRequisicaoCompras"]:checked').val();

				if (resultado == "Nao" || resultado == "Baixa_Manual" || "Duvida") {
					$('#cotacao').show()
					$('#tableFornecedor').hide()
					$('#divAdicionarFornecedor').hide()
				}
				if (resultado == "Sim") {
					$('#tableFornecedor').show()
					$('#divAdicionarFornecedor').show()
				}
			})

		}
		if ($("#numAtividade").val() == "124") {
			var unidadeNegocio = $('#undNegocio').val()

			if (unidadeNegocio != "AFIP") {
				$('#panelFinanceiro').show();
			} else {
				$('#panelFinanceiro').hide();
			}
			$('.fluigicon-trash').hide();
			$('#instrucao04').hide();
			$('#txtAprovacaoFinanceiro').change(function () {
				if ($('#txtAprovacaoFinanceiro').val() == "Sim") {
					$("#mensagemAprovarSolicitacao").hide()
				}
			})
		}

		// if ($('#numAtividade').val() == "124") {
		// 		$('#Aprova_PreAprovador').show();
		// 		$("#txtObsPreAProvador").parent().parent().hide();
		// 		$("#txtMotivoPreAProvador").parent().parent().hide();
		// 		$("#RespostaPreAprovadorC").parent().parent().hide();
		// 		$("#RespostaPreAprovadorS").parent().parent().hide();

		// }


		// 	$('#undNegocio').change(function () {
		// 		if ($('#undNegocio').val() == "CAC") {
		// 			$("[name=txtAprovacaoPreAProvador]").attr('checked', true)
		// 			$('#diretor').val('')
		// 			$('#txtObsPreAProvadorAprov').val('')
		// 			$('#txtMotivoPreAProvador').val('')
		// 			$('#txtObsPreAProvador').val('')
		// 			$('#DuvidaPreAprovadorS').val('')
		// 			$('#DuvidaPreAprovadorC').val('')

		// 			$("#DuvidaPreAprovador_Solicitante").hide();
		// 			$("#DuvidaPreAprovador_Comprador").hide();
		// 			$("#Reprova_PreAprovador").hide();
		// 			$("#Aprova_PreAprovador").hide();

		// 			$("#mensagemAprovarSolicitacao").hide();

		// 			$('#txtAprovacaoPreAProvador').parent().parent().parent().hide()
		// 			$('#mensagemAprovarSolicitacao').hide()
		// 		}
		// 		if ($('#undNegocio').val() == "CEACNORTE") {
		// 			$("[name=txtAprovacaoPreAProvador]").attr('checked', true)
		// 			$('#diretor').val('')
		// 			$('#txtObsPreAProvadorAprov').val('')
		// 			$('#txtMotivoPreAProvador').val('')
		// 			$('#txtObsPreAProvador').val('')
		// 			$('#DuvidaPreAprovadorS').val('')
		// 			$('#DuvidaPreAprovadorC').val('')

		// 			$("#DuvidaPreAprovador_Solicitante").hide();
		// 			$("#DuvidaPreAprovador_Comprador").hide();
		// 			$("#Reprova_PreAprovador").hide();
		// 			$("#Aprova_PreAprovador").hide();

		// 			$("#mensagemAprovarSolicitacao").hide();

		// 			$('#txtAprovacaoPreAProvador').parent().parent().parent().hide()
		// 			$('#mensagemAprovarSolicitacao').hide()
		// 		}
		// 		if ($('#undNegocio').val() == "CEACSUL") {
		// 			$("[name=txtAprovacaoPreAProvador]").attr('checked', true)
		// 			$('#diretor').val('')
		// 			$('#txtObsPreAProvadorAprov').val('')
		// 			$('#txtMotivoPreAProvador').val('')
		// 			$('#txtObsPreAProvador').val('')
		// 			$('#DuvidaPreAprovadorS').val('')
		// 			$('#DuvidaPreAprovadorC').val('')

		// 			$("#DuvidaPreAprovador_Solicitante").hide();
		// 			$("#DuvidaPreAprovador_Comprador").hide();
		// 			$("#Reprova_PreAprovador").hide();
		// 			$("#Aprova_PreAprovador").hide();

		// 			$("#mensagemAprovarSolicitacao").hide();

		// 			$('#txtAprovacaoPreAProvador').parent().parent().parent().hide()
		// 			$('#mensagemAprovarSolicitacao').hide()
		// 		}
		// 		if ($('#undNegocio').val() == "AFIP") {
		// 			$('#txtAprovacaoPreAProvador').parent().parent().parent().show()
		// 		}
		// 	});
		// }

		if ($('#numAtividade').val() == "72") {
			setTimeout(function () {
				if ($('#undNegocio').val() == "CAC" || $('#undNegocio').val() == "CEACNORTE") {
					// $('#_DuvidaPreAprovadorS').parent().hide()
					// $('#RespostaPreAprovadorS').parent().hide()
					$('#_txtAprovacaoPreAProvador').parent().parent().parent().hide()
					$('#instrucao04').hide()
				}
				else {
					// $('#_DuvidaFinanceiroS').parent().hide()
					// $('#RespostaFinanceiroS').parent().hide()
					$('#_txtAprovacaoFinanceiro').parent().parent().parent().hide()
					$('#instrucao04').hide()
				}
			}, 1000);
		}

		if ($('#numAtividade').val() == "32") {
			setTimeout(function () {
				if ($('#undNegocio').val() == "AFIP") {
					$('#panelFinanceiro').hide()
				}
				if ($('#undNegocio').val() == "CAC" || $('#undNegocio').val() == "CEACNORTE") {
					// $('#_DuvidaPreAprovadorC').parent().hide()
					// $('#RespostaPreAprovadorC').parent().hide()
					$('#_txtAprovacaoPreAProvador').parent().parent().parent().hide()
					$('#instrucao04').hide()
				} else {
					// $('#_DuvidaFinanceiroC').parent().hide()
					// $('#RespostaFinanceiroC').parent().hide()
					$('#_txtAprovacaoFinanceiro').parent().parent().parent().hide()
					$('#instrucao04').hide()
				}


			}, 1000);
		}

		if ($('#undNegocio').val() == "CAC" || $('#undNegocio').val() == "CEACNORTE" || $('#undNegocio').val() == "CEACSUL") {
			$("#_txtAprovacaoPreAProvador").parent().parent().parent().hide()
		}

		$("[name=txtAprovaRequisicaoCompras]").on('click', function () {
			if ($(this).val() == "Sim") {
				$("#justificativaCompras").hide();
				$("#Baixa_Manual").show();
				$("#DuvidaCompras").hide();
				$("#cotacao").show();

			} else if ($(this).val() == "Nao") {
				$("#justificativaCompras").show();
				$("#Baixa_Manual").hide();
				$("#DuvidaCompras").hide();
				$("#cotacao").hide();


			} else if ($(this).val() == "Baixa_Manual") {
				$("#justificativaCompras").hide();
				$("#Baixa_Manual").show();
				$("#DuvidaCompras").hide();
				$("#cotacao").hide();

			} else if ($(this).val() == "Duvida") {

				$("#justificativaCompras").hide();
				$("#Baixa_Manual").hide();
				$("#DuvidaCompras").show();
				$("#cotacao").hide();

				$("#txtDuvidaCompras").val("");
				$("#txtRespostaCompras").val("");
			}
		});
	};

	return {
		init: _compras
	}
})();

var pre_aprovador = (function () {

	var _pre_aprovador = function () {

		$("#DuvidaPreAprovador_Solicitante").hide();
		$("#DuvidaPreAprovador_Comprador").hide();
		$("#Reprova_PreAprovador").hide();
		$("#Aprova_PreAprovador").hide();


		if ($("#numAtividade").val() == "30") {

			$("#DuvidaPreAprovador_Solicitante").hide();
			$("#DuvidaPreAprovador_Comprador").hide();
			$("#Reprova_PreAprovador").show();
			$("#Aprova_PreAprovador").hide();

		}

		if ($("#numAtividade").val() == "32") {

			$("#DuvidaPreAprovador_Solicitante").hide();
			$("#DuvidaPreAprovador_Comprador").show();
			$("#Reprova_PreAprovador").hide();
			$("#Aprova_PreAprovador").hide();

		}

		if ($("#numAtividade").val() == "35") {



			setTimeout(function () {
				if ($('#undNegocio').val() == "CEACNORTE") {

					$("#_diretor").siblings().show();
					$("#_txtObsPreAProvadorAprov").parent().show();
					$('#_txtAprovacaoPreAProvador').parent().parent().parent().show()
					$($("[name^='_txtAprovacaoPreAProvador']")[0]).attr('checked', true)
				}
				if ($('#undNegocio').val() == "CEACSUL") {

					$("#_diretor").siblings().show();
					$("#_txtObsPreAProvadorAprov").parent().show();
					$('#_txtAprovacaoPreAProvador').parent().parent().parent().show()
					$($("[name^='_txtAprovacaoPreAProvador']")[0]).attr('checked', true)
				}
				if ($('#undNegocio').val() == "CAC") {

					$("#_diretor").siblings().show();
					$("#_txtObsPreAProvadorAprov").parent().show();
					$('#_txtAprovacaoPreAProvador').parent().parent().parent().show()
					$($("[name^='_txtAprovacaoPreAProvador']")[0]).attr('checked', true)
				}
			}, 1000);
			$("#DuvidaPreAprovador_Solicitante").hide();
			$("#DuvidaPreAprovador_Comprador").hide();
			$("#Reprova_PreAprovador").hide();
			$("#Aprova_PreAprovador").show();
			$("#instrucao04").hide();

		}
		if ($('#numAtividade').val() == 61) {
			setTimeout(function () {
				if ($('#undNegocio').val() == "AFIP") {
					$('#panelFinanceiro').hide()
				}
			}, 1000);
		}

		if ($("#numAtividade").val() == "41") {

			setTimeout(function () {
				if ($('#undNegocio').val() == "CEACNORTE") {

					$("#_diretor").siblings().show();
					$("#_txtObsPreAProvadorAprov").parent().show();
				}
				if ($('#undNegocio').val() == "CEACSUL") {

					$("#_diretor").siblings().show();
					$("#_txtObsPreAProvadorAprov").parent().show();
				}
				if ($('#undNegocio').val() == "CAC") {

					$("#_diretor").siblings().show();
					$("#_txtObsPreAProvadorAprov").parent().show();
				}
			}, 1000);

			setTimeout(function () {
				if ($('#undNegocio').val() == "AFIP") {
					$('#panelFinanceiro').hide()
				}
			}, 1000);
			$("#DuvidaPreAprovador_Solicitante").hide();
			$("#DuvidaPreAprovador_Comprador").hide();
			$("#Reprova_PreAprovador").hide();
			$("#Aprova_PreAprovador").show();

			var indx = $("[name^='txtAprovacaoPreAProvador']")
			for (let i = 0; i < indx.length; i++) {

				var radio = $($("[name^='txtAprovacaoPreAProvador']")[i]).is(':checked')
				if (radio != true) {
					$($("[name^='txtAprovacaoPreAProvador']")[i]).prop('disabled', true)
				}

			}

		}

		if ($("#numAtividade").val() == "72") {
			setTimeout(function () {
				if ($('#undNegocio').val() == "AFIP") {
					$('#panelFinanceiro').hide()
				}

				var ativAnterior = $('#ativAtual').val()
				if (ativAnterior == 24) {
					$('#panelFinanceiro').hide();
				}
				if (ativAnterior == 124) {
					$('#panelPreAprovador').hide();
				}
			}, 1000);
			$("#DuvidaPreAprovador_Solicitante").show();
			$("#DuvidaPreAprovador_Comprador").hide();
			$("#Reprova_PreAprovador").hide();
			$("#Aprova_PreAprovador").hide();

		}

		if ($("#numAtividade").val() == "95") {

			setTimeout(function () {
				if ($('#undNegocio').val() == "CEACNORTE") {

					$("#_diretor").siblings().show();
					$("#_txtObsPreAProvadorAprov").parent().show();
				}
				if ($('#undNegocio').val() == "CEACSUL") {

					$("#_diretor").siblings().show();
					$("#_txtObsPreAProvadorAprov").parent().show();
				}
				if ($('#undNegocio').val() == "CAC") {

					$("#_diretor").siblings().show();
					$("#_txtObsPreAProvadorAprov").parent().show();
				}
			}, 1000);

			setTimeout(function () {
				if ($('#undNegocio').val() == "AFIP") {
					$('#panelFinanceiro').hide()
				}
			}, 1000);
			$("#DuvidaPreAprovador_Solicitante").hide();
			$("#DuvidaPreAprovador_Comprador").hide();
			$("#Reprova_PreAprovador").hide();
			$("#Aprova_PreAprovador").show();

			var indx = $("[name^='txtAprovacaoPreAProvador']")
			for (let i = 0; i < indx.length; i++) {

				var radio = $($("[name^='txtAprovacaoPreAProvador']")[i]).is(':checked')
				if (radio != true) {
					$($("[name^='txtAprovacaoPreAProvador']")[i]).prop('disabled', true)
				}

			}

		}

		if ($("#numAtividade").val() == "97") {

			$("#DuvidaPreAprovador_Solicitante").hide();
			$("#DuvidaPreAprovador_Comprador").hide();
			$("#Reprova_PreAprovador").hide();
			$("#Aprova_PreAprovador").show();
			$("#cotacao").show();

		}

		// $("[name=txtAprovacaoPreAProvador]").on('change', function () {
		// 	if ($(this).val() == "Sim") {
		// 		$("#DuvidaPreAprovador_Solicitante").hide();
		// 		$("#DuvidaPreAprovador_Comprador").hide();
		// 		$("#Reprova_PreAprovador").hide();
		// 		$("#Aprova_PreAprovador").show();

		// 		$("#mensagemAprovarSolicitacao").show();

		// 	} else if ($(this).val() == "Nao") {
		// 		$("#DuvidaPreAprovador_Solicitante").hide();
		// 		$("#DuvidaPreAprovador_Comprador").hide();
		// 		$("#Reprova_PreAprovador").show();
		// 		$("#Aprova_PreAprovador").hide();

		// 		$("#mensagemAprovarSolicitacao").hide();

		// 	} else if ($(this).val() == "Duvida_Solicitante") {
		// 		$("#DuvidaPreAprovador_Solicitante").show();
		// 		$("#DuvidaPreAprovador_Comprador").hide();
		// 		$("#Reprova_PreAprovador").hide();
		// 		$("#Aprova_PreAprovador").hide();

		// 		$("#DuvidaPreAprovadorS").val("");
		// 		$("#RespostaPreAprovadorS").val("");
		// 		$("#mensagemAprovarSolicitacao").hide();

		// 	} else if ($(this).val() == "Duvida_Comprador") {

		// 		$("#DuvidaPreAprovador_Solicitante").hide();
		// 		$("#DuvidaPreAprovador_Comprador").show();
		// 		$("#Reprova_PreAprovador").hide();
		// 		$("#Aprova_PreAprovador").hide();

		// 		$("#DuvidaPreAprovadorC").val("");
		// 		$("#RespostaPreAprovadorC").val("");
		// 		$("#mensagemAprovarSolicitacao").hide();
		// 	} else if ($(this).val() == "") {

		// 		$("#DuvidaPreAprovador_Solicitante").hide();
		// 		$("#DuvidaPreAprovador_Comprador").hide();
		// 		$("#Reprova_PreAprovador").hide();
		// 		$("#Aprova_PreAprovador").hide();

		// 		$("#DuvidaPreAprovadorC").val("");
		// 		$("#RespostaPreAprovadorC").val("");
		// 		$("#mensagemAprovarSolicitacao").hide();
		// 	}
		// });

		if ($("#numAtividade").val() == "124") {
			$('#Aprova_PreAprovador').show()
			$('#_txtAprovacaoPreAProvador').parent().parent().parent().show()
			$($("[name^='_txtAprovacaoPreAProvador']")[0]).attr('checked', true)
			$($("[name^='txtAprovacaoPreAProvador']")[0]).attr('checked', true)

			var indx = $("[name^='txtAprovacaoPreAProvador']")
			for (let i = 0; i < indx.length; i++) {

				var radio = $($("[name^='txtAprovacaoPreAProvador']")[i]).is(':checked')
				if (radio != true) {
					$($("[name^='txtAprovacaoPreAProvador']")[i]).prop('disabled', true)
				}

			}
			setTimeout(function () {
				if ($('#_RespostaFinanceiroS').text() != "") {
					$("#DuvidaFinanceiro_Solicitante").show();
					$("#DuvidaFinanceiro_Comprador").hide();
					$("#Reprova_Financeiro").hide();
					$("#Aprova_Financeiro").hide();
				}
				if ($('#_RespostaFinanceiroC').text() != "") {
					$("#DuvidaFinanceiro_Solicitante").hide();
					$("#DuvidaFinanceiro_Comprador").show();
					$("#Reprova_Financeiro").hide();
					$("#Aprova_Financeiro").hide();
				}
			}, 500);
		}
	};

	return {
		init: _pre_aprovador
	}
})();

var financeiro = (function () {

	var _financeiro = function () {

		$("#DuvidaFinanceiro_Solicitante").hide();
		$("#DuvidaFinanceiro_Comprador").hide();
		$("#Reprova_Financeiro").hide();
		$("#Aprova_Financeiro").hide();


		if ($("#numAtividade").val() == "30") {

			$("#DuvidaFinanceiro_Solicitante").hide();
			$("#DuvidaFinanceiro_Comprador").hide();
			$("#Reprova_Financeiro").show();
			$("#Aprova_Financeiro").hide();

		}

		if ($("#numAtividade").val() == "32") {

			$("#DuvidaFinanceiro_Solicitante").hide();
			$("#DuvidaFinanceiro_Comprador").show();
			$("#Reprova_Financeiro").hide();
			$("#Aprova_Financeiro").hide();

			$("#_DuvidaPreAprovadorC").parent().show()
			$("#RespostaPreAprovadorC").parent().show()
			setTimeout(function () {
				var index = $("[name^='txtAprovaRequisicaoCompras']")
				for (let i = 0; i < index.length; i++) {

					var radio = $($("[name^='txtAprovaRequisicaoCompras']")[i]).is(':checked')
					if (radio != true) {

						$($("[name^='txtAprovaRequisicaoCompras']")[i]).prop('disabled', true)
					}

				}
				$($("[name^='txtAprovaRequisicaoCompras']")[0]).prop('checked', true)

				var ativAnterior = $('#ativAtual').val()
				if (ativAnterior == 24) {
					$('#panelFinanceiro').hide();
				}
				if (ativAnterior == 124) {
					$('#panelPreAprovador').hide();
				}
			}, 500)
			var indx = $("[name^='txtAprovacaoPreAProvador']")
			for (let i = 0; i < indx.length; i++) {

				var radio = $($("[name^='txtAprovacaoPreAProvador']")[i]).is(':checked')
				if (radio != true) {
					$($("[name^='txtAprovacaoPreAProvador']")[i]).prop('disabled', true)
				}

			}

		}

		if ($("#numAtividade").val() == "35") {
			setTimeout(function () {
				if ($('#undNegocio').val() == "AFIP") {
					$('#panelFinanceiro').hide()
				}
			}, 1000);
			$("#DuvidaFinanceiro_Solicitante").hide();
			$("#DuvidaFinanceiro_Comprador").hide();
			$("#Reprova_Financeiro").hide();
			$("#Aprova_Financeiro").show();
			$("#instrucao05").hide();
			$($("[name^='_txtAprovaRequisicaoCompras']")[0]).prop('checked', true)

			var index = $("[name^='txtAprovacaoPreAProvador']")
			for (let i = 0; i < index.length; i++) {

				if ($($("[name^='txtAprovacaoPreAProvador']")[i]).is(':checked', true) != "true") {
					$($("[name^='txtAprovacaoPreAProvador']")[i]).prop('disabled', true);
				}

			}
		}

		if ($("#numAtividade").val() == "41") {

			$("#DuvidaFinanceiro_Solicitante").hide();
			$("#DuvidaFinanceiro_Comprador").hide();
			$("#Reprova_Financeiro").hide();
			$("#Aprova_Financeiro").show();
			$("#instrucao01").hide();
			$("#instrucao02").hide();
			$("#instrucao03").hide();
			$("#instrucao04").hide();
			$("#instrucao05").hide();
			$("#instrucao06").hide();


		}

		if ($("#numAtividade").val() == "72") {

			$("#DuvidaFinanceiro_Solicitante").show();
			$("#DuvidaFinanceiro_Comprador").hide();
			$("#Reprova_Financeiro").hide();
			$("#Aprova_Financeiro").hide();
			$("#_DuvidaPreAprovadorS").parent().show()
			$("#RespostaPreAprovadorS").parent().show()

			var indx = $("[name^='txtAprovacaoPreAProvador']")
			for (let i = 0; i < indx.length; i++) {

				var radio = $($("[name^='txtAprovacaoPreAProvador']")[i]).is(':checked')
				if (radio != true) {
					$($("[name^='txtAprovacaoPreAProvador']")[i]).prop('disabled', true)
				}

			}

		}

		if ($("#numAtividade").val() == "95") {

			$("#DuvidaFinanceiro_Solicitante").hide();
			$("#DuvidaFinanceiro_Comprador").hide();
			$("#Reprova_Financeiro").hide();
			$("#Aprova_Financeiro").show();
			$("#instrucao08").hide();

		}

		if ($("#numAtividade").val() == "97") {

			$("#DuvidaFinanceiro_Solicitante").hide();
			$("#DuvidaFinanceiro_Comprador").hide();
			$("#Reprova_Financeiro").hide();
			$("#Aprova_Financeiro").show();
			$("#cotacao").show();

		}

		$("[name=txtAprovacaoFinanceiro]").on('click', function () {
			if ($(this).val() == "Sim") {
				$("#DuvidaFinanceiro_Solicitante").hide();
				$("#DuvidaFinanceiro_Comprador").hide();
				$("#Reprova_Financeiro").hide();
				$("#Aprova_Financeiro").show();

				$("#mensagemAprovarSolicitacao").show();

			} else if ($(this).val() == "Nao") {
				$("#DuvidaFinanceiro_Solicitante").hide();
				$("#DuvidaFinanceiro_Comprador").hide();
				$("#Reprova_Financeiro").show();
				$("#Aprova_Financeiro").hide();

				$("#mensagemAprovarSolicitacao").hide();

			} else if ($(this).val() == "Duvida_Solicitante") {
				$("#DuvidaFinanceiro_Solicitante").show();
				$("#DuvidaFinanceiro_Comprador").hide();
				$("#Reprova_Financeiro").hide();
				$("#Aprova_Financeiro").hide();

				$("#DuvidaFinanceiroS").val("");
				$("#RespostaFinanceiroS").val("");
				$("#mensagemAprovarSolicitacao").hide();

			} else if ($(this).val() == "Duvida_Comprador") {

				$("#DuvidaFinanceiro_Solicitante").hide();
				$("#DuvidaFinanceiro_Comprador").show();
				$("#Reprova_Financeiro").hide();
				$("#Aprova_Financeiro").hide();

				$("#DuvidaFinanceiroC").val("");
				$("#RespostaFinanceiroC").val("");
				$("#mensagemAprovarSolicitacao").hide();
			}
		});
	};

	return {
		init: _financeiro
	}
})();

var classificacao = (function () {

	var _classificacao = function () {

		$("#Classificacao_Baixa_Manual").hide();

		$("[name=radioClassificacao]").on('click', function () {
			if ($(this).val() == "Baixa_Manual") {
				$("#Classificacao_Baixa_Manual").show();

			} else if ($(this).val() == "Enviar_diretoria") {
				$("#Classificacao_Baixa_Manual").hide();

			}

		});
	};

	return {
		init: _classificacao
	}
})();


function addItem() {
	wdkAddChild('tableItens');

}

function reloadattach(campo) {

	campo = $(campo);
	var td = $(campo).closest("td");
	var id = $(td).find("select").attr("id");

	$("#" + id).empty();

	var o = new Option("Selecionar", "Selecionar");
	o.title = "Selecionar";
	$(o).html("Selecionar");
	$("#" + id).append(o);

	var w = window.parent.document.body;
	for (var i = 1; i < $(w).find('[id^=fluig-table]')[0].rows.length; i++) {
		var att = $(w).find('[id^=fluig-table]')[0].rows[i].children[1].children[0].children[0].innerHTML;
		var o = new Option(att, att);
		o.title = att;
		$(o).html(att);
		$("#" + id).append(o);

	}

}

function ocultarLixeira() {

	if ($("#numAtividade").val() == 5 || $("#numAtividade").val() == 19 || $("#numAtividade").val() == 114
		|| $("#numAtividade").val() == 24 || $("#numAtividade").val() == 32 || $("#numAtividade").val() == 69
		|| $("#numAtividade").val() == 72 || $("#numAtividade").val() == 30
		|| $("#numAtividade").val() == 35 || $("#numAtividade").val() == 61
		|| $("#numAtividade").val() == 41 || $("#numAtividade").val() == 95
		|| $("#numAtividade").val() == 97 || $("#numAtividade").val() == 39) {

		$("span[id*='removerProduto']").css("visibility", "hidden");

	}

	if ($("#numAtividade").val() == 5 || $("#numAtividade").val() == 24
		|| $("#numAtividade").val() == 72
		|| $("#numAtividade").val() == 30 || $("#numAtividade").val() == 35
		|| $("#numAtividade").val() == 61 || $("#numAtividade").val() == 41
		|| $("#numAtividade").val() == 95 || $("#numAtividade").val() == 97
		|| $("#numAtividade").val() == 39) {

		$("span[id*='removeFornecedor']").css("visibility", "hidden");

	}

	if ($("#numAtividade").val() == 17 || $("#numAtividade").val() == 30 || $("#numAtividade").val() == 39 || $("#numAtividade").val() == 58 || $("#numAtividade").val() == 65 || $("#numAtividade").val() == 95 || $("#numAtividade").val() == 97) {

		$(".fluigicon-trash").hide();

	}

}

// FUNCAO PARA MONTAR O CALENDARIO NOS CAMPOS DE DATA E HORA
function montaCalendario() {
	if ($("#numAtividade").val() == 95) {
		try {

			var onlyDate = FLUIGC.calendar('.date', {
				language: 'pt-br',
				pickDate: true,
				pickTime: false,
			});
		}
		catch (ex) { }

	}
}


function setSelectedZoomItem(selectedItem) {

	if (selectedItem.inputName == "zoomPreAprovador") {

		$('#pre_aprovador').val(selectedItem['colleagueId']);
		return;

	}


	if (selectedItem.inputName == "zoomCentroCusto") {
		var valoresSalvos = $("#zoomCentroCustoValues").val();

		//	Caso não esteja iniciado, eu inicializo o array
		if (!valoresSalvos)
			valoresSalvos = "[]";

		var jsonValoresSalvos = JSON.parse(valoresSalvos);

		var valorDoArray;
		for (var i = 0; i < jsonValoresSalvos.length; i++) {
			if (jsonValoresSalvos[i].id == selectedItem.CODIGO.trim()) {
				valorDoArray = jsonValoresSalvos[i];
				break;
			}
		}

		if (!valorDoArray) {
			jsonValoresSalvos.push({
				id: selectedItem.CODIGO.trim(),
				text: selectedItem.DESCRICAO.trim()
			});
		}
		else {
			valorDoArray.id = selectedItem.CODIGO.trim();
			valorDoArray.text = selectedItem.DESCRICAO.trim();
		}

		$("#zoomCentroCustoValues").val(JSON.stringify(jsonValoresSalvos));
		setTimeout(function () { AlterarDescricaoCentroCusto(); }, 10);
	}
}

function removedZoomItem(removedItem) {
	if (removedItem.inputName == "zoomCentroCusto") {
		var valoresSalvos = $("#zoomCentroCustoValues").val();

		var jsonValoresSalvos = JSON.parse(valoresSalvos);

		jsonValoresSalvos = jsonValoresSalvos.filter(function (v) { return v.id != removedItem.CODIGO.trim(); });

		$("#zoomCentroCustoValues").val(JSON.stringify(jsonValoresSalvos));
		setTimeout(function () { AlterarDescricaoCentroCusto(); }, 10);
	}
}

function AlterarDescricaoCentroCusto() {
	var valoresSalvos = $("#zoomCentroCustoValues").val();

	if (!valoresSalvos)
		return;

	var json = JSON.parse(valoresSalvos);
	$("#zoomCentroCusto + .select2 .select2-selection__choice .select2-selection__choice__remove").each(function (idx, v) {
		var id = v.nextSibling.nodeValue.trim();

		var valorEncontrado;
		for (var i = 0; i < json.length; i++) {
			if (json[i].id == id) {
				valorEncontrado = json[i];
				break;
			}
		}

		if (valorEncontrado) {
			v.nextSibling.nodeValue = valorEncontrado.id + " - " + valorEncontrado.text;
		}
	});

	//	Caso seja bloqueado
	var ids = $("#_zoomCentroCusto").val();
	if (ids) {
		ids = ids.split("");
		for (var i = 0; i < ids.length; i++) {
			var valorSalvo;

			for (var j = 0; j < json.length; j++) {
				if (json[j].id == ids[i].trim()) {
					valorSalvo = json[j];
					break;
				}
			}

			ids[i] = valorSalvo.id + " - " + valorSalvo.text;
		}

		$("#_zoomCentroCusto").hide();
		$("#divCentroCusto").append("<textarea class=\"form-control\" readonly>" + ids.join("\n") + "</textarea>");
	}

	//	Caso seja visualização
	var ids = $("span[id=zoomCentroCusto]").html();
	if (ids) {
		ids = ids.split("");
		for (var i = 0; i < ids.length; i++) {
			var valorSalvo;

			for (var j = 0; j < json.length; j++) {
				if (json[j].id == ids[i].trim()) {
					valorSalvo = json[j];
					break;
				}
			}

			ids[i] = valorSalvo.id + " - " + valorSalvo.text;
		}

		$("#zoomCentroCusto").html(ids.join("<br>"));
	}
}

function apareceView() {
	var atividade = $("#numAtividade").val()
	console.log('entrei auqi!!!')

	if ($('#RespostaPreAprovadorS').text() != "") {
		$($("[name^='txtAprovacaoPreAProvador']")[2]).attr('checked', true)
		$('#txtAprovacaoPreAProvador').parent().parent().parent().show()
		$("#DuvidaPreAprovador_Solicitante").show();
		$("#DuvidaPreAprovador_Comprador").hide();
		$("#Reprova_PreAprovador").hide();
		$("#Aprova_PreAprovador").hide();

		$("#DuvidaPreAprovadorS").val($("#DuvidaPreAprovadorS").text());
		$("#DuvidaPreAprovador_Solicitante").show();
		$("#mensagemAprovarSolicitacao").hide();
	}
	if ($('#RespostaPreAprovadorC').text() != "") {
		$($("[name^='txtAprovacaoPreAProvador']")[3]).attr('checked', true)
		$('#txtAprovacaoPreAProvador').parent().parent().parent().show()
		$("#DuvidaPreAprovador_Solicitante").hide();
		$("#DuvidaPreAprovador_Comprador").show();
		$("#Reprova_PreAprovador").hide();
		$("#Aprova_PreAprovador").hide();

		$("#DuvidaPreAprovadorC").val($("#DuvidaPreAprovadorC").text());
		$("#DuvidaPreAprovador_Solicitante").show();
		$("#mensagemAprovarSolicitacao").hide();
	}

}
function apareceView2() {
	var atividade = $("#numAtividade").val()
	$('#_txtAprovacaoPreAProvador').parent().parent().parent().show()
	$($("[name^='txtAprovacaoPreAProvador']")[0]).prop('checked', true);

}

function MascaraMoeda(objTextBox, SeparadorMilesimo, SeparadorDecimal, e) {
	var sep = 0;
	var key = '';
	var i = j = 0;
	var len = len2 = 0;
	var strCheck = '0123456789';
	var aux = aux2 = '';
	var whichCode = (window.Event) ? e.which : e.keyCode;
	if (whichCode == 13) return true;
	key = String.fromCharCode(whichCode); // Valor para o código da Chave
	if (strCheck.indexOf(key) == -1) return false; // Chave inválida
	len = objTextBox.value.length;
	for (i = 0; i < len; i++)
		if ((objTextBox.value.charAt(i) != '0') && (objTextBox.value.charAt(i) != SeparadorDecimal)) break;
	aux = '';
	for (; i < len; i++)
		if (strCheck.indexOf(objTextBox.value.charAt(i)) != -1) aux += objTextBox.value.charAt(i);
	aux += key;
	len = aux.length;
	if (len == 0) objTextBox.value = '';
	if (len == 1) objTextBox.value = '0' + SeparadorDecimal + '0' + aux;
	if (len == 2) objTextBox.value = '0' + SeparadorDecimal + aux;
	if (len > 2) {
		aux2 = '';
		for (j = 0, i = len - 3; i >= 0; i--) {
			if (j == 3) {
				aux2 += SeparadorMilesimo;
				j = 0;
			}
			aux2 += aux.charAt(i);
			j++;
		}
		objTextBox.value = '';
		len2 = aux2.length;
		for (i = len2 - 1; i >= 0; i--)
			objTextBox.value += aux2.charAt(i);
		objTextBox.value += SeparadorDecimal + aux.substr(len - 2, len);
	}
	return false;
}

//	Implemento Filter para IE
if (!Array.prototype.filter) {
	Array.prototype.filter = function (fun /*, thisp */) {
		"use strict";

		if (this === void 0 || this === null)
			throw new TypeError();

		var t = Object(this);
		var len = t.length >>> 0;
		if (typeof fun !== "function")
			throw new TypeError();

		var res = [];
		var thisp = arguments[1];
		for (var i = 0; i < len; i++) {
			if (i in t) {
				var val = t[i]; // in case fun mutates this
				if (fun.call(thisp, val, i, t))
					res.push(val);
			}
		}

		return res;
	};
}

