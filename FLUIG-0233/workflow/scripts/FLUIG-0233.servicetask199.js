/**
 * [servicetask199 description]
 * @param  {[type]} attempt [description]
 * @param  {[type]} message [description]
 * @return {[type]}         [description]
 */
function servicetask199(attempt, message){
    var iterator;
    var itens;
    var item;
    var index;
    var token = getTokenUAU();
    var header_pedido = getPedido();
    var tipo_solicitacao = getTipoSolicitacao();
    var itens_pedido = new Array();

    log.info("+---------------------------------------------------------+");
    log.info("|   FLUIG-0233 => LOG DA INTEGRAÇÃO DO PEDIDO DE COMPRA   |");
    log.info("+---------------------------------------------------------+");
    log.info("| TOKEN => " + token);
    log.info("| TIPO DO PEDIDO => " + tipo_solicitacao);
    log.info("+---------------------------------------------------------+");

    try{
        switch(tipo_solicitacao){
            case 'demais_compras':
                itens = getIndexes('cpInsumoDemaisCompras');
                break;
            case 'itens_ti':
                itens = getIndexes('cpInsumoItensTi');
                break;
            case 'servicos':
                itens = getIndexes('cpComposicaoServicos');
                break;
        }

        iterator = itens.iterator();

        switch(tipo_solicitacao){
            case 'demais_compras':
                while(iterator.hasNext()){
                    index = iterator.next();
                    item = createListaDemaisItens(index);
                    itens_pedido.push(item);
                }
                break;
            case 'itens_ti':
                while(iterator.hasNext()){
                    index = iterator.next();
                    item = createListaItensTI(index);
                    itens_pedido.push(item);
                }
                break;
            case 'servicos':
                while(iterator.hasNext()){
                    index = iterator.next();
                    item = createListaServicos(index);
                    itens_pedido.push(item);
                }
                break;
        }

        log.info("| JSON HEADER => " + new Object(header_pedido) + '');
        log.info("| JSON ITENS => " + new Object(itens_pedido) + '');
        log.info("+---------------------------------------------------------+");

        execIntegracaoPedidoUAU(token, header_pedido, itens_pedido);
    }
    catch(erro){
        if(erro != undefined && erro.message != undefined){
    		retorno_integracao = '' +
    		'<br><b style="color: #FF0000"><i class="flaticon flaticon-alert icon-sm"></i> OCORREU UM ERRO NO SCRIPT DE SERVIÇOS:</b><br>' +
    		'<span class="text-muted">' + erro.message + '</span><br>' +
    		'LINHA ';
    	}
    	else{
    		retorno_integracao = '' +
    		'<br><b style="color: #FF0000"><i class="flaticon flaticon-alert icon-sm"></i> OCORREU UM ERRO NA INTEGRAÇÃO DO PEDIDO COM O UAU:</b><br>' +
    		'<span class="text-muted">' + erro + '</span><br>' +
    		'LINHA ';
    	}

    	hAPI.setCardValue('cpStatus199', 'ERRO');
    	throw retorno_integracao;
    }
}
