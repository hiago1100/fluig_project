var init = function(){
	var STAGE = $('#atvAtual').val();
	var MODE = $("#formMode").val();
	
	if (STAGE != 0) {
		btnShowCamera();
	}


	if(STAGE == 5 || STAGE == 11){
		$(".fluigicon-trash").hide();
		$("#btAddChildTable").hide();
		// $(".bpm-mobile-trash-column").hide();

		if($("#aux_pa").val() == "N"){
			$("#div_pa").hide();
		}else{
			$("#div_pa").show();
			$("#pa").hide();
			$("#descPa").show();
		}

		if($("#infoCheckCard").val() == "true"){
			$("#checkCartao").prop('checked', true);
		}else{
			$("#checkCartao").prop('checked', false);
		}
		document.getElementById('checkCartao').disabled = true;
	}

	if(STAGE == 15){
		if(MODE == "VIEW"){
			$("#btAddChildTable").hide();
			$(".fluigicon-trash").hide();
			
			if($("#aux_pa").val() == "N"){
				$("#div_pa").hide();
			}else{
				$("#div_pa").show();
				$("#pa").hide();
				$("#descPa").show();
			}
		}else{
			$("#btAddChildTable").show();
			$(".fluigicon-trash").show();
			
			if($("#totalPA").val() != "0"){
				$("#div_pa").show();
			}
		}

		if($("#infoCheckCard").val() == "true"){
			$("#checkCartao").prop('checked', true);
		}else{
			$("#checkCartao").prop('checked', false);
		}

		$('.btn-lg').attr('data-toggle','');
		$("#justificativaFinanceiro").attr('disabled', true);

		$("#div_financeiro").show();
	}

	if(STAGE == 34 || STAGE == 25 || STAGE == 43 || STAGE == 45 ||STAGE == 65){
		$(".fluigicon-trash").hide();
		$("#btAddChildTable").hide();
		// $(".bpm-mobile-trash-column").hide();

		if($("#aux_pa").val() == "N"){
			$("#div_pa").hide();
		}else{
			$("#div_pa").show();
			$("#pa").hide();
			$("#descPa").show();
		}

		if($("#infoCheckCard").val() == "true"){
			$("#checkCartao").prop('checked', true);
		}else{
			$("#checkCartao").prop('checked', false);
		}
		document.getElementById('checkCartao').disabled = true;
	}

}

// var indice; 

// $(document).ready(function() {
// 	var verificaCodigo = $("#aux_codigo___" + indice).val();
// 	if(verificaCodigo == 204013){
// 		    // $('#qtd___' + index).removeAttr('readonly', 'readonly');
// 			$('#qtd___' + indice).css('display', 'block');
// 			// $('#cpValor___' + index).attr('readonly', 'readonly');
// 			// $('#cpValor___' + index).removeClass('money')
// 	}


// });

// $("#btAddChildTable").click(function() {
// 	var i = wdkAddChild('tblItem');

// 	$("#tblItem thead tr:not(first-child) th, #tblItem tbody tr:not(first-child) td").each(function(){
// 		$(this).removeClass("hide");
// 	});

// 	FLUIGC.slider.init('#cpQualidade1___'+i);
// 	FLUIGC.slider.init('#cpQualidade2___'+i);
// 	FLUIGC.slider.init('#cpQualidade3___'+i);
// 	FLUIGC.slider.init('#cpQualidade4___'+i);

// });


$(document).ready(function(){
    if (FORM_MODE == 'VIEW') {
        $('#div_pa').css('display', 'block');
    }
});

function validateCard(){
	if($("#checkCartao").is(":checked")){
		$("#infoCheckCard").val("true");
	}else{
		$("#infoCheckCard").val("false");
	}
}

function calendario() {
	var calendario = FLUIGC.calendar('.calendario');
}



// function aprovadorApv(){
// 	$('#aux_aprovador').val("aprovado");
// 	$("#div_justificaAprovador").fadeOut();
// 	$('#motivoAprovador').val("");
// } 

// function aprovadorRpv(){
// 	$('#aux_aprovador').val("reprovado");
// 	$("#div_justificaAprovador").fadeIn();
// }



function mascara() {
	// tableInauguracao();
	// $('#valorKM').val(1, 48);
	var valor = $(".money");
	valor.mask('#00000000000000,00', { reverse: true });

	// $(document).on('blur', '.money', function () {
	// if ($(this).val() != "") {
	// 	$(this).val(formatMoney($(this).val().toString(), 2, ',', '.'));
	// 	// somarValorDespesa();

	// }
	// });

	// $(document).on('focus', '.money', function () {
	// 	$(this).val($(this).val().replace(/\./g, ""));
	// 	$(this).mask('999999999999999,99');
	// });

}

function formatMoney(valor, arredondamento, separadorDecimal, separadorMilhar) {
	if (valor.indexOf(",") > -1) {
		valor = valor.replace(/\./g, "");
		valor = valor.replace(/\,/g, ".");
	}

	var divisorMilhar = 3;
	var re = '\\d(?=(\\d{' + (divisorMilhar || 3) + '})+' + (arredondamento > 0 ? '\\D' : '$') + ')';
	var num = parseFloat(valor).toFixed(Math.max(0, arredondamento));
	num = num.toString();

	// var retorno = (separadorDecimal ? num.replace('.', separadorDecimal) : num).replace(new RegExp(re, 'g'), '$&' + (separadorMilhar || ''));
	var retorno = (separadorDecimal ? num.replace('.', separadorDecimal) : num);
	return retorno;
};

var formatNumberBR2EN = function (value) {
	if (value == undefined || value == null) return value;
	value = value.toString();
	value = value.split('.').join('');
	value = value.replace(',', '.');
	return value;
}

function somarValorDespesa() {
	var total = 0;
	var valorNovo = 0;
	$("#tblItem").find("input[id^='cpValor']").each(function () {
		valorNovo = formatNumberBR2EN($(this).val());
		// var verificaCodigo = $("#aux_codigo").val();

		if (valorNovo != "") {
			total = total + parseFloat(valorNovo);
		}
	});

	total = total.toFixed(2);
	$("#totalTitulo").val(formatMoney(total.toString(), 2, ",", "."));
	total.toString()
	var valor = total.replace(",", ".");
	valor = parseFloat(valor)
	$("#aux_total_titulo").val(valor)
	mascara()

	// $("#totalTitulo").val(formatMoney(total.toString(),1,","));
}



function tableInauguracao() {

	// var dataset = solicitacaoPorProcesso();
	// montaDatatable(dataset);   
}

function montaDatatable(dataset) {

	var that = this;

	if (dataset) {

		var valorDataset = dataset.values;
		that.mydata = [];

		for (var index in valorDataset) {

			var record = valorDataset[index];

			that.mydata.push({
				Cod_Reembolsado: record.Cod_Reembolsado,
				Valor: record.Valor,
			});
		}
	}

	that.myTable = FLUIGC.datatable('#datatablePA', {
		dataRequest: that.mydata,
		multiSelect: true,
		//classSelected: 'danger',
		select: false,
		offset: 0,
		renderContent: ['Cod_Reembolsado', 'Valor'],
		header: [
			{ 'title': 'Código Reembolsado', 'size': 'col-md-2 center', 'text-align': 'center' },
			{ 'title': 'Valor', 'size': 'col-md-2 center', 'text-align': 'center' },

		],
		search: {
			enabled: false,
		},
		scroll: {
			target: ".datatablePA",
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

function solicitacaoPorProcesso() {

	var dataset = DatasetFactory.getDataset("ds_pa", null, null, null);
	return dataset
}

function adicionarLinha() {
	var linha = wdkAddChild('tblItem');
	// $("#qtd___"+linha).val(1.0);
	var inputs = $("[mask]");
	MaskEvent.initMask(inputs);//Atualiza os campos com 'mask'
		
	var param  = "Despesa "+linha+"";	
	$("#btnTeste___"+linha+"").attr("onclick","showCamera('"+param+"')");
}



function consultaSaldo() {

	// FLUIGC.toast({
	//     title: '',
	//     message: "teste",
	//     type: 'danger'
	// });

	var saldoPA = $('#aux_total_pa').val()
	saldoPA = parseFloat(saldoPA);
	console.log(saldoPA)

	var saldoTitulo = $("#aux_total_titulo").val()
	saldoTitulo = parseFloat(saldoTitulo);
	console.log(saldoTitulo)


	if (saldoPA > saldoTitulo) {
		// alert("O titulo sera compensado e o reembolsado ainda ficara com um saldo devedor")
		FLUIGC.toast({
			title: '',
			message: "O titulo sera compensado e o reembolsado ainda ficara com um saldo devedor",
			type: 'danger'
		});
		$("#condicaoPA").val("compensa")
	} else if (saldoTitulo > saldoPA) {
		// alert("O titulo será compensado e o reembolsado recebera o saldo restante")
		FLUIGC.toast({
			title: '',
			message: "O titulo será compensado e o reembolsado recebera o saldo restante",
			type: 'success'
		});
	} else if (saldoPA === saldoTitulo) {
		// alert("O titulo será compensado e com isso o saldo do reembolsado ficara zerado")
		FLUIGC.toast({
			title: '',
			message: "O titulo será compensado e com isso o saldo do reembolsado ficara zerado",
			type: 'info'
		});
	}

}

function Condicao() {

	var saldoPA = $('#aux_total_pa').val()
	saldoPA = parseFloat(saldoPA);
	console.log(saldoPA)

	var saldoTitulo = $("#aux_total_titulo").val()
	saldoTitulo = parseFloat(saldoTitulo);
	console.log(saldoTitulo)


	if (saldoPA > saldoTitulo) {
		// alert("O titulo sera compensado e o reembolsado ainda ficara com um saldo devedor")
		$("#condicaoPA").val("compensa")
	} else if (saldoTitulo > saldoPA) {
		// alert("O titulo será compensado e o reembolsado recebera o saldo restante")
		$("#condicaoPA").val("titulo")
	} else if (saldoPA === saldoTitulo) {
		// alert("O titulo será compensado e com isso o saldo do reembolsado ficara zerado")
		$("#condicaoPA").val("compensa")
	}

}

function infoPa(op){
	$("#aux_pa").val(op);

	if(op == "S"){
		$("#descPa").val("Sim");
	}else{
		$("#descPa").val("Não");
	}

	console.log($("#aux_pa").val());
}

// function adicionarLinhaEspecialidade(){
// 	var index = wdkAddChild('tbEspecialidade');
// 	var numero = 1.0/4.0;
// 	 parseFloat($("#tempoMinimo___"+index).val(numero));
// 	 parseFloat($("#tempoMaximo___"+index).val(24.0));
// 	 var inputs = $("[mask]");
//      MaskEvent.initMask(inputs); //Atualiza os campos com 'mask'
// }

// ========================== Aprovador ===============================

// function mostraJustificativa(obj){

// 	var div = $("#div_swtButtonAprovador").find("div");
// 	var _justifica = $("#_motivoAprovador").val();
// 	var justifica = $("#motivoAprovador").val();

// 	if(justifica != '' || _justifica != ''){
// 		$('#div_justificaAprovador').css('display', 'block');
// 	}

// 	$("#div_swtButtonAprovador ").change(function(){		
// 		if(!div.hasClass("btn-danger")){	
// 			console.log('limpa campo')
// 			$("#div_justificaAprovador").fadeOut();
// 			$('#motivoAprovador').val("");
// 			$('#aux_aprovador').val("aprovado");
// 		}else{			
// 			console.log('reprovado')
// 			$("#div_justificaAprovador").fadeIn();
// 			$('#aux_aprovador').val("reprovado");
// 		}
// 	});
// }

// ================================ Aprovador =========================	


function mostraJustificativaFinanceiro(obj) {

	var div = $("#div_swtButtonFinanceiro").find("div");
	var _justifica = $("#_justificativaFinanceiro").val();
	var justifica = $("#justificativaFinanceiro").val();

	if (justifica != '' || _justifica != '') {
		$('#div_justificaFinanceiro').css('display', 'block');
	}

	$("#div_swtButtonFinanceiro ").change(function () {
		if (!div.hasClass("btn-danger")) {
			console.log('limpa campo')
			$("#div_justificativaFinanceiro").fadeOut();
			$('#justificativaFinanceiro').val("");
			$('#aux_financeiro').val("aprovado");
		} else {
			console.log('reprovado')
			$("#div_justificativaFinanceiro").fadeIn();
			$('#aux_financeiro').val("reprovado");
		}
	});
}

function setSelectedZoomItem(selectedItem) {

	if (selectedItem.inputId == "cpReembolsado") {
		$('#cpCpf').val(selectedItem["CPF"]);
		$('#cpConta').val(selectedItem["Num_Conta"]);
		$('#cpBanco').val(selectedItem["Banco"]);
		$('#cpAgencia').val(selectedItem["Agencia"]);
		$('#codReembolsado').val(selectedItem["Cod_Reembolsado"]);
		$('#centroCusto').css('display', 'block');
		var cod = selectedItem["Cod_Reembolsado"]
		var dataset = consultaCod(cod);
		somaDataset();

		if ($("#aux_total_pa").val() != 0) {
			// $("#pa2").prop('checked', false)
			$("#div_pa").css('display', 'block')
			// $("#pa1").attr('checked', 'true')
			// $("#div_pa").show();
			$("#aux_pa").val("");

		} else if ($("#aux_total_pa").val() == 0) {
			$("#div_pa").css('display', 'none')
			// $("#div_pa").hide()
			$("#pa2").attr('checked', 'true');
			$("#aux_pa").val("N");
		}


		console.log(dataset);
		// var dataset = solicitacaoPorProcesso();
		montaDatatable(dataset);
		return dataset;
		// init();

	}

	if (selectedItem.inputId == "cpCentroCusto") {


		$('#aprovadorA').val(selectedItem["cpfAprovadorUm"]);
		$('#aprovadorB').val(selectedItem["cpfAprovadorDois"]);
		var codCusto = selectedItem["codCusto"].trim();
		$('#aux_codCusto').val(codCusto);
		var um = selectedItem["cpfAprovadorUm"]
		var dois = selectedItem["cpfAprovadorDois"]
		var cpf = $('#cpCpf').val().trim();
		

		console.log(cpf);

		if (cpf == um) {
			$('#aprovadorCerto').val(dois);
		}

		else {
			$('#aprovadorCerto').val(um);
		}

	}


	var index = selectedItem.inputId.split("___")[1];

	if (selectedItem.inputId == "cpTipoDespesa___" + index) {
		$('#aux_codigo___' + index).val(selectedItem["ED_CODIGO"]);
		var verifica = selectedItem["ED_CODIGO"];
		// var verificaCodigo = $("#aux_codigo___" + index).val();
		// var passando = calcula(index);

		if (verifica == 204013) {
			$('#qtd___' + index).removeAttr('readonly', 'readonly');
			$('#qtd___' + index).css('display', 'block');
			$('#cpValor___' + index).attr('readonly', 'readonly');
			$('#cpValor___' + index).removeClass('money')


			// $('#totalTitulo').removeAttr('readonly','readonly');
		} else {
			$('#qtd___' + index).attr('readonly', 'readonly');
			$('#cpValor___' + index).removeAttr('readonly', 'readonly');
			$('#cpValor___' + index).addClass('money')
			$('#qtd___' + index).css('display', 'none');
			$('#cpValor___' + index).val("");
			// $("#qtd___"+ index).val(1.0);
		}
	}
}

function removedZoomItem(removedItem){
	if(removedItem.inputId == "cpReembolsado"){
		$('#cpCpf').val("");
		$('#cpConta').val("");
		$('#cpBanco').val("");
		$('#cpAgencia').val("");
		$('#codReembolsado').val("");
	}

	if(removedItem.inputId == "cpCentroCusto"){
		$('#aprovadorA').val("");
		$('#aprovadorB').val("");
		$('#aux_codCusto').val("");
		$('#aprovadorCerto').val("");
	}

	var index = selectedItem.inputId.split("___")[1];
	if(removedItem.inputId == "cpTipoDespesa___"+ index){
		$('#aux_codigo___' + index).val("");
	}
}

function consultaCod(Cod) {

	if (!Cod) {

		return
	}

	var c1 = DatasetFactory.createConstraint("Cod_Reembolsado", Cod, Cod, ConstraintType.MUST);
	var dataset = DatasetFactory.getDataset("ds_pa", null, [c1], null);

	var dsPo = {
		values: []
	}

	for (var i in dataset.values) {
		if (dataset.values[i].Cod_Reembolsado == Cod) {

			dsPo.values.push({ Cod_Reembolsado: dataset.values[i].Cod_Reembolsado, Valor: dataset.values[i].Valor })



			// return dataset.values[i]

		}
	}

	return dsPo
	// return null;



}

function calcula(obj, value) {

	var index = obj.id.substring(obj.id.indexOf('___') + 3);

	var km = 1.48;
	var resultado = km * value;
	var valorKM = resultado.toString();
	var teste = valorKM.replace('.', ',')
	// parseFloat(teste);

	$('#cpValor___' + index).val(teste);

}



function somaDataset() {

	var codigo = $('#codReembolsado').val();
	console.log(codigo)

	var retorno = consultaCod(codigo);

	var total = 0;

	for (var i = 0; i < retorno.values.length; i++) {
		var valor = retorno.values[i].Valor.trim();
		console.log(valor);

		total = (total + parseFloat(valor));
	}

	console.log(total);
	var totPA = total;
	parseFloat(totPA);
	$("#aux_total_pa").val(totPA)
	totalPA = total.toString();
	totalPA = totalPA.replace('.', ',')

	$("#totalPA").val(totalPA);



}



// function init() {
//     $("input[id^='Valor___']:last").blur(doLineTotal);

// }

// function doLineTotal() {
//     var index = this.id.substring(this.id.indexOf('___') + 3);

//     var quantity = $("#Valor___" + index).val();


//     if (quantity) {
// 		var total = eval(quantity + $('#totalPA').val());
// 		total += parseInt($(this).val()); 
//         $("#totalPA").val(total);
//         doFormTotal();
//     }    
// }

// function doFormTotal() {
//     var total = 0;
//     $("input[id^='total___']").each(function() {
//         if ($(this).val()) {
//             total += parseInt($(this).val()); 
//         }
//     });
//     $("#totalPA").val(total);
// }



function fnCustomDelete(oElement) {
	fnWdkRemoveChild(oElement);
	somarValorDespesa();
	//doFormTotal();
}

// function validaAprovador(){

// 	var aprovadorA = $('#cpfAprovadorUm').val();
// 	var aprovadorB = $('#cpfAprovadorDois').val();
// 	var cpf = $('#cpCpf').val();

// 	if (cpf == aprovadorA) {
// 		$('#aprovadorCerto').val(aprovadorB);
// 	}else{
// 		$('#aprovadorCerto').val(aprovadorA);
// 	}
// }

// function carregaArquivo() {
	//    window.parent.$('button[data-attachments-load]').click();
	// window.parent.$('#ecm-navigation-inputFile-clone').click();
	// window.parent.$('ecm-navigation-inputFile-clone').first().click();
// }

// function showCamera(obj) {
// 	// console.log(obj);
// 	// console.log(value);

// 	var tr = $(obj).parent().parent()[0];
// 	var td = $(tr).find('td')[3];
// 	var input = $(td).find('input')[0];
// 	var descricao = $(input).val();
// 	var index = $(input).attr('id');
// 	index = index.split("_");
// 	index = index[index.length - 1];
	
// 	var param = "";
// 	if(descricao){
// 		param =  descricao; 
// 	}
// 	else{
// 		param  = "Despesa "+index+" ";
// 	}
	
// 	JSInterface.showCamera(obj);
// }

function showCamera(param) {
	
	JSInterface.showCamera(param);
	// JSInterface.showCamera();
}


// $("#carrega").on("click", function(){
// 	attrBtn.push($(this).attr('name'));

// 	// Se houver 2 cliques, verifique se foi no mesmo botão


// 			// window.parent.$('button[data-send]').first().click();
// 			window.parent.$('button[data-send]').first().click();



// });



// function setSelectedZoomItem(selectedItem) {
// 	if (selectedItem.inputId == "cpPedidoItem") {
// 		var cod = $(this).val().split(".");
// 		if(cod[0] == "10"){
// 			$("#tblItem tr:not(first-child) th, #tblItem tr:not(first-child) td").each(function(){
// 				$(this).removeClass("hide");
// 				FLUIGC.slider.init('.slider');
// 			});
// 		}
// 	}

// 	if (selectedItem.inputId == "cpEmitente") {
// 		$("#cpEmitenteDesc").val(selectedItem.nomeEmit);
// 		$("#cpCodEmitente").val(selectedItem.codEmitente);

// 		console.log("codEmitente", selectedItem.codEmitente);

// 		setTimeout(function(){
// 			reloadZoomFilterValues("cpPedido", "pCodEmitente," + selectedItem.codEmitente+","+ selectedItem.codEmitente);
// 		},1000);

// 	}



// }


// =================================================
// EXIBE FUNÇÃO showCamera
// =================================================

var btnShowCamera = function(){
	$("a[id^=btnTeste]").each(function(){
		var tr = $(this).parent().parent()[0];
		var td = $(tr).find('td')[3];
		var input = $(td).find('input')[0];		
		var index = $(input).attr('id');
		index = index.split("_");
		index = index[index.length - 1];

		var param  = "Despesa "+index+"";	
		$(this).attr("onclick","showCamera('"+param+"')");
	});
}