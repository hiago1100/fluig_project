/**
 * Ejemplo de uso 
*/

function createDataset(fields, constraints, sortFields) { 
	
	log.info("### DATASET ARY-sql2Dataset-Programas");
	
	var cod_usuario = findConstraint("cod_usuario",constraints,"");
		
	var cod_grupo = findConstraint("cod_grupo",constraints,"");

	var cod_modulo = findConstraint("cod_modulo",constraints,"");
	
	var cod_program = findConstraint("cod_program",constraints,"");
	
	var arq = arqMarvinLoad("v1", {
		sql: "com.arquimeda.marvin.server.js.Sql-v1"
	});
	
	var script = "SELECT cod_program, description_program, obs_upc FROM z_ary_programs";
	
	if (cod_usuario != ""){
		script = "SELECT prog.cod_program, prog.description_program, prog.obs_upc FROM z_ary_programs prog " +
				 "INNER JOIN z_ary_grupo_programa grupo " +
		     	 	"on grupo.programa = prog.cod_program " +
		     	 "INNER JOIN z_ary_grupos gru " +
		     	 	"on gru.cod_grupo = grupo.cod_grupo " +
		     	 "WHERE gru.cod_usuario LIKE '%"+ cod_usuario + "%' ";
	}
	if (cod_grupo != ""){
		script = "SELECT prog.cod_program, prog.description_program, prog.cod_modulo, prog.description_modulo, prog.obs_upc FROM z_ary_programs prog " +
				 "INNER JOIN z_ary_grupo_programa grupo " +
			     	 "on grupo.programa = prog.cod_program " +
			     "WHERE grupo.cod_grupo LIKE '%"+ cod_grupo + "%' ";
	}
	if (cod_modulo != ""){
		script = "SELECT cod_program, description_program, obs_upc FROM z_ary_programs WHERE cod_modulo LIKE '%"+ cod_modulo + "%' ";
	}
	
	if (cod_program != ""){
		script = "SELECT cod_program, description_program, obs_upc FROM z_ary_programs WHERE cod_program LIKE '%"+ cod_program + "%' ";
	}
	log.info('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
	log.info('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
	log.info('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
	log.info('script: ' + script);
	log.info('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
	log.info('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
	log.info('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
	
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