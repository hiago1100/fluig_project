//DATASET COM AS INFORMAÇÕES PADRÕES PARA SER USADO NOS OUTROS DATASETS
function createDataset(fields, constraints, sortFields) {
	try
	{
		var dataset = DatasetBuilder.newDataset();
		dataset.addColumn("RESULTADO");
		
		log.info("****************************************************");
		log.info("ENTROU NO DATASET");
		log.info("****************************************************");

		if (fields != null)
		{
			var DATASET_NOME = fields[0];
			var PARAMETROS = fields[1];
		}
		else
		{
			throw "PARÂMETROS OBRIGATÓRIOS NÃO FORAM PASSADOS.";
		}
		
		log.info("****************************************************");
		log.info("PASSOU DOS PARAMETROS OBRIGATÓRIOS");
		log.info("****************************************************");


		var COLIGADA = 0;
		var CODAPLICACAO = "P";
		
		//usuario do RM
		var USUARIO = "srv_fluig";
		var SENHA = "XADMfluig2014";
		  
		// propriedades para conexao com o RM
		var properties = {};
		properties["basic.authorization"] = "true";
		properties["basic.authorization.username"] = USUARIO;
		properties["basic.authorization.password"] = SENHA;
		properties["disable.chunking"] = "true";
		properties["log.soap.messages"] = "true";
		properties["receive.timeout"] = "60000";
	
		var NOME_SERVICO = "wsConsultaSQLRM";
		var CAMINHO_SERVICO = "com.totvs.WsConsultaSQL";
		var INTERFACE = "com.totvs.IwsConsultaSQL";
		
		var servico = ServiceManager.getService(NOME_SERVICO);
		var serviceLocator = servico.instantiate(CAMINHO_SERVICO);
		var service = serviceLocator.getRMIwsConsultaSQL();
		var customClient = servico.getCustomClient(service, INTERFACE, properties);

		log.info("****************************************************");
		log.info("CHAMOU OS SERVIÇOS");
		log.info("****************************************************");

		
		var result = 
			customClient.realizarConsultaSQL(DATASET_NOME, COLIGADA, CODAPLICACAO, PARAMETROS);
		//log.warn(result);
		var JSONObj = org.json.XML.toJSONObject(result).get("NewDataSet");

		var factory = javax.xml.parsers.DocumentBuilderFactory.newInstance();
		var parser = factory.newDocumentBuilder();
		var source = new org.xml.sax.InputSource(new java.io.StringReader(result));
		var xmlResponse = parser.parse(source);

		var nodes = xmlResponse.getElementsByTagName("NOME_GESTOR");
		log.info("HIAGO "+nodes.item(0).getTextContent());


		log.info("****************************************************");
		log.info("RESULTADO DO DATASET"+ result);
		log.info("****************************************************");



		log.warn(JSONObj);
		
		if(JSONObj != ""){
				dataset.addRow(new Array(JSONObj));
				
			}
			else{
				dataset.addRow(new Array(""));
			}
		
		log.dir(dataset);

		return dataset;

	}
	catch (err)
	{
		var mensagem = 
			"ERRO AO EXECUTAR O DATASET [DS_FLUIG_0000] - DETALHES DO ERRO: " + err.message;
		
		log.error("+++++++++++++++++++++++++++++++++++++++++++++++++++")
		log.error("ERRO AO EXECUTAR O DATASET - DS_FLUIG_0000");
		log.error("DETALHES DO ERRO: " + err);
		log.error("+++++++++++++++++++++++++++++++++++++++++++++++++++");
		
		dataset.addRow(new Array(mensagem));
		return dataset;
	}
}