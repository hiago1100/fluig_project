function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	
	
	var serviceHelper = ServiceManager.getService("ECMWorkflowEngineService");
	var serviceLocator = serviceHelper.instantiate('com.totvs.technology.ecm.workflow.ws.ECMWorkflowEngineServiceService');
    var service = serviceLocator.getWorkflowEngineServicePort();
	
	
	var dataset = DatasetBuilder.newDataset();
	
	dataset.addColumn("Status");
	dataset.addColumn("ID");
	
	var INICIO = 154498;
	var FIM = 154596;

		for(i=INICIO;i<=FIM;i++){
			log.info("***INDEX : "+ i);
			var ret = service.cancelInstance("fluig.sistema","App.Fluig@3461",1,i,"App.Fluig@3461","fluig"); 
			
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