function beforeCancelProcess(colleagueId,processId){
	   var lAtu ;
	
		var cdAssJur   =  hAPI.getCardValue("cdAssJur");
		var cdCajuri   =  hAPI.getCardValue("cdCajuri");
		var comentario =  "Cancelado via Fluig";
		var email      =  getMailByUserId(colleagueId);
		var cdFilialNS7 = hAPI.getCardValue("cdFilialNS7");

    	hAPI.setCardValue("sStatusProc","3");	//3=Cancelado
		
		log.info("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% ENTROU No BEFORE CANCEL ");
		log.info("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% DADOS FORM "+ cdAssJur);
		log.info("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% DADOS FORM "+ cdCajuri);
		log.info("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% DADOS FORM "+ comentario);
		log.info("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% DADOS FORM "+ email);
		log.info("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% DADOS FORM "+ cdFilialNS7);

    	lAtu = encerraAssJurSIGAJURI(cdAssJur,cdCajuri , "2",comentario , email,cdFilialNS7 );

	
	if (lAtu == false){
		throw "Erro ao atualizar o SIGAJURI. O workflow não pode ser cancelada.";
	}
	
}

function encerraAssJurSIGAJURI(cdAssJur,cdCajuri, sStatus, sObs, sUser,cdFilialNS7 ){

	log.info("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% ENTROU NA FUNCTION");

	log.info("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% DADOS FORM FUNCTION "+ cdAssJur);
	log.info("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% DADOS FORM FUNCTION "+ cdCajuri);


	var constraints = new Array();
	var response = null;
	
	constraints.push(DatasetFactory.createConstraint("cdAssJur", cdAssJur, cdAssJur, ConstraintType.MUST));
	constraints.push(DatasetFactory.createConstraint("sStatus", sStatus, sStatus, ConstraintType.MUST));
	constraints.push(DatasetFactory.createConstraint("sObs", sObs, sObs, ConstraintType.MUST));
	constraints.push(DatasetFactory.createConstraint("sUser", sUser, sUser, ConstraintType.MUST));
	constraints.push(DatasetFactory.createConstraint("cdCajuri", cdCajuri, cdCajuri, ConstraintType.MUST));
	constraints.push(DatasetFactory.createConstraint("cdFilialNS7", cdFilialNS7, cdFilialNS7, ConstraintType.MUST));
		
	try{
		response = DatasetFactory.getDataset("dsEnceAssJurSIGAJURI", null, constraints, null);
	}catch(e){
		log.error("** encerraAssJurSIGAJURI: Falha ao buscar dataset.");
		log.error("** encerraAssJurSIGAJURI: ERRO: " + e.message);
	}
	
	if (response){
		var retorno = response.getValue(0, "retorno");
		
		if (String(retorno) == "true"){
			return true;
		} else {
			log.error("*** encerraAssJurSIGAJURI: ERRO: retorno falso do SIGAJURI ");
			return false;
		}
	}	else{
		log.error("** encerraAssJurSIGAJURI: Response false ");
	}
	
	return false;
}