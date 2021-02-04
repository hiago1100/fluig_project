$(document).ready(function() 
{
    const currentState = Compartilhados.getCurrentState();

	VIEW.getInstance().Inicializar(currentState,getModo());

    /*
    INPUTS ACTIONS
    */

	$('#tabPeriodos a').click(function(e) {
	    e.preventDefault();
	    $(this).tab('show');
	});
		
	$("input[name='cpProprioOutroColaborador']").change(function()
	{
	    window.loadingLayer.show();

	    setTimeout(function ()
	    {
	        this.value == 1 ? VIEW.getInstance().preencherFormulario('Proprio', currentState) : VIEW.getInstance().preencherFormulario('Outro', currentState);
	        window.loadingLayer.hide();

	    }, 100);
    });
	
	$("#cpHaveraSubstituto").change(function() 
	{
	    $('#divSubstituto').toggle(this.value == '1');
	});
	
	$("#cpAntecipar13Salario").change(function() 
	{
		$("#divImprimirTermo").toggle(this.value == '1');
	});

	$("#cpHaveraAbono").change(function ()
	{
	    VIEW.getInstance().abonoSalarial();
	});
	
	$("#btAddDataferias").click(function ()
	{
	    VIEW.getInstance().adicionarPeriodoFerias();
	});
	
	$('#btImprimirAdiantamento13').click(function() 
	{
		var empresa = $("#cpEmpresa").val();
		var centroCusto = $("#cpColaboradorCentroCusto").val();
		var colaborador = $("#cpColaboradorNome").val();
		var matricula = $("#cpColaboradorMatricula").val();

		var inicoFerias = $("#cpDataInicioFerias___1").val();
		var fimFerias = $("#cpDataFimFerias___1").val();
		
		if ((empresa && centroCusto && colaborador && matricula && $("#cpColaboradorFuncao").val() && inicoFerias && fimFerias) == "")
		{
			$("#cp13SalarioImpresso").val('Impresso');
			Compartilhadoos.WarningToast(Mensagens.M0002, 'Imprimir', 'error')
		} 
		else 
		{
			$("#cp13SalarioImpresso").val('Impresso');
			Compartilhados.PrintFormOpen(VIEW.getInstance().getDados13Antecipado(),'Termo.html')
		}
	});

	$('#btColaborador').click(function ()
	{
	    ZOOM.getInstance().GetSecoesAssociadasUsuario(Compartilhados.getLogin());
	});

	$('#btColaboradorSubstituto').click(function ()
	{
	    FLUIGC.sessionStorage.setItem('selecionandoSubstituto', true);
	    ZOOM.getInstance().GetTodosCentroCusto();
	});

    /*
    TRIGGUER ZOOM
    */
	$(document).on('ZoomSecaoSelecionada', function (ev, retorno)
	{
	    window.loadingLayer.show();

	    setTimeout(function ()
	    {
	        ZOOM.getInstance().GetColaboradoresSecao(retorno.CODCOLIGADA, retorno.CODSECAO)
	        window.loadingLayer.hide();

	    }, 100);
	});

	$(document).on('ZoomColaboradorSelecionado', function (ev, colaborador)
	{
	    window.loadingLayer.show();

	    setTimeout(function ()
	    {
	        var dados = Model.get_DS1000('SP_FLUIG_1005', "'"+colaborador.CHAPA+"', "+ colaborador.CODCOLIGADA);

	        if (dados.values.length == 0)
	        {
	            Compartilhados.WarningToast('', Mensagens.M0012, 'error');
	            window.loadingLayer.hide();
	            return;
	        }

	        if (FLUIGC.sessionStorage.getItem('selecionandoSubstituto'))
	        {
	            Compartilhados.LimparCampos(['limparDadosColaboradorSubstituto']);

	            $('#cpCentroCustoSubstituto').val(dados.values[0].SECAO);
	            $('#cpColaboradorSubstituto').val(dados.values[0].NOME);
	            $('#cpMatriculaSubstituto').val(dados.values[0].CHAPA);

	            FLUIGC.sessionStorage.setItem('selecionandoSubstituto', false);
	        }
	        else
	        {
	            Compartilhados.LimparCampos(['limparDadosColaborador']);
	           
	            VIEW.getInstance().preencherCamposColaborador(dados.values[0]);

                // recria os campos para recarregar as novas regras do colaborador selecionado.
	            VIEW.getInstance().criarCampoDataFeriasInicio('cpDataInicioFerias', 1);
	            VIEW.getInstance().criarCampoDataFeriasFim('cpDataInicioFerias', 'cpDataFimFerias', 1);
	        }

	        window.loadingLayer.hide();

	    }, 1000);
	});

});	

// função relativa ao pai e filho do periodo de ferias
// ficou fora do escopo pois a funcionalidade do paixfilho fluig não permitiu
var ExcluirDataFerias = function(oElement)
{
    FLUIGC.message.confirm({
        message: Mensagens.M0025,
        title: 'Aviso!!!',
        labelYes: 'Sim',
        labelNo: 'Cancelar'
    }, function (result, el, ev) {

        if (result)
        {
            fnWdkRemoveChild(oElement);

            var quantidadePeriodoFerias = VIEW.getInstance().retornaQuantidadePeriodoFerias();

            VIEW.getInstance().desativarAdicionarFerias(false);
            $('#cpNumeroPeriodosFerias').val(quantidadePeriodoFerias);

            VIEW.getInstance().apagarMensagemTerca();
            VIEW.getInstance().toggleAvisosFeriasPeriodos(quantidadePeriodoFerias);
            $('#divTotalDiasFerias').toggle(quantidadePeriodoFerias >= 1);

            VIEW.getInstance().desativarCalendarioFerias(quantidadePeriodoFerias, false);

            if (quantidadePeriodoFerias >= 1)
            {
                let totalDias = VIEW.getInstance().retornaTotalDiasFerias();
                VIEW.getInstance().setTotalDiasFerias(totalDias);
                VIEW.getInstance().limiteFeriasExcedido(totalDias, 0);
            }
            else
            {
                VIEW.getInstance().setTotalDiasFerias('0');
            }

            VIEW.getInstance().ordenacaoPeriodoFerias();
        }
    });
   
}

/*
 * classe com as modificações da view
 * */
var VIEW = (function()
{
	var instance;

	function init()
	{
	    var preencherFormulario = function (tipo, currentState)
	    {
		    Compartilhados.enabledButtonZoom(['#btColaboradorSubstituto'], ['0', '1', '2'])

			if(tipo == 'Proprio')
			{
			    VIEW.getInstance().preencherCamposColaborador(FLUIGC.sessionStorage.getItem('userInformation').values[0]);
			}
			else
			{
			    Compartilhados.enabledButtonZoom(['#btColaborador'], ['0', '1', '2'])
				ZOOM.getInstance().GetSecoesAssociadasUsuario(Compartilhados.getLogin());
			}
	    }

		var carregarInterfaceEmModificacao = function (currentState)
		{
		    if (currentState == 0 || currentState == 1) // Atividades iniciais
		    {
		        //Sempre inicia o formulario com os dados do colaborador logado.
		        preencherFormulario('Proprio', currentState);

		        var quantidade = VIEW.getInstance().retornaQuantidadePeriodoFerias();

		        if (quantidade == 0)
		        {
		            VIEW.getInstance().adicionarPeriodoFerias();
		            quantidade++;
		        }

		        VIEW.getInstance().avisoFeriasProcessada(quantidade);
		    }
		    else
		    {
		        var dadosColaborador = Model.get_DS1000('SP_FLUIG_1005', "'" + $('#cpColaboradorMatricula').val() + "', " + $('#cpCodColigadaColaborador').val()).values[0];
		        VIEW.getInstance().preencherCamposColaborador(dadosColaborador);
		    }

		    //inicializa os campos de data
		    Compartilhados.InitilizeDatePicker
            ([
                ['cpDataPagamento', [20]]
            ]);
		}

		var carregarInterfaceEmVisualizacao = function ()
		{
		    var chapaColaborador = $('#cpColaboradorMatricula').val();
		    var coligadaColaborador = $('#cpCodColigadaColaborador').val();
		    var funcaoColaborador = $('#cpColaboradorFuncao').val();

		    var periodoAquisitivo = BLL.getInstance().getPeriodoAquisitivo(chapaColaborador,
               coligadaColaborador,
               funcaoColaborador);

		    VIEW.getInstance().carregaTabelasPeriodo(chapaColaborador, coligadaColaborador);

		    var isFeriasMarcadas = BLL.getInstance().isFeriasMarcadas(periodoAquisitivo);

		    var periodoAquisitivo = BLL.getInstance().getPeriodoAquisitivo(chapaColaborador,
                  coligadaColaborador,
                  funcaoColaborador);

		    //esconde/mostra opcoes iniciais
		    VIEW.getInstance().setStatusElementos(isFeriasMarcadas, periodoAquisitivo);

		    // verificação de chamados ja abertos pro colaborador no csc
		    VIEW.getInstance().verificaChamadosFeriasAberto($('#cpNumeroSolicitacao').val());

		    if (isFeriasMarcadas)
		    {
		        VIEW.getInstance().preencheDadosFeriasMarcadas(periodoAquisitivo.periodoAtivo, periodoAquisitivo.feriasMarcadas, periodoAquisitivo.detalhesPeriodoAtivo);
		    }
		    else
		    {
		        carregaPeriodoDisponivel(periodoAquisitivo.detalhesPeriodoAtivo);
		    }

		    VIEW.getInstance().ordenacaoPeriodoFerias();
		    VIEW.getInstance().desativarAdicionarFerias(true);
		}

		var Inicializar = function (currentState, modoExibicao)
		{
		    if (modoExibicao == 'MOD' || modoExibicao == 'ADD')
		    {
		        VIEW.getInstance().carregarInterfaceEmModificacao(currentState);
		    }
		    else
		    {
		        VIEW.getInstance().carregarInterfaceEmVisualizacao();
		    }
		}
	
		var carregaPeriodoDisponivel = function(detalhesPeriodoAtivo) 
		{
			var faltas = detalhesPeriodoAtivo.FALTAS.toString().indexOf('.') > -1 ? detalhesPeriodoAtivo.FALTAS.split('.')[0] : detalhesPeriodoAtivo.FALTAS
			$("#cpSituacaoFerias").val('Não possuí férias marcadas');
			$("#cpNumeroFaltas").val(faltas);
			$("#cpDiasDireito").val(parseInt(detalhesPeriodoAtivo.DIASAMARCAR));
			$("#cpInicioPeriodoAquisitivo").val(Compartilhados.ConvertDate(detalhesPeriodoAtivo.INICIOPERAQUIS));
			$("#cpFimPeriodoAquisitivo").val(Compartilhados.ConvertDate(detalhesPeriodoAtivo.FIMPERAQUIS));
		};
		
		var preencheDadosFeriasMarcadas = function(periodo, ferias, detalhes) 
		{
			$("#cpNumeroFaltas").val(detalhes.FALTAS);
			$("#cpSituacaoFerias").val('Possuí férias marcadas');
			$("#cpInicioPeriodoAquisitivo").val(Compartilhados.ConvertDate(periodo.INICIOPERAQUIS));
			$("#cpFimPeriodoAquisitivo").val(Compartilhados.ConvertDate(periodo.FIMPERAQUIS));
			$("#dataInicioFeriasMarcadas").html(Compartilhados.ConvertDate(ferias[0].DATAINICIO));
			$("#dataFimFeriasMarcadas").html(Compartilhados.ConvertDate(ferias[0].DATAFIM));
			$("#dtPagFeriasMarcadas").html(Compartilhados.ConvertDate(ferias[0].DATAPAGTO));
			$("#diasFeriasMarcadas").html(ferias[0].NRODIASFERIAS);
			$("#diasAbonoFeriasMarcadas").html(ferias[0].NRODIASABONO || 0);
		}

		var reiniciaPeriodoSelecinado = function (index) {

		    VIEW.getInstance().setDataFimFerias(index, '');
		    VIEW.getInstance().setQuantidadeDiasFeriasPeriodo(index, '');
		    VIEW.getInstance().setTotalDiasFerias(VIEW.getInstance().retornaTotalDiasFerias());
		}

		var dataFimFeriasRegras = function(data, index) 
		{
		    var diasDisponiveis2e3Periodo = [5, 7, 8, 10, 15];
		    var dataInicioFerias = $("#cpDataInicioFerias___" + index).val();
		    var dataInicioFeriasConvertida = new Date(Compartilhados.ConvertDatePTtoUS(dataInicioFerias));
		    var dataFimFeriasConvertida = new Date(Compartilhados.ConvertDatePTtoUS(data));
		    var fimPeriodoAquisitivo = new Date(Compartilhados.ConvertDatePTtoUS($('#cpFimPeriodoAquisitivo').val()));
		    var proximoFimPeriodoAquisitivo = fimPeriodoAquisitivo.setMonth(fimPeriodoAquisitivo.getMonth() + 1);
		    var quantidadePeriodoFerias = VIEW.getInstance().retornaQuantidadePeriodoFerias();
		    var diasferias = BLL.getInstance().getDiasFerias(dataInicioFeriasConvertida, dataFimFeriasConvertida)
		    var diasFaltas = parseInt($('#cpNumeroFaltas').val());
		    var isHaveraAbono = $('#cpHaveraAbono').val() == '1'

			VIEW.getInstance().setQuantidadeDiasFeriasPeriodo(index, diasferias);
			var totalDias = VIEW.getInstance().retornaTotalDiasFerias();

			VIEW.getInstance().setTotalDiasFerias(totalDias);

			if (!BLL.getInstance().isMarcacaoDataValida(dataInicioFeriasConvertida, dataFimFeriasConvertida))
			{
			    Compartilhados.WarningToast('', Mensagens.M0024, 'error')
			    VIEW.getInstance().reiniciaPeriodoSelecinado(index);
			    return;
			}

		    // verificar as regras se o 13 salario pode ser antecipado
			$("#opcaoSim13Salario").prop('disabled', !BLL.getInstance().podeAntecipacao13Salario(dataInicioFeriasConvertida));
		
			if (VIEW.getInstance().regrasFeriasComFaltas(diasFaltas, index))
			{
			    return;
			}

			if (!BLL.getInstance().isPrimeiroPeriodoValido(quantidadePeriodoFerias, diasferias, index))
			{
			    Compartilhados.WarningToast('', Mensagens.M0008.replace('{0}', diasferias), 'error')
			    VIEW.getInstance().reiniciaPeriodoSelecinado(index);
			    return;
			}
			else
			{
			    if (isHaveraAbono)
                {
			        if (!BLL.getInstance().isDiasFeriasComAbonoValido(isHaveraAbono, diasferias))
			        {
			            Compartilhados.WarningToast('', Mensagens.M0013, 'error')
			            VIEW.getInstance().reiniciaPeriodoSelecinado(index);
			            return;
			        }
			    }
			}

			if (!BLL.getInstance().isPeriodosDisponiveisMarcacaoFerias(diasferias, totalDias))
			{
			    Compartilhados.WarningToast('', Mensagens.M0007.replace('{0}', diasferias), 'error')
			    VIEW.getInstance().reiniciaPeriodoSelecinado(index);
			    return;
			}

            //obriga o segundo periodo ser de 10 dias, caso o primeiro seja de 20 dias
			if (VIEW.getInstance().is1PeriodoXDias(20))
			{
			    if (index > 1)
                {
			        if ($('#cpQuantidadesDiasFeriasPeriodo___' + index).val() != '10')
			        {
			            Compartilhados.WarningToast('', Mensagens.M0010, 'error')
			            VIEW.getInstance().reiniciaPeriodoSelecinado(index);
			            return;
			        }
			    }
			}

            // se o primeiro periodo for 15 dias o segundo deve ser obrigatorio 15,10,8,7,5, exceto com faltas que tem que ser 15 e 9
			if (quantidadePeriodoFerias == 2)
			{
			    if(VIEW.getInstance().is1PeriodoXDias(15))
			    {
			        var quantidadeDias = $('#cpQuantidadesDiasFeriasPeriodo___' + index).val();

			        if (diasFaltas >= 6 && diasFaltas <= 14) {

			            if (parseInt(quantidadeDias) != 9)
			            {
			                Compartilhados.WarningToast('', Mensagens.M0028, 'error')
			                VIEW.getInstance().reiniciaPeriodoSelecinado(index);
			                return;
			            }
			        }

			        if (diasDisponiveis2e3Periodo.filter(x => x === parseInt(quantidadeDias)).length == 0)
			        {
			            Compartilhados.WarningToast('', Mensagens.M0014, 'error')
			            VIEW.getInstance().reiniciaPeriodoSelecinado(index);
			            return;
			        }
			    }
			}

			if (quantidadePeriodoFerias == 3)
			{
			    if (VIEW.getInstance().is1PeriodoXDias(15))
			    {
			        var quantidadeDias = $('#cpQuantidadesDiasFeriasPeriodo___' + index).val();

			        if (diasDisponiveis2e3Periodo.filter(x => x === parseInt(quantidadeDias)).length == 0)
			        {
			            Compartilhados.WarningToast('', Mensagens.M0014, 'error')
			            VIEW.getInstance().reiniciaPeriodoSelecinado(index);
			            return;
			        }

			        if (totalDias < $('#cpDiasDireito').val())
			        {
			            Compartilhados.WarningToast('', Mensagens.M0026, 'error')
			            VIEW.getInstance().reiniciaPeriodoSelecinado(index);
			            return;
			        }
			    }
			}

			VIEW.getInstance().isFeriasEmDobro(fimPeriodoAquisitivo, dataFimFeriasConvertida, proximoFimPeriodoAquisitivo, index);
			
			VIEW.getInstance().toggleAvisosFeriasPeriodos(quantidadePeriodoFerias);

			VIEW.getInstance().limiteFeriasExcedido(totalDias, index);

			VIEW.getInstance().desativarAdicionarFerias(VIEW.getInstance().is1PeriodoXDias(30) || VIEW.getInstance().retornaQuantidadePeriodoFerias() >= 3);
		}

		var dataInicioFeriasRegras = function(data, index) 
		{
		    Compartilhados.LimparCampos(['clearPosDataInicio']);

		    if (VIEW.getInstance().retornaQuantidadePeriodoFerias() == 1)
		    {
		        if ($('#cpHaveraAbono').val() == '')
		        {
		            var dataFimFerias = $("#cpDataInicioFerias___" + index).val('');
		            Compartilhados.WarningToast('', Mensagens.M0016, 'error')
		            return;
		        }
		    }
		
			var dataFimFerias = $("#cpDataFimFerias___"+index).val();
			var DataInicioConvertida = new Date(Compartilhados.ConvertDatePTtoUS(data));
			var diaDaSemana = Compartilhados.GetDiaSemana(DataInicioConvertida);
			$("#cpDiaSemana___" + index).val(diaDaSemana);

			// verificar as regras se o 13 salario pode ser antecipado
			$("#opcaoSim13Salario").prop('disabled', !BLL.getInstance().podeAntecipacao13Salario(DataInicioConvertida));
			
            // valida as regras da data final caso já tenha sido preenchida
			if (dataFimFerias != '')
			{
			    VIEW.getInstance().dataFimFeriasRegras(dataFimFerias, index);
			}

		    //exibe o alerta que o dia inical de ferias e numa terça feira
			VIEW.getInstance().apagarMensagemTerca();
			VIEW.getInstance().adicionarMensagemTerca(diaDaSemana);

			VIEW.getInstance().toggleAvisosFeriasPeriodos(VIEW.getInstance().retornaQuantidadePeriodoFerias());
			
		}
		
		var getDados13Antecipado = function() {

			var hoje = new Date();

			return {
				empresa: $("#cpColaboradorEmpresa").val(),
				centroCusto: $("#cpColaboradorCentroCusto").val(),
				colaborador: $("#cpColaboradorNome").val(),
				matricula: $("#cpColaboradorMatricula").val(),
				funcao: $("#cpColaboradorFuncao").val(),
				inicoFerias:$("#cpDataInicioFerias___1").val(),
				fimFerias: $("#cpDataFimFerias___1").val(),
				dia: hoje.getDate(),
				mes: Compartilhados.getMes(hoje.getMonth() + 1),
				ano: hoje.getFullYear(),
				inicioPeriodo: $("#cpInicioPeriodoAquisitivo").val(),
				fimPeriodo: $("#cpFimPeriodoAquisitivo").val(),
				gestorImediato : $("#cpGestorImediato").val(),
			};
		}
		
		var carregaTabelasPeriodo = function(chapa,coligada)
		{
			ZOOM.getInstance().CarregaTabelaPeriodoHistorico(chapa,coligada);
			ZOOM.getInstance().CarregaTabelaPeriodoSituacao(chapa,coligada);
			ZOOM.getInstance().CarregaTabelaPeriodoFaltas(chapa,coligada);
			ZOOM.getInstance().CarregaTabelaPeriodoAfastamentos(chapa,coligada);
		};
		
		var retornaQuantidadePeriodoFerias = function()
		{
			var quantidade = $('#tableDatasFerias tr').length - 2;
			$('#cpQuantidadeFerias').val(quantidade);
			return quantidade;
		}
		
		var ordenacaoPeriodoFerias = function()
		{
			//mantem os numeros do periodo na ordem correta
		    var x = 0;
			$('[id*="NumeroDatasFerias"]').each(function()
			{
				$(this).text(x++);
			})
		}
		
		var criarCampoDataFeriasFim = function(campoDatainicio,campoDataFim, index)
		{
		    $('#' + campoDataFim + '___' + index).datepicker("destroy");

			$('#' + campoDataFim + '___' + index).datepicker({
				showOn: "button",
				onSelect: function(data) 
				{
				    if ($('#' + campoDatainicio + '___' + index).val() == '')
					{
				        Compartilhados.WarningToast('', Mensagens.M0004, 'info');
				        $('#' + campoDataFim + '___' + index).val('');
				        return;
					}
					
					VIEW.getInstance().dataFimFeriasRegras(data,index);
				},
				minDate: BLL.getInstance().getDataMinimaFerias($("#cpColaboradorFuncao").val(), $('#cpFimPeriodoAquisitivo').val(), $('#cpColaboradorMatricula').val(), $('#cpCodColigadaColaborador').val())
			}).attr('readonly', 'readonly');
			
			$('#btDataFimFerias___' + index).click(function(ev)
			{
				$('#' + campoDataFim + '___' + index).datepicker('show');
			});
		}
		
		var criarCampoDataFeriasInicio = function(campoDataInicio,index)
		{
		    $('#' + campoDataInicio + '___' + index).datepicker("destroy");

			$('#' + campoDataInicio + '___' + index).datepicker({
				showOn: "button",
				beforeShowDay : function(data) 
				{
					return BLL.getInstance().validaDiasFerias($('#cpSituacao').val(),data);
				},
				onSelect: function(data) 
				{
					VIEW.getInstance().dataInicioFeriasRegras(data,index);
				},
				minDate: BLL.getInstance().getDataMinimaFerias($("#cpColaboradorFuncao").val(), $('#cpFimPeriodoAquisitivo').val(), $('#cpColaboradorMatricula').val(), $('#cpCodColigadaColaborador').val())
			}).attr('readonly', 'readonly');
			
			$('#btDataInicioFerias___' + index).click(function(ev)
			{
				$('#' + campoDataInicio + '___' + index).datepicker('show');
			});
		}
		
		var verificaPeriodoFeriasEmDobro = function()
		{
			for (i = 0; i < retornaQuantidadePeriodoFerias(); i++) 
			{ 
				if($('#cpFeriasEmDobro___'+i).val() == '1')
				{
					return true
				}
			}
			
			return false;
		}
		
		var retornaTotalDiasFerias = function()
		{
		    var total = 0;

		    $('[name^=cpQuantidadesDiasFeriasPeriodo___]').each(function (index)
		    {
		        if (this.value != '')
		        {
		            let x = parseFloat(this.value);
		            total = isNaN(x) ? total : total + x;
		        }
		    });

		    var diasAbono = isNaN(parseFloat($('#cpDiasAbono').val())) ? 0 : parseFloat($('#cpDiasAbono').val());

            //abono
		    total = total + diasAbono;

			return total;
		}

		var abonoSalarial = function ()
		{
		    if ($('#cpDiasFerias').val() >= 20)
		    {
		        Compartilhados.WarningToast('', Mensagens.M0023, 'error');
		        $('#cpHaveraAbono').val('0')
		        return;
		    }

		    var isHaveraAbono = $('#cpHaveraAbono').val() == '1'

		    isHaveraAbono ? $('#cpDiasAbono').val('10') :  $('#cpDiasAbono').val('0');

		    if (isHaveraAbono)
		    {
		        Compartilhados.WarningToast('', Mensagens.M0013, 'info');
		        VIEW.getInstance().desativarAdicionarFerias(true);
		        
		    }
		    else
		    {
		        VIEW.getInstance().desativarAdicionarFerias(false);
		    }

		    let totalDias = VIEW.getInstance().retornaTotalDiasFerias();

		    VIEW.getInstance().setTotalDiasFerias(totalDias);
		}

		var verificaChamadosFeriasAberto = function (chamado)
		{
		    var chapa = $("#cpColaboradorMatricula").val();
		    var nome = $("#cpColaboradorNome").val();

		    var isChamadosAbertos = BLL.getInstance().verificaChamadosFeriasAberto(chapa, nome, chamado);
		    if(isChamadosAbertos)
		    {
		        $("#divColaborador").addClass('alert alert-danger');
		        $("#divChamadosFeriasAbertos").show();
		        exibeNumeroChamadoFeriasAberto(chamados);
		    }
		}

		var exibeNumeroChamadoFeriasAberto = function (chamados)
		{
		    var urlBase = window.location.protocol + '//' + window.location.host + "/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=";
		    var listaChamados = $("#listaChamados");

		    var strToAppend = chamados.reduce(function (str, chamado) {
		        if (str != '') {
		            str += ', ';
		        }

		        return str + '<a target="_blank" href="' + urlBase + chamado + '">' + chamado + '</a>';
		    }, '');

		    listaChamados.append(strToAppend);
		};

		var setStatusElementos = function (isFeriasMarcadas, periodoAquisitivo)
		{
		    var currentState = Compartilhados.getCurrentState();
		    var dataInicioFerias = $('#cpDataInicioFerias___1').val();
		    var diaSemana = $("#cpDiaSemana").val();
		    var isTercaFeira = diaSemana == 'Terça-Feira';
		    var antecipar13Salario = $("#cpAntecipar13Salario").val();
		    var isAntecipa13Salario = antecipar13Salario == '1';
		    var feriasEmDobro = $("#cpFeriasEmDobro").val();
		    var isFeriasEmDobro = feriasEmDobro == '1';
		    var opcaoSubstituto = $("#cpHaveraSubstituto").val();
		    var isHaveraSubstituto = opcaoSubstituto == '1';
		    var isEstagiario = BLL.getInstance().isEstagiario($("#cpColaboradorFuncao").val());
		    var quantidadePeriodosFerias = VIEW.getInstance().retornaQuantidadePeriodoFerias();
		    
		    $('.avaliacao').toggle($("#cpAvaliacao").val() != '');
		    $('#divSubstituto').toggle(isHaveraSubstituto);
		    $("#divImprimirTermo").toggle(isAntecipa13Salario);
		    $("#divAlertaTercaFeira").toggle(isTercaFeira);
		    $("#blockPossuiFeriasMarcadas").toggle(isFeriasMarcadas);
		    $("#divRegrasFeriasEstagiario").toggle(isEstagiario);
		    $("#divFimContratoEstagiario").toggle(isEstagiario);
		    $("#divFimContratoEstagiario").toggle(isEstagiario);
		    $("#divRegrasFeriasColaborador").toggle(!isEstagiario);
		    $('#PeriodoVencido').toggle(VIEW.getInstance().verificaPeriodoFeriasEmDobro());
		    $('#divTotalDiasFerias').toggle(quantidadePeriodosFerias > 0);
		    $("#divAvisosFeriasPeriodos").toggle(false);
		    $("#divChamadosFeriasAbertos").toggle(false);

		    if (isEstagiario)
		    {
		        $("#cpHaveraAbono").prop('disabled', true);
		        $("#cpHaveraAbono").val(isEstagiario ? '0' : '');
		        $("#cpAntecipar13Salario").prop('disabled', true);
		        $("#cpAntecipar13Salario").val(isEstagiario ? '0' : '');
		    }
		   
		    VIEW.getInstance().desativarAdicionarFerias(isEstagiario);
		    VIEW.getInstance().avisoFeriasProcessada(quantidadePeriodosFerias);

		    if (currentState == 0 || currentState == 1 || currentState == 2) // atividades iniciais
		    {
		        $("#blockDadosDasFerias").toggle(!isFeriasMarcadas);

		        var secoesAssociadas = Model.get_DS0007(Compartilhados.getLogin());

		        if (secoesAssociadas == undefined)
		        {
		            Compartilhados.WarningToast('', Mensagens.M0019, 'error');
		            window.loadingLayer.hide();
		            return;
		        }

		        $('#spanOutroColaborador').toggle(secoesAssociadas.values.length > 0)
		    }
		    else
		    {
		        $('.fluigicon-trash')[1].remove();
		        VIEW.getInstance().ordenacaoPeriodoFerias();
		        VIEW.getInstance().desativarAdicionarFerias(true);
		    }
		   
		}

		var avisoFeriasProcessada = function (quantidadePeriodosFerias)
		{
		    for (i = 1; i <= quantidadePeriodosFerias; i++)
		    {
		        if ($('#cpFeriasIntegradaRM___' + i).val() == '1')
		        {
		            $('#cpFeriasEmDobro___' + i).closest('td').css("background-color", "#DFF0D8");
		            $('#cpFeriasIntegradaRM___'+ i).next().toggle(true);
		        }
		        else
		        {
		            $('#cpFeriasIntegradaRM___'+i).next().toggle(false);
		            $('#cpFeriasEmDobro___' + i).closest('td').css("background-color", "");
		        }
		    }
		}

		var adicionarAvisosFeriasPeriodos = function(aviso,id)
		{
		    if ($('#divAvisosFeriasPeriodos ul li').length == 0)
		    {
		        $("<div class='row rowEmpty'>&nbsp;<div>").insertBefore("#divAvisosFeriasPeriodos");
		        $("#divAvisosFeriasPeriodos").show();
		    }
		    
		    if($("ul").find('#'+id+'.lis').length == 0)
		    {
		        $("#divAvisosFeriasPeriodos ul").append('<li class="lis" id=' + id + '>' + aviso + '</li>');
		    }
		}

		var adicionarMensagemTerca = function (diaDaSemana)
		{
		    var temPeriodoTerca = false;

		    if (diaDaSemana === 'Segunda-Feira')
		    {
		        $('[name^=cpDiaSemana___]').each(function (index)
		        {
		            if (this.value === 'Terça-Feira') {
		                temPeriodoTerca = true;
		                return;
		            }
		        });

		        return;
		    }

		    if (!temPeriodoTerca)
		    {
		        $("#divAvisosFeriasPeriodos").toggle(true);
		        VIEW.getInstance().adicionarAvisosFeriasPeriodos(Mensagens.M0006, 'Terca');
		        Compartilhados.WarningToast('', Mensagens.M0006, 'warning');
		    }
		}

		var apagarMensagemTerca = function ()
		{
		    var temPeriodoTerca = false;

		    $('[name^=cpDiaSemana___]').each(function (index)
		    {
		        if(this.value === 'Terça-Feira')
		        {
		            temPeriodoTerca = true;
		        }
		    });

		    if(!temPeriodoTerca)
		    {
		        $('#Terca').remove();
		    }
		}

		var apagarMensagemLimiteExcedido = function ()
		{
		    $('#LimiteExcedido').remove();
		}

		var toggleAvisosFeriasPeriodos = function (quantidade)
		{

		    if ($('#divAvisosFeriasPeriodos ul li').length == 0)
		    {
		        $("#divAvisosFeriasPeriodos").hide();
		        $('#divAvisosFeriasPeriodos ul li').remove();
		        $('.rowEmpty').remove();
		    }
		    else
		    {
		        $("#divAvisosFeriasPeriodos").show();
		    }
		}

		var adicionarPeriodoFerias = function()
		{
		    var quantidade = VIEW.getInstance().retornaQuantidadePeriodoFerias();
		 
		    if (quantidade == 1)
		    {
		        if ($('#cpHaveraAbono').val() == '')
		        {
		            Compartilhados.WarningToast('', Mensagens.M0016, 'error')
		            return;
		        }

		        if ($('#cpDataInicioFerias___1').val() == '' || $('#cpDataFimFerias___1').val() == '') {
		            Compartilhados.WarningToast('', Mensagens.M0011, 'error')
		            return;
		        }

		        VIEW.getInstance().desativarCalendarioFerias(1, true);
		    }
		    else if (quantidade == 2) 
		    {
		        if ($('#cpDataInicioFerias___2').val() == '' || $('#cpDataFimFerias___2').val() == '')
		        {
		            Compartilhados.WarningToast('', Mensagens.M0027, 'error')
		            return;
		        }
		    }

		    if (VIEW.getInstance().is1PeriodoXDias(30))
		    {
		        VIEW.getInstance().desativarAdicionarFerias(true);
		        return;
		    }

		    var index = wdkAddChild('DatasFerias');

		    var quantidade = VIEW.getInstance().retornaQuantidadePeriodoFerias();

		    $('#divTotalDiasFerias').toggle(true);

		    VIEW.getInstance().setQuantidadeDiasFeriasPeriodo(index, '0');
		    
		    $('#spanProcessado___' + index).toggle(false);

		    $('#cpNumeroPeriodosFerias').val(quantidade);
		    VIEW.getInstance().ordenacaoPeriodoFerias();

		    if (quantidade > 2)
		    {
		        if ($('#cpDataInicioFerias___2').val() == '' || $('#cpDataFimFerias___2').val() == '') {
		            Compartilhados.WarningToast('', Mensagens.M0027, 'error')
		            return;
		        }

		        VIEW.getInstance().desativarAdicionarFerias(true);
		        VIEW.getInstance().desativarCalendarioFerias(2, true);
		    }
		    else if (quantidade == 2)
		    {
		        VIEW.getInstance().desativarAdicionarFerias(VIEW.getInstance().is1PeriodoXDias(20));
		    }

		    VIEW.getInstance().criarCampoDataFeriasInicio('cpDataInicioFerias', index);
		    VIEW.getInstance().criarCampoDataFeriasFim('cpDataInicioFerias', 'cpDataFimFerias', index);

            //remove a lixeira do primeiro periodo
		    if (index == 1)
		    {
		        $('.fluigicon-trash')[1].remove();
		    }
		}

		var limiteFeriasExcedido = function (totalDias, index)
		{
		    var isLimiteExcedido = BLL.getInstance().limiteDiasFeriasExcedido($('#cpDiasDireito').val(), totalDias);

		    if (isLimiteExcedido)
		    {
		        VIEW.getInstance().adicionarAvisosFeriasPeriodos(Mensagens.M0005, 'LimiteExcedido');
		        Compartilhados.WarningToast('', Mensagens.M0005, 'warning');
		        VIEW.getInstance().setDataFimFerias(index, '');
		        VIEW.getInstance().setQuantidadeDiasFeriasPeriodo(index, '');
		        let totalDias = VIEW.getInstance().retornaTotalDiasFerias();
		        VIEW.getInstance().setTotalDiasFerias(totalDias);
		    }
		    else
		    {
		        VIEW.getInstance().apagarMensagemLimiteExcedido();
		    }
		}

		var isFeriasEmDobro = function (fimPeriodoAquisitivo, dataFimFeriasConvertida, proximoFimPeriodoAquisitivo, index)
		{
		    var isFeriasDobro = BLL.getInstance().isFeriasEmDobro(fimPeriodoAquisitivo, dataFimFeriasConvertida);

		    if (isFeriasDobro)
		    {
		        Compartilhados.WarningAlert(Mensagens.M0003.replace('{0}', proximoFimPeriodoAquisitivo), 'Aviso', 'OK');

		        $("#cpAtencao").text(Mensagens.M0003.replace('{0}', proximoFimPeriodoAquisitivo));
		        $("#PeriodoVencido").show();
		        $('#cpFeriasEmDobro___' + index).val('1');
		    }
		    else {
		        $("#cpAtencao").val("");
		        $("#PeriodoVencido").hide();
		        $('#cpFeriasEmDobro___' + index).val('');
		    }
		}

		var is1PeriodoXDias = function(dias)
		{
		    return  $('#cpQuantidadesDiasFeriasPeriodo___1').val() == dias;
		}

		var preencherCamposColaborador = function(dadosColaborador)
		{
		    if (dadosColaborador == null && dadosColaborador == undefined && dadosColaborador.values.length == 0)
		    {
		        Compartilhados.WarningToast('', Mensagens.M0012, 'error');
		        window.loadingLayer.hide();
		        return;
		    }
		    
		    $('#cpColaboradorNome').val(dadosColaborador.NOME);
		    $('#cpColaboradorCPF').val(dadosColaborador.CPF);
		    $('#cpColaboradorFuncao').val(dadosColaborador.FUNCAO);
		    $('#cpColaboradorMatricula').val(dadosColaborador.CHAPA);
		    $('#cpCTPS').val(dadosColaborador.CARTEIRATRAB);
		    $('#cpColaboradorCTPSSerie').val(dadosColaborador.SERIECARTTRAB);
		    $('#cpColaboradorCTPSEstado').val(dadosColaborador.UFCARTTRAB);
		    $('#cpCTPSData').val(dadosColaborador.DTCARTTRAB);
		    $('#cpDataAdmissao').val(dadosColaborador.ADMISSAO);
		    $('#cpDtNascimento').val(Compartilhados.ConvertDate(dadosColaborador.DTNASCIMENTO));
		    $('#cpIdade').val(Compartilhados.getAge(dadosColaborador.DTNASCIMENTO));
		    $('#cpSituacao').val(dadosColaborador.SITUACAO);
		    $('#cpColaboradorCentroCusto').val(dadosColaborador.SECAO);
		    $('#cpGestorImediato').val(dadosColaborador.NOME_GESTOR);
		    $('#cpChapaGestorImediato').val(BLL.getInstance().retornaChapaGestorImediato(dadosColaborador));
		    $('#cpCodSecaoSolicitante').val(dadosColaborador.CODSECAO);
		    $('#cpCodColigadaSolicitante').val(FLUIGC.sessionStorage.getItem('userInformation').values[0].CODCOLIGADA);
		    $('#cpCodColigadaColaborador').val(dadosColaborador.CODCOLIGADA);
		    $('#cpColaboradorEmpresa').val(dadosColaborador.EMPRESA);
		    $('#cpCodSindicatoColaborador').val(dadosColaborador.CODSINDICATO);
		    $('#cpColaboradorSalario').val(Compartilhados.cryptText(dadosColaborador.SALARIO == undefined ? 0 : dadosColaborador.SALARIO.toString()));
		    $('#cpCidadeColigada').val(dadosColaborador.CIDADECOLIGADA);
		    $('#cpFimContrato').val(Compartilhados.ConvertDate(dadosColaborador.FIMPRAZOCONTR));

		    VIEW.getInstance().preencherInfomacaoGestores(Compartilhados.getCurrentState());
		    
		    VIEW.getInstance().carregaTabelasPeriodo(dadosColaborador.CHAPA, dadosColaborador.CODCOLIGADA);

		    var periodoAquisitivo = BLL.getInstance().getPeriodoAquisitivo(dadosColaborador.CHAPA,
                 dadosColaborador.CODCOLIGADA,
                 dadosColaborador.FUNCAO);

		    var isFeriasMarcadas = BLL.getInstance().isFeriasMarcadas(periodoAquisitivo);

		    //esconde/mostra opcoes iniciais
		    VIEW.getInstance().setStatusElementos(isFeriasMarcadas, periodoAquisitivo);

		    // verificação de chamados ja abertos pro colaborador no csc
		    VIEW.getInstance().verificaChamadosFeriasAberto();

		    if (isFeriasMarcadas)
		    {
		        VIEW.getInstance().preencheDadosFeriasMarcadas(periodoAquisitivo.periodoAtivo, periodoAquisitivo.feriasMarcadas, periodoAquisitivo.detalhesPeriodoAtivo);
		    }
		    else
		    {
		        carregaPeriodoDisponivel(periodoAquisitivo.detalhesPeriodoAtivo);
		    }

		    VIEW.getInstance().ordenacaoPeriodoFerias();
		}

		var desativarAdicionarFerias = function(desativar)
		{
		    $("#btAddDataferias").prop('disabled', desativar);
		}

		var setTotalDiasFerias = function (totalDias)
		{
		    $('#cpDiasFerias').val(totalDias);
		}

		var setQuantidadeDiasFeriasPeriodo = function (index, valor)
		{
		    $('#cpQuantidadesDiasFeriasPeriodo___' + index).val(valor);
		}

		var setDataFimFerias = function (index, valor) {
		    $("#cpDataFimFerias___" + index).val('');
		}

		var preencherInfomacaoGestores = function (currentState) {
		    if (currentState == 0) {
		        $('#cpMatriculaGestorSolicitante').val(FLUIGC.sessionStorage.getItem('userInformation').values[0].CHAPA_GESTOR);
		        $('#cpMatriculaGGSolicitante').val(FLUIGC.sessionStorage.getItem('userInformation').values[0].CHAPA_GG);
		        $('#cpMatriculaSuperSolicitante').val(FLUIGC.sessionStorage.getItem('userInformation').values[0].CHAPA_SUP);
		        $('#cpMatriculaDiretorSolicitante').val(FLUIGC.sessionStorage.getItem('userInformation').values[0].CHAPA_DIRETOR);
		    }
		}

		var desativarCalendarioFerias = function (index, status)
		{
		    $('#btDataInicioFerias___' + index).prop('disabled', status);
		    $('#btDataFimFerias___' + index).prop('disabled', status);
		}

		var regrasFeriasComFaltas = function (diasFaltas, index)
		{ 
	        //exceção para marcação com faltas acima de 6 
		    if (diasFaltas >= 15)
		    {
		        VIEW.getInstance().limiteFeriasExcedido(totalDias, index);
		        VIEW.getInstance().desativarAdicionarFerias(true);
		        return true;
		    }
		    else if (diasFaltas >= 6 && diasFaltas <= 14)
		    {
		        if (index == 1) // 1 periodo
		        {
		            var quantidadeDias = $('#cpQuantidadesDiasFeriasPeriodo___' + index).val();

		            if (parseInt(quantidadeDias) != 24 && parseInt(quantidadeDias) != 15)
		            {
		                Compartilhados.WarningToast('', Mensagens.M0028, 'error')
		                VIEW.getInstance().reiniciaPeriodoSelecinado(index);
		                return true;
		            }

		            return true;
		        }
		        else // outros periodos
		        {
		            VIEW.getInstance().desativarAdicionarFerias(true);
		            return true;
		        }
		    }

		    return false;

		}

		return {
			Inicializar: Inicializar,
			carregaPeriodoDisponivel: carregaPeriodoDisponivel,
			dataInicioFeriasRegras: dataInicioFeriasRegras,
			dataFimFeriasRegras: dataFimFeriasRegras,
			preencheDadosFeriasMarcadas: preencheDadosFeriasMarcadas,
			getDados13Antecipado: getDados13Antecipado,
			carregaTabelasPeriodo: carregaTabelasPeriodo,
			preencherFormulario: preencherFormulario,
			retornaQuantidadePeriodoFerias: retornaQuantidadePeriodoFerias,
			ordenacaoPeriodoFerias: ordenacaoPeriodoFerias,
			criarCampoDataFeriasInicio: criarCampoDataFeriasInicio,
			criarCampoDataFeriasFim: criarCampoDataFeriasFim,
			verificaPeriodoFeriasEmDobro: verificaPeriodoFeriasEmDobro,
			retornaTotalDiasFerias: retornaTotalDiasFerias,
			abonoSalarial: abonoSalarial,
			verificaChamadosFeriasAberto: verificaChamadosFeriasAberto,
			setStatusElementos: setStatusElementos,
			adicionarAvisosFeriasPeriodos: adicionarAvisosFeriasPeriodos,
			adicionarMensagemTerca: adicionarMensagemTerca,
			apagarMensagemTerca: apagarMensagemTerca,
			apagarMensagemLimiteExcedido: apagarMensagemLimiteExcedido,
			toggleAvisosFeriasPeriodos: toggleAvisosFeriasPeriodos,
			adicionarPeriodoFerias: adicionarPeriodoFerias,
			limiteFeriasExcedido: limiteFeriasExcedido,
			isFeriasEmDobro: isFeriasEmDobro,
			is1PeriodoXDias: is1PeriodoXDias,
			preencherCamposColaborador: preencherCamposColaborador,
			avisoFeriasProcessada: avisoFeriasProcessada,
			carregarInterfaceEmModificacao: carregarInterfaceEmModificacao,
			carregarInterfaceEmVisualizacao: carregarInterfaceEmVisualizacao,
			desativarAdicionarFerias: desativarAdicionarFerias,
			setTotalDiasFerias: setTotalDiasFerias,
			setQuantidadeDiasFeriasPeriodo: setQuantidadeDiasFeriasPeriodo,
			setDataFimFerias: setDataFimFerias,
			reiniciaPeriodoSelecinado: reiniciaPeriodoSelecinado,
			preencherInfomacaoGestores: preencherInfomacaoGestores,
			desativarCalendarioFerias: desativarCalendarioFerias,
		    regrasFeriasComFaltas : regrasFeriasComFaltas
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


