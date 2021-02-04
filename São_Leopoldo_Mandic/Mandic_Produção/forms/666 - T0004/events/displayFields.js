function displayFields(form,customHTML){


var activity = getValue('WKNumState'); 
var numProcess = getValue("WKNumProces");

form.setValue('ATIVIDADEATUAL',activity);

log.info("*** CRM *** DisplayField Atividade >> "+activity);

if (activity == 2 ) {

    customHTML.append("<script type='text/javascript'>");
    customHTML.append(" $(function(){ ");
    customHTML.append(" $('div#GestorMan').hide(); ");
    customHTML.append(" }); ");
    customHTML.append("</script>");
       
    var TXTCOLIGADA = form.getValue("txtColigada");
    var CODCOLIGADA = form.getValue("CODCOLIGADA");

       log.info("*** CRM *** Dentro do IF 2 ");
       log.info("*** CRM *** TXTCOLIGADA "+TXTCOLIGADA);
       log.info("*** CRM *** CODCOLIGADA "+CODCOLIGADA);

      if (  (form.getValue("txtColigada") == "") && (form.getValue("CODCOLIGADA") != null )) {
          
          log.info("*** CRM *** Carregando dados do Processo"); 
                    
          form.setValue("txtNumeroProcesso",numProcess);
          form.setValue("txtData",dataAtualFormatada());
          
          var codColigada = form.getValue("CODCOLIGADA"); 
          var CodCotacao  = form.getValue("txtCodCotacao");
          var codCfo      = form.getValue("CODCFO");
          var CodColCfo   = form.getValue("CODCOLCFO");
          var soma = 0;
          
          log.info("*** CRM *** COLIGADA "+codColigada );
          log.info("*** CRM *** txtCodCotacao "+CodCotacao);
          log.info("*** CRM *** codCfo "+codCfo);
          log.info("*** CRM *** CodColCfo "+CodColCfo);
       

          
          var c1 = DatasetFactory.createConstraint("CODCOLIGADA", codColigada, codColigada, ConstraintType.MUST);
          var c2 = DatasetFactory.createConstraint("CODCOTACAO", CodCotacao, CodCotacao, ConstraintType.MUST);
          var c3 = DatasetFactory.createConstraint("CODCOLCFO", CodColCfo, CodColCfo, ConstraintType.MUST);
          var c4 = DatasetFactory.createConstraint("CODCFO", codCfo, codCfo, ConstraintType.MUST);
          
          var constraints   = new Array(c1,c2);

          var datasetCOT = DatasetFactory.getDataset("dsNumAprCotacoes", null, constraints, null);

          var processos = datasetCOT.getValue(0,"SEGUNDONUMERO");

          log.info("*** CRM *** processos>> "+processos);

          var c6 = DatasetFactory.createConstraint("PROCESSOS", processos, processos, ConstraintType.MUST);

          var constraints   = new Array(c1,c2,c3,c4,c6);
          
          var dataset = DatasetFactory.getDataset("dsItmAprCotacoes", null, constraints, null);
          
          log.info("*** CRM *** Li o Primeiro DataSet e a Coligada é "+  dataset.getValue(0, "txtColigada"));

         
          form.setValue("txtColigada", dataset.getValue(0, "txtColigada"));
          form.setValue("txtFilial", dataset.getValue(0, "txtFilial") );
          form.setValue("CODFILIAL", dataset.getValue(0, "CODFILIAL") );
          form.setValue("txtFornecedor", dataset.getValue(0, "txtFornecedor") );
          form.setValue("txtCondPagamento", dataset.getValue(0, "txtCondPagamento") );
          form.setValue("CODCPG", dataset.getValue(0, "CODCPG") );
          form.setValue("txtCodVen", dataset.getValue(0, "txtCodVen") );
          form.setValue("CODVEN", dataset.getValue(0, "CODVEN") );
          form.setValue("txtHistoricoMOV", dataset.getValue(0, "txtHistoricoMOV") );
          form.setValue("txtValorFrete", dataset.getValue(0, "txtValorFrete") );
          form.setValue("txtValorDesconto", dataset.getValue(0, "txtValorDesconto") );

        log.info("*** CRM *** Colocar os Itens do DataSet");
         
          var rowsCount = dataset.values.length;
          
          var i = 0;
          var index = 0;

           log.info("*** CRM *** Quantidade de Registros DisplayField >> "+String(rowsCount) );
          
          while (i<rowsCount){

            index = i+1;



                    form.setValue("txtItem___"+index,index);
                    console.log("Poduto"+  dataset.getValue(i, "txtcodigoPRD") );
                    form.setValue("txtcodigoPRD___"+index, dataset.getValue(i, "txtcodigoPRD"));
                    form.setValue("IDPRD___"+index, dataset.getValue(i, "IDPRD") );
                    form.setValue("CODIGOPRD___"+index, dataset.getValue(i, "CODIGOPRD"));
                    form.setValue("txtQuantidade___"+index,dataset.getValue(i, "txtQuantidade"));
                    form.setValue("txtPrecoUnitario___"+index, dataset.getValue(i, "txtPrecoUnitario"));
                    form.setValue("txtTotalItem___"+index, dataset.getValue(i, "txtTotalItem"));
                    form.setValue("txtCodCCusto___"+index, dataset.getValue(i, "txtCodCCusto"));
                    form.setValue("CODCCUSTO___"+index,dataset.getValue(i, "CODCCUSTO"));
                    form.setValue("IDMOVORIGEM___"+index,dataset.getValue(i, "IDMOVORIGEM"));
                    form.setValue("NSEQITMMOV___"+index,dataset.getValue(i, "NSEQITMMOV"));
                    form.setValue("NUMREQ___"+index,dataset.getValue(i, "NUMREQ"));
                    form.setValue("txtJustificativa___"+index,dataset.getValue(i, "txtJustificativa"));
                    form.setValue("comAprovado___"+index,dataset.getValue(i, "comAprovado"));

                         if (dataset.getValue(i, "comAprovado") == "N") {

                              form.setValue("compAprFinanceiro___"+index,dataset.getValue(i, "comAprovado")); 
                              form.setValue("txtJustificativaFin___"+index,"Reprovador pelo Gestor Centro de Custo"); 
                              form.setValue("compAprMantenedora___"+index,dataset.getValue(i, "comAprovado"));
                              form.setValue("txtJustificativaMan___"+index,"Reprovador pelo Gestor Centro de Custo"); 

                            } 
                         
                         valorReplace = dataset.getValue(i, "txtTotalItem");

                         soma = soma + parseFloat(valorReplace.replace(",","."));

                           log.info("*** CRM *** Aqui atualizo o Total do Item "+i+" - "+soma.toFixed(2));
                         
                       
                        form.setEnabled("comAprovado___"+index,false);
                        form.setEnabled("txtJustificativa___"+index,false);

                          i = i + 1;

                         
            } // for

        var VLRFrete = form.getValue("txtValorFrete");
        var Frete = VLRFrete.replace(",",".");
        var VLRDesconto = form.getValue("txtValorDesconto"); 
        var Desconto = VLRDesconto.replace(",",".");
        var somaReplace =  parseFloat(soma) + parseFloat(Frete) - parseFloat(Desconto);

        var total = somaReplace.toFixed(2).replace(".",",");
        
        log.info("*** CRM *** Aqui atualizo o Valor Total"+total);

        form.setValue("txtValorItens",total);

                 
      } //if da Coligada

       



 } else if (activity == 8 ){

      var indice = form.getChildrenIndexes("dsItens");

        if (indice.length != 0) {
            for (var i = 0; i < indice.length; i++) {
                   var iditem = "___"+indice[i];

                                    var aprovadoFIN = form.getValue("comAprFinanceiro");

                                    form.setEnabled("comAprovado"+iditem,false);
                                    form.setEnabled("comAprFinanceiro"+iditem,false);
                                    form.setEnabled("txtJustificativaFin"+iditem,false);

                                   

                                    if (aprovadoFIN == "N"){

                                    form.setValue("comAprMantenedora"+iditem,"N");
                                    form.setValue("txtJustificativaMan"+iditem,"Reprovado Diretor Financeiro");

                                    form.setEnabled("comAprovado"+iditem,false);
                                    form.setEnabled("comAprMantenedora"+iditem,false);
                                    form.setEnabled("txtJustificativaMan"+iditem,false);

                                   }

                                }
            }
        }
     
    
  } //fim do DisplayField




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
