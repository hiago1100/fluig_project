// function displayFields(form,customHTML)
// {
// 	customHTML.append('<script type="text/javascript">'+
// 		'$(document).ready(function(){');
	
// 	// Habilita os campos para o modo input
// 	// duraten a visualizacao
// 	form.setShowDisabledFields(true);
	
// 	// Coleta atividade atual
// 	var atual 			= getValue("WKNumState");
// 	var usuario 		= getValue("WKUser");
// 	var id_form 		= form.getCardIndex();
// 	var id_proc 	    = getValue("WKNumProces");
// 	var nomeSolicitante = fluigAPI.getUserService().getCurrent().getFullName();
	
// 	console.log("Atividade atual "+ atual)

// 	// Array de bloqueio
// 	var bloqueioZoom = [];
// 	var naoeditaveis = [];
// 	var bloqueiaCombo = [];
// 	var esconder = [];
// 	var bloqueio_check = [];
// 	var desc_chec = [];
// 	var Bloqueia_radio = [];

// 	// Atividades
// 	var inicio = "7";
// 	var criar_revisar_doc = "14";
// 	var aprovar_gestor = "8";
// 	var realizar_consenso = "22";
// 	var validar_conteudo = "29";
// 	var validar_gestao = "31";
// 	var aprovar_diretoria = "43";
// 	var cria_treinamento = "18";
// 	var concluido = "20";
	
// 	// Verifica se o formulario esta no modo de visualizacao
// 	if(form.getFormMode() == "VIEW")
// 	{
// 		bloqueioZoom.push("btn_tb_reg_ocorr","btn_tb_revisao");
// 	}
// 	naoeditaveis.push("txt_cfg_area","txt_cfg_consenso","txt_cfg_codigo_docto","txt_codigo","txt_area_resp","txt_validade",
// 			"txt_nome_elaborado","txt_nome_aprovado","dt_data_elaborado","dt_data_aprovado");
	
// 	/**
// 	 * Campos para atividade
// 	 * Inicio
// 	 */
// 	// Atribui as informacoes de inicializacao do processo
// 	if (atual == 0 || atual == inicio)
// 	{
// 		// seta o nome do solicitante
// 		form.setValue("txt_nome_solicitante", nomeSolicitante);
// 		form.setValue("txt_data_solicitacao", buscaDataAtual());

// 		// Verifica se existe id de requisitante
// 		var campo = form.getValue("txt_requisitante").length();
// 		if (campo == 0)
// 		{
// 			form.setValue("txt_requisitante", getValue("WKUser"));
// 		}
// 		esconder.push(".hide_ini","#div_conteudo");
		
// 		// Carrega a reaga do campo principais areas de interface
// 		customHTML.append(" $.fn.prin_area_int(); ");
		
// 		// Seta a data de inicio da solicitacao
// 		customHTML.append(
// 			'$.fn.coleta_data("txt_data_cadastro",null);' +
// 			'$.fn.altera_aplicacao();'
// 			//'$("#txt_atv_corrente").val("Inicio");'			
// 		);
// 	}
// 	else if (atual != 0 && atual != inicio)
// 	{
// 		naoeditaveis.push('txt_cfg_nome_docto');
// 		bloqueiaCombo.push('op_cfg_tipo_docto','op_cfg_uso','op_cfg_tipo','op_pl_aplicacao','radio_comunica_bk');
// 		bloqueioZoom.push('txt_cfg_area','txt_cfg_consenso','txt_cfg_codigo_docto');
// 		Bloqueia_radio.push('input[name="op_cfg_tipo"]', 'input[name="radio_comunica_bk"]');
		
// 		// Armazaena o codigo do processo
// 		if ( form.getValue("txt_cod_proc") == null || form.getValue("txt_cod_proc") == '')
// 		{
// 			form.setValue("txt_cod_proc", id_proc);
// 		}
		
// 		// Armazaena o codigo do formulario
// //		if ( form.getValue("txt_cod_form") == null || form.getValue("txt_cod_form") == '')
// //		{
// //			form.setValue("txt_cod_form", id_form);
// //		}
		
// 		esconder.push(".info_doc");
// 	}	
	
// 	/**
// 	 * Campos da atividade
// 	 * criar revisar documento
// 	 */
// 	if (atual != criar_revisar_doc)
// 	{
// 		naoeditaveis.push("txt_assunto","txt_cargo_elaborado",
// 				"txt_nome_arquivo","txt_local_arm","txt_quem_acessa","txt_qual_inform","txt_periodo_retencao","txt_apos_expira",
// 				"txt_revisao","dt_data_revisao","txt_desc_revisao");
// 		bloqueioZoom.push("btn_tb_reg_ocorr","btn_tb_revisao");
// 		esconder.push(".botao_remove", "#a_link_modelo");

// 	}
// 	else if ( atual == criar_revisar_doc )
// 	{
// //		//Esconde campos de outras atividades
// //		esconder.push("#div_op_consense","#div_gestor", "#div_campos_gestor", "#div_gestao", "#div_campos_gestao", "#div_int_operac", 
// //				"#div_campos_int_operac", "#div_diretoria", "#div_campos_diretoria", "#div_cfg_requer_aprov")
		

// 		var userLogin = fluigAPI.getUserService().getCurrent().getLogin();
// 		customHTML.append("$.fn.cargo_colaborador('txt_cargo_elaborado', '"+userLogin+"');");

// 		//Preenche o campo Assunto com o campo Nome do Documento
// 		var nomeDoc = form.getValue("txt_cfg_nome_docto");
// 		form.setValue("txt_assunto", nomeDoc);		
		
// 		if ( form.getValue("txt_cod_form") == null || form.getValue("txt_cod_form") == '')
// 		{
// 			form.setValue("txt_cod_form", id_form);
// 		}
		
// 		//Condição para não deixar o nome desse campo alterar		
// 		if (form.getValue("txt_nome_elaborado") == null || form.getValue("txt_nome_elaborado") == '') {
// 			form.setValue("txt_nome_elaborado", getValue("WKUser"))
// 			customHTML.append(" $.fn.dados_usuario('"+getValue("WKUser")+"','txt_nome_elaborado'); ");
// 		}

// 		// Preenche os campos com a data e usuario
// 		customHTML.append(" $.fn.coleta_data('dt_data_elaborado',null); " +
// 			" $.fn.coletar_lista_docs(); " +
// 			" $.fn.revisao_first_line(); "+ 
// 			//'$("#txt_atv_corrente").val("c");'+
// 		"");
		
// 		// Preenche de forma automatica
// 		customHTML.append("$.fn.load_main_info(); ");
		
// 		// Verifica se exist valor no campo do codigo
// 		if ( form.getValue("txt_codigo") == '' || form.getValue("txt_codigo") == null )
// 		{
// 			// Seta o mesmo nome no campo do codigo
// 			form.setValue("txt_codigo", form.getValue("txt_cfg_codigo_docto") + " - " + form.getValue("txt_cfg_nome_docto"));
// 		}
		
// 		// Verifica se exist valor no campo da area responsavel
// 		if ( form.getValue("txt_area_resp") == '' || form.getValue("txt_area_resp") == null )
// 		{
// 			// Seta o mesmo nome no campo area responsavel
// 			form.setValue("txt_area_resp", form.getValue("txt_cfg_area") );
// 		}
// 		if (atual == criar_revisar_doc){
// 			naoeditaveis.push('txt_cfg_obs_gestao', 'txt_cfg_obs_gestor', 'txt_assunto', "op_cfg_requer_aprov", "txt_cfg_obs_gestor", "txt_cfg_obs_gestao",
// 					"txt_cfg_obs_conteudo", "txt_cfg_obs_diretor");
// 			bloqueiaCombo.push("op_cfg_aprov_conteudo", "op_consense", "txt_obs_consense", "op_cfg_aprov_gestor", "op_cfg_requer_aprov");
			
			
			
// 			// Verifica se exist valor na área gestor
// 			console.log("op_cfg_aprov_gestor = "+form.getValue("op_cfg_aprov_gestor"))
// 			if ( form.getValue("op_cfg_aprov_gestor") == '' || form.getValue("op_cfg_aprov_gestor") == null )
// 			{
// 				esconder.push("#div_gestor", "#div_campos_gestor")
// 				console.log("escondeu div_gestor e div_campos_gestor")
// 			}
			
// 			// Verifica se exist valor na área gestao
// 			console.log("txt_cfg_obs_gestao = "+form.getValue("txt_cfg_obs_gestao"))
// 			if ( form.getValue("txt_cfg_obs_gestao") == '' || form.getValue("txt_cfg_obs_gestao") == null )
// 			{
// 				esconder.push("#div_gestao", "#div_campos_gestao")
// 				console.log("escondeu div_gestao e div_campos_gestao")
// 			}
			
// 			// Verifica se exist valor na área inteligencia operacional
// 			console.log("op_cfg_aprov_conteudo = "+form.getValue("op_cfg_aprov_conteudo"))
// 			if ( form.getValue("op_cfg_aprov_conteudo") == '' || form.getValue("op_cfg_aprov_conteudo") == null )
// 			{
// 				esconder.push("#div_int_operac", "#div_campos_int_operac")
// 				console.log("escondeu div_int_operac e div_campos_int_operac")
// 			}
			
// 			// Verifica se exist valor na área Diretoria
// 			console.log("txt_cfg_obs_diretor = "+form.getValue("txt_cfg_obs_diretor"))
// 			if ( form.getValue("txt_cfg_obs_diretor") == '' || form.getValue("txt_cfg_obs_diretor") == null )
// 			{
// 				esconder.push("#div_diretoria", "#div_campos_diretoria")
// 				console.log("escondeu div_diretoria e div_campos_diretoria")
// 			}
			
// 			//Verifica se concenso está preenchido
// 			console.log("op_consense = "+form.getValue("op_consense"))
// 			if ( form.getValue("op_consense") == '' || form.getValue("op_consense") == null )
// 			{
// 				esconder.push("#div_op_consense")
// 				console.log("escondeu div_op_consense")
// 			}
// 		}
// 	}
	

// 	/**
// 	 * Campos da atividae 
// 	 * aprovar gestor
// 	 */
// 	if (atual != aprovar_gestor)
// 	{
// 		naoeditaveis.push('txt_cargo_aprovado');
// 		bloqueiaCombo.push('op_cfg_aprov_gestor');
// 	}
// 	else if (atual == aprovar_gestor )
// 	{
// 		//Esconde campos de outras atividades
// 		esconder.push("#div_op_consense", "#div_int_operac", "#div_gestao", "#div_campos_gestao",
// 				"#div_campos_int_operac", "#div_diretoria", "#div_campos_diretoria", "#div_cfg_requer_aprov", "#div_cfg_area", 
// 				"#div_cfg_tipo", "#div_cfg_uso", "#div_linha2_parametros")
// 		naoeditaveis.push('txt_cfg_obs_gestao');
		
// 		var userLogin = fluigAPI.getUserService().getCurrent().getLogin();
// 		customHTML.append("$.fn.cargo_colaborador('txt_cargo_aprovado', '"+userLogin+"');");

// 		customHTML.append(" $.fn.coleta_data('dt_data_aprovado',null); ");
// 		if(form.getFormMode() != "VIEW"){
// 			customHTML.append(" $.fn.dados_usuario('"+getValue("WKUser")+"','txt_nome_aprovado'); ");
// 		}

// 		// customHTML.append('<script>' +
// 		// 					'$("#txt_atv_corrente").val("Etapa 3 - Aprovar Gestao");'+
// 		// 				'</script>');
// 	}
	
	
// 	if (atual != realizar_consenso)
// 	{
// 		bloqueiaCombo.push('op_consense');
// 		naoeditaveis.push("txt_obs_consense");
// 	}
// 	else if ( atual == realizar_consenso )
// 	{
// 		esconder.push("#div_int_operac", "#div_gestao", "#div_campos_gestao", "#div_gestor", "#div_campos_gestor",
// 				"#div_campos_int_operac", "#div_diretoria", "#div_campos_diretoria", "#div_cfg_requer_aprov", "#div_cfg_area", 
// 				"#div_cfg_tipo", "#div_cfg_uso", "#div_linha2_parametros")
// 		customHTML.append(" $.fn.reseta_consenso(); ");

// 		// customHTML.append('<script>' +
// 		// 					'$("#txt_atv_corrente").val("Etapa 3 - Aprovacao Consenso");'+
// 		// 				'</script>');
// 	}
	
	
// 	/**
// 	 * Campos da atividade
// 	 * validar conteudo
// 	 */
// 	if (atual != validar_conteudo)
// 	{
// 		naoeditaveis.push('txt_cfg_obs_conteudo');
// 		bloqueiaCombo.push('op_cfg_aprov_conteudo');
// 	}
// 	else if (atual == validar_conteudo){
// 		esconder.push("#div_op_consense", "#div_gestao", "#div_campos_gestao", "#div_gestor", "#div_campos_gestor",
// 				"#div_diretoria", "#div_campos_diretoria", "#div_cfg_requer_aprov", "#div_cfg_area", 
// 				"#div_cfg_tipo", "#div_cfg_uso", "#div_linha2_parametros")
// 		naoeditaveis.push('txt_cfg_obs_gestao', 'txt_cfg_obs_gestor');

// 		// customHTML.append('<script>' +
// 		// 					'$("#txt_atv_corrente").val("Etapa 3 - Aprovacao Inteligencia Operacional");'+
// 		// 				'</script>');

// 	}
	
// 	/**
// 	 * Campos da atividade
// 	 * validar gestao
// 	 */
// 	if (atual != validar_gestao)
// 	{
// 		bloqueiaCombo.push('op_cfg_requer_aprov');
// 	}
// 	else if ( atual == validar_gestao)
// 	{
// 		if ( form.getValue("txt_validade") == '' || form.getValue("txt_validade") == null )
// 		{
// 			customHTML.append('$.fn.coleta_data("txt_validade","soma");');
// 		}

// 		// customHTML.append('<script>' +
// 		// 					'$("#txt_atv_corrente").val("Etapa 3 - Aprovacao Gestor");'+
// 		// 				'</script>');

// 	}
	
	
// 	if(atual != validar_gestao){
// 		esconder.push("#div_cfg_requer_aprov")
// 	}
// 	else if(atual == validar_gestao){
// 		naoeditaveis.push('txt_cfg_obs_gestor')
// 	}
	
// 	/**
// 	 * Campos da atividade
// 	 * aprovar diretoria
// 	 */
// 	if (atual != aprovar_diretoria)
// 	{
// 		naoeditaveis.push("txt_cfg_obs_diretor")
// 		bloqueiaCombo.push();
// 	}
// 	else if (atual == aprovar_diretoria){
// 		esconder.push("#div_op_consense", "#div_gestao", "#div_campos_gestao", "#div_gestor", "#div_campos_gestor",
// 				"#div_int_operac", "#div_campos_int_operac", "#div_cfg_requer_aprov", "#div_cfg_area", 
// 				"#div_cfg_tipo", "#div_cfg_uso", "#div_linha2_parametros")
// 		naoeditaveis.push('txt_cfg_obs_gestao', 'txt_cfg_obs_gestor');

// 		// customHTML.append('<script>' +
// 		// 					'$("#txt_atv_corrente").val("Etapa 3 - Aprovacao da Diretoria");'+
// 		// 				'</script>');

// 	}
	
// 	/**
// 	 * Campos do criar treinamento
// 	 * criar treinamento
// 	 */
// 	esconder.push("#div_hierarquia");
// 	if(atual != cria_treinamento){
// 		esconder.push("#div_campos_hierarquia");
// 	}
// 	else if(atual == cria_treinamento){
// 		naoeditaveis.push('txt_cfg_obs_gestao','txt_cfg_obs_gestor');
// 		// customHTML.append('<script>' +
// 		// 					'$("#txt_atv_corrente").val("Etapa 4 - Cria Treinamento LMS");'+
// 		// 				'</script>');
// 	}

// 	if (atual == concluido) {
// 		// customHTML.append('<script>' +
// 		// 					'$("#txt_atv_corrente").val("Atividade concluida");'+
// 		// 				'</script>');

// 	}
// 	/**
// 	* Loops de bloqueio de campos
// 	*/
	
// 	// Remove o zoom do botao
// 	for (var i = 0; i < bloqueioZoom.length; i++) {
// 		customHTML.append("$('#" + bloqueioZoom[i] + "').removeAttr('onclick');");
// 		customHTML.append("$('#z" + bloqueioZoom[i] + "').removeAttr('onclick');");
// 		customHTML.append("$('#" + bloqueioZoom[i] + "').attr('readonly', true);");
// 	}

// 	// Marca os campos apenas como readonly
// 	for (var i = 0; i < naoeditaveis.length; i++) {
// 		customHTML.append("$('#" + naoeditaveis[i] + "').attr('readonly', true);");
// 	}

// 	// Bloqueio de observacoes
// 	for (var i = 0; i < esconder.length; i++) {
// 		customHTML.append("$('" + esconder[i] + "').hide();");
// 	}
	
// 	//Bloqueio dos radio button
// 	for (var i = 0; i < Bloqueia_radio.length; i++) {
// 		customHTML.append("$('" + Bloqueia_radio[i] + "').attr('readonly', true);");
// 	}

// 	// Bloqueio os campos de combo
// 	for (var i = 0; i < bloqueiaCombo.length; i++) {
// 		customHTML.append("$('#" + bloqueiaCombo[i] + "').attr('readonly', true);");
// 		customHTML.append("var options = $('#" + bloqueiaCombo[i] + "').children('option:not(:selected)');");
// 		customHTML.append("options.prop('disabled', true);");
// 	}

// 	// Bloqueio checkbox
// 	for ( var i = 0 ; i < bloqueio_check.length; i++)
// 	{
// 	//customHTML.append('$("#' + bloqueio_check[i] + '").attr("disabled",true);');
// 		customHTML.append('$("#' + bloqueio_check[i] + '").attr( "onclick" , "return false");');
// 	}

// 	// Bloqueia desc_chec 
// 	for (var i = 0; i < desc_chec.length; i++) {
// 		customHTML.append("$('." + desc_chec[i] + "').attr('readonly', true);");
// 	}
// 	customHTML.append('});'+
// 	'</script>');
// }

// function buscaDataAtual(){
// 	var data = new Date();
// 	var formatoData = new java.text.SimpleDateFormat("dd/MM/yyyy");

// 	return formatoData.format(data);
// }