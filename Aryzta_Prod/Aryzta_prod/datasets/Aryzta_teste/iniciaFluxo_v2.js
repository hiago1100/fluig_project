function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {

     var dataset = DatasetBuilder.newDataset();
     
       dataset.addColumn("COUNT");
       dataset.addColumn("COD_USUARIO");
       dataset.addColumn("Nome_Usuario");
       dataset.addColumn("COD_GESTOR");
       dataset.addColumn("NOME_GESTOR");
       dataset.addColumn("ID_PROCESSO");
        
       
     var dataConclusao = findConstraint("dataConclusao",constraints,"");  
     
     log.info("$$$ DataConclusao" + dataConclusao);
     var dsUsuarios = DatasetFactory.getDataset('ARY-sql2dataset-usuarios', null, null,null);
    
     
     log.info("@@@ DATASET :" + dsUsuarios.rowsCount); 
     
 for(var i = 0;i<dsUsuarios.rowsCount;i++){
 //for(var i = 1;i<=28;i++){
         var cod_usuario = dsUsuarios.getValue(i,'cod_usuario');
         log.info("@@@ DENTRO DO DATASET : "+ cod_usuario);
         
         if(cod_usuario == "wsantos"){     
         
    	 var c10 = DatasetFactory.createConstraint("colleaguePK.colleagueId", cod_usuario, cod_usuario, ConstraintType.MUST);
         var colleague = DatasetFactory.getDataset('colleague', null, [c10],null);
    	 
        if(colleague.rowsCount > 0){
        

         
             
            var workflowEngineServiceProvider = ServiceManager.getServiceInstance("ECMWorkflowEngineService");
       
            var workflowEngineServiceLocator = workflowEngineServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.ECMWorkflowEngineServiceService");
         
            var workflowEngineService = workflowEngineServiceLocator.getWorkflowEngineServicePort();
    
            var objectFactory = workflowEngineServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.ObjectFactory");
    
            var cardData = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArrayArray");

            var processAttachmentDtoArray = workflowEngineServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.ProcessAttachmentDtoArray");

            var colleaguesId = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
//            colleaguesId.getItem().addAll([dsUsuarios.getValue(i,'COD_GEST')]);
            colleaguesId.getItem().addAll(["admin"]);

            var appointment =  workflowEngineServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.ProcessTaskAppointmentDtoArray");;
      

            
            var itemForm1 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
            itemForm1.getItem().add("nomeUsuario");
            itemForm1.getItem().add(dsUsuarios.getValue(i,'nome_usuario'));
            cardData.getItem().add(itemForm1);
            log.info("### dsUsuarios.getValue(i,'nome_usuario') "+ dsUsuarios.getValue(i,'nome_usuario'));

            
            var itemForm2 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
            itemForm2.getItem().add("codUsuario");
            itemForm2.getItem().add(dsUsuarios.getValue(i,'nome_usuario'));
            cardData.getItem().add(itemForm2);
 
            
                     
             var itemForm3 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
             itemForm3.getItem().add("gestorUsuario");
             itemForm3.getItem().add(dsUsuarios.getValue(i,'GEST'));
            cardData.getItem().add(itemForm3);
    
            
            var itemForm4 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
            itemForm4.getItem().add("codGest");
            itemForm4.getItem().add(dsUsuarios.getValue(i,'COD_GEST'));
            cardData.getItem().add(itemForm4);
            
//            var itemForm11 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
//            itemForm11.getItem().add("count");
//            itemForm11.getItem().add(dsUsuarios.getValue(f,'ID_PROCESSO'));
//            cardData.getItem().add(itemForm11);
            
//            
//            log.info("### Número solicitação "+ dsUsuariosGrupo.getValue(f,'ID_PROCESSO'));
// 
//            
            
            var c1 = DatasetFactory.createConstraint("cod_usuario", cod_usuario, cod_usuario, ConstraintType.MUST);
            var dsUsuariosGrupo = DatasetFactory.getDataset('ARY-sql2dataset-usuario-grupos', null, [c1],null);
            

            for(var f=0;f<dsUsuariosGrupo.rowsCount;f++){
                var a = f+1;
                var itemForm5 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
                itemForm5.getItem().add("grupoCod___"+a);
                itemForm5.getItem().add(dsUsuariosGrupo.getValue(f,'COD_GRUPO'));
                cardData.getItem().add(itemForm5);
                	
                
                log.info("### dsUsuariosGrupo.getValue(f,'COD_GRUPO') "+ dsUsuariosGrupo.getValue(f,'COD_GRUPO'));
                
                var itemForm6 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
                itemForm6.getItem().add("grupoDesc___"+a);
                itemForm6.getItem().add(dsUsuariosGrupo.getValue(f,'DESC_GRUPO'));
                cardData.getItem().add(itemForm6);
        
                
                var itemForm7 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
                itemForm7.getItem().add("grupoGestor___"+a);
                itemForm7.getItem().add(dsUsuariosGrupo.getValue(f,'NOME_GESTOR'));
                cardData.getItem().add(itemForm7);
   
                
                var itemForm8 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
                itemForm8.getItem().add("gestorHide___"+a);
                itemForm8.getItem().add(dsUsuariosGrupo.getValue(f,'GESTOR'));
                cardData.getItem().add(itemForm8);
                
                                  
               
            }
         
        }
        

        var itemForm9 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
        itemForm9.getItem().add("idUsuario");
        itemForm9.getItem().add(dsUsuarios.getValue(i,'cod_usuario'));
        cardData.getItem().add(itemForm9);
   

        var itemForm10 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
        itemForm10.getItem().add("dataRevisao"); // nome do campo.
        itemForm10.getItem().add(dataConclusao); // valor do campo.        
        cardData.getItem().add(itemForm10);
              
            // Cria uma solicitação com os dados obtidos
            var rest =  workflowEngineService.startProcess("admin", "adm", 1, "Aryzta_Controle_Acessos", 0, colleaguesId, "Revisão iniciada pelo admnistrador ", "admin", true, processAttachmentDtoArray, cardData, appointment, false);
           
           // log.info("@@@ id do processo" + rest);	
            
            dataset.addRow([i,
                            dsUsuarios.getValue(i,'cod_usuario'),
                            dsUsuarios.getValue(i,'nome_usuario'),
                            dsUsuarios.getValue(i,'cod_gest'),
                            dsUsuarios.getValue(i,'GEST'),                            
                            rest.getItem().get(4).getItem().get(1)]);

        }  // fim do if usuario  
         
     }
    
   
   log.info("** FIM DO DATASET");
    
    return dataset;
    
}

function findConstraint(fieldName, constraints, defaultValue) {
	 if (constraints != null) {
	  
	  for (var i=0; i<constraints.length; i++){
	   log.info("***CONSTRAN : " + constraints[i].fieldName );
	   log.info("***CONSTRAN2 : " + constraints[i].initialValue);
	   if (constraints[i].fieldName == fieldName){
	    return constraints[i].initialValue;
	   }
	  }
	 }
	 return defaultValue;
	}



function onMobileSync(user) {

}