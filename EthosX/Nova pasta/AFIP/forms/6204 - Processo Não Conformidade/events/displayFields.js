/*function displayFields(form,customHTML){
	log.warn("=== displayFields");
	var atividade = getValue("WKNumState");
	form.setValue('atividade', atividade);
	var user = getValue("WKUser");
	var indicePlanoAcao = form.getChildrenIndexes("tablePlanoAcao");
	
	form.setHidePrintLink(true);
	
	customHTML.append("<script>")
	customHTML.append("var atividade ="+atividade+";");
	customHTML.append("var user ='"+user+"';");
	customHTML.append("</script>")
	
	if(atividade == 0){
		var user = getValue("WKUser");
		
		var constraint = DatasetFactory.createConstraint("colleaguePK.colleagueId", user, user, ConstraintType.MUST);
		var dsUser = DatasetFactory.getDataset("colleague", null, [constraint], null);
		form.setValue("responsavelAbertura", dsUser.getValue(0,"colleagueName"));
		
		var tLogin = dsUser.getValue(0,"login").toUpperCase();
		log.warn("tLogin: " + tLogin);
		var cCpf = DatasetFactory.createConstraint("cpf",user,user,ConstraintType.MUST);
		var cLOGIN = DatasetFactory.createConstraint("LOGIN",tLogin,tLogin,ConstraintType.MUST);
		var dsSolic = DatasetFactory.getDataset("dsConsultaFilialMatricula",null,[cCpf,cLOGIN],null);
		if(dsSolic){
			form.setValue("filRespAbertura",dsSolic.getValue(0,"FILIAL"));
			if(verificaTerceiro(user)){
				form.setValue("matRespAbertura",dsSolic.getValue(0,"MATRICULA").trim());
			}else{
				form.setValue("matRespAbertura","01"+dsSolic.getValue(0,"FILIAL")+dsSolic.getValue(0,"MATRICULA").trim());
			}
			
		}
		
		/* RETIRADO CONFORME ALINHAMENTO COM RITA EM 19/12/2018
		var cMat = DatasetFactory.createConstraint("matricula","01"+dsSolic.getValue(0,"FILIAL")+dsSolic.getValue(0,"MATRICULA"),"",ConstraintType.MUST);
		var cFilial = DatasetFactory.createConstraint("filial",dsSolic.getValue(0,"FILIAL"),"",ConstraintType.MUST);
		var dsDepto = DatasetFactory.getDataset("dsConsultaDepto",null,[cMat,cFilial],null);
		if(dsDepto){
			form.setValue("deptoRespAbertura",dsDepto.getValue(0,"CENTRO_CUSTO"));
			form.setValue("codDepartamentoOrigem",dsDepto.getValue(0,"CENTRO_CUSTO"));
		}
		
		
		var cCodigo = DatasetFactory.createConstraint("CODIGO",dsDepto.getValue(0,"CENTRO_CUSTO"),dsDepto.getValue(0,"CENTRO_CUSTO"),ConstraintType.MUST);
		var dsDeptoDesc = DatasetFactory.getDataset("nc_dsOrigemDestino",null,[cCodigo],null);
		if(dsDeptoDesc){
			form.setValue("codDepartamentoOrigem",dsDepto.getValue(0,"CENTRO_CUSTO"));
			form.setValue("departamentoOrigem",dsDeptoDesc.getValue(0,"DESCRICAO"));
		}
		*/
		
		/*form.setValue("codClassificacaoNConformidade","2");
		form.setValue("classificacaoNaoConformidade","Nao Conf.Existente");
		
		form.setValue("codSituacao", "1");
		form.setValue("situacao", "Registrada");
	}
	
}

function findGroupByUser(user, form, customHTML){

	var constraintMember = DatasetFactory.createConstraint("colleagueGroupPK.groupId", "MEMBER_%", "MEMBER_%", ConstraintType.MUST_NOT);
	constraintMember.setLikeSearch(true);
	
	var constraintModerator = DatasetFactory.createConstraint("colleagueGroupPK.groupId", "MODERATOR_%", "MODERATOR_%", ConstraintType.MUST_NOT);
	constraintModerator.setLikeSearch(true);
	
	var constraintDefault = DatasetFactory.createConstraint("colleagueGroupPK.groupId", "Default%", "Default%", ConstraintType.MUST_NOT);
	constraintDefault.setLikeSearch(true);
	
	var constraintUser = DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", user, user, ConstraintType.MUST);
	
	var constraints = [constraintMember, constraintModerator, constraintDefault, constraintUser];
	
	var colleagueGroup = DatasetFactory.getDataset("colleagueGroup", null, constraints, null);
	
	if(colleagueGroup.rowsCount > 0){
		form.setValue("departamentoOrigem", colleagueGroup.getValue(0, "colleagueGroupPK.groupId"));
	}
}

function buscaLogin(cpf){
	var cCPF = DatasetFactory.createConstraint("colleaguePK.colleagueId",cpf,cpf,ConstraintType.MUST);
	var dsColleague = DatasetFactory.getDataset("colleague",["login"],[cCPF],null);
	return dsColleague.getValues(0,"login");
}

function verificaTerceiro(matricula){
	var cMatricula = DatasetFactory.createConstraint("colleagueGroupPK.colleagueId",matricula,matricula,ConstraintType.MUST);
	var cGrupo = DatasetFactory.createConstraint("colleagueGroupPK.groupId","Terceiros","Terceiros",ConstraintType.MUST);
	var dsGrupo = DatasetFactory.getDataset("colleagueGroup",null,[cMatricula,cGrupo],null);
	if(dsGrupo != null && dsGrupo.rowsCount > 0){
		return true;
	}else{
		return false;
	}
}*/

function displayFields(form,customHTML){
	log.warn("=== displayFields");
	var atividade = getValue("WKNumState");
	form.setValue('atividade', atividade);
	var user = getValue("WKUser");
	var indicePlanoAcao = form.getChildrenIndexes("tablePlanoAcao");
	
	form.setHidePrintLink(true);
	
	customHTML.append("<script>")
	customHTML.append("var atividade ="+atividade+";");
	customHTML.append("var user ='"+user+"';");
	customHTML.append("</script>")
	
	if(atividade == 0){
		var user = getValue("WKUser");
		
		var constraint = DatasetFactory.createConstraint("colleaguePK.colleagueId", user, user, ConstraintType.MUST);
		var dsUser = DatasetFactory.getDataset("colleague", null, [constraint], null);
		form.setValue("responsavelAbertura", dsUser.getValue(0, "colleagueName"));
		
		var tLogin = dsUser.getValue(0,"login").toUpperCase();
		log.warn("tLogin: " + tLogin);

		var cCpf = DatasetFactory.createConstraint("cpf", user, user, ConstraintType.MUST);
		var cLOGIN = DatasetFactory.createConstraint("LOGIN", tLogin, tLogin, ConstraintType.MUST);
		var dsSolic = DatasetFactory.getDataset("dsConsultaFilialMatricula", null, [cCpf, cLOGIN], null);

		if(dsSolic){
			form.setValue("filRespAbertura", dsSolic.getValue(0, "FILIAL"));
			form.setValue("matRespAbertura", dsSolic.getValue(0, "MATRICULA").trim());

			if(verificaTerceiro(user) == false){
				form.setValue("matRespAbertura", "Y" + dsSolic.getValue(0, "MATRICULA").trim());
			}
		}
		
		/* RETIRADO CONFORME ALINHAMENTO COM RITA EM 19/12/2018
		var cMat = DatasetFactory.createConstraint("matricula","01"+dsSolic.getValue(0,"FILIAL")+dsSolic.getValue(0,"MATRICULA"),"",ConstraintType.MUST);
		var cFilial = DatasetFactory.createConstraint("filial",dsSolic.getValue(0,"FILIAL"),"",ConstraintType.MUST);
		var dsDepto = DatasetFactory.getDataset("dsConsultaDepto",null,[cMat,cFilial],null);
		if(dsDepto){
			form.setValue("deptoRespAbertura",dsDepto.getValue(0,"CENTRO_CUSTO"));
			form.setValue("codDepartamentoOrigem",dsDepto.getValue(0,"CENTRO_CUSTO"));
		}
		
		
		var cCodigo = DatasetFactory.createConstraint("CODIGO",dsDepto.getValue(0,"CENTRO_CUSTO"),dsDepto.getValue(0,"CENTRO_CUSTO"),ConstraintType.MUST);
		var dsDeptoDesc = DatasetFactory.getDataset("nc_dsOrigemDestino",null,[cCodigo],null);
		if(dsDeptoDesc){
			form.setValue("codDepartamentoOrigem",dsDepto.getValue(0,"CENTRO_CUSTO"));
			form.setValue("departamentoOrigem",dsDeptoDesc.getValue(0,"DESCRICAO"));
		}
		*/
		
		form.setValue("codClassificacaoNConformidade","2");
		form.setValue("classificacaoNaoConformidade","Nao Conf.Existente");
		
		form.setValue("codSituacao", "1");
		form.setValue("situacao", "Registrada");
	}
	
}

function findGroupByUser(user, form, customHTML){

	var constraintMember = DatasetFactory.createConstraint("colleagueGroupPK.groupId", "MEMBER_%", "MEMBER_%", ConstraintType.MUST_NOT);
	constraintMember.setLikeSearch(true);
	
	var constraintModerator = DatasetFactory.createConstraint("colleagueGroupPK.groupId", "MODERATOR_%", "MODERATOR_%", ConstraintType.MUST_NOT);
	constraintModerator.setLikeSearch(true);
	
	var constraintDefault = DatasetFactory.createConstraint("colleagueGroupPK.groupId", "Default%", "Default%", ConstraintType.MUST_NOT);
	constraintDefault.setLikeSearch(true);
	
	var constraintUser = DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", user, user, ConstraintType.MUST);
	
	var constraints = [constraintMember, constraintModerator, constraintDefault, constraintUser];
	
	var colleagueGroup = DatasetFactory.getDataset("colleagueGroup", null, constraints, null);
	
	if(colleagueGroup.rowsCount > 0){
		form.setValue("departamentoOrigem", colleagueGroup.getValue(0, "colleagueGroupPK.groupId"));
	}
}

function buscaLogin(cpf){
	var cCPF = DatasetFactory.createConstraint("colleaguePK.colleagueId",cpf,cpf,ConstraintType.MUST);
	var dsColleague = DatasetFactory.getDataset("colleague",["login"],[cCPF],null);
	return dsColleague.getValues(0,"login");
}

function verificaTerceiro(matricula){
	var cMatricula = DatasetFactory.createConstraint("colleagueGroupPK.colleagueId",matricula,matricula,ConstraintType.MUST);
	var cGrupo = DatasetFactory.createConstraint("colleagueGroupPK.groupId","Terceiros","Terceiros",ConstraintType.MUST);
	var dsGrupo = DatasetFactory.getDataset("colleagueGroup",null,[cMatricula,cGrupo],null);
	if(dsGrupo != null && dsGrupo.rowsCount > 0){
		return true;
	}else{
		return false;
	}
}