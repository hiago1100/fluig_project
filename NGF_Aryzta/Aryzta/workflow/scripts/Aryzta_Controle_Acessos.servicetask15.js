function servicetask15(attempt, message) {
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
		    'cod_prog_dtsul',
		    'operacao',
		    'iLinha',
		    'resultado'
		];
		
		var fields = createFields(param1);
		
		var indices = getChildrenIndexes('codPrograma');
		var records = [];
		
		for (var i = 0; i < indices.length; i++) {
			var j = 1 + 1;
			
			records[i]['cod_usuario'] = '"' + hAPI.getCardValue('codUsuario') + '"';
			records[i]['cod_grp_usuar'] = '"' + hAPI.getCardValue('grupos') + '"';
			records[i]['cod_prog_dtsul'] = '"' + hAPI.getCardValue('codPrograma___'+indices[i]) + '"';
			records[i]['operacao'] = '"' + (hAPI.getCardValue('tipoAcao') == 'inc') ? 'INC' : (hAPI.getCardValue('chBloqueio___'+indices[i]) == 'on') ? 'INC' : 'DEL' + '"';
			records[i]['iLinha'] = '"' + j + '"';
			records[i]['resultado'] = '"true"';
		}
		
		var temptable = {
			'name': "tt_importa", 
			'fields': fields,
			'records': records			      
		};
		
		var retorno = {
			'dataType': 'character',
			'name': 'retorno',
			'type': 'output'
		};
		
		var capa = {
			'dataType': 'temptable',
			'name': 'tt_importa',
			'type': 'input',
			'value': temptable
		};
		
		params.push(capa, retorno);
		
		var jsonParams = JSON.stringify(params).replace( /[\\]["]/g, '' );
        log.info('>>> Parametros da procedure: ' + jsonParams);
        
//        var resp = service.callProcedureWithToken(token, 'esp/essec005.p', 'piPermissoes', jsonParams);
//        log.info('### resp: ' + resp);
//        
//        var respObj = JSON.parse(resp);    
//        log.info('??? respObj[0].value: ' + respObj[0].value);

 } catch(error) { 
	log.error(error);
	throw error;
 }
}