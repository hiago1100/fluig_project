var ultimaLinha = 0;
var ultimaLinhaProg = 0;
var ultimaLinhaConf = 0;
var UltimaLinhaConcat = 0;
var indexObs = 0;
var carregaConf = FLUIGC.loading("#conflitosNav");
var carregaProg = FLUIGC.loading("#home");
var conflitosHtml = "";
var programasInclusaoHtml = "";
var txtHtml = "";


var controle = [];
var ARYForms = {
  params: {},
  initForm: function(params) {    
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
  onView: function(params) { //Visualização do formulário sem a possibilidade de edição (consulta)

      
      
    $("#addGrupoUser").addClass("hide");
    $("#divAprova").addClass("hide");


    var dadoss2 = "";
    var indice = 0;
    var indiceGrupo = 0;
    var indiceScroll = 0;

    var  idUsuario = $("#idUsuario").text();


    var c4 = DatasetFactory.createConstraint('cod_usuario', idUsuario ,idUsuario ,ConstraintType.MUST);
    var dsGrupo = DatasetFactory.getDataset('ARY-sql2dataset-usuario-grupos', null, [c4],null);

    if(indiceScroll > 1){
      indiceGrupo = indice / dsGrupo.values.length;  
    }

    for(var i=0;i<dsGrupo.values.length;i++){       

      var codGrupo = dsGrupo.values[i]['COD_GRUPO']; 

      console.log("codigo do grupo",codGrupo);             

      var dados = {"name": "ARY-sql2dataset-programas","fields":null,"constraints":[
      {"_field":"cod_grupo","_initialValue":codGrupo,"_finalValue": codGrupo,"_type":1},
      {"_field":"indice","_initialValue":indiceGrupo,"_finalValue": indiceGrupo,"_type":1}
      ]};

      $.ajax({
        method: "POST",
        url: "/api/public/ecm/dataset/datasets/",
        data: JSON.stringify(dados),
        contentType: "application/json", 
        async: true,
        error: function(x, e) {
          if (x.status == 500) {
            alert("Erro Interno do Servidor: entre em contato com o Administrador.");
          }
        },
        beforeSend: function(){

          carregaProg.show();

        },
        success:function(model) {

          $.each(model.content.values, function(index, value){

            var moduloProgramas         =   value.DESCRIPTION_MODULO;
            var codProgram              =   value.COD_PROGRAM; 
            var descProgramas           =   value.DESCRIPTION_PROGRAM;
            var obs_upc                 =   value.OBS_UPC; 

            if (obs_upc == "" || obs_upc == null) {
              obs_upc = "";

            }
            var descRotina              =   value.DESCRICAO_ROTINA;

            dadoss2 += '<tr class="warning">';
            dadoss2 += '<td class="col-sm-2">' + codGrupo +        '</td>';
            dadoss2 += '<td class="col-sm-2">' + moduloProgramas + '</td>';                         
            dadoss2 += '<td class="col-sm-2">' + descRotina +      '</td>';
            dadoss2 += '<td class="col-sm-2"><b>' + codProgram + '</b>' + " - " + descProgramas +   '</td>';
            dadoss2 += '<td class="col-sm-2">' + obs_upc +         '</td>';     
            dadoss2 += '</tr><br>';

          });

          $("#divProgramas").html(dadoss2);
          carregaProg.hide();  

        }

      });
    }

  // FIM PROGRAMAS 




  var dadoss3 = '';
  var coduser = $("#idUsuario").text();

  console.log(coduser);

  var dados = {"name": "ARY-sql2dataset-programa-conflito-inclusao2","fields":null,"constraints":[
  {"_field":"cod_usuario","_initialValue":coduser,"_finalValue": coduser,"_type":1}
  ]};
  $.ajax({
    method: "POST",
    url: "/api/public/ecm/dataset/datasets/",
    data: JSON.stringify(dados),
    contentType: "application/json", 
    async: false,
    error: function(x, e) {
      if (x.status == 500) {
        alert("Erro Interno do Servidor: entre em contato com o Administrador.");
      }
    },
    beforeSend: function(){

      carregaConf.show();

    },
    success:function(model) {

      $.each(model.content.values, function(index, value){

        var confAux          =   value.APPMAIN;
        var grupoAux         =   value.APPCONFLITO; 
        var progConfAux      =   value.DESCCONFLITO;
        var grupoConfAux     =   value.COD_GRUPO; 
        var descConfAux      =   value.GRUPO_CONFLITO;
        var riscoAux         =   value.APPRISCO;  
        var descGrupoConfl   =   value.DESC_GRUPO;

        if (grupoConfAux == 'Grupo Em Alteracao'){

          var tabCodGrupo = $('#grupos').val();
          var tabDescGrupo = $('#descGrupo').val();

          console.log("DESC DO GRUPO TAL ------>",tabDescGrupo);

          grupoConfAux = tabCodGrupo.concat(' - ',tabDescGrupo);

        }

        if (descConfAux == 'Grupo Em Alteracao'){

          var tabCodGrupo = $('#grupos').val();
          var tabDescGrupo = $('#descGrupo').val();

          descConfAux = tabCodGrupo.concat(' - ',tabDescGrupo);


        }else {
          descConfAux = descConfAux.concat(' - ',descGrupoConfl);
          
        }


        dadoss3 += '<table width="100%" class="table">';
        if(riscoAux == "alto"){
          dadoss3 += '<tr style="background-color:F2DEDE;">';
        }
        if(riscoAux == "medio"){
          dadoss3 += '<tr style="background-color:FCF8E3;">';
        }
        if(riscoAux == "baixo"){
          dadoss3 += '<tr style="background-color:DFF0D8">';
        }

        dadoss3 += '<td style="text-align: center;" class="col-sm-2">' + confAux +      '</td>';     
        dadoss3 += '<td style="text-align: center;" class="col-sm-2">' + grupoConfAux  +'</td>';     
        dadoss3 += '<td style="text-align: center;" class="col-sm-2">' + grupoAux +     '</td>';     
        dadoss3 += '<td style="text-align: center;" class="col-sm-2">' + descConfAux +  '</td>';     
        dadoss3 += '<td style="text-align: center;" class="col-sm-2">' + progConfAux +  '</td>';     
        dadoss3 += '<td style="text-align: center;" class="col-sm-2">' + riscoAux +     '</td>';
        dadoss3 += '</tr><br>';
        dadoss3 += '</table>';

        // console.log(dadoss3);

      });

      $(".testeColappse2").html(dadoss3);
      
      carregaConf.hide(); 

    }
  });

},
  onEdit: function(params) {  //Edição do formulário 


      
    $(".aprova").prop("checked", false);
    $("#aprovacaoProg").val('');



    var WKNumState = params.WKNumState;
    
    if(WKNumState != 4 || WKNumState != 0 ){
        
        ReadInputArea();
    }
    
    

    $(".aba2Obs").attr('readonly','readonly');
    $(".aba3Obs").attr('readonly','readonly');
    //$(".aba4Obs").attr('readonly','readonly');
    $(".aba5Obs").attr('readonly','readonly');

    var index2 = 0;
    var index3 = 0;
    var index5 = 0;

    if (WKNumState == 4) {
      
      $(".lixeira").hide();
      $(".lixeira2").hide();
      $(".adicionaProg").hide();
      $(".blockUser").hide();
      document.getElementById('nomeEmpresa').setAttribute('readOnly','');
      document.getElementById('codUsuario').setAttribute('readOnly','');






      carregaProgramas();
      carregaConflitos();
          $('input[id^="nomedoseugrupo2___"]').each(function(x){
        var context  = $(this);
        var linha    = context.attr('id').split("___")[1];
        var grupoAux = $("#nomedoseugrupo2___" + linha).val(); 
        var idGrupo  = $("#codGrupoERP___" + linha).val(); 
        carregaProgramasInc(idGrupo,grupoAux); 
    });

          
    
    }

    // Atividade Gestor Usuário - Aprovar
    
    // if (WKNumState != 27 ) {
    //    $("#divAprova").addClass('hide');
    // }
    if (WKNumState != 32 && WKNumState != 41 && WKNumState != 27) {
      $("#divAprova").addClass('hide');
    }


    if (WKNumState == 32 ) { 
         $(".lixeira").hide();
         $(".lixeira2").hide();
         $(".adicionaProg").hide();
         $(".blockUser").hide();
         document.getElementById('nomeEmpresa').setAttribute('readOnly','');
         document.getElementById('codUsuario').setAttribute('readOnly','');

          $('input[id^="nomedoseugrupo2___"]').each(function(x){
        var context  = $(this);
        var linha    = context.attr('id').split("___")[1];
        var grupoAux = $("#nomedoseugrupo2___" + linha).val(); 
        var idGrupo  = $("#codGrupoERP___" + linha).val(); 
        carregaProgramasInc(idGrupo,grupoAux); 
    });
      carregaProgramas();
      carregaConflitos();



        // Controle de bloqueio de botão na aba 2 após incluir um filho
        $('#btnNovo').removeAttr('disabled');
        $(".aba2Obs").removeAttr('readonly');

        $('#btnNovo').click(function(){

          if($("#aba2Index").val() != '' || $("#aba2Index").val() != 0){
            $('#btnNovo').attr('disabled','disabled');
          }
        });


        // $('#tabelaAba2').arqmasterdetail({
        //  buttonNewRow: "#btnNovo",
        //  onCustomizeRow: function($tr, index){

        //    index2++;
        //    $("#aba2Index").val(index2);
        //  }   
        // });

        index2 = 0;
        $("#aba2Index").val(index2);
      }    

    // Tarefa Gestor Grupo
    if (WKNumState == 41) {  

         $(".lixeira").hide();
         $(".lixeira2").hide();
         $(".adicionaProg").hide();
         $(".blockUser").hide();
         document.getElementById('nomeEmpresa').setAttribute('readOnly','');
         document.getElementById('codUsuario').setAttribute('readOnly','');
      carregaProgramas();
      carregaConflitos();
          $('input[id^="nomedoseugrupo2___"]').each(function(x){
        var context  = $(this);
        var linha    = context.attr('id').split("___")[1];
        var grupoAux = $("#nomedoseugrupo2___" + linha).val(); 
        var idGrupo  = $("#codGrupoERP___" + linha).val(); 
        carregaProgramasInc(idGrupo,grupoAux); 
    });



      $('.aba3Obs').removeAttr('readonly');
      $('#btnNovo3').removeAttr('disabled');
      $('#btnNovo3').click(function(){

        if($("#aba3Index").val() != '' || $("#aba3Index").val() != 0){
          $('#btnNovo3').attr('disabled','disabled');
        }
      });

      // $('#tabelaAba3').arqmasterdetail({
      //  buttonNewRow: "#btnNovo3",
      //  onCustomizeRow: function($tr, index){

      //    index3++;
      //    $("#aba3Index").val(index3);
      //  }   
      // });

      index3 = 0;
      $("#aba3Index").val(index3);

    }

    // Tarefa Segurança da Informação
    if (WKNumState == 27) {  

         $(".lixeira").hide();
         $(".lixeira2").hide();
         $(".adicionaProg").hide();
         $(".blockUser").hide();
         document.getElementById('nomeEmpresa').setAttribute('readOnly','');
         document.getElementById('codUsuario').setAttribute('readOnly','');
      carregaProgramas();
      carregaConflitos();
          $('input[id^="nomedoseugrupo2___"]').each(function(x){
        var context  = $(this);
        var linha    = context.attr('id').split("___")[1];
        var grupoAux = $("#nomedoseugrupo2___" + linha).val(); 
        var idGrupo  = $("#codGrupoERP___" + linha).val(); 
        carregaProgramasInc(idGrupo,grupoAux); 
    });



      $('.aba5Obs').removeAttr('readonly');
      $('#btnNovo5').removeAttr('disabled');
      $('#btnNovo5').click(function(){

        if($("#aba5Index").val() != '' || $("#aba5Index").val() != 0){
          $('#btnNovo5').attr('disabled','disabled');
        }
      });

      // $('#tabelaAba5').arqmasterdetail({
      //  buttonNewRow: "#btnNovo5",
      //  onCustomizeRow: function($tr, index){

      //    index5++;
      //    $("#aba5Index").val(index5);
      //  }   
      // });

      index5 = 0;
      $("#aba5Index").val(index5);
    } 
    
    //$(':input').prop('disabled', true);
    $('#tipoAcao').prop('disabled', false); 
    $('.selecioneHid').addClass('hide');  

    $('.revisa').removeClass('hide');
    $('#copia').addClass('hide');
    $('.selecioneHid').removeClass('hide');
    $(".allProgramas").addClass('hide'); 

    $("#aprov").click(function(){


      $("#aprov").attr('disabled','disabled');
      $("#aprov").attr('style','border-style: groove; border-width: 3px; border-color: black; padding-botton:1px;');
      $("input[name=aprova][value='sim']").prop("checked",true);
      $("#reprov").removeAttr('disabled');
      $("#aprovacaoProg").val("sim");

      $("#reprov").removeAttr('style');
        // alert("Radio sim: "+$("input[name='aprova']:checked").val());
      });


    $("#reprov").click(function(){


      $("#reprov").attr('disabled','disabled');
      $("#reprov").attr('style','border-style: groove; border-width: 3px; border-color: black; padding-botton:1px;');
      $("input[name=aprova][value='nao']").prop("checked",true);
      $("#aprov").removeAttr('disabled');
      $("#aprov").removeAttr('style');
      $("#aprovacaoProg").val("nao");
        // alert("Radio não: "+$("input[name='aprova']:checked").val());
      });



    $("#populaCombo").change(function(){
      var context = $(this);            
      console.log('context', context.val());
      $('input[id^="moduloPrograma___"]').each(function(){
        var context1 = $(this);
        context1.parent().parent('tr').removeClass('hide');
        if(context.val() != 'Todos'){
          if (context1.val() != context.val() )
            context1.parent().parent('tr').addClass('hide');
        }
      });
    });        
  }                           
};

function setSelectedZoomItem(selectedItem) {     


  if(selectedItem.inputName == "nomeEmpresa") {

    var idEmpresa = selectedItem['idEmpresa'];

    var dados_json = selectedItem['integration_data']; 

//   var myObj = JSON.parse(dados_json);

//   $("#servicoIntegracao").val(myObj.urlExecBo);
 //  $("#urlIntegracao").val(myObj.serviceProv);
 //  $("#userIntegracao").val(myObj.usuraio);

    $("#codigoEmpresa").val(idEmpresa);

    console.log("ID DA EMPRESA"+idEmpresa);


    reloadZoomFilterValues("codUsuario", "idEmpresa," + idEmpresa);  





  }else if(selectedItem.inputName == 'programasZoom'){ 

    $("#incluirOk").val("Ok");

    var cod_programa = selectedItem["cod_programa"];


    var c1 = DatasetFactory.createConstraint('idPrograma', cod_programa ,cod_programa ,ConstraintType.MUST);
    var dsProg = DatasetFactory.getDataset('SGA-sql2dataset-programa', null, [c1],null);  

      // txtHtml += '<div id="id_'+cod_programa+'">'; 
      // txtHtml += '<span>'+cod_programa+'</span> ';

          for(var i=0; i < dsProg.values.length;i++){

          if (dsProg.values[i]["cod_grupo"] != "sup") { 


            console.log("grupos que entraram no if" + dsProg.values[i]["cod_grupo"]);

            var LINHAINDEX = wdkAddChild('tabela_programas3');

            $("#nomedoseugrupo2___"+LINHAINDEX).val(dsProg.values[i]["cod_grupo"]);                
            $("#descGrupoUser2___"+LINHAINDEX).val(dsProg.values[i]["descricao_programa"]);
            $("#nomeGestdoGrupo2___"+LINHAINDEX).val("super");
            $("#descGrupoERP___"+LINHAINDEX).val(dsProg.values[i]["nome_grupo"]);
            $("#codGrupoERP___"+LINHAINDEX).val(dsProg.values[i]["idGrupo"]);


            if (LINHAINDEX % 2==0) {
              $("#gestorHide2___"+LINHAINDEX).val("admin");
              concatenaDesc();
            }else{
              $("#gestorHide2___"+LINHAINDEX).val("hiago.domingos");
              concatenaDesc();
            }

            $("#nomePrograma___"+LINHAINDEX).val(cod_programa); 

            carregaProgramasInc(dsProg.values[i]["idGrupo"],dsProg.values[i]["cod_grupo"]);
           }
          }               


  }else if( selectedItem.inputName == 'codUsuario'){
    $("#nomeUsuario").val(selectedItem["nome_usuario"]);
    
    $("#codGest").val("admin");
    $("#idUsuario").val(selectedItem["z_sga_usuarios_id"]);
    $("#codigoERP").val(selectedItem["cod_usuario"]);
    $('input[id^="codPrograma___"]').parent().parent('tr').remove();
    $('input[id^="nomedoseugrupo___"]').parent().parent('tr').remove();
    $('input[id^="codConflitoC___"]').parent().parent('tr').remove();

    var codigo_usuario = selectedItem["z_sga_usuarios_id"];

    var cod_usuario_erp = selectedItem["cod_usuario"];


    dadosUser(cod_usuario_erp);

  //  reloadZoomFilterValues("addGrupo", "codigoEmpresa," + idEmpresa);




  $('.mostraMod').hide();       
  
  var idEmpresa =  $("#codigoEmpresa").val();
 
  var c1 = DatasetFactory.createConstraint('idUsuario', codigo_usuario ,codigo_usuario ,ConstraintType.MUST);
  var c2 = DatasetFactory.createConstraint('idEmpresa', idEmpresa ,idEmpresa ,ConstraintType.MUST);
  var dsGrupos = DatasetFactory.getDataset('SGA-sql2dataset-usuario-grupos', null,[c1,c2],null);
  console.log(dsGrupos);

  //console.log("CODIGO DO MENINO", codigo_usuario);

  var user = $("#nomeUsuario").val();
  for(var i = 0; i < dsGrupos.values.length; i++){
    //   var user2 =  dsGrupos.values[i]['NOME_USUARIO'];                      
    //  if (user == user2 ) {
      
      
      ultimaLinha = ultimaLinha + 1;           
      wdkAddChild('tabela_programas2');
      $("#nomedoseugrupo___"+ultimaLinha).val(dsGrupos.values[i]["idLegGrupo"]);
      $("#nomeGestdoGrupo___"+ultimaLinha).val(dsGrupos.values[i]["nomeGestor"]);
      $("#grupoAux___"+ultimaLinha).val(dsGrupos.values[i]["idGrupo"])
      $("#gestorHide___"+ultimaLinha).val("COD_GEST");   
      $("#descGrupoUser___"+ultimaLinha).val(dsGrupos.values[i]["descAbrev"]);

       //var nomeGestor = dsGrupos.values[i]["nomeGestor"];    
      
     //   }
  }

   // $("#gestorUsuario").val(nomeGestor);

  carregaProgramas();
       carregaConflitos();

   //   reloadZoomFilterValues("grupos", "cod_usuario," + selectedItem["cod_usuario"]);     
   var conflitos = $("#tabela_conflitos tr").length - 2;

   if (conflitos  > 0 ){

    $("#temConflito").val("Sim");     

   } else {

    $("#temConflito").val("");    

   }

   setaUltimaLinha();  

  } else if(selectedItem.inputName == 'grupos'){  
//      console.log('selectedItem', selectedItem);
$('input[id^="codPrograma___"]').parent().parent('tr').remove();
$('.mostraMod').show();     
$(".chBloqueio").attr("checked","checked");       
$('#descGrupo').val(selectedItem['DESC_GRUPO']);       
var cod_usuario = selectedItem['GESTOR'];
$("#codgrupoparam").val(selectedItem['cod_grupo']);

var c1 = DatasetFactory.createConstraint('cod_usuario', cod_usuario ,cod_usuario ,ConstraintType.MUST);
var dsUsuarios = DatasetFactory.getDataset('ARY-sql2dataset-usuarios', null, [c1],null);

if (dsUsuarios && dsUsuarios.values.length > 0){
  $('#nomeGestGrupo').val(dsUsuarios.values[0]['NOME_USUARIO']);

}

} else if( selectedItem.inputName == 'codUsuarioCopia'){
  $("#nomeUsuarioCopia").val(selectedItem.nome_usuario);
  reloadZoomFilterValues("gruposCopia", "cod_usuario," + selectedItem["cod_usuario"]);
  carregaTabelaProgramasCopia('cod_usuario', selectedItem["cod_usuario"]);

} else if(selectedItem.inputName == 'gruposCopia'){
  $('input[id^="codPrograma___"]').parent().parent('tr').remove();
  reloadZoomFilterValues("modulosCopia", "cod_grupo," + selectedItem["cod_grupo"]);
  carregaTabelaProgramasCopia('cod_grupo', selectedItem["cod_grupo"]);

} else if(selectedItem.inputName == 'modulosCopia'){
  $('input[id^="codProgramaCopia___"]').parent().parent('tr').remove();
  carregaTabelaProgramasCopia('cod_modulo', selectedItem["cod_modulo"]);      

}

}

function carregaTabelaProgramasCopia(campo, valor){
  var c1 = DatasetFactory.createConstraint(campo, valor ,valor ,ConstraintType.MUST);
  var dsProgramas = DatasetFactory.getDataset('ARY-sql2dataset-programas', null, [c1],null);
  
  if (dsProgramas.values.length > 0){
    for(var i = 0; i < dsProgramas.values.length; i++){
      var j = i + 1;
      wdkAddChild('tabela_programas');
      $("#codProgramaCopia___"+j).val(dsProgramas.values[i]['COD_PROGRAM']);
      $("#nomeProgramaCopia___"+j).val(dsProgramas.values[i]['DESCRIPTION_PROGRAM']);
      $("#descProgramaCopia___"+j).val(dsProgramas.values[i]['OBS_UPC']);         
    }
    validaConflito();
  }
}

function displayConlitos(mostrar){
//  console.log('displayConlitos', mostrar);    
$('input[id^="codConflito___"]').each(function(){
  var context = $(this);
  if (context.val() == ''){
    var objLinha = context.parent().parent('tr');
    if (!mostrar) {
      objLinha.removeClass('hide');
    } else {
      objLinha.addClass('hide');
    }
  }
});
}

function setaUltimaLinha(){
  $('input[id^="nomedoseugrupo___"]').each(function(){
    var context = $(this);
    ultimaLinha = parseInt(context.attr('id').split('___')[1]);     
  });
}

function setaUltimaLinhaProg(){
  $('input[id^="descRotina___"]').each(function(){
    var context1 = $(this);
    ultimaLinhaProg = parseInt(context1.attr('id').split('___')[1]);     
  });
}

function setaUltimaLinhaConflitos(){
  $('input[id^="codConflitoC___"]').each(function(){
    var context = $(this);
    ultimaLinhaConf = parseInt(context.attr('id').split('___')[1]);     
  });
}

function setaUltimaLinhaConcat(){
  $('input[id^="gestorHide___"]').each(function(){
    var context = $(this);
    UltimaLinhaConcat = parseInt(context.attr('id').split('___')[1]);     
  });
}

function concatenaDesc(){

  var arr = [] ;

  $('input[id^="nomedoseugrupo2___"]').each(function(x){
    var context = $(this);
    var linha = context.attr('id').split("___")[1];
    arr.push($("#gestorHide2___" + linha).val());  

    var contador = arr.length;
    
  });

  var novaArr =  arr.filter(function(teste, i) { 

    return arr.indexOf(teste) == i ;

  }); 


  $("#cont_aprovador").val(novaArr);

}

                      // ESTOU AQUI NOVA FUNCTION


function carregaProgramas(){

  console.log("Entrou na function");

  var dadoss2 = "";
  var  idUsuario = $("#idUsuario").val();
  var codEmpresa =   $("#codigoEmpresa").val();

  console.log("Codigo do Usuario", idUsuario);
  console.log("Codigo da Empresa", codEmpresa);     

    // var c4 = DatasetFactory.createConstraint('idUsuario', idUsuario ,idUsuario ,ConstraintType.MUST);
   //  var dsGrupo = DatasetFactory.getDataset('SGA-sql2dataset-usuario-grupos', null, [c4],null);  
    //    for(var i=0;i<dsGrupo.values.length;i++){       
   //     var codGrupo = dsGrupo.values[i]['idLegGrupo']; 

   var dados = {"name": "SGA-sql2dataset-programa","fields":null,"constraints":[
   {"_field":"idUser","_initialValue":idUsuario,"_finalValue": idUsuario,"_type":1},
   {"_field":"codEmpresa","_initialValue":codEmpresa,"_finalValue": codEmpresa,"_type":1}
   ]};

   $.ajax({
    method: "POST",
    url: "/api/public/ecm/dataset/datasets/",
    data: JSON.stringify(dados),
    contentType: "application/json", 
    async: true,
    error: function(x, e) {
      if (x.status == 500) {
        alert("Erro Interno do Servidor: entre em contato com o Administrador.");
      }
    },
    beforeSend: function(){

      carregaConf.show();

    },
    success:function(model) {


      //console.log(model.content.values);

    //  var auxiliar = model.content.values;
      //var myObj    = JSON.parse(auxiliar);





      var table = $("#divProgramas").DataTable();

      $.each(model.content.values, function(index, value){

        //  var moduloProgramas         =   value.DESCRIPTION_MODULO;
        var codProgram              =   value.cod_programa; 
        var descProgramas           =   value.descricao_programa;
        var codGrupo                 =   value.idLegGrupo; 

        // if (obs_upc == "" || obs_upc == null) {
        //     obs_upc = "";
        // }
      //      var descRotina              =   value.DESCRICAO_ROTINA;

           dadoss2 += '<tr class="warning">';
           dadoss2 += '<td class="col-sm-2">' + codGrupo +        '</td>';
        //  dadoss2 += '<td class="col-sm-2">' + moduloProgramas + '</td>';                         
         // dadoss2 += '<td class="col-sm-2">' + descRotina +      '</td>';
         dadoss2 += '<td class="col-sm-2"><b>' + descProgramas +   '</td>';
         dadoss2 += '<td class="col-sm-2">'    + codProgram +      '</td>';     
        //  dadoss2 += '</tr><br>';


      });


    table.destroy();
    $("#divProgramas tbody").html(dadoss2);

    $("#divProgramas").DataTable({
         //  "processing": true,
         //  "serverSide": true,
         // "ajax":   model.content.values
    });

    carregaConf.hide();  

  }

});
  //} // fim do for
}


function carregaConflitos(){


 console.log("********************** MATRIZ DE RISCO **************************");

  var dadoss2 = '';
  var coduser = $("#codigoERP").val();

  var codigoEmpresa = $("#codigoEmpresa").val();

  console.log(coduser);

  var dados = {"name": "SGA-matriz_de_risco","fields":null,"constraints":[
  {"_field":"codigoEmpresa","_initialValue":codigoEmpresa,"_finalValue": codigoEmpresa,"_type":1},
  {"_field":"cod_usuario","_initialValue":coduser,"_finalValue": coduser,"_type":1}
  ]};
  $.ajax({
    method: "POST",
    url: "/api/public/ecm/dataset/datasets/",
    data: JSON.stringify(dados),
    contentType: "application/json", 
    async: true,
    error: function(x, e) {
      if (x.status == 500) {
        alert("Erro Interno do Servidor: entre em contato com o Administrador.");
      }
    },
    beforeSend: function(){

      carregaConf.show();

    },
    success:function(model) {

      $.each(model.content.values, function(index, value){

        var confAux          =   value.cod_programa;
        var grupoAux         =   value.cod_grupo; 
        var progConfAux      =   value.prog_confl;
        var grupoConfAux     =   value.gr_confl; 
        var descConfAux      =   value.ds_conflito;
        var riscoAux         =   value.APPRISCO;  
        var descGrupoConfl   =   value.ds_gr_confl;

        // if (grupoConfAux == 'Grupo Em Alteracao'){

        //   var tabCodGrupo = $('#grupos').val();
        //   var tabDescGrupo = $('#descGrupo').val();

        //   console.log("DESC DO GRUPO TAL ------>",tabDescGrupo);

        //   grupoConfAux = tabCodGrupo.concat(' - ',tabDescGrupo);

        // }

        // if (descConfAux == 'Grupo Em Alteracao'){

        //   var tabCodGrupo = $('#grupos').val();
        //   var tabDescGrupo = $('#descGrupo').val();

        //   descConfAux = tabCodGrupo.concat(' - ',tabDescGrupo);


        // }else {
        //   descConfAux = descConfAux.concat(' - ',descGrupoConfl);
          
        // }


        dadoss2 += '<table width="100%" class="table">';
        if(riscoAux == "alto"){
          dadoss2 += '<tr style="background-color:F2DEDE;">';
        }
        if(riscoAux == "medio"){
          dadoss2 += '<tr style="background-color:FCF8E3;">';
        }
        if(riscoAux == "baixo"){
          dadoss2 += '<tr style="background-color:DFF0D8">';
        }

        dadoss2 += '<td style="text-align: center;" class="col-sm-2">' + confAux +      '</td>';     
        dadoss2 += '<td style="text-align: center;" class="col-sm-2">' + grupoAux +'</td>';
        dadoss2 += '<td style="text-align: center;" class="col-sm-2">' + progConfAux +  '</td>';     
        dadoss2 += '<td style="text-align: center;" class="col-sm-2">' + grupoConfAux +     '</td>';     
        dadoss2 += '<td style="text-align: center;" class="col-sm-2">' + descConfAux +  '</td>';          
        dadoss2 += '<td style="text-align: center;" class="col-sm-2">' + riscoAux +     '</td>';
        dadoss2 += '</tr><br>';
        dadoss2 += '</table>';

        // console.log(dadoss2);

      });

      $(".testeColappse2").html(dadoss2);
      
      carregaConf.hide(); 

    }
  });

   console.log("********************** MATRIZ DE RISCO **************************");
}


function carregaConflitosInc(grupo){

  var coduser = $("#idUsuario").val();

  var dados = {"name": "ARY-sql2dataset-programa-conflito-inclusao2","fields":null,"constraints":[
  {"_field":"cod_grupo_add","_initialValue":grupo,"_finalValue": grupo,"_type":1}
  ]};
  $.ajax({
    method: "POST",
    url: "/api/public/ecm/dataset/datasets/",
    data: JSON.stringify(dados),
    contentType: "application/json", 
    async: true,
    error: function(x, e) {
      if (x.status == 500) {
        alert("Erro Interno do Servidor: entre em contato com o Administrador.");
      }
    },
    beforeSend: function(){

      carregaConf.show();

    },
    success:function(model) {

      $.each(model.content.values, function(index, value){

        var confAux          =   value.APPMAIN;
        var grupoAux         =   value.APPCONFLITO; 
        var progConfAux      =   value.DESCCONFLITO;
        var grupoConfAux     =   value.COD_GRUPO; 
        var descConfAux      =   value.GRUPO_CONFLITO;
        var riscoAux         =   value.APPRISCO;  
        var descGrupoConfl   =   value.DESC_GRUPO;

        if (grupoConfAux == 'Grupo Em Alteracao'){

          var tabCodGrupo = $('#grupos').val();
          var tabDescGrupo = $('#descGrupo').val();

          console.log("DESC DO GRUPO TAL ------>",tabDescGrupo);

          grupoConfAux = tabCodGrupo.concat(' - ',tabDescGrupo);

        }

        if (descConfAux == 'Grupo Em Alteracao'){

          var tabCodGrupo = $('#grupos').val();
          var tabDescGrupo = $('#descGrupo').val();

          descConfAux = tabCodGrupo.concat(' - ',tabDescGrupo);


        }else {
          descConfAux = descConfAux.concat(' - ',descGrupoConfl);
          
        }


        conflitosHtml += '<table width="100%" class="table">';
        if(riscoAux == "alto"){
          conflitosHtml += '<tr class="tabelaConfInc'+grupo+'" style="background-color:F2DEDE;">';
        }
        if(riscoAux == "medio"){
          conflitosHtml += '<tr class="tabelaConfInc'+grupo+'" style="background-color:FCF8E3;">';
        }
        if(riscoAux == "baixo"){
          conflitosHtml += '<tr class="tabelaConfInc'+grupo+'" style="background-color:DFF0D8">';
        }

        conflitosHtml += '<td style="text-align: center;" class="col-sm-2">' + confAux +      '</td>';     
        conflitosHtml += '<td style="text-align: center;" class="col-sm-2">' + grupoConfAux  +'</td>';     
        conflitosHtml += '<td style="text-align: center;" class="col-sm-2">' + grupoAux +     '</td>';     
        conflitosHtml += '<td style="text-align: center;" class="col-sm-2">' + descConfAux +  '</td>';     
        conflitosHtml += '<td style="text-align: center;" class="col-sm-2">' + progConfAux +  '</td>';     
        conflitosHtml += '<td style="text-align: center;" class="col-sm-2">' + riscoAux +     '</td>';
        conflitosHtml += '</tr><br>';
        conflitosHtml += '</table>';

      });

      $(".testeColappse3").html(conflitosHtml);
      
      carregaConf.hide(); 

    }
  });
}

function carregaProgramasInc(id,cod_grupo){



  console.log("Entrou na function inclusao cujo grupo é " , cod_grupo);



  

  var dados = {"name": "SGA-sql2dataset-programa","fields":null,"constraints":[
  {"_field":"idGrupo","_initialValue":id,"_finalValue": id,"_type":1}
  ]};

  $.ajax({
    method: "POST",
    url: "/api/public/ecm/dataset/datasets/",
    data: JSON.stringify(dados),
    contentType: "application/json", 
    async: true,
    error: function(x, e) {
      if (x.status == 500) {
        alert("Erro Interno do Servidor: entre em contato com o Administrador.");
      }
    },
    beforeSend: function(){

        carregaConf.show();

      },
      success:function(model) {  

      //var table =  $("#divProgramasAdd").DataTable();


    if (cod_grupo != "sup") { 

                programasInclusaoHtml += '<table width="100%" class="table">';
                programasInclusaoHtml += '<tr width="100%" id="tabelaConfInc2'+ cod_grupo+'">';
                programasInclusaoHtml += '<td align="center">'; 
                programasInclusaoHtml += '';
                programasInclusaoHtml += '<a style="text-decoration: none;" class="collapse-icon up" data-toggle="collapse" data-parent="#accordion" id="grupoCollapse" href="#unidade'+ cod_grupo+'">';
                programasInclusaoHtml += '<span align="center" class="badge badge-sucess"></span>';
                programasInclusaoHtml += '<button class="valordoDia form-control" style="width:100%;background-color: rgba(0, 255, 0, 0.3);">';
                programasInclusaoHtml += ''+ cod_grupo + '</button></a>';
                programasInclusaoHtml += '<div id="unidade'+ cod_grupo+'" class="panel-collapse collapse">';
                programasInclusaoHtml += '<table width="100%" class="table">';
                programasInclusaoHtml += '<tr>';
                programasInclusaoHtml += '<th class="col-sm-2" style="text-align: center;">Programa</th>';
                programasInclusaoHtml += '<th class="col-sm-2" style="text-align: center;">Descrição</th>';
       //         programasInclusaoHtml += '<th class="col-sm-2" style="text-align: center;">Programa Conflitante</th>';
     //           programasInclusaoHtml += '<th class="col-sm-2" style="text-align: center;">Grupo Conflitante   </th>';
   //             programasInclusaoHtml += '<th class="col-sm-2" style="text-align: center;">Descrição conflito  </th>';
                programasInclusaoHtml += '</tr></table>';         
                
                

        $.each(model.content.values, function(index, value){

//          var nomeGrupo                =   value.DESCRIPTION_MODULO;
          var codPrograma              =   value.cod_programa; 
          var descPrograma             =   value.descricao_programa;
      
        // programasInclusaoHtml += '<div class="container">';
        // programasInclusaoHtml += '<button type="button" class="btn btn-info" data-toggle="collapse" data-target="'+cod_grupo+'">Simple collapsible</button>';
        // programasInclusaoHtml += '<div id="'+cod_grupo+'" class="collapse">';
        // programasInclusaoHtml += '<tr class="tabelaProgInc">';
        // //programasInclusaoHtml += '<td class="col-sm-2">' + cod_grupo +  '</td>';
        // programasInclusaoHtml += '<td class="col-sm-2">' + codPrograma +  '</td>';                         
        // programasInclusaoHtml += '<td class="col-sm-2">' + descPrograma + '</td>';  
        // programasInclusaoHtml += '</tr>';
        // programasInclusaoHtml += '</div>';
        // programasInclusaoHtml += '</div>';

                programasInclusaoHtml += '<table class="table table-bordered text-center" id="tt-usuarios" width="100%">';
                programasInclusaoHtml += '<thead>';              
                programasInclusaoHtml += '<tr class="concat" id="concatUser">';     
                programasInclusaoHtml += '<td class="col-sm-6">' + codPrograma + ' </td>';
                programasInclusaoHtml += '<td class="col-sm-6">' + descPrograma + ' </td></tr>';
        });
      } 
        
      //  table.destroy();
      //  $("#divProgramasAdd tbody").html(programasInclusaoHtml);

        // $("#divProgramasAdd").DataTable({

        // });
            programasInclusaoHtml += '</table></thead></table></td></tr></table></table></tr></div>';
         $("#divProgramasAdd").html(programasInclusaoHtml);


         carregaConf.hide(); 


      }
    });    
}





function getIDUserResp(idElemento){
  idElemento = idElemento.replace(/[^0-9]/g,'');
  if ($("#NomUserResp___" + idElemento).val() == "" || $("#NomUserResp___" + idElemento).val() == null){
    var UserRespTrick = $("#NomUserResptrick").val();
    $("#NomUserResp___" + idElemento).val(UserRespTrick);
  }
}



function getID(idElemento){
  idElemento = idElemento.replace(/[^0-9]/g,'');
  if ($("#HoraResp___" + idElemento).val() == "" || $("#HoraResp___" + idElemento).val() == null){
    var dataResp = new Date();
    $("#HoraResp___" + idElemento).val(dataResp.toLocaleDateString() + " " + dataResp.toLocaleTimeString());
  }
}

function respbtn(){

  if( indexObs == 0 ){
    wdkAddChild('respoCham');

    indexObs++;
    $("#obsIndex").val("1");
  }

}

function ReadInputArea(){

  $('.respArea').each(function(i){
    if ($(this).val() != "" || $(this).val() == null){
      $(this).attr('readonly', true);
    }
  });
}


function fnCustomDelete(oElement){

  // Chamada a funcao padrao, NAO RETIRAR att: Hiago
  fnWdkRemoveChild(oElement);

  var valor = $(oElement).closest('tr').find("input[id^='nomedoseugrupo2']").val();

     console.log("O valor do campo Grupo é: " + valor);


   $("#tabelaConfInc2"+valor).addClass("hide");

   $(".tabelaProgInc"+valor).addClass("hide");


   concatenaDesc();




//     $('input[id^="nomedoseugrupo2___"]').each(function(x){
//         var context = $(this);
//         var grupoControle = context.val(); 

// //        var auxilio = $("#auxilio___"+grupoControle).val();


//             alert("apagou");

      
 

//     });



    // alert("#tabelaConfInc"+valor);


  //carregaConflitosInc("AB1");

   //    console.log("Deletei esse mano aqui", oElement);

}

function dadosUser(cod_usuario_erp){

    console.log("Estamos aqui part 1");  

  var idEmpresa =  $("#codigoEmpresa").val();

  console.log("id da empresa"+ idEmpresa);


  console.log("id do usuario"+ cod_usuario_erp);


  var c1 = DatasetFactory.createConstraint('idUsuario', cod_usuario_erp ,cod_usuario_erp ,ConstraintType.MUST);
  var c2 = DatasetFactory.createConstraint('idEmpresa', idEmpresa ,idEmpresa ,ConstraintType.MUST);
  var dsUserGest = DatasetFactory.getDataset('SGA-sql2dataset-usuarios', null,[c1,c2],null);
 
  console.log("ENTRAMOS NO FOR");

  //var user = $("#nomeUsuario").val();
  for(var i = 0; i < dsUserGest.values.length; i++){
    

       var gestor =  dsUserGest.values[i]['nomeGestor'];    

       $("#gestorUsuario").val(gestor);                  
   
       console.log("GESTOR DO USUARIO"+ gestor);
      
  }





}





