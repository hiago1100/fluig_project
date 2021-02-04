function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	
	dataset.addColumn("cod_rep");
	dataset.addColumn("nome");
	dataset.addColumn("nome_ab_reg");
	dataset.addColumn("nome_regiao");
	dataset.addColumn("nome_super");
	dataset.addColumn("desc_equipe");
	dataset.addColumn("id_supervisor");
	dataset.addColumn("supervisor"); //Retorna se o solicitante é supervisor

	log.info("### constraints_repres: " + constraints);
	
	var i_matr_fluig = findConstraint("matr_fluig",constraints,""); 
	//var i_matr_fluig = "rodrigo.baione";
	
	log.info("### VALOR DE i_matr_fluig: |" + i_matr_fluig + "|");
	
	try {
		// Utiliza o ServiceManager para obter uma referencia ao servico.
		var serviceProvider = ServiceManager.getService('WSEXECBO'); // nome DO SERVIÇO QUE FOI CADASTRADO NO FLUIG
		var serviceLocator = serviceProvider.instantiate('com.totvs.framework.ws.execbo.service.WebServiceExecBO');
		var service = serviceLocator.getWebServiceExecBOPort();

		var params = new Array();

		// Prepara os parametros da procedure a ser chamada no Progress
		var param1 = new Object();
		param1.dataType = "character";
		param1.name = "i_matr_fluig";
		param1.value = i_matr_fluig;
		param1.type = "input";
		
		//log.info('### param1.value: |' + param1.value + "|");
		
		var myfields = new Array();
		
		myfields[0] = new Object();
		myfields[0].name = "cod_rep";
		myfields[0].label = "cod_rep";
		myfields[0].type = "character";

		myfields[1] = new Object();
		myfields[1].name = "nome";
		myfields[1].label = "nome";
		myfields[1].type = "character";
		
		myfields[2] = new Object();
		myfields[2].name = "nome_ab_reg";
		myfields[2].label = "nome_ab_reg";
		myfields[2].type = "character";

		myfields[3] = new Object();
		myfields[3].name = "nome_regiao";
		myfields[3].label = "nome_regiao";
		myfields[3].type = "character";
		
		myfields[4] = new Object();
		myfields[4].name = "nome_super";
		myfields[4].label = "nome_super";
		myfields[4].type = "character";
		
		myfields[5] = new Object();
		myfields[5].name = "desc_equipe";
		myfields[5].label = "desc_equipe";
		myfields[5].type = "character";
		
		myfields[6] = new Object();
		myfields[6].name = "supervisor";
		myfields[6].label = "supervisor";
		myfields[6].type = "character";
		
		myfields[7] = new Object();
		myfields[7].name = "nome_regiao";
		myfields[7].label = "nome_regiao";
		myfields[7].type = "character";
		
		var myrecords = new Array();
		
		var myvalue =  { name: "tt-repres",
						  fields: myfields,
						  records: myrecords				
						};		
		
		var temptable = { name: "tt-repres",
						  type: "output",	
						  dataType: "temptable",
						  value: myvalue
						};
		
		params[0] = param1;
		params[1] = temptable;
		
		//log.info("### parte 1");
		
		// Até este ponto (acima) todos objetos criados estão no formado Javascript
		
		//var jsonParams = JSON.stringify(params); // Converte de Javascript para o formato JSON
			
		i_matr_fluig = '"' + i_matr_fluig + '"';
		
		var jsonParams = '[{"dataType":"character","name":"i_matr_fluig","value":' + i_matr_fluig + ',"type":"input"},{"name":"tt-repres","type":"output","dataType":"temptable","value":{"name":"tt-repres","fields":[{"name":"cod_rep","label":"cod_rep","type":"character"},{"name":"nome","label":"nome","type":"character"},{"name":"nome_ab_reg","label":"nome_ab_reg","type":"character"},{"name":"nome_regiao","label":"nome_regiao","type":"character"},{"name":"nome_super","label":"nome_super","type":"character"},{"name":"desc_equipe","label":"desc_equipe","type":"character"},{"name":"id_supervisor","label":"id_supervisor","type":"character"},{"name":"supervisor","label":"supervisor","type":"character"}],"records":[]}}]';
		
		//log.info("### Parametros da procedure:");
		//log.info("### jsonParams: " + jsonParams);

		//log.info("### parte 2");
		
		// Faz login e recebe o token de autenticacao
		var token = service.userLogin("fluig");

		// Chama a procedure passando os parametros e o token de autenticacao.
		var resp = service.callProcedureWithToken(token, "esp/fluig_repres_solicitante.p", "buscaVendedor", jsonParams);

		// Converte o resultado para um objeto
		var respObj = JSON.parse(resp); // Converte de JSON para JavaScript

		// Apresenta o resultado no log.
		//log.info("### " + respObj[0].value);
		
		if (resp){
			var jsonResp = JSON.parse(resp);
			if (jsonResp.length) {
				var arr = JSON.parse(jsonResp[0].value).records;
				for(var i=0; i<arr.length;i++){
					var cod_rep       = arr[i]["cod_rep"];
					var nome          = arr[i]["nome"];
					var nome_ab_reg   = arr[i]["nome_ab_reg"];
					var nome_regiao   = arr[i]["nome_regiao"];
					var nome_super    = arr[i]["nome_super"];
					var desc_equipe   = arr[i]["desc_equipe"];
					var id_supervisor = arr[i]["id_supervisor"];
					var supervisor    = arr[i]["supervisor"];
					dataset.addRow([cod_rep, nome, nome_ab_reg, nome_regiao, nome_super, desc_equipe, id_supervisor, supervisor]);
				}
			}
		}
		
	} catch (error) {
		//log.error(error.message);
		
		dataset.addRow([error.message]);
	}
	
	return dataset;

}function onMobileSync(user) {

}