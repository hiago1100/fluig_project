//RETORNA FUNÇÃO COM DESCRIÇÃO DE MÃO DE OBRA POR MAO DE OBRA E COLIGADA
function createDataset(fields, constraints, sortFields)
{
	var CODSENTENCA = "FLUIG.0005";
	
	log.warn("EXECUTANDO DATASET " + CODSENTENCA);
	
	var CODCOLIGADA;
	var CODSECAO;
	var MAODEOBRA;
	
	var DATASET;
	
	try
	{
		if (fields != null)
		{
			CODCOLIGADA = fields[0];
			CODSECAO = fields[1];
			MAODEOBRA = fields[2];
		}
		else
		{
			CODCOLIGADA = "1";
			CODSECAO = "01.1.00001.05.005";
			MAODEOBRA = "Administrativo";
			//throw "PARÂMETROS OBRIGATÓRIOS NÃO FORAM PASSADOS.";
		}
	
		var PARAMETROS = "CODCOLIGADA=" + CODCOLIGADA + ";CODSECAO=" + CODSECAO + ";MAODEOBRA=" + MAODEOBRA;
		log.warn(CODSENTENCA + " - PARÂMETROS: " + PARAMETROS);
	
		var COLUNAS = new Array("CODIGO", "NOME", "MAODEOBRA");

		DATASET = DatasetBuilder.newDataset()
		
		for (var i = 0; i < COLUNAS.length; i++)
		{
			DATASET.addColumn(COLUNAS[i]);
		}

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
		properties["receive.timeout"] = "0";

		var NOME_SERVICO = "wsConsultaSQLRM";
		var CAMINHO_SERVICO = "com.totvs.WsConsultaSQL";
		var INTERFACE = "com.totvs.IwsConsultaSQL";

		var servico = ServiceManager.getService(NOME_SERVICO);
		var serviceLocator = servico.instantiate(CAMINHO_SERVICO);
		var service = serviceLocator.getRMIwsConsultaSQL();
		var customClient = servico.getCustomClient(service, INTERFACE, properties);

		var result = 
		customClient.realizarConsultaSQL(CODSENTENCA, COLIGADA, CODAPLICACAO, PARAMETROS);
		//log.warn(result);
		var JSONObj = org.json.XML.toJSONObject(result).get("NewDataSet");
		var factory = javax.xml.parsers.DocumentBuilderFactory.newInstance();
		var parser = factory.newDocumentBuilder();
		var source = new org.xml.sax.InputSource(new java.io.StringReader(result));
		var xmlResponse = parser.parse(source);


		var CODIGO = "";
		var NOME = "";
		var MAODEOBRA = "";


		if(JSONObj == "")
		{
		return DATASET;
		}
		var entitys = JSONObj.get("Resultado");

		var arr = JSON.parse(entitys);

		arr.map(function(linha){

		CODIGO    = linha["CODIGO"]
		NOME      = linha["NOME"]
		MAODEOBRA = linha["MAODEOBRA"]

		 DATASET.addRow(new Array(CODIGO,NOME,MAODEOBRA));
		});			


		return DATASET;

	}
	catch (err)
	{
		var mensagem = 
			"ERRO AO EXECUTAR O DATASET "+ CODSENTENCA +" - DETALHES DO ERRO: " + err;
		
		log.error("+++++++++++++++++++++++++++++++++++++++++++++++++++")
		log.error(mensagem);
		log.error("+++++++++++++++++++++++++++++++++++++++++++++++++++");
		
		DATASET = DatasetBuilder.newDataset();
		DATASET.addColumn("ERRO");
		DATASET.addRow(new Array(mensagem));
		return DATASET;
	}
}