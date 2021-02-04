function defineStructure() {
    addColumn("CLASSNAME");
	addColumn("CCODIGO");
	addColumn("CCPF");
	addColumn("CNOME");
        
    setKey([ "CCPF"]);
    addIndex([ "CCPF" ]);
}
function onSync(lastSyncDate) {
	var dataset = DatasetBuilder.newDataset();
	//dataset = clearDataset(dataset);
	dataset = criaDataset(dataset, "");	
	return dataset;
}
function createDataset(fields, constraints, sortFields) {
	var param = setParams(constraints); 
	var dataset = DatasetBuilder.newDataset();				
	dataset = criaDataset(dataset, "");	
	return dataset;
}
function onMobileSync(user) {
	
	var sortingFields = [];
	var fields = [
		"CLASSNAME",
		"CCODIGO",
		"CCPF",
		"CNOME"
	];
	var constraints = [];
	var result = {
		'fields': fields,
		'constraints': constraints,
		'sortingFields': sortingFields
	};
	return result;
}

// ================================================================

function criaDataset(dataset, param){
    dataset.addColumn("CLASSNAME");
	dataset.addColumn("CCODIGO");
	dataset.addColumn("CCPF");
    dataset.addColumn("CNOME");
    
    dataset = chamaApi(dataset, param);
    // dataset = criaLinhas(json, "GESTORES", dataset);

    return dataset;
}


function chamaApi(dataset,  param) {

	var endpoint =  "gestores";
	
	if(param != ""){
		endpoint + "?" + param;
	}
        
    try{
		var clientService = fluigAPI.getAuthorizeClientService();
		var dados = {
			companyId : getValue("WKCompany") + '',
			serviceCode: 'RESTPROTHEUS',
			endpoint: endpoint,
			method: 'get',
		}
		
		var vo = clientService.invoke(JSON.stringify(dados));		
		if(vo.getResult() == null || vo.getResult().isEmpty()){
            dataset.addRow(new Array("Retorno está vazio"));            
		}else{
			var json = JSON.parse(vo.getResult());			
			for(var i=0; i < json["GESTORES"].length; i++){
				var col = [];
				col.push(json["GESTORES"][i]["_classname"]);
				col.push(json["GESTORES"][i]["CCODIGO"]);
				col.push(json["GESTORES"][i]["CCPF"]);
				col.push(json["GESTORES"][i]["CNOME"]);				
				dataset.addOrUpdateRow(col);
			}
        }
        
	}catch(err){
        err = err.toString();
		dataset.addRow(new Array(err));
    }
    
    return dataset;
}


var setParams = function (constraints){
	var str = "";
	
	if(Array.isArray(constraints)){
	  for (var i = 0; i < constraints.length; i++) {
		
		if(str.trim() != ""){
		str += " & ";
		}
		str +=  constraints[i].fieldName + "=" + constraints[i].initialValue.toString().trim();		
	  }
	} 

	return str;			
}
  

var clearDataset = function(newDataset){
	
	var dataset = DatasetFactory.getDataset('ds_consultaAprovadoresDeCredito', null, null, null);
	if(dataset != null && dataset.rowsCount > 0){ //se o dataset tem registros 
		for(var i=0; i < dataset.getRowsCount(); i++) {   	
			var col = [];
			col.push(dataset.getValue(i, "_classname"));
			col.push(dataset.getValue(i, "CCODIGO"));
			col.push(dataset.getValue(i, "CCPF"));
			col.push(dataset.getValue(i, "CNOME"));				
			newDataset.deleteRow(col);						
		}
	}

	return newDataset;
}