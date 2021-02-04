  // $(document).ready(function () {
  //       $("#tempoExecucao").mask("99:99");
  //   });


    

$(document).ready(function(){
	buscaUsuario();
	verificaQuantidade();
	 // $("#tempoExecucao").mask("99:99");
	// verificaMensagem();
	

	



	var attrBtn = [];

	// botao aprovador
	$("#botaoAprovado button").on("click", function(){
		attrBtn.push($(this).attr('name'));
		
		// Se houver 2 cliques, verifique se foi no mesmo botão
		if(attrBtn.length == 2){
			if(attrBtn[0] == attrBtn[1]){
				window.parent.$('button[data-send]').first().click();
				attrBtn = [];
			}else{
				var aux = attrBtn[1];
				attrBtn = [];
				attrBtn.push(aux);
				aux = "";
			}
		}
	});
	
	$('#botaoAprovado button').click(function(){

		// ->> Efeito de ativar/desativar botao
		$('#botaoAprovado button.active').removeClass('active');
		$(this).toggleClass('active');

		// ->> Recebe o valor se foi aprovado/reprovado e gravar no input auxiliar
		var resultado = $(this).attr('name');
		$('#auxAprovador').val(resultado);

	});

	$('#botaoAprovado').click(function() {
		if ($('#auxAprovador').val() == "aprovado") {
			$('#divMotivo_revisor').css('display', 'none');															
		}else if ($('#auxAprovador').val() == "reprovado") {
				$('#divMotivo_revisor').css('display', 'block');															
		}
	});

	// botao adquirir ou contratar
	var attrBtn = [];

	$("#botaoContratar button").on("click", function(){
		attrBtn.push($(this).attr('name'));
		
		// Se houver 2 cliques, verifique se foi no mesmo botão
		if(attrBtn.length == 2){
			if(attrBtn[0] == attrBtn[1]){
				window.parent.$('button[data-send]').first().click();
				attrBtn = [];
			}else{
				var aux = attrBtn[1];
				attrBtn = [];
				attrBtn.push(aux);
				aux = "";
			}
		}
	});
	
	$('#botaoContratar button').click(function(){

		// ->> Efeito de ativar/desativar botao
		$('#botaoContratar button.active').removeClass('active');
		$(this).toggleClass('active');

		// ->> Recebe o valor se foi aprovado/reprovado e gravar no input auxiliar
		var resultado = $(this).attr('name');
		$('#auxAdquirir').val(resultado);
	});

	// botao necessita compra
		var attrBtn = [];

		$("#botaoNecessita button").on("click", function(){
			attrBtn.push($(this).attr('name'));
			
			// Se houver 2 cliques, verifique se foi no mesmo botão
			if(attrBtn.length == 2){
				if(attrBtn[0] == attrBtn[1]){
					window.parent.$('button[data-send]').first().click();
					attrBtn = [];
				}else{
					var aux = attrBtn[1];
					attrBtn = [];
					attrBtn.push(aux);
					aux = "";
				}
			}
		});
		
		$('#botaoNecessita button').click(function(){

			// ->> Efeito de ativar/desativar botao
			$('#botaoNecessita button.active').removeClass('active');
			$(this).toggleClass('active');

			// ->> Recebe o valor se foi aprovado/reprovado e gravar no input auxiliar
			var resultado = $(this).attr('name');
			$('#auxNecessitaCompra').val(resultado);
	});

			var attrBtn = [];

			$("#botaoAntecipa button").on("click", function(){
				attrBtn.push($(this).attr('name'));
				
				// Se houver 2 cliques, verifique se foi no mesmo botão
				if(attrBtn.length == 2){
					if(attrBtn[0] == attrBtn[1]){
						window.parent.$('button[data-send]').first().click();
						attrBtn = [];
					}else{
						var aux = attrBtn[1];
						attrBtn = [];
						attrBtn.push(aux);
						aux = "";
					}
				}
			});
			
			$('#botaoAntecipa button').click(function(){

				// ->> Efeito de ativar/desativar botao
				$('#botaoAntecipa button.active').removeClass('active');
				$(this).toggleClass('active');

				// ->> Recebe o valor se foi aprovado/reprovado e gravar no input auxiliar
				var resultado = $(this).attr('name');
				$('#auxAntecipa').val(resultado);
		});

});

// remove linha da tabela
function retirarLinhaExternos(elemento){
	fnWdkRemoveChild(elemento);
}

function retirarLinhaEspecialidade(elemento){
	fnWdkRemoveChild(elemento);
}

function retirarLinhaItem(elemento){
	fnWdkRemoveChild(elemento);
}

// função botão adicionar linha na tabela 
function adicionarLinha(){
	 var linha = wdkAddChild('tbPlanejaManutencao');
	 var inputs = $("[mask]");
     MaskEvent.initMask(inputs); //Atualiza os campos com 'mask'
}

function adicionarLinhaEspecialidade(){
	var index = wdkAddChild('tbEspecialidade');
	var numero = 1.0/4.0;
	 parseFloat($("#tempoMinimo___"+index).val(numero));
	 parseFloat($("#tempoMaximo___"+index).val(24.0));
	 var inputs = $("[mask]");
     MaskEvent.initMask(inputs); //Atualiza os campos com 'mask'
}

function adicionarLinhaItem(){
	var linha = wdkAddChild('tbItem');
	var idEstabelecimento =  $('#estabelecimento_iD').val();
	console.log("Id do estabelecimento =  " + idEstabelecimento);
	reloadZoomFilterValues("item___" + linha, "idEstab," + idEstabelecimento);
	MaskEvent.initMask(inputs); //Atualiza os campos com 'mask'

}

function calendario(){
	var calendario  = FLUIGC.calendar('.calendario');
}

function necessitaCompra(value){
	console.log(value)
	if( value == 'sim'){
		console.log("entro no if")
		$("#div_antecipa").css('display', 'block');
	}else{
		$("#div_antecipa").css('display', 'none');
	}
}

function validaSaldo(value){
	var descricao =  $('#item').val();
	console.log(value +"  "+ descricao );
	var c1 = DatasetFactory.createConstraint('descricao', descricao, descricao, ConstraintType.MUST);
	var constraint = new Array(c1);
	var dataset = DatasetFactory.getDataset('ds_zoom_item', null, constraint, null);

	console.log(dataset);
	for(var i = 0; i <dataset.values.length; i++){
		var saldo = dataset.values[i]['quantidade'];
	}

	console.log(value);
	console.log(saldo);
	if(value > saldo){
		$("#compra").css('display', 'block');
	}
}

function setSelectedZoomItem(selectedItem) {


	if(selectedItem.inputId == "descricaoEquipamento"){
			$('#descricaoEquipamento_aux').val(selectedItem["Código"]);
			$('#descEquipto_aux').val(selectedItem["Descrição"]);
			console.log('teste');
	}

	if(selectedItem.inputId == "manutencao"){
			$('#manutencao_aux').val(selectedItem["Código"]);
	}

    var index = selectedItem.inputId.split("___")[1];
	if(selectedItem.inputId == "tbEspecialidade___"+index){
			$('#tbEspecialidade_aux___'+index).val(selectedItem["Código"]);
	}

	if(selectedItem.inputId == "estabelecimento"){
			$('#estabelecimento_aux').val(selectedItem["Nome"]);
	}


	// if(selectedItem.inputId == "item___" + linha){
	// 	$('#item_aux___'+ linha).val(selectedItem["Código"]);
	// 	$('#item_quantidade___'+ linha).val(selectedItem["Quantidade Atual"]);

	// }

	var index = selectedItem.inputId.split("___")[1];	
		if(selectedItem.inputId == "item___"+index){
	         $("#item_aux___"+index).val(selectedItem["Código"]);
	         $("#item_quantidade___"+index).val(selectedItem["Quantidade Atual"]); 
	         validaTable(selectedItem);                    
	          }



	if(selectedItem.inputId == "planejador"){
			$('#planejador_aux').val(selectedItem["Código"]);
	}

	if(selectedItem.inputId == "equipe"){
			$('#equipe_aux').val(selectedItem["Código"]);

	}if(selectedItem.inputName == "estabelecimento"){
			
			$('#estabelecimento_iD').val(selectedItem["Código Estabelecimento"]);
			console.log("Id do estabelecimento"+ selectedItem["Código Estabelecimento"]);

	}



}

function verificaQuantidade(value){
	var qtdSelecionada = 0;
	qtdSelecionada = parseFloat($("#item_quantidade").val());
	console.log(qtdSelecionada);
	var qtdDigitada = 0;
	qtdDigitada = parseFloat(value);
	console.log(qtdDigitada);

	if(qtdSelecionada < qtdDigitada) {
		console.log("dentro ")
		$('#necessita_compra').val("Sim");

	}else{
		$('#necessita_compra').val("Não");
	}
}


function verificaMensagem(){
	var str = $('#msInteira').val();
	var mensagem = str.split("ExecBOServiceException:");
	console.log(mensagem);
	$('#msErro').val(mensagem[1]);
}

function buscaUsuario(){
 
 var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", $("#solicitanteId").val(), $("#solicitanteId").val(), ConstraintType.MUST);
 var constraints = new Array(c1);
 var colaborador = DatasetFactory.getDataset("colleague", null, constraints, null);
 console.log(colaborador);
 return colaborador; 
}

// function carregaZoom(){

// 	console.log("------------- Entrou na Function");

// 	var linha = wdkAddChild('tbItem');
// 	var idEstabelecimento =  $('#estabelecimento_iD').val();
// 	console.log("Id do estabelecimento =  " + idEstabelecimento);
// 	reloadZoomFilterValues("tbItem", "idEstab," + idEstabelecimento);
	

// } 
