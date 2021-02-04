function callDatasul(metodo, json, usuario) {
	
    var serviceProvider = ServiceManager.getService('WSEXECBO');
    var serviceLocator = serviceProvider.instantiate('com.totvs.framework.ws.execbo.service.WebServiceExecBO');
    var service = serviceLocator.getWebServiceExecBOPort();
    var tenantId = 1;
    var programa = "Especificos/fluig/" + metodo + ".p";
    
    usuario = usuario || 'super';

    var input = {
        "dsInput": json
    };

    var params = [{
        dataType: "longchar",
        name: "wsInput",
        value: JSON.stringify(input),
        type: "input"
    }, {
        dataType: "longchar",
        name: "wsOutput",
        type: "output"
    }];

    var jsonParams = JSON.stringify(params);

    var token = service.userLogin(usuario);
    var resp = service.callProcedureWithTokenAndCompany(token, tenantId, programa, metodo, jsonParams);
    log.info('tenantID: ' + tenantId );
    log.info('jsonParams: ' + jsonParams);
    
    
    // Converte o resultado para um objeto
    
    var respObj = JSON.parse(resp);
    var value;
    log.info('respObjs: ' + respObj);
    if (respObj[0].value != '') {
        var value = JSON.parse(respObj[0].value);
    } else {
        return {
            "ttErro": [{
                "mensagem": "Ocorreu um erro ao realizar a integração com o ERP"
            }]
        };
    }


    return value.dsOutput;
}