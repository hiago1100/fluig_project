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
  if (atv == 0 || atv == 4 || atv == 11) {
    // SOP
    $("#atividadeSopActive").removeClass('up active');
    $("#atividadeSopDiv").removeClass('in');
    $(".inputSop").attr('readonly','readonly');
      // Crédito 
    $("#atividadeCreditoActive").removeClass('up active');
    $("#atividadeCreditoDiv").removeClass('in');
    $(".credipoInput").attr('readonly','readonly');
      // Fiscal 
    $("#atividadeFiscalActive").removeClass('up active');
    $("#atividadeFiscalDiv").removeClass('in');
    $(".inputFiscal").attr('readonly','readonly');
  

  } else if (atv == 57) {
    
    // VENDAS
    $("#inicioSolicitaDiv").removeClass('up active');
    $("#inicioSolicita").removeClass('in');
    $(".inputVendas").attr('readonly','readonly');
      // Crédito 
    $("#atividadeCreditoActive").removeClass('up active');
    $("#atividadeCreditoDiv").removeClass('in');
    $(".credipoInput").attr('readonly','readonly');
      // Fiscal 
    $("#atividadeFiscalActive").removeClass('up active');
    $("#atividadeFiscalDiv").removeClass('in');
    $(".inputFiscal").attr('readonly','readonly');

  } else if (atv == 24) {

    // VENDAS
    $("#inicioSolicitaDiv").removeClass('up active');
    $("#inicioSolicita").removeClass('in');
    $(".inputVendas").attr('readonly','readonly');
      // SOP 
    $("#atividadeSopActive").removeClass('up active');
    $("#atividadeSopDiv").removeClass('in');
    $(".inputSop").attr('readonly','readonly');
      // Fiscal 
    $("#atividadeFiscalActive").removeClass('up active');
    $("#atividadeFiscalDiv").removeClass('in');
    $(".inputFiscal").attr('readonly','readonly');

  } else if (atv == 35) {
    // VENDAS
    $("#inicioSolicitaDiv").removeClass('up active');
    $("#inicioSolicita").removeClass('in');
    $(".inputVendas").attr('readonly','readonly');
      // SOP 
    $("#atividadeSopActive").removeClass('up active');
    $("#atividadeSopDiv").removeClass('in');
    $(".inputSop").attr('readonly','readonly');
      // Credito 
    $("#atividadeCreditoActive").removeClass('up active');
    $("#atividadeCreditoDiv").removeClass('in');
    $(".credipoInput").attr('readonly','readonly');

  } else if (atv == 45) {

    $(".inputSop").attr('readonly','readonly');

    // VENDAS
    $("#inicioSolicitaDiv").removeClass('up active');
    $("#inicioSolicita").removeClass('in');
    $(".inputVendas").attr('readonly','readonly');
      // Crédito 
    $("#atividadeCreditoActive").removeClass('up active');
    $("#atividadeCreditoDiv").removeClass('in');
    $(".credipoInput").attr('readonly','readonly');
      // Fiscal 
    $("#atividadeFiscalActive").removeClass('up active');
    $("#atividadeFiscalDiv").removeClass('in');
    $(".inputFiscal").attr('readonly','readonly');

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