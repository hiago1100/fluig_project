function afterProcessFinish(processId){
	
	log.info("===============PROCESSO=======================");
	
	log.info(processId);
	
	log.info("===============DESVIO=======================");
	
	log.info(hAPI.getCardValue("cod_desvio"));
	
	log.info("===============STATUS=======================");
	
	log.info(hAPI.getCardValue("ind_status_desvio"));
	
	var str = hAPI.getCardValue("cod_estabel");
	var estab = str.substring(0, 3); 
	
	log.info(estab);
	
	var objService = ServiceManager.getService('Atualiza');

    var serviceHelper = objService.getBean();

    var serviceLocator = serviceHelper.instantiate('tempuri_org.WsfluigintetstServiceLocator');
    
    var service = serviceLocator.getwsfluigintetstObj();
    
    var soapEnv = "<?xml version='1.0' encoding='UTF-8'?><Desvio versao='1.07'><id_desvio>" + hAPI.getCardValue("cod_desvio") + "</id_desvio><estabelecimento>" + estab.trim() +  "</estabelecimento><status>" + hAPI.getCardValue("ind_status_desvio") + "</status></Desvio>"     
    
    var respEnv = new javax.xml.rpc.holders.StringHolder("");
    	
    service.esdes001(soapEnv, respEnv);

    log.info(respEnv.value);
 
}