/**
 * Ejemplo de uso 
*/

function createDataset(fields, constraints, sortFields) { 
	
	log.info("### DATASET ARY-sql2Dataset-Programas");
	
	var cod_usuario = findConstraint("cod_usuario",constraints,"");	
	var nome_usuario = findConstraint("nome_usuario",constraints,"");	
  // var cod_usuario = 'abala';
	log.info('>>>>> cod_usuario: ' + cod_usuario);
	log.info('>>>>> nome_usuario: ' + nome_usuario);
	var arq = arqMarvinLoad("v1", {
		sql: "com.arquimeda.marvin.server.js.Sql-v1"
	});
	
	var script = "SELECT a.cod_usuario, a.nome_usuario, b.cod_usuario AS cod_gest, b.nome_usuario as gest FROM z_ary_usuarios a " +
				"INNER JOIN z_ary_usuarios b " +
				"on a.cod_gestor = b.cod_usuario " +
				" WHERE ROWNUM <= 50";
	
	if(cod_usuario != ""){
        script = "SELECT a.cod_usuario, a.nome_usuario, b.cod_usuario AS cod_gest, b.nome_usuario as gest FROM z_ary_usuarios a " +
		"INNER JOIN z_ary_usuarios b " +
		"on a.cod_gestor = b.cod_usuario " +
		" WHERE a.cod_usuario LIKE '%"+ cod_usuario + "%' AND ROWNUM <= 50";
    }
    if(nome_usuario != ""){
        script = "SELECT a.cod_usuario, a.nome_usuario, b.cod_usuario AS cod_gest, b.nome_usuario as gest FROM z_ary_usuarios a " +
					"INNER JOIN z_ary_usuarios b " +
					"on a.cod_gestor = b.cod_usuario " +
					" WHERE a.nome_usuario LIKE '%"+ nome_usuario + "%' AND ROWNUM <= 50";
    }
    
    log.info('>>>>> script: ' + script);
	
	//log.info("### ANTERIOR AO RETURN");
	return arq.sql.sql2Dataset({
		jndiName: "java:/jdbc/FluigDS",
		sql: script,
		log: 1
	});
	log.info("### ANTERIOR AO RETURN");
	
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