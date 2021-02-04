/* function getDadosGestaoChamadosTi(numAtividadeIntegracao) {
	var dadosSolicitante = getDadosSolicitante();
	var dadosCategoria = getCategoria();
	var matriculaFluig = getMatriculaFluig();

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

		APROVADOR_NEGOCIO: '' + dadosCategoria.getValue(0, "COD_APROVACAONEGOCIO") == 1 ? 'Pool:Role:' + dadosCategoria.getValue(0, "APROVADOR_NEGOCIO") : dadosCategoria.getValue(0, "APROVADOR_NEGOCIO") + '',
		PAPEL_ATENDIMENTO_N2: '' + dadosCategoria.getValue(0, "ID_TIPO_APROVACAO_N2") == 1 ? 'Pool:Role:' + dadosCategoria.getValue(0, "APROVADOR_N2") : dadosCategoria.getValue(0, "APROVADOR_N2") + '',
		PAPEL_ATENDIMENTO_N1: '' + dadosCategoria.getValue(0, "ID_TIPO_APROVACAO_N1") == 1 ? 'Pool:Role:' + dadosCategoria.getValue(0, "APROVADOR_N1") : dadosCategoria.getValue(0, "APROVADOR_N1") + '',
		EXECUTOR_CONFERENCIA: '' + matriculaFluig.getValue(0, "USER_CODE") + '',
		SLA_N1: '' + '00' + dadosCategoria.getValue(0, "SLA_N1") + ':00' + '',
		SLA_N2: '' + '00' + dadosCategoria.getValue(0, "SLA_N2") + ':00' + '',
		SLA_FORNECEDOR_CATALOGO: '' + '00' + dadosCategoria.getValue(0, "SLA_FORNECEDOR") + ':00' + '',
		SLA_FORNECEDOR_CALCULADA: '' + calculaSLAFornecedor(dadosCategoria.getValue(0, "SLA_FORNECEDOR")) + '',
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
		REQ_FLUIG_ERRO_PROCESSO: '' + getProcessos() + '',
		DESCRICAO_DETALHADA: 'Erro na integração de cadastro de pedido - Atividade ' + numAtividadeIntegracao + ''
	}

	return dados
}

function getDadosSolicitante() {
	var RoleDatasets = DatasetFactory.getDataset("workflowColleagueRole", null, null, null).values;
	var CollegueDatasets = DatasetFactory.getDataset("colleague", null, null, null).values;
	var loginUsuario = '';

	RoleDatasets.forEach(function (papel) {
		var papelObra = 'Pool:Role:DSUP.008'
		var CodUsuario = papel[1];
		var CodPapel = papel[2];

		if ('Pool:Role:' + CodPapel == papelObra) {
			CollegueDatasets.forEach(function (dadoUsuario) {
				var matriculaUsuario = dadoUsuario[1];
				if (CodUsuario == matriculaUsuario) {
					loginUsuario = dadoUsuario[4]
				}
			})
		}

	})
	var dados = DatasetFactory.getDataset('DS_FLUIG_1000', ["SP_FLUIG_1000", "'" + loginUsuario + "'"], null, null)
	return dados
}

function getCategoria() {
	var dados = DatasetFactory.getDataset('DS_FLUIG_1000', ["SP_GCTI_CATEGORIA", "2"], null, null).values

	var categoria = dados.filter(function (dado) {
		return dado[1] == 'FLUIG'
	})

	var codCategoria = categoria[0][0]
	var dadosCategoria = DatasetFactory.getDataset('DS_FLUIG_1000', ["SP_GCTI_SUBCATEGORIA", codCategoria + ',2'], null, null)


	return dadosCategoria
}

function getMatriculaFluig() {
	var dadosSolicitante = getDadosSolicitante();

	var matricula = DatasetFactory.getDataset('DS_FLUIG_1000', ["SP_FLUIG_1073", "'" + dadosSolicitante.getValue(0, 'CODUSUARIOREDE') + "'"], null, null)

	return matricula
}

function calculaSLAFornecedor(sla, dataEstimada) {

	if (sla) {
		var dataEstimativa = isEmpty(dataEstimada) ? GetDateNow() : dataEstimada;
		var dataEstimativa = new Date(ConvertDatePTtoUS(dataEstimativa) + ' 00:00:00');
		var horasEstimadas = Math.abs(dataEstimativa - new Date(ConvertDatePTtoUS(GetDateNow()) + ' 00:00:00'));

		var horasEstimadasTotais = parseInt(horasEstimadas) + parseInt(sla)

		if (horasEstimadasTotais.toString().length == 1) {
			return '00' + horasEstimadasTotais + ':00';
		}
		else if (horasEstimadasTotais.toString().length == 2) {
			return '0' + horasEstimadasTotais + ':00';
		}
		else {
			return horasEstimadasTotais + ':00';
		}
	}
}

function getProcessos() {

	var c = DatasetFactory.createConstraint("userSecurityId", "adm", "adm", ConstraintType.MUST);
	var c1 = DatasetFactory.createConstraint("active", true, true, ConstraintType.MUST);
	var constraints = new Array(c, c1);
	var dados = DatasetFactory.getDataset('processDefinition', null, constraints, null).values
	var descricaoProcesso;

	dados.forEach(function (dado) {
		if(dado[4] == 'FLUIG-0233'){
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

var isEmpty = function (value) {
	return (!value || 0 === value.length);
}

var ConvertDatePTtoUS = function (data) {
	if (!data) {
		return data;
	}

	var dt = data.slice(0, 10).split('/');

	return dt[2] + '-' + dt[1] + '-' + dt[0];
} */