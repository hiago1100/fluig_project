function integraTitulo(criaTitulo) {

    log.info(">>>>>>>>>> integraTitulo " + criaTitulo);

    var Parametros = getParametroGeral();
    var Geral = JSON.parse(String(hAPI.getCardValue("Geral")).escape());
    var DespesaIds = JSON.parse(String(hAPI.getCardValue("DespesaIds")).escape());
    var Despesas = getChildren("despesa", DespesaIds);
    
    //Teste
    var numeroProcessoLog = getValue("WKNumProces");

    var ttParam = {};
    var ttRateio = [];

    ttParam.criaTitulo = criaTitulo;
    ttParam.usuario = Parametros.Autenticacao.usuario;
    ttParam.senha = Parametros.Autenticacao.senha;
    ttParam.cod_empresa = Geral.estabelecimento.cod_empresa;
    ttParam.cod_estab = Geral.estabelecimento.cod_estab;
    ttParam.cdn_fornecedor = Geral.viajante.colaborador.cdn_fornecedor;
    ttParam.cod_tit_ap = String(getValue("WKNumProces"));
    ttParam.cod_refer = String(getValue("WKNumProces")); 
    ttParam.num_parcela = "1";

    var dataVencimento = new Date();
    dataVencimento = dataVencimento.addDays(Number(Parametros.Integracao.periodoTitulo));
    ttParam.dataVencimento = dataVencimento.toProgress();
    ttParam.valorTotal = String(Geral.valorTotal).toNumberProgress();
    ttParam.especieDocumento = Parametros.Integracao.especieDocumento;
    ttParam.serieDocumento = Parametros.Integracao.serieDocumento;
    ttParam.metodoPagamento = Parametros.Integracao.metodoPagamento;
    ttParam.indicadorEconomico = Parametros.Integracao.indicadorEconomico;
    ttParam.portador = Parametros.Integracao.portador;
    ttParam.tipoFluxoFinanceiro = Parametros.Integracao.tipoFluxoFinanceiro;
    ttParam.ordemInvestimento = Parametros.Integracao.ordemInvestimento;
    ttParam.tipoFluxoFinanceiro = Parametros.Integracao.tipoFluxoFinanceiro;

    Despesas.forEach(function (despesa, index) {

        var rateio = {};
        rateio.cod_plano_cta_ctbl = despesa.item.contaContabil.cod_plano_cta_ctbl;
        rateio.cod_cta_ctbl = despesa.item.contaContabil.cod_cta_ctbl;
        rateio.cod_plano_ccusto = despesa.ccusto.cod_plano_ccusto;
        rateio.cod_ccusto = despesa.ccusto.cod_ccusto;
        rateio.valor_rateio = String(despesa.valorTotal).toNumberProgress();

        ttRateio.push(rateio);

    })

    var params = {
        ttParam: [ttParam],
        ttRateio: ttRateio
    }

    // Teste
    log.info(">>>>>>>>>>>> integraTitulo.js - Solictação:" + numeroProcessoLog + " callDatasul... ");
    
    var json = callDatasul("CriarTituloAPB", params, Parametros.Autenticacao.usuario);

    if (json.ttErro) {
        json.ttErro.forEach(function (erro, i) {
            json.ttErro[i].mensagem = json.ttErro[i].mensagem.replace(/"/g, '');
        })
    }

    if (criaTitulo == "S") {
        var Integracao = {};

        Integracao.ttErro = json.ttErro;
        Integracao.ttTitulo = json.ttTitulo;
        hAPI.setCardValue("Integracao", JSON.stringify(Integracao));
    } else {
        if (json.ttErro) {
            var erros = "";
            json.ttErro.forEach(function (erro) {
                erros += '\n' + erro.mensagem;
            })

            throw "\nOcorreram erros ao simular a criação do título de pagamento: " + erros;
        }

    }
}