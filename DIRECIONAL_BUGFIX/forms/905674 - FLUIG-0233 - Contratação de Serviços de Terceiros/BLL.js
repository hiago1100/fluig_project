var BLL = (function () {
	var instance;

	function init() {

		function VerificarSeDataMenor(data) {
			var dataAtual = new Date()
			dataAtual = new Date(`${dataAtual.getMonth() + 1}/${dataAtual.getDate()}/${dataAtual.getFullYear()}`)
			data = TransformaData(data);

			return data < dataAtual;
		};
		var VerificaDataInicio = function (dataInicio) {
			var dataAssinatura = $('#cpDataAssinatura').val();

			dataAssinatura = TransformaData(dataAssinatura);
			dataInicio = TransformaData(dataInicio);

			if (dataInicio < dataAssinatura || dataAssinatura == '') {
				Compartilhados.WarningToast('', Mensagens.M0002, 'error')
				Compartilhados.LimparCampos(['limparDataInicio'])
			}
		}
		var VerificaDataFim = function (dataFim) {
			var dataInicio = $('#cpInicioExecucao').val();

			dataFim = TransformaData(dataFim);
			dataInicio = TransformaData(dataInicio);

			if (dataFim < dataInicio || dataInicio == '') {
				Compartilhados.WarningToast('', Mensagens.M0003, 'error')
				Compartilhados.LimparCampos(['limparDataFim'])
			}
		}

		var VerificarSeEhFeriado = function (data, feriados) {

			var ehferiado = false;
			var dataSplit = data.split('/')
			data = new Date(`${dataSplit[1]}/${dataSplit[0]}/${dataSplit[2]}`)

			feriados.forEach(function (feriado) {
				if (feriado.getTime() == data.getTime()) {
					ehferiado = true;
				}
			})

			return ehferiado
		}
		var RealizaSomas = function (indexes, cpQuantidade, cpUnitario, cpTotal, cpTotalGeral) {
			indexes.forEach(index => {
				var vlrQuantidade = $(`${cpQuantidade}${index}`).val();
				var vlrUnitario = $(`${cpUnitario}${index}`).val();
				SomarCampoTotal(index, vlrQuantidade, vlrUnitario, cpTotal);
				SomarTotalGeral(indexes, cpTotal, cpTotalGeral);
			})
		}

		var SomarTotalGeral = function (indexes, cptotal, cpTotalGeral) {

			var totalGeral = '0';

			indexes.forEach(index => {
				var $vlrCpTotal = $(`${cptotal}${index}`).val();

				if ($vlrCpTotal != "" && jQuery.type($vlrCpTotal) != 'undefined') {

					$vlrCpTotal = $vlrCpTotal.replace(/[.]/g, '').replace(',', '.')
					
					$vlrCpTotal = parseFloat($vlrCpTotal);
					totalGeral = parseFloat(totalGeral)
					totalGeral += parseFloat($vlrCpTotal)

					totalGeral = totalGeral.toFixed(2).replace(".", ",")
				}
				$(`${cpTotalGeral}`).val(totalGeral)
			})
		}

		var SomarCampoTotal = function (index, quantidade, unitario, cpTotal) {

			var valorTotal = '0';

			if (quantidade != "" && unitario != "") {
				quantidade = Compartilhados.brlToFloat(quantidade);
				unitario = Compartilhados.brlToFloat(unitario);
				valorTotal = Compartilhados.brlToFloat(valorTotal);

				var valorTotal = parseFloat(quantidade) * parseFloat(unitario)
				valorTotal = valorTotal.toFixed(2).replace(".", ",")
			}
			$(`${cpTotal}${index}`).val(valorTotal)
		}

		var CalcularSaldoOrcamento = function (indexes, cpOrcado, cpTotal, cpSaldo) {
			var saldoOrcamento = '0';

			indexes.forEach(index => {
				var vlrTotal = $(`${cpTotal}${index}`).val();
				var vlrOrcado = $(`${cpOrcado}${index}`).val();

				if ((vlrTotal != "" && jQuery.type(vlrTotal) != 'undefined') &&
					(vlrOrcado != "" && jQuery.type(vlrOrcado) != 'undefined')) {
					 vlrTotal = vlrTotal.replace(/[.]/g, '').replace(',', '.')
					vlrOrcado = vlrOrcado.replace(/[.]/g, '').replace(',', '.')
					

					vlrTotal = parseFloat(vlrTotal)
					vlrOrcado = parseFloat(vlrOrcado)

					saldoOrcamento = parseFloat(saldoOrcamento);

					saldoOrcamento = vlrOrcado - vlrTotal

					saldoOrcamento = saldoOrcamento.toFixed(2).replace(".", ",");
				}
				$(`${cpSaldo}${index}`).val(saldoOrcamento);

			});
		}

		var VerificaSaldoNegativo = function (indexes, cpSaldo) {
			var ehNegativo = false;
			indexes.forEach(index => {
				if (parseFloat($(`${cpSaldo}${index}`).val()) < 0) ehNegativo = true

			})
			return ehNegativo
		}

		function TransformaData(data) {
			data = data.split("/")
			data = new Date(`${data[1]}/${data[0]}/${data[2]}`)

			return data
		}

		return {
			VerificarSeDataMenor,
			VerificaDataInicio,
			VerificaDataFim,
			RealizaSomas,
			SomarTotalGeral,
			SomarCampoTotal,
			CalcularSaldoOrcamento,
			VerificaSaldoNegativo,
			TransformaData,
			VerificarSeEhFeriado
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