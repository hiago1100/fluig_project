function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {


 
 var query = "SELECT * FROM FLUIG_MOVTO_LOG ";

	
 var c1 = DatasetFactory.createConstraint('SQL', query, query, ConstraintType.MUST);
 var dtsComissao = DatasetFactory.getDataset('ds_buscaDB', null, [c1], null);

 return dtsComissao;

}

function findConstraint(fieldName,constraints,defaultValue) {
     if (constraints != null) {
      for (var i=0; i<constraints.length; i++){
       if (constraints[i].fieldName == fieldName){
        return constraints[i].initialValue;
       }
      }
     }
     return defaultValue;
}