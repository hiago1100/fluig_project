$(document).ready(function(){
   var pedido = $('#numPedido').val();
   var custo = $('#cpCodCusto').val();

   var dataset = solicitacaoPorProcesso(pedido,custo);
   montaDatatable(dataset);

   var cc = consultaCCusto(custo);
   $("#cpNomeCusto").val(cc);

});

function calendario() {
	var calendario = FLUIGC.calendar('.calendario');
}

function mostraJustificativaFinanceiro(obj) {

	var div = $("#div_swtButtonFinanceiro").find("div");
	var _justifica = $("#_justificativaFinanceiro").val();
	var justifica = $("#justificativaFinanceiro").val();

	if (justifica != '' || _justifica != '') {
		$('#div_justificaFinanceiro').css('display', 'block');
	}

	$("#div_swtButtonFinanceiro ").change(function () {
		if (!div.hasClass("btn-danger")) {
			// console.log('limpa campo')
			$("#div_justificativaFinanceiro").fadeOut();
			$('#justificativaFinanceiro').val("");
			$('#aux_financeiro').val("aprovado");
		} else {
			// console.log('reprovado')
			$("#div_justificativaFinanceiro").fadeIn();
			$('#aux_financeiro').val("reprovado");
		}
	});
}


function montaDatatable(dataset) {

	var that = this;

	if (dataset) {

		var valorDataset = dataset.values;
		that.mydata = [];

		var record = valorDataset[0];
			
		var obj = JSON.parse(record.nEWOUTITEM);
		var vlr = 0.00;

		for (var i=0; i < obj.outitem.length; i++) {
			
			var ob = obj.outitem[i];
			
			var x = ob.total.replace('.', '');
			var y = x.split(".");
			if(y.length > 1){
				var z = y[1].replace(",", ".");
				x = parseFloat(y[0]+z);
			}else{
				var z = y[0].replace(",", ".");
				x = parseFloat(z);
			}
			
			vlr += parseFloat(x);

			that.mydata.push({
				ITEM: ob.item,
				PRODUTO: ob.produto,
				DESCRICAO: ob.descricao,
				QUANTIDADE: ob.quantidade,
				VALOR: ob.valor,
				TOTAL: ob.total,
			});
		}

		$("#cpValor").val(vlr.toFixed(2));
	}

	that.myTable = FLUIGC.datatable('#datatableProduto', {
		dataRequest: that.mydata,
		multiSelect: true,
		select: false,
		offset: 0,
		renderContent: ['ITEM', 'PRODUTO', 'DESCRICAO', 'QUANTIDADE', 'VALOR', 'TOTAL'],
		header: [
			{ 'title': 'Item', 'size': 'col-md-1 center' },
			{ 'title': 'Produto', 'size': 'col-md-2 center' },
			{ 'title': 'Descrição', 'size': 'col-md-4 center' },
			{ 'title': 'Quantidade', 'size': 'col-md-1 center' },
			{ 'title': 'Valor Item', 'size': 'col-md-2 center' },
			{ 'title': 'Total Item', 'size': 'col-md-2 center' },
		],
		search: {
			enabled: false,
		},
		scroll: {
			target: ".datatableProduto",
			enabled: true
		},
		actions: {
			enabled: false,
		},
		navButtons: {
			enabled: false,
		},
		draggable: {
			enabled: false
		},
	}, function (err, data) {
		if (err) {
			FLUIGC.toast({
				message: err,
				type: 'danger'
			});
		}
	});
}

function solicitacaoPorProcesso(Pedido, Custo) {

	// -----------------------------------------------------------------------
	// Codigo Antigo
	// -----------------------------------------------------------------------
	// var c1 = DatasetFactory.createConstraint("C7_NUM", Pedido, Pedido, ConstraintType.MUST);
	// var c2 = DatasetFactory.createConstraint("C7_CC", Custo, Custo, ConstraintType.MUST);
	// var dataset = DatasetFactory.getDataset("teste_protheus", null, [c1,c2], null);
	// return dataset

	//------------------------------------------------------------------------
	// Codigo Novo
	// -----------------------------------------------------------------------
	var c1 = DatasetFactory.createConstraint("wcnum", Pedido, Pedido, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("wcc", Custo, Custo, ConstraintType.MUST);
	var dataset = DatasetFactory.getDataset("ds_consulta_itens_pedido", null, [c1,c2], null);
	return dataset
}

function consultaCCusto(custo){

	var dataset = DatasetFactory.getDataset("ds_centroCusto", null, null, null);
	var retorno = "";
	 
	for(var i = 0; i < dataset.values.length; i++){
		if(custo.trim() == dataset.values[i]["Codigo"].trim()){
			retorno = dataset.values[i]["Centro de Custo"];
		}
	}

	return retorno;
}