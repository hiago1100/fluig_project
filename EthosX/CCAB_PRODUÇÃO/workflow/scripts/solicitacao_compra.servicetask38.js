function servicetask38(attempt, message) {

	var numSolic = getValue("WKNumProces"); 
	var pedido =  hAPI.getCardValue('numPedido');
	var cpf = hAPI.getCardValue('aprovadores');
	var CC = hAPI.getCardValue('cpCodCusto');

	var tipo = 4;
	
	var c1 = DatasetFactory.createConstraint("pedido", pedido, pedido, ConstraintType.MUST);

	if(CC == '21080' || CC == '24010' || CC == '21090' || CC == '21000'){
		var outros = hAPI.getCardValue('diretor');
		var cpfs = cpf+","+outros;
		var c2 = DatasetFactory.createConstraint("cpf", cpfs, cpfs, ConstraintType.MUST);
	}else{
		log.info("CAMPO DIRETOR: "+hAPI.getCardValue('diretor'));
		if(hAPI.getCardValue('diretor') != "" || hAPI.getCardValue('diretor') != null){
			log.info("POSSUI DIRETOR: "+hAPI.getCardValue('diretor'));
			var outros = hAPI.getCardValue('diretor');
			var cpfs = cpf+","+outros;
			var c2 = DatasetFactory.createConstraint("cpf", cpfs, cpfs, ConstraintType.MUST);
		}else{
			var c2 = DatasetFactory.createConstraint("cpf", cpf, cpf, ConstraintType.MUST);
		}
	}

	var c3 = DatasetFactory.createConstraint("CC", CC, CC, ConstraintType.MUST);
	var c4 = DatasetFactory.createConstraint("tipo", tipo, tipo, ConstraintType.MUST);

	

	var process = getValue("WKNumProces");
	var cardData = new java.util.HashMap();
	cardData = hAPI.getCardData(process);
	

	var constraints = new Array(c1,c2,c3,c4);
	// log.info("constraints");
	// log.dir(constraints);
	DatasetFactory.getDataset("ds_apr_pedido", null, constraints, null)  
}