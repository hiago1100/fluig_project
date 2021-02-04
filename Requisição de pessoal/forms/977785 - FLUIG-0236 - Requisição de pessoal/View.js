$(document).ready(function() 
{
	var _compartilhados = compartilhados.getInstance();

	const currentState = _compartilhados.getCurrentState();
	var _view = view.getInstance();
	var _zoom = zoom.getInstance();

	_view.inicializar(currentState, getModo());

	$('#btAddVaga').click(function ()
    {
		try
        {
            window.loadingLayer.show();

            setTimeout(function ()
            {
				_view.adicionarFuncao();
				window.loadingLayer.hide();

            }, 100);
        }
        catch (erro)
        {
            _compartilhados.warningToast(Mensagens.M0003, '', 'danger');
            console.log(Mensagens.M0004.replace('{0}', '$("#btAddVaga").click').replace('{1}', erro))
			window.loadingLayer.hide();
        }
	});

	$('#btReqObraDep').click(function ()
    {
		try
        {
            window.loadingLayer.show();

            setTimeout(function ()
            {
				var tipoMaoObra = $('#cpTipoMaoObra').val();

				if(_compartilhados.isEmpty(tipoMaoObra))
				{
					_compartilhados.warningToast(Mensagens.M0008, '', 'danger');
					window.loadingLayer.hide();
					return;
				}

				var camposVisiveis = ['DEPARTAMENTO'];
				_zoom.get1013(camposVisiveis, _compartilhados.getLogin());

                window.loadingLayer.hide();

            }, 100);
        }
        catch (erro)
        {
            _compartilhados.warningToast(Mensagens.M0003, '', 'danger');
            console.log(Mensagens.M0004.replace('{0}', '$("#btReqObraDep").click').replace('{1}', erro))
            window.loadingLayer.hide();
        }
	
	});

	$('#btReqResponsavelRecolhimento').click(function ()
    {
		try
        {
            window.loadingLayer.show();

            setTimeout(function ()
            {
				var reqDepartamentoObra = $('#cpReqDepartamentoObra').val();
				var codColigada = $('#cpReqCodEmpresa').val();
				var codSecao = $('#cpReqCodSecao').val();

				if(_compartilhados.isEmpty(reqDepartamentoObra))
				{
					_compartilhados.warningToast(Mensagens.M0005, '', 'danger');
					window.loadingLayer.hide();
					return;
				}

				var camposVisiveis = ['NOME'];
				_zoom.get1011(camposVisiveis, codColigada, codSecao);
                window.loadingLayer.hide();

            }, 100);
        }
        catch (erro)
        {
            _compartilhados.warningToast(Mensagens.M0003, '', 'danger');
            console.log(Mensagens.M0004.replace('{0}', '$("#btReqResponsavelRecolhimento").click').replace('{1}', erro))
            window.loadingLayer.hide();
        }
	
	});

	$('#cpTipoMaoObra').change(function ()
    {
		try
        {
            window.loadingLayer.show();

            setTimeout(function ()
            {
				var tipoMaoObra = $('#cpTipoMaoObra').val();
				
				_compartilhados.limparCampos(["camposObraDepartamento", "camposVagas","camposResponsavelRecolhimento"]);
				
				$('.indicou').toggle(false);
				$('.painelVagas').toggle(!_compartilhados.isEmpty(tipoMaoObra));
				$('.indicacao').toggle(tipoMaoObra == 'Administrativo' || tipoMaoObra == 'Estratégico');
				$('.administrativoEstrategico').toggle(tipoMaoObra == 'Administrativo' || tipoMaoObra == 'Estratégico');
				
				window.loadingLayer.hide();

			}, 100);
		}
		catch (erro)
		{
			_compartilhados.warningToast(Mensagens.M0003, '', 'danger');
			console.log(Mensagens.M0004.replace('{0}', '$("#cpTipoMaoObra").click').replace('{1}', erro))
			window.loadingLayer.hide();
		}
	});

	$(document).on('ZoomCallBack1013', function (ev, dados)
		{
			if(dados.BLOQUEIACONTRATACAO == 'true')
			{
				_compartilhados.warningToast(Mensagens.M0002, '', 'danger');
				return;
			}

			_compartilhados.limparCampos(["camposResponsavelRecolhimento","camposVagas"]);

			_view.preencherCamposObraDepartamento(dados);
			_view.setRecolhedorCentralObra(dados);

			_compartilhados.encriptForm($('#cpEncodeKey').val());
	});
	
	$(document).on('ZoomCallBack1011', function (ev, dados)
    {
		$('#cpReqNomeResponsRecolhimento').val(dados.NOME);
		$('#cpReqChapaResponsRecolhimento').val(dados.CHAPA);

		_compartilhados.encriptForm($('#cpEncodeKey').val());
	});

	$(document).on('ZoomCallBack1049', function (ev, dados)
    {
		var index = sessionStorage.getItem('indexPaiFilho');

		$('#cpVagaFuncao___'+index).val(dados.nome);
		$('#cpCodVagaFuncao___'+index).val(dados.codigo);
		$('#cpVagaSalario___'+index).val('');
	});

	$(document).on('ZoomCallBack1067', function (ev, dados)
    {
		var index = sessionStorage.getItem('indexPaiFilho');

		$('#cpVagaHorario___'+index).val(dados.HORARIO);
	});

	$(document).on('ZoomCallBack1066', function (ev, dados)
    {
		var index = sessionStorage.getItem('indexPaiFilho');

		$('#cpVagaSalario___'+index).val(dados.SALARIO);
	});

	$(document).on('ZoomCallBack1029', function (ev, dados)
    {
		var index = sessionStorage.getItem('indexPaiFilho');

		$('#cpNomePostoTrabalho___'+index).val(dados.DESCRICAO);
		$('#cpCodNomePostoTrabalho___'+index).val(dados.CODPOSTO);
	});

	$(document).on('ZoomCallBack1004', function (ev, dados)
    {
		window.loadingLayer.show();

	    setTimeout(function ()
	    {
			var camposVisiveis = ['NOME', 'CHAPA'];
	        _zoom.get1019(camposVisiveis, '%', dados.CODSECAO, dados.CODCOLIGADA);
	        window.loadingLayer.hide();

	    }, 100);
	});

	$(document).on('ZoomCallBack1019', function (ev, dados)
    {
		var index = sessionStorage.getItem('indexPaiFilho');

		$('#cpVagaColaboradorSubstituto___'+index).val(dados.NOME);
		$('#cpVagaFuncaoSubstituto___'+index).val(dados.NOME_FUNCAO);
	});

	$(document).on('callBackcloseTab', function (ev, dados)
    {
		FLUIGC.message.confirm({
			message: Mensagens.M0007,
			title: 'AVISO!',
			labelYes: 'Sim',
			labelNo: 'Cancelar'
			}, function (result, el, ev)
			{
				if (result) 
				{
					_view.removePaiFilhoFuncao(dados);
				}
			});
	});
});

var view = (function()
{
	var instance;
	var _compartilhados = compartilhados.getInstance(); 
	var _tabs = Tabs.getInstance();
	var _zoom = zoom.getInstance();
	var _model = model.getInstance();

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
				adicionarFuncao();
			}
			else
			{
				_tabs.reload('tabsVagas','Função', 'pfVagas','.paifilhoTab','trFilho', currentState == 2);
			}
	    
			setStatusElementos(currentState,modoExibicao);
			exibeAvisoNumeroFuncoes();
			exibeAvisoNumeroVagas();
			
			_compartilhados.enableButtonZoom(['#btReqObraDep','#btReqResponsavelRecolhimento'], ['0', '1', '2'])


			var camposCript = [
				'cpMatriculaConsultoraObraDep',
				'cpMatriculaGestorObraDep',
				'cpMatriculaGGObraDep',
				'cpMatriculaSuperObraDep',
				'cpMatriculaDiretorObraDep'
			];	
	    }

	    var carregarInterfaceEmVisualizacao = function (currentState, modoExibicao)
	    {
			_tabs.reload('tabsVagas','Função', 'pfVagas','.paifilhoTab','trFilho', false);
			setStatusElementos(currentState, modoExibicao);
			exibeAvisoNumeroFuncoes();
			exibeAvisoNumeroVagas();
	    }

	    var setStatusElementos = function (currentState, modoExibicao)
	    {
			var tipoMaoObra = $('#cpTipoMaoObra').val();

			$('.painelVagas').toggle(tipoMaoObra != '');
			$('.administrativoEstrategico').toggle(tipoMaoObra == 'Administrativo' || tipoMaoObra == 'Estratégico');
			$('.aprovacaoConsultoria').toggle(currentState != 0 && currentState != 1 && currentState != 2);
			$('.indicacao').toggle(tipoMaoObra == 'Administrativo' || tipoMaoObra == 'Estratégico');
			$('#btAddVaga').prop('disabled',((currentState != 0 && currentState != 1 && currentState != 2) || modoExibicao == 'VIEW'));

			if((currentState != 0 && currentState != 1) || modoExibicao == 'VIEW')
			{
				$('.bpm-mobile-trash-column').remove();
			}

			setTimeout(function ()
            {
				var array = _compartilhados.arrayIndexPaiFilho('tableVagas');

				array.forEach(function(index)
				{
					var motivoAdmissao = $('#cpMotivoAdmissao___'+index).val();
					var aprovacaoRHAltSalario = $('#cpAprovacaoRHAltSalario___'+index).val();
					
					$('#divColaboradorSubstituto___'+index).toggle(motivoAdmissao != 'Aumento de quadro' && motivoAdmissao != '');
					$('#cpAprovacaoRHASalarioAlterado___'+index).prop("disabled", aprovacaoRHAltSalario == '2');
					$('#cpParecerRecursoHumanos___'+index).prop("disabled", aprovacaoRHAltSalario == '2');
					$('#cpAprovacaoRHMotivoSalario___'+index).prop("disabled", (_compartilhados.getCurrentState() != 10 || aprovacaoRHAltSalario == '2'));
					$('.indicou').toggle($('#cpVagaIndicacao___'+index).val() == 'Sim');

					formatarCamposDecimais(index);

					addEventcpAprovacaoRHAltSalario(index);

					_compartilhados.enableButtonZoom(['#btVagaFuncao___'+index, '#btVagaSalario___'+index,
					'#btVagaHorario___'+index,'#btNomePostoTrabalho___'+index,'#btVagaColaboradorSubstituto___'+index], [0, 1, 2]);
				});

            }, 100);
			
		}

		var addEventbtVagaFuncao = function (index)
	    {
			$('#btVagaFuncao___'+index).click(function ()
			{
				try
				{
					window.loadingLayer.show();
		
					setTimeout(function ()
					{
						var reqDepartamentoObra = $('#cpReqDepartamentoObra').val();
						var tipoMaoObra = $('#cpTipoMaoObra').val();
						var codColigada = $('#cpReqCodEmpresa').val();
						var codSecao = $('#cpReqCodSecao').val();

						if(_compartilhados.isEmpty(reqDepartamentoObra))
						{
							_compartilhados.warningToast(Mensagens.M0005, '', 'danger');
							window.loadingLayer.hide();
							return;
						}

						if(_compartilhados.isEmpty(tipoMaoObra))
						{
							_compartilhados.warningToast(Mensagens.M0008, '', 'danger');
							window.loadingLayer.hide();
							return;
						}

						sessionStorage.setItem('indexPaiFilho', index);
						var camposVisiveis = ['nome'];
						_zoom.get1049(camposVisiveis, codColigada,'%', codSecao, tipoMaoObra);
						window.loadingLayer.hide();
		
					}, 100);
				}
				catch (erro)
				{
					_compartilhados.warningToast(Mensagens.M0003, '', 'danger');
					console.log(Mensagens.M0004.replace('{0}', '$("#btVagaFuncao").click').replace('{1}', erro))
					window.loadingLayer.hide();
				}
			});
			
		}

		var addEventbtVagaSalario = function (index)
	    {
			$('#btVagaSalario___'+index).click(function ()
			{
				try
				{
					window.loadingLayer.show();
		
					setTimeout(function ()
					{
						var reqDepartamentoObra = $('#cpReqDepartamentoObra').val();
						var codVagaFuncao = $('#cpCodVagaFuncao___'+index).val();
						var codColigada = $('#cpReqCodEmpresa').val();
						var codSecao = $('#cpReqCodSecao').val();
						var codFuncao = $('#cpCodVagaFuncao___'+index).val();

						if(_compartilhados.isEmpty(reqDepartamentoObra))
						{
							_compartilhados.warningToast(Mensagens.M0005, '', 'danger');
							window.loadingLayer.hide();
							return;
						}

						if(_compartilhados.isEmpty(codVagaFuncao))
						{
							_compartilhados.warningToast(Mensagens.M0009, '', 'danger');
							window.loadingLayer.hide();
							return;
						}

						sessionStorage.setItem('indexPaiFilho', index);
						var camposVisiveis = ['SALARIO'];
						_zoom.get1066(camposVisiveis, codFuncao, codSecao, codColigada);
						window.loadingLayer.hide();
		
					}, 100);
				}
				catch (erro)
				{
					_compartilhados.warningToast(Mensagens.M0003, '', 'danger');
					console.log(Mensagens.M0004.replace('{0}', '$("#btVagaSalario").click').replace('{1}', erro))
					window.loadingLayer.hide();
				}
			});
			
		}
		
		var addEventbtVagaHorario = function (index)
	    {
			$('#btVagaHorario___'+index).click(function ()
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
							_compartilhados.warningToast(Mensagens.M0005, '', 'danger');
							window.loadingLayer.hide();
							return;
						}

						sessionStorage.setItem('indexPaiFilho', index);
						var camposVisiveis = ['HORARIO'];
						_zoom.get1067(camposVisiveis, codColigada);
						window.loadingLayer.hide();
		
					}, 100);
				}
				catch (erro)
				{
					_compartilhados.warningToast(Mensagens.M0003, '', 'danger');
					console.log(Mensagens.M0004.replace('{0}', 'btVagaHorario').replace('{1}', erro))
					window.loadingLayer.hide();
				}
			});
			
		}
		
		var addEventbtNomePostoTrabalho = function (index)
	    {
			$('#btNomePostoTrabalho___'+index).click(function ()
			{
				try
				{
					window.loadingLayer.show();
		
					setTimeout(function ()
					{
						var reqDepartamentoObra = $('#cpReqDepartamentoObra').val();
						var tipoPostoTrabalho = $('#cpTipoPostoTrabalho___'+index).val();
						var codColigada = $('#cpReqCodEmpresa').val();
						
						if(_compartilhados.isEmpty(reqDepartamentoObra))
						{
							_compartilhados.warningToast(Mensagens.M0005, '', 'danger');
							window.loadingLayer.hide();
							return;
						}

						if(_compartilhados.isEmpty(tipoPostoTrabalho))
						{
							_compartilhados.warningToast(Mensagens.M0010, '', 'danger');
							window.loadingLayer.hide();
							return;
						}

						sessionStorage.setItem('indexPaiFilho', index);

						var camposVisiveis = ['DESCRICAO'];
						_zoom.get1029(camposVisiveis, codColigada,tipoPostoTrabalho);
						window.loadingLayer.hide();
		
					}, 100);
				}
				catch (erro)
				{
					_compartilhados.warningToast(Mensagens.M0003, '', 'danger');
					console.log(Mensagens.M0004.replace('{0}', 'btNomePostoTrabalho').replace('{1}', erro))
					window.loadingLayer.hide();
				}
			});
			
		}

		var addEventbtVagaColaboradorSubstituto = function (index)
	    {
			$('#btVagaColaboradorSubstituto___'+index).click(function ()
			{
				try
				{
					window.loadingLayer.show();
		
					setTimeout(function ()
					{
						sessionStorage.setItem('indexPaiFilho', index);
						var camposVisiveis = ['SECAO'];
						_zoom.get1004(camposVisiveis);
						window.loadingLayer.hide();
		
					}, 100);
				}
				catch (erro)
				{
					_compartilhados.warningToast(Mensagens.M0003, '', 'danger');
					console.log(Mensagens.M0004.replace('{0}', 'btVagaColaboradorSubstituto').replace('{1}', erro))
					window.loadingLayer.hide();
				}
			});
		}

		var addEventcpVagaQuantidade = function (index)
	    {
			$('#cpVagaQuantidade___'+index).change(function ()
			{
				const min = 1;
				const max = 30;

				if ($(this).val() > max)
				{
					$(this).val(max);
				}
				else if ($(this).val() < min)
				{
					$(this).val(min);
				}   

				exibeAvisoNumeroVagas(index);
			});
		}

		var addEventcpMotivoAdmissao = function (index)
	    {
			$('#cpMotivoAdmissao___'+index).change(function ()
			{
				try
				{
					window.loadingLayer.show();
		
					setTimeout(function ()
					{
						var isMotivoAdmissaoAumentoQuadro = $('#cpMotivoAdmissao___'+index).val() != 'Aumento de quadro';
						$('#divColaboradorSubstituto___'+index).toggle(isMotivoAdmissaoAumentoQuadro);
						window.loadingLayer.hide();
		
					}, 100);
				}
				catch (erro)
				{
					_compartilhados.warningToast(Mensagens.M0003, '', 'danger');
					console.log(Mensagens.M0004.replace('{0}', 'addEventcpMotivoAdmissao').replace('{1}', erro))
					window.loadingLayer.hide();
				}
			});
		}

		var addEventcpVagaIndicacao = function (index)
	    {
			$('#cpVagaIndicacao___'+index).change(function ()
			{
				try
				{
					window.loadingLayer.show();
		
					setTimeout(function ()
					{
						var vagaIndicacao = $('#cpVagaIndicacao___'+index).val();
						$('.indicou').toggle(vagaIndicacao == 'Sim')
						$('#cpVagaNomeIndicado___'+index).prop("disabled", vagaIndicacao == 'Nao');
						$('#cpVagaQuemIndicou___'+index).prop("disabled", vagaIndicacao == 'Nao');
						window.loadingLayer.hide();
		
					}, 100);
				}
				catch (erro)
				{
					_compartilhados.warningToast(Mensagens.M0003, '', 'danger');
					console.log(Mensagens.M0004.replace('{0}', 'addEventcpVagaIndicacao').replace('{1}', erro))
					window.loadingLayer.hide();
				}
			});
		}

		var addEventcpAprovacaoRHAltSalario = function (index)
	    {
			$('#cpAprovacaoRHAltSalario___'+index).change(function ()
			{
				try
				{
					window.loadingLayer.show();
		
					setTimeout(function ()
					{
						var aprovacaoRHAltSalario = $('#cpAprovacaoRHAltSalario___'+index).val();

						$('#cpAprovacaoRHASalarioAlterado___'+index).prop("disabled", aprovacaoRHAltSalario == '2');
						$('#cpParecerRecursoHumanos___'+index).prop("disabled", aprovacaoRHAltSalario == '2');
						$('#cpAprovacaoRH').val(aprovacaoRHAltSalario == '1' ? 3 : 1);
						$('#cpAprovacaoRHMotivoSalario___'+index).prop("disabled", (_compartilhados.getCurrentState() != 10 || aprovacaoRHAltSalario == '2'));
						
						window.loadingLayer.hide();
		
					}, 100);
				}
				catch (erro)
				{
					_compartilhados.warningToast(Mensagens.M0003, '', 'danger');
					console.log(Mensagens.M0004.replace('{0}', 'addEventcpVagaIndicacao').replace('{1}', erro))
					window.loadingLayer.hide();
				}
			});
		}

		var exibeAvisoNumeroFuncoes = function ()
	    {
			const max = 5;
			var qnt = _compartilhados.quantidadePaiFilho('tableVagas');

			$('#spanTotalFuncoes').html('<b>' + qnt + '</b> de <b>' +  max + '</b> funções selecionadas');
		}

		var exibeAvisoNumeroVagas = function (originIndex)
	    {
			const max = 30;
			var soma = 0;
			var arrayVagas = _compartilhados.arrayIndexPaiFilho('tableVagas');

			arrayVagas.forEach(function(index)
			{
				var vagaQuantidade = parseInt($('#cpVagaQuantidade___'+index).val())
				soma = soma + vagaQuantidade;

				if(soma > max)
				{
					_compartilhados.warningToast(Mensagens.M0006, '', 'danger');
					$('#cpVagaQuantidade___'+originIndex).val('1')
					exibeAvisoNumeroVagas(originIndex);
					return;
				}

				$('#spanTotalVagas').html('<b>' + soma + '</b> de <b>' +  max + '</b> vagas selecionadas');
				$('#cpQntTotalVagas').val(soma);
			});
		}

		var adicionarFuncao = function ()
	    {
			var index = _tabs.add('tabsVagas','Função', 'pfVagas', 5,'.paifilhoTab','trFilho', true);
		
			_compartilhados.enableButtonZoom(['#btVagaFuncao___'+index, '#btVagaSalario___'+index,
			'#btVagaHorario___'+index,'#btNomePostoTrabalho___'+index,'#btVagaColaboradorSubstituto___'+index], ['0', '1', '2']);

			$('#cpVagaQuantidade___'+index).val('1');

			$('#cpQntTotalFuncoes').val(_compartilhados.quantidadePaiFilho('tableVagas'));
			
			addEventbtVagaFuncao(index);
			addEventbtVagaSalario(index);
			addEventbtVagaHorario(index);
			addEventbtNomePostoTrabalho(index);	
			addEventbtVagaColaboradorSubstituto(index);	
			addEventcpVagaQuantidade(index);
			addEventcpMotivoAdmissao(index);
			addEventcpVagaIndicacao(index);
			addEventcpAprovacaoRHAltSalario(index);
			exibeAvisoNumeroFuncoes();
			exibeAvisoNumeroVagas();
			formatarCamposDecimais(index);
			
			var tipoMaoObra = $('#cpTipoMaoObra').val();
			$('.indicacao').toggle(tipoMaoObra == 'Administrativo' || tipoMaoObra == 'Estratégico');
			$('.administrativoEstrategico').toggle(tipoMaoObra == 'Administrativo' || tipoMaoObra == 'Estratégico');

		}

		var formatarCamposDecimais = function(index)
		{
			$('#cpVagaSalario___'+index + ', #cpAprovacaoRHASalarioAlterado___'+index).priceFormat({
				prefix: '',
				centsSeparator: ',',
				thousandsSeparator: '.'
			});
		}

		// funcao para facilitar os testes em desenvolvimento
		var testPreencheCampos = function()
		{
			if(window.location.href.indexOf('cscdev') > -1 || window.location.href.indexOf('cschmg') > -1)
			{
				$('#cpVagaAreaFormacao___1').val('OK');
				$('#cpVagaExpComprovada___1').val('OK');
				$('#cpVagaExpDesejada___1').val('OK');
				$('#cpVagaCompetenciaComportamento___1').val('OK');
				$('#cpVagaAtribuicoes___1').val('OK');
				$('#cpVagaConhecimento___1').val('OK');
				$('#cpVagaDiferenciais___1').val('OK');
				$('#cpVagaHorario___1').val('07:30 11:30 12:30 17:30 SEG A SEX');
				$('#cpVagaGrauInstrucao___1').val('Mestrado completo');
				$('#cpVagaTempoExp___1').val('Acima de 3 anos');
				$('#cpDisponibilidadeViagens___1').val('Nao');
				$('#cpInglesNivel___1').val('Básico');
				$('#cpEspanholNivel___1').val('Básico');
				$('#cpMotivoAdmissao___1').val('Aumento de quadro');
				$('#cpVagaIndicacao___1').val('Nao');
				$('#cpVagaConfidencial___1').val('2');
				$('#cpVagaInterna___1').val('2');
				$('#cpVagaTipo___1').val('Efetivo');
				$('#cpTipoPostoTrabalho___1').val('SEM ALTURA');
				$('#cpCodNomePostoTrabalho___1').val('0001');
				$('#cpNomePostoTrabalho___1').val('ADMINISTRAÇÃO/DP/JURIDICO/RH');
				$('#cpVagaSalario___1').val('5.072,72');
				$('#cpVagaFuncao___1').val('ANALISTA DE SISTEMAS SR');
				$('#cpPeriodicidadeViagens___1').val('Não necessário');
				$('#cpReqCodFuncao___1').val('Não necessário');
				$('#cpCodVagaFuncao___1').val('2210');
				
			}
		}

		var removePaiFilhoFuncao = function(dados)
		{
				//remove a linha do paixfilho
				$("#"+dados.trFilho+"___" + dados.paiFilhoIndex).remove();

				// so permite exclusao do ultimo filho, exceto o primeiro
				if(_compartilhados.quantidadePaiFilho('tableVagas') != 1)
				{
					$('.'+dados.idPaiFilho+"delTab"+ (dados.paiFilhoIndex-1)).show();
				}
				
				//remove a aba
				var panelId = $(dados.tabs).closest( "li" ).remove().attr("aria-controls");
				$( "#" + panelId ).remove();
				dados.aba.tabs("refresh");

				exibeAvisoNumeroFuncoes();
		}

		var preencherCamposObraDepartamento = function(dados)
		{
			$('#cpReqDepartamentoObra').val(dados.DEPARTAMENTO);
			$('#cpReqCodSecao').val(dados.CODSECAO);
			$('#cpReqTipoSecao').val(BLL.getInstance().getDescricaoTipoSecao(dados.CODTIPOSECAO));
			$('#cpReqEmpresaDescricao').val(dados.EMPRESA);
			$('#cpReqCodEmpresa').val(dados.CODCOLIGADA);
			$('#cpReqEstado').val(dados.ESTADO);
			$('#cpReqObraParceira').val(dados.CODPARCEIRO != '' ? 'Sim' : 'Não');
			$('#cpReqNomeParceiro').val(dados.NOMEPARCEIRO == '' ? 'Não há parceiro' : dados.NOMEPARCEIRO);
			$('#cpReqConstrutor').val(BLL.getInstance().getDescricaoConstrutor(dados.CONSTRUTOR));
			$('#cpReqGestorNome').val(dados.NOME_GESTOR);
			$('#cpReqGerenteGeralNome').val(dados.NOME_GG == '' ? 'Não há aprovador' : dados.NOME_GG);
			$('#cpMatriculaGestorObraDep').val(dados.GESTOR);
			$('#cpMatriculaGGObraDep').val(dados.CHAPA_GG);
			$('#cpMatriculaSuperObraDep').val(dados.SUP);
			$('#cpMatriculaDiretorObraDep').val(dados.DIRETOR);
			$('#cpMatriculaConsultoraObraDep').val(dados.CHAPA_CONSULTORA);
			$('#cpCodObra').val(dados.COD_OBRA);
		}

		var setRecolhedorCentralObra = function(dados)
		{
			var secoes = _model.get1093(dados.CODSECAO, dados.CODCOLIGADA);
				
			$('#btReqResponsavelRecolhimento').prop('disabled',(secoes.length > 0));

			if (secoes.length > 0)
			{
				$('#cpReqNomeResponsRecolhimento').val(secoes[0].NOME);
				$('#cpReqChapaResponsRecolhimento').val('Pool:Role:' +secoes[0].PAPEL);
			}
		}

		return {
			inicializar,
			carregarInterfaceEmModificacao,
			carregarInterfaceEmVisualizacao,
			setStatusElementos,
			addEventbtVagaFuncao,
			addEventbtVagaSalario,
			addEventbtVagaHorario,
			addEventbtNomePostoTrabalho,
			addEventbtVagaColaboradorSubstituto,
			addEventcpVagaQuantidade,
			addEventcpMotivoAdmissao,
			addEventcpVagaIndicacao,
			exibeAvisoNumeroFuncoes,
			exibeAvisoNumeroVagas,
			addEventcpAprovacaoRHAltSalario,
			adicionarFuncao,
			testPreencheCampos,
			removePaiFilhoFuncao,
			preencherCamposObraDepartamento, 
			setRecolhedorCentralObra,
			formatarCamposDecimais
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
})();