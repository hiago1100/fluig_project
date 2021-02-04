$(function () {

  var produtoHidrostatico;
  var produtoPartiMag;
  var produtoInspecaoVisual;
  var produtoEstanqueidade;

  setTimeout(function () {

    $('input:radio[name=testeHidrostatico]')
      .change(function () {

        if (this.value == 'sim' || this.value == 'nao') {
          $('input:radio[name=efetuarTesteHidrostatico]')
            .filter('[value="' + this.value + '"]')
            .attr('checked', true)
            .change();
        }

      });

    $('input:radio[name=efetuarTesteHidrostatico]')
      .change(function () {
        if (this.value == 'sim') {
          var index = wdkAddChild('tabelaRequisicaoAb4');
          produtoHidrostatico = $('#tabelaRequisicaoAb4 tbody tr:last');

          $('.codigoAb4', produtoHidrostatico)
            .val('005159');

          $('.codDescAb4', produtoHidrostatico)
            .val('SERVICO DE TESTE HIDROSTATICO');

          $('.fluigicon-trash', produtoHidrostatico)
            .hide();

        } else {
          fnWdkRemoveChild($(produtoHidrostatico)
            .find('i')[0]);
        }
      });

    $('input:radio[name=efetuarInpesaoVisual]')
      .change(function () {
        if (this.value == 'sim' || this.value == 'nao') {
          $('input:radio[name=inpecaoVisualCert]')
            .filter('[value="' + this.value + '"]')
            .attr('checked', true)
            .change();
        }
      });

    $('input:radio[name=inpecaoVisualCert]')
      .change(function () {
        if (this.value == 'sim') {
          var index = wdkAddChild('tabelaServicoAb7');
          produtoInspecaoVisual = $('#tabelaServicoAb7 tbody tr:last');

          $('.codEaxcutarAb7', produtoInspecaoVisual)
            .val('005161');

          // window["codExecutarAb7___" + index].setValues(["005161"]);
          $('.descricaoExecutarAb7', produtoInspecaoVisual)
            .val('SERVICO DE INSPECAO VISUAL');
          
          $('.codServivoExecutarAb7', produtoInspecaoVisual)
          .val('000001');

          // window["codExecutarAb7___" + index].setValues(["005161"]);
          $('.servicoExrcutarAb7', produtoInspecaoVisual)
          .val('SEM COBRANCA - (TIGER)');
        
          $('.horasAb7', produtoInspecaoVisual)
          .val('01:00');

          $('.fluigicon-trash', produtoInspecaoVisual)
            .hide();
        } else {
          fnWdkRemoveChild($(produtoInspecaoVisual)
            .find('div')[0]);
        }
      });

    $('input:radio[name=testeParticulaMagnetica]')
      .change(function () {

        if (this.value == 'sim' || this.value == 'nao') {
          $('input:radio[name=inpecaoPartiMagCert]')
            .filter('[value="' + this.value + '"]')
            .attr('checked', true)
            .change();
        }

      });

    $('input:radio[name=inpecaoPartiMagCert]')
      .change(function () {
        if (this.value == 'sim') {
          var index = wdkAddChild('tabelaServicoAb7');
          produtoPartiMag = $('#tabelaServicoAb7 tbody tr:last');

          $('.codEaxcutarAb7', produtoPartiMag)
            .val('005160');
          // window["codExecutarAb7___" + index].setValues(["005160"]);
          $('.descricaoExecutarAb7', produtoPartiMag)
            .val('SERVICO DE PARTICULA MAGNETICA');

          $('.codServivoExecutarAb7', produtoPartiMag)
          .val('000001');

          // window["codExecutarAb7___" + index].setValues(["005161"]);
          $('.servicoExrcutarAb7', produtoPartiMag)
          .val('SEM COBRANCA - (TIGER)');
        
          $('.horasAb7', produtoPartiMag)
          .val('01:00');
          
          $('.fluigicon-trash', produtoPartiMag)
            .hide();

        } else {

          fnWdkRemoveChild($(produtoPartiMag)
            .find('div')[0]);
        }
      });

  }, 1000)

});
