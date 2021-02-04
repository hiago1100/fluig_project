$(document).load(function(){
   myLoading(true);
});
var brz_panel = SuperWidget.extend({
    init: function() {
        startPanel();
        myLoading(false);
    },
    bindings: {
        local: {
            'Bonification'    : ['click_executeBonification'],
            'DemandMin'       : ['click_executeDemandaMin'],
            'DemandMax'       : ['click_executeDemandaMax'],
            'NFS'             : ['click_executeNFS'],
            'Cube'            : ['click_executeCube'],
            'Reports'         : ['click_executeReports'],
            'Comissions'      : ['click_executeComissions'],
            'Calculation'     : ['click_executeCalculation'],
            'sendDbAwards'    : ['click_updateFormAwards'],
            'sendDbDemandMin' : ['click_updateFormMin'],
            'sendDbDemandMax' : ['click_updateFormMax'],
            'tabReports'      : ['click_tabReports'],
            'sendDbReports'   : ['click_sendDbReports'],
            
        },
        global: {}
    },
    executeBonification: function() {

        $("#Awards_filter > *, #Awards_table > *, #Awards_pag > *").remove();

        var dataInicio = $("#dtIniBonification").val();
        if (dataInicio) {
            dataInicio = dataInicio.split("/").reverse();
            dataInicio = dataInicio[0] + "-" + dataInicio[1] + "-" + dataInicio[2];
        }
        var dataFim = $("#dtFinBonification").val();
        if (dataFim) {
            dataFim = dataFim.split("/").reverse();
            dataFim = dataFim[0] + "-" + dataFim[1] + "-" + dataFim[2];
        }

        var emprBoni = $("#slEmprBoni").val();
        var imobBoni = $("#slImoBoni").val();

        if (dataInicio && dataFim ) {
            if (emprBoni && !imobBoni) {
                executeDBSearch(dataInicio, dataFim, emprBoni, "", "awards");
            } else if (emprBoni && imobBoni ) {
                executeDBSearch(dataInicio, dataFim, emprBoni, imobBoni, "awards");
            } else {
                executeDBSearch(dataInicio, dataFim, "", "", "awards");
                $("#hold_slEmprBoni").removeClass("hide");
            }
        } else {
            alert("Favor preencher o período para filtrar.");
        }

    },
    executeDemandaMin: function() {

        $("#DemandMin_filter > *, #DemandMin_table > *, #DemandMin_pag > *").remove();

        var dataInicio = $("#dtIniDemandMin").val();
        if (dataInicio) {
            dataInicio = dataInicio.split("/").reverse();
            dataInicio = dataInicio[0] + "-" + dataInicio[1] + "-" + dataInicio[2];
        }
        var dataFim = $("#dtFinDemandMin").val();
        if (dataFim) {
            dataFim = dataFim.split("/").reverse();
            dataFim = dataFim[0] + "-" + dataFim[1] + "-" + dataFim[2];
        }
        var emprDemandMin = $("#slEmprDemandMin").val();
        var imobDemandMin = $("#slImoDemandMin").val();

        if (dataInicio && dataFim) {
            if (emprDemandMin && !imobDemandMin) {
                executeDBSearch(dataInicio, dataFim, emprDemandMin, "", "demandMin");
            } else if (emprDemandMin && imobDemandMin) {
                executeDBSearch(dataInicio, dataFim, emprDemandMin, imobDemandMin, "demandMin");
            } else {
                executeDBSearch(dataInicio, dataFim, "", "", "demandMin");
                $("#hold_slEmprBoni").removeClass("hide");
            }
        } else {
            alert("Favor preencher o período para filtrar.");
        }

    },
    executeDemandaMax: function() {

        $("#DemandMax_filter > *, #DemandMax_table > *, #DemandMax_pag > *").remove();

        // DEMANDA MINIMA

        var dataInicio = $("#dtIniDemandMax").val();
        if (dataInicio) {
            dataInicio = dataInicio.split("/").reverse();
            dataInicio = dataInicio[0] + "-" + dataInicio[1] + "-" + dataInicio[2];
        }
        var dataFim = $("#dtFinDemandMax").val();
        if (dataFim) {
            dataFim = dataFim.split("/").reverse();
            dataFim = dataFim[0] + "-" + dataFim[1] + "-" + dataFim[2];
        }

        var emprDemandMax = $("#slEmprDemandMax").val();
        var imobDemandMax = $("#slImoDemandMax").val();

        if (dataInicio && dataFim) {
            if (emprDemandMax && !imobDemandMax) {
                executeDBSearch(dataInicio, dataFim, emprDemandMax, "", "demandMax");
            } else if (emprDemandMax && imobDemandMax) {
                executeDBSearch(dataInicio, dataFim, emprDemandMax, imobDemandMax, "demandMax");
            } else {
                executeDBSearch(dataInicio, dataFim, "", "", "demandMax");
                $("#hold_slEmprBoni").removeClass("hide");
            }
        } else {
            alert("Favor preencher o período para filtrar.");
        }

    },
    executeNFS: function() {

    },
    executeCube: function() {

    },
    executeReports: function() {

        myLoading(true);

        $("#Reports_table > .row > *").remove();


        var dataInicio = $("#dtIniReports").val();
        if (dataInicio) {
            dataInicio = dataInicio.split("/").reverse();
            dataInicio = dataInicio[0] + "-" + dataInicio[1] + "-" + dataInicio[2];
        }
        var dataFim = $("#dtFinReports").val();
        if (dataFim) {
            dataFim = dataFim.split("/").reverse();
            dataFim = dataFim[0] + "-" + dataFim[1] + "-" + dataFim[2];
        }

        var slEmprReports = $("#slEmprReports").val();
        var slImoReports = $("#slImoReports").val();


        if (dataInicio && dataFim ) {
            if (slEmprReports && !slImoReports) {
                var arrImobi = getImobConsolidated(dataInicio, dataFim);
                for(i = 0; i < arrImobi.length; i++){
                    getConsolidatedBruto(dataInicio, dataFim, slEmprReports, '', arrImobi[i], i); 
                    getConsolidated1Parc(dataInicio, dataFim, slEmprReports, '', arrImobi[i], i); 
                    getConsolidated2Parc(dataInicio, dataFim, slEmprReports, '', arrImobi[i], i); 
                    getConsolidatedParcU(dataInicio, dataFim, slEmprReports, '', arrImobi[i], i);
                    getConsolidatedDistr(dataInicio, dataFim, slEmprReports, '', arrImobi[i], i);
                }
            } else if(slEmprReports && slImoReports){
                getConsolidatedBruto(dataInicio, dataFim, slEmprReports, slImoReports, slImoReports, 0);
                getConsolidated1Parc(dataInicio, dataFim, slEmprReports, slImoReports, slImoReports, 0);
                getConsolidated2Parc(dataInicio, dataFim, slEmprReports, slImoReports, slImoReports, 0);
                getConsolidatedParcU(dataInicio, dataFim, slEmprReports, slImoReports, slImoReports, 0);
                getConsolidatedDistr(dataInicio, dataFim, slEmprReports, slImoReports, slImoReports, 0);
            } else {
                var arrImobi = getImobConsolidated(dataInicio, dataFim);
                for(i = 0; i < arrImobi.length; i++){
                    getConsolidatedBruto(dataInicio, dataFim, '', '', arrImobi[i], i); 
                    getConsolidated1Parc(dataInicio, dataFim, '', '', arrImobi[i], i); 
                    getConsolidated2Parc(dataInicio, dataFim, '', '', arrImobi[i], i); 
                    getConsolidatedParcU(dataInicio, dataFim, '', '', arrImobi[i], i);
                    getConsolidatedDistr(dataInicio, dataFim, '', '', arrImobi[i], i);
                }
            }
        } else {
            alert("Favor preencher o período para filtrar.");
        }

        $("#Reports_table .panel.panel-default").each(function(){
            $(this).find("table.table-consolided").css("margin-bottom", "20px");

            $(this).find("table.table-consolided, table.table-consolided tr, table.table-consolided tr th, table.table-consolided tr td").css({
                "border": "solid 1px gray",
                "border-collapse": "collapse"
            });

            $(this).find("table.table-consolided thead tr th").css({
                "background": "#58595b",
                "color": "#f0dc50",
                "font-weight": "bold",
                "text-align": "center",
                "text-shadow": "none"
            });
            $(this).find("table[id^='tableBruto_'] tr th, table[id^='table1Parc_'] tr td").css("text-align", "center");
            $(this).find("table.table-consolided tbody tr td[colspan='9'], table.table-consolided tbody tr td[colspan='10']").css({
                "font-weight": "bold",
                "text-transform": "uppercase",
                "padding-right": "10px"
            });

            $(this).find("table tr.total td:first-child").css("text-align", "right");
            $(this).find("table[id^='tableBruto_'] tr th, table[id^='tableBruto_'] tr td").css("white-space", "nowrap");
            $(this).find("table[id^='table1Parc_'] tr th:nth-child(9), table[id^='table1Parc_'] tr th:nth-child(10), table[id^='table1Parc_'] tr th:last-child").css("white-space", "nowrap");
            $(this).find("table[id^='table1Parc_'] tr td:nth-child(9), table[id^='table1Parc_'] tr td:nth-child(10), table[id^='table1Parc_'] tr td:last-child").css("white-space", "nowrap");
            $(this).find("table[id^='table2Parc_'] tr th:nth-child(10), table[id^='table2Parc_'] tr th:nth-child(11), table[id^='table2Parc_'] tr th:nth-child(12), table[id^='table2Parc_'] tr th:nth-child(13), table[id^='table2Parc_'] tr th:last-child").css("white-space", "nowrap");
            $(this).find("table[id^='table2Parc_'] tr td:nth-child(10), table[id^='table2Parc_'] tr td:nth-child(11), table[id^='table2Parc_'] tr td:nth-child(12), table[id^='table2Parc_'] tr td:nth-child(13), table[id^='table2Parc_'] tr td:last-child").css("white-space", "nowrap");
            $(this).find("table[id^='tableParcU_'] tr th:nth-child(10), table[id^='tableParcU_'] tr th:nth-child(11), table[id^='tableParcU_'] tr th:nth-child(12), table[id^='tableParcU_'] tr th:nth-child(13), table[id^='tableParcU_'] tr th:last-child").css("white-space", "nowrap");
            $(this).find("table[id^='tableParcU_'] tr td:nth-child(10), table[id^='tableParcU_'] tr td:nth-child(11), table[id^='tableParcU_'] tr td:nth-child(12), table[id^='tableParcU_'] tr td:nth-child(13), table[id^='tableParcU_'] tr td:last-child").css("white-space", "nowrap");
            $(this).find("table[id^='tableDist_'] tr th:last-child").css("white-space", "nowrap");
            $(this).find("table[id^='tableDist_'] tr td:last-child").css("white-space", "nowrap");
            $(this).find("div[id^='BlocoConsolidado_'] h1").css("font-size", "1em");
        });

        
        var count = 0;
        $("#Reports_table .panel.panel-default").each(function(){
            var tableBruto = $("#tableBruto_"+count+" tbody tr").length;
            var table1Parc = $("#table1Parc_"+count+" tbody tr").length;
            var table2Parc = $("#table2Parc_"+count+" tbody tr").length;
            var tableParcU = $("#tableParcU_"+count+" tbody tr").length;
            var tableDist  = $("#tableDist_"+count+" tbody tr").length;

            if(tableBruto == 0 && table1Parc == 0 && table2Parc == 0 && tableParcU == 0 && tableDist == 0){
                $(this).remove();
            }else{
                if(table1Parc == 0 ) $("#table1Parc_"+count+", #tbl1Name_"+count).remove();
                if(table2Parc == 0 ) $("#table2Parc_"+count+", #tbl2Name_"+count).remove();
                if(tableParcU == 0 ) $("#tableParcU_"+count+", #tbl3Name_"+count).remove();
                if(tableDist  == 0 ) $("#tableDist_"+count+", #tbl4Name_"+count).remove();
            }

            count++;
        });

        var t = $("#Reports_table .panel.panel-default").length;
        if(t == 0){
            var txt = '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center messageTime"><h1>Não há vendas para este período, imobiliária ou empreendimento.<br> Favor escolher outro filtro.</h1></div>'
            $("#Reports_table").append(txt);
        }else{
            $(".messageTime").remove();
        }

        $("#selectAllConsolided").click(function(){
            $("#Reports_table .panel.panel-default").each(function(){
                $(this).find("input[type='checkbox']").click();
            });
        });


        myLoading(false);


        $('.money').blur(function(){
            $(this).mask('###0.00', { reverse: true });
            var id  = $(this).attr('name').split('_').reverse();
            var val = $(this).val();

            var valTotal = $('#tableBruto_'+id[0]+' tbody tr td:last-child').text().replace(".", "").replace(",", ".");
                valTotal = valTotal.split(" ").reverse();

            var TotalL = parseFloat(valTotal[0]) - parseFloat(val);
                TotalL = TotalL.toFixed(2);

            $('#tableBruto_'+id[0]+' tbody tr td:nth-child(3)').text(val);
            $('#tableBruto_'+id[0]+' tbody tr td:last-child').text(TotalL);

            $('#tableBruto_'+id[0]+' tbody tr td:nth-child(3)').mask('#.##0,00', { reverse: true });
            $('#tableBruto_'+id[0]+' tbody tr td:last-child').mask('#.##0,00', { reverse: true });

            
            var txt1 = $('#tableBruto_'+id[0]+' tbody tr td:nth-child(3)').text();
            var txt2 = $('#tableBruto_'+id[0]+' tbody tr td:last-child').text();

            $('#tableBruto_'+id[0]+' tbody tr td:nth-child(3)').text("R$ "+txt1);
            $('#tableBruto_'+id[0]+' tbody tr td:last-child').text("R$ "+txt2);
        });

    },
    executeComissions: function() {

    },
    executeCalculation: function() {

    },
    updateFormAwards: function() {
        $('#tableAwards').dataTable().fnDestroy();
        $("#tableAwards tbody tr").each(function() {
            var elm = $(this);
            var chk = elm.find("input[id^='select_sale_awards_']");

            if (chk.is(":checked")) {
                var val = elm.find("input[id^='cpValBoni_']").val();
                var formId = elm.find("td:first-child").text();
                updateBonification(val, 'true', formId, 'premio');
            }
        });
        $("#tableAwards").DataTable({
            dom: 'Bfrtip',
            paging: true,
            select: true,
            lengthMenu: [10, 25, 50, 100],
            language: {
                search: "",
                emptyTable: "Não há solicitações com estas informações.",
                info: "Exibir _PAGE_ de _PAGES_"
            }
        });

        $("#tableAwards_wrapper .dt-buttons, #tableAwards_filter").appendTo("#DemandMin_filter");
        $("#tableAwards_info, #tableAwards_paginate").appendTo("#DemandMin_pag");
        $("#tableAwards_filter, #tableAwards_paginate").addClass("pull-right");
        $("#tableAwards_info").addClass("pull-left");
        $("#tableAwards_filter input").attr("placeholder", "Filtro");

        FLUIGC.message.alert({
            message: 'Premiação aplicada com sucesso.',
            title: '<i class="fluigicon fluigicon-thumbs-up"></i>',
            label: 'OK'
        });
        
    },
    updateFormMin: function() {
        $('#tableDemandMin').dataTable().fnDestroy();
        $("#tableDemandMin tbody tr").each(function() {
            var elm = $(this);
            var chk = elm.find("input[id^='select_sale_min_']");

            if (chk.is(":checked")) {
                var formId = elm.find("td:first-child").text();
                updateBonification('', 'true', formId, 'demandaMin');
            }
        });
        $("#tableDemandMin").DataTable({
            dom: 'Bfrtip',
            paging: true,
            select: true,
            lengthMenu: [10, 25, 50, 100],
            language: {
                search: "",
                emptyTable: "Não há solicitações com estas informações.",
                info: "Exibir _PAGE_ de _PAGES_"
            }
        });

        $("#tableDemandMin_wrapper .dt-buttons, #tableDemandMin_filter").appendTo("#DemandMin_filter");
        $("#tableDemandMin_info, #tableDemandMin_paginate").appendTo("#DemandMin_pag");
        $("#tableDemandMin_filter, #tableDemandMin_paginate").addClass("pull-right");
        $("#tableDemandMin_info").addClass("pull-left");
        $("#tableDemandMin_filter input").attr("placeholder", "Filtro");

        FLUIGC.message.alert({
            message: 'Demanda Mínima aplicada com sucesso.',
            title: '<i class="fluigicon fluigicon-thumbs-up"></i>',
            label: 'OK'
        });
        
    },
    updateFormMax: function() {
        $('#tableDemandMax').dataTable().fnDestroy();
        $("#tableDemandMax tbody tr").each(function() {
            var elm = $(this);
            var chk = elm.find("input[id^='select_sale_max_']");

            if (chk.is(":checked")) {
                var formId = elm.find("td:first-child").text();
                updateBonification('', 'true', formId, 'demandaMax');
            }
        });
        $("#tableDemandMax").DataTable({
            dom: 'Bfrtip',
            paging: true,
            select: true,
            lengthMenu: [10, 25, 50, 100],
            language: {
                search: "",
                emptyTable: "Não há solicitações com estas informações.",
                info: "Exibir _PAGE_ de _PAGES_"
            }
        });

        $("#tableDemandMax_wrapper .dt-buttons, #tableDemandMax_filter").appendTo("#DemandMin_filter");
        $("#tableDemandMax_info, #tableDemandMax_paginate").appendTo("#DemandMin_pag");
        $("#tableDemandMax_filter, #tableDemandMax_paginate").addClass("pull-right");
        $("#tableDemandMax_info").addClass("pull-left");
        $("#tableDemandMax_filter input").attr("placeholder", "Filtro");

        FLUIGC.message.alert({
            message: 'Demanda Máxima aplicada com sucesso.',
            title: '<i class="fluigicon fluigicon-thumbs-up"></i>',
            label: 'OK'
        });
        
    },
    tabReports: function(){
        getEmprendimentos("slEmprReports");
        getImobiliarias("slImoReports");

        $("#slEmprReports, #slImoReports").select2();
    },
    sendDbReports: function(){
        
        $("#Reports_table .panel").each(function(){
            var elm = $(this);
            var chk = elm.find("input[type='checkbox']");
            var id  = chk.attr("id").split("_").reverse();

            if(chk.is(':checked')){
                var ini = elm.find(".dtInicio").text();
                var fim = elm.find(".dtFim").text();
                var emp = elm.find(".emp").text();

                var html  = $("#msg_"+id).html();
                    html += $("#tableBruto_"+id).html();
                    html += $("#tbl1Name_"+id).html();
                    html += $("#table1Parc_"+id).html();
                    html += $("#tbl2Name_"+id).html();
                    html += $("#table2Parc_"+id).html();
                    html += $("#tbl3Name_"+id).html();
                    html += $("#tableParcU_"+id).html();
                    html += $("#tbl4Name_"+id).html();
                    html += $("#tableDist_"+id).html();
                    html += "<br><span><strong>Observações</strong><br>"+$("#cpObs_"+id).val()+"</span>";

                html.replace(undefined, "");

                sendMail(html, ini, fim, emp);
            }
        });
    },

});

function startPanel() {

    $('#myTabs>a').click(function(e) {
        e.preventDefault()
        $(this).tab('show');
    });

    $("#dtIniBonification, #dtIniDemandMin, #dtIniDemandMax, #dtIniNFS, #dtIniCube, #dtIniReports, #dtIniCommisions, #dtIniCalculation").datetimepicker({
        format: 'DD/MM/YYYY',
        useCurrent: false,
        locale: 'pt-br'
    });

    $('#dtFinBonification, #dtFinDemandMin, #dtFinDemandMax, #dtFinNFS, #dtFinCube, #dtFinReports, #dtFinCommisions, #dtFinCalculation').datetimepicker({
        format: 'DD/MM/YYYY',
        useCurrent: false,
        locale: 'pt-br'
    });

    // Awards
    $("#dtIniBonification").on("dp.change", function(e) {
        $('#dtFinBonification').data("DateTimePicker").minDate(e.date);
    });
    // Demand Min
    $("#dtIniDemandMin").on("dp.change", function(e) {
        $('#dtIniDemandMin').data("DateTimePicker").minDate(e.date);
    });
    // Demand Max
    $("#dtIniDemandMax").on("dp.change", function(e) {
        $('#dtIniDemandMax').data("DateTimePicker").minDate(e.date);
    });
    $("#dtIniNFS").on("dp.change", function(e) {
        $('#dtFinNFS').data("DateTimePicker").minDate(e.date);
    });
    $("#dtIniCube").on("dp.change", function(e) {
        $('#dtFinCube').data("DateTimePicker").minDate(e.date);
    });
    $("#dtIniReports").on("dp.change", function(e) {
        $('#dtFinReports').data("DateTimePicker").minDate(e.date);
    });
    $("#dtIniCommisions").on("dp.change", function(e) {
        $('#dtFinCommisions').data("DateTimePicker").minDate(e.date);
    });
    $("#dtIniCalculation").on("dp.change", function(e) {
        $('#dtFinCalculation').data("DateTimePicker").minDate(e.date);
    });


    // awards
    getEmprendimentos("slEmprBoni");
    getImobiliarias("slImoBoni");

    // demand min
    getEmprendimentos("slEmprDemandMin");
    getImobiliarias("slImoDemandMin");

    // demand max
    getEmprendimentos("slEmprDemandMax");
    getImobiliarias("slImoDemandMax");

    $("#slEmprBoni, #slImoBoni, #slEmprDemandMin, #slImoDemandMin, #slEmprDemandMax, #slImoDemandMax").select2();

}

function executeDBSearch(val1, val2, val3, val4, id){

    var DataTableColumns;
    var dataTableRows = [];
    var dados;

    var arr = [];

    if (val3 && !val4) {
        dados = {
            "name": "dsCalculaComissao", //dataset's id 
            "constraints": [{ //constraints to filter the search, all fields specified inside are required 
                    "_field": "dtVenda", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpEmpreendimentoCod", //name of the field used in the constraint 
                    "_initialValue": val3, //value to be filtered 
                    "_finalValue": val3, //final value to be filtered 
                    "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                }
            ]
        }
    } else if (val3 && val4) {
        dados = {
            "name": "dsCalculaComissao", //dataset's id 
            "constraints": [{ //constraints to filter the search, all fields specified inside are required 
                    "_field": "dtVenda", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpEmpreendimentoCod", //name of the field used in the constraint 
                    "_initialValue": val3, //value to be filtered 
                    "_finalValue": val3, //final value to be filtered 
                    "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpNomeimobiliaria", //name of the field used in the constraint 
                    "_initialValue": val4, //value to be filtered 
                    "_finalValue": val4, //final value to be filtered 
                    "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                }
            ]
        }
    } else {
        dados = {
            "name": "dsCalculaComissao", //dataset's id 
            "constraints": [{ //constraints to filter the search, all fields specified inside are required 
                "_field": "dtVenda", //name of the field used in the constraint 
                "_initialValue": val1, //value to be filtered 
                "_finalValue": val2, //final value to be filtered 
                "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                "_likeSearch": false
            }]
        }
    }

    $.ajax({
        method: "POST",
        url: "http://fluigtst.brz.eng.br:8081/api/public/ecm/dataset/datasets",
        data: JSON.stringify(dados),
        contentType: "application/json",
        async: false,
        error: function(x, e) {
            console.log("Erro Ajax Monta select");
            console.log(x);
            console.log(e);
        },
        success: function(data) {


            var x = 0;
            if (id == 'awards') {
                DataTableColumns += '<table id="tableAwards" class="table table-hover table-bordered">';
                var date;
                var dtAgregacao;
                var cpValorliquidovenda;

                for (var i = 0; i < data.content.values.length; i++) {
                    if (arr.indexOf(data.content.values[i].cpProcessID) === -1 || !data.content.values[i].cpProcessID) {
                        var checkbox = "";
                        var input = "";
                        
                        date = data.content.values[i].dtVenda;
                        date = date.split("-").reverse();
                        date = date[0]+"/"+date[1]+"/"+date[2];

                        dtAgregacao = data.content.values[i].dtAgregacao;

                        if(dtAgregacao == 'null' || dtAgregacao == null || dtAgregacao == undefined || dtAgregacao == 'undefined' || dtAgregacao == ''){
                            dtAgregacao = '';
                        }else{
                            dtAgregacao = dtAgregacao.split("-").reverse();
                            dtAgregacao = dtAgregacao[0]+"/"+dtAgregacao[1]+"/"+dtAgregacao[2];    
                        }



                        dataTableRows.push([
                            data.content.values[i].documentid,
                            data.content.values[i].cpProcessID,
                            data.content.values[i].cpEmpreendimento,
                            date,
                            data.content.values[i].cpNumerovenda,
                            data.content.values[i].cpBloco,
                            data.content.values[i].cpUnidade,
                            data.content.values[i].cpNomecliente,
                            data.content.values[i].cpNomeimobiliaria,
                            data.content.values[i].cpNomecorretor,
                            data.content.values[i].cpTipovenda,
                            data.content.values[i].cpValorliquidovenda,
                            data.content.values[i].cpValorReferenciaComissao,
                            dtAgregacao,
                            input += "<input type='text' id='cpValBoni_" + x + "' class='form-control percent'>",
                            checkbox += "<input type='checkbox' id='select_sale_awards_" + x + "'>"
                        ]);

                        arr.push(data.content.values[i].cpProcessID);
                        x++;
                    } // fim do if
                } // fim do for
            }

            if (id == 'demandMin') {
                DataTableColumns += '<table id="tableDemandMin" class="table table-hover table-bordered">';
                var date;
                for (var i = 0; i < data.content.values.length; i++) {
                    if (arr.indexOf(data.content.values[i].cpProcessID) === -1 || !data.content.values[i].cpProcessID) {
                        var checkbox = "";
                        var input = "";
                        date = data.content.values[i].dtVenda;
                        date = date.split("-").reverse();
                        date = date[0]+"/"+date[1]+"/"+date[2];

                        dataTableRows.push([
                            data.content.values[i].documentid,
                            data.content.values[i].cpProcessID,
                            data.content.values[i].cpEmpreendimento,
                            date,
                            data.content.values[i].cpNumerovenda,
                            data.content.values[i].cpBloco,
                            data.content.values[i].cpUnidade,
                            data.content.values[i].cpNomecliente,
                            data.content.values[i].cpNomeimobiliaria,
                            data.content.values[i].cpNomecorretor,
                            data.content.values[i].cpTipovenda,
                            data.content.values[i].cpValorliquidovenda,
                            data.content.values[i].cpValorReferenciaComissao,
                            data.content.values[i].dtAgregacao,
                            checkbox += "<input type='checkbox' id='select_sale_min_" + x + "'>"
                        ]);

                        arr.push(data.content.values[i].cpProcessID);
                        x++;
                    } // fim do if
                } // fim do for
            }

            if (id == 'demandMax') {
                DataTableColumns += '<table id="tableDemandMax" class="table table-hover table-bordered">';
                var date;
                for (var i = 0; i < data.content.values.length; i++) {
                    if (arr.indexOf(data.content.values[i].cpProcessID) === -1 || !data.content.values[i].cpProcessID) {
                        var checkbox = "";
                        var input = "";
                        date = data.content.values[i].dtVenda;
                        date = date.split("-").reverse();
                        date = date[0]+"/"+date[1]+"/"+date[2];

                        dataTableRows.push([
                            data.content.values[i].documentid,
                            data.content.values[i].cpProcessID,
                            data.content.values[i].cpEmpreendimento,
                            date,
                            data.content.values[i].cpNumerovenda,
                            data.content.values[i].cpBloco,
                            data.content.values[i].cpUnidade,
                            data.content.values[i].cpNomecliente,
                            data.content.values[i].cpNomeimobiliaria,
                            data.content.values[i].cpNomecorretor,
                            data.content.values[i].cpTipovenda,
                            data.content.values[i].cpValorliquidovenda,
                            data.content.values[i].cpValorReferenciaComissao,
                            data.content.values[i].dtAgregacao,
                            checkbox += "<input type='checkbox' id='select_sale_max_" + x + "'>"
                        ]);

                        arr.push(data.content.values[i].cpProcessID);
                        x++;
                    } // fim do if
                } // fim do for
            }

            DataTableColumns += '</table></div>';

            DataTableColumns = DataTableColumns.replace('undefined', '').replace('null', '');

            var checkboxAll;

            if (id == 'awards') {
                checkboxAll = "<input type='checkbox' id='select_all_sales_aw'>";
                $("#Awards_table").html(DataTableColumns);
            }
            if (id == 'demandMin') {
                checkboxAll = "<input type='checkbox' id='select_all_sales_dmin'>";
                $("#DemandMin_table").html(DataTableColumns);
            }
            if (id == 'demandMax') {
                checkboxAll = "<input type='checkbox' id='select_all_sales_dmax'>";
                $("#DemandMax_table").html(DataTableColumns);
            }


            var cog = '<i class="fluigicon fluigicon-cog fluigicon-xs"></i>';
            var buttonAll = "<button id='apply_to_all'><i class='fa'></i>Aplicar para Todos</button>";

            if (id == 'awards') {
              var columTab = [
                { title: 'ID'},
                { title: 'ProcessID'},
                { title: 'Empreendimento'},
                { title: 'Data da Venda'},
                { title: 'Numero da Venda'},
                { title: 'Bloco'},
                { title: 'Unidade'},
                { title: 'Nome do Cliente'},
                { title: 'Nome da Imobiliária'},
                { title: 'Nome do Corretor'},
                { title: 'Tipo da Venda'},
                { title: 'Valor Líquido Venda'},
                { title: 'Valor Referência'},
                { title: 'Data de Agregação / Quitação'},
                { title: 'Valor de Premiação'},
                { title: checkboxAll + " Aprovação"},
              ];
            }
            if (id == 'demandMin') {
              var columTab = [
                { title: 'ID'},
                { title: 'ProcessID'},
                { title: 'Empreendimento'},
                { title: 'Data da Venda'},
                { title: 'Numero da Venda'},
                { title: 'Bloco'},
                { title: 'Unidade'},
                { title: 'Nome do Cliente'},
                { title: 'Nome da Imobiliária'},
                { title: 'Nome do Corretor'},
                { title: 'Tipo da Venda'},
                { title: 'Valor Líquido Venda'},
                { title: 'Valor Referência'},
                { title: 'Data de Agregação / Quitação'},
                { title: checkboxAll + " Aprovação Demanda Min."},
              ];
            }
            if (id == 'demandMax') {
              var columTab = [
                { title: 'ID'},
                { title: 'ProcessID'},
                { title: 'Empreendimento'},
                { title: 'Data da Venda'},
                { title: 'Numero da Venda'},
                { title: 'Bloco'},
                { title: 'Unidade'},
                { title: 'Nome do Cliente'},
                { title: 'Nome da Imobiliária'},
                { title: 'Nome do Corretor'},
                { title: 'Tipo da Venda'},
                { title: 'Valor Líquido Venda'},
                { title: 'Valor Referência'},
                { title: 'Data de Agregação / Quitação'},
                { title: checkboxAll + " Aprovação Demanda Max."},
              ];
            }
            

            if (id == 'awards') {

                $("#tableAwards").DataTable({
                    dom: 'Bfrtip',
                    data: dataTableRows,
                    columns: columTab,
                    paging: false,
                    select: true,
                    lengthMenu: [10, 25, 50, 100],
                    language: {
                        search: "",
                        emptyTable: "Não há solicitações com estas informações.",
                        info: "Exibir _PAGE_ de _PAGES_"
                    }
                });
                
                $('#tableAwards').dataTable().fnDestroy();
                $('#tableAwards tbody tr td:nth-child(12)').each(function(){
                    var valLiq = $(this).text().trim();
                    if(valLiq != "" && valLiq != undefined && valLiq != null && valLiq != 0.00 && valLiq != "0,00" && valLiq != 0 && valLiq != 'undefined' && valLiq != 'null'){
                        valLiq = valLiq.split(".");
                        if(valLiq[1].length == 4){
                            valLiq = valLiq[0] +"."+ valLiq[1].substr(0, 2);
                            $(this).text(valLiq);
                        }
                    }
                    $(this).mask('#.##0,00', { reverse: true });
                });
                $("#tableAwards").DataTable({
                    dom: 'Bfrtip',
                    paging: true,
                    select: true,
                    lengthMenu: [10, 25, 50, 100],
                    language: {
                        search: "",
                        emptyTable: "Não há solicitações com estas informações.",
                        info: "Exibir _PAGE_ de _PAGES_"
                    }
                });

                $("#tableAwards_wrapper .dt-buttons, #tableAwards_filter").appendTo("#Awards_filter");
                $("#tableAwards_info, #tableAwards_paginate").appendTo("#Awards_pag");
                $("#tableAwards_filter, #tableAwards_paginate").addClass("pull-right");
                $("#tableAwards_info").addClass("pull-left");
                $("#tableAwards_filter input").attr("placeholder", "Filtro");

                $("#Awards_send").removeClass("hide");
            }

            if (id == 'demandMin') {
                $("#tableDemandMin").DataTable({
                    dom: 'Bfrtip',
                    data: dataTableRows,
                    columns: columTab,
                    paging: true,
                    select: true,
                    lengthMenu: [10, 25, 50, 100],
                    language: {
                        search: "",
                        emptyTable: "Não há solicitações com estas informações.",
                        info: "Exibir _PAGE_ de _PAGES_"
                    }
                });

                $('#tableDemandMin').dataTable().fnDestroy();
                $('#tableDemandMin tbody tr td:nth-child(12)').each(function(){
                    var valLiq = $(this).text().trim();
                    if(valLiq != "" && valLiq != undefined && valLiq != null && valLiq != 0.00 && valLiq != "0,00" && valLiq != 0 && valLiq != 'undefined' && valLiq != 'null'){
                        valLiq = valLiq.split(".");
                        if(valLiq[1].length == 4){
                            valLiq = valLiq[0] +"."+ valLiq[1].substr(0, 2);
                            $(this).text(valLiq);
                        }
                    }
                    $(this).mask('#.##0,00', { reverse: true });
                });
                $("#tableDemandMin").DataTable({
                    dom: 'Bfrtip',
                    paging: true,
                    select: true,
                    lengthMenu: [10, 25, 50, 100],
                    language: {
                        search: "",
                        emptyTable: "Não há solicitações com estas informações.",
                        info: "Exibir _PAGE_ de _PAGES_"
                    }

                });

                $("#tableDemandMin_wrapper .dt-buttons, #tableDemandMin_filter").appendTo("#DemandMin_filter");
                $("#tableDemandMin_info, #tableDemandMin_paginate").appendTo("#DemandMin_pag");
                $("#tableDemandMin_filter, #tableDemandMin_paginate").addClass("pull-right");
                $("#tableDemandMin_info").addClass("pull-left");
                $("#tableDemandMin_filter input").attr("placeholder", "Filtro");
                
                $("#DemandMin_send").removeClass("hide");
            }

            if (id == 'demandMax') {
                
                $("#tableDemandMax").DataTable({
                    dom: 'Bfrtip',
                    data: dataTableRows,
                    columns: columTab,
                    paging: false,
                    select: true,
                    lengthMenu: [10, 25, 50, 100],
                    language: {
                        search: "",
                        emptyTable: "Não há solicitações com estas informações.",
                        info: "Exibir _PAGE_ de _PAGES_"
                    }
                });
                $('#tableDemandMax').dataTable().fnDestroy();
                $('#tableDemandMax tbody tr td:nth-child(12)').each(function(){
                    var valLiq = $(this).text().trim();
                    if(valLiq != "" && valLiq != undefined && valLiq != null && valLiq != 0.00 && valLiq != "0,00" && valLiq != 0 && valLiq != 'undefined' && valLiq != 'null'){
                        valLiq = valLiq.split(".");
                        if(valLiq[1].length == 4){
                            valLiq = valLiq[0] +"."+ valLiq[1].substr(0, 2);
                            $(this).text(valLiq);
                        }
                    }
                    $(this).mask('#.##0,00', { reverse: true });
                });
                $("#tableDemandMax").DataTable({
                    dom: 'Bfrtip',
                    paging: true,
                    select: true,
                    lengthMenu: [10, 25, 50, 100],
                    language: {
                        search: "",
                        emptyTable: "Não há solicitações com estas informações.",
                        info: "Exibir _PAGE_ de _PAGES_"
                    }
                });
                $("#tableDemandMax_wrapper .dt-buttons, #tableDemandMax_filter").appendTo("#DemandMax_filter");
                $("#tableDemandMax_info, #tableDemandMax_paginate").appendTo("#DemandMax_pag");
                $("#tableDemandMax_filter, #tableDemandMax_paginate").addClass("pull-right");
                $("#tableDemandMax_info").addClass("pull-left");
                $("#tableDemandMax_filter input").attr("placeholder", "Filtro");

                $("#DemandMax_send").removeClass("hide");
            }



            $("#select_all_sales_aw").click(function() {
                $('#tableAwards').dataTable().fnDestroy();
                $("#tableAwards tbody tr").each(function() {
                    $(this).find("input").click();
                });
                $('#tableAwards').dataTable();
            });

            $("#select_all_sales_dmin").click(function() {
                $('#tableDemandMin').dataTable().fnDestroy();
                $("#tableDemandMin tbody tr").each(function() {
                    $(this).find("input").click();
                });
                $('#tableDemandMin').dataTable();
            });

            $("#select_all_sales_dmax").click(function() {
                $('#tableDemandMax').dataTable().fnDestroy();
                $("#tableDemandMax tbody tr").each(function() {
                    $(this).find("input").click();
                });
                $('#tableDemandMax').dataTable();
            });

            $(".percent").mask('#.##0,00', { reverse: true });

            $("#apply_to_all").click(function() {
                FLUIGC.message.confirm({
                    title: 'Aplicar valor de bonificação a todos.',
                    message: '<label>Valor a ser aplicado</label><input type="text" name="cpApplyToAll" id="cpApplyToAll" class="form-control">',
                    labelYes: 'Salvar',
                    labelNo: 'Cancelar'
                }, function(result, el, ev) {
                    if (result) {
                        $("#tableBonification tbody tr").each(function(i) {
                            $("#cpValBoni_" + i).val($("#cpApplyToAll").val());
                        });
                    }
                });
            });


        }
    });

}

function getEmprendimentos(idSelect) {
    var options;
    var optionsArr = [];
    var optionsCodArr = [];

    var dados = {
        "name": "dsCalculaComissao"
    }

    $.ajax({
        method: "POST",
        url: "http://fluigtst.brz.eng.br:8081/api/public/ecm/dataset/datasets",
        data: JSON.stringify(dados),
        contentType: "application/json",
        async: false,
        error: function(x, e) {
            console.log("Erro Ajax Monta select");
            console.log(x);
            console.log(e);
        },
        success: function(data) {

            options += "<option></option>";

            for (var i = 0; i < data.content.values.length; i++) {
                var empreendimento = data.content.values[i].cpEmpreendimento;
                if (optionsArr.indexOf(empreendimento) === -1 && empreendimento != null && empreendimento != "" && empreendimento != undefined && empreendimento != "undefined") {
                    optionsArr.push(empreendimento);
                    optionsCodArr.push(data.content.values[i].cpEmpreendimentoCod);
                }
            }

            for (i = 0; i < optionsArr.length; i++) {
                options += "<option value='" + optionsCodArr[i] + "'>" + optionsArr[i] + "</option>";
            }

            $("#" + idSelect).html(options);
        }
    });
}

function getImobiliarias(idSelect) {
    var options;
    var optionsArr = [];

    var dados = {
        "name": "dsCalculaComissao"
    }

    $.ajax({
        method: "POST",
        url: "http://fluigtst.brz.eng.br:8081/api/public/ecm/dataset/datasets",
        data: JSON.stringify(dados),
        contentType: "application/json",
        async: false,
        error: function(x, e) {
            console.log("Erro Ajax Monta select");
            console.log(x);
            console.log(e);
        },
        success: function(data) {

            options += "<option></option>";

            for (var i = 0; i < data.content.values.length; i++) {
                var imobiliaria = data.content.values[i].cpNomeimobiliaria;
                if (optionsArr.indexOf(imobiliaria) === -1 && imobiliaria != null && imobiliaria != "" && imobiliaria != undefined && imobiliaria != "undefined") {
                    optionsArr.push(imobiliaria);
                }
            }
            optionsArr.sort();

            for (i = 0; i < optionsArr.length; i++) {
                options += "<option value='" + optionsArr[i] + "'>" + optionsArr[i] + "</option>";
            }

            $("#" + idSelect).html(options);
        }
    });
}

// grava no banco do form
function updateBonification(field1, field2, documentid, type) {
    // field1 valor da porcentagem da bonificacao do formulário
    // field2 aprovacao da bonificacao

    var matricula = "hiago.oliveira"; // user 
    var senha = "123456"; // passaword

    var constraints = new Array();

    var companyId = DatasetFactory.createConstraint("companyId", 1, 1, ConstraintType.MUST);
    var user = DatasetFactory.createConstraint("user", matricula, matricula, ConstraintType.MUST);
    var password = DatasetFactory.createConstraint("password", senha, senha, ConstraintType.MUST);

    // info básica do formulálrio
    constraints.push(companyId);
    constraints.push(user);
    constraints.push(password);


    //fields
    if(type == 'premio'){
      var formulario = DatasetFactory.createConstraint("documentid", parseInt(documentid), parseInt(documentid), ConstraintType.MUST);
      var percent    = DatasetFactory.createConstraint("field", "cpValorParcelaBonificacao", field1, ConstraintType.MUST);
      var aprovacao  = DatasetFactory.createConstraint("field", "cpPermiteBonus", field2, ConstraintType.MUST);

      // campos para atualizar
      constraints.push(formulario);
      constraints.push(percent);
      constraints.push(aprovacao);
    }

    if(type == 'demandaMin'){
      var formulario = DatasetFactory.createConstraint("documentid", parseInt(documentid), parseInt(documentid), ConstraintType.MUST);
      var aprovacao  = DatasetFactory.createConstraint("field", "cpPermiteDemandaMin", field2, ConstraintType.MUST);

      // campos para atualizar
      constraints.push(formulario);
      constraints.push(aprovacao);
    }

    if(type == 'demandaMax'){
      var formulario = DatasetFactory.createConstraint("documentid", parseInt(documentid), parseInt(documentid), ConstraintType.MUST);
      var aprovacao  = DatasetFactory.createConstraint("field", "cpPermiteDemandaMax", field2, ConstraintType.MUST);

      // campos para atualizar
      constraints.push(formulario);
      constraints.push(aprovacao);
    }



    // executa o dataset
    var datasetUpdateCard = DatasetFactory.getDataset("ds_update_card", [], constraints, []);
}

// monta o consolidado
function getConsolidatedBruto(val1, val2, val3, val4, imobiliaria, x){

    var columnsBruto;
    var columns1Parc;
    var columns2Parc;
    var columnsParcUnic;
    var columnsDistrato;

    var rowsColumnsBruto = [];
    var rowsColumnsParc1 = [];
    var rowsColumnsParc2 = [];
    var rowsColumnsParcUnic = [];
    var rowsColumnsDistrato = [];

    var dados;

    var arrValorTotal = [];
    var arrValorDistr = [];

    var arr = [];


    if (val3 && !val4) {
        dados = {
            "name": "dsCalculaComissao", //dataset's id 
            "constraints": [{ //constraints to filter the search, all fields specified inside are required 
                    "_field": "dtVenda", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpEmpreendimentoCod", //name of the field used in the constraint 
                    "_initialValue": val3, //value to be filtered 
                    "_finalValue": val3, //final value to be filtered 
                    "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                }
            ]
        }
    } else if (val3 && val4) {
        dados = {
            "name": "dsCalculaComissao", //dataset's id 
            "constraints": [{ //constraints to filter the search, all fields specified inside are required 
                    "_field": "dtVenda", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpEmpreendimentoCod", //name of the field used in the constraint 
                    "_initialValue": val3, //value to be filtered 
                    "_finalValue": val3, //final value to be filtered 
                    "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpNomeimobiliaria", //name of the field used in the constraint 
                    "_initialValue": val4, //value to be filtered 
                    "_finalValue": val4, //final value to be filtered 
                    "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                }
            ]
        }
    } else {
        dados = {
            "name": "dsCalculaComissao", //dataset's id 
            "constraints": [{ //constraints to filter the search, all fields specified inside are required 
                "_field": "dtVenda", //name of the field used in the constraint 
                "_initialValue": val1, //value to be filtered 
                "_finalValue": val2, //final value to be filtered 
                "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                "_likeSearch": false
            }]
        }
    }

    $.ajax({
        method: "POST",
        url: "http://fluigtst.brz.eng.br:8081/api/public/ecm/dataset/datasets",
        data: JSON.stringify(dados),
        contentType: "application/json",
        async: false,
        error: function(x, e) {
            console.log("Erro Ajax Monta select");
            console.log(x);
            console.log(e);
        },
        success: function(data) {

            columnsBruto += '<table id="tableBruto_'+x+'" class="table-consolided">';

            var empreendimento;
            var valVenda;

            for (var i = 0; i < data.content.values.length; i++) {

                empreendimento = data.content.values[i].cpEmpreendimento;
                valComissao    = data.content.values[i].cpValor1parcelacomissao;

                if(imobiliaria == data.content.values[i].cpNomeimobiliaria && empreendimento && empreendimento != "undefined" && valComissao && valComissao != "0,00"){
                    var cpValorTotalDeComissao  = data.content.values[i].cpValortotaldecomissao  || 0;
                    var cpValor1ParcelaComissao = data.content.values[i].cpValor1parcelacomissao || 0;
                    var cpValor2ParcelaComissao = data.content.values[i].cpValor2parcelacomissao || 0;
                    var cpValor1ParcelaComissao = data.content.values[i].cpValor1parcelacomissao || 0;
                    var cpValordeDistrato       = data.content.values[i].cpValordeDistrato       || 0;


                    if(cpValorTotalDeComissao  != 0)  cpValorTotalDeComissao = cpValorTotalDeComissao.replace(".", "").replace(",",".");
                    if(cpValor1ParcelaComissao != 0) cpValor1ParcelaComissao = cpValor1ParcelaComissao.replace(".", "").replace(",",".");
                    if(cpValor2ParcelaComissao != 0) cpValor2ParcelaComissao = cpValor2ParcelaComissao.replace(".", "").replace(",",".");
                    if(cpValor1ParcelaComissao != 0) cpValor1ParcelaComissao = cpValor1ParcelaComissao.replace(".", "").replace(",",".");
                    if(cpValordeDistrato       != 0)       cpValordeDistrato = cpValordeDistrato.replace(".", "").replace(",",".");

                    empreendimento = data.content.values[i].cpEmpreendimento;

                    arrValorTotal.push(cpValorTotalDeComissao);
                    arrValorDistr.push(cpValordeDistrato);
                }
            } // fim do for
            
            var ValorTotal = arrValorTotal.reduce((a,b) => parseFloat(a) + parseFloat(b), 0);
            var ValorDistr = arrValorDistr.reduce((a,b) => parseFloat(a) + parseFloat(b), 0);
            var ValorTotalLiquido = parseFloat(ValorTotal) - parseFloat(ValorDistr);

            ValorTotal = ValorTotal.toFixed(2);
            ValorDistr = ValorDistr.toFixed(2);
            ValorTotalLiquido = ValorTotalLiquido.toFixed(2);

            if(ValorTotal == 0)        ValorTotal = "";
            if(ValorDistr == 0)        ValorDistr = "";
            if(ValorTotalLiquido == 0) ValorTotalLiquido = "";

            if(ValorTotal,ValorDistr,ValorTotalLiquido){
                rowsColumnsBruto.push([
                    ValorTotal,
                    ValorDistr,
                    '',
                    ValorTotalLiquido
                ]);
            }
            
            columnsBruto += '</table>';
            columnsBruto = columnsBruto.replace('undefined', '').replace('null', '');

            
            var dataInicio = val1.split('-').reverse();
                dataInicio = dataInicio[0]+'/'+dataInicio[1]+'/'+dataInicio[2];

            var dataFim = val2.split('-').reverse();
                dataFim = dataFim[0]+'/'+dataFim[1]+'/'+dataFim[2];

            imobiliaria = imobiliaria.replace(/\s/g, '-');

            var txt  = '<div id="chk_'+x+'" class="m-b-20">';
                txt += '<label><input type="checkbox" id="ckConsolidaded_'+x+'"> Selecionar Consolidado</label>';
                txt += '</div>';
                txt += '<div id="msg_'+x+'" class="m-b-20">';
                txt += '<h1>Prezados,<br>Liberado emissão de nota fiscal referente ao período <strong class="dtInicio">'+dataInicio+'</strong> a <strong class="dtFim">'+dataFim+'</strong> do empreendimento <strong class="emp">'+empreendimento+'</strong>:</h1>';
                txt += '</div>';

            $("#Reports_table > .row").append( txt + columnsBruto);

            var titleBruto = [
                { title: 'Valor BRUTO a pagar NF BRZ '+val2},
                { title: '- Desconto'},
                { title: '- Despesas'},
                { title: '= Valor da NF'}
            ];

        
            $("#tableBruto_"+x).DataTable({
                data: rowsColumnsBruto,
                columns: titleBruto,
                paging: false,
                select: true,
                lengthMenu: [10, 25, 50, 100],
                language: {
                    search: "",
                    emptyTable: "Não há solicitações com estas informações.",
                    info: "Exibir _PAGE_ de _PAGES_"
                }
            });
            
            $("#tableBruto_"+x).dataTable().fnDestroy();

            $("#tableBruto_"+x+" tbody tr td").each(function(){
                if($(this).text()){
                    $(this).mask('#.##0,00', { reverse: true });
                    var txt = $(this).text();
                    $(this).text('R$ '+txt);
                }
            });

        }
    });
}
function getConsolidated1Parc(val1, val2, val3, val4, imobiliaria, x){

    var columns1Parc;
    var dados;
    var rowsColumnsParc1 = [];
    var arrValor1Parc = [];
    var arrValorBonus = [];
    var arr = [];

    if (val3 && !val4) {
        dados = {
            "name": "dsCalculaComissao", //dataset's id 
            "constraints": [{ //constraints to filter the search, all fields specified inside are required 
                    "_field": "dtVenda", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpEmpreendimentoCod", //name of the field used in the constraint 
                    "_initialValue": val3, //value to be filtered 
                    "_finalValue": val3, //final value to be filtered 
                    "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                }
            ]
        }
    } else if (val3 && val4) {
        dados = {
            "name": "dsCalculaComissao", //dataset's id 
            "constraints": [{ //constraints to filter the search, all fields specified inside are required 
                    "_field": "dtVenda", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpEmpreendimentoCod", //name of the field used in the constraint 
                    "_initialValue": val3, //value to be filtered 
                    "_finalValue": val3, //final value to be filtered 
                    "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpNomeimobiliaria", //name of the field used in the constraint 
                    "_initialValue": val4, //value to be filtered 
                    "_finalValue": val4, //final value to be filtered 
                    "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                }
            ]
        }
    } else {
        dados = {
            "name": "dsCalculaComissao", //dataset's id 
            "constraints": [{ //constraints to filter the search, all fields specified inside are required 
                "_field": "dtVenda", //name of the field used in the constraint 
                "_initialValue": val1, //value to be filtered 
                "_finalValue": val2, //final value to be filtered 
                "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                "_likeSearch": false
            }]
        }
    }

    $.ajax({
        method: "POST",
        url: "http://fluigtst.brz.eng.br:8081/api/public/ecm/dataset/datasets",
        data: JSON.stringify(dados),
        contentType: "application/json",
        async: false,
        error: function(x, e) {
            console.log("Erro Ajax Monta select");
            console.log(x);
            console.log(e);
        },
        success: function(data) {

            columns1Parc += '<table id="table1Parc_'+x+'" class="table-consolided">';
            var date;
            var base;
            var empreendimento;
            var valVenda;

            for (var i = 0; i < data.content.values.length; i++) {
                empreendimento = data.content.values[i].cpEmpreendimento;
                valComissao    = data.content.values[i].cpValor1parcelacomissao;

                if(imobiliaria == data.content.values[i].cpNomeimobiliaria && empreendimento && empreendimento != "undefined" && valComissao && valComissao != "0,00"){

                    (!data.content.values[i].cpValorReferenciaComissao && data.content.values[i].cpValorReferenciaComissao != "0,00" ) ? base = data.content.values[i].cpValorReferenciaComissao : base = data.content.values[i].cpValorliquidovenda;

                    date = data.content.values[i].dtVenda;
                    date = date.split("-").reverse();
                    date = date[0]+"/"+date[1]+"/"+date[2];

                    rowsColumnsParc1.push([
                        date,
                        data.content.values[i].cpEmpreendimento,
                        data.content.values[i].cpBloco,
                        data.content.values[i].cpUnidade,
                        data.content.values[i].cpNomecliente,
                        data.content.values[i].cpNomeimobiliaria,
                        data.content.values[i].cpNomecorretor,
                        data.content.values[i].cpTipovenda,
                        base,
                        data.content.values[i].cpValor1parcelacomissao,
                        data.content.values[i].cpValorparcelabonificacao,
                    ]);


                    var cpValor1ParcelaComissao = data.content.values[i].cpValor1parcelacomissao || 0;
                    if(cpValor1ParcelaComissao != 0) cpValor1ParcelaComissao = cpValor1ParcelaComissao.replace(".","").replace(",",".");
                    arrValor1Parc.push(cpValor1ParcelaComissao);

                    var cpValorBonus = data.content.values[i].cpValorparcelabonificacao || 0;
                    if(cpValorBonus != 0) cpValorBonus = cpValorBonus.replace(".","").replace(",",".");
                    arrValorBonus.push(cpValorBonus);
                }
            } // fim do for
            
            var Valor1Parc = arrValor1Parc.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
            var ValorBonus = arrValorBonus.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);

            Valor1Parc = Valor1Parc.toFixed(2);
            ValorBonus = ValorBonus.toFixed(2);

            columns1Parc += '</table>';

            columns1Parc = columns1Parc.replace('undefined', '').replace('null', '');

            $("#Reports_table > .row").append(columns1Parc);

            var title = [
                { title: 'Data da Venda'},
                { title: 'Empreendimento'},
                { title: 'Bloco'},
                { title: 'Unidade'},
                { title: 'Cliente'},
                { title: 'Imobiliária'},
                { title: 'Corretor'},
                { title: 'Tipo Venda'},
                { title: 'Base Calculo'},
                { title: '1° Parcela'},
                { title: 'Bônus'}
            ];

        
            $("#table1Parc_"+x).DataTable({
                data: rowsColumnsParc1,
                columns: title,
                paging: false,
                select: true,
                lengthMenu: [10, 25, 50, 100],
                language: {
                    search: "",
                    emptyTable: "Não há solicitações com estas informações.",
                    info: "Exibir _PAGE_ de _PAGES_"
                }
            });
            
            $("#table1Parc_"+x).dataTable().fnDestroy();

            $("#table1Parc_"+x+" tbody tr td:nth-child(9)").each(function(){
                var valLiq = $(this).text().trim();
                    if(valLiq != "" && valLiq != undefined && valLiq != null && valLiq != 0.00 && valLiq != "0,00" && valLiq != 0 && valLiq != 'undefined' && valLiq != 'null'){
                        valLiq = valLiq.split(".");
                        if(valLiq[1].length == 4){
                            valLiq = valLiq[0] +"."+ valLiq[1].substr(0, 2);
                            $(this).text(valLiq);
                        }
                    }
                $(this).mask('#.##0,00', { reverse: true });
                var txt = $(this).text();
                $(this).text('R$ '+txt);
            });

            var tr = "<tr class='total'><td colspan='9'>Total</td><td>"+Valor1Parc+"</td> <td>"+ValorBonus+"</td></tr>";
            $(tr).insertAfter("#table1Parc_"+x+" tbody tr:last-child");

            var h1 = "<div id='tbl1Name_"+x+"'><h1>1ª Parcela para as unidades:</h1></div>";
            $(h1).insertBefore("#table1Parc_"+x);

            $("#table1Parc_"+x+" tbody tr td:nth-child(10), #table1Parc_"+x+" tbody tr td:last-child, #table1Parc_"+x+" tbody tr.total td:nth-child(2)").each(function(){
                if($(this).text()){
                    $(this).mask('#.##0,00', { reverse: true });
                    var txt = $(this).text();
                    $(this).text('R$ '+txt);
                }
            });
        }
    });
}
function getConsolidated2Parc(val1, val2, val3, val4, imobiliaria, x){

    var columns2Parc;
    var dados;
    var rowsColumnsParc2 = [];

    var arrValor2Parc = [];
    var arrValorBonus = [];
    var arrDemanMinim = [];
    var arrDemanMaxim = [];

    var arr = [];

    if (val3 && !val4) {
        dados = {
            "name": "dsCalculaComissao", //dataset's id 
            "constraints": [{ //constraints to filter the search, all fields specified inside are required 
                    "_field": "dtVenda", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpEmpreendimentoCod", //name of the field used in the constraint 
                    "_initialValue": val3, //value to be filtered 
                    "_finalValue": val3, //final value to be filtered 
                    "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                }
            ]
        }
    } else if (val3 && val4) {
        dados = {
            "name": "dsCalculaComissao", //dataset's id 
            "constraints": [{ //constraints to filter the search, all fields specified inside are required 
                    "_field": "dtVenda", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpEmpreendimentoCod", //name of the field used in the constraint 
                    "_initialValue": val3, //value to be filtered 
                    "_finalValue": val3, //final value to be filtered 
                    "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpNomeimobiliaria", //name of the field used in the constraint 
                    "_initialValue": val4, //value to be filtered 
                    "_finalValue": val4, //final value to be filtered 
                    "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                }
            ]
        }
    } else {
        dados = {
            "name": "dsCalculaComissao", //dataset's id 
            "constraints": [{ //constraints to filter the search, all fields specified inside are required 
                "_field": "dtVenda", //name of the field used in the constraint 
                "_initialValue": val1, //value to be filtered 
                "_finalValue": val2, //final value to be filtered 
                "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                "_likeSearch": false
            }]
        }
    }

    $.ajax({
        method: "POST",
        url: "http://fluigtst.brz.eng.br:8081/api/public/ecm/dataset/datasets",
        data: JSON.stringify(dados),
        contentType: "application/json",
        async: false,
        error: function(x, e) {
            console.log("Erro Ajax Monta select");
            console.log(x);
            console.log(e);
        },
        success: function(data) {

            columns2Parc += '<table id="table2Parc_'+x+'" class="table-consolided">';
            var date;
            var date2;
            var base;
            var empreendimento;
            var valVenda;

            for (var i = 0; i < data.content.values.length; i++) {
                empreendimento = data.content.values[i].cpEmpreendimento;
                valComissao    = data.content.values[i].cpValor2parcelacomissao;

                if(imobiliaria == data.content.values[i].cpNomeimobiliaria && empreendimento && empreendimento != "undefined" && valComissao && valComissao != "0,00"){

                    (!data.content.values[i].cpValorReferenciaComissao && data.content.values[i].cpValorReferenciaComissao != "0,00" ) ? base = data.content.values[i].cpValorReferenciaComissao : base = data.content.values[i].cpValorliquidovenda;

                    date = data.content.values[i].dtVenda;
                    date = date.split("-").reverse();
                    date = date[0]+"/"+date[1]+"/"+date[2];

                    date2 = data.content.values[i].dtAgregacao;
                    date2 = date2.split("-").reverse();
                    date2 = date2[0]+"/"+date2[1]+"/"+date2[2];

                    rowsColumnsParc2.push([
                        date,
                        date2,
                        data.content.values[i].cpEmpreendimento,
                        data.content.values[i].cpBloco,
                        data.content.values[i].cpUnidade,
                        data.content.values[i].cpNomecliente,
                        data.content.values[i].cpNomeimobiliaria,
                        data.content.values[i].cpNomecorretor,
                        data.content.values[i].cpTipovenda,
                        base,
                        data.content.values[i].cpValor2parcelacomissao,
                        data.content.values[i].cpValorparcelademandaminima,
                        data.content.values[i].cpValorparcelademandamaxima,
                        data.content.values[i].cpValorparcelabonificacao
                    ]);


                    var cpValor2ParcelaComissao = data.content.values[i].cpValor2parcelacomissao || 0;
                    if(cpValor2ParcelaComissao != 0) cpValor2ParcelaComissao = cpValor2ParcelaComissao.replace(".", "").replace(",", ".");
                    arrValor2Parc.push(cpValor2ParcelaComissao);

                    var cpValorBonus = data.content.values[i].cpValorparcelabonificacao || 0;
                    if(cpValorBonus != 0) cpValorBonus = cpValorBonus.replace(".", "").replace(",", ".");
                    arrValorBonus.push(cpValorBonus);

                    var cpValDemanMin = data.content.values[i].cpValorparcelademandaminima || 0;
                    if(cpValDemanMin != 0) cpValDemanMin = cpValDemanMin.replace(".", "").replace(",", ".");
                    arrDemanMinim.push(cpValDemanMin);

                    var cpValDemanMax = data.content.values[i].cpValorparcelademandamaxima || 0;
                    if(cpValDemanMax != 0) cpValDemanMax = cpValDemanMax.replace(".", "").replace(",", ".");
                    arrDemanMaxim.push(cpValDemanMax);


                }
            } // fim do for
            
            var Valor2Parc = arrValor2Parc.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
            var ValorBonus = arrValorBonus.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
            var ValorDemMin = arrDemanMinim.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
            var ValorDemMax = arrDemanMaxim.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
            
            Valor2Parc  = Valor2Parc.toFixed(2);
            ValorBonus  = ValorBonus.toFixed(2);
            ValorDemMin = ValorDemMin.toFixed(2);
            ValorDemMax = ValorDemMax.toFixed(2);

            columns2Parc += '</table>';

            columns2Parc = columns2Parc.replace('undefined', '').replace('null', '');

            $("#Reports_table > .row").append(columns2Parc);

            var title = [
                { title: 'Data da Venda'},
                { title: 'Data de Agregação / Quitação'},
                { title: 'Empreendimento'},
                { title: 'Bloco'},
                { title: 'Unidade'},
                { title: 'Cliente'},
                { title: 'Imobiliária'},
                { title: 'Corretor'},
                { title: 'Tipo Venda'},
                { title: 'Base Calculo'},
                { title: '2° Parcela'},
                { title: 'Demanda Mínima'},
                { title: 'Demanda Máxima'},
                { title: 'Bônus'},
            ];
        
            $("#table2Parc_"+x).DataTable({
                data: rowsColumnsParc2,
                columns: title,
                paging: false,
                select: true,
                lengthMenu: [10, 25, 50, 100],
                language: {
                    search: "",
                    emptyTable: "Não há solicitações com estas informações.",
                    info: "Exibir _PAGE_ de _PAGES_"
                }
            });
            
            $("#table2Parc_"+x).dataTable().fnDestroy();

            $("#table2Parc_"+x+" tbody tr td:nth-child(11), #table2Parc_"+x+" tbody tr td:nth-child(12),#table2Parc_"+x+" tbody tr td:nth-child(13), #table2Parc_"+x+" tbody tr td:last-child").each(function(){
                if($(this).text()){
                    $(this).mask('#.##0,00', { reverse: true });
                    var txt = $(this).text();
                    $(this).text('R$ '+txt);
                }
            });

            $("#table2Parc_"+x+" tbody tr td:nth-child(10)").each(function(){
                var valLiq = $(this).text().trim();
                if(valLiq != "" && valLiq != undefined && valLiq != null && valLiq != 0.00 && valLiq != "0,00" && valLiq != 0 && valLiq != 'undefined' && valLiq != 'null'){
                    valLiq = valLiq.split(".");
                    if(valLiq[1].length == 4){
                        valLiq = valLiq[0] +"."+ valLiq[1].substr(0, 2);
                        $(this).text(valLiq);
                    }
                }
                $(this).mask('#.##0,00', { reverse: true });
                var txt = $(this).text();
                $(this).text('R$ '+txt);
            });

            var tr = "<tr class='total'><td colspan='10'>Total</td><td>"+Valor2Parc+"</td> <td>"+ValorDemMin+"</td> <td>"+ValorDemMax+"</td> <td>"+ValorBonus+"</td> </tr>";
            $(tr).insertAfter("#table2Parc_"+x+" tbody tr:last-child");

            var h1 = "<div id='tbl2Name_"+x+"'><h1>2ª Parcela para as unidades:</h1></div>";
            $(h1).insertBefore("#table2Parc_"+x);

            $("#table2Parc_"+x+" tbody tr.total td:nth-child(2), #table2Parc_"+x+" tbody tr.total td:nth-child(3),#table2Parc_"+x+" tbody tr.total td:nth-child(4), #table2Parc_"+x+" tbody tr.total td:last-child").each(function(){
                if($(this).text()){
                    $(this).mask('#.##0,00', { reverse: true });
                    var txt = $(this).text();
                    $(this).text('R$ '+txt);
                }
            });

        }
    });
}
function getConsolidatedParcU(val1, val2, val3, val4, imobiliaria, x){

    var columnsParcU;
    var dados;
    var rowsColumnsParcU = [];

    var arrValorParcU = [];
    var arrValorBonus = [];
    var arrDemanMinim = [];
    var arrDemanMaxim = [];

    var arr = [];

    if (val3 && !val4) {
        dados = {
            "name": "dsCalculaComissao", //dataset's id 
            "constraints": [{ //constraints to filter the search, all fields specified inside are required 
                    "_field": "dtVenda", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpEmpreendimentoCod", //name of the field used in the constraint 
                    "_initialValue": val3, //value to be filtered 
                    "_finalValue": val3, //final value to be filtered 
                    "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                }
            ]
        }
    } else if (val3 && val4) {
        dados = {
            "name": "dsCalculaComissao", //dataset's id 
            "constraints": [{ //constraints to filter the search, all fields specified inside are required 
                    "_field": "dtVenda", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpEmpreendimentoCod", //name of the field used in the constraint 
                    "_initialValue": val3, //value to be filtered 
                    "_finalValue": val3, //final value to be filtered 
                    "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpNomeimobiliaria", //name of the field used in the constraint 
                    "_initialValue": val4, //value to be filtered 
                    "_finalValue": val4, //final value to be filtered 
                    "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                }
            ]
        }
    } else {
        dados = {
            "name": "dsCalculaComissao", //dataset's id 
            "constraints": [{ //constraints to filter the search, all fields specified inside are required 
                "_field": "dtVenda", //name of the field used in the constraint 
                "_initialValue": val1, //value to be filtered 
                "_finalValue": val2, //final value to be filtered 
                "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                "_likeSearch": false
            }]
        }
    }

    $.ajax({
        method: "POST",
        url: "http://fluigtst.brz.eng.br:8081/api/public/ecm/dataset/datasets",
        data: JSON.stringify(dados),
        contentType: "application/json",
        async: false,
        error: function(x, e) {
            console.log("Erro Ajax Monta select");
            console.log(x);
            console.log(e);
        },
        success: function(data) {

            columnsParcU += '<table id="tableParcU_'+x+'" class="table-consolided">';
            var date;
            var date2;
            var base;
            var empreendimento;
            var valVenda;
            

            for (var i = 0; i < data.content.values.length; i++) {

                empreendimento = data.content.values[i].cpEmpreendimento;
                valComissao    = data.content.values[i].cpValor1parcelacomissao;
                ConfParUnic    = data.content.values[i].cpConfirmParcelUnic;

                if(imobiliaria == data.content.values[i].cpNomeimobiliaria && empreendimento && empreendimento != "undefined" && valComissao && valComissao != "0,00" && ConfParUnic == "true"){

                    (!data.content.values[i].cpValorReferenciaComissao && data.content.values[i].cpValorReferenciaComissao != "0,00" ) ? base = data.content.values[i].cpValorReferenciaComissao : base = data.content.values[i].cpValorliquidovenda;

                    date = data.content.values[i].dtVenda;
                    date = date.split("-").reverse();
                    date = date[0]+"/"+date[1]+"/"+date[2];

                    date2 = data.content.values[i].dtAgregacao;
                    date2 = date2.split("-").reverse();
                    date2 = date2[0]+"/"+date2[1]+"/"+date2[2];

                    rowsColumnsParcU.push([
                        date,
                        date2,
                        data.content.values[i].cpEmpreendimento,
                        data.content.values[i].cpBloco,
                        data.content.values[i].cpUnidade,
                        data.content.values[i].cpNomecliente,
                        data.content.values[i].cpNomeimobiliaria,
                        data.content.values[i].cpNomecorretor,
                        data.content.values[i].cpTipovenda,
                        base,
                        data.content.values[i].cpValor1parcelacomissao,
                        data.content.values[i].cpValorparcelademandaminima,
                        data.content.values[i].cpValorparcelademandamaxima,
                        data.content.values[i].cpValorparcelabonificacao
                    ]);


                    var cpValor1ParcelaComissao = data.content.values[i].cpValor1parcelacomissao || 0;
                    if(cpValor1ParcelaComissao != 0) cpValor1ParcelaComissao = cpValor1ParcelaComissao.replace(".", "").replace(",", ".");
                    arrValorParcU.push(cpValor1ParcelaComissao);

                    var cpValorBonus = data.content.values[i].cpValorparcelabonificacao || 0;
                    if(cpValorBonus != 0) cpValorBonus = cpValorBonus.replace(".", "").replace(",", ".");
                    arrValorBonus.push(cpValorBonus);

                    var cpValDemanMin = data.content.values[i].cpValorparcelademandaminima || 0;
                    if(cpValDemanMin != 0) cpValDemanMin = cpValDemanMin.replace(".", "").replace(",", ".");
                    arrDemanMinim.push(cpValDemanMin);

                    var cpValDemanMax = data.content.values[i].cpValorparcelademandamaxima || 0;
                    if(cpValDemanMax != 0) cpValDemanMax = cpValDemanMax.replace(".", "").replace(",", ".");
                    arrDemanMaxim.push(cpValDemanMax);


                }
            } // fim do for

            var ValorParcU  = arrValorParcU.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
            var ValorBonus  = arrValorBonus.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
            var ValorDemMin = arrDemanMinim.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
            var ValorDemMax = arrDemanMaxim.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);

            ValorParcU = ValorParcU.toFixed(2);
            ValorBonus = ValorBonus.toFixed(2);
            ValorDemMin = ValorDemMin.toFixed(2);
            ValorDemMax = ValorDemMax.toFixed(2);

            columnsParcU += '</table>';

            columnsParcU = columnsParcU.replace('undefined', '').replace('null', '');

            $("#Reports_table > .row").append(columnsParcU);

            var title = [
                { title: 'Data da Venda'},
                { title: 'Data quitação'},
                { title: 'Empreendimento'},
                { title: 'Bloco'},
                { title: 'Unidade'},
                { title: 'Cliente'},
                { title: 'Imobiliária'},
                { title: 'Corretor'},
                { title: 'Tipo Venda'},
                { title: 'Base Calculo'},
                { title: 'Parcela Unica'},
                { title: 'Demanda Mínima'},
                { title: 'Demanda Máxima'},
                { title: 'Bônus'}
            ];

            $("#tableParcU_"+x).DataTable({
                data: rowsColumnsParcU,
                columns: title,
                paging: false,
                select: true,
                lengthMenu: [10, 25, 50, 100],
                language: {
                    search: "",
                    emptyTable: "Não há solicitações com estas informações.",
                    info: "Exibir _PAGE_ de _PAGES_"
                }
            });
            
            $("#tableParcU_"+x).dataTable().fnDestroy();

            $("#tableParcU_"+x+" tbody tr td:nth-child(11), #tableParcU_"+x+" tbody tr td:nth-child(12),#tableParcU_"+x+" tbody tr td:nth-child(13), #tableParcU_"+x+" tbody tr td:last-child").each(function(){
                if($(this).text()){
                    $(this).mask('#.##0,00', { reverse: true });
                    var txt = $(this).text();
                    $(this).text('R$ '+txt);
                }
            });
            $("#tableParcU_"+x+" tbody tr td:nth-child(10)").each(function(){
                var valLiq = $(this).text().trim();
                    if(valLiq != "" && valLiq != undefined && valLiq != null && valLiq != 0.00 && valLiq != "0,00" && valLiq != 0 && valLiq != 'undefined' && valLiq != 'null'){
                        valLiq = valLiq.split(".");
                        if(valLiq[1].length == 4){
                            valLiq = valLiq[0] +"."+ valLiq[1].substr(0, 2);
                            $(this).text(valLiq);
                        }
                    }
                $(this).mask('#.##0,00', { reverse: true });
                var txt = $(this).text();
                $(this).text('R$ '+txt);
            });

            var tr = "<tr class='total'><td colspan='10'>Total</td><td>"+ValorParcU+"</td> <td>"+ValorDemMin+"</td> <td>"+ValorDemMax+"</td> <td>"+ValorBonus+"</td> </tr>";
            $(tr).insertAfter("#tableParcU_"+x+" tbody tr:last-child");

            var h1 = "<div id='tbl3Name_"+x+"'><h1>Parcela ÚNICA para as unidades:</h1></div>";
            $(h1).insertBefore("#tableParcU_"+x);

            $("#tableParcU_"+x+" tbody tr.total td:nth-child(2), #tableParcU_"+x+" tbody tr.total td:nth-child(3),#tableParcU_"+x+" tbody tr.total td:nth-child(4), #tableParcU_"+x+" tbody tr.total td:last-child").each(function(){
                if($(this).text()){
                    $(this).mask('#.##0,00', { reverse: true });
                    var txt = $(this).text();
                    $(this).text('R$ '+txt);
                }
            });

        }
    });
}
function getConsolidatedDistr(val1, val2, val3, val4, imobiliaria, x){

    var columnsDistrato;
    var dados;
    var rowsColumnsDistrato = [];
    var arrValorDist = [];
    var arr = [];

    if (val3 && !val4) {
        dados = {
            "name": "dsCalculaComissao", //dataset's id 
            "constraints": [{ //constraints to filter the search, all fields specified inside are required 
                    "_field": "dtVenda", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpEmpreendimentoCod", //name of the field used in the constraint 
                    "_initialValue": val3, //value to be filtered 
                    "_finalValue": val3, //final value to be filtered 
                    "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                }
            ]
        }
    } else if (val3 && val4) {
        dados = {
            "name": "dsCalculaComissao", //dataset's id 
            "constraints": [{ //constraints to filter the search, all fields specified inside are required 
                    "_field": "dtVenda", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpEmpreendimentoCod", //name of the field used in the constraint 
                    "_initialValue": val3, //value to be filtered 
                    "_finalValue": val3, //final value to be filtered 
                    "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpNomeimobiliaria", //name of the field used in the constraint 
                    "_initialValue": val4, //value to be filtered 
                    "_finalValue": val4, //final value to be filtered 
                    "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                }
            ]
        }
    } else {
        dados = {
            "name": "dsCalculaComissao", //dataset's id 
            "constraints": [{ //constraints to filter the search, all fields specified inside are required 
                "_field": "dtVenda", //name of the field used in the constraint 
                "_initialValue": val1, //value to be filtered 
                "_finalValue": val2, //final value to be filtered 
                "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                "_likeSearch": false
            }]
        }
    }

    $.ajax({
        method: "POST",
        url: "http://fluigtst.brz.eng.br:8081/api/public/ecm/dataset/datasets",
        data: JSON.stringify(dados),
        contentType: "application/json",
        async: false,
        error: function(x, e) {
            console.log("Erro Ajax Monta select");
            console.log(x);
            console.log(e);
        },
        success: function(data) {

            columnsDistrato += '<table id="tableDist_'+x+'" class="table-consolided">';
            var date;

            var base;
            var nf;

            var nf1;
            var nf2;
            var nf3;
            var nf4;
            var nf5;

            var empreendimento;
            var valVenda;

            for (var i = 0; i < data.content.values.length; i++) {

                empreendimento = data.content.values[i].cpEmpreendimento;
                valComissao    = data.content.values[i].cpValor1parcelacomissao;

                if(imobiliaria == data.content.values[i].cpNomeimobiliaria && empreendimento && empreendimento != "undefined" && valComissao && valComissao != "0,00"){

                    (!data.content.values[i].cpValorReferenciaComissao && data.content.values[i].cpValorReferenciaComissao != "0,00" ) ? base = data.content.values[i].cpValorReferenciaComissao : base = data.content.values[i].cpValorliquidovenda;

                    date = data.content.values[i].dtVenda;
                    date = date.split("-").reverse();
                    date = date[0]+"/"+date[1]+"/"+date[2];

                    nf1 = data.content.values[i].cpNF1ParcelaComissao || ''; 
                    nf2 = data.content.values[i].cpNF2ParcelaComissao || ''; 
                    nf3 = data.content.values[i].cpNFParcelaBonificacao || ''; 
                    nf4 = data.content.values[i].cpNFParcelaDemandaMinima || ''; 
                    nf5 = data.content.values[i].cpNFParceladeMandaMaxima || ''; 

                    nf = nf1+" - "+nf2+" - "+nf3+" - "+nf4+" - "+nf5;

                    if(nf == ' -  -  -  - ') nf = "";
                    
                    if(empreendimento != null && empreendimento != "" && empreendimento != 'undefined' && empreendimento != undefined) empreendimento = data.content.values[i].cpEmpreendimento;

                    rowsColumnsDistrato.push([
                        date,
                        data.content.values[i].cpEmpreendimento,
                        data.content.values[i].cpBloco,
                        data.content.values[i].cpUnidade,
                        data.content.values[i].cpNomecliente,
                        data.content.values[i].cpNomeimobiliaria,
                        data.content.values[i].cpNomecorretor,
                        data.content.values[i].cpTipovenda,
                        nf,
                        data.content.values[i].cpValordeDistrato,
                    ]);

                    var cpValorDistrato = data.content.values[i].cpValordeDistrato || 0;
                    if(cpValorDistrato != 0) cpValorDistrato = cpValorDistrato.replace(".", "").replace(",", ".");
                    arrValorDist.push(cpValorDistrato);
                }
            } // fim do for
            
            var ValorDist = arrValorDist.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
                ValorDist = ValorDist.toFixed(2);

            columnsDistrato += '</table>';

            var Observacao  = '<div id="Reports_Obs_'+x+'" class="col-xs-12 col-sm-12 col-md-12 col-lg-12">';
                Observacao += ' <div class="row">';
                Observacao += '     <div id="ReportsDesp_'+x+'" class="col-xs-12 col-sm-6 col-md-6 col-lg-6">';
                Observacao += '         <label>Despesas</label>';
                Observacao += '         <input name="cpDesp_'+x+'" id="cpDesp'+x+'" class="form-control money">';
                Observacao += '     </div>';
                Observacao += '     <div class="clearfix"></div>';
                Observacao += '     <div id="ReportsObs_'+x+'" class="col-xs-12 col-sm-8 col-md-8 col-lg-8">';
                Observacao += '         <label>Observação</label>';
                Observacao += '         <textarea name="cpObs_'+x+'" id="cpObs_'+x+'" cols="30" rows="10" class="form-control"></textarea>';
                Observacao += '     </div>';
                Observacao += '     <div class="clearfix"></div>';
                Observacao += ' </div>';
                Observacao += '</div>';
                

            columnsDistrato = columnsDistrato.replace('undefined', '').replace('null', '');
            $("#Reports_table > .row").append(columnsDistrato + Observacao);
            

            var title = [
                { title: 'Data da Venda'},
                { title: 'Empreendimento'},
                { title: 'Bloco'},
                { title: 'Unidade'},
                { title: 'Cliente'},
                { title: 'Imobiliária'},
                { title: 'Corretor'},
                { title: 'Tipo Venda'},
                { title: 'NF Faturada'},
                { title: 'Valor Pago'}
            ];
        
            $("#tableDist_"+x).DataTable({
                data: rowsColumnsDistrato,
                columns: title,
                paging: false,
                select: true,
                lengthMenu: [10, 25, 50, 100],
                language: {
                    search: "",
                    emptyTable: "Não há solicitações com estas informações.",
                    info: "Exibir _PAGE_ de _PAGES_"
                }
            });
            
            $("#tableDist_"+x).dataTable().fnDestroy();

            $(".money").mask('#.##0,00', { reverse: true });

            var tr = "<tr class='total'><td colspan='9'>Total</td><td>"+ValorDist+"</td></tr>"
            $(tr).insertAfter("#tableDist_"+x+" tbody tr:last-child");

            var h1 = "<div id='tbl4Name_"+x+"'><h1>Distrato das unidades:</h1></div>";
            $(h1).insertBefore("#tableDist_"+x);

            var div  = '<div class="panel panel-default m-b-10">';
                div += '    <div class="panel-heading">';
                div += '        <h4 class="panel-title">';
                div += '            <a class="collapse-icon down" data-toggle="collapse" data-parent="#div" href="#collapse_'+x+'">'+imobiliaria+' - '+empreendimento+'</a>';
                div += '        </h4>';
                div += '    </div>';
                div += '    <div id="collapse_'+x+'" class="panel-collapse collapse">';
                div += '        <div class="panel-body">';
                div += '            <div id="BlocoConsolidado_'+x+'"></div>';
                div += '        </div>';
                div += '    </div>';
                div += '</div>';

            $(div).insertAfter("#Reports_Obs_"+x);

            for(y=0; y<=x; y++){
                $('#chk_'+x+', #msg_'+x+',#tableBruto_'+x+', #table1Parc_'+x+', #table2Parc_'+x+', #tableParcU_'+x+', #tableDist_'+x+', #Reports_Obs_'+x+', #tbl1Name_'+x+', #tbl2Name_'+x+', #tbl3Name_'+x+', #tbl4Name_'+x).appendTo('#BlocoConsolidado_'+x);
            }

            $("#tableDist_"+x+" tbody tr td:last-child").each(function(){
                if($(this).text()){
                    $(this).mask('#.##0,00', { reverse: true });
                    var txt = $(this).text();
                    $(this).text('R$ '+txt);
                }
            });

        }
    });
}
function getImobConsolidated(val1, val2){
    var arr = [];
    dados = {
        "name": "dsCalculaComissao", //dataset's id 
        "constraints": [{ //constraints to filter the search, all fields specified inside are required 
            "_field": "dtVenda", //name of the field used in the constraint 
            "_initialValue": val1, //value to be filtered 
            "_finalValue": val2, //final value to be filtered 
            "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
            "_likeSearch": false
        }]
    }

    $.ajax({
        method: "POST",
        url: "http://fluigtst.brz.eng.br:8081/api/public/ecm/dataset/datasets",
        data: JSON.stringify(dados),
        contentType: "application/json",
        async: false,
        error: function(x, e) {
            console.log("Erro Ajax Monta select");
            console.log(x);
            console.log(e);
        },
        success: function(data) {
            for (var i = 0; i < data.content.values.length; i++) {
                if(arr.indexOf(data.content.values[i].cpNomeimobiliaria) === -1 && data.content.values[i].cpNomeimobiliaria){
                    arr.push(data.content.values[i].cpNomeimobiliaria);
                }
                
            } // fim do for
        }
    });

    return arr;
}

function sendMail(html, inicio, fim, emp){

    Email.send(
        "comissao@brz.eng.br",
        "jonathan.canavieira@gmail.com",
        "Consolidados da semana "+inicio+" à "+fim+" do empreendimento - "+emp,
        html,
        {
            token: "753d123f-cb95-462b-afb5-d95019941e05",
            callback: function done(message){ 
                FLUIGC.message.alert({
                    message: 'Email enviado com sucesso.',
                    title: 'Obrigado',
                    label: 'OK'
                }); 
            }
        }
    );
}


function myLoading(){
    var myLoading = FLUIGC.loading('body', {
          textMessage:  '<h1>Please wait...</h1>', 
          title: null,
          css: {
              padding:        0,
              margin:         0,
              width:          '30%',
              top:            '40%',
              left:           '35%',
              textAlign:      'center',
              color:          '#000',
              border:         '3px solid #aaa',
              backgroundColor:'#fff',
              cursor:         'wait'
          },
          overlayCSS:  { 
              backgroundColor: '#000', 
              opacity:         0.6, 
              cursor:          'wait'
          }, 
          cursorReset: 'default',
          baseZ: 1000,
          centerX: true,
          centerY: true,
          bindEvents: true,
          fadeIn:  200,
          fadeOut:  400,
          timeout: 50000,
          showOverlay: true, 
          onBlock: null,
          onUnblock: null,
          ignoreIfBlocked: false
      });
    if(status == true){
        return myLoading.show()
    }else{
        return myLoading.hide()
    }
}