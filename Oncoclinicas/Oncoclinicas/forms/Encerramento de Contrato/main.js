var ultimaLinha = 0;
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

        if(WKNumState == 0 || WKNumState == 5  ){            
            
        }

        if (WKNumState != 0 || WKNumState != 5) {

            // $(".form-control").attr("readonly","");
        }

    } //fim do Edit                         
}; // fim da chamada de forms



function setZooms(){               
    //Cria zoom de filiais do Fluig
    $(".zoomFilial").on("click",function() {
        openZoom("ds_filial",
                "CODIGO, Codigo, DESCRICAO, Descrição, CGC, CPF/CNPJ",
                "CODIGO, DESCRICAO, CGC, ENDERECO, COMPLEMENTO, BAIRRO, CIDADE, ESTADO",
                "",
                $(this).attr('name')
        );
    });

};

function openZoom(datasetId, datafields, resultFields, constraints, type) {
    var position = getPositionCenter(900,600);
    window.open("/webdesk/zoom.jsp?datasetId=" + datasetId + "&dataFields=" + datafields + "&resultFields=" + resultFields + constraints + "&type=" + type, "zoom",
            "status, scrollbars=no,top="+position[1]+", left="+position[0]+",width=900, height=600");
}

function getPositionCenter(widthDiv, heightDiv){
    var alturaTela  = screen.height;
    var larguraTela = screen.width;                   
    var posicaoX = (larguraTela / 2) - (widthDiv  / 2); 
    var posicaoY = (alturaTela  / 2) - (heightDiv / 2);
    return [posicaoX, posicaoY];
}

function setSelectedZoomItem(item) { 

    if(item.type == 'zoomFilial'){
        $("#cpCodFiliais").val(item.CODIGO);
        $("#cpFilial").val(item.DESCRICAO);
  }
}
