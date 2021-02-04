var PRIMEIRA_ATIVIDADE = 8;
var CORRIGIR_SOLICITACAO = 12;
var ATIVIDADE_ZERO = 0;
$(function() {
	
	if($("#proximoAprovador").val() == "" && ($("#nivelAtualAprovacao").val() == "0" || $("#nivelAtualAprovacao").val() == "")){
		buscaGestor();
	}

	$("#valorPgtoGuiaTaxaBoletos").change(function() {
		buscaGestor();
	});	
		
	alimentaFilial();
	alimentarUnidadeProtheus();
	limpaCampoChangeFilial();
	preenchendoOCampoEmergencialHidden();
	preencheIdentificadorCustomizado();
	concatenandoCentroDeCustoComDes();
	recuperarValorAprovadorFiscal();
	bindChangeAceiteSolucao();
	ocultarMsgNovaSc();
	adicionaMascaras();
	escondeCalendario();
	setZooms();
	exibeCamposTipoLancamento();
	initLoadCSV();
	addEvents();
	bloqueiaZoomsPorAtividade();
	setChangeMoeda();
	pegaDataVencimento();
	pegaDataAprovPrevista(); // Pega data prevista de pagamento para o solicitante
	
	//Inicia pesquisa de satisfação
	initPesquisa();
	getSla();
	var dataVencimento =  FLUIGC.calendar("#dtDeVencPgtoGuiaTaxaBoletos")
	$("#dtDeVencPgtoGuiaTaxaBoletos").change(function(){
		$("#dtDeVencPgtoGuiaTaxaBoletos").change(function () {
			var data = $('#dtDeVencPgtoGuiaTaxaBoletos').val();
			var dia = data.split("/")[0];
			var mes = data.split("/")[1];
			var ano = data.split("/")[2];
			$("#filtroDataVencimento").val(ano + "-" + mes + "-" + dia)
		});
	});
	
	
	if($("#viaWebService").val() == "true") {
		$("#cdSolicitante").val("Pool:Group:FIN_GUIANDO");
	}

});

function setChangeMoeda(){
	$('#sMoeda').change(function(){
		if($(this).val() == '1' || $(this).val() == '4' || $(this).val() == ''){
			var simbolo = 'R$ ';
		} else if ($(this).val() == '2'){
			var simbolo = 'US$ ';
		} else if ($(this).val() == '3'){
			var simbolo = '€ ';
		}else if ($(this).val() == '5'){
			var simbolo = '¥ ';
		}
		$('#valorPgtoGuiaTaxaBoletos,#vlrOutEntidades,#somatorioValorBeneficio').maskMoney('destroy');
		$('#valorPgtoGuiaTaxaBoletos,#vlrOutEntidades,#somatorioValorBeneficio').maskMoney({
			prefix:simbolo, 
			thousands:'.', 
			decimal:',', 
			affixesStay: true, 
			allowZero : true
		});
		$('.valorBeneficio').each(function(index){
			var linha = index +1;
			$('#valorBeneficio___'+linha).maskMoney('destroy');
			$('#valorBeneficio___'+linha).maskMoney({
				prefix:simbolo,
				allowNegative: true,
				thousands:'.', 
				decimal:',',
				affixesStay: true
			});
			$('#valorBeneficio___'+linha).val(addMascaraMonetaria(removeMascaraMonetaria($('#valorBeneficio___'+linha).val()),simbolo));
		})
		$('#vlrOutEntidades').val(addMascaraMonetaria(removeMascaraMonetaria($('#vlrOutEntidades').val()),simbolo));
		$('#valorPgtoGuiaTaxaBoletos').val(addMascaraMonetaria(removeMascaraMonetaria($('#valorPgtoGuiaTaxaBoletos').val()),simbolo));
		$('#somatorioValorBeneficio').val(addMascaraMonetaria(removeMascaraMonetaria($('#valorPgtoGuiaTaxaBoletos').val()),simbolo));
	
	});
}

function bloqueiaZoomsPorAtividade(){
	//Bloqueia as zooms iniciais quando a atividade atual não for a atividade inicial ou de correção
	if (CURRENT_STATE != 0 && CURRENT_STATE != 12) {
		$('#btZoomFilial').addClass('disabled');
		$('#btZoomFilial').unbind();
		$('#CTT_CUSTO_ZOOM').addClass('disabled');
		$('#CTT_CUSTO_ZOOM').unbind();
		$('#btnZoomTipolancamento').addClass('disabled');
		$('#btnZoomTipolancamento').unbind();
		$('#FORNECEDOR_ZOOM').addClass('disabled');
		$('#FORNECEDOR_ZOOM').unbind();
	}
}

function adicionaMascaras(){
	adicionaMascaraCpfCnpj('cnpjFornecedor');
	adicionaMascaraCpfCnpj('cgcTributo');
	adicionaDatePicker('dataemissaoPgtoGuiaTaxaBoletos');
	adicionaDatePicker('dtDeVencPgtoGuiaTaxaBoletos');
	adicionaDatePicker('dtDePgtoGuiaTaxaBoletos');
	adicionaDatePicker('dataApuracao');
	adicionaDatePicker('aprovDataPrevista');
	if($('#sMoeda').val() == '1' || $('#sMoeda').val() == '4' || $('#sMoeda').val() == ''){
		var simbolo = 'R$ ';
	} else if ($('#sMoeda').val() == '2'){
		var simbolo = 'US$ ';
	} else if ($('#sMoeda').val() == '3'){
		var simbolo = '€ ';
	}else if ($('#sMoeda').val() == '5'){
		var simbolo = '¥ ';
	}
	adicionaMascaraMonetaria('valorPgtoGuiaTaxaBoletos',simbolo);
	adicionaMascaraMonetaria('vlrOutEntidades',simbolo);
}

function recuperarValorAprovadorFiscal() {
	$("[name=decisaoFiscal]").change(function() {
		var valorSelecionado = $(this).val();
		$("[name=aprovacaoFiscal_Hidden]").val(valorSelecionado);
	});
}

function preenchendoOCampoEmergencialHidden() {
	$("#pagamentoEmergencial").click(function() {
		if ($(this).prop("checked")) {
			var valorCampoEmergencial = $("#pagamentoEmergencial").val();
			$("#pagamentoEmergencialHidden").val(valorCampoEmergencial);
		} else {
			$("#pagamentoEmergencialHidden").val("");
		}
	});
}

function concatenarIdentificadorCustomizado() {
	var campoPagamentoEmergencialIdentificador = "";
	var campoPagamentoEmergencial = $("#pagamentoEmergencialHidden").val();
	if (campoPagamentoEmergencial == "") {
		campoPagamentoEmergencialIdentificador = "N";
	} else {
		campoPagamentoEmergencialIdentificador = "E";
	}

	var unidade = $("#hiddenFilial").val();
	var data = $("#hiddenDataVencimento").val();
	var variavelConcatenada = campoPagamentoEmergencialIdentificador + " - "
			+ unidade + " | " + data;
}

function preencheIdentificadorCustomizado() {
	$(".motivo").blur(function() {
		var dataVencimentoRepasse = '';
		dataVencimentoRepasse = $("#dataVencimentoPagtoAntecipado").val();

		$("#hiddenDataVencimento").val(dataVencimentoRepasse);
		concatenarIdentificadorCustomizado();
	});
}

function concatenandoCentroDeCustoComDes() {
	$("#CTT_DESC01").change(
			function() {
				setTimeout(function() {
					var codigoCentroDeCustos = $("#codigoCentroCustos").val();
					var descricaoCentroDeCustos = $("#CTT_DESC01").val();
					var resultado = codigoCentroDeCustos + ' - '
							+ descricaoCentroDeCustos;
					$(".campoConcatenado").val(resultado);
				}, 300);
			});
}

function alimentaFilial() {
	$("#codigo").change(function() {
		var filialId = $("[name=codigo]").val();
		var filialDataSet = new objDataSet("filiais");
		filialDataSet.setCampo("filial");
		filialDataSet.setFiltro("codigo", filialId, filialId, true);
		filialDataSet.filtrarBusca();
		var dadosFilialProtheus = filialDataSet.getDados();
		var unidade = dadosFilialProtheus.values[0].filial;
		$("[name=hiddenFilial]").val(unidade);
		$("#analyticsNmFilial").val(unidade);
	});
}

function alimentarUnidadeProtheus() {
	$("#codigo").change(function() {
		var filialId = $("[name=codigo]").val();
		var filialDataSet = new objDataSet("filiais");
		filialDataSet.setCampo("filial_protheus");
		filialDataSet.setFiltro("codigo", filialId, filialId, true);
		filialDataSet.filtrarBusca();
		var dadosFilialProtheus = filialDataSet.getDados();
		var filialProtheusId = dadosFilialProtheus.values[0].filial_protheus;
		$("[name=filial_protheus]").val(filialProtheusId);
		$("[name=codigo_filial]").val(filialId);
	});
}

function limpaCampoChangeFilial() {
	$("[name=codigo]").change(function() {
		$("[name=CTT_DESC01]").val("");
		$("[name=CTT_CUSTO]").val("");
		$("[name=campoConcatenado]").val("");
	});
}

function bindChangeAceiteSolucao() {
	$("input[name='aceite']").change(function() {
		if ($(this).val() == "N") {
			$(".reqCompSolicitente").show();
			$(".oculto").hide();
			$("#divBtnPesquisa").hide();
		} else {
			$(".reqCompSolicitente").hide();
			$(".oculto").show();
			$("#divBtnPesquisa").show();
		}
	});
}

function ocultarMsgNovaSc() {
	var x = $("#aceiteSim:checked").val();
	if (x == "S") {
		$(".oculto").show();
	}
}

// Função responsavel pela máscara de CPF/CNPJ
function adicionaMascaraCpfCnpj(campo) {
	$('#'+campo).on('change keypress',function(e) {
		if ($('#'+campo).val().trim().replace(/[^0-9]/g, "").length > 11) {
			$('#'+campo).mask('00.000.000/0000-00');
		} else {
			$('#'+campo).mask('000.000.000-000');
		}
		$('#'+campo).trigger("input");
	});
}

// Função responsavel pela máscara monetaria
function adicionaMascaraMonetaria(campo,simbolo) {
	$('#' + campo).maskMoney('destroy');
	$('#' + campo).maskMoney({
		prefix:simbolo, 
		thousands:'.', 
		decimal:',', 
		affixesStay: true, 
		allowZero : true
		});
}

// Função para adicionar o seletor de data à um campo
function adicionaDatePicker(campo) {
	$('#' + campo).datepicker(
			{
				dateFormat : 'dd/mm/yy',
				dayNames : [ 'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta',
						'Sexta', 'Sábado', 'Domingo' ],
				dayNamesMin : [ 'D', 'S', 'T', 'Q', 'Q', 'S', 'S', 'D' ],
				dayNamesShort : [ 'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex',
						'Sáb', 'Dom' ],
				monthNames : [ 'Janeiro', 'Fevereiro', 'Março', 'Abril',
						'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro',
						'Outubro', 'Novembro', 'Dezembro' ],
				monthNamesShort : [ 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
						'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez' ]
			});
}

function escondeCalendario() {
	if (MODO_EDICAO == "VIEW") {
		$('.ui-datepicker').hide();
	}
}

function setZooms() {
	$("#btnZoomNatureza").on(
			"click",
			function() {
				openZoom("ds_Natureza",
						"CODIGO,Código,DESCRICAO,Natureza",
						"CODIGO,DESCRICAO",
						"&filterValues=",
						"natureza");
			});
	$("#btZoomFilial").on(
			"click",
			function() {
				openZoom("filiais",
						"codigo,Codigo,filial,Filial,cnpj_filial,CNPJ",
						"codigo,filial,cnpj_filial", "&filterValues=",
						"filiais");
			});
	$("#CTT_CUSTO_ZOOM").on(
			"click",
			function() {
				openZoom(
						"consultaDadosProtheusV2",
						"CTT_CUSTO,Codigo,CTT_DESC01,Centro%20de%20Custo",
						"046,,CTT_CLASSE%20=%20'2'%20AND%20CTT_BLOQ%20=%20'2',100,CTT_CUSTO,CTT_DESC01",
						"&filterValues=", "centroDeCusto");
					});
	$("#btnZoomTipo").on(
			"click",
			function() {
				openZoom("ds_tipoTitulo",
						"CODIGO,Código,DESCRICAO,Tipo de Titulo",
						"CODIGO,DESCRICAO",
						"&filterValues=",
						"tipoDeTitulo");
			});
	$("#btnZoomCodRetencao").on(
			"click",
			function() {
				openZoom("ds_codigoRetencao",
						"CODIGO,Código,DESCRICAO,Descrição",
						"CODIGO,DESCRICAO",
						"&filterValues=",
						"codRetencao");
			});
	$("#FORNECEDOR_ZOOM").on(
			"click",
			function() {
				openZoom("ds_fornecedor",
						"CODIGO,Codigo,DESCRICAO,Fornecedor,CGC,CPF/CNPJ,LOJA,Loja",
						"CODIGO,DESCRICAO,CGC,LOJA",
						"&filterValues=",
						"fornecedor");
			});
	$("#btnZoomTipolancamento").on(
			"click",
			function() {
				openZoom("dsTiposLancamento",
						"tipoLancamento,Tipo de Lançamento,codRetencao,Código de Retenção,fornecedor,Fornecedor,tipoTitulo,Tipo de Titulo" +
						",tipoTributo,Tipo de Tributo,natureza,Natureza,codTributoGPS, Cod Tributo GPS",
						"tipoLancamento,codRetencao,fornecedor,tipoTitulo,tipoTributo,natureza,fornecedor,lojaFornecedor,cnpjFornecedor,codTributoGPS,codFornecedor,codTipo,tblFilho", "&filterValues=",
						"tipoLancamento");
			});
}

function openZoom(datasetId, datafields, resultFields, constraints, type) {
	var position = getPositionCenter(900,600);
	window.open("/webdesk/zoom.jsp?datasetId=" + datasetId + "&dataFields="
			+ datafields + "&resultFields=" + resultFields + constraints
			+ "&type=" + type, "zoom", "status, scrollbars=no,top="+position[1]+", left="+position[0]+",width=900, height=600");
}

function setSelectedZoomItem(item) {
	if (item.type == "fornecedor"){
		$("#lojaFornecedor").val(item.LOJA);
		$("#A2_COD").val(item.CODIGO);
		$("#A2_COD").trigger("change");
		$("#FORNECEDOR_BANCO_DESC").val(item.DESCRICAO);
		$("#cnpjFornecedor").val(item.CGC);
		$("#cnpjFornecedor").trigger("change");		
	} else if (item.type == "filiais") {
		$("#codigo").val(item.CODIGO);
		$("#codigo").val(item.codigo);
		$("#codigo").trigger("change");
		$("#filial").val(item.filial);

		buscaGestor();
		
	} else if (item.type == "centroDeCusto") {
		$("#CTT_DESC01").val(item.CTT_DESC01);
		$("#CTT_DESC01").trigger("change");
		$("#codigoCentroCustos").val(item.CTT_CUSTO);

		buscaGestor();
		
	} else if (item.type == "tipoLancamento") {
		$("#zoomTipolancamento").val(item.tipoLancamento);
		$("#tblFilho").val(item.tblFilho);
		$("#zoomTipolancamento").trigger("change");
		$("#codTipolancamento").val(item.codTipo);
		$("#zoomCodRetencao").val(item.codRetencao);
		$("#zoomTipo").val(item.tipoTitulo);	
		$("#tipoTributo").val(item.tipoTributo)
		$("#zoomNatureza").val(item.natureza);	
		$("#A2_COD").val(item.codFornecedor);
		$("#FORNECEDOR_BANCO_DESC").val(item.fornecedor);
		$("#lojaFornecedor").val(item.lojaFornecedor);
		$("#cnpjFornecedor").val(item.cnpjFornecedor);
		$("#cnpjFornecedor").trigger("change");
		$("#codTributoGPS").val(item.codTributoGPS);
		//Oculta a opção de Rateio para lançamentos de GPS
		if(item.tipoLancamento == "GPS"){
			$('.checkboxRateio').hide();
		} else {
			$('.checkboxRateio').show();
		}
		if(item.tipoTitulo.trim() == "RECIBO" || item.tblFilho == 'tblINTER'){
			$('#FORNECEDOR_ZOOM').removeClass('disabled');
			$("#FORNECEDOR_ZOOM").on(
					"click",
					function() {
						openZoom("ds_fornecedor",
								"CODIGO,Codigo,DESCRICAO,Fornecedor,CGC,CPF/CNPJ,LOJA,Loja",
								"CODIGO,DESCRICAO,CGC,LOJA",
								"&filterValues=",
								"fornecedor");
					});
		} else {
			$('#FORNECEDOR_ZOOM').addClass('disabled');
			$('#FORNECEDOR_ZOOM').unbind();
		}
		if(item.tblFilho == 'tblINTER'){
			$('#divMoeda').removeClass('hidden');
			$('#compraExterior').val('sim');
		} else {
			$('#divMoeda').addClass('hidden');
			$('#compraExterior').val('');
		}
	} else if (item.type.indexOf("centroDeCustoBeneficio") != -1){
		var indice = item.type.slice(item.type.indexOf('___'),item.type.length);
		$("#centroCustoBeneficio"+indice).val(item.DESCRICAO);
		$("#centroCustoBeneficio"+indice).trigger("change");	
    	var codRepeat = true;
		//Verifica se o centro de custo já foi adicionado
		$("[name^=codCentroCustoBeneficio]").each(function(){
			if($(this).val() == item.CODIGO){
				if(codRepeat){
					codRepeat = false;
				}else{
					showMessage('Atenção', 'O Centro de Custo '+ item.CODIGO +' - '+ item.DESCRICAO +', Já esta incluido na tabela.');
					removeRowBeneficio($("#codCentroCustoBeneficio___"+indice).get(0));
				}
			} else {
				$("#codCentroCustoBeneficio"+indice).val(item.CODIGO).change();
				$("#codCentroCustoBeneficio"+indice).parent().removeClass('has-error');
			}
		});
	}
}

function exibeCamposTipoLancamento(){
	exibeCamposZoomTipoLancamento();
	
	$('#zoomTipolancamento').change(function(){
		exibeCamposZoomTipoLancamento();
	});
}

function exibeCamposZoomTipoLancamento(){
	var tipoLancamento = $('#zoomTipolancamento').val();
	
	if(tipoLancamento == 'GPS'){
		
		$('.codTributoGPS').show();
		$('.cgcTributo').show();
		$('.vlrOutEntidades').show();
		$('.zoomCodRetencao').hide();
		$('.dataApuracao').show();
		$('.cbGeraDirf').hide();
		$('.tipoTributo').hide();
		
	} else if(tipoLancamento == 'FGTS'){

		$('.codTributoGPS').hide();
		$('.cgcTributo').show();
		$('.vlrOutEntidades').hide();
		$('.zoomCodRetencao').hide();
		$('.dataApuracao').show();
		$('.cbGeraDirf').hide();
		$('.tipoTributo').show();
		
	} else if (tipoLancamento == 'DARF'){

		$('.codTributoGPS').hide();
		$('.cgcTributo').show();
		$('.vlrOutEntidades').hide();
		$('.zoomCodRetencao').show();
		$('.dataApuracao').show();
		$('.cbGeraDirf').show();
		$('.tipoTributo').hide();
		
	} else if (tipoLancamento == 'IPTU'){
		
		$('.codTributoGPS').hide();
		$('.cgcTributo').show();
		$('.vlrOutEntidades').hide();
		$('.zoomCodRetencao').hide();
		$('.dataApuracao').hide();
		$('.cbGeraDirf').hide();
		$('.tipoTributo').show();
		
	} else {

		$('.codTributoGPS').hide();
		$('.cgcTributo').hide();
		$('.vlrOutEntidades').hide();
		$('.zoomCodRetencao').hide();
		$('.dataApuracao').hide();
		$('.cbGeraDirf').hide();
		$('.tipoTributo').hide();

	}
}


function addEvents(){
	//Evento de mudança no valor total
	$("#valorPgtoGuiaTaxaBoletos").change(function (){
		$("[name^=valorBeneficio]").each(function(){
			$(this).change();
		 })
	});
	//
	$('#A2_COD').change(function(){
		var codFornecedor = $(this).val();
		if(fornecedorVinculadoPC(codFornecedor)){
			showMessage('Atenção!', 'Esse fornecedor está vinculado a um pedido de compra', null);
			$("#fornecedorVinculado").val('true');
		}
	});
	//Verifica se a data de vencimento é menor que a data atual
	$('#dtDeVencPgtoGuiaTaxaBoletos').change(function(){
		var dataAtual = new Date();
		dataAtual.setHours(0,0,0,0);
		var diaVencimento = $(this).val().split('/')[0];
		var mesVencimento = $(this).val().split('/')[1]-1;//Subtraindo 1 do mes, uma vez que são considerados meses de 0 a 11
		var anoVencimento = $(this).val().split('/')[2];
		var dataVencimento = new Date(anoVencimento,mesVencimento,diaVencimento);
		if(dataVencimento < dataAtual){
			$('.dataPagamento').show()
		} else {
			$('.dataPagamento').hide()
		}
	});
	
	//Verifica se a data de apuração é de um mes igual ou anterior ao atual.
	$('#dataApuracao').change(function(){
		var data = new Date();
		var mesAtual = data.getMonth()+1;
		var anoAtual = data.getFullYear();
		var mesApuracao = $(this).val().split('/')[1];
		var anoApuracao = $(this).val().split('/')[2];
		if(anoApuracao >= anoAtual && mesApuracao > mesAtual){
			$('#dataApuracao').val('');
			showMessage('Validação de Data', 'Atenção! O campo Data de Apuração deve ser preenchido com uma data do mês atual ou anterior')
		}
	});	
}

/**
 * Verifica se para o fornecedor já existe em pedidos de compras anteriores
 * @param idFornecedor
 */
function fornecedorVinculadoPC(idFornecedor){
	var prepareConsultaProtheus = new objDataSet("consultaDadosProtheus");
	prepareConsultaProtheus.setCampo("SC7");//Informa o nome da tabela
	prepareConsultaProtheus.setCampo("C7_FORNECE = "+idFornecedor);
	prepareConsultaProtheus.setCampo("C7_FORNECE")//Informa as colunas 
	prepareConsultaProtheus.filtrarBusca();
	var result = prepareConsultaProtheus.getDados();
	if(result.columns[0] == 'ERRO'){
		return false;
	}else{
		return true;
	}
}

function showMessage(titulo, mensagem, functionDone) {
	FLUIGC.message.alert({
		message: mensagem,
		title: titulo,
		label: 'OK'
	}, function(el, ev) {
		if(functionDone != null){
			functionDone.call();
		}
	});
}
/**
* Retorna o eixo x e y em um array
*/
function getPositionCenter(widthDiv, heightDiv){
	var alturaTela  = screen.height;
	var larguraTela = screen.width;                   
    var posicaoX = (larguraTela / 2) - (widthDiv  / 2); /*Explicado logo abaixo.*/
    var posicaoY = (alturaTela  / 2) - (heightDiv / 2);
    return [posicaoX, posicaoY];
}



function buscaGestor(){
	
	var c1 = DatasetFactory.createConstraint("filial", $("[name=filial_protheus]").val(), $("[name=filial_protheus]").val(), ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("centroCusto", $("[name=CTT_CUSTO]").val(), $("[name=CTT_CUSTO]").val(), ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("valor", $("[name=valorPgtoGuiaTaxaBoletos]").val(), $("[name=valorPgtoGuiaTaxaBoletos]").val(), ConstraintType.MUST);
	var constraints = new Array(c1, c2, c3);
	var ds_aprov = DatasetFactory.getDataset("ds_alcadaAprovacaoPagamentos", null, constraints,	null);

	$("#proximoAprovador").val("");
	$("#nivelAtualAprovacao").val("0");
	$("#idAprovGestor1").val("");
	$("#idAprovGestor2").val("");
	$("#idAprovGestor3").val("");
	$("#idAprovGestor4").val("");
	$("#idAprovGestor5").val("");
	
	for (var x = 0; x < ds_aprov.values.length; x++) {
		
		if($("#proximoAprovador").val() == ""){
			$("#proximoAprovador").val(ds_aprov.values[x].IDAPROVADOR);
			$("#nivelAtualAprovacao").val("1");
		}
	
		$("#idAprovGestor" + (x + 1)).val(ds_aprov.values[x].IDAPROVADOR);
	}
	
}

function numberToReal(valor) {
	
	valor = parseFloat(valor);
	
	if(valor == "" || isNaN(valor)){
		valor = 0.00
	}
	
	var numero = valor.toFixed(2).split('.');
    numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join('.');
    
    return numero.join(',');
    
}

//Pega data de Vencimento e seta no campo Data Prevista de Pagamento
function pegaDataVencimento() {
	if($("#dtDePgtoGuiaTaxaBoletos").val() != ""){		
		var dataPagamento = $("#dtDePgtoGuiaTaxaBoletos").val();
		$("#aprovDataPrevista").val(dataPagamento);
	}else {		
		$("#dtDeVencPgtoGuiaTaxaBoletos").change(function(){
			var dataVencimento = $(this).val();
			$("#aprovDataPrevista").val(dataVencimento);
		});
	}
}

//Pega data de Prevista de Pagamento e deixa visível para o solicitante
function pegaDataAprovPrevista() {
		var dataPrevistaDoFinanceiro = $("#aprovDataPrevista").val();
		$("#aprovDataPrevistaSolici").val(dataPrevistaDoFinanceiro );
}