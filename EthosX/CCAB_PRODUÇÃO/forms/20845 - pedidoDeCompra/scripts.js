$(document).ready(function() {
	var SeqProcesso		= document.getElementById("seqProcesso").value;
	
	if (SeqProcesso == 5 && document.getElementById("primeiro").value == "1"){

/*		var cUsuario 	= document.getElementById("matAprovador").value;
		var cNumero		= document.getElementById("numPedido").value;
		var cFilial		= document.getElementById("codFilial").value;

		var aUsuario = cUsuario.split(",");
		
		var cConsNumero = DatasetFactory.createConstraint("numero",
				cNumero, cNumero, ConstraintType.MUST);
		
		var cConsUsuario = DatasetFactory.createConstraint("usuario",
				aUsuario[0], aUsuario[0], ConstraintType.MUST);
		
		var cConsFilial = DatasetFactory.createConstraint("filial",
				cFilial, cFilial, ConstraintType.MUST);

		
		var dsRetorno = DatasetFactory.getDataset("ds_vlTotal_qr", null, [ cConsNumero, cConsUsuario, cConsFilial ], null);

		var moeda = document.getElementById("moeda").value;
		
		var data = document.getElementById("dtFiltroEmissao").value;
		
		var cConsMoeda = DatasetFactory.createConstraint("data",
				data, data, ConstraintType.MUST);
		
		var dsMoeda = DatasetFactory.getDataset("ds_moeda_qr", null, [ cConsMoeda ], null);

        //$('table[tablename=tbItens] tbody tr').not(':first').remove();
		*/
		//$('table[tablename=tbItens] tbody tr').eq(1).remove();
		//$('table[tablename=tbItens] tbody tr').eq(2).remove();
		//$('table[tablename=tbItens] tbody tr').eq(2).remove();
		//$('table[tablename=tbItens] tbody tr').eq(2).remove();
		//$('table[tablename=tbItens] tbody tr').eq(2).remove();
		
		//row = wdkAddChild("tbItens");
/*
        for (i = 0; i<dsRetorno.values.length; i++){
        	
        	row = wdkAddChild("tbItens");

            $("#seqItem___"+row.toString()).val( dsRetorno.values[i].DBM_ITEM );
            $("#codProduto___"+row.toString()).val( dsRetorno.values[i].C7_PRODUTO );
            $("#descricao___"+row.toString()).val( dsRetorno.values[i].B1_DESC );
            $("#quantideItem___"+row.toString()).val( dsRetorno.values[i].C7_QUANT );
            $("#ipi___"+row.toString()).val( dsRetorno.values[i].C7_IPI );
            
            if (moeda == '1'){
            	$("#valorUnit___"+row.toString()).val( dsRetorno.values[i].C7_PRECO );
                $("#valorTotalItem___"+row.toString()).val( dsRetorno.values[i].DBM_VALOR );
                $("#total").val(dsRetorno.values[0].TOTAL);
            }else if (moeda == '2'){
            	$("#valorUnit___"+row.toString()).val( parseFloat(dsRetorno.values[i].C7_PRECO)*parseFloat(dsMoeda.values[i].M2_MOEDA2) );
                $("#valorTotalItem___"+row.toString()).val( parseFloat(dsRetorno.values[i].DBM_VALOR)*parseFloat(dsMoeda.values[i].M2_MOEDA2) );
                $("#total").val(dsRetorno.values[0].TOTAL*parseFloat(dsMoeda.values[i].M2_MOEDA2));
            }else if (moeda == '3'){
            	$("#valorUnit___"+row.toString()).val( parseFloat(dsRetorno.values[i].C7_PRECO)*parseFloat(dsMoeda.values[i].M2_MOEDA3) );
                $("#valorTotalItem___"+row.toString()).val( parseFloat(dsRetorno.values[i].DBM_VALOR)*parseFloat(dsMoeda.values[i].M2_MOEDA3) );
                $("#total").val(dsRetorno.values[0].TOTAL*parseFloat(dsMoeda.values[i].M2_MOEDA3));
            }else if (moeda == '4'){
            	$("#valorUnit___"+row.toString()).val( parseFloat(dsRetorno.values[i].C7_PRECO)*parseFloat(dsMoeda.values[i].M2_MOEDA4) );
                $("#valorTotalItem___"+row.toString()).val( parseFloat(dsRetorno.values[i].DBM_VALOR)*parseFloat(dsMoeda.values[i].M2_MOEDA4) );
                $("#total").val(dsRetorno.values[0].TOTAL*parseFloat(dsMoeda.values[i].M2_MOEDA4));
            }else{
            	$("#valorUnit___"+row.toString()).val( parseFloat(dsRetorno.values[i].C7_PRECO)*parseFloat(dsMoeda.values[i].M2_MOEDA5) );
                $("#valorTotalItem___"+row.toString()).val( parseFloat(dsRetorno.values[i].DBM_VALOR)*parseFloat(dsMoeda.values[i].M2_MOEDA5) );
                $("#total").val(dsRetorno.values[0].TOTAL*parseFloat(dsMoeda.values[i].M2_MOEDA5));
            }
            
        }*/
        
	}
});