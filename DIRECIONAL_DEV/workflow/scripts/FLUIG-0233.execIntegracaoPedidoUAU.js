/**
 * [execIntegracaoPedidoUAU description]
 * @param  {[string]} token       [description]
 * @param  {[object]} header_pedido [description]
 * @param  {[object]} json_itens [description]
 * @return {[object]}             [description]
 */
function execIntegracaoPedidoUAU(token, header_pedido, json_itens) {
	var clientService = fluigAPI.getAuthorizeClientService();
	var data = getDadosIntegracao(token, header_pedido, json_itens);
	var vo = clientService.invoke(JSON.stringify(data));
	var http_status = vo.getHttpStatusResult();
	var result;
	var msg = '';

	if(parseInt(http_status) == 200){
		result = vo.getResult().split(',');
		hAPI.setCardValue('cpNumeroPedido', JSON.parse(vo.getResult())[0]);

		msg += '<span style="color: #87CEFA;">Nº do Pedido de Compra do UAU: [' + JSON.parse(vo.getResult())[0] + ']</span>';
		hAPI.setTaskComments(hAPI.getCardValue('cpMatriculaSolicitante'), hAPI.getCardValue('cpNumeroSolicitacao'),  0, msg);
	}
	else{
		hAPI.setCardValue('cpStatus199', 'ERRO');
		throw JSON.parse(vo.getResult()).Descricao;
	}
}
