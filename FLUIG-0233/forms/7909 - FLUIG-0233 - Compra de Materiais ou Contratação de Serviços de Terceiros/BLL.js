const BLL = (function () {
	var instance;

	function startInstance() {
		/**
		 * @description Aplica as regras de negócio vinculadas a especificação
		 * @return {[type]} [description]
		 */
		function setRegrasNegocioAprovacao(){
			const arr_regras = [
	            //14 - Aprovação - N1
	            {
	                atividade: "14",
	                prazo: '008:00',
	                fluxoAutomatico: false,
	                mecAtribuicao: [{ tipoUsuario: 'N1', valor: '' }],
	                etapaAtiva: true,
	                aprovacaoAlcada: [{ Ativo: false, valor: "0" }]
	            },

	            //19 - Conferência da solicitação - Suprimentos
	            {
	                atividade: "19",
	                prazo: '008:00',
	                fluxoAutomatico: false,
	                mecAtribuicao: [{ tipoUsuario: 'PAPEL', valor: 'Pool:Role:DSUP.006' }],
	                etapaAtiva: true,
	                aprovacaoAlcada: [{ Ativo: false, valor: "0" }]
	            },

	            //206 - Erro na integração 1
	            {
	                atividade: "206",
	                prazo: '008:00',
	                fluxoAutomatico: false,
	                mecAtribuicao: [{ tipoUsuario: 'PAPEL', valor: 'Pool:Role:DSUP.006' }],
	                etapaAtiva: true,
	                aprovacaoAlcada: [{ Ativo: false, valor: "0" }]
	            },

	            //20 - Realizar mapa de cotação no UAU
	            {
	                atividade: "20",
	                prazo: '008:00',
	                fluxoAutomatico: false,
	                mecAtribuicao: [{ tipoUsuario: 'PAPEL', valor: 'Pool:Role:DSUP.006' }],
	                etapaAtiva: true,
	                aprovacaoAlcada: [{ Ativo: false, valor: "0" }]
	            },

	            //21 - Aprovação do fornecedor e Análise da verba - N1
	            {
	                atividade: "21",
	                prazo: '008:00',
	                fluxoAutomatico: false,
	                mecAtribuicao: [{ tipoUsuario: 'DIVERSOS', valor: '' }],
	                etapaAtiva: true,
	                aprovacaoAlcada: [{ Ativo: true, valor: "0.01" }]
	            },

	            //15 - Aprovação da compra / contratação - N2
	            {
	                atividade: "15",
	                prazo: '008:00',
	                fluxoAutomatico: false,
	                mecAtribuicao: [{ tipoUsuario: 'N2', valor: '' }],
	                etapaAtiva: true,
	                aprovacaoAlcada: [{ Ativo: true, valor: "2500.00" }]
	            },

	            //16 - Aprovação da compra / contratação - N3
	            {
	                atividade: "16",
	                prazo: '008:00',
	                fluxoAutomatico: false,
	                mecAtribuicao: [{ tipoUsuario: 'N3', valor: '' }],
	                etapaAtiva: true,
	                aprovacaoAlcada: [{ Ativo: true, valor: "10000.00" }]
	            },

	            //17 - Aprovação da compra / contratação - N4
	            {
	                atividade: "17",
	                prazo: '008:00',
	                fluxoAutomatico: false,
	                mecAtribuicao: [{ tipoUsuario: 'N4', valor: '' }],
	                etapaAtiva: true,
	                aprovacaoAlcada: [{ Ativo: true, valor: "30000.00" }]
	            },

	            //18 - Processamento da solicitação  - Área de Planejamento
	            {
	                atividade: "18",
	                prazo: '008:00',
	                fluxoAutomatico: false,
	                mecAtribuicao: [{ tipoUsuario: 'PAPEL', valor: 'Pool:Role:DPLA.004' }],
	                etapaAtiva: true,
	                aprovacaoAlcada: [{ Ativo: false, valor: "0" }]
	            },

	            //282 - Erro na integração 4
	            {
	                atividade: "282",
	                prazo: '008:00',
	                fluxoAutomatico: false,
	                mecAtribuicao: [{ tipoUsuario: 'PAPEL', valor: 'Pool:Role:DSUP.006' }],
	                etapaAtiva: true,
	                aprovacaoAlcada: [{ Ativo: false, valor: "0" }]
	            },

	            //22 - Lançamento da ordem de compra no UAU / Requisição de produto em estoque
	            {
	                atividade: "22",
	                prazo: '008:00',
	                fluxoAutomatico: false,
	                mecAtribuicao: [{ tipoUsuario: 'PAPEL', valor: 'Pool:Role:DSUP.006' }],
	                etapaAtiva: true,
	                aprovacaoAlcada: [{ Ativo: false, valor: "0" }]
	            },

	            //32 - Confirmar previsão do fornecedor
	            {
	                atividade: "32",
	                prazo: '004:00',
	                fluxoAutomatico: false,
	                mecAtribuicao: [{ tipoUsuario: 'PAPEL', valor: 'Pool:Role:DSUP.006' }],
	                etapaAtiva: true,
	                aprovacaoAlcada: [{ Ativo: false, valor: "0" }]
	            },

	        ];

			arr_regras.forEach(function(regra){
				setMecanismoAtribuicao(regra);
	            setAlcadaAprovacao(regra);
				$(`#cpPrazo_${regra.atividade}`).val(regra.prazo);
			});
		}

		/**
		 * @description Aplica os papeis para o mecanismo de atribuição das Aprovações
		 * @param {[object]} regra [Objeto da regra de negócio]
		 */
		function setMecanismoAtribuicao(regra){
			regra.mecAtribuicao.forEach(function(item){
				if (item.tipoUsuario == 'N1') {
					$(`#cpMecAtribuicao_${regra.atividade}`).val($(`#cpPapelN1`).val());
	            }
				else if (item.tipoUsuario == 'N2') {
					$(`#cpMecAtribuicao_${regra.atividade}`).val($(`#cpPapelN2`).val());
	            }
				else if (item.tipoUsuario == 'N3') {
					$(`#cpMecAtribuicao_${regra.atividade}`).val($(`#cpPapelN3`).val());
	            }
				else if (item.tipoUsuario == 'N4') {
					$(`#cpMecAtribuicao_${regra.atividade}`).val($(`#cpPapelN4`).val());
	            }
				else {
	                $(`#cpMecAtribuicao_${regra.atividade}`).val(item.valor);
	            }
			});
		}

		/**
		 * @description Aplica o valor da alçada em seu campo relativo
		 * @param {[object]} regra [Objeto da regra de negócio]
		 */
		function setAlcadaAprovacao(regra){
			regra.aprovacaoAlcada.forEach(function(alcada){
				if (alcada.Ativo) {
	                $(`#cpAlcada_${regra.atividade}`).val(alcada.valor);
	            }
			});
		}

		/**
		 * @description Verifica se a data inserida no datepicker é feriado
		 * @param  {[string]}  data [Data a ser verificada]
		 * @return {Boolean}      []
		 */
		function isFeriado(data) {
			let status = false;
			let feriados = FLUIGC.sessionStorage.getItem('feriados');

			if(feriados != null){
				if(feriados.indexOf(data) >= 0){
					status = true;
				}
			}

			return status;
		}

		/**
		 * @description Verifica se a data inserida é menor que a data atual
		 * @return {Boolean} [description]
		 */
		function isDataMenorQueHoje(data){
			let status = moment(data) < moment();

			return status;
		}

		/**
		 * @description Verifica se a data inserida é final de semana
		 * @param  {[string]}  data [description]
		 * @return {Boolean}      [description]
		 */
		function isFinalSemana(data){
			let status = false;

			if(moment(data).day() == 0 || moment(data).day() == 6){
				status = true;
			}

			return status;
		}

		function calcSaldoOrcamento(index, tabela){
			let valor_total_item;
			let saldo_orcado_uau;
			let saldo_orcamento_total = 0;

			switch(tabela) {
				case 'DemaisCompras':
					valor_total_item = $(`#cpTotalDemaisCompras___${index}`).val();
					saldo_orcado_uau = $(`#cpOrcadoDemaisCompras___${index}`).val();
					break;
				case 'ItensTi':
					valor_total_item = $(`#cpTotalItensTi___${index}`).val();
					saldo_orcado_uau = $(`#cpOrcadoItensTi___${index}`).val();
					break;
				case 'Servicos':
					valor_total_item = $(`#cpTotalServicos___${index}`).val();
					saldo_orcado_uau = $(`#cpOrcadoServicos___${index}`).val();
					break;
			}

			saldo_orcamento_total = parseInt(saldo_orcado_uau) - parseInt(valor_total_item);

			return saldo_orcamento_total;
		}

		function isItemRepetido(cod_item, tipo_solicitacao){
			switch(tipo_solicitacao){
				case 'demais_compras':
					//all code
					$('#tbDemaisCompras tbody tr').each(function(index, item){
					    console.log($(item).find('input[id^="cpCodInsumo"]').val());
					});
					break;
				case 'itens_ti':
					//all code
					break;
				case 'servicos':
					//all code
					break;
			}
		}

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



		var RealizaSomas = function (indexes, cpQuantidade, cpUnitario, cpTotal, cpTotalGeral) {
			indexes.forEach(index => {
				var vlrQuantidade = $(`${cpQuantidade}${index}`).val();
				var vlrUnitario = $(`${cpUnitario}${index}`).val();
				SomarCampoTotal(index, vlrQuantidade, vlrUnitario, cpTotal);
				SomarTotalGeral(indexes, cpTotal, cpTotalGeral);
			})
		}

		var SomarTotalGeral = function (indexes, cptotal, cpTotalGeral) {
			$(`${cpTotalGeral}`).val('0.0');
			let valor_total_pedidos = $(`${cpTotalGeral}`).val();
			console.log("INDEXES");
			console.log(indexes);

			console.log(valor_total_pedidos);

			indexes.forEach(index => {
				if(index != undefined){
					console.log(index);

					var valor_total_pedido = $(`${cptotal}${index}`).val();

					console.log(valor_total_pedido);
					console.log(valor_total_pedidos);

					valor_total_pedidos = parseFloat(valor_total_pedidos) + parseFloat(valor_total_pedido);
					console.log(valor_total_pedidos);

					$(`${cpTotalGeral}`).val(valor_total_pedidos);
				}
			});


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
			/*
				calculo: unitario x quantidade = total
				orcado: UAU
				saldo orcamento: orcado - orcamento do UAU
			*/

			indexes.forEach(index => {
				let valor_total_calculado = $(`${cpTotal}${index}`).val();
				let valor_orcado_uau = $(`${cpOrcado}${index}`).val();
				let valor_resultante_orcado;

				if(valor_orcado_uau != null && valor_orcado_uau != undefined){
					valor_resultante_orcado = parseFloat(valor_orcado_uau) - parseFloat(valor_total_calculado);
					console.log(valor_resultante_orcado);
					$(`${cpSaldo}${index}`).val(valor_resultante_orcado);
				}
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
			setRegrasNegocioAprovacao,
			setMecanismoAtribuicao,
			setAlcadaAprovacao,
			isFeriado,
			isDataMenorQueHoje,
			isFinalSemana,
			calcSaldoOrcamento,
			VerificaDataInicio,
			VerificaDataFim,
			RealizaSomas,
			SomarTotalGeral,
			SomarCampoTotal,
			CalcularSaldoOrcamento,
			VerificaSaldoNegativo,
			TransformaData
		};
	}

	return {
		getInstance: function () {
			if (!instance) {
				instance = startInstance();
			}

			return instance;
		}
	}
})();
