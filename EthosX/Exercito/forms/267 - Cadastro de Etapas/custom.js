$(document).ready(function() { 
	
	init();
	
});

function init(){
	loading: {}
	loading = FLUIGC.loading(window);
	
	if(getWK_MODE() == "VIEW"){
		$("#adicionarRegra").hide();
		$("#adicionarItem").hide();
		
		$("#btnAdicionarIndicador").hide();
		$(".div_lixeira_indicador").hide();
		
		$(".add-grandchild").hide();
	}else{
		if(getWK_MODE() == "ADD"){
			$('#dt_cadastro_etapa').val(moment().format('DD/MM/YYYY'));
		}
	}
	
	if(getWK_MODE() != "ADD")
	{
		carregaInfoDistribuicaoFinanceira();
	}
	
	
	$(".input-date" ).change(function() {
		if(this.value != '')
			validateDate($(this));
	});

    $("#adicionarItem").on("click", function(){
        var idx = TABLES.appendChild("itemComponente");
    });

    $('#adicionarRegra').on('click', function(){
        var index = wdkAddChild("table_regras");
        var sequencial_etapa = $('#cd_etapa').val().split('-')[1];
        var sequencial_regra = ("00000" + index).slice(-5);
        var cd_contrato = $('#cd_contrato').val();

        $('#cd_regra___'+index).val()
	});
	
	$('#adicionarRisco').on('click', function(){
		var index = wdkAddChild("table_riscos");
		$("#cd_risco___"+index).val(FLUIGC.utilities.randomUUID());
		$('.input-date').mask('00/00/0000');
		$(".input-date" ).change(function() {
			if(this.value != '')
				validateDate($(this));
		});
		FLUIGC.switcher.init('#existe_risco___'+index);
		FLUIGC.switcher.onChange('#existe_risco___'+index, function (event, state) {
			var id = this.id.split("existe_risco___")[1];
			if(state === true){
				$("#situacao_risco___"+id).val('aberto');			
		 	} else if (state === false) {
				$("#situacao_risco___"+id).val('');
		   }
		});

		$("#probabilidade_risco___"+index).on('change', function(){
			if(this.value !=""){
				var id = this.id.split("probabilidade_risco___")[1];
				if($("#impacto_risco___"+id).val() !=""){
					var severidade = parseFloat($("#probabilidade_risco___"+id).val()) * parseFloat($("#impacto_risco___"+id).val());
					$("#severidade_risco___"+id).val(severidade.toFixed(2.0));
				}
			}
		});

		$("#impacto_risco___"+index).on('change', function(){
			if(this.value !=""){
				var id = this.id.split("impacto_risco___")[1];
				if($("#probabilidade_risco___"+id).val() !=""){
					var severidade = parseFloat($("#probabilidade_risco___"+id).val()) * parseFloat($("#impacto_risco___"+id).val());
					$("#severidade_risco___"+id).val(severidade.toFixed(2.0));
				}
			}
		});
		$("#situacao_risco___"+index).on('change', function(){
			if(this.value !=""){
				var id = this.id.split("situacao_risco___")[1];
				if(this.value != "" && this.value != "aberto"){
					FLUIGC.switcher.setFalse("#existe_risco___"+id);
				}
			}
		});
    });
	
	$('#cd_identificador').on('click', function(){
		$('.identificador5').mask('00000');
		$('.identificador5').change(function() {
			if(this.value != ''){
				this.value = ("00000" + this.value).slice(-5);
			}
		});
	});
	
	$("#situacao_fisica").on('change', function(){
		$("#justificativa").prev("label").removeClass('required');
		//$("#justificativa").hide();
		$("#justificativa").parent().hide();
		if($('#situacao_fisica').val() == "emExecucao"){
			$('#dt_inicio_execucao').val(moment().format('DD/MM/YYYY'));
		}else{
			$('#dt_inicio_execucao').val("");
			if($('#situacao_fisica').val() == "cancelada"){
				$("#justificativa").prev("label").addClass('required');
				$("#justificativa").parent().show();
				//$("#justificativa").show();
			}
		}
	});
	
	if($('#situacao_fisica').val() == "cancelada"){
		$("#justificativa").prev("label").addClass('required');
		$("#justificativa").parent().show();
		//$("#justificativa").show();
	}else{
		$("#justificativa").prev("label").removeClass('required');
		$("#justificativa").parent().hide();
		//$("#justificativa").hide();
	}
		
	
	$("#considera_valor_caput").on('change', function(){
		if($('#considera_valor_caput').val() == "nao"){
			$("#vl_etapa").prop("readonly",true);			
			$('#vl_etapa').addClass('isDisabled');
			$("#vl_etapa").prev("label").removeClass('required');
			//Calcular valor de Itens e Componentes
			var valor_total_itens = calculaValorTotalItens();
			console.log("valor_total_itens: " + valor_total_itens);
			$('#vl_etapa').val(valor_total_itens);
		}else{
			$("#vl_etapa").prop("readonly",false);
			$('#vl_etapa').removeClass('isDisabled');
			$("#vl_etapa").prev("label").addClass('required');
		}
	});
	
	//Calcular valor de Itens e Componentes
	if($('#considera_valor_caput').val() == "nao"){
		var valor_total_itens = calculaValorTotalItens();
		$('#vl_etapa').val(valor_total_itens);
		$("#vl_etapa").prev("label").removeClass('required');
	}else{
		$("#vl_etapa").prev("label").addClass('required');
	}
		
	
	$("#link_raiz" ).on("click", function(){		        
		  let field_id = $(this).prop("id");
		  let h_field = $("#hidden_"+field_id);
		  
		  if(h_field.val() == ""){
			  FLUIGC.toast({
				  title: '',
				  message: 'Pasta raiz não selecionada!',
				  type: 'warning'
			  });
			  return false;
		  }else{
			  $($(this).prop("href",h_field.val()))
		  }
	});
	
	//Verificações de Abas
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		let target = $(e.target).attr("href");
	  
		if(target == "#itens-etapa"){
			let contrato = $("#cd_contrato");
			let secao = $("#sigla_secao");
			if(contrato.val() == "" || secao.val() == ""){
				loading.hide();
				FLUIGC.toast({
					   title: '',
					   message: 'Contrato e/ou Seção não informado(s) na aba "Dados da Etapa".',
					   type: 'warning'
				     });
				$('.nav-tabs a[href="#dados-etapa"]').tab('show');
				setTimeout(function(){
				    contrato.focus();
				}, 1000);
			}
		}else if(target == "#versoes-etapa"){
			STEP_VERSION.init();
		}
	});
	
	$( "#btn_corrigir_versao" ).on("click", function(){
		STEP_VERSION.correctStep();
	});
	
	$( "#btn_versionar_versao" ).on("click", function(){
		STEP_VERSION.versionStep();
	});
	
	$( "#btn_iniciar_acao_versao" ).on("click", function(){
		STEP_VERSION.initAction();
	});
	
	$( "#btn_cancelar_acao_versao" ).on("click", function(){
		STEP_VERSION.cancelAction();
	});
	
	$( "#btn_cancelar_versao" ).on("click", function(){
		STEP_VERSION.cancelStep();
	});
	
	$( "#btn_solicitar_aprovacao_versao" ).on("click", function(){
		STEP_VERSION.requestVersionApproval();
	});
	
	$("input[id^=controle_aprovacao___]").each(function(e){
		if($(this).val() == "iniciar")
			$(this).val("iniciado");
	});
	
    $("#btnadd_tableEmpenho").hide();
    $(".trash-tableEmpenho").hide();

    if(getWK_MODE() == "VIEW"){
    	
    }else{
	    setInterval(function(){
	        TABLES.saveFieldsValue("itemComponente");
	    }, 1000); 
    }

    setTimeout(function(){
        TABLES.loadFields("itemComponente");
    }, 3000);
         
    FLUIGC.calendar('.input-date', {
        pickDate: true
    });

    $(".money").maskMoney({ 
		thousands: '.', 
		decimal: ',', 
		precision: 2
    });
    
}

let STEP_VERSION = {
		versao_pendente: null,
		init: function(){
			STEP_VERSION.versao_pendente = STEP_VERSION.getContractVersion();
			
			if(STEP_VERSION.versao_pendente)
				STEP_VERSION.createFirstVersion();
		},
		getTableSequence: function(tableId){
			return $('table[id='+tableId+'] > tbody > tr:gt(0)').length;
		},
		createFirstVersion: function(){
			if(STEP_VERSION.getTableSequence("table_versoes") < 1){
				let index = wdkAddChild("table_versoes");
				
				$("#tb_acao_versao_etapa___"+index).val("Versionar");
				$("#tb_versao_etapa___"+index).val(STEP_VERSION.versao_pendente.versao);
				$("#tb_dt_versao___"+index).val(moment(new Date).format("DD/MM/YYYY"));
				$("#tb_nm_usuario_versao___"+index).val(CONTEXT.NAME_USER);
				$("#tb_cd_usuario_versao___"+index).val(CONTEXT.USER);
				$("#situacao_versao___"+index).val(STEP_VERSION.versao_pendente.situacao);
				$("#tb_ds_versao_etapa___"+index).val(STEP_VERSION.versao_pendente.ds_versao);
				$("#tb_ds_versao_contrato___"+index).prop("readonly",false);
				$("#tb_ds_versao_contrato___"+index).prev("label").addClass("required");
			}
			
			STEP_VERSION.showVersionFields(false);
		},
		configVersionButton: function(){
			if(STEP_VERSION.getStepVersion().situacao == "Pendente"){
				enableField($( "#btn_corrigir_versao" ),false);
				enableField($( "#btn_versionar_versao" ),false);
				enableField($( "#btn_cancelar_versao" ),false);
				enableField($( "#btn_solicitar_aprovacao_versao" ),true);
			}else if(STEP_VERSION.getStepVersion().situacao == "Em Aprovação"){
				enableField($( "#btn_corrigir_versao" ),false);
				enableField($( "#btn_versionar_versao" ),false);
				enableField($( "#btn_cancelar_versao" ),false);
				enableField($( "#btn_solicitar_aprovacao_versao" ),false);
			}else{
				enableField($( "#btn_corrigir_versao" ),true);
				enableField($( "#btn_versionar_versao" ),true);
				enableField($( "#btn_cancelar_versao" ),false);
				enableField($( "#btn_solicitar_aprovacao_versao" ),false);
			}
		},
		getStepVersion: function(){
			let dados_etapa = {};
			$('table[id=table_versoes] > tbody > tr:last').each(function(){
				let acao = $(this).find("input[id^=tb_acao_versao_etapa___]");
				let index = acao.prop("id").split("___")[1];
				let versao = $("#tb_versao_etapa___"+index).val();
				let descritivo = $("#tb_ds_versao_etapa___"+index).val();
				let data_acao = $("#tb_dt_versao___"+index).val();
				let usuario = $("#tb_nm_usuario_versao___"+index).val();
				let cd_usuario = $("#tb_cd_usuario_versao___"+index).val();
				let situacao = $("#situacao_versao___"+index).val();
				
				dados_etapa["index"] = index;
				dados_etapa["acao"] = acao.val();
				dados_etapa["versao"] = versao;
				dados_etapa["descritivo"] = descritivo;
				dados_etapa["data_acao"] = data_acao;
				dados_etapa["usuario"] = usuario;
				dados_etapa["cd_usuario"] = cd_usuario;
				dados_etapa["situacao"] = situacao;
			});
			
			return dados_etapa;
		},
		getContractVersion: function(){
			let contrato = $("#cd_contrato").val();
			
			if(contrato == ""){
				FLUIGC.toast({
					title: 'Atenção!',
					message: 'Código do contrato não informado neste cadastro!',
					type: 'danger'
				});
				enableField($( "#btn_corrigir_versao" ),false);
				enableField($( "#btn_versionar_versao" ),false);
				enableField($( "#btn_cancelar_versao" ),false);
				enableField($( "#btn_solicitar_aprovacao_versao" ),false);
				return false;
			}else{				
				let versoes_contrato = null;
				let constraints_contract = new Array();
				constraints_contract.push(DatasetFactory.createConstraint('cd_contrato', contrato, contrato, ConstraintType.MUST));
				let ds_contrato_versoes = DatasetFactory.getDataset('contrato_versoes', null, constraints_contract, null);			
				if(ds_contrato_versoes && ds_contrato_versoes.values.length > 0){				
					versoes_contrato = ds_contrato_versoes.values[(ds_contrato_versoes.values.length-1)];
				}
				
				return versoes_contrato;
			}
		},
		showVersionFields: function(param){
			if(param){				
				$("#version-fields").show();
				$("#controle_acao").val("1");
				enableField($( "#btn_corrigir_versao" ),false);
				enableField($( "#btn_versionar_versao" ),false);
				enableField($( "#btn_cancelar_versao" ),false);
				enableField($( "#btn_solicitar_aprovacao_versao" ),false);
			}else{
				$("#version-fields").hide();
				$("#controle_acao").val("");
				$("#acao_versao_etapa").val("");
				$("#versao_contrato").val("");
				$("#ds_versao_contrato").val("");
				$("#nm_usuario_versao").val("");
				$("#cd_usuario_versao").val("");
				STEP_VERSION.configVersionButton();
			}
		},
		requestVersionApproval: function(){
			let contrato = $("#cd_contrato").val();
			if(contrato == ""){
				FLUIGC.toast({
					title: 'Atenção!',
					message: 'Código do contrato não informado neste cadastro!',
					type: 'danger'
				});
				return false;
			}else{			
				FLUIGC.message.confirm({
					message: 'Deseja iniciar processo de aprovação da versão da etapa pelo fiscal?',
					title: 'Versionamento de Etapa',
					labelYes: 'Sim',
					labelNo: 'Não'
				}, function(result, el, ev) {
					if(result){
						let step = STEP_VERSION.getStepVersion();						
						let index = step.index;
						
						$("#acao_versao_etapa___"+index).val("Aprovar");		
						$("#situacao_versao___"+index).val("Em Aprovação");
						$("#controle_aprovacao___"+index).val("iniciar");
						
						FLUIGC.toast({
							title: 'Atenção!',
							message: 'Salve os dados da etapa para iniciar a aprovação da versão!',
							timeout: 'slow',
							type: 'success'
						});
						STEP_VERSION.showVersionFields(false);
					}
				});	
			}
		},
		correctStep: function(){
			let contrato = $("#cd_contrato").val();
			if(contrato == ""){
				FLUIGC.toast({
					title: 'Atenção!',
					message: 'Código do contrato não informado neste cadastro!',
					type: 'danger'
				});
				return false;
			}else{			
				FLUIGC.message.confirm({
					message: 'Deseja realmente iniciar a correção da versão '+contract.versao+'?',
					title: 'Versionamento de Contrato',
					labelYes: 'Sim',
					labelNo: 'Não'
				}, function(result, el, ev) {
					if(result){
						STEP_VERSION.showVersionFields(true);						
						let index = STEP_VERSION.versao_pendente.index;
						
						$("#acao_versao_contrato").val("Corrigir");
						$("#tp_versionamento_contrato").val("na");
						$('#tp_versionamento_contrato option[value="na"]').show();
						$("#tp_versionamento_contrato").prop("disabled",true);
						$("#versao_contrato").val(contract.versao);
						$("#nm_usuario_versao").val(CONTEXT.NAME_USER);
						$("#cd_usuario_versao").val(CONTEXT.USER);										
					}
				});	
			}
		},
		versionStep: function(){
			let contrato = $("#cd_contrato").val();
			if(contrato == ""){
				FLUIGC.toast({
					title: 'Atenção!',
					message: 'Código do contrato não informado neste cadastro!',
					type: 'danger'
				});
				return false;
			}else{
				FLUIGC.message.confirm({
				    message: 'Deseja realmente iniciar o versionamento do contrato?',
				    title: 'Versionamento de Contrato',
				    labelYes: 'Sim',
				    labelNo: 'Não'
				}, function(result, el, ev) {
					if(result){
						STEP_VERSION.showVersionFields(true);
						let index = STEP_VERSION.versao_pendente.index;
						
						$("#acao_versao_contrato").val("Versionar");
						
						$("#nm_usuario_versao").val(CONTEXT.NAME_USER);
						$("#cd_usuario_versao").val(CONTEXT.USER);	
						
					}
				});	
			}
		},
		validateStep: function(){
			let contrato = $("#cd_contrato").val();
			let tipo = $("#tp_versionamento_contrato").val();
			
			if(tipo != ""){								
				let constraintsDocument = new Array();
				constraintsDocument.push(DatasetFactory.createConstraint('cd_contrato', contrato, contrato, ConstraintType.MUST));
				constraintsDocument.push(DatasetFactory.createConstraint('rb_SM_de', tipo, tipo, ConstraintType.MUST));
				let ds_aditivo_apostilamento = DatasetFactory.getDataset('PR_008_aditivo_apostilamento', null, constraintsDocument, null);
				
				if(ds_aditivo_apostilamento && ds_aditivo_apostilamento.values.length > 0){	
					let finalizadas = 0;
					let em_andamento = 0;
					
					for(var i=0;i<ds_aditivo_apostilamento.values.length;i++){
						if(ds_aditivo_apostilamento.values[i].estado_processo == "finalizada")
							finalizadas++;
						else{
							em_andamento++;
						}
					}
					
					if(finalizadas == 0){
						FLUIGC.toast({
							title: 'Atenção!',
							message: 'Processo de '+tipo+' ainda não finalizado para o contrato '+contrato+'!',
							type: 'danger'
						});
						$("#versao_contrato").val("");
						return false;
					}else{
						let tipo_prefixo = (tipo == "aditivo") ? "ADT" : "APO";
						let quantidade_apo_adt = STEP_VERSION.getVersionsBy(tipo_prefixo);
						if(quantidade_apo_adt >= finalizadas){
							let msg = (em_andamento > 0) ? 'Processo de '+tipo+' ainda não finalizado para o contrato'+contrato+'!' : 'Nenhum processo de '+tipo+' encontrado no SAFE para o contrato '+contrato+'!';
							FLUIGC.toast({
								title: 'Atenção!',
								message: msg,
								type: 'danger'
							});
							$("#versao_contrato").val("");
							return false;
						}else{
							let version = tipo_prefixo+"-"+(quantidade_apo_adt+1)+"-"+contrato;
							$("#versao_contrato").val(version);
						}
					}
				}else{		
					FLUIGC.toast({
						title: 'Atenção!',
						message: 'Nenhum processo de '+tipo+' encontrado no SAFE para o contrato '+contrato+'!',
						type: 'danger'
					});
					$("#versao_contrato").val("");
					return false;
				}
			}
		},
		confirmStep: function(){	
			let contrato = $("#cd_contrato").val();
			if(contrato == ""){
				FLUIGC.toast({
					title: 'Atenção!',
					message: 'Código do contrato não informado neste cadastro!',
					type: 'danger'
				});
				return false;
			}else{
				let step = STEP_VERSION.versao_pendente;
				FLUIGC.message.confirm({
				    message: 'Deseja realmente confirmar a versão '+contract.versao+' do contrato?',
				    title: 'Versionamento de Contrato',
				    labelYes: 'Sim',
				    labelNo: 'Não'
				}, function(result, el, ev) {
					if(result){
						let constraintsDocument = new Array();
						constraintsDocument.push(DatasetFactory.createConstraint('cd_contrato', contrato, contrato, ConstraintType.MUST));
						constraintsDocument.push(DatasetFactory.createConstraint('estado_processo', "fim_aprovado", "fim_aprovado", ConstraintType.MUST_NOT));
						let ds_aprovacao_etapa = DatasetFactory.getDataset('PR_021_aprovacao_versao_etapa', null, constraintsDocument, null);
	
						if(ds_aprovacao_etapa && ds_aprovacao_etapa.values.length > 0){
							for(var i=0;i<ds_aprovacao_etapa.values.length;i++){								
								FLUIGC.toast({
									title: 'Atenção!',
									message: 'Versão '+step.versao+' não pode ser confirmada pois existem versões da etapa em aprovação para o contrato '+contrato+'!',
									type: 'danger'
								});
							}
							return false;
						}else{						
							let index = STEP_VERSION.versao_pendente.index;
							
							if($("#tb_ds_versao_contrato___"+index).val() == ""){
								FLUIGC.toast({
									title: 'Atenção!',
									message: 'Campo Descritivo é obrigatório!',
									type: 'danger'
								});
								return false;
							}else{								
								$("#tb_dt_efetivacaoa_versao___"+index).val(moment(new Date()).format("DD/MM/YYYY"));
								$("#situacao_versao___"+index).val("Confirmada");
								$("#tb_ds_versao_contrato___"+index).prop("readonly",true);
								$("#tb_ds_versao_contrato___"+index).prev("label").removeClass("required");
								STEP_VERSION.showVersionFields(false);
								
								FLUIGC.toast({
									title: '',
									message: 'Versão '+step.versao+' confirmada com sucesso!',
									type: 'success'
								});
							}							
						}
					}
				});	
			}
		},
		initAction: function(){
			let msg = ($("#acao_versao_contrato") == "Corrigir") ? "Deseja realmente corrigir a versão do contrato corrente?" : "Deseja realmente realizar o versionamento do contrato?";
			FLUIGC.message.confirm({
			    message: msg,
			    title: 'Versionamento de Contrato',
			    labelYes: 'Sim',
			    labelNo: 'Não'
			}, function(result, el, ev) {
				if(result){
					let acao = $("#acao_versao_contrato").val();
					let tipo = $("#tp_versionamento_contrato").val();
					let versao =$("#versao_contrato").val();
					let usuario = $("#nm_usuario_versao").val();
					let cd_usuario = $("#cd_usuario_versao").val();
					let descritivo = $("#ds_versao_contrato").val();
					
					if(acao == "" || tipo == "" || versao == "" || usuario == "" || cd_usuario == "" || descritivo == ""){
						 FLUIGC.toast({
							  title: 'Atenção:',
							  message: 'Todos os campos devem estar preenchidos para iniciar a ação!',
							  type: 'danger'
						  });
						  return false;
					}else{
						if(acao == "Corrigir"){							
							let index = STEP_VERSION.versao_pendente.index;
							
							$("#tb_dt_efetivacao_versao___"+index).val(moment(new Date).format("DD/MM/YYYY"));
							$("#tb_nm_usuario_versao___"+index).val($("#nm_usuario_versao").val());
							$("#tb_cd_usuario_versao___"+index).val($("#cd_usuario_versao").val());				
							$("#situacao_versao___"+index).val("Pendente");
							$("#tb_ds_versao_contrato___"+index).val($("#ds_versao_contrato").val());
							
							STEP_VERSION.showVersionFields(false);														
						}else if(acao == "Versionar"){
							let index = wdkAddChild("table_versoes");
							
							$("#tb_acao_versao_contrato___"+index).val(acao);
							$("#tb_tp_versionamento_contrato___"+index).val(tipo);
							$("#tb_versao_contrato___"+index).val(versao);
							$("#tb_dt_acao_versao___"+index).val(moment(new Date).format("DD/MM/YYYY"));
							$("#tb_nm_usuario_versao___"+index).val(usuario);
							$("#tb_cd_usuario_versao___"+index).val(cd_usuario);
							$("#situacao_versao___"+index).val("Pendente");
							$("#tb_ds_versao_contrato___"+index).prop(descritivo);
						}
						
						FLUIGC.toast({
							title: '',
							message: 'Versão '+versao+' atualizada com sucesso!',
							type: 'success'
						});
						STEP_VERSION.showVersionFields(false);
					}				
				}
			});	
		},
		getVersionsBy: function(prefixo){
			let quantity = 0;
			$('table[id=table_versoes] > tbody > tr:gt(0)').each(function(){
				let tipo = $(this).find("input[id^=tb_versao_contrato___]").val();
				if(tipo.indexOf(prefixo) > -1){
					quantity++;
				}
			});
			return quantity;
		},
		cancelAction: function(){
			STEP_VERSION.showVersionFields(false);
		}
}

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
	   objeto.focus();
	}
}

function createIdentifier(){
	var cd_contrato = $('#cd_contrato').val();
    var constraintEtapas = new Array();
	constraintEtapas.push(DatasetFactory.createConstraint('cd_contrato', cd_contrato, cd_contrato, ConstraintType.MUST));
	constraintEtapas.push(DatasetFactory.createConstraint('metadata#active', 'true', 'true', ConstraintType.MUST));
	
    var dsEtapas = DatasetFactory.getDataset('geral_cadastro_etapa', null, constraintEtapas, ['cd_identificador']);
    
    
    if(dsEtapas != null && dsEtapas != undefined && dsEtapas.values.length > 0) {
    	
        var _sequencial = dsEtapas.values[dsEtapas.values.length-1].cd_identificador;
        if(_sequencial != null){
	        _sequencial = parseInt(_sequencial);
	        (_sequencial == 0) ? _sequencial = 1 : _sequencial++;
	        _sequencial = ("00000" + _sequencial).slice(-5);
	        
	        $('#cd_identificador').val(_sequencial);
        }else{
        	$('#cd_identificador').val('00001');
        }        
    }else{   
    	if(cd_contrato != ''){
    		$('#cd_identificador').val('00001');
        }
    }
}

function createCode(){

    let cd_contrato = $('#cd_contrato').val();
    let sigla_secao = $('#sigla_secao').val();
    let sequencial = getSequencial();

    if(cd_contrato != '' && sigla_secao != '' && sequencial != ''){

        $('#cd_etapa').val('ET-'+sequencial+'-'+cd_contrato+'-'+sigla_secao);

    }

}

function getSequencial(){
    var constraintEtapas = new Array();
	constraintEtapas.push(DatasetFactory.createConstraint('metadata#active', 'true', 'true', ConstraintType.MUST));
	constraintEtapas.push(DatasetFactory.createConstraint('cd_etapa', '', '', ConstraintType.MUST_NOT));
	var dsEtapas = DatasetFactory.getDataset('geral_cadastro_etapa', null, constraintEtapas, ['documentid']);
    if(dsEtapas != null && dsEtapas != undefined && dsEtapas.values.length > 0) {

        var _sequencial = dsEtapas.values[dsEtapas.values.length-1].cd_etapa.split("-")[1];
        _sequencial = parseInt(_sequencial);
        (_sequencial == 0) ? _sequencial = 1 : _sequencial++;
        _sequencial = ("00000" + _sequencial).slice(-5);
        return _sequencial;

    }else{

        var _sequencial = '00001';
        return _sequencial;

    }
}

function setSelectedZoomItem(selectedItem) {

    if(selectedItem.inputId == "zoom_contrato"){
        $('#cd_contrato').val(selectedItem['cd_contrato']);	
        createCode();
        createIdentifier()
    }
    if(selectedItem.inputId == "zoom_secao"){
        $('#sigla_secao').val(selectedItem['txt_sigla']);	
        createCode();
    }
    if(selectedItem.inputId == "zoom_natureza_tributaria"){
        $('#cd_natureza_tributaria').val(selectedItem['ds_sigla']);	
    }
    if(selectedItem.inputId.indexOf('zoom_pasta') > -1){
        $('#id_pasta').val(selectedItem['id_pasta']);	
        $("#hidden_link_raiz").val(parent.WCMAPI.tenantURL+'/ecmnavigation?app_ecm_navigation_doc='+selectedItem['id_pasta']);
	}
	if(selectedItem.inputId.indexOf('zoom_fiscal') > -1){
        $('#matricula_fiscal').val(selectedItem['matricula']);	
	}	
	if(selectedItem.inputId.startsWith('zoom_categoria_risco')){
		var ID = selectedItem.inputId.split('___')[1];
        $('#cd_categoria_risco___'+ID).val(selectedItem['ds_codigo']);	
	}	
	if(selectedItem.inputId == "zoom_fase"){
        var teste = new Array()
		var id = $('#lista_ds_codigos_fase').val();
        if(id !=""){
            $('#lista_ds_codigos_fase').val(id+';'+selectedItem['ds_codigo']);	
        } else{
            $('#lista_ds_codigos_fase').val(selectedItem['ds_codigo']);	
        }
    }
	if(selectedItem.inputId == "zoom_tipo_etapa"){
		$('#ds_sigla_tipo_etapa').val(selectedItem['ds_sigla']);	
	}
}

function removedZoomItem(removedItem) {
	if (removedItem.inputId.startsWith('zoom_contrato')) {
        $("#cd_contrato").val("");
        $("#cd_etapa").val("");
        $("#cd_identificador").val("");
    } 
    if (removedItem.inputId.startsWith('zoom_secao')) {
        $("#sigla_secao").val("");
        $("#cd_etapa").val("");
	} 
	if(removedItem.inputId.startsWith('zoom_categoria_risco')){
		var ID = removedItem.inputId.split('___')[1];
        $('#cd_categoria_risco___'+ID).val("");
	}
	if(removedItem.inputId == "zoom_fase"){
        var id = $('#lista_ds_codigos_fase').val();
        
        //se NÃO encontrar o código + ';'
        if(id.indexOf(removedItem.ds_codigo+';') == -1){        	
        	id = id.replace(';'+removedItem.ds_codigo,"");
        	id = id.replace(removedItem.ds_codigo,"");
        	$('#lista_ds_codigos_fase').val(id);
        //se encontrar o código + ';'
        }else{
        	id = id.replace(removedItem.ds_codigo+';',"");        	
        	$('#lista_ds_codigos_fase').val(id);
        }
    }
	if(removedItem.inputId == "zoom_fiscal"){
		$('#matricula_fiscal').val("");	
    }	
	if(removedItem.inputId == "zoom_tipo_etapa"){
		$('#ds_sigla_tipo_etapa').val("");	
    }
	if(removedItem.inputId == "zoom_pasta"){		
		$('#id_pasta').val("");	
	    $("#hidden_link_raiz").val("");
    }
   
}

function openFolderSolucoes(){
	var company = getWK_COMPANY();	

	var folder_id = $('#id_pasta').val();
	var url = '/portal/p/'+company+'/ecmnavigation?app_ecm_navigation_doc='+folder_id;

	window.open(url, '_blank');
}

//Função utilizada para calcular o valor do item de determinados componentes (quando ouver um change em algum componente desse item)
function calculaValorItem(index_linha_componente){	
	let index_componente = getTableIndex('table_componente_item');	
	let uuid_componente_alterado = $('#uuid_item_Neto_'+index_linha_componente).val();
	let uuid_componente_for = "";
	let index_linha_item = "";
	let index_item = getTableIndex('table_item_etapa');
	let vl_total_item = 0;
	let valor_total_etapa = 0
	//Percorre tabela de componentes e só adiciona se a linha tiver o mesmo uuid
	for(var i=1; i<index_componente; i++){
		uuid_componente_for = $('#uuid_item_Neto_'+i).val();
		if($('#quantidade_componente_Neto_'+i).val() != undefined && $('#quantidade_componente_Neto_'+i).val() != '' && $('#vl_componente_Neto_'+i).val() != '' && uuid_componente_for == uuid_componente_alterado){
			vl_total_item = parseFloat(vl_total_item) + parseFloat(moneyToValue($('#vl_componente_Neto_'+i).val()))*parseInt($('#quantidade_componente_Neto_'+i).val());
			console.log("vl_total_item: " + vl_total_item);
		}
	}
	
	for(var i=1; i<index_item; i++){	
		uuid_item_for = $('#uuid_Filho_'+i).val();
		if($('#valor_total_item_Filho_'+i).val() != undefined && uuid_item_for == uuid_componente_alterado){
			index_linha_item = i;
			console.log("index_linha_item: " + index_linha_item);
			break;
		}
	}	
	$('#valor_total_item_Filho_'+index_linha_item).val(convertMoney(vl_total_item));
	
	for(var i=1; i<index_item; i++){	
		uuid_item_for = $('#uuid_Filho_'+i).val();
		if($('#valor_total_item_Filho_'+i).val() != undefined && $('#valor_total_item_Filho_'+i).val() != ''){
			valor_total_etapa = parseFloat(valor_total_etapa) + parseFloat(moneyToValue($('#valor_total_item_Filho_'+i).val()))
			console.log("valor_total_etapa: " + valor_total_etapa);
		}
	}
	if($('#considera_valor_caput').val() == "nao"){
		$('#vl_etapa').val(convertMoney(valor_total_etapa));
	}
	
	
	
}
//Função utilizada para calcular o valor inicial da Etapa, e também para a função do caput (sim/não)
function calculaValorTotalItens(){
	let index = getTableIndex('table_componente_item');
	let vl_total_componentes = 0;
	for(var i=1; i<index; i++){
		if($('#quantidade_componente___'+i).val() != undefined && $('#quantidade_componente___'+i).val() != '' && $('#vl_componente___'+i).val() != ''){
			vl_total_componentes = parseFloat(vl_total_componentes) + parseFloat(moneyToValue($('#vl_componente___'+i).val()))*parseInt($('#quantidade_componente___'+i).val());
			console.log("vl_total_componentes for: " + vl_total_componentes);
		}
			
	}
	console.log("vl_total_componentes final: " + vl_total_componentes);
	return convertMoney(vl_total_componentes);
	//$('#vl_faturamento').val(convertMoney(vl_faturamento));
	
}

function convertMoney(number) {
	if (number == null || number == "" || number == 0) return "0,00";
	
    var number = parseFloat(number);
    number = number.toFixed(2).split('.');
    
    number[0] = number[0].split(/(?=(?:...)*$)/).join('.');
    return number.join(',');
}

function moneyToValue(number){

	number = number.replace(/\./g, '');
	number = number.replace(/\,/g, '.');
	return number;
}

function getTableIndex(tableId){
	var index = 0;
	var rowIndex = $("#" + tableId + " tbody tr").length;
	if(rowIndex > 0){
		var lastRowInputId = $("#" + tableId + " tbody tr:last input:eq(0)").prop("id");
		index = (parseInt(lastRowInputId.substring((lastRowInputId.lastIndexOf("_")+1),(lastRowInputId.length))) + 1);
	}

	if(isNaN(index)){
		index = 0;
	}
		
	return index;
}



function addIndicador()
{
    var index = wdkAddChild('tb_indicador');
    
    $("#ds_indicador___"+ index).blur(function()
	{
		var qtde_indice = retornaIndiceTBody("tbody_indicador");
		var ds_valor_campo = $(this).val();
		
		for (var i = 1; i <= qtde_indice; i++) 	
		{
			if ((ds_valor_campo != undefined) && (ds_valor_campo == $("#ds_indicador___"+ i).val()) && (i != index))
			{
				 FLUIGC.toast({
					 	title: "Erro",
			            message: 'Registro Duplicado !',
			            type: 'warning'
			        });
				 
				 $(this).val("");
				 return true;
			}
	    }
    	
	});
}

 function deleteIndicador(oElement)
{
    fnWdkRemoveChild(oElement);
}

function retornaIndiceTBody(obj)
{
	var elementos = $("#" + obj + " input");
	var aux = 0;
	
	for(var i in elementos)
	{
	   if(elementos[i].id != undefined && elementos[i].id.indexOf("___") > -1)
	   {
		   var indice = elementos[i].id.split("___")[1];
		   if (aux < indice)
				aux = indice;
	   }
	}
	
	return aux;
}


function carregaInfoDistribuicaoFinanceira()
{
	var cd_contrato = "";
	var cd_etapa = "";
	var constraints = new Array();
	
	constraints.push(DatasetFactory.createConstraint("cd_contrato", $("#cd_contrato").val(), $("#cd_contrato").val(), ConstraintType.MUST));
	constraints.push(DatasetFactory.createConstraint("cd_etapa", $("#cd_etapa").val(), $("#cd_etapa").val(), ConstraintType.MUST));
	var dataset_valores = DatasetFactory.getDataset("geral_consulta_valores_etapa", null, constraints, null);
	
	if ((dataset_valores != null) && (dataset_valores.values.length > 0))
	{	
		var vl_saldo_aprovado = dataset_valores.values[0].vl_saldo_aprovado;
		var vl_saldo_reservado = dataset_valores.values[0].vl_saldo_reservado;
		var vl_saldo_utilizado = dataset_valores.values[0].vl_saldo_utilizado;
		var vl_saldo_em_liquidacao = dataset_valores.values[0].vl_saldo_em_liquidacao;
		var vl_saldo_liquidado = dataset_valores.values[0].vl_saldo_liquidado;
		var vl_saldo_pago = dataset_valores.values[0].vl_saldo_pago;
		
		
		$("#vl_aprovado_etapa").val(vl_saldo_aprovado);
		$("#vl_reservado").val(vl_saldo_reservado);
		$("#vl_utilizado").val(vl_saldo_utilizado);
		$("#vl_liquidacao").val(vl_saldo_em_liquidacao);
		$("#vl_liquidado").val(vl_saldo_liquidado);
		$("#vl_pago").val(vl_saldo_pago);
	}
	
	//Cálculo das retenções
	var cd_natureza_tributaria = $("#cd_natureza_tributaria").val();
	
	constraints = new Array();
	constraints.push(DatasetFactory.createConstraint("ds_sigla", cd_natureza_tributaria, cd_natureza_tributaria, ConstraintType.MUST));
	var dataset_natureza = DatasetFactory.getDataset("geral_cadastro_natureza", null, constraints, null);
	
	if ((dataset_natureza != null) && (dataset_natureza.values.length > 0))
    {	
    	for (var x = 0; x < dataset_natureza.values.length; x++) 
        {
        	var id = dataset_natureza.values[x]["metadata#id"];
            var documentVersion = dataset_natureza.values[x]["metadata#version"]; 
            var companyId = dataset_natureza.values[x]["companyid"];
            
            constraints = new Array();
        	constraints.push(DatasetFactory.createConstraint("companyid", companyId ,companyId, ConstraintType.MUST));
        	constraints.push(DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST));
        	constraints.push(DatasetFactory.createConstraint("metadata#id", id, id, ConstraintType.MUST));
        	constraints.push(DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST));
        	constraints.push(DatasetFactory.createConstraint("tablename", "tabelaImpostos" ,"tabelaImpostos", ConstraintType.MUST));
 	        var dataset_natureza_imposto = DatasetFactory.getDataset("geral_cadastro_natureza", null, constraints, null);
 	        
 	        if ((dataset_natureza_imposto != null) && (dataset_natureza_imposto.values.length > 0))
 	        {
 	        	for (var y = 0; y < dataset_natureza_imposto.values.length; y++) 
 	        	{	
 	        		var ds_sigla_imposto = dataset_natureza_imposto.values[y]["ds_sigla_imposto"];
                
	                //para cada imposto relacionado a uma naturez, busca-se o cadastro do imposto (nome e aliquota %)
	            	constraints = new Array();
	            	constraints.push(DatasetFactory.createConstraint("companyid", companyId ,companyId, ConstraintType.MUST));
	            	constraints.push(DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST));
	     	        constraints.push(DatasetFactory.createConstraint("ds_sigla", ds_sigla_imposto, ds_sigla_imposto, ConstraintType.MUST));
	     	        var dataset_imposto = DatasetFactory.getDataset("medicao_imposto", null, constraints, null);
	        		
	     	        if ((dataset_imposto != null) && (dataset_imposto.values.length > 0))
 	        		{
	     	        	ds_imposto = dataset_imposto.values[0]["ds_imposto"];
	     	        	vl_aliquota = parseFloat(0 + dataset_imposto.values[0]["vl_aliquota"].replace(".","").replace(",","."));
     	        		
     	        		//calcula o valor do imposto (Valor da NF x Alíquota)
     	        		vl_imposto  = parseFloat(0 + (vl_saldo_aprovado * (vl_aliquota/100)));
     	        		
     	        		var index = wdkAddChild('tb_imposto_retido');
     	        		
     	        		$("#ds_imposto___" + index).val(ds_sigla_imposto + " - " + ds_imposto);
     	        		$("#vl_aliquota___" + index).val(vl_aliquota.toFixed(2));
     	        		$("#vl_valor_retido___" + index).val(vl_imposto.toFixed(2));
	     	        }
 	        	}
 	        }
        }
    }
    	
	$(".money").unmask();
	$(".money").mask("####.##0,00", { reverse : true });
	
	$(".percent-mask").unmask();
	$(".percent-mask").mask("####.##0,00", { reverse : true });

}


/**
 * Pai x Filho x Neto
 */
let TABLES = {
	id : null,
	tablesId : { 
        itemComponente : {
			child : "table_item_etapa",
			grandchild : "table_componente_item"
		}
    },

	getNewUUID : function() {
		return FLUIGC.utilities.randomUUID();
	},
	
	appendChild : function(id, uuid) {
		this.id = id;
        let index = this.addTableRow(this.id);
        let selectedUUID = uuid === null || uuid === undefined ? this.getNewUUID() : uuid;  
        // correção a pedido do machado 
        //let selectedUUID = uuid === null ? this.getNewUUID() : uuid;
        $("#filho_" + this.tablesId[id].child + "___" + index).val(selectedUUID);
        this.addTplChildRow(index, selectedUUID); //this.addTplChildRow(index, uuid);
        return index;
    },

    
    
    
    addTableRow : function() {
    	let table = this.tablesId[this.id].child;
    	let index = wdkAddChild(table);
        
    	var inputs = $("[mask]");
    	    MaskEvent.initMask(inputs); 
    	    
    	return index;
    },
    
    addTplChildRow : function(index, uuid) {
        let tbody = $("#main_" + this.tablesId[this.id].child).find("tbody")[0];
        
        console.log("## child:"+this.tablesId[this.id].child);

        let html = Mustache.render($("#tpl_" + this.tablesId[this.id].child).html(), {index, uuid});
        $(tbody).append(html);
		if(getWK_MODE() == "VIEW"){
			$(".add-grandchild").hide();
			$(".remove-child").hide();
		}
        this.bindChild(index);
        hasZoom();

        //gera código do item
        var sequencial_etapa = $('#cd_etapa').val().split('-')[1];
        var sequencial_item = ("00000" + index).slice(-5);
        var cd_contrato = $('#cd_contrato').val();
        $('#cd_item_Filho_'+index).val('IT-'+sequencial_item+'-'+sequencial_etapa+'-'+cd_contrato);

        $(".money").maskMoney({ 
            thousands: '.', 
            decimal: ',', 
            precision: 2
        });

    },
    
    bindChild : function(index) {
    	let that = this;
    	$(".add-grandchild").unbind();
    	$(".add-grandchild").on("click", function() {
    		var idx_neto = that.addTableGrandchildRow($("#filho_" + that.tablesId[that.id].child + "___" + this.getAttribute("indice")).val());
    	
    	});
    	$(".remove-child").unbind();
    	$(".remove-child").on("click", function() {
    		let currentIndex = $(this).parent().parent().find("input")[0].id.split("_").slice(-1)[0];
    		that.removeChild(this, currentIndex);
    	});
    },
    
    hasGrandchild : function(uuid) {
    	let lines = $("#main_" + this.tablesId[this.id].child).find("tr");
    	let totalLines = 0;

    	for(let i = 0; i < lines.length; i++){
    		if($(lines[i]).attr("uuid") == uuid)
    			totalLines++;
    	}
    	return totalLines > 1;
    },
    
    removeChild : function(element, index) {
    	let that = this;
    	let uuid = $(element).closest("tr")[0].getAttribute("uuid");
    	
    	if(this.hasGrandchild(uuid)){
	    	FLUIGC.message.confirm({
			    message: 'Se remover esse registro todos os demais itens também serão removidos. Deseja remover mesmo assim?',
			    title: 'Remover registro',
			    labelYes: 'Sim',
			    labelNo: 'Não'
			}, (result, el, ev) => {
				if(result){
					that.removeGrandchildrenByUUID($("#filho_" + that.tablesId[this.id].child + "___" + index).val());
		    		$(element).closest("tr").remove();
		    		fnWdkRemoveChild($("#filho_" + that.tablesId[this.id].child + "___" + index).parent().parent().find("i")[0]);
				}
			});
    	} else {
    		that.removeGrandchildrenByUUID($("#filho_" + that.tablesId[this.id].child + "___" + index).val());
    		$(element).closest("tr").remove();
    		fnWdkRemoveChild($("#filho_" + that.tablesId[this.id].child + "___" + index).parent().parent().find("i")[0]);
    	}
    	
    	//verifica se há itens adicionados. caso houver, mantem bloqueado contrato e etapa.
    	if (parseInt(retornaIndiceTBody("tbody_table_item_etapa")) == 0 &&
    			parseInt(retornaIndiceTBody("tbody_table_componente_item")) == 0)
		{
    		window["zoom_contrato"].disable(false);
        	window["zoom_etapa"].disable(false);
        	window["zoom_fornecedor"].disable(false);
		}
    	
    	
    	
    },
    
    removeGrandchildrenByUUID : function(uuid) {
    	let lines = $("#main_" + this.tablesId[this.id].child).find("tbody tr");
    	for(let i = 0; i < lines.length; i++) {
    		if($(lines[i]).attr("uuid") == uuid){
    			let index = $($(lines[i]).find("input")[0]).attr("id").split("_").slice(-1)[0];
    			$(lines[i]).remove();
    			this.removeGrandchild(index);
    		}    			
    	}
    },

    addTableGrandchildRow : function(uuid) {
    	var idx_pai = this.getIndexByUUID(uuid);
    	
    	//verifica se item pai foi selecionado/preenchido
    	if ($("#id_item_1" + idx_pai).val() == "")
    	{
    		FLUIGC.toast({
                title: 'Item: ',
                message: 'Item não informado',
                type: 'warning'
            });
    		 
    		return;
    	}
    	
    	
    	let table = this.tablesId[this.id].grandchild;
    	let index = wdkAddChild(table);
    	
    	 //var inputs = $("[mask]");
    	 //   MaskEvent.initMask(inputs); 
    	    
    	    
    	$("#neto_" + table + "___" + index).val(uuid);
    	this.addTplGrandchildRow(uuid, index);
    	
    	//$("#vl_componenteItemQuantidade_Neto_" + index).mask('000.000.000,0000');
    	
    	MaskEvent.initMask($('[mask]'));
    	
    	return index;
    },
    
    getIndexByUUID : function(uuid) {
    	let lines = $("table[tablename='" + this.tablesId[this.id].child + "']").find("tbody tr");
    	let input = $(lines).find("input[name^='filho_table_item_etapa___']");
    	  let index = null;

    	  for(let i = 0; i < input.length; i++){
    	  if($(input[i]).val() == uuid){
    	  index = $(input[i]).attr("id").split("___")[1];
    	  break;
    	  }
    	 
    	  }
    	  return index;
    	},
    	
    addTplGrandchildRow : function(uuid, index) {
    	let lastField = this.getLastFieldByUUID(uuid);
    	let html = Mustache.render($("#tpl_" + this.tablesId[this.id].grandchild).html(), {index, uuid});
    	$(lastField).after(html);
		if(getWK_MODE() == "VIEW"){
			$(".remove-grandchild").hide();
		}
    	this.bindGrandchild(index);
    	hasZoom();
    	
        let childIndex = this.getIndexByUUID(uuid);//TEMP

        let sequencial_componente = ("00000" + childIndex).slice(-5);

        $('#sequencial_componente_'+childIndex).val(sequencial_componente);
        
        $(".money").maskMoney({ 
            thousands: '.', 
            decimal: ',', 
            precision: 2
        });
    	 
    },

    	
    bindGrandchild : function(index) {
    	let that = this;
    	$(".remove-grandchild").unbind();
    	$(".remove-grandchild").on("click", function() {
    		let index = this.getAttribute("indice");
    		$(this).closest("tr").remove();
    		that.removeGrandchild(index);
    	});
    },

    removeGrandchild : function(index) {
    	fnWdkRemoveChild($("#neto_" + this.tablesId[this.id].grandchild + "___" + index).parent().parent().find("i")[0]);
    },

    getLastFieldByUUID : function(uuid) {
    	let lastTR = null;
    	let lines = $("#main_" + this.tablesId[this.id].child).find("tr")
    	
    	for(let i = 0; i < lines.length; i++) {
    		if($(lines[i]).attr("uuid") == uuid)
    			lastTR = lines[i];
    	}
    	return lastTR;
    },
    
    saveFieldsValue : function(id) {
    	let lines = $("#main_" + this.tablesId[id].child).find("tbody tr");
    	
    	for(let i = 0; i < lines.length; i++) {
    		this.putValuesIntoTableFields(lines[i]);
    	}
    },
    
    putValuesIntoTableFields : function(line) {
    	let fields = $(line).find("input, select, textarea");
    	
    	for(let i = 0; i < fields.length; i++) {
    		if(fields[i].id.indexOf("_Filho_") > -1 || fields[i].id.indexOf("_Neto_") > -1) {
    			let originalField = fields[i].id;
    			let tableField = fields[i].id.indexOf("_Filho_") > -1 ? fields[i].id.replace("_Filho_", "___") : fields[i].id.replace("_Neto_", "___");
    			
    			if(fields[i].nodeName.toUpperCase() == "INPUT") {
    				if(fields[i].getAttribute("type") == "text" || fields[i].getAttribute("type") == "hidden"){
    					$("input[name='" + tableField + "']").val(fields[i].value);
    				} else if(fields[i].getAttribute("type") == "checkbox") {
    					$("input[name='" + tableField + "']").prop("checked", $(fields[i]).is(":checked"));
    				} else if(fields[i].getAttribute("type") == "radio") {
    					$("#"+ tableField).prop("checked",fields[i].checked);
    					//$("input[name='" + tableField + "']").val(fields[i].value);    					
    				}
    			} else if(fields[i].nodeName.toUpperCase() == "TEXTAREA") {
    				$("textarea[name='" + tableField + "']").val(fields[i].value);
    			} else if(fields[i].nodeName.toUpperCase() == "SELECT") {
    				if(!fields[i].disabled){
	    				if(fields[i].getAttribute("type") == "zoom" && window[originalField].getSelectedItems() == null){
	    					window[tableField].clear();
	    			    }else if(fields[i].getAttribute("type") == "zoom" && window[originalField].getSelectedItems() != null) {
	    			    	window[tableField].setValue(window[originalField].getSelectedItems());
	    			    } else {	    			    	
	    			    	$("#"+ tableField).val(fields[i].value);
	    			    	//$("input[name='" + tableField + "']").val(fields[i].value);
	    			    }
    				}
			    }
    		}
    	}
    },
    
    loadFields : function(id){
    	var that = this;
    	setTimeout(function() {
	    	that.id = id;
	    	let childLines = $("table[tablename='" + that.tablesId[id].child + "']").find("tbody tr");
	    	let grandchildLines = $("table[tablename='" + that.tablesId[id].grandchild + "']").find("tbody tr");
	    	
	    	for(let i = 1; i < childLines.length; i++){
	    		let index = $(childLines[i]).find("input")[0].id.split("___")[1];
	    		let uuid = $("#filho_" + that.tablesId[id].child + "___" + index).val();
	    		that.addTplChildRow(index, uuid);
	    		that.putValuesIntoFields(childLines[i], index, "_Filho_");
	    	}
	    	for(let i = 1; i < grandchildLines.length; i++){
	    		let index = $(grandchildLines[i]).find("input")[0].id.split("___")[1];
	    		let uuid = $("#neto_" + that.tablesId[id].grandchild + "___" + index).val();
	    		that.addTplGrandchildRow(uuid, index);
	    		that.putValuesIntoFields(grandchildLines[i], index, "_Neto_");
	    	}
    	}, 1500);
    },
    
    putValuesIntoFields : function(line, index, type) {
    	let fields = $(line).find("input, select, textarea");
    	
    	for(let i = 0; i < fields.length; i++) {
			let originalField = fields[i].id;
			let tableField = fields[i].id.replace("___", type);
			
			if(fields[i].nodeName.toUpperCase() == "INPUT") 
			{
				if((fields[i].getAttribute("type") == "text" || fields[i].getAttribute("type") == "hidden") && fields[i].getAttribute("data-zoom") == null){
					$("input[id='" + tableField + "']").val(fields[i].value);
				} else if((fields[i].getAttribute("type") == "text" || fields[i].getAttribute("type") == "hidden") && fields[i].getAttribute("data-zoom") != null){
					window[tableField].setValue(fields[i].value);
					} else if(fields[i].getAttribute("type") == "checkbox") {
					$("input[id='" + tableField + "']").prop("checked", $(fields[i]).is(":checked"));
					} else if(fields[i].getAttribute("type") == "radio") {
					$("input[name='" + tableField + "']").val(fields[i].value);
				}
				
			} else if(fields[i].nodeName.toUpperCase() == "TEXTAREA") {
				$("textarea[id='" + tableField + "']").val(fields[i].value);
			} else if(fields[i].nodeName.toUpperCase() == "SELECT") {
				if(fields[i].getAttribute("type") == "zoom") {
					window[tableField].setValue(window[originalField].getSelectedItems());
				}else {
					$("input[id='" + tableField + "']").val(fields[i].value);
				}
			}
    	}
    },

    disableAllFields: function(id, field) {
    	let fields = $("#main_" + this.tablesId[id].child).find("input, select, textarea");
    	
    	for(let i = 0; i < fields.length; i++) {
    		if(field !== null && fields[i].id.indexOf(field) === -1)
    			continue;
    		if(fields[i].getAttribute("type") == "zoom") {
    			window[fields[i].id].disable(true);
    		} else {
    			$(fields[i]).prop("disabled", true);
    		}
    	}
    },
    
    hideTrashIcon : function(id) {
    	let icons = $("#main_" + this.tablesId[id].child).find("i");
    	
    	for(let i = 0; i < icons.length; i++) {
    		if($(icons[i]).hasClass("fluigicon-trash")) {
    			$(icons[i]).hide();
    		}
    	}
    },
    
    hideAppendGrandchild : function(id) {
    	let icons = $("#main_" + this.tablesId[id].child).find(".add-grandchild").hide();
    },
    
    disableAndHideAll : function(id) {
    	this.disableAllFields(id, null);
    	this.hideTrashIcon(id);
    	this.hideAppendGrandchild(id);
    }
};