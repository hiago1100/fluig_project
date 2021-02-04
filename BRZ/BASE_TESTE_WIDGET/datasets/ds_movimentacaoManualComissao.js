function defineStructure() {}



function createDataset(fields, constraints, sortFields) {


var dataset = DatasetBuilder.newDataset(); 
//dataset.addColumn("ok");

var processInstanceId = findConstraint("slctEmpreendimento",constraints,""); 

var solic_OBJT = JSON.parse(processInstanceId);  
       
var periodicService = ServiceManager.getService('ECMWorkflowEngineService'); 
var serviceHelper = periodicService.getBean(); 
var serviceLocator = periodicService.instantiate('com.totvs.technology.ecm.workflow.ws.ECMWorkflowEngineServiceService'); 
var service = serviceLocator.getWorkflowEngineServicePort();
var objectFactory = periodicService.instantiate("com.totvs.technology.ecm.workflow.ws.ObjectFactory"); 
var appointment = periodicService.instantiate("com.totvs.technology.ecm.workflow.ws.ProcessTaskAppointmentDtoArray"); 
var attachments = periodicService.instantiate("com.totvs.technology.ecm.workflow.ws.ProcessAttachmentDtoArray");
var user = "App.Fluig@3461"; 
var password = "Brz@3461"; 
var companyId = 1;

var choosedState = 20;
var colleaguesId = periodicService.instantiate("net.java.dev.jaxb.array.StringArray"); 
colleaguesId.getItem().addAll(["App.Fluig@3461"]);
var comments = "movimentado pelo fluig"; 
var userId = "App.Fluig@3461"; 
var completeTask = true;
var cardData = periodicService.instantiate("net.java.dev.jaxb.array.StringArrayArray");
var managerMode = false; 
var threadSequence = 0;

for (var i = 0; i < solic_OBJT.length; i++) {
  
log.info("***************  ARRAY = " + solic_OBJT[i]);

var result = service.saveAndSendTask(user,
                                     password,
                                     companyId,
                                     parseInt(solic_OBJT[i]),
                                     choosedState,
                                     colleaguesId,
                                     comments,
                                     userId,
                                     completeTask,
                                     attachments,
                                     cardData,
                                     appointment,
                                     managerMode,
                                     threadSequence
                                     ); 

}

log.info("***************  RESULT = "+ result.getItem().get(0).getItem().get(0));

//log.info("@@@ result "+ result.getItem().get(0).getItem().get(0)); 
//dataset.addRow(new Array( result.getItem().get(1).getItem ().get(1) ));


//return dataset;


}

function findConstraint(fieldName, constraints, defaultValue) {
     if (constraints != null) {
      
      for (var i=0; i<constraints.length; i++){
       // log.info("***CONSTRAN : " + constraints[i].fieldName );
       // log.info("***CONSTRAN2 : " + constraints[i].initialValue);
       if (constraints[i].fieldName == fieldName){
        return constraints[i].initialValue;
       }
      }
     }
     return defaultValue;
}





