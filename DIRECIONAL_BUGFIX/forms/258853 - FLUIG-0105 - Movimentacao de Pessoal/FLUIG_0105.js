// Objeto para manipulacao do formulario
var FormularioDeMovimentacao = {

	// Abre Zoom para selecao de obra/departamento de origem
	buscarObraDep: function() {
		var ZoomObraDep = ZoomFactory(ZoomConfigs.ObraDepOrigem);
		ZoomObraDep.Abrir();
	},

	// Abre Zoom para selecao de de colaborador
	buscarColaborador: function() {
		var ZoomColaborador = ZoomFactory(ZoomConfigs.Colaborador);
		ZoomColaborador.Abrir();
	},
	
	selectedPreenchedor: function(solicitante, preenchedor, tipoMaoObra) {

		if ((solicitante == preenchedor) || this.solicitanteIsAdministradorDestino() || this.solicitanteIsDPDestino()) {
		    
			this.desblockeiaTipoMovimentacao();
			this.mostraMovimentacao();
			
			if (tipoMaoObra != 1) {
				this.mostraTransferenciaKm().desblockeiaTransferenciaKm();
			}
			
		} else {
			this.blockeiaTipoMovimentacao();
		}
	},
	
	solicitanteIsDPDestino: function() {
	    var codSecaoDestino = $("#cpCodSecaoNovo").val(),
	        codColigadaDestino = $("#cpCodigoEmpresaTransPadrao").val();

	    return this.checkSolitanteIsDP(codSecaoDestino, codColigadaDestino);
	},
	
	checkSolitanteIsDP: function(secao, coligada) {
        var login = $("#cpLoginFluig").val(),
            listaSecoes = DatasetFactory.getDataset('DS_FLUIG_0007', [login]).values;
        
        if (!listaSecoes) {
            return false;
        }
        
        return listaSecoes.some(function(s){
            return (s.CODSECAO == secao) && (s.CODCOLIGADA == coligada);
        });
	},
	
    solicitanteIsDPOrigem: function() {
        var codSecaoDestino = $("#cpCodSecao").val(),
            codColigadaDestino = $("#cpCodEmpresa").val();

        return this.checkSolitanteIsDP(codSecaoDestino, codColigadaDestino);
    },
	
	// Abre Zoom para selecao de obra/departamento de destino
	buscarNovaObraDep: function() {
		var ZoomNovaObraDep = ZoomFactory(ZoomConfigs.NovaObraDep);
		ZoomNovaObraDep.Abrir();
	},
	
	buscarPreenchedor: function() {
		var ZoomPreenchedor = ZoomFactory(ZoomConfigs.Preenchedor);
		ZoomPreenchedor.Abrir();
	},
	
	getFiltrosRecolhedor: function() {
	    var isTransferencia = this.verificaSeTransferencia(),
	        campoColigada = isTransferencia ? 'cpCodigoEmpresaTransPadrao' : 'cpCodEmpresa',
	        campoSecao = isTransferencia ? 'cpCodSecaoNovo' : 'cpCodSecao';
	    return [campoColigada, campoSecao];
	},
	
	buscarRecolhedorASO: function() {
        var ZoomRecolhedor = ZoomFactory(ZoomConfigs.Recolhedor);
        ZoomRecolhedor.FieldsName = this.getFiltrosRecolhedor();
        ZoomRecolhedor.Abrir();
	},
	
	preencheRecolhedorASO: function(recolhedor) {
        $("#cpRecolhedorASOChapa").val(recolhedor.matricula);
        $("#cpRecolhedorASONome").val(recolhedor.nome);
	},
	
	apagaPreenchedor: function() {
	    $("#cpPreenchedorNome, #cpPreenchedorChapa").val('');
	},
	
	apagaRecolhedorASO: function() {
        $(".infoRecolhedorASO").val('');
    },
	
	// Abre Zoom para selecao de novo cargo
	buscarNovoCargo: function() {
		var ZoomNovoCargo = ZoomFactory(ZoomConfigs.NovoCargo);
		ZoomNovoCargo.FieldsName = this.getCamposNovoCargo();
		ZoomNovoCargo.Abrir();
	},
	
	getCamposNovoCargo: function() {
	    
	    var transferencia = $("#cpTransferencia option:selected").val() || $("#cpTransferencia").val();
	    
	    if (transferencia == 1) {
	        return ["cpCodSecaoNovo", "cpCodColigadaNovo"];
	        
	    } else if (transferencia == 2) {
	        return ["cpCodSecao", "cpCodEmpresa"];
	    }
	    
	    return [];
	},
	
	// Abre Zoom para selecao de novo salario
	buscarNovoSalario: function() {
	    var filtros = this.getCamposNovoSalario(),
	        listaSalarios = this.getListaNovoSalario(filtros),
	        ZoomNovoSalario = ZoomFactory(ZoomConfigs.NovoSalario);

		ZoomNovoSalario.setPreData(listaSalarios);
		ZoomNovoSalario.Abrir();
	},
	
	getListaNovoSalario: function(filtros) {
	    var valorFiltros = filtros.map(function(campo){
	        return $("#" + campo).val();
	    });
	    
	    var listaSalarios = DatasetFactory.getDataset('DS_FLUIG_0001', valorFiltros);
	    
	    var salarioAtual = parseFloat($("#cpSalario").val());
	    
	    listaSalarios.values = listaSalarios.values.filter(function(salario){
	        return salario.SALARIO > salarioAtual;
	    });
	    
	    return listaSalarios;
	},
	
	getCamposNovoSalario: function() {
	    
        var transferencia = $("#cpTransferencia option:selected").val() || $("#cpTransferencia").val(),
        
            tipoDeMovimentacao = $("#cpTipoMovimentacao option:selected").val() || $("#cpTipoMovimentacao").val(),
            
            codFuncao = tipoDeMovimentacao == 1 ? 'cpCodFuncaoNovo' : 'cpCodFuncao',
                    
            codSecao = (transferencia == 1) ? 'cpCodSecaoNovo' : 'cpCodSecao',
                    
            codEmpresa = (transferencia == 1) ? 'cpCodigoEmpresaTransPadrao' : 'cpCodEmpresa';
        
        	//console.log(transferencia + ' - ' + tipoDeMovimentacao + ' - ' + mesmaColigada +' - ' + mesmaColigada +' - '+ codSecao +' - '+ codEmpresa);

        return [codFuncao, codSecao, "cpMatricula", codEmpresa, "cpTipoMovimentacao"];
	},
	
	// Mostra selecao de colaborador
	mostraColaborador: function() {
		$("#blockColaborador").show();
		return this;
	},
	
	// Mostra dados da transferencia
	mostraTransferencia: function() {
		$("#blockTransferencia").show();
		return this;
	},
	
	// Esconde dados de transferencia
	escondeTransferencia: function() {
		$("#blockTransferencia").hide();
		return this;
	},
	
	// Mostra seletor de Transferencia maior que 300 km
	mostraTransferenciaKm: function() {
		$("#blockTransferenciaKm").show();
		return this;
	},
	
	// Esconde seletor de Transferencia maior que 300 km
	escondeTransferenciaKm: function() {
		$("#blockTransferenciaKm").hide();
		return this;
	},
	
	// Mostra seletor de Obra/Dep de destino
	mostraObraDepDestino: function() {
		$("#blockNovaObraDep").show();
		return this;
	},
	
	// Esconde seletor de Obra/Dep de destino
	escondeObraDepDestino: function() {
		$("#blockNovaObraDep").hide();
		return this;
	},
	
	// Mostra block de dados da mudanca
	mostraDadosMudanca: function() {
		$("#blockMudanca").show();
		return this;
	},
	
	// Esconde bloco de dados da mudanca
	escondeDadosMudanca: function() {
		$("#blockMudanca").hide();
		return this;
	},
	
	// Mostra dados da movimentacao
	mostraMovimentacao: function() {
		$("#blockMovimentacao").show();
		this.escondeDetalhesMovimentacao();
		return this;
	},
	
	// Esconde dados da movimentacao
	escondeMovimentacao: function() {
		$("#blockMovimentacao").hide();
		this.escondeDetalhesMovimentacao();
		return this;
	},
	
	// Esconde detalhes da movimentacao
	escondeDetalhesMovimentacao: function() {
		$("#blockNovoCargo").hide();
		$("#blockNovoSalario").hide();
		$("#blockAdicionalTransferencia").hide();
		return this;
	},
	
	preencheSecao: function(secao) {
            $("#cpZoomObraDep").val(secao.nome);
            $("#cpCodEmpresa").val(secao.codColigada);
            $("#cpDoisEmpresa").val(secao.coligada);
            $("#cpCodSecao").val(secao.codSecao);
            $("#cpGestorAtual").val(secao.nomeGestor);
            $("#cpGestorOrigem").val(secao.chapaGestor);
            $("#cpEstadoOrigem").val(secao.estado);
            $("#cpIsObra").val(secao.isObra);
            $("#cpNomeConsultorOrigem").val(secao.nomeConsultora);
	},
	
	// Evento apos selecao de obra/departamento de origem
	selectedObraDep: function(secao) {
	    this.preencheSecao(secao);
	    this.carregaDadosParceiroOrigem(secao.codSecao, secao.codColigada);
	    
		this.mostraColaborador()
			.escondeTransferencia()
			.escondeMovimentacao()
			.limpaColaborador()
			.limpaTransferencia()
			.limpaTipoMovimentacao()
			.limpaTipoMaoObra();
		
		this.apagaRecolhedorASO();
	},
	
	carregaDadosParceiroOrigem: function(secao, coligada) {
	    var dadosParceiro = this.buscaDadosParceiro(secao, coligada);
	    
	    $("#cpOrigemParceiro").val(dadosParceiro.isParceiro);
	    $("#cpNomeParceiroOrigem").val(dadosParceiro.parceiro);
	    $("#cpOrigemConstrutor").val(dadosParceiro.construtor);
	},
	
	buscaDadosParceiro: function(secao, coligada) {
	    var result = DatasetFactory.getDataset('DS_FLUIG_0050', [secao, coligada]).values[0],
	        isParceiro = result.CODPARCEIRO != '' ? 'Sim' : 'Não',
	        nomeParceiro = result.PARCEIRO || 'DIRECIONAL ENGENHARIA S/A';
	    
	    return {
	        isParceiro: isParceiro,
	        parceiro: nomeParceiro,
	        construtor: result.CONSTRUTOR
	    };
	},
	
	preencheColaborador: function(colaborador) {
        $("#cpColaborador").val(colaborador.nome);
        $("#cpFuncaoAtual").val(colaborador.funcao);
        $("#cpMatricula").val(colaborador.matricula);
        $("#cpSalario").val(colaborador.salario);
        $("#cpDataAdmissao").val(colaborador.admissao);
        $("#cpCodFuncao").val(colaborador.codFuncao);
        $("#cpConsultoriaOrigem").val(colaborador.consultoria);
        $("#cpGerenteGeralOrigem").val(colaborador.gerenteGeral);
        $("#cpSuperintendenteOrigem").val(colaborador.superintendente);
        $("#cpDiretorOrigem").val(colaborador.diretor);
        $("#cpNome").val(colaborador.nome);
        $("#cpFolha").val(colaborador.folha);
        $("#cpFolhaColaborador").val(colaborador.folha);
        $("#cpPCD").val(colaborador.PCD);
        $("#cpCPF").val(colaborador.cpf).trigger('keyup');
	},
	
	// Evento apos selecao de colaborador
	selectedColaborador: function(colaborador, coligada) {
	    
	    this.preencheColaborador(colaborador);
	    
		this.mostraTransferencia()
			.limpaTransferencia()
			.limpaTipoMovimentacao()
			.escondeMovimentacao();
		
		$('#cpMesFimFerias').val('');
		
		this.setTipoMaoObra();
		
		this.preencheSituacao(colaborador.matricula, coligada);
		
		this.checkFeriasMarcadas(colaborador.matricula, coligada);
		
		this.apagaRecolhedorASO();
	},
	
	preencheSituacao: function(chapa, coligada) {
	    var situacao = DatasetHelper.getSituacao(chapa, coligada);
	    
        $("#cpSituacaoColaborador").val(situacao.codigo);
        $("#cpSituacao").val(situacao.texto);
	},
	
	checkFeriasMarcadas: function(chapa, coligada) {

		if (!this.checkFerias(chapa, coligada)) {
		    $("#cpPeriodoFerias").val('Não possúi férias marcadas.');
		    this.calcMesCompetencia();
		}
		
		return this;
	},
	
	checkFerias: function(chapa, coligada) {
        var periodosAquisitivos = DatasetHelper.getPeriodosAquisitivos(chapa, coligada);

        return periodosAquisitivos.some(function(periodo){
            return this.checkFeriasCadastradas(periodo, chapa, coligada);
        }, this);
	},
	
	checkFeriasCadastradas: function(periodo, chapa, coligada) {
	    var feriasCadastradas = DatasetHelper.getFeriasCadastradas(chapa, coligada, periodo.FIMPERAQUIS.substring(0,10));
	    
	    return feriasCadastradas.some(function(ferias, index, array){
	        return this.checkFeriasImpeditiva(ferias);
	    }, this);
	},
	
	checkFeriasImpeditiva: function(ferias) {
		$("#cpPeriodoFimFerias").val("");
	    var dataInicio = Utils.converteData(ferias.DATAINICIO, true),
	        dataFim = Utils.converteData(ferias.DATAFIM, true),
	        mes = ferias.DATAFIM.substring(5, 7),
	        ano = ferias.DATAFIM.substring(0, 4),
	        hoje = new Date();
        
        if (dataFim > hoje) {
            $("#cpPeriodoFerias").val(Utils.converteData(ferias.DATAINICIO) + ' até ' + Utils.converteData(ferias.DATAFIM));
            this.calcMesCompetencia(this.getMeses(dataInicio, dataFim));
            $("#cpPeriodoFimFerias").val(new Date(ferias.DATAFIM))
            return true;
            
            
        }
        return false;
	},
	
	getMeses: function(inicio, fim) {
	    
	    var meses = [];
	    
	    while (((inicio.getMonth() <= fim.getMonth()) && (inicio.getFullYear() <= fim.getFullYear())) || (inicio.getFullYear() < fim.getFullYear())) {
	        meses.push({
	            mes: inicio.getMonth(),
	            ano: inicio.getFullYear()
	        });
	        inicio.setMonth(inicio.getMonth() + 1);
	    }
	    
	    return meses;
	},

	
	calcMesCompetencia: function(mesesFerias) {
	  $("#cpMesCompetencia").val(getMesCompetencia(mesesFerias));
	  this.destacaCompetencia();
	},
	
	destacaCompetencia: function() {
	    var comp = $("#cpMesCompetencia").val();
	    if (comp != '') {
	        $("#labelCompetencia").addClass('destaca destacaEsquerda');
	        $("#cpMesCompetencia").addClass('destaca destacaDireita');
	    }
	},
	
	desblockeiaTransferenciaKm: function () {
		$('#cpTransferenciaKm').removeAttr('readonly').prop('disabled', false);
		return this;
	},
	
	blockeiaTransferenciaKm: function() {
		$('#cpTransferenciaKm').attr('readonly', 'readonly').prop('disabled', true);
		return this;
	},
	
	blockeiaTipoMovimentacao: function() {
		$('#promocao, #progressao, #enquadramento, #recassificacao').prop('disabled', true);
		return this;
	},
	
	desblockeiaTipoMovimentacao: function() {
		$('#promocao, #progressao, #enquadramento, #recassificacao').prop('disabled', false);
		return this;
	},
	
	solicitanteIsAdministradorDestino: function() {
		
		var solicitante = document.getElementById('cpMatriculaSolicitante').value,
			administradores = [
			    $('#cpGestorDestino').val(),
			    $('#cpGerenteGeralDestino').val(),
			    $('#cpSuperintendenteDestino').val(),
			    $('#cpDiretorDestino').val()
			];
		
		if (administradores.indexOf(solicitante) != -1) {
			return true;
		}

		return false;
	},
	
	// Processa selecao de tipo de movimentacao
	selectedTransferencia: function(transferencia){
		
	    this.blockeiaTransferenciaKm();
	    
	    this.limpaDetalhesTransferencia()
            .limpaTipoMovimentacao();
       
        this.limpaNovaObraDep();
        this.apagaRecolhedorASO();
        this.escondeMovimentacao();
		
		if (transferencia == 1) {
			$("#semAlteracaoSalarial").prop('disabled', false);
			this.mostraObraDepDestino();
			
		} else if (transferencia == 2) {
		    
		    $("#semAlteracaoSalarial").prop('disabled', true);
			this.desblockeiaTipoMovimentacao();
			
			this.escondeTransferenciaKm()
				.escondeDadosMudanca()
				.escondeObraDepDestino();
				
			
			if (this.solicitanteIsAdminOrigem() || this.solicitanteIsDPOrigem()) {
			    this.mostraMovimentacao();
			}
			
		} else {
			this.escondeObraDepDestino()
				.escondeTransferenciaKm()
				.escondeMovimentacao()
				.escondeDadosMudanca();
		}

        this.toggleBlockRecolhedorASO();
	},
	
	solicitanteIsAdminOrigem: function() {
        var solicitante = $("#cpMatriculaSolicitante").val(),
            gestor = $("#cpGestorOrigem").val(),
            gerenteGeral = $("#cpGerenteGeralOrigem").val(),
            superintendente = $("#cpSuperintendenteOrigem").val(),
            diretor = $("#cpDiretorOrigem").val();
    
    return [gestor, gerenteGeral, superintendente, diretor].indexOf(solicitante) > -1;
	},
	
	// Evento apos selecao de Transferencia com mais de 300 km
	selectedTransferenciaKm: function (transferenciaKm) {
		if (transferenciaKm == 1) {
			this.mostraDadosMudanca();
		} else {
			this.escondeDadosMudanca();
		}
	},
	
	// Evento apos selecao de nova obra/departamento
	selectedNovaObraDep: function(secao){
	    
	    this.preencheSecaoDestino(secao);
	    
		this.apagarPreenchedor()
			.toggleBlockPreenchedor(secao.isObra);
		
		this.toggleDadosMovimentacao();
		
		this.toggleTransferenciaKm();
		
        this.carregaDadosParceiroDestino(secao.codSecao, secao.codColigada);
        this.limpaTipoMovimentacao();
        this.apagaRecolhedorASO();
        this.toggleBlockRecolhedorASO();
        this.limpaDetalhesTransferencia();
        
        if (this.checkPermissaoSolicitante()) {
            this.mostraMovimentacao();
        }
	},
	
	carregaDadosParceiroDestino: function(secao, coligada) {
        var dadosParceiro = this.buscaDadosParceiro(secao, coligada);
        $("#cpDestinoParceiro").val(dadosParceiro.isParceiro);
        $("#cpNomeParceiroDestino").val(dadosParceiro.parceiro);
        $("#cpDestinoConstrutor").val(dadosParceiro.construtor);
	},
	
	toggleBlockPreenchedor: function(isObra) {
	    if (!isObra){isObra = $("#cpDestinoIsObra").val();}
	    $("#blockPreenchedor").toggle(isObra == 1);
	},
	
	preencheSecaoDestino: function(secao){
        $("#cpZoomNovaObraDepTransPadrao").val(secao.nome);
        $("#cpCodigoEmpresaTransPadrao").val(secao.codColigada);
        $("#cpNovaEmpresaTransPadrao").val(secao.empresa);
        $("#cpGestorDestino").val(secao.gestor);
        $("#cpCodSecaoNovo").val(secao.codSecao);
        $("#cpConsultoriaDestino").val(secao.consultor);
        $("#cpGerenteGeralDestino").val(secao.gerenteGeral);
        $("#cpSuperintendenteDestino").val(secao.superintendente);
        $("#cpDiretorDestino").val(secao.diretor);
        $("#cpEstadoDestino").val(secao.estado);
        $("#cpNovoGestorTransPadrao").val(secao.nomeGestor);
        $("#cpCodColigadaNovo").val(secao.codColigada);
        $("#cpDestinoIsObra").val(secao.isObra);
        $("#cpNomeConsultorDestino").val(secao.nomeConsultora);
	},
	
	toggleTransferenciaKm: function(isNotInicio) {
		var tipoMaoObra = $("#cpTipoMaoObra").val();
		var solicitantePodeAlterar = this.checkPermissaoSolicitante();
		
		if ((tipoMaoObra != 1) && (isNotInicio || solicitantePodeAlterar)) {
			this.mostraTransferenciaKm()
				.desblockeiaTransferenciaKm();
			
		} else {
			this.escondeTransferenciaKm()
				.blockeiaTransferenciaKm();
		}
	},
	
	checkPermissaoSolicitante: function() {
	    var solicitante = $("#cpMatriculaSolicitante").val(),
	        gestor = $("#cpGestorDestino").val(),
	        gerenteGeral = $("#cpGerenteGeralDestino").val(),
	        superintendente = $("#cpSuperintendenteDestino").val(),
	        diretor = $("#cpDiretorDestino").val(),
	        preenchedor = $("#cpPreenchedorChapa").val();
	    
	    return [gestor, gerenteGeral, superintendente, diretor, preenchedor].indexOf(solicitante) > -1;
	},
	
	toggleDadosMovimentacao: function() {
		if (this.solicitanteIsAdministradorDestino() || this.solicitanteIsDPDestino()) {
			
			this.desblockeiaTipoMovimentacao();
			
		} else {
			this.blockeiaTipoMovimentacao();
		}
	},
	
	apagarPreenchedor: function() {
		$("#cpPreenchedorNome").val('');
		$("#cpPreenchedorChapa").val('');
		return this;
	},
	
	// Evento apos selecao de tipo de mudanca
	selectedMudanca: function (tipoDeMudanca) {
		$("#cpMembrosFamilia").val(0);
		$("#cpQuantidadeMembros").val("");
		$("#cpTipoMoradia").val(0);

		
		if (tipoDeMudanca == 1) {
			$("#cpMembrosFamilia").prop('disabled', false);
			$("#cpQuantidadeMembros").removeAttr("readonly");
			$("#MoradiaTipoAlojamento").prop('disabled', true);
			$("#MoradiaTipoRepublica").prop('disabled', true);
			$("#MoradiaTipoImovelProprio").prop('disabled', false);
			
		} else {
			$("#cpMembrosFamilia").prop('disabled', true);
			$("#cpQuantidadeMembros").attr("readonly", "readonly");
			$("#MoradiaTipoAlojamento").prop('disabled', false);
			$("#MoradiaTipoRepublica").prop('disabled', false);
			$("#MoradiaTipoImovelProprio").prop('disabled', false);
		}
	},
	
	// Evento apos selecao de tipo de moradia
	selectedMoradia: function (tipoDeMoradia) {

		var estado = $("#cpEstadoDestino").val(),
			adicional = (estado == "MG") ? 25 : 35;
		
		$("#cpAuxilioInstalacao").val("0");
		$("#cpValorAuxilio").val("");
		$("#cpDataAuxilio").val("");
		
		$("#cpAdicionalTransferencia").val(adicional);
		
		if ((tipoDeMoradia == 0) || (tipoDeMoradia == 3)) {
			$('#cpPassagemRetorno').prop('disabled', true);
			$('#cpPeridiocidade').prop('disabled', true);
			$('#cpQtViajantes').prop('disabled', true);
			
			$("#cpAuxilioInstalacao").prop('disabled', false);
			$("#cpValorAuxilio").removeAttr("readonly");
			$("#cpDataAuxilio").removeAttr("readonly");
			$("#cpDataAuxilio").prop('disabled', false);
		} else {
			$('#cpPassagemRetorno').prop('disabled', false);
			$('#cpPeridiocidade').prop('disabled', false);
			$('#cpQtViajantes').prop('disabled', false);
			
			$("#cpAuxilioInstalacao").prop('disabled', true);
			$("#cpValorAuxilio").attr("readonly", "readonly");
			$("#cpDataAuxilio").attr("readonly", "readonly");
			$("#cpDataAuxilio").prop('disabled', true);
		}
		
		this.clickedSemAdicional();
	},
	
	// Evento apos selecao do Auxilio Instalacao
	selectedAuxilioInstalacao: function(tipoDeAuxilio) {
		$("#cpValorAuxilio").val("0");
		$("#cpDataAuxilio").val("");
		
		if (tipoDeAuxilio == 1) {
			$("#cpValorAuxilio").removeAttr("readonly");
			$('#cpDataAuxilio').prop('disabled', false);
			
		} else {
			$("#cpValorAuxilio").attr("readonly", "readonly");
			$('#cpDataAuxilio').prop('disabled', true);
		}
		
	},
	
	selectedTransporteMobiliario: function(tipoDeTransporte) {
		
		var dataDoTransporte = $("#cpDataTransporte");
		
		dataDoTransporte.val("");
		
		if (tipoDeTransporte == 1) {

			dataDoTransporte.prop('disabled', false);
		} else {
			dataDoTransporte.prop('disabled', true);
		}
	},
	
	selectedTransVeiculo: function(tipoDeTransporte) {
		var dataDoTransporte = $("#cpDataTransporteVeic");
		
		dataDoTransporte.val("");
		
		if (tipoDeTransporte == 1) {
			dataDoTransporte.prop('disabled', false);
		} else {
			dataDoTransporte.prop('disabled', true);
		}
	},
	
	selectedPassagemRetorno: function(retorno) {
		
		$("#cpPeridiocidade").val(0);
		$("#cpQtViajantes").val('');
		
		if (retorno == 1) {
			$("#cpPeridiocidade").removeAttr('readonly', 'readonly').prop('disabled', false);
			$("#cpQtViajantes").removeAttr('readonly', 'readonly').prop('disabled', false);
		} else {
			$("#cpPeridiocidade").attr('readonly', 'readonly').prop('disabled', true);
			$("#cpQtViajantes").attr('readonly', 'readonly').prop('disabled', true);
		}
		
	},
	
	// Evento apos selecao de tipo de movimentacao
	selectedTipoMovimentacao: function (tipoDeMovimentacao) {
		var transferenciaKm = $("#cpTransferenciaKm").val();
		var destinoIsOBra = this.verificaDistinoIsObra();
		
		this.limpaDetalhesMovimentacao();
		
		if ((tipoDeMovimentacao == 1) || (tipoDeMovimentacao == 4)) {
			$("#blockNovoCargo").show();
		} else {
			$("#blockNovoCargo").hide();
		}
		
		if ((tipoDeMovimentacao == 1) || (tipoDeMovimentacao == 2) || (tipoDeMovimentacao == 3)) {
			$("#blockNovoSalario").show();
		} else {
			$("#blockNovoSalario").hide();
		}
		
		if ((tipoDeMovimentacao == 2) || (tipoDeMovimentacao == 3) || (tipoDeMovimentacao == 5)) {
			this.setTipoMaoObra();
		} else {
			this.limpaTipoMaoObra();
		}
		
		if ((transferenciaKm == 1) && (tipoDeMovimentacao != 0)) {
			$("#blockAdicionalTransferencia").show();
		} else {
			$("#blockAdicionalTransferencia").hide();
		}
		
		var mostraBlockRecolhedor = this.toggleBlockRecolhedorASO(tipoDeMovimentacao);
		this.apagaRecolhedorASO();
		
		if (!destinoIsOBra && mostraBlockRecolhedor) {
		    this.carregaRecolhedorASO();
		}
	},
	
	toggleBlockRecolhedorASO: function(tipoDeMovimentacao) {
	    if (!tipoDeMovimentacao){tipoDeMovimentacao = $("#cpTipoMovimentacao").val();}
	    
	    var mostraBlockRecolhedor = (tipoDeMovimentacao == 1) || (tipoDeMovimentacao == 4),
	        destinoIsObra = this.verificaDistinoIsObra(),
	        mostraAcoes = mostraBlockRecolhedor && destinoIsObra;
	    
	    $("#blockRecolhedorASO").toggle(mostraBlockRecolhedor);
	    $(".actionRecolhedorASO").toggle(mostraAcoes);
	    
	    return mostraBlockRecolhedor;
	},
	
	verificaDistinoIsObra: function() {
	    var isTransferencia = this.verificaSeTransferencia(),
	        destinoIsObra = isTransferencia ? 'cpDestinoIsObra' : 'cpIsObra';
	    return $("#" + destinoIsObra).val() == 1;
	},
	
	carregaRecolhedorASO: function() {
	    var dadosRecolhedor = this.getDadosRecolhedorASO();
	    this.preencheRecolhedorASO(dadosRecolhedor);
	},
	
	getDadosRecolhedorASO: function() {
	    var isTransferencia = this.verificaSeTransferencia(),
	        campoChapa = isTransferencia ? 'cpConsultoriaDestino' : 'cpConsultoriaOrigem',
	        campoNome = isTransferencia ? 'cpNomeConsultorDestino' : 'cpNomeConsultorOrigem';

	    return {
	        matricula: $("#" + campoChapa).val(),
	        nome: $("#" + campoNome).val()
	    };
	},
	
	verificaSeTransferencia: function() {
	    var tipoTransferencia = $("#cpTransferencia").val();
	    return tipoTransferencia == 1;
	},
	
	setTipoMaoObra: function() {
		
		var transferencia = $("#cpTransferencia").val(),
			tipoDeMovimentacao = $("#cpTipoMovimentacao").val(),
			campoCodSecao = "cpCodSecao",
			campoCodColigada = "cpCodEmpresa",
			campoCodFuncao = "cpCodFuncao";
		
		if(transferencia == 1) {
			campoCodSecao = "cpCodSecaoNovo";
			campoCodColigada = "cpCodColigadaNovo";
		}
		
		if ((tipoDeMovimentacao == 1) || (tipoDeMovimentacao == 4)) {
			campoCodFuncao = "cpCodFuncaoNovo";
		}
		
		
		var COLIGADA = $("#" + campoCodColigada).val(),
			FUNCAO = $("#" + campoCodFuncao).val(),
			dadosFuncao = DatasetHelper.getTipoMaoObra(COLIGADA, FUNCAO),
			inicialTipoMaoObra = dadosFuncao.MAODEOBRA.substr(0, 2),
			tipoMaoObra = 0;
		
		if (inicialTipoMaoObra == "Pr") {
			tipoMaoObra = 1;
		} else if (inicialTipoMaoObra == "En") {
			tipoMaoObra = 2;
		} else if (inicialTipoMaoObra == "Ad") {
			tipoMaoObra = 3;
		} else if (inicialTipoMaoObra == "Es") {
			tipoMaoObra = 4;
		}
		
		$("#cpTipoMaoObra").val(tipoMaoObra);
		$("#cpTipoMaoObraTexto").val(dadosFuncao.MAODEOBRA);
		
		return this;
	},
	
	
	limpaTipoMaoObra: function() {
		$("#cpTipoMaoObra").val("0");
		$("#cpTipoMaoObraTexto").val("");
		return this;
	},
	
	// Evento apos selecao de novo cargo
	selectedNovoCargo: function() {
		
		var transferenciaKm = $("#cpTransferenciaKm").val(),
			tipoDeMovimentacao = $("#cpTipoMovimentacao").val();
		
		this.limpaNovoSalario()
			.limpaAdicional()
			.setTipoMaoObra();
		
		if ((transferenciaKm == 1) && (tipoDeMovimentacao != 0)) {
			$("#blockAdicionalTransferencia").show();
			
			if ((tipoDeMovimentacao == 4) || (tipoDeMovimentacao == 5)) {
				this.calcSalarioAtualComAdicional();
			}
			
		} else {
			$("#blockAdicionalTransferencia").hide();
		}
	},
	
	// Evento apos selecao de novo salario
	selectedNovoSalario: function() {
		this.limpaAdicional();
		this.calcPercentualAumento();
	},
	
	// Evento de click na checkbox de Sem Adicional de Transferencia
	clickedSemAdicional: function() {
		
		var checkbox = document.getElementById('cpSemAdicionalTransferencia'),
			tipoDeMovimentacao = $("#cpTipoMovimentacao").val();
		
		if(checkbox.checked) {
			$("#cpAdicionalTransferencia").val("0");
			$("#cpNovoSalarioComAdicional").val("");
		} else {
			if ((tipoDeMovimentacao == 4) || (tipoDeMovimentacao == 5)) {
				this.calcSalarioAtualComAdicional();
			} else {
				this.calcNovoSalarioComAdicional();
			}
		}
	},
	
	adicionalTrasferênciaChanged: function(percentual) {
		var salarioAtual = $("#cpZoomNovoSalario").val(),
			semAdicional = $("#cpSemAdicionalTransferencia").prop('checked'),
			tipoMovimentacao = $("#cpTipoMovimentacao").val(),
			percentual = parseInt(percentual);
		
		if (!semAdicional) {
			
			if (tipoMovimentacao == 1 || tipoMovimentacao == 2 || tipoMovimentacao == 3) {
				var salarioBase = parseFloat($("#cpZoomNovoSalario").val());
				
			} else {
				var salarioBase = parseFloat($("#cpSalario").val());
			}
			
			var novoSalario = salarioBase / 100 * (100 + percentual);
			
			$("#cpNovoSalarioComAdicional").val(novoSalario.toFixed(2));
		}
	},
	
	// Calcula Percentual de Aumento
	calcPercentualAumento: function() {
		
		var novoSalario = parseInt($("#cpZoomNovoSalario").val()),
			salarioAtual = parseInt($("#cpSalario").val()),
			porcentagem = novoSalario / (salarioAtual / 100) - 100,
			transferenciaKm = $('#cpTransferenciaKm').val();
		
		$("#cpPercentualAumento").val(porcentagem.toFixed(2) + "%");
		
		if (transferenciaKm == 1) {
			this.calcNovoSalarioComAdicional();
		}
		return this;
	},
	
	// Calcula novo salario com adicional de transferencia
	calcNovoSalarioComAdicional: function() {
		var adicional = this.calcPercentualAdicional(),
			novoSalario = parseFloat($("#cpZoomNovoSalario").val()),
			novoSalarioComAdicional = novoSalario / 100 * (100 + adicional);
		
		if(!isNaN(novoSalarioComAdicional)) {
		    $("#cpNovoSalarioComAdicional").val(novoSalarioComAdicional.toFixed(2));
		}
		
		return this;
	},
	
	semAdicionalChanged: function() {
		$("#cpAdicionalTransferencia").val(0);
		$("#cpNovoSalarioComAdicional").val('');
		
	},
	
	// Calcula antigo salario com adicional de transferencia
	calcSalarioAtualComAdicional: function() {
		var adicional = this.calcPercentualAdicional(),
			salario = parseFloat($("#cpSalario").val()),
			salarioAtualComAdicional = salario / 100 * (100 + adicional);
	
		$("#cpNovoSalarioComAdicional").val(salarioAtualComAdicional.toFixed(2));
		return this;
	},
	
	// Calcula Percentual do Adicional de transferencia
	calcPercentualAdicional: function () {
		var estado = $("#cpEstadoDestino").val(),
			tipoDeMoradia = $("#cpTipoMoradia").val(),
			adicional = 25;
		
		if ((estado != "MG") && (tipoDeMoradia == 3)) {
			adicional = 35;
		}
		
		$("#cpAdicionalTransferencia").val(adicional);

		return adicional;
	},
	
	// Lima dados do colaborador
	limpaColaborador: function() {
		$(".dadosColaborador").val('');
		$("#cpSituacaoColaborador").val('');
		return this;
	},
	
	// Limpa todas as informacoes da transferencia
	limpaTransferencia: function() {
		
		// Recupera cpFolha do colaborador
		document.getElementById("cpFolha").value = document.getElementById("cpFolhaColaborador").value;
		
		$("#cpTransferencia").val(0);
		this.limpaDetalhesTransferencia();
		this.limpaNovaObraDep();
		return this;
	},
	
	// Limpa detalhes da transferencia
	limpaDetalhesTransferencia: function() {
		$("#cpTransferenciaKm").val(0);
		this.limpaDetalhesMudanca();
		return this;
	},
	
	// Limpa dados da nova obra
	limpaNovaObraDep: function() {
		$(".detalheNovaObraDep").val('');
		return this;
	},
	
	
	// Limpa delathes da transferencia
	limpaDetalhesMudanca: function() {
		$(".inputDetalheMudanca").val('');
		$(".selectDetalheMudanca").val(0);
		return this;
	},
	
	
	// Limpa todas as informacoes da movimentacao
	limpaTipoMovimentacao: function() {
		$("#cpTipoMovimentacao").val(0);
		this.limpaDetalhesMovimentacao();
		return this;
	},
	
	
	// Limpa detalhes da movimentacao
	limpaDetalhesMovimentacao: function() {
		this.limpaNovoCargo()
			.limpaNovoSalario()
			.limpaAdicional();
		return this;
	},
	
	
	// Limpa novo cargo
	limpaNovoCargo: function() {
		document.getElementById("cpZoomNovoCargo").value = '';
		document.getElementById("cpCodFuncaoNovo").value = '';
		return this;
	},
	
	
	// Limpa campos do novo salario
	limpaNovoSalario: function() {
		document.getElementById("cpZoomNovoSalario").value = '';
		document.getElementById("cpPercentualAumento").value = '';
		return this;
	},
	
	
	// Limpa campos de adicional de transferencia
	limpaAdicional: function() {
		document.getElementById("cpSemAdicionalTransferencia").checked = false;
		document.getElementById("cpAdicionalTransferencia").value = '';
		document.getElementById("cpNovoSalarioComAdicional").value = '';
		return this;
	},
	
	openDatepicker: function(el) {
		$(el).parent().parent().find('input').trigger('click');
	},
	
	
	// Destaca aprovacoes com parecer
	destacaPareceres: function() {
		$("#aprovacoes").find("textarea").each(function(){
			var self = $(this);
			if(self.val().length > 0){
				self.closest(".panel")
					.find(".panel-title")
					.append('&nbsp;<span class="label label-warning">Cont&eacute;m Parecer</span>');
			};
		});
		return this;
	},
	
	
	// Expande parecer da atividade atual
	expandeParecer: function(atividade) {
		if (((atividade == 1) || (atividade == 0) || (atividade == 374)) || (getFormMode() == "VIEW")) {
			return;
		}
		
		$('#panelAtividade_' + atividade).collapse("show");

		if (atividade == 162) {
			$('#panelAtividade_80').collapse("show"); //PROCESSAMENTO DA MOVIMENTACAO DE PESSOAL
			
		} else if (atividade == 282) {
			$('#panelAtividade_84').collapse("show"); //PROCESSAMENTO DA MOVIMENTACAO DE PESSOAL
		}
		
	
		return this;
	},
	
	// Coloca formulario no estado inicial
	estadoInicial: function() {
		
		$("#blockColaborador," +
				"#blockTransferencia," +
				"#blockTransferenciaKm," +
				"#blockNovaObraDep," +
				"#blockMudanca," +
				"#blockMovimentacao," +
				"#blockNovoCargo," +
				"#blockNovoSalario," +
				"#blockAdicionalTransferencia").hide();
		return this;
	},
	
	// Altera a exibicao dos campos dependendo da atividade em execucao
	estadoAberto: function(atividade, modo) {
		
		var transferencia = $("#cpTransferencia").val(),
			transferenciaKm = $("#cpTransferenciaKm").val(),
			tipoDeMovimentacao = $("#cpTipoMovimentacao").val();
		
		if (transferencia != 1) {
			this.escondeObraDepDestino();
			this.escondeTransferenciaKm();
			$("#blockAdicionalTransferencia").hide();
			$("#reprovaT").prop('disabled', true);
		}
		
        if (transferenciaKm != 1) {
            this.escondeDadosMudanca();
            $("#blockAdicionalTransferencia").hide();
        }
		
		if ((tipoDeMovimentacao != 1) && (tipoDeMovimentacao != 4)) {
			$("#blockNovoCargo").hide();
		}
		
		if ((tipoDeMovimentacao != 1) && (tipoDeMovimentacao != 2) && (tipoDeMovimentacao != 3)) {
			$("#blockNovoSalario").hide();
		}
		
		if ((atividade == 1) || (atividade == 374)) {
		    
		    var podeAlterar = (transferencia == 1) ? this.checkPermissaoSolicitante() : this.solicitanteIsAdminOrigem() || this.solicitanteIsDPOrigem();
		    
		    if (!podeAlterar) {
		        this.escondeMovimentacao();
		    }
		    
		    this.toggleTransferenciaKm();
		}
		
		
		if ((atividade == 45) || (atividade == 313)) {
			this.mostraTransferenciaKm();
		}
		
		if ((atividade != 141) && (atividade != 1) && (atividade != 374)) {
			this.removeZooms(atividade, modo);
		}
		

		return this;
	},
	
	removeZooms: function(atividade, modo) {
		
		if ((atividade == 313) || (atividade == 45)) {
			$("#BuscarCpObraDep, #BuscarCpColaborador, #BuscarCpNovaObraDep, #BuscarPreenchedor").parent().remove();
			
		} else {
			//$('.btn').parent().remove();
		}
		
		return this;
		
	},
	
	// Coloca a interface do formulario no estado correto
	mudaEstado: function(atividade, modo) {
		if (atividade == 0) {
			this.estadoInicial();
		} else {
			this.estadoAberto(atividade, modo);
		}
		return this;
	},
	
	findSecaoOrigem: function(codSecao, codColigada) {
	    
        var listaSecoes = DatasetFactory.getDataset('DS_FLUIG_0008', null, null, null);
        
        var secaoOrigem = listaSecoes.values.find(function(secao){
            return (secao.CODICOLIGADA_SECAO == codColigada) && (secao.CODSECAO == codSecao);
        });
        
        return {
            nome: secaoOrigem.NOME_SECAO,
            codColigada: secaoOrigem.CODICOLIGADA_SECAO,
            coligada: secaoOrigem.NOME_EMPRESA,
            codSecao: secaoOrigem.CODSECAO,
            nomeGestor: secaoOrigem.NOME_GERENTE,
            chapaGestor: secaoOrigem.CHAPA_GERENTE,
            estado: secaoOrigem.ESTADO,
            isObra: secaoOrigem.OBRA_SEDE == "SEDE" ? '0' : '1'
        };
	},
	
	findColabordor: function(chapa, codSecao, codColigada){
	    var colaboradores = DatasetFactory.getDataset('DS_FLUIG_0013', [codSecao, codColigada], null, null);
	    var colaborador = colaboradores.values.find(function(info){
	        return info.CHAPA == chapa;
	    });

	    return {
	        nome: colaborador.NOME,
	        funcao: colaborador.FUNCAO,
	        matricula: colaborador.CHAPA,
            salario: colaborador.SALARIO,
            admissao: colaborador.DATAADMISSAO,
            codFuncao: colaborador.CODFUNCAO,
            consultoria: colaborador.CHAPA_CONSULTORA,
            gerenteGeral: colaborador.CHAPA_GG,
            superintendente: colaborador.CHAPA_SUP,
            diretor: colaborador.CHAPA_DIRETOR,
            folha: colaborador.CHAPA_FOLHA,
            PCD: colaborador.PCD
        };
	},
	
	findSecaoDestino: function(codSecao, codColigada) {
	    
	    var secoes = DatasetFactory.getDataset('DS_FLUIG_0008', [], null, null);
	    
	    var destino = secoes.values.find(function(secao){
	        return (secao.CODSECAO == codSecao) && (secao.CODICOLIGADA_SECAO == codColigada);
	    });
	    
        return {
            nome: destino.NOME_SECAO,
            codColigada: destino.CODICOLIGADA_SECAO,
            empresa: destino.NOME_EMPRESA,
            gestor: destino.CHAPA_GERENTE,
            codSecao: destino.CODSECAO,
            consultor: destino.CHAPA_CONSULTORA,
            gerenteGeral: destino.CHAPA_GG,
            superintendente: destino.CHAPA_SUPER,
            diretor: destino.CHAPA_DIRETOR,
            estado: destino.ESTADO,
            nomeGestor: destino.NOME_GERENTE
        };
	},
	
	completarDados: function(formMode) {
	    var solicitante = $("#cpMatriculaSolicitante").val();
	    var chapaColaborador = $("#cpMatricula").val();
        var codSecaoOrigem = $("#cpCodSecao").val();
        var codColigadaOrigem = $("#cpCodEmpresa").val();
        var codSecaoDestino = $("#cpCodSecaoNovo").val();
        var codColigadaDestino = $("#cpCodColigadaNovo").val();
        
        var isTransferencia = (codSecaoOrigem != codSecaoDestino) || (codColigadaOrigem != codColigadaDestino);

	    var login = this.getLogin(solicitante);
	    
	    var secaoOrigem = this.findSecaoOrigem(codSecaoOrigem, codColigadaOrigem);
	    
	    var dadosColaborador = this.findColabordor(chapaColaborador, codSecaoOrigem, codColigadaOrigem);

	    if (isTransferencia) {
	        var secaoDestino = this.findSecaoDestino(codSecaoDestino, codColigadaDestino);
	    }
	    
	    this.preencheSolicitante(login);
	    
	    this.selectedObraDep(secaoOrigem);
	    
	    this.selectedColaborador(dadosColaborador, codColigadaOrigem);
	    
	    if (isTransferencia) {
	        $("#cpTransferencia").val('1').trigger('change');
	        this.selectedNovaObraDep(secaoDestino);
	    } else {
	        $("#cpTransferencia").val('2').trigger('change');
	    }
	    
	    if (formMode != "VIEW") {
	        $("#cpAvancoAutomatico").val('0');
	    }
	},
	
	destacaAprovacao: function() {
		
		$("[aprovacao]").each(function(){
			if (this.value == 1) {
				$(this).closest('.panel').removeClass('panel-default').addClass('panel-success');
			} else if (this.value == 4) {
			    $(this).closest('.panel').removeClass('panel-default').addClass('panel-warning');
			} else if (this.value != 0) {
				$(this).closest('.panel').removeClass('panel-default').addClass('panel-danger');
			}
		});
		
	},
	
	destacaAprovacaoGest: function() {
		
		$("[aprovacaoProcMov]").each(function(){
			if (this.value == 1) {
				$(this).closest('.panel').removeClass('panel-default').addClass('panel-success');
			} else if (this.value == 4) {
			    $(this).closest('.panel').removeClass('panel-default').addClass('panel-warning');
			} else if (this.value == 2 || this.value ==3) {
				$(this).closest('.panel').removeClass('panel-default').addClass('panel-danger');
			}
		});
		
	},
	
	destacaAprovacaoAso: function() {
		
		$("[ConfAso]").each(function(){
			if (this.value == 1) {
				$(this).closest('.panel').removeClass('panel-default').addClass('panel-success');
			} else if (this.value == 4) {
			    $(this).closest('.panel').removeClass('panel-default').addClass('panel-warning');
			} else if (this.value != 0) {
				$(this).closest('.panel').removeClass('panel-default').addClass('panel-danger');
			}
		});
		
	},
	
	
	getLogin: function(chapa) {
	    return DatasetHelper.getLogin(chapa);
	},
	
	preencheSolicitante: function(login) {
        var DadosSolicitante = DatasetFactory.getDataset("DS_FLUIG_0012", [login], null, null).values[0];
        
        $("#cpLoginFluig").val(login);
        $("#cpMatriculaSolicitante").val(getUser());
        $("#cpCodColigada").val(DadosSolicitante.CODCOLIGADA);
        $("#cpSolicitante").val(DadosSolicitante.NOME);
        $("#cpEmpresa").val(DadosSolicitante.EMPRESA);
        $("#cpEstado").val(DadosSolicitante.ESTADO);
        $("#cpFuncao").val(DadosSolicitante.FUNCAO);
        $("#cpObraDep").val(DadosSolicitante.SECAO);
        $("#cpEmail").val(DadosSolicitante.EMAIL);
	},
	
	// Inicializa o formulario
	iniciar: function(atividade, formMode, User) {

	    if (atividade == 0) {
	        $("#cpDataAbertura").val(getDataAbertura());
			this.preencheSolicitante(this.getLogin(getUser()));
		}

		if (((atividade == 313) || (atividade == 45)) && (formMode != 'VIEW')) {
			this.toggleTransferenciaKm(true);
		}
		
		if (((atividade == 1) || (atividade == 374) || (atividade == 0) || (atividade == 141) || (atividade == 45) || (atividade == 313)) && (formMode != 'VIEW')) {
			// Ativa calendarios do fluig
			
			var calendarOptions = {
				useCurrent: false
			};
			
			FLUIGC.calendar('#cpDataTransporte', calendarOptions);
			FLUIGC.calendar('#cpDataTransporteVeic', calendarOptions);
			FLUIGC.calendar('#cpDataAuxilio', calendarOptions);
				
		} else {
			$(".openDatepicker").parent().remove();
		}

		if ($("#cpAvancoAutomatico").val() == 1) {
			this.completarDados(formMode);
		}
		
		// Muda estado da interface do formulário
		this.mudaEstado(atividade, formMode);
		
		// Comprime abas de parecer
		$('.collapse').collapse({toggle : false});
		
		this.destacaAprovacao();
		this.destacaAprovacaoGest();
		this.destacaAprovacaoAso();
		
		if (atividade != 0) {
			this.destacaPareceres() // Destaca aprovacoes com parecer
				.expandeParecer(atividade, formMode); // Expande aba de parecer da atividade atual
		}
		
		this.createTooltips();
		
		this.toggleBlockPreenchedor();
		
		this.toggleBlockRecolhedorASO();
		
		this.carregaHistoricos();
		
		if (formMode == "VIEW") {
		    this.escondeDadosTransferencia();
		}
		
		this.destacaCompetencia();
	},
	
	getHierarquiaOrigem: function() {
	  return [
	      $("#cpGestorOrigem").val(),
	      $("#cpGerenteGeralOrigem").val(),
	      $("#cpSuperintendenteOrigem").val(),
	      $("#cpDiretorOrigem").val()
	  ];
	},
	
	getHierarquiaDestino: function() {
	    return [
	        $("#cpGestorDestino").val(),
	        $("#cpGerenteGeralDestino").val(),
	        $("#cpSuperintendenteDestino").val(),
	        $("#cpDiretorDestino").val()
	    ];
	},
	
	escondeDadosTransferencia: function() {
	    var isTransferencia = $("#cpTransferencia").val() == 1;
	    if (isTransferencia) {
	        var user = getUser();
	        var solicitante = $("#cpMatriculaSolicitante").val();
	        var hierarquiaOrigem = this.getHierarquiaOrigem();
	        var hierarquiaDestino = this.getHierarquiaDestino();
	        
	        var blockearUsuario = hierarquiaOrigem.indexOf(user) > -1;
	        
	        var userIsAdminDestino = hierarquiaDestino.indexOf(user) > -1;
	        
	        var userIsSolicitante = user == solicitante;
	        
	        if ((blockearUsuario && !userIsAdminDestino) || userIsSolicitante) {
	            $("#blockMovimentacao").hide();
	        };
	    }
	},
	
	createTooltips: function() {
	    FLUIGC.popover('.hasTooltip',{trigger: 'hover', placement: 'auto'});
	},
	
	carregaHistoricos: function() {
	    
	    var historicos = ['histComplemento', 'histPreenchimento'];
	    
        var tpl = '<div class="row"><div class="col-md-2">Data: {{data}}</div></div>';
        tpl += '{{#mudancas}}';
        tpl += '<div class="row">';
        tpl += '<div class="col-md-4">{{campo}}</div>';
        tpl += '<div class="col-md-4">{{valorAnterior}}</div>';
        tpl += '<div class="col-md-4">{{valorAtual}}</div>';
        tpl += '</div>';
        tpl += '{{/mudancas}}';
        
        var getLabelCampo = function(campo){
            var label = campo.parent().find('.input-group-addon');

            if (label.length == 0){label = $("[for=" + campo.attr('id') + ']');}
            
            return label.first().html();
        };
        
        var isSelect = function(campo) {
            return campo.get(0).tagName == 'SELECT';
        };
        
        var getLabelOption = function(campo, opcaoSelecionada) {
            return campo.find('option')
                        .toArray()
                        .find(function(opcao) {
                            return opcao.value == opcaoSelecionada;
                        }).innerHTML;
        };
        
        var carregaDadosMudanca = function(mudanca){
            var campo = $("#" + mudanca.campo);
            
            mudanca.campo = getLabelCampo(campo);
            
            if (isSelect(campo)) {
                var vAnterior = (mudanca.valorAnterior == '0') ? '' : getLabelOption(campo, mudanca.valorAnterior);
                var vAtual = (mudanca.valorAtual == '0') ? '' : getLabelOption(campo, mudanca.valorAtual);
                mudanca.valorAnterior = vAnterior;
                mudanca.valorAtual = vAtual;
            }
            
            return mudanca;
        };
        
        var filtraApagados = function(mudanca){
            return mudanca.valorAtual != '';
        };
        
        var carregaRegistro = function(){
            var row = $(this),
                campos = row.find('input'),
                mudancas = JSON.parse(campos.get(1).value);
            
            mudancas = mudancas.map(carregaDadosMudanca).filter(filtraApagados);
            
            var alteracoes = {
                data: campos.get(0).value,
                mudancas: mudancas
            };
            
            row.find('td').html(Mustache.render(tpl, alteracoes));
        };
        
        historicos.forEach(function(tabela){
            var registros = $("#" + tabela + " tbody tr:not(:first-child)");
            
            if (registros.length > 0) {
                registros.each(carregaRegistro);
                
            } else {
                $("#" + tabela).closest(".row").hide();
            }
        });
	}
};


var DatasetHelper = {
	getLogin: function(user) {
		var datasetReturn = getDatasetValues('colleague', {'colleaguePK.colleagueId': user});
		return datasetReturn[0]["login"];
	},
	
	getSolicitante: function(login) {
		var datasetReturn = DatasetFactory.getDataset("DS_FLUIG_0012", [login], null, null);
		return datasetReturn.values[0];
	},
	
    getDadosComplementares: function(chapa, coligada) {
        var datasetReturn = DatasetFactory.getDataset("DS_FLUIG_0003", [chapa, coligada], null, null);
        return datasetReturn.values[0];
    },
	
	getPeriodosAquisitivos: function(chapa, coligada) {
	    var datasetResult = DatasetFactory.getDataset("DS_FLUIG_0017", [chapa, coligada], null, null),
            periodos = datasetResult.values;
        periodos.reverse();
        return periodos;
	},
	
	getFeriasCadastradas: function(chapa, coligada, fimPeriodoAquisitivo) {
	    var datasetResult = DatasetFactory.getDataset("DS_FLUIG_0018", [chapa, coligada, fimPeriodoAquisitivo ], null, null);
	    return datasetResult.values;
	},
	
	getSituacao: function(chapa, coligada) {
        var datasetResult = this.getDadosComplementares(chapa, coligada);
        return {
            codigo: datasetResult.CODINTERNOSITUACAO,
            texto: datasetResult.SITUACAO
        };
	},
	
	getTipoMaoObra: function(coligada, funcao) {
	    datasetResult = DatasetFactory.getDataset("DS_FLUIG_0022", [coligada, funcao], null, null);
        return datasetResult.values[0];
	}
};


var Utils = {
    converteData: function(dateString, toObj) {
        
        var converted = new Date(dateString.substring(0,10) + " 23:59:59");
        
        if (toObj) {
            return converted;
        }
        
        var dia = converted.getDate() > 9 ? converted.getDate() : '0' + converted.getDate(),
            mes = converted.getMonth() + 1 > 9 ? converted.getMonth() + 1 : '0' + (converted.getMonth() + 1);
            
        return dia + '/' + mes + '/' + converted.getFullYear();
    }
};


//Retorna data de abertura no formato dd/mm/aaaa
var getDataAbertura = function() {
	var hoje = new Date(getServerTime()),
		dd = hoje.getDate(),
		mm = hoje.getMonth() + 1;
    
    if (dd < 10) {
        dd = '0' + dd;
    }
    
    if (mm < 10) {
        mm = '0' + mm;
    }

    return dd + '/' + mm + '/' + hoje.getFullYear();
};

var isLastDayOfMonth = function(date) {
    var mesAtual = date.getMonth();
    date.setDate(date.getDate() + 1);
    
    return mesAtual == date.getDate();
};

// Retorna m?s de compet?ncia no formato mm/aaaa
var getMesCompetencia = function(mesesFerias) {
    
	var Transferencia = $("#cpTransferencia").val();
    var competencia = new Date();
    
    competencia.setDate(01);
	competencia.setMonth(competencia.getMonth() + 1);
/*	
	if(isLastDayOfMonth(competencia) && (competencia.getHours() > 17)){
		competencia.setMonth(competencia.getMonth() + 1);
	}*/
	
	if (mesesFerias && (((mesesFerias[0].mes <= competencia.getMonth()) && (mesesFerias[0].ano <= competencia.getFullYear())) || (mesesFerias[0].ano < competencia.getFullYear()))) {
        var fim = mesesFerias.pop()
        
        competencia.setMonth(fim.mes);
        competencia.setYear(fim.ano);
        
        competencia.setMonth(competencia.getMonth() + 1);
	}
	
	if (competencia.getMonth() === 11 && Transferencia=="1") {
	    competencia.setMonth(competencia.getMonth() + 1);
	    
	    
	}

	 var mes = competencia.getMonth() + 1;
	    
	    if (mes < 10) {
	        mes = '0' + mes;
	    }

	 return (mes + "/" + + competencia.getFullYear());
};