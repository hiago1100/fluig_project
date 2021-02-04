function setSlaAtividade(atividade, colleagueId)
{
	var horaDoPrazo = '';
	var prazoFormulario = '';
	
	if (atividade == 11) //Cadastro do Kit Admissional - área CSC Cadastro
	{
        var prazoFormulario = hAPI.getCardValue('cpSlaCadastroKit');
        var horaDoPrazo = (12*60*60);
    }  	
	else if (atividade == 12 || atividade == 15) //  Assinatura do Kit Admissional
	{
		if(hAPI.getCardValue('cpReqTipoSecao') == 'Obra' && (hAPI.getCardValue('cpReqTipoMaoObra') == 'Produção' || hAPI.getCardValue('cpReqTipoMaoObra') == 'Encarregado de produção'))
		{
			prazoFormulario = hAPI.getCardValue('cpRecolhimentoObraDataAdmissao');
		}
		else
		{
			prazoFormulario = hAPI.getCardValue('cpRecolhimentoSedeDataAdmissao');
		}
		
		horaDoPrazo = atividade == 12 ? (12*60*60): (18*60*60);
    }
    
    if (prazoFormulario != undefined && prazoFormulario != '') 
    {
        var numeroDaSolicitacao = getValue('WKNumProces');
        var threadDaSolicitacao = 0;
        var responsavelPelaTarefa = colleagueId;
         
        var arrayPrazoConclusao = prazoFormulario.split("/");
        var dia = arrayPrazoConclusao[0]; 
        var mes = arrayPrazoConclusao[1] - 1;
        var ano = arrayPrazoConclusao[2];
         
        var dataDoPrazo = new Date();
        dataDoPrazo.setDate(dia);
        dataDoPrazo.setMonth(mes);
        dataDoPrazo.setFullYear(ano);
         
        hAPI.setDueDate(numeroDaSolicitacao, threadDaSolicitacao, responsavelPelaTarefa, dataDoPrazo, horaDoPrazo);
    }
}