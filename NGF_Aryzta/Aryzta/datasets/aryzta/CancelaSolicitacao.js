function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	
	
	var serviceHelper = ServiceManager.getService("ECMWorkflowEngineService").getBean();
	var serviceLocator = serviceHelper.instantiate('com.totvs.technology.ecm.workflow.ws.ECMWorkflowEngineServiceService');
    var service = serviceLocator.getWorkflowEngineServicePort();
	
	
	var dataset = DatasetBuilder.newDataset();
	
	dataset.addColumn("Status");
	dataset.addColumn("ID");
	
	var INICIO = 839;
	var FIM = 890;

		for(i=INICIO;i<=FIM;i++){
			log.info("***INDEX : "+ i);
			var ret = service.cancelInstance("admin","adm",1,i,"admin","fluig"); 
			
			log.info("@@@RET : "+ ret);
			
			if(ret == "OK"){
				dataset.addRow([ret,i]);
				
			}else{
				dataset.addRow([ret,i]);
			}
			
			
		}
		
		

	
	

	
	return dataset;

}function onMobileSync(user) {

}