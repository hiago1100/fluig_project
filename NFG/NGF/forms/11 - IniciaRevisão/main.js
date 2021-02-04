// Component construction by setting the window.
var myLoading2 = FLUIGC.loading(window);

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
          var index = 0;

      $("#inicia").click(function(){
        if ($("#dataRevisao").val().length == 10) {  
            var confima = confirm("Deseja Iniciar Revisão?");

            if(confima == true){
                var c10 = DatasetFactory.createConstraint('processId', "Aryzta_Controle_Acessos" ,"Aryzta_Controle_Acessos" ,ConstraintType.MUST);
                var c15 = DatasetFactory.createConstraint('active', "true" ,"true" ,ConstraintType.MUST);
                var work = DatasetFactory.getDataset('workflowProcess', null, [c10,c15],null);




            if(work.values.length >0){
                  alert("Já existe processos de revisão em aberto.");
                }else{

                        var dados = {
                    "name": "IniciaFluxo_v2",
                    "fields":null,
                    "constraints":[
                      {
                        "_field":"dataConclusao",
                        "_initialValue":$("#dataRevisao").val(),
                        "_finalValue": $("#dataRevisao").val(),
                        "_type":1
                      }
                    ]
                  };
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
                        // We can show the message of loading
                        myLoading2.show();

                    },
                    success:function(model) {

                     $.each(model.content.values, function(index, value){

                        var id = wdkAddChild('tablaProvision');
                        $("#nomeUsuario___"+id).val(value.Nome_Usuario);
                        $("#nomeGestor___"+id).val(value.NOME_GESTOR);
                        $("#count___"+id).val(value.ID_PROCESSO);
                        $("#status___"+id).val("Aberto");

                        $("#status___"+id).parent().parent().parent('tr').addClass('danger'); 
                        myLoading2.hide();
                     });
                        return model;


                    }
                 });

                  $("#inicia").attr("disabled","disabled");
                  $(".cancelar").attr("disabled","disabled");
                }
              }
            }else{
            alert("Por favor insira uma data válida");
            } 
	      });



        	
        }

        if(WKNumState == 5){

            $("#dataRevisao").attr('readonly','readonly');

               

            var index = 0;


            $("#inicia").hide();
            $("#tablaProvision tbody tr").each(function(i,$tr){
                index = index+1;
              

                var idProcesso = $("#count___"+index).val();

                var c4 = DatasetFactory.createConstraint('workflowProcessPK.processInstanceId', idProcesso ,idProcesso ,ConstraintType.MUST);
                var verificaFluxo = DatasetFactory.getDataset('workflowProcess', null, [c4],null);
                for(var i = 0; i < verificaFluxo.values.length; i++) {
                    var row = verificaFluxo.values[i];
                    var status = row['active'];
                
                    console.log("status da solicitacão", status);

                               // var status = verificaFluxo.values[0]['active'];

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


                    var nomeUsuario = $(".nomeUsuario",$tr).val();

                    var confima = confirm("Deseja cancelar a Revisão de "+ nomeUsuario+ " ?");

                    if(confima == true){
                        
                          var c4 = DatasetFactory.createConstraint('solic', solic ,solic ,ConstraintType.MUST);
                          var cancela = DatasetFactory.getDataset('CancelaSolicitacao', null, [c4],null);
                        
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
