function defineStructure() {
	addColumn("CHAPA", DatasetFieldType.STRING);
	addColumn("NOME", DatasetFieldType.STRING);
	addColumn("CODCOLIGADA", DatasetFieldType.STRING);
	addColumn("DATAADMISSAO", DatasetFieldType.STRING);
	addColumn("TIPOADMISSAO", DatasetFieldType.STRING );
	addColumn("CODPARCEIRO", DatasetFieldType.STRING );
	
	log.info("defineStructure andreoliveira");
}

function onSync(lastSyncDate) {
	log.warn("+++++++++++++++++++++++++++++++++++++++++++++++++++")
	log.warn("DATA DA ULTIMA ATUALIZAÇÃO: "+lastSyncDate);
	log.warn("+++++++++++++++++++++++++++++++++++++++++++++++++++");
	log.info("onSync andreoliveira"+ lastSyncDate);
}

function Consulta() {
	
	log.warn("EXECUTANDO DATASET SP_FLUIG_0110");
	
	var SQL = "EXECUTE SP_FLUIG_0110";
	var TIPO = "CONSULTA";
	
	try
	{
		var retorno = DatasetFactory.getDataset("DS_FLUIG_BD_CSC", new Array(SQL,TIPO), null, null);
	}
	catch (err)
	{
		var mensagem = 
				"ERRO AO EXECUTAR O DATASET SP_FLUIG_0110 - DETALHES DO ERRO: " + err;
	
		log.error("+++++++++++++++++++++++++++++++++++++++++++++++++++")
		log.error(mensagem);
		log.error("+++++++++++++++++++++++++++++++++++++++++++++++++++");
		
		DATASET = DatasetBuilder.newDataset();
		DATASET.addColumn("ERRO");
		DATASET.addRow(new Array(mensagem));
		return DATASET;
	}
	
	return retorno;
	
}

function createDataset(fields, constraints, sortFields)
{
	  return Consulta();
}

function onMobileSync(user) {

}