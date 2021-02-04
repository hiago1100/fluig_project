function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	
	var Query = findConstraint('SQL', constraints);
	
	var newDataset = DatasetBuilder.newDataset();
	var dataSource = "/jdbc/FluigDS";
	var ic = new javax.naming.InitialContext();
	var ds = ic.lookup(dataSource);
	var created = false;
	
	if(!Query){
		log.error("*** ds_executaSQL ERRO: query vazia!");
		return;
	}
	
	try {
		var conn = ds.getConnection();
		var stmt = conn.createStatement();
		var rs   = stmt.executeUpdate(Query);
		newDataset.addColumn("exec");
		newDataset.addRow(["OK"]);
	} catch (e) {
		log.error("*** ds_executaSQL ERRO: " + e.message);
		newDataset.addColumn("exec");
		newDataset.addRow([e.message]);
	} finally {
		if (stmt != null) {
			stmt.close();
		}
		if (conn != null) {
			conn.close();
		}
	}
	return newDataset;
}
function onMobileSync(user) {

}
function findConstraint(fieldName, constraints, defaultValue) {
	if (constraints != null) {
		for (var i=0; i<constraints.length; i++){
			if (constraints[i].fieldName == fieldName){
				return constraints[i].initialValue;
			}
		}
	}
	return defaultValue;
}