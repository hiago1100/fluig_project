/**
 * Ejemplo de uso 
*/

function createDataset(fields, constraints, sortFields) { 
	
	log.info("### DATASET ARY-sql2Dataset-Programas");
	
	var cod_grupo = findConstraint("cod_grupo",constraints,"");
	//var cod = 'tst';
	var cod_modulo = findConstraint("cod_modulo",constraints,"");
	
	var arq = arqMarvinLoad("v1", {
		sql: "com.arquimeda.marvin.server.js.Sql-v1"
	});
	
	var script = "SELECT distinct gp.cod_grupo, gp.nome_grupo, prog.cod_modulo, prog.description_modulo  "+
					 "FROM z_ary_grupo_programa gp "+					
				     "INNER JOIN  z_ary_programs prog "+
				     	"ON prog.cod_program = gp.programa ";
	
	if(cod_grupo != ""){
		script = "SELECT distinct gp.cod_grupo, gp.nome_grupo, prog.cod_modulo, prog.description_modulo  "+
					 "FROM z_ary_grupo_programa gp "+					
			         "INNER JOIN  z_ary_programs prog "+
				     	"ON prog.cod_program = gp.programa "+ 			
			         "WHERE gp.cod_grupo LIKE '%"+cod_grupo+"%'";
	}

	if(cod_modulo != ""){
		script = "SELECT distinct prog.cod_modulo, prog.description_modulo  "+
					 "FROM z_ary_programs prog "+
				     "WHERE prog.cod_modulo LIKE '%"+cod_modulo+"%'";
	}
	
	return arq.sql.sql2Dataset({
		jndiName: "java:/jdbc/FluigDS",
		sql: script,
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