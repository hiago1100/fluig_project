function servicetask47(attempt, message) {
	var numSolic = getValue("WKNumProces"); 
	var pedido =  hAPI.getCardValue('numPedido');
	var cpf = hAPI.getCardValue('aprovadores');
	var CC = hAPI.getCardValue('cpCodCusto');
	var tipo = 7;
	

	var c1 = DatasetFactory.createConstraint("pedido", pedido, pedido, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("cpf", cpf, cpf, ConstraintType.MUST);
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