function defineStructure() {}
function onSync(lastSyncDate) {}

function createDataset(fields, constraints, sortFields) {

	var query = "SELECT * FROM FLUIG.DBO.FLUIG_PARAMETROS_PERCENTUAIS"

    var c1  = DatasetFactory.createConstraint('SQL', query, query, ConstraintType.MUST);
    var dts = DatasetFactory.getDataset('ds_buscaDB', null, [c1], null);

   	var obj  = new Array();

    var PRIMPARCELA  = dts.getValue(0, "PRIMPARCELA");  // valor da PRIMEIRA PARCELA
    var SEGPARCELA   = dts.getValue(0, "SEGPARCELA");   // valor da SEGUNDA PARCELA
    var PARCELAUNICA = dts.getValue(0, "PARCELAUNICA"); // valor da PARCELA UNICA
    var DEMANDAMIN   = dts.getValue(0, "DEMANDAMIN");   // valor da DEMANDA MINIMA
    var DEMANDAMAX   = dts.getValue(0, "DEMANDAMAX");   // valor da DEMANDA MAXIMA

	var dataset = DatasetBuilder.newDataset();
    	dataset.addColumn("PRIMPARCELA");
    	dataset.addColumn("SEGPARCELA");
    	dataset.addColumn("PARCELAUNICA");
    	dataset.addColumn("DEMANDAMIN");
    	dataset.addColumn("DEMANDAMAX");

    dataset.addRow([PRIMPARCELA, SEGPARCELA, PARCELAUNICA, DEMANDAMIN, DEMANDAMAX]);

    return dataset;
}
function onMobileSync(user) {}

function findConstraint(fieldName, constraints, defaultValue) {
	if (constraints != null) {
		for (var i=0; i<constraints.length; i++){
			log.info("***CONSTRAN : " + constraints[i].fieldName );
			log.info("***CONSTRAN2 : " + constraints[i].initialValue);
			if (constraints[i].fieldName == fieldName){
				return constraints[i].initialValue;
			}
		}
	}
	return defaultValue;
}