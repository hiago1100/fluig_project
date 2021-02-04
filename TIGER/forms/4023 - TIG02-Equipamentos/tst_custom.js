var arqFormOpts = {
  parsley: {
    // Parametros configuracion enviados a parseley
    genericErrorMessage: false
  },

  onView: function () {},

  onEdit: {
    custom: function () {
      $("#alertaDescontaminacao")
        .hide();
      $("#alertaTesteValvula")
        .hide();
      $("#alertaManutencao")
        .hide();
      $("#alertaPintura")
        .hide();
      $("#alertaCertifica")
        .hide();
      $("#alertaInspecaoFinal")
        .hide();

    },

    bpm: {
      'Inicio': {
        task: [0, 4],
        custom: function () {

          $("#home")
            .addClass("active");
          $("#li1")
            .addClass("active");
          $("#tab2")
            .removeClass("active");
          $("#li2")
            .removeClass("active");
          $("#li3")
            .removeClass("active");
          $("#tab3")
            .removeClass("active");
          $("#li4")
            .removeClass("active");
          $("#tab4")
            .removeClass("active");
          $("#li5")
            .removeClass("active");
          $("#tab5")
            .removeClass("active");
          $("#li6")
            .removeClass("active");
          $("#tab6")
            .removeClass("active");
          $("#li7")
            .removeClass("active");
          $("#tab7")
            .removeClass("active");
          $("#li8")
            .removeClass("active");
          $("#tab8")
            .removeClass("active");

          //INICIO CAMPOS OBRIGATORIOS//
          $("#nunSerie")
            .attr('data-parsley-required', 'true');
          $("#inspetor")
            .attr('data-parsley-required', 'true');

          $("#receita")
            .attr('data-parsley-required', 'true');
          $("input[type=radio][name=avariasTanque]")
            .attr('data-parsley-required', 'true')
            .change();

          $("input[type=radio][name=efetuarInpesaoVisual]")
            .attr('data-parsley-required', 'true')
            .change();
          $("input[type=radio][name=efetuarTesteEstanqueidade]")
            .attr('data-parsley-required', 'true')
            .change();
          $("input[type=radio][name=testeParticulaMagnetica]")
            .attr('data-parsley-required', 'true')
            .change();
          $("input[type=radio][name=testeHidrostatico]")
            .attr('data-parsley-required', 'true')
            .change();

          $("input[type=radio][name=objResiduo]")
            .attr('data-parsley-required', 'true')
            .change();
          $("input[type=radio][name=necessitaLavagem]")
            .attr('data-parsley-required', 'true')
            .change();
          $("input[type=radio][name=efetuarInpesaoVisual]")
            .attr('data-parsley-required', 'true')
            .change();

          $("input[type=radio][name=testeParticulaMagnetica]")
            .attr('data-parsley-required', 'true')
            .change();
          //FIM CAMPOS OBRIGATORIOS//

          $('#descRealizamanutencao')
            .keyup(function () {
              var valor = $('#descRealizamanutencao')
                .val();
              $("#obsInicial")
                .val(valor);
            });

          $("input[type=radio][name=perdaTotal]")
            .attr("disabled", "disabled")
            .change();
          $("input[type=radio][name=valorFranquia]")
            .attr("disabled", "disabled")
            .change();

          $("#nunSerie")
            .change(function () {
              $.ajax({
                  type: "POST",
                  url: window.location.protocol + "//" + window.location.host + "/ecm/api/rest/ecm/dataset/datasets/",
                  contentType: "application/json; charset=utf-8",
                  dataType: "json",
                  data: JSON.stringify({
                    name: 'Tiger-Contentores',
                    constraints: [

                      {
                        _field: "nunSerie",
                        _initialValue: $("#nunSerie")
                          .val(),
                        _finalValue: "",
                        _type: 1
                      },
                      {
                        _field: "empresa",
                        _initialValue: $("#empresa")
                          .val(),
                        _finalValue: "",
                        _type: 1
                      },
                      {
                        _field: "filial",
                        _initialValue: $("#codfilial")
                          .val(),
                        _finalValue: "",
                        _type: 1
                      }
                    ]
                  })
                })
                .done(function (dataset) {
                  if (dataset.values.length) {

                    var csEqpto1 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
                    var csEqpto2 = DatasetFactory.createConstraint("nunSerie", $("#nunSerie")
                      .val(), $("#nunSerie")
                      .val(), ConstraintType.MUST);
                    var constraints = new Array(csEqpto1, csEqpto2);
                    var dsEqpto = DatasetFactory.getDataset("tiger_equipamentos", null, constraints, null);
                    console.log(dsEqpto.values.length);

                    for (var i = 0; i < dsEqpto.values.length; i++) {

                      console.log(i, dsEqpto.values[i])

                      var csDocument1 = DatasetFactory.createConstraint("cardDocumentId", dsEqpto.values[i].documentid, dsEqpto.values[i].documentid, ConstraintType.MUST);
                      var constraints = new Array(csDocument1);
                      var dsEqptoWP = DatasetFactory.getDataset("workflowProcess", null, constraints, null);

                      var csProcess1 = DatasetFactory.createConstraint("active", true, true, ConstraintType.MUST);
                      var csProcess2 = DatasetFactory.createConstraint("processHistoryPK.processInstanceId", dsEqptoWP.values[0]['workflowProcessPK.processInstanceId'], dsEqptoWP.values[0]['workflowProcessPK.processInstanceId'], ConstraintType.MUST);
                      var constraints = new Array(csProcess1, csProcess2);
                      var dsEqptoPH = DatasetFactory.getDataset("processHistory", null, constraints, null);

                      // console.log(dsContentores.values.length)

                      if (dsEqptoPH.values.length > 0) {
                        FLUIGC.toast({
                          title: 'Ops...',
                          message: 'Já existe uma solicitação aberta para esse número de série',
                          type: 'danger'
                        });
                        return;
                      }
                    }

                    var NUMOS = dataset.values[0]['NUMOS'];
                    var MODELO = dataset.values[0]['MODELO'];
                    var NOMECLIENTE = dataset.values[0]['NOMECLIENTE'];
                    var NOTAFISCAL = dataset.values[0]['NOTAFISCAL'].replace(/ /g, "");
                    var CODIGOCLIENTE = dataset.values[0]['CODIGOCLIENTE'];
                    var TIPO = dataset.values[0]['TIPO'];
                    var DATARECEBIMENTO = dataset.values[0]['DATARECEBIMENTO'];

                    var INSPECAOVISUAL = dataset.values[0]['DATAINSPECAOVISUAL'];
                    
                    if(INSPECAOVISUAL == undefined || INSPECAOVISUAL == ''){
                    	INSPECAOVISUAL = dataset.values[0]['dataInspeVisual'];
                    }

                    var DATATESTEESTANQUEIDADE = dataset.values[0]['DATATESTEESTANQUEIDADE'];

                    var DATATESTEMAGNETICA = dataset.values[0]['DATATESTEMAGNETICA'];

                    var DATATESTEHIDROSTATICO = dataset.values[0]['DATATESTEHIDROSTATICO'];
                    
                    var validadeEstanqueidade = dataset.values[0]['validadeEstanqueidade'];
                    var validadeHidrostatico = dataset.values[0]['validadeHidrostatico'];
                    var validadeInspecaoVisual = dataset.values[0]['validadeInspecaoVisual'];
                    var validadeMagnetico = dataset.values[0]['validadeMagnetico'];
                    
                    $('#nunOs')
                      .val(NUMOS);
                    $('#modelo')
                      .val(MODELO);
                    $('#nomeDoCliente')
                      .val(NOMECLIENTE);
                    $('#nf')
                      .val(NOTAFISCAL);
                    $('#codNomeCliente')
                      .val(CODIGOCLIENTE);
                    $('#dataRecebimento')
                      .val(DATARECEBIMENTO);

                    $('#dataInspecaoVisual')
                      .val(INSPECAOVISUAL);
                    $('#dataTesteEstanqueidade')
                      .val(DATATESTEESTANQUEIDADE);
                    $('#dataParticulaMagnetica')
                      .val(DATATESTEMAGNETICA);
                    $('#dataTesteHidrostatico')
                      .val(DATATESTEHIDROSTATICO);

                    $('#prximaInspecaoVisualCert')
                      .val(INSPECAOVISUAL);
                    $('#dataPaticulaMagCert')
                      .val(DATATESTEMAGNETICA);
                    
                    $('#validadeMagnetico')
                    	.val(validadeMagnetico);
                    $('#validadeInspecaoVisual')
                    	.val(validadeInspecaoVisual);

                    if (TIPO == "Devolucao" || TIPO == "Novo") {
                      $("input[value=servico]")
                        .prop("checked", false);
                      $("input[value=devolucao]")
                        .prop("checked", true);
                    }
                    if (TIPO == "Servico") {
                      $("input[value=servico]")
                        .prop("checked", true);
                      $("input[value=devolucao]")
                        .prop("checked", false);
                    }
                  }

                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                  alert('Não foi possivel carregar os orçamentos');
                });

            });

          $('#filial')
            .arqzoom({
              datasetId: 'Tiger-Empresa',
              //searchField: 'fornecedor',
              template: {
                row: [
                  { field: 'CODIGO', header: "Codigo", width: "20%" },
                  { field: 'NOME', header: "Nome", width: "40%" },
                ],
                width: "300px",
              },
              displayKey: function (res) {
                return res['NOME'];
              },
              callback: function (res) {
                $('#codfilial')
                  .val(res['CODIGO']);

              },
              clean: function (res) {
                $('#codfilial')
                  .val('');
              }
            });

          $("input[type=radio][name=tipoOs]")
            .attr("disabled", "disabled")
            .change();

          $("input[type=radio][name=avariasTanque]")
            .click(function () {
              var avaria = $("input:radio[name=avariasTanque]:checked")
                .val();
              if (avaria == "sim") {
                $("input[type=radio][name=perdaTotal]")
                  .attr('data-parsley-required', 'true')
                  .change();
                $("input[type=radio][name=perdaTotal]")
                  .removeAttr("disabled", "disabled")
                  .change();
                $("input[type=radio][name=segregarIBC]")
                  .attr('data-parsley-required', 'true')
                  .change();
                $("input[type=radio][name=perdaTotal]")
                  .click(function () {
                    var percaTotal = $("input:radio[name=perdaTotal]:checked")
                      .val();

                    if (percaTotal == "sim") {
                      $("input[type=radio][name=valorFranquia]")
                        .removeAttr("disabled", "disabled")
                        .change();

                      $("input[type=radio][name=valorFranquia]")
                        .attr("disabled", "disabled")
                        .change();
                      $("input[type=radio][name=valorFranquia]")
                        .prop("checked", false)
                        .change();

                    } else {
                      $("input[type=radio][name=valorFranquia]")
                        .attr('data-parsley-required', 'false')
                        .change();
                      $("input[type=radio][name=valorFranquia]")
                        .removeAttr("disabled", "disabled")
                        .change();
                      $("input[type=radio][name=valorFranquia]")
                        .prop("checked", false)
                        .change();
                      $("input[type=radio][name=valorFranquia]")
                        .attr('data-parsley-required', 'true')
                        .change();
                    }
                  })
              } else {
                $("input[type=radio][name=perdaTotal]")
                  .attr('data-parsley-required', 'false')
                  .change();
                $("input[type=radio][name=perdaTotal]")
                  .attr("disabled", "disabled")
                  .change();
                $("input[type=radio][name=perdaTotal]")
                  .prop("checked", false)
                  .change();
                $("input[type=radio][name=valorFranquia]")
                  .prop("checked", false)
                  .change();
                $("input[type=radio][name=valorFranquia]")
                  .attr("disabled", "disabled")
                  .change();
                $("input[type=radio][name=segregarIBC]")
                  .attr('data-parsley-required', 'false')
                  .change();
              }
            });

          //INICIO CRIA O ZOOM NO CAMPO DE RECEITA//
          $('#receita')
            .arqzoom({
              datasetId: 'TIG01-Receitas',
              //searchField: 'fornecedor',
              template: {
                row: [
                  { field: 'codReceita', header: "Codigo Receita", width: "40%" },
                  { field: 'nomeReceita', header: "Nome Receita", width: "40%" },
                ],
                width: "600px",
              },
              displayKey: function (res) {
                return res['nomeReceita'];
              },
              callback: function (res) {
                console.log(res);
                $("#codReceita")
                  .val(res["codReceita"]);
                $("#codReceita2")
                  .val(res["codReceita"]);

                $("#receita2")
                  .val(res["nomeReceita"]);

              },
              clean: function (res) {
                $('#codFornecedor')
                  .val('');
              }
            });
          //FIM  O ZOOM NO CAMPO DE RECEITA//
          // CRIA A TABELA DE RESIDUO//
          $('#tabelaResiduo')
            .arqmasterdetail({
              buttonNewRow: "#btnNuevo",
              buttonsDeleteRow: ".deleteRow",
              buttonsDuplicateRow: ".duplicateRow",
              onDeleteRow: function ($tr) {
                return confirm("Confirma eliminación?");
              },
              afterDeleteRow: function ($tr, index) {
                var total = sumarColumna('importe', 'tablaProds');
                $('#importeTotal')
                  .val(total)
                  .change();
              },
              onDuplicateRow: function ($tr) {
                return confirm("Confirma duplicación?");
              },
              afterDuplicateRow: function ($tr, index) {
                var total = sumarColumna('importe', 'tablaProds');
                $('#importeTotal')
                  .val(total)
                  .change();
              },
              onCustomizeRow: function ($tr, index) {

                $('.cliente', $tr)
                  .arqzoom({
                    datasetId: 'TIG01-CadastroResiduo2',
                    //searchField: 'fornecedor',
                    template: {
                      row: [
                        { field: 'cliente', header: "Cliente", width: "20%" },
                        { field: 'residuo', header: "Residuo", width: "40%" },
                        { field: 'quantidade', header: "Quantidade", width: "20%" },
                        { field: 'onu', header: "ONU", width: "20%" },
                      ],
                      width: "1000px",
                    },
                    displayKey: function (res) {
                      return res['cliente'];
                    },
                    callback: function (res) {
                      $('.residuo', $tr)
                        .val(res['residuo']);
                      $('.quantidade', $tr)
                        .val(res['quantidade']);
                      $('.onu', $tr)
                        .val(res['onu']);

                    },
                    clean: function (res) {
                      $('#codFornecedor')
                        .val('');
                    }
                  });
              }
            });
          // FIM A TABELA DE RESIDUO//

          $('#dataInspecaoVisual,#dataTesteEstanqueidade,#dataParticulaMagnetica,#dataTesteHidrostatico')
            .arqdatetimepicker({
              pickTime: true,
              language: 'pt',
              format: 'dd/mm/yyyy',
              autoclose: true,
              todayHighlight: true
            });

          $('#dataInspeVisual,#dataEstanqueidade,#dataMagnetica,#datahidrostatico')
            .arqdatetimepicker({
              pickTime: true,
              language: 'pt',
              format: 'dd/mm/yyyy',
              autoclose: true,
              todayHighlight: true
            });
        },
        'otherwise': function () {
          $(".desabilitaAba01")
            .attr("disabled", "disabled");
          $("input[type=radio][name=tipoOs]")
            .attr('disabled', 'disabled');
          $("input[type=radio][name=avariasTanque]")
            .attr('disabled', 'disabled');
          $("input[type=radio][name=perdaTotal]")
            .attr('disabled', 'disabled');
          $("input[type=radio][name=valorFranquia]")
            .attr('disabled', 'disabled');
          $("input[type=radio][name=efetuarInpesaoVisual]")
            .attr('disabled', 'disabled');
          $("input[type=radio][name=efetuarTesteEstanqueidade]")
            .attr('disabled', 'disabled');
          $("input[type=radio][name=testeParticulaMagnetica]")
            .attr('disabled', 'disabled');
          $("input[type=radio][name=testeHidrostatico]")
            .attr('disabled', 'disabled');
          $("input[type=radio][name=realizaManutencao]")
            .attr('disabled', 'disabled');
          $("input[type=radio][name=realizaManu]")
            .attr('disabled', 'disabled');
        }
      },
      'Planejador': {
        task: 205,
        custom: function () {
          $("#home")
            .addClass("active");
          $("#li1")
            .addClass("active");

          $("#menu1")
            .removeClass("active");
          $("#li2")
            .removeClass("active");

          $("#menu2")
            .removeClass("active");
          $("#li3")
            .removeClass("active");

          $("#menu3")
            .removeClass("active");
          $("#li4")
            .removeClass("active");

          $("#menu4")
            .removeClass("active");
          $("#li5")
            .removeClass("active");

          $("#menu5")
            .removeClass("active");
          $("#li6")
            .removeClass("active");

          $("#tab6")
            .removeClass("active");
          $("#li7")
            .removeClass("active");

          $("#tab7")
            .removeClass("active");
          $("#li8")
            .removeClass("active");
        },
        'otherwise': function () {

        }
      },
      'Segregado': {
        task: 137,
        custom: function () {
          $("#home")
            .addClass("active");
          $("#li1")
            .addClass("active");

          $("#menu1")
            .removeClass("active");
          $("#li2")
            .removeClass("active");

          $("#menu2")
            .removeClass("active");
          $("#li3")
            .removeClass("active");

          $("#menu3")
            .removeClass("active");
          $("#li4")
            .removeClass("active");

          $("#menu4")
            .removeClass("active");
          $("#li5")
            .removeClass("active");

          $("#menu5")
            .removeClass("active");
          $("#li6")
            .removeClass("active");

          $("#tab6")
            .removeClass("active");
          $("#li7")
            .removeClass("active");

          $("#tab7")
            .removeClass("active");
          $("#li8")
            .removeClass("active");

          $("input[type=radio][name=aprovadoCliente]")
            .attr('data-parsley-required', 'true')
            .change();
        },
        'otherwise': function () {
          $("input[type=radio][name=aprovadoCliente]")
            .attr('disabled', 'disabled');

        }
      },
      'FilaDescontaminacao': {
        task: 24,
        custom: function () {

          $("#home")
            .removeClass("active");
          $("#li1")
            .removeClass("active");

          $("#menu1")
            .removeClass("active");
          $("#li2")
            .removeClass("active");

          $("#menu2")
            .addClass("active");
          $("#li3")
            .addClass("active");

          $("#menu3")
            .removeClass("active");
          $("#li4")
            .removeClass("active");

          $("#menu4")
            .removeClass("active");
          $("#li5")
            .removeClass("active");

          $("#menu5")
            .removeClass("active");
          $("#li6")
            .removeClass("active");

          $("#tab6")
            .removeClass("active");
          $("#li7")
            .removeClass("active");

          $("#tab7")
            .removeClass("active");
          $("#li8")
            .removeClass("active");

          $("#filaDescontaminacao")
            .hide();

          $("#alertaDescontaminacao")
            .show();
        },
        'otherwise': function () {

        }
      },
      'Descontaminacao': {
        task: 26,
        custom: function () {

          $("#home")
            .removeClass("active");
          $("#li1")
            .removeClass("active");

          $("#menu1")
            .removeClass("active");
          $("#li2")
            .removeClass("active");

          $("#menu2")
            .addClass("active");
          $("#li3")
            .addClass("active");

          $("#menu3")
            .removeClass("active");
          $("#li4")
            .removeClass("active");

          $("#menu4")
            .removeClass("active");
          $("#li5")
            .removeClass("active");

          $("#menu5")
            .removeClass("active");
          $("#li6")
            .removeClass("active");

          $("#tab6")
            .removeClass("active");
          $("#li7")
            .removeClass("active");

          $("#tab7")
            .removeClass("active");
          $("#li8")
            .removeClass("active");

          $("#RespnsavelDesconta")
            .attr('data-parsley-required', 'true')
            .change();

          var data = new Date();
          var dia = data.getDate();
          var mes = data.getMonth() + 1;
          var ano = data.getFullYear();

          if (dia < 10 && mes < 10) {
            $("#dataDescontaminacao")
              .val("0" + dia + "/" + "0" + mes + "/" + ano);
          } else if (dia > 10 && mes < 10) {
            $("#dataDescontaminacao")
              .val(dia + "/" + "0" + mes + "/" + ano);
          } else {
            $("#dataDescontaminacao")
              .val(dia + "/" + mes + "/" + ano);
          }

          //INICIO CRIA O ZOOM NO CAMPO DE RECEITA//
          $('#receita2')
            .arqzoom({
              datasetId: 'TIG01-Receitas',
              //searchField: 'fornecedor',
              template: {
                row: [
                  { field: 'codReceita', header: "Codigo Receita", width: "40%" },
                  { field: 'nomeReceita', header: "Nome Receita", width: "40%" },
                ],
                width: "600px",
              },
              displayKey: function (res) {
                return res['nomeReceita'];
              },
              callback: function (res) {
                $(".codReceita")
                  .val(res["codReceita"]);
                $("#codReceita2")
                  .val(res["codReceita"]);

                $("#receita2")
                  .val(res["nomeReceita"]);

                var dataset_Receitas = "TIG01-Receitas";
                var codReceita = $(".codReceita")
                  .val();

                var cst1 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
                var cst2 = DatasetFactory.createConstraint("codReceita", codReceita, codReceita, ConstraintType.MUST);
                var constraints = new Array(cst1, cst2);
                var datasetPrincipal = DatasetFactory.getDataset(dataset_Receitas, null, constraints, null);

                var documentId = datasetPrincipal.values[0]["metadata#id"];
                var documentVersion = datasetPrincipal.values[0]["metadata#version"];
                var c1 = DatasetFactory.createConstraint("tablename", "tablaProvision", "tablaProvision", ConstraintType.MUST);
                var c2 = DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST);
                var c3 = DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST);
                var constraintsFilhos = new Array(c1, c2, c3);

                var datasetFilhos = DatasetFactory.getDataset(dataset_Receitas, null, constraintsFilhos, null);

                $('#tabelaReceitas tbody tr')
                  .slice(1)
                  .remove();
                for (var j = 0; j < datasetFilhos.values.length; j++) {
                  //Componentes
                  wdkAddChild('tabelaReceitas');
                  var $row = $('#tabelaReceitas tbody tr:last');

                  $row.css("display", "");

                  $('.deleteRow', $row)
                    .css("display", "block")
                    .click(function () {
                      fnWdkRemoveChild(this);
                    });
                  $('.codProduto', $row)
                    .val(datasetFilhos.values[j].codProduto);
                  $('.nomeProduto', $row)
                    .val(datasetFilhos.values[j].nomeProduto);
                  $('.quantidadeProduto', $row)
                    .val(datasetFilhos.values[j].quantidade);
                  $('.servicoReceita', $row)
                    .val(datasetFilhos.values[j].codServico);

                }
              },
              clean: function (res) {
                $('#codFornecedor')
                  .val('');
              }
            });
          //FIM  O ZOOM NO CAMPO DE RECEITA//
        },
        'otherwise': function () {
          $(".desabilitaAba03")
            .attr("disabled", "disabled");
        }
      },
      'FilaTesteValvula': {
        task: 31,
        custom: function () {

          $("#home")
            .removeClass("active");
          $("#li1")
            .removeClass("active");

          $("#menu1")
            .removeClass("active");
          $("#li2")
            .removeClass("active");

          $("#menu2")
            .removeClass("active");
          $("#li3")
            .removeClass("active");

          $("#menu3")
            .addClass("active");
          $("#li4")
            .addClass("active");

          $("#menu4")
            .removeClass("active");
          $("#li5")
            .removeClass("active");

          $("#menu5")
            .removeClass("active");
          $("#li6")
            .removeClass("active");

          $("#tab6")
            .removeClass("active");
          $("#li7")
            .removeClass("active");

          $("#tab7")
            .removeClass("active");
          $("#li8")
            .removeClass("active");

          $("#filaValvula")
            .hide();

          $("#alertaTesteValvula")
            .show();
        },
        'otherwise': function () {

        }
      },
      'TesteValvula': {
        task: 33,
        custom: function () {

          $("#home")
            .removeClass("active");
          $("#li1")
            .removeClass("active");

          $("#menu1")
            .removeClass("active");
          $("#li2")
            .removeClass("active");

          $("#menu2")
            .removeClass("active");
          $("#li3")
            .removeClass("active");

          $("#menu3")
            .addClass("active");
          $("#li4")
            .addClass("active");

          $("#menu4")
            .removeClass("active");
          $("#li5")
            .removeClass("active");

          $("#menu5")
            .removeClass("active");
          $("#li6")
            .removeClass("active");

          $("#tab6")
            .removeClass("active");
          $("#li7")
            .removeClass("active");

          $("#tab7")
            .removeClass("active");
          $("#li8")
            .removeClass("active");

          $("#operaResponsaValvula")
            .attr('data-parsley-required', 'true')
            .change();

          var data = new Date();
          var dia = data.getDate();
          var mes = data.getMonth() + 1;
          var ano = data.getFullYear();

          if (dia < 10 && mes < 10) {
            $("#dataOperaResponsaValvula")
              .val("0" + dia + "/" + "0" + mes + "/" + ano);
          } else if (dia > 10 && mes < 10) {
            $("#dataOperaResponsaValvula")
              .val(dia + "/" + "0" + mes + "/" + ano);
          } else {
            $("#dataOperaResponsaValvula")
              .val(dia + "/" + mes + "/" + ano);
          }

          $('#dataEstanqueidade,#datahidrostatico,#dataOperaResponsaValvula')
            .arqdatetimepicker({
              pickTime: true,
              language: 'pt',
              format: 'dd/mm/yyyy',
              autoclose: true,
              todayHighlight: true
            });

          var cont = $("#validateste")
            .val($("#validateste")
              .val() + 1);
          var cont2 = $("#validateste")
            .val()

          if (cont2 == "1") {
            var efetuarTesteEstanqueidade = $("input:radio[name=efetuarTesteEstanqueidade]:checked")
              .val();

            if (efetuarTesteEstanqueidade == "sim") {
              $('input:radio[name=efetuarTesteEstanqueidade2][value=sim]')
                .attr('checked', true);

              if (dia < 10 && mes < 10) {
                $("#dataEstanqueidade")
                  .val("0" + dia + "/" + "0" + mes + "/" + ano);
              } else if (dia > 10 && mes < 10) {
                $("#dataEstanqueidade")
                  .val(dia + "/" + "0" + mes + "/" + ano);
              } else {
                $("#dataEstanqueidade")
                  .val(dia + "/" + mes + "/" + ano);
              }

            } else {
              $('input:radio[name=efetuarTesteEstanqueidade2][value=nao]')
                .attr('checked', true);
            }

            var testeHidrostatico = $("input:radio[name=testeHidrostatico]:checked")
              .val();

            if (testeHidrostatico == "sim") {
              $('input:radio[name=efetuarTesteHidrostatico][value=sim]')
                .attr('checked', true);
              var data = new Date();
              var dia = data.getDate();
              var mes = data.getMonth() + 1;
              var ano = data.getFullYear();

              if (dia < 10 && mes < 10) {
                $("#datahidrostatico")
                  .val("0" + dia + "/" + "0" + mes + "/" + ano);
              } else if (dia > 10 && mes < 10) {
                $("#datahidrostatico")
                  .val(dia + "/" + "0" + mes + "/" + ano);
              } else {
                $("#datahidrostatico")
                  .val(dia + "/" + mes + "/" + ano);
              }

            } else {
              $('input:radio[name=efetuarTesteHidrostatico][value=nao]')
                .attr('checked', true);
            }
          }

          $("input:radio[name=efetuarTesteEstanqueidade2]")
            .click(function () {
              var efetuarTesteEstanqueidade2 = $("input:radio[name=efetuarTesteEstanqueidade2]:checked")
                .val();

              if (efetuarTesteEstanqueidade2 == "sim") {
                $("#dataEstanqueidade")
                  .removeAttr("disabled", "disabled");

                if (dia < 10 && mes < 10) {
                  $("#dataEstanqueidade")
                    .val("0" + dia + "/" + "0" + mes + "/" + ano);
                } else if (dia > 10 && mes < 10) {
                  $("#dataEstanqueidade")
                    .val(dia + "/" + "0" + mes + "/" + ano);
                } else {
                  $("#dataEstanqueidade")
                    .val(dia + "/" + mes + "/" + ano);
                }

              }
              if (efetuarTesteEstanqueidade2 == "nao") {
                $("#dataEstanqueidade")
                  .val("");
                $("#dataEstanqueidade")
                  .attr("disabled", "disabled");
              }

            });

          $("input:radio[name=efetuarTesteHidrostatico]")
            .click(function () {
              var efetuarTesteHidrostatico = $("input:radio[name=efetuarTesteHidrostatico]:checked")
                .val();

              if (efetuarTesteHidrostatico == "sim") {
                $("#datahidrostatico")
                  .removeAttr("disabled", "disabled");
                var data = new Date();
                var dia = data.getDate();
                var mes = data.getMonth() + 1;
                var ano = data.getFullYear();

                if (dia < 10 && mes < 10) {
                  $("#datahidrostatico")
                    .val("0" + dia + "/" + "0" + mes + "/" + ano);
                } else if (dia > 10 && mes < 10) {
                  $("#datahidrostatico")
                    .val(dia + "/" + "0" + mes + "/" + ano);
                } else {
                  $("#datahidrostatico")
                    .val(dia + "/" + mes + "/" + ano);
                }
              }
              if (efetuarTesteHidrostatico == "nao") {
                $("#datahidrostatico")
                  .val("");
                $("#datahidrostatico")
                  .attr("disabled", "disabled");
              }

            });

          var dataEstanqueidade2 = $("#dataEstanqueidade")
            .val();

          if (dataEstanqueidade2 == "") {
            $("#dataEstanqueidade")
              .attr("disabled", "disabled");
          }

          var datahidrostatico2 = $("#datahidrostatico")
            .val();

          if (datahidrostatico2 == "") {
            $("#datahidrostatico")
              .attr("disabled", "disabled");
          }

        },
        'otherwise': function () {
          $(".desabilitaAba04")
            .attr("disabled", "disabled");
          $("input[type=radio][name=manuDeValvula]")
            .attr('disabled', 'disabled');
          $("input[type=radio][name=inspecaoInterVaso]")
            .attr('disabled', 'disabled');
          $("input[type=radio][name=efetuarTesteEstanqueidade2]")
            .attr('disabled', 'disabled');
          $("input[type=radio][name=efetuarTesteHidrostatico]")
            .attr('disabled', 'disabled');

        }
      },
      'FilaManutencao': {
        task: 36,
        custom: function () {

          $("#home")
            .removeClass("active");
          $("#li1")
            .removeClass("active");

          $("#menu1")
            .removeClass("active");
          $("#li2")
            .removeClass("active");

          $("#menu2")
            .removeClass("active");
          $("#li3")
            .removeClass("active");

          $("#menu3")
            .removeClass("active");
          $("#li4")
            .removeClass("active");

          $("#menu4")
            .addClass("active");
          $("#li5")
            .addClass("active");

          $("#menu5")
            .removeClass("active");
          $("#li6")
            .removeClass("active");

          $("#tab6")
            .removeClass("active");
          $("#li7")
            .removeClass("active");

          $("#tab7")
            .removeClass("active");
          $("#li8")
            .removeClass("active");

          $("#filaManutencao")
            .hide();

          $("#alertaManutencao")
            .show();
        },
        'otherwise': function () {

        }
      },

      'Manutencao': {
        task: 38,
        custom: function () {

          $("#home")
            .removeClass("active");
          $("#li1")
            .removeClass("active");

          $("#menu1")
            .removeClass("active");
          $("#li2")
            .removeClass("active");

          $("#menu2")
            .removeClass("active");
          $("#li3")
            .removeClass("active");

          $("#menu3")
            .removeClass("active");
          $("#li4")
            .removeClass("active");

          $("#menu4")
            .addClass("active");
          $("#li5")
            .addClass("active");

          $("#menu5")
            .removeClass("active");
          $("#li6")
            .removeClass("active");

          $("#tab6")
            .removeClass("active");
          $("#li7")
            .removeClass("active");

          $("#tab7")
            .removeClass("active");
          $("#li8")
            .removeClass("active");

          // CRIA A TABELA DE REQUISICAO//
          $('#tabelaRequisicao')
            .arqmasterdetail({
              buttonNewRow: "#btnRequisicao",
              buttonsDeleteRow: ".deleteRow",
              buttonsDuplicateRow: ".duplicateRow",
              onDeleteRow: function ($tr) {
                return confirm("Confirma eliminación?");
              },
              afterDeleteRow: function ($tr, index) {

              },
              onDuplicateRow: function ($tr) {
                return confirm("Confirma duplicación?");
              },
              afterDuplicateRow: function ($tr, index) {

              },
              onCustomizeRow: function ($tr, index) {

                $('.quantidadePeca', $tr)
                  .number(true, 2, '.', '.');

                $('.codigo', $tr)
                  .arqzoom({
                    datasetId: 'Tiger-Pecas',
                    resultFields: ['CODPECA'],
                    filterValues: function (searchValue) {
                      return [

                        {
                          "_field": "CODPECA",
                          "_initialValue": searchValue,
                          "_finalValue": searchValue,
                          "_type": 1, //MUST
                          "_likeSearch": true
                        },
                        {
                          "_field": "empresa",
                          "_initialValue": $("#empresa")
                            .val(),
                          "_finalValue": $("#empresa")
                            .val(),
                          "_type": 3, //MUST_NOT
                        },
                        {
                          "_field": "filial",
                          "_initialValue": $("#codfilial")
                            .val(),
                          "_finalValue": $("#codfilial")
                            .val(),
                          "_type": 3, //MUST_NOT
                        },
                      ];
                    },
                    template: {
                      row: [
                        { field: 'CODPECA', header: "Codigo", width: '30%' },
                        { field: 'DESCRICAOPECA', header: "Descrição", width: '30%' },
                        { field: 'QTDEESTOQUE', header: "Quantidade", width: "20%" },
                        { value: "Desc: <b>{{CODPECA}}</b>", header: "<u>Generated Column</u>", width: '40%' }
                      ],
                      width: "800px",
                    },
                    displayKey: function (res) {
                      return res['CODPECA'];
                    },
                    callback: function (res) {
                      $('.codigoDesc', $tr)
                        .val(res['DESCRICAOPECA']);
                      $('.trocarPordesc', $tr)
                        .val(res['DESCRICAOPECA']);
                      $('.trocarPor', $tr)
                        .val(res['CODPECA'])
                        .change();
                      $('.estoque', $tr)
                        .val(res['QTDEESTOQUE'])
                        .change();
                    },
                    clean: function (res) {
                      $('#region')
                        .val('')
                        .change();
                    },
                  });

                $('.Codservico', $tr)
                  .arqzoom({
                    datasetId: 'Tiger-Servico',
                    filterValues: {
                      'empresa': $("#empresa")
                        .val(),
                      'filial': $("#codfilial")
                        .val()
                    },
                    template: {
                      row: [
                        { field: 'CODSERVICO', header: "Codigo", width: "20%" },
                        { field: 'DESCRICAOSERVICO', header: "Descrição", width: "40%" },

                      ],
                      width: "1000px",
                    },
                    displayKey: function (res) {
                      return res['CODSERVICO'];
                    },
                    callback: function (res) {
                      $('.servico', $tr)
                        .val(res['DESCRICAOSERVICO']);

                    },
                    clean: function (res) {

                    }
                  });

                $('.trocarPor', $tr)
                  .arqzoom({
                    datasetId: 'Tiger-Pecas',
                    resultFields: ['CODPECA'],
                    filterValues: function (searchValue) {
                      return [

                        {
                          "_field": "CODPECA",
                          "_initialValue": searchValue,
                          "_finalValue": searchValue,
                          "_type": 1, //MUST
                          "_likeSearch": true
                        },
                        {
                          "_field": "empresa",
                          "_initialValue": $("#empresa")
                            .val(),
                          "_finalValue": $("#empresa")
                            .val(),
                          "_type": 3, //MUST_NOT
                        },
                        {
                          "_field": "filial",
                          "_initialValue": $("#codfilial")
                            .val(),
                          "_finalValue": $("#codfilial")
                            .val(),
                          "_type": 3, //MUST_NOT
                        },
                      ];
                    },
                    template: {
                      row: [
                        { field: 'CODPECA', header: "Codigo", width: '30%' },
                        { field: 'DESCRICAOPECA', header: "Descrição", width: '30%' },
                        { field: 'QTDEESTOQUE', header: "Quantidade", width: "20%" },
                        { value: "Desc: <b>{{CODPECA}}</b>", header: "<u>Generated Column</u>", width: '40%' }
                      ],
                      width: "800px",
                    },
                    displayKey: function (res) {
                      return res['CODPECA'];
                    },
                    callback: function (res) {
                      $('.trocarPordesc', $tr)
                        .val(res['DESCRICAOPECA']);
                      $('.estoque', $tr)
                        .val(res['QTDEESTOQUE']);
                    },
                    clean: function (res) {
                      $('#region')
                        .val('')
                        .change();
                    },
                  });

              }
            });
          // CRIA A TABELA DE REQUISICAO//

          // CRIA A TABELA DE SERVICO//
          $('#tabelaServico')
            .arqmasterdetail({
              buttonNewRow: "#btnServico",
              buttonsDeleteRow: ".deleteRow",
              buttonsDuplicateRow: ".duplicateRow",
              onDeleteRow: function ($tr) {
                return confirm("Confirma eliminación?");
              },
              afterDeleteRow: function ($tr, index) {

              },
              onDuplicateRow: function ($tr) {
                return confirm("Confirma duplicación?");
              },
              afterDuplicateRow: function ($tr, index) {

              },
              onCustomizeRow: function ($tr, index) {

                $(".horas", $tr)
                  .mask("99:99");

                $('.codEaxcutar', $tr)
                  .arqzoom({
                    datasetId: 'Tiger-Pecas',
                    resultFields: ['CODPECA'],
                    filterValues: function (searchValue) {
                      return [

                        {
                          "_field": "CODPECA",
                          "_initialValue": searchValue,
                          "_finalValue": searchValue,
                          "_type": 1, //MUST
                          "_likeSearch": true
                        },
                        {
                          "_field": "empresa",
                          "_initialValue": $("#empresa")
                            .val(),
                          "_finalValue": $("#empresa")
                            .val(),
                          "_type": 3, //MUST_NOT
                        },
                        {
                          "_field": "filial",
                          "_initialValue": $("#codfilial")
                            .val(),
                          "_finalValue": $("#codfilial")
                            .val(),
                          "_type": 3, //MUST_NOT
                        },
                      ];
                    },
                    template: {
                      row: [
                        { field: 'CODPECA', header: "Codigo", width: '30%' },
                        { field: 'DESCRICAOPECA', header: "Descrição", width: '30%' },
                        { field: 'QTDEESTOQUE', header: "Quantidade", width: "20%" },
                        { value: "Desc: <b>{{CODPECA}}</b>", header: "<u>Generated Column</u>", width: '40%' }
                      ],
                      width: "800px",
                    },
                    displayKey: function (res) {
                      return res['CODPECA'];
                    },
                    callback: function (res) {
                      $('.descricaoExecutar', $tr)
                        .val(res['DESCRICAOPECA']);
                    },
                    clean: function (res) {
                      $('#region')
                        .val('')
                        .change();
                    },
                  });

                $('.codServivoExecutar', $tr)
                  .arqzoom({
                    datasetId: 'Tiger-Servico',
                    filterValues: {
                      'empresa': $("#empresa")
                        .val(),
                      'filial': $("#codfilial")
                        .val()
                    },
                    template: {
                      row: [
                        { field: 'CODSERVICO', header: "Codigo", width: "20%" },
                        { field: 'DESCRICAOSERVICO', header: "Descrição", width: "40%" },

                      ],
                      width: "1000px",
                    },
                    displayKey: function (res) {
                      return res['CODSERVICO'];
                    },
                    callback: function (res) {
                      $('.servicoExrcutar', $tr)
                        .val(res['DESCRICAOSERVICO']);

                    },
                    clean: function (res) {

                    }
                  });

              }
            });
          // CRIA A TABELA DE SERVICO//

        },
        'otherwise': function () {
          $(".desabilitaAba05")
            .attr("disabled", "disabled");
        }
      },
      'ManutencaoTerceiro': {
        task: 157,
        custom: function () {

          $("#home")
            .removeClass("active");
          $("#li1")
            .removeClass("active");

          $("#menu1")
            .removeClass("active");
          $("#li2")
            .removeClass("active");

          $("#menu2")
            .removeClass("active");
          $("#li3")
            .removeClass("active");

          $("#menu3")
            .removeClass("active");
          $("#li4")
            .removeClass("active");

          $("#menu4")
            .addClass("active");
          $("#li5")
            .addClass("active");

          $("#menu5")
            .removeClass("active");
          $("#li6")
            .removeClass("active");

          $("#tab6")
            .removeClass("active");
          $("#li7")
            .removeClass("active");

          $("#tab7")
            .removeClass("active");
          $("#li8")
            .removeClass("active");

        },
        'otherwise': function () {

        }
      },
      'FilaPintura': {
        task: 48,
        custom: function () {

          $("#home")
            .removeClass("active");
          $("#li1")
            .removeClass("active");

          $("#menu1")
            .removeClass("active");
          $("#li2")
            .removeClass("active");

          $("#menu2")
            .removeClass("active");
          $("#li3")
            .removeClass("active");

          $("#menu3")
            .removeClass("active");
          $("#li4")
            .removeClass("active");

          $("#menu4")
            .removeClass("active");
          $("#li5")
            .removeClass("active");

          $("#menu5")
            .addClass("active");
          $("#li6")
            .addClass("active");

          $("#tab6")
            .removeClass("active");
          $("#li7")
            .removeClass("active");

          $("#tab7")
            .removeClass("active");
          $("#li8")
            .removeClass("active");

          $("#filaPintura")
            .hide();
          $("#alertaPintura")
            .show();
        },
        'otherwise': function () {

        }
      },
      'Pintura': {
        task: 55,
        custom: function () {

          $("#home")
            .removeClass("active");
          $("#li1")
            .removeClass("active");

          $("#menu1")
            .removeClass("active");
          $("#li2")
            .removeClass("active");

          $("#menu2")
            .removeClass("active");
          $("#li3")
            .removeClass("active");

          $("#menu3")
            .removeClass("active");
          $("#li4")
            .removeClass("active");

          $("#menu4")
            .removeClass("active");
          $("#li5")
            .removeClass("active");

          $("#menu5")
            .addClass("active");
          $("#li6")
            .addClass("active");

          $("#tab6")
            .removeClass("active");
          $("#li7")
            .removeClass("active");

          $("#tab7")
            .removeClass("active");
          $("#li8")
            .removeClass("active");

          $("#responsavelPintura")
            .attr('data-parsley-required', 'true')
            .change();

          var data = new Date();
          var dia = data.getDate();
          var mes = data.getMonth() + 1;
          var ano = data.getFullYear();

          if (dia < 10 && mes < 10) {
            $("#dataPintura")
              .val("0" + dia + "/" + "0" + mes + "/" + ano);
          } else {
            $("#dataPintura")
              .val(dia + "/" + mes + "/" + ano);
          }

        },
        'otherwise': function () {
          $(".desabilitaAba06")
            .attr("disabled", "disabled");
        }
      },
      'FilaCertificacao': {
        task: 59,
        custom: function () {

          $("#home")
            .removeClass("active");
          $("#li1")
            .removeClass("active");

          $("#menu1")
            .removeClass("active");
          $("#li2")
            .removeClass("active");

          $("#menu2")
            .removeClass("active");
          $("#li3")
            .removeClass("active");

          $("#menu3")
            .removeClass("active");
          $("#li4")
            .removeClass("active");

          $("#menu4")
            .removeClass("active");
          $("#li5")
            .removeClass("active");

          $("#menu5")
            .removeClass("active");
          $("#li6")
            .removeClass("active");

          $("#menu6")
            .addClass("active");
          $("#li7")
            .addClass("active");

          $("#tab7")
            .removeClass("active");
          $("#li8")
            .removeClass("active");

          $("#filaCertifica")
            .hide();
          $("#alertaCertifica")
            .show();
        },
        'otherwise': function () {

        }
      },
      'Certificacao': {
        task: 61,
        custom: function () {
          $("#home")
            .removeClass("active");
          $("#li1")
            .removeClass("active");

          $("#menu1")
            .removeClass("active");
          $("#li2")
            .removeClass("active");

          $("#menu2")
            .removeClass("active");
          $("#li3")
            .removeClass("active");

          $("#menu3")
            .removeClass("active");
          $("#li4")
            .removeClass("active");

          $("#menu4")
            .removeClass("active");
          $("#li5")
            .removeClass("active");

          $("#menu5")
            .removeClass("active");
          $("#li6")
            .removeClass("active");

          $("#menu6")
            .addClass("active");
          $("#li7")
            .addClass("active");

          $("#menu7")
            .removeClass("active");
          $("#li8")
            .removeClass("active");

          $("#dataCertifica")
            .attr("disabled", "disabled");

          $("#responsavelCertifica")
            .attr('data-parsley-required', 'true')
            .change();

          var data = new Date();
          var dia = data.getDate();
          var mes = data.getMonth() + 1;
          var ano = data.getFullYear();

          if (dia < 10 && mes < 10) {
            $("#dataCertifica")
              .val("0" + dia + "/" + "0" + mes + "/" + ano);
          } else {
            $("#dataCertifica")
              .val(dia + "/" + mes + "/" + ano);
          }

          $('#dataCertifica,#dataInspeVisual,#dataMagnetica')
            .arqdatetimepicker({
              pickTime: true,
              language: 'pt',
              format: 'dd/mm/yyyy',
              autoclose: true,
              todayHighlight: true
            });

          var dataInspeVisual2 = $("#dataInspeVisual")
            .val();

          if (dataInspeVisual2 == "") {
            $("#dataInspeVisual")
              .attr("disabled", "disabled");
          }

          var dataMagnetica2 = $("#dataMagnetica")
            .val();

          if (dataMagnetica2 == "") {
            $("#dataMagnetica")
              .attr("disabled", "disabled");
          }

          var valida = $("#validacampo")
            .val($("#validacampo")
              .val() + 1);
          var valida2 = $("#validacampo")
            .val();

          if (valida2 == "1") {
            //ESSE CAMPO VERIFICA SE O CHECK DO CAMPO TESTES DE ESTANQUEIDADE ESTIVER CHECADO COM SIM OU NAO //
            var efetuarInpesaoVisual = $("input:radio[name=efetuarInpesaoVisual]:checked")
              .val();

            if (efetuarInpesaoVisual == "sim") {
              $('input:radio[name=inpecaoVisualCert][value=sim]')
                .attr('checked', true);

              if (dia < 10 && mes < 10) {
                $("#dataInspeVisual")
                  .val("0" + dia + "/" + "0" + mes + "/" + ano);
              } else {
                $("#dataInspeVisual")
                  .val(dia + "/" + mes + "/" + ano);
              }
            } else {
              $('input:radio[name=inpecaoVisualCert][value=nao]')
                .attr('checked', true);
              $("#dataInspeVisual")
                .attr("disabled", "disabled");
            }

            var testeParticulaMagnetica = $("input:radio[name=testeParticulaMagnetica]:checked")
              .val();

            if (testeParticulaMagnetica == "sim") {
              $('input:radio[name=inpecaoPartiMagCert][value=sim]')
                .attr('checked', true);
              var data = new Date();
              var dia = data.getDate();
              var mes = data.getMonth() + 1;
              var ano = data.getFullYear();
              if (dia < 10 && mes < 10) {
                $("#dataMagnetica")
                  .val("0" + dia + "/" + "0" + mes + "/" + ano);
              } else {
                $("#dataMagnetica")
                  .val(dia + "/" + mes + "/" + ano);
              }
            } else {
              $('input:radio[name=inpecaoPartiMagCert][value=nao]')
                .attr('checked', true);
            }
          }

          $("input:radio[name=inpecaoVisualCert]")
            .click(function () {
              var inpecaoVisualCert = $("input:radio[name=inpecaoVisualCert]:checked")
                .val();

              if (inpecaoVisualCert == "sim") {
                $("#dataInspeVisual")
                  .removeAttr("disabled", "disabled");
                if (dia < 10 && mes < 10) {
                  $("#dataInspeVisual")
                    .val("0" + dia + "/" + "0" + mes + "/" + ano);
                } else {
                  $("#dataInspeVisual")
                    .val(dia + "/" + mes + "/" + ano);
                }
              }
              if (inpecaoVisualCert == "nao") {
                $("#dataInspeVisual")
                  .val("");
                $("#dataInspeVisual")
                  .attr("disabled", "disabled");
              }

            });

          $("input:radio[name=inpecaoPartiMagCert]")
            .click(function () {
              var inpecaoPartiMagCert = $("input:radio[name=inpecaoPartiMagCert]:checked")
                .val();

              if (inpecaoPartiMagCert == "sim") {
                $("#dataMagnetica")
                  .removeAttr("disabled", "disabled");
                var data = new Date();
                var dia = data.getDate();
                var mes = data.getMonth() + 1;
                var ano = data.getFullYear();
                if (dia < 10 && mes < 10) {
                  $("#dataMagnetica")
                    .val("0" + dia + "/" + "0" + mes + "/" + ano);
                } else {
                  $("#dataMagnetica")
                    .val(dia + "/" + mes + "/" + ano);
                }
              }
              if (inpecaoPartiMagCert == "nao") {
                $("#dataMagnetica")
                  .val("");
                $("#dataMagnetica")
                  .attr("disabled", "disabled");
              }

            });

          // CRIA A TABELA DE SERVICO//
          $('#tabelaServicoAb7')
            .arqmasterdetail({
              buttonNewRow: "#btnServicoAb7",
              buttonsDeleteRow: ".deleteRow",
              buttonsDuplicateRow: ".duplicateRow",
              onDeleteRow: function ($tr) {
                return confirm("Confirma eliminación?");
              },
              afterDeleteRow: function ($tr, index) {

              },
              onDuplicateRow: function ($tr) {
                return confirm("Confirma duplicación?");
              },
              afterDuplicateRow: function ($tr, index) {

              },
              onCustomizeRow: function ($tr, index) {

                $(".horas", $tr)
                  .mask("99:99");

                $('.codEaxcutarAb7', $tr)
                  .arqzoom({
                    datasetId: 'Tiger-Pecas',
                    resultFields: ['CODPECA'],
                    filterValues: function (searchValue) {
                      return [

                        {
                          "_field": "CODPECA",
                          "_initialValue": searchValue,
                          "_finalValue": searchValue,
                          "_type": 1, //MUST
                          "_likeSearch": true
                        },
                        {
                          "_field": "empresa",
                          "_initialValue": $("#empresa")
                            .val(),
                          "_finalValue": $("#empresa")
                            .val(),
                          "_type": 3, //MUST_NOT
                        },
                        {
                          "_field": "filial",
                          "_initialValue": $("#codfilial")
                            .val(),
                          "_finalValue": $("#codfilial")
                            .val(),
                          "_type": 3, //MUST_NOT
                        },
                      ];
                    },
                    template: {
                      row: [
                        { field: 'CODPECA', header: "Codigo", width: '30%' },
                        { field: 'DESCRICAOPECA', header: "Descrição", width: '30%' },
                        { field: 'QTDEESTOQUE', header: "Quantidade", width: "20%" },
                        { value: "Desc: <b>{{CODPECA}}</b>", header: "<u>Generated Column</u>", width: '40%' }
                      ],
                      width: "800px",
                    },
                    displayKey: function (res) {
                      return res['CODPECA'];
                    },
                    callback: function (res) {
                      $('.descricaoExecutarAb7', $tr)
                        .val(res['DESCRICAOPECA']);
                    },
                    clean: function (res) {
                      $('#region')
                        .val('')
                        .change();
                    },
                  });

                $('.codServivoExecutarAb7', $tr)
                  .arqzoom({
                    datasetId: 'Tiger-Servico',
                    filterValues: {
                      'empresa': $("#empresa")
                        .val(),
                      'filial': $("#codfilial")
                        .val()
                    },
                    template: {
                      row: [
                        { field: 'CODSERVICO', header: "Codigo", width: "20%" },
                        { field: 'DESCRICAOSERVICO', header: "Descrição", width: "40%" },

                      ],
                      width: "1000px",
                    },
                    displayKey: function (res) {
                      return res['CODSERVICO'];
                    },
                    callback: function (res) {
                      $('.servicoExrcutarAb7', $tr)
                        .val(res['DESCRICAOSERVICO']);

                    },
                    clean: function (res) {

                    }
                  });

              }
            });
          // CRIA A TABELA DE SERVICO//

        },
        'otherwise': function () {
          $(".desabilitaAba07")
            .attr("disabled", "disabled");
          // $("input[type=radio][name=inpecaoVisualCert]").attr('disabled','disabled');
          // $("input[type=radio][name=inpecaoPartiMagCert]").attr('disabled','disabled');

        }
      },
      'filaInspecaoFinal': {
        task: 63,
        custom: function () {

          $("#home")
            .removeClass("active");
          $("#li1")
            .removeClass("active");

          $("#menu1")
            .removeClass("active");
          $("#li2")
            .removeClass("active");

          $("#menu2")
            .removeClass("active");
          $("#li3")
            .removeClass("active");

          $("#menu3")
            .removeClass("active");
          $("#li4")
            .removeClass("active");

          $("#menu4")
            .removeClass("active");
          $("#li5")
            .removeClass("active");

          $("#menu5")
            .removeClass("active");
          $("#li6")
            .removeClass("active");

          $("#menu6")
            .removeClass("active");
          $("#li7")
            .removeClass("active");

          $("#menu7")
            .addClass("active");
          $("#li8")
            .addClass("active");

          $("#filaInspecaoFinal")
            .hide();
          $("#alertaInspecaoFinal")
            .show();

        },
        'otherwise': function () {

        }
      },
      'InspecaoFinal': {
        task: 65,
        custom: function () {
          $("#home")
            .removeClass("active");
          $("#li1")
            .removeClass("active");
          $("#menu1")
            .removeClass("active");
          $("#li2")
            .removeClass("active");
          $("#menu2")
            .removeClass("active");
          $("#li3")
            .removeClass("active");
          $("#menu3")
            .removeClass("active");
          $("#li4")
            .removeClass("active");
          $("#menu4")
            .removeClass("active");
          $("#li5")
            .removeClass("active");
          $("#menu5")
            .removeClass("active");
          $("#li6")
            .removeClass("active");
          $("#menu6")
            .removeClass("active");
          $("#li7")
            .removeClass("active");
          $("#menu7")
            .addClass("active");
          $("#li8")
            .addClass("active");

          $("#responsavelInspesaoFinal")
            .attr('data-parsley-required', 'true')
            .change();

          $("#identificaCodigoBrras")
            .attr('data-parsley-required', 'true')
            .change();

          $("#inspecaoVisualFinal")
            .attr('data-parsley-required', 'true')
            .change();
          $("#particulaMagnatica")
            .attr('data-parsley-required', 'true')
            .change();
          $("#adesivosTigerRentank")
            .attr('data-parsley-required', 'true')
            .change();
          $("#numeracaoIdentificacao")
            .attr('data-parsley-required', 'true')
            .change();

          $("#deformacaoNaEstrutura")
            .attr('data-parsley-required', 'true')
            .change();
          $("#estruturaApresentaCorrosao")
            .attr('data-parsley-required', 'true')
            .change();
          $("#operaTampaDobradicas")
            .attr('data-parsley-required', 'true')
            .change();

          $("#livreEmpinhadeira")
            .attr('data-parsley-required', 'true')
            .change();
          $("#pinturaRefletiva")
            .attr('data-parsley-required', 'true')
            .change();

          $("#responsavelInspesaoFinal")
            .removeAttr("disabled", "disabled");
          var data = new Date();
          var dia = data.getDate();
          var mes = data.getMonth() + 1;
          var ano = data.getFullYear();

          if (dia < 10 && mes < 10) {
            $("#dataInpesaoFinal")
              .val("0" + dia + "/" + "0" + mes + "/" + ano);
          } else if (dia > 10 && mes < 10) {
            $("#dataInpesaoFinal")
              .val(dia + "/" + "0" + mes + "/" + ano);
          } else {
            $("#dataInpesaoFinal")
              .val(dia + "/" + mes + "/" + ano);
          }

          var dataInspeVisual = $("#dataInspeVisual")
            .val();
          if (dataInspeVisual != "") {
            $("#dataInspecaoVisualAba5")
              .val(dataInspeVisual);
          } else {
            var dataInspecaoVisual = $("#dataInspecaoVisual")
              .val();
            $("#dataInspecaoVisualAba5")
              .val(dataInspecaoVisual);
          }

          var dataMagnetica = $("#dataMagnetica")
            .val();
          if (dataMagnetica != "") {
            $("#dataParticulaMagAba5")
              .val(dataMagnetica);
          } else {
            var dataParticulaMagnetica = $("#dataParticulaMagnetica")
              .val();
            $("#dataParticulaMagAba5")
              .val(dataParticulaMagnetica);
          }

          var dataEstanqueidade = $("#dataEstanqueidade")
            .val();
          if (dataEstanqueidade != "") {
            $("#dataTesteEstaqueidadeAba5")
              .val(dataEstanqueidade);
          } else {
            var dataTesteEstanqueidade = $("#dataTesteEstanqueidade")
              .val();
            $("#dataTesteEstaqueidadeAba5")
              .val(dataTesteEstanqueidade);
          }

          var datahidrostatico = $("#datahidrostatico")
            .val();
          if (datahidrostatico != "") {
            $("#dataTesteHidrostaticoAba05")
              .val(datahidrostatico);
          } else {
            var dataTesteHidrostatico = $("#dataTesteHidrostatico")
              .val();
            $("#dataTesteHidrostaticoAba05")
              .val(dataTesteHidrostatico);
          }

        },
        'otherwise': function () {
          $("#responsavelInspesaoFinal")
            .attr("disabled", "disabled");
          $("input[type=radio][name=identificaCodigoBrras]")
            .attr('disabled', 'disabled');
          $("input[type=radio][name=inspecaoVisualFinal]")
            .attr('disabled', 'disabled');
          $("input[type=radio][name=particulaMagnatica]")
            .attr('disabled', 'disabled');
          $("input[type=radio][name=testeEstanqueidade]")
            .attr('disabled', 'disabled');
          $("input[type=radio][name=testeHidro]")
            .attr('disabled', 'disabled');
          $("input[type=radio][name=adesivosTigerRentank]")
            .attr('disabled', 'disabled');
          $("input[type=radio][name=numeracaoIdentificacao]")
            .attr('disabled', 'disabled');
          $("input[type=radio][name=apresentaCorrosao]")
            .attr('disabled', 'disabled');
          $("input[type=radio][name=deformacaoEstrutura]")
            .attr('disabled', 'disabled');
          $("input[type=radio][name=guiaEmpilhadeira]")
            .attr('disabled', 'disabled');
          $("input[type=radio][name=pinturaRefletiva]")
            .attr('disabled', 'disabled');
          $("input[type=radio][name=apresentaCorrosao]")
            .attr('disabled', 'disabled');

          $("input[type=radio][name=estruturaApresentaCorrosao]")
            .attr('disabled', 'disabled');
          $("input[type=radio][name=deformacaoNaEstrutura]")
            .attr('disabled', 'disabled');
          $("input[type=radio][name=operaTampaDobradicas]")
            .attr('disabled', 'disabled');
          $("input[type=radio][name=livreEmpinhadeira]")
            .attr('disabled', 'disabled');

        }
      },

      'verificaNota': {
        task: 80,
        custom: function () {

          $("#home")
            .addClass("active");
          $("#li1")
            .addClass("active");
          $("#tab2")
            .removeClass("active");
          $("#li2")
            .removeClass("active");
          $("#li3")
            .removeClass("active");
          $("#tab3")
            .removeClass("active");
          $("#li4")
            .removeClass("active");
          $("#tab4")
            .removeClass("active");
          $("#li5")
            .removeClass("active");
          $("#tab5")
            .removeClass("active");
          $("#li6")
            .removeClass("active");
          $("#tab6")
            .removeClass("active");
          $("#li7")
            .removeClass("active");
          $("#tab7")
            .removeClass("active");
          $("#li8")
            .removeClass("active");
          $("#tab8")
            .removeClass("active");

          $("#nunSerie")
            .removeAttr("disabled", "disabled");
          $("#nf")
            .removeAttr("readonly", "readonly");

          $("#nunSerie")
            .focus(function () {
              $.ajax({
                  type: "POST",
                  url: window.location.protocol + "//" + window.location.host + "/ecm/api/rest/ecm/dataset/datasets/",
                  contentType: "application/json; charset=utf-8",
                  dataType: "json",
                  data: JSON.stringify({
                    name: 'Tiger-Contentores',
                    constraints: [

                      {
                        _field: "nunSerie",
                        _initialValue: $("#nunSerie")
                          .val(),
                        _finalValue: "",
                        _type: 1
                      },
                      {
                        _field: "empresa",
                        _initialValue: $("#empresa")
                          .val(),
                        _finalValue: "",
                        _type: 1
                      },
                      {
                        _field: "filial",
                        _initialValue: $("#codfilial")
                          .val(),
                        _finalValue: "",
                        _type: 1
                      }
                    ]
                  })
                })
                .done(function (dataset) {
                  if (dataset.values.length) {

                    var NUMOS = dataset.values[0]['NUMOS'];
                    var MODELO = dataset.values[0]['MODELO'];
                    var NOMECLIENTE = dataset.values[0]['NOMECLIENTE'];
                    var NOTAFISCAL = dataset.values[0]['NOTAFISCAL'].replace(/ /g, "");
                    var CODIGOCLIENTE = dataset.values[0]['CODIGOCLIENTE'];
                    var TIPO = dataset.values[0]['TIPO'];
                    var TIPOPRODUTO = dataset.values[0]['TIPOPRODUTO'];

                    $('#nunOs')
                      .val(NUMOS);
                    $('#modelo')
                      .val(MODELO);
                    $('#nomeDoCliente')
                      .val(NOMECLIENTE);
                    $('#nf')
                      .val(NOTAFISCAL);
                    $('#codNomeCliente')
                      .val(CODIGOCLIENTE);
                    $('#tipoDeProduto')
                      .val(TIPOPRODUTO);

                    if (TIPO == "Devolucao" || TIPO == "Novo") {
                      $("input[value=servico]")
                        .prop("checked", false);
                      $("input[value=devolucao]")
                        .prop("checked", true);
                    }
                    if (TIPO == "Servico") {
                      $("input[value=servico]")
                        .prop("checked", true);
                      $("input[value=devolucao]")
                        .prop("checked", false);
                    }
                  }

                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                  alert('Não foi possivel carregar os orçamentos');
                });

            });

          $("#nunSerie")
            .focus();
          $("#nf")
            .focus();

        },
        'otherwise': function () {

        }
      },
      "otherwise": {
        custom: function () {
          // Si no aplica ninguna de las tareas. Debe ir ultimo.
        }
      }
    },

    ged: function () {}
  }
};

function setaDatasTestes() {

	var data = new Date();
	$("#dataInpesaoFinal")
		.val(toDDMMYYYY(new Date()));

  var dataInspeVisual = $("#dataInspeVisual")
    .val();
  var inpecaoVisualCert = $("[name=inpecaoVisualCert]")
    .val();
  var inspecaoVisualFinal = $("#inspecaoVisualFinal")
    .val();
  var validadeInspecaoVisual = Number($("#validadeInspecaoVisual")
    .val()) || 0;

  if (inpecaoVisualCert == "sim") {

	var arrData = dataInspeVisual.split("/");
	
	var data = new Date(Number(arrData[2]), Number(arrData[1]) - 1, Number(arrData[0]) + validadeInspecaoVisual);
	
	$("#dataInspecaoVisualAba5")
	  .val(toDDMMYYYY(data));
	
	// $("#dataInspecaoVisualAba5")
	//   .val(dataInspeVisual);
  } else {
    var dataInspecaoVisual = $("#dataInspecaoVisual").val();
    $("#dataInspecaoVisualAba5")
      .val(dataInspecaoVisual);
  }

  var dataMagnetica = $("#dataMagnetica")
    .val();
  var inpecaoPartiMagCert = $("[name=inpecaoPartiMagCert]")
    .val();
  var validadeMagnetico = Number($("#validadeMagnetico")
    .val()) || 0;

  if (inpecaoPartiMagCert == "sim") {
	var arrData = dataMagnetica.split("/");
	
	var data = new Date(Number(arrData[2]), Number(arrData[1]) - 1, Number(arrData[0]) + validadeMagnetico);
	
	$("#dataParticulaMagAba5")
	  .val(toDDMMYYYY(data));
	
	// $("#dataParticulaMagAba5")
	//   .val(dataMagnetica);
  } else {
    var dataParticulaMagnetica = $("#dataParticulaMagnetica").val();
	$("#dataParticulaMagAba5")
	      .val(dataParticulaMagnetica);
  	}
}

function toDDMMYYYY(data) {
  var dia = data.getDate();
  if (dia.toString()
    .length == 1)
    dia = "0" + dia;
  var mes = data.getMonth() + 1;
  if (mes.toString()
    .length == 1)
    mes = "0" + mes;
  var ano = data.getFullYear();
  return dia + "/" + mes + "/" + ano;
}
