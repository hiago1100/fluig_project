function servicetask280(attempt, message) {

  var nroProceso = getValue("WKNumProces");

  try {

    var perdaTotal = hAPI.getCardValue('perdaTotal');

    log.info("@@PERDA TOTAL : " + perdaTotal);

    if (perdaTotal == "nao" || perdaTotal == "") {
      IntegraAP();

      // integrarLimpezaFInal();
    } else {
      integrarLimpezaFInal();
    }

  } catch (ex) {
    log.error("*** Error integrandoERP para solicitud: " + nroProceso + ": " + ex);
  }
}

function IntegraAP() {
  log.info("@@@ INICIO FUNCAO IntegraAP");

  var provider = ServiceManager.getServiceInstance("TIGER-PRO-rtws061");
  var locator = provider.instantiate("com.ngf.tiger.rtws061.RTWS061");
  var WSESTRU061 = provider.instantiate("com.ngf.tiger.rtws061.WSESTRU061");
  var service = locator.getRTWS061SOAP();

  var nome = getValue("WKUser");
  var nroProceso = getValue("WKNumProces");

  var SERIE = hAPI.getCardValue("nunSerie");
  log.info("*** SERIE : " + SERIE);

  var NUNOS = hAPI.getCardValue("nunOs");
  log.info("*** NUMOS : " + NUNOS);

  var NROSOLFLUIG = nroProceso;
  log.info("*** NROSOLFLUIG : " + NROSOLFLUIG);

  var USERFLUIG = nome;
  log.info("*** USERFLUIG : " + USERFLUIG);

  var STATUS = hAPI.getCardValue("validaTipo");
  log.info("*** STATUS : " + STATUS);

  var DTAINSPECAO = ""; //hAPI.getCardValue("inpesaoPerioticadata");
  log.info("*** DTAINSPECAO : " + DTAINSPECAO);

  var INSPECAOVISUAL = hAPI.getCardValue("dataInspecaoVisualAba5");
  var TESTEMAGNETICA = hAPI.getCardValue("dataParticulaMagAba5");

  var TESTEHIDROSTATICO = ""; //hAPI.getCardValue("dataTesteHidrostaticoAba05");

  var TESTEESTANQUEIDADE = ""; // hAPI.getCardValue("dataTesteEstaqueidadeAba5");

  var xml = "<RTWS061>" +
    "<RTLIMPEZA>" +
    "<SERIE>" + SERIE + "</SERIE>" +
    "<NUMOS>" + NUNOS + "</NUMOS>" +
    "<NROSOLFLUIG>" + NROSOLFLUIG + "</NROSOLFLUIG>" +
    "<USERFLUIG>" + USERFLUIG + "</USERFLUIG>" +
    "<STATUS>" + STATUS + "</STATUS>" +
    "<DTAINSPECAO>" + DTAINSPECAO + "</DTAINSPECAO>" +
    "<FECHAOS>" + "S" + "</FECHAOS>" +
    "<INSPECAOVISUAL>" + INSPECAOVISUAL + "</INSPECAOVISUAL>" +
    "<TESTEMAGNETICA>" + TESTEMAGNETICA + "</TESTEMAGNETICA>" +
    "<TESTEESTANQUEIDADE>" + TESTEESTANQUEIDADE + "</TESTEESTANQUEIDADE>" +
    "<TESTEHIDROSTATICO>" + TESTEHIDROSTATICO + "</TESTEHIDROSTATICO>" +    
    "</RTLIMPEZA>";
  //INICIO TABELA DE REQUISICAO//
  var indexes = getChildrenIndexes("codcodigo");
  var tbServico = getChildrenIndexes("horas");
  var tbServicoAb7 = getChildrenIndexes("codEaxcutarAb7");

  if (indexes.length > 0 || tbServico.length > 0 || tbServicoAb7.length > 0) {
    xml = xml + "<RTSERVICOS>"
  }

  var linhas = [];
  for (var i = 0; i < indexes.length; i++) {
    linhas.push(indexes[i]);

    var SERVICO = hAPI.getCardValue("Codservico___" + indexes[i]);
    log.info("*** SERVICO : " + SERVICO);

    if (hAPI.getCardValue("codTrocarPor___" + indexes[i]) == "") {
      var CODIGOPECA = hAPI.getCardValue("codcodigo___" + indexes[i]);
      log.info("*** PECA : " + CODIGOPECA);
    } else {
      var CODIGOPECA = hAPI.getCardValue("codTrocarPor___" + indexes[i]);
      log.info("*** PECA : " + CODIGOPECA);
    }

    var QUANTIDADE = hAPI.getCardValue("quantidadePeca___" + indexes[i]);
    log.info("*** QTDE : " + QUANTIDADE);

    xml = xml +
      "<RTAPONTAMENTO>" +
      "<SERVICO>" + SERVICO + "</SERVICO>" +
      "<CODIGOPECA>" + CODIGOPECA + "</CODIGOPECA>" +
      "<QUANTIDADE>" + QUANTIDADE + "</QUANTIDADE>" +
      "<QUANTIDADEREAL>" + "0" + "</QUANTIDADEREAL>" +
      "</RTAPONTAMENTO>";

  }
  //FIM TABELA DE REQUISICAO//

  //INICIO TABELA DE SERVICO//

  var linhasServico = [];
  log.info("@@LOG ANTES DO FOR indexes : " + tbServico.length);
  for (var i = 0; i < tbServico.length; i++) {
    linhasServico.push(tbServico[i]);

    var SERVICO = hAPI.getCardValue("codServivoExecutar___" + tbServico[i]);
    log.info("*** SERVICO : " + SERVICO);

    var CODIGOPECA = hAPI.getCardValue("codExecutar___" + tbServico[i]);
    log.info("*** PECA : " + CODIGOPECA);

    var QUANTIDADE = hAPI.getCardValue("horasDecimal___" + tbServico[i]);
    log.info("*** QTDE : " + QUANTIDADE);

    xml = xml +
      "<RTAPONTAMENTO>" +
      "<SERVICO>" + SERVICO + "</SERVICO>" +
      "<CODIGOPECA>" + CODIGOPECA + "</CODIGOPECA>" +
      "<QUANTIDADE>" + QUANTIDADE + "</QUANTIDADE>" +
      "<QUANTIDADEREAL>" + "0" + "</QUANTIDADEREAL>" +
      "</RTAPONTAMENTO>";

  }
  //FIM TABELA DE SERVICO//

  //INICIO TABELA DE RECEITA//

  var linhasReceita = [];
  for (var r = 0; r < tbServicoAb7.length; r++) {
    linhasReceita.push(tbServicoAb7[r]);

    var SERVICO = hAPI.getCardValue("codServivoExecutarAb7___" + tbServicoAb7[r]);
    log.info("*** SERVICO : " + SERVICO);

    var CODIGOPECA = hAPI.getCardValue("codEaxcutarAb7___" + tbServicoAb7[r]);
    log.info("*** PECA : " + CODIGOPECA);

    var QUANTIDADE = hAPI.getCardValue("horasDecimalAb7___" + tbServicoAb7[r]);
    log.info("*** QTDE : " + QUANTIDADE);

    xml = xml +
      "<RTAPONTAMENTO>" +
      "<SERVICO>" + SERVICO + "</SERVICO>" +
      "<CODIGOPECA>" + CODIGOPECA + "</CODIGOPECA>" +
      "<QUANTIDADE>" + QUANTIDADE + "</QUANTIDADE>" +
      "<QUANTIDADEREAL>" + "0" + "</QUANTIDADEREAL>" +
      "</RTAPONTAMENTO>";

  }

  var xmlApontamentos = '';
  xmlApontamentos = xmlApontamentos + buscaApontamentos();
  xmlApontamentos = xmlApontamentos + buscaProdutos();
  // xmlApontamentos = xmlApontamentos + buscaMaterialManutencao();

  log.info('======= xmlApontamentos' + xmlApontamentos);

  //FIM TABELA DE RECEITA//
  if (indexes.length > 0 || tbServico.length > 0 || tbServicoAb7.length > 0 || xmlApontamentos != '') {
    xml = xml + "</RTSERVICOS>";
  }

  xml = xml +
    "</RTWS061>";

  var empresa = hAPI.getCardValue("empresa");
  log.info("@@@ Empresa : " + empresa);

  var filial = hAPI.getCardValue("codfilial");
  log.info("@@@ Filial : " + filial);

  log.info("xml: " + xml);

  WSESTRU061.setEMP(empresa);
  WSESTRU061.setFIL(filial);
  WSESTRU061.setCXML(xml);

  var ret = service.getrtapontamento(WSESTRU061);
  var statusFinal1 = ret.isLSTATUS();
  var statusFinal2 = ret.getNUMOS();
  var statusFinal3 = ret.getOBS();

  for (var b = 0; b < linhasReceita.length; b++) {
    var valida = hAPI.getCardValue("codIntegraAb7___" + linhasReceita[b]);
    if (valida != "true") {
      hAPI.setCardValue("codIntegraAb7___" + linhasReceita[b], statusFinal1);
      log.info("***Peças :  " + statusFinal3 );
    }

  }

  for (var a = 0; a < linhasServico.length; a++) {
    var valida = hAPI.getCardValue("codIntegra___" + linhasServico[a]);
    if (valida != "true") {
      hAPI.setCardValue("codIntegra___" + linhasServico[a], statusFinal1);
      log.info("***Peças :  " + statusFinal3);
    }

  }

  for (var f = 0; f < linhas.length; f++) {
    var valida = hAPI.getCardValue("codigoIntegraServico___" + linhas[f]);
    if (valida != "true") {
      hAPI.setCardValue("codigoIntegraServico___" + linhas[f], statusFinal1);
      log.info("***Peças :  " + statusFinal3);
    }

  }

}
//FUNSAO INTEGRACAO//

function integrarLimpezaFInal() {
  log.info('integrarLimpezaFInal  / ' + 'servicetask280');

  var provider = ServiceManager.getServiceInstance("TIGER-PRO-rtws061");
  var locator = provider.instantiate("com.ngf.tiger.rtws061.RTWS061");
  var WSESTRU061 = provider.instantiate("com.ngf.tiger.rtws061.WSESTRU061");
  var service = locator.getRTWS061SOAP();

  var nome = getValue("WKUser");
  var nroProceso = getValue("WKNumProces");

  var SERIE = hAPI.getCardValue("nunSerie");
  log.info("*** SERIE : " + SERIE);

  var NUNOS = hAPI.getCardValue("nunOs");
  log.info("*** NUMOS : " + NUNOS);

  var NROSOLFLUIG = nroProceso;
  log.info("*** NROSOLFLUIG : " + NROSOLFLUIG);

  var USERFLUIG = nome;
  log.info("*** USERFLUIG : " + USERFLUIG);

  var STATUS = hAPI.getCardValue("validaTipo");
  log.info("*** STATUS : " + STATUS);

  var DTAINSPECAO = ""; //hAPI.getCardValue("inpesaoPerioticadata");
  log.info("*** DTAINSPECAO : " + DTAINSPECAO);

  var xml = "<RTWS061>" +
    "<RTLIMPEZA>" +
    "<SERIE>" + SERIE + "</SERIE>" +
    "<NUMOS>" + NUNOS + "</NUMOS>" +
    "<NROSOLFLUIG>" + NROSOLFLUIG + "</NROSOLFLUIG>" +
    "<USERFLUIG>" + USERFLUIG + "</USERFLUIG>" +
    "<STATUS>" + STATUS + "</STATUS>" +
    "<DTAINSPECAO>" + "" + "</DTAINSPECAO>" +
    "<FECHAOS>" + "S" + "</FECHAOS>" +
    "<INSPECAOVISUAL>" + "" + "</INSPECAOVISUAL>" +
    "<TESTEMAGNETICA>" + "" + "</TESTEMAGNETICA>" +
    "<TESTEESTANQUEIDADE>" + "" + "</TESTEESTANQUEIDADE>" +
    "<TESTEHIDROSTATICO>" + "" + "</TESTEHIDROSTATICO>" +
    "</RTLIMPEZA>" + "" + "<RTSERVICOS>";

  xml = xml +
    "<RTAPONTAMENTO>" +
    "<SERVICO>" + "" + "</SERVICO>" +
    "<CODIGOPECA>" + "" + "</CODIGOPECA>" +
    "<QUANTIDADE>" + "" + "</QUANTIDADE>" +
    "<QUANTIDADEREAL>" + "0" + "</QUANTIDADEREAL>" +
    "</RTAPONTAMENTO>";

  xml = xml +
    "</RTSERVICOS>" +
    "</RTWS061>";

  var empresa = hAPI.getCardValue("empresa");
  log.info("@@@ Empresa : " + empresa);

  var filial = hAPI.getCardValue("codfilial");
  log.info("@@@ Filial : " + filial);

  log.info("xml: " + xml);

  WSESTRU061.setEMP(empresa);
  WSESTRU061.setFIL(filial);
  WSESTRU061.setCXML(xml);

  var ret = service.getrtapontamento(WSESTRU061);
  var statusFinal1 = ret.isLSTATUS();
  var statusFinal2 = ret.getNUMOS();
  var statusFinal3 = ret.getOBS();

  log.info("*** statusFinal1 isLSTATUS : " + statusFinal1);
  log.info("*** statusFinal2 getNUMOS : " + statusFinal2);
  log.info("*** statusFinal3 getOBS : " + statusFinal3);
}

//INICIO FUÇAO DE REQUISIÇÃO DE PEÇAS//
function Requisicao() {
  log.info("@@ Dentro da Função Requisicao de estoque");

  var provider = ServiceManager.getServiceInstance("Tiger-PRO-rtws060");
  var locator = provider.instantiate("com.ngf.tiger.rtws060.RTWS060");
  var WSESTRU060 = provider.instantiate("com.ngf.tiger.rtws060.WSESTRU060");
  var service = locator.getRTWS060SOAP();

  var index = getChildrenIndexes("codcodigo");
  var linhas2 = [];
  var NUMOS = hAPI.getCardValue("nunOs");
  var xml = "<RTWS060>" +
    "<RTPECA>" +
    "<NUMOS>" + NUMOS + "</NUMOS>" +

    log.info("*** index.length : " + index.length);

  for (var i = 0; i <= index.length; i++) {
    linhas2.push(index[i]);
    var lStatus = hAPI.getCardValue("lStatus___" + index[i]);
    var situacao = hAPI.getCardValue("situacao___" + index[i]);

    log.info("*** lStatus: " + lStatus + " | situacao: " + situacao);

    if (lStatus != "true" && situacao == "colocar") {

      log.info("*** i : " + i);

      requisita = true;

      var SERVICO = hAPI.getCardValue("Codservico___" + index[i]);
      log.info("*** SERVICO : " + SERVICO);
      var PECA = hAPI.getCardValue("codTrocarPor___" + index[i]);
      log.info("*** PECA : " + PECA);
      var QTDE = hAPI.getCardValue("quantidadePeca___" + index[i]);
      log.info("*** QTDE : " + QTDE);

      var xml = xml + "<ITEM>" +
        "<SERVICO>" + SERVICO + "</SERVICO>" +
        "<PECA>" + PECA + "</PECA>" +
        "<QTDE>" + QTDE + "</QTDE>" +
        "</ITEM>";
    }
  }
  var xml = xml + "</RTPECA>" +
    "</RTWS060>";

  if (requisita) {

    var empresa = hAPI.getCardValue("empresa");
    log.info("@@ EMPRESA : " + empresa);
    var filial = hAPI.getCardValue("codfilial");
    log.info("@@ FILIAL : " + filial);

    log.info("xml: " + xml);

    WSESTRU060.setEMP(empresa);
    WSESTRU060.setFIL(filial);
    WSESTRU060.setCXML(xml);

    var ret = service.getrtrequisicao(WSESTRU060);
    var status = ret.isLSTATUS();

    log.info("*** getSTATUS : " + status);

    for (var j = 0; j <= linhas2.length; j++) {
      log.info("@@@@ INDEX ANTES DO SETCARD: " + j);

      var valida = hAPI.getCardValue("lStatus___" + linhas2[j]);

      if (valida != "true") {
        var valida = hAPI.getCardValue("lStatus___" + linhas2[j]);
        hAPI.setCardValue("lStatus___" + linhas2[j], status);
      }

    }
  }
}
//FIM FUÇAO DE REQUISIÇÃO DE PEÇAS//
