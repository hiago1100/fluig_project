/*FUNCOES RELACIONADAS AS INTEGRACOES DO FORMULARIO*/
$(document).ready(function () {
	const _zoom = zoom.getInstance();
	var atividade = parseInt(getWKNumState());
	var modo = getFormMode();

	//inicio e reabertura
	if ((atividade == 0) || (atividade == 4 || atividade == 10)) {
		//ZOOM QUE EMPRESA E OBRA DO UAU
		$("#zoomObraDepartamento").click(function () {
			let camposVisiveis = ['CODEMPRESA', 'EMPRESA', 'CNPJ']
			_zoom.get1007(camposVisiveis);
			//ZOOM.getInstance().GetTodosCentroCusto();
			$("#zoomObraColigada").prop("disabled", false);
			$("#cpNumEmpresa").val("");
			$("#cpObraDepartamento").val("");
			$("#cpEmpresa").val("");
		});

		//ZOOM QUE BUSCA EMPRESA DO RM 
		$("#zoomObraColigada").click(function () {
			//var ZoomBuscaObraDeptoSuper = ZoomBuscaObraDeptartamentoSuper();
			//ZoomBuscaObraDeptoSuper.Abrir();
			let camposVisiveis = ['CODEMPRESARM', 'EMPRESARM'];
			_zoom.get1061(camposVisiveis);
			// ZOOM.getInstance().GetEmpresasRM();

			//$("#cpDescColigada").val("");
			//$("#cpNumColigada").val("");

		});

		$("#cpCep").change(function () {
			CarregaosEndereco()
		});

		$("#cpCEPCorres").change(function () {
			CarregaosEndEmpresa()
		});

		$(document).on("change", ".cpGestorSecao", function (ev) {
			var $row = $(ev.target).closest('tr'),
				campos = $row.find('input'),
				//id da ordem de retorno do campo de pai e filho

				cpGestorSecao = campos.get(5).id;
			$("#cpCampoColaborador").val(cpGestorSecao);
			buscaGestor(cpGestorSecao, $row);
			VerificaAprovador(cpGestorSecao, $row)
		});

		$(document).on("change", ".cpGGSecao", function (ev) {
			var $row = $(ev.target).closest('tr'),
				campos = $row.find('input'),
				//id da ordem de retorno do campo de pai e filho

				cpGGSecao = campos.get(4).id;
			$("#cpCampoColaborador").val(cpGGSecao);
			buscaGG(cpGGSecao, $row);
			VerificaAprovador(cpGGSecao, $row)
		});

		$(document).on("change", ".cpSuperSecao", function (ev) {
			var $row = $(ev.target).closest('tr'),
				campos = $row.find('input'),
				//id da ordem de retorno do campo de pai e filho
				cpSuperSecao = campos.get(3).id;
			buscaSuper(cpSuperSecao, $row);
			$("#cpCampoColaborador").val(cpSuperSecao);
			VerificaAprovador(cpSuperSecao, $row)
		});

		$(document).on("change", ".cpDiretorSecao", function (ev) {
			var $row = $(ev.target).closest('tr'),
				campos = $row.find('input'),
				//id da ordem de retorno do campo de pai e filho

				cpDiretorSecao = campos.get(2).id;
			$("#cpCampoColaborador").val(cpDiretorSecao);
			buscaDiretor(cpDiretorSecao, $row);
			VerificaAprovador(cpDiretorSecao, $row)
		});
	}
	//controle
	if ((atividade == 37)) {

		$("#cpAprovarControle").change(function () {
			$("#zoomEmpreCodUau").prop("disabled", false);
		});

		//ZOOM QUE BUSCA EMPRESA DO RM 
		/*$("#zoomEmpreCodUau").click(function() {
			var ZoomObraUAU = ZoomBuscaObraUAU();
			ZoomObraUAU.Abrir();
			$("#cpEmpreCodUau").val("");	
			$("#cpCodObraUau").val("");
		});*/
		$("#zoomEmpreCodUau").click(function () {
			var CNPJ = LimpaCnpj($("#cpEmpresa").val());
			console.log(CNPJ)
			let camposVisiveis = ['CODOBRA', 'OBRA'];
			_zoom.get1063(camposVisiveis, CNPJ);
			// ZOOM.getInstance().GetEmpresaUAU(CNPJ);
			$("#cpEmpreCodUauPLan").val("");
			$("#cpCodObraUauPlan").val("");
		});
	}

	function LimpaCnpj(CNPJ) {
		return CNPJ.replace(/[^\d]+/g, '');
	}

	//Planejamento
	if ((atividade == 47)) {

		$("#cpAprovarPLanejamento").change(function () {
			$("#zoomEmpreCodPlan").prop("disabled", false);
		});

		//ZOOM QUE BUSCA EMPRESA DO RM 
		/*$("#zoomEmpreCodPlan").click(function() {
			var ZoomObraUAUCont = ZoomBuscaObraUAUCont();
			ZoomObraUAUCont.Abrir();
			$("#cpEmpreCodUauPLan").val("");
			$("#cpCodObraUauPlan").val("");
		});*/
		$("#zoomEmpreCodPlan").click(function () {
			var CNPJ = LimpaCnpj($("#cpEmpresa").val());
			let camposVisiveis = ['CODOBRA', 'OBRA'];
			_zoom.get1063(camposVisiveis, CNPJ);
			// ZOOM.getInstance().GetEmpresaUAU(CNPJ);
			$("#cpEmpreCodUauPLan").val("");
			$("#cpCodObraUauPlan").val("");
		});
	}

	//TI
	if ((atividade == 51)) {

		$("#cpAprovarTI").change(function () {
			$("#zoomEmpreRM").prop("disabled", false);
		});

		$('#zoomEmpreRM').click(() => {
			let camposVisiveis = ['CODEMPRESARM', 'EMPRESARM'];
			_zoom.get1061(camposVisiveis);
		});
		

		$("#zoomEmpreRM1").click(function () {
			let camposVisiveis = ['CODEMPRESA', 'EMPRESA'];
			_zoom.get1063(camposVisiveis)
			// ZOOM.getInstance().GetDadosUau();
			$("#cpEmpreCodUauPLan").val("");
			$("#cpCodObraUauPlan").val("");
		});

	}

	//FOLHA
	if ((atividade == 70)) {
		$("#zoomEmpreCodUauPlan").prop("disabled", false);
		$(document).on("click", ".buscaSecao", function (ev) {
			var $row = $(ev.target).closest('tr'),
				campos = $row.find('input'),
				//id da ordem de retorno do campo de pai e filho
				cpCodColigada = campos.get(6).id,
				cpSecaoFolha = campos.get(7).id,
				cpCodSecaFolha = campos.get(8).id;

			buscaObraRm(cpCodColigada, cpSecaoFolha, cpCodSecaFolha, $row);
		});

		$(document).on("click", ".BuscaRespFolha", function (ev) {
			var $row = $(ev.target).closest('tr'),
				campos = $row.find('input'),
				//id da ordem de retorno do campo de pai e filho
				cpRespoFolha = campos.get(9).id;
			buscaRespFolhaRm(cpRespoFolha, $row);
		});
	}

});

//ZOOM BUSCA OBRA DEPARTAMENTO UAU
function ZoomBuscaObraDepartamento() {

	var ZoomObraDepartamento = new Zoom();

	//ZoomObraDepartamento.FieldsName = new Array("cpLoginFluig");
	ZoomObraDepartamento.Id = "IDZoomObraDepartamento";
	ZoomObraDepartamento.DataSet = "DS_FLUIG_0133";
	ZoomObraDepartamento.Titulo = "Buscar Obra/Empresa";
	ZoomObraDepartamento.Linhas = [];
	ZoomObraDepartamento.Renderizado = false;

	ZoomObraDepartamento.Colunas = [{
			"title": "CodEmpresa",
			"name": "CODEMPRESA"
		},
		{
			"title": "Empresa",
			"name": "NOME_EMPRESA"
		},
		{
			"title": "CNPJ",
			"name": "CNPJ"
		}
	];

	ZoomObraDepartamento.Retorno = function (retorno) {

		$("#cpNumEmpresa").val(retorno[0]);
		$("#cpObraDepartamento").val(retorno[1]);
		$("#cpEmpresa").val(retorno[2]);
	};

	return ZoomObraDepartamento;

}

//ZOOM BUSCA EMPRESA RM
function ZoomBuscaObraDeptartamentoSuper() {

	var ZoomBuscaObraDeptoSuper = new Zoom();

	//ZoomBuscaObraDeptoSuper.FieldsName = null;
	ZoomBuscaObraDeptoSuper.Id = "IDZoomBuscaObraDeptoSuper";
	ZoomBuscaObraDeptoSuper.DataSet = "DS_FLUIG_0135";
	ZoomBuscaObraDeptoSuper.Titulo = "Buscar Obra Departamento";
	ZoomBuscaObraDeptoSuper.Linhas = [];
	ZoomBuscaObraDeptoSuper.Renderizado = false;

	ZoomBuscaObraDeptoSuper.Colunas = [{
			"title": "Empresa",
			"name": "CODEMPRESARM"
		},
		{
			"title": "Cod.Coligada",
			"name": "EMPRESARM"
		}
	];

	ZoomBuscaObraDeptoSuper.Retorno = function (retorno) {

		$("#cpDescColigada").val(retorno[1]);
		$("#cpNumColigada").val(retorno[0]);
	};

	return ZoomBuscaObraDeptoSuper;
}

//ZOOM BUSCA OBRA DEPARTAMENTO UAU
function ZoomBuscaObraUAU() {

	var ZoomObraUAU = new Zoom();

	//ZoomObraDepartamento.FieldsName = new Array("cpLoginFluig");
	ZoomObraUAU.Id = "IDzoomEmpreCodUau";
	ZoomObraUAU.DataSet = "DS_FLUIG_0123";
	ZoomObraUAU.Titulo = "Buscar Obra/Empresa";
	ZoomObraUAU.Linhas = [];
	ZoomObraUAU.Renderizado = false;

	ZoomObraUAU.Colunas = [{
			"title": "Cod.Obra",
			"name": "CODOBRA"
		},
		{
			"title": "Obra",
			"name": "OBRA"
		},
		{
			"title": "Cod.Empresa",
			"name": "CODEMPRESA"
		}
	];

	ZoomObraUAU.Retorno = function (retorno) {

		$("#cpEmpreCodUau").val(retorno[2]);
		$("#cpCodObraUau").val(retorno[0]);


	};

	return ZoomObraUAU;
}

//TRIGGER ZOOM OBRA DEPARTAMENTO

//ZOOM BUSCA OBRA DEPARTAMENTO UAU
function ZoomBuscaObraUAUCont() {

	var ZoomObraUAUCont = new Zoom();

	//ZoomObraDepartamento.FieldsName = new Array("cpLoginFluig");
	ZoomObraUAUCont.Id = "zoomEmpreCodPlan";
	ZoomObraUAUCont.DataSet = "DS_FLUIG_0123";
	ZoomObraUAUCont.Titulo = "Buscar Obra/Empresa";
	ZoomObraUAUCont.Linhas = [];
	ZoomObraUAUCont.Renderizado = false;

	ZoomObraUAUCont.Colunas = [{
			"title": "Cod.Obra",
			"name": "CODOBRA"
		},
		{
			"title": "Obra",
			"name": "OBRA"
		},
		{
			"title": "Cod.Empresa",
			"name": "CODEMPRESA"
		}

	];

	ZoomObraUAUCont.Retorno = function (retorno) {

		$("#cpEmpreCodUauPLan").val(retorno[2]);
		$("#cpCodObraUauPlan").val(retorno[0]);

	};

	return ZoomObraUAUCont;
}

//ZOOM BUSCA EMPRESARM CODEMPRESARM
function ZoomBuscaEmpCodRM1() {

	var ZoomEmpCodRM = new Zoom();

	//ZoomObraDepartamento.FieldsName = new Array("cpLoginFluig");
	ZoomEmpCodRM.Id = "IDzoomEmpreRM";
	ZoomEmpCodRM.DataSet = "DS_FLUIG_0135";
	ZoomEmpCodRM.Titulo = "Buscar Cod/Empresa";
	ZoomEmpCodRM.Linhas = [];
	ZoomEmpCodRM.Renderizado = false;

	ZoomEmpCodRM.Colunas = [{
			"title": "Cod.Empresa",
			"name": "CODEMPRESARM"
		},
		{
			"title": "Empresa",
			"name": "EMPRESARM"
		}

	];

	ZoomEmpCodRM.Retorno = function (retorno) {

		$("#cpDescColi").val(retorno[1]);
		$("#cpNumcoligadaTI").val(retorno[0]);

	};

	return ZoomEmpCodRM;
}

//ZOOM PARA BUSCAR OS DADOS DO DA SECAO NA ATIVIDADE DA FOLHA
var buscaObraRm = function (cpCodColigada, cpSecaoFolha, cpCodSecaFolha, $row) {

	/*var z = new Zoom();
	z.Id = "IDzoomBuscaSecao";
	z.DataSet = "DS_FLUIG_0122";
	z.Titulo = "Buscar Obras RM";
	z.Colunas = [
	             {"title" : "Seção", "name" : "SECAO"},
	             {"title" : "Cod.Seção", "name" : "CODSECAO"},
	             {"title" : "Cod.Coligada", "name" : "CODCOLIGADA"}
	             ];	

	z.Retorno = function(retorno){
		$("#" + cpCodColigada).val(retorno[2]);
		$("#" + cpSecaoFolha).val(retorno[0]);
		$("#" + cpCodSecaFolha).val(retorno[1]);

	};
	z.Abrir();*/

	sessionStorage.setItem('cpCodColigada', cpCodColigada);
	sessionStorage.setItem('cpSecaoFolha', cpSecaoFolha);
	sessionStorage.setItem('cpCodSecaFolha', cpCodSecaFolha);
	let camposVisiveis = ['SECAO', 'CODSECAO', 'CODCOLIGADA']
	_zoom.get1004(camposVisiveis)
	//ZOOM.getInstance().GetTodosSecaoAtivas();

};

//ZOOM PARA BUSCAR OS DADOS DO DA SECAO NA ATIVIDADE DA FOLHA
var buscaRespFolhaRm = function (cpRespoFolha, $row) {
	/*
	var z = new Zoom();
	z.Id = "IDzoomBuscaRespFolha";
	z.DataSet = "DS_FLUIG_0136";
	z.Titulo = "Responsável";
	z.Colunas = [
	             {"title" : "Nome", "name" : "NOME"}
	             ];
	z.Retorno = function(retorno){
		$("#" + cpRespoFolha).val("");
		$("#" + cpRespoFolha).val(retorno[0]);

	};
	z.Abrir();*/

	sessionStorage.setItem('cpRespoFolha', cpRespoFolha);
	let camposVisiveis = ['NOME', 'CHAPA']
	_zoom.get1065(camposVisiveis);
	//ZOOM.getInstance().GetbuscaRespFolhaRm();
};

//ZOOM PARA BUSCAR FUNC ATIVOS PARA GESTOR
var buscaGestor = function (cpGestorSecao, $row) {

	var filtro2 = document.getElementById(cpGestorSecao).value;
	if (filtro2 != "") {
		let camposVisiveis = ['NOME', 'CHAPA'];
		_zoom.get1062(camposVisiveis, filtro2);
		// ZOOM.getInstance().GetColaborador(filtro2);
	} else {
		window.parent.FLUIGC.message.alert({
			message: "Antes de Buscar, informe o nome ou a chapa do colaborador!",
			title: 'Erro',
			label: 'Ok'
		});

	}
};

//ZOOM PARA BUSCAR FUNC ATIVOS PARA GG
var buscaGG = function (cpGGSecao, $row) {

	var filtro = cpGGSecao;
	var filtro2 = document.getElementById(cpGGSecao).value;
	if (filtro2 != "") {
		let camposVisiveis = ['NOME', 'CHAPA'];
		_zoom.get1062(camposVisiveis, filtro2);
		//ZOOM.getInstance().GetColaborador(filtro2);
	} else {

		window.parent.FLUIGC.message.alert({
			message: "Antes de Buscar, informe o nome ou a chapa do colaborador!",
			title: 'Erro',
			label: 'Ok'
		});

	}
};


//ZOOM PARA BUSCAR FUNC ATIVOS PARA SUPER
var buscaSuper = function (cpSuperSecao, $row) {
	var filtro = cpSuperSecao;
	var filtro2 = document.getElementById(cpSuperSecao).value;
	if (filtro2 != "") {
		let camposVisiveis = ['NOME', 'CHAPA'];
		_zoom.get1062(camposVisiveis, filtro2);
		//ZOOM.getInstance().GetColaborador(filtro2);
	} else {

		window.parent.FLUIGC.message.alert({
			message: "Antes de Buscar, informe o nome ou a chapa do colaborador!",
			title: 'Erro',
			label: 'Ok'
		});

	}
};

//ZOOM PARA BUSCAR FUNC ATIVOS PARA DIRETOR buscaDiretor
var buscaDiretor = function (cpDiretorSecao, $row) {

	var filtro2 = $('#' + cpDiretorSecao).val();
	if (filtro2 != "") {
		let camposVisiveis = ['NOME', 'CHAPA'];
		_zoom.get1062(camposVisiveis, filtro2);
		//ZOOM.getInstance().GetColaborador(filtro2);
	} else {

		window.parent.FLUIGC.message.alert({
			message: "Antes de Buscar, informe o nome ou a chapa do colaborador!",
			title: 'Erro',
			label: 'Ok'
		});

	}
};

//DATA SET PARA RETORNAR OS DADOS DOS PROCESSOS DE PAGAMENTO

function CarregaosEndereco() {

	var CEP = $("#cpCep").val();

	if (CEP != "" && CEP.length >= 8) {
		var fields = new Array(CEP);

		var bairro = 0;
		var cep = 0;
		var cidade = 0;
		var Estado = 0;
		var Endereco = 0;

		try {

			var tabela = DatasetFactory.getDataset("DS_FLUIG_0150", fields, null, null);

			if (tabela.values.length > 0) {
				for (var i = 0; i < tabela.values.length; i++) {


					bairro = tabela.values[i].bairro.toString();
					cep = tabela.values[i].cep.toString();
					cidade = tabela.values[i].cidade.toString();
					Estado = tabela.values[i].Estado.toString();
					Endereco = tabela.values[i].Endereco.toString();


					$("#cpBairro").val(bairro);
					$("#cpCep").val(cep);
					$("#cpCidade").val(cidade);
					$("#cpEstado").val(Estado);
					$("#cpLogradouro").val(Endereco);

					VerifcaCampos();
				}
			}
		} catch (erro) {
			window.alert("CEP não encontrado");
			$(".CEP").val("");
			VerifcaCampos();
		}

		//return valor;
		return 0;
	} else {
		$(".CEP").val("");
		VerifcaCampos();
	}
}

function VerifcaCampos() {
	$(".CEP").each(function () {
		if (this.value != "") {
			$(this).attr("readonly", true);
		} else {
			$(this).attr("readonly", false);
		}
	});


}

//DATA SET PARA RETORNAR OS DADOS DOS PROCESSOS DE PAGAMENTO

function CarregaosEndEmpresa() {
	//FUNÇÃO DESATIVADA 
	/*
	var CEP = $("#cpCEPCorres").val();
	if(CEP!="" && CEP.length>=8){
	var fields = new Array(CEP);

	var bairro = 0;
	var cep = 0;
	var cidade = 0;
	var Estado = 0;
	var Endereco = 0;
	
	try {

		var tabela = DatasetFactory.getDataset("DS_FLUIG_0150", fields, null, null);

		if(tabela.values.length>0){
		for (var i = 0; i < tabela.values.length; i++) {
			
			
			bairro = tabela.values[i].bairro.toString();
			cep = tabela.values[i].cep.toString();
			cidade = tabela.values[i].cidade.toString();
			Estado = tabela.values[i].Estado.toString();
			Endereco = tabela.values[i].Endereco.toString();

				$("#cpBairroCorres").val(bairro);
				$("#cpCEPCorres").val(cep);
				$("#cpCidadeCorres").val(cidade);
				$("#cpEstadoCorres").val(Estado);
				$("#cpLogradouroCorres").val(Endereco);
				
				VerifcaCamposEmpresa();
		}
		}
	}

	catch (erro) {
		window.alert("CEP não encontrado");
		
		$(".CEPEmpresa").val("");
		VerifcaCamposEmpresa();
	}

	//return valor;
	return 0;
	}else{
		$(".CEPEmpresa").val("");
		VerifcaCamposEmpresa();
	}*/
}

function VerifcaCamposEmpresa() {
	$(".CEPEmpresa").each(function () {
		if (this.value != "") {
			$(this).attr("readonly", true);
		} else {
			$(this).attr("readonly", false);
		}
	});

}

function VerificaAprovador(FILTRO, $row) {
	var filtro = FILTRO;
	var filtro2 = document.getElementById(FILTRO).value;
	var fields = new Array(filtro2);
	var tabela = _model.get1062(filtro);
	//var tabela = Model.get_DS1000('SP_FLUIG_1062', 'david').values;

	if (tabela.values.length > 0) {} else {

		$("#" + FILTRO).val("");
	}

	//return valor;
}