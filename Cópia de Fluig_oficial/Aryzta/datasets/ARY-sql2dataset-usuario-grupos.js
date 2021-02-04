/**
 * Ejemplo de uso 
*/

function createDataset(fields, constraints, sortFields) { 
    
    log.info("### DATASET ARY-sql2Dataset-Programas");
    
    var cod_usuario = findConstraint("cod_usuario", constraints, "");
    var cod_grupo = findConstraint("cod_grupo", constraints, "");

    
    log.info(">>>>>>>>> cod_usuario: " + cod_usuario);
    log.info(">>>>>>>>> cod_grupo: " + cod_grupo);
    
    var arq = arqMarvinLoad("v1", {
        sql: "com.arquimeda.marvin.server.js.Sql-v1"
    });
    
    var script = "SELECT distinct cod_grupo, desc_grupo, gestor FROM z_ary_grupos";
    
    if(cod_usuario != ""){
        script = "SELECT distinct cod_grupo, desc_grupo, gestor FROM z_ary_grupos where cod_usuario LIKE '%"+ cod_usuario + "%' ";
    }
    if(cod_grupo != ""){
        script = "SELECT distinct cod_grupo, desc_grupo, gestor FROM z_ary_grupos where cod_grupo LIKE '%"+ cod_grupo + "%' ";
    }
    
    log.info(">>>>>>>>> script: " + script);
    
    return arq.sql.sql2Dataset({
        jndiName: "java:/jdbc/FluigDSRO",

        sql: script

//        sql: "SELECT cod_grupo, desc_grupo, gestor " +
//                " FROM z_ary_grupos where cod_usuario  LIKE '%"+ cod_usuario + "%' ",
         
    
    });
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

/*! arqMarvinLoad - v1.1 - All rights reserverd */
function arqMarvinLoad(a,b){var c={};if(null==b)return c;var d=(new javax.naming.InitialContext).lookup("java:global/arq-marvin-"+a+"/MarvinLibLoaderEJB");for(var e in b)try{var f=new Function("lib","return "+d.getLib(b[e],"1"));c[e]=f(c)}catch(a){log.error("*** Error compilando libreria "+e+":"+a)}return c}