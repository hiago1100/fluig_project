function buscaEtapas() {
  return [{
      codigo: 4,
      nome: 'Inspeção Inicial',
      campoCheck: 'efetuarInspecaoInicial',
      campoProduto: 'codProdutoInspecao',
      campoServico: 'codServicoInspecao',
      campoQuantidade: 'quantidadeInspecao'
    },
    {
      codigo: 26,
      nome: 'Descontaminação',
      campoCheck: 'efetuarDescontaminacao',
      campoProduto: 'codProdutoDescontamina',
      campoServico: 'codServicoDescontamina',
      campoQuantidade: 'quantidadeDescontamina'
    },
    {
      codigo: 38,
      nome: 'Manutenção',
      campoCheck: 'lipezaManutencao',
      campoProduto: 'codProdutoManutencao',
      campoServico: 'codServicoManutencao',
      campoQuantidade: 'quantidadeManutencao'
    },
    {
      codigo: 55,
      nome: 'Pintura',
      campoCheck: 'efetuarPintura',
      campoProduto: 'codProdutoPintura',
      campoServico: 'codServicoPintura',
      campoQuantidade: 'quantidadePintura'
    },
    {
      codigo: 61,
      nome: 'Certificações',
      campoCheck: 'efetuarCertifica',
      campoProduto: 'codProdutoCertifica',
      campoServico: 'codServicoCertifica',
      campoQuantidade: 'quantidadeCertifica'
    }
  ];
}
