function servicetask19(attempt, message) {
	
	var cCc 	= hAPI.getCardValue("codCC");
	
	var matSolicitante = getValue("WKUser");
	
	var primeiro = "0";

	if(hAPI.getCardValue("nivel") == "01"){
		primeiro = "1";


	}
	
	var cConsCc = DatasetFactory.createConstraint("centrocusto",
			cCc, cCc, ConstraintType.MUST);
	
	var cConsMat = DatasetFactory.createConstraint("matricula",
			matSolicitante, matSolicitante, ConstraintType.MUST);
	
	var dsNivel = DatasetFactory.getDataset("ds_nivelAtual_qr", null, [ cConsCc, cConsMat ], null);
	log.info("prd");
	if (parseInt(dsNivel.getValue(0,"Nivel")) > 0){
		log.info("prd1");
		var cNivel 	= pad(parseInt(dsNivel.getValue(0,"Nivel"))+1, 2);
		log.info(cNivel);
	}else{
		log.info("prd2");
		var cNivel 	= hAPI.getCardValue("nivel");
	}

	var cValor	= hAPI.getCardValue("valorTratado");

	var cConsNivel = DatasetFactory.createConstraint("nivel",
			cNivel, cNivel, ConstraintType.MUST);
	
	var cConsValor = DatasetFactory.createConstraint("valor",
			cValor, cValor, ConstraintType.MUST);
	
	var dsRetorno = DatasetFactory.getDataset("ds_alcadas_qr", null, [ cConsCc, cConsNivel, cConsValor ], null);
	var cAprovadores = "";
	
	if(dsRetorno != null && dsRetorno.rowsCount > 0){
		
		for (var i = 0; i < dsRetorno.rowsCount; i++){
			
			if (i > 0){
				cAprovadores += ',';
			}
			cAprovadores += dsRetorno.getValue(i,"AK_XCPF");
		}
		log.info("prd3");
		hAPI.setCardValue("matAprovador", cAprovadores);
		log.info(cAprovadores);
		var nNivel = parseInt(cNivel);
		
		if (primeiro == "1"){
			log.info("prd4");
			hAPI.setCardValue("matPrimeiroAprov", cAprovadores);

			log.info("############################ aprovadores array = "+ cAprovadores);
	
		}
		
		nNivel++;
		
		hAPI.setCardValue("nivel", pad(nNivel, 2));
	}else{
		
		hAPI.setCardValue("matAprovador","");
		
	}

}

function pad(n, width, z) {
	z = z || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function consultarColaboradorPorMatricula(matricula) {
	var filtro = DatasetFactory.createConstraint("colleaguePK.colleagueId", matricula, matricula, ConstraintType.MUST);
	var dsColaborador = DatasetFactory.getDataset("colleague", null, [filtro], null);
	
	return dsColaborador;
}