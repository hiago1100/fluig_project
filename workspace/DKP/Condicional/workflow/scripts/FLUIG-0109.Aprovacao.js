/*
	  2 - Reabertura da solicitação
	  16 - Conferência da solicitação de férias
	  11 - Aprovação do gestor
	  20 - Processamento das férias e envio do aviso/recibo
	  24 - Conferência e assinatura do aviso/recibo de férias
	  26 - Ajuste da solicitação de férias
	  40 - Substituição de colaborador em férias
	  88 - Integração RM
*/

function Reaberto()
{
	return hAPI.getCardValue("cpReaberturaChamado") == '1';
}

function GestorImediato()
{
	return hAPI.getCardValue("cpChapaGestorImediato") == '';
}

function AprovacaoGestor()
{
	return hAPI.getCardValue("cpAprovacaoGestor") == 1;
}

function SolicitacaoConferida()
{
	return hAPI.getCardValue("cpAprovacaoConfSolicitacao") == 1;
}

function Processado()
{
	return hAPI.getCardValue("cpAprovacaoProcessamento") == 1;
}

function Ajustado()
{
	return hAPI.getCardValue("cpAprovacaoAjustes") == 1;
}

function Conferido()
{
	return hAPI.getCardValue("cpAprovacaoConfAssinatura") == 1;
}

function Substituto()
{
	return hAPI.getCardValue("cpHaveraSubstituto") == 1;
}

function IntegrarNovamente()
{
	return hAPI.getCardValue("cpAprovacaoIntegracaoRM") == 1;
}

function TodosPeriodosFinalizados()
{
	var isTodosPeriodosFinalizados = true;
	var indexes = getIndexes('cpFeriasIntegradaRM'); // quantidade pai x filho
    var iterator = indexes.iterator();

    while(iterator.hasNext())
    {
        var index = iterator.next();
        if(hAPI.getCardValue("cpFeriasIntegradaRM___"+index) == '0')
        {
        	isTodosPeriodosFinalizados = false;
        }
    }
    
    return isTodosPeriodosFinalizados;
}


