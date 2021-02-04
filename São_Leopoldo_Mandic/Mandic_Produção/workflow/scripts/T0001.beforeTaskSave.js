function beforeTaskSave(colleagueId,nextSequenceId,userList){

	var fnEmail      = loadLivTNU(["com.totvsNacoesUnidas.fluig.js.ds.CustomEmail"]);
	var TipoProcesso = hAPI.getCardValue("txtTipoProcesso");
    var activity     = getValue('WKNumState');
    var atv = hAPI.getCardValue("ATIVIDADEATUAL");
    var numProcess = getValue("WKNumProces");
      
    // dados para o E-mail

    var parametroPrincipal = hAPI.getCardValue('txtTipoProcesso');

    log.info("numero do processo"+ numProcess);

    var linkProcess = "https://fluig.slmandic.edu.br/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID="+numProcess+" "; 
    var linkAux = "<a href='"+linkProcess+"' _blank>"+numProcess+"</a>";

    
    var solicitante     =  hAPI.getCardValue('txtUsuarioRM');      
    var eUnidade        =  hAPI.getCardValue('txtFilial');      
    var dataSolicitacao =  hAPI.getCardValue('txtData');             
    var obsDois         =  hAPI.getCardValue('txtHistoricoMOV'); 
    var aprovSup        =  "";
    var gestorCentro    =  hAPI.getCardValue('lbAprovador');
    
    var emailSolicitante = "";

    if (emailSolicitante != "" || emailSolicitante != undefined || emailSolicitante != null) {

       emailSolicitante = hAPI.getCardValue('emailSolicitante');

    }

    //********************************** dados que serão do PaixFilho **********************************

    // var item            =  hAPI.getCardValue('txtcodigoPRD');      
    // var unidade         =  hAPI.getCardValue('txtCodCCusto');      
    // var quantidade      =  hAPI.getCardValue('txtQtdSolicitada');      
    // var valorUnitario   =  hAPI.getCardValue('txtPrecoUnitario');      
    // var obs             =  hAPI.getCardValue('txtHistoricoITMMOV');      
       
    //**********************************fim dados que serão do PaixFilho ********************
    var valorTotal      =  hAPI.getCardValue('txtValorItens');   
    //**********************************fim dados para E-mail ******************************* 
 
    var fornecedor      =  hAPI.getCardValue('txtFornecedor'); 
        if (fornecedor == "undefined" || fornecedor == undefined || fornecedor == null) {

            fornecedor = "";
        }


 if(atv == 5){ 

     var aprovado     = hAPI.getCardValue("QTDAPROVADOCCU");

     if (aprovado == "0000") {

        aprovSup = "Reprovado";

      }else{

        aprovSup = "Aprovado";
      }
 


   }else if (atv == 46 ) {

          var aprovado     = hAPI.getCardValue("QTDAPROVADOFIN");

         if (aprovado == "0000") {

            aprovSup = "Reprovado";

          }else{

            aprovSup = "Aprovado";
          }


    } else if (atv == 69 ) {

          var aprovado     = hAPI.getCardValue("QTDAPROVADOMAN");

          if (aprovado == "0000") {

            aprovSup = "Reprovado";

          }else{

            aprovSup = "Aprovado";
          }

    }




    if(nextSequenceId == 63) { // Pós testes será 63

        

        log.info("*** Dentro do nextSequenceId");

            //regra para diferentes tipos de inicio de solicitação

            var index = getChildrenIndexes("txtHistoricoITMMOV");
            var strTipo = "";


            for (var i= 0;i<index.length; i++) {
                
                var item            =  hAPI.getCardValue('txtcodigoPRD___'+index[i]);      
                var unidade         =  hAPI.getCardValue('txtCodCCusto___'+index[i]);      
                var quantidade      =  hAPI.getCardValue('txtQtdSolicitada___'+index[i]);      
                var valorUnitario   =  hAPI.getCardValue('txtPrecoUnitario___'+index[i]);      
                var obs             =  hAPI.getCardValue('txtHistoricoITMMOV___'+index[i]);
                var aprovItem       =  hAPI.getCardValue('comAprovado___'+index[i]);
                var obsAprovItem    =  hAPI.getCardValue('txtJustificativa___'+index[i]);
                var aprovItem2      =  hAPI.getCardValue('comAprFinanceiro___'+index[i]);
                var obsAprovItem2   =  hAPI.getCardValue('txtJustificativaFin___'+index[i]);
                var aprovItem3      =  hAPI.getCardValue('comAprMantenedora___'+index[i]);
                var obsAprovItem3   =  hAPI.getCardValue('txtJustificativaMan___'+index[i]);     

                log.info("*** Dados1 "+item);
                log.info("*** Dados2 "+unidade);
                log.info("*** Dados3 "+quantidade);
                log.info("*** Dados4 "+valorUnitario);
                log.info("*** Dados5 "+obs);

                
                var dadosTable = "<tr>"+ 
                                 "<td align='center'>"+item+"<br>("+unidade+")</td>" +
                                 //"<td align='center'>"+unidade+"</td>" +
                                 "<td align='center'>"+quantidade+"</td>" +
                                 "<td align='center'>"+valorUnitario+"</td>" +
                                 "<td align='center'>"+obs+"</td>"+
                                 "<td align='center'>"+aprovItem+ " - " +obsAprovItem+ "<br>"+aprovItem2+ " - "+obsAprovItem2+"<br>"+aprovItem3+ " - " +obsAprovItem3+ "</td>";



             }
                    dadosTable = dadosTable + "</tr>";

       if(parametroPrincipal == "1" || parametroPrincipal == "2" || parametroPrincipal == "4") {
        

        if (TipoProcesso == "1") {
             strTipo = "Requisição de Produtos ou Serviços.";
        }else if(TipoProcesso == "2"){
             strTipo = "Parcela de contrato já estabelecida para pagamento.";
        }else if (TipoProcesso == "4") {
             strTipo = "Resuprimento do Almoxarifado.";
        }

           // var fornecedor = "";

            fnEmail.mail.sendCustomEmail({
                companyId: getValue("WKCompany"),
                subject: "Status de Aprovação Requisição de Compras #"+numProcess+" "+aprovSup+" ",
                from: "hiago.oliveira@grupodkp.com.br",
                to: emailSolicitante,
                templateId: "tempEmailReqMaterial",
                templateDialect: "pt_BR",
                templateHtml: "statusAprovacao.html",
                dados: {
                    "numProcesso": linkAux,
                    "solicitante": solicitante,
                    "eUnidade": eUnidade,                    
                    "dataSolicitacao": dataSolicitacao,
                    "tipoSolic":strTipo,
                    "fornecedor":'', //Apenas para tipo 3
                    "dadosTable":dadosTable,
                    "valorTotal":valorTotal,
                    "obsDois":obsDois 
                }
            });

            log.info("*** Fim do envio E-mail");

         }else if(parametroPrincipal == "3") {

            if (TipoProcesso == "3") {
             strTipo = "Compra direta, aprovada pela mantenedora.";
             }


            fnEmail.mail.sendCustomEmail({
                companyId: getValue("WKCompany"),
                subject: "Status de Aprovação Requisição de Compras #"+numProcess+" "+aprovSup+" ",
                from: "hiago.oliveira@grupodkp.com.br",
                to: emailSolicitante,
                templateId: "tempEmailReqMaterial",
                templateDialect: "pt_BR",
                templateHtml: "statusAprovacao.html",
                dados: {
                    "numProcesso": linkAux,
                    "solicitante": solicitante,
                    "eUnidade": eUnidade,                    
                    "dataSolicitacao": dataSolicitacao,
                    "tipoSolic":strTipo,
                    "fornecedor":fornecedor, //ok
                    "dadosTable":dadosTable,
                    "valorTotal":valorTotal,
                    "obsDois":obsDois 
                }
            });




        }
        

    }
    
    
    

        if ((activity == 4) || (activity == 0)){

    
          if ((TipoProcesso != "1" ) & (TipoProcesso != "4" )) {

            var anexos   = hAPI.listAttachments();
            var temAnexo = false;


            if (anexos.size() > 0) {
                temAnexo = true;
            }

            if ((!temAnexo)){
                throw "Para este Tipo de Requisição deve ter Arquivo Anexado! ";
            }
          }
        } else if ((activity == 5) && (TipoProcesso == "1")) {

        var revisado     = hAPI.getCardValue("QTDREVISADOCCU");
        var reprovado    = hAPI.getCardValue("QTDREPROVADOCCU");
        var aprovado     = hAPI.getCardValue("QTDAPROVADOCCU");

        log.info("*** CRM *** QTD Revisado "+revisado);
        log.info("*** CRM *** QTD Reprovado "+reprovado);
        log.info("*** CRM *** QTD Aprovado "+aprovado);
       
        if ((revisado == "0000") && ( aprovado > "0000" )) {

                    var nseq = 0;


                    // Criando o Processo de Estoque T0002

            
                        var workflowEngineServiceProvider = ServiceManager.getServiceInstance("WorkflowEngineService");
                        var workflowEngineServiceLocator = workflowEngineServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.ECMWorkflowEngineServiceService");
                        var workflowEngineService = workflowEngineServiceLocator.getWorkflowEngineServicePort();
          
                        log.info("*** CRM *** Criado o Serviço ");
          
                        // Cria o ProcessAttachmentDtoArray
                        var processAttachmentDtoArray = workflowEngineServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.ProcessAttachmentDtoArray");
                      
                        // Cria o ObjectFactory
                        var objectFactory = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.ObjectFactory");
                          
                        var cardData = objectFactory.createStringArrayArray();

                        var fieldCampo1 = objectFactory.createStringArray();
                        fieldCampo1.getItem().add("txtNumRequisicao"); 
                        fieldCampo1.getItem().add(numProcess.toString());        
                        cardData.getItem().add(fieldCampo1); 

                        var fieldCampo2 = objectFactory.createStringArray();
                        fieldCampo2.getItem().add("txtColigada"); 
                        fieldCampo2.getItem().add(hAPI.getCardValue("txtColigada"));        
                        cardData.getItem().add(fieldCampo2); 

                        var fieldCampo3 = objectFactory.createStringArray();
                        fieldCampo3.getItem().add("CODCOLIGADA"); 
                        fieldCampo3.getItem().add(hAPI.getCardValue("CODCOLIGADA"));        
                        cardData.getItem().add(fieldCampo3);


                        var fieldCampo4 = objectFactory.createStringArray();
                        fieldCampo4.getItem().add("txtFilial"); 
                        fieldCampo4.getItem().add(hAPI.getCardValue("txtFilial"));        
                        cardData.getItem().add(fieldCampo4);


                        var fieldCampo5 = objectFactory.createStringArray();
                        fieldCampo5.getItem().add("CODFILIAL"); 
                        fieldCampo5.getItem().add(hAPI.getCardValue("CODFILIAL"));        
                        cardData.getItem().add(fieldCampo5);


                        var fieldCampo6 = objectFactory.createStringArray();
                        fieldCampo6.getItem().add("txtLocalEstoque"); 
                        fieldCampo6.getItem().add(hAPI.getCardValue("txtLocalEstoque"));        
                        cardData.getItem().add(fieldCampo6);

                        var fieldCampo7 = objectFactory.createStringArray();
                        fieldCampo7.getItem().add("CODLOC"); 
                        fieldCampo7.getItem().add(hAPI.getCardValue("CODLOC"));        
                        cardData.getItem().add(fieldCampo7);

                        var fieldCampo8 = objectFactory.createStringArray();
                        fieldCampo8.getItem().add("txtSolicitanteRM"); 
                        fieldCampo8.getItem().add(hAPI.getCardValue("txtRequisitante"));        
                        cardData.getItem().add(fieldCampo8);

                        var fieldCampo9 = objectFactory.createStringArray();
                        fieldCampo9.getItem().add("txtUsuarioAprovador"); 
                        fieldCampo9.getItem().add(hAPI.getCardValue("txtUserApr"));        
                        cardData.getItem().add(fieldCampo9);

                        var fieldCampo6 = objectFactory.createStringArray();
                        fieldCampo6.getItem().add("CODVEN"); 
                        fieldCampo6.getItem().add(hAPI.getCardValue("CODVEN"));        
                        cardData.getItem().add(fieldCampo6);

                        var itens = hAPI.getCardData(numProcess);
                        var keys = itens.keySet().toArray();
                        
                          for (var key in keys) {
                              var field = keys[key];

                            if (field.indexOf("txtEstoque___") > -1) {
                              
                              var index = field.replace("txtEstoque___", "");
                              
                                if ( hAPI.getCardValue("txtEstoque___"+index) > "0") {

                                        nseq = nseq + 1;

                                                var fieldCampoA = objectFactory.createStringArray();
                                                fieldCampoA.getItem().add("txtCodigoPRD___"+index); 
                                                fieldCampoA.getItem().add(hAPI.getCardValue("txtCodigoPRD___"+index));        
                                                cardData.getItem().add(fieldCampoA);

                                                var fieldCampoB = objectFactory.createStringArray();
                                                fieldCampoB.getItem().add("IDPRD___"+index); 
                                                fieldCampoB.getItem().add(hAPI.getCardValue("IDPRD___"+index));        
                                                cardData.getItem().add(fieldCampoB);

                                                var fieldCampoC = objectFactory.createStringArray();
                                                fieldCampoC.getItem().add("CODIGOPRD___"+index); 
                                                fieldCampoC.getItem().add(hAPI.getCardValue("CODIGOPRD___"+index));        
                                                cardData.getItem().add(fieldCampoC);

                                                var fieldCampoD = objectFactory.createStringArray();
                                                fieldCampoD.getItem().add("txtCodCCusto___"+index); 
                                                fieldCampoD.getItem().add(hAPI.getCardValue("txtCodCCusto___"+index));        
                                                cardData.getItem().add(fieldCampoD);

                                                var fieldCampoE = objectFactory.createStringArray();
                                                fieldCampoE.getItem().add("CODCCUSTO___"+index); 
                                                fieldCampoE.getItem().add(hAPI.getCardValue("CODCCUSTO___"+index));        
                                                cardData.getItem().add(fieldCampoE);

                                                var quantidade = hAPI.getCardValue("txtEstoque___"+index);
                                                var quantidade = quantidade.replace(".",",");

                                                var fieldCampoF = objectFactory.createStringArray();
                                                fieldCampoF.getItem().add("txtEstoque___"+index); 
                                                fieldCampoF.getItem().add(quantidade);        
                                                cardData.getItem().add(fieldCampoF);

                                            }
                                    }
                                }  //for dos input              
                          
                          if (nseq != 0 ) {

                            log.info("*** CRM *** Criado os campos ");
          
                            var colleaguesId = objectFactory.createStringArray(); 

                            colleaguesId.getItem().add("Pool:Group:Almoxarifado"); //hAPI.getCardValue("txtSolicitanteRM")
                              
                            var appointment =  workflowEngineServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.ProcessTaskAppointmentDtoArray");
                            
                            log.info("*** CRM *** - nova requisição será com essas informações - >" + String(cardData));

                            var New_process = 
                            workflowEngineService.startProcess(
                                                                 "rm-ged", //username
                                                                 "DCRk3Drsm2vijjON5N3T", //password
                                                                 1, //companyId
                                                                 "T0002", //processId
                                                                 0, //choosedState
                                                                 colleaguesId, // colleagueIds -- quem é responsabel pelo Atendimento
                                                                 "Origem T0001", // comments
                                                                 hAPI.getCardValue("txtSolicitanteRM"),// userId Quem Cria --
                                                                 true, // completeTask
                                                                 processAttachmentDtoArray, // attachments
                                                                 cardData, // cardData
                                                                 appointment, // appointment
                                                                 false);             

                            log.info("*** CRM *** T0002 - CRIADO COM SUCESSO NUMERO : " + New_process);
                        }

    } 

}


} // fim da função

function loadLivTNU(e){var t={};if(e==null){return t}var n=function(e,t){for(var n=0;n<e.length;n++){if(e[n]==t)return true}return false};var r=DatasetFactory.getDataset("tnuCustomJS",null,null,null);for(var i=0;i<r.rowsCount;i++){var s=r.getValue(i,"liv");if(n(e,s)){var o=r.getValue(i,"src");var u=r.getValue(i,"name");try{var a=new Function("liv","return "+o);t[u]=a(t)}catch(f){log.error("*** Erro ao compilar livraria "+s+":"+f)}}}return t}          

function getChildrenIndexes(fieldName) {
    var datos = hAPI.getCardData(getValue("WKNumProces"));
    var enteries = datos.entrySet().iterator();
    var indexes = [];

    while (enteries.hasNext()) {
        var e = enteries.next();
        if (e.getKey().startsWith(fieldName + "___")) {
            indexes.push(e.getKey().split("___")[1]);
        }
    }
    return indexes;
}
          
          
      
      
   
    


