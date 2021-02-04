$(document).ready(function() {
	var SeqProcesso		= document.getElementById("seqProcesso").value;
	var teste = (124231.45).toLocaleString('pt-BR');

	if($("#slc_moeda").val() == "1"){
		$(".divDolar").addClass('hide');
		$(".divReal").removeClass('hide');		
	}else if($("#slc_moeda").val() == "2"){
		$(".divDolar").removeClass('hide');
		$(".divReal").addClass('hide');		
	}

	$("#slc_moeda").change(function(){
		var valor = this.value;
		if(valor == "1"){
			$(".divDolar").addClass('hide');
			$(".divReal").removeClass('hide');
		}else if(valor == "2"){
			$(".divDolar").removeClass('hide');
			$(".divReal").addClass('hide');
		}
	});

	$("#valor").change(function(){
		var valorReal = this.value;
			valorReal = valorReal.replace('.','');
		var dolar = valorDolar();
		var conversao = parseInt(valorReal) * parseFloat(dolar);

		var valorTrat = conversao.toFixed(2);

		$("#valorDolar").val(CurrencyFormat(valorTrat).replace("R$","").trim());
		
		$("#passouFunc").val("sim");
	
	});

	$("#valorDolar").change(function(){
		var valorReal = this.value;
			valorReal = valorReal.replace('.','');
		var dolar = valorDolar();
		var conversao = parseInt(valorReal) *  parseFloat(dolar);

		var valorTrat = conversao.toFixed(2);


		$("#valor").val(CurrencyFormat(valorTrat).replace("R$","").trim());
		$("#passouFunc").val("sim");

		

	});



	function valorDolar(){
		var data = moment().format("YYYYMMDD");
		var c1 = DatasetFactory.createConstraint("dataatual", data, data, ConstraintType.MUST);
		var constraints = new Array(c1);
		var dataset = DatasetFactory.getDataset("ds_moeda_qr", null, constraints, null);
				
			var dolar = dataset.values[0].M2_MOEDA2;

			// validar dolar == "" || == null
		  
		return dolar;
	}


	$( "#dataNecessidade" ).blur(function() {
		
		var dataAtual = new Date();
		
		var dataNecessidade = new Date(document.getElementById("dataNecessidade").value);
		dataNecessidade.setDate(dataNecessidade.getDate() + 1);

		if (dataNecessidade < dataAtual){
			FLUIGC.toast({
		        title: 'Ops: ',
		        message: 'Data da necessidade deve ser superior a data atual',
		        type: 'warning'
		    });

			$("#dataNecessidade").val('');
		}else{
			aData = document.getElementById("dataNecessidade").value.split("-");

			cDataNecessidade = aData[0] + aData[1] + aData[2];
			
			$("#dtFiltroNecessidade").val(cDataNecessidade);
			
			validSete();
		}

	});
	
	$( "#valor" ).change(function() {
		
		var cValor	= document.getElementById("valor").value;

		console.log("ANTES DE TRATAR = "+ cValor);

		cValor = cValor.split(".").join("");
		cValor = cValor.split(",").join(".");
		
		console.log("valor " + cValor);
		
		$("#valorTratado").val(cValor);
		
	});

	$( "#valorDolar" ).change(function() {
		
		var cValor	= document.getElementById("valorDolar").value;
		
		cValor = cValor.split(".").join("");
		cValor = cValor.split(",").join(".");
				
		console.log("valor  dolar" + cValor);
		
		$("#valorTratado").val(cValor);
		
	});


	
	//DESABILITAR CAMPOS SELECT
	if (SeqProcesso != 0){
		//$("#tipoPagamento").prop("disabled", true);
		
		if (document.getElementById("cpValidSete").value == '1'){
			$("#divSeteDias").show();
		}else{
			$("#divSeteDias").hide();
		}

		if (document.getElementById("cpValidSessenta").value == '1'){
			$("#divSessentaDias").show();
		}else{
			$("#divSessentaDias").hide();
		}
		
		var cTipo	= document.getElementById("tipoPagamento").value;
		
		if (cTipo == "Banco"){
        	$("#divBanco").show();
        }else{
        	$("#divBanco").hide();
        }
		
	}else{
		
		$("#divBanco").hide();
		
		$("#divSessentaDias").hide();
		
		$("#divSeteDias").hide();
		
	}
	
	if (SeqProcesso == 8){
		$("#divOrigemBanco").show();
	}else{
		$("#divOrigemBanco").hide();
	}
	
	if (SeqProcesso == 5){
		$("#divAprovacao").show();
	}else{
		$("#divAprovacao").hide();
	}
	
});

function strzero(cStrAjusta,nCasas){

	while (cStrAjusta.length <  nCasas) {
		cStrAjusta = "0" + cStrAjusta;
	}

	return cStrAjusta;	
}

function setSelectedZoomItem(selectedObj) {
	if(selectedObj.inputId == "fornecedor") {
		$("#codFornecedor").val(selectedObj.CODIGO);
		$("#loja").val(selectedObj.LOJA);
		
		var cConsFor = DatasetFactory.createConstraint("fornecedor",
				selectedObj.CODIGO, selectedObj.CODIGO, ConstraintType.MUST);
		
		var cConsLoja = DatasetFactory.createConstraint("loja",
				selectedObj.LOJA, selectedObj.LOJA, ConstraintType.MUST);
		
		var dsRetorno = DatasetFactory.getDataset("ds_banco_qr", null, [ cConsFor, cConsLoja ], null);
		
		$("#idbanco").val(dsRetorno.values[0].A2_BANCO);
		$("#agencia").val(dsRetorno.values[0].A2_AGENCIA);
		$("#conta").val(dsRetorno.values[0].A2_NUMCON);
		
		//reloadZoomFilterValues("idbanco", "codFornecedor, "+selectedObj.CODIGO + ", codLoja, " + selectedObj.LOJA);
	}
	
	if(selectedObj.inputId == "centrocusto") {
		$("#codCC").val(selectedObj.CTT_CUSTO);

		validCompensacao(selectedObj.CTT_CUSTO);
	}
	
	if(selectedObj.inputId == "natureza") {
		$("#codNatureza").val(selectedObj.ED_CODIGO);
	}
	
	if(selectedObj.inputId == "idbanco") {
		$("#agencia").val(selectedObj.A2_AGENCIA);
		$("#conta").val(selectedObj.A2_NUMCON);
	}
	
	if(selectedObj.inputId == "idbancoOrigem") {
		$("#agenciaOrigem").val(selectedObj.A6_AGENCIA);
		$("#contaOrigem").val(selectedObj.A6_NUMCON);
	}
	
	if(selectedObj.inputId == "tipoPagamento") {
		if (selectedObj.Tipo == "Banco"){
        	$("#divBanco").show();
        }else{
        	$("#divBanco").hide();
        }
	}
	
}

function removedZoomItem(removedItem) {
	if(removedItem.inputId == "idbancoOrigem") {
		$("#agenciaOrigem").val("");
		$("#contaOrigem").val("");
	}
	
	if(removedItem.inputId == "fornecedor") {
		$("#idbanco").val('');
		$("#agencia").val('');
		$("#conta").val('');
	}
	
	if(removedItem.inputId == "centrocusto") {
		$("#divSessentaDias").hide();
	}
}

function validSete(){
	var cDtNecessidade 	= document.getElementById("dataNecessidade").value;
	
	var dia = cDtNecessidade.substring(8,10);
	var mes = cDtNecessidade.substring(5,7);
	var ano = cDtNecessidade.substring(0,4);
	
	var cDtValidar = dia + "/" + mes + "/" + ano;
	
	var cConsDt = DatasetFactory.createConstraint("data",
			cDtValidar, cDtValidar, ConstraintType.MUST);
	
	var dsRetorno = DatasetFactory.getDataset("ds_validNecessidade", null, [ cConsDt ], null);

	if (dsRetorno.values.length > 0){
		
		if (dsRetorno.values[0].retorno == '1'){
			$("#divSeteDias").show();
			$("#cpValidSete").val("1");
			$("#cpValidSeteApp").val("Sim");
		}else{
			$("#cpValidSete").val("0");
			$("#cpValidSeteApp").val("Não");
			$("#divSeteDias").hide();
		}

	}
}

function validCompensacao(cCc){
	var cConsCc = DatasetFactory.createConstraint("centrocusto",
			cCc, cCc, ConstraintType.MUST);

	var dsRetorno = DatasetFactory.getDataset("ds_validPA", null, [ cConsCc ], null);

	if (dsRetorno.values.length > 0){
		
		if (dsRetorno.values[0].retorno == '1'){
			$("#divSessentaDias").show();
			$("#cpValidSessenta").val("1");
			$("#cpValidSessentaApp").val("Sim");
		}else{
			$("#cpValidSessenta").val("0");
			$("#cpValidSessentaApp").val("Não");
			$("#divSessentaDias").hide();
		}

	}
}


function CurrencyFormat(value) {
	return new Number(value).toLocaleString("ptb",{
	  style: "currency",
	  currency: "BRL"
	})
  }
