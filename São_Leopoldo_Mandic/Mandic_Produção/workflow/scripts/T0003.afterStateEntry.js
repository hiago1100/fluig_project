function afterStateEntry(sequenceId){                


  var numProcess = getValue("WKNumProces");



if (  (hAPI.getCardValue("txtNumeroProcesso") == "") & (hAPI.getCardValue("CODCOLIGADA") != "" )) {
               
    hAPI.setCardValue("txtNumeroProcesso",numProcess);
    hAPI.setCardValue("txtData",dataAtualFormatada());
    
    var codColigada = hAPI.getCardValue("CODCOLIGADA"); 
    var CodCotacao  = hAPI.getCardValue("txtCodCotacao");
    var codCfo      = hAPI.getCardValue("CODCFO");
    var CodColCfo   = hAPI.getCardValue("CODCOLCFO");
    var aprovador   = hAPI.getCardValue("txtUsuarioAprovador");
    var soma = 0;
    
    log.info("*** CRM *** COLIGADA "+codColigada );
    log.info("*** CRM *** txtCodCotacao "+CodCotacao);
    log.info("*** CRM *** codCfo "+codCfo);
    log.info("*** CRM *** CodColCfo "+CodColCfo);
    log.info("*** CRM *** txtUsuarioAprovador "+aprovador);

    
    var c1 = DatasetFactory.createConstraint("CODCOLIGADA", codColigada, codColigada, ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint("CODCOTACAO", CodCotacao, CodCotacao, ConstraintType.MUST);
    var c3 = DatasetFactory.createConstraint("APROVADOR", aprovador, aprovador, ConstraintType.MUST);
    var c4 = DatasetFactory.createConstraint("CODCOLCFO", CodColCfo, CodColCfo, ConstraintType.MUST);
    var c5 = DatasetFactory.createConstraint("CODCFO", codCfo, codCfo, ConstraintType.MUST);
    var constraints   = new Array(c1,c2,c3,c4,c5);
    
    var dataset = DatasetFactory.getDataset("dsCOTACAO", null, constraints, null);
    
    log.info("*** CRM *** Li o Primeiro DataSet e a Coligada é "+  dataset.getValue(0, "COLIGADA"));

   
    hAPI.setCardValue("txtColigada", dataset.getValue(0, "COLIGADA"));
    hAPI.setCardValue("txtFilial", dataset.getValue(0, "FILIAL") );
    hAPI.setCardValue("CODFILIAL", dataset.getValue(0, "CODFILIAL") );
    hAPI.setCardValue("txtFornecedor", dataset.getValue(0, "FORNECEDOR") );
    hAPI.setCardValue("CODCOLCFO", dataset.getValue(0, "CODCOLCFO") );
    hAPI.setCardValue("txtCondPagamento", dataset.getValue(0, "CODPAGTO") );
    hAPI.setCardValue("CODCPG", dataset.getValue(0, "CODCPG") );
    hAPI.setCardValue("txtCodVen", dataset.getValue(0, "COMPRADOR") );
    hAPI.setCardValue("CODVEN", dataset.getValue(0, "CODVEN") );
    hAPI.setCardValue("txtHistoricoMOV", dataset.getValue(0, "OBSERVACAO") );
    hAPI.setCardValue("txtAprovador", dataset.getValue(0, "NOME_APROVADOR") );
    hAPI.setCardValue("txtValorFrete", dataset.getValue(0, "VALORFRETE") );
    hAPI.setCardValue("txtValorDesconto", dataset.getValue(0, "VALORDESCNEG") );

    
    var DocumentoID = dataset.getValue(0, "IDFLUIG");

    log.info("*** CRM *** ID DO DOCUMENTO "+DocumentoID);

    if (( DocumentoID != 0 ) || (DocumentoID != "0")) {

      log.info("*** CRM *** TENHO DOCUMENTO >>>"+DocumentoID);

        var AnexosArray = DocumentoID.split(";");

        var linhas = AnexosArray.length;
        var c = 0;

        while (c < linhas) {

          hAPI.attachDocument(AnexosArray[c]);

          c = c + 1;

        }

          
    }

  log.info("*** CRM *** Colocar os Itens do DataSet");
    //var dataset = DatasetFactory.getDataset("dsITMCOTACAO", null, constraints, null);
    var rowsCount = dataset.values.length;
    
    var i = 0;
    
    while (i<rowsCount){
    
                   var childData = new java.util.HashMap();
                   
                   childData.put("txtItem",i+1);
                   childData.put("txtcodigoPRD", dataset.getValue(i, "PRODUTO"));
                   childData.put("IDPRD", dataset.getValue(i, "IDPRD") );
                   childData.put("CODIGOPRD", dataset.getValue(i, "CODIGOPRD"));
                   childData.put("txtQuantidade",dataset.getValue(i, "QUANTIDADE"));
                   childData.put("txtPrecoUnitario", dataset.getValue(i, "PRECOUNITARIO"));
                   childData.put("txtTotalItem", dataset.getValue(i, "TOTALITEM"));
                   childData.put("txtCodCCusto", dataset.getValue(i, "CENTROCUSTO"));
                   childData.put("CODCCUSTO",dataset.getValue(i, "CODCCUSTO"));
                   childData.put("IDMOVORIGEM",dataset.getValue(i, "IDMOV"));
                   childData.put("NSEQITMMOV",dataset.getValue(i, "NSEQITMMOV"));
                   childData.put("txtHistoricoITMMOV",dataset.getValue(i, "HISTORICOITM"));
                   childData.put("NUMREQ",dataset.getValue(i, "NUMFLUIG"));

                   valorReplace = dataset.getValue(i, "TOTALITEM");

                   soma = soma + parseFloat(valorReplace.replace(",","."));

                     log.info("*** CRM *** Aqui atualizo o Valor Total "+i+" - "+soma);

                   hAPI.addCardChild("dsItens", childData);
                   
                   i = i + 1;
                   
    }

      


      var Frete = hAPI.getCardValue("txtValorFrete").replace(",",".");
      var Desconto = hAPI.getCardValue("txtValorDesconto").replace(",",".");
      var somaReplace =  parseFloat(soma) + parseFloat(Frete) - parseFloat(Desconto);
      var total = somaReplace.toFixed(2).replace(".",",");
        
      log.info("*** CRM *** Aqui atualizo o Valor Total"+total);

      hAPI.setCardValue("txtValorItens",total);
    
  }    
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