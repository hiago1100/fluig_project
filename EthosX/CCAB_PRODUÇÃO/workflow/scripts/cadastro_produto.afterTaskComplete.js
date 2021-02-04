function afterTaskComplete(colleagueId,nextSequenceId,userList){
    var NumProcess = getValue("WKNumProces");

    if(nextSequenceId == 55 || nextSequenceId == 20 || nextSequenceId == 22 || nextSequenceId == 24 || nextSequenceId == 46){
        log.info("#### NUMERO DO PROCESSO: "+NumProcess);
        log.info("#### PROXIMA ATIVIDADE: "+nextSequenceId);

        /* CONSULTA PROCESSO */
        var c1  = new Array();
        c1.push(DatasetFactory.createConstraint("workflowProcessPK.processInstanceId", NumProcess, NumProcess, ConstraintType.MUST));
        var dsProcesso = DatasetFactory.getDataset("workflowProcess", null, c1, null);
        var idDocument = dsProcesso.getValue(0, "cardDocumentId");

        /* CONSULTA DOCUMENTO */
        var c2  = new Array();
        c2.push(DatasetFactory.createConstraint("metadata#id", idDocument, idDocument, ConstraintType.MUST));
        c2.push(DatasetFactory.createConstraint("metadata#active", 'true', 'true', ConstraintType.MUST));               
        var dsForm = DatasetFactory.getDataset("ds_cadastroProduto", null, c2, null);
        
        var aux          = dsForm.getValue(0, "auxRetorno");
        var ret          = dsForm.getValue(0, "retorno");
        var necess       = dsForm.getValue(0, "necess_retorno");
        var categoria    = dsForm.getValue(0, "tipoProdDesc");
        var departamento = dsForm.getValue(0, "departamento");
        var urlFluig     = "http://192.168.9.25/portal/p/1/";
        var substituto = null;
        
        log.info("########### ------------- AFTER TASK COMPLETE ------------- ###########");
        
        switch(nextSequenceId){
            case 55:
                var resp = dsForm.getValue(0, "supplyResp");
    
                if(departamento != "" && ret == "nao" && aux == ""){
                    if(resp == 'Pool:Role:suprimentos'){
                        var emailResp   = "suprimentos@ccab-agro.com.br";
                        var responsavel = "Para o departamento de <b>Suprimentos</b>, ";
                        var detalhes    = " que necessita de um ajuste ou complemento nas informações complementares referentes ao seu departamento.<br>";
                        var infoComp    = "<br><br> Informações adicionais: <br><br> Departamento requisitante: "+departamento+". <br> Necessidade: "+necess+". ";
                    }else{
                        /* CONSULTA USUARIO */
                        var c3 = new Array();
                        c3.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", resp, resp, ConstraintType.MUST));
                        var dsUser = DatasetFactory.getDataset("colleague", null, c3, null);
        
                        var nome  = dsUser.getValue(0, "colleagueName");
                        var emailResp = dsUser.getValue(0, "mail");

                        //VERIFICA SE HOUVE SUBSTITUTO
                        substituto = getInfoSubstituto(NumProcess, nextSequenceId);
                        if (substituto) {
                            var vsubst = getUserInfo(substituto);
                            if (vsubst.length > 0) {
                                substituto = vsubst[1];	
                            }	
                            else{
                                substituto = false;
                            }			
                        }
                        // --------
        
                        var responsavel = "Prezado "+nome+", ";
                        var detalhes    = " que necessita de um ajuste nas informações complementares que você forneceu. <br>";
                        var infoComp    = "<br><br> Informações adicionais: <br><br> Departamento requisitante: "+departamento+". <br> Necessidade: "+necess+". ";
                    }
                }else{
                    if(resp == 'Pool:Role:suprimentos'){
                        var emailResp   = "suprimentos@ccab-agro.com.br";
                        var responsavel = "Para o departamento <b>Suprimentos</b>, ";
                        var detalhes    = " que necessita de informações complementares referentes ao seu departamento.<br>";
                        var infoComp    = " ";

                    }else{
                        var c3 = new Array();
                        c3.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", resp, resp, ConstraintType.MUST));
                        var dsUser = DatasetFactory.getDataset("colleague", null, c3, null);
        
                        var nome  = dsUser.getValue(0, "colleagueName");
                        var emailResp = dsUser.getValue(0, "mail");

                        //VERIFICA SE HOUVE SUBSTITUTO
                        substituto = getInfoSubstituto(NumProcess, nextSequenceId);
                        if (substituto) {
                            var vsubst = getUserInfo(substituto);
                            if (vsubst.length > 0) {
                                substituto = vsubst[1];	
                            }	
                            else{
                                substituto = false;
                            }			
                        }
                        // --------
        
                        var responsavel = "Prezado "+nome+", ";
                        var detalhes    = " que recebeu complemento sobre a sua solicitação de complemento de informações de outro departamento. <br>";
                        var infoComp    = " ";
                    }
                }
            break;
            case 20:
                var resp = dsForm.getValue(0, "logistResp");

                if(departamento != "" && ret == "nao" && aux == ""){
                    if(resp == 'Pool:Role:logistica'){
                        
                        var emailResp   = "logistica@ccab-agro.com.br";
                        var responsavel = "Para o departamento <b>Logistica</b>, ";
                        var detalhes    = " que necessita de um ajuste ou complemento nas informações complementares referentes ao seu departamento.<br>";
                        var infoComp    = "<br><br> Informações adicionais: <br> Departamento requisitante: "+departamento+". <br> Necessidade: "+necess+". ";
                        
                    }else{
                        /* CONSULTA USUARIO */
                        var c3 = new Array();
                        c3.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", resp, resp, ConstraintType.MUST));
                        var dsUser = DatasetFactory.getDataset("colleague", null, c3, null);
            
                        var nome  = dsUser.getValue(0, "colleagueName");
                        var emailResp = dsUser.getValue(0, "mail");

                        //VERIFICA SE HOUVE SUBSTITUTO
                        substituto = getInfoSubstituto(NumProcess, nextSequenceId);
                        if (substituto) {
                            var vsubst = getUserInfo(substituto);
                            if (vsubst.length > 0) {
                                substituto = vsubst[1];	
                            }	
                            else{
                                substituto = false;
                            }			
                        }
                        // --------
            
                        var responsavel = "Prezado "+nome+", ";
                        var detalhes    = " que necessita de um ajuste nas informações complementares que você forneceu. <br>";
                        var infoComp    = "<br><br> Informações adicionais: <br> Departamento requisitante: "+departamento+". <br> Necessidade: "+necess+". ";
                    }
                }else{
                    if(resp == 'Pool:Role:logistica'){
                        
                        var emailResp   = "logistica@ccab-agro.com.br";
                        var responsavel = "Para o departamento <b>Logistica</b>, ";
                        var detalhes    = "que necessita de informações complementares referentes ao seu departamento.<br>";
                        var infoComp    = " ";
                    }else{
                        var c3 = new Array();
                        c3.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", resp, resp, ConstraintType.MUST));
                        var dsUser = DatasetFactory.getDataset("colleague", null, c3, null);
        
                        var nome  = dsUser.getValue(0, "colleagueName");
                        var emailResp = dsUser.getValue(0, "mail");

                        //VERIFICA SE HOUVE SUBSTITUTO
                        substituto = getInfoSubstituto(NumProcess, nextSequenceId);
                        if (substituto) {
                            var vsubst = getUserInfo(substituto);
                            if (vsubst.length > 0) {
                                substituto = vsubst[1];	
                            }	
                            else{
                                substituto = false;
                            }			
                        }
                        // --------
        
                        var responsavel = "Prezado "+nome+", ";
                        var detalhes    = " que recebeu complemento sobre a sua solicitação de complemento de informações de outro departamento. <br>";
                        var infoComp    = " ";
                    }
                }
            break;
            case 22:
                var resp = dsForm.getValue(0, "contabResp");

                if(departamento != "" && ret == "nao" && aux == ""){
                    if(resp == 'Pool:Role:contabilidade'){
                        
                        var emailResp   = "contabilidade@ccab-agro.com.br";
                        var responsavel = "Para o departamento <b>Contabilidade</b>, ";
                        var detalhes    = " que necessita de um ajuste ou complemento nas informações complementares referentes ao seu departamento.<br>";
                        var infoComp    = "<br><br> Informações adicionais: <br> Departamento requisitante: "+departamento+". <br> Necessidade: "+necess+". ";

                    }else{
                        /* CONSULTA USUARIO */
                        var c3 = new Array();
                        c3.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", resp, resp, ConstraintType.MUST));                        
                        var dsUser = DatasetFactory.getDataset("colleague", null, c3, null);
        
                        var nome  = dsUser.getValue(0, "colleagueName");
                        var emailResp = dsUser.getValue(0, "mail");

                        //VERIFICA SE HOUVE SUBSTITUTO
                        substituto = getInfoSubstituto(NumProcess, nextSequenceId);
                        if (substituto) {
                            var vsubst = getUserInfo(substituto);
                            if (vsubst.length > 0) {
                                substituto = vsubst[1];	
                            }	
                            else{
                                substituto = false;
                            }			
                        }
                        // --------
        
                        var responsavel = "Prezado "+nome+", ";
                        var detalhes    = " que necessita de um ajuste nas informações complementares que você forneceu. <br>";
                        var infoComp    = "<br><br> Informações adicionais: <br> Departamento requisitante: "+departamento+". <br> Necessidade: "+necess+". ";
                    }
                }else{
                    if(resp == 'Pool:Role:contabilidade'){

                        var emailResp   = "contabilidade@ccab-agro.com.br";
                        var responsavel = "Para o departamento <b>Contabilidade</b>, ";
                        var detalhes    = " que necessita de informações complementares referentes ao seu departamento.<br>";
                        var infoComp    = " ";
                    }else{
                        var c3 = new Array();
                        c3.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", resp, resp, ConstraintType.MUST));                        
                        var dsUser = DatasetFactory.getDataset("colleague", null, c3, null);
        
                        var nome  = dsUser.getValue(0, "colleagueName");
                        var emailResp = dsUser.getValue(0, "mail");

                        //VERIFICA SE HOUVE SUBSTITUTO
                        substituto = getInfoSubstituto(NumProcess, nextSequenceId);
                        if (substituto) {
                            var vsubst = getUserInfo(substituto);
                            if (vsubst.length > 0) {
                                substituto = vsubst[1];	
                            }	
                            else{
                                substituto = false;
                            }			
                        }
                        // --------
        
                        var responsavel = "Prezado "+nome+", ";
                        var detalhes    = " que recebeu complemento sobre a sua solicitação de complemento de informações de outro departamento. <br>";
                        var infoComp    = " ";
                    }
                }
            break;
            case 24:
                var resp = dsForm.getValue(0, "fiscalResp");

                if(departamento != "" && ret == "nao" && aux == ""){
                    if(resp == 'Pool:Role:fiscal'){
                        var emailResp   = "fiscal@ccab-agro.com.br";
                        var responsavel = "Para o departamento <b>Fiscal</b>, ";
                        var detalhes    = " que necessita de um ajuste ou complemento nas informações complementares referentes ao seu departamento.<br>";
                        var infoComp    = "<br><br> Informações adicionais: <br> Departamento requisitante: "+departamento+". <br> Necessidade: "+necess+". ";
                    }else{
                        /* CONSULTA USUARIO */
                        var c3 = new Array();
                        c3.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", resp, resp, ConstraintType.MUST));                        
                        var dsUser = DatasetFactory.getDataset("colleague", null, c3, null);
        
                        var nome  = dsUser.getValue(0, "colleagueName");
                        var emailResp = dsUser.getValue(0, "mail");

                        //VERIFICA SE HOUVE SUBSTITUTO
                        substituto = getInfoSubstituto(NumProcess, nextSequenceId);
                        if (substituto) {
                            var vsubst = getUserInfo(substituto);
                            if (vsubst.length > 0) {
                                substituto = vsubst[1];	
                            }	
                            else{
                                substituto = false;
                            }			
                        }
                        // --------
        
                        var responsavel = "Prezado "+nome+", ";
                        var detalhes    = " que necessita de um ajuste nas informações complementares que você forneceu. <br>";
                        var infoComp    = "<br><br> Informações adicionais: <br> Departamento requisitante: "+departamento+". <br> Necessidade: "+necess+". ";
                    }
                }else{
                    if(resp == 'Pool:Role:fiscal'){
                        var emailResp   = "fiscal@ccab-agro.com.br";
                        var responsavel = "Para o departamento <b>Fiscal</b>, ";
                        var detalhes    = " que necessita de informações complementares referentes ao seu departamento.<br>";
                        var infoComp    = " ";
                    }else{
                        var c3 = new Array();
                        c3.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", resp, resp, ConstraintType.MUST));                        
                        var dsUser = DatasetFactory.getDataset("colleague", null, c3, null);
        
                        var nome  = dsUser.getValue(0, "colleagueName");
                        var emailResp = dsUser.getValue(0, "mail");

                        //VERIFICA SE HOUVE SUBSTITUTO
                        substituto = getInfoSubstituto(NumProcess, nextSequenceId);
                        if (substituto) {
                            var vsubst = getUserInfo(substituto);
                            if (vsubst.length > 0) {
                                substituto = vsubst[1];	
                            }	
                            else{
                                substituto = false;
                            }			
                        }
                        // --------
        
                        var responsavel = "Prezado "+nome+", ";
                        var detalhes    = " que recebeu complemento sobre a sua solicitação de complemento de informações de outro departamento. <br>";
                        var infoComp    = " ";
                    }
                }
            break;
            case 46:
                var descricao = dsForm.getValue(0, "desc_produto");
                var codigo = hAPI.getCardValue('codigo_produto');

                var responsavel = "Aos interessados, ";
                var detalhes    = "<br><br> Existe um novo <b>Produto</b> cadastrado no sistema.<br>";
                var infoComp = "<br><br> Informações adicionais: <br> Categoria: "+categoria+ "<br> Codigo: "+codigo+". <br> Descrição: "+descricao+". ";
            break;

        }

        // var emailDev = "andreia.botto@wikitec.com.br";

        if(nextSequenceId == 46){
            // EMAIL DOS INTERESSADOS
            var emailInt1 = "suprimentos@ccab-agro.com.br";
            var emailInt2 = "logistica@ccab-agro.com.br";
            var emailInt3 = "fiscal@ccab-agro.com.br";
            var emailInt4 = "contabilidade@ccab-agro.com.br";
            var emailInt5 = "admvendas@ccab-agro.com.br";
            var emailInt6 = "wanderley.neto@wikitec.com.br";

            var linkProc = '<a target="_blank" href="'+ urlFluig +'pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID='+ NumProcess +'"> <b>'+ NumProcess +'</b> - Cadastro do Produto </a>';

            try{
                var subject = "Novo Produto no Sistema ";
                var template = "templateConclProd2";

                parameters = new java.util.HashMap();
                parameters.put("subject", subject);

                parameters.put("responsavel", responsavel);
                parameters.put("detalhe", detalhes);
                parameters.put("info", infoComp);
                parameters.put("linkProc", linkProc);
                
                recipients = new java.util.ArrayList();
                var campos   = hAPI.getCardData(NumProcess);
                var contador = campos.keySet().iterator();

                while (contador.hasNext()) {
                    var id = contador.next();
                
                    if (id.match("td_email")) {
                        var campo = campos.get(id);
                        recipients.add(campo);
                    }
                }
                // recipients.add(emailDev);
                recipients.add(emailInt1); // INTERESSADOS REAL
                recipients.add(emailInt2); // INTERESSADOS REAL
                recipients.add(emailInt3); // INTERESSADOS REAL
                recipients.add(emailInt4); // INTERESSADOS REAL
                recipients.add(emailInt5); // INTERESSADOS REAL
                recipients.add(emailInt6); // INTERESSADOS REAL                
                
                notifier.notify("44209840823", template, parameters, recipients,"text/html");
                log.info("#### ---- Notificação enviada com sucesso para "+emailResp+" ---- ####");
            }catch(e){
                log.info("#### ---- Ops! Aconteceu um erro durante a tentativa de envio de e-mail: "+ e +" ---- ####");
            }
            
        }else{
            var linkProc = '<a target="_blank" href="'+ urlFluig +'pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID='+ NumProcess +'"> <b>'+ NumProcess +'</b> - Cadastro do Produto </a>';
            
            try{
                var subject = "Cadastro de Produto - "+NumProcess+"";
                var template = "templateCadProd";

                parameters = new java.util.HashMap();
                parameters.put("subject", subject);

                parameters.put("responsavel", responsavel);
                parameters.put("detalhe", detalhes);
                parameters.put("categoria", categoria);
                parameters.put("info", infoComp);
                parameters.put("linkProc", linkProc);
                
                recipients = new java.util.ArrayList();
                // recipients.add(emailDev);
                recipients.add(emailResp); // USUARIO REAL

                if (substituto) {
                    log.info("#### ---- Notificação enviada com sucesso para SUBSTITUTO:  "+substituto+" ---- ####");
                    recipients.add(substituto);                    
                    
                }
                
                notifier.notify("44209840823", template, parameters, recipients,"text/html");
                log.info("#### ---- Notificação enviada com sucesso para "+emailResp+" ---- ####");
                // log.info("#### ---- Notificação enviada com sucesso para "+emailDev+" ---- ####");
            }catch(e){
                log.info("#### ---- Ops! Aconteceu um erro durante a tentativa de envio de e-mail: "+ e +" ---- ####");
            }
        }
    }

}

// =====================================================
// ============== FUNÇÃO DE SUBSTITUTO =================
// =====================================================


function getUserInfo(userid){
		
	var userInfo = new Array();

    var c3 = new Array();
    c3.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", userid, userid, ConstraintType.MUST));                        
	var dsUser = DatasetFactory.getDataset("colleague", null, c3, null);    
	var tam = dsUser.rowsCount; 
	if (tam > 0) {    
		userInfo[0]  = dsUser.getValue(0, "colleagueName");
		userInfo[1] =  dsUser.getValue(0, "mail");	
		return userInfo;
	}
	
	return false;
    
}

function getInfoSubstituto(solicitacao, atv) {
        
    solicitacao = 2352;
    
    var c1 = DatasetFactory.createConstraint('processTaskPK.processInstanceId', solicitacao, solicitacao, ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint('choosedSequence', atv, atv, ConstraintType.MUST);
    var movState = DatasetFactory.getDataset('processTask', null, new Array(c1, c2), null);
    var tam = movState.rowsCount; 
    
    var sequence = movState.getValue(tam - 2, "processTaskPK.movementSequence");
    sequence =  parseInt(sequence) + 1;
        		
    var c3 = DatasetFactory.createConstraint('processTaskPK.processInstanceId', solicitacao, solicitacao, ConstraintType.MUST);
    var c4 = DatasetFactory.createConstraint('processTaskPK.movementSequence', sequence, sequence, ConstraintType.MUST);
	var sol = DatasetFactory.getDataset('processTask', null, new Array(c3, c4), null);   
	tam = sol.rowsCount; 
        
	if (tam >= 0) {
		var substituto = sol.getValue(0, "completeColleagueId");	
		if (substituto) return substituto;
	}    

    return false;

}