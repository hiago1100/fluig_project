let MAIN = {
	loading: {}

	, init: function(){
		
		MAIN.loading = FLUIGC.loading(window);
		
		$('input[type="text"]').on('change', function(){
			this.value = $.trim(this.value);
		});

		$('input[name="rb_SM_de"]').on('change', function() {
			MAIN.clearTableSMs();			
		});

		if (CONTEXT.MODE != "VIEW" && ( CONTEXT.CURRENT_STATE == Activity.ZERO || CONTEXT.CURRENT_STATE == Activity.INICIAR) ) {
					
			setTimeout(function(){
				MAIN.validateSelectZoom();
				MAIN.setFilterZoomContrato();
				MAIN.setFilterZoomSMs();
			}, 300);

			$('#btnAddSMs').on('click', function() {
				MAIN.addSMs();
			});
 
		}
		
		$(".money").maskMoney({ 
			thousands: '.', 
			decimal: ',', 
			precision: 2
		});

		MAIN.enabledCalendar();
		requiredFields();
		enableFields();
		MAIN.setLinkSMs();
		MAIN.displayForm();
			
	}

	, displayForm: function(){
		
		if(CONTEXT.CURRENT_STATE != Activity.ZERO && CONTEXT.CURRENT_STATE != Activity.INICIAR) {

			if(CONTEXT.CURRENT_STATE == Activity.VALIDAR_COMPOSICAO){
				$("#panelValidaComposicao").show();
			
			} else if(CONTEXT.CURRENT_STATE == Activity.VALIDAR_COMPOSICAO || CONTEXT.CURRENT_STATE == Activity.ELABORAR_ANALISES){
				$("#panelValidaComposicao").show();
		
			} else if(CONTEXT.CURRENT_STATE == Activity.ELABORAR_DOCUMENTAL_ACODE){
				$("#panelValidaComposicao").show();
				$("#panelACODE").show();
				$("#divElaboracaoDocumemtalACODE").show();
				if ($('input[name="rb_SM_de"]:checked').val() == 'apostilamento'){
					$("#divDatasAssinaturaPublicacoes").show();
				}
				if($("#id_resp_avalicao_aditivo").val() != ''){
					$("#panelGestaoContrato").show();
					$("#divAvalicaoMinuta").show();
				}
				
			} else if(CONTEXT.CURRENT_STATE == Activity.COLHER_ASSINATURAS){
				$("#panelValidaComposicao").show();
				$("#panelACODE").show();
				$("#divElaboracaoDocumemtalACODE").show();
				$("#divAssinaturasAditivo").show();
				$("#divDatasAssinaturaPublicacoes").show();
				
			} else if(CONTEXT.CURRENT_STATE == Activity.AVALIAR_MINUTA){
				$("#panelValidaComposicao").show();
				$("#panelACODE").show();
				$("#panelGestaoContrato").show();
				$("#divAvalicaoMinuta").show();
						
			} else if(CONTEXT.CURRENT_STATE == Activity.ATUALIZAR_CONTRATO){
				$("#panelValidaComposicao").show();
				$("#panelACODE").show();
				$("#divDatasAssinaturaPublicacoes").show();
				$("#panelGestaoContrato").show();
				$("#divAtualizarContrato").show();
				if ($('input[name="rb_SM_de"]:checked').val() == 'aditivo'){
					$("#divAssinaturasAditivo").show();
					$("#divAvalicaoMinuta").show();
				} 
				

			} else {
				$("#panelValidaComposicao").show();
				$("#panelACODE").show();
				$("#divElaboracaoDocumemtalACODE").show();
				$("#divDatasAssinaturaPublicacoes").show();
				$("#panelGestaoContrato").show();
				$("#divAtualizarContrato").show();
				if ($('input[name="rb_SM_de"]:checked').val() == 'aditivo'){
					$("#divAssinaturasAditivo").show();
					$("#divAvalicaoMinuta").show();
				}
			}
		
		} else {
			if($("#id_resp_valida_composicao").val() != ''){
				$("#panelValidaComposicao").show();
			}
		}
	}

	, enabledCalendar: function(){

		FLUIGC.calendar('.campo-data', {useCurrent: false});

		//DATA
		$(".campo-data" ).on('change', function() {
			if(this.value != ''){
				validateDate($(this));
			} else  {
				if(this.id.indexOf("___") > -1){
					id = this.id.split('___')[0];
					index = this.id.split('___')[1];
					$('#' + id + '_filtro' + '___' + index).val("");
				} else {
					$('#' + id + '_filtro').val("");
				}
			}
		});

		function validateDate(objeto){
			var aDate   = moment(objeto.val(), 'DD/MM/YYYY', true);
			var isValid = aDate.isValid();

			if(!isValid){
				FLUIGC.toast({
					title: 'Data: ',
					message: 'Data Inválida',
					type: 'warning'
				});
				objeto.val("");
				$('#' + objeto.prop('id') + '_filtro').val("");
				if(objeto.prop('id').indexOf("___") > -1){
					id = objeto.prop('id').split('___')[0];
					index = objeto.prop('id').split('___')[1];
					$('#' + id + '_filtro' + '___' + index).val("");
				} else {
					$('#' + objeto.prop('id') + '_filtro').val("");
				}	
				objeto.focus();
			} else {
				let dataFiltro = objeto.val().split('/')
				if(objeto.prop('id').indexOf("___") > -1){
					id = objeto.prop('id').split('___')[0];
					index = objeto.prop('id').split('___')[1];
					$('#' + id + '_filtro' + '___' + index).val(dataFiltro[2] +'/'+ dataFiltro[1] +'/'+ dataFiltro[0]);
				} else {
					$('#' + objeto.prop('id') + '_filtro').val(dataFiltro[2] +'/'+ dataFiltro[1] +'/'+ dataFiltro[0]);
				}
				MAIN.specificControlDates(objeto)
			}
		}

		//DATA HORA
		$(".campoDataHora" ).on('change', function() {
			if(this.value != '')
				validateDateTime($(this));
		});

		function validateDateTime(objeto) {
			var aDate   = moment(objeto.val(), 'DD/MM/YYYY HH:mm', true);
			var isValid = aDate.isValid();

			if(!isValid){
				FLUIGC.toast({
						title: 'Data: ',
						message: 'Data Inválida',
						type: 'warning'
					});
					objeto.val("");
					objeto.focus();
				}
		}
	}

	, specificControlDates: function(objeto){

		if (objeto.prop('id') == 'dt_inicio_vigencia'){

			if ($('#dt_termino_vigencia').val() != "" && moment(objeto.val(), 'DD/MM/YYYY').isAfter(moment($('#dt_termino_vigencia').val(), 'DD/MM/YYYY' ) ) ) {
				FLUIGC.toast({
					title: 'Erro:',
					message: 'A data "Início Vigência" não pode ser posterior a data "Término Vigência".',
					type: 'danger'
				});
				objeto.val("");
				$('#dt_inicio_vigencia_filtro').val('')
			}
		}

		if (objeto.prop('id') == 'dt_termino_vigencia'){
			
			if ($('#dt_inicio_vigencia').val() != "" && moment(objeto.val(), 'DD/MM/YYYY').isBefore(moment($('#dt_inicio_vigencia').val(), 'DD/MM/YYYY' ) ) ){
				FLUIGC.toast({
					title: 'Erro:',
					message: 'A data "Término Vigência" não pode ser anterior a data Início Vigência".',
					type: 'danger'
				});
				objeto.val("");
				$('#dt_termino_vigencia_filtro').val('')
			}
		}
	}

	, getDateBR: function (date) {
		return new Date(date.split("/")[2], date.split("/")[1]-1, date.split("/")[0])
	}

	, getDateEN_US: function (date) {
		return new Date(date.split("/")[0], date.split("/")[1]-1, date.split("/")[2])
	}
	, clearFieldsContratada: function(){
		$('#cnpj_contratada').val('')
		window['nm_contratada'].clear()
		MAIN.clearFieldsContrato();
	}
	
	, clearFieldsContrato: function(){
		$('#cd_contrato').val('')
		$('#id_gestor_contrato').val('')
		$('#nm_gestor_contrato').val('')
		window['nm_contrato'].clear()
		MAIN.clearTableSMs()
	}
	, clearTableSMs: function(){
		$('#tb_SMs').each(function(){
			$(this).find("tbody tr:gt(0)").remove();
		})
	}
	
	, validateSelectZoom: function(){
	
		$(document).on('select2:opening', function (e) {
		   
		   var id = e.target.id;

			if (id == "nm_contrato"){
				if($('#cnpj_contratada').val() == '' || ($('#cnpj_contratada').val() == null)){
					e.preventDefault();
					FLUIGC.toast({
						title: 'Erro:',
						message: 'Informe Contratada.',
						type: 'danger'
					});
				}
			}

		});
	}

	, setFilterZoomContrato: function(){

        let cnpjContratada = $('#cnpj_contratada').val() == '' ? null : $('#cnpj_contratada').val()
		reloadZoomFilterValues("nm_contrato", 'ds_cnpj_contratada,' + cnpjContratada)
		
	}

	, setFilterZoomSMs: function(){

		let cd_contrato = $('#cd_contrato').val();
		let tipo_SM = $('input[name="rb_SM_de"]:checked').val()

		$('#tb_SMs').each(function(){
			let row = $(this);
			$(row).find("select").each(function(){
				let id = $(this).prop("id");
				reloadZoomFilterValues(id, "idContrato," + cd_contrato + ',confirmarQualificarSM,' + tipo_SM);
			})
		})
	}

	, validateContainsSM: function(selectedItem){

		let auxCountSM = 0;

		$('#tb_SMs').each(function(){
			let row = $(this);
			$(row).find("select").each(function(){
				if( $(this).val() == selectedItem.numSM ){
					auxCountSM++;
				}
			})
		})

		if (auxCountSM > 1){
			removedZoomItem(selectedItem);
			FLUIGC.toast({
				title: 'Erro:',
				message: 'A SM selecionada exixte na tabela de SMs.',
				type: 'danger'
			});		
		}
	}

	, setLinkSMs: function(){			

		$('#tb_SMs').each(function(){
			$(this).find("tbody tr:gt(0)").each(function(){
				let row = $(this);
				$(row).find(".id_fluig_SM").each(function(){
					let serverURL = parent.WCMAPI.serverURL
					let tenantCode = parent.WCMAPI.tenantCode
					let idFluigSM = $(this).val();
					if(idFluigSM != ''){
						let linkSM = 	'<span class="input-group-addon fs-cursor-pointer">'
										+ '<a target="_blank" href="'+serverURL+'/portal/p/'+tenantCode+'/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=' + idFluigSM + '">'
											+ '<i class="flaticon flaticon-document-check icon-md"></i>'
										+ '</a>'
									+ '</span>'

						$(row).find(".divLinkSM").each(function(){
							$(this).empty();
							$(this).append(linkSM);
							enableField($(this), false);
						})

					} else {
						$(row).find(".divLinkSM").each(function(){
							$(this).empty();
						})
					}
				})
			})
		})	
	}

	, addSMs: function(){
		
		let msg = ''
		
		if ($('input[name="rb_SM_de"]:checked').val() == undefined || $('input[name="rb_SM_de"]:checked').val() == '' || $('input[name="rb_SM_de"]:checked').val() == null){
			msg += 'Informe Solicitação de.</br>'
		}

		if($('#cd_contrato').val() == ''){
			msg += 'Informe Contrato.</br>'
		}	
		
		if(msg != ''){
			FLUIGC.toast({
				title: 'Erro:',
				message: msg,
				type: 'danger'
			});
		} else {
			let idxSMs = wdkAddChild('tb_SMs');
			MAIN.setFilterZoomSMs()
		}
	} 
} 

$(document).ready(function() {
	
	MAIN.init();
	
});

function fnCustomDelete(oElement){
		
	var row = $(oElement).parent().parent().parent();
	var input = $(row).find('input')[0];
	var indice = $(input).attr('id').split('___')[1];

	var id     = $('#id_fluig_SM___' + indice).val();
	var card   = $('#id_card_SM___' + indice).val()
	var numero = "";

	var retorno = atualizarSolicitacaoMudanca(id, card, numero, "");
	if(retorno == "sucesso"){
    	// Chamada a funcao padrao, NAO RETIRAR
    	fnWdkRemoveChild(oElement);    
	}
	else{
		FLUIGC.toast({
			title: 'Erro ao excluir S.M.: ',
			message: retorno,
			type: 'danger'
		});
	}

    
}

function atualizarSolicitacaoMudanca(documentId, cardId, numAditivoApostilamento, status) {	

	var retorno = 'sucesso';

	try {
		var c1 = DatasetFactory.createConstraint("DOCUMENT_ID", documentId, documentId, ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("CARD_ID", cardId, cardId, ConstraintType.MUST);
		var c3 = DatasetFactory.createConstraint("NUM_ADITIVO_APOSTILAMENTO", numAditivoApostilamento, numAditivoApostilamento, ConstraintType.MUST);
		var c4 = DatasetFactory.createConstraint("STATUS_APOSTILAMENTO", status, status, ConstraintType.MUST);
		
		var constraints = new Array(c1, c2, c3, c4);
		var dataset = DatasetFactory.getDataset("aditivo_apostilamento_atualizar_sm_associadas", null, constraints, null);
		
		if (dataset.values.length > 0) {
			if (dataset.values[0]['STATUS'] == "ERROR") {
				retorno = dataset.values[0]['MENSAGEM'];
			}
		} else {
			retorno = "Ocorreu um erro na atualizacao aditivo_apostilamento_atualizar_sm_associadas.rowsCount vazio";
		}
	} catch (e) {
		retorno = "PR-008.cardServiceUtil - Erro ao alterar solicitação de mudança: " + e;
	}

	return retorno;
}