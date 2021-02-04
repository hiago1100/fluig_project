/**
 * Ejemplo de uso 
*/

function createDataset(fields, constraints, sortFields) { 
	
	log.info("### DATASET ARY-sql2Dataset-Programas");
	
	//var cod = findConstraint("autocompleteFilter",constraints,"");
	var cod = 'tst';
	
	
	var arq = arqMarvinLoad("v1", {
		sql: "com.arquimeda.marvin.server.js.Sql-v1"
	});
	
	//log.info("### ANTERIOR AO RETURN");
	return arq.sql.sql2Dataset({
		jndiName: "java:/jdbc/FluigDS",
		sql: "SELECT gp.cod_grupo, gp.nome_grupo, prog.cod_program, prog.description_program, prog.cod_rotina, prog.description_rotina, prog.cod_modulo, prog.description_modulo, prog.obs_upc  "+
					"FROM z_ary_grupo_programa gp "+
					
                    "INNER JOIN  z_ary_programs prog "+
				    "ON prog.cod_program = gp.programa "+ 
            
			    "WHERE gp.cod_grupo LIKE '%"+cod+"%'",
		log: 1
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