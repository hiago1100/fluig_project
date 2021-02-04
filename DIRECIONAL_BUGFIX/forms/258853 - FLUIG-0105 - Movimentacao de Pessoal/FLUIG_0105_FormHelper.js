var FormHelper = (function() {

	var getCampoSecaoDestino = function(temTransferencia) {
		return temTransferencia ? 'cpZoomNovaObraDepTransPadrao'
				: 'cpZoomObraDep';
	};

	var getCampoFuncaoDestino = function(tipoMovimentacao) {
		return ((tipoMovimentacao == 1) || (tipoMovimentacao == 4)) ? 'cpZoomNovoCargo'
				: 'cpFuncaoAtual';
	};

	var getCampoSalarioDestino = function(tpMov) {
		return ((tpMov == 1) || (tpMov == 2) || (tpMov == 3)) ? 'cpZoomNovoSalario'
				: 'cpSalario';
	};

	var validaItemMovimentacao = function(destino, encontrado, filtroDestino,
			filtroEncontrado) {
		var valDestino = $('#' + destino).val(), valEncontrado = $(
				'#' + encontrado).val();

		if (filtroDestino) {
			valDestino = filtroDestino(valDestino);
		}

		if (filtroEncontrado) {
			valEncontrado = filtroEncontrado(valEncontrado);
		}

		if (valDestino != valEncontrado) {
			$('#' + encontrado).addClass('cadastroErrado');
		}
	};

	var validaAdicionalTransferencia = function(temTransferencia,
			transferenciaKM) {
		var transferenciaMaior300Km = transferenciaKM == 1;

		if (temTransferencia && transferenciaMaior300Km) {
			validaItemMovimentacao('cpAdicionalTransferencia',
					'cpConfAdicionalAtual', parseInt, parseInt);
		}
	};

	var verificaMovimentacao = function() {

		$('.cadastroErrado').removeClass('cadastroErrado');

		var transferencia = $("#cpTransferencia").val(), temTransferencia = transferencia == 1,

		transferenciaKM = $("#cpTransferenciaKm").val(), tipoMovimentacao = $(
				"#cpTipoMovimentacao").val(),

		campoSecaoDestino = getCampoSecaoDestino(temTransferencia), campoFuncaoDestino = getCampoFuncaoDestino(tipoMovimentacao), campoSalarioDestino = getCampoSalarioDestino(tipoMovimentacao);

		validaItemMovimentacao('cpColaborador', 'cpNomeAtual');
		validaItemMovimentacao(campoSecaoDestino, 'cpSecaoAtual');
		validaItemMovimentacao(campoFuncaoDestino, 'cpConfFuncaoAtual');
		validaItemMovimentacao(campoSalarioDestino, 'cpConfSalarioAtual');

		validaAdicionalTransferencia(temTransferencia, transferenciaKM);

		validaItemMovimentacao('cpMesCompetencia', 'cpConfMesCompRM');
	};

	var toggleReabertura = function(reabertura, atividade) {
		var mostraReabertura = (reabertura != '') || (atividade == 374);
		$("#blockReabertura").toggle(mostraReabertura);
	};

	var resetAvaliacao = function() {
		$(".campoAvaliacao").val('');
	};


	return {
		verificaMovimentacao : verificaMovimentacao,
		toggleReabertura : toggleReabertura,
		resetAvaliacao : resetAvaliacao,
	};
	
})();