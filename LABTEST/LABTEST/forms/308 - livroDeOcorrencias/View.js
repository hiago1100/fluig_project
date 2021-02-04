var htmlAux = "";
const dataAtual = moment().format("DD/MM/YYYY");
const usuraio = parent.WCMAPI.userLogin;
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
    },
    onEdit: function (params) {
      var atividade = params.WKNumState;
      let slcTipoSol =  $("#tipoSolicitacao").val();
      tipoSolicita(slcTipoSol);
      let slcAprovador =  $("#slcAprovador").val();
      masterClass(slcAprovador);
      blockFields(atividade);
      mostraDiv(atividade);
    	$("#cpDataAbertura").val(dataAtual);
      $("#cpSolicitanteNome").val(usuraio);
    }  
}; 
function masterClass(valor){
        console.log("valor", valor);
        if (valor == "1") {
      $(".divAtividade").removeClass("panel-info").addClass("panel-success");
      $(".divAtividade").removeClass("panel-danger").addClass("panel-success");
    }else if(valor == "2" || valor == "3"){
      $(".divAtividade").removeClass("panel-info").addClass("panel-danger");
      $(".divAtividade").removeClass("panel-success").addClass("panel-danger");
    }else{
      $(".divAtividade").removeClass("panel-danger").addClass("panel-info");
      $(".divAtividade").removeClass("panel-success").addClass("panel-info");
    }
    
}
function blockFields(atv){
  if (atv == 5) {
    console.log("N BLOQUEIA");
    $(".solicitante").attr("readonly","readonly");
  }else if (atv == 18) {
    console.log("BLOQUEIA");
    $(".aprovadores").attr("readonly","readonly");
  }
}

function aprovacao(){
   let tipo =  $("#tipoDesconto").val()
   let aprovador = "";
   if (tipo == "") {
      $("#cpValorPedido").val("")
      $("#cpPercentual").val("")
      FLUIGC.message.alert({
          message: 'Por gentileza preencher o Tipo de desconto',
          size: 'full',
          title: 'Atenção',
          label: 'Entendi'
      });
   }

   let valor = parseInt($("#cpPercentual").val());
   if (tipo == "1" || tipo == "2" || tipo == "4"){
      aprovador = "Pool:Role:admin";
   }else if (tipo == "3"){ 
        if (parseInt(valor) <= 10) {
            aprovador = "Pool:Role:admin";
        }else{
            aprovador = "Pool:Role:admin";
        }
   }
   $("#cpAprovador").val(aprovador)
}

function mostraDiv(atv){
if (atv == 5 || atv == 18){
  $(".divAtividade").show();
}else if (atv != 5 || atv != 18) {
  $(".divAtividade").hide();
}
  
}

function calculoPercent(){

  var valor =  $("#cpPercentual").val();
  var porcentagem="0";
  var preco="0";

  preco =  $("#cpValorPedido").val();
  porcentagem = parseFloat(valor) ;
  preco = parseFloat(preco) * (porcentagem/100);
  console.log('preco 1 ',preco);
  var novoTeste = parseFloat(preco.toFixed(2))
  console.log('preco 2',novoTeste);

   var soma_arredonda = preco.toFixed(2);
  $("#cpValorDesconto").val(soma_arredonda);
  
}

function onlynumber(evt) {
   var theEvent = evt || window.event;
   var key = theEvent.keyCode || theEvent.which;
   key = String.fromCharCode( key );
   //var regex = /^[0-9.,]+$/;
   var regex = /^[0-9.]+$/;
   if( !regex.test(key) ) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault) theEvent.preventDefault();
   }
}

function tipoSolicita(valor){

  if (valor == "" || valor == "1") {
    $("#divItem").addClass("hide");
  }else if (valor == "2"){
    $("#divItem").removeClass("hide");
  }

}

function validaPerc(valor){

  if (valor.length == 1) {
      $("#cpPercentual").val(valor+"000");
  }else if (valor.length == 2) {
      $("#cpPercentual").val(valor+"00");
  }if (valor.length == 3) {
      $("#cpPercentual").val(valor+"0");
  }

  
}
