var htmlAux = "";
const dataAtual = moment().format("DD/MM/YYYY");
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
  onView: function (params) {
  },
  onEdit: function (params) {
    var atividade = params.WKNumState;
    let slcTipoSol = $("#slcDuvida").val();
    tipoSolicita(slcTipoSol);
    let slcAprovador = $("#slcAprovador").val();
    masterClass(slcAprovador);
    blockFields(atividade);
    mostraDiv(atividade);
    $("#cpDataAbertura").val(dataAtual);
    var usuraio = parent.WCMAPI.user;
    var email = parent.WCMAPI.userEmail;
    console.log("usuario", usuraio);

    if (atividade == 0 || atividade == 4) {
      $("#cpSolicitanteNome").val(usuraio);
      $("#cpEmail").val(email);
    }

  }
};
function masterClass(valor) {
  console.log("valor", valor);
  if (valor == "1") {
    $("#btnApuraNao").removeClass("btn-lg");
    $("#btnApuraSim").addClass("btn-lg");
    $("#cpAprovador").val("s");
    $("#cpTipoResposta").val("1")
  } else if (valor == "2") {
    $("#btnApuraSim").removeClass("btn-lg");
    $("#btnApuraNao").addClass("btn-lg");
    $("#cpAprovador").val("n");
  } else {
    // $(".divAtividade").removeClass("panel-danger").addClass("panel-info");
    // $(".divAtividade").removeClass("panel-success").addClass("panel-info");
    $("#cpAprovador").val("");
  }

}
function blockFields(atv) {
  if (atv == 5) {
    console.log("N BLOQUEIA");
    $(".solicitante").attr("readonly", "readonly");
    $(".apurador").attr("readonly", "readonly");
  } else if (atv == 12) {
    console.log("BLOQUEIA");
    $(".aprovadores").attr("readonly", "readonly");
    $(".solicitante").attr("readonly", "readonly");
    document.getElementById('btnApuraSim').disabled = true;
    document.getElementById('btnApuraNao').disabled = true;
  }
}


function mostraDiv(atv) {
  if (atv == 5 || atv == 12) {
    $(".divAtividade").show();
  } else if (atv != 5 || atv != 12) {
    $(".divAtividade").hide();
    $(".divResposta").hide();
  }

}



function tipoSolicita(valor) {

  if (valor == "1") {
    $("#divItem").removeClass("hide");
  } else if (valor == "" || valor == "2") {
    $("#divItem").addClass("hide");
  }

}

function setSelectedZoomItem(selecao) {
  if (selecao.inputId == "cpSetor") {
    $("#cpRegional").val(selecao.cpRegional);
  }
}