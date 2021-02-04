function servicetask41(attempt, message) {
	var newPrincp = hAPI.getCardValue("codNewPrincpAtivo");
	var newPreProd = hAPI.getCardValue("codNewPreProd");

	if(newPrincp == 'Sim'){
		var codigoPrincip = hAPI.getCardValue("codigo_princpAtiv");
		var descPrincip = hAPI.getCardValue("desc_principAtiv");
		var condPrincip = true;
	}else{
		var codigoPrincip = hAPI.getCardValue("codPrincpAtivo_produto");
		var descPrincip = "";
		var condPrincip = false;
	}

	if(newPreProd == 'Sim'){
		var codigoPreProd = hAPI.getCardValue("codigo_preproduto");
		var descPreProd = hAPI.getCardValue("desc_preproduto");
		var condPreProd = true;
	}else{
		var codigoPreProd = hAPI.getCardValue("codPreProd_produto");
		if(codigoPreProd){
			codigoPreProd = codigoPreProd.trim();
		}
		var descPreProd = "";
		var condPreProd = false;
	}


	// ======================================================================
	try{
		log.info("################# ESTRUTURA DE INTEGRAÇÃO #################");
		
		var dados = "{";
		dados +=	'"companyId" : "'+ getValue('WKCompany') + ''+'" ,';
		dados +=	'"serviceCode" :'+ '"RESTPROTHEUS"'+'  ,';
		dados +=	'"endpoint" :' + '"/produtos"' + '  ,';
		dados +=	'"method":'+'"post'+ '"  ,';
		dados +=	'"params" :{';				
		dados +=	'"codigo"' + ': "' + 		hAPI.getCardValue('codigo_produto') + '"  ,';
		dados +=	'"descricao"' + ': "' +		hAPI.getCardValue('desc_produto') + '"  ,';
		dados +=	'"tipo"'+ ': "' + 			hAPI.getCardValue('codTipo_produto') + '"  ,';
		dados +=    '"armazem"' + ': "' + 		hAPI.getCardValue('codArmazem_produto')+ '"  ,';
		dados +=	'"grupo"' + ': "' +			hAPI.getCardValue('codGrupo_produto')+ '"  ,';
		dados +=	'"formulacao"' + ': "' + 	hAPI.getCardValue('codFormula_produto')+ '"  ,';
		dados +=	'"classe"' + ': "' +		hAPI.getCardValue('codClasse_produto') + '"  ,';
		dados +=    '"uniMed"'+ ': "' +			hAPI.getCardValue('codUniMed_produto') + '"  ,';
		dados +=    '"segUniMed"'+ ': "' + 		hAPI.getCardValue('codSegUniMed_produto') + '"  ,';
		dados +=    '"concentracao"' + ': "' + 	hAPI.getCardValue('concentracao_produto') + '"  ,';
		dados +=    '"fabricante"'+ ': "' + 	hAPI.getCardValue('fabric_produto') + '"  ,';
		dados +=    '"registrante"' + ': "' + 	hAPI.getCardValue('registrante_produto') + '"  ,';
		dados +=    '"bloqueio"' + ': "' + 		hAPI.getCardValue('codBloq_produto') + '"  ,';
		dados +=    '"infComp"' + ': "' 	+ 	hAPI.getCardValue('infoComp_produto') + '"  ,';
		dados +=    '"pesoLiq"' + ': "' + 		hAPI.getCardValue('pesoLiq_produto') + '"  ,';
		dados +=	'"pesoBru"' + ': "' 	+	hAPI.getCardValue('pesoBrut_produto') + '"  ,';
		dados +=    '"fatConver"' + ': "' +		hAPI.getCardValue('fatorConver_produto') + '"  ,';
		dados +=    '"tipConver"'+ ': "' + 		hAPI.getCardValue('codTipoConver_produto') + '"  ,';
		dados +=    '"rastro"' + ': "' + 		hAPI.getCardValue('codRastro_produto') + '"  ,'; 
		dados +=    '"ncm"'+ ': "' 	+ 			hAPI.getCardValue('codNcm_produto') + '"  ,';
		dados +=    '"prodImp"'+ ': "' + 		hAPI.getCardValue('codImport_produto') + '"  ,';
		dados +=    '"prodInd"'+ ': "' + 		hAPI.getCardValue('codIndus_produto')+ '"  ,';
		dados +=    '"quantEmb"' + ': "' + 		hAPI.getCardValue('qtdEmb_produto')+ '"  ,';
		dados +=    '"quantEmb2"'+ ': "' + 		hAPI.getCardValue('qtdEmb2_produto')+ '"  ,';
		dados +=    '"emb"' + ': "' 		+	hAPI.getCardValue('embalagem_produto')+ '"  ,';
		dados +=    '"princAtivo"'+ ":" + "{";
		dados +=	'"cadPrincpAtivo"' + ': ' +	condPrincip + ',';
		dados +=    '"codigo"' + ': "' 		+	codigoPrincip.trim() + '"  ,';
		dados +=    '"descricao"' + ': "' 	+	descPrincip + '"';
		dados +=    '},';
		dados +=     '"preProd"'+ ': {';
		dados +=       '"cadPreProd"' + ': ' +	condPreProd + '  ,';
		dados +=       '"codigo"' + ': "' +	codigoPreProd	 + '"  ,';
		dados +=       '"descricao"'+ ': "' + 	descPreProd + '"';
		dados +=     "},";
		dados +=    '"contaContab"' + ': "' + 	hAPI.getCardValue('codContaContb_produto') + '",';
		dados +=    '"itemContab"' + ': "' +	hAPI.getCardValue('codItemContb_produto') + '"  ,';
		dados +=    '"ccusto"' + ': "' +		hAPI.getCardValue('ccusto_produto')+ '" ,';
		dados +=    '"ativoContab"'+ ': "' +	hAPI.getCardValue('codAtivo_produto')+ '"  ,';
		dados +=    '"origem"' + ': "' 		+	hAPI.getCardValue('codOrigem_produto')+ '"  ,';
		dados +=    '"grupTrib"' + ': "' + 		hAPI.getCardValue('codGrupTrib_produto') + '"  ,';
		dados +=    '"codTribMun"' + ': "' + 	hAPI.getCardValue('codTribMunic_produto') + '"  ,';
		dados +=    '"impRend"' + ': "' + 		hAPI.getCardValue('codImpostRenda_produto') + '"  ,';
		dados +=    '"foraEst"' + ': "' +		hAPI.getCardValue('codForaEstado_produto') + '"  ,';
		dados +=    '"classFisc"'+ ': "' + 		hAPI.getCardValue('classeFiscal_produto')+ '"  ,';
		dados +=    '"percCsll"' + ': "' +		hAPI.getCardValue('percSll_produto')+ '",';
		dados +=    '"percConf"'+ ': "' +		hAPI.getCardValue('percCofins_produto')+ '"  ,';
		dados +=	'"percPis"' + ': "' +		hAPI.getCardValue('percPis_produto') + '"  ,';
		dados +=    '"aliqIcms"'+ ': "' +		hAPI.getCardValue('alqIcms_produto') + '"  ,';
		dados +=    '"aliqIpi"'+ ': "' +		hAPI.getCardValue('alqIpi_produto')+ '"  ,';
		dados +=    '"aliqIss"' + ': "' +		hAPI.getCardValue('alqIss_produto')+ '"  ,';
		dados +=	'"codServIss"' + ': "' +	hAPI.getCardValue('codServIss_produto') + '"  ,';
		dados +=    '"formRetIss"' + ': "' +	hAPI.getCardValue('codfRetInss_produto') + '"  ,';
		dados +=    '"percRedInss"' + ': "' +	hAPI.getCardValue('redInss_produto') + '"  ,';
		dados +=    '"percRedIrrf"' + ': "' +	hAPI.getCardValue('redIrrf_produto') + ' ",';
		dados +=    '"percRedPis"' + ': "' +	hAPI.getCardValue('redPid_produto') + '"  ,';
		dados +=    '"percRedConf"' + ': "' +	hAPI.getCardValue('redCof_produto') + '"  ,';
		dados +=    '"calcInss"' + ': "' + 		hAPI.getCardValue('codCalcInss_produto') + '"  ,';
		dados +=    '"espTipi"' + ': "'	+		hAPI.getCardValue('espTipi_produto') + '" ,';
		dados +=    '"exNcm"' + ': "' +			hAPI.getCardValue('codExNcm_produto') + '"  ,';
		dados +=    '"tePadrao"' + ': "' +		hAPI.getCardValue('tePadrao_produto') + '"  ,';
		dados +=    '"tsPadrao"' + ': "' +		hAPI.getCardValue('tsPadrao_produto') + '",';
		dados +=    '"retemPis"' + ': "'	+	hAPI.getCardValue('codRetemPis_produto')+ '",';
		dados +=    '"retemConf"' + ': "' +		hAPI.getCardValue('codRetemConfins_produto') + '"  ,';
		dados +=    '"retemCsll"'+ ': "' +		hAPI.getCardValue('codRetemCsll_produto')+ '"  ,';
		dados +=    '"cnae"'+ ': "' +			hAPI.getCardValue('cnae_produto') + '"  ,';
		dados +=    '"credIcms"' + ': "' +		hAPI.getCardValue('codCreditoIcms_produto') + '"  ,';
		dados +=    '"tabNatRec"' + ': "' +		hAPI.getCardValue('codTabNatRec_produto') + '"  ,';
		dados +=    '"sitTrib"' + ': "' +		hAPI.getCardValue('sitTrib_produto') + '"  ,';
		dados +=    '"retornoOp"' + ': "' +		hAPI.getCardValue('codRetornoOp_produto') + '"  ,';
		dados +=    '"rastroAtivo"' + ': "' +	hAPI.getCardValue('codRastroAtivo_produto') + '" ,';
		dados +=    '"descricao_complementar"' + ': "' +	hAPI.getCardValue('descricao_produto') + '"';
		dados +='}';			
		dados +='}'; 
		
		log.info(dados);
		log.info('############## FIM ESTRUTURA DE INTEGRAÇÃO ################');

		var c1 = DatasetFactory.createConstraint('retorno', dados, dados, ConstraintType.MUST);		
		var constraints = new Array(c1);
		var dataset = DatasetFactory.getDataset("ds_cadastraProduto", new Array(), constraints, new Array());		
		var vo = dataset.getValue(0, "retorno");
		
		var o = vo.toString();
		o = o.split("");

		log.info('######################## RETORNO ###############################');		
		log.info(vo);
		log.info('######################## FIM RETORNO ###########################');
		
		var n = vo.indexOf("error");
		var n2 = vo.indexOf("jboss");
		var n3 = vo.indexOf("Exception");
		if ((n >=  0) || (n2 >= 0) || (n3 >= 0)) {
			if(o[0] == "{"){
				var obj = JSON.parse(vo);
				if (obj.hasOwnProperty('errorMessage')) {
					throw obj['errorMessage'];
				}
			}
			else{
				throw vo;
			}
			
		}
		
		if(vo == null || vo.isEmpty()){			
			throw ('Erro ao realizar integração - Retorno nulo, tente Novamente.');
		}

		// return true;
		        
	}catch(e){
		
		var o = e.toString();
		o = o.split("");

		if(o[0] == "{"){
			var obj = JSON.parse(e);
			
			if (obj.hasOwnProperty('errorMessage')) {
				throw obj['errorMessage'];
			}					
			else{
				throw (e);	
			}
		}
		else{
			throw (e);
		}
	}
}


  
