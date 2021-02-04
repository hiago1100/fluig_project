function servicetask10(attempt, message) {

try {
  
    var solicitanteIniciador = hAPI.getCardValue("codSolicitanteViagem");

    var solicitacao = hAPI.getCardValue("numSolicitacao_viagem");

    var workflowEngineServiceProvider = ServiceManager.getServiceInstance("ECMWorkflowEngineService");
    var workflowServiceLocator = workflowEngineServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.ECMWorkflowEngineServiceService");
    var workflowService = workflowServiceLocator.getWorkflowEngineServicePort();
    
    log.info("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  DADOS PASSADOS"+ solicitacao + " + " + solicitanteIniciador)

    var cancelamentoProcesso =  workflowService.cancelInstance("integrador", "Safe@123#", 1, parseInt(solicitacao), solicitanteIniciador, "6822e0c83643c4e22c03340a302595cc");

  

} catch (e) {
        log.info("ERRO =  "+ e);
}

}