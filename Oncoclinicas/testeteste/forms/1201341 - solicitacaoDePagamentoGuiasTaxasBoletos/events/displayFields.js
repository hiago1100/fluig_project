function displayFields(form,customHTML){ 
	var atividade = getValue("WKNumState");
	var modoEdicao = form.getFormMode();
	customHTML.append("<script>$('span.fluig-style-guide.fs-md-space').removeClass('fs-md-space');</script>");
	customHTML.append("<script> var CURRENT_STATE = "+atividade+";</script>"); 
	customHTML.append("<script> var MODO_EDICAO = '"+ modoEdicao + "';</script>");
	var userName = buscarNomeUsuarioLogado();
	var primeiraAtividade = 8;
	var corrigirSolicitacao = 12;
	var avaliarPeloGestor = 9;
	var avaliarGerarTitulo = 10;
	var validacaoFiscal = 11;
	var programarPagamento = 13; 
	var contabilizarImobilizado = 12;
	var aprovacaoSolicitante = 15;
	var solucaoInconsistencia = 16;
	var inconsistenciaDados = 72;
	
	var atividadeIdAprovador = null;
	var objForm = new objFormulario(form);
	var atividadeAtual = buscarAtividadeAtual();

	
	
	
	
	var ATIVIDADE = getValue("WKNumState");
	var usuario = buscaUsuario();
	var data = dataAtual();
	
	if (ATIVIDADE == INICIO || ATIVIDADE == INICIO1) {
		
		if ((form.getValue("cdSolicitante") == "" || form.getValue("solicitante") == "") && form.getFormMode() != "VIEW") {
			form.setValue("nivelAtualAprovacao", "0");
			form.setValue("nivelMaximoAprovacao", "5");
		}
		
	}
	
	
	
	ocultarAprovGestor(form, customHTML);
	
	desabilitaCampo(form, "decisaoGestor1");
	desabilitaCampo(form, "motivoAprovGestor1");
	ocultaCampo(customHTML, "avaliacaoGestor1");

	desabilitaCampo(form, "decisaoGestor2");
	desabilitaCampo(form, "motivoAprovGestor2");
	ocultaCampo(customHTML, "avaliacaoGestor2");
	
	desabilitaCampo(form, "decisaoGestor3");
	desabilitaCampo(form, "motivoAprovGestor3");
	ocultaCampo(customHTML, "avaliacaoGestor3");
	
	desabilitaCampo(form, "decisaoGestor4");
	desabilitaCampo(form, "motivoAprovGestor4");
	ocultaCampo(customHTML, "avaliacaoGestor4");
	
	desabilitaCampo(form, "decisaoGestor5");
	desabilitaCampo(form, "motivoAprovGestor5");
	ocultaCampo(customHTML, "avaliacaoGestor5");

	
	if (ATIVIDADE == GESTOR) {

		var nivelAtualAprovacao = form.getValue("nivelAtualAprovacao");

		if (nivelAtualAprovacao == "1") {

			if(form.getFormMode() != "VIEW") {
				form.setValue("nomeAprovGestor1", usuario.nomeUsuario);
				form.setValue("dataAprovGestor1", data);
			}

			form.setEnabled("decisaoGestor1", true);
			form.setEnabled("motivoAprovGestor1", true);
			customHTML.append("<script>$('#avaliacaoGestor1').show();</script>");
			
		} else if (nivelAtualAprovacao == "2") {

			if(form.getFormMode() != "VIEW") {
				form.setValue("nomeAprovGestor2", usuario.nomeUsuario);
				form.setValue("dataAprovGestor2", data);
			}

			form.setEnabled("decisaoGestor2", true);
			form.setEnabled("motivoAprovGestor2", true);
			customHTML.append("<script>$('#avaliacaoGestor2').show();</script>");
			
		} else if (nivelAtualAprovacao == "3") {
			
			if(form.getFormMode() != "VIEW") {
				form.setValue("nomeAprovGestor3", usuario.nomeUsuario);
				form.setValue("dataAprovGestor3", data);
			}

			form.setEnabled("decisaoGestor3", true);
			form.setEnabled("motivoAprovGestor3", true);
			customHTML.append("<script>$('#avaliacaoGestor3').show();</script>");
		
		} else if (nivelAtualAprovacao == "4") {

			if(form.getFormMode() != "VIEW") {
				form.setValue("nomeAprovGestor4", usuario.nomeUsuario);
				form.setValue("dataAprovGestor4", data);
			}

			form.setEnabled("decisaoGestor4", true);
			form.setEnabled("motivoAprovGestor4", true);
			customHTML.append("<script>$('#avaliacaoGestor4').show();</script>");
			
		} else if (nivelAtualAprovacao == "5") {

			if(form.getFormMode() != "VIEW") {
				form.setValue("nomeAprovGestor5", usuario.nomeUsuario);
				form.setValue("dataAprovGestor5", data);
			}

			form.setEnabled("decisaoGestor5", true);
			form.setEnabled("motivoAprovGestor5", true);
			customHTML.append("<script>$('#avaliacaoGestor5').show();</script>");
			
		} 
	}
	
	
	if (ATIVIDADE == CORRIGIR) {
		
		if(form.getValue("decisaoGestor1") == "Nao"){
			customHTML.append("<script>$('#avaliacaoGestor1').show();</script>");
		}

		if(form.getValue("decisaoGestor2") == "Nao"){
			customHTML.append("<script>$('#avaliacaoGestor2').show();</script>");
		}
		
		if(form.getValue("decisaoGestor3") == "Nao"){
			customHTML.append("<script>$('#avaliacaoGestor3').show();</script>");
		}
		
		if(form.getValue("decisaoGestor4") == "Nao"){
			customHTML.append("<script>$('#avaliacaoGestor4').show();</script>");
		}
		
		if(form.getValue("decisaoGestor5") == "Nao"){
			customHTML.append("<script>$('#avaliacaoGestor5').show();</script>");
		}
		
		form.setValue("nivelAtualAprovacao", "0");
		form.setValue("proximoAprovador", "");
		
		form.setValue("idAprovGestor1", "");
		form.setValue("idAprovGestor2", "");
		form.setValue("idAprovGestor3", "");
		form.setValue("idAprovGestor4", "");
		form.setValue("idAprovGestor5", "");
		
	}

	
	if(modoEdicao){
		ocultaCamposAutomaticos(form, customHTML);
		converterValorDeCampos(form, customHTML);
		ocultaRateio(form, customHTML);
		ocultaDataPagamento(form, customHTML);
		ocultaCamposLancamento(form, customHTML);
		if (objForm.isAtividadeInicial(primeiraAtividade)) {
			formularioCadastro(form, customHTML);
			ocultarAprovGestor(form, customHTML);
			ocultarAprovFiscal(form, customHTML);
			ocultarValFiscal(form, customHTML);
			ocultarIntegracaoProtheus(form, customHTML);
			ocultaAprovacaoFinanc(form, customHTML);
			ocultarCampoSolucao(form, customHTML);
		}
		else if (objForm.isAtividadeInicial(inconsistenciaDados)) {
			formularioCadastro(form, customHTML);
			ocultarAprovGestor(form, customHTML);
			ocultarAprovFiscal(form, customHTML);
			ocultarValFiscal(form, customHTML);
			ocultarIntegracaoProtheus(form, customHTML);
			ocultaAprovacaoFinanc(form, customHTML);
			ocultarCampoSolucao(form, customHTML);
		}
		else if (objForm.isAtividadeAtual(corrigirSolicitacao)){
			formularioCadastro(form, customHTML);
			ocultarAprovFiscal(form, customHTML);
			ocultarValFiscal(form, customHTML);
			ocultarIntegracaoProtheus(form, customHTML);
			ocultaAprovacaoFinanc(form, customHTML);
			ocultarCampoSolucao(form, customHTML);
		}
		else if (objForm.isAtividadeAtual(avaliarPeloGestor)){
			formularioAprovacaoGestor(form, customHTML);
			ocultarAprovFiscal(form, customHTML);
			ocultarValFiscal(form, customHTML);
			ocultarIntegracaoProtheus(form, customHTML);
			ocultarCampoSolucao(form, customHTML);
			ocultaAprovacaoFinanc(form, customHTML);
		}
		else if (objForm.isAtividadeAtual(avaliarGerarTitulo)){
			form.setValue("analyticsNmResponsavelSLA", userName);
			gravarValorCampo(form, "historico", form.getDocumentId());
			formularioAprovacaoFiscal(form, customHTML);
			ocultarAprovGestor(form, customHTML);
			ocultarValFiscal(form, customHTML);
			ocultarCampoSolucao(form, customHTML);
			ocultaAprovacaoFinanc(form, customHTML);
		}
		else if (objForm.isAtividadeAtual(validacaoFiscal)){
			formularioAprovacaoFiscal_Validacao(form, customHTML);
			ocultarAprovGestor(form, customHTML);
			ocultarAprovFiscal(form, customHTML);
			ocultaAprovacaoFinanc(form, customHTML);
			ocultarCampoSolucao(form, customHTML);
		}
		else if (objForm.isAtividadeAtual(programarPagamento)){
			formularioAprovacaoFinanc(form, customHTML);
			ocultarAprovGestor(form, customHTML);
			ocultarAprovFiscal(form, customHTML);
			ocultarValFiscal(form, customHTML);
			ocultarCampoSolucao(form, customHTML);
		}
		else if (objForm.isAtividadeAtual(aprovacaoSolicitante)){
			formularioAprovacaoDaSolucao(form, customHTML);
			ocultarAprovGestor(form, customHTML);
			ocultarAprovFiscal(form, customHTML);
			ocultarValFiscal(form, customHTML);
			ocultaAprovacaoFinanc(form, customHTML);
		}
		else if (objForm.isAtividadeAtual(solucaoInconsistencia)){
			ocultarAprovGestor(form, customHTML);
			ocultarAprovFiscal(form, customHTML);
			ocultarValFiscal(form, customHTML);
			ocultaAprovacaoFinanc(form, customHTML);
		}	
	}
}

function formularioCadastro(form, customHTML) {
	var cdSolicitante = buscarUsuarioLogado();
	gravarValorCampo(form, "cdSolicitante", cdSolicitante);	
	setNomeUsuarioLogado(form, "solicitante");
	setDataAtual(form, "dataSolicitante");
}

function ocultarAprovGestor(form, customHTML) {
	ocultarCampo(customHTML, "aprovacaoGestor");
}

function ocultarAprovFiscal(form, customHTML) {
	ocultarCampo(customHTML, "aprovacaoFiscal");
}

function ocultarValFiscal(form, customHTML) {
	ocultarCampo(customHTML, "validacaoFiscal");
}

function ocultaAprovacaoFinanc(form, customHTML) {
	ocultarCampo(customHTML, "aprovacaoFinanc");
}

function ocultarIntegracaoProtheus(form, customHTML){
	ocultarCampo(customHTML, "integracaoProtheus");
	if(form.getValue("prefixo") == "RC"){
		ocultarCampo(customHTML, "tipoNatureza");
	}
}

function formularioAprovacaoGestor(form, customHTML) {
	setNomeUsuarioLogado(form, "nomeAprovGestor");
	setDataAtual(form, "aprovDataGestor");
}

function formularioAprovacaoFiscal(form, customHTML) {
	setNomeUsuarioLogado(form, "nomeAprovFiscal");
	setDataAtual(form, "aprovDataFiscal");
}

function formularioAprovacaoFiscal_Validacao(form, customHTML) {
	setNomeUsuarioLogado(form, "nomeValidacaoFiscal");
	setDataAtual(form, "dataValidacaoFiscal");
	
}

function formularioAprovacaoFinanc(form, customHTML) {
	setNomeUsuarioLogado(form, "nomeAprovacaoFinanc");
	setDataAtual(form, "dataAprovacaoFinanc");
}

function formularioAprovacaoDaSolucao(form, customHTML) {
	if(buscarValorCampo(form, "aceite") == "S"){
		ocultarCampo(customHTML, "complementoSolicitante");
	} else {
		ocultarCampo(customHTML, "divBtnPesquisa");
	}
	if(buscarValorCampo(form, "retorno") == ""){
		ocultarCampo(customHTML, "complementoAnalista");
	}
}

function ocultarCampoSolucao(form, customHTML) {
	ocultarCampo(customHTML, "solucao");
}
function ocultaCamposLancamento(form, customHTML) {
	var tipoLancamento = buscarValorCampo(form, "zoomTipolancamento");
	var numeroDoc = buscarValorCampo(form, '_numeroDocumento');
	var compraExterior = buscarValorCampo(form, 'compraExterior');
	
	if(tipoLancamento == 'GPS'){
	
		ocultarCampo(customHTML, "zoomCodRetencao");
		ocultarCampo(customHTML, "cbGeraDirf");
		ocultarCampo(customHTML, "tipoTributo");
		ocultarCampo(customHTML, "divMoeda");

	} else if(tipoLancamento == 'FGTS'){

		ocultarCampo(customHTML, "codTributoGPS");
		ocultarCampo(customHTML, "vlrOutEntidades");
		ocultarCampo(customHTML, "zoomCodRetencao");
		ocultarCampo(customHTML, "cbGeraDirf");
		ocultarCampo(customHTML, "divMoeda");
		
	} else if (tipoLancamento == 'DARF'){

		ocultarCampo(customHTML, "codTributoGPS");
		ocultarCampo(customHTML, "vlrOutEntidades");
		ocultarCampo(customHTML, "tipoTributo");
		ocultarCampo(customHTML, "divMoeda");
		
	} else if (tipoLancamento == 'IPTU'){

		ocultarCampo(customHTML, "codTributoGPS");
		ocultarCampo(customHTML, "vlrOutEntidades");
		ocultarCampo(customHTML, "zoomCodRetencao");
		ocultarCampo(customHTML, "dataApuracao");
		ocultarCampo(customHTML, "cbGeraDirf");
		ocultarCampo(customHTML, "divMoeda");
		
	} else if (compraExterior == 'sim') {
		
		ocultarCampo(customHTML, "codTributoGPS");
		ocultarCampo(customHTML, "cgcTributo");
		ocultarCampo(customHTML, "vlrOutEntidades");
		ocultarCampo(customHTML, "zoomCodRetencao");
		ocultarCampo(customHTML, "dataApuracao");
		ocultarCampo(customHTML, "cbGeraDirf");
		ocultarCampo(customHTML, "tipoTributo");
		
	} else {

		ocultarCampo(customHTML, "codTributoGPS");
		ocultarCampo(customHTML, "cgcTributo");
		ocultarCampo(customHTML, "vlrOutEntidades");
		ocultarCampo(customHTML, "zoomCodRetencao");
		ocultarCampo(customHTML, "dataApuracao");
		ocultarCampo(customHTML, "cbGeraDirf");
		ocultarCampo(customHTML, "tipoTributo");
		ocultarCampo(customHTML, "divMoeda");

	}
} 
function ocultaRateio(form, customHTML){
	//Oculta a opção de rateio para o lançamento de GPS.
	if(form.getValue('zoomTipolancamento') == 'GPS'){
		ocultarCampo(customHTML, "checkboxRateio");
	} else {
		if(form.getValue('existeRateio') != 'true'){
			ocultarCampo(customHTML, "divImportBeneficio");
			ocultarCampo(customHTML, "divPaiFilhoBeneficio");
		}	
	}	
}

/**
 * Esta função faz com que os campos preenchidos automaticamente após a integração com o protheus, só sejam exibidos quando preenchidos
 * @param form
 * @param customHTML
 */
function ocultaCamposAutomaticos(form, customHTML){
	var dataEmissao = buscarValorCampo(form, 'dataemissaoPgtoGuiaTaxaBoletos');
	var numeroDocumento = buscarValorCampo(form, 'numeroDocumento');
	
	if(dataEmissao == '' || dataEmissao == null || dataEmissao == undefined){
		ocultarCampo(customHTML, 'dataEmissao');
	}
	
	if(numeroDocumento == '' || numeroDocumento == null || numeroDocumento == undefined){
		ocultarCampo(customHTML, 'numeroDocumento');
	}
}

function ocultaDataPagamento(form, customHTML){
	var dataAtual = new Date();
	dataAtual.setHours(0,0,0,0);
	var campoDataVencimento = form.getValue('dtDeVencPgtoGuiaTaxaBoletos');
	var diaVencimento = campoDataVencimento.split('/')[0];
	var mesVencimento = campoDataVencimento.split('/')[1]-1;//Subtraindo 1 do mes, uma vez que são considerados meses de 0 a 11
	var anoVencimento = campoDataVencimento.split('/')[2];
	var dataVencimento = new Date(anoVencimento,mesVencimento,diaVencimento);
	if(dataVencimento > dataAtual || campoDataVencimento == ''){
		ocultarCampo(customHTML, 'dataPagamento');
	}
}

function desabilitaCampo(form, idCampo){
	form.setEnabled(idCampo, false);
}

function ocultaCampo(html, idCampo){
	html.append("<script>$('#" + idCampo + "').hide();</script>");
}

function buscaUsuario(){
	
	var user = {};
	
	user.idUsuario = getValue("WKUser");
	
	var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", user.idUsuario, user.idUsuario, ConstraintType.MUST);
	var constraints = new Array(c1);
	var ds_colleague = DatasetFactory.getDataset("colleague", null, constraints, null);
	
	user.nomeUsuario = ds_colleague.getValue(0, "colleagueName");
	user.emailUsuario = ds_colleague.getValue(0, "mail");	
	
	return user;
	
}

function dataAtual(){
	var data = new Date();
	return pad(data.getUTCDate())+"/"+pad(data.getUTCMonth()+1)+"/"+data.getUTCFullYear();
};


function pad(num){
	var num_formatado = num;
	if(num < 10) {
		 num_formatado = "0"+num;
	}
	return num_formatado;
};
