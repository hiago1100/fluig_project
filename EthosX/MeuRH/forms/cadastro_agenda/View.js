var htmlAux = "";

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
    var dataAtual = moment().format("DD/MM/YYYY");
    var usuraio = parent.WCMAPI.user;
    var email = parent.WCMAPI.userEmail;
    $("#cpSolicitanteNome").val(usuraio);
    $("#cpDataAbertura").val(dataAtual);

   

  }
};
