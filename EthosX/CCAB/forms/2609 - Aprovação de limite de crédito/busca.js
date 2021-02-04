var busca = function(){     
    var t;
    if ( $.fn.dataTable.isDataTable( '#exemplo' ) ) {
        t = $('#exemplo').DataTable();
    }else {
        t = $('#exemplo').DataTable({
            "language": 
            {
                "sEmptyTable": "Nenhum registro encontrado",
                "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
                "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
                "sInfoFiltered": "(Filtrados de _MAX_ registros)",
                "sInfoPostFix": "",
                "sInfoThousands": ".",
                "sLengthMenu": "_MENU_ resultados por página",
                "sLoadingRecords": "Carregando...",
                "sProcessing": "Processando...",
                "sZeroRecords": "Nenhum registro encontrado",
                "sSearch": "Pesquisar",
                "oPaginate": {
                    "sNext": "Próximo",
                    "sPrevious": "Anterior",
                    "sFirst": "Primeiro",
                    "sLast": "Último"
                },
                "oAria": {
                    "sSortAscending": ": Ordenar colunas de forma ascendente",
                    "sSortDescending": ": Ordenar colunas de forma descendente"
                }
            },
            "pageLength": 5,
            "paging":   false
        } );
    }

    t.clear();   
                 
    if (CURRENT_STATE == 0 || CURRENT_STATE == 4) {
        var con1 = createFilters();        
        var resulp = DatasetFactory.getDataset("ds_consultaAprovacaoDeCredito", null, con1, null);  
      
    }
    else{
        var resulp = convertSelecionadosParaJson();
    }
    
    var gestor = $("#totvsid").val();
    
    if (resulp) {
            
        var records = resulp.values; 
        var totalv = 0;
        var vazio = 0;
        
        if (records.length > 0) {
            for ( var index in records) {
                var record = records[index];       
                
                // >>>>>>>>>> COLUNAS DO DATASET
                var DESCGRUPOVENDAS   = record["DESCGRUPOVENDAS"];
                var GRUPOVENDAS       = record["GRUPOVENDAS"];
                var LIMITECALCULADO   = record["LIMITECALCULADO"];
                var LIMITECLEAN       = record["LIMITECLEAN"];
                var LIMITEDISPONIVEL  = record["LIMITEDISPONIVEL"];
                var LIMITETEMPORARIO  = record["LIMITETEMPORARIO"]; 
                var PEDIDOSBLOQUEADOS = record["PEDIDOSBLOQUEADOS"];
                var PEDIDOSCARTEIRA   = record["PEDIDOSCARTEIRA"];
                var PEDIDOSLIBERADOS  = record["PEDIDOSLIBERADOS"]; 
                var SAFRA             = record["SAFRA"];
                var SALDODUPLICATAS   = record["SALDODUPLICATAS"]; 
                var CROPLINE          = record["CROPLINE"]; 
                var SALDOVENCIDO      = record["SALDOVENCIDO"];
                var MOTIVO            = (record["MOTIVO"]) ? record["MOTIVO"] : "";
                var MOEDAERP          = (record["MOEDA"]) ? record["MOEDA"] : "";
                 
                var valor  = converteMoeda(MOEDAERP,parseFloat(LIMITECALCULADO))
                var valor2 = converteMoeda(MOEDAERP,LIMITEDISPONIVEL)
                var valor3 = converteMoeda(MOEDAERP,PEDIDOSBLOQUEADOS)
                var valor4 = converteMoeda(MOEDAERP,PEDIDOSLIBERADOS)
                var valor5 = converteMoeda(MOEDAERP,SALDODUPLICATAS)
                var valor6 = converteMoeda(MOEDAERP,LIMITECLEAN) 
                var valor7 = converteMoeda(MOEDAERP,LIMITETEMPORARIO)
                var valor8 = converteMoeda(MOEDAERP,PEDIDOSCARTEIRA)
                var valor9 = converteMoeda(MOEDAERP,SALDOVENCIDO)

                var rowNode = t.row.add( [                
                    '<input type="checkbox" name="aprovacao" value="'+  GRUPOVENDAS +'" class="showSelected" onclick="countSelected();addRow(this); modalShowFields(this);">'+
                    '<input type="hidden" name="details" value=\'{"SAFRA" : " '+SAFRA+' ", "LIMITEDISPONIVEL" : " '+ valor2 +' ", "PEDIDOSBLOQUEADOS" : "'+  valor3 +'", "PEDIDOSLIBERADOS" : "'+ valor4 +'", "SALDODUPLICATAS" : "'+ valor5 +'", "LIMITECLEAN" : "'+valor6+'", "LIMITETEMPORARIO" : "'+valor7+'", "CROPLINE" : "'+CROPLINE+'", "PEDIDOSCARTEIRA"  : "'+valor8+'", "SALDOVENCIDO"  : "'+valor9+'", "MOTIVO"  : "'+MOTIVO+'" }\'>',
                    DESCGRUPOVENDAS ,  valor3 +               
                    '<input type="hidden" name="index" >',                
                    "<B>"+valor+"</B>"
                ] ).draw().node();        
                vazio++;
                totalv += convertToFloat(valor);                


            }

            totalv = converteMoeda(MOEDAERP,totalv);

            $("#valor").text(totalv);
            $("#selecionado").html('0 <br> selecionados');
            $("#valorSelecionado").text();
        
            if ((vazio == 0)) {
        
                var rows = t.rows().remove().draw();
                        
                FLUIGC.toast({            
                    message: 'Não localizado Informação para os filtros informados',
                    type: 'warning'
                });             
            }             
        }
        else{
            FLUIGC.toast({            
                message: 'Não foram encontradas aprovações pendentes',
                type: 'warning'
            });                     
    
        }

        
    }
    else{
        FLUIGC.toast({            
            message: 'Não foi possível estabelecer conexão com o Protheus, favor entrar em contato com T.I.',
            type: 'warning'
        });                     

    }

    $('td').addClass('text-center');

    return t;
    
    
    
}

function createFilters(){
        
    // ===============================
    // Campos
    // ===============================

    var grupo = $('#busca').val();
    // var gestor = $("#totvsid").val();
    var gestor = "000021";
    var check = checkManager();        
        
    var con1 = [];    
    
    // ===============================
    // Condições
    // ===============================

    if(grupo) {
        con1.push(DatasetFactory.createConstraint("DESCGRUPOVENDAS", "%"+grupo+"%", "%"+grupo+"%", ConstraintType.SHOULD, true));
    } 

    if(!check){
        if(gestor) {
            con1.push(DatasetFactory.createConstraint("GESTOR", gestor, gestor, ConstraintType.MUST));
        } 
    }
    
    // console.log(con1);
        
    return con1;

}

// adapta valores

var convertToFloat = function(valor){

    valor = valor.replace("R$","");
    valor = valor.replace(".","");
    valor = valor.replace(",",".");

    return parseFloat(valor);

}


// =========================
// DETALHES DA TABELA
function format ( d ) { 

    var input = d[0];
    var inputv = input.split("'");
    var obj = JSON.parse(inputv[1]);
          
    return '<p class="td-details"><b>Safra: </b>'+obj["SAFRA"]+"</p>"+
            '<p class="td-details"><b>Limite disponível: </b>'+obj["LIMITEDISPONIVEL"]+"</p>"+
            '<p class="td-details"><b>Limite clean: </b>'+obj["LIMITECLEAN"]+"</p>"+
            '<p class="td-details"><b>Limite temporário: </b>'+obj["LIMITETEMPORARIO"]+"</p>"+
            '<p class="td-details"><b>Pedidos bloqueados: </b>'+obj["PEDIDOSBLOQUEADOS"]+"</p>"+
            '<p class="td-details"><b>Pedidos na carteira: </b>'+obj["PEDIDOSCARTEIRA"]+"</p>"+
            '<p class="td-details"><b>Pedidos liberados: </b>'+obj["PEDIDOSLIBERADOS"]+"</p>"+
            '<p class="td-details"><b>Saldo duplicatas: </b>'+obj["SALDODUPLICATAS"]+"</p>"+
            '<p class="td-details"><b>Saldo vencido: </b>'+obj["SALDOVENCIDO"]+"</p>";
}


function converteMoeda(moeda,valor){
var total = 0;
if (moeda == "1") { 
    var formatterBr = new Intl.NumberFormat('pt-BR');
    total = formatterBr.format(valor);
    var result = "R$ " + total;
}else if (moeda == "2"){
    var formatterBr = new Intl.NumberFormat('en-US'); 
    total = formatterBr.format(valor);    
    var result = "US$ " + total;
}
return result;
}




