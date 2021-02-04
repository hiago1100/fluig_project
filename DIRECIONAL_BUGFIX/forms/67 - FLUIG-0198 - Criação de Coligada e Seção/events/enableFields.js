function enableFields(form){
	
	log.info("Fim do EnableFields do formulário FLUIG-0198-Criacao de coligada e secao");
	
	var atividade = parseInt(getValue("WKNumState"));	
	
	var Campos = new Array(
		//INICIO E CORRECAO
		{"campo" : "cpTpMatricula","atividade" : "0,4,10"},
		{"campo" : "cpObraDepartamento","atividade" : "0,4,10"},
		{"campo" : "cpNumEmpresa","atividade" : "0,4,10"},
		{"campo" : "cpEmpresa","atividade" : "0,4,10"},
		{"campo" : "cpDescNewCol","atividade" : "0,4,10"},
		{"campo" : "cpLogradouro","atividade" : "0,4,10"},
		{"campo" : "cpBairro","atividade" : "0,4,10"},
		{"campo" : "cpCidade","atividade" : "0,4,10"},
		{"campo" : "cpEstado","atividade" : "0,4,10"},
		{"campo" : "cpCep","atividade" : "0,4,10"},
		{"campo" : "cpTelefone","atividade" : "0,4,10"},
		{"campo" : "cpEmail","atividade" : "0,4,10"}, 
		{"campo" : "cpLogradouroCorres","atividade" : "0,4,10"},
		{"campo" : "cpBairroCorres","atividade" : "0,4,10"},
		{"campo" : "cpCidadeCorres","atividade" : "0,4,10"},
		{"campo" : "cpEstadoCorres","atividade" : "0,4,10"},
		{"campo" : "cpCEPCorres","atividade" : "0,4,10"},
		{"campo" : "cpTelefoneCorres","atividade" : "0,4,10"},
		{"campo" : "cpEmailCorres","atividade" : "0,4,10"},
		{"campo" : "cpVinResp","atividade" : "0,4,10"},
		{"campo" : "cpVinGov","atividade" : "0,4,10"},
		{"campo" : "cpFPAS","atividade" : "0,4,10"},
		{"campo" : "cpCNAE","atividade" : "0,4,10"},
		{"campo" : "cpNatJur","atividade" : "0,4,10"},
		{"campo" : "cpARTCREA","atividade" : "0,4,10"},
		{"campo" : "cpLocal","atividade" : "0,4,10"}, 
		{"campo" : "cpAlvara","atividade" : "0,4,10"},
		{"campo" : "cpDtInicio","atividade" : "0,4,10"},
		{"campo" : "cpPreFabr2","atividade" : "0,4,10"}, 
		{"campo" : "cpTPObra2","atividade" : "0,4,10"},
		{"campo" : "cpUsoObra","atividade" : "0,4,10"},
		{"campo" : "cpQtdUNi","atividade" : "0,4,10"},
		{"campo" : "cpQtdPavi","atividade" : "0,4,10"},
		{"campo" : "cpQtdUNi2","atividade" : "0,4,10"},
		{"campo" : "cpQtdUNi3","atividade" : "0,4,10"},
		{"campo" : "cpDemTipo","atividade" : "0,4,10"},
		{"campo" : "cpAreaDemo","atividade" : "0,4,10"},
		{"campo" : "cpTipDemo","atividade" : "0,4,10"},
		{"campo" : "cpUsoDem","atividade" : "0,4,10"},
		{"campo" : "cpQtdUNiDem","atividade" : "0,4,10"},
		{"campo" : "cpQtdPaviDem","atividade" : "0,4,10"},
		{"campo" : "cpQtdUNi2DEM","atividade" : "0,4,10"},
		{"campo" : "cpQtdUNi3Dem","atividade" : "0,4,10"},
		{"campo" : "cpAreaAcresc","atividade" : "0,4,10"},
		{"campo" : "cpAreaAcrescRes","atividade" : "0,4,10"},
		{"campo" : "cpDescColigada","atividade" : "0,4,10"},
		{"campo" : "cpNumColigada","atividade" : "0,4,10"},
		{"campo" : "cpTipodeSecao","atividade" : "0,4,10"}, 
		{"campo" : "cpINfObrDes","atividade" : "0,4,10"}, 
		{"campo" : "cpObsINfObra","atividade" : "0,4,10"},
		{"campo" : "cpDtContrat","atividade" : "0,4,10"},
		{"campo" : "cpEmprParceira","atividade" : "0,4,10"},
		{"campo" : "cpObraParceira","atividade" : "0,4,10"},
		{"campo" : "chkDemolicaoConstr","atividade" : "0,4,10"}, 
		{"campo" : "cpNumero","atividade" : "0,4,10"}, 
		{"campo" : "cpComple","atividade" : "0,4,10"}, 
		{"campo" : "cpNumeroCorres","atividade" : "0,4,10"}, 
		{"campo" : "cpCompleCorres","atividade" : "0,4,10"}, 
		{"campo" : "cpNumNewCol","atividade" : "0,4,10"},
		{"campo" : "chkEmpresa","atividade" : "0,4,10"},
		{"campo" : "chkObra","atividade" : "0,4,10"},
		/*{"campo" : "cpObsPrevCont","atividade" : "0,4,10"}, */
		//REABERTURA
		{"campo" : "cpAprovacaoSolicitante","atividade" : "10"},
		{"campo" : "cpParecerAprovacaoSolicitante","atividade" : "10"}, 
		//APROV ACOMPANHAMENTO OBRA
		{"campo" : "cpAprovarAcomObra","atividade" : "5"},
		{"campo" : "cpParecerAcompObra","atividade" : "5"},
		//APROV ADM PESSOAL
		{"campo" : "cpAprovarAdmPessoal","atividade" : "21"},
		{"campo" : "cpNumCei","atividade" : "21"},
		{"campo" : "cpParecerAdmPessoal","atividade" : "21"},
		//APROV CONTROLE
		{"campo" : "cpAprovarControle","atividade" : "37"},
		{"campo" : "cpEmpreCodUau","atividade" : "37"},
		{"campo" : "cpCodObraUau","atividade" : "37"},
		{"campo" : "cpCCContabil","atividade" : "37"},
		{"campo" : "cpParecerControle","atividade" : "37"},
		{"campo" : "cpOrcaControle","atividade" : "37"}, 
		{"campo" : "cpFolhaDeson","atividade" : "37"}, 
		{"campo" : "cpTpMaoObra","atividade" : "37"}, 
		//APROV PLANEJAMENTO
		{"campo" : "cpAprovarPLanejamento","atividade" : "47"},
		{"campo" : "cpEmpreCodUauPLan","atividade" : "47"},
		{"campo" : "cpCodObraUauPlan","atividade" : "47"},
		{"campo" : "cpAprovarPLanOrc","atividade" : "47"},
		{"campo" : "cpTpMaoObraPLa","atividade" : "47"}, 
		{"campo" : "cpParecerPLanejamento","atividade" : "47"},
		
		//APROV TESOURARIA
		{"campo" : "cpAprovarTes","atividade" : "49"},
		{"campo" : "cpContaLib","atividade" : "49"},
		{"campo" : "cpBanco","atividade" : "49"},
		{"campo" : "cpAgencia","atividade" : "49"},
		{"campo" : "cpContCorrente","atividade" : "49"},
		{"campo" : "cpNumConv","atividade" : "49"},
		{"campo" : "cpParecerTesouraria","atividade" : "49"},
		{"campo" : "cpPagtoProv","atividade" : "49"}, 
		//APROV TI
		{"campo" : "cpAprovarTI","atividade" : "51"},
		{"campo" : "cpDescColi","atividade" : "51"},
		{"campo" : "cpNumcoligadaTI","atividade" : "51"},
		{"campo" : "cpParecerTI","atividade" : "51"},
		//APROV BENEFICIOS
		{"campo" : "cpAprovarBen","atividade" : "56"},
		{"campo" : "cpNumInsc","atividade" : "56"},
		{"campo" : "cpDadAcesso","atividade" : "56"},
		{"campo" : "cpParecerBeneficios","atividade" : "56"},
		{"campo" : "cpContForn","atividade" : "56"}, 
		//APROV FOLHA
		{"campo" : "cpAprovarFolha","atividade" : "70"},
		{"campo" : "cpParecerFolha","atividade" : "70"},
		//APROV CORRECAO
		{"campo" : "cpNomCorre","atividade" : "115"},
		{"campo" : "cpDtCorrecao","atividade" : "115"},
		{"campo" : "cpParCorrePara","atividade" : "115"},
		//APROV SOLICITANTE
		{"campo" : "cpAprovarSolicitante","atividade" : "133"},
		{"campo" : "cpParecerSolicitante","atividade" : "133"},
		{"campo" : "cpAprovarAvaliacao","atividade" : "133"},
		{"campo" : "cpParecerAvaliacao","atividade" : "133"},
		//APROV AJUSTE
		{"campo" : "cpAprovarAjuste","atividade" : "165"},
		{"campo" : "cpParecerAjuste","atividade" : "165"},
		//APROV CSC
		{"campo" : "cpAprovarCSC","atividade" : "175"},
		{"campo" : "cpParecerCSC","atividade" : "175"},
		//HIERARQUIA RH 
		{"campo" : "cpAprovHieRH","atividade" : "195"},
		{"campo" : "cpParecerHieRH","atividade" : "195"},
		//Acompanhamento de Abertura de Conta
		{"campo" : "cpContaLib2","atividade" : "213"},
		{"campo" : "cpBanco2","atividade" : "213"},
		{"campo" : "cpAgencia2","atividade" : "213"},
		{"campo" : "cpContCorrente2","atividade" : "213"},
		{"campo" : "cpNumConv2","atividade" : "213"},
		{"campo" : "cpParecerTesouraria2","atividade" : "213"},
		
		//Emissao do Comunicado de Inicio de Obra
		{"campo" : "cpAprovacaoEmissaoComunicado","atividade" : "223"},
		{"campo" : "cpParecerEmissaoComunicado","atividade" : "223"},

		//Vinculação de tabela salarial
		{"campo" : "cpAprovarVinculacao","atividade" : "247"},
		{"campo" : "cpParecerVinculacao","atividade" : "247"}
	);	

	 var listaPaiFilho = [
	        ['tbDadosdoSecao', ['cpConsultHierRH'], [20, 18, 195]],
	        ['cpCodColigada','cpRespoFolha', 'cpSecaoFolha', 'cpCodSecaFolha'], [70]
	    ];
	
	for (var item in Campos){
		var Campo = Campos[item],
			atividades = Campo["atividade"].split(",");
		
		if(atividades.indexOf(atividade.toString()) >= 0){
			form.setEnabled(Campo["campo"],true);
			
		} else {
			form.setEnabled(Campo["campo"],false);
		}
	}

	log.info("Fim do EnableFields do formulário FLUIG-0198-Criacao de coligada e secao");

}