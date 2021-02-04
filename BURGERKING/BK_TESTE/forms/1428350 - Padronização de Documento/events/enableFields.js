function enableFields(form) {
	var atual = getValue("WKNumState");

	// Atividades
	var inicio = 7;
	var criar_revisar_doc = "14";
	var aprovar_gestor = 8;
	var realizar_consenso = 22;
	var validar_conteudo = 29;
	var validar_gestao = 31;
	var aprovar_diretoria = 43;
	var cria_treinamento = 18;
	var modo = form.getFormMode();

	log.info("### modo: " + modo);
	var insUpt = ((modo == "ADD") || (modo == "MOD"));
	log.info("### insUpt: " + insUpt);

	if (insUpt){

		var status			 = false;
		var aprovGestor		 = false;
		var aprovConsenso 	 = false;
		var aprovOperecional = false;
		var aprovGestao		 = false;
		var aprovDiretoria	 = false;

		if (atual == 0 || atual == inicio){

			// solicitante
			status = true;		
		
		 } //else if (atual == aprovar_gestor) {
			
		// 	aprovGestor = true;

		// } else if (atual == realizar_consenso) {
			
		// 	aprovConsenso = true;

		// } else if (atual == validar_conteudo) {

		// 	aprovOperecional = true;

		// } else if (atual == validar_gestao) {

		// 	aprovGestao = true;

		// } else if (atual == aprovar_diretoria) {

		// 	aprovDiretoria = true;
		
		// }

		//form.setEnabled("op_cfg_tipo", status);
		//form.setEnabled("radio_comunica_bk", status);
		// form.setEnabled("op_cfg_aprov_gestor", aprovGestor);
		// form.setEnabled("op_consense", aprovConsenso);
		// form.setEnabled("op_cfg_aprov_conteudo", aprovOperecional);
		// form.setEnabled("aprovacao_gestao", aprovGestao);
		// form.setEnabled("aprovacao_diretoria", aprovDiretoria);
	}

	if (atual != criar_revisar_doc) {
		var tbs = [ 'tb_reg_ocorr', 'tb_revisao' ];

		for (var a = 0; a < tbs.length; a++) {
			var indexes = form.getChildrenIndexes(tbs[a]);
			var cmp = [];
			if (tbs[a] == 'tb_reg_ocorr') {
				cmp = [ 'txt_nome_arquivo', 'txt_local_arm', 'txt_quem_acessa',
						'txt_qual_inform', 'txt_periodo_retencao',
						'txt_apos_expira', 'txt_cargo_elaborado']; //'txt_cargo_elaborado'
			} else {
				cmp = [ 'txt_revisao', 'dt_data_revisao', 'txt_desc_revisao' ];
			}

			for (var i = 0; i < indexes.length; i++) {
				for (var b = 0; b < cmp.length; b++) {
					form.setEnabled(cmp[b] + "___" + indexes[i], false);
				}
			}
		}
		
		
	}else
	{
		form.setEnabled('txt_cargo_aprovado', false);

		if(form.getValue("op_cfg_tipo")=="revisao"){
			
			// Deixa todos os outros campos da tabela paixfilho "tb_revisao" não editáveis
			var indexes = form.getChildrenIndexes("tb_revisao");
			console.log("indexers = "+indexes.length)

			for (var i = 0; i < indexes.length; i++) {
				var cmp = [ 'txt_revisao', 'dt_data_revisao', 'txt_desc_revisao'];
				for (var a = 0; a < cmp.length; a++) {
					form.setEnabled(cmp[a] + "___" + indexes[i], false);
				}
				console.log(indexes[i])
			}
//			form.wdkAddChild('tb_revisao');
			
			var dt = new Date();
			var dia = dt.getDate();
			var mes = dt.getMonth() + 1;
			var ano = dt.getFullYear();

			if ( dia < 10 )
			{
			  dia = "0" + dia.toString();
			}

			if ( mes < 10 )
			{
			  mes = "0" + mes.toString();
			}
			
//			form.setValue("dt_data_revisao___"+indexes.length, dia + "/" + mes + "/" + ano)
		}
	}
}