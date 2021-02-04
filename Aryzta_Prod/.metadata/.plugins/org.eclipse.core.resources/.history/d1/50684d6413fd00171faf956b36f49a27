function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {

     var dataset = DatasetBuilder.newDataset();
     
       dataset.addColumn("COUNT");
       dataset.addColumn("COD_USUARIO");
       dataset.addColumn("Nome Usuario");
       dataset.addColumn("COD_GESTOR");
       dataset.addColumn("NOME_GESTOR");
       dataset.addColumn("COD_GRUPO");
        
      
     var dsUsuarios = DatasetFactory.getDataset('ARY-sql2dataset-usuarios', null, null,null);
    
     
     log.info("@@ DATASET :" + dsUsuarios.rowsCount); 
     
  for(var i = 0;i<dsUsuarios.rowsCount;i++){
   // for(var i = 0;i<1;i++){
         var cod_usuario = dsUsuarios.getValue(i,'cod_usuario');
         log.info("@@@ DENTRO DO DATASET : "+ cod_usuario);
         
         if(cod_usuario == 'dfaria' ){
        
         var c1 = DatasetFactory.createConstraint("cod_usuario", cod_usuario, cod_usuario, ConstraintType.MUST);
         var dsUsuariosGrupo = DatasetFactory.getDataset('ARY-sql2dataset-usuario-grupos', null, [c1],null);
         
             
            var workflowEngineServiceProvider = ServiceManager.getServiceInstance("ECMWorkflowEngineService");
            log.info("@@ 1");
            var workflowEngineServiceLocator = workflowEngineServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.ECMWorkflowEngineServiceService");
            log.info("@@ 2");
            var workflowEngineService = workflowEngineServiceLocator.getWorkflowEngineServicePort();
            log.info("@@ 3");
            var objectFactory = workflowEngineServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.ObjectFactory");
            log.info("@@ 4");
            var cardData = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArrayArray");
            log.info("@@ 5");
            var processAttachmentDtoArray = workflowEngineServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.ProcessAttachmentDtoArray");
            log.info("@@ 6");
            var colleaguesId = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
            colleaguesId.getItem().addAll([dsUsuarios.getValue(i,'COD_GEST')]);
            log.info("@@ 7");
            var appointment =  workflowEngineServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.ProcessTaskAppointmentDtoArray");;
            log.info("@@ 8");

            
            var itemForm1 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
            itemForm1.getItem().add("nomeUsuario");
            itemForm1.getItem().add(dsUsuarios.getValue(i,'nome_usuario'));
            cardData.getItem().add(itemForm1);
            log.info("@@ log7");
            
            var itemForm7 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
            itemForm7.getItem().add("codUsuario");
            itemForm7.getItem().add(dsUsuarios.getValue(i,'nome_usuario'));
            cardData.getItem().add(itemForm7);
            log.info("@@ log7");
            
                     
             var itemForm2 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
            itemForm2.getItem().add("gestorUsuario");
            itemForm2.getItem().add(dsUsuarios.getValue(i,'GEST'));
            cardData.getItem().add(itemForm2);
            log.info("@@ log7");
            
            var itemForm6 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
            itemForm6.getItem().add("codGest");
            itemForm6.getItem().add(dsUsuarios.getValue(i,'COD_GEST'));
            cardData.getItem().add(itemForm6);
            log.info("@@ log7");
            

            for(var f=0;f<dsUsuariosGrupo.rowsCount;f++){
                var a = f+1;
                var itemForm3 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
                itemForm3.getItem().add("grupoCod___"+a);
                itemForm3.getItem().add(dsUsuariosGrupo.getValue(f,'COD_GRUPO'));
                cardData.getItem().add(itemForm3);
                log.info("@@ log8");
                
                var itemForm4 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
                itemForm4.getItem().add("grupoDesc___"+a);
                itemForm4.getItem().add(dsUsuariosGrupo.getValue(f,'DESC_GRUPO'));
                cardData.getItem().add(itemForm4);
                log.info("@@ log8");
                
                var itemForm5 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
                itemForm5.getItem().add("grupoGestor___"+a);
                itemForm5.getItem().add(dsUsuariosGrupo.getValue(f,'NOME_GESTOR'));
                cardData.getItem().add(itemForm5);
                log.info("@@ log8");    
                
                var itemForm7 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
                itemForm7.getItem().add("gestorHide___"+a);
                itemForm7.getItem().add(dsUsuariosGrupo.getValue(f,'GESTOR'));
                cardData.getItem().add(itemForm7);
                log.info("@@ log9");
            }

              var itemForm6 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
              itemForm6.getItem().add("idUsuario");
              itemForm6.getItem().add(dsUsuarios.getValue(i,'cod_usuario'));
              cardData.getItem().add(itemForm6);
              log.info("@@ log7");
              
            
            dataset.addRow([i,
                         dsUsuarios.getValue(i,'cod_usuario'),
                         dsUsuarios.getValue(i,'nome_usuario'),
                         dsUsuarios.getValue(i,'cod_gest'),
                         dsUsuarios.getValue(i,'GEST'),"GRUPO"]);
                
            
            // Cria uma solicitação com os dados obtidos
            workflowEngineService.startProcess("admin", "adm", 1, "Aryzta_Controle_Acessos", 0, colleaguesId, "Comentário: ", "admin", true, processAttachmentDtoArray, cardData, appointment, false);
            log.info("@@ INICIO O PROCESSO");
            log.info("@@ 9");
         
             log.info("** FIM DO FOR");
         }    
         
     }
    
   
   log.info("** FIM DO DATASET");
    
    return dataset;
    
}function onMobileSync(user) {

}