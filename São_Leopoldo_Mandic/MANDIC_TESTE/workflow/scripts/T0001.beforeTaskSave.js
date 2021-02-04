function beforeTaskSave(colleagueId,nextSequenceId,userList){

	var fnEmail      = loadLivTNU(["com.totvsNacoesUnidas.fluig.js.ds.CustomEmail"]);

	var TipoProcesso = hAPI.getCardValue("txtTipoProcesso");
    var activity     = getValue('WKNumState');
    var atv = hAPI.getCardValue("ATIVIDADEATUAL");
    var numProcess = getValue("WKNumProces");  
        
    // dados para o E-mail

    var parametroPrincipal = hAPI.getCardValue('txtTipoProcesso');

    log.info("numero do processo"+ numProcess);

    var linkProcess = "https://fluigtst.slmandic.edu.br/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID="+numProcess+" "; 
    var linkAux = "<a href='"+linkProcess+"' _blank>"+numProcess+"</a>";

    
    var solicitante     =  hAPI.getCardValue('txtUsuarioRM');      
    var eUnidade        =  hAPI.getCardValue('txtFilial');      
    var dataSolicitacao =  hAPI.getCardValue('txtData');             
    var obsDois         =  hAPI.getCardValue('txtHistoricoMOV'); 
    var aprovSup        =  "";
    var gestorCentro    =  hAPI.getCardValue('lbAprovador');
    var emailSolicitante = hAPI.getCardValue('emailSolicitante');

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

    if(atv == 63) { // Pós testes será 63

        

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
                to: "hiago.oliveira@live.com",     //emailSolicitante,
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
                to: "hiago.oliveira@live.com", //mailSolicitante,
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


// ******************************* COMEÇO TESTE INTEGRAÇAO ***************************


  log.info("*** CRM *** - Entrei no beforeTaskSave");

if ( atv != 20){

   if (atv == 46) {
      var revisado     = hAPI.getCardValue("QTDREVISADOFIN");
      var reprovado    = hAPI.getCardValue("QTDREPROVADOFIN");
      var aprovado     = hAPI.getCardValue("QTDAPROVADOFIN");

    } else if (atv == 69) {
          var revisado     = hAPI.getCardValue("QTDREVISADOMAN");
          var reprovado    = hAPI.getCardValue("QTDREPROVADOMAN");
          var aprovado     = hAPI.getCardValue("QTDAPROVADOMAN");
    }



 if (atv == 108) {

          var aprovado     = "0001";
    }




  //var activity     = getValue('WKNumState');

  var estoquetotal     = hAPI.getCardValue("ESTOQUETOTAL");

  var qtditens     = parseFloat(revisado) + parseFloat(reprovado) + parseFloat(aprovado);
  
  var itens        = hAPI.getCardData(numProcess);
  var codcoligada  = hAPI.getCardValue("CODCOLIGADA");
  var codfilial    = hAPI.getCardValue("CODFILIAL");
  var codloc       = hAPI.getCardValue("CODLOC");
  var codtmv       = "";
 
  if (nextSequenceId == 137 || nextSequenceId == 145) {
        
    log.info("### - Entrei no nextSequenceId da integração");

    log.info("### - valor do Aprovado : "+ aprovado);

           if (revisado > "0000" ) {

               throw "Requisição deve passar por Revisão antes de ser finalizada";

           }  else if ( aprovado > "0000") {

            log.info("### - Aprovado");

                  
              if (TipoProcesso == "2"){

                log.info("### - Entrei no tipo do processo" + TipoProcesso);
                         
                         log.info( "*** CRM ***  Incluisão do parcela de contrato (1.1.17) para o Processo "+numProcess+" na coligada "+codcoligada+" filial"+codfilial+" e Local de Estoque "+codloc );
                         
                         codtmv = hAPI.getCardValue("CODTMV");  

                         } else if (TipoProcesso == "3")  {

                             log.info( "*** CRM ***  Incluisão do Compras Direta (1.1.18) para o Processo "+numProcess+" na coligada "+codcoligada+" filial"+codfilial+" e Local de Estoque "+codloc );
                             
                             codtmv = "1.1.18";  
                                 
                                 }
                geraMov (numProcess, codcoligada, codfilial, codloc, codtmv);
                log.info("======= FIM DA INCLUSAO ===============================");                                
          }
      }
  } // movimento de compras não passam por aqui




// ******************************* FIM DO TESTE INTEGRAÇAO ***************************








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

      

// ************************** FUNCOES INTEGRAÇAO *****************************

    
function geraMov (numProcess, codcoligada, codfilial,codloc,codtmv){
    
    var NOME_DATASERVER = "MovMovimentoTBCData";  
    var usuario         = "mestre"; 
    var senha           = "FR5G1I2EmFdNkE00SUYO";          
    var authService     = getWebService(usuario, senha);  
    var context         = "CodUsuario=mestre;CodSistema=T;CodColigada="+codcoligada;
    var nseq            = 0;
    var historicoMOV    = hAPI.getCardValue("txtHistoricoMOV");
    var codcolcfo       = hAPI.getCardValue("CODCOLCFO");
    var codcfo          = hAPI.getCardValue("CODCFO");
    var idcnt           = hAPI.getCardValue("IDCNT");
    var codcpg          = hAPI.getCardValue("CODCPG");
    var CODVEN          = hAPI.getCardValue("CODVEN");
    var USUARIO         = hAPI.getCardValue("txtUsuarioRM");
    var FRETE           = hAPI.getCardValue("txtValorFrete");
    var DESCONTO        = hAPI.getCardValue("txtValorDesconto");
    var OBSERVACAO      = hAPI.getCardValue("txtComentarioComprador");
  
   
    

    if (codtmv == "1.1.18") {

      codcpg = "001";
      var NUMEROMOV       = "";
      var serie = hAPI.getCardValue("comSerie");
      if (serie == "F"){ serie = "FOL";} else { serie = "PCA";}
      var dataentrega = hAPI.getCardValue("txtCondPagamento");
      var DATAEMISSAO  = hAPI.getCardValue("txtEmissaoCD");
      var CODNAT = "";
      var datafimfat = ""; 
      var datainifat = "";


    } else 
      { 
      
        var NUMEROMOV       = hAPI.getCardValue("txtNumNF");
        var DATAEMISSAO  = hAPI.getCardValue("txtEmissaoCNT");
        var serie = "1";
        var dataentrega = dataAtualFormatada(); 
        var datainifat = dataAtualFormatada(); 
        var datafimfat = dataAtualFormatada(); 
        var CODNAT = hAPI.getCardValue("IDNAT");
        
      }


    if (CODCOMP == null ){
      CODCOMP = "9999";
    }
  
    if (CODVEN == null ){
      CODVEN = "9999";
    }
  

    if ((codcolcfo == "") || (codcolcfo == null)) {
        codcolcfo = 0;
        }
    
    var XML = 
            "<MovMovimento >" +   
            "  <TMOV>" +   
            "    <CODCOLIGADA>"+codcoligada+"</CODCOLIGADA>" +   
            "    <IDMOV>-1</IDMOV>" +   
            "    <CODFILIAL>"+codfilial+"</CODFILIAL>" + 
            "    <NUMEROMOV>"+NUMEROMOV+"</NUMEROMOV>"+  
            "    <CODLOC>"+codloc+"</CODLOC>" +    
            "    <CODLOCDESTINO>"+codloc+"</CODLOCDESTINO>" +   
            "    <CODTMV>"+codtmv+"</CODTMV>" +   
            "    <TIPO>A</TIPO>" +   
            "    <DATAEMISSAO>"+DATAEMISSAO+"</DATAEMISSAO>" +   
            "    <DATABASEMOV>"+dataAtualFormatada()+"</DATABASEMOV>" + 
            "    <DATAENTREGA>"+dataentrega+"</DATAENTREGA>"+  
            "    <DATAMOVIMENTO>"+dataAtualFormatada()+"</DATAMOVIMENTO>" +   
            "    <CODFILIALDESTINO>"+codfilial+"</CODFILIALDESTINO>" +      
            "    <DATALANCAMENTO>"+dataAtualFormatada()+"</DATALANCAMENTO>" +   
            "    <CODCOLCFO>"+codcolcfo+"</CODCOLCFO>";
            
            if (codcfo != "") {
                 XML = XML +"    <CODCFO>"+codcfo+"</CODCFO>"; }
            if (codcpg != "") {
               XML = XML +"    <CODCPG>"+codcpg+"</CODCPG>"; }
            
          XML = XML +
            "    <SERIE>"+serie+"</SERIE>"+
            "    <CODCCUSTO></CODCCUSTO>"+ 
            "    <IDNAT>"+CODNAT+"</IDNAT>"+ 
            "    <CODVEN1>9999</CODVEN1>" +
            "    <CODVEN2>"+CODVEN+"</CODVEN2>" +
            "    <CODVEN3>9999</CODVEN3>" +
            "    <CODVEN4>9999</CODVEN4>" +
            "    <VALORDESC>"+DESCONTO+"</VALORDESC>"+
            "    <VALORFRETE>"+FRETE+"</VALORFRETE>"+
            "    <OBSERVACAO>"+OBSERVACAO+"</OBSERVACAO>"+
            "    <USUARIOCRIACAO>"+USUARIO+"</USUARIOCRIACAO>" +
            "    <HISTORICOLONGO>"+historicoMOV+"</HISTORICOLONGO>" +
            "  </TMOV>" +  
            
            "  <TNFE>" +   
            "    <CODCOLIGADA>"+codcoligada+"</CODCOLIGADA>" +   
            "    <IDMOV>-1</IDMOV>" +   
            "  </TNFE>" +   
            "  <TMOVFISCAL>" +   
            "    <CODCOLIGADA>"+codcoligada+"</CODCOLIGADA>" +   
            "    <IDMOV>-1</IDMOV>" +   
            "  </TMOVFISCAL>" ;


    var itens = hAPI.getCardData(numProcess);
    var keys = itens.keySet().toArray();
    for (var key in keys) {
      var field = keys[key];

      if (field.indexOf("comAprovado___") > -1) {
        
          var index = field.replace("comAprovado___", ""); 
          var aprovado = hAPI.getCardValue("comAprovado___"+index);

            log.info("============ MOVIMENTO APROVADO "+aprovado);
          
          if (aprovado == "S"){
          
              var idprd = hAPI.getCardValue("IDPRD___"+index);

              if (codtmv == '1.1.02'){

                var qtdSolicitada = parseFloat(hAPI.getCardValue("txtQtdCompra___"+index));

              } else {

                var qtdSolicitada = hAPI.getCardValue("txtQtdSolicitada___"+index);
              }

              log.info( "*** CRM ***  QUANTIDADE é "+qtdSolicitada);

              var precounitario = hAPI.getCardValue("txtPrecoUnitario___"+index);
              var valortotalitem = hAPI.getCardValue("txtTotalItem___"+index);
              var codccusto = hAPI.getCardValue("CODCCUSTO___"+index);
              var historicoITMMOV = hAPI.getCardValue("txtHistoricoITMMOV___"+index);
              var CODCOMP         = hAPI.getCardValue("CODCOMP___"+index);

              log.info( "*** CRM ***  Comprador - "+CODCOMP);
                 
          
                  
                  if (qtdSolicitada != 0) {

                  var nseq = index; 



                  XML = XML +    
                        "  <TITMMOV>" +   
                        "    <CODCOLIGADA>"+codcoligada+"</CODCOLIGADA>" +   
                        "    <IDMOV>-1</IDMOV>" +   
                        "    <NSEQITMMOV>"+nseq+"</NSEQITMMOV>" +   
                        "    <CODFILIAL>"+codfilial+"</CODFILIAL>" +   
                        "    <NUMEROSEQUENCIAL>"+nseq+"</NUMEROSEQUENCIAL>" +   
                        "    <IDPRD>"+idprd+"</IDPRD>" +
                       // "    <IDPRD>0</IDPRD>" +
                        "    <QUANTIDADE>"+qtdSolicitada+"</QUANTIDADE>" +   
                        "    <PRECOUNITARIO>"+precounitario+"</PRECOUNITARIO>" +
                        "    <VALORTOTALITEM>"+valortotalitem+"</VALORTOTALITEM>"+   
                        "    <DATAEMISSAO>"+DATAEMISSAO+"</DATAEMISSAO>" +
                        "    <DATAFATCONTRATO>"+DATAEMISSAO+"</DATAFATCONTRATO>"+     
                        "    <CODLOC>"+codloc+"</CODLOC>" + 
                        "    <IDNAT>"+CODNAT+"</IDNAT>"+ 
                        "    <CODVEN1>"+CODCOMP+"</CODVEN1>" +  
                        "    <DATAINIFAT>"+datainifat+"</DATAINIFAT>"+
                        "    <DATAFIMFAT>"+datafimfat+"</DATAFIMFAT>"+
                        "    <CODCCUSTO>"+codccusto+"</CODCCUSTO>";
                  
                       if (idcnt != null) {
                           XML = XML +"    <IDCNT>"+idcnt+"</IDCNT>"; }
                   XML = XML +
                       "    <HISTORICOLONGO>"+historicoITMMOV+"</HISTORICOLONGO>"+     
                       "    </TITMMOV>"; 
                  }

              }
            
        }              
    }


   if (nseq > 0){

        XML = XML +    
           "  <TMOVCOMPL>" +   
           "    <CODCOLIGADA>"+codcoligada+"</CODCOLIGADA>" +      
           "    <IDMOV>-1</IDMOV>" +   
           "    <NUMFLUIG>"+numProcess+"</NUMFLUIG>" +
           "  </TMOVCOMPL>"+                      
           "</MovMovimento>";
        
        
       
       
       try{
          
          log.info( "*** CRM *** XML do movimnto é "+XML);

          var result = new String(authService.saveRecord(NOME_DATASERVER, XML, context));

          log.info("*** CRM *** Fluig "+numProcess+".integracao com RM resultado  VER IDMOV - "+result);
          
          log.info("### RESULTADO INTEGRAÇÃO = " + result); 
          
          log.info("### - Entrei na integração seu resultado tem o tamanho = " + result.length);


           if (result.length > 20){


             log.info("### INTEGRAÇÃO NAO EFETUADA :"+ result);               
             hAPI.setCardValue("statusIntegra","NOK");
             hAPI.setCardValue("txtErroIntegra", result);

             var mensagemErro = result;  
             //throw mensagemErro;        
           } else {

                  var idmov = result.substring(result.search(";")+1,result.length);
                  hAPI.setCardValue("IDMOV",idmov);
                  hAPI.setCardValue("statusIntegra","OK");
                  hAPI.setCardValue("txtErroIntegra", result);

                  log.info("### - Entrei na integração OK !");

                }
        }  
      
       
        catch (e){  
  
            if (e == null) e = "*** CRM *** Erro desconhecido!";  

            

          //  hAPI.setCardValue("statusIntegra","NOK");

            

         //   log.info("### RESULTADO INTEGRAÇÃO NOK = " + result);

            
            var mensagemErro = "*** CRM *** Ocorreu um erro ao salvar dados no RM (coligada "+codcoligada+" ): " + e;            

            throw mensagemErro;  

        }
    }

}




/**'
* A API de autenticação da Totvs baseia no "Basic access authentication" do HTTP.
* Código Java para autenticação 
* Programa responsável por integrar com os Webservices do RM 
*  Exemplo dev valores para os parâmetros 
*       @param string Usuario = "mestre";
*       @param string Senha = "totvs";
*/

function getWebService(Usuario, Senha){

 var Nome_Servico = "WSTESTE";
 var Caminho_Servico = "com.totvs.WsDataServer";
 
    var dataServerService = ServiceManager.getServiceInstance(Nome_Servico);
    if(dataServerService == null){
        throw "Servico nao encontrado: " + Nome_Servico;
    }
    
    var serviceLocator = dataServerService.instantiate(Caminho_Servico);
    if(serviceLocator == null){
        throw "Instancia do servico nao encontrada: " + Nome_Servico + " - " + Caminho_Servico;
    }

    var service = serviceLocator.getRMIwsDataServer();  
    if(service == null){
        throw "Instancia do dataserver do invalida: " + Nome_Servico + " - " + Caminho_Servico;
    }

    var serviceHelper = dataServerService.getBean();
    if(serviceHelper == null){
        throw "Instancia do service helper invalida: " + Nome_Servico + " - " + Caminho_Servico;
    }

    var authService = serviceHelper.getBasicAuthenticatedClient(service, "com.totvs.IwsDataServer", Usuario, Senha);      
    if(serviceHelper == null){
        throw "Instancia do auth service invalida: " + Nome_Servico + " - " + Caminho_Servico;
    }
    
    return authService;
}


function dcReadView(dataservername, context, usuario, senha, filtro)
{    
   // carrega o webservice...
      var authService = getWebService(usuario, senha);
      
   // lê os dados da visão respeitando o filtro passado
      var viewData = new String(authService.readView(dataservername, filtro, context));

      return viewData;
}


function dcReadRecord(dataservername, context, usuario, senha, primaryKey)
{    
   // carrega o webservice...
      var authService = getWebService(usuario, senha);

   // lê os dados do registro respeitando a pk passada
      try
      {
        var recordData = new String(authService.readRecord(dataservername, primaryKey, context));
      }
      catch (e) 
      {
          var recordData = new String(authService.getSchema(dataservername, context));
      }
      
      return recordData;
}


function dcSaveRecord(dataservername, context, usuario, senha, xml)
{    
   // carrega o webservice...
      var authService = getWebService(usuario, senha);

   // salva o registro de acordo com o xml passado
      var pk = new String(authService.readRecord(dataservername, xml, context));
          
      return pk;
}


//Transforma o conceito de constraints do Fluig para o Filtro do TBC.
function parseConstraints(constraints, filterRequired)
{
    // inicializa o resultado...
    var result = [];
    result.context = "";
    
    // inicializa o filtro...
    var filter = "";
    
    // varre as contraints...
 for    (con in constraints) {
    var fieldName = con.getFieldName().toUpperCase();
    if (fieldName == "RMSCONTEXT")
    {
        result.context = con.getInitialValue();
        continue;
    }
    
    filter += "(";
    
    if (fieldName == "RMSFILTER")
        {
        filter += con.getInitialValue();
        }
    else
        {
        if (con.getInitialValue() == con.getFinalValue() || isEmpty(con.getFinalValue()))
            {
                filter += con.getFieldName();
                var isLike = false;
                switch(con.getConstraintType())
                {
                    case ConstraintType.MUST:
                        filter += " = ";
                    break;
                    case ConstraintType.MUST_NOT:
                        filter += " = ";
                    break;
                    case ConstraintType.SHOULD:
                        filter += " LIKE ";
                        isLike = true;
                    break;
                    case ConstraintType.SHOULD_NOT:
                        filter += " NOT LIKE ";
                        isLike = true;
                    break;
                }
                filter += getFormattedValue(con.getInitialValue(), isLike);
            }
        else
            {
            filter += con.getFieldName();
            filter += " BETWEEN ";
            filter += getFormattedValue(con.getInitialValue(), false);
            filter += " AND ";
            filter += getFormattedValue(con.getFinalValue(), false);
            }
        }
    
        filter += ") AND ";
    }
 
 if (filter.length == 0)
 {
    if(filterRequired){
      filter = "1=1";
    }
    else{
      filter = "1=1";
    }
 }
 else
    filter = filter.substring(0, filter.length-5);
 
 // guarda o filtro...
 result.filter = filter;
 
 // retorna o resultado...
 return result;
}

function isEmpty(str) {
 return (!str || 0 === str.length);
}

function getFormattedValue(value, isLike){
    if(isLike){
      return "'%" + value + "%'";
    }
    else{
      return "'" + value + "'";
    }
}



function getXMLFromString(xmlString) {
    var factory = javax.xml.parsers.DocumentBuilderFactory.newInstance();
    var parser = factory.newDocumentBuilder();
    var is = new org.xml.sax.InputSource();
 is.setCharacterStream(new java.io.StringReader(xmlString));
    return parser.parse(is);
}


function abrirPesquisa(DATASET_ID, dataFields, resultFields, type, title){  
    window.open("/webdesk/zoom.jsp" +
    "?datasetId=" +
    DATASET_ID +
    "&dataFields=" +
    dataFields +
    "&resultFields=" +
    resultFields +
    "&type=" +
    type+
    "&title=" +
    title   
    , "zoom", "status,scroolbars=no,width=600,height=350,top=0,left=0");
}

function checkIsPK(result, qtd){
    var lines = result.split('\r');
    
    if(lines.length == 1){
        var pk = result.split(';');
        if(pk.length == qtd)
            return;
    }
        throw result;
    
}

function ChekExist(result)
{
     var lines = result.split('\r');
    if(lines.length > 1)
        return true
    else
        return false;
}


function replaceValue(text, columnName, newValue){

    
    if ((newValue != null) && (newValue.trim() != ""))
    {
        var regex = new RegExp("<" + columnName + ">(.*?)<\\/" + columnName + ">", "g");
        var replaceText = "<" + columnName + ">" + newValue + "</" + columnName + ">";
        
        return text.replace(regex, replaceText);
    }
    else
        return text;
}


function isEmpty(str) {
 return (!str || 0 === str.length);
}
function GetXml()  
{  
 return "<MovMovimento >" +   
"  <TMOV>" +   
"    <CODCOLIGADA>1</CODCOLIGADA>" +   
"    <IDMOV>0</IDMOV>" +   
"    <CODFILIAL>1</CODFILIAL>" +   
"    <CODLOC>001</CODLOC>" +   
"    <CODLOCENTREGA>001</CODLOCENTREGA>" +   
"    <CODLOCDESTINO>001</CODLOCDESTINO>" +   
"    <CODTMV>1.1.15</CODTMV>" +   
"    <TIPO>A</TIPO>" +   
"    <DATAEMISSAO>2017-12-22T00:00:00</DATAEMISSAO>" +   
"    <VALORBRUTO>6500.0000</VALORBRUTO>" +   
"    <VALORLIQUIDO>6500.0000</VALORLIQUIDO>" +   
"    <DATABASEMOV>2017-12-22T00:00:00</DATABASEMOV>" +   
"    <DATAMOVIMENTO>2017-12-22T00:00:00</DATAMOVIMENTO>" +   
"    <CODFILIALDESTINO>1</CODFILIALDESTINO>" +   
"    <CAMPOLIVRE1> ADM <CAMPOLIVRE1 />" +   
"    <HORULTIMAALTERACAO>2017-12-22T11:04:44</HORULTIMAALTERACAO>" +   
"    <DATALANCAMENTO>2017-12-22T00:00:00</DATALANCAMENTO>" +   
"  </TMOV>" +   
"  <TNFE>" +   
"    <CODCOLIGADA>1</CODCOLIGADA>" +   
"    <IDMOV>0</IDMOV>" +   
"  </TNFE>" +   
"  <TMOVFISCAL>" +   
"    <CODCOLIGADA>1</CODCOLIGADA>" +   
"    <IDMOV>0</IDMOV>" +   
"  </TMOVFISCAL>" +   
"  <TITMMOV>" +   
"    <CODCOLIGADA>1</CODCOLIGADA>" +   
"    <IDMOV>0</IDMOV>" +   
"    <NSEQITMMOV>1</NSEQITMMOV>" +   
"    <CODFILIAL>1</CODFILIAL>" +   
"    <NUMEROSEQUENCIAL>1</NUMEROSEQUENCIAL>" +   
"    <CODIGOPRD>01.02.03.0050</CODIGOPRD>" +   
"    <NOMEFANTASIA>PERFILADO 19X38 3MTS</NOMEFANTASIA>" +   
"    <QUANTIDADE>10.0000</QUANTIDADE>" +   
"    <PRECOUNITARIO>630.0000000000</PRECOUNITARIO>" +   
"    <DATAEMISSAO>2017-12-22T00:00:00</DATAEMISSAO>" +   
"    <CODUND>UN</CODUND>" +   
"    <CODLOC>001</CODLOC>" +   
"    <NSEQITMMOV1>1</NSEQITMMOV1>" +   
"  </TITMMOV>"+   
"  <TMOVCOMPL>" +   
"    <CODCOLIGADA>1</CODCOLIGADA>" +   
"    <IDMOV>0</IDMOV>" +   
"  </TMOVCOMPL>"+   
"</MovMovimento>";  
   
}  

function dataAtualFormatada(){
    
    var data = new Date();
    var dia = data.getDate();
    if (dia.toString().length == 1)
      dia = "0"+dia;
    var mes = data.getMonth()+1;
    if (mes.toString().length == 1)
      mes = "0"+mes;
    var ano = data.getFullYear();  
    return ano+"-"+mes+"-"+dia;
}


function dataentrega(){
    
    var data = new Date();
    data.setDate(data.getDate()+ 15 );
    var dia = data.getDate();
    if (dia.toString().length == 1)
      dia = "0"+dia;
    var mes = data.getMonth()+1;
    if (mes.toString().length == 1)
      mes = "0"+mes;
    var ano = data.getFullYear();  
    return ano+"-"+mes+"-"+dia;
}
