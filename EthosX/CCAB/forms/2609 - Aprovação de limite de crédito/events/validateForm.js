function validateForm(form){
    var empresa =  getValue("WKCompany");
    var atv = getValue("WKNumState");

    if (atv == 4 || atv == 0 || atv == 20) {
        var indexes = form.getChildrenIndexes("itensCredito");
        if (indexes.length == 0) {
            throw "Inserir uma aprovação";
        }
    }

    if( (atv == 20)  || (atv == 4 && form.getValue('checkaprov2') != "true" ) || (atv == 0 && form.getValue('checkaprov2') != "true" )){
        var retorno = validateConexion(empresa);
        log.info("############ JSON "+ retorno)    
        if ((retorno.indexOf("erro") ==  -1) || (retorno.indexOf("time") ==  -1))  {}
        else{
            throw "Problema de conexão com o Protheus, verifique sua internet";
        }        
    }
    

    
}

function validateConexion(empresa){

    var clientService = fluigAPI.getAuthorizeClientService();
    var data = {
        companyId : empresa + '',
        serviceCode: 'RESTPROTHEUS',
        endpoint : '/aprovcredito?gestor=000021',
        method : 'get',// 'delete', 'patch', 'put', 'get'     
        timeoutService: '1', // segundos
    };
    var vo = clientService.invoke(JSON.stringify(data));	
    var json = vo.getResult();
    


    return json;

}