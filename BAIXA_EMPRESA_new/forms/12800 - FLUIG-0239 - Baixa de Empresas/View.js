var atividade;
const NewCompartilhados = compartilhados.getInstance();

var selectData = $("#slcControladoria").val();
var controle = [];
var FLUIGForms = {
  params: {},
  initForm: function (params) {
    this.params = params;
    var $this = this;
    $(function () {
      if (params.formMode == "ADD" || params.formMode == "MOD") {
        $this.onEdit(params);
      } else {
        $this.onView(params);
      }
    });
  },
  onView: function (params) {},
  onEdit: function (params) {
    $("#aprovacoes").val("");

    atividade = params.WKNumState;
    empresaUau();
    blockInput();
    divControl();
    NewCompartilhados.enableButtonZoom(['#btnNomeEmpresa'], ['0', '4', '29']);
  }
};

function mostraData(value, classe) {
  if (value == "2") {
    $("." + classe).removeClass("hide");
  } else {
    $("." + classe).addClass("hide");
  }
}

function blockInput() {
  $(".inicio").attr('readonly', 'readonly');
  $('div[id*="div"]').find('textarea').attr('readonly', 'readonly');
  $('div[id*="div"]').find('select').attr('readonly', 'readonly');
  $(`*[data-atividade="${atividade}"]`).find('select').val('');
  $(`*[data-atividade="${atividade}"]`).find('select').attr('readonly', false);
  $(`*[data-atividade="${atividade}"]`).find('textarea').attr('readonly', false);
  $(`*[data-atividade="${atividade}"]`).find('input').attr('readonly', false);
  if (atividade == 0 || atividade == 4 || atividade == 29) {
    $(".inicio").attr('readonly', false);
    $(".reabertura").attr('readonly', false);
  };
}

function empresaUau() {
  $("#btnNomeEmpresa").click(function () {
    ZOOM.getInstance().getEmpresaUau();
    callBackZoom();
  });
  $(function () {
    $(".datePick").datepicker({
      minDate: 0
    });
  });
}

function callBackZoom() {
  $(document).on('ZoomDpOrigemSelecionado', function (ev, dados) {
    $("#cpNomeEmpresa").val(dados.EMPRESA);
    $("#cpCnpj").val(dados.CNPJ);
  });
}

function tipoBaixa(valor) {
  let $tipoBaixa = $("#hideTipoBaixa");
  $tipoBaixa.val(valor);
}


function divControl() {
  $('*[data-atividade]').each(function () {
    $(this).attr("id");
    let arrayDaDiv = $(this).attr("data-atividade").split(',');
    for (var key in arrayDaDiv) {
      let valor = arrayDaDiv[key];
      if (valor == atividade) {
        $("#" + $(this).attr("id")).removeClass('hide');
        $("#" + $(this).attr("id")).find('select').val("");
      }
    }
  });
}

function getAprovacao(valor) {
  let aprovado = "Ok";
  let reprovado = "Nok";
  if (valor == "1") {
    $("#aprovacoes").val(aprovado);
  } else if (valor == "2") {
    $("#aprovacoes").val(reprovado);
  } else if (valor == "") {
    $("#aprovacoes").val("sem aprovação");
  }
}

function baixaEmpresa(valor) {
  if (valor == "1") {
    $("#tipoDeBaixa").removeClass("hide");
  } else {
    $("#tipoDeBaixa").addClass("hide");
  }
}

function setBaixa(valor) {
  let $baixa = $("#baixaHiden");
  if (valor == "1") {
    $baixa.val(valor);
  } else if (valor == "2") {
    $baixa.val(valor);
  }
}

function alerta(mensagem) {

  FLUIGC.message.alert({
    message: mensagem,
    title: 'Atenção!',
    label: 'OK, Entendi'
  }, function (el, ev) {

  });
}