function createDataset(fields, constraints, sortFields) {
	try {
		return processResult(callService(fields, constraints, sortFields));
	} catch(e) {
		return processErrorResult(e, constraints);
	}
}

function callService(fields, constraints, sortFields) {
	var serviceData = data();
	var params = serviceData.inputValues;

	verifyConstraints(serviceData.inputValues, constraints);

	var serviceHelper = ServiceManager.getService(serviceData.fluigService);
	var serviceLocator = serviceHelper.instantiate(serviceData.locatorClass);
	var service = serviceLocator.getCFGTABLESOAP();
	var response = service.gettable(params.usercode, params.alias, 
		params.queryaddwhere, params.branch, 
		params.listfieldsview);

	return response;
}

function defineStructure() {
		addColumn("CPF");
		addColumn("Cod_Reembolsado");
		addColumn("Cod_Loja");
		addColumn("Nome");
		addColumn("Banco");
		addColumn("Agencia");
		addColumn("Conta");
		addColumn("Num_Conta");
	
}

function onSync(lastSyncDate) {
	var serviceData = data();
	var synchronizedDataset = DatasetBuilder.newDataset();

	try {
		var resultDataset = processResult(callService());
		if (resultDataset != null) {
			var values = resultDataset.getValues();
			for (var i = 0; i < values.length; i++) {
				synchronizedDataset.addRow(values[i]);
			}
		}

	} catch(e) {
		log.info('Dataset synchronization error : ' + e.message);

	}
	return synchronizedDataset;
}

function verifyConstraints(params, constraints) {
	if (constraints != null) {
		for (var i = 0; i < constraints.length; i++) {
			try {
				params[constraints[i].fieldName] = JSON.parse(constraints[i].initialValue);
			} catch(e) {
				params[constraints[i].fieldName] = constraints[i].initialValue;
			}
		}
	}
}

function processResult(result) {
	var dataset = DatasetBuilder.newDataset();

	result = result.getTABLEDATA().getFIELDVIEW();

		
		dataset.addColumn("CPF");
		dataset.addColumn("Cod_Reembolsado");
		dataset.addColumn("Cod_Loja");
		dataset.addColumn("Nome");
		dataset.addColumn("Banco");
		dataset.addColumn("Agencia");
		dataset.addColumn("Conta");
		dataset.addColumn("Num_Conta");
	

	for (var i = 0; i < result.size(); i++) {
		dataset.addRow([result.get(i).getFLDTAG().getSTRING().get(0),result.get(i).getFLDTAG().getSTRING().get(1),result.get(i).getFLDTAG().getSTRING().get(2),result.get(i).getFLDTAG().getSTRING().get(3),result.get(i).getFLDTAG().getSTRING().get(4),result.get(i).getFLDTAG().getSTRING().get(5),result.get(i).getFLDTAG().getSTRING().get(6),result.get(i).getFLDTAG().getSTRING().get(7)]);
	}

	return dataset;
}

function processErrorResult(error, constraints) {
	var dataset = DatasetBuilder.newDataset();

	var params = data().inputValues;
verifyConstraints(params, constraints);

dataset.addColumn('error');
	dataset.addColumn('listfieldsview');
	dataset.addColumn('alias');
	dataset.addColumn('usercode');
	dataset.addColumn('branch');
	dataset.addColumn('queryaddwhere');

	var listfieldsview = isPrimitive(params.listfieldsview) ? params.listfieldsview : JSONUtil.toJSON(params.listfieldsview);
	var alias = isPrimitive(params.alias) ? params.alias : JSONUtil.toJSON(params.alias);
	var usercode = isPrimitive(params.usercode) ? params.usercode : JSONUtil.toJSON(params.usercode);
	var branch = isPrimitive(params.branch) ? params.branch : JSONUtil.toJSON(params.branch);
	var queryaddwhere = isPrimitive(params.queryaddwhere) ? params.queryaddwhere : JSONUtil.toJSON(params.queryaddwhere);

	dataset.addRow([error.message, listfieldsview, alias, usercode, branch, queryaddwhere]);
	dataset.values.sort();
	return dataset;
}

function getParamValue(param, assignment) {
	if (assignment == 'VARIABLE') {
		return getValue(param);
	} else if (assignment == 'NULL') {
		return null;
	}
	return param;
}

function isPrimitive(value) {
	return ((typeof value === 'string') || value.substring !== undefined) || typeof value === 'number' || typeof value === 'boolean' || typeof value === 'undefined';
}


function getObjectFactory(serviceHelper) {
	var objectFactory = serviceHelper.instantiate("br.com.microsiga.webservices.cfgtable_apw.ObjectFactory");

	return objectFactory;
}



function data() {
	return {
  "fluigService" : "CFGTABLE",
  "operation" : "gettable",
  "soapService" : "CFGTABLE",
  "portType" : "CFGTABLESOAP",
  "locatorClass" : "br.com.microsiga.webservices.cfgtable_apw.CFGTABLE",
  "portTypeMethod" : "getCFGTABLESOAP",
  "parameters" : [ ],
  "inputValues" : {
    "listfieldsview" : "A2_CGC,A2_COD,A2_LOJA,A2_NOME,A2_BANCO,A2_AGENCIA,A2_CONTA,A2_NUMCON",
    "alias" : "SA2",
    "usercode" : "MSALPHA",
    "branch" : null,
    "queryaddwhere" : "A2_XCOLAB = '1'"
  },
  "inputAssignments" : {
    "listfieldsview" : "VALUE",
    "alias" : "VALUE",
    "usercode" : "VALUE",
    "branch" : "NULL",
    "queryaddwhere" : "VALUE"
  },
  "outputValues" : {
    "tABLESTRUCT" : [ ],
    "tABLEDATA" : [ ]
  },
  "outputAssignments" : {
    "tABLESTRUCT" : [ ],
    "tABLEDATA" : [ ]
  },
  "extraParams" : {
    "enabled" : false
  }
}
}