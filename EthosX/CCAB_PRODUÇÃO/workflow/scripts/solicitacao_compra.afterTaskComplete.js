function afterTaskComplete(colleagueId,nextSequenceId,userList){
    var Atv = getValue("WKNumState");
    var NumProcess = getValue("WKNumProces");
    
    log.info("#### ATIVIDADE: "+ Atv);
    log.info("#### NEXT SEQUENCE ID: "+ nextSequenceId);
    log.info("#### NUMERO PROCESSO: "+ NumProcess);
    
    /* ATIVIDADE APROVAÇÃO */
    if (nextSequenceId == '13') {
        log.info("#### ---- INICIANDO DISPARO DE EMAIL ---- ####");

        try{
            var template   = "aprovacaoPendente";
            var emailCopia = "audit.fluig@ccab-agro.com.br";
            // ---- Remover depois
            // var emailDev   = "leticia.cavalcanti@wikitec.com.br";
            // ----
            var users 	   = new Array();

            /* CONSULTA PROCESSO */
            var c1  = new Array();
            c1.push(DatasetFactory.createConstraint("workflowProcessPK.processInstanceId", NumProcess, NumProcess, ConstraintType.MUST));
            var dsProcesso = DatasetFactory.getDataset("workflowProcess", null, c1, null);
            var idDocument = dsProcesso.getValue(0, "cardDocumentId");

            /* CONSULTA DOCUMENTO */
            var c2  = new Array();
            c2.push(DatasetFactory.createConstraint("metadata#id", idDocument, idDocument, ConstraintType.MUST));
            c2.push(DatasetFactory.createConstraint("metadata#active", 'true', 'true', ConstraintType.MUST));
            var dsForm = DatasetFactory.getDataset("ds_solicitacao_compra", null, c2, null);

            var numSol      = NumProcess;
            var numPedido   = dsForm.getValue(0, "numPedido");
            var solicitt    = dsForm.getValue(0, "cpSolicitante");
            var razaoSocial = dsForm.getValue(0, "cpRazao");
            var custo       = dsForm.getValue(0, "cpCodCusto");
            var user        = dsForm.getValue(0, "aprovadores");
            
            log.info(" #### ----- Razão Social: "+ razaoSocial + " #### -----");
            log.info(" #### ----- Cod Centro de Custo: "+ custo + " #### -----");
            log.info(" #### ----- Cod Centro de Custo: "+ custo.trim() + " #### -----");
            
            user  = user.split(',');

            /* VERIFICAÇÃO LISTA DE USUARIOS */
            for(var i = 0; i < user.length; i++){
            	var u = user[i];
            	var rept = false;
            
            	if(users.length == 0){
            		users.push(u);
            	}else{
            		for(var j = 0; j < users.length; j++){
            			if(users[j] == u){
            				rept = true;
            			}
            		}
            		if(rept == false){
            			users.push(u);
            		}
            	}
            }

            /* CONSULTA DESCRIÇÃO CENTRO DE CUSTO */
            var dsCusto = DatasetFactory.getDataset("ds_centroCusto", null, null, null);
	        for(var i = 0; i < dsCusto.rowsCount; i++){
                log.info("###############################################################");
	        	if(custo.trim() == dsCusto.getValue(i, "Codigo").trim()){
                    var centroCusto = dsCusto.getValue(i, "Centro de Custo");
                }
	        }
        
            log.info("#### ---- Iniciando envio aprovações pendentes para aprovadores ---- ####");
            for(var i = 0; i < users.length; i++){

                var userA = users[i];
                var c3  = new Array();
			    c3.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", userA, userA, ConstraintType.MUST));   
                var dsUser 	 = DatasetFactory.getDataset("colleague", null, c3, null);
                var nomeResp = dsUser.getValue(0, "colleagueName");
			    var emailResp = dsUser.getValue(0, "mail");
    
                var subject = "Pedido de Compra - Pendente para Aprovação";

                parameters = new java.util.HashMap();
                parameters.put("subject", subject);

                parameters.put("nome", nomeResp);
                parameters.put("numSolic", numSol);
                parameters.put("numpedido", numPedido);
                parameters.put("razaoSocial", razaoSocial);
                parameters.put("ccusto", centroCusto);
                parameters.put("solicitante", solicitt);
    
                recipients = new java.util.ArrayList();
                recipients.add(emailResp);
                recipients.add(emailCopia);
                // recipients.add(emailDev);
    
                notifier.notify("44209840823", template, parameters, recipients,"text/html");
                log.info("#### ---- Notificação enviada com sucesso para "+emailResp+" ---- ####");
            }
        }catch(e){
            log.info("#### ---- Ops! Aconteceu um erro durante a tentativa de envio de e-mail: "+ e +" ---- ####");
        }
    }

    /* ATIVIDADE CENTRO DE CUSTO DIRETORIA */
    if (nextSequenceId == '25') {
        log.info("#### ---- INICIANDO DISPARO DE EMAIL ---- ####");

        try{
            var template   = "aprovacaoPendente";
            var emailCopia = "audit.fluig@ccab-agro.com.br";
            // ---- Remover depois
            // var emailDev   = "leticia.cavalcanti@wikitec.com.br";
            // ----
            var users 	   = new Array();

            /* CONSULTA PROCESSO */
            var c1  = new Array();
            c1.push(DatasetFactory.createConstraint("workflowProcessPK.processInstanceId", NumProcess, NumProcess, ConstraintType.MUST));
            var dsProcesso = DatasetFactory.getDataset("workflowProcess", null, c1, null);
            var idDocument = dsProcesso.getValue(0, "cardDocumentId");

            /* CONSULTA DOCUMENTO */
            var c2  = new Array();
            c2.push(DatasetFactory.createConstraint("metadata#id", idDocument, idDocument, ConstraintType.MUST));
            c2.push(DatasetFactory.createConstraint("metadata#active", 'true', 'true', ConstraintType.MUST));
            var dsForm = DatasetFactory.getDataset("ds_solicitacao_compra", null, c2, null);

            var numSol      = NumProcess;
            var numPedido   = dsForm.getValue(0, "numPedido");
            var razaoSocial = dsForm.getValue(0, "cpRazao");
            var solicitt    = dsForm.getValue(0, "cpSolicitante");
            var custo       = dsForm.getValue(0, "cpCodCusto");
            var user        = dsForm.getValue(0, "aprovadores");
            
            user = user.split(',');

            /* VERIFICAÇÃO LISTA DE USUARIOS */
            for(var i = 0; i < user.length; i++){
            	var u = user[i];
            	var rept = false;
            
            	if(users.length == 0){
            		users.push(u);
            	}else{
            		for(var j = 0; j < users.length; j++){
            			if(users[j] == u){
            				rept = true;
            			}
            		}
            		if(rept == false){
            			users.push(u);
            		}
            	}
            }

            /* CONSULTA DESCRIÇÃO CENTRO DE CUSTO */
            var dsCusto = DatasetFactory.getDataset("ds_centroCusto", null, null, null);
	        for(var i = 0; i < dsCusto.rowsCount; i++){
	        	if(custo.trim() == dsCusto.getValue(i, "Codigo").trim()){
	        		var centroCusto = dsCusto.getValue(i, "Centro de Custo");
	        	}
	        }
        
            log.info("#### ---- Iniciando envio aprovação pendente ---- ####");
            for(var i = 0; i < users.length; i++){

                var userA = users[i];
                var c3  = new Array();
			    c3.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", userA, userA, ConstraintType.MUST));   
                var dsUser 	 = DatasetFactory.getDataset("colleague", null, c3, null);
                var nomeResp = dsUser.getValue(0, "colleagueName");
                var emailResp = dsUser.getValue(0, "mail");
                
                var subject = "Pedido de Compra - Pendente para Aprovação";
    
                parameters = new java.util.HashMap();
                parameters.put("subject", subject);

                parameters.put("nome", nomeResp);
                parameters.put("numSolic", numSol);
                parameters.put("numpedido", numPedido);
                parameters.put("razaoSocial", razaoSocial);
                parameters.put("ccusto", centroCusto);
                parameters.put("solicitante", solicitt);
    
                recipients = new java.util.ArrayList();
                recipients.add(emailResp);
                recipients.add(emailCopia);
                // recipients.add(emailDev);
    
                notifier.notify("44209840823", template, parameters, recipients,"text/html");
                log.info("#### ---- Notificação enviada com sucesso para "+emailResp+" ---- ####");
            }
        }catch(e){
            log.info("#### ---- Ops! Aconteceu um erro durante a tentativa de envio de e-mail: "+ e +" ---- ####");
        }
    }

    /* ATIVIDADE DIRETOR */
    if(nextSequenceId == '21'){
        log.info("#### ---- INICIANDO DISPARO DE EMAIL ---- ####");

        try{
            var template   = "aprovacaoPendente";
            var emailCopia = "audit.fluig@ccab-agro.com.br";
            // ---- Remover depois
            // var emailDev   = "leticia.cavalcanti@wikitec.com.br";
            // ----

            /* CONSULTA PROCESSO */
            var c1  = new Array();
            c1.push(DatasetFactory.createConstraint("workflowProcessPK.processInstanceId", NumProcess, NumProcess, ConstraintType.MUST));
            var dsProcesso = DatasetFactory.getDataset("workflowProcess", null, c1, null);
            var idDocument = dsProcesso.getValue(0, "cardDocumentId");

            /* CONSULTA DOCUMENTO */
            var c2  = new Array();
            c2.push(DatasetFactory.createConstraint("metadata#id", idDocument, idDocument, ConstraintType.MUST));
            c2.push(DatasetFactory.createConstraint("metadata#active", 'true', 'true', ConstraintType.MUST));
            var dsForm = DatasetFactory.getDataset("ds_solicitacao_compra", null, c2, null);

            var numSol      = NumProcess;
            var numPedido   = dsForm.getValue(0, "numPedido");
            var solicitt    = dsForm.getValue(0, "cpSolicitante");
            var razaoSocial = dsForm.getValue(0, "cpRazao");
            var custo       = dsForm.getValue(0, "cpCodCusto");
            var user        = dsForm.getValue(0, "diretor");

            /* CONSULTA DESCRIÇÃO CENTRO DE CUSTO */
            var dsCusto = DatasetFactory.getDataset("ds_centroCusto", null, null, null);
	        for(var i = 0; i < dsCusto.rowsCount; i++){
	        	if(custo.trim() == dsCusto.getValue(i, "Codigo").trim()){
	        		var centroCusto = dsCusto.getValue(i, "Centro de Custo");
	        	}
	        }
        
            log.info("#### ---- Iniciando envio aprovação pendente para diretor ---- ####");

            var c3  = new Array();
			c3.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", user, user, ConstraintType.MUST));   
            
            var dsUser 	 = DatasetFactory.getDataset("colleague", null, c3, null);
            var nomeResp = dsUser.getValue(0, "colleagueName");
			var emailResp = dsUser.getValue(0, "mail");
    
            var subject = "Pedido de Compra - Pendente para Aprovação";

            parameters = new java.util.HashMap();
            parameters.put("subject", subject);

            parameters.put("nome", nomeResp);
            parameters.put("numSolic", numSol);
            parameters.put("numpedido", numPedido);
            parameters.put("razaoSocial", razaoSocial);
            parameters.put("ccusto", centroCusto);
            parameters.put("solicitante", solicitt);
    
            recipients = new java.util.ArrayList();
            recipients.add(emailResp);
            recipients.add(emailCopia);
            // recipients.add(emailDev);
    
            notifier.notify("44209840823", template, parameters, recipients,"text/html");
            log.info("#### ---- Notificação enviada com sucesso para "+emailResp+" ---- ####");
            
        }catch(e){
            log.info("#### ---- Ops! Aconteceu um erro durante a tentativa de envio de e-mail: "+ e +" ---- ####");
        }
    }

    /* ATIVIDADE DIRETORES */
    if(nextSequenceId == '30'){
        log.info("#### ---- INICIANDO DISPARO DE EMAIL ---- ####");

        try{
            var template   = "aprovacaoPendente";
            var emailCopia = "audit.fluig@ccab-agro.com.br";
            // ---- Remover depois
            // var emailDev   = "leticia.cavalcanti@wikitec.com.br";
            // ----
            var users 	   = new Array();

            /* CONSULTA PROCESSO */
            var c1  = new Array();
            c1.push(DatasetFactory.createConstraint("workflowProcessPK.processInstanceId", NumProcess, NumProcess, ConstraintType.MUST));
            var dsProcesso = DatasetFactory.getDataset("workflowProcess", null, c1, null);
            var idDocument = dsProcesso.getValue(0, "cardDocumentId");

            /* CONSULTA DOCUMENTO */
            var c2  = new Array();
            c2.push(DatasetFactory.createConstraint("metadata#id", idDocument, idDocument, ConstraintType.MUST));
            c2.push(DatasetFactory.createConstraint("metadata#active", 'true', 'true', ConstraintType.MUST));
            var dsForm = DatasetFactory.getDataset("ds_solicitacao_compra", null, c2, null);

            /* CONSULTA PAPEL */
            var c3 = new Array();
            c3.push(DatasetFactory.createConstraint("workflowColleagueRolePK.roleId", "diretoria", "diretoria", ConstraintType.MUST));
            var dsPapel = DatasetFactory.getDataset("workflowColleagueRole", null, c3, null);

            var numSol      = NumProcess;
            var numPedido   = dsForm.getValue(0, "numPedido");
            var solicitt    = dsForm.getValue(0, "cpSolicitante");
            var razaoSocial = dsForm.getValue(0, "cpRazao");
            var custo       = dsForm.getValue(0, "cpCodCusto");

            /* CONSULTA DESCRIÇÃO CENTRO DE CUSTO */
            var dsCusto = DatasetFactory.getDataset("ds_centroCusto", null, null, null);
	        for(var i = 0; i < dsCusto.rowsCount; i++){
	        	if(custo.trim() == dsCusto.getValue(i, "Codigo").trim()){
	        		var centroCusto = dsCusto.getValue(i, "Centro de Custo");
	        	}
	        }
            
            for(var i = 0; i < dsPapel.length; i++){
                users.push(dsPapel.getValue(i, "workflowColleagueRolePK.colleagueId"))
            }
        
            log.info("#### ---- Iniciando envio aprovações pendentes para diretores ---- ####");
            for(var i = 0; i < users.length; i++){

                var userA = users[i];
                var c4  = new Array();
			    c4.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", userA, userA, ConstraintType.MUST));   
                var dsUser 	 = DatasetFactory.getDataset("colleague", null, c4, null);
                var nomeResp = dsUser.getValue(0, "colleagueName");
			    var emailResp = dsUser.getValue(0, "mail");
    
                var subject = "Pedido de Compra - Pendente para Aprovação";

                parameters = new java.util.HashMap();
                parameters.put("subject", subject);

                parameters.put("nome", nomeResp);
                parameters.put("numSolic", numSol);
                parameters.put("numpedido", numPedido);
                parameters.put("razaoSocial", razaoSocial);
                parameters.put("ccusto", centroCusto);
                parameters.put("solicitante", solicitt);
    
                recipients = new java.util.ArrayList();
                recipients.add(emailResp);
                recipients.add(emailCopia);
                // recipients.add(emailDev);
    
                notifier.notify("44209840823", template, parameters, recipients,"text/html");
                log.info("#### ---- Notificação enviada com sucesso para "+userA+" ---- ####");
            }
        }catch(e){
            log.info("#### ---- Ops! Aconteceu um erro durante a tentativa de envio de e-mail: "+ e +" ---- ####");
        }
    }

    /* ATIVIDADE PEDIDO APROVADO */
    if(nextSequenceId == '17'){
        log.info("#### ---- INICIANDO DISPARO DE EMAIL ---- ####");

        // Usuarios 
        try{
            var template   = "pedidoAprovado";
            var emailCopia = "audit.fluig@ccab-agro.com.br";
            // ---- Remover depois
            // var emailDev   = "leticia.cavalcanti@wikitec.com.br";
            // ----

            /* CONSULTA PROCESSO */
            var c1  = new Array();
            c1.push(DatasetFactory.createConstraint("workflowProcessPK.processInstanceId", NumProcess, NumProcess, ConstraintType.MUST));
            var dsProcesso = DatasetFactory.getDataset("workflowProcess", null, c1, null);
            var idDocument = dsProcesso.getValue(0, "cardDocumentId");

            /* CONSULTA DOCUMENTO */
            var c2  = new Array();
            c2.push(DatasetFactory.createConstraint("metadata#id", idDocument, idDocument, ConstraintType.MUST));
            c2.push(DatasetFactory.createConstraint("metadata#active", 'true', 'true', ConstraintType.MUST));
            var dsForm = DatasetFactory.getDataset("ds_solicitacao_compra", null, c2, null);

            var numSol      = NumProcess;
            var numPedido   = dsForm.getValue(0, "numPedido");
            var filialPed   = dsForm.getValue(0, "cpFilial");
            var custo       = dsForm.getValue(0, "cpCodCusto");
            var razaoSocial = dsForm.getValue(0, "cpRazao");
        
            /* CONSULTA DESCRIÇÃO CENTRO DE CUSTO */
            var dsCusto = DatasetFactory.getDataset("ds_centroCusto", null, null, null);
	        for(var i = 0; i < dsCusto.rowsCount; i++){
	        	if(custo.trim() == dsCusto.getValue(i, "Codigo").trim()){
	        		var centroCusto = dsCusto.getValue(i, "Centro de Custo");
	        	}
            }
            
            log.info("#### ---- Iniciando envio informativo de aprovação do pedido ---- ####");
            var nomeResp   = dsForm.getValue(0, "cpSolicitante");
            var emailResp  = dsForm.getValue(0, "cpEmailSolicitante");
            // var emailResp2 = "notas_classificar@ccab-agro.com.br";
    
            var subject = "O pedido "+ numPedido + " da filial "+ filialPed +" foi aprovada com sucesso!";

            var solicit = '<a target="_blank" href="http://192.168.9.25/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID='+ numSol +'"> <b> Solicitação: </b> '+ numSol +' - Pedido de Compra </a><br/>';

            parameters = new java.util.HashMap();

            parameters.put("subject", subject);

            parameters.put("nome", nomeResp);
            parameters.put("numSolic", numSol);
            parameters.put("numpedido", numPedido);
            parameters.put("razaoSocial", razaoSocial);
            parameters.put("ccusto", centroCusto);
            parameters.put("solicitante", nomeResp);
    
            recipients = new java.util.ArrayList();

            recipients.add(emailResp);
            recipients.add(emailCopia);
            // recipients.add(emailResp2);
            // recipients.add(emailDev);
    
            notifier.notify("44209840823", template, parameters, recipients,"text/html");
            log.info("#### ---- Notificação enviada com sucesso para "+emailResp+" ---- ####");
            // log.info("#### ---- Notificação enviada com sucesso para "+emailResp2+" ---- ####");

        }catch(e){
            log.info("#### ---- Ops! Aconteceu um erro durante a tentativa de envio de e-mail: "+ e +" ---- ####");
        }
      
    }

    /* ATIVIDADE PEDIDO REPROVADO */
    if(nextSequenceId == '47'){
        log.info("#### ---- INICIANDO DISPARO DE EMAIL ---- ####");

        try{
            var template   = "pedidoReprovado";
            var emailCopia = "audit.fluig@ccab-agro.com.br";
            // ---- Remover depois
            // var emailDev   = "leticia.cavalcanti@wikitec.com.br";
            // ----

            /* CONSULTA PROCESSO */
            var c1  = new Array();
            c1.push(DatasetFactory.createConstraint("workflowProcessPK.processInstanceId", NumProcess, NumProcess, ConstraintType.MUST));
            var dsProcesso = DatasetFactory.getDataset("workflowProcess", null, c1, null);
            var idDocument = dsProcesso.getValue(0, "cardDocumentId");

            /* CONSULTA DOCUMENTO */
            var c2  = new Array();
            c2.push(DatasetFactory.createConstraint("metadata#id", idDocument, idDocument, ConstraintType.MUST));
            c2.push(DatasetFactory.createConstraint("metadata#active", 'true', 'true', ConstraintType.MUST));
            var dsForm = DatasetFactory.getDataset("ds_solicitacao_compra", null, c2, null);

            var numSol      = NumProcess;
            var numPedido   = dsForm.getValue(0, "numPedido");
            var custo       = dsForm.getValue(0, "cpCodCusto");
            var razaoSocial = dsForm.getValue(0, "cpRazao");

            /* CONSULTA DESCRIÇÃO CENTRO DE CUSTO */
            var dsCusto = DatasetFactory.getDataset("ds_centroCusto", null, null, null);
	        for(var i = 0; i < dsCusto.rowsCount; i++){
	        	if(custo.trim() == dsCusto.getValue(i, "Codigo").trim()){
	        		var centroCusto = dsCusto.getValue(i, "Centro de Custo");
	        	}
	        }
        
            log.info("#### ---- Iniciando envio informativo de reprovação do pedido ---- ####");
            var nomeResp = dsForm.getValue(0, "cpSolicitante");
			var emailResp = dsForm.getValue(0, "cpEmailSolicitante");
    
            var subject = "Pedido de Compra " + numPedido + " REPROVADO";

            parameters = new java.util.HashMap();
            parameters.put("subject", subject);

            parameters.put("nome", nomeResp);
            parameters.put("numSolic", numSol);
            parameters.put("numpedido", numPedido);
            parameters.put("razaoSocial", razaoSocial);
            parameters.put("ccusto", centroCusto);
            parameters.put("solicitante", nomeResp);
    
            recipients = new java.util.ArrayList();
            recipients.add(emailResp);
            recipients.add(emailCopia);
            // recipients.add(emailDev);
    
            notifier.notify("44209840823", template, parameters, recipients,"text/html");
            log.info("#### ---- Notificação enviada com sucesso para "+emailResp+" ---- ####");
        }catch(e){
            log.info("#### ---- Ops! Aconteceu um erro durante a tentativa de envio de e-mail: "+ e +" ---- ####");
        }
    }
}