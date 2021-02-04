function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
  
  // PRINCIPAL 
  var tipo         = findConstraint("tipo",constraints,""); 

  var grupoAux     = findConstraint("cod_grupo",constraints,""); 
  var idPrograma   = findConstraint("idPrograma",constraints,"");

  var nomeGrupo    = findConstraint("nomeGrupo",constraints,"");
  var gestorGrupo  = findConstraint("gestorGrupo",constraints,"");
  var codPrograma  = findConstraint("codPrograma",constraints,"");
  var codGrupoPk   = findConstraint("codGrupoPk",constraints,"");
  var idProgPk     = findConstraint("idProgPk",constraints,"");

  var dbInstancia = 2;

    
  switch(dbInstancia){
  case 1:
  if(tipo == "DELETE"){
    var SQL =  "DELETE FROM z_sga_grupo_programa WHERE idGrupo = "+grupoAux+" and idPrograma = "+idPrograma+" " ;    
  }
  if(tipo == "INSERT"){
        var SQL = "INSERT INTO z_sga_grupo_programa (cod_grupo, nome_grupo, gestor, cod_programa,idGrupo,idPrograma) VALUES ('"+grupoAux+"','"+nomeGrupo+"','"+gestorGrupo+"','"+codPrograma+"','"+codGrupoPk+"','"+idProgPk+"')";
  }
    break;
  case 2:
  if(tipo == "DELETE"){
    var SQL =  "DELETE FROM z_sga_grupo_programa WHERE idGrupo = "+grupoAux+" and idPrograma = "+idPrograma+" " ;    
  }
  if(tipo == "INSERT"){
        var SQL = "INSERT INTO z_sga_grupo_programa (cod_grupo, nome_grupo, gestor, cod_programa,idGrupo,idPrograma) VALUES ('"+grupoAux+"','"+nomeGrupo+"','"+gestorGrupo+"','"+codPrograma+"','"+codGrupoPk+"','"+idProgPk+"')";
  }
    break;
  case 3:
  if(tipo == "DELETE"){
    var SQL =  "DELETE FROM z_sga_grupo_programa WHERE idGrupo = "+grupoAux+" and idPrograma = "+idPrograma+" " ;    
  }
  if(tipo == "INSERT"){
        var SQL = "INSERT INTO z_sga_grupo_programa (cod_grupo, nome_grupo, gestor, cod_programa,idGrupo,idPrograma) VALUES ('"+grupoAux+"','"+nomeGrupo+"','"+gestorGrupo+"','"+codPrograma+"','"+codGrupoPk+"','"+idProgPk+"')";
  }
     break;
    default:
    break;
  }
  
    log.info("@@@ QUERY MYSQL" + SQL);
  
  
  var c1 = DatasetFactory.createConstraint("SQL", SQL, SQL, ConstraintType.MUST);    
  var dataset = DatasetFactory.getDataset("executaDB", null, [c1], null);
  
  return dataset;
  
}



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

function onMobileSync(user) {

}