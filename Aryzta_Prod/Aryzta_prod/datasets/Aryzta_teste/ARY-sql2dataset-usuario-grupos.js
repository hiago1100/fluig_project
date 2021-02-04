/**
 * Ejemplo de uso 
*/

function createDataset(fields, constraints, sortFields) { 
    
    log.info("### DATASET ARY-sql2Dataset-usuario-grupos");
    
    var cod_usuario = findConstraint("cod_usuario", constraints, "");
    var cod_grupo = findConstraint("cod_grupo", constraints, "");
    var desc_grupo = findConstraint("desc_grupo", constraints, "");
    var cod_grupo_revisao = findConstraint("cod_grupo_revisao", constraints, "");
    //var cod_grupo_revisao = "AS1";
    
    
    log.info(">>>>>>>>> cod_usuario: " + cod_usuario);
    log.info(">>>>>>>>> cod_grupo: " + cod_grupo);
    log.info(">>>>>>>>> desc_grupo: " + desc_grupo);
    log.info(">>>>>>>>> cod_grupo_revisao: " + cod_grupo_revisao);
    
    var arq = arqMarvinLoad("v1", {
        sql: "com.arquimeda.marvin.server.js.Sql-v1"
    });
    
    var script = "SELECT distinct gr.cod_grupo, gr.desc_grupo, gr.gestor, gest.nome_usuario AS nome_gestor " +
    		" FROM z_ary_grupos gr " +
    		"LEFT JOIN z_ary_usuarios gest "+
				"ON gr.gestor = gest.cod_usuario " +
			"WHERE gr.cod_grupo <> '*' AND gr.cod_grupo <> 'GER' ";
    
    if(cod_usuario != ""){
        script = "SELECT distinct gr.cod_grupo, gr.desc_grupo, gr.gestor, gest.nome_usuario  AS nome_gestor FROM z_ary_grupos gr " +
        		" LEFT JOIN z_ary_usuarios gest "+
        			"On gr.gestor = gest.cod_usuario " +
        		" where gr.cod_grupo <> '*' AND gr.cod_grupo <> 'GER' AND gr.cod_usuario LIKE '%"+ cod_usuario + "%' ";
    }
    if(cod_grupo != ""){
        script = "SELECT distinct gr.cod_grupo, gr.desc_grupo, gr.gestor, gest.nome_usuario  AS nome_gestor FROM z_ary_grupos gr " +
        		" LEFT JOIN z_ary_usuarios gest "+
        			"On gr.gestor = gest.cod_usuario " +
        		"INNER JOIN z_ary_usuarios us "+
					"ON us.cod_usuario = gr.cod_usuario " +
        		"where gr.cod_grupo <> '*' AND gr.cod_grupo <> 'GER' AND gr.cod_grupo LIKE '%"+ cod_grupo + "%' ";
    }
    if(desc_grupo != ""){
        script = "SELECT distinct gr.cod_grupo, gr.desc_grupo, gr.gestor, gest.nome_usuario  AS nome_gestor FROM z_ary_grupos gr " +
        		" LEFT JOIN z_ary_usuarios gest "+
        			"On gr.gestor = gest.cod_usuario " +
        		"where gr.cod_grupo <> '*' AND gr.cod_grupo <> 'GER' AND gr.desc_grupo LIKE '%"+ desc_grupo + "%' ";
    }
    if(cod_grupo_revisao != ""){
    	script = "SELECT distinct gr.cod_grupo, gr.desc_grupo, gr.gestor, gest.nome_usuario  AS nome_gestor, us.nome_usuario, us.cod_usuario  FROM z_ary_grupos gr "+ 
		 "LEFT JOIN z_ary_usuarios gest "+
			"On gr.gestor = gest.cod_usuario "+
         
      "LEFT JOIN z_ary_usuarios us "+
			"ON gr.cod_usuario = us.cod_usuario "+
		 "where gr.cod_grupo <> '*' AND gr.cod_grupo <> 'GER' AND gr.cod_grupo LIKE '%"+ cod_grupo_revisao +"%' ";
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