var BDOForms = {
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
    onEdit: function(params) {  //Edição do formulári

        var WKNumState = params.WKNumState;
     
        
        if(WKNumState == 0 || WKNumState == 4){
         // var index = 0;


        $("#inicia").click(function(){

            // alert("minha data" + $("#dataRevisao").val());
            // console.log($("#dataRevisao").val());
            var confima = confirm("Deseja Iniciar Revisão?");
            


            if(confima == true){
             
              // AJAX AQUI

              var c1 = DatasetFactory.createConstraint('dataConclusao', $("#dataRevisao").val() ,$("#dataRevisao").val() ,ConstraintType.MUST);
              var iniciaFluxo = DatasetFactory.getDataset('IniciaFluxo_v2', null, [c1] ,null);

             
             

            if(iniciaFluxo && iniciaFluxo.rowsCount > 0){    
              for(var i = 0;i<iniciaFluxo.values.length;i++){

                 
                var  index = wdkAddChild('tablaProvision');
                  $("#nomeUsuario___"+index).val(iniciaFluxo.values[i]['NOME_USUARIO']);
                  $("#nomeGestor___"+index).val(iniciaFluxo.values[i]['NOME_GESTOR']);
                  $("#count___"+index).val(iniciaFluxo.values[i]['ID_PROCESSO']);
                  $("#status___"+index).val("Aberto");
                  $("#status___"+index).parent().parent().parent('tr').addClass('danger'); 
              }
             } 

              // FIM DO AJAX AQUI

              $("#inicia").attr("disabled","disabled");
              $(".cancelar").attr("disabled","disabled");
            }
                
        });
          
        }

        if(WKNumState == 5){
            var index = 0;
            $("#inicia").hide();
            $("#tablaProvision tbody tr").each(function(i,$tr){
                index = index+1;
              

                var idProcesso = $("#count___"+index).val();

                console.log("numero da solicitacao", idProcesso);

                var c4 = DatasetFactory.createConstraint('workflowProcessPK.processInstanceId', idProcesso ,idProcesso ,ConstraintType.MUST);
                var verificaFluxo = DatasetFactory.getDataset('workflowProcess', null, [c4],null);
               
                for(i = 0; i < verificaFluxo.values.length; i++){
                 var row = verificaFluxo.values[i];

               var status = row['active'];
               console.log("Status da solicitação = ", status)
                
               if(status == true){
                
                    $("#status___"+index).val("Aberto");
                    $("#status___"+index).parent().parent().parent('tr').addClass('danger'); 
               }else{
                    $("#status___"+index).val("Encerrado");
                    $("#status___"+index).parent().parent().parent('tr').removeClass('danger'); 
                    $("#status___"+index).parent().parent().parent('tr').addClass('success'); 
                   
                }
              }

                $(".cancelar",$tr).click(function(){
                    var solic = $(".count",$tr).val();
                    console.log("numero da solicitacao",solic);
                    var nomeUsuario = $(".nomeUsuario",$tr).val();

                    console.log("Username", nomeUsuario);

                    var confima = confirm("Deseja cancelar a Revisão de "+ nomeUsuario+ " ?");

                    if(confima == true){
                        
                          var c5 = DatasetFactory.createConstraint('solic', solic ,solic ,ConstraintType.MUST);
                          var cancela = DatasetFactory.getDataset('CancelaSolicitacao_V2', null, [c5],null);
                        
                       if(cancela.values[0]['Status'] == "OK"){
                        $(".status",$tr).parent().parent().parent('tr').removeClass('danger'); 
                        $(".status",$tr).parent().parent().parent('tr').addClass('success'); 
                        $(".status",$tr).val("Encerrado");
                       }else{
                        alert("ERRO AO CANCELAR SOLICITAÇÃO");
                       }

                        
                           
                    }


                });

              
                
            });
            
        }
      

 

    }             
};
