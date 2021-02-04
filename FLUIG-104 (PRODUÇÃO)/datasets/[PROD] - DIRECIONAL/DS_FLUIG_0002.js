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
			CODSECAO = "01.1.00001.05.005";
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
		
		var JSONObj = 
			DatasetFactory.getDataset("DS_FLUIG_0000", [CODSENTENCA, PARAMETROS], null, null).getValue(0, "RESULTADO");

		if(JSONObj == "")
		{
			return DATASET;
		}
		
		if (JSONObj.has("Resultado"))
		{
			var entitys = JSONObj.get("Resultado");
			for (var i = 0; i < entitys.length(); i++)
			{
				var row = null;
				if (entitys.isNull(i))
				{
					row = entitys;
				}
				else
				{
					row = entitys.get(i);
				}

				var CODSECAO = row.has("CODSECAO") ? row.get("CODSECAO") : "";
				var DESCRICAO = row.has("DESCRICAO") ? row.get("DESCRICAO") : "";
				var CHAPA_DIRETOR = row.has("CHAPA_DIRETOR") ? row.get("CHAPA_DIRETOR") : "";
				var DIRETOR = row.has("DIRETOR") ? row.get("DIRETOR") : "";
				var USU_REDE_DIR = row.has("USU_REDE_DIR") ? row.get("USU_REDE_DIR") : "";
				var GERENTE = row.has("GERENTE") ? row.get("GERENTE") : "";
				var USU_REDE_GER = row.has("USU_REDE_GER") ? row.get("USU_REDE_GER") : "";
				var SUPERINTENDENTE = row.has("SUPERINTENDENTE") ? row.get("SUPERINTENDENTE") : "";
				var USU_REDE_SUP = row.has("USU_REDE_SUP") ? row.get("USU_REDE_SUP") : "";
				var USU_REDE_ENG = row.has("USU_REDE_ENG") ? row.get("USU_REDE_ENG") : "";
				var CHAPA_ENG = row.has("CHAPA_ENG") ? row.get("CHAPA_ENG") : "";
				var CHAPA_CONSULTORA = row.has("CHAPA_CONSULTORA") ? row.get("CHAPA_CONSULTORA") : "";
				var CHAPA_GERENTE = row.has("CHAPA_GERENTE") ? row.get("CHAPA_GERENTE") : "";
				var CHAPA_FOLHA = row.has("CHAPA_FOLHA") ? row.get("CHAPA_FOLHA") : "";
				var CHAPA_SUP = row.has("CHAPA_SUP") ? row.get("CHAPA_SUP") : "";
				var CHAPA_GGO = row.has("CHAPA_GGO") ? row.get("CHAPA_GGO") : "";
				var CHAPA_SUP_ADM = row.has("CHAPA_SUP_ADM") ? row.get("CHAPA_SUP_ADM") : "";

				DATASET.addRow(new Array(CODSECAO, DESCRICAO, CHAPA_DIRETOR,
						DIRETOR, 
						USU_REDE_DIR, GERENTE, 
						USU_REDE_GER, SUPERINTENDENTE,
						UserFluig(CHAPA_SUP), 
						USU_REDE_SUP, USU_REDE_ENG,
						UserFluig(CHAPA_ENG), 
						UserFluig(CHAPA_CONSULTORA),
						UserFluig(CHAPA_GERENTE),
						UserFluig(CHAPA_FOLHA), 
						UserFluig(CHAPA_SUP),
						UserFluig(CHAPA_GGO),
						UserFluig(CHAPA_SUP_ADM)
						));

				if (entitys.isNull(i))
				{
					return DATASET;
				}
			}
		}

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