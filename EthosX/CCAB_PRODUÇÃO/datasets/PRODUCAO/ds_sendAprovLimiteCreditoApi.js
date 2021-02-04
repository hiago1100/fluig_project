function defineStructure() {

}

function onSync(lastSyncDate) {

}

function createDataset(fields, constraints, sortFields) {

    var dataset = DatasetBuilder.newDataset();
    var parametroWs = {};
    var result = "";
    var busca = '';
    var vetor = [];
    
    for (var i = 0; i < constraints.length; i++) {	    
	    if(constraints[i].fieldName == 'retorno') {  busca = constraints[i].initialValue; }	    
    }
    
    try {
        
        parametroWs = JSON.parse(busca);

        var clientService = fluigAPI.getAuthorizeClientService();
        var data = {
            'companyId' : getValue("WKCompany") + '',
            'serviceCode': 'RESTPROTHEUS',
			'endpoint': '/aprovcredito',
			'method': 'post',
            'timeoutService': '180',
            'params' : parametroWs
        }
        
        var vo = clientService.invoke(JSON.stringify(data));
        result = vo.getResult();        
        
    } catch (error) {
        result = error;
    }

    dataset.addColumn("retorno");    
    dataset.addRow(new Array(result));
    
    return dataset;

}

function onMobileSync(user) {

}