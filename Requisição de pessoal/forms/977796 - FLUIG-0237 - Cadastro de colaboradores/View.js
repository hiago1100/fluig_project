
$(document).ready(function() {

	var _compartilhados = compartilhados.getInstance();
	const currentState = _compartilhados.getCurrentState();
	var _view = VIEW.getInstance();
	var _bll = BLL.getInstance();

	_view.inicializar(currentState, getModo());

	$('#btSolicitacaoRequisicao').click(function ()
    {
		var url = _compartilhados.getServerUrl() + "/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + $('#cpNumeroRequisicao').val();
		window.open(url, '_blank');
	});

	$('#btDocumentosGed').click(function ()
    {
		var url = _compartilhados.getServerUrl() + "/portal/p/1/ecmnavigation?app_ecm_navigation_doc=" + $('#cpIntegracaoOcrDocumentoGedId').val();
		window.open(url, '_blank');
	});
	

	$('#btSolicitacaoAcessoInicial').click(function ()
    {
		var url = _compartilhados.getServerUrl() + "/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + $('#cpNumeroChamadoAcessoInicialTI').val();
		window.open(url, '_blank');
	});

	$('#btCadVagaFuncao').click(function ()
	{
		try
		{
			window.loadingLayer.show();

			setTimeout(function ()
			{
				var reqDepartamentoObra = $('#cpReqDepartamentoObra').val();
				var reqTipoMaoObra = $('#cpReqTipoMaoObra').val();
				var codColigada = $('#cpReqCodEmpresa').val();
				var codSecao = $('#cpReqCodSecao').val();
				
				if(_compartilhados.isEmpty(reqDepartamentoObra))
				{
					_compartilhados.WarningToast(Mensagens.M0005, '', 'danger');
					window.loadingLayer.hide();
					return;
				}

				if(_compartilhados.isEmpty(reqTipoMaoObra))
				{
					_compartilhados.WarningToast(Mensagens.M0007, '', 'danger');
					window.loadingLayer.hide();
					return;
				}

				if(_compartilhados.isEmpty(codSecao))
				{
					_compartilhados.WarningToast(Mensagens.M0008, '', 'danger');
					window.loadingLayer.hide();
					return;
				}

				if(_compartilhados.isEmpty(codColigada))
				{
					_compartilhados.WarningToast(Mensagens.M0009, '', 'danger');
					window.loadingLayer.hide();
					return;
				}

				var camposVisiveis = ['nome'];
				_zoom.get1049(camposVisiveis, codColigada, '%', codSecao, reqTipoMaoObra);
				window.loadingLayer.hide();

			}, 100);
		}
		catch (erro)
		{
			_compartilhados.WarningToast(Mensagens.M0003, '', 'danger');
			console.log(Mensagens.M0004.replace('{0}', '$("#btCadVagaFuncao").click').replace('{1}', erro))
			window.loadingLayer.hide();
		}
	});

	$('#btCadVagaSalario').click(function ()
	{
		try
		{
			window.loadingLayer.show();

			setTimeout(function ()
			{
				var reqDepartamentoObra = $('#cpReqDepartamentoObra').val();
				var cadCodVagaFuncao = $('#cpCadCodVagaFuncao').val();
				var codColigada = $('#cpReqCodEmpresa').val();
				var codSecao = $('#cpReqCodSecao').val();

				if(_compartilhados.isEmpty(reqDepartamentoObra))
				{
					_compartilhados.WarningToast(Mensagens.M0005, '', 'danger');
					window.loadingLayer.hide();
					return;
				}

				if(_compartilhados.isEmpty(cadCodVagaFuncao))
				{
					_compartilhados.WarningToast(Mensagens.M0006, '', 'danger');
					window.loadingLayer.hide();
					return;
				}

				if(_compartilhados.isEmpty(codSecao))
				{
					_compartilhados.WarningToast(Mensagens.M0008, '', 'danger');
					window.loadingLayer.hide();
					return;
				}

				if(_compartilhados.isEmpty(codColigada))
				{
					_compartilhados.WarningToast(Mensagens.M0009, '', 'danger');
					window.loadingLayer.hide();
					return;
				}

				var camposVisiveis = ['SALARIO'];
				_zoom.get1066(camposVisiveis, cadCodVagaFuncao, codSecao, codColigada);
				window.loadingLayer.hide();

			}, 100);
		}
		catch (erro)
		{
			_compartilhados.WarningToast(Mensagens.M0003, '', 'danger');
			console.log(Mensagens.M0004.replace('{0}', '$("#btCadVagaSalario").click').replace('{1}', erro))
			window.loadingLayer.hide();
		}
	});

	$('#btCadVagaHorario').click(function ()
	{
		try
		{
			window.loadingLayer.show();

			setTimeout(function ()
			{
				var reqDepartamentoObra = $('#cpReqDepartamentoObra').val();
				var codColigada = $('#cpReqCodEmpresa').val();

				if(_compartilhados.isEmpty(reqDepartamentoObra))
				{
					_compartilhados.WarningToast(Mensagens.M0005, '', 'danger');
					window.loadingLayer.hide();
					return;
				}

				if(_compartilhados.isEmpty(codColigada))
				{
					_compartilhados.WarningToast(Mensagens.M0009, '', 'danger');
					window.loadingLayer.hide();
					return;
				}

				var camposVisiveis = ['HORARIO'];
				_zoom.get1067(camposVisiveis, codColigada);
				window.loadingLayer.hide();

			}, 100);
		}
		catch (erro)
		{
			_compartilhados.WarningToast(Mensagens.M0003, '', 'danger');
			console.log(Mensagens.M0004.replace('{0}', 'btCadVagaHorario').replace('{1}', erro))
			window.loadingLayer.hide();
		}
	});

	$('#btCadInternoObraDep').click(function ()
    {
		try
        {
            window.loadingLayer.show();

            setTimeout(function ()
            {
				sessionStorage.setItem("btCadInternoObraDep",1);
				var camposVisiveis = ['SECAO'];
				_zoom.get1004(camposVisiveis);
				window.loadingLayer.hide();

			}, 100);
		}
		catch (erro)
		{
			_compartilhados.WarningToast(Mensagens.M0003, '', 'danger');
			console.log(Mensagens.M0004.replace('{0}', '$("#btCadInternoObraDep").click').replace('{1}', erro))
			window.loadingLayer.hide();
		}
	});

	$('#btCadInternoColaborador').click(function ()
    {
		try
        {
            window.loadingLayer.show();

            setTimeout(function ()
            {

				var cadInternoObraDep = $('#cpCadInternoObraDep').val();
				var cadastroKitCodColigada = $('#cpCadInternoCodEmpresa').val();
				var cadastroKitCodSecao = $('#cpCadInternoCodSecao').val();

				if(_compartilhados.isEmpty(cadInternoObraDep))
				{
					_compartilhados.WarningToast(Mensagens.M0005, '', 'danger');
					window.loadingLayer.hide();
					return;
				}

				if(_compartilhados.isEmpty(cadastroKitCodColigada))
				{
					_compartilhados.WarningToast(Mensagens.M0009, '', 'danger');
					window.loadingLayer.hide();
					return;
				}

				if(_compartilhados.isEmpty(cadastroKitCodSecao))
				{
					_compartilhados.WarningToast(Mensagens.M0008, '', 'danger');
					window.loadingLayer.hide();
					return;
				}

				sessionStorage.setItem("btCadInternoObraDep", 1);
				ZOOM.getInstance().getColaboradoresSecao(cadastroKitCodColigada, cadastroKitCodSecao);
				window.loadingLayer.hide();

			}, 100);
		}
		catch (erro)
		{
			_compartilhados.WarningToast(Mensagens.M0003, '', 'danger');
			console.log(Mensagens.M0004.replace('{0}', '$("#btCadInternoColaborador").click').replace('{1}', erro))
			window.loadingLayer.hide();
		}
	});

	$('#btCadastroKitMatricula').click(function ()
	{
		try
		{
			window.loadingLayer.show();

			setTimeout(function ()
			{
				sessionStorage.setItem("btCadastroKitMatricula",1);
				ZOOM.getInstance().getTodosCentroCusto(),
				window.loadingLayer.hide();

			}, 100);
		}
		catch (erro)
		{
			_compartilhados.WarningToast(Mensagens.M0003, '', 'danger');
			console.log(Mensagens.M0004.replace('{0}', '$("#btCadastroKitMatricula").click').replace('{1}', erro))
			window.loadingLayer.hide();
		}
	});

	$('#cpAprovacaoRecolhimentoSede').change(function ()
    {
		try
        {
            window.loadingLayer.show();

            setTimeout(function ()
            {
				var aprovacaoRecolhimento = $('#cpAprovacaoRecolhimentoSede').val();
				$('.divDadosRecolhimentoSede').toggle(aprovacaoRecolhimento == '1' );
				window.loadingLayer.hide();

			}, 100);
		}
		catch (erro)
		{
			_compartilhados.WarningToast(Mensagens.M0003, '', 'danger');
			console.log(Mensagens.M0004.replace('{0}', '$("#cpAprovacaoRecolhimentoSede").click').replace('{1}', erro))
			window.loadingLayer.hide();
		}
	});

	$('#cpCadTipoRecrutamento').change(function ()
    {
		try
        {
            window.loadingLayer.show();

            setTimeout(function ()
            {
				var tipoRecrutamento = $('#cpCadTipoRecrutamento').val();
				$('.divRecrutamentoInterno').toggle(tipoRecrutamento == 'Recrutamento Interno' );
				$('.divRecrutamentoExterno').toggle(tipoRecrutamento == 'Recrutamento Externo');
				$('.divCadTipoRecrutamentoParecer').toggle(tipoRecrutamento == 'Cancelar vaga');
				window.loadingLayer.hide();

			}, 100);
		}
		catch (erro)
		{
			_compartilhados.WarningToast(Mensagens.M0003, '', 'danger');
			console.log(Mensagens.M0004.replace('{0}', '$("#cpCadTipoRecrutamento").click').replace('{1}', erro))
			window.loadingLayer.hide();
		}
	});

	$('#cpCadExternoAltSalario').change(function ()
    {
		try
        {
            window.loadingLayer.show();

            setTimeout(function ()
            {
				$('#cpCadCodVagaFuncao').val('');
				$('#cpCadVagaFuncao').val('');
				$('#cpCadVagaSalario').val('');
				$('#cpCadVagaHorario').val('');
				
				var cadExternoAltSalario = $('#cpCadExternoAltSalario').val();
				$('#cpCadExternoAltSalarioFaixa').prop("disabled", cadExternoAltSalario != 'Sim');
				
				if(cadExternoAltSalario == 'Sim')
				{
					_compartilhados.enableButtonZoom(['#btCadVagaFuncao','#btCadVagaSalario','#btCadVagaHorario',
					'#btCadInternoObraDep','#btCadInternoColaborador'], ['5', '10']);
				}

				$('#btCadVagaFuncao').prop("disabled", cadExternoAltSalario == 'Nao');
				$('#btCadVagaSalario').prop("disabled", cadExternoAltSalario == 'Nao');
				$('#btCadVagaHorario').prop("disabled", cadExternoAltSalario == 'Nao');

				window.loadingLayer.hide();

			}, 100);
		}
		catch (erro)
		{
			_compartilhados.WarningToast(Mensagens.M0003, '', 'danger');
			console.log(Mensagens.M0004.replace('{0}', '$("#cpTipoMaoObra").click').replace('{1}', erro))
			window.loadingLayer.hide();
		}
	});

	$('#cpCadExternoAltSalarioFaixa').change(function ()
    {
		try
        {
            window.loadingLayer.show();

            setTimeout(function ()
            {
				var cadTipoRecrutamento = $('#cpCadExternoAltSalarioFaixa').val();
				document.getElementById("cpCadVagaSalario").readOnly = cadTipoRecrutamento == 'Nao';
				window.loadingLayer.hide();

			}, 100);
		}
		catch (erro)
		{
			_compartilhados.WarningToast(Mensagens.M0003, '', 'danger');
			console.log(Mensagens.M0004.replace('{0}', '$("#cpCadExternoAltSalarioFaixa").click').replace('{1}', erro))
			window.loadingLayer.hide();
		}
	});

	$('#cpAprovacaoCadastroKit').change(function ()
	{
		try
			{
				window.loadingLayer.show();

				setTimeout(function ()
				{	
					var aprovacaoCadastroKit = $('#cpAprovacaoCadastroKit').val();
					// 4 - Cadastrar por integração / 5 - Cadastrar manualmente
					$('.divCadastroKitCadastrado').toggle(aprovacaoCadastroKit == '4' || aprovacaoCadastroKit == '5');
					
					window.loadingLayer.hide();
				}, 100);
		}
		catch (erro)
		{
			_compartilhados.WarningToast(Mensagens.M0003, '', 'danger');
			console.log(Mensagens.M0004.replace('{0}', '$("#cpAprovacaoCadastroKit").click').replace('{1}', erro))
			window.loadingLayer.hide();
		}
	});

	$('#cpCadastroKitManual').change(function ()
	{
		try
			{
				window.loadingLayer.show();

				setTimeout(function ()
				{	
					var cadastroKitManual = $('#cpCadastroKitManual').val();
					$('.cadastroKitCadastrado').prop("readonly",  cadastroKitManual == 'Nao');
					
					window.loadingLayer.hide();
				}, 100);
		}
		catch (erro)
		{
			_compartilhados.WarningToast(Mensagens.M0003, '', 'danger');
			console.log(Mensagens.M0004.replace('{0}', '$("#cpCadastroKitManual").change').replace('{1}', erro))
			window.loadingLayer.hide();
		}
	});

	$(document).on('ZoomFuncaoSelecionada', function (ev, dados)
    {
		if(dados != undefined)
		{
			$('#cpCadVagaFuncao').val(dados.nome);
			$('#cpCadCodVagaFuncao').val(dados.codigo);
		}
		else
		{
			_compartilhados.WarningToast(Mensagens.M0003, '', 'danger');
		}
	});

	$(document).on('ZoomSalarioSelecionada', function (ev, dados)
    {
		if(dados != undefined)
		{
			$('#cpCadVagaSalario').val(dados.SALARIO);
		}
		else
		{
			_compartilhados.WarningToast(Mensagens.M0003, '', 'danger');
		}
	});

	$(document).on('ZoomHorariosSelecionada', function (ev, dados)
    {
		if(dados != undefined)
		{
			$('#cpCadVagaHorario').val(dados.HORARIO);
		}
		else
		{
			_compartilhados.WarningToast(Mensagens.M0003, '', 'danger');
		}
	});

	$(document).on('ZoomSecaoColaboradorRecrutamentoInternoSelecionada', function (ev, dados)
    {
		if(dados != undefined)
		{
			if(sessionStorage.getItem("btCadastroKitMatricula") == '1')
			{
				$('#cpCadastroKitObraDepartamento').val(dados.SECAO);
				$('#cpCadastroKitCodSecao').val(dados.CODSECAO);
				$('#cpCadastroKitCodColigada').val(dados.CODCOLIGADA);
			}
			else if(sessionStorage.getItem("btCadInternoObraDep") == '1')
			{
				$('#cpCadInternoObraDep').val(dados.SECAO);
				$('#cpCadInternoCodSecao').val(dados.CODSECAO);
				$('#cpCadInternoCodEmpresa').val(dados.CODCOLIGADA);
			}
	
			if(_compartilhados.isEmpty(dados.CODSECAO))
			{
				_compartilhados.WarningToast(Mensagens.M0008, '', 'danger');
				window.loadingLayer.hide();
				return;
			}
	
			if(_compartilhados.isEmpty(dados.CODCOLIGADA))
			{
				_compartilhados.WarningToast(Mensagens.M0009, '', 'danger');
				window.loadingLayer.hide();
				return;
			}
			
			var camposVisiveis = ['NOME','CHAPA','FUNCAO','DATAADMISSAO'];
			_zoom.get1023(camposVisiveis, dados.CODCOLIGADA, dados.CODSECAO);// ZoomCallBack1023
		}
		else
		{
			_compartilhados.WarningToast(Mensagens.M0003, '', 'danger');
		}
	});

	$(document).on('ZoomCallBack1023', function (ev, dados)
    {
		if(dados != undefined)
		{
			if(sessionStorage.getItem("btCadastroKitMatricula") == '1')
			{
				$('#cpCadastroKitMatricula').val(dados.CHAPA);
				$('#cpCadastroKitColaborador').val(dados.NOME);
				$('#cpCadastroKitCpf').val(dados.CPF);
				$('#cpCadastroKitDataAdmissao').val(dados.DATAADMISSAO);
				$('#cpCadastroKitFuncao').val(dados.FUNCAO);
				$('#cpCadastroKitSituacao').val(dados.SITUACAO);
				$('#cpCadastroKitSalario').val(dados.SALARIO);
				
			}
			else if(sessionStorage.getItem("btCadInternoObraDep") == '1')
			{
				$('#cpCadInternoColaborador').val(dados.NOME);
				$('#cpCadInternoFuncao').val(dados.FUNCAO);
				$('#cpCadInternoAprovadorN1').val(dados.NOME_GESTOR);
				$('#cpCadInternoAprovadorN2').val(dados.NOME_GG);
			}
	
			sessionStorage.setItem("btCadastroKitMatricula",'');
			sessionStorage.setItem("btCadInternoObraDep",'');
		}
		else
		{
			_compartilhados.WarningToast(Mensagens.M0003, '', 'danger');
		}
	});
	
	$(document).on('callBackWarningTextAbertura', function (ev, dados)
    {
		window.top.location.href = _compartilhados.getServerUrl();
		_compartilhados.warningAlert(Mensagens.M0001, 'Aviso', 'ok','callBackWarningTextAbertura');
	});

	$(document).on('callBackOnBeforeRecolhimentoDataAdmissao', function (ev, dados)
    {
		if(dados != undefined)
		{
			sessionStorage.setItem('returnBeforeShowDay', _bll.validaDataAdmissao(dados));
		}
		else
		{
			_compartilhados.WarningToast(Mensagens.M0003, '', 'danger');
		}
	});

	$(document).on('callBackClickRecolhimentoDataAdmissao', function (ev, dados)
    {
		_view.getSlaCadastroKit(currentState);
	});
});

var VIEW = (function(_compartilhados, _bll)
{
	var instance;

	function init()
	{
		var inicializar = function(currentState, modoExibicao)
		{
			if (modoExibicao == 'MOD' || modoExibicao == 'ADD')
			{
					carregarInterfaceEmModificacao(currentState, modoExibicao);
			}
			else
			{
					carregarInterfaceEmVisualizacao(currentState, modoExibicao);
			}
		};

		var carregarInterfaceEmModificacao = function (currentState, modoExibicao)
		{
			if (currentState == 0 || currentState == 1) // Atividades iniciais
			{
				_compartilhados.warningAlert(Mensagens.M0001, 'Aviso', 'ok','callBackWarningTextAbertura');
			}
			else if (currentState == 5 || currentState == 10)  // Recolhimento da documentação e definição da Data de Admissão (Obra) | Recrutamento e Seleção
			{
				$('.panelAtividade').toggle(false);
				$('.panelEtapaProcesso').toggle(false);

				$('#cpResponsavelAberturaDesligame').val(_compartilhados.getUserCode());

				if (currentState == 10) 
				{
					$('.panelEtapaProcesso').toggle(true);
					$('.panelAtividade_10').toggle(true);
					$('#cpResponsavelAssinaturaKit').val($('#cpResponsavelRecolhimentoObra').val());
				}
			}
			else if (currentState == 11) // Cadastro do Kit Admissional - área CSC Cadastro
			{
				if($('#cpResponsavelAssinaturaKit').val() == '')
				{
					$('#cpResponsavelAssinaturaKit').val(_compartilhados.getUserCode());
				}

				$("#cpAprovacaoCadastroKit option[value='7']").attr("disabled", "disabled");
			}

			_compartilhados.enableButtonZoom(['#btCadInternoObraDep','#btCadInternoColaborador'], ['5', '10']);
			_compartilhados.enableButtonZoom(['#btCadastroKitMatricula'], ['11']);
			
			inicializarCamposDatas();
			setStatusElementos();
	    }

		var carregarInterfaceEmVisualizacao = function (currentState, modoExibicao)
		{
			setStatusElementos();
		}

		var setStatusElementos = function (currentState, modoExibicao)
		{
			var tipoRecrutamento= $('#cpCadTipoRecrutamento').val();
			var cadTipoRecrutamento = $('#cpCadExternoAltSalario').val();
			var aprovacaoCadastroKit = $('#cpAprovacaoCadastroKit').val();
			var aprovacaoRecolhimento = $('#cpAprovacaoRecolhimentoSede').val();
			var integracaoOcrDocumento = $('#cpIntegracaoOcrDocumento').val();
			var integracaoOcrEnvio = $('#cpIntegracaoOcrEnvio').val();
			var integracaoOcrCriarGed = $('#cpIntegracaoOcrCriarGed').val();
			var integracaoOcrDocumentoGed = $('#cpIntegracaoOcrDocumentoGed').val();
			

			$('.divRecrutamentoInterno').toggle(tipoRecrutamento == 'Recrutamento Interno');
			$('.divRecrutamentoExterno').toggle(tipoRecrutamento == 'Recrutamento Externo');
			$('.divCadTipoRecrutamentoParecer').toggle(tipoRecrutamento == 'Cancelar vaga');
			$('.divCadastroKitCadastrado').toggle(aprovacaoCadastroKit == '4' || aprovacaoCadastroKit == '5');
			$('.divDadosRecolhimentoSede').toggle(aprovacaoRecolhimento == '1' );
			$('#cpCadExternoAltSalarioFaixa').prop("disabled", cadTipoRecrutamento != 'Sim');

			$('#divAvisoIntegracaoOcrEnvioSucesso').toggle(integracaoOcrEnvio == '1');
			$('#divAvisoIntegracaoOcrEnvioErro').toggle(integracaoOcrEnvio == '0' );

			$('#divAvisoIntegracaoOcrDocumentoSucesso').toggle(integracaoOcrDocumento == '1');
			$('#divAvisoIntegracaoOcrDocumentoErro').toggle(integracaoOcrDocumento == '0' );

			$('#divAvisoIntegracaoOcrCriarGedSucesso').toggle(integracaoOcrCriarGed == '1');
			$('#divAvisoIntegracaoOcrCriarGedErro').toggle(integracaoOcrCriarGed == '0' );

			$('#divAvisoIntegracaoOcrPublicasGedSucesso').toggle(integracaoOcrDocumentoGed == '1');
			$('#divAvisoIntegracaoOcrPublicasGedErro').toggle(integracaoOcrDocumentoGed == '0' );

			if(cadTipoRecrutamento == 'Sim')
			{
				_compartilhados.enableButtonZoom(['#btCadVagaFuncao','#btCadVagaSalario','#btCadVagaHorario'], ['5', '10']);
			}

			if(tipoRecrutamento != 'Estratégico' && tipoRecrutamento != 'Administrativo') 
			{
				$("#cpCadTipoRecrutamento option[value='Recrutamento Interno']").attr('disabled','disabled');
			}

			$('#cpCadVagaSalario, #cpCadastroKitSalario').priceFormat({
				prefix: '',
				centsSeparator: ',',
				thousandsSeparator: '.'
			});
		}

		var getSlaCadastroKit = function (currentState)
		{
			var dateNow = new Date();

			var recolhimentoDataAdmissao = $('#cpRecolhimentoSedeDataAdmissao').val()

			if(currentState == 10)
			{
				recolhimentoDataAdmissao = $('#cpRecolhimentoObraDataAdmissao').val()
			}
			
			recolhimentoDataAdmissao = new Date(recolhimentoDataAdmissao.split('/')[1] +'-'+ recolhimentoDataAdmissao.split('/')[0] +'-'+ recolhimentoDataAdmissao.split('/')[2]);

			var days = _compartilhados.daysBetweenTwoDates(dateNow, recolhimentoDataAdmissao);

			recolhimentoDataAdmissao.setDate(recolhimentoDataAdmissao.getDate() - 1);

			if (recolhimentoDataAdmissao.getDay() == 6) 
			{
				recolhimentoDataAdmissao.setDate(recolhimentoDataAdmissao.getDate() - 1);
			}

			if (recolhimentoDataAdmissao.getDay() == 0) 
			{
				recolhimentoDataAdmissao.setDate(recolhimentoDataAdmissao.getDate() - 2);
			}

			$('#cpSlaCadastroKit').val(recolhimentoDataAdmissao.toLocaleDateString());
		}

		var inicializarCamposDatas = function()
		{
			_compartilhados.initilizeDatePicker 
            ([
                ['cpRecolhimentoSedeDataAdmissao', [313], 'callBackClickRecolhimentoDataAdmissao','callBackOnBeforeRecolhimentoDataAdmissao']
			],'',_compartilhados.addWorkingDays(new Date(),4, false),'');
			
			_compartilhados.initilizeDatePicker 
            ([
                ['cpRecolhimentoObraDataAdmissao', [10], 'callBackClickRecolhimentoDataAdmissao','callBackOnBeforeRecolhimentoDataAdmissao']
            ],'',_compartilhados.addWorkingDays(new Date(),4, false),'');

			_compartilhados.initilizeDatePicker 
            ([['cpCadastroKitDataAdmissao', [11]]]);
		}

		return {
			inicializar,
			carregarInterfaceEmModificacao,
			carregarInterfaceEmVisualizacao,
			setStatusElementos,
			getSlaCadastroKit,
			inicializarCamposDatas
		};
	}

	return {
		getInstance: function()
		{
			if (!instance)
			{
				instance = init();
			}

			return instance;
		}
	}
})(compartilhados.getInstance(),BLL.getInstance());


