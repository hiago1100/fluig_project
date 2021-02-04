/*FUNCOES RELACIONADAS A VISUALIZACAO DO FORMULARIO*/
const _compartilhados = compartilhados.getInstance();
const _zoom = zoom.getInstance();
const _model = model.getInstance();
var atividade = _compartilhados.getCurrentState()
$(document).ready(function () {
	//Processamento da solicitação / cadastro da Seção - área de Folha
	_compartilhados.enableButtonZoom(['.buscaSecao', '.BuscaRespFolha'], ['70']);
	/*
    TRIGGUER ZOOM
    */
	$(document).on('ZoomCallBack1004', function (ev, retorno) {
		var cpCodColigada = sessionStorage.getItem('cpCodColigada');
		var cpSecaoFolha = sessionStorage.getItem('cpSecaoFolha');
		var cpCodSecaFolha = sessionStorage.getItem('cpCodSecaFolha');
		VIEW.getInstance().fillObraRM(cpCodColigada, cpSecaoFolha, cpCodSecaFolha, retorno);
	});
	$(document).on('ZoomCallBack1065', function (ev, retorno) {
		var cpRespoFolha = sessionStorage.getItem('cpRespoFolha');
		$("#" + cpRespoFolha).val(retorno.NOME);
	});
	//Preenche dados do Solicitate	
	if (atividade == 0) {
		$('#zoomObraColigada').prop("disabled", false);
		$("#ValchkObra").val("1");
		$('#chkObra').prop('checked', true);
		$('#chkObra').prop('disabled', true);
		_compartilhados.enableButtonZoom(['#zoomColigadaObra'], ['0', '1']);

		let DadosSolicitante = FLUIGC.sessionStorage.getItem('userInformation').values[0];

		//$('#cpLoginFluig').val() dadosColaborador.get(0).get("login"));
		$('#cpNomeSolicitante').val(DadosSolicitante.NOME);
		$('#cpMatriculaSolicitante').val(DadosSolicitante.CHAPA);
		$('#cpFuncaoSolicitante').val(DadosSolicitante.FUNCAO);
		$('#cpEmpresaSolicitante').val(DadosSolicitante.EMPRESA);
		$('#cpDepartamentoObraSolicitante').val(DadosSolicitante.SECAO);
		$('#cpEmailSolicitante').val(DadosSolicitante.EMAIL);
		$('#cpEstadoSolicitante').val(DadosSolicitante.ESTADO);
		$('#cpObraSedeSolicitante').val(DadosSolicitante.OBRAOUSEDE);

		var gestor = DadosSolicitante.CHAPA_GESTOR.toString().replace("A", "");
		$('#cpGestorSolicitante').val(gestor);

		var gerente_geral = DadosSolicitante.CHAPA_GG.toString().replace("A", "");
		$('#cpGerenteGeralSolicitante').val(gerente_geral);

		var superintendente = DadosSolicitante.CHAPA_SUP.toString().replace("A", "");
		$('#cpSuperintendenteSolicitante').val(superintendente);

		var diretor = DadosSolicitante.CHAPA_DIRETOR.toString().replace("A", "");
		$('#cpDiretorSolicitante').val(diretor);

		var folha = DadosSolicitante.CHAPA_FOLHA.toString().replace("A", "");
		$('#cpFolhaSolicitante').val(folha);

		var Consultora = DadosSolicitante.CHAPA_CONS.toString().replace("A", "");
		$('#cpConsultoraSolicitante').val(Consultora);

		//preenchimento padrão
		$('#cpTpMatricula').val("Obra de Pessoa Jurídica Edificação");
		$('#cpVinResp').val("Proprietário");
		$('#cpVinGov').val("Outros");
		$('#cpFPAS').val("507 - Indústrias, Indústria da Construção Civil");
		$('#cpCNAE').val("45217 - Edificações (Residenciais, Industriais, Comerciais e de Serviços");
		$('#cpNatJur').val("062 - Sociedade Empresarial Limitada");
	};
	var getDescricaoProcesso = function (codProcesso) {
		var c1 = DatasetFactory.createConstraint('processDefinitionPK.processId', codProcesso, codProcesso, ConstraintType.MUST);
		return DatasetFactory.getDataset('processDefinition', ['processDescription'], [c1]).values[0].processDescription;
	};
	var codigoProcesso = 'FLUIG-0198', // Código do processo
		targetID = 'descricaoProcesso', // ID do elemento que receberá o nome
		descricaoProcesso = getDescricaoProcesso(codigoProcesso);
	$("#" + targetID).html(descricaoProcesso);
	targetID = 'descricaoProcessoDesc';
	$("#" + targetID).html(descricaoProcesso);
	//abertura de conta 
	$("#cpContaLib2").change(function () {
		if (this.value == 1) {
			$(".semressalva2").show();
		} else {
			$(".semressalva2").hide();
		}
	});
	var aprovado = $("#cpContaLib2").val();
	if (aprovado == "1") {
		$(".semressalva2").show();
	} else {
		$(".semressalva2").hide();
	};
	/*FLUIGC.switcher.init('#chkEmpresa');
	FLUIGC.switcher.init('#chkObra');*/
	//VWRIFICA CHECK RH - HIERARQUIA
	$("#cpAprovHieRH").click(function () {
		if (document.getElementById("cpAprovHieRH").checked) {
			var index = $("#cpIndex").val();
			//HABILITAR CAMPOS PAI E FILHO
			for (var i = 1; i <= index; i++) {
				$('#cpConsultHierRH___' + i).prop('readonly', false);
			};
			$("#cpAprovHieRHVlr").val("1");
		} else {
			$("#cpAprovHieRHVlr").val("");
		};
	});
	//ressalva tesouraria
	$("#cpAprovarTes").change(function () {
		if (this.value == 3) {
			$(".Ressalva").show();
			$(".semressalva").hide();
		} else if (this.value == 1) {
			$(".Ressalva").hide();
			$(".semressalva").show();
		} else {
			$(".Ressalva").hide();
			$(".semressalva").hide();
		}
	});
	//verifica se e criacao de empresa se for campos da secao do rm ficam ocultos
	if ($("#ValchkEmpresa").val() == "1") {
		$("#Empresa").show();
		$("#Empresa2").show();
		$(".DTI").show();
		$(".ColigadaDesc").hide();
	} else {
		$(".DadosdaNovaColigada").show();
		$(".ColigadaDesc").show();
		$("#Empresa").hide();
		$("#Empresa2").hide();
		$(".DTI").hide();
	};
	//verifica se e cricao de secao
	//verifica o tipo de solicitacao
	if ($("#ValchkObra").val() == "1") {
		$("#Secao").show();
	} else {
		$("#Secao").hide();
	};
	//verifica se e demolicao
	if ($("#chkDemolicaoConstr").val() == "1") {
		$(".Demolicao").hide();
		$(".Construcao").show();
	} else if ($("#chkDemolicaoConstr").val() == "2") {
		$(".Demolicao").show();
		$(".Construcao").hide();
	} else {
		$(".Demolicao").hide();
		$(".Construcao").hide();
	};
	//tipo de secao
	if ($("#cpTipodeSecao").val() == "1") {
		$(".obraparceira").show();
	} else {
		$(".obraparceira").hide();
	};
	//obra parceira
	if ($("#cpObraParceira").val() == "1") {
		$(".empresaparceira").show();
	} else {
		$(".empresaparceira").hide();
	};
	//aprovacao com ressalva tesouraria
	if ($("#cpAprovarTes").val() == 3) {
		$(".Ressalva").show();
		$(".semressalva").hide();
	} else if ($("#cpAprovarTes").val() == 1) {
		$(".Ressalva").hide();
		$(".semressalva").show();
	} else {
		$(".Ressalva").hide();
		$(".semressalva").hide();
	};
	//avaliacao do chamado
	if (atividade == 12 || atividade == 14 || atividade == 16 || atividade == 18) {
		$("#CamposblockAvaliacao").hide();
		$("#cpAprovarSolicitante").change(function () {
			var aprovado = $("#cpAprovarSolicitante").val();
			if (aprovado == "1") {
				$("#CamposblockAvaliacao").show();
			} else {
				$("#CamposblockAvaliacao").hide();
			}
			$(".limpaAvaliacao").val('');
		});
	};
	//reabertura do chamado
	if (atividade != 10) {
		$(".blockReabertura").hide();
	};
	//
	//matricula solicitante 
	var matricula = $("#cpMatriculaSolicitante").val();
	//atividades de inicio
	iniciarFormulario(atividade);
	//seta data no campo
	if (atividade != 4 && atividade != 0 && atividade != 10) {
		$('#btnAddDadosSecao').attr('disabled', true)
		$('[name="rdbEndCorrespIgual"]').attr('disabled', true)
	}
	if (atividade == 4 || atividade == 0 || atividade == 10) {
		var data = new Date();
		//seta dia 01 do mes atual
		data.setDate("01");
		FLUIGC.calendar('#cpDtContrat', {
			pickDate: true,
			pickTime: false,
			minDate: data
		});
		FLUIGC.calendar('#cpDtInicio', {
			pickDate: true,
			pickTime: false,
			minDate: data
		});
		//BOTAO ABRE TABELA PAI E FILHO DA ATIVIDADE INICIAL
		$("#btnAddDadosSecao").click(function () {
			var index = wdkAddChild('tbDadosdoSecao');
			$("#cpIndex").val(index);
			$("#theadDadosdoSecao").show();
		});
		//verifica se e criacao de empresa se for campos da secao do rm ficam ocultos
		//verifica Numero do CEI Obra - se for criar nova empresa aparece
		//verifica o tipo de solicitacao
		$("#chkEmpresa").click(function () {
			validateCheck()
			$('#chkObra').prop('disabled', true);
			$('#zoomColigadaObra').prop("disabled", false);
			$('#zoomObraColigada').prop("disabled", false);
			$("#chkObra").prop("checked", true); //Obriga a criação de uma nova seção para a nova coligada
			initialCheckboxes()
		});
		//verifica se e cricao de secao
		//verifica o tipo de solicitacao
		$("#chkObra").click(function () {
			validateCheck()
			initialCheckboxes()
			$("#zoomObraColigada").prop("disabled", false);
		});

		//Actions dos checkbox iniciais 
		function initialCheckboxes() {
			if (document.getElementById('chkEmpresa').checked == true) {
				$("#ValchkEmpresa").val("1");
				$(".NovaColigada").show();
				$("#Empresa").show();
				$("#Empresa2").show();
				$(".DTI").show();
				$(".ColigadaDesc").hide();
				$("#zoomObraDepartamento").prop("disabled", false);
			} else {
				$("#ValchkEmpresa").val("");
				$(".NovaColigada").hide();
				$("#Empresa").hide();
				$("#Empresa2").hide();
				$(".DTI").hide();
				$(".ColigadaDesc").show();
			}

			if (document.getElementById('chkObra').checked == true) {
				$("#ValchkObra").val("1");
				$("#Secao").show();
			} else {
				$("#ValchkObra").val("");
				$("#Secao").hide();
			}
		};

		//verifica se e demolicao
		$("#chkDemolicaoConstr").change(function () {
			if (this.value == 1) {
				$(".Demolicao").hide();
				$(".Construcao").show();
				$("#ValchkDemolicao").val("1");
			} else if (this.value == 2) {
				$(".Demolicao").show();
				$(".Construcao").hide();
				$("#ValchkDemolicao").val("");
			} else {
				$(".Demolicao").hide();
				$(".Construcao").hide();
				$("#ValchkDemolicao").val("");
			}
		});

		//tipo de secao
		$("#cpTipodeSecao").click(function () {
			if (this.value == "1") {
				$(".obraparceira").show();
			} else {
				$(".obraparceira").hide();
			};
		});
		//empresa parceira
		$("#cpObraParceira").click(function () {
			if (this.value == "1") {
				$(".empresaparceira").show();
			} else {
				$(".empresaparceira").hide();
			}
		});
	};
	//desativa campos da tabela dinamica nas outras atividades, so permite edicao no inicio e correcao
	if (atividade != 4 && atividade != 0 && atividade != 10 && atividade != 195) {
		$(".TABELASECAO").attr("readonly", "readonly");

		/*FLUIGC.switcher.disable('#chkEmpresa');
		FLUIGC.switcher.disable('#chkObra');*/
	};

	//atividade de folha 70
	//if(atividade==70){	
	$("#btnAddDadosSecaoFolha").click(function () {
		var index = wdkAddChild('tbFolhaSecao');
		$("#theadFolhaSecao").show();
	});
	// }
	//DESATIVA A TABELA DA FOLHA
	if (atividade != 70) {
		$(".TABELADAFOLHA").attr("readonly", "readonly");
	} //DESATIVA A TABELA CONSULTOR RH
	if (atividade != 195) {
		$(".TABELACONSULTRH").attr("readonly", "readonly");
	};

	$(document).on('ZoomCallBack10611', (ev, retorno) => {
		$('#cpDescColi').val(retorno.EMPRESARM);
		$('#cpNumcoligadaTI').val(retorno.CODEMPRESARM)
	});

	//TRIGGER OBRA DPTO SUPER 
	try {
		$(document).on('ZoomCallBack1063', function (ev, retorno) {
			window.loadingLayer.show();
			setTimeout(function () {
				$("#cpDescColigada").val(retorno.EMPRESARM);
				$("#cpNumColigada").val(retorno.CODEMPRESARM);
				window.loadingLayer.hide();
			}, 100);
		});
	} catch (e) {} finally {
		window.loadingLayer.hide();
	};
	try {
		$(document).on('ZoomCallBack1007', function (ev, retorno) {
			window.loadingLayer.show();
			setTimeout(function () {
				if (document.getElementById('chkEmpresa').checked) {
					$("#cpObraDepartamento").val(retorno.EMPRESA);
					$("#cpNumEmpresa").val(retorno.CODEMPRESA);
					$("#cpEmpresa").val(retorno.CNPJ);
				} else {
					$("#cpDescColigada").val(retorno.EMPRESA);
					$("#cpNumColigada").val(retorno.CODEMPRESA);
					$("#cpEmpresa").val(retorno.CNPJ);
				};
				window.loadingLayer.hide();
			}, 100);
		});
	} catch (e) {} finally {
		window.loadingLayer.hide();
	};
	try {
		$(document).on('ZoomCallBack1063', function (ev, retorno) {
			window.loadingLayer.show();
			setTimeout(function () {
				if (atividade == 8 || atividade == 10 || atividade == 37) {
					$("#cpEmpreCodUau").val(retorno.CODEMPRESA);
					$("#cpCodObraUau").val(retorno.CODOBRA);
					$("#cpEmpreCodUauPLan").val(retorno.CODEMPRESA);
					$("#cpCodObraUauPlan").val(retorno.CODOBRA);
				} else {
					$("#cpEmpreCodUauPLan").val(retorno.CODEMPRESA);
					$("#cpCodObraUauPlan").val(retorno.CODOBRA);
				};
				window.loadingLayer.hide();
			}, 100);
		});
	} catch (e) {} finally {
		window.loadingLayer.hide();
	};
	try {
		$(document).on('ZoomCallBack1062', function (ev, retorno) {
			window.loadingLayer.show();
			setTimeout(function () {
				if (retorno.NOME != null) {
					$("#" + $("#cpCampoColaborador").val()).val(retorno.NOME);
				} else {
					$("#" + $("#cpCampoColaborador").val()).val(retorno.CHAPA);
				};
				window.loadingLayer.hide();
			}, 100);
		});
	} catch (e) {
		window.loadingLayer.hide();
	} finally {
		window.loadingLayer.hide();
	};
	try {
		$(document).on('ZoomCallBack1061', function (ev, retorno) {
			window.loadingLayer.show();
			setTimeout(function () {
				$("#cpDescColigada").val(retorno.EMPRESARM);
				$("#cpDescColi").val(retorno.EMPRESARM);
				$("#cpNumcoligadaTI").val(retorno.CODEMPRESARM);
				$("#cpNumColigada").val(retorno.CODEMPRESARM);
				var dados = _model.get1007('');
				dados.filter(function (obj) {
					if (obj.CODEMPRESA == retorno.CODEMPRESARM) {
						$('#cpEmpresa').val(obj.CNPJ);
					};
				});
				window.loadingLayer.hide();
			}, 100);
		});
	} catch (e) {} finally {
		window.loadingLayer.hide();
	};
	duplicateEndereco();
});

//Bloqueia o checkbox para criação de 
function validateCheck() {
	$('#chkEmpresa').prop('checked') ? $('#chkObra').prop('disabled', true) : $('#chkObra').prop('disabled', false);
};

function iniciarFormulario(atividade) {
	if (atividade == 0) {
		$("#cpDataAbertura").val(getDataAbertura())
	};
	if (atividade == 115) {
		let userAlteracao = JSON.parse(sessionStorage.userInformation).values[0].NOME;
		$('#cpNomCorre').val(userAlteracao);
		$("#cpDtCorrecao").val(getDataAbertura())
	};
	abaAberta(atividade);
	destacaAprovacao();
	destacaAprovacaoFolha();
	comParecer();
};

//FUNCAO VERIFICA SE STRING COMECA COM
function stringStartsWith(string, prefix) {
	return string.slice(0, prefix.length) == prefix;
};

var getDataAbertura = function () {
	// Data atual
	var hoje = new Date(getServerTime()),
		dia = hoje.getDate(),
		mes = hoje.getMonth() + 1;
	if (dia < 10) {
		dia = '0' + dia;
	} // preenche o Dia com '0' a esquerda caso < 10
	if (mes < 10) {
		mes = '0' + mes;
	} // preenche o Mes como '0' a esquerda caso < 10
	return (dia + '/' + mes + '/' + hoje.getFullYear()); // retorno da data completa
};

//ABA DE APROVACAO ABERTA EM CADA ATIVIDADE
function abaAberta(atividade) {
	$('#panelAtividade_' + atividade).collapse("show").closest(".panel");
};

//DESTACA APROVACAO OU REPROVACAO
function destacaAprovacao() {
	$("[aprovacao]").each(function () {
		if (this.value == 1) {
			$(this).closest(".panel").addClass("panel-success");
		} else if (this.value == 2) {
			$(this).closest(".panel").addClass("panel-danger")
		} else if (this.value == 3) {
			$(this).closest(".panel").addClass("panel-warning")
		};
	});
};

//DESTACA APROVACAO OU REPROVACAO FOLHA
function destacaAprovacaoFolha() {
	$("[aprovacaoFolha]").each(function () {
		if (this.value == 1) {
			$(this).closest(".panel").addClass("panel-success");
		} else if (this.value == "RS" || this.value == "RC" || this.value == "RT" || this.value == "RP" ||
			this.value == "RTI") {
			$(this).closest(".panel").addClass("panel-danger")
		};
	});
};

//COM PARECER
function comParecer() {
	$("#aprovacoes textarea").each(function () {
		var self = $(this);
		if (self.val().length > 0) {
			self.closest(".panel")
				.find(".panel-title")
				.append('&nbsp;<span class="label label-warning">Contém Parecer</span>');
		};
	});
};

//LIMPA LOGIN DE GERENTES
function limparGerente(solicitacao, atividade) {
	if (((atividade == 0) || (atividade == 4) || (atividade == 10))) {
		$(".limpaGerente").val("");
	};
};

//LIMPA COLABORADOR
function limparColaborador(solicitacao, atividade) {
	if (((atividade == 0) || (atividade == 4) || (atividade == 10))) {
		$(".limpaColaborador").val("");
	};
};

//LIMPA CAMPOS OCULTOS AO TROCAR TIPO DE SOLICITACAO
function limparCamposOcultos(atividade) {
	if ((atividade == 0) || (atividade == 4) || (atividade == 10)) {
		$(".limpaCamposOcultos").val("");
	};
};

//LIMPA CAMPOS OCULTOS AO TROCAR TIPO DE SOLICITACAO
function limparCampos(atividade) {
	if ((atividade == 0) || (atividade == 4) || (atividade == 10)) {
		$(".limpaCampos").each(function () {
			if (this.type == "select-one") {
				$(this).val(0);
			} else {
				$(this).val("");
			};
		});
	};
};

//remove tabela da primeira atividade 
function fnCustomDeleteSecao(oElement) {
	if ((atividade == 0) || (atividade == 4) || (atividade == 10)) {
		fnWdkRemoveChild(oElement);
		var tableBody = document.getElementById("tbDadosdoSecao");
		var trashButtons = tableBody.getElementsByTagName("tr");
	};
};
//remove da tabela da atividade da folha
function fnCustomDeleteFolha(oElement) {
	if (atividade == 70) {
		fnWdkRemoveChild(oElement);
		var tableBody = document.getElementById("tbFolhaSecao");
		var trashButtons = tableBody.getElementsByTagName("tr");
	};
};
//adiciona dados da tabela de hierarquia para a tabela dos consultores de RH conferirem e add consultores as obras
function DadosHieraqRH() {
	var index = wdkAddChild('tbDadosdoSecaoHierRH');
}

function CarregaDP() {
	var usuario = window.parent.WCMAPI.userCode;
	var grupo = "DefaultGroup-1";
	var c1 = DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", usuario, usuario, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", grupo, grupo, ConstraintType.MUST);
	var constraintsA = new Array(c1, c2);
	var UsuariosMeuBanco = DatasetFactory.getDataset("colleagueGroup", null, constraintsA, null);
	for (var i = 0; i < UsuariosMeuBanco.values.length; i++) {
		$("#txtPapel").val(UsuariosMeuBanco.values[i]["colleagueGroupPK.groupId"]);
	}
}

function duplicateEndereco() {
	$('input[type=radio][name=rdbEndCorrespIgual]').change(function () {
		var cep = $('#cpCep').val();
		var logradouro = $('#cpLogradouro').val();
		var numero = $('#cpNumero').val();
		var complemento = $('#cpComple').val();
		var bairro = $('#cpBairro').val();
		var cidade = $('#cpCidade').val();
		var estado = $('#cpEstado').val();
		var telefone = $('#cpTelefone').val();
		var email = $('#cpEmail').val();

		if (this.value == 'sim') {
			$('#cpCEPCorres').val(cep);
			$('#cpLogradouroCorres').val(logradouro);
			$('#cpNumeroCorres').val(numero);
			$('#cpCompleCorres').val(complemento);
			$('#cpBairroCorres').val(bairro);
			$('#cpCidadeCorres').val(cidade);
			$('#cpEstadoCorres').val(estado);
			$('#cpTelefoneCorres').val(telefone);
			$('#cpEmailCorres').val(email);
		} else {
			$('#cpCEPCorres').val('');
			$('#cpLogradouroCorres').val('');
			$('#cpNumeroCorres').val('');
			$('#cpCompleCorres').val('');
			$('#cpBairroCorres').val('');
			$('#cpCidadeCorres').val('');
			$('#cpEstadoCorres').val('');
			$('#cpTelefoneCorres').val('');
			$('#cpEmailCorres').val('');
		}
	});
}

var VIEW = (function () {
	var instance;

	function fillObraRM(cpCodColigada, cpSecaoFolha, cpCodSecaFolha, retorno) {

		$(`#${cpCodColigada}`).val(retorno.CODCOLIGADA);
		$("#" + cpSecaoFolha).val(retorno.SECAO);
		$("#" + cpCodSecaFolha).val(retorno.CODSECAO);
	}

	function init() {
		return {
			fillObraRM: fillObraRM,
		};
	}

	return {
		getInstance: function () {
			if (!instance) {
				instance = init();
			}
			return instance;
		}
	}
})();