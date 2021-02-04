function defineStructure() {

}

function onSync(lastSyncDate) {

}

function createDataset(fields, constraints, sortFields) {

  dsAprovadores = DatasetBuilder.newDataset();
  dsAprovadores.addColumn("sequencia");
  dsAprovadores.addColumn("qtdMinima");
  dsAprovadores.addColumn("usuario");

  var valor;
  var lotacao;
  var tipDoc;
  var epCodigo;
  var codEstab;

  valor = 0;
  lotacao = "";
  tipDoc = "";
  epCodigo = "";
  codEstab = "";
  companyid = getValue("WKCompany");

  if (constraints != null) {
    for (var i = 0; i < constraints.length; i++) {

      if (constraints[i].fieldName == "valor")
        valor = constraints[i].initialValue;

      if (constraints[i].fieldName == "lotacao")
        lotacao = constraints[i].initialValue;

      if (constraints[i].fieldName == "tipDoc")
        tipDoc = constraints[i].initialValue;

      if (constraints[i].fieldName == "epCodigo")
        epCodigo = constraints[i].initialValue;

      if (constraints[i].fieldName == "codEstab")
        codEstab = constraints[i].initialValue;

      if (constraints[i].fieldName == "companyid")
        companyid = constraints[i].initialValue;

    }
  }

  log.info('Api Busca Aprovadores');
  log.info('Valor: ' + valor);
  log.info('Lotacao: ' + lotacao);
  log.info('Tip Doc: ' + tipDoc);
  log.info('epCodigo: ' + epCodigo);
  log.info('estab:' + codEstab);

  //main constraints
  var ctEstab = DatasetFactory.createConstraint("codEstab", codEstab, codEstab, ConstraintType.MUST);
  var ctLotacao = DatasetFactory.createConstraint("codLotacao", lotacao, lotacao, ConstraintType.MUST);
  var ctTipoDocto = DatasetFactory.createConstraint("codTipoDocto", tipDoc, tipDoc, ConstraintType.MUST);
  var ctCompanyId = DatasetFactory.createConstraint("companyid", companyid, companyid, ConstraintType.MUST);

  var codigoTipoDocto = DatasetFactory.createConstraint("codigo", tipDoc, tipDoc, ConstraintType.MUST);

  var dsTpDoc = DatasetFactory.getDataset("adf_tipo_documento", null, new Array(codigoTipoDocto), null);
  ctTbTipos = DatasetFactory.createConstraint("tablename", "tipos", "tipos", ConstraintType.SHOULD);

  constraint = new Array(ctTipoDocto, ctCompanyId);

  var dsTpAprovDoc = DatasetFactory.getDataset(
    "adf_get_tipo_aprovacao_documento",
    null,
    constraint,
    new Array('prioridade')
  );

  log.info(" >>> dsTpAprovDoc.rowsCount: " + dsTpAprovDoc.rowsCount);

  if (dsTpAprovDoc.rowsCount != null)
    for (var i = 0; i < dsTpAprovDoc.rowsCount; i++) {

      // tipo da aprovação se é faixa, lista etc
      var prioridade = dsTpAprovDoc.getValue(i, "prioridade");
      var codTipoAprovDoc = dsTpAprovDoc.getValue(i, "tipo");
      var qtdMinima = dsTpAprovDoc.getValue(i, "quantidade");
      var comLimite = dsTpAprovDoc.getValue(i, "comLimite");

      var ctTipoAprovCodigo = DatasetFactory.createConstraint("codigo",
        codTipoAprovDoc,
        codTipoAprovDoc,
        ConstraintType.SHOULD);

      var dsTipoAprov = DatasetFactory.getDataset("adf_tipo_aprovacao",
        null,
        new Array(ctTipoAprovCodigo),
        null);

      var tipo = dsTipoAprov.getValue(0, "tipo");

      if (tipo == 'F')
        tipo = 'Faixa';

      if (tipo == 'P')
        tipo = 'Padrão';

      if (tipo == 'T')
        tipo = 'Técnica';

      if (tipo == 'L')
        tipo = 'Lista';

      if (tipo == 'H')
        tipo = 'Hierarquia';

      log.info('Tipo da Aprovação: ' + tipo);

      var count = 0;

      /*FAIXA*/
      if (tipo == "Faixa") {

        ctFaixas = DatasetFactory.createConstraint("tablename", "faixas", "faixas", ConstraintType.SHOULD);
        ctTipo = DatasetFactory.createConstraint("tipo", tipo, tipo, ConstraintType.SHOULD);

        ctValor = DatasetFactory.createConstraint("valor", valor, valor, ConstraintType.SHOULD);

        dsFaixas = DatasetFactory.getDataset("adf_get_faixas_aprovacao",
          null,
          new Array(ctCompanyId, ctEstab, ctTipoDocto, ctLotacao, ctValor),
          null);

        log.info('Buscando as faixas');

        // email de erro
        if (dsFaixas.rowsCount == null || dsFaixas.rowsCount == 0) {

          log.info('EMAIL ****');
          var param = getParamGeral();
          notificaGeral(
            param,
            null,
            null,
            "",
            "Erro geração da pendência:" + lotacao,
            "Erro geração da pendência:" + lotacao,
            param['emailNotificaErros'],
            lotacao,
            valor,
            codEstab
          );
        }

        for (var j = 0; j < dsFaixas.rowsCount; j++) {

          var idFaixa = dsFaixas.getValue(j, "sequencia");
          var valorIni = dsFaixas.getValue(j, "limiteIni");
          var valorFim = dsFaixas.getValue(j, "limiteFim");

          log.info('CodFaixa: ' + idFaixa);
          log.info('valorIni: ' + valorIni);
          log.info('valorFim: ' + valorFim);

          if (1 == 1) {

            ctCodFaixa = DatasetFactory.createConstraint("codFaixa", idFaixa, idFaixa, ConstraintType.MUST);

            log.info('Buscando aprovadores da faixa');
            log.info('*Parametros*');
            log.info('codFaixa:' + ctCodFaixa);
            log.info('companyid: ' + ctCompanyId);
            log.info('estab: ' + ctEstab);
            log.info('tipoDocto: ' + ctTipoDocto);
            log.info('lotacao: ' + ctLotacao);

            dsAprovadoresFaixa = DatasetFactory.getDataset(
              "adf_get_aprovadores_faixa",
              null,
              new Array(ctCodFaixa, ctCompanyId, ctEstab, ctTipoDocto, ctLotacao),
              null
            );

            // email de erro
            if (dsAprovadoresFaixa.rowsCount == 0) {

              log.info('EMAIL ****');
              var param = getParamGeral();
              notificaGeral(
                param,
                null,
                null,
                "",
                "Erro geração da pendência:" + lotacao,
                "Não achou aprovadores para a faixa:" + lotacao,
                param['emailNotificaErros'],
                lotacao,
                valor,
                codEstab
              );
            }

            // o registro anterior era dependente?
            // ja começa como true, para passar pelo primeiro registro
            var lastDependente = "true";

            for (var k = 0; k < dsAprovadoresFaixa.rowsCount; k++) {

              log.info('pegando aprovadores da faixa');
              log.info('retornou ' + dsAprovadoresFaixa.rowsCount + ' aprovadores ');
              log.info('tem dependente: ' + lastDependente);

              var dependente = dsAprovadoresFaixa.getValue(k, "aprovadorDependente");
              var codUsuario = dsAprovadoresFaixa.getValue(k, "aprovadorCodUsuario");

              if (lastDependente == "true") {

                lastDependente = dependente;

                var ctpermissaoCodTipoDocto = DatasetFactory.createConstraint("permissaoCodTipoDocto", tipDoc, tipDoc, ConstraintType.SHOULD);
                var ctUsuario = DatasetFactory.createConstraint("codUsuario", codUsuario, codUsuario, ConstraintType.SHOULD);

                log.info('aprovador:' + codUsuario);

                // limites do usuario do tipo de documento
                dsPermissoes = DatasetFactory.getDataset(
                  "adf_get_permissao_usuario",
                  null,
                  new Array(ctUsuario, ctCompanyId, ctLotacao, ctEstab, ctpermissaoCodTipoDocto),
                  null
                );

                log.info('tem permissoes: ' + dsPermissoes.rowsCount);

                // email de erro

                if (dsPermissoes.rowsCount == 0) {

                  // set como dependente para tentar o proximo
                  lastDependente = "true";

                  var colleagueName;
                  var consColleague = new Array(DatasetFactory.createConstraint("colleaguePK.colleagueId", codUsuario, codUsuario, ConstraintType.MUST));

                  var colleague = DatasetFactory.getDataset("colleague", null, consColleague, null);

                  if (colleague && colleague.rowsCount > 0) {

                    colleagueName = colleague.getValue(0, "colleagueName");
                  }

                  log.info('EMAIL ****');
                  var param = getParamGeral();
                  notificaGeral(
                    param,
                    null,
                    null,
                    "",
                    "Erro geração da pendência:" + lotacao,
                    "Aprovador não tem permissao no documento:" + tipDoc + " usuário: " + colleagueName,
                    param['emailNotificaErros'],
                    lotacao,
                    valor,
                    codEstab
                  );
                }

                //return dsPermissoes;

                //lotacoes do usuario
                dsLotacoes = DatasetFactory.getDataset(
                  "adf_get_lotacoes_usuario",
                  null,
                  new Array(ctUsuario, ctCompanyId, ctLotacao),
                  null
                );

                log.info('tem lotacao: ' + dsLotacoes.rowsCount);

                // email erro 

                if (dsLotacoes.rowsCount == 0) {

                  lastDependente = "true";

                  var colleagueName;

                  var consColleague = new Array(DatasetFactory.createConstraint("colleaguePK.colleagueId", codUsuario, codUsuario, ConstraintType.MUST));

                  var colleague = DatasetFactory.getDataset("colleague", null, consColleague, null);

                  if (colleague && colleague.rowsCount > 0) {

                    colleagueName = colleague.getValue(0, "colleagueName");
                  }

                  log.info('EMAIL ****');
                  var param = getParamGeral();
                  notificaGeral(
                    param,
                    null,
                    null,
                    "",
                    "Erro geração da pendência:" + lotacao,
                    "Aprovador não tem permissao na lotacao:" + lotacao + " usuário: " + colleagueName,
                    param['emailNotificaErros'],
                    lotacao,
                    valor,
                    codEstab
                  );
                }

                // return dsLotacoes;					
                if (dsPermissoes.rowsCount > 0) {
                  var limite = dsPermissoes.getValue(0, "limite");
                  log.info('limite: ' + limite);
                  log.info('valor: ' + valor);

                  // verificar datas								

                  // valor menor que limite
                  if (Number(valor) <= Number(limite)) {

                    log.info('valor' + valor + ' é menor que o limite:' + limite);

                    //usuário tem limite suficiente
                    if (dsLotacoes.rowsCount > 0) {
                      count++;
                      dsAprovadores.addRow(
                        new Array(
                          count,
                          prioridade,
                          codUsuario
                        )
                      );
                    }
                  } else {
                    // somente aprovadores com limite
                    if (comLimite) {

                      log.info('sem limite: o valor' + valor + ' é maior que o limite:' + limite);
                      log.info('indo para o próximo');

                      // para passar pelo próximo
                      lastDependente = "true";

                    } else {

                      // tem permissão na lotação
                      if (dsLotacoes.rowsCount > 0) {
                        count++;
                        dsAprovadores.addRow(
                          new Array(
                            count,
                            prioridade,
                            codUsuario
                          )
                        );
                      }

                    }

                  }
                } else {

                  //usuário não tem limite cadastrado
                }

              } //last dependente 

            }
          } // if( valor >= valorIni && valor <= valorFim)		
          else {
            // email de erro

            log.info('EMAIL ****');
            var param = getParamGeral();

            notificaGeral(
              param,
              null,
              null,
              "",
              "Erro geração da pendência:" + lotacao,
              "Erro geração da pendência:" + lotacao,
              param['emailNotificaErros'],
              lotacao,
              valor,
              codEstab
            );

          }

        }
      } // if tipo = faixa fim 
      if (tipo == "Padrão" || tipo == "Técnica") {

        dsAprovPadrao = DatasetFactory.getDataset(
          'adf_get_aprovador_padrao',
          null,
          null,
          null
        );

        for (var j = 0; j < dsAprovPadrao.rowsCount; j++) {

          var codUsuario = dsAprovPadrao.getValue(j, "aprovadorCodUsuario");

          var ctpermissaoCodTipoDocto = DatasetFactory.createConstraint("permissaoCodTipoDocto", tipDoc, tipDoc, ConstraintType.SHOULD);
          var ctUsuario = DatasetFactory.createConstraint("codUsuario", codUsuario, codUsuario, ConstraintType.SHOULD);

          log.info('aprovador:' + codUsuario);

          // limites do usuario do tipo de documento
          dsPermissoes = DatasetFactory.getDataset(
            "adf_get_permissao_usuario",
            null,
            new Array(ctUsuario, ctCompanyId, ctLotacao, ctEstab, ctpermissaoCodTipoDocto),
            null
          );

          log.info('tem permissoes: ' + dsPermissoes.rowsCount);

          //return dsPermissoes;

          //lotacoes do usuario
          dsLotacoes = DatasetFactory.getDataset(
            "adf_get_lotacoes_usuario",
            null,
            new Array(ctUsuario, ctCompanyId, ctLotacao),
            null
          );

          log.info('tem lotacao: ' + dsLotacoes.rowsCount);

          if (dsPermissoes.rowsCount > 0) {
            var limite = dsPermissoes.getValue(0, "limite");
            log.info('limite: ' + limite);

            // verificar datas

            // valor menor que limite
            if (valor <= limite) {

              //usuário tem limite suficiente
              if (dsLotacoes.rowsCount > 0) {
                count++;
                dsAprovadores.addRow(
                  new Array(
                    count,
                    prioridade,
                    codUsuario
                  )
                );
              }
            } else {
              // somente aprovadores com limite
              if (comLimite) {
                break;
              } else {

                // tem permissão na lotação
                if (dsLotacoes.rowsCount > 0) {
                  count++;
                  dsAprovadores.addRow(
                    new Array(
                      count,
                      prioridade,
                      codUsuario
                    )
                  );
                }

              }

            }
          } else {

            log.info('tipo de aprovação sem limite');

            count++;
            dsAprovadores.addRow(
              new Array(
                count,
                prioridade,
                codUsuario
              )
            );
          }

        }

      } // if tipo = tecnica/padrao fim
      if (tipo == "Hierarquia") {

      } // if tipo = hierarquia fim

      if (tipo == "Lista") {

        dsAprovadoresLista = DatasetFactory.getDataset(
          'adf_get_aprovadores_lista',
          null,
          new Array(ctCompanyId, ctEstab, ctTipoDocto),
          null
        );

        count++;
        for (var j = 0; j < dsAprovadoresLista.rowsCount; j++) {

          dsAprovadores.addRow(
            new Array(
              count,
              qtdMinima,
              dsAprovadoresLista.getValue(j, "aprovadorCodUsuario")
            )
          );

        }

      } // if tipo = lista fim
    }

  return dsAprovadores;

}

function onMobileSync(user) {

}

function notificaGeral(ParamGeral, docto, status, detalhes, subject, descricaoEmail, to, lotacao, valor, estab) {
  const dados = {
    tipoDocto: 'Aprovação',
    descricao: 'Não foi possível encontrar o aprovador para a lotação: ' + lotacao + ". Favor verificar os parâmetros",
    empresa: "Moinho",
    estab: estab,
    valor: valor,
    dataRef: new Date()
      .toString(),
    labelDataRef: "Data Referência",
    codProcesso: "Pendência de Aprovação",
    status: status,
    detalhes: detalhes,
    descricaoEmail: descricaoEmail
  };

  try {
    sendCustomEmail({
      companyId: ParamGeral.empresaFluig,
      from: ParamGeral.emailNotifica,
      subject: subject,
      to: to,
      templateId: 'adf_notifica_geral',
      templateDialect: 'pt_BR',
      templateHtml: 'adf_notifica_geral.html',
      dados: dados
    });

    log.info('*** notificaGeral - EMAIL ENVIADO COM SUCESSO! - ');
  } catch (e) {
    log.error('*** ADF notificaGeral - ERRO AO ENVIAR EMAIL! ${e}');
  }

}

function sendCustomEmail(params) {
  const mimeType = 'text/html';
  const data = new java.util.HashMap();
  const separador = java.io.File.separator;
  const globalParam = new javax.naming.InitialContext()
    .lookup('java:global/fluig/ecm-ejb/wdk/GlobalParam');
  const templatesFolder = globalParam.read(params.companyId)
    .getTemplatesFolder() + separador + 'tplmail' + separador + params.templateId + separador + params.templateDialect;
  const sdk = new javax.naming.InitialContext()
    .lookup('java:global/fluig/wcm-core/service/SDK');

  // Valores default
  data.put('SERVER_URL', sdk.getServerURL());
  data.put('SERVER_EXTERNAL_URL', sdk.getServerContextURL());
  data.put('SERVER_PROTECTED_URL', sdk.getProtectedTenantContextPath());
  data.put('COMPANY_ID', params.companyId);

  // Copio datos propios del template
  if (params.dados) {
    for (param in params.dados) {
      data.put(param, params.dados[param]);
    }
  }

  com.fluig.foundation.mail.EMailSenderFactory.getEMailSender()
    .customEmail(new java.lang.Long(params.companyId), params.subject, params.from, params.to, templatesFolder, params.templateHtml, mimeType, data);
}

function getParamGeral() {
  var a = new Array(DatasetFactory.createConstraint("metadata#active", !0, !0, ConstraintType.MUST)),
    t = DatasetFactory.getDataset("adf_param_geral", null, a, null),
    e = {},
    o = ["usuarioErp", "senhaErp", "empresaFluig", "usuarioFluig", "senhaFluig", "emailNotifica", "emailNotificaErros"];
  return t.rowsCount > 0 && o.forEach(function (a) {
    e[a] = String(t.getValue(0, a))
  }), e
}
