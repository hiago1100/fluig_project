$(document).ready(function() {
	
	calcularHoras();	
	calcularIndisponibilidade();
	addChild();	
	setSelectedZoomItem();
	aprovadoresProcesso();
	addRow();
	validarCampo();

		

});

function calcularHoras() {
	var total = 0;
	var data = new Date();
	var dia = data.getUTCDate();
	var mes = data.getMonth();
	var ano = data.getUTCFullYear();	
	
	if (mes < 10) {
		
		mes =  mes + 1;
		mes = "0" + mes;
	}
	
	 $( "#txt_dataInicial" ).attr('min',ano + '-' + mes + '-' + dia + 'T00:00:00');
	 $( "#dt_dataFinal" ).attr('min',ano + '-' + mes + '-' + dia + 'T00:00:00');
	
	  var dt1 = $('#txt_dataInicial').val();
	  var dt2 = $('#dt_dataFinal').val();
	  
	  
	  var total = calcularDiferenca(dt1,dt2);
	  
	 $('#txt_totalHoras').val(total);	 
	  
	  
}

function calcularIndisponibilidade() {
	var total = 0;
	var data = new Date();
	var dia = data.getUTCDate();
	var mes = data.getMonth();
	var ano = data.getUTCFullYear();	
	
if (mes < 10) {
		
		mes =  mes + 1;
		mes = "0" + mes;
	}
	
	 $( "#indisponibilidade_dataInicial" ).attr('min',ano + '-' + mes + '-' + dia + 'T00:00:00');
	 $( "#indisponibilidade_dataFinal" ).attr('min',ano + '-' + mes + '-' + dia + 'T00:00:00');
	  
	  var dt1 = $('#indisponibilidade_dataInicial').val();
	  var dt2 = $('#indisponibilidade_dataFinal').val();
	  
	  
	  var total = calcularDiferenca(dt1,dt2);
	  
	 $('#indisponibilidade_totalHoras').val(total);	 
	  
	  
	}
	
	function calcularDiferenca(dt1, dt2){
			
		  var dtInicial  = new Date(dt1);
		  var dtFinal =  new Date(dt2);

		  var ms = moment(dtFinal,"DD/MM/YYYY HH:mm").diff(moment(dtInicial,"DD/MM/YYYY HH:mm"));
		  var d = moment.duration(ms);
		  var s = Math.floor(d.asHours()) + ":" + moment.utc(ms).format("mm");
		
		  return s
		}
	
		
	
function init() {
	  //  $("input[id^='data_inicial___']:last").blur(calculoHorasAtividade);
	    $("input[id^='data_final___']:last").blur(calculoHorasAtividade);	
	    
	  //  $("input[id^='dtInicialPlanoDeVolta___']:last").blur(calculoHorasRollBack);
	    $("input[id^='dtFinalPlanoDeVolta___']:last").blur(calculoHorasRollBack);	
	    
	    bloquearDatas();
	    
	    
	   
}

function bloquearDatas() {
	
	    var data = new Date();
		var dia = data.getUTCDate();
		var mes = data.getMonth();
		var ano = data.getUTCFullYear();	
		
	if (mes < 10) {
			
			mes =  mes + 1;
			mes = "0" + mes;
		}
		
	     $("input[id^='data_inicial___']:last").attr('min',ano + '-' + mes + '-' + dia + 'T00:00:00');
	     $("input[id^='data_final___']:last").attr('min',ano + '-' + mes + '-' + dia + 'T00:00:00');
	     
	     $("input[id^='dtInicialPlanoDeVolta___']:last").attr('min',ano + '-' + mes + '-' + dia + 'T00:00:00');
	     $("input[id^='dtFinalPlanoDeVolta___']:last").attr('min',ano + '-' + mes + '-' + dia + 'T00:00:00');
	
	
}

function calculoHorasAtividade() {
   
var index = this.id.substring(this.id.indexOf('___') + 3);  	
var totalHoras = 0;
var total = 0;

	  
		var dt1 = $("#data_inicial___" + index).val();
		var dt2 = $("#data_final___" + index).val();
	  
	  var totalHoras = calcularDiferenca(dt1,dt2);
	  
	  $("#tempoExecucao___" + index).val(totalHoras);
	  totalHorasAtividade();
}

	
function totalHorasAtividade() {
	var total = 0;
	var hora = 0;
	var minuto = 0;
	
    $("input[id^='tempoExecucao___']").each(function() {
      if ($(this).val()) {        	
        total += (parseInt(($(this).val().split(":")[0])*60)+parseInt(($(this).val().split(":")[1])));	        
	    hora = parseInt(total/60);
	    minuto = total%60;
                      
        $("#txt_totalHorasAtividades").val(hora + ":" + minuto);        
        

      }
  }); 
   
	
}


function calculoHorasRollBack() {
	   
	var index = this.id.substring(this.id.indexOf('___') + 3);  	
	var totalHoras = 0;
		  
		  var dt1 = $("#dtInicialPlanoDeVolta___" + index).val();
		  var dt2 = $("#dtFinalPlanoDeVolta___" + index).val();
		  
		  var totalHoras = calcularDiferenca(dt1,dt2);
		  
		  $("#tempoExecucaoPlanoDeVolta___" + index).val(totalHoras);
		  totalHorasRollBack();
	}



function totalHorasRollBack() {
	var total = 0;
	var hora = 0;
	var minuto = 0;
	
    $("input[id^='tempoExecucaoPlanoDeVolta___']").each(function() {
      if ($(this).val()) {        	
        total += (parseInt(($(this).val().split(":")[0])*60)+parseInt(($(this).val().split(":")[1])));	        
	    hora = parseInt(total/60);
	    minuto = total%60;
                      
        $("#totalHorasPlanoDeVolta").val(hora + ":" + minuto);        
        

      }
  }); 
   
	
}



	

function addChild(id){
    var row = wdkAddChild(id); // Adicionar filhos
 
    MaskEvent.init(); // Atualiza os campos com 'mask'   
  	
	
}

function setSelectedZoomItem(selectedItem){
	
	/*if (selectedItem.inputName == "responsavel_Sysadmins") {

		$('#aprovador_sysadmins').val(selectedItem['colleagueId']);
		return;

	}
	
	if (selectedItem.inputName == "responsavel_DBA") {

		$('#aprovador_DBA').val(selectedItem['colleagueId']);
		return;

	}
	
	if (selectedItem.inputName == "responsavel_Telecom") {

		$('#aprovador_Telecom').val(selectedItem['colleagueId']);
		return;

	}
	
	if (selectedItem.inputName == "responsavel_Network") {

		$('#aprovador_Network').val(selectedItem['colleagueId']);
		return;

	}
	
	if (selectedItem.inputName == "responsavel_Seguranca") {

		$('#aprovador_Seguranca').val(selectedItem['colleagueId']);
		return;

	}
	
	if (selectedItem.inputName == "responsavel_Workplace") {

		$('#aprovador_Workplace').val(selectedItem['colleagueId']);
		return;

	}
	
	if (selectedItem.inputName == "responsavel_Desenvolvimento") {

		$('#aprovador_Desenvolvimento').val(selectedItem['colleagueId']);
		return;

	}*/
	
	if (selectedItem.inputName == "responsavel_fornecedor") {

		$('#aprovador_Fornecedor').val(selectedItem['colleagueId']);
		return;

	}
	
	if (selectedItem.inputName == "responsavel_diretoriaTI") {

		$('#aprovador_DiretoriaTI').val(selectedItem['colleagueId']);
		return;

	}
	
	if (selectedItem.inputName == "responsavel_areaNegocios") {

		$('#aprovador_AreaNegocio').val(selectedItem['colleagueId']);
		return;

	}
	
	
	if (selectedItem.inputName == "responsavel_diretoriaNegocios") {

		$('#aprovador_DiretoriaNegocios').val(selectedItem['colleagueId']);
		return;

	}
	
	
}

function aprovadoresProcesso() {
	
	if( $("#numAtividade").val() == 0 || $("#numAtividade").val() == 4 || $("#numAtividade").val() == 18 || $("#numAtividade").val() == 185 || $("#numAtividade").val() == 68 || $("#numAtividade").val() == 25 || $("#numAtividade").val() == 201 || $("#numAtividade").val() == 77 || $("#numAtividade").val() == 32 || $("#numAtividade").val() == 46 || $("#numAtividade").val() == 53 || $("#numAtividade").val() == 106 || $("#numAtividade").val() == 109 || $("#numAtividade").val() == 39 || $("#numAtividade").val() == 132 || $("#numAtividade").val() == 142) {
		
		
		$('#habilitaFornecedor').hide();
		$('#habilitaDiretoriaTI').hide();		
		$('#habilitaDiretoriaNegocios').hide();
			
		
		
		if($('[name="check_aprovador_1"]:checked').val() == "sysadmin") {
			
			$("#aprovacaoSysadmin").val("Sim");	
			
		
		}else {
			
			$("#aprovacaoSysadmin").val("Nao");
		
			
			
		}
		
		if($('[name="check_aprovador_2"]:checked').val() == "DBA") {
			
			$("#aprovacaoDBA").val("Sim");	
		
		
		}else {
			
			$("#aprovacaoDBA").val("Nao");
					
			
			
		}
		
		if($('[name="check_aprovador_3"]:checked').val() == "Telecom") {
			
			$("#aprovacaoTelecom").val("Sim");	
	
		
		}else {
			
			$("#aprovacaoTelecom").val("Nao");
					
			
			
		}
		
		if($('[name="check_aprovador_4"]:checked').val() == "Network") {
			
			$("#aprovacaoNetwork").val("Sim");	
		
		
		}else {
			
			$("#aprovacaoNetwork").val("Nao");
					
			
			
		}
		
		if($('[name="check_aprovador_5"]:checked').val() == "Seguranca" || $('input[name="necessario_pci"]:checked').val() == "Sim") {
			
			$('[name="check_aprovador_5"]').prop("checked", true);
			
			$("#aprovacaoSeguranca").val("Sim");	
			
		
		}else {			
					
			$("#aprovacaoSeguranca").val("Nao");
			
			
		}
		
		
		
		if($('input[name="necessario_pci"]:checked').val() == "Nao") {
				
				$('[name="check_aprovador_5"]').attr("checked", false);		
				
				$("#aprovacaoSeguranca").val("Nao");
				
				
			}
		
		if($('[name="check_aprovador_6"]:checked').val() == "workplace") {
			
			$("#aprovacaoWorkplace").val("Sim");	
			
		
		}else {
			
			$("#aprovacaoWorkplace").val("Nao");
				
			
			
		}
		
		if($('[name="check_aprovador_7"]:checked').val() == "desenvolvimento") {
			
			$("#aprovacaoDesenvolvimento").val("Sim");	
			
		
		}else {
			
			$("#aprovacaoDesenvolvimento").val("Nao");
					
			
			
		}
		
		if($('[name="check_aprovador_8"]:checked').val() == "fornecedor") {
			
			$("#aprovacaoFornecedor").val("Sim");	
			$('#habilitaFornecedor').show();
		
		}else {
			
			$("#aprovacaoFornecedor").val("Nao");
			$('#habilitaFornecedor').hide();			
			
			
		}
		
		if($('[name="check_aprovador_10"]:checked').val() == "diretoria_ti" || $('input[id="severidade_grandeImpacto"]:checked').val() == "Grande Impacto" || $('input[id="severidade_medioImpacto"]:checked').val() == "Médio Impacto") {
		
			$('[name="check_aprovador_10"]').prop("checked", true);
			
			
			$("#aprovacaoDeretoriaTI").val("Sim");	
			$('#habilitaDiretoriaTI').show();
		
		}else {
			
			$("#aprovacaoDeretoriaTI").val("Nao");
			$('#habilitaDiretoriaTI').hide();	
		}
			
			
		if ($('input[id="severidade_critica"]:checked').val() == "Critica" || $('input[id="severidade_baixoImpacto"]:checked').val() == "Baixo Impacto") {
			
			$('[name="check_aprovador_10"]').prop("checked", false);
					
			$("#aprovacaoDeretoriaTI").val("Nao");
			$('#habilitaDiretoriaTI').hide();			
			
			
		}
		
		if($('[name="check_aprovador_12"]:checked').val() == "diretoria_areNegocio" || $('input[name="severidade_grandeImpacto"]:checked').val() == "Grande Impacto" || $('input[name="severidade_medioImpacto"]:checked').val() == "Médio Impacto") {
			
			
			$('[name="check_aprovador_12"]').attr('checked','checked');
			
			$("#aprovacaoDiretoriaNegocios").val("Sim");	
			$('#habilitaDiretoriaNegocios').show();
		
		}else {
			
			$("#aprovacaoDiretoriaNegocios").val("Nao");
			$('#habilitaDiretoriaNegocios').hide();			
			
			
		}
	
	
	}	
	
}

	
	