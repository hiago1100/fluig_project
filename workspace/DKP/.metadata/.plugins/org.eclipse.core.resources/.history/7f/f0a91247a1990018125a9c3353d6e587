//RETORNA INFORMACOES PESSOAIS DOS FUNCIONARIOS POR SECAO E COLIGADA
function createDataset(fields, constraints, sortFields)
{
	var CODSENTENCA = "FLUIG.0020";
	
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
			CODSECAO = "01.1.00001.19.008";
			CODCOLIGADA = "1";
			//throw "PARÂMETROS OBRIGATÓRIOS NÃO FORAM PASSADOS.";
		}
	
		var PARAMETROS = "CODSECAO=" + CODSECAO + ";CODCOLIGADA=" + CODCOLIGADA;
		log.warn(CODSENTENCA + " - PARÂMETROS: " + PARAMETROS);
	
		var COLUNAS = new Array("CODCOLIGADA", "CHAPA", "NOME", 
				"CPF", "DTNASCIMENTO", "ESTADOCIVIL", 
				"SEXO", "NACIONALIDADE", "TITULOELEITOR",
				"CODIGOSECAO", "SECAO", "EMAIL", 
				"FUNCAO","SALARIO","HORARIO");

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
				var CHAPA = row.has("CHAPA") ? row.get("CHAPA") : "";
				var NOME = row.has("NOME") ? row.get("NOME") : "";
				var CPF = row.has("CPF") ? row.get("CPF") : "";
				var DTNASCIMENTO = row.has("DTNASCIMENTO") ? row.get("DTNASCIMENTO") : "";
				var ESTADOCIVIL = row.has("ESTADOCIVIL") ? row.get("ESTADOCIVIL") : "";
				var SEXO = row.has("SEXO") ? row.get("SEXO") : "";
				var NACIONALIDADE = row.has("NACIONALIDADE") ? row.get("NACIONALIDADE") : "";
				var TITULOELEITOR = row.has("TITULOELEITOR") ? row.get("TITULOELEITOR") : "";
				var CODIGOSECAO = row.has("CODIGOSECAO") ? row.get("CODIGOSECAO") : "";
				var SECAO = row.has("SECAO") ? row.get("SECAO") : "";
				var FUNCAO = row.has("FUNCAO") ? row.get("FUNCAO") : "";
				var EMAIL = row.has("EMAIL") ? row.get("EMAIL") : "";
				var SALARIO = row.has("SALARIO") ? row.get("SALARIO") : "";
				var HORARIO = row.has("HORARIO") ? row.get("HORARIO") : ""; 
				
				DATASET.addRow(new Array(CODCOLIGADA, CHAPA, NOME, CPF, DTNASCIMENTO, ESTADOCIVIL, SEXO, NACIONALIDADE, TITULOELEITOR, CODIGOSECAO,
						SECAO, EMAIL, FUNCAO,SALARIO,HORARIO));

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