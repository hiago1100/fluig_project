function servicetask29(attempt, message) {
	try {
		var serviceProvider = ServiceManager.getService('WSEXECBO');
		var serviceLocator = serviceProvider.instantiate('com.totvs.framework.ws.execbo.service.WebServiceExecBO');
		var service = serviceLocator.getWebServiceExecBOPort();

		var token = service.userLogin("super");
		log.info('>>> servicetask15 token: ' + token);

		var params = [];    
		
		var param1 = [
			'cod_usuario',
			'cod_grp_usuar',
			'acao',
		];

		var fields = createFields(param1);		
		
		log.info('>>> indices Inicio ');
		var indices = getChildrenIndexes('GRUPOCOD');
		var records = [];
		
		log.info('>>> indices: ' + indices);
		for (var i = 0; i < indices.length; i++) {
			var j = 1 + 1;

			log.info('@@@ idusuario: ' + hAPI.getCardValue('idUsuario'));
			log.info('@@@ GrupoCod: ' + hAPI.getCardValue('grupoCod___' + indices[i]));
			log.info('@@@ Manter: ' + hAPI.getCardValue('manterGrupo___' + indices[i]));
			
			records[i] = {};
			records[i]['cod_usuario'] = '"' + hAPI.getCardValue('idUsuario') + '"';
			records[i]['cod_grp_usuar'] = '"' + hAPI.getCardValue('grupoCod___'+indices[i]) + '"';
			records[i]['acao'] = (hAPI.getCardValue('manterGrupo___'+indices[i]) == 'on') ? 'INC' : 'ESC' ;
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

		var jsonParams = JSON.stringify(params).replace( /[\\]["]/g, '' );
		log.info('>>> Parametros da procedure: ' + jsonParams);
		    
		var resp = service.callProcedureWithToken(token, "esp/essec005b.p", "piGrupoUsuario", jsonParams);
		log.info('### resp: ' + resp);

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
	
//	log.info('@@@ getChildrenIndexes(fieldName): ' + fieldName);
	
	var dados = hAPI.getCardData(getValue("WKNumProces"));
	var entries = dados.entrySet().iterator();
	var indexes = [];

	while (entries.hasNext()) {
		var e = entries.next();
//		log.info('>>> fieldName : ' + fieldName);
//		log.info('>>> e.getKey(): ' + e.getKey());
		if (e.getKey().match(fieldName + "___")) {
//		if (e.getKey().startWith(fieldName + "___")) {
//			log.info('@@@ getChildrenIndexes indice: ' + e.getKey().split("___")[1]);
			indexes.push(e.getKey().split("___")[1])
		}
	}
	return indexes;
};
