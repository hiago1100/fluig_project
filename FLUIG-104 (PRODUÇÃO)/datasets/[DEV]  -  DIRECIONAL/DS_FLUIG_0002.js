// Lembrete ******
// 1 - Encontrar o problema da integração "FLUIG-0125" onde aparentemente o USUARIO de integração está 'CHUMBADO' no servidor
// 2 - Conversar com o pessoal de RM para entender o retorno nulo da integração do dataset 0002.


//BUSCA HIERAQUIA FUNCIONARIO POR COLIGADA E SECAO
function createDataset(fields, constraints, sortFields)
{
	var CODSENTENCA = "FLUIG.0002";
	log.warn("EXECUTANDO DATASET " + CODSENTENCA);	
	var CODSECAO;
	var CODCOLIGADA;
	
	var DATASET;
	
	try
	{
		if (fields != null)
		{
			CODSECAO = fields[0];
			CODCOLIGADA = fields[1];
		}
		else
		{
			CODSECAO = "01.1.00001.23.003";
			CODCOLIGADA = "1";
			//throw "PARÂMETROS OBRIGATÓRIOS NÃO FORAM PASSADOS.";
		}
	
		var PARAMETROS = "CODSECAO=" + CODSECAO + ";CODCOLIGADA=" + CODCOLIGADA;
		log.warn(CODSENTENCA + " - PARÂMETROS: " + PARAMETROS);
	
		var COLUNAS = 
			new Array("CODSECAO", "DESCRICAO", "CHAPA_DIRETOR", 
					"DIRETOR", "USU_REDE_DIR", "GERENTE", 
					"USU_REDE_GER", "SUPERINTENDENTE","CHAPA_SUP", 
					"USU_REDE_SUP", "USU_REDE_ENG", "CHAPA_ENG", 
					"CHAPA_CONSULTORA", "CHAPA_GERENTE", "CHAPA_FOLHA", 
					"CHAPA_SUP", "CHAPA_GGO", "CHAPA_SUP_ADM");


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


		var CODSECAO = "";
		var DESCRICAO = "";
		var CHAPA_DIRETOR = "";
		var DIRETOR = "";
		var USU_REDE_DIR = "";
		var GERENTE = "";
		var USU_REDE_GER = "";
		var SUPERINTENDENTE = "";
		var USU_REDE_SUP = "";
		var USU_REDE_ENG = "";
		var CHAPA_ENG = "";
		var CHAPA_CONSULTORA = "";
		var CHAPA_GERENTE = "";
		var CHAPA_FOLHA = "";
		var CHAPA_SUP = "";
		var CHAPA_GGO = "";
		var CHAPA_SUP_ADM = "";

		if(JSONObj == "")
		{
		return DATASET;
		}

		var entitys = JSONObj.get("Resultado");
		var arr = JSON.parse(entitys);

		CODSECAO         =  arr.CODIGO;
 		DESCRICAO        =  arr.DESCRICAO;
 		CHAPA_DIRETOR    =  arr.CHAPA_DIRETOR;
 		DIRETOR          =  arr.DIRETOR;
 		USU_REDE_DIR     =  arr.USU_REDE_DIR;
 		GERENTE          =  arr.GERENTE;
 		USU_REDE_GER     =  arr.USU_REDE_GER;
 		SUPERINTENDENTE  =  arr.SUPERINTENDENTE;
 		USU_REDE_SUP     =  arr.USU_REDE_SUP;
 		USU_REDE_ENG     =  arr.USU_REDE_ENG;
 		CHAPA_CONSULTORA =  arr.CHAPA_CONSULTORA;
 		CHAPA_GERENTE	 =  arr.CHAPA_GERENTE;
 		CHAPA_FOLHA		 =  arr.CHAPA_FOLHA;
 		CHAPA_GGO        =  arr.CHAPA_GGO;

		DATASET.addRow(new Array(CODSECAO, DESCRICAO, CHAPA_DIRETOR,
						DIRETOR, 
						USU_REDE_DIR, GERENTE, 
						USU_REDE_GER, SUPERINTENDENTE,
						" ", 
						USU_REDE_SUP, USU_REDE_ENG,
						" ", 
						UserFluig(CHAPA_CONSULTORA),
						UserFluig(CHAPA_GERENTE),
						UserFluig(CHAPA_FOLHA), 
						" ",
						UserFluig(CHAPA_GGO),
						" "
						));

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