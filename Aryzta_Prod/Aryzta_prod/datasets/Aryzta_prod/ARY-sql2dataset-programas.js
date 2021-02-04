function createDataset(fields, constraints, sortFields) { 
	
	log.info("### DATASET ARY-sql2Dataset-Programas");
	
	var indice = findConstraint("indice",constraints,"");
	
	var cod_usuario = findConstraint("cod_usuario",constraints,"");
	
	var cod_grupo = findConstraint("cod_grupo",constraints,"");
	
	var cod_modulo = findConstraint("cod_modulo",constraints,"");
	
	var cod_grupo_all = findConstraint("cod_grupo_all",constraints,"");
	
	var cod_program = findConstraint("cod_program",constraints,"");
	
	var description_program = findConstraint("description_program",constraints,"");
	
	var cod_grupo_remove = findConstraint("cod_grupo_remove",constraints,"");
	//var cod_grupo_remove = 'AS1';
 	var cod_programAdd = findConstraint("cod_programAdd",constraints,"");
 	
 	
	log.info("### indice   :" + indice);
	log.info("### cod_usuario   :" + cod_usuario);
	log.info("### cod_grupo   :" + cod_grupo);
	log.info("### cod_modulo   :" + cod_modulo);
	log.info("### cod_program   :" + cod_program);
	log.info("### description_program   :" + description_program);
	log.info("### cod_grupo_remove   :" + cod_grupo_remove);
	log.info("### cod_programAdd   :" + cod_programAdd);
	
	var arq = arqMarvinLoad("v1", {
		sql: "com.arquimeda.marvin.server.js.Sql-v1"
	});
	
	    //var script = "SELECT cod_program, description_program, obs_upc FROM z_ary_programs";
	    var script = "select * from  (select  cod_program, description_program, obs_upc , "+
	                    "rownum as rownum_ from z_ary_programs ) "+
	                    "where rownum_ between (10 +1) and (10 + 20)"; 
	
	if (cod_usuario != ""){
		script = "SELECT prog.cod_program, prog.description_program, prog.obs_upc FROM z_ary_programs prog " +
				 "INNER JOIN z_ary_grupo_programa grupo " +
		     	 	"on grupo.programa = prog.cod_program " +
		     	 "INNER JOIN z_ary_grupos gru " +
		     	 	"on gru.cod_grupo = grupo.cod_grupo " +
		     	 "WHERE gru.cod_usuario LIKE '%"+ cod_usuario + "%'";
	}
	if (cod_grupo != ""){
		log.info("*** cod_grupo: "+ cod_grupo);
		log.info("*** indice: "+ indice);
		script = "select * from (SELECT prog.cod_program, prog.description_program, prog.cod_modulo, prog.description_modulo, " +
								"prog.obs_upc, prog.descricao_rotina, gm.gestor AS cod_gestor_modulo,gmuser.nome_usuario AS gestor_modulo, rownum as rownum_ FROM z_ary_programs prog " +
								 "INNER JOIN z_ary_grupo_programa grupo "+
								 	"on grupo.programa = prog.cod_program " +
								 "INNER JOIN z_ary_gestor_modulo gm "+
						                "on prog.cod_modulo = gm.cod_modulo "+
						          "INNER JOIN z_ary_usuarios gmuser "+
						                "on gm.gestor = gmuser.cod_usuario " +
							     "WHERE grupo.cod_grupo LIKE '%"+ cod_grupo + "%' " +
							     "ORDER BY prog.description_modulo ASC, prog.descricao_rotina ASC, prog.description_program ASC)  "+
			     "where rownum_ between ("+indice+" +1) and ("+indice+" + 20)"; 
	}
	
	log.info("*** meu teste começa aqui Hiago ");
	
	if (cod_grupo_all != ""){
		log.info("*** cod_grupo: "+ cod_grupo_all);
		log.info("*** indice: "+ indice);
		script = "select * from (SELECT prog.cod_program, prog.description_program, prog.cod_modulo, prog.description_modulo, prog.obs_upc, prog.descricao_rotina, rownum as rownum_ FROM z_ary_programs prog " +
								 "INNER JOIN z_ary_grupo_programa grupo " +
							     	 "on grupo.programa = prog.cod_program " +
							     "WHERE grupo.cod_grupo LIKE '%"+ cod_grupo_all + "%' " +
							     "ORDER BY prog.description_modulo ASC, prog.descricao_rotina ASC, prog.description_program ASC)";	
		
		 }
	
	if (cod_modulo != ""){
		script = "SELECT cod_program, description_program, obs_upc FROM z_ary_programs WHERE cod_modulo LIKE '%"+ cod_modulo + "%' ";
	}
	
	if (cod_program != "" /* && cod_grupo_remove == ""*/){
		script = "SELECT p.cod_program,p.description_program,p.obs_upc,p.cod_modulo,g.gestor,u.nome_usuario FROM z_ary_programs p LEFT JOIN z_ary_gestor_modulo g ON p.cod_modulo = g.cod_modulo LEFT JOIN z_ary_usuarios u ON g.gestor = u.cod_usuario WHERE p.visualiza_menu = '1' and cod_program LIKE '%"+ cod_program + "%' ";
	}
	if (description_program != ""){
		script = "SELECT prog.cod_program, prog.description_program, prog.obs_upc, prog.cod_modulo, gm.gestor AS cod_gestor, gmgest.nome_usuario AS nome_gestor FROM z_ary_programs  prog "+ 
				       "LEFT JOIN z_ary_gestor_modulo gm "+
				             "ON prog.cod_modulo = gm.cod_modulo "+
				       "LEFT JOIN z_ary_usuarios gmgest "+
				             "ON gm.gestor = gmgest.cod_usuario "+
				"WHERE description_program LIKE '%"+ description_program + "%' ";
	}
	if (cod_programAdd != ""){
		log.info("### cod_programAdd");
		script = "SELECT prog.cod_program, prog.description_program, prog.obs_upc, prog.cod_modulo, gm.gestor AS cod_gestor, gmgest.nome_usuario AS nome_gestor FROM z_ary_programs  prog "+ 
				       "LEFT JOIN z_ary_gestor_modulo gm "+
				             "ON prog.cod_modulo = gm.cod_modulo "+
				       "LEFT JOIN z_ary_usuarios gmgest "+
				             "ON gm.gestor = gmgest.cod_usuario "+
				"WHERE cod_program LIKE '%"+ cod_programAdd + "%' ";
	}
	if (cod_grupo_remove != "" ){
		log.info("### Entrou no cod_grupo_remove");
		/*script = "SELECT prog.cod_program, prog.description_program, prog.obs_upc FROM z_ary_programs  prog "+ 
				        "INNER JOIN z_ary_grupo_programa gp "+
				        "ON gp.programa = prog.cod_program "+
				 "WHERE gp.cod_grupo = '"+cod_grupo_remove +"' "+
				 " AND prog.cod_program LIKE '%"+cod_program+"%' "; 
		*/
		script = "SELECT prog.cod_program, prog.description_program, prog.obs_upc, " +
					"prog.cod_modulo, gm.gestor AS cod_gestor, gmgest.nome_usuario AS nome_gestor ," +
					" gp.cod_grupo AS cod_grupo_remove " +
					" FROM z_ary_programs prog " +
						"LEFT JOIN z_ary_gestor_modulo gm "+
					             "ON prog.cod_modulo = gm.cod_modulo "+
					     "LEFT JOIN z_ary_usuarios gmgest "+
					             "ON gm.gestor = gmgest.cod_usuario "+
			             "INNER JOIN z_ary_grupo_programa gp "+
					        "ON gp.programa = prog.cod_program "+
					 "WHERE gp.cod_grupo = '"+cod_grupo_remove +"' ";     
				//	"AND prog.cod_program LIKE '%"+ cod_program + "%' ";
	}/*if (desc_grupo_remove != "" && cod_program != ""){
		log.info("### Entrou no cod_grupo_remove");
		script = "SELECT prog.cod_program, prog.description_program, prog.obs_upc FROM z_ary_programs  prog "+ 
				        "INNER JOIN z_ary_grupo_programa gp "+
				        "ON gp.programa = prog.cod_program "+
				 "WHERE gp.cod_grupo = '"+cod_grupo_remove +"' "+
				 " AND prog.desc_grupo_remove LIKE '%"+desc_grupo_remove+"%' "; 
	}*/
	
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