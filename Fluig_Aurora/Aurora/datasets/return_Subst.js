function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {

	var SQL = "select * from colab_substto;";

	var c1 = DatasetFactory.createConstraint("SQL", SQL, SQL, ConstraintType.MUST);    
	var dataset = DatasetFactory.getDataset("buscaDB", null, [c1], null);

	return dataset;
}
function onMobileSync(user) {

}