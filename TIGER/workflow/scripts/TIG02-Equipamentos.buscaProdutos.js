function buscaProdutos() {

  log.info('*** buscaProdutos');

  var receita = getDataset('TIG01-Receitas', null, [
    { field: 'codReceita', value: hAPI.getCardValue("codReceita") }
  ])[0];

  log.info(receita);

  if (!receita) {
    return "";
  }

  var produtos = getDataset('TIG01-Receitas', null, [
    { field: 'documentid', value: receita.documentid },
    { field: 'tablename', value: 'tabelaProduto' }
  ]);

  var xml = "";

  produtos.forEach(function (produto) {
    log.info(produto.codigoServico);
    log.info(produto.codigoProduto);
    log.info(produto.quantidade);
    xml = xml +
      "<RTAPONTAMENTO>" +
      "<SERVICO>" + produto.codigoServico + "</SERVICO>" +
      "<CODIGOPECA>" + produto.codigoProduto + "</CODIGOPECA>" +
      "<QUANTIDADE>" + produto.quantidade + "</QUANTIDADE>" +
      "<QUANTIDADEREAL>" + "0" + "</QUANTIDADEREAL>" +
      "</RTAPONTAMENTO>";

  })

  log.info('*** xml buscaProdutos ' + xml);

  return xml;
}
