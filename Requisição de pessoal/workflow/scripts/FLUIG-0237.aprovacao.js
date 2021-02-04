function isMaoObraAdmEstrategica()
{
	var tipoMaoObra = hAPI.getCardValue("cpReqTipoMaoObra");
	
	return tipoMaoObra == 'Administrativo' || tipoMaoObra == 'Estratégico';
}

function tipoRecrutamento()
{
	return hAPI.getCardValue("cpCadTipoRecrutamento");
}

function isAprovacaoN1()
{
	return hAPI.getCardValue("cpAprovacaoN1") == '1';
}

function isAprovacaoRecolhimentoSede()
{
	return hAPI.getCardValue("cpAprovacaoRecolhimentoSede");
}

function aprovacaoErroTI77()
{
	return hAPI.getCardValue("cpAprovacaoErroTI77");
}

function isAprovacaoErroTI170()
{
	return hAPI.getCardValue("cpAprovacaoErroTI170") == '1';
}

function isAprovacaoErroTI146()
{
	return hAPI.getCardValue("cpAprovacaoErroTI146") == '1';
}

function aprovacaoCadastroKit()
{
	return hAPI.getCardValue("cpAprovacaoCadastroKit");
}

function aprovacaoAssinaturaKit()
{
	return hAPI.getCardValue("cpAprovacaoAssinaturaKit");
}

function depoisMeioDia()
{
	var recolhimentoDataAdmissao = convertDatePTtoUS(hAPI.getCardValue("cpRecolhimentoDataAdmissao"));
	
	if(new Date(recolhimentoDataAdmissao) > new Date())
	{
		return true;
	}
	
	return (new Date().getHours() >= 12) && (new Date().getMinutes() > 0);
}

function isSede()
{
	return hAPI.getCardValue("cpReqTipoSecao").indexOf("Sede") > -1;
}

function aprovacaoCadastroCancelamento()
{
	return hAPI.getCardValue("cpAprovacaoCadastroCancelament");
}

function isAprovacaoExcecaoConsultorRH()
{
	return hAPI.getCardValue("cpAprovacaoExcecaoConsultorRH") == '1';
}

function isAprovacaoExcecaoGestorRH()
{
	return hAPI.getCardValue("cpAprovacaoExcecaoGestorRH") == '1';
}

function isAprovacaoExcecaoRemuneracao()
{
	return hAPI.getCardValue("cpAprovacaoExcecaoRemuneracao") == '1';
}

function isAprovacaoExcecaoAprovadorN1()
{
	return hAPI.getCardValue("cpAprovacaoExcecaoAprovadorN1") == '1';
}

function isAprovacaoExcecaoAprovadorN2()
{
	return hAPI.getCardValue("cpAprovacaoExcecaoAprovadorN2") == '1';
}

function isAprovacaoExcecaoAprovadorN3()
{
	return hAPI.getCardValue("cpAprovacaoExcecaoAprovadorN3") == '1';
}

function isAprovacaoExcecaoAprovadorN4()
{
	return hAPI.getCardValue("cpAprovacaoExcecaoAprovadorN4") == '1';
}

function isAprovacaoMovimentacao()
{
	return hAPI.getCardValue("cpAprovacaoMovimentacao") == '1';
}

function temAprovadorN2()
{
	return hAPI.getCardValue("cpResponsavelExcecaoN2") != '';
}

function temAprovadorN3()
{
	return hAPI.getCardValue("cpResponsavelExcecaoN3") != '';
}

function temAprovadorN4()
{
	return hAPI.getCardValue("cpResponsavelExcecaoN4") != '';
}

function isSalarioForaTabelaSalarial()
{
	return hAPI.getCardValue("cpCadExternoAltSalarioFaixa") == 'Sim';
}

function aprovadorN1()
{
	return hAPI.getCardValue("cpResponsavelExcecaoN1");
}

function aprovadorN2()
{
	return hAPI.getCardValue("cpResponsavelExcecaoN2");
}

function aprovadorN3()
{
	return hAPI.getCardValue("cpResponsavelExcecaoN3");
}

function aprovadorN4()
{
	return hAPI.getCardValue("cpResponsavelExcecaoN4");
}

function aprovacaoDataAdmissao()
{
	return hAPI.getCardValue("cpAprovacaoDataAdmissao");
}

