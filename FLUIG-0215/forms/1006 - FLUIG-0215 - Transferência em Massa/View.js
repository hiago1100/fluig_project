$(document).ready(function() 
{
	const currentState = Compartilhados.getCurrentState();
	console.log(currentState);

	VIEW.getInstance().inicializar(currentState, Compartilhados.isEditMode());
	
	/**
	 * TRIGGERS EVENTS
	 */
	$(document).on('ZoomDpOrigemSelecionado', function (ev, retorno) {
		window.loadingLayer.show();
		setTimeout(function () {
			VIEW.getInstance().fillDepartamento('origem',retorno);
			BLL.getInstance().isTransferenciaValida() ?  '' : Compartilhados.WarningToast('', Mensagens.M0005, 'error');

			window.loadingLayer.hide();
		}, 100);
	});

	$(document).on('ZoomDpDestinoSelecionado', function (ev, retorno) 
	{
		window.loadingLayer.show();

		setTimeout(function () 
		{
			if(retorno.CODSECAO == sessionStorage.getItem("codSecaoOrigem"))
			{
				Compartilhados.WarningToast('', Mensagens.M0006, 'error')
				window.loadingLayer.hide();
				return;
			}

			VIEW.getInstance().fillDepartamento('destino', retorno);
			VIEW.getInstance().cleanRecolhedorASO();
			BLL.getInstance().isTransferenciaValida() ? '' : Compartilhados.WarningToast('', Mensagens.M0005, 'error');

			window.loadingLayer.hide();
		}, 100);
	});

	$(document).on('ZoomColaboradorSelecionado', function (ev, retorno) 
	{
		var index = sessionStorage.getItem("index");

		for (let i = 0; i < index; i++) 
		{
			if($("input[name^='cpMatriculaColaborador___"+i+"']").val() == retorno.CHAPA)
			{
				Compartilhados.WarningToast('', Mensagens.M0007,'error');
				return;
			}
		}

		var colaborador = Model.get_DS1000('SP_FLUIG_1005',"'"+retorno.CHAPA+"',"+"'"+retorno.CODCOLIGADA+"'").values[0];		
		
		VIEW.getInstance().fillColaborador(index,colaborador);
		VIEW.getInstance().trowMensagens(retorno);

		BLL.getInstance().isPCD(retorno) ? $(`#cpPcdColaborador___${index}`).val('SIM') : $(`#cpPcdColaborador___${index}`).val('NÃO');
	});

	$(document).on('ZoomRecolhedorASOSelecionado', function (ev, retorno) {
		VIEW.getInstance().fillRecolhedorAso(retorno);
	});

	/**
	 * CLICK EVENTS
	 */
	$('#btnObraDpOrigem').click(function(){
		window.loadingLayer.show();
		setTimeout(function (){
			VIEW.getInstance().removeAllChildrens(['#tableColaboradores','#tableRecolhimentoASO','#tableFuncionariosInaptos','#tableProscFolha','#tableProscManual'])
			ZOOM.getInstance().getDepartamentoOrigem(Compartilhados.getLogin());
			window.loadingLayer.hide();
		}, 100);
	});

	$('#btnObraDpDestino').click(function()
	{
		window.loadingLayer.show();

		setTimeout(function ()
		{
			ZOOM.getInstance().getDepartamentoDestino();
			window.loadingLayer.hide();
		}, 100);
	});

	$('#btnRespRecolhimentoASO').click(function(){
		try
		{
			window.loadingLayer.show();
			setTimeout(function (){
				ZOOM.getInstance().getRecolhedorASO(sessionStorage.getItem("codColigadaDestino"),sessionStorage.getItem("codSecaoDestino"));
				window.loadingLayer.hide();
			}, 100);
		}
		catch (error)
		{
			window.loadingLayer.hide();
		}
	});

	$('#btnAddColaborador').click(function() {
		VIEW.getInstance().addColaborador();
	});
	 /**
	  * CHANGE EVENTS
	  */
	$('#cpAprovacaoConfSolicitante').change(function(){
		this.value == '1' ? $('#divSatisfacao').show(400) : $('#divSatisfacao').hide(400);
	});
});

var excluiColaborador = function(oElement)
{
    FLUIGC.message.confirm({
        message: 'Deseja realmente excluir o colaborador ?',
        title: 'Atenção',
        labelYes: 'Sim',
        labelNo: 'Cancelar'
    }, function (result, el, ev) {

        if (result)
        {	
        	//Nome de apenas um dos campos do Filho
        	let fields = ['#cpNomeColaboradorASO___','#cpNomeColaboradorFolha___','#cpNomeColaboradorInapto___','#cpNomeColaboradorManual___']; 
			let index = VIEW.getInstance().listaIndice(oElement);
			fnWdkRemoveChild(oElement);
			VIEW.getInstance().removeTableChildrens(fields,index);
        }
    });
   
}

var VIEW = (function()
{
	var instance;

	function init()
	{	
		var inicializar = function (currentState, isEditMode) 
		{
			if (isEditMode) 
			{
				VIEW.getInstance().carregarInterfaceEmModificacao(currentState);
			} else 
			{
				VIEW.getInstance().carregarInterfaceEmVisualizacao(currentState);
			}
		};

		function carregarInterfaceEmModificacao(currentState)
		{
			sessionStorage.setItem("codColigada","");
			sessionStorage.setItem("codSecao","");
			sessionStorage.setItem("codColigadaDestino","");
			sessionStorage.setItem("codSecaoDestino","");

			VIEW.getInstance().destacaColaboradorReprovado(['cpAsoRecolhido___']);
			VIEW.getInstance().isFuncionariosInaptos(['cpAsoRecolhido___']);
			VIEW.getInstance().setComportamentoPaiFilho();
			VIEW.getInstance().toggleDivSatisfacao();
			
			Compartilhados.enabledButtonZoom(['#btnObraDpOrigem','#btnObraDpDestino','#btnRespRecolhimentoASO',
			'#btnAddColaborador'], [0, 1, 2]);

			var mesCompetencia = BLL.getInstance().setMesCompetencia(Compartilhados.getCurrentState());

			$('#cpMesCompetencia').val(mesCompetencia);

			var dataPrazoRecolhimentoAso = new Date();
			dataPrazoRecolhimentoAso.setMonth(parseInt(mesCompetencia.split('/')[0]) - 1);
			dataPrazoRecolhimentoAso.setDate(10);

			$('#cpDataPrazoRecolhimentoAso').val(dataPrazoRecolhimentoAso.toLocaleDateString());


			VIEW.getInstance().changeCorFundoColaboradoresInaptos();
			
		}

		function carregarInterfaceEmVisualizacao(currentState)
		{
			VIEW.getInstance().changeCorFundoColaboradoresInaptos();
			VIEW.getInstance().destacaColaboradorReprovado(['cpAsoRecolhido___']);
			VIEW.getInstance().setComportamentoPaiFilho();
		}

		function fillDepartamento(tipoDepartamento,dados) 
		{
			let complemento;

			if(tipoDepartamento == 'origem') 
			{
				complemento = Model.get_DS1000('SP_FLUIG_1045',`'${dados.CODSECAO}','${dados.CODCOLIGADA}'`).values[0];

				sessionStorage.setItem("codColigadaOrigem", dados.CODCOLIGADA);
				sessionStorage.setItem("codSecaoOrigem", dados.CODSECAO);
				
				$('#cpObraDpOrigem').val(dados.DEPARTAMENTO);
				$('#cpCnpjOrigem').val(dados.CNPJ);
				$('#cpEmpressaOrigem').val(dados.EMPRESA);
				$('#cpCodEmpressaOrigem').val(dados.CODCOLIGADA);
				$('#cpEstadoOrigem').val(dados.ESTADO);
				$('#cpGestorOrigem').val(dados.NOME_GESTOR);
				$('#cpChapaConsultorRHOrigem').val(dados.CHAPA_CONSULTORA);
				$('#cpChapaGestorOrigem').val(dados.GESTOR);
				$('#cpChapaGGOrigem').val(dados.CHAPA_GG);
				$('#cpChapaSuperOrigem').val(dados.SUP);
				$('#cpChapaDiretorOrigem').val(dados.DIRETOR);
				$('#cpChapaRecolhedorFolha').val(dados.FOLHA);
				dados.CODPARCEIRO ? $('#cpObraParceiraOrigem').val("SIM") : $('#cpObraParceiraOrigem').val("NÃO");
				$('#cpNomeParceiroOrigem').val(dados.NOMEPARCEIRO || 'DIRECIONAL ENGENHARIA S/A');
				dados.CONSTRUTOR ? $('#cpConstrutorOrigem').val('SIM') : $('#cpConstrutorOrigem').val('NÃO');
				$('#cpObrauSedeOrigem').val(complemento.TIPOSECAO);
			} 
			else 
			{
				complemento = Model.get_DS1000('SP_FLUIG_1045',`'${dados.CODSECAO}','${dados.CODCOLIGADA}'`).values[0];
				sessionStorage.setItem("codColigadaDestino", dados.CODCOLIGADA);
				sessionStorage.setItem("codSecaoDestino", dados.CODSECAO);

				$('#cpObraDpDestino').val(dados.SECAO);
				$('#cpCnpjDestino').val(dados.CNPJ);
				$('#cpEmpressaDestino').val(dados.NOME_EMPRESA);
				$('#cpCodEmpressaDestino').val(dados.CODCOLIGADA);
				$('#cpEstadoDestino').val(dados.ESTADO);
				$('#cpGestorDestino').val(dados.NOME_GESTOR);
				$('#cpChapaConsultorRHDestino').val(dados.CHAPA_CONSULTORA);
				$('#cpChapaGestorDestino').val(dados.CHAPA_GESTOR);
				$('#cpChapaGGDestino').val(dados.CHAPA_GG);
				$('#cpChapaSuperDestino').val(dados.CHAPA_SUPER);
				$('#cpChapaDiretorDestino').val(dados.CHAPA_DIRETOR);
				$('#cpObraParceiraDestino').val(complemento.CODPARCEIRO ? 'SIM' : 'NÃO');
				$('#cpNomeParceiroDestino').val(complemento.PARCEIRO || 'DIRECIONAL ENGENHARIA S/A');
				complemento.CONSTRUTOR ? $('#cpConstrutorDestino').val('SIM') : $('#cpConstrutorDestino').val('NÃO');
				$('#cpObrauSedeDestino').val(complemento.TIPOSECAO);
				$('#codSecaoDestino').val(dados.CODSECAO);

				BLL.getInstance().isParceirosValidos() ? '' : Compartilhados.WarningToast('', Mensagens.M0009, 'error');
			}
		}

		function addColaborador() 
		{
			var index = wdkAddChild("tableColaboradores");

			wdkAddChild("tableRecolhimentoASO");
			wdkAddChild("tableProscFolha");
			wdkAddChild("tableFuncionariosInaptos");
			wdkAddChild("tableProscManual");

			Compartilhados.enabledButtonZoom([`#btncpNomeColaborador___${index}`], ['0', '1', '2']);
			VIEW.getInstance().changeRecolhimentoAso(['#cpAsoRecolhido___'],index);

			$(`#btncpNomeColaborador___${index}`).click(function() 
			{
				try
				{
					window.loadingLayer.show();
		
					setTimeout(function ()
					{
						sessionStorage.setItem("index",index);
						ZOOM.getInstance().getDadosColaborador();
						window.loadingLayer.hide();
            		}, 100);
				}
				catch (erro) {
					Compartilhados.WarningToast(Mensagens.M0003, '', 'danger');
					console.log(Mensagens.M0004.replace('{0}', '$("#btFieldN2FilaAtendimentoN1").click').replace('{1}', erro))
					window.loadingLayer.hide();
				}
			});
		}

		function fillColaborador(index,colaborador) {
			DAL.getInstance().getPeriodoFerias(colaborador.CHAPA,colaborador.CODCOLIGADA)[0];

			$(`#cpNomeColaborador___${index}`).val(colaborador.NOME);
			$(`#cpNomeColaboradorASO___${index}`).val(colaborador.NOME);
			$(`#cpNomeColaboradorFolha___${index}`).val(colaborador.NOME);
			$(`#cpNomeColaboradorInapto___${index}`).val(colaborador.NOME);
			$(`#cpNomeColaboradorManual___${index}`).val(colaborador.NOME);
			$(`#cpMatriculaColaborador___${index}`).val(colaborador.CHAPA);
			$(`#cpMatriculaColaboradorFolha___${index}`).val(colaborador.CHAPA);
			$(`#cpMatriculaColaboradorASO___${index}`).val(colaborador.CHAPA);
			$(`#cpMatriculaColaboradorInapto___${index}`).val(colaborador.CHAPA);
			$(`#cpChapaColaboradorManual___${index}`).val(colaborador.CHAPA);
			$(`#cpFuncAtualColaborador___${index}`).val(colaborador.FUNCAO);
			$(`#cpDtAdimissaoColaborador___${index}`).val(colaborador.ADMISSAO);
			$(`#cpSalarioColaborador___${index}`).val(colaborador.SALARIO);
			$(`#cpSituacaoColaborador___${index}`).val(colaborador.SITUACAO);
			$(`#cpObraDepColaboradorFolha___${index}`).val(colaborador.SECAO);
			$(`#cpObraDpManual___${index}`).val(colaborador.SECAO);
			BLL.getInstance().isFeriasMarcada(colaborador.CHAPA,colaborador.CODCOLIGADA) ? $(`#cpPerFeriasColaborador___${index}`).val('SIM') : $(`#cpPerFeriasColaborador___${index}`).val('NÃO');
			BLL.getInstance().isAtivo(colaborador);
			$(`#cpCpfColaborador___${index}`).val(colaborador.CPF);		
		}

		function fillRecolhedorAso(dados) {
			$('#cpRespRecolhimentoASO').val(dados.NOME);
			$('#cpChapaRecolhedorASO').val(dados.CHAPA);
		}
		
		function trowMensagens(colaborador) 
		{
			BLL.getInstance().isPCD(colaborador) ? Compartilhados.WarningToast('', Mensagens.M0001, 'error'): '';
			BLL.getInstance().isFeriasMarcada(colaborador.CHAPA,colaborador.CODCOLIGADA) ? Compartilhados.WarningToast('', Mensagens.M0002, 'error') : '';
			!BLL.getInstance().isAtivo(colaborador) ? Compartilhados.WarningToast('', Mensagens.M0008, 'error') : '';
		}

		function listaIndice(element) {
			var form, row = null;
			var hasRow, hasForm = false;
			while (element != null) 
			{
				if (element.id != null) 
				{
					if (!hasRow && element.nodeName.toUpperCase() == "TR") 
					{
						row = element;
						hasRow = true
					} else 
					{
						if (!hasForm && element.nodeName.toUpperCase() == "FORM") 
						{
							form = element;
							hasForm = true
						}
					}
				}
				element = element.parentNode
			}
			let arrayFields = $(row).find("input");
			arrayFields = arrayFields[0];
			let fieldName = arrayFields.name;
			let index = fieldName.match(/[0-9]/g);
			return index[0];
		}

		function removeTableChildrens(fields,index) {
			fields.forEach(element => {
				$(`${element}${index}`).closest('tr').remove();
			});
		}

		function destacaColaboradorReprovado(fields) {
			fields.forEach(element => {
				$(`select[id^='${element}']`).each(function(index,value){
					this.value == 2	? $(this).closest('td').css("background-color", "#ffc0cb") : '';
					this.value == 1 ? $(this).closest('td').css("background-color", "#9DE2A4") : '';
					this.value == '' ? $(this).closest('td').css("background-color", "##ffffff") : '';
					$(this).change(()=>{
						this.value == 2	? $(this).closest('td').css("background-color", "#ffc0cb") : '';
						this.value == 1 ? $(this).closest('td').css("background-color", "#9DE2A4") : '';
						this.value == '' ? $(this).closest('td').css("background-color", "##ffffff") : '';
					})
				});
			});
		}
		
		function isFuncionariosInaptos(fields) {
			fields.forEach(element => {
				$(`select[id^='${element}']`).each(function(index,value){
					let indice = this.name.replace(/[^0-9]+/g, ''); 
					$(this).change(()=>{
						this.value == 2	? $('#isFuncionariosInaptos').val('true') : $('#isFuncionariosInaptos').val('false');
						this.value == 2	? VIEW.getInstance().changeCienciaSolicitante(indice,'NÃO') : VIEW.getInstance().changeCienciaSolicitante(indice,'SIM');
					})
				});
			});
		}
		
		function changeCienciaSolicitante(indice,value){
			$(`#cpAsoRecolhidoInapto___${indice}`).val(value);
		}

		function changeDestacaColaborador(fields, index) {
			fields.forEach(function(element) {
				$(`${element}${index}`).change(function(){
					this.value == 2	? $(this).closest('td').css("background-color", "#ffc0cb") : $(this).closest('td').css("background-color", "#ffffff");
					this.value == 1 ? $(this).closest('td').css("background-color", "#9DE2A4") : '';
				});
			});
		}
		
		function changeRecolhimentoAso(fields, index) {
			fields.forEach(function(element) {
				$(`${element}${index}`).change(function(){
					if(this.value == 2){
						$(this).closest('td').css("background-color", "#ffc0cb");
						$('#cpAsoRecolhidoInapto___' + index).closest('td').css("background-color", "#ffc0cb");
						$('#cpAsoRecolhidoInapto___' + index).val('Não');
					} else {
						$(this).closest('td').css("background-color", "#ffffff")
						$('#cpAsoRecolhidoInapto___' + index).closest('td').css("background-color", "#ffffff");
						$('#cpAsoRecolhidoInapto___' + index).val('');
					}
					if(this.value == 1){
						$(this).closest('td').css("background-color", "#9DE2A4");
						$('#cpAsoRecolhidoInapto___' + index).closest('td').css("background-color", "#9DE2A4");
						$('#cpAsoRecolhidoInapto___' + index).val('Sim');
					}
				});
			});
		}

		function setComportamentoPaiFilho()
		{
			let atividade = Compartilhados.getCurrentState();
			
			if(atividade != 0 && atividade != 2) 
			{
				$('#btnAddColaborador').prop('disabled',true);
				$('.fluigicon-trash').hide();
			}
		}
		
		function toggleDivSatisfacao(){
			$('#cpAprovacaoConfSolicitante').val() !== '1' ? $('#divSatisfacao').hide(400) : $('#divSatisfacao').show(400);
		}

		function cleanRecolhedorASO() {
			$('#cpRespRecolhimentoASO').val('');
		}

		function getIndexChildren (string)
		{
			return string.replace(/\D/g, '');
		}

		function removeAllChildrens(tables) {
			tables.forEach(element => {
				$(element).find("tbody >tr").each(function(index,element){
					if(index > 0){
						$(element).remove();
					}
				})
			});

			$('#tableColaboradores').find("tbody >tr").each(function(index,element){
				if(index > 0){
					$(element).remove();
				}
			})
		}

		var changeCorFundoColaboradoresInaptos = function()
		{
			var quantidade = $('#tableFuncionariosInaptos tr').length - 2;

			for (let index = 1; index <= quantidade; index++) 
			{
				if($('#cpAsoRecolhidoInapto___'+index).val() == 'SIM')
				{
					$('#cpAsoRecolhidoInapto___' + index).closest('tr').css("background-color", "#9DE2A4");
				}
				else
				{
					$('#cpAsoRecolhidoInapto___' + index).closest('tr').css("background-color", "#ffc0cb");
				}
			}
		}
		
		return {
			inicializar: inicializar,
			carregarInterfaceEmModificacao: carregarInterfaceEmModificacao,
			carregarInterfaceEmVisualizacao: carregarInterfaceEmVisualizacao,
			fillDepartamento: fillDepartamento,
			addColaborador: addColaborador,
			fillColaborador: fillColaborador,
			fillRecolhedorAso: fillRecolhedorAso,
			trowMensagens: trowMensagens,
			listaIndice: listaIndice,
			removeTableChildrens: removeTableChildrens,
			destacaColaboradorReprovado: destacaColaboradorReprovado,
			changeDestacaColaborador: changeDestacaColaborador,
			isFuncionariosInaptos: isFuncionariosInaptos,
			setComportamentoPaiFilho:setComportamentoPaiFilho,
			changeRecolhimentoAso: changeRecolhimentoAso,
			changeCienciaSolicitante: changeCienciaSolicitante,
			toggleDivSatisfacao: toggleDivSatisfacao,
			cleanRecolhedorASO: cleanRecolhedorASO,
			getIndexChildren: getIndexChildren,
			removeAllChildrens: removeAllChildrens,
			changeCorFundoColaboradoresInaptos: changeCorFundoColaboradoresInaptos,
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