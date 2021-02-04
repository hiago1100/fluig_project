function servicetask68(attempt, message) {
	
	if(hAPI.getCardValue("viaWebService") == true){
	var filial = hAPI.getCardValue("codigo");
	var centroCusto = hAPI.getCardValue("CTT_DESC01");
	var valor = hAPI.getCardValue("valorPgtoGuiaTaxaBoletos");
	if(filial == "" || centroCusto == "" || valor == ""){
		throw "Os campos não podem estar vazios"
	}
	else{	
	    var c1 = DatasetFactory.createConstraint("filial", filial, filial, ConstraintType.MUST);
	    var c2 = DatasetFactory.createConstraint("centroCusto", centroCusto, centroCusto, ConstraintType.MUST);
	    var c3 = DatasetFactory.createConstraint("valor", valor, valor, ConstraintType.MUST);
	    var constraints = new Array(c1, c2, c3);
	    var ds_aprov = DatasetFactory.getDataset("ds_alcadaAprovacaoPagamentos", null, constraints, null);
	    var gestores = [];
	    for (var x = 0; x < ds_aprov.values.length; x++) {
	        var aprovador = {
	            id: ds_aprov.values[x].IDAPROVADOR,
	            nome: ds_aprov.values[x].APROVADOR
	        }
	        gestores.push(aprovador)
	    }
	    
	    hAPI.setCardValue('idAprovGestor1', gestores[0].id);
	    
	    hAPI.setCardValue('nomeAprovGestor1', gestores[0].nome);
		}
	}
}