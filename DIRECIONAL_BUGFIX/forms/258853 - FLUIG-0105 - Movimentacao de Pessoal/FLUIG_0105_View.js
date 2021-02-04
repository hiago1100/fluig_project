$(document).ready(function(){
    var numRequisicao = $("#cpNumRequisicao").val(),
        aprovarPMP = $("#aprovarPMP").val(),
        atvAtual = parseInt(getWKNumState()),
    	aprovacaoCMP = $("#aprovarCMP").val();

    if (numRequisicao == '') {
        $("#blockAvisoRequisicao").hide();
        
    } else {
        $("#slotNumRequisicao").html(numRequisicao);
    }
    
    if (aprovarPMP != '1' && aprovarPMP != '4')	
    {
    	$("#blockProcessado").hide();
    }
    
    if (aprovarPMP != '4'){
    	$("#blockCCT").hide();
   }
    
    if ((((aprovarPMP == 1))) || (((aprovarPMP == 4)))) {
        FormHelper.verificaMovimentacao();
    }
    
    
    // Painel de Reabertura
    var reabertura = $("#cpReabertura").val();
    FormHelper.toggleReabertura(reabertura, atvAtual);
    
   
    
    
});