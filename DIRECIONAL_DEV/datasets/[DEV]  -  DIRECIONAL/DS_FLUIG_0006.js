//TODAS AS SEÇÕES COM SEU RESPECTIVOS GERENTE
function Consulta()
{
	var CODSENTENCA = "FLUIG.0006";
	log.warn("EXECUTANDO DATASET " + CODSENTENCA);
	var DATASET;
	var PARAMETROS = "";
	try
	{

		var COLUNAS = new Array("CODCOLIGADA", "CODSECAO", "SECAO",
		"CNPJ", "ESTADO", "CIDADE",
		"NOME_GESTOR", "CHAPA_GESTOR",
		"CHAPA_FOLHA", "OBRA_SEDE","NOME_EMPRESA", 'CHAPA_CONSULTORA',
		'CHAPA_DIRETOR', 'CHAPA_GG', 'CHAPA_SUPER');

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


		var CODCOLIGADA      = "";
		var CODSECAO         = "";
		var SECAO            = "";
		var CNPJ             = "";
		var ESTADO           = "";
		var CIDADE           = "";
		var NOME_GESTOR      = "";
		var CHAPA_GESTOR     = "";
		var CHAPA_FOLHA      = "";
		var OBRA_SEDE        = "";
		var NOME_EMPRESA     = "";
		var CHAPA_CONSULTORA = "";
		var CHAPA_DIRETOR    = "";
		var CHAPA_GG         = "";
		var CHAPA_SUPER      = "";

		if(JSONObj == "")
		{
		return DATASET;
		}
		var entitys = JSONObj.get("Resultado");

		var arr = JSON.parse(entitys);

		arr.map(function(linha){

				CODCOLIGADA      = linha["CODCOLIGADA"];  
				CODSECAO         = linha["CODSECAO"];  
				SECAO            = linha["SECAO"];  
				CNPJ             = linha["CNPJ"];  
				ESTADO           = linha["ESTADO"];  
				CIDADE           = linha["CIDADE"];  
				NOME_GESTOR      = linha["NOME_GESTOR"]; 
				CHAPA_GESTOR     = linha["CHAPA_GESTOR"]; 
				CHAPA_FOLHA      = linha["CHAPA_FOLHA"]; 
				OBRA_SEDE        = linha["OBRA_SEDE"]; 
				NOME_EMPRESA     = linha["NOME_EMPRESA"]; 
				CHAPA_CONSULTORA = linha["CHAPA_CONSULTORA"]; 
				CHAPA_DIRETOR    = linha["CHAPA_DIRETOR"]; 
				CHAPA_GG         = linha["CHAPA_GG"]; 
				CHAPA_SUPER      = linha["CHAPA_SUPER"]; 

				DATASET.addRow(new Array(CODCOLIGADA,CODSECAO,SECAO,
				CNPJ, 
				ESTADO, 
				CIDADE,
				NOME_GESTOR,
				UserFluig(CHAPA_GESTOR), 
				UserFluig(CHAPA_FOLHA),
				OBRA_SEDE,
				NOME_EMPRESA, 
				UserFluig(CHAPA_CONSULTORA), 
				UserFluig(CHAPA_DIRETOR),
				UserFluig(CHAPA_GG), 
				UserFluig(CHAPA_SUPER)
				));
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