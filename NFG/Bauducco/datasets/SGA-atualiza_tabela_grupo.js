function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
  
  // PRINCIPAL 
  var tipo = findConstraint("tipo",constraints,""); 
  //  1' =    grupoAdd    -> codGrupo = OK 
  //  2' =    descGrupo     -> descGrupo = OK
  //  3' =    gestGrupo     -> gestGrupo = OK
  //  4' =    codigoUserErp -> codigoUserErp = OK
  //  5' =    codGrupoERP   -> codGrupoERP  = OK
  //  6' =    codigoUsuario -> codigoUsuario = OK
  
  
  var usuarioAux  = findConstraint("codigoUsuario",constraints,"");
  var grupoAux = findConstraint("codGrupo",constraints,""); 
  var descGrupo  = findConstraint("descGrupo",constraints,"");
  var gestGrupo  = findConstraint("gestGrupo",constraints,"");
  var codigoUserErp  = findConstraint("codigoUserErp",constraints,"");
  var codGrupoERP  = findConstraint("codGrupoERP",constraints,"");  
  var dbInstancia = 2;

  
log.info("@@@ campo 1"+tipo);
log.info("@@@ campo 2"+usuarioAux);
log.info("@@@ campo 3"+grupoAux);
log.info("@@@ campo 4"+descGrupo);
log.info("@@@ campo 5"+gestGrupo);
log.info("@@@ campo 6"+codigoUserErp);
log.info("@@@ campo 7"+codGrupoERP);


  
    
  switch(dbInstancia){
  case 1:
  if(tipo == "DELETE"){
    var SQL =  "DELETE FROM z_sga_grupos WHERE idUsuario = "+usuarioAux+" and idGrupo = "+grupoAux+" " ;    
  }
  if(tipo == "INSERT"){
        var SQL = "INSERT INTO z_sga_grupos (cod_grupo, desc_grupo, gestor, cod_usuario,idGrupo,idUsuario) VALUES ('"+grupoAux+"','"+descGrupo+"','"+gestGrupo+"','"+codigoUserErp+"','"+codGrupoERP+"','"+usuarioAux+"')";
  }
    break;
  case 2:
    if(tipo == "DELETE"){
      var SQL =  "DELETE FROM z_sga_grupos WHERE idUsuario = "+usuarioAux+" and idGrupo = "+grupoAux+" " ;    
    }
    if(tipo == "INSERT"){
      var SQL = "INSERT INTO z_sga_grupos (cod_grupo, desc_grupo, gestor, cod_usuario,idGrupo,idUsuario) VALUES ('"+grupoAux+"','"+descGrupo+"','"+gestGrupo+"','"+codigoUserErp+"','"+codGrupoERP+"','"+usuarioAux+"')";
    }
    break;
  case 3:
    if(tipo == "DELETE"){
      var SQL =  "DELETE FROM z_sga_grupos WHERE idUsuario = "+usuarioAux+" and idGrupo = "+grupoAux+" " ;    
    }
    if(tipo == "INSERT"){
      var SQL = "INSERT INTO z_sga_grupos (cod_grupo, desc_grupo, gestor, cod_usuario,idGrupo,idUsuario) VALUES ('"+grupoAux+"','"+descGrupo+"','"+gestGrupo+"','"+codigoUserErp+"','"+codGrupoERP+"','"+usuarioAux+"')";
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