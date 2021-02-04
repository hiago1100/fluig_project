function CopiarItensProcesso (procOrigem){
	
	var usr = $('input[name="txtSolicitanteRM"]').val();


    var c1 = DatasetFactory.createConstraint("documentid", procOrigem, procOrigem, ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint("usr", usr, usr, ConstraintType.MUST);
    var constraints   = new Array(c1,c2);
	var dataset         = DatasetFactory.getDataset("dsProcComprasItens", null, constraints, null);
	var rowsCount = dataset.values.length;
	
	var i = 0;
	
	while (i<rowsCount) {
		var row             = dataset.values[i];
		
		var item = childAdd();

		console.log("meu deus isso "+item);		
	       
		setZoomData("txtcodigoPRD___"+item, row["txtCodigoPrd"]);
	    $('input[name="CODIGOPRD___'+item+'"]').val(row["CODIGOPRD"]);
	    $('input[name="IDPRD___'+item+'"]').val(row["IDPRD"]);
	    
	    if (row["txtCodCCusto"] != "" ){
			setZoomData("txtCodCCusto___"+item, row["txtCodCCusto"]);
	    	$('input[name="CODCCUSTO___'+item+'"]').val(row["CODCCUSTO"]);

		    } else {
		    	$('input[name="txtUsuarioAprovador"]').val('');
		    	$('input[name="lbAprovador"]').val('');
		    	}
	    
		$('input[name="txtQtdSolicitada___'+item+'"]').val(row["txtQtdSolicitada"]);
		
		$('input[name="txtHistoricoITMMOV___'+item+'"]').val(row["txtHistoricoITMMOV"]);
		$('input[name="ckPrdEstocavel___'+item+'"]').val(row["ckPrdEstocavel"]);
		
		// pesquisa os dados do item
		
	    var idprd = DatasetFactory.createConstraint("IDPRD", row["IDPRD"], row["IDPRD"], ConstraintType.MUST);
	    var filial = DatasetFactory.createConstraint("CODFILIAL", $('input[name="CODFILIAL"]').val(), $('input[name="CODFILIAL"]').val(), ConstraintType.MUST);
	    var constraintsPrd   = new Array(idprd,filial);
		var datasetPrd         = DatasetFactory.getDataset("dsTPRD", null, constraintsPrd, null);	
		
		var rowitem = datasetPrd.values[0];
		
		$('input[name="txtPrecoUnitario___'+item+'"]').val( rowitem["CUSTOUNITARIO"] );
		
		CalcTotalItem( document.getElementById("txtPrecoUnitario___"+item) );
		
		
		i = i + 1;
		
	}
	   
}