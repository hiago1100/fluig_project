function servicetask17(attempt, message) {

	try {
		var serviceProvider = ServiceManager.getService('WSEXECBO');
		var serviceLocator = serviceProvider.instantiate('com.totvs.framework.ws.execbo.service.WebServiceExecBO');
		var service = serviceLocator.getWebServiceExecBOPort();
		var bloqueio = hAPI.getCardValue("bloquear");

		var token = service.userLogin("super");
		log.info('>>> servicetask17 token: ' + token);

		var params = [] ;
		var jsonParams;

		  if(bloqueio == "on"){

			      // Prepara os parametros da procedure a ser chamada no Progress
			      var param1 = {} ;
			      param1.dataType = "character";
			      param1.name = "c_usuario";
			      param1.value = '"' + hAPI.getCardValue("idUsuario")+ '"' ;
			      param1.type = "input";
			      params[0] = param1;
			  
			      var param2 = {};
			      param2.dataType = "character";
			      param2.name = "retorno";
			      param2.value = "";
			      param2.type = "output";
			      params[1] = param2;
			
			jsonParams = JSON.stringify(params).replace( /[\\]["]/g, '' );
			  
		} else {

			var param1 = [
				'cod_usuario',
				'cod_grp_usuar',
				'acao',
				];

			var fields = createFields(param1);		

			log.info('>>> indices Inicio ');
			var indices = getChildrenIndexes('MANTER');
			var records = [];

			log.info('>>> indices: ' + indices);
			for (var i = 0; i < indices.length; i++) {
				var j = 1 + 1;

				log.info('@@@ idusuario: ' + hAPI.getCardValue('idUsuario'));
				log.info('@@@ GrupoCod: ' + hAPI.getCardValue('nomedoseugrupo___' + indices[i]));
				log.info('@@@ Manter: ' + hAPI.getCardValue('manter___' + indices[i]));

				records[i] = {};
				records[i]['cod_usuario'] = '"' + hAPI.getCardValue('idUsuario') + '"';
				records[i]['cod_grp_usuar'] = '"' + hAPI.getCardValue('nomedoseugrupo___'+indices[i]) + '"';
				records[i]['acao'] = (hAPI.getCardValue('manter___'+indices[i]) == 'on') ? 'INC' : 'ESC' ;
			}

			var temptable = {
					'name': "ttGrupoUsuario", 
					'fields': fields,
					'records': records			      
			};

			var retorno = {
					'dataType': 'character',
					'name': 'retorno',
					'value': '',
					'type': 'output'
			};

			var capa = {
					'name': 'ttGrupoUsuario',
					'type': 'input',
					'dataType': 'temptable',
					'value': temptable
			};

			params.push(capa, retorno);
			
			jsonParams = JSON.stringify(params).replace( /[\\]["]/g, '' );

		}


//		var jsonParams = JSON.stringify(params).replace( /[\\]["]/g, '' );
		
		log.info('>>> Parametros da procedure: ' + jsonParams);

		if(bloqueio == "on"){
			var resp = service.callProcedureWithToken(token, "esp/essec005b.p", "piBloqueiaUsuario", jsonParams);
			log.info('### resp: ' + resp);
		}else{
			var resp = service.callProcedureWithToken(token, "esp/essec005b.p", "piGrupoUsuario", jsonParams);
			log.info('### resp: ' + resp);
		}
		
		var respObj = JSON.parse(resp);    
		log.info('??? respObj[0].value: ' + respObj[0].value);

	} catch(error) { 
		log.error(error);
		throw error;
	}
}

function createFields(param){
	var fields = [];

	for(i in param) {
		fields[i] = {};
		fields[i]['name'] = param[i];
		fields[i]['label'] = param[i];
		fields[i]['type'] = 'character';
	}

	return fields;
}

function getChildrenIndexes(fieldName){

	
	log.info('@@@ NUMERO DO PROCESSO : ' + getValue("WKNumProces"));

	var dados = hAPI.getCardData(getValue("WKNumProces"));
	var entries = dados.entrySet().iterator();
	var indexes = [];

	while (entries.hasNext()) {
		var e = entries.next();
		log.info('>>> fieldName : ' + fieldName);
		log.info('>>> e.getKey(): ' + e.getKey());
		if (e.getKey().match(fieldName + "___")) {
//			if (e.getKey().startWith(fieldName + "___")) {
//			log.info('@@@ getChildrenIndexes indice: ' + e.getKey().split("___")[1]);
			indexes.push(e.getKey().split("___")[1])
		}
	}
	return indexes;
};
