function startStepProcess(form,index,row){
	try{		
		var sdf = new java.text.SimpleDateFormat("dd/MM/yyyy HH:MM");	
		var endPoint = '/process-management/api/v2/processes/PR-021/start';
        var clientService = fluigAPI.getAuthorizeClientService();
        var data = {                                                   
                companyId : getValue("WKCompany") + '',
                serviceCode : 'fluigAPI',                     
                endpoint : endPoint,  
                method : 'post', // 'delete', 'patch', 'post', 'get'                                        
                timeoutService: '100', // segundos
                params : {
                	  		"targetState": 5,
                	  		"subProcessTargetState": 0,
                	  		"comment": "Iniciado via cadastro de etapa.",
                	  		"formFields": {
            	  				"form_etapa_id": ""+form.getCardIndex(),
            	  				"card_etapa_id": ""+form.getDocumentId(),
            	  				"card_version_etapa_id": ""+form.getVersion(),
        	  					"row_etapa": ""+row,
            	  				"id_solicitante": ""+form.getValue("tb_cd_usuario_versao___"+index),
            	  				"nm_solicitante": ""+form.getValue("tb_nm_usuario_versao___"+index),
            	  				"dt_hr_solicitacao": ""+sdf.format(new Date()),
            	  				"cd_contrato": ""+form.getValue("cd_contrato"),
            	  				"versao_contrato": ""+form.getValue("tb_versao_etapa___"+index),
            	  				"etapa_contrato": ""+form.getValue("cd_etapa"),
            	  				"desc_versao_etapa": ""+form.getValue("tb_ds_versao_etapa___"+index),
            	  				"id_fiscal_etapa": ""+form.getValue("matricula_fiscal"),
            	  				"nm_fiscal_etapa": ""+form.getValue("zoom_fiscal"),
                	  		}
                		}	                                
            }                                                          
            var vo = clientService.invoke(JSON.stringify(data));
        	
            if(vo.getResult()== null || vo.getResult().isEmpty()){
            	 log.info("Erro no startProcess de aprovação de versão da etapa. Favor contactar um administrador do sistema.");
    			 return false;
            }
            
    } catch(e) {
    	 log.info("Erro no startProcess de aprovação de versão da etapa: "+e);
    	 return false;
    }
}