function defineStructure() {
    addColumn("CODIGO");
	addColumn("DESCRICAO");
}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
    
    var param = '';

    if(constraints != null){
		for (var i = 0; i < constraints.length; i++) {
			if (constraints[i].fieldName == "CODIGO") {
				param = constraints[i].initialValue;
			}
		}
    }

    if(param != ''){
        var dataset = DatasetBuilder.newDataset();

	    try{
	    	var clientService = fluigAPI.getAuthorizeClientService();
	    	var dados = {
	    		companyId : getValue("WKCompany") + '',
	    		serviceCode: 'RESTPROTHEUS',
	    		endpoint: 'produtos?produto='+param,
	    		method: 'get',
			}

			var vo = clientService.invoke(JSON.stringify(dados));
		
			dataset.addColumn("CODIGO");
	    	dataset.addColumn("DESCRICAO");
			
			if(vo.getResult() == null || vo.getResult().isEmpty()){
	    		dataset.addRow(new Array(null, null));
	    	}else{
	    		var json = JSON.parse(vo.getResult());

	    		for(var i=0; i < json.PRODUTOS.length; i++){
	    			dataset.addRow(new Array(json.PRODUTOS[i].CODIGO, json.PRODUTOS[i].VALOR));
	    		}
	    	}
	    }catch(err){
	    	throw new Exception(err);
        }
        
        return dataset;
    }else{
        var dataset = DatasetBuilder.newDataset();

        dataset.addColumn("CODIGO");
        dataset.addColumn("DESCRICAO");
                
        dataset.addRow(new Array(null, null));
        
        return dataset;
    }
}
function onMobileSync(user) {

}