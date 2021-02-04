function resolve(process,colleague){

	log.info("dentroMecanismo=====");

	// var userList = new java.util.ArrayList();
	
	var aprovador = hAPI.getCardValue('aprovadorCerto');
	return aprovador;
	

	// var atividade = getValue("WKNumState");
	// var usuarioLogado = hAPI.getCardValue('cpSolicitante');
	
	// var userTeste = 48359326843;
	

	// log.info("====atividade: " + atividade);
	// if (atividade == 4) {
	// 	log.info("dentro do if atividade");
	// 	if (colaborador == "analista" || colaborador == "coordenacao" || colaborador == "gerencia") {
	// 		aprovador = buscaAprovador(usuarioLogado);
	// 	}else{
	// 		aprovador = buscaAprovador(aprovadorGG);
	// 	}
		
	// }else{
	// 	aprovador = buscaAprovador(aprovadorGG);
	// }
	// else if (atividade == 19 || atividade == 23 || atividade == 25) {
	// 	aprovador = buscaAprovador(aprovadorGG);
	// 	log.info("=====aprovadorGG: " + aprovador);
	// }



	// log.info("=====aprovador: " + aprovador);
	
	
	
	
	
	// userList.add(aprovador);
	

	// return userList;
	
	
	
}

// function usuarioGenteGestao(){
// 	var c4 = DatasetFactory.createConstraint('workflowColleagueRolePK.roleId', 'colaborador_gente_gestao', 'colaborador_gente_gestao', ConstraintType.MUST);
// 	var dataset_dois = DatasetFactory.getDataset('workflowColleagueRole', null, new Array(c4), null);
	
// 	if (!dataset_dois) {
// 		return "";
// 	}

// 	var usuario = dataset_dois.getValue(0, "workflowColleagueRolePK.colleagueId");
// 	log.info("===========UsuarioGG: " + usuario);
// 	return usuario;

	// for (var i = 0; i < dataset_dois.rowsCount; i++){
	// 	var usuario = dataset_dois.getValue(i, "workflowColleagueRolePK.colleagueId");

	// 	if (usuario == 34488061885) {
	// 		return usuario; 
	// 	}
	// }




// function buscaAprovador(cpf){
// 	log.info("==== cpf: " + cpf);

// 	var c1 = DatasetFactory.createConstraint("cpf", cpf, cpf, ConstraintType.MUST);
// 	var constraints = new Array(c1);
// 	var mFuncao = hAPI.getCardValue('cpFuncao');
// 	var atividade = getValue("WKNumState");
	

// 	var dataset = DatasetFactory.getDataset("ds_aprovacaoProvReclass_BK_SECAOFUNC", null, constraints, null);

	

	 

// 	if(!dataset){
// 		return "";
// 	}

// 	var COD_SECAO = "";
// 	var dataset_APROVSECAO="";

// 	for (var i = 0; i < dataset.rowsCount; i++){

// 		var CODSECAO  = dataset.getValue(i, "COD_SECAO1");
// 		var CODSECAO2 = dataset.getValue(i, "COD_SECAO2");
// 		var CODSECAO3 = dataset.getValue(i, "COD_SECAO3");

		
// 		COD_SECAO  = "CODSECAO="  + CODSECAO  +";"+
// 		 			 "CODSECAO2=" + CODSECAO2 +";"+
// 		 			 "CODSECAO3=" + CODSECAO3;

// 		 log.info("======codSecao: " + CODSECAO);			 

// 		var c2 = DatasetFactory.createConstraint("COD_SECAO", COD_SECAO, COD_SECAO, ConstraintType.MUST);

// 		dataset_APROVSECAO = DatasetFactory.getDataset("ds_aprovacaoProvReclass_BK_APROVSECAO", null, new Array(c2), null);

// 		if(dataset_APROVSECAO){
// 			break;
// 		}

// 	}

	




// for (var i = 0; i < dataset_APROVSECAO.rowsCount; i++){

// 		log.info('==== dentro do for: ' + i)		
// 		var funcao  = dataset_APROVSECAO.getValue(i, "FUNCAO");
// 		log.info('==== funcao' + funcao)
// 		var cargo =  "";
		

// 		if(mFuncao == "analista" && atividade == 4){

// 			cargo = funcao.indexOf('COORDENADOR');

// 		}else if (mFuncao == "coordenacao" && atividade == 4) {

// 			cargo = funcao.indexOf('GERENTE');

// 		}else if(mFuncao == "gerencia" && atividade == 4) {
// 			cargo = funcao.indexOf('DIRETOR');
// 		}else if (mFuncao == "diretoria" && atividade == 4) {
// 			cargo = funcao.indexOf('GERENTE');
// 		}


// 		if (atividade == 11) {
// 			cargo = funcao.indexOf('GERENTE');
// 		}else if (atividade == 13) {
// 			cargo = funcao.indexOf('DIRETOR');
// 		}else if (atividade == 21) {
// 			log.info("cargo 1: " + cargo);
// 			cargo = funcao.indexOf('GERENTE');
// 			log.info("cargo 2: " + cargo);

// 		}else if (atividade == 17) {
// 			cargo = funcao.indexOf('GERENTE');
// 		}else if (atividade == 23) {
// 			cargo = funcao.indexOf('DIRETOR');
// 		}else if (atividade == 15) {
// 			cargo = funcao.indexOf('GERENTE');
// 		}else if (atividade == 25) {
// 			cargo = funcao.indexOf('DIRETOR');
// 		}else if (atividade == 98) {
// 			cargo = funcao.indexOf('DIRETOR');
// 		}
		

// 		if(cargo >= 0){
// 			log.info('entrou no if')
// 			var aprovador = dataset_APROVSECAO.getValue(i, "CPF");
// 			log.info('==== '+ aprovador);
// 			break;
// 		}
// 	}	


