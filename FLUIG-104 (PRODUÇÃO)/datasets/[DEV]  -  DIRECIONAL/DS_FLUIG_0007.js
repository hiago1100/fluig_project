//RETORNA TODAS AS LISTAS COLIGADAS DE ACORDO COM A MATRICULA
function createDataset(fields, constraints, sortFields)
{
	var CODSENTENCA = "FLUIG.0007";
	
	log.warn("EXECUTANDO DATASET " + CODSENTENCA);
	
	var CODUSUARIOREDE;
	
	var DATASET;
	
	try
	{
		if (fields != null)
		{
			CODUSUARIOREDE = fields[0];
		}
		else
		{
			CODUSUARIOREDE = "DE0182939";
			//throw "PARÂMETROS OBRIGATÓRIOS NÃO FORAM PASSADOS.";
		}
	
		var PARAMETROS = "CODUSUARIOREDE=" + CODUSUARIOREDE;
		log.warn(CODSENTENCA + " - PARÂMETROS: " + PARAMETROS);
	
		var COLUNAS = new Array("CODCOLIGADA", "EMPRESA", "CODSECAO", 
				"DEPARTAMENTO", "CHAPASOLICITANTE", "OBRAOUSEDE", 
				"CIDADE", "ESTADO", "CNPJ",
				"FOLHA", "GESTOR", "SUP", 
				"CHAPA_GG", "CHAPA_SUP_ADM", 
				"DIRETOR", "NOME_FOLHA", "NOME_GESTOR", 
				"NOME_SUP", "NOME_GG", "NOME_DIRETOR",
				"NOME_SUPERVISOR", "CHAPA_CONSULTORA", "NOME_CONSULTORA", 
				"BLOQUEIACONTRATACAO","CODPARCEIRO","NOMEPARCEIRO", "CONSTRUTOR");

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

				var CODCOLIGADA = row.has("CODCOLIGADA") ? row.get("CODCOLIGADA") : "";
				var EMPRESA = row.has("EMPRESA") ? row.get("EMPRESA") : "";
				var CODSECAO = row.has("CODSECAO") ? row.get("CODSECAO") : "";
				var DEPARTAMENTO = row.has("DEPARTAMENTO") ? row.get("DEPARTAMENTO") : "";
				var CHAPASOLICITANTE = row.has("CHAPASOLICITANTE") ? row.get("CHAPASOLICITANTE") : "";
				var OBRAOUSEDE = row.has("OBRAOUSEDE") ? row.get("OBRAOUSEDE") : "";
				var CIDADE = row.has("CIDADE") ? row.get("CIDADE") : "";
				var ESTADO = row.has("ESTADO") ? row.get("ESTADO") : "";
				var CNPJ = row.has("CNPJ") ? row.get("CNPJ") : "";
				var FOLHA = row.has("FOLHA") ? row.get("FOLHA") : "";
				var GESTOR = row.has("GESTOR") ? row.get("GESTOR") : "";
				var SUP = row.has("SUP") ? row.get("SUP") : "";
				var CHAPA_GG = row.has("CHAPA_GG") ? row.get("CHAPA_GG") : "";
				var CHAPA_SUP_ADM = row.has("CHAPA_SUP_ADM") ? row.get("CHAPA_SUP_ADM") : "";
				var DIRETOR = row.has("DIRETOR") ? row.get("DIRETOR") : "";
				var NOME_FOLHA = row.has("NOME_FOLHA") ? row.get("NOME_FOLHA") : "";
				var NOME_GESTOR = row.has("NOME_GESTOR") ? row.get("NOME_GESTOR") : "";
				var NOME_SUP = row.has("NOME_SUP") ? row.get("NOME_SUP") : "";
				var NOME_DIRETOR = row.has("NOME_DIRETOR") ? row.get("NOME_DIRETOR") : "";
				var NOME_GG = row.has("NOME_GG") ? row.get("NOME_GG") : "";
				var NOME_SUPERVISOR = row.has("NOME_SUPERVISOR") ? row.get("NOME_SUPERVISOR") : "";
				var BLOQUEIACONTRATACAO = row.has("BLOQUEIACONTRATACAO") ? row.get("BLOQUEIACONTRATACAO") : "";
				var CHAPA_CONSULTORA = row.has("CHAPA_CONSULTORA") ? row.get("CHAPA_CONSULTORA") : "";
				var NOME_CONSULTORA = row.has("NOME_CONSULTORA") ? row.get("NOME_CONSULTORA") : "";
				
				var CODPARCEIRO = row.has("CODPARCEIRO") ? row.get("CODPARCEIRO") : "";
				var NOMEPARCEIRO = row.has("NOMEPARCEIRO") ? row.get("NOMEPARCEIRO") : "";
				var CONSTRUTOR = row.has("CONSTRUTOR") ? row.get("CONSTRUTOR") : "";

				DATASET.addRow(new Array(
						CODCOLIGADA, 
						EMPRESA, 
						CODSECAO, 
						DEPARTAMENTO, 
						CHAPASOLICITANTE, 
						OBRAOUSEDE, 
						CIDADE, 
						ESTADO, 
						CNPJ, 
						UserFluig(FOLHA.toString()),
						UserFluig(GESTOR.toString()), 
						UserFluig(SUP.toString()), 
						UserFluig(CHAPA_GG.toString()), 
						UserFluig(CHAPA_SUP_ADM.toString()), 
						UserFluig(DIRETOR.toString()), 
						NOME_FOLHA, 
						NOME_GESTOR, 
						NOME_SUP, 
						NOME_GG, 
						NOME_DIRETOR, 
						NOME_SUPERVISOR,
						UserFluig(CHAPA_CONSULTORA.toString()), 
						NOME_CONSULTORA, 
						BLOQUEIACONTRATACAO,CODPARCEIRO,NOMEPARCEIRO, CONSTRUTOR));

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