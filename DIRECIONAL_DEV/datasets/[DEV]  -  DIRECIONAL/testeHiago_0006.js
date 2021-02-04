//TODAS AS SEÇÕES COM SEU RESPECTIVOS GERENTE
function Consulta()
{


	log.info("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
	log.info("ENTROU NO DATASET !!");
	log.info("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");

	var CODSENTENCA = "FLUIG.0006";
	
	log.warn("EXECUTANDO DATASET " + CODSENTENCA);
	
	var DATASET;
	var PARAMETROS = "";
	
	try
	{

	log.info("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
	log.info("ENTROU NO TRY !!");
	log.info("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");



		var COLUNAS = new Array("CODCOLIGADA", "CODSECAO", "SECAO",
				"CNPJ", "ESTADO", "CIDADE",
				"NOME_GESTOR", "CHAPA_GESTOR",
				"CHAPA_FOLHA", "OBRA_SEDE","NOME_EMPRESA", 'CHAPA_CONSULTORA',
				'CHAPA_DIRETOR', 'CHAPA_GG', 'CHAPA_SUPER');

		DATASET = DatasetBuilder.newDataset()
		
		for (var i = 0; i < COLUNAS.length; i++)
		{
			DATASET.addColumn(COLUNAS[i]);
			log.info("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
			log.info("ENTROU NO FOR COLUNAS !!");
			log.info("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
		}
		


 // ***********************************************************************************************

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
		log.info("CHAMOU OS SERVIÇOS NO DATASET HIAGAO TESTAO ");
		log.info("****************************************************");

		
		var result = 
			customClient.realizarConsultaSQL(CODSENTENCA, COLIGADA, CODAPLICACAO, PARAMETROS);
		//log.warn(result);
		var JSONObj = org.json.XML.toJSONObject(result).get("NewDataSet");

		var factory = javax.xml.parsers.DocumentBuilderFactory.newInstance();
		var parser = factory.newDocumentBuilder();
		var source = new org.xml.sax.InputSource(new java.io.StringReader(result));
		var xmlResponse = parser.parse(source);

		var nodes = xmlResponse.getElementsByTagName("NOME_GESTOR");

		log.info("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
		log.warn("gestor  "+nodes.item(0).getTextContent());
		log.info("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");





 // ***********************************************************************************************

		if(JSONObj == "")
		{
			log.info("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
			log.info("ENTROU NO IF VAZIO !!");
			log.info("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
			return DATASET;
		}
		
		// if (JSONObj.has("Resultado"))
		// {
			var entitys = JSONObj.get("Resultado");
			for (var i = 0; i < entitys.length(); i++)
			{
				var row = null;

			log.info("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
			log.info("ENTROU NO SEGUNDO FOR  !!");
			log.info("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");

		log.info("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
		log.warn("GESTOR NO FOR  "+nodes.item(0).getTextContent());
		log.info("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");



				// if (entitys.isNull(i))
				// {
				// 	row = entitys;
				// }
				// else
				// {
				// 	row = entitys.get(i);
				// }

				var CODCOLIGADA = row.has("CODCOLIGADA") ? row.get("CODCOLIGADA") : ""; //ok 
				var CODSECAO = row.has("CODSECAO") ? row.get("CODSECAO") : "";//ok 
				var SECAO = row.has("SECAO") ? row.get("SECAO") : "";//ok 
				var CNPJ = row.has("CNPJ") ? row.get("CNPJ") : "";//ok 
				var ESTADO = row.has("ESTADO") ? row.get("ESTADO") : "";//ok 
				var CIDADE = row.has("CIDADE") ? row.get("CIDADE") : "";//ok 
				var NOME_GESTOR = row.has("NOME_GESTOR") ? row.get("NOME_GESTOR") : "";
				var CHAPA_GESTOR = row.has("CHAPA_GESTOR") ? row.get("CHAPA_GESTOR") : "";
				var CHAPA_FOLHA = row.has("CHAPA_FOLHA") ? row.get("CHAPA_FOLHA") : "";
				var OBRA_SEDE = row.has("OBRA_SEDE") ? row.get("OBRA_SEDE") : "";
				var NOME_EMPRESA = row.has("NOME_EMPRESA") ? row.get("NOME_EMPRESA") : "";
				var CHAPA_CONSULTORA = row.has("CHAPA_CONSULTORA") ? row.get("CHAPA_CONSULTORA") : "";
				var CHAPA_DIRETOR = row.has("CHAPA_DIRETOR") ? row.get("CHAPA_DIRETOR") : "";
				var CHAPA_GG = row.has("CHAPA_GG") ? row.get("CHAPA_GG") : "";
				var CHAPA_SUPER = row.has("CHAPA_SUPER") ? row.get("CHAPA_SUPER") : "";

				
				DATASET.addRow(new Array(CODCOLIGADA, CODSECAO, SECAO,
						CNPJ, 
						ESTADO, 
						CIDADE,
						NOME_GESTOR,
						UserFluig(CHAPA_GESTOR.toString()), 
						UserFluig(CHAPA_FOLHA.toString()),
						OBRA_SEDE,
						NOME_EMPRESA, 
						UserFluig(CHAPA_CONSULTORA.toString()), 
						UserFluig(CHAPA_DIRETOR.toString()),
						UserFluig(CHAPA_GG.toString()), 
						UserFluig(CHAPA_SUPER.toString())
						));

				// if (entitys.isNull(i))
				// {
				// 	return DATASET;
				// }
			}
		//}

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


function defineStructure() {
	
	new Array("CODCOLIGADA", "CODSECAO", "SECAO",
			"CNPJ", "ESTADO", "CIDADE",
			"NOME_GESTOR", "CHAPA_GESTOR",
			"CHAPA_FOLHA", "OBRA_SEDE","NOME_EMPRESA", 'CHAPA_CONSULTORA',
			'CHAPA_DIRETOR', 'CHAPA_GG', 'CHAPA_SUPER');
	
	
	addColumn("CODCOLIGADA", DatasetFieldType.STRING);
	addColumn("CODSECAO", DatasetFieldType.STRING);
	addColumn("SECAO", DatasetFieldType.STRING);
	addColumn("CNPJ", DatasetFieldType.STRING );
	addColumn("ESTADO", DatasetFieldType.STRING);
	addColumn("CIDADE", DatasetFieldType.STRING);
	addColumn("NOME_GESTOR", DatasetFieldType.STRING);
	addColumn("CHAPA_GESTOR", DatasetFieldType.STRING);
	addColumn("CHAPA_FOLHA", DatasetFieldType.STRING);
	addColumn("OBRA_SEDE", DatasetFieldType.STRING);
	addColumn("NOME_EMPRESA", DatasetFieldType.STRING);
	addColumn("CHAPA_CONSULTORA", DatasetFieldType.STRING);
	addColumn("CHAPA_DIRETOR", DatasetFieldType.STRING);
	addColumn("CHAPA_GG", DatasetFieldType.STRING);
	addColumn("CHAPA_SUPER", DatasetFieldType.STRING);
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