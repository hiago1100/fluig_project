function servicetask27(attempt, message) {
	var cFilial 	= hAPI.getCardValue("codFilial");
	var cCc			= hAPI.getCardValue("codCC");
	var cNumPed		= hAPI.getCardValue("numPedido");
	var cAprovadores = "";
	var cRecnos		 = "";
	
	var cConsFilial = DatasetFactory.createConstraint("filial",
			cFilial, cFilial, ConstraintType.MUST);
	
	var cConsCc 	= DatasetFactory.createConstraint("cc",
			cCc, cCc, ConstraintType.MUST);
	
	var cConsPedido = DatasetFactory.createConstraint("pedido",
			cNumPed, cNumPed, ConstraintType.MUST);
	
	var dsNivel = DatasetFactory.getDataset("ds_scr_qr", null, [ cConsFilial, cConsCc, cConsPedido ], null);

	if (dsNivel.getValue(0,"MAT") == ""){
		hAPI.setCardValue("matAprovador", dsNivel.getValue(0,"MAT"));
		hAPI.setCardValue("recno"		, dsNivel.getValue(0,"RECNO"));
	}else{

		var moeda = hAPI.getCardValue("moeda");

		var data = hAPI.getCardValue("dtFiltroEmissao");

		var cConsMoeda = DatasetFactory.createConstraint("data",
				data, data, ConstraintType.MUST);
		
		var dsMoeda = DatasetFactory.getDataset("ds_moeda_qr", null, [ cConsMoeda ], null);
		
		var cConsAprov = DatasetFactory.createConstraint("usuario",
				dsNivel.getValue(0,"MAT"), dsNivel.getValue(0,"MAT"), ConstraintType.MUST);
				
		var dsValor = DatasetFactory.getDataset("ds_atuValor_qr", null, [ cConsPedido, cConsAprov, cConsFilial, cConsCc ], null);
		
		if (moeda == '1'){
			hAPI.setCardValue("total", numberToReal(parseFloat(dsValor.getValue(0,"VALOR"))));
        }else if (moeda == '2'){
        	hAPI.setCardValue("total", parseFloat(dsValor.getValue(0,"VALOR"))*parseFloat(dsMoeda.getValue(0,"M2_MOEDA2")));
        }else if (moeda == '3'){
        	hAPI.setCardValue("total", parseFloat(dsValor.getValue(0,"VALOR"))*parseFloat(dsMoeda.getValue(0,"M2_MOEDA3")));
        }else if (moeda == '4'){
        	hAPI.setCardValue("total", parseFloat(dsValor.getValue(0,"VALOR"))*parseFloat(dsMoeda.getValue(0,"M2_MOEDA4")));
        }else{
        	hAPI.setCardValue("total", parseFloat(dsValor.getValue(0,"VALOR"))*parseFloat(dsMoeda.getValue(0,"M2_MOEDA5")));
        }

		for (var i = 0; i < dsNivel.rowsCount; i++){
			
			if (i > 0){
				cAprovadores += ',';
				cRecnos += ',';
			}
			cAprovadores += dsNivel.getValue(i,"MAT");
			cRecnos		 += dsNivel.getValue(i,"RECNO");
		}
		
		hAPI.setCardValue("matAprovador", cAprovadores);
		hAPI.setCardValue("recno"		, cRecnos);
		hAPI.setCardValue("primeiro"	, "1");
		
	}

}

function numberToReal(numero) {
    var numero = numero.toFixed(2).split('.');
    numero[0] = numero[0].split(/(?=(?:...)*$)/).join('.');
    return numero.join(',');
}
