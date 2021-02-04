function createDataset(fields, constraints, sortFields) {
	try {
		return processResult(callService(fields, constraints, sortFields));
	} catch (e) {
		return processErrorResult(e, constraints);
	}
}

function callService(fields, constraints, sortFields) {
	var serviceData = data();
	var params = serviceData.inputValues;

	
	verifyConstraints(serviceData.inputValues, constraints);
	var serviceHelper = ServiceManager.getService(serviceData.fluigService);
	var serviceLocator = serviceHelper.instantiate(serviceData.locatorClass);
	var service = serviceLocator.getWSMFIN01SOAP();

	log.info("### callService")
	log.info("### constraints")
	log.dir(constraints)


	if(constraints != null){
		for (var i = 0; i < constraints.length; i++){

			if(constraints[i]["fieldName"] == "codCusto"){

			params.ovettit.cODCC = constraints[i]["finalValue"];
			}

			else if(constraints[i]["fieldName"] == "numSolic"){

				log.info("===dentro do if======")
				params.ovettit.nUMTIT = constraints[i]["finalValue"];
	
			}else if(constraints[i]["fieldName"] == "cpf"){
	
				log.info("===dentro do if 2 ======")
				params.ovettit.cPF = constraints[i]["finalValue"];
	
			}else if(constraints[i]["fieldName"] == "pa"){
	
				params.ovettit.uTCOMP = constraints[i]["finalValue"];
	
			}else if(constraints[i]["fieldName"] == "valor"){
	
				params.ovettit.vALOR = constraints[i]["finalValue"];

			}

			

			if(constraints[i]["fieldName"] == "codTipo_valorTit"){

				log.info("===codTipo_valorTit===")

				var codTipo = String(constraints[i]["initialValue"]).split(",");
				var valorTit = String(constraints[i]["finalValue"]).split(",");
				
				var arr = []

				for (var j in codTipo) {
					
					arr[j] = ({

						"nATUREZ": codTipo[j] ,
						"vALOR": valorTit[j]
					})
				}
				
				params.ovetcomp.aDADOS = arr
			}
		}
	}	

	log.dir(params);
	
	var response = service.mfininc(fillWSMFIN01VETTIT(serviceHelper, params.ovettit), fillWSMFIN01VETCOMP01(serviceHelper, params.ovetcomp));

	return response;

}

function defineStructure() {
	addColumn("mENSAGEM");
	log.info("funcao define estrutura");
}

function onSync(lastSyncDate) {
	log.info("funcao onSync");
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

	} catch (e) {
		log.info('Dataset synchronization error : ' + e.message);

	}
	return synchronizedDataset;
}

function verifyConstraints(params, constraints) {
	log.info("funcao verifica constraints");
	if (constraints != null) {
		for (var i = 0; i < constraints.length; i++) {
			try {
				params[constraints[i].fieldName] = JSON.parse(constraints[i].initialValue);
			} catch (e) {
				params[constraints[i].fieldName] = constraints[i].initialValue;
			}
		}
	}
}

function processResult(result) {
	log.info("funcao processa resultado");
	var dataset = DatasetBuilder.newDataset();

	dataset.addColumn("mENSAGEM");

	dataset.addRow([result.getMENSAGEM()]);
	log.info("dataset");
	log.dir(dataset);

	return dataset;
}

function processErrorResult(error, constraints) {
	log.info("processa erro");
	var dataset = DatasetBuilder.newDataset();

	var params = data().inputValues;
	verifyConstraints(params, constraints);

	dataset.addColumn('error');
	dataset.addColumn('ovetcomp');
	dataset.addColumn('ovettit');

	var ovetcomp = isPrimitive(params.ovetcomp) ? params.ovetcomp : JSONUtil.toJSON(params.ovetcomp);
	var ovettit = isPrimitive(params.ovettit) ? params.ovettit : JSONUtil.toJSON(params.ovettit);

	dataset.addRow([error.message, ovetcomp, ovettit]);

	return dataset;
}

function getParamValue(param, assignment) {
	log.info("funcao getParamValue");
	if (assignment == 'VARIABLE') {
		return getValue(param);
	} else if (assignment == 'NULL') {
		return null;
	}
	return param;
}

function isPrimitive(value) {
	log.info("funcao isPrimitive");
	return ((typeof value === 'string') || value.substring !== undefined) || typeof value === 'number' || typeof value === 'boolean' || typeof value === 'undefined';
}

function fillWSMFIN01VETTIT(serviceHelper, params) {
	log.info("funcao fillWSMFIN01VETTIT");
	if (params == null) {
		return null;
	}

	var result = serviceHelper.instantiate("_17._9._168._192._8192.WSMFIN01VETTIT");

	if (params.cODCC) { result.setCODCC(params.cODCC); }
	if (params.cPF) { result.setCPF(params.cPF); }
	if (params.nUMTIT) { result.setNUMTIT(params.nUMTIT); }
	if (params.uTCOMP) { result.setUTCOMP(params.uTCOMP); }
	if (params.vALOR) { result.setVALOR(params.vALOR); }
	

	return result;
}

function fillWSMFIN01VETCOMP(serviceHelper, params) {
	log.info("funcao fillWSMFIN01VETCOMP ")
	if (params == null) {
		return null;
	}

	var result = serviceHelper.instantiate("_17._9._168._192._8192.WSMFIN01VETCOMP");

	if (params.nATUREZ) { result.setNATUREZ(params.nATUREZ); }
	if (params.vALOR) { result.setVALOR(params.vALOR); }

	return result;
}

function fillARRAYOFWSMFIN01VETCOMP(serviceHelper, params) {
	log.info("funcao fillARRAYOFWSMFIN01VETCOMP");
	if (params == null) {
		return null;
	}

	var result = serviceHelper.instantiate("_17._9._168._192._8192.ARRAYOFWSMFIN01VETCOMP");

	for (var i = 0; i < params.length; i++) {
		result.getWSMFIN01VETCOMP().add(fillWSMFIN01VETCOMP(serviceHelper, params[i]));
	}

	return result;
}

function fillWSMFIN01VETCOMP01(serviceHelper, params) {
	log.info("funcao fillWSMFIN01VETCOMP01");
	if (params == null) {
		return null;
	}

	var result = serviceHelper.instantiate("_17._9._168._192._8192.WSMFIN01VETCOMP01");

	result.setADADOS(fillARRAYOFWSMFIN01VETCOMP(serviceHelper, params.aDADOS));

	return result;
}

function getObjectFactory(serviceHelper) {
	log.info("getObjectFactory");
	var objectFactory = serviceHelper.instantiate("_17._9._168._192._8192.ObjectFactory");

	return objectFactory;
}

function data() {
	return {
		"fluigService": "integraTitulo",
		"operation": "mfininc",
		"soapService": "WSMFIN01",
		"portType": "WSMFIN01SOAP",
		"locatorClass": "_17._9._168._192._8192.WSMFIN01",
		"portTypeMethod": "getWSMFIN01SOAP",
		"parameters": [],
		"inputValues": {
			"ovetcomp": {
				// "aDADOS": [
				// 	{
				// 		"nATUREZ": "",
				// 		"vALOR": ""
				// 	}
				// ]
			},
			"ovettit": {
				"cODCC": "",
				"cPF": "",
				"nUMTIT": "",
				"uTCOMP": "",
				"vALOR": ""
				
			}
		},
		"inputAssignments": {
			"ovetcomp": {
				"aDADOS": [{
					"nATUREZ": "VALUE",
					"vALOR": "VALUE"
				}]
			},
			"ovettit": {
				"cODCC": "VALUE",
				"cPF": "VALUE",
				"nUMTIT": "VALUE",
				"uTCOMP": "VALUE",
				"vALOR": "VALUE"
				
			}
		},
		"outputValues": {
			"mENSAGEM": ""
		},
		"outputAssignments": {
			"mENSAGEM": "VALUE"
		},
		"extraParams": {
			"enabled": false
		}
	}
}