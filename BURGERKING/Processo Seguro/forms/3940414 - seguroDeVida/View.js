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
      // var pasta = obterPasta();
 
      let slcAprovador =  $("#slcAprovador").val();
      masterClass(slcAprovador);

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
      $("#cpAprovador").val("");
    }
    
}
function blockFields(atv){
  if (atv == 5) {
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
    obterPasta(selecao.CPF);
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
var idDocumento = 3940442;
$.ajax({
        url: '/api/public/2.0/documents/getDownloadURL/' + idDocumento, 
        dataType: 'json', 
        async: true, 
        success: function (response) { 
          window.open(response.content)
      }
    });
}


function obterPasta(cpf){ 
var idDoc = "";
var dados2 = {
        "name": "document",
        "fields": null,
        "constraints": [
            {
                "_field": "documentDescription",
                "_initialValue": cpf ,
                "_finalValue": cpf ,
                "_type": 1
            }
        ]
    };
    $.ajax({
        method: "POST",
        url: "/api/public/ecm/dataset/datasets/",
        data: JSON.stringify(dados2),
        contentType: "application/json",
        async: false,
        error: function (x, e) {
            if (x.status == 500) {
                alert("Erro Interno do Servidor: entre em contato com o Administrador.");
            }
        },
        beforeSend: function () {
        },
        success: function (model) {
            $.each(model.content.values, function (index, value) {                
            idDoc = value['documentPK.documentId'];
            console.log(value);
            $("#idPasta").val(idDoc);   
            listaPasta(idDoc);             
            }); 
             return idDoc;   
        }
    }); 

  }


function listaPasta(idDoc){

$.ajax({ 
  async : true,
  type : "GET", 
  contentType: "application/json", 
  url : '/api/public/ecm/document/listDocument/'+idDoc, // 157 é o id da pasta que contém os arquivos 
  success: function(retorno) { //limpar listagem $(".arquivos").remove();
  $.each(retorno.content,function(k,v){
   console.log(v); //interagir com o HTML $(".arquivosEncontrados").append('
   if (v.description == 'Seguro de Vida') {     
     $("#pastaCriada").val('sim'); 
     $("#pastaSeguraExistente").val(v.id);
   }else{
     $("#pastaCriada").val('nao'); 
   }

   });
  }
 });
}

