
//Devido a urgência no atendimento do chamado de erro deste formulário, e ao grande número de chamados na fila,
//não foi possível colocar este processo nos padrões adequedos devido a falta de tempo. ¯\_(ツ)_/¯ 
//Essa missão agora é sua! Bjs e abraços.


$(document).ready(function() 
{
	var _model = model.getInstance();
	var _compartilhados = compartilhados.getInstance();
	var _zoom = zoom.getInstance();
	var atividade = _compartilhados.getCurrentState();
	
	_compartilhados.enableButtonZoom(['#zoomCentroCusto', '#zoomNomeCompleto', '#zoomCentroCustoViagem'], ['0', '1']);

	if (atividade == 0 || atividade == 1) 
	{
		//ZOOM QUE BUSCA CENTRO DE CUSTO
		$("#zoomCentroCusto").click(function() 
		{
			try
			{
				window.loadingLayer.show();
				setTimeout(function ()
				{
					sessionStorage.setItem('BuscaCentroCusto', '1');
					var camposVisiveis = ['SECAO', 'CODSECAO', 'CODCOLIGADA'];
					_zoom.get1004(camposVisiveis);
					limparAposCentroCusto();
					window.loadingLayer.hide();
				}, 100);
			}
			catch (erro)
			{
				_compartilhados.warningToast(Mensagens.M0003, '', 'danger');
				window.loadingLayer.hide();
			}
		});
	
		//ZOOM QUE BUSCA COLABORADOR
		$("#zoomNomeCompleto").click(function() 
		{
			if ($('#cpCodColigada').val() == '')
			{
				_compartilhados.warningToast(Mensagens.M0004, '', 'error');
			}
			else
			{
				try
				{
					window.loadingLayer.show();

					setTimeout(function ()
					{
						var codColigada = $('#cpCodColigada').val();
						var codSecao = $('#cpCodSecao').val();
						var camposVisiveis = ['NOME', 'CPF', 'FUNCAO'];
						_zoom.get1023(camposVisiveis, codColigada, codSecao);
						window.loadingLayer.hide();
					}, 100);
				}
				catch (erro)
				{
					_compartilhados.warningToast(Mensagens.M0003, '', 'error');
					window.loadingLayer.hide();
				}
			}
		});
	
		//ZOOM QUE BUSCA CENTRO DE CUSTO DA VIAGEM
		$("#zoomCentroCustoViagem").click(function() 
		{
			try
			{
				window.loadingLayer.show();
				setTimeout(function ()
				{
					var camposVisiveis = ['CODEMPRESA', 'EMPRESA'];
					_zoom.get1007(camposVisiveis);
					window.loadingLayer.hide();
				}, 100);
			}
			catch (erro)
			{
				_compartilhados.warningToast(Mensagens.M0003, '', 'danger');
				window.loadingLayer.hide();
			}
		});
	
		//DISPLAY DOS CAMPOS A PARTIR DO CAMPO TIPO VIAJANTE
		$("#cpTipoViajante").change(function() 
		{
			
			if(atividade == 0)
			{
				escondePaiFilho();
				escondeThead();	
			}
			removeTabelaPaiFilho();
			limparCamposTipoViajante();
			limparCamposOcultos();
			removeReadonly(this.value);
			tipoViajante();			
		});
	
		//BOTAO ABRE TABELA PAI E FILHO
		$("#btnAddDependente").click(function() 
		{
			var index = wdkAddChild('tbAddDependente');
			
			//MOSTRA O THEAD DA TABELA PAI E FILHO
			mostraThead();
			
			//MASCARA NOS CAMPOS
			MaskEvent.initMask($("#cpCpfDependente___" + index));
			MaskEvent.initMask($("#cpDataNascimento___" + index));
		});
	
	} else if (atividade == 33) 
	{
		
		//DISPLAY DOS CAMPOS A PARTIR DO CAMPO ATENDIDO CONFORME SOLICITADO (ATIVIDADE CONFIRMACAO DA ALTERACAO)
		$("#cpSolicitacaoAtendida").change(function() 
		{
			dislplayNumeroOs();
		});
	}

	iniciarFormulario(atividade);

	$(document).on('ZoomCallBack1004', function (ev, dados)
    {
		var obraUau = _model.get1045(dados.CODSECAO, dados.CODCOLIGADA);

			$('#cpCentroCusto').val(dados.SECAO);
			$('#cpCodSecao').val(dados.CODSECAO);
			$('#cpCodColigada').val(dados.CODCOLIGADA);
			$('#cpGestorAtual').val(dados.CHAPA_GESTOR);
			$('#cpCentroCustoUauColab').val(obraUau[0].OBRA_UAU);

			var camposVisiveis = ['NOME', 'CPF', 'FUNCAO'];
			_zoom.get1023(camposVisiveis, dados.CODCOLIGADA, dados.CODSECAO);		
	});

	$(document).on('ZoomCallBack1007', function (ev, dados)
    {
		var CNPJ = LimpaCnpj(dados.CNPJ);

		var camposVisiveis = ['CODOBRA', 'OBRA'];
		_zoom.get1010(camposVisiveis, CNPJ);
	});

	$(document).on('ZoomCallBack1010', function (ev, dados)
    {
		$('#cpCentroCustoUau').val(dados.CODOBRA);
		$('#cpCentroCustoViagem').val(dados.OBRA);
		$('#cpGestorViagem').val(dados.CHAPA_GESTOR);
	});

	$(document).on('ZoomCallBack1023', function (ev, dados)
    {
		$('#cpNomeCompleto').val(dados.NOME);
		$('#cpCpf').val(dados.CPF);
		$('#cpCargo').val(dados.FUNCAO);
	});

	//DISPLAY CAMPOS A PARTIR DE TIPO DE VIAJANTE
	$("#cpTipoViajante").change(function () 
	{
		displayInformacoesViajante();
	});
	
	function tipoViajante()
	{
		var tipoViajante = $("#cpTipoViajante").val();
	
		 if (tipoViajante == 1) 
		 {	
		 	defineCamposProprioColaborador();
		 }

		//ALTERADA NOME DO CAMPO A PARTIR DE VALOR DO CAMPO
		 if (tipoViajante == 4) 
		 {
		 	$('#labelNome').html('Colaborador Responsável');
			
		 } else 
		 {
		 	$('#labelNome').html('Nome Completo');
		 }
	}
	
	$(document).on('callBackClickRecolhimentoDataAdmissao', function (ev, dados)
    {
		_compartilhados.initilizeDatePicker
		([
			['cpDataTermino', [0,1]]
		],'',dados);
	});

	function LimpaCnpj(CNPJ)
	{		
		return CNPJ.replace(/[^\d]+/g,'');
	}
}); //FIM DO DOCUMENT

function iniciarFormulario(atividade, varServerTime)
{
	var tipoViajante = $("#cpTipoViajante").val();
	if (atividade == 0 || atividade == 1) 
	{
		escondeDados();
		escondePaiFilho();
		escondeThead();
		escondeNumeroOs();
		
		compartilhados.getInstance().initilizeDatePicker
		([
			['cpDataInicioViagem', [0,1], 'callBackClickRecolhimentoDataAdmissao' ]
		],'',compartilhados.getInstance().addWorkingDays(new Date(),0, false),'');
	} 
	else 
	{
		 if (tipoViajante == 1) 
		 {	
		 	defineCamposProprioColaborador();
		 }
		 if (tipoViajante == 4) 
		 {
		 	$('#labelNome').html('Colaborador Responsável');	
		 } 
		 else 
		 {
		 	$('#labelNome').html('Nome Completo');
		 }
		dislplayNumeroOs();
		displayInformacoesViajante();
	}
		
	//ESCONDE O PAI E FILHO EM OUTRAS ATIVIDADES A PARTIR DO TIPO DE VIAJANTE
	escondePaiFilhoEmOutrasAtividades();

	//REMOVE BOTOES PAI E FILHO
	removeBotaoPaiFilho(atividade);

	//DESTACA APROVACAO OU REPROVACAO
	destacaAprovacao();
	
} //FIM DO INICIAR FORMULARIO

//DESTACA APROVACAO OU REPROVACAO
function destacaAprovacao() 
{
	$("[aprovacao]").each(function() 
	{
		if(this.value == 1) 
		{
			$(this).closest(".panel").addClass("panel-success");	
		} 
		else if (this.value == 2)
		{
			$(this).closest(".panel").addClass("panel-danger")
		}
	});
}

//LIMPA CAMPOS A PARTIR DE TIPO DE VIAJANTE
function limparCamposTipoViajante()
{
	$(".limpaTipoViajante").val("");
}

//LIMPA CAMPOS A PARTIR DE ZOOM OBRA DEPARTAMENTO
function limparAposCentroCusto()
{
	$(".limpaAposCentroCusto").val("");
}

//LIMPA OS CAMPOS OCULTOS DO FORMULARIO
function limparCamposOcultos()
{
	$(".limpaCamposOcultos").val("");
}

//REMOVE BOTAO ADCIONAR COLABORADOR E LIXEIRA FORA DA ATIVIDADE CORRETA
function removeBotaoPaiFilho(atividade) 
{
	
	if (atividade > 1)
	{
		$("#theadPaiFilho tr th:first-child").remove();
		$(".bpm-mobile-trash-column").remove();
		$("#btnAddDependente").remove();
	}	
}

// //ESCONDE GRUPO DADOS
 function escondeDados() 
 {
 	$("#dados").hide();
 }

//REMOVE TABELA PAI E FILHO
function removeTabelaPaiFilho() {
	$("#tbAddDependente tbody tr").each(function()
	{
		if (this.style.display == "table-row") 
		{
			$(this).remove();
		}
	});	
}

//ESCONDE TABELA PAI E FILHO
function escondePaiFilho() 
{
	$("#tabelaAddDependente").hide();
}

//ESCONDE TABELA PAI E FILHO  EM OUTRAS ATIVIDADES
function escondePaiFilhoEmOutrasAtividades() 
{
	var tipoViajante = $("#cpTipoViajante").val();
	
	if (tipoViajante != 4)
	{
		$("#tabelaAddDependente").hide();
	}	
}

//ESCONDE THEAD DO FILHO
function escondeThead() 
{
	$("#theadPaiFilho").hide();
}

//MOSTRA THEAD DO FILHO
function mostraThead() 
{
	$("#theadPaiFilho").show();
}

//REMOVE READONLY CAMPOS
function removeReadonly(tipoViajante) 
{
	var campos = $("#cpNomeCompleto, #cpCpf");
	
	if (tipoViajante == 3) 
	{
		campos.removeAttr('readonly');
	} 
	else 
	{
		campos.attr('readonly', 'readonly');
	}
}

//ESCONDE CAMPO NUMERO OS
function escondeNumeroOs() 
{
	$("#numeroOs").hide();
}

//DISPLAY DO CAMPO NUMERO DA OS
function dislplayNumeroOs() 
{
	var solicitacaoAtendida = $("#cpSolicitacaoAtendida").val();
	
	if (solicitacaoAtendida == 1) 
	{
		$("#numeroOs").show();
		
	} else 
	{
		$("#numeroOs").hide();
	}
}

//EXIBE OS CAMPOS CONFORME VIAJANTE
function displayInformacoesViajante()
{
	var tipoViajante = $("#cpTipoViajante").val();

	$("#tabelaAddDependente").toggle(tipoViajante == '4');
	$('#btnAddDependente').toggle(tipoViajante == '4');
	$('#zoomCentroCusto').toggle(tipoViajante == '2' || tipoViajante == '4');
	$('#zoomNomeCompleto').toggle(tipoViajante == '2' || tipoViajante == '4');
	$('#dados').toggle(tipoViajante == '1' || tipoViajante == '2'  || tipoViajante == '3' || tipoViajante == '4');
	$('#cargo').toggle(tipoViajante == '1' || tipoViajante == '2');
	$('#CC').toggle(tipoViajante != '3');
	$('#CCUau').toggle(tipoViajante != '3');
}

function defineCamposProprioColaborador() 
{
		var login = compartilhados.getInstance().getLogin();
		var colaboradorLogado = model.getInstance().get1000(login);
		var obraUau = model.getInstance().get1045(colaboradorLogado[0].CODSECAO, colaboradorLogado[0].CODCOLIGADA);	
			
		$("#cpCentroCusto").val(colaboradorLogado[0].SECAO);
		$("#cpNomeCompleto").val(colaboradorLogado[0].NOME);
		$("#cpCpf").val(colaboradorLogado[0].CPF);
		$("#cpCargo").val(colaboradorLogado[0].FUNCAO);
		$("#cpGestorAtual").val(colaboradorLogado[0].CHAPA_GESTOR);
		$("#cpCentroCustoUauColab").val(obraUau[0].OBRA_UAU);
}