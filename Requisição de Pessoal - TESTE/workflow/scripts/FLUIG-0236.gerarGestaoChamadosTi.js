function getDadosGestaoChamadosTi(numAtividadeIntegracao, loginUsuario) {
	var dadosSolicitante = getDadosSolicitante(loginUsuario);
	var dadosCategoria = getCategoria();
	var matriculaFluig = getMatriculaFluig(loginUsuario);

	var mensagem = 'Erro na integração do processo {0} - Versão: {1} - Atividade: {2} - {3} - usuario: {4}';

	mensagem = mensagem.replace("{0}", getValue("WKDef"));
	mensagem = mensagem.replace("{1}", getValue("WKVersDef"));
	mensagem = mensagem.replace("{2}", numAtividadeIntegracao);
	mensagem = mensagem.replace("{3}", '');
	mensagem = mensagem.replace("{4}", getValue("WKUser"));

	var dados = {

		DATA_ABERTURA: '' + GetDateNow() + '',
		NOME_SOLICITANTE: '' + dadosSolicitante.getValue(0, "NOME") + '',
		FUNCAO_SOLICITANTE: '' + dadosSolicitante.getValue(0, "FUNCAO") + '',
		EMPRESA_SOLICITANTE: '' + dadosSolicitante.getValue(0, "EMPRESA") + '',
		OBRA_DEP_SOLICITANTE: '' + dadosSolicitante.getValue(0, "SECAO") + '',
		ESTADO_SOLICITANTE: '' + dadosSolicitante.getValue(0, "ESTADO") + '',
		EMAIL_SOLICITANTE: '' + dadosSolicitante.getValue(0, "EMAIL") + '',
		MATRICULA_SOLICITANTE: '' + dadosSolicitante.getValue(0, "CHAPA") + '',
		MATRICULA_GESTOR_SOLICITANTE: '' + dadosSolicitante.getValue(0, "CHAPA_GESTOR") + '',
		MATRICULA_GG_SOLICITANTE: '' + dadosSolicitante.getValue(0, "CHAPA_GG") + '',
		MATRICULA_SUPER_SOLICITANTE: '' + dadosSolicitante.getValue(0, "CHAPA_SUP") + '',
		MATRICULA_DIRETOR_SOLICITANTE: '' + dadosSolicitante.getValue(0, "CHAPA_DIRETOR") + '',

		MATRICULA_GESTOR_REQUISITANTE: '' + dadosSolicitante.getValue(0, "CHAPA_GESTOR") + '',
		MATRICULA_GG_REQUISITANTE: '' + dadosSolicitante.getValue(0, "CHAPA_GG") + '',
		MATRICULA_SUPER_REQUISITANTE: '' + dadosSolicitante.getValue(0, "CHAPA_SUP") + '',
		MATRICULA_DIRETOR_REQUISITANTE: '' + dadosSolicitante.getValue(0, "CHAPA_DIRETOR") + '',
		SECAO_REQUISITANTE: '' + dadosSolicitante.getValue(0, "CODSECAO") + '',

		APROVADOR_NEGOCIO: '' + 'Pool:Role:' + dadosCategoria.getValue(0, "COD_APROVACAONEGOCIO") + '',
		PAPEL_ATENDIMENTO_N2: '' + 'Pool:Role:' + dadosCategoria.getValue(0, "PAPELATENDIMENTO") + '',
		PAPEL_ATENDIMENTO_N1: '' + 'Pool:Role:' + dadosCategoria.getValue(0, "APROVADOR_N1") + '',
		EXECUTOR_CONFERENCIA: '' + matriculaFluig.getValue(0, "USER_CODE") + '',
		SLA_N1: '' + formataHoraSLA(dadosCategoria.getValue(0, "SLA_N1")) + '',
		SLA_N2: '' + formataHoraSLA(dadosCategoria.getValue(0, "SLA_N2")) + '',
		SLA_FORNECEDOR_CATALOGO: '' + formataHoraSLA(dadosCategoria.getValue(0, "SLA_FORNECEDOR")) + '',
		SLA_FORNECEDOR_CALCULADA: '' + calculaSLAFornecedor(dadosCategoria.getValue(0, "SLA_FORNECEDOR"), '') + '',
		MATRICULA_COLABORADOR_FLUIG: '' + matriculaFluig.getValue(0, "USER_CODE") + '',
		COD_SUBCATEGORIA: dadosCategoria.getValue(0, "COD_SUBCATEGORIA"),

		NOME_COLABORADOR: '' + dadosSolicitante.getValue(0, "NOME") + '',
		FUNCAO_COLABORADOR: '' + dadosSolicitante.getValue(0, "FUNCAO") + '',
		EMPRESA_COLABORADOR: '' + dadosSolicitante.getValue(0, "EMPRESA") + '',
		OBRA_DEP_COLABORADOR: '' + dadosSolicitante.getValue(0, "SECAO") + '',
		ESTADO_COLABORADOR: '' + dadosSolicitante.getValue(0, "ESTADO") + '',
		EMAIL_COLABORADOR: '' + dadosSolicitante.getValue(0, "EMAIL") + '',
		USUARIO_REDE_COLABORADOR: '' + dadosSolicitante.getValue(0, "CODUSUARIOREDE") + '',
		MATRICULA_COLABORADOR: '' + dadosSolicitante.getValue(0, "CHAPA") + '',
		CPF_COLABORADOR: '' + dadosSolicitante.getValue(0, "CPF") + '',
		NOME_GESTOR_COLABORADOR: '' + dadosSolicitante.getValue(0, "NOME_GESTOR") + '',
		LOCAL_COLABORADOR: 'SEDE',
		TELEFONE1_COLABORADOR: '3134315500',

		TIPO_REQUISICAO: 'Problema',
		PESQUISAR_SOLICITACOES: '' + dadosCategoria.getValue(0, "CATEGORIA") + ' - ' + dadosCategoria.getValue(0, "SUBCATEGORIA") + '',
		CATEGORIA: '' + dadosCategoria.getValue(0, "CATEGORIA") + '',
		COD_CATEGORIA: '' + dadosCategoria.getValue(0, "COD_CATEGORIA") + '',
		SERVICO: '' + dadosCategoria.getValue(0, "SUBCATEGORIA") + '',
		AREA: '' + dadosCategoria.getValue(0, "AREA") + '',
		REQ_FLUIG_ERRO_NUMERO_SOLICITACAO: '' + getValue("WKNumProces") + '',
		REQ_FLUIG_ERRO_PROCESSO: '' + getDescricaoProcesso() + '',
		DESCRICAO_DETALHADA: mensagem
	}

	return dados
}

function getDadosSolicitante(loginUsuario) {
	return DatasetFactory.getDataset('DS_FLUIG_1000', ["SP_FLUIG_1000", "'" + loginUsuario + "'"], null, null);
}

function getCategoria() {
	var cod = 347; // codigo do serviço no catalogo de serviços GCTI
	return DatasetFactory.getDataset('DS_FLUIG_1000', ["sp_GCTI_CATALOGO_DE_SERVICOS_POR_COD_SUBCATEGORIA", "'" + cod + "'"], null, null);
}

function getMatriculaFluig(loginUsuario) {
	var matricula = DatasetFactory.getDataset('DS_FLUIG_1000', ["SP_FLUIG_1073", "'" + loginUsuario + "'"], null, null);

	return matricula;
}

function calculaSLAFornecedor(sla, dataEstimada) {

	if (sla) {
		var dataEstimativa = isEmpty(dataEstimada) ? GetDateNow() : dataEstimada;
		var dataHoje = GetDateNow().substring(3, 5) + '/' + GetDateNow().substring(0, 2) + '/' + GetDateNow().substring(6, 10);

		dataEstimativa = dataEstimativa.substring(3, 5) + '/' + dataEstimativa.substring(0, 2) + '/' + dataEstimativa.substring(6, 10);

		dataEstimativa = new Date(dataEstimativa);

		var horasEstimadas = Math.abs(dataEstimativa - new Date(dataHoje));

		var horasEstimadasTotais = parseInt(horasEstimadas) + parseInt(sla)

		return formataHoraSLA(horasEstimadasTotais)
	}
}

function getDescricaoProcesso() {

	var c = DatasetFactory.createConstraint("userSecurityId", "adm", "adm", ConstraintType.MUST);
	var c1 = DatasetFactory.createConstraint("active", true, true, ConstraintType.MUST);
	var constraints = new Array(c, c1);
	var dados = DatasetFactory.getDataset('processDefinition', null, constraints, null).values
	var descricaoProcesso;

	dados.forEach(function (dado) {
		if (dado[4] == getValue("WKDef")) {
			descricaoProcesso = dado[15]
		}
	})

	return descricaoProcesso
}

function GetDateNow() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; //January is 0!
	var yyyy = today.getFullYear();

	if (dd < 10) dd = '0' + dd;
	if (mm < 10) mm = '0' + mm;

	var today = dd + '/' + mm + '/' + yyyy;
	return today;
}

function isEmpty(value) {
	return (!value || 0 === value.length);
}

function ConvertDatePTtoUS(data) {
	if (!data) {
		return data;
	}

	var dt = data.slice(0, 10).split('/');
	return dt[2] + '-' + dt[1] + '-' + dt[0];
}

function formataHoraSLA(hora) {
	if (String(hora).length == 1) {
		return '00' + hora + ':00';
	}
	else if (String(hora).length == 2) {
		return '0' + hora + ':00';
	}
	else {
		return hora + ':00';
	}
}

function startProcessFluigGcti(numAtividadeIntegracao, loginUsuario) {
	var dados = getDadosGestaoChamadosTi(numAtividadeIntegracao, loginUsuario);
	try {
		var p = new java.util.HashMap();
		p.put("cpDataAbertura", dados.DATA_ABERTURA);
		p.put("cpSolicitanteNome", dados.NOME_SOLICITANTE);
		p.put("cpSolicitanteFuncao", dados.FUNCAO_SOLICITANTE);
		p.put("cpSolicitanteEmpresa", dados.EMPRESA_SOLICITANTE);
		p.put("cpSolicitanteObraDep", dados.OBRA_DEP_SOLICITANTE);
		p.put("cpSolicitanteEstado", dados.ESTADO_SOLICITANTE);
		p.put("cpSolicitanteEmail", dados.EMAIL_SOLICITANTE);

		p.put("cpMatriculaSolicitante", dados.MATRICULA_SOLICITANTE);
		p.put("cpMatriculaGestorSolicitante", dados.MATRICULA_GESTOR_SOLICITANTE);
		p.put("cpMatriculaGGSolicitante", dados.MATRICULA_GG_SOLICITANTE);
		p.put("cpMatriculaSuperSolicitante", dados.MATRICULA_SUPER_SOLICITANTE);
		p.put("cpMatriculaDiretorSolicitante", dados.MATRICULA_DIRETOR_SOLICITANTE);
		p.put("cpMatriculaGestorRequisitante", dados.MATRICULA_GESTOR_REQUISITANTE);
		p.put("cpMatriculaGGRequisitante", dados.MATRICULA_GG_REQUISITANTE);
		p.put("cpMatriculaSuperRequisitante", dados.MATRICULA_SUPER_REQUISITANTE);
		p.put("cpMatriculaDiretorRequisitante", dados.MATRICULA_DIRETOR_REQUISITANTE);
		p.put("cpSecaoRequisitante", dados.SECAO_REQUISITANTE);

		p.put("cpAprovadorNegocio", dados.APROVADOR_NEGOCIO);
		p.put("cpPapelAtendimentoN2", dados.PAPEL_ATENDIMENTO_N2);
		p.put("cpPapelAtendimentoN1", dados.PAPEL_ATENDIMENTO_N1);
		p.put("cpExecutorConferencia", dados.EXECUTOR_CONFERENCIA);
		p.put("cpSLAN1", dados.SLA_N1);
		p.put("cpSLAN2", dados.SLA_N2);
		p.put("cpSLAFornecedorCatalogo", dados.SLA_FORNECEDOR_CATALOGO);
		p.put("cpSLAFornecedorCalculada", dados.SLA_FORNECEDOR_CALCULADA);
		p.put("cpMatriculaColaboradorFluig", dados.MATRICULA_COLABORADOR_FLUIG);
		p.put("cpCodSubCategoria", dados.COD_SUBCATEGORIA);

		p.put("cpColaboradorNome", dados.NOME_COLABORADOR);
		p.put("cpColaboradorFuncao", dados.FUNCAO_COLABORADOR);
		p.put("cpColaboradorEmpresa", dados.EMPRESA_COLABORADOR);
		p.put("cpColaboradorObraDep", dados.OBRA_DEP_COLABORADOR);
		p.put("cpColaboradorEstado", dados.ESTADO_COLABORADOR);
		p.put("cpColaboradorEmail", dados.EMAIL_COLABORADOR);
		p.put("cpColaboradorUsuarioRede", dados.USUARIO_REDE_COLABORADOR);
		p.put("cpColaboradorMatricula", dados.MATRICULA_COLABORADOR);
		p.put("cpColaboradorCpf", dados.CPF_COLABORADOR);
		p.put("cpColaboradorGestorNome", dados.NOME_GESTOR_COLABORADOR);

		p.put("cpColaboradorLocal", dados.LOCAL_COLABORADOR);
		p.put("cpColaboradorTelefone1", dados.TELEFONE1_COLABORADOR);
		p.put("cpTipoRequisicao", dados.TIPO_REQUISICAO);
		p.put("cpPesquisarSolicitacoes", dados.PESQUISAR_SOLICITACOES);

		p.put("cpCategoria", dados.CATEGORIA);
		p.put("cpCodCategoria", dados.COD_CATEGORIA);
		p.put("cpServico", dados.SERVICO);
		p.put("cpArea", dados.AREA);

		p.put("cpReqFluigErroNumerSolicitacao", dados.REQ_FLUIG_ERRO_NUMERO_SOLICITACAO);
		p.put("cpReqFluigErroProcesso", dados.REQ_FLUIG_ERRO_PROCESSO);
		p.put("cpDescricaoDetalhada", dados.DESCRICAO_DETALHADA);

		return hAPI.startProcess("FLUIG-0223", '597', ['adm'], "Solicitação aberta automaticamente por erro no processo " + getValue("WKDef"), true, p, false)

	}
	catch (erro) {
		throw 'Ocorreu um erro na criação automática do processo FLUIG-0223 apartir do processo ' + getValue("WKDef") + ' - DESCRIÇÃO DO ERRO - ' + erro;
	}

}
