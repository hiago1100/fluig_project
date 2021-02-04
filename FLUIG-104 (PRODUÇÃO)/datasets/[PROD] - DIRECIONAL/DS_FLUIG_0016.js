//RETORNA TRES STEPS SALARIAIS - RECRUTAMENTO INTERNO
function createDataset(fields, constraints, sortFields)
{
	var CODSENTENCA = "FLUIG.0016";
	log.warn("EXECUTANDO DATASET " + CODSENTENCA);	
	var CODFUNCAO;
	var CODSECAO;
	var CODCOLIGADA;
	var SALARIO;
	var DATASET;
	
	try
	{
		if (fields != null)
		{
			CODFUNCAO = fields[0];
			CODSECAO = fields[1];
			CODCOLIGADA = fields[2];
			SALARIO = fields[3];
		}
		else
		{
			CODFUNCAO = "0931";
			CODSECAO = "01.1.00001.05.005";
			CODCOLIGADA = "1";
			SALARIO = "4611.57";
			//throw "PARÂMETROS OBRIGATÓRIOS NÃO FORAM PASSADOS.";
		}	
		var PARAMETROS = "CODFUNCAO=" + CODFUNCAO + ";CODSECAO=" + CODSECAO + ";CODCOLIGADA=" + CODCOLIGADA + ";SALARIO=" + SALARIO;
		log.warn(CODSENTENCA + " - PARÂMETROS: " + PARAMETROS);
	
		var COLUNAS = 
			new Array("CODCOLIGADA", "CODFUNCAO", "CODSECAO", 
				"SALARIO");

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
		var JSONObj = org.json.XML.toJSONObject(result).get("NewDataSet");
		var factory = javax.xml.parsers.DocumentBuilderFactory.newInstance();
		var parser  = factory.newDocumentBuilder();
		var source  = new org.xml.sax.InputSource(new java.io.StringReader(result));
		var xmlResponse = parser.parse(source);
		var CODCOLIGADA = "";
		var CODFUNCAO   = "";
		var CODSECAO    = ""; 
		var SALARIO     = ""; 

		if(JSONObj == "")
		{
		return DATASET;
		}
		var entitys = JSONObj.get("Resultado");

		var arr = JSON.parse(entitys);

		arr.map(function(linha){

		var CODCOLIGADA = linha["CODCOLIGADA"];
		var CODFUNCAO   = linha["CODFUNCAO"];
		var CODSECAO    = linha["CODSECAO"]; 
		var SALARIO     = linha["SALARIO"]; 

				DATASET.addRow(new Array(CODCOLIGADA,CODFUNCAO,CODSECAO,SALARIO));
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