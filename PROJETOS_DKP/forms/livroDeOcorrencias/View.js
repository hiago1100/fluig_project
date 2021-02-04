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


    	$("#cpDataAbertura").val(dataAtual);
      $("#cpSolicitanteNome").val(usuraio);


    }  
}; 
function criaDataTable(){
  var table = $("#table-history").DataTable();
  

  // new $.fn.dataTable.Buttons( table, {
  //     buttons: [
  //     'print', 'excel', 'pdf'
  //     ]
  // } );

  let hora  = horaExata();
  let numEvento = $("#opcao13").val();
  let equipamento = $("#opcao11111").val();
  let dds_descrição = $("#cpParecerReabertura").val();




  htmlAux += '<tr>';             
  htmlAux += '<td class="col-sm-2" align="center">'    +  hora    + '</td>' ;      
  htmlAux += '<td class="col-sm-2" align="center">'    + numEvento  +  '</td>';
  htmlAux += '<td class="col-sm-2" align="center">'    +  equipamento  + '</td>' ;
  htmlAux += '<td class="col-sm-2" align="center">'    +  dds_descrição + '</td>' ;
  htmlAux += '</tr>';  

  table.destroy();

  $("#table-history tbody").html(htmlAux);

  $("#table-history").DataTable({
     dom: 'Bfrtip',
        buttons: [
            'pdf'
        ],
      language: {
          search: "",
          emptyTable: "Não há solicitações com estas informações.",
          info: "Exibir _PAGE_ de _PAGES_"
      }
  }); 


   hora  = "";
   numEvento = "";
   equipamento = "";
   dds_descrição = "";

}


function horaExata(){

  var horas    =  new Date().getHours();
  var minutes  =  new Date().getMinutes();


        if (minutes == 0) {
            minutes = "00";
        }else if(minutes == 1){
            minutes = "01";
        }else if(minutes == 2){
            minutes = "02";
        }else if(minutes == 3){
            minutes = "03";
        }else if(minutes == 4){
            minutes = "04";
        }else if(minutes == 5){
            minutes = "05";
        }else if(minutes == 6){
            minutes = "06";
        }else if(minutes == 7){
            minutes = "07";
        }else if(minutes == 8){
            minutes = "08";
        }else if(minutes == 9){
            minutes = "09";
        } 

        if (horas == 0) {
            horas = "00";
        }else if(horas == 1){
            horas = "01";
        }else if(horas == 2){
            horas = "02";
        }else if(horas == 3){
            horas = "03";
        }else if(horas == 4){
            horas = "04";
        }else if(horas == 5){
            horas = "05";
        }else if(horas == 6){
            horas = "06";
        }else if(horas == 7){
            horas = "07";
        }else if(horas == 8){
            horas = "08";
        }else if(horas == 9){
            horas = "09";
        }   


        var horaCompleta = horas+":"+minutes;
    
      return horaCompleta;

}