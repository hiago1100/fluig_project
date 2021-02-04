/*
 * Precisa Servicio:
 * Codigo: TIGER-PRO-rtws061
 * Descrip: consultaPecas
 * URL: http://rentank.totvs.com.br:12143/ws/rtws061.apw?wsdl
 * Pacote: com.ngf.tiger.rtws061
 * CXF
 */

function beforeTaskSave(colleagueId, nextSequenceId, userList) {
  log.info("&& ENTROU NO beforeTaskSave ");
  var ativAtual = getValue("WKNumState");

  var nroProceso = getValue("WKNumProces");

  var WKCompletTask = getValue("WKCompletTask");
  log.info("***WKCompletTask " + WKCompletTask);

  log.info("@@ nroProceso : " + nroProceso);
  log.info("@@ ativAtual : " + ativAtual);

  if (WKCompletTask == "true") {

    if (ativAtual == "4" || ativAtual == "0") {

      var tipoOs = hAPI.getCardValue('tipoOs');
      log.info("TIPO INICIAL " + tipoOs);

      var avariasTanque = hAPI.getCardValue('avariasTanque');

      var status = "OK;"
      log.info("*** STATUS INICIAL " + status);

      if (tipoOs == "devolucao" && avariasTanque == "nao" || tipoOs == "locacao" && avariasTanque == "nao") {
        status = "LIVRE"
      } else if (tipoOs == "devolucao" && avariasTanque == "sim" || tipoOs == "locacao" && avariasTanque == "sim") {
        status = "DESCARTE";
      }

      if (tipoOs == "servico" && avariasTanque == "nao") {
        status = "OK"
      }

      if (tipoOs == "servico" && avariasTanque == "sim") {
        status = "DESCARTE"
      }

      log.info("*** STATUS FINAL " + status);
      hAPI.setCardValue("validaTipo", status);
    }

    if (ativAtual == "80") {
      log.info("@@ Inicio Dataset CONTENTORES ...");

      var provider = ServiceManager.getServiceInstance("TIGER-PRO-rtws057");
      var locator = provider.instantiate("com.ngf.tiger.rtws057.RTWS057");
      var WSESTRU057 = provider.instantiate("com.ngf.tiger.rtws057.WSESTRU057");
      var WSRT057 = provider.instantiate("com.ngf.tiger.rtws057.WSRT057");

      var WSRTWS057AEXTRAARRAY = provider.instantiate("com.ngf.tiger.rtws057.WSRTWS057AEXTRAARRAY");

      var service = locator.getRTWS057SOAP();

      var filtroSerie = hAPI.getCardValue("nunSerie");

      var empresa = hAPI.getCardValue("empresa");
      log.info("@@@ Empresa : " + empresa);

      var filial = hAPI.getCardValue("codfilial");
      log.info("@@@ Filial : " + filial);

      log.info("@@  FILTRO ..." + filtroSerie);

      var xml = "<RTWS057>" +
        "<RTCONTENTOR>" +
        "<SERIE>" + filtroSerie + "</SERIE>" +
        "</RTCONTENTOR>" +
        "</RTWS057>";

      log.info("xml: " + xml);

      WSESTRU057.setEMP(empresa);
      WSESTRU057.setFIL(filial);
      WSESTRU057.setCXML(xml);

      var ret = service.getrtcontentor(WSESTRU057);

      var teste = ret.getATESTE();
      //log.info("@@  teste.length " + teste.length());
      var teste2 = teste.getWSRTWS057AEXTRAARRAY();

      log.info("@@ teste2 size " + teste2.size());
      //log.info("@@ teste2 get(0) "+ teste2.get(0));

      log.info("@@ teste2 filial " + filial);

      var DataHidrostatico = "";
      var DataInspecaoVisual = "";
      var DataMagnetico = "";
      var DataEstanqueidade = "";

      for (var i = 0; i < teste2.size(); i++) {
        var valor = teste2.get(i);

        var tipoTeste = valor.getCTIPO();
        log.info("@@ tipoTeste " + tipoTeste);

        if (tipoTeste == "HI") {
          log.info("ENTROU NO HI " + i + " / " + tipoTeste);

          var DataHidrostaticoRecebe = valor.getDDATA();
          DataHidrostatico = new java.text.SimpleDateFormat("dd/MM/yyyy")
            .format(DataHidrostaticoRecebe.toGregorianCalendar()
              .getTime());

          log.info("DENTRO DO FOR HI " + DataHidrostatico + " / " + tipoTeste);
        }

        if (tipoTeste == "IV") {

          log.info("ENTROU NO IV " + i + " / " + tipoTeste);
          var DataInspecaoVisualRecebe = valor.getDDATA();
          DataInspecaoVisual = new java.text.SimpleDateFormat("dd/MM/yyyy")
            .format(DataInspecaoVisualRecebe.toGregorianCalendar()
              .getTime());
          log.info("DENTRO DO FOR HI " + DataInspecaoVisual + " / " + tipoTeste);
        }

        if (tipoTeste == "PM") {

          log.info("ENTROU NO PM " + i + " / " + tipoTeste);
          var DataMagneticoRecebe = valor.getDDATA();
          DataMagnetico = new java.text.SimpleDateFormat("dd/MM/yyyy")
            .format(DataMagneticoRecebe.toGregorianCalendar()
              .getTime());
          log.info("DENTRO DO FOR HI " + DataMagnetico + " / " + tipoTeste);
        }

        if (tipoTeste == "ES") {
          log.info("ENTROU NO ES " + i + " / " + tipoTeste);
          var DataEstanqueidadeRecebe = valor.getDDATA();
          DataEstanqueidade = new java.text.SimpleDateFormat("dd/MM/yyyy")
            .format(DataEstanqueidadeRecebe.toGregorianCalendar()
              .getTime());
          log.info("DENTRO DO FOR HI " + DataEstanqueidade + " / " + tipoTeste);
        }

      }

      if (ret != null) {
        var DTAINSPECAO = ret.getDTAINSPECAO();

        if (DTAINSPECAO != null) {
          DTAINSPECAO = new java.text.SimpleDateFormat("dd/MM/yyyy")
            .format(DTAINSPECAO.toGregorianCalendar()
              .getTime());
        }
        var DTAULTINSPECAO = ret.getDTAULTINSPECAO();
        if (DTAULTINSPECAO != null) {
          DTAULTINSPECAO = new java.text.SimpleDateFormat("dd/MM/yyyy")
            .format(DTAULTINSPECAO.toGregorianCalendar()
              .getTime());
        }

        var data8 = ret.getDATARECEBIMENTO();
        if (data8 != null) {
          dataRECEBIMENTO = new java.text.SimpleDateFormat("dd/MM/yyyy")
            .format(data8.toGregorianCalendar()
              .getTime());
        }

        log.info("@@@ VALOR DA NF " + ret.getNFDEVREM());

        hAPI.setCardValue("nf", ret.getNFDEVREM()
          .trim());
      }

    }

    if (ativAtual == "38") {
      var horas = getChildrenIndexes("horas");
      for (var j = 0; j < horas.length; j++) {
        log.info("@@@ DENTRO DO FOR : ");

        var QUANTIDADE = hAPI.getCardValue("horas___" + horas[j]);
        log.info("*** QUANTIDADE : " + QUANTIDADE);

        var HORAS = "00:00:00";

        var HORASTOTAL = calculaHora(QUANTIDADE, HORAS);
        log.info("@@@ HORASTOTAL : " + HORASTOTAL);

        hAPI.setCardValue('horasDecimal___' + horas[j], HORASTOTAL);
      }
    }

    if (ativAtual == "61") {

      var horas = getChildrenIndexes("horasAb7");

      for (var j = 0; j < horas.length; j++) {
        log.info("@@@ DENTRO DO FOR : ");

        var QUANTIDADE = hAPI.getCardValue("horasAb7___" + horas[j]);
        log.info("*** QUANTIDADE : " + QUANTIDADE);

        var HORAS = "00:00:00";

        var HORASTOTAL = calculaHora(QUANTIDADE, HORAS);
        log.info("@@@ HORASTOTAL : " + HORASTOTAL);

        hAPI.setCardValue('horasDecimalAb7___' + horas[j], HORASTOTAL);
      }
    }

    /*if(ativAtual == "127"){
    	var perdaTotal =  hAPI.getCardValue('perdaTotal');
    	
    	log.info("@@PERDA TOTAL : "+ perdaTotal);
    	
    	if(perdaTotal == "nao" || perdaTotal == ""){
    		IntegraAP();
    		var erro = getChildrenIndexes("codigoIntegraServico");
    		
    		for(j=1;j<=erro.length;j++){
    			var erro = hAPI.getCardValue("codigoIntegraServico___" + j);
    			log.info('******* DENTRO DO FOR THROW : ' + erro + " / " + j);
    			if(erro != "true" ){
    				
    				log.info("******* DENDTRO DO IF ");
    				throw "Erro : Favor verificar se o preço unitario está cadastrado"; 
    			}
    		}
    		
    		
    		var erro2 = getChildrenIndexes("codEaxcutar");
    		
    		for(j=1;j<=erro2.length;j++){
    			var erro = hAPI.getCardValue("codIntegra___" + j);
    			log.info('******* DENTRO DO FOR THROW : ' + erro + " / " + j);
    			if(erro != "true" ){
    				log.info("******* DENDTRO DO IF ");
    				throw "Erro : Favor verificar se o preço unitario está cadastrado"; 
    			}
    		}
    		
    		var erro3 = getChildrenIndexes("codEaxcutarAb7");
    		
    		for(j=1;j<=erro3.length;j++){
    			var erro = hAPI.getCardValue("codIntegraAb7___" + j);
    			log.info('******* DENTRO DO FOR THROW : ' + erro + " / " + j);
    			if(erro != "true" ){
    				log.info("******* DENDTRO DO IF ");
    				throw "Erro : Favor verificar se o preço unitario está cadastrado"; 
    			}
    		}
    		
    		integrarLimpezaFInal();
    	}else{
    		integrarLimpezaFInal();
    	}
    	
    	
    }*/

  }
}
//INICIO FUNSAO INTEGRACAO//
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

  var xml = "<RTWS061>" +
    "<RTLIMPEZA>" +
    "<SERIE>" + SERIE + "</SERIE>" +
    "<NUMOS>" + NUNOS + "</NUMOS>" +
    "<NROSOLFLUIG>" + NROSOLFLUIG + "</NROSOLFLUIG>" +
    "<USERFLUIG>" + USERFLUIG + "</USERFLUIG>" +
    "<STATUS>" + STATUS + "</STATUS>" +
    "<DTAINSPECAO>" + DTAINSPECAO + "</DTAINSPECAO>" +
    "<FECHAOS>" + "S" + "</FECHAOS>" +
    "<INSPECAOVISUAL></INSPECAOVISUAL>"+
    "<TESTEMAGNETICA></TESTEMAGNETICA>"+
    "<TESTEESTANQUEIDADE></TESTEESTANQUEIDADE>"+
    "<TESTEHIDROSTATICO></TESTEHIDROSTATICO>"+
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

    var CODIGOPECA = hAPI.getCardValue("codTrocarPor___" + indexes[i]);
    log.info("*** PECA : " + CODIGOPECA);

    var QUANTIDADE = hAPI.getCardValue("quantidadePeca___" + indexes[i]);
    log.info("*** QTDE : " + QUANTIDADE);

    xml = xml +
      "<RTAPONTAMENTO>" +
      "<SERVICO>" + SERVICO + "</SERVICO>" +
      "<CODIGOPECA>" + CODIGOPECA + "</CODIGOPECA>" +
      "<QUANTIDADE>" + QUANTIDADE + "</QUANTIDADE>" +
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
      "</RTAPONTAMENTO>";

  }
  //FIM TABELA DE RECEITA//
  if (indexes.length > 0 || tbServico.length > 0 || tbServicoAb7.length > 0) {
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
      log.info("***Peças :  " + statusFinal3);
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
// FUNSAO INTEGRACAO//

function integrarLimpezaFInal() {

  log.info('integrarLimpezaFInal / ' + 'beforeTaskSave');

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
    "<DTAINSPECAO>" + DTAINSPECAO + "</DTAINSPECAO>" +
    "<FECHAOS>" + "S" + "</FECHAOS>" +
    "<INSPECAOVISUAL></INSPECAOVISUAL>"+
    "<TESTEMAGNETICA></TESTEMAGNETICA>"+
    "<TESTEESTANQUEIDADE></TESTEESTANQUEIDADE>"+
    "<TESTEHIDROSTATICO></TESTEHIDROSTATICO>"+
    "</RTLIMPEZA>" + "" + "<RTSERVICOS>";

  xml = xml +
    "<RTAPONTAMENTO>" +
    "<SERVICO>" + "" + "</SERVICO>" +
    "<CODIGOPECA>" + "" + "</CODIGOPECA>" +
    "<QUANTIDADE>" + "" + "</QUANTIDADE>" +
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

// INICIO FUÇAO DE REQUISIÇÃO DE PEÇAS//
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

function calculaHora(h1, h2) {
  var arrValores = h1.split(":");
  var arrValores2 = h2.split(":");

  log.info("***** FUNSAO 1 VALOR ARREY " + arrValores2);
  log.info("***** FUNSAO 1 segundos ARREY " + arrValores);

  var hora = arrValores[0];
  var minuto = arrValores[1];
  var segundo = arrValores[2];

  var horas = parseFloat(hora);
  var minutos = parseFloat(minuto);
  var segundos = parseFloat(segundo);

  var horas2 = arrValores2[0];
  var minutos2 = arrValores2[1];
  var segundos2 = arrValores2[2];

  horas2 = parseInt(horas2);
  minutos2 = parseInt(minutos2);
  segundos2 = parseInt(segundos2);

  log.info("***** FUNSAO 1 horas  arrValores2[0] " + horas);
  log.info("***** FUNSAO 1 minutos arrValores2[1] " + minutos);
  log.info("***** FUNSAO 1 segundos arrValores2[2] " + segundos);
  log.info("***** FUNSAO 1 horas2  arrValores2[0] " + horas2);
  log.info("***** FUNSAO 1 minutos2 arrValores2[1] " + minutos2);
  log.info("***** FUNSAO 1 segundos2 arrValores2[2] " + segundos2);

  var totalHoras = (horas + horas2);
  var totalMinutos = (minutos + minutos2);
  var totalSegundos = (segundos + segundos2);

  log.info("***** FUNSAO 1 (parseInt(horas) + parseInt(horas2)): " + totalHoras);
  log.info("***** FUNSAO 1 ( parseInt(minutos) + parseInt(minutos2)) " + totalMinutos);
  log.info("***** FUNSAO 1 ( parseInt(segundos) + parseInt(segundos2))" + totalSegundos);
  log.info("***** FUNSAO 1 TOTAL MINUTOS Antes de converter : " + totalMinutos);

  while (totalSegundos > 60) {
    totalSegundos = totalSegundos - 60;
    totalMinutos = totalMinutos + 1;
  }

  while (totalMinutos > 60) {
    totalMinutos = totalMinutos - 60;
    totalHoras = totalHoras + 1;
  }

  // Converte Segundos para decimal
  totalSegundos = ((totalSegundos / 60) * 100);

  // Arredonda valores da variável totalMinutos
  totalSegundos = Math.round(totalSegundos * Math.pow(10, 0)) / Math.pow(10, 0);

  if (totalSegundos == 100) {
    totalMinutos += 1;
    totalSegundos = 0;
  }

  // Converte minutos para decimal
  totalMinutos = (totalMinutos / 60);

  // Arredonda valores da variável totalMinutos
  totalMinutos = parseFloat(totalMinutos.toFixed(2));

  if (totalMinutos == 100) {
    totalHoras += 1;
    totalMinutos = 0;
  }

  var totalHora8 = totalHoras + totalMinutos;
  log.info("***** FUNSAO 1 TOTAL MINUTOS depois de converter: " + totalHora8);
  return totalHora8;
}

function getChildrenIndexes(fieldName) {
  var datos = hAPI.getCardData(getValue("WKNumProces"));
  var enteries = datos.entrySet()
    .iterator();
  var indexes = [];

  while (enteries.hasNext()) {
    var e = enteries.next();
    if (e.getKey()
      .startsWith(fieldName + "___")) {
      indexes.push(e.getKey()
        .split("___")[1]);
    }
  }
  return indexes;
}
