var convertDatePTtoUS = function(data)
{	
	if (!data)
	{
		return data;
	}

	var dt = data.slice(0, 10).split('/');

	return dt[2] + '-' + dt[1] + '-' + dt[0];
}

var getDate = function () 
{
    var data = new Date();
    var dia = data.getDate();
    var mes = (data.getMonth() + 1);
    var ano = data.getFullYear();

    return dia + "/" + mes + "/" + ano;
}

function retornaDescricaoProcesso(codProcesso) 
{
	log.warn('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
	log.warn('retornaDescricaoProcesso - ' + codProcesso);
	log.warn('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');

	var dataset;
	var childs = [];
	var fields = ['processDescription'];

	var c1 = DatasetFactory.createConstraint('processDefinitionPK.processId', codProcesso, codProcesso, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("userSecurityId", "adm", "adm", ConstraintType.MUST);

	dados = DatasetFactory.getDataset("processDefinition", fields, [c1, c2], null);

	if (dados == null && dados.rowsCount == 0) 
	{
		throw "FALHA AO BUSCAR OS USUARIOS DE INTEGRAÇÃO.";
	}

	return dados.getValue(0, "processDescription");
}

function BuscaUsuarioIntegracaoRM()
{
	var c = DatasetFactory.createConstraint("userSecurityId", "adm", "adm", ConstraintType.MUST);
	var constraints = new Array(c);
	var dados =  DatasetFactory.getDataset('DS_FLUIG_1000', ['SP_USUARIO_INTEGRACAO','RM'], constraints, null);
	
	if(dados==null && dados.rowsCount==0)
	{
        throw  "FALHA AO BUSCAR O CATALOGO DE SERVIÇO." ;
    }
	
	return dados;	
}