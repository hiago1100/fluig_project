//RETORNA TODAS AS SECOES COM SEUS RESPECTIVOS GESTORES

function Consulta()
{
	var CODSENTENCA = "FLUIG.0008";


	var CODSECAO = "";
	var CHAPA_GERENTE = "";
	var CODCOLIGADA_GERENTE = "";
	var NOME_GERENTE = "";
	var NOME_SECAO = "";
	var CODICOLIGADA_SECAO = "";
	var CHAPA_CONSULTORA = "";
	var NOME_CONSULTORA = "";
	var CHAPA_DIRETOR = "";
	var NOME_DIRETOR = "";
	var CHAPA_GG = "";
	var NOME_GG = "";
	var CHAPA_SUPER = "";
	var NOME_SUPERINTENDENTE = "";
	var NOME_EMPRESA = "";
	var CHAPA_FOLHA = "";
	var NOME_FOLHA = "";
	var ESTADO = "";
	var OBRA_SEDE = "";

	
	log.warn("EXECUTANDO DATASET " + CODSENTENCA);
	
	var DATASET;
	var PARAMETROS = "";
	
	try
	{
		var COLUNAS = 
			new Array("CODSECAO", "CHAPA_GERENTE", "CODCOLIGADA_GERENTE", 
					"NOME_GERENTE", "NOME_SECAO", "CODICOLIGADA_SECAO",
				"CHAPA_CONSULTORA", "NOME_CONSULTORA", "CHAPA_DIRETOR", 
				"NOME_DIRETOR", "CHAPA_GG", "NOME_GG", 
				"CHAPA_SUPER", "NOME_SUPERINTENDENTE", "NOME_EMPRESA", 
				"CHAPA_FOLHA", "NOME_FOLHA", "ESTADO", 
				"OBRA_SEDE");

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
		
	
		if(JSONObj == "")
		{
			return DATASET;
		}

			var entitys = JSONObj.get("Resultado");
			var arr = JSON.parse(entitys);
			arr.map(function(linha){

			    CODSECAO = linha["CODSECAO"];
			    CHAPA_GERENTE = linha["CHAPA_GERENTE"];
			    CODCOLIGADA_GERENTE = linha["CODCOLIGADA_GERENTE"];
			    NOME_GERENTE = linha["NOME_GERENTE"];
			    NOME_SECAO = linha["NOME_SECAO"];
			    CODICOLIGADA_SECAO = linha["CODICOLIGADA_SECAO"];
			    CHAPA_CONSULTORA = linha["CHAPA_CONSULTORA"];
			    NOME_CONSULTORA = linha["NOME_CONSULTORA"];
			    CHAPA_DIRETOR = linha["CHAPA_DIRETOR"];
			    NOME_DIRETOR = linha["NOME_DIRETOR"];
			    CHAPA_GG = linha["CHAPA_GG"];
			    NOME_GG = linha["NOME_GG"];
			    CHAPA_SUPER = linha["CHAPA_SUPER"];
			    NOME_SUPERINTENDENTE = linha["NOME_SUPERINTENDENTE"];
			    NOME_EMPRESA = linha["NOME_EMPRESA"];
			    CHAPA_FOLHA = linha["CHAPA_FOLHA"];
			    NOME_FOLHA = linha["NOME_FOLHA"];
			    ESTADO = linha["ESTADO"];
			    OBRA_SEDE = linha["OBRA_SEDE"];

				DATASET.addRow(new Array(
				CODSECAO, 
				UserFluig(CHAPA_GERENTE), 
				CODCOLIGADA_GERENTE, 
				NOME_GERENTE, 
				NOME_SECAO,
				CODICOLIGADA_SECAO,
				UserFluig(CHAPA_CONSULTORA), 
				NOME_CONSULTORA, 
				UserFluig(CHAPA_DIRETOR), 
			    NOME_DIRETOR, 
				UserFluig(CHAPA_GG),
				NOME_GG, 
				UserFluig(CHAPA_SUPER), 
				NOME_SUPERINTENDENTE,
				NOME_EMPRESA, 
				UserFluig(CHAPA_FOLHA),
				NOME_FOLHA, 
				ESTADO, 
				OBRA_SEDE));

				
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

function onSync(lastSyncDate)
{
    return Consulta();
}

function onMobileSync(user) {

}

function createDataset(fields, constraints, sortFields)
{
  return Consulta();
}

function defineStructure() {

	addColumn("CODSECAO", DatasetFieldType.STRING);
	addColumn("CHAPA_GERENTE", DatasetFieldType.STRING);
	addColumn("CODCOLIGADA_GERENTE", DatasetFieldType.STRING);
	addColumn("NOME_GERENTE", DatasetFieldType.STRING );
	addColumn("NOME_SECAO", DatasetFieldType.STRING);
	addColumn("CODICOLIGADA_SECAO", DatasetFieldType.STRING);
	addColumn("CHAPA_CONSULTORA", DatasetFieldType.STRING);
	addColumn("NOME_CONSULTORA", DatasetFieldType.STRING);
	addColumn("CHAPA_DIRETOR", DatasetFieldType.STRING);
	addColumn("NOME_DIRETOR", DatasetFieldType.STRING);
	addColumn("CHAPA_GG", DatasetFieldType.STRING);
	addColumn("NOME_GG", DatasetFieldType.STRING);
	addColumn("CHAPA_SUPER", DatasetFieldType.STRING);
	addColumn("NOME_SUPERINTENDENTE", DatasetFieldType.STRING);
	addColumn("NOME_EMPRESA", DatasetFieldType.STRING);
	addColumn("CHAPA_FOLHA", DatasetFieldType.STRING);
	addColumn("NOME_FOLHA", DatasetFieldType.STRING);
	addColumn("ESTADO", DatasetFieldType.STRING);
	addColumn("OBRA_SEDE", DatasetFieldType.STRING);
	
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