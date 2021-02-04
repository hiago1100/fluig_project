var ultimaLinha = 0;
var ultimaLinhaConf = 0;
var UltimaLinhaConcat = 0;

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

    },
    onEdit: function(params) {  //Edição do formulário



        var WKNumState = params.WKNumState;

        $(".aba2Obs").attr('readonly','readonly');
        $(".aba3Obs").attr('readonly','readonly');
        //$(".aba4Obs").attr('readonly','readonly');
        $(".aba5Obs").attr('readonly','readonly');

        var index2 = 0;
        var index3 = 0;
        var index5 = 0;
    
        // Atividade Gestor Usuário - Aprovar
        if (WKNumState == 32 ) {   

              // Controle de bloqueio de botão na aba 2 após incluir um filho
            $('#btnNovo').removeAttr('disabled');
            $('#btnNovo').click(function(){

                    if($("#aba2Index").val() != '' || $("#aba2Index").val() != 0){
                        $('#btnNovo').attr('disabled','disabled');
                    }
            });


            $('#tabelaAba2').arqmasterdetail({
                buttonNewRow: "#btnNovo",
                onCustomizeRow: function($tr, index){

                    index2++;
                    $("#aba2Index").val(index2);
                }   
            });

            index2 = 0;
            $("#aba2Index").val(index2);

            // aba 3

            $('.aba3Obs').removeAttr('readonly');
            $('#btnNovo3').removeAttr('disabled');
            $('#btnNovo3').click(function(){

                if($("#aba3Index").val() != '' || $("#aba3Index").val() != 0){
                    $('#btnNovo3').attr('disabled','disabled');
                }
            });

            $('#tabelaAba3').arqmasterdetail({
                buttonNewRow: "#btnNovo3",
                onCustomizeRow: function($tr, index){

                    index3++;
                    $("#aba3Index").val(index3);
                }   
            });

            index3 = 0;
            $("#aba3Index").val(index3);

            // aba 4
            $('.aba5Obs').removeAttr('readonly');
            $('#btnNovo5').removeAttr('disabled');
            $('#btnNovo5').click(function(){

                    if($("#aba5Index").val() != '' || $("#aba5Index").val() != 0){
                        $('#btnNovo5').attr('disabled','disabled');
                    }
            });

            $('#tabelaAba5').arqmasterdetail({
                buttonNewRow: "#btnNovo5",
                onCustomizeRow: function($tr, index){

                    index5++;
                    $("#aba5Index").val(index5);
                }   
            });

            index5 = 0;
            $("#aba5Index").val(index5);
        }    

        // Tarefa Gestor Grupo
        if (WKNumState == 41) {  

            $('.aba3Obs').removeAttr('readonly');
            $('#btnNovo3').removeAttr('disabled');
            $('#btnNovo3').click(function(){

                    if($("#aba3Index").val() != '' || $("#aba3Index").val() != 0){
                        $('#btnNovo3').attr('disabled','disabled');
                    }
            });

            $('#tabelaAba3').arqmasterdetail({
                buttonNewRow: "#btnNovo3",
                onCustomizeRow: function($tr, index){

                    index3++;
                    $("#aba3Index").val(index3);
                }   
            });

            index3 = 0;
            $("#aba3Index").val(index3);

        }

        // Tarefa Segurança da Informação
        if (WKNumState == 27) {  

            $('.aba5Obs').removeAttr('readonly');
            $('#btnNovo5').removeAttr('disabled');
            $('#btnNovo5').click(function(){

                    if($("#aba5Index").val() != '' || $("#aba5Index").val() != 0){
                        $('#btnNovo5').attr('disabled','disabled');
                    }
            });

            $('#tabelaAba5').arqmasterdetail({
                buttonNewRow: "#btnNovo5",
                onCustomizeRow: function($tr, index){

                    index5++;
                    $("#aba5Index").val(index5);
                }   
            });

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


        
               
        
        // $('#bloquear').click(function(){
        //     context = $(this);
        //     if (context.is(':checked')){
        //         $("#codUsuario").prop('disabled', true);
        //     } else { 
        //         $("#codUsuario").prop('disabled', false);
        //     }
        // });
        
        //      carregaTabelaProgramas('cod_usuario', selectedItem["cod_usuario"]);



        // ESTOU POR AQUI
        $('#addGrupoUser').click(function(){

            $("#incluirOk").val("Ok");

            var context = $('#addGrupo');
            if (context.val() != ''){
                wdkAddChild('tabela_programas2');
                ultimaLinha = ultimaLinha +1 ;
        
            $("#nomedoseugrupo___"+ultimaLinha).val($('#codProgramaCopiaAux').val());
            $("#nomeGestdoGrupo___"+ultimaLinha).val($('#nomeProgramaCopiaAux').val());
            $("#gestorHide___"+ultimaLinha).val($('#descProgramaCopiaAux').val());
            $("#descGrupoUser___"+ultimaLinha).val($('#descProgramaCopiaAux').val());
            $("#descGrupoUser___"+ultimaLinha).val($('#descgrupoCopiaAux').val()); 
            
           
            }
            concatenaDesc();

            // $(document).ready(function() {
            //      alert( $("#tabela_programas2 tr").length - 2 );
            //      $("#cont").val($("#tabela_programas2 tr").length - 2);
            // }); 

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


    if( selectedItem.inputName == 'codUsuario'){
      $("#nomeUsuario").val(selectedItem["nome_usuario"]);
      $("#gestorUsuario").val(selectedItem["GEST"]);
      $("#codGest").val(selectedItem["COD_GEST"]);
      $("#idUsuario").val(selectedItem["cod_usuario"]);
      $('input[id^="codPrograma___"]').parent().parent('tr').remove();
      $('input[id^="nomedoseugrupo___"]').parent().parent('tr').remove();
      $('.mostraMod').hide();       
      var dsGrupos = DatasetFactory.getDataset('ARY-sql2dataset-busca-userGroup', null, null,null);
      console.log(dsGrupos);
      var user = $("#nomeUsuario").val();
        for(var i = 0; i < dsGrupos.values.length; i++){
         var user2 =  dsGrupos.values[i]['NOME_USUARIO'];                      
          if (user == user2 ) {
            ultimaLinha = ultimaLinha + 1;           
            wdkAddChild('tabela_programas2');
            $("#nomedoseugrupo___"+ultimaLinha).val(dsGrupos.values[i]["COD_GRUPO"]);
            $("#nomeGestdoGrupo___"+ultimaLinha).val(dsGrupos.values[i]["NOME_GESTOR"]);
            $("#gestorHide___"+ultimaLinha).val(dsGrupos.values[i]["COD_GESTOR"]);   
            $("#descGrupoUser___"+ultimaLinha).val(dsGrupos.values[i]["DESC_GRUPO"]);   
            
          }
        }
  
   
        reloadZoomFilterValues("grupos", "cod_usuario," + selectedItem["cod_usuario"]);




setaUltimaLinha();  



    } else if(selectedItem.inputName == 'grupos'){  
//      console.log('selectedItem', selectedItem);
        $('input[id^="codPrograma___"]').parent().parent('tr').remove();
        $('.mostraMod').show();     
        $(".chBloqueio").attr("checked","checked");       
        $('#descGrupo').val(selectedItem['DESC_GRUPO']);       
        var cod_usuario = selectedItem['GESTOR'];
        $("#codgrupoparam").val(selectedItem['cod_grupo']);

             var ret =  carregaProgramas();
               
                if(ret){
                     var linha = 0;
                    $('input[id^="codPrograma___"]').each(function(){
                        var codProg = $(this).val();
                      
                        var c4 = DatasetFactory.createConstraint('appMain', codProg ,codProg ,ConstraintType.MUST);
                        var dsConflitos = DatasetFactory.getDataset('ARY-AllConflitos2', null, [c4],null);
                        
                        var cont = 0;
                        for(var i =0;i<dsConflitos.values.length;i++){
                            $('input[id^="codPrograma___"]').each(function(){
                                var codProg = $(this).val();
                                var linhaProg = $(this).attr("id").split("___")[1];

                                var linha2 = i + 1;
                                if(codProg == dsConflitos.values[i]['appConflito']){

                                    linha = linha + 1;

                                    if($("#status___"+linhaProg).val() != "ok"){
                                        wdkAddChild('tabela_conflitos');
                                        console.log("ENTROU NO IF "+ linha);
                                        if(dsConflitos.values[i]['appRisco'] == "alto"){
                                           $("#farol___"+linha).parent().parent('tr').addClass('danger');
                                           $("#farol___"+linha).val("Alto");
                                        }
                                        if(dsConflitos.values[i]['appRisco'] == "medio"){
                                           $("#farol___"+linha).parent().parent('tr').addClass('warning');
                                           $("#farol___"+linha).val("Médio");
                                        }
                                        if(dsConflitos.values[i]['appRisco'] == "baixo"){
                                           $("#farol___"+linha).parent().parent('tr').addClass('success');
                                           $("#farol___"+linha).val("Baixo");
                                        }

                                        $("#appConflitoC___"+linha).val(dsConflitos.values[i]['appConflito']);
                                        $("#descConflitoC___"+linha).val(dsConflitos.values[i]['appMain']);
                                        $("#descMainC___"+linha).val(dsConflitos.values[i]['descConflito']);
                                        $("#codConflitoC___"+linha).val($("#codGrupo___"+linhaProg).val());
                                        $("#status___"+linhaProg).val("ok");
                                        console.log("ENTROU NO IF");
                                    }
                                    //console.log("APPMAIN : " + dsConflitos.values[i]['appMain']+ " | APPCONFLITO : "+ dsConflitos.values[i]['appConflito']);
                                }
                            });
                        }
                    });
                 }



        
//        console.log('cod_usuario', cod_usuario);
        
        var c1 = DatasetFactory.createConstraint('cod_usuario', cod_usuario ,cod_usuario ,ConstraintType.MUST);
        var dsUsuarios = DatasetFactory.getDataset('ARY-sql2dataset-usuarios', null, [c1],null);
//        console.log(dsUsuarios);
        if (dsUsuarios && dsUsuarios.values.length > 0){
            $('#nomeGestGrupo').val(dsUsuarios.values[0]['NOME_USUARIO']);

        }
        
        // carregaTabelaProgramas('cod_grupo', selectedItem["cod_grupo"]);
    
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
        
    } else if(selectedItem.inputName == "addGrupo") {

        $("#codProgramaCopiaAux").val(selectedItem['cod_grupo']);
        $("#nomeProgramaCopiaAux").val(selectedItem['NOME_GESTOR']);
        $("#descProgramaCopiaAux").val(selectedItem['GESTOR']);
        $("#descgrupoCopiaAux").val(selectedItem['DESC_GRUPO']);


    } 

}
// function carregaTabelaProgramas(campo, valor){
//     var c1 = DatasetFactory.createConstraint(campo, valor ,valor ,ConstraintType.MUST);
//     var dsProgramas = DatasetFactory.getDataset('ARY-sql2dataset-programas', null, [c1],null);
//     console.log(dsProgramas);
    
//     if (dsProgramas.values.length > 0){
        
//         var anterior = '';

//         var total = 0;
//         $("#populaCombo").find("option").remove().end();
//         $("#populaCombo").append(new Option('Todos','Todos'));
        
//         for(var i = 0; i < dsProgramas.values.length; i++){         
//             ultimaLinha = ultimaLinha + 1;
// //            console.log('ultimaLinha', ultimaLinha);
//             console.log("FOR : "+ i);
//             wdkAddChild('tabela_programas');
//             $("#moduloPrograma___"+ultimaLinha).val(dsProgramas.values[i]['DESCRIPTION_MODULO']);
//             $("#codPrograma___"+ultimaLinha).val(dsProgramas.values[i]['COD_PROGRAM']);
//             $("#nomePrograma___"+ultimaLinha).val(dsProgramas.values[i]['DESCRIPTION_PROGRAM']);
//             $("#descPrograma___"+ultimaLinha).val(dsProgramas.values[i]['OBS_UPC']);

//             $("#descRotina___"+ultimaLinha).val(dsProgramas.values[i]['DESCRICAO_ROTINA']);

//             $("#codModulo___"+ultimaLinha).val(dsProgramas.values[i]['COD_MODULO']);

            
//             var codPrograma = dsProgramas.values[i]['COD_PROGRAM'];
        
//             var codProg = DatasetFactory.createConstraint('appMain', codPrograma ,codPrograma ,ConstraintType.MUST);
//             var conflitos = DatasetFactory.getDataset('ARY-AllConflitos2', null, [codProg],null);

//             for(var e =0;e<conflitos.values.length;e++){
                
//                 if(codPrograma == conflitos.values[e]['appMain']){
                   
//                     console.info("CONFLITO "+conflitos.values[e]['appConflito']);
                   
//                     wdkAddChild('tabela_conflitos');
//                     index = e +1;
//                     $("#appConflitoC___"+index).val(conflitos.values[e]['appConflito']);
//                     var total = total + e;
//                     console.log("CONFITO DENTRO DO IF : " + conflitos.values[e]['appConflito'] + " / " + e);
//                     console.log("TOTAL : "+ total);
//                 }
//              }

//         }
//         validaConflito();
//     }
//     setaUltimaLinha();
// }

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

function validaConflito(){
    var dsConflitos = DatasetFactory.getDataset('ARY-AllConflitos', null, null,null);       
    $('input[id^="codPrograma___"]').each(function(){
        var context = $(this);
        var linha = context.attr('id').split('___')[1];
        
        for(var k=0; k< dsConflitos.values.length; k++){
            if (dsConflitos.values[k]['appConflito'] == context.val()){
                $('#codConflito___' + linha).val(dsConflitos.values[k]['codConflito']);
                context.parent().parent('tr').addClass('danger');
                $('#temConflito').val('sim');
                var param = {
                    'appConflito': dsConflitos.values[k]['appConflito'],
                    'codConflito': dsConflitos.values[k]['codConflito'],
                    'descConflito': dsConflitos.values[k]['descConflito'],
                    'appMain': dsConflitos.values[k]['appMain'],
                    'descMain': dsConflitos.values[k]['descMain'],
                    'appMainObs': dsConflitos.values[k]['appMainObs']
                };
                if (!validaSOD(dsConflitos.values[k]['appConflito']))
//                    mostraSOD(param)
                    
                controle.push(dsConflitos.values[k]['appConflito']);
            } else {
                $('#temConflito').val('');
            }
        }
    });
    
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

// function mostraSOD(param){
// //    console.log('param', param);
//     wdkAddChild('tabela_conflitos');
    
//     var index = [];

//     $('input[id^="codPrograma___"]').each(function(){
//         index.push($(this).attr('id').split('___')[1]);
//     });

//     var linha = index[index.length - 1];
    
//     $("#appConflitoC___"+linha).val(param['appConflito']);
//     $("#codConflitoC___"+linha).val(param['codConflito']);
//     $("#descConflitoC___"+linha).val(param['descConflito']);
//     $("#appMainC___"+linha).val(param['appMain']);
//     $("#descMainC___"+linha).val(param['descMain']);
//     $("#appMainObsC___"+linha).val(param['appMainObs']);
    
//     $('div[id="conflito"]').removeClass('hide');
// }


// function validaSOD(value){
//     var retorno = false;
//     for (var i = 0; i < controle.length; i++){
//         if (controle[i] == value)
//             retorno = true;
//     }
    
//     return retorno;
// }
function setaUltimaLinha(){
    $('input[id^="codPrograma___"]').each(function(){
        var context = $(this);
        ultimaLinha = parseInt(context.attr('id').split('___')[1]);     
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

    $('input[id^="nomedoseugrupo___"]').each(function(x){
        var context = $(this);
        var linha = context.attr('id').split("___")[1];
        arr.push($("#gestorHide___" + linha).val());  

        var contador = arr.length;
        
        // alert(contador);
        // $("#cont").val(contador);
    });


   
    $("#cont_aprovador").val(arr);

}

function carregaProgramas(){

    // var  idUsuario = $("#idUsuario").val();
    // console.log("USUARIO : " + idUsuario);
    // var c4 = DatasetFactory.createConstraint('cod_usuario', idUsuario ,idUsuario ,ConstraintType.MUST);
    // var dsGrupo = DatasetFactory.getDataset('ARY-sql2dataset-usuario-grupos', null, [c4],null);

    // for(var i=0;i<dsGrupo.values.length;i++){

        var codGrupo = $("#codgrupoparam").val();
        var c5 = DatasetFactory.createConstraint('cod_grupo', codGrupo ,codGrupo ,ConstraintType.MUST);
        var dsGrupoProg = DatasetFactory.getDataset('ARY-sql2dataset-programa-conflito', null, [c5],null);
        
        console.log("CARRREGA TABELA : "+ dsGrupoProg);

      for(var e = 0;e<dsGrupoProg.values.length;e++){
        wdkAddChild('tabela_programas');

        ultimaLinha = ultimaLinha + 1;
        $("#codGrupo___"+ultimaLinha).val(codGrupo);
        $("#moduloPrograma___"+ultimaLinha).val(dsGrupoProg.values[e]['DESCRIPTION_MODULO']);
        $("#codPrograma___"+ultimaLinha).val(dsGrupoProg.values[e]['COD_PROGRAM']);
        $("#nomePrograma___"+ultimaLinha).val(dsGrupoProg.values[e]['DESCRIPTION_PROGRAM']);
        $("#descPrograma___"+ultimaLinha).val(dsGrupoProg.values[e]['OBS_UPC']);
        $("#descRotina___"+ultimaLinha).val(dsGrupoProg.values[e]['DESCRICAO_ROTINA']);
        $("#codModulo___"+ultimaLinha).val(dsGrupoProg.values[e]['COD_MODULO']);
      }
    
    // }
    setaUltimaLinha();
    return true;
}
