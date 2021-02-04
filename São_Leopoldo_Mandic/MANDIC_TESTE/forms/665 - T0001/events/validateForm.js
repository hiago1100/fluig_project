function validateForm(form){

	var activity = getValue('WKNumState');
	var TipoProcesso = form.getValue("txtTipoProcesso"); 
  var CancelaRequisicao = form.getValue("ckbFinalizar"); 

log.info("*** CRM *** - CancelaRequisicao - "+CancelaRequisicao);

if( CancelaRequisicao != "1" ) {

    if (activity != 32 ) {

    	  var msg = "";

        	  if ( (form.getValue("txtColigada" )== null) || (form.getValue("txtColigada" ) )==""){
                  msg = msg +  "<br>A Colgiada deve ser Preenchida! ";
                }
        	  
        	  if ((form.getValue("txtRequisitante")== null) || (form.getValue("txtRequisitante")== "") ){
                    msg = msg +  "<br>O Requisitante deve ser Preenchido!";
            }
            
    	      if ( (form.getValue("txtFilial" )== null) | (form.getValue("txtFilial" ) )==""){
    	            msg = msg +  "<br>A Filial deve ser Preenchida!";
    	          } 

          if (TipoProcesso =="3") {
              if ( (form.getValue("txtFornecedor" )== null) || (form.getValue("txtFornecedor")== "")) {
            	  msg = msg +  "<br>O Fornecedor precisa ser Preenchido!"; 
              } else if ( (form.getValue("txtCondPagamento" )== null) | (form.getValue("txtCondPagamento")== "")) {
            	  			msg = msg +  "<br>A Condição de Pagamento deve ser Preenchida!";
                          } else  if ( (form.getValue("txtEmissaoCD" )== null) | (form.getValue("txtEmissaoCD")== "")) {
                                  msg = msg +  "<br>A Data Emissão deve ser Preenchida!";
                                      }
              }
          
          if (TipoProcesso =="2") {
              if ( (form.getValue("txtContrato" )== null) || (form.getValue("txtContrato")== "")) {
            	  msg = msg +  "<br>O Contrato deve ser Preenchido! "; 
              } else if ( (form.getValue("txtDataVencimento" )== null) | (form.getValue("txtDataVencimento")== "")) {
            	  			msg = msg +  "<br>A Data de Vencimento da Parcela deve ser Preenchida!";
                          }  if ( (form.getValue("txtEmissaoCNT" )== null) | (form.getValue("txtEmissaoCNT")== "")) {
                                  msg = msg +  "<br>A Data Emissão deve ser Preenchida!";
                                      } else if ( (form.getValue("IDMOVCNT" )== null) | (form.getValue("IDMOVCNT")== "")) {
                                                  msg = msg +  "<br>A Parcela do Contrato deve ser Preenchida!";
                                                  }
              }
          
          if ((TipoProcesso !="1") & (TipoProcesso !="4")) {
              if ( (form.getValue("txtHistoricoMOV") == null) || (form.getValue("txtHistoricoMOV") == "") ) {
                msg = msg +  "<br>O Historico da Requisição deve ser Preenchido!"; 
              }
          }

           var indice = form.getChildrenIndexes("dsItens");
           

          if (indice.length != 0) {
              for (var i = 0; i < indice.length; i++) {
                     
                    

                     var iditem = "___"+indice[i];


                         var l = i+1; 

                         //COLOCAR AQUI O DATASET COM O VALOR DA NATUREZA ORÇAMENTARIA

                          var codcoligada = form.getValue("CODCOLIGADA");
                          var codccusto = form.getValue("CODCCUSTO"+iditem )
                          var codigoprd = form.getValue("CODIGOPRD"+iditem )

                          var c1 = DatasetFactory.createConstraint("CODCOLIGADA", codcoligada, codcoligada, ConstraintType.MUST);
                          var c2 = DatasetFactory.createConstraint("CODCCUSTO", codccusto, codccusto, ConstraintType.MUST);
                          var c3 = DatasetFactory.createConstraint("CODIGOPRD", codigoprd, codigoprd, ConstraintType.MUST);
                          
                          var constraints   = new Array(c1,c2,c3);

                          var dataset = DatasetFactory.getDataset("dsCCUSTONATUREZA", null, constraints, null);
                          var natureza = dataset.getValue(0,"CODTBORCAMENTO");

                          log.info("*** CRM *** Natureza "+natureza);

                         if ( (natureza== null) || (natureza=="")){
                             msg = msg +  "<br>A Natureza Financeira não esta Vinculada ao Centro de Custo da Linha "+l;
                           }

                         
                         if ( (form.getValue("txtcodigoPRD"+iditem )== null) || (form.getValue("txtcodigoPRD"+iditem ) =="")){
                             msg = msg +  "<br>O Produto deve ser Preenchido na Linha "+l;
                           }

                         if ( (form.getValue("txtPrecoUnitario"+iditem )== null) || (form.getValue("txtPrecoUnitario"+iditem ) =="0,000")){
                          
                            if ( (TipoProcesso =="3") || (TipoProcesso =="2") ) {

                                 msg = msg +  "<br>O Preço Unitário deve ser Preenchido na Linha "+l;
                              }

                           }

                          
                         
                         var historicoITM = form.getValue("txtHistoricoITMMOV"+iditem );
                        
                     
                        
                         if (historicoITM.indexOf("&") != -1 ) {

                              msg = msg + "<br>Não pode ser usado '&' na Observação da Linha "+l+". Caracter Especial!";

                          }
                     
                         if ( (form.getValue("txtCodCCusto"+iditem )== null) || (form.getValue("txtCodCCusto"+iditem) =="") ){
                             msg = msg +  "<br>O Centro de Custo deve ser Preenchido na Linha "+l;
                           }
                         
                         if ( (form.getValue("txtQtdSolicitada"+iditem )== null) | (form.getValue("txtQtdSolicitada"+iditem ) )==""){
                             msg = msg +  "<br>A Quantidade Solicitada deve ser Preenchido na Linha "+l;
                           } 
                         
                         if (activity == 5){
                        	
                        	 if ( (form.getValue("comAprovado"+iditem )== null) || (form.getValue("comAprovado"+iditem ) )==""){
                                 msg = msg +  "<br>O Campo Aprovado GEstor de Centro de Custo deve ser Preenchido na Linha "+l;
                               }else if(form.getValue("comAprovado"+iditem )!= "S"){
        			                	 if ( (form.getValue("txtJustificativa"+iditem )== null) | (form.getValue("txtJustificativa"+iditem ) )==""){
        			                         msg = msg +  "<br>Para Itens Não Aprovados/Revisar a Justificativa deve ser Preenchida na Linha "+l;
        			                       }
                         				}
                         }
                         if (activity == 46){
                          
                           if ( (form.getValue("comAprFinanceiro"+iditem )== null) || (form.getValue("comAprFinanceiro"+iditem ) )==""){
                                 msg = msg +  "<br>O Campo Aprovado Diretoria Financeira deve ser Preenchido na Linha "+l;
                               }else if(form.getValue("comAprFinanceiro"+iditem )!= "S"){
                                 if ( (form.getValue("txtJustificativaFin"+iditem )== null) | (form.getValue("txtJustificativaFin"+iditem ) )==""){
                                       msg = msg +  "<br>Para Itens Não Aprovados/Revisar a Justificativa deve ser Preenchida na Linha "+l;
                                     }
                                }
                         }
                          if (activity == 69){
                          
                           if ( (form.getValue("comAprMantenedora"+iditem )== null) || (form.getValue("comAprMantenedora"+iditem ) )==""){
                                 msg = msg +  "<br>O Campo Aprovado Mantenedora deve ser Preenchido na Linha "+l;
                               }else if(form.getValue("comAprMantenedora"+iditem )!= "S"){
                                 if ( (form.getValue("txtJustificativaMan"+iditem )== null) | (form.getValue("txtJustificativaMan"+iditem ) )==""){
                                       msg = msg +  "<br>Para Itens Não Aprovados/Revisar a Justificativa deve ser Preenchida na Linha "+l;
                                     }
                                }
                         }         
                      }

                  } else msg = msg +  "Requisição deve possuir Itens! "+l+"<br>"


         if (activity == 20){


             if (indice.length != 0) {
              for (var i = 0; i < indice.length; i++) {
                     
                     var iditem = "___"+indice[i];
                     var x = i+1;

                     if ((form.getValue("txtQtdCompra"+iditem) != "0") && (form.getValue("comAprovado"+iditem) != "N")) {
                     
                      if ((form.getValue("txtComprador"+iditem) == null) || (form.getValue("txtComprador"+iditem) == "")){

                            msg = msg + "<br>Necessário Informar o Comprador no item "+x;

                    }
                }
              }
            }

         }

      var historico = form.getValue("txtHistoricoMOV");
      if (historico.indexOf("&") != -1 ) {

          msg = msg + "Não pode ser usado '&' na Observação da Requisição. Caracter Especial! <br>";

      }

      if (msg != "") {
            throw msg;
         }

    } // se for revisão pula a consistecias
  } // se o Checar estiver marcado
}