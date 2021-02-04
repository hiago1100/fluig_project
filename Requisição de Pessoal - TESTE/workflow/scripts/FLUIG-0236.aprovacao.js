function isAprovadoConsultoriaRh()
{
	return hAPI.getCardValue("cpAprovacaoRH") == '1' || hAPI.getCardValue("cpAprovacaoRH") == '3';
}

function isAprovadoRemuneracao()
{
	return hAPI.getCardValue("cpAprovacaoRemuneracao") == '1' || hAPI.getCardValue("cpAprovacaoRemuneracao") == '3';
}

function isAprovadoGestorRh()
{
	return hAPI.getCardValue("cpAprovacaoGestorRH") == '1' || hAPI.getCardValue("cpAprovacaoGestorRH") == '3';
}

function isAprovadoN1()
{
	return hAPI.getCardValue("cpAprovacaoN1") == '1';
}

function isAprovadoN2()
{
	return hAPI.getCardValue("cpAprovacaoN2") == '1';
}

function isAprovadoN3()
{
	return hAPI.getCardValue("cpAprovacaoN3") == '1';
}

function isAprovadoN4()
{
	return hAPI.getCardValue("cpAprovacaoN4") == '1';
}

function isReaberto()
{
	return hAPI.getCardValue("cpReaberturaChamado") == '1';
}

function isN1Obra()
{
	return hAPI.getCardValue("cpMatriculaGestorObraDep") == hAPI.getCardValue("cpMatriculaSolicitante");
}

function isN2Obra()
{
	return hAPI.getCardValue("cpMatriculaGGObraDep") == hAPI.getCardValue("cpMatriculaSolicitante");
}

function isN3Obra()
{
	return hAPI.getCardValue("cpMatriculaSuperObraDep") == hAPI.getCardValue("cpMatriculaSolicitante");
}

function isN4Obra()
{
	return hAPI.getCardValue("cpMatriculaDiretorObraDep") == hAPI.getCardValue("cpMatriculaSolicitante");
}

function tipoMaoObra()
{
	return hAPI.getCardValue("cpTipoMaoObra");
}

function n1Aprova()
{
	return !isN1Obra() && !isN2Obra() && !isN3Obra() && !isN4Obra() && aprovadornN1() != '';
}

function n2Aprova()
{
	return !isN2Obra() && !isN3Obra() && !isN4Obra() && aprovadornN2() != ''  && (aprovadornN1() != aprovadornN2());
}

function n3Aprova()
{
	return !isN3Obra() && !isN4Obra()  && tipoMaoObra() != 'Produção' && 
	tipoMaoObra() != 'Encarregado de produção' && aprovadornN3() != '' && 
	(aprovadornN2() != aprovadornN3()) && (aprovadornN1() != aprovadornN3());	
}

function n4Aprova()
{
	return !isN4Obra() && tipoMaoObra() == 'Estratégico' && aprovadornN4() != '' && 
	(aprovadornN2() != aprovadornN4()) && (aprovadornN1() != aprovadornN4()) && (aprovadornN3() != aprovadornN4());
}

function SemAprovacao()
{
	return true;	
}

function isTiServicoErroResolvido()
{
	return hAPI.getCardValue("cpTiErroServico");
}

function aprovadornN1()
{
	return hAPI.getCardValue("cpMatriculaGestorObraDep");
}

function aprovadornN2()
{
	return hAPI.getCardValue("cpMatriculaGGObraDep");
}

function aprovadornN3()
{
	return hAPI.getCardValue("cpMatriculaSuperObraDep");
}

function aprovadornN4()
{
	return hAPI.getCardValue("cpMatriculaDiretorObraDep");
}













