function setSelectedZoomItem(selectedItem){
	
	if(selectedItem.inputId == "origem"){
		$("#codOrigem").val(selectedItem.codigo);
	}
	else if(selectedItem.inputId == "processo"){
		$("#codProcesso").val(selectedItem.codigo);
	}
	else if(selectedItem.inputId == "departamentoOrigem"){
		$("#codDepartamentoOrigem").val(selectedItem.codigo);
	}
	else if(selectedItem.inputId == "departamentoDestino"){
		$("#codDepartamentoDestino").val(selectedItem.codigo);
	}
	else if(selectedItem.inputId == "classificacaoNaoConformidade"){
		$("#codClassificacaoNConformidade").val(selectedItem.codigo);
	}
	else if(selectedItem.inputId == "eventoAdverso"){
		reloadZoomFilterValues("classificacaoEvento", "eventoAdverso,"+selectedItem.descricao);
		$("#codEventoAdverso").val(selectedItem.codigo);
	}
	else if(selectedItem.inputId == "classificacaoEvento"){
		$("#codClassificacaoEvento").val(selectedItem.codigo);
	}
	else if(selectedItem.inputId == "gerenciamentoRisco"){
		$("#codGerenciamentoRisco").val(selectedItem.codigo);
	}
	else if(selectedItem.inputId == "motivoNaoConformidade"){
		$("#codMotivoNaoConformidade").val(selectedItem.codigo);
	}
	else if(selectedItem.inputId == "danoPaciente"){
		$("#codDanoPaciente").val(selectedItem.codigo);
	}
	else if(selectedItem.inputId == "analista"){
		$("#idAnalista").val(selectedItem.Codigo);
		var tCpf = (selectedItem.Codigo.length > 11 ? selectedItem.Codigo.substring(0,11) : selectedItem.Codigo);
		var tLogin = buscaLogin(tCpf).toUpperCase();
		
		var cCPF = DatasetFactory.createConstraint("cpf",tCpf,tCpf,ConstraintType.MUST);
		var cLOGIN = DatasetFactory.createConstraint("LOGIN",tLogin,tLogin,ConstraintType.MUST);
		var ds = DatasetFactory.getDataset("dsConsultaFilialMatricula",null,[cCPF,cLOGIN],null);
		if(verificaTerceiro(tCpf)){
			$("#matAnalista").val(ds.values[0]["MATRICULA"].trim());
		}else{
			$("#matAnalista").val("01" + ds.values[0]["FILIAL"] + ds.values[0]["MATRICULA"].trim());
		}
		$("#filAnalista").val(ds.values[0]["FILIAL"]);
	}

	else if(selectedItem.inputId == "responsavelResposta"){
		$("#idResponsavelResposta").val(selectedItem.colleagueId);
		var tCpf = (selectedItem.colleagueId.length > 11 ? selectedItem.colleagueId.substring(0,11) : selectedItem.colleagueId);
		var tLogin = buscaLogin(tCpf).toUpperCase();
		
		var cCPF = DatasetFactory.createConstraint("cpf",tCpf,tCpf,ConstraintType.MUST);
		var cLOGIN = DatasetFactory.createConstraint("LOGIN",tLogin,tLogin,ConstraintType.MUST);
		var ds = DatasetFactory.getDataset("dsConsultaFilialMatricula",null,[cCPF,cLOGIN],null);
		if(verificaTerceiro(tCpf)){
			$("#matResponsavelResposta").val(ds.values[0]["MATRICULA"].trim());
		}else{
			$("#matResponsavelResposta").val("01" + ds.values[0]["FILIAL"] + ds.values[0]["MATRICULA"].trim());
		}
		
		$("#filResponsavelResposta").val(ds.values[0]["FILIAL"]);
	}
	
	else if(selectedItem.inputId == "novoResponsavelResposta"){
		$("#idResponsavelResposta").val(selectedItem.colleagueId);
		$("#responsavelResposta").val(selectedItem.colleagueName);
		$("#idNovoResponsavelResposta").val(selectedItem.colleagueId);
		var tCpf = (selectedItem.colleagueId.length > 11 ? selectedItem.colleagueId.substring(0,11) : selectedItem.colleagueId);
		var tLogin = buscaLogin(tCpf).toUpperCase();
		
		var cCPF = DatasetFactory.createConstraint("cpf",tCpf,tCpf,ConstraintType.MUST);
		var cLOGIN = DatasetFactory.createConstraint("LOGIN",tLogin,tLogin,ConstraintType.MUST);
		var ds = DatasetFactory.getDataset("dsConsultaFilialMatricula",null,[cCPF,cLOGIN],null);
		if(verificaTerceiro(tCpf)){
			$("#matResponsavelResposta").val(ds.values[0]["MATRICULA"].trim());
		}else{
			$("#matResponsavelResposta").val("01" + ds.values[0]["FILIAL"] + ds.values[0]["MATRICULA"].trim());
		}
		
		$("#filResponsavelResposta").val(ds.values[0]["FILIAL"]);
	}
	
	else if(selectedItem.inputId.indexOf("responsavelPlacoAcao") == 0){
		var idx = selectedItem.inputId.replace("responsavelPlacoAcao","");
		$("#idResponsavelPlacoAcao"+idx).val(selectedItem.colleagueId);
		var tCpf = (selectedItem.colleagueId.length > 11 ? selectedItem.colleagueId.substring(0,11) : selectedItem.colleagueId);
		var tLogin = buscaLogin(tCpf).toUpperCase();
		
		var cCPF = DatasetFactory.createConstraint("cpf",tCpf,tCpf,ConstraintType.MUST);
		var cLOGIN = DatasetFactory.createConstraint("LOGIN",tLogin,tLogin,ConstraintType.MUST);
		var ds = DatasetFactory.getDataset("dsConsultaFilialMatricula",null,[cCPF,cLOGIN],null);
		if(verificaTerceiro(tCpf)){
			$("#matResponsavelPlacoAcao"+idx).val(ds.values[0]["MATRICULA"].trim());
		}else{
			$("#matResponsavelPlacoAcao"+idx).val("01"+ds.values[0]["FILIAL"]+ds.values[0]["MATRICULA"].trim());
		}
		
		$("#filResponsavelPlacoAcao"+idx).val(ds.values[0]["FILIAL"]);
	}
}

function removedZoomItem(removedItem) {
	
	if(removedItem.inputId == "origem"){
		$("#codOrigem").val("");
	}
	else if(removedItem.inputId == "processo"){
		$("#codProcesso").val("");
	}
	else if(removedItem.inputId == "departamentoOrigem"){
		$("#codDepartamentoOrigem").val("");
	}
	else if(removedItem.inputId == "departamentoDestino"){
		$("#codDepartamentoDestino").val("");
	}
	else if(removedItem.inputId == "classificacaoNaoConformidade"){
		$("#codClassificacaoNConformidade").val("");
	}
	else if(removedItem.inputId == "eventoAdverso"){
		$("#codEventoAdverso").val("");
		reloadZoomFilterValues("classificacaoEvento", "eventoAdverso, ");
		$("#classificacaoEvento").val(null).trigger('change');
	}
	else if(removedItem.inputId == "classificacaoEvento"){
		$("#codClassificacaoEvento").val("");
	}
	else if(removedItem.inputId == "gerenciamentoRisco"){
		$("#codGerenciamentoRisco").val("");
	}
	else if(removedItem.inputId == "motivoNaoConformidade"){
		$("#codMotivoNaoConformidade").val("");
	}
	else if(removedItem.inputId == "danoPaciente"){
		$("#codDanoPaciente").val("");
	}
	else if(removedItem.inputId == "responsavelResposta"){
		$("#idResponsavelResposta").val("");
		$("#matResponsavelResposta").val("");
		$("#filResponsavelResposta").val("");
	}
	else if(removedItem.inputId == "analista"){
		$("#idAnalista").val("");
		$("#matAnalista").val("");
		$("#filAnalista").val("");
	}
	else if(removedItem.inputId == "novoResponsavelResposta"){
		$("#idNovoResponsavelResposta").val("");
		$("#idResponsavelResposta").val("");
		$("#matResponsavelResposta").val("");
		$("#filResponsavelResposta").val("");
	}
	else if(removedItem.inputId.indexOf("responsavelPlacoAcao") == 0){
		var idx = removedItem.inputId.replace("responsavelPlacoAcao","");
		$("#idResponsavelPlacoAcao"+idx).val("");
		$("#matResponsavelPlacoAcao"+idx).val("");
		$("#filResponsavelPlacoAcao"+idx).val("");
	}
	
}

function fnCustomDelete(botao){
	var index = botao.id.split("___")[1];
	removeResponsaveis(arrayResponsaveis[index-1]);
	fnWdkRemoveChild(botao);	
}




function toggleElement(id, command, valueToShow){
	if(command == valueToShow){
		$(id).removeClass("hide");
	}else{
		$(id).addClass("hide");
	}
}

function atribuiDepartamentoDestino(colleague){
	var constraintMember = DatasetFactory.createConstraint("colleagueGroupPK.groupId", "MEMBER_%", "MEMBER_%", ConstraintType.MUST_NOT);
	constraintMember._likeSearch = true;
	
	var constraintModerator = DatasetFactory.createConstraint("colleagueGroupPK.groupId", "MODERATOR_%", "MODERATOR_%", ConstraintType.MUST_NOT);
	constraintModerator._likeSearch = true
	
	var constraintDefault = DatasetFactory.createConstraint("colleagueGroupPK.groupId", "Default%", "Default%", ConstraintType.MUST_NOT);
	constraintDefault._likeSearch = true
	
	var constraintUser = DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", colleague.colleagueId, colleague.colleagueId, ConstraintType.MUST);
	
	var constraints = [constraintMember, constraintModerator, constraintDefault, constraintUser];
	
	var colleagueGroup = DatasetFactory.getDataset("colleagueGroup", null, constraints, null);
	
	if(colleagueGroup.values.length > 0){
		$("#departamentoDestino").val(colleagueGroup.values[0]["colleagueGroupPK.groupId"])
		$("#departamentoDestino").attr("readonly", true);
	}
}

function buscaLogin(cpf){
	var cCPF = DatasetFactory.createConstraint("colleaguePK.colleagueId",cpf,cpf,ConstraintType.MUST);
	var dsColleague = DatasetFactory.getDataset("colleague",["login"],[cCPF],null);
	return dsColleague.values[0]["login"];
}

function verificaTerceiro(matricula){
	var cMatricula = DatasetFactory.createConstraint("colleagueGroupPK.colleagueId",matricula,matricula,ConstraintType.MUST);
	var cGrupo = DatasetFactory.createConstraint("colleagueGroupPK.groupId","Terceiros","Terceiros",ConstraintType.MUST);
	var dsGrupo = DatasetFactory.getDataset("colleagueGroup",null,[cMatricula,cGrupo],null);
	if(dsGrupo != null && dsGrupo.values.length > 0){
		return true;
	}else{
		return false;
	}
}