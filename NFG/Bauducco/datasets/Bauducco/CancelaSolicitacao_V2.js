function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	log.info("*** ENTROU NO CANCELA");
	
	var solic = findConstraint('solic', constraints, '');
	
	log.info("@@@ solic "+ solic);
	
	var serviceHelper = ServiceManager.getService("ECMWorkflowEngineService").getBean();
	var serviceLocator = serviceHelper.instantiate('com.totvs.technology.ecm.workflow.ws.ECMWorkflowEngineServiceService');
    var service = serviceLocator.getWorkflowEngineServicePort();
	
	
	var dataset = DatasetBuilder.newDataset();
	
	dataset.addColumn("Status");
	dataset.addColumn("ID");
	
	 var INICIO = 5692;
	 var FIM = 5805;
	
	log.info("### INICIO"+ solic);


		 for(i=parseInt(INICIO);i<parseInt(FIM);i++){
			log.info("***INDEX : "+ solic);
			var ret = service.cancelInstance("admin","adm",1,i,"admin","fluig"); 
			
			log.info("@@@ RET : "+ ret);
			
			if(ret == "OK"){
				dataset.addRow([ret,solic]);
				
			}else{
				dataset.addRow([ret,solic]);
			}
			
			
	}
		
		log.info("@@@ FIM CANCELA ");

	
	

	
	return dataset;

}function onMobileSync(user) {

}
function findConstraint(fieldName, constraints, defaultValue) {
	if (constraints != null) {
		for (var i=0; i<constraints.length; i++){
			if (constraints[i].fieldName == fieldName){
				return constraints[i].initialValue;
			}
		}
	}
	return defaultValue;
}