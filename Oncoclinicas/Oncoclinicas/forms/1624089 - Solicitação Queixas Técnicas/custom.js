var INICIO = '4';
var VALIDAR_FORMULARIO = '5';
var CORRIGIR_INCONSISTENCIA = '9';
var RETORNO_FORNECEDOR = '37';
var COLETA_REGISTRA_NFD = '13';
var AGUARDANDO_RETORNO_FORNECEDOR = '14';
var APROVACAO_SOLICITANTE = '15';
var SOLUCAO_INCONSISTENCIA = '18';
var SERVICO_XML = '60';

$(document).ready(function() {
	getSla();
	setZooms();	
	
	$('input[name="devolverUnidades"]').on('change', exibeQtdeProdutos);	
	
	$('input[name="adminEmPaciente"]').on('change', exibeImpactoPaciente);
	
	$('input[name="aprovMatMed"]').on('change', exibeCampoDescricaoMatMed);
	
	$('input[name="recolhimentoProduto"]').on('change', exibeSituacaoEstoque);
	
	$('input[name="laudoEnviado"]').on('change', exibeCampoMotivoSemLaudo);
	
	$('input[name="seraRecolhido"]').on('change', exibeDataAproximada);
	
	$('input[name="aprovSolicitacao"]').on('change', exibeMotivoReprova);
	
	$('input[name="impactoPaciente"]').on('change', exibeDescricaoImpacto);
	
	$('input[name="equipamentoRecolhido"]').on('change', exibeNumeroSoliciNFD);
	
	$('#hiddenSituacaoEstoque').val($('#situacaoEstoque').val())

	if(!(CURRENT_STATE == INICIO || CURRENT_STATE == "0")){
		if($('#situacaoEstoque') != ""){
			$('.situacaoEstoque').show();
		}
		if($('#qtdMesmoLote') != ""){
			$('.qtdMesmoLote').show();
		}
		if($('#descricaoImpacto') != ""){
			$('.impactoPaciente').show();
		};
	
		if($('#descricaoImpacto') != ""){
			$('.descricaoImpacto').show();
		}
	}
	
	if(CURRENT_STATE == VALIDAR_FORMULARIO){
		if($('#recolhimentoProduto').val() == "NAO"){
			$('.situacaoEstoque').hide();
		}
		if($('#adminEmPaciente').val() == "NAO"){
			$('.impactoPaciente').hide();
		}
		if($('#impactoPaciente').val() == "NAO" || $('#impactoPaciente').val() == ""){
			$('.descricaoImpacto').hide();
		}
	}
	
	if(CURRENT_STATE == CORRIGIR_INCONSISTENCIA){
		if($("#aprovMatMed").val() == "NAO"){
			$(".campoDescriMatMed").show();
			$(".emailFornecedor").hide();
		}
		if($('#recolhimentoProduto').val() == "NAO"){
			$('.situacaoEstoque').hide();
		}
		if($('#adminEmPaciente').val() == "NAO"){
			$('.impactoPaciente').hide();
		}
		if($('#impactoPaciente').val() == "NAO" || $('#impactoPaciente').val() == ""){
			$('.descricaoImpacto').hide();
		}	
	}
	
	if(CURRENT_STATE == RETORNO_FORNECEDOR){
		if($('#seraRecolhido') != ""){
			$('.dataAproximada').show();
		}
		if($('#recolhimentoProduto').val() == "NAO"){
			$('.situacaoEstoque').hide();
		}
		if($('#adminEmPaciente').val() == "NAO"){
			$('.impactoPaciente').hide();
		}
		if($('#impactoPaciente').val() == "NAO" || $('#impactoPaciente').val() == ""){
			$('.descricaoImpacto').hide();
		}
	}
	
	if(CURRENT_STATE == COLETA_REGISTRA_NFD){
		if($('#dataAproximada') != ""){
			$('.dataAproximada').show();
			$('.observacaoRetorno').hide();
		}
		if($('#observacaoRetorno') != ""){
			$('.observacaoRetorno').show();
		}
		if($("#seraRecolhido").val() == "SIM"){
			$(".observacaoRetorno").hide();
		}
		if($('#recolhimentoProduto').val() == "NAO"){
			$('.situacaoEstoque').hide();
		}
		if($('#adminEmPaciente').val() == "NAO"){
			$('.impactoPaciente').hide();
		}
		if($('#impactoPaciente').val() == "NAO" || $('#impactoPaciente').val() == ""){
			$('.descricaoImpacto').hide();
		}
	}
	
	if(CURRENT_STATE == AGUARDANDO_RETORNO_FORNECEDOR){
		if($('#recolhimentoProduto').val() == "NAO"){
			$('.situacaoEstoque').hide();
		}
		if($('#adminEmPaciente').val() == "NAO"){
			$('.impactoPaciente').hide();
		}
		if($('#impactoPaciente').val() == "NAO" || $('#impactoPaciente').val() == ""){
			$('.descricaoImpacto').hide();
		}
	}
	
	if(CURRENT_STATE == APROVACAO_SOLICITANTE){
		if($('#recolhimentoProduto').val() == "NAO"){
			$('.situacaoEstoque').hide();
		}
		if($('#adminEmPaciente').val() == "NAO"){
			$('.impactoPaciente').hide();
		}
		if($('#impactoPaciente').val() == "NAO" || $('#impactoPaciente').val() == ""){
			$('.descricaoImpacto').hide();
		}
	}
	
	if(CURRENT_STATE == SOLUCAO_INCONSISTENCIA){
		if($('#recolhimentoProduto').val() == "NAO"){
			$('.situacaoEstoque').hide();
		}
		if($('#adminEmPaciente').val() == "NAO"){
			$('.impactoPaciente').hide();
		}
		if($('#impactoPaciente').val() == "NAO" || $('#impactoPaciente').val() == ""){
			$('.descricaoImpacto').hide();
		}
		if($('#aprovSolicitacao').val() == "NAO"){
			$('.MotivoReprovSoli').show();
		}
	}
	
	
	//Adicionando Calendário e Mascara numérica
	var vencimentoNF = FLUIGC.calendar("#vencimentoNF");
	$('.numero').mask('?999999999999');
	$('.maskCNPJ').mask('99.999.999/9999-99');
	$("[name^='valorNF']").each(function(i, row){	
		$(row).maskMoney({
	    	prefix:'R$ ', 
	        allowNegative: true, 
	        thousands:'.',
	        decimal:',',
			affixesStay: true
	    })
    });
	//Adiciona a data de criação da solicitação de NF Entrada
	$("#dataChamadoNF").val($("#dataSolicitanteUnidade").val());
	
});

function configFilho(index) {
	// Remove o espaçamento indevido dos ícones de remoção de linhas das tabelas.
    $(".fs-md-space").removeClass("fs-md-space");
    //Adiciona a zoom aos novos itens
    setZooms();
}

function setZooms(){               
	//Cria zoom de filiais do Fluig
	$(".zoomFilial").on("click",function() {
		openZoom("ds_filial",
				"CODIGO, Codigo, DESCRICAO, Descrição, CGC, CPF/CNPJ",
				"CODIGO, DESCRICAO, CGC, ENDERECO, COMPLEMENTO, BAIRRO, CIDADE, ESTADO",
				"",
				$(this).attr('name')
		);
	});
	
	//Cria zoom de Produtos
	$(".zoomCodProduto").on("click",function() {
		openZoom("ds_produto",
			"CODIGO, Codigo, DESCRICAO, Descrição, UNIDADE, UN, FABRICANTE, Fabricante, DESCTIPO, Tipo, PRINC_ATIVO, Principio Ativo ",
			"CODIGO, DESCRICAO, UNIDADE, FABRICANTE, DESCTIPO, PRINC_ATIVO",
			"",
			//"&filterValues= CODTIPO,MD,CODTIPO,MM,CODTIPO,MQ,CODTIPO,so",
			$(this).attr('name')
		);
	});

	//Cria zoom de Fornecedores
	$(".zoomFornecedor").on("click",function() {
		openZoom("ds_lote",
				"LOTE, Lote, VALIDADE, Validade, PRODUTO, Produto, FILIAL, Filial",
				"LOTE, VALIDADE, PRODUTO, FILIAL",
				"&filterValues= PRODUTO," + $("#codProduto").val() + ", FILIAL," + $("#codFiliais").val(),
				$(this).attr('name')
		);
	});
	
	//Cria zoom de Nota Fiscal Fornecedor
	$(".zoomNotaFiscalFornecedor").on("click",function() {		
		openZoom( "ds_produtoNotasFiscaisEntrada",
			"DOCUMENTO, Nota Fiscal, DESC_FORNECEDOR, Fornecedor, DT_EMISSAO, Data_Emissao, VLR_TOTAL, Valor",
			"DOCUMENTO, DESC_FORNECEDOR, DT_EMISSAO, VLR_TOTAL",
			"&filterValues= PRODUTO," + $("#codProduto").val() + ", LOTE, " + $("#loteProduto").val(),
			$(this).attr('name')	
		);
	})
};

function openZoom(datasetId, datafields, resultFields, constraints, type) {
    var position = getPositionCenter(900,600);
    window.open("/webdesk/zoom.jsp?datasetId=" + datasetId + "&dataFields=" + datafields + "&resultFields=" + resultFields + constraints + "&type=" + type, "zoom",
            "status, scrollbars=no,top="+position[1]+", left="+position[0]+",width=900, height=600");
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

function setSelectedZoomItem(item) {	
	if(item.type == 'btZoomFilial'){
		$("#codFiliais").val(item.CODIGO).change();
		$("#cnpjFilial").val(item.CGC.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")).change();
		$("#razaoSocial").val(item.DESCRICAO).change();
		$("#endereco").val(item.ENDERECO).change();
		$("#cidade").val(item.CIDADE).change();
		$("#estado").val(item.ESTADO).change();
		$("#bairro").val(item.BAIRRO).change();
		$("#complemento").val(item.COMPLEMENTO).change();
	}
	
	if(item.type == 'btZoomCodProduto'){
		$("#codProduto").val(item.CODIGO).change();
		$("#descricaoProdu").val(item.DESCRICAO).change();
		$("#tipoProduto").val(item.DESCTIPO).change();
		$("#formFarmaceutica").val(item.UNIDADE).change();
		$("#fabricante").val(item.FABRICANTE).change();
		$("#principioAtivo").val(item.PRINC_ATIVO).change();
	}
	
	if(item.type == 'btZoomFornecedor'){
		$("#loteProduto").val(item.LOTE).change();
		$("#validadeProduto").val(item.VALIDADE).change();
	}
	
	if(item.type == 'btZoomNF'){
		$("#nfProduto").val(item.DOCUMENTO).change();
		$("#fornecedor").val(item.DESC_FORNECEDOR).change();
	}
}

function exibeQtdeProdutos() {
	if($(this).val() == "SIM"){
		$(".quantidadeLote").show();
	}
	if($(this).val() == "NAO"){
		$(".quantidadeLote").hide();
	}
}

function exibeImpactoPaciente(){
	if($(this).val() == "SIM"){
		$(".impactoPaciente").show();
	}
	if($(this).val() == "NAO"){
		$(".impactoPaciente").hide();
		$(".descricaoImpacto").hide();
	}
}

function exibeSituacaoEstoque (){
	if($(this).val() == "SIM"){
		$(".situacaoEstoque").show();
		
	}else{
		$(".situacaoEstoque").hide();
	}
}

function exibeCampoDescricaoMatMed (){
	if($(this).val() == "NAO"){
		$(".campoDescriMatMed").show();
		$(".emailFornecedor").hide();
	}else{
		$(".campoDescriMatMed").hide();
		$(".emailFornecedor").show();
	}
}

function exibeCampoMotivoSemLaudo (){
	if($(this).val() == "NAO"){
		$(".motivoSemLaudo").show();
	}else{
		$(".motivoSemLaudo").hide();
	}
}

function exibeDataAproximada (){
	if($(this).val() == "SIM"){
		$(".dataAproximada").show();
		$(".observacaoRetorno").hide();
	}else{
		$(".dataAproximada").hide();
		$(".observacaoRetorno").show();
	}
}

function exibeMotivoReprova (){
	if($(this).val() == "NAO"){
		$(".MotivoReprovSoli").show();
	}else{
		$(".MotivoReprovSoli").hide();
	}
}

function exibeDescricaoImpacto (){
	if($(this).val() == "SIM"){
		$(".descricaoImpacto").show();
	}else{
		$(".descricaoImpacto").hide();
	}
}

function exibeNumeroSoliciNFD(){
	if($(this).val() == "SIM" && $("#hiddenSituacaoEstoque").val() == "SIM"){
		$(".numSolicitaNFD").show();
		
	}else{
		$(".numSolicitaNFD").hide();
	}
}
