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

    var codigoUser = parent.WCMAPI.userCode;


    setTimeout(function(){

      reloadZoomFilterValues("numSolicitacao_viagem", "processId,PR-12 - Controle de Viagens,active,true,requesterId," + codigoUser);


    },1000);

    var atividade = params.WKNumState;
    let slcTipoSol = $("#slcDuvida").val();
    let slcAprovador = $("#slcAprovador").val();
    blockFields(atividade);

    $("#cpDataAbertura").val(dataAtual);
    var usuraio = parent.WCMAPI.user;
    var email = parent.WCMAPI.userEmail;
  

    if (atividade == 0 || atividade == 4) {
      $("#cpSolicitanteNome").val(usuraio);
      $("#cpEmail").val(email);
    }

    if(atividade == 5){
      $("#nomeAprovador").val(usuraio);
      $("#dataHoraAprova").val(moment().format("DD/MM/YYYY hh:mm:ss"));
      
    }

  }
};

function blockFields(atv) {

  if (atv == 0 || atv == 4) {
    document.getElementById("sim").disabled = true;
    document.getElementById("nao").disabled = true;
    $("#txtAprovador").attr("readonly", "readonly");
  } 

  if (atv == 5) {
    $("#numSolicitacao_viagem").attr("readonly", "readonly");
    $("#txtSolicitante").attr("readonly", "readonly");
  } 
}

function setSelectedZoomItem(selectedItem) {

	if (selectedItem.inputId == "numSolicitacao_viagem") {
		$('#codSolicitanteViagem').val(selectedItem["requesterId"]);
  }
}