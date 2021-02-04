function ehObra417() {

	var obra = hAPI.getCardValue("cpAuxRegraSolicAcesso");

	if (obra == 'StartWithObra') {
		//segue para solicitacao de acessos especificos
		return true;

	} else if (obra == 'NotStartWithObra') {
		//segue para solicitacao de acessos gestor
		return false;
	}

};

function acessosEspecificos() {

	var acessoUau = hAPI.getCardValue('cpNecessidadeUAU');
	var acessoPastaRede = hAPI.getCardValue('cpNecessidadePastas');
	var acessoRM = hAPI.getCardValue('cpNecessidadeRM');

	if ((acessoUau == '1' || acessoPastaRede == '1') && acessoRM == '2') {
		//segue para criacao de acessos especifcos solicitados - ti
		return 0;

	} else if (acessoUau == '2' && acessoPastaRede == '2' && acessoRM == '2') {
		//atividade fim
		return 1;

	} else if (acessoRM == '1') {
		//segue para aprovacao do gestor do dp
		return 2;
	} else {
		return 3;
	}

};


function acessoEspecificoParceiro() 
{
	if(hAPI.getCardValue("cpNecessidadeRM2") == '1') 
	{
		//segue para aprovacao do gestor do dp
		return 3;
	} 
	else if (hAPI.getCardValue("cpNecessidadeUAU2") == '1' || hAPI.getCardValue("cpNecessidadePastas2") == '1')
	{
		//segue para criacao de acessos especifcos solicitados - ti
		return 1;
	} 
	else 
	{
		//atividade fim
		return 2;
	}
}

function aprovacaoDoGestorDP() {

	var retornoAprovacao = hAPI.getCardValue('cpAprovacaoGestorDP');

	if (retornoAprovacao == "1") {
		return true;
	}
	else {
		return false;
	}
}


function criacaoAcessosEspecificos() {

	var criacaoAcessoEspec = hAPI.getCardValue('cpAprovacaoCriacao');

	if (criacaoAcessoEspec == '1') {
		//Confirmacao de atendimento - gestor
		return 1;

	} else if (criacaoAcessoEspec == '3') {
		//Aprovacao especifica - Responsavel da area
		return 3;

	} else if (criacaoAcessoEspec == '2') {
		//solicitacao de acessos especificos - gestor ou solicitacao de acessos especificos parceiro
		return 2;
	}

};

function confirmacaoAtendimento() {
	var isOk = hAPI.getCardValue('cpConfirmacao');

	if (isOk == '1') {
		return true;
	}
	else {
		return false;
	}
}

function possuiGerenteGeral() {
	var cpChapaGerenteGeral = hAPI.getCardValue('cpChapaGerenteGeral');
	cpChapaGerenteGeral = cpChapaGerenteGeral.toString();
	
	return cpChapaGerenteGeral != '';
}

function possuiSuperintendente() {
	var cpChapaSuperintendente = hAPI.getCardValue('cpChapaSuperintendente');
	cpChapaSuperintendente = cpChapaSuperintendente.toString();

	return cpChapaSuperintendente != '';
}

function gerenteGeralAprova() {
	return hAPI.getCardValue('cpAprovacaoGerenteGeral') == "1";
}

function superintendenteAprova() {
	return hAPI.getCardValue('cpAprovacaoSuperintendente') == "1";
}



function isAprovacaoAreaEspecifica() {
	return (hAPI.getCardValue("cpAprovacaoResponsavel") == '1' || hAPI.getCardValue("cpAprovacaoResponsavel") == '3');
}