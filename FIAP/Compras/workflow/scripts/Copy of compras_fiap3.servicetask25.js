function servicetask25(attempt, message) {
 try {
	 var Service = ServiceManager.getService('Servidor indefinido');
	 var serviceHelper = Service.getBean();
  //var serviceLocator = serviceHelper.instantiate('classe.locator');
 } catch(error) { 
	log.error(error);
	throw error;
 }
}