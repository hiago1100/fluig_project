$(document).ready(function(){

    if(document.getElementById("matRespAbertura").value[0] == "Y"){
        var matricula = document.getElementById("matRespAbertura").value;
        var filial = document.getElementById("filRespAbertura").value;
        
        matricula = matricula.substring((matricula.length - 6), matricula.length);

        document.getElementById("matRespAbertura").value = "01" + filial + matricula;
    }
	
    var atividade = $("#atividade").val();
    var linha = 0;

    if (atividade == 66) {
        linha = 0;
    } else if (atividade == 68) {
        linha = 1;
    } else if (atividade == 70) {
        linha = 2;
    } else if (atividade == 72) {
        linha = 3;
    } else if (atividade == 74) {
        linha = 4;
    } else if (atividade == 76) {
        linha = 5;
    } else if (atividade == 78) {
        linha = 6;
    } else if (atividade == 80) {
        linha = 7;
    }
    
    if(atividade == 0){
    	$('#cont').val('1');
    }
    
    if(atividade == 15 || atividade == 28){
    	var cont = $('#cont').val();
    	$('#cont').val(parseInt(cont) + 1);
    }

    verificaConteudo(linha);
    criaSelect(linha);

    if(atividade == 28 || atividade == 34 || atividade == 36) { 
    	qtdTr = $('#tablePlanoAcao tbody tr').length;
        for(var i = 0; i < qtdTr ; i++){
            // qtdTd = cria váriavel com valor igual a quantidade de td no tr
            qtdTd = $($('#tablePlanoAcao tbody tr')[i]).find('td').length;           
            //laço para exibir tr's que tem valor nas td's
            for(var j = 0; j < qtdTd ; j++){
                var valor = $($($('#tablePlanoAcao tbody tr')[i]).find('td')[0]).find('input').val();
                if (valor == "") {
                    $($('#tablePlanoAcao tbody tr')[i]).hide();
                }
            }       
        }
    }
    
    if($('#cont').val() == 4 && atividade == 15) {
    	qtdTr = $('#tablePlanoAcao tbody tr').length;
        for(var i = 0; i < qtdTr ; i++){
            // qtdTd = cria váriavel com valor igual a quantidade de td no tr
            qtdTd = $($('#tablePlanoAcao tbody tr')[i]).find('td').length;           
            //laço para exibir tr's que tem valor nas td's
            for(var j = 0; j < qtdTd ; j++){
            	var valor = $($($('#tablePlanoAcao tbody tr')[i]).find('td')[4]).find('span').text()
                if (valor != "Alterar") {
                    $($('#tablePlanoAcao tbody tr')[i]).hide();
                }
            }       
        }
        $('#painelValidaBaixaAcao').show();
        $('#painelValidaBaixaAcao p').text("Crítica baixa ação");
    }
    
    if($('#cont').val() == 2 && atividade == 28) {
    	console.log('aqui');
    }
    
    if(atividade == 36){
    	$('#divCriticaEficacia').show();
    }
    if(atividade == 15){
    	$('#divCriticaAcaoCorretiva').removeClass("hide");
    }
    if(atividade == 15 || atividade == 66 || atividade == 68 || atividade == 70 || atividade == 72 || atividade == 74 || atividade == 76 || atividade == 78 || atividade == 80){
    	$('#painelValidaBaixaAcao div div div').show();
    }
    
});

function verificaConteudo(linha) {
    var valor = $($($('#tablePlanoAcao').find('tbody tr')[linha]).find('td')[0]).find('input').val();
    if (valor != "") {
        $($('#tablePlanoAcao').find('tbody tr')[linha]).show();
    };
};
function criaSelect(linha) {
    var temSpan = $($($('#tablePlanoAcao').find('tbody tr')[linha]).find('td')[3]).find('span').length;
    if (temSpan == 1){
        var newSelect = document.createElement("select");
        newSelect.classList.add("form-control");
        var newOption1 = document.createElement("option");
        var newOption2 = document.createElement("option");
        newOption1.setAttribute("value", "");
        newOption1.setAttribute("selected", "selected");
        newOption1.textContent = "Selecione";
        newOption2.setAttribute("value","Finalizado");
        newOption2.textContent = "Finalizado";
        newSelect.append(newOption1);
        newSelect.append(newOption2);              
        $($($('#tablePlanoAcao').find('tbody tr')[linha]).find('td')[3]).append(newSelect);
        $($($('#tablePlanoAcao').find('tbody tr')[linha]).find('td')[3]).find('span').remove();
    }           
};

