var MyWidget = SuperWidget.extend({

    init: function() {
          solicitacaoPapel();   
          statusSolicitacao();     
    },
  
    bindings: {
        local: {
            'execute': ['click_executeAction']
        },
        global: {}
    },

        executeAction: function(htmlElement, event){

    }
});

function solicitacaoPapel(){ 
    var model;
    var papelDash = [];
    var solicitacoesDash = [];
    var html = "";
 
    var model = buscaBD("SELECT TOP 100 count(idi_status) AS QUANTIDADE, CD_MATRICULA FROM dbo.TAR_PROCES WHERE idi_status = '0' AND CD_MATRICULA LIKE '%Pool:Role%' GROUP BY CD_MATRICULA");

    $.each(model[0].content.values, function (index, value) {
        var papel = value.CD_MATRICULA;
        var solicitacoes =  value.QUANTIDADE;        
        papelDash.push(papel);
        solicitacoesDash.push(parseInt(solicitacoes)); 

        // html += "<tr>";
        // html += "<td>"+papel+"</td>";
        // html += "<td>"+solicitacoes+"</td>";
        // html += "</tr>";

   });

    var data = {
        labels: papelDash,
        datasets: [
            {
                label: "Atividades por Papel",
                fillColor: "rgba(139, 0, 0)",
                strokeColor: "rgba(220,220,220,0.8)",
                highlightFill: "rgba(220,220,220,0.75)",
                highlightStroke: "rgba(220,220,220,1)",
                data: solicitacoesDash
            }
        ]
    };

    var chart = FLUIGC.chart('#indicador', {
        id: 'set_an_id_for_my_chart',
        width: '300',
        height: '100',
    });    

    var barChart = chart.bar(data);
    $("#recebeIndicadorPapel").html(html);
}

function statusSolicitacao(){ 
    var htmlAuxiliar = "";
    var abertas      = [];
    var finalizadas  = [];
    var canceladas   = [];

    var modelAbertas     = buscaBD("SELECT count(idi_status) AS total  FROM TAR_PROCES WHERE idi_status = '0'");
    var modelFinalizadas = buscaBD("SELECT count(idi_status) AS total  FROM TAR_PROCES WHERE idi_status = '2'");
    var modelCanceladas  = buscaBD("SELECT count(idi_status) AS total  FROM TAR_PROCES WHERE idi_status = '4'");
  

    $.each(modelAbertas[0].content.values, function (index, value) {
        var abertaDB = value.total;
        abertas.push(abertaDB);              
   });

    $.each(modelFinalizadas[0].content.values, function (index, value) {
        var finalizaDB = value.total;
        finalizadas.push(finalizaDB);              
   });2

    $.each(modelCanceladas[0].content.values, function (index, value) {
        var canceladaDB = value.total;
        canceladas.push(canceladaDB);              
   });


    htmlAuxiliar += "<tr>";
    htmlAuxiliar += "<td>Abertas</td>";
    htmlAuxiliar += "<td><span class='label label-success'></span></td>";
    htmlAuxiliar += "<td><span class='label label-danger'>"+abertas+"</span></td>";
    htmlAuxiliar += "</tr>";
    htmlAuxiliar += "<tr>";
    htmlAuxiliar += "<td>Finalizadas</td>";
    htmlAuxiliar += "<td><span class='label label-success'></span></td>";
    htmlAuxiliar += "<td><span class='label label-success'>"+finalizadas+"</span></td>";
    htmlAuxiliar += "</tr>";
    htmlAuxiliar += "<tr>";
    htmlAuxiliar += "<td>Canceladas</td>";
    htmlAuxiliar += "<td><span class='label label-success'></span></td>";
    htmlAuxiliar += "<td><span class='label label-warning'>"+canceladas+"</span></td>";    
    htmlAuxiliar += "</tr>";

    



    var data = [
        {
            value: parseInt(abertas),
            color:"#FF5A5E",
            highlight: "#FF5A5E",
            label: "Abertas"
        },
        {
            value: parseInt(finalizadas),
            color: "#3CB371",
            highlight: "#3CB371",
            label: "Finalizadas"
        },
        {
            value: parseInt(canceladas),
            color: "#FDB45C",
            highlight: "#FFC870",
            label: "Canceladas"
        }
    ]

    var chartPie = FLUIGC.chart('#indicadorPie', {
        id: 'set_an_id_for_my_chart',
        width: '300',
        height: '100',
    });    
    
    var pieChart = chartPie.pie(data);
    $("#representacaoPi").html(htmlAuxiliar);

}


function buscaBD(query){

var qqr = [];
var dados = {
        "name": "dsSQL",
        "fields": [query],
        "constraints": null
    };
    $.ajax({
        method: "POST",
        url: "/api/public/ecm/dataset/datasets/",
        data: JSON.stringify(dados),
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
           qqr.push(model);           
        }
    }) 
     return qqr; 
}