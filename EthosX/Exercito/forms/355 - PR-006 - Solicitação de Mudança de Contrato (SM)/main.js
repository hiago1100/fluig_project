var isDemandante = null;
var isRepresentante = null;

let MAIN = {
	loading: {}

	, init: function(){
		
		MAIN.loading = FLUIGC.loading(window);
		
		$('input[type="text"]').on('change', function(){
			this.value = $.trim(this.value);
		});

		$('input[name="solicitadoPor"]' ).on('change', function() {
			$('#panelDetalhesSM').show();
			MAIN.clearFieldsContratada();
			MAIN.clearFieldsSecao();
			$('#descSM').val('')
			window["nmContratada"].disable(false);
			if($('input[name="solicitadoPor"]:checked').val() == 'contratada'){
				window["nmContratada"].disable(true);
				MAIN.setFilterZoomContrato();
			} else {
				MAIN.setFilterZoomContrato();
				MAIN.setFilterZoomSecao();
				MAIN.verificarSecoesUsuario();
			}
		});

		if (CONTEXT.MODE != "VIEW" && ( CONTEXT.CURRENT_STATE == Activity.ZERO || CONTEXT.CURRENT_STATE == Activity.INICIAR) ) {
					
			setTimeout(function(){
				if ($('input[name="solicitadoPor"]:checked').val() == undefined || $('input[name="solicitadoPor"]:checked').val() == null || $('input[name="solicitadoPor"]:checked').val() == ''){
					MAIN.verificarGrupoSolicitante();
				}
				MAIN.validateSelectZoom();
				MAIN.setFilterZoomContrato();
				MAIN.setFilterZoomSecao();
				MAIN.setFilterZoomEtapa();
				MAIN.setFilterZoomObrigacoes();
				MAIN.verificarSecoesUsuario();

			}, 300);

			$('#btnAddEtapas').on('click', function() {
				MAIN.addEtapas();
			});
	
			$('#btnAddObrigacoes').on('click', function() {
				MAIN.addObrigacoes();
			});	
		}
		
		if(CONTEXT.CURRENT_STATE == Activity.ELABORAR_SM){		

			$('#btnCriarDemanda').on('click', function() {
				MAIN.createDemanda();
			});
			
			MAIN.requiredFieldsElaboracaoSM()
			
			$('input[name="impactoEscopo"]').on('change', function() {
				MAIN.requiredFieldsElaboracaoSM()
			});
			$('input[name="impactoMetodologia"]').on('change', function() {
				MAIN.requiredFieldsElaboracaoSM()
			});
			$('input[name="impactoPrazo"]').on('change', function() {
				MAIN.requiredFieldsElaboracaoSM()
			});
			$('input[name="impactoSecoes"]').on('change', function() {
				MAIN.requiredFieldsElaboracaoSM()
			});
			$('input[name="impactoCusto"]').on('change', function() {
				MAIN.requiredFieldsElaboracaoSM()
			});

		}

		if(CONTEXT.CURRENT_STATE == Activity.PRE_CGM){
			
			$('#btnAddPreCGM').on('click', function() {
				MAIN.addReunioesPreCGM();
			});

		}

		if(CONTEXT.CURRENT_STATE == Activity.CGM){

			$('#btnAddCGM').on('click', function() {
				MAIN.addReunioesCGM();
			});

			MAIN.requiredFieldsDeliberacoesCGM()
			$('input[name="escopoDeliberacaoCGM"]').on('change', function() {
				MAIN.requiredFieldsDeliberacoesCGM()
			});
			$('input[name="metodologiaDeliberacaoCGM"]').on('change', function() {
				MAIN.requiredFieldsDeliberacoesCGM()
			});
			$('input[name="prazoDeliberacaoCGM"]').on('change', function() {
				MAIN.requiredFieldsDeliberacoesCGM()
			});
			$('input[name="custoDeliberacaoCGM"]').on('change', function() {
				MAIN.requiredFieldsDeliberacoesCGM()
			});
			$('input[name="pendenciasDeliberacaoCGM"]').on('change', function() {
				MAIN.requiredFieldsDeliberacoesCGM()
			});

		}

		$(".money").maskMoney({ 
			thousands: '.', 
			decimal: ',', 
			precision: 2
		});

		MAIN.statusCheckDemanda();
		MAIN.displayForm();	
		MAIN.enabledCalendar();
		enableFields();
		requiredFields();

		$('#btnConsultarAditivoApostilamento').on('click', function() {
			MAIN.consultarAditivoApostilamento();
		});
			
	}

	, requiredFieldsElaboracaoSM: function(){

		if($('input[name="impactoEscopo"]:checked').val() == 'sim') setRequired('descImpactoEscopo', true)
			else setRequired('descImpactoEscopo', false)
		if($('input[name="impactoMetodologia"]:checked').val() == 'sim') setRequired('descImpactoMetodologia', true)
			else setRequired('descImpactoMetodologia', false)
		if($('input[name="impactoPrazo"]:checked').val() == 'sim') setRequired('descImpactoPrazo', true)
			else setRequired('descImpactoPrazo', false)
		if($('input[name="impactoSecoes"]:checked').val() == 'sim') setRequired('descImpactoSecoes', true)
			else setRequired('descImpactoSecoes', false)
		if($('input[name="impactoCusto"]:checked').val() == 'sim') {
			setRequired('descImpactoCusto', true)
			setRequired('valorImpactoCusto', true)
		} else { 
			setRequired('descImpactoCusto', false)
			setRequired('valorImpactoCusto', false)
		}

	}

	, requiredFieldsDeliberacoesCGM: function(){

		let auxSetRequired = false;
		
		if($('input[name="escopoDeliberacaoCGM"]:checked').val() == 'ressalva') auxSetRequired = true;
		if($('input[name="metodologiaDeliberacaoCGM"]:checked').val() == 'ressalva') auxSetRequired = true;
		if($('input[name="prazoDeliberacaoCGM"]:checked').val() == 'ressalva') auxSetRequired = true;
		if($('input[name="custoDeliberacaoCGM"]:checked').val() == 'ressalva') auxSetRequired = true;
		if($('input[name="pendenciasDeliberacaoCGM"]:checked').val() == 'sim') auxSetRequired = true;

		if (auxSetRequired) {
			setRequired('descPendenciasEB', true)
			setRequired('descPendenciasContratada', true)
		} else {
			setRequired('descPendenciasEB', false)
			setRequired('descPendenciasContratada', false)
		}

	}

	, displayForm: function(){

		if ($('input[name="solicitadoPor"]:checked').val() != undefined && $('input[name="solicitadoPor"]:checked').val() != null && $('input[name="solicitadoPor"]:checked').val() != ''){
			
			$('#panelDetalhesSM').show();

			if(CONTEXT.CURRENT_STATE == Activity.ELABORAR_SM || CONTEXT.CURRENT_STATE == Activity.ANALISAR_IMPACTO){
				$('#panelElaboracaoSM').show();
	
			} else if(CONTEXT.CURRENT_STATE == Activity.QUALIFICAR_SM){
				$('#panelElaboracaoSM').show();
				$('#panelQualificarSM').show();
	
			} else if(CONTEXT.CURRENT_STATE == Activity.PRE_CGM){
				$('#panelElaboracaoSM').show();
				$('#panelQualificarSM').show();
				$('#panelCGM').show();
				$('#divPreCGM').show();
	
			} else if(CONTEXT.CURRENT_STATE == Activity.CGM || CONTEXT.CURRENT_STATE ==  Activity.RESOLVER_PENDENCIAS){
				$('#panelElaboracaoSM').show();
				$('#panelQualificarSM').show();
				$('#panelCGM').show();
				$('#divPreCGM').show();
				$('#divCGM').show();
	
			}  else if(CONTEXT.CURRENT_STATE == Activity.AGUARDAR){
				$('#panelElaboracaoSM').show();
				$('#panelQualificarSM').show();
				$('#panelCGM').show();
				$('#divPreCGM').show();
				$('#divCGM').show();
				$('#panelAditivoApostilamento').show();

			} else {
				$('#panelElaboracaoSM').show();
				$('#panelQualificarSM').show();
				$('#panelCGM').show();
				$('#divPreCGM').show();
				$('#divCGM').show();
				$('#panelAditivoApostilamento').show();
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
					$('#' + id + 'Filtro' + '___' + index).val("");
				} else {
					$('#' + id + 'Filtro').val("");
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
				$('#' + objeto.prop('id') + 'Filtro').val("");
				if(objeto.prop('id').indexOf("___") > -1){
					id = objeto.prop('id').split('___')[0];
					index = objeto.prop('id').split('___')[1];
					$('#' + id + 'Filtro' + '___' + index).val("");
				} else {
					$('#' + objeto.prop('id') + 'Filtro').val("");
				}	
				objeto.focus();
			} else {
				let dataFiltro = objeto.val().split('/')
				if(objeto.prop('id').indexOf("___") > -1){
					id = objeto.prop('id').split('___')[0];
					index = objeto.prop('id').split('___')[1];
					$('#' + id + 'Filtro' + '___' + index).val(dataFiltro[2] +'/'+ dataFiltro[1] +'/'+ dataFiltro[0]);
				} else {
					$('#' + objeto.prop('id') + 'Filtro').val(dataFiltro[2] +'/'+ dataFiltro[1] +'/'+ dataFiltro[0]);
				}	
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

	, getDateBR: function (date) {
		return new Date(date.split("/")[2], date.split("/")[1]-1, date.split("/")[0])
	}

	, getDateEN_US: function (date) {
		return new Date(date.split("/")[0], date.split("/")[1]-1, date.split("/")[2])
	}

	, verificarGrupoSolicitante: function(){
		
		var constraintsUserGroupDemandante = new Array()
		constraintsUserGroupDemandante.push(DatasetFactory.createConstraint('colleagueId', $('#idSolicitante').val(), $('#idSolicitante').val(), ConstraintType.MUST))
		constraintsUserGroupDemandante.push(DatasetFactory.createConstraint('groupId', 'DEMANDANTES', 'DEMANDANTES', ConstraintType.MUST))
		let dsUserGroupDemandante = DatasetFactory.getDataset('fluig_consulta_usuarioContemGrupo', null, constraintsUserGroupDemandante, null)

		if(dsUserGroupDemandante != null && dsUserGroupDemandante != undefined && dsUserGroupDemandante.values.length > 0){
			if(dsUserGroupDemandante.values[0].RESULT == 'OK'){
				isDemandante = true;
			}
		} else {
			FLUIGC.toast({
				title: 'Erro:',
				message: 'Não foi possível verificar se o Solicitante é Demandadente, entre em contato com Administrador SAFE.',
				type: 'danger'
			});
		}

		var constraintsUserGroupRepresentante = new Array()
		constraintsUserGroupRepresentante.push(DatasetFactory.createConstraint('colleagueId', $('#idSolicitante').val(), $('#idSolicitante').val(), ConstraintType.MUST))
		constraintsUserGroupRepresentante.push(DatasetFactory.createConstraint('groupId', 'CONTRATO_Representantes', 'CONTRATO_Representantes', ConstraintType.MUST))
		let dsUserGroupRepresentante = DatasetFactory.getDataset('fluig_consulta_usuarioContemGrupo', null, constraintsUserGroupRepresentante, null)

		if(dsUserGroupRepresentante != null && dsUserGroupRepresentante != undefined && dsUserGroupRepresentante.values.length > 0){
			if(dsUserGroupRepresentante.values[0].RESULT == 'OK'){
				isRepresentante = true;
			}
		} else {
			FLUIGC.toast({
				title: 'Erro:',
				message: 'Não foi possível verificar se o Solicitante é Representante de Contrato, entre em contato com Administrador SAFE.',
				type: 'danger'
			});
		}

		if(isDemandante && isRepresentante == null){
			$('#solicitadoPorEB').attr('checked', true);
			enableField($('#solicitadoPorEB'), false);
			enableField($('#solicitadoPorContratada'), false);
			$('#panelDetalhesSM').show();
			setTimeout(function(){
				window["nmContratada"].disable(false);
			}, 200);
		} else if (isDemandante == null && isRepresentante){
			$('#solicitadoPorContratada').attr('checked', true);
			enableField($('#solicitadoPorEB'), false);
			enableField($('#solicitadoPorContratada'), false);
			$('#panelDetalhesSM').show();
			setTimeout(function(){
				window["nmContratada"].disable(true);
			}, 200);
		} else{
			enableField($('#solicitadoPorEB'), true);
			enableField($('#solicitadoPorContratada'), true);
			setTimeout(function(){
				window["nmContratada"].disable(false);
			}, 200);
		}
	}

	, clearFieldsContratada: function(){
		$('#cnpjContratada').val('')
		window['nmContratada'].clear()
		//MAIN.clearFieldsContrato();

		if ($('input[name="solicitadoPor"]:checked').val() == "EB"){
			MAIN.clearFieldsContrato()
		}
	}
	
	, clearFieldsContrato: function(){
		$('#idContrato').val('')
		$('#idGestorContrato').val('')
		$('#nmGestorContrato').val('')
		window['contrato'].clear()
		MAIN.clearFieldsObrigacoesAcessorias()
		MAIN.clearFieldsEtapas()

		if ($('input[name="solicitadoPor"]:checked').val() == "contratada"){
			MAIN.clearFieldsContratada()
			MAIN.clearFieldsSecao()
		}
	}
	
	, clearFieldsSecao: function(){		
		$('#idSecao').val('')
		$('#idChefeSecao').val('')
		window['secao'].clear()
	}

	, clearFieldsObrigacoesAcessorias: function(){
		$('#tableObrigacoesAcessorias').each(function(){
			$(this).find("tbody tr:gt(0)").remove();
		})
	}

	, clearFieldsEtapas: function(){
		$('#tableEtapas').each(function(){
			$(this).find("tbody tr:gt(0)").remove();
		})
	}

	, clearFieldsGestaoDemandas: function(){
		$('#idDemandante').val('')
		$('#nmDemandante').val('')
		$('#idDemandado').val('')
		window['nmDemandado'].clear()
		$('#dataLimiteDemandaFiltro').val('')
		$('#dataLimiteDemanda').val('')
		$('#descDemanda').val('')
		$('#assuntoDemanda').val('')
		$('#numDemanda').val('')
		$('#statusDemanda').val('')
	}

	, validateSelectZoom: function(){
	
		$(document).on('select2:opening', function (e) {
		   
		   var id = e.target.id;
		   
		   if (id == "nmContratada"){
			if($('input[name="solicitadoPor"]:checked').val() == undefined){
				e.preventDefault();
				FLUIGC.toast({
					title: 'Erro:',
					message: 'Informe Solicitado por.',
					type: 'danger'
				});
			}
		   }

		   if($('input[name="solicitadoPor"]:checked').val() == 'EB') {
			if (id == "contrato"){
				if($('#cnpjContratada').val() == '' || ($('#cnpjContratada').val() == null)){
					e.preventDefault();
					FLUIGC.toast({
						title: 'Erro:',
						message: 'Informe Contratada.',
						type: 'danger'
					});
				}
			   }
		   }

		   if (id == "secao"){
			if($('input[name="solicitadoPor"]:checked').val() == 'contratada') {
				if($('input[name="solicitadoPor"]:checked').val() == undefined || $('#idContrato').val() == ''){
					e.preventDefault();
					FLUIGC.toast({
						title: 'Erro:',
						message: 'Informe Solicitado por e Contrato.',
						type: 'danger'
					});
				}
			}
		   }
		});
	}

	, setFilterZoomContrato: function(){

		let solicitadoPor = $('input[name="solicitadoPor"]:checked').val() == undefined ? null : $('input[name="solicitadoPor"]:checked').val()
        let colleagueId = $('#idSolicitante').val() == '' ? null : $('#idSolicitante').val()
        let cnpjContratada = $('#cnpjContratada').val() == '' ? null : $('#cnpjContratada').val()
		reloadZoomFilterValues("contrato", "solicitadoPor," + solicitadoPor + ',colleagueId,' + colleagueId + ',cnpjContratada,' + cnpjContratada)
		
	}

	, setFilterZoomSecao: function(){

		let solicitadoPor = $('input[name="solicitadoPor"]:checked').val() == undefined ? null : $('input[name="solicitadoPor"]:checked').val()
        let cd_contrato = $('#idContrato').val();
		reloadZoomFilterValues("secao", "solicitadoPor," + solicitadoPor + ',cd_contrato,' + cd_contrato)
		
	}

	, setFilterZoomObrigacoes: function(){

		let cd_contrato = $('#idContrato').val();

		$('#tableObrigacoesAcessorias').each(function(){
			let row = $(this);
			$(row).find("select").each(function(){
				let id = $(this).prop("id");
				reloadZoomFilterValues(id, "cd_contrato," + cd_contrato);
			})
		})		
	}
	, setFilterZoomEtapa: function(){

		let cd_contrato = $('#idContrato').val();

		$('#tableEtapas').each(function(){
			let row = $(this);
			$(row).find("select").each(function(){
				let id = $(this).prop("id");
				reloadZoomFilterValues(id, "cd_contrato," + cd_contrato);
			})
		})		
	}

	, addObrigacoes: function(){
		if($('#idContrato').val() == ''){
			FLUIGC.toast({
				title: 'Erro:',
				message: 'Informe Contrato.',
				type: 'danger'
			});
		} else {
			let idxObrigacoes = wdkAddChild('tableObrigacoesAcessorias');
			MAIN.setFilterZoomObrigacoes()
		}
	}

	, addReunioesPreCGM: function(){
		let idxObrigacoes = wdkAddChild('tableReunioesPreCGM');
		MAIN.enabledCalendar();
	}

	, addReunioesCGM: function(){
		let idxObrigacoes = wdkAddChild('tableReunioesCGM');
		MAIN.enabledCalendar();
	}

	, addEtapas: function(){
		if($('#idContrato').val() == ''){
			FLUIGC.toast({
				title: 'Erro:',
				message: 'Informe Contrato.',
				type: 'danger'
			});
		} else {
			let idxEtapas = wdkAddChild('tableEtapas');
			MAIN.setFilterZoomEtapa()
		}
	}

	, verificarSecoesUsuario: function(){
		
		if($('input[name="solicitadoPor"]:checked').val() == 'EB'){

			let constraintSecao = new Array()
			constraintSecao.push(DatasetFactory.createConstraint("solicitadoPor", 'EB', 'EB', ConstraintType.MUST))
			let dsSecoesUsuario = DatasetFactory.getDataset('sm_consulta_secoes_vinculadas', null, constraintSecao, null)

			if(dsSecoesUsuario != null && dsSecoesUsuario != undefined && dsSecoesUsuario.values.length > 0){
				if(dsSecoesUsuario.values[0].txt_sigla == 'ERRO'){
					FLUIGC.toast({
						title: 'Erro:',
						message: dsSecoesUsuario.values[0].txt_nome,
						type: 'danger'
					});
					enableContainer($("form")[0],false);
				} else {
					if (dsSecoesUsuario.values.length == 1) {
						let selectedItem = { 	inputId: 'secao',
												txt_sigla: dsSecoesUsuario.values[0].txt_sigla,
												txt_nome: dsSecoesUsuario.values[0].txt_nome,
												num_id_grupo_chefe: dsSecoesUsuario.values[0].num_id_grupo_chefe,
											}
						window['secao'].setValue(dsSecoesUsuario.values[0].txt_nome);
						setSelectedZoomItem(selectedItem)
					}
				}
			}
		}
	}
	, createDemanda: function(){

		MAIN.loading.show();

		//VALIDAR E PREPARAR DADOS PARA INICIAR SOLICITAÇÃO DE DEMANDA
		let msg = '';

		if ($('#idFluig').val() == ''){
			msg += 'Campo ID Fluig (idFluig) obrigatório para criar Demandanda. Entre em contato com Administrador SAFE.</br>'
		} else {
			var nr_solicitacao_origem = $('#idFluig').val();
			var comentario = 'Demanda iniciada através da Solicitação de Mudança (SM) '+ nr_solicitacao_origem;
		}
		if($('#nmDemandante').val() == ''){
			msg += 'Campo Demandante obrigatório para criar Demandanda.</br>'
		} else {
			var nm_demandante = $('#nmDemandante').val();
			if($('#idDemandante').val() == ''){
				msg += 'Campo ID Demandante (idDemandante) obrigatório para criar Demandanda. Entre em contato com Administrador SAFE.</br>'
			} else {
				var matricula_demandante = $('#idDemandante').val();
			}
		}

		if($('#nmDemandado').val() == '' || $('#nmDemandado').val() == null || $('#nmDemandado').val() == undefined){
			msg += 'Campo Demandado obrigatório para criar Demandanda.</br>'
		} else {
			var nm_demandado = $('#nmDemandado').val();
			var cargo_demandado = $('#cargoDemandado').val();
			var experiencia_demandado = $('#experienciaDemandado').val();
			if($('#idDemandado').val() == ''){
				msg += 'Campo ID Demandado (idDemandado) obrigatório para criar Demandanda. Entre em contato com Administrador SAFE.</br>'
			} else {
				var matricula_demandado = $('#idDemandado').val();
			}
			if($('#secaoDemandado').val() == ''){
				msg += 'Campo Seção Demandado (secaoDemandado) obrigatório para criar Demandanda. Entre em contato com Administrador SAFE.</br>'
			} else {
				var cod_secao_demandado = $('#secaoDemandado').val();
			}
			
		}

		if($('#idDemandante').val() == $('#idDemandado').val()){
			msg += 'Demandante e Demandado não podem ser a mesma pessoa.</br>'
		}

		if($('#dataLimiteDemanda').val() == ''){
			msg += 'Campo Data limite demanda obrigatório para criar Demandanda.</br>'
		} else {
			var dt_limite = $('#dataLimiteDemanda').val();
		}

		if($('#descDemanda').val() == ''){
			msg += 'Campo Descrição obrigatório para criar Demandanda.</br>'
		} else {
			var descricao = $('#descDemanda').val();
			var assunto = $('#assuntoDemanda').val();
		}

		//pega seção do fiscal
		var constraintsSecoesDemandante = new Array()
		constraintsSecoesDemandante.push(DatasetFactory.createConstraint('colleagueId', $('#idDemandante').val(), $('#idDemandante').val(), ConstraintType.MUST))
		var dsSecoesDemandante = DatasetFactory.getDataset("geral_consulta_secoes_demandante", null, constraintsSecoesDemandante, null);						
		if (dsSecoesDemandante && dsSecoesDemandante != null && dsSecoesDemandante.values.length > 0){
			var cod_secao_demandante = dsSecoesDemandante.values[0].txt_sigla;
			var secao_autorizadores = "Pool:Group:"+dsSecoesDemandante.values[0].num_id_grupo_autorizador;
		} else {
			msg += 'Não foi localizada nenhuma Seção para o Demandante no Cadastro de Seções (geral_consulta_secoes_demandante).'
		}

		//verifica se canal PROCESSO está cadastrado.
		var constraintsCanais = new Array()
		constraintsCanais.push(DatasetFactory.createConstraint('num_codigo', 'PROCESSO', 'PROCESSO', ConstraintType.MUST))
		let dsCanal = DatasetFactory.getDataset('demanda_cadastro_canais', null, constraintsCanais, null)
		if(dsCanal != null && dsCanal != undefined && dsCanal.values.length > 0){
			var canal = dsCanal.values[0].txt_nome;
		} else {
			msg += 'O canal Processo (PROCESSO) não esta cadastrado em Cadastro de Canais (demanda_cadastro_canais).'
		}
		
		//verifica se categoria CONFIGURAÇÃO está cadastrado.
		var constraintsCategoria = new Array()
		constraintsCategoria.push(DatasetFactory.createConstraint('num_codigo', 'CONFIGURACAO', 'CONFIGURACAO', ConstraintType.MUST))
		let dsCategoria = DatasetFactory.getDataset('demandas_cadastro_categoria', null, constraintsCategoria, null)
		if(dsCategoria != null && dsCategoria != undefined && dsCategoria.values.length > 0){
			var categoria = dsCategoria.values[0].txt_nome;
		} else {
			msg +=  'A categoria Configuração (CONFIGURACAO) não esta cadastrado em Cadastro de Categorias (demandas_cadastro_categoria).'
		}

		var nm_registrante = CONTEXT.USER;
		var prioridade = '0'
		var dt_abertura = moment().format('DD/MM/YYYY');
		
		if(msg != ''){
			MAIN.loading.hide();
			FLUIGC.toast({
				title: 'Atenção:',
				message: msg,
				type: 'danger'
			});

		} else {
			
			//PREPARAR PARAMETROS EXECUTAR DATASET QUE CRIA SOLICITACAO DE DEMANDAS
			var constraints = new Array();			
			constraints.push(DatasetFactory.createConstraint("nr_solicitacao_origem", nr_solicitacao_origem, nr_solicitacao_origem, ConstraintType.MUST));
			constraints.push(DatasetFactory.createConstraint("comentario", comentario, comentario, ConstraintType.MUST));
			constraints.push(DatasetFactory.createConstraint("nm_registrante", nm_registrante, nm_registrante, ConstraintType.MUST));
			constraints.push(DatasetFactory.createConstraint("nm_demandante", nm_demandante, nm_demandante, ConstraintType.MUST));
			constraints.push(DatasetFactory.createConstraint("nm_demandado", nm_demandado, nm_demandado, ConstraintType.MUST));
			constraints.push(DatasetFactory.createConstraint("matricula_demandante", matricula_demandante, matricula_demandante, ConstraintType.MUST));
			constraints.push(DatasetFactory.createConstraint("matricula_demandado", matricula_demandado, matricula_demandado, ConstraintType.MUST));
			constraints.push(DatasetFactory.createConstraint("cod_secao_demandante", cod_secao_demandante, cod_secao_demandante, ConstraintType.MUST));
			constraints.push(DatasetFactory.createConstraint("cod_secao_demandado", cod_secao_demandado, cod_secao_demandado, ConstraintType.MUST));
			constraints.push(DatasetFactory.createConstraint("secao_autorizadores", secao_autorizadores, secao_autorizadores, ConstraintType.MUST));
			constraints.push(DatasetFactory.createConstraint("cargo", cargo_demandado, cargo_demandado, ConstraintType.MUST));
			constraints.push(DatasetFactory.createConstraint("experiencias", experiencia_demandado, experiencia_demandado, ConstraintType.MUST));
			constraints.push(DatasetFactory.createConstraint("assunto", assunto, assunto, ConstraintType.MUST));
			constraints.push(DatasetFactory.createConstraint("dt_limite", dt_limite, dt_limite, ConstraintType.MUST));
			constraints.push(DatasetFactory.createConstraint("dt_abertura", dt_abertura, dt_abertura, ConstraintType.MUST));
			constraints.push(DatasetFactory.createConstraint("categoria", categoria, categoria, ConstraintType.MUST));
			constraints.push(DatasetFactory.createConstraint("canal", canal, canal, ConstraintType.MUST));
			constraints.push(DatasetFactory.createConstraint("prioridade", prioridade, prioridade, ConstraintType.MUST));
			constraints.push(DatasetFactory.createConstraint("descricao", descricao, descricao, ConstraintType.MUST));
		
			var dsInicializaDemanda = DatasetFactory.getDataset("geral_inicia_demanda", null, constraints, null);						
			
			if (dsInicializaDemanda && dsInicializaDemanda != null && dsInicializaDemanda.values.length > 0){
				
				let erroIniciarDemanda = dsInicializaDemanda.values[0]['erro']
				
				if(erroIniciarDemanda != null && erroIniciarDemanda != undefined && erroIniciarDemanda != ''){
					$('#numDemanda').val(dsInicializaDemanda.values[0]['retorno']);
					MAIN.statusCheckDemanda();
					MAIN.loading.hide();
					
				} else {
					MAIN.loading.hide();
					FLUIGC.toast({
						title: 'Erro: ',
						message: 'Nao foi possível iniciar a Solicitação de Demananda: ' + erroIniciarDemanda + '.',
						type: 'danger'
					});
				}

			} else{
				MAIN.loading.hide();
				FLUIGC.toast({
					title: 'Erro: ',
					message: 'Nao foi possível iniciar a Solicitação de Demananda. Entre em contato com Administrador SAFE.',
					type: 'danger'
				});
		
			}
		}
	}

	, statusCheckDemanda: function(){

		if(CONTEXT.CURRENT_STATE == Activity.ELABORAR_SM){
		
			//Consultar demanda criada verificar e atualizar campo com status.
			let idFluigSM = $('#idFluig').val()

			let constraintsDemanda = new Array();		
				constraintsDemanda.push(DatasetFactory.createConstraint("nr_solicitacao_origem", idFluigSM, idFluigSM, ConstraintType.MUST));
				constraintsDemanda.push(DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST));
			let dsDadosDemanda = DatasetFactory.getDataset("PR001", null, constraintsDemanda, null);
	
			if(dsDadosDemanda != null && dsDadosDemanda.values.length > 0){
				
				if (dsDadosDemanda.values[0]['solic_cancelada'] == 'true'){
					$('#statusDemanda').val('Demanda Cancelada');
				} else {
					$('#statusDemanda').val(dsDadosDemanda.values[0]['status']);
				}		
				
				$("#respElaboracao").empty();
				$('#respElaboracao').append('<option value="demandar">Demandar outro responsável</option>');

				$('#btnCriarDemanda').hide()
				$('#divGestaoDemandas').show()
					
				setTimeout(function(){

					$('#numDemanda').val(dsDadosDemanda.values[0]['nr_demanda'])
					$('#nmDemandante').val(dsDadosDemanda.values[0]['zoom_demandante'])
					$('#idDemandante').val(dsDadosDemanda.values[0]['matricula_demandante'])
					window['nmDemandado'].setValue(dsDadosDemanda.values[0]['zoom_demandado'])
					$('#idDemandado').val(dsDadosDemanda.values[0]['matricula_demandado']);
					$('#cargoDemandado').val(dsDadosDemanda.values[0]['cargo'])
					$('#experienciaDemandado').val(dsDadosDemanda.values[0]['experiencia'])
					
					$('#secaoDemandado').val(dsDadosDemanda.values[0]['secao_demandado']);
					let dataLimiteDemanda = dsDadosDemanda.values[0]['dt_limite']
					$('#dataLimiteDemanda').val(dataLimiteDemanda);
					dataLimiteDemanda = dataLimiteDemanda.split('/')
					$('#dataLimiteDemandaFiltro').val(dataLimiteDemanda[2] +'/'+ dataLimiteDemanda[1] +'/'+ dataLimiteDemanda[0])
					$('#descDemanda').val(dsDadosDemanda.values[0]['descricao']);
					$('#assuntoDemanda').val(dsDadosDemanda.values[0]['assunto']);

					enableContainer($("#divGestaoDemandas"),false);
					enableField($('#respElaboracao'), false);
					

				}, 500);

			} else {
				if ($('#numDemanda').val() !=''){

					MAIN.loading.hide();
					$("#respElaboracao").empty();
					$('#respElaboracao').append('<option value="demandar">Demandar outro responsável</option>');
					enableContainer($("#divGestaoDemandas"),false);
					enableField($('#respElaboracao'), false);
					$('#btnCriarDemanda').hide()
					$('#divGestaoDemandas').show()
					FLUIGC.toast({
						title: 'Erro: ',
						message: 'Não foi possivel verificar o status da Demanda ' + $('#numDemanda').val() + '. Entre em contato com Administrador SAFE.',
						type: 'danger'
					});
					
				} else {	

					if($("#respElaboracao option:selected").val() == 'demandar'){
						$("#respElaboracao").empty();
						$('#respElaboracao').append('<option value="demandar" selected="selected">Demandar outro responsável</option>');
						$('#respElaboracao').append('<option value="' + CONTEXT.USER + '">' + CONTEXT.NAME_USER + '</option>');
						$('#divGestaoDemandas').show()
					} else {
						$("#respElaboracao").empty();
						$('#respElaboracao').append('<option value="' + CONTEXT.USER + '" selected="selected">' + CONTEXT.NAME_USER + '</option>');
						$('#respElaboracao').append('<option value="demandar">Demandar outro responsável</option>');
					}
					
					$('#respElaboracao').on('change', function() {														
						if($("#respElaboracao option:selected").val() == 'demandar'){
							$('#divGestaoDemandas').show()
							$('#btnCriarDemanda').show()
							$('#idDemandante').val(CONTEXT.USER)
							$('#nmDemandante').val(CONTEXT.NAME_USER)
							$('#assuntoDemanda').val('Elaboração da Solicitação de Mudança do Contrato '+ $('#numSM').val() + ' (Nº SAFE '+ $('#idFluig').val() +')');
							$('#dataLimiteDemanda').val(moment().add(1, 'days').format('DD/MM/YYYY'));
							$('#dataLimiteDemandaFiltro').val(moment().add(1, 'days').format('YYYY/MM/DD'));
							$('#descDemanda').val('Elaboração da Solicitação de Mudança do Contrato '+ $('#numSM').val() + '(Nº SAFE '+ $('#idFluig').val() +')');
		
						} else{
							$('#divGestaoDemandas').hide()
							MAIN.clearFieldsGestaoDemandas()
						}
					});
				}
			}

		} else {

			if($('#respElaboracao').val() == 'demandar'){
				$("#respElaboracao").empty();
				$('#respElaboracao').append('<option value="demandar" selected="selected">Demandar outro responsável</option>');
				$('#divGestaoDemandas').show()
				$('#btnCriarDemanda').hide()
			} else {
				$('#respElaboracao').append('<option value="' +$('#idRespElaboracao').val() + ' " selected="selected">' + $('#nmRespElaboracao').val() + '</option>');
				$('#divGestaoDemandas').hide()
			}
		}

		/* if(CONTEXT.MODE == 'VIEW'){
			enableContainer($("#panelElaboracaoSM"),false);
		} */
	}

	, consultarAditivoApostilamento: function(){

		if($('#numAditivoApostilamento').val() == ''){
			FLUIGC.toast({
				title: 'Erro:',
				message: 'Não há Aditivo ou Apostilamento associado a está SM.',
				type: 'danger'
			});

		} else {

			var constraints = new Array()
				constraints.push(DatasetFactory.createConstraint('metadata#active', 'true', 'true', ConstraintType.MUST))
				constraints.push(DatasetFactory.createConstraint('num_adt_apo', $('#numAditivoApostilamento').val(), $('#numAditivoApostilamento').val(), ConstraintType.MUST))
				constraints.push(DatasetFactory.createConstraint('estado_processo', 'cancelada', 'cancelada', ConstraintType.MUST_NOT))
			var dsPR008 = DatasetFactory.getDataset('PR_008_aditivo_apostilamento', null, constraints, null)

			if( dsPR008 != null && dsPR008 != undefined && dsPR008.values.length > 0) {
				
				let serverURL = parent.WCMAPI.serverURL
				let tenantCode = parent.WCMAPI.tenantCode
				let idFluig = dsPR008.values[0].id_fluig
				let URLaditivoApostilamento = serverURL+'/portal/p/'+tenantCode+'/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=' + idFluig
				window.open(URLaditivoApostilamento, "_blank");

			} else {
				FLUIGC.toast({
					title: 'Erro:',
					message: 'Não foi possível localizar o Aditivo ou Apostilamento ' + $('#numAditivoApostilamento').val() + '.',
					type: 'danger'
				});
			}

		}
	}
}

$(document).ready(function() {
	
	MAIN.init();
	
});