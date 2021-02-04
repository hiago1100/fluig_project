function beforeStateEntry(sequenceId){
var ABRIR = 2;
var step  = parseInt(getValue("WKCurrentState"));

	log.info("*** beforeStateEntry Contrato: Inicio.");
	try{

		switch(step){
			case ABRIR:			
				log.info("*** beforeStateEntry Contrato: Inicio Abrir.");

				hAPI.setCardValue("sStepDestinoConc","6");
				hAPI.setCardValue("sStepDestinoCanc","21");
				hAPI.setCardValue("sRevisaDoc","2");
				
				log.info("*** beforeStateEntry Contrato: Configura o Responsavel pela tarefa.");
				if (setInfoConfig()){
					log.info("*** ContratoResp: Advogado:" + hAPI.getCardValue("sAdvogado"));			
					log.info("*** ContratoResp: Data Prazo:" + hAPI.getCardValue("dtPrazoTarefa"));
				}else{
					log.error("*** beforeStateEntry Contrato: Não foi possível determinar o responsável pelo contrato");
					throw "Não foi possível determinar o responsável pelo contrato";
				}
				break;
			
			default:
				break;
		}
	}catch(e){
		log.error("*** beforeStateEntry Contrato: ERROR: " + e.message);
		log.info("*** beforeStateEntry Contrato: Fim.");
		throw "Não foi possível determinar o responsável pelo contrato";
	}
	log.info("*** beforeStateEntry Contrato: Fim.");
}

function setInfoConfig(){	
var cdTipoCon      = hAPI.getCardValue("cdTipoCon");
var configs        = null;
var nPerc          = 0; //porcentagem de atribuição do usuário
var cdUser         = 0;
var sUser          = 0;
var lRet           = false;
var sPrazo         = 0;
var nMenor         = 9999;
var nMenorAux      = 9999;
var idMenor        = -1;
var idMenorAux     = -1;
var qtdSol         = -1;
var qtdUser        = 0;
var fields         = new Array("metadata#id", "sPrioridade","cdAssJur", "sPrazo", "cdUser", "sUser", "cdTipoCon", "cdGrupo", "sGrupo");
var constraints    = new Array();
var order          = new Array("sPrioridade");
var lGrupo         = false;
var cdResponsavel;
var sResponsavel;
var cdAssJur;

	constraints.push(DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST));
	constraints.push(DatasetFactory.createConstraint("cdTipoCon", cdTipoCon, cdTipoCon, ConstraintType.MUST));
	
	try {
		configs = DatasetFactory.getDataset("wcmSIGAJURI_Contratos", fields, constraints, order);
	}catch(e){
		log.error("*** beforeStateEntry ContratoResp: Falha ao buscar dataset.");
		log.error("*** beforeStateEntry ContratoResp: ERRO: " + e.message);
	}

	if (!configs || configs.rowsCount <= 0){
		log.info("*** beforeStateEntry ContratoResp: Nenhuma configuração. encontrada. Não irá para o FLUIG.");
		throw "Nenhuma configuração encontrada. Solicitação não poderá ser gegistrada no FLUIG.";
		return false;
	}

	log.info("*** ContratoResp: Processando dados encontrados: " + configs.rowsCount);

	for (var i = 0; i < configs.rowsCount; i++){
		log.info("*** beforeStateEntry ContratoResp: Avaliando " + configs.getValue(i, "cdTipoCon"));

		//definição da prioridade
		if (configs.rowsCount==1){
			nPerc = 10;
		}else{
			nPerc = Number(configs.getValue(i, "sPrioridade"));
		}

		//se o campo está igual a 10, deve receber todas as solicitações.
		if (nPerc == 10){
			idMenor = i;   
			lRet = true;
			break; //sai do loop 
		}else{
			//pega a quantidade de solicitações ativas para determinado tipo de solicitação
			if (qtdSol==-1){
				qtdSol = getCardsBySol(configs.getValue(i, "cdTipoCon"));
			}

			cdResponsavel = configs.getValue(i,"cdUser");
			sResponsavel  = configs.getValue(i,"sUser");

			if ((cdResponsavel == null) || (cdResponsavel == '')){
				cdResponsavel =  configs.getValue(i,"cdGrupo");
				sResponsavel = configs.getValue(i,"sGrupo");
			}

			qtdUser = getCardsByUser(configs.getValue(i, "cdTipoCon"),cdResponsavel);

			log.info("*** beforeStateEntry ContratoResp: qtdSol " + qtdSol);
			log.info("*** beforeStateEntry ContratoResp: qtdUser " + qtdUser);
			log.info("*** beforeStateEntry ContratoResp: valida menor (qtdUser < nMenorAux):(" + qtdUser + " < " + nMenorAux);

			//preenche o menor, independete se for elegível ou não.
			if (qtdUser < nMenorAux){
				nMenorAux = qtdUser;
				idMenorAux = i;
			}

			log.info("*** beforeStateEntry ContratoResp idMenorAux:" + idMenorAux);
			log.info("*** beforeStateEntry ContratoResp: (((qtdSol/10)*nPerc) ) = " +((qtdSol/10)*nPerc));
			
			//valida se o usuário deve receber a tarefa atual, baseado no campo prioridade

			if ((qtdUser < ((qtdSol/10)*nPerc)) || qtdUser == 0 || ((qtdSol/10)*nPerc) < 1 ){

				if (qtdUser < nMenor){
					nMenor = qtdUser;
					idMenor = i;
				}
				
				lRet = true;
			}
		}
	}
	
	log.info("*** beforeStateEntry Contrato: Fim laço: lRet =" + lRet + ", idMenorAux=" + idMenorAux);

	if ((lRet==false) && (idMenorAux > -1)){
		lRet = true;
		idMenor = idMenorAux;
		nMenor = nMenorAux;
	}

	//Usuário válido como executor

	if (lRet){
		log.info("*** beforeStateEntry ContratoResp: menor = " + idMenor + ", qtd:" + nMenor );        
		
		cdResponsavel = configs.getValue(idMenor, "cdUser");
		sResponsavel = configs.getValue(idMenor, "sUser");
		
		if ((cdResponsavel == null) || (cdResponsavel == '')){
			sResponsavel  = configs.getValue(idMenor,"sGrupo");
			cdResponsavel = configs.getValue(idMenor,"cdGrupo");
			lGrupo        = true;
		}
		
		log.info("*** beforeStateEntry ContratoResp: cdResponsavel = " + cdResponsavel + ", sResponsavel:" + sResponsavel + ", lGrupo:" + lGrupo);
		
		sPrazo = configs.getValue(idMenor, "sPrazo");
		cdAssJur = configs.getValue(idMenor, "cdAssJur");
		
		if (!lGrupo){
			hAPI.setCardValue("cdAdvogado",getColleagueIdByMail(cdResponsavel));
			hAPI.setCardValue("sMailAdvogado",getMailByUserId(cdResponsavel));
		} else {
			hAPI.setCardValue("cdAdvogado","Pool:Group:" + cdResponsavel);
			hAPI.setCardValue("sMailAdvogado",cdResponsavel);
		}

		hAPI.setCardValue("sAdvogado",sResponsavel);
		hAPI.setCardValue("cdAssJur",cdAssJur);
		
		hAPI.setCardValue("dtPrazoTarefa", getCurrentDate(Number(sPrazo)));
	}

	return lRet;
	
}
