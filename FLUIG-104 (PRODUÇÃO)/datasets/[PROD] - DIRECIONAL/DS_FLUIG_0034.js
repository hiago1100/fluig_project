//RETORNA OS RESPONSAVEIS PELO DP DA OBRA POR CODSECAO E COLIGADA
function createDataset(fields, constraints, sortFields)
{
	var CODSENTENCA = "FLUIG.0034";
	
	log.warn("EXECUTANDO DATASET " + CODSENTENCA);

	var CODCOLIGADA; 
	var CODSECAO;
	
	var DATASET;
	
	try
	{
		if (fields != null)
		{	
			  CODCOLIGADA = fields[0]; 
			  CODSECAO = fields[1];
		}
		else
		{
			  CODCOLIGADA = "56"; 
			  CODSECAO = "01.2.18901.01.002";
			//throw "PARÂMETROS OBRIGATÓRIOS NÃO FORAM PASSADOS.";
		}
	
		var PARAMETROS = "CODCOLIGADA=" + CODCOLIGADA + ";CODSECAO=" + CODSECAO;
		log.warn(CODSENTENCA + " - PARÂMETROS: " + PARAMETROS);
	
		var COLUNAS = new Array("CHAPA", "NOME");

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


		var NOME      = "";
		var CHAPA     = "";


		if(JSONObj == "")
		{
		return DATASET;
		}
		var entitys = JSONObj.get("Resultado");

		var arr = JSON.parse(entitys);

		arr.map(function(linha){

				NOME  = linha["NOME"];  
				CHAPA = linha["CHAPA"];  
				DATASET.addRow(new Array(NOME,CHAPA));
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



function UserFluig(login) {
    //Monta as constraints para consulta
	
	if(login!=""){
    var c1 = DatasetFactory.createConstraint("login", login, login, ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint("active", true, true, ConstraintType.MUST);
    var constraints   = new Array(c1,c2);
    var a; 
    //Busca o dataset
    var dataset = DatasetFactory.getDataset("colleague", null, constraints, null);
     
    for(var i = 0; i < dataset.rowsCount; i++) {
      a = dataset.getValue(i, "colleaguePK.colleagueId");
    }
    if(a==undefined){
    	a= '';
    }else{
    	a=a;
    }
    }else {
		a= '';
	}
	
	return a;
}