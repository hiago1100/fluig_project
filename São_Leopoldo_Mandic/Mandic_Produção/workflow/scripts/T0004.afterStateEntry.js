function afterStateEntry(sequenceId){

  log.info("*** CRM *** entrei aqui novamente no STATE>> "+hAPI.getCardValue("txtNumeroProcesso"));

if (  (hAPI.getCardValue("txtNumeroProcesso") == "") ||  (hAPI.getCardValue("txtNumeroProcesso") == null) ) {
 

	var codColigada = hAPI.getCardValue("CODCOLIGADA"); 
    var CodCotacao  = hAPI.getCardValue("txtCodCotacao");
    var codCfo      = hAPI.getCardValue("CODCFO");
    var CodColCfo   = hAPI.getCardValue("CODCOLCFO");
    

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

    var rowsCount = dataset.values.length;
    
    var i = 0;
    var index = 0;

    var childData = new java.util.HashMap(); 

    log.info("*** CRM *** Quantidade de Registros afterStateEntry >>"+String(rowsCount) );
    
    while (i<rowsCount){

    	 childData.put("txtItem" , index);
         childData.put("txtcodigoPRD", dataset.getValue(i, "txtcodigoPRD"));
         childData.put("IDPRD", dataset.getValue(i, "IDPRD") );
         childData.put("CODIGOPRD", dataset.getValue(i, "CODIGOPRD"));
         childData.put("txtQuantidade", dataset.getValue(i, "txtQuantidade"));
         childData.put("txtPrecoUnitario", dataset.getValue(i, "txtPrecoUnitario"));
         childData.put("txtTotalItem", dataset.getValue(i, "txtTotalItem"));
         childData.put("txtCodCCusto", dataset.getValue(i, "txtCodCCusto"));
         childData.put("CODCCUSTO", dataset.getValue(i, "CODCCUSTO"));
         childData.put("IDMOVORIGEM", dataset.getValue(i, "IDMOVORIGEM"));
         childData.put("NSEQITMMOV", dataset.getValue(i, "NSEQITMMOV"));
         childData.put("NUMREQ", dataset.getValue(i, "NUMREQ"));
         childData.put("txtHistoricoITMMOV", dataset.getValue(i, "txtHistoricoITMMOV"));
         childData.put("txtJustificativa", dataset.getValue(i, "txtJustificativa"));
         childData.put("comAprovado", dataset.getValue(i, "comAprovado"));

         log.info("*** CRM *** Colocar os Itens do childData "+childData);

    	hAPI.addCardChild("dsItens",childData);

    i = i +1;

   }


    var constraints   = new Array(c1,c2,c3,c4);

    var datasetANEXO = DatasetFactory.getDataset("dsCOTACAO", null, constraints, null);	

    var DocumentoID = datasetANEXO.getValue(0, "IDFLUIG");

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

}

}