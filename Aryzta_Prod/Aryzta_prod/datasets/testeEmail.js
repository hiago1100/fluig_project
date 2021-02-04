function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	
	log.info('*** Teste de Email');
	
	var dataset =  DatasetBuilder.newDataset();
	dataset.addColumn("Codigo");
	dataset.addColumn("Mensagem");
	
	try{
		
		log.info('*** Teste de Email: try');
	    //Monta mapa com parâmetros do template
	    var parametros = new java.util.HashMap();
	    parametros.put("SERVER_URL", "TESTE");
	    parametros.put("TENANT_NAME", "teste");
	    parametros.put("LINK", "teste");
	    parametros.put("EXPIRE_DATE", "teste");
	    
	 
	    //Este parâmetro é obrigatório e representa o assunto do e-mail
	    parametros.put("subject", "TESTE E-mail");

	    log.info('*** Teste de Email Parametros 1: ' + parametros);
	    
	    //Monta lista de destinatários
	    var destinatarios = new java.util.ArrayList();
	    destinatarios.add("dfaria");
	 
	    log.info('*** Teste de Email Destinatarios 1: ' + destinatarios);
	    
	    //Envia e-mail
	    notifier.notify("dfaria", "convite_padrao", parametros, destinatarios, "text/html");
	    
	    log.info('*** Teste de Email FIM ');
	 
	    dataset.addRow(["1","OK"]);
	    
	} catch(e){
		log.info('*** Teste de Email catch: ' + e);
		
	    log.info(e);
	    
	    dataset.addRow(["0",e]);
	}
	
	return dataset;
	
	
	
}
function onMobileSync(user) {

}