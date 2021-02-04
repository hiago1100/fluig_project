/*
	 * resumo das atividades
		0,1 - Inicio
		2 - Reabertura de processo
		14 - Aprovação - N1
        19 - Conferência da solicitação - Suprimentos
        199 - Executar API de retorno do fornecedor vencedor
        206 - Erro na integração 1
        20 - Realizar mapa de cotação no UAU
        200 - Executar API de retorno do fornecedor vencedor ******RETIRADA
        227 - Erro na integração 2 *******RETIRADA
        201 - Executar webservice de consulta de verba ******RETIRADA
        240 - Erro na integração 3 ******RETIRADA
		21 - Aprovação do fornecedor e Análise da verba - N1
		15 - Aprovação da compra / contratação - N2
		16 - Aprovação da compra / contratação - N3
        17 - Aprovação da compra / contratação - N4
        18 - Abertura do subprocesso de Liberação de Verba 
        150 - Executar API de validação da aprovação do fornecedor
        282 - Erro na integração 4
		22 - Lançamento da ordem de compra no UAU / Requisição de produto em estoque        
        23 - Conferência do atendimento - Solicitante        
        32 - Confirmar previsão do fornecedor
        313 - Lançamento da NF no UAU        	
*/

function AprovaReabertura() {
    var atividade;
    var ReaberturaAprovado = hAPI.getCardValue("cpReaberturaChamado") == '1'
    var ReaberturaReprovado = hAPI.getCardValue("cpReaberturaChamado") == '2'
    var papeis = [hAPI.getCardValue("cpPapelN1"), hAPI.getCardValue("cpPapelN2"), hAPI.getCardValue("cpPapelN3"), hAPI.getCardValue("cpPapelN4")]
    var vlrHierarquia = isHierarquiaPapel(papeis, hAPI.getCardValue("cpMatriculaSolicitante"))
    var isHierarquia = vlrHierarquia == 'PAPELN1' || vlrHierarquia == 'PAPELN2' || vlrHierarquia == 'PAPELN3' || vlrHierarquia == 'PAPELN4'
    
    if (ReaberturaReprovado) atividade = "FIM"
    else if (ReaberturaAprovado && isHierarquia || isHierarquia) atividade = "CONFERENCIA"
    else if (ReaberturaAprovado && !isHierarquia || !isHierarquia) atividade = "GESTOR"

    return atividade;
}

function AprovacaoN1() {
    return hAPI.getCardValue("cpAprovaN1") == '1';
}

function AprovaConfSuprimentos() {
    var atividade;
    var aprovado = hAPI.getCardValue("cpAprovaConfSuprimentos") == '1'
    var hasEstoque = hAPI.getCardValue("cpPossuiEstoque") == '1'

    if (!aprovado) atividade = "REABERTURA"
    else if (aprovado && hasEstoque) atividade = "APROVA_FORNECEDOR"
    else if ((aprovado && !hasEstoque) || aprovado) atividade = "INTEGRACAO"

    return atividade;
}

function AprovaIntegracao1() {
    var atividade;
    var aprovado = hAPI.getCardValue("cpAprovaIntegracao1") == '1';
    var integraNovamente = hAPI.getCardValue("cpIntegrarNovamente1") == '1';

    if (aprovado) atividade = 'MAPA_COTACAO'
    else if (!aprovado && integraNovamente) atividade = 'INTEGRACAO'
    else if (!aprovado && !integraNovamente) atividade = 'CONFERENCIA'

    return atividade
}

function AprovaMapaCotacao() {

    return hAPI.getCardValue("cpAprovaCotacao") == '1';
}

function AprovaCompraN1() {
    var atividade;
    var usuarioAprovador = getValue("WKUser");
    var isPedidoMenorAlcada15 = verificarPedidoMenorQueAlcada('cpAlcada_15');
    var isPedidoMenorAlcada16 = verificarPedidoMenorQueAlcada('cpAlcada_16');
    var isPedidoMenorAlcada17 = verificarPedidoMenorQueAlcada('cpAlcada_17');   
    var hasSaldoOrcadoNegativo = hAPI.getCardValue("hasSaldoOrcadoNegativo") == '1';
    var aprovado = hAPI.getCardValue("cpAprovaFornecedoreVerba") == '1';
    var possuiEstoque = hAPI.getCardValue("cpPossuiEstoque") == '1';
    var ehServico = hAPI.getCardValue("cpTipoSolicitacao") == '2';
    var toMapa = hAPI.getCardValue("cpReprovaFornecedoreVerba") == '1';
    var toReabertura = hAPI.getCardValue("cpReprovaFornecedoreVerba") == '2';
    var papeis = [hAPI.getCardValue("cpPapelN1"), hAPI.getCardValue("cpPapelN2"), hAPI.getCardValue("cpPapelN3"), hAPI.getCardValue("cpPapelN4")];
    var papel = isHierarquiaPapel(papeis, hAPI.getCardValue("cpMatriculaSolicitante"));
    var papelUsuarioAprovador = isHierarquiaPapel(papeis, usuarioAprovador);
    var isAprovadorN2 = aprovadorN2(papel) && aprovadorN2(papelUsuarioAprovador);
    var isAprovadorN3 = aprovadorN3(papel) && aprovadorN3(papelUsuarioAprovador);
    var isAprovadorN4 = aprovadorN4(papel) && aprovadorN4(papelUsuarioAprovador);
    var toN2 = hasN2() && !isPedidoMenorAlcada15 && isAprovadorN2;      
    var toN3 = !toN2 && hasN3() && !isPedidoMenorAlcada16 && isAprovadorN3 || (isPedidoMenorAlcada16 && !hasN2());
    var toN4 = !toN3 && hasN4() && !isPedidoMenorAlcada17 && isAprovadorN4 || (isPedidoMenorAlcada17 && !hasN3());

    if (!aprovado && toMapa) atividade = 'MAPA_COTACAO'
    else if (!aprovado && toReabertura) atividade = 'REABERTURA'
    else if (aprovado && toN2) atividade = 'N2'
    else if (aprovado && toN3) atividade = 'N3'
    else if (aprovado && toN4) atividade = 'N4'
    else if (aprovado && !toN4 && (possuiEstoque || (ehServico && !hasSaldoOrcadoNegativo))) atividade = 'LANCAMENTO'
    else if (aprovado && (!hasSaldoOrcadoNegativo && !ehServico)) atividade = 'VALIDACAO'
    else if (aprovado && hasSaldoOrcadoNegativo || (!toN4 && hasSaldoOrcadoNegativo)) atividade = 'LIBERACAO_VERBA'

    return atividade
}

function AprovaCompraN2() {
    var atividade;
    var usuarioAprovador = getValue("WKUser");
    var isPedidoMenorAlcada16 = verificarPedidoMenorQueAlcada('cpAlcada_16')
    var isPedidoMenorAlcada17 = verificarPedidoMenorQueAlcada('cpAlcada_17')        
    var hasSaldoOrcadoNegativo = hAPI.getCardValue("hasSaldoOrcadoNegativo") == '1';
    var aprovado = hAPI.getCardValue("cpAprovaCompraN2") == '1';
    var toMapa = hAPI.getCardValue("cpReprovaCompraN2") == '1';
    var toReabertura = hAPI.getCardValue("cpReprovaCompraN2") == '2';
    var possuiEstoque = hAPI.getCardValue("cpPossuiEstoque") == '1'
    var ehServico = hAPI.getCardValue("cpTipoSolicitacao") == '2'
    var papeis = [hAPI.getCardValue("cpPapelN1"), hAPI.getCardValue("cpPapelN2"), hAPI.getCardValue("cpPapelN3"), hAPI.getCardValue("cpPapelN4")]
    var papel = isHierarquiaPapel(papeis, hAPI.getCardValue("cpMatriculaSolicitante"))
    var papelUsuarioAprovador = isHierarquiaPapel(papeis, usuarioAprovador)
    var isAprovadorN3 = aprovadorN3(papel) && aprovadorN3(papelUsuarioAprovador);
    var isAprovadorN4 = aprovadorN4(papel) && aprovadorN4(papelUsuarioAprovador);
    var toN3 = hasN3() && !isPedidoMenorAlcada16 && isAprovadorN3
    var toN4 = !toN3 && hasN4() && !isPedidoMenorAlcada17 && isAprovadorN4 || (isPedidoMenorAlcada17 && !hasN3())

    if (!aprovado && toMapa) atividade = 'MAPA_COTACAO'
    else if (!aprovado && toReabertura) atividade = 'REABERTURA'
    else if (aprovado && toN3) atividade = 'N3'
    else if (aprovado && toN4) atividade = 'N4'
    else if (aprovado && !toN4 && (possuiEstoque || (ehServico && !hasSaldoOrcadoNegativo))) atividade = 'LANCAMENTO'
    else if (aprovado && (!hasSaldoOrcadoNegativo && !ehServico)) atividade = 'VALIDACAO'
    else if (aprovado && hasSaldoOrcadoNegativo || (!toN4 && hasSaldoOrcadoNegativo)) atividade = 'LIBERACAO_VERBA'

    return atividade
}

function AprovaCompraN3() {
    var atividade;
    var usuarioAprovador = getValue("WKUser");
    var isPedidoMenorAlcada = verificarPedidoMenorQueAlcada('cpAlcada_17')
    var hasSaldoOrcadoNegativo = hAPI.getCardValue("hasSaldoOrcadoNegativo") == '1';
    var aprovado = hAPI.getCardValue("cpAprovaCompraN3") == '1';
    var toMapa = hAPI.getCardValue("cpReprovaCompraN3") == '1';
    var toReabertura = hAPI.getCardValue("cpReprovaCompraN3") == '2';
    var possuiEstoque = hAPI.getCardValue("cpPossuiEstoque") == '1'
    var ehServico = hAPI.getCardValue("cpTipoSolicitacao") == '2'
    var papeis = [hAPI.getCardValue("cpPapelN1"), hAPI.getCardValue("cpPapelN2"), hAPI.getCardValue("cpPapelN3"), hAPI.getCardValue("cpPapelN4")]
    var papelN4 = isHierarquiaPapel(papeis, hAPI.getCardValue("cpMatriculaSolicitante")) == 'PAPELN4'
    var papelUsuarioAprovadorN4 = isHierarquiaPapel(papeis, usuarioAprovador) == 'PAPELN4'
    var toN4 = !isPedidoMenorAlcada && hasN4() && !papelN4 && !papelUsuarioAprovadorN4

    if (!aprovado && toMapa) atividade = 'MAPA_COTACAO'
    else if (!aprovado && toReabertura) atividade = 'REABERTURA'
    else if (aprovado && toN4) atividade = 'N4'
    else if (aprovado && !toN4 && (possuiEstoque || (ehServico && !hasSaldoOrcadoNegativo))) atividade = 'LANCAMENTO'
    else if (aprovado && (!hasSaldoOrcadoNegativo && !ehServico)) atividade = 'VALIDACAO'
    else if (aprovado && hasSaldoOrcadoNegativo || (!toN4 && hasSaldoOrcadoNegativo)) atividade = 'LIBERACAO_VERBA'

    return atividade
}

function AprovaCompraN4() {
    var atividade;
    var aprovado = hAPI.getCardValue("cpAprovaCompraN4") == '1';
    var toMapa = hAPI.getCardValue("cpReprovaCompraN4") == '1';
    var toReabertura = hAPI.getCardValue("cpReprovaCompraN4") == '2';
    var hasSaldoOrcadoNegativo = hAPI.getCardValue("hasSaldoOrcadoNegativo") == '1';
    var possuiEstoque = hAPI.getCardValue("cpPossuiEstoque") == '1'
    var ehServico = hAPI.getCardValue("cpTipoSolicitacao") == '2'

    if (!aprovado && toMapa) atividade = 'MAPA_COTACAO'
    else if (!aprovado && toReabertura) atividade = 'REABERTURA'
    else if (aprovado && (possuiEstoque || (ehServico && !hasSaldoOrcadoNegativo))) atividade = 'LANCAMENTO'
    else if (aprovado && !possuiEstoque && !hasSaldoOrcadoNegativo && !ehServico) atividade = 'VALIDACAO'
    else if (aprovado && !possuiEstoque && hasSaldoOrcadoNegativo) atividade = 'LIBERACAO_VERBA'

    return atividade
}

function AprovaIntegracao4() {
    var atividade;
    var aprovado = hAPI.getCardValue("cpAprovaIntegracao4") == '1';
    var integraNovamente = hAPI.getCardValue("cpIntegrarNovamente4") == '1';

    if (aprovado) atividade = 'LANCAMENTO'
    else if (!aprovado && integraNovamente) atividade = 'INTEGRACAO'
    else if (!aprovado && !integraNovamente) atividade = 'MAPA_COTACAO'

    return atividade
}

function AprovaAreaPlanejamento() {
    return hAPI.getCardValue("cpAprovaAreaPlanejamento") == '1';
}

function AprovaLancamentoOrdemCompra() {
    return hAPI.getCardValue("cpAprovaOrdemCompra") == '1';
}

function AprovaConferenciaSolicitante() {
    var atividade;
    var aprovado = hAPI.getCardValue("cpAprovaConfSolicitante") == '1';
    var toOrdemCompra = hAPI.getCardValue("cpReprovadoConfSolicitante") == '1';
    var toPrevFornecedor = hAPI.getCardValue("cpReprovadoConfSolicitante") == '2';

    if (aprovado) atividade = 'FIM'
    else if (!aprovado && toOrdemCompra) atividade = 'ORDEM_COMPRA'
    else if (!aprovado && toPrevFornecedor) atividade = 'PREV_FORNECEDOR'

    return atividade
}

function AprovaPrevisaoFornecedor() {
    return hAPI.getCardValue("cpAprovaPrevisaoFornecedor") == '1';
}