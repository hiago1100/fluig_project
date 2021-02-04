function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	var newdataset = DatasetBuilder.newDataset();
	var cSaldo;
	var numTitulo;
	var aRetorno;
	var dsDadosForm;
	var centroCusto;
	var cFornecedor;
	var cValSolicitado;
	var cValidSete;
	var cValidSessenta;
	var cDtsolicitacao;
	var cDtNecessidade;
	var consfornecedor = "";
	var consCentroCusto = "";
	var consDataNecessidade = "";
	var numeroSolicitacao;
	var motivo;
	var aprovador;
	var aprovaSplit;

	log.info("binoooo");
	
	newdataset.addColumn("Titulo");
	newdataset.addColumn("Numero Fluig");
	newdataset.addColumn("Centro de custo");
	newdataset.addColumn("Fornecedor");
	newdataset.addColumn("Data da solicitação");
	newdataset.addColumn("Necessidade");
	newdataset.addColumn("Solicitado");
	newdataset.addColumn("Saldo a compensar");
	newdataset.addColumn("Sete dias");
	newdataset.addColumn("Sessenta dias");
	newdataset.addColumn("Motivo");
	newdataset.addColumn("1º Aprovador");
	
	try {
		var servico = ServiceManager.getService("ECMDashBoardService").getBean();
		
		var ECMDashBoardServiceService = servico.instantiate("com.totvs.technology.ecm.dm.ws.ECMDashBoardServiceService");
		
		var DashBoardService = ECMDashBoardServiceService.getDashBoardServicePort();
		
		var username     = "44209840823"; 
		var password     = "ccab@123";
		var companyId    = 1; 
		var userId    	 = "Pool:Role:Admin";
		
		var properties = {};
		properties["disable.chunking"] = "true";
		properties["log.soap.messages"] = "true";
		properties["receive.timeout"] = "100000";

		var customClient = servico.getCustomClient(DashBoardService, "com.totvs.technology.ecm.dm.ws.DashBoardService", properties);

		var retorno = customClient.findWorkflowTasks(username,
				password,
				companyId,
				userId);

		log.info("RETORNO >>>>>>>>>>>>>>>>>>>>>>> " + retorno);		
		
		if(constraints != null){
	        for (var i = 0; i < constraints.length; i++) {
	            if (constraints[i].fieldName == "fornecedor") { 
	            	consfornecedor = constraints[i].initialValue; 
	            }else if (constraints[i].fieldName == "centroCusto") { 
	            	consCentroCusto = constraints[i].initialValue; 
	            }else if (constraints[i].fieldName == "dataNecessidade") { 
	            	consDataNecessidade = constraints[i].initialValue; 
	            }
	        }    
	    }

	    log.info("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%" + retorno.getItem().size())
		
		for (x = 0; x < retorno.getItem().size(); x++){

			log.info("##################################### DATASET DO FORM");

			if (retorno.getItem().get(x).getStateId() == '42'){

				log.info("##################################### dados "+ retorno.getItem().get(x).getProcessInstanceId().toString());

				aRetorno = buscaSaldo(retorno.getItem().get(x).getProcessInstanceId().toString());
				
				// log.info("##################################### RETORNO DENTRO IF " +aRetorno);

				

				cSaldo 		= aRetorno[0];
				numTitulo 	= aRetorno[1];

				// if (cSaldo == "" || cSaldo == null) {
				// 	cSaldo = 0;
				// }
				// if (numTitulo == "" || numTitulo == null) {
				// 	numTitulo = 0;
				// }

				log.info("bino");
				dsDadosForm = buscaDadosForm(retorno.getItem().get(x).getProcessInstanceId().toString(), 
						consfornecedor,
						consCentroCusto,
						consDataNecessidade);

			

				
				if (dsDadosForm.rowsCount == 0){
					continue;
				}
				
				centroCusto 	= dsDadosForm.getValue(0, "centrocusto");
				// if (centroCusto == null || centroCusto == "") {
				// 	centroCusto = "";
				// }
				cFornecedor 	= dsDadosForm.getValue(0, "fornecedor");
				// if (cFornecedor == null || cFornecedor == "") {
				// 	cFornecedor = "";
				// }
				cDtsolicitacao 	= "11/05/1992";
				// if (cDtsolicitacao == null || cDtsolicitacao == "") {
				// 	cDtsolicitacao = "";
				// }
				cDtNecessidade 	= "11/05/1992";
				// if (cDtNecessidade == null || cDtNecessidade == "") {
				// 	cDtNecessidade = "";
				// }
				cValSolicitado 	= dsDadosForm.getValue(0, "valor");
				// if (cValSolicitado == null || cValSolicitado == "") {
				// 	cValSolicitado = "";
				// }
				numeroSolicitacao = dsDadosForm.getValue(0, "numeroSolicitacao");
				// if (numeroSolicitacao == null || numeroSolicitacao == "") {
				// 	numeroSolicitacao = "";
				// }
				motivo			= dsDadosForm.getValue(0, "motivo");
				// if (motivo == null || motivo == "") {
				// 	motivo = "";
				// }
				aprovador		= "";

				log.info("##################################### PASSOU OS numTitulo "+ numTitulo);
				log.info("##################################### PASSOU OS cSaldo "+ cSaldo);	
				log.info("##################################### PASSOU OS DADOS "+ centroCusto);
				log.info("##################################### PASSOU OS DADOS "+ cFornecedor);
				log.info("##################################### PASSOU OS DADOS "+ cDtsolicitacao);
				log.info("##################################### PASSOU OS DADOS "+ cDtNecessidade);
				log.info("##################################### PASSOU OS DADOS "+ cValSolicitado);
				log.info("##################################### PASSOU OS DADOS "+ numeroSolicitacao);
				log.info("##################################### PASSOU OS DADOS "+ motivo);
				log.info("##################################### PASSOU OS DADOS "+ aprovador);
	 			

	 		// 		if(aprovador == null || aprovador == ""){
				// 	 var ds_colaborador = consultarColaboradorPorMatricula("44209840823");
	 		// 		 var nomeAprovador = ds_colaborador.getValue(0, "colleagueName");
 	 	// 			 log.info("########################### APROVADOR if 3 "+ nomeAprovador);
	 		// 		}

				log.info(aprovador.length() > 11);
				 if (aprovador.length() > 11) {
					  aprovaSplit = aprovador.split(",");
					  log.info(aprovaSplit[0]);
					  log.info(aprovaSplit[1]);
				 	 var ds_colaborador = consultarColaboradorPorMatricula(aprovaSplit[0]);
	 			     var nomeAprovador = ds_colaborador.getValue(0, "colleagueName");
    // 				 log.info("########################### APROVADOR "+ nomeAprovador);				
				 }else if(aprovador == null || aprovador == ""){
					var nomeAprovador = "";
				 }else{
					var ds_colaborador = consultarColaboradorPorMatricula(aprovador);
	 				 var nomeAprovador = ds_colaborador.getValue(0, "colleagueName");
	 				 log.info("########################### APROVADOR if 2 "+ nomeAprovador);
				 }
				//  if(aprovador.length() > 0 || aprovador.length() <= 11){
					 	
	 				// }
	 				
	 				log.info("##################################### VALIDADO  ");


				if (dsDadosForm.getValue(0, "cpValidSete") == '1'){
					cValidSete = 'Sim';
				}else{
					cValidSete = 'Não';
				}
					log.info("##################################### DADOS FORM 1 OK  ");
				if (dsDadosForm.getValue(0, "cpValidSessenta") == '1'){
					cValidSessenta = 'Sim';
				}else{
					cValidSessenta = 'Não';
				}
					log.info("##################################### DADOS FORM 2 OK  ");
				
				newdataset.addRow(new Array(numTitulo, numeroSolicitacao, centroCusto, cFornecedor, cDtsolicitacao, cDtNecessidade, cValSolicitado, cSaldo, cValidSete, cValidSessenta, motivo, nomeAprovador));
			
			}
		}
		
	} catch (e) {

		var mensagemErro = "Problema na execucao: " + e.message;
		log.error(mensagemErro);	
		log.info("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ "+ new Array(e.message));	
		// newdataset.addRow(new Array(e.message));
	}
	
	return newdataset;
}function onMobileSync(user) {

}

function buscaDadosForm(numeroFluig, fornecedor, centroCusto, dataNecessidade){
	var cConsFluig;
	var constraints;
	var dataset;
	var cTipoCons;
	var cConsFornecedor;
	var cConsCentroCusto;
	var cConsDataNecessidade;
	
	cConsFluig = DatasetFactory.createConstraint("numeroSolicitacao", numeroFluig, numeroFluig, ConstraintType.MUST);

	constraints = new Array(cConsFluig);
	
	if (fornecedor != ''){
		cConsFornecedor = DatasetFactory.createConstraint("codFornecedor", fornecedor, fornecedor, ConstraintType.MUST);
		
		constraints[constraints.length] = cConsFornecedor;
	}
	
	if (centroCusto != ''){
		cConsCentroCusto = DatasetFactory.createConstraint("codCC", centroCusto, centroCusto, ConstraintType.MUST);
		
		constraints[constraints.length] = cConsCentroCusto;
	}
	
	if (dataNecessidade != ''){
		cConsDataNecessidade = DatasetFactory.createConstraint("dtFiltroNecessidade", dataNecessidade, dataNecessidade, ConstraintType.MUST);
		
		constraints[constraints.length] = cConsDataNecessidade;
	}

	dataset = DatasetFactory.getDataset("DSadiantamento", null, constraints, null);

	log.info(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> DAtaset "+dataset)
	
	return dataset;
}

function buscaSaldo(numeroFluig){

	log.info("entrou na function = " + numeroFluig)
    var dataSource = "/jdbc/PRT";
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;
    
    var myQuery = "SELECT E2_SALDO, E2_NUM " +
	"FROM SE2010 WHERE E2_XNUMFLG = '" + numeroFluig + "' " +
	"AND D_E_L_E_T_ = ' ' ";
	 
	try {
		var conn = ds.getConnection();
		var stmt = conn.createStatement();
		var rs = stmt.executeQuery(myQuery);
		var columnCount = rs.getMetaData().getColumnCount();
		while (rs.next()) {
		    var Arr = new Array();

	        var obj = rs.getObject(rs.getMetaData().getColumnName(1));
	        if (null != obj) {
	        	log.info("OLHA O RETORNO DO PROTHEUS"+ [rs.getObject(rs.getMetaData().getColumnName(1)).toString(), rs.getObject(rs.getMetaData().getColumnName(2)).toString()]);
	        	return [rs.getObject(rs.getMetaData().getColumnName(1)).toString(), rs.getObject(rs.getMetaData().getColumnName(2)).toString()];
	        } else {
	            return "null";
	        }

		    
		}
	} catch (e) {
		log.error("ERRO==============> " + e.message);
		} finally {
		if (stmt != null) {
		    stmt.close();
		}
		if (conn != null) {
		    conn.close();
		}
	}
}

function trataData(cData){
	var cDataTrata;
	cDataTrata = cData.substring(8, 10);
	cDataTrata += "/";
	cDataTrata += cData.substring(5, 7);
	cDataTrata += "/";
	cDataTrata += cData.substring(0, 4);
	return cDataTrata;
}

function consultarColaboradorPorMatricula(matricula) {
	var filtro = DatasetFactory.createConstraint("colleaguePK.colleagueId", matricula, matricula, ConstraintType.MUST);
	var dsColaborador = DatasetFactory.getDataset("colleague", null, [filtro], null);
	return dsColaborador;
}