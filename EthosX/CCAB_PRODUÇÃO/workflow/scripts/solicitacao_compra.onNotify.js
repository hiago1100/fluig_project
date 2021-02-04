function onNotify(subject, receivers, template, params){
    
    // var Atv = getValue("WKNumState");
    // var NumProcess = getValue("WKNumProces");
    
    // log.info("#### ATIVIDADE: "+ Atv);
    // log.info("#### NUMERO PROCESSO: "+ NumProcess);
    // log.info("#### ---- INICIANDO DISPARO DE EMAIL ---- ####");

    // /* ATIVIDADE APROVAÇÃO */
    // if (Atv == '13') {

    //     try{
    //         var template   = "aprovacaoPendente";
    //         var emailCopia = "audit.fluig@ccab-agro.com.br";
    //         var users 	   = new Array();

    //         /* CONSULTA PROCESSO */
    //         var c1  = new Array();
    //         c1.push(DatasetFactory.createConstraint("workflowProcessPK.processInstanceId", NumProcess, NumProcess, ConstraintType.MUST));
    //         var dsProcesso = DatasetFactory.getDataset("workflowProcess", null, c1, null);
    //         var idDocument = dsProcesso.getValue(0, "cardDocumentId");

    //         /* CONSULTA DOCUMENTO */
    //         var c2  = new Array();
    //         c2.push(DatasetFactory.createConstraint("metadata#id", idDocument, idDocument, ConstraintType.MUST));
    //         c2.push(DatasetFactory.createConstraint("metadata#active", 'true', 'true', ConstraintType.MUST));
    //         var dsForm = DatasetFactory.getDataset("ds_solicitacao_compra", null, c2, null);

    //         var numSol    = NumProcess;
    //         var numPedido = dsForm.getValue(0, "numPedido");
    //         var user      = dsForm.getValue(0, "aprovadores");
    //         users = user.split(',');
        
    //         log.info("#### ---- Iniciando envio aprovações pendentes para aprovadores ---- ####");
    //         for(var i = 0; i < users.length; i++){

    //             var userA = users[i];
    //             var c3  = new Array();
	// 		    c3.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", userA, userA, ConstraintType.MUST));   
    //             var dsUser 	 = DatasetFactory.getDataset("colleague", null, c3, null);
    //             var nomeResp = dsUser.getValue(0, "colleagueName");
	// 		    var emailResp = dsUser.getValue(0, "mail");
    
    //             parameters = new java.util.HashMap();
    //             parameters.put("subject", subject);

    //             parameters.put("nome", nomeResp);
    //             parameters.put("numSolic", numSol);
    //             parameters.put("numpedido", numPedido)
    
    //             recipients = new java.util.ArrayList();
    //             recipients.add(emailResp);
    //             recipients.add(emailCopia);
    
    //             notifier.notify("44209840823", template, parameters, recipients,"text/html");
    //             log.info("#### ---- Notificação enviada com sucesso para "+userA+" ---- ####");
    //         }
    //     }catch(e){
    //         log.info("#### ---- Ops! Aconteceu um erro durante a tentativa de envio de e-mail: "+ e +" ---- ####");
    //     }
    // }

    // /* ATIVIDADE CENTRO DE CUSTO DIRETORIA */
    // if (Atv == '25') {
    //     try{
    //         var template   = "aprovacaoPendente";
    //         var emailCopia = "audit.fluig@ccab-agro.com.br";
    //         var users 	   = new Array();

    //         /* CONSULTA PROCESSO */
    //         var c1  = new Array();
    //         c1.push(DatasetFactory.createConstraint("workflowProcessPK.processInstanceId", NumProcess, NumProcess, ConstraintType.MUST));
    //         var dsProcesso = DatasetFactory.getDataset("workflowProcess", null, c1, null);
    //         var idDocument = dsProcesso.getValue(0, "cardDocumentId");

    //         /* CONSULTA DOCUMENTO */
    //         var c2  = new Array();
    //         c2.push(DatasetFactory.createConstraint("metadata#id", idDocument, idDocument, ConstraintType.MUST));
    //         c2.push(DatasetFactory.createConstraint("metadata#active", 'true', 'true', ConstraintType.MUST));
    //         var dsForm = DatasetFactory.getDataset("ds_solicitacao_compra", null, c2, null);

    //         var numSol    = NumProcess;
    //         var numPedido = dsForm.getValue(0, "numPedido");
    //         var user      = dsForm.getValue(0, "aprovadores");
    //         users = user.split(',');
        
    //         log.info("#### ---- Iniciando envio aprovações pendentes para aprovadores ---- ####");
    //         for(var i = 0; i < users.length; i++){

    //             var userA = users[i];
    //             var c3  = new Array();
	// 		    c3.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", userA, userA, ConstraintType.MUST));   
    //             var dsUser 	 = DatasetFactory.getDataset("colleague", null, c3, null);
    //             var nomeResp = dsUser.getValue(0, "colleagueName");
	// 		    var emailResp = dsUser.getValue(0, "mail");
    
    //             parameters = new java.util.HashMap();
    //             parameters.put("subject", subject);

    //             parameters.put("nome", nomeResp);
    //             parameters.put("numSolic", numSol);
    //             parameters.put("numpedido", numPedido)
    
    //             recipients = new java.util.ArrayList();
    //             recipients.add(emailResp);
    //             recipients.add(emailCopia);
    
    //             notifier.notify("44209840823", template, parameters, recipients,"text/html");
    //             log.info("#### ---- Notificação enviada com sucesso para "+userA+" ---- ####");
    //         }
    //     }catch(e){
    //         log.info("#### ---- Ops! Aconteceu um erro durante a tentativa de envio de e-mail: "+ e +" ---- ####");
    //     }
    // }

    // /* ATIVIDADE DIRETOR */
    // if(Atv == '21'){
    //     try{
    //         var template   = "aprovacaoPendente";
    //         var emailCopia = "audit.fluig@ccab-agro.com.br";

    //         /* CONSULTA PROCESSO */
    //         var c1  = new Array();
    //         c1.push(DatasetFactory.createConstraint("workflowProcessPK.processInstanceId", NumProcess, NumProcess, ConstraintType.MUST));
    //         var dsProcesso = DatasetFactory.getDataset("workflowProcess", null, c1, null);
    //         var idDocument = dsProcesso.getValue(0, "cardDocumentId");

    //         /* CONSULTA DOCUMENTO */
    //         var c2  = new Array();
    //         c2.push(DatasetFactory.createConstraint("metadata#id", idDocument, idDocument, ConstraintType.MUST));
    //         c2.push(DatasetFactory.createConstraint("metadata#active", 'true', 'true', ConstraintType.MUST));
    //         var dsForm = DatasetFactory.getDataset("ds_solicitacao_compra", null, c2, null);

    //         var numSol    = NumProcess;
    //         var numPedido = dsForm.getValue(0, "numPedido");
    //         var user      = dsForm.getValue(0, "diretor");
        
    //         log.info("#### ---- Iniciando envio aprovações pendentes para aprovadores ---- ####");

    //         var c3  = new Array();
	// 		c3.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", user, user, ConstraintType.MUST));   
            
    //         var dsUser 	 = DatasetFactory.getDataset("colleague", null, c3, null);
    //         var nomeResp = dsUser.getValue(0, "colleagueName");
	// 		var emailResp = dsUser.getValue(0, "mail");
    
    //         parameters = new java.util.HashMap();
    //         parameters.put("subject", subject);

    //         parameters.put("nome", nomeResp);
    //         parameters.put("numSolic", numSol);
    //         parameters.put("numpedido", numPedido)
    
    //         recipients = new java.util.ArrayList();
    //         recipients.add(emailResp);
    //         recipients.add(emailCopia);
    
    //         notifier.notify("44209840823", template, parameters, recipients,"text/html");
    //         log.info("#### ---- Notificação enviada com sucesso para "+userA+" ---- ####");
            
    //     }catch(e){
    //         log.info("#### ---- Ops! Aconteceu um erro durante a tentativa de envio de e-mail: "+ e +" ---- ####");
    //     }
    // }

    // /* ATIVIDADE DIRETORES */
    // if(Atv == '30'){
    //     try{
    //         var template   = "aprovacaoPendente";
    //         var emailCopia = "audit.fluig@ccab-agro.com.br";
    //         var users 	   = new Array();

    //         /* CONSULTA PROCESSO */
    //         var c1  = new Array();
    //         c1.push(DatasetFactory.createConstraint("workflowProcessPK.processInstanceId", NumProcess, NumProcess, ConstraintType.MUST));
    //         var dsProcesso = DatasetFactory.getDataset("workflowProcess", null, c1, null);
    //         var idDocument = dsProcesso.getValue(0, "cardDocumentId");

    //         /* CONSULTA DOCUMENTO */
    //         var c2  = new Array();
    //         c2.push(DatasetFactory.createConstraint("metadata#id", idDocument, idDocument, ConstraintType.MUST));
    //         c2.push(DatasetFactory.createConstraint("metadata#active", 'true', 'true', ConstraintType.MUST));
    //         var dsForm = DatasetFactory.getDataset("ds_solicitacao_compra", null, c2, null);

    //         /* CONSULTA PAPEL */
    //         var c3 = new Array();
    //         c3.push(DatasetFactory.createConstraint("workflowColleagueRolePK.roleId", "diretoria", "diretoria", ConstraintType.MUST));
    //         var dsPapel = DatasetFactory.getDataset("workflowColleagueRole", null, c3, null);

    //         var numSol    = NumProcess;
    //         var numPedido = dsForm.getValue(0, "numPedido");
            
    //         for(var i = 0; i < dsPapel.length; i++){
    //             users.push(dsPapel.getValue(i, "workflowColleagueRolePK.colleagueId"))
    //         }
        
    //         log.info("#### ---- Iniciando envio aprovações pendentes para aprovadores ---- ####");
    //         for(var i = 0; i < users.length; i++){

    //             var userA = users[i];
    //             var c4  = new Array();
	// 		    c4.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", userA, userA, ConstraintType.MUST));   
    //             var dsUser 	 = DatasetFactory.getDataset("colleague", null, c4, null);
    //             var nomeResp = dsUser.getValue(0, "colleagueName");
	// 		    var emailResp = dsUser.getValue(0, "mail");
    
    //             parameters = new java.util.HashMap();
    //             parameters.put("subject", subject);

    //             parameters.put("nome", nomeResp);
    //             parameters.put("numSolic", numSol);
    //             parameters.put("numpedido", numPedido)
    
    //             recipients = new java.util.ArrayList();
    //             recipients.add(emailResp);
    //             recipients.add(emailCopia);
    
    //             notifier.notify("44209840823", template, parameters, recipients,"text/html");
    //             log.info("#### ---- Notificação enviada com sucesso para "+userA+" ---- ####");
    //         }
    //     }catch(e){
    //         log.info("#### ---- Ops! Aconteceu um erro durante a tentativa de envio de e-mail: "+ e +" ---- ####");
    //     }
    // }

    // /* ATIVIDADE PEDIDO APROVADO */
    // if(Atv == '17'){
    //     try{
    //         var template   = "pedidoAprovado";
    //         var emailCopia = "audit.fluig@ccab-agro.com.br";

    //         /* CONSULTA PROCESSO */
    //         var c1  = new Array();
    //         c1.push(DatasetFactory.createConstraint("workflowProcessPK.processInstanceId", NumProcess, NumProcess, ConstraintType.MUST));
    //         var dsProcesso = DatasetFactory.getDataset("workflowProcess", null, c1, null);
    //         var idDocument = dsProcesso.getValue(0, "cardDocumentId");

    //         /* CONSULTA DOCUMENTO */
    //         var c2  = new Array();
    //         c2.push(DatasetFactory.createConstraint("metadata#id", idDocument, idDocument, ConstraintType.MUST));
    //         c2.push(DatasetFactory.createConstraint("metadata#active", 'true', 'true', ConstraintType.MUST));
    //         var dsForm = DatasetFactory.getDataset("ds_solicitacao_compra", null, c2, null);

    //         var numSol    = NumProcess;
    //         var numPedido = dsForm.getValue(0, "numPedido");
        
    //         log.info("#### ---- Iniciando envio aprovações pendentes para aprovadores ---- ####");
    //         var nomeResp = dsForm.getValue(0, "cpSolicitante");
	// 		var emailResp = dsForm.getValue(0, "cpEmailSolicitante");
    
    //         parameters = new java.util.HashMap();
    //         parameters.put("subject", subject);

    //         parameters.put("nome", nomeResp);
    //         parameters.put("numSolic", numSol);
    //         parameters.put("numpedido", numPedido)
    
    //         recipients = new java.util.ArrayList();
    //         recipients.add(emailResp);
    //         recipients.add(emailCopia);
    
    //         notifier.notify("44209840823", template, parameters, recipients,"text/html");
    //         log.info("#### ---- Notificação enviada com sucesso para "+userA+" ---- ####");
    //     }catch(e){
    //         log.info("#### ---- Ops! Aconteceu um erro durante a tentativa de envio de e-mail: "+ e +" ---- ####");
    //     }
    // }

    // /* ATIVIDADE PEDIDO REPROVADO */
    // if(Atv == '47'){
    //     try{
    //         var template   = "pedidoReprovado";
    //         var emailCopia = "audit.fluig@ccab-agro.com.br";

    //         /* CONSULTA PROCESSO */
    //         var c1  = new Array();
    //         c1.push(DatasetFactory.createConstraint("workflowProcessPK.processInstanceId", NumProcess, NumProcess, ConstraintType.MUST));
    //         var dsProcesso = DatasetFactory.getDataset("workflowProcess", null, c1, null);
    //         var idDocument = dsProcesso.getValue(0, "cardDocumentId");

    //         /* CONSULTA DOCUMENTO */
    //         var c2  = new Array();
    //         c2.push(DatasetFactory.createConstraint("metadata#id", idDocument, idDocument, ConstraintType.MUST));
    //         c2.push(DatasetFactory.createConstraint("metadata#active", 'true', 'true', ConstraintType.MUST));
    //         var dsForm = DatasetFactory.getDataset("ds_solicitacao_compra", null, c2, null);

    //         var numSol    = NumProcess;
    //         var numPedido = dsForm.getValue(0, "numPedido");
        
    //         log.info("#### ---- Iniciando envio aprovações pendentes para aprovadores ---- ####");
    //         var nomeResp = dsForm.getValue(0, "cpSolicitante");
	// 		var emailResp = dsForm.getValue(0, "cpEmailSolicitante");
    
    //         parameters = new java.util.HashMap();
    //         parameters.put("subject", subject);

    //         parameters.put("nome", nomeResp);
    //         parameters.put("numSolic", numSol);
    //         parameters.put("numpedido", numPedido)
    
    //         recipients = new java.util.ArrayList();
    //         recipients.add(emailResp);
    //         recipients.add(emailCopia);
    
    //         notifier.notify("44209840823", template, parameters, recipients,"text/html");
    //         log.info("#### ---- Notificação enviada com sucesso para "+userA+" ---- ####");
    //     }catch(e){
    //         log.info("#### ---- Ops! Aconteceu um erro durante a tentativa de envio de e-mail: "+ e +" ---- ####");
    //     }
    // }
}