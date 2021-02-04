function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {

	//chamada da constraint para zoom
	var idEstab = findConstraint("idEstab",constraints,"");	

		log.info("============= Dataset Integração Combio ========== (Inicio)");

		
		log.info("valor do estabelecimento = " + idEstab);
		
		try {
	      // Utiliza o ServiceManager para obter uma referencia ao servico.
	      var serviceProvider = ServiceManager.getService('WSEXECBO');
	      var serviceLocator  = serviceProvider.instantiate('com.totvs.framework.ws.execbo.service.WebServiceExecBO');
	      var service = serviceLocator.getWebServiceExecBOPort();
	             
	      // Prepara os parametros da procedure a ser chamada no Progress

	      log.info("valor dentro do TRY = " + idEstab);
	
	      var param = [{"name":"pcCodEstabel", 
	      				"dataType":"character",
	      				"type":"input",
	      				"value":""+idEstab 
	      			},{
	      				"name":"ttItemSaldo",
  				        "type":"output",
					    "dataType":"temptable",
  				        "value":{
  				         		 "name":"ttItemSaldo",
   			             		 "fields":[{
   			             		 			"name":"itCodigo",
   			             		 			"label":"Codigo",
   			             		 			"type":"character"
   			             		 		},{
   			             		 			"name":"descItem",
   			             		 			"label":"Descricao",
   			             		 			"type":"character"
   			             		 		},{
   			             		 			"name":"qtidadeAtu",
   			             		 			"label":"Qtidade",
   			             		 			"type":"decimal"
   			             		 		}],
           "records":[]
          }
}]

			// var param = [
			// 				{
			// 					"name":"ttEquipe",
  	// 			      	  		"type":"output",
			// 		 			"dataType":"temptable",
  	// 			      			"value":{"name":"ttEquipe",
			// 		   			          "fields":
			// 		   			          [
			// 		   			          			{"name":"cd-equipe"        ,"label":"Codigo","type":"character"},
			// 		   			          		    {"name":"desc-equipe"     ,"label":"Descricao","type":"character"},
			// 		   			          		    {"name":"resp-equipe"     ,"label":"Responsavel","type":"character"}],
			// 		           				"records":[]
   //        								}		
			// 				}
			// 			]
	  
	      var jsonParams = JSON.stringify(param);
	      log.info("========= Parametros da procedure:");
	      log.info(jsonParams);
	  	

	      // Faz login e recebe o token de autenticacao
	      var token = service.userLogin("super");
	      log.info("========= TOKEN: " + token);
	  
	      // Chama a procedure passando os parametros e o token de autenticacao.
	      var resp = service.callProcedureWithToken(token, "esdkp/esdkp0001.p", "GetItemSaldo", jsonParams);
	  
	      // Converte o resultado para um objeto
	      var respObj = JSON.parse(resp);
	      var retornoJSON = JSON.parse(respObj[0].value);
	  
	      //CRIA AS COLUNAS DO DATASET
	      var dataset = DatasetBuilder.newDataset();
	      dataset.addColumn("Código");
	      dataset.addColumn("Descrição");
	      dataset.addColumn("Quantidade Atual");
	      

	      //ITERA O OBJ PARA PEGAR O VALORES
	      for (var i in retornoJSON.records){
	      	log.info("======= dentro do foreach")
	      	log.info(retornoJSON.records[i].nome);

	      	 var cod = retornoJSON.records[i].itCodigo;
	      	 var desc = retornoJSON.records[i].descItem;
	      	 var qtd = retornoJSON.records[i].qtidadeAtu;
	      	
	      	
	      	//ADICIONA OS VALORES PARA LINHAS
	      	//dataset.addRow(new Array(nome, cod, cod));
	      	dataset.addRow(new Array(cod,desc,qtd));
	      }
	 
	   } catch (error) {
	      log.error(error.message);
	   }

	   return dataset;
	   log.info("============= Dataset Integração Combio ========== (FIM)");
	
}

function findConstraint(fieldName, constraints, defaultValue) {
	 if (constraints != null) {
	  
	  for (var i=0; i<constraints.length; i++){
	   log.info("***CONSTRAN : " + constraints[i].fieldName );
	   log.info("***CONSTRAN2 : " + constraints[i].initialValue);
	   if (constraints[i].fieldName == fieldName){
	    return constraints[i].initialValue;
	   }
	  }
	 }
	 return defaultValue;
	}

function onMobileSync(user) {

}
