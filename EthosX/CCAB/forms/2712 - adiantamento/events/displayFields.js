function displayFields(form,customHTML){ 
	var matriculaUsuarioLogado   = getValue("WKUser");
	var atividade = getValue('WKNumState');
	
	var colaborador  		    = consultarColaboradorPorMatricula(matriculaUsuarioLogado);
	var dataAtual 				= consultarDataAtual("dd/MM/yyyy");
	var dataAtualFiltro 		= consultarDataAtual("yyyyMMdd");
	
	if (atividade == 0){		
		form.setValue("dataSolicitacao", dataAtual);
		form.setValue("dtFiltroEmissao", dataAtualFiltro);
		
		form.setValue("Solicitante", colaborador.getValue(0, "colleagueName"));
		form.setValue("natureza", "201001");
		
		form.setValue("matAprovador", "");
		form.setValue("nivel", "01");
		
		form.setValue("prefixo", "FLG");
		form.setValue("tipoTitulo", "PA ");
		form.setValue("cpValidSete", "0");
		form.setValue("cpValidSessenta", "0");
		form.setValue("status", "aberta");
	}else{
		form.setValue("numeroSolicitacao", getValue("WKNumProces"));
	}
	
	form.setValue("seqProcesso", getValue('WKNumState'));
	
}

function consultarColaboradorPorMatricula(matricula) {
	var filtro = DatasetFactory.createConstraint("colleaguePK.colleagueId", matricula, matricula, ConstraintType.MUST);
	var dsColaborador = DatasetFactory.getDataset("colleague", null, [filtro], null);
	return dsColaborador;
}

function consultarDataAtual(formato){
	var dateFormat = new java.text.SimpleDateFormat(formato);
	return dateFormat.format(new java.util.Date());
}