function validateForm(form) {
	// Coleta a atividade atual
	var atual = getValue("WKNumState");
	var campo_obr = [];

	// Variaveis das atividades do Diagrama
	var inicio = "7";
	var criar_revisar_doc = "14";
	var aprovar_gestor = "8";
	var realizar_consenso = "22";
	var validar_conteudo = "29";
	var validar_gestao = "31";
	var aprovar_diretoria = "43";
	var publicar_pdf = "18";

	if (atual == inicio) {
		campo_obr.push("txt_cfg_area", "op_cfg_tipo", "op_cfg_tipo_docto",
				"op_cfg_uso", "op_cfg_uso", "txt_cfg_codigo_docto",
				"txt_cfg_consenso", "txt_cfg_nome_docto", "op_pl_aplicacao");
		
//		if ( form.getValue("op_cfg_tipo_docto") == "pl" )
//		{
//			campo_obr.push("op_pl_aplicacao");
//		}
	}
	if (atual == criar_revisar_doc) {
		campo_obr.push("txt_assunto", "txt_codigo", "txt_area_resp");
		/*
		 * txt_nome_arquivo txt_local_arm txt_quem_acessa txt_qual_inform
		 * txt_periodo_retencao txt_apos_expira
		 * 
		 * txt_revisao dt_data_revisao txt_desc_revisao
		 */

		// Loop para validar se existe campo em branco no registro decorrentes
		var indexes = form.getChildrenIndexes("tb_reg_ocorr");
		for (var i = 0; i < indexes.length; i++) {
			var cmp = [ 'txt_nome_arquivo', 'txt_local_arm', 'txt_quem_acessa',
					'txt_qual_inform', 'txt_periodo_retencao',
					'txt_apos_expira' ];
			for (var a = 0; a < cmp.length; a++) {
				var val_cmp = form.getValue(cmp[a] + "___" + indexes[i]);
				if (val_cmp == null || val_cmp.trim().length() == 0) {
					throw "Campo de preenchimento obrigat&oacute;rio [ "
							+ i18n.translate(cmp[a]) + " ]";
				}
			}
		}

		campo_obr.push("txt_cargo_elaborado");

		// Loop para validar se existe campo em branco no registro decorrentes
		var indexes = form.getChildrenIndexes("tb_revisao");
		for (var i = 0; i < indexes.length; i++) {
			var cmp = [ 'txt_revisao', 'dt_data_revisao', 'txt_desc_revisao' ];
			for (var a = 0; a < cmp.length; a++) {
				var val_cmp = form.getValue(cmp[a] + "___" + indexes[i]);
				if (val_cmp == null || val_cmp.trim().length() == 0) {
					throw "Campo de preenchimento obrigat&oacute;rio [ "
							+ i18n.translate(cmp[a]) + " ]";
				}
			}
		}

		validaResponsavelArea(form);
	}
	
	
	if (atual == aprovar_gestor) {
		campo_obr.push("op_cfg_aprov_gestor", "txt_cfg_obs_gestor");

		if (String(form.getValue("op_cfg_aprov_gestor")) == '1'){
			campo_obr.push('txt_cargo_aprovado');
		}		
	}
	
	
	
	if (atual == realizar_consenso) {
		if(form.getValue("op_consense") == "n"){
			campo_obr.push("txt_obs_consense");
		}
	}
	if (atual == validar_conteudo) {
		campo_obr.push("op_cfg_aprov_conteudo", "txt_cfg_obs_conteudo");
	}
	if (atual == validar_gestao) {
		campo_obr.push("txt_cfg_obs_gestao", "op_cfg_requer_aprov",
				"txt_validade");
	}
	if (atual == aprovar_diretoria) {
		campo_obr.push("txt_cfg_obs_diretor");
	}
	if (atual == publicar_pdf) {
		campo_obr.push("txt_cdg_hierarquia", "txt_nivel_hierarquia");
	}

	// Array com os campos obrigatorios gerais
	for (var i = 0; i < campo_obr.length; i++) {
		msgvalida(form, campo_obr[i]);
	}
}
/**
 * msgvalida
 * 
 * Funcao que verifica se o campo esta vazio e para sim retorna a mensagem com o
 * nome do campo
 * 
 * @param form
 *            Object - recebe o form
 * @param campo
 *            String - id do campo
 */
function msgvalida(form, campo) {
	if (form.getValue(campo) == null
			|| form.getValue(campo).trim().length() == 0) {
		log
				.info("\n\n\n========================= CAMPOS OBR ===================================");
		log.info("\n >>> " + campo);
		throw "Campo de preenchimento obrigat&oacute;rio [ "
				+ i18n.translate(campo) + " ]";
	}
}


function validaResponsavelArea(form){
    
    // localizar a area do solicitante
    var area = form.getValue("txt_cfg_area");
    var user = "admin";
    
    log.info ("*** gst_001_gestor_area -  area: " + area);
    		
    // localizar o papel do responsável pela area - ds_parametrizacao_colab_area
    var cpapel = DatasetFactory.createConstraint("CodArea", area, area, ConstraintType.MUST);
 	var cresp = DatasetFactory.createConstraint("ch_responsavel", "Sim", "Sim", ConstraintType.MUST);
//    var cresp = DatasetFactory.createConstraint("ch_responsavel", "1", "1", ConstraintType.MUST);
    var c1 = DatasetFactory.createConstraint("userSecurityId", user, user, ConstraintType.MUST);
    
    var constraintspapel = new Array(cpapel,cresp,c1);
    var papel = DatasetFactory.getDataset("ds_parametrizacao_colab_area", null, constraintspapel, null);
    
    log.info ("*** gst_001_gestor_area -  papel.values.length:" + papel.values.length);

    if (papel.values.length <= 0) {
        
        throw "Não foi encontrado nenhum responsável pela área " + area + ".";
    
    } else {

        return true;
    }
}