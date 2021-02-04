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
    onView: function (params){ 
        $(".divDownloadDoc").hide();
        $(".divUploadDoc").hide();
    },
    onEdit: function (params) {
      var atividade = params.WKNumState;
      let slcTipoSol =  $("#slcDuvida").val();
      tipoSolicita(slcTipoSol);
      let slcAprovador =  $("#slcAprovador").val();
      masterClass(slcAprovador);
      blockFields(atividade);
      mostraDiv(atividade);
    	$("#cpDataAbertura").val(dataAtual);
      var usuraio = parent.WCMAPI.user;
      var email = parent.WCMAPI.userEmail;
      console.log("usuario", usuraio);

      if (atividade == 0 || atividade == 4 ) {
          $("#cpSolicitanteNome").val(usuraio);
          $("#cpEmail").val(email);
      }

    }  
}; 
function masterClass(valor){
        console.log("valor", valor);
        if (valor == "1") {
          $("#btnApuraNao").removeClass("btn-lg");
          $("#btnApuraSim").addClass("btn-lg");
      $("#cpAprovador").val("s");
      $("#cpTipoResposta").val("1")
    }else if(valor == "2"){   
          $("#btnApuraSim").removeClass("btn-lg");
          $("#btnApuraNao").addClass("btn-lg");
      $("#cpAprovador").val("n");
    }else{
      // $(".divAtividade").removeClass("panel-danger").addClass("panel-info");
      // $(".divAtividade").removeClass("panel-success").addClass("panel-info");
      $("#cpAprovador").val("");
    }
    
}
function blockFields(atv){
  if (atv == 5) {
    console.log("N BLOQUEIA");
    $("#cpCpf").attr("readonly","readonly");
  }
}


function mostraDiv(atv){

  console.log("atividade atual",atv);

if (atv == 0 || atv == 4){
  $(".divDownloadDoc").show();
  $(".divUploadDoc").hide();
}else if (atv == 5) {
  $(".divUploadDoc").show();
  $(".divDownloadDoc").hide();
}
  
}



function tipoSolicita(valor){

  if (valor == "1") {
   $("#divItem").removeClass("hide");   
  }else if (valor == "" || valor == "2"){
   $("#divItem").addClass("hide");
  }

}

function setSelectedZoomItem(selecao) {

if(selecao.inputId == "cpCpf") {
    getColleagueByCpf(selecao.CPF).done(function (data) {
      $("#cpNomeColab").val(data.content.values[0].NOME);
      $("#cpFuncao").val(data.content.values[0].NOMEFUNCAO);
    });

  }
}

function getColleagueByCpf(cpf) {

  var dados = {
    "name": "dsFuncionarioPorCpf", //dataset's id
    "fields": null,
    "constraints": [
      { 
        "_field": "CPF", 
        "_initialValue": cpf, 
        "_finalValue": cpf, 
        "_type": 1, 
        "_likeSearch": false
      }]
  }

  return $.ajax({

    method: "POST",
    url: location.protocol + "//" + location.host + "/api/public/ecm/dataset/datasets",
    data: JSON.stringify(dados),
    contentType: "application/json",
    async: true,
    error: function (x, e) {

      console.log("Erro Ajax Monta select", x, e);
    }
  });

}

function download(){ 

var documentId = 3940442;
var retorno;

parent.WCMAPI.Create({
    url: "http://meubkqas.burgerking.com.br/api/public/2.0/documents/getDownloadURL/3940442",
    data: [documentId],
    success: function (data, textStatus, jqXHR) {

      console.log(data.content);

        if (data.content == 'OK') {

            FLUIGC.toast({
                title: 'Sucesso: ',
                message: 'Os arquivos estão sendo compactados e estarão disponíveis em "Meus Documentos"',
                type: 'success',
                timeout: 'slow',
            });

        } else {
            // seu tratamento de erro usando: data.message
        }

    },
    error: function (jqXHR, textStatus, errorThrown) {
        // seu tratamento de erro usando: textStatus
    }
});

}