function gerarCadastroColaboradores()
{
	var avaliacaoGerada = "";
    var formData = new java.util.HashMap();

    formData.put("cpNumeroRequisicao", hAPI.getCardValue("cpNumeroSolicitacao"));
    formData.put("cpReqDepartamentoObra", hAPI.getCardValue("cpReqDepartamentoObra"));
    formData.put("cpReqCodSecao", hAPI.getCardValue("cpReqCodSecao"));
    formData.put("cpReqTipoSecao", hAPI.getCardValue("cpReqTipoSecao"));
    formData.put("cpReqEmpresaDescricao", hAPI.getCardValue("cpReqEmpresaDescricao"));
    formData.put("cpReqCodEmpresa", hAPI.getCardValue("cpReqCodEmpresa"));
    formData.put("cpReqEstado", hAPI.getCardValue("cpReqEstado"));
    formData.put("cpReqGestorNome", hAPI.getCardValue("cpReqGestorNome"));
    formData.put("cpReqGerenteGeralNome", hAPI.getCardValue("cpReqGerenteGeralNome"));
    formData.put("cpReqTipoMaoObra", hAPI.getCardValue("cpTipoMaoObra"));
    formData.put("cpReqResponsavelRecolhimento", hAPI.getCardValue("cpReqNomeResponsRecolhimento"));
    formData.put("cpResponsavelRecrutamentoSelec", hAPI.getCardValue("cpReqChapaResponsRecolhimento"));
    formData.put("cpResponsavelRecolhimentoObra", hAPI.getCardValue("cpReqChapaResponsRecolhimento"));
    formData.put("cpResponsavelAprovadorN1Candid", hAPI.getCardValue("cpMatriculaGestorObraDep"));
    formData.put("cpResponsavelAberturMovimentac", hAPI.getCardValue("cpMatriculaGestorObraDep"));
    formData.put("cpResponsavelExcecaoRH", hAPI.getCardValue("cpMatriculaConsultoraObraDep"));
    formData.put("cpResponsavelExcecaoN1", hAPI.getCardValue("cpMatriculaGestorObraDep"));
    formData.put("cpResponsavelExcecaoN2", hAPI.getCardValue("cpMatriculaGGObraDep"));
    formData.put("cpResponsavelExcecaoN3", hAPI.getCardValue("cpMatriculaSuperObraDep"));
    formData.put("cpResponsavelExcecaoN4", hAPI.getCardValue("cpMatriculaDiretorObraDep"));
    formData.put("cpCodObra", hAPI.getCardValue("cpCodObra"));

    
    formData.put("cpResponsavelDataAdmissao", hAPI.getCardValue("cpReqTipoSecao") == 'Sede' ? 'Pool:Role:DRH.112' : hAPI.getCardValue("cpMatriculaConsultoraObraDep"));
    
    //dados do solicitante
    formData.put("cpDataAbertura", hAPI.getCardValue("cpDataAbertura"));
    formData.put("cpSolicitanteNome", hAPI.getCardValue("cpSolicitanteNome"));
    formData.put("cpSolicitanteFuncao", hAPI.getCardValue("cpSolicitanteFuncao"));
    formData.put("cpSolicitanteEmpresa", hAPI.getCardValue("cpSolicitanteEmpresa"));
    formData.put("cpSolicitanteObraDep", hAPI.getCardValue("cpSolicitanteObraDep"));
    formData.put("cpSolicitanteEstado", hAPI.getCardValue("cpSolicitanteEstado"));
    formData.put("cpSolicitanteEmail", hAPI.getCardValue("cpSolicitanteEmail"));
    
    var indexes = getIndexes('cpVagaFuncao'); // quantidade pai x filho
    var iterator = indexes.iterator();

    var solicitacoesGeradas = '';

    while(iterator.hasNext())
    {
        var index = iterator.next();
        
        var funcao = hAPI.getCardValue("cpVagaFuncao___"+index);
        
        if (solicitacoesGeradas == '')
        {
        	solicitacoesGeradas = 'Função: ' + funcao;
        }
        else
        { 
        	solicitacoesGeradas = solicitacoesGeradas + '\n\nFunção: ' + funcao;
        }
       
	    //pai x filho
        formData.put("cpReqFuncao", funcao);
        formData.put("cpReqCodFuncao", hAPI.getCardValue("cpCodVagaFuncao___"+index));

        var salario = hAPI.getCardValue("cpAprovacaoRHASalarioAlterado___"+index);

        if(salario == '' || salario == '0,00')
        {
            salario = hAPI.getCardValue("cpVagaSalario___"+index);
        }
        
	    formData.put("cpReqSalario", salario);
	    formData.put("cpReqHorario", hAPI.getCardValue("cpVagaHorario___"+index));
	    formData.put("cpReTipoPosto", hAPI.getCardValue("cpTipoPostoTrabalho___"+index));
        formData.put("cpReqNomePostoTrabalho", hAPI.getCardValue("cpNomePostoTrabalho___"+index));
        formData.put("cpCodNomePostoTrabalho", hAPI.getCardValue("cpCodNomePostoTrabalho___"+index));
        
        var vagaQuantidade = hAPI.getCardValue("cpVagaQuantidade___"+index);
        
        for (var index = 1; index <= vagaQuantidade; index++) 
        {
            avaliacaoGerada = hAPI.startProcess("FLUIG-0237", 22, ["adm"], "Solicitação aberta automaticamente pelo processo: " + getValue("WKDef") + " Solicitação N.:" + getValue("WKNumProces"), true, formData, false);
            
            solicitacoesGeradas = solicitacoesGeradas + '\n' + avaliacaoGerada.get("iProcess") + ', ';
        }
        
    }

    hAPI.setCardValue( "cpSolicitacoesGeradas", solicitacoesGeradas );	
}