function getConsolidatedBruto(val1, val2, val3, val4, imobiliaria, x){

    var columnsBruto;
    var columns1Parc;
    var columns2Parc;
    var columnsParcU;
    var columnsDistr;

    var rowsColumnsBruto = [];
    var rowsColumnsParc1 = [];
    var rowsColumnsParc2 = [];
    var rowsColumnsParcUnic = [];
    var rowsColumnsDistrato = [];

    var dados;

    var arrValorTotal = [];
    var arrValorDistr = [];

    var arr = [];


    
    //1PARCELA
    var arrValor1Parc = [];
    var arrValorBonus = [];
    //1PARCELA

    //2PARCELA
    var arrValor2Parc = [];
    var arrDemanMinim = [];
    var arrDemanMaxim = [];
    //2PARCELA

    //PARCELA UNICA
    var arrValorParcU = [];
    //PARCELA UNICA

    //DISTRATO
    var arrValorDist = [];
    //DISTRATO


    // AJAX PARAMS
    if (val3 && !val4) {
        dados = {
            "name": "dsCalculaComissao", //dataset's id 
            "constraints": [
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDate1ParcelaComissao", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDate2ParcelaComissao", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDateBonus", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDateDemandaMin", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDateDemandaMax", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDateDistrato", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
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
            "constraints": [
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDate1ParcelaComissao", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDate2ParcelaComissao", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDateBonus", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDateDemandaMin", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDateDemandaMax", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDateDistrato", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
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
    }else if (!val3 && val4) {
        dados = {
            "name": "dsCalculaComissao", //dataset's id 
            "constraints": [
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDate1ParcelaComissao", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDate2ParcelaComissao", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDateBonus", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDateDemandaMin", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDateDemandaMax", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDateDistrato", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
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
            "constraints": [
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDate1ParcelaComissao", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDate2ParcelaComissao", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDateBonus", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDateDemandaMin", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDateDemandaMax", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDateDistrato", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
            ]
        }
    }
    // AJAX PARAMS

    $.ajax({
        method: "POST",
        url: "http://fluigtst.brz.eng.br:8081/api/public/ecm/dataset/datasets",
        data: JSON.stringify(dados),
        contentType: "application/json",
        async: false,
        error: function(x, e) {
            console.log("Erro Ajax Monta select", x, e);
        },
        success: function(data) {

            columnsBruto += '<table id="tableBruto_'+x+'" class="table-consolided">';
            columns1Parc += '<table id="table1Parc_'+x+'" class="table-consolided">';
            columns2Parc += '<table id="table2Parc_'+x+'" class="table-consolided">';
            columnsParcU += '<table id="tableParcU_'+x+'" class="table-consolided">';
            columnsDistr += '<table id="tableDist_'+x+'" class="table-consolided">';

            var empreendimento;
            var empreendimento2;
            var valVenda;
            var base;

            var documentid = [];

            for (var i = 0; i < data.content.values.length; i++) {

                empreendimento = data.content.values[i].cpEmpreendimento;
                valComissao    = data.content.values[i].cpValortotaldecomissao;

                if(documentid.indexOf(data.content.values[i].documentid) === -1 && imobiliaria == data.content.values[i].cpNomeimobiliaria && empreendimento && empreendimento != "undefined" && valComissao && valComissao != "0,00"){
                   
                    (!data.content.values[i].cpValorReferenciaComissao && data.content.values[i].cpValorReferenciaComissao != "0,00" ) ? base = data.content.values[i].cpValorReferenciaComissao : base = data.content.values[i].cpValorliquidovenda;

                    // INICIO TABELA BRUTO
                    var cpValorTotalDeComissao  = data.content.values[i].cpValortotaldecomissao  || 0;
                    var cpValor1ParcelaComissao = data.content.values[i].cpValor1parcelacomissao || 0;
                    var cpValor2ParcelaComissao = data.content.values[i].cpValor2parcelacomissao || 0;
                    var cpValordeDistrato       = data.content.values[i].cpValordeDistrato       || 0;
                    
                    var cpValorParcelaUnica;
                    (data.content.values[i].cpConfirmParcelUnic == "true") ? cpValorParcelaUnica = data.content.values[i].cpValor1parcelacomissao : cpValorParcelaUnica = 0;

                    if(cpValorTotalDeComissao  != 0) cpValorTotalDeComissao  = cpValorTotalDeComissao.replace(".", "").replace(",",".");
                    if(cpValor1ParcelaComissao != 0) cpValor1ParcelaComissao = cpValor1ParcelaComissao.replace(".", "").replace(",",".");
                    if(cpValor2ParcelaComissao != 0) cpValor2ParcelaComissao = cpValor2ParcelaComissao.replace(".", "").replace(",",".");
                    if(cpValorParcelaUnica     != 0) cpValorParcelaUnica     = cpValorParcelaUnica.replace(".", "").replace(",",".");
                    if(cpValordeDistrato       != 0) cpValordeDistrato       = cpValordeDistrato.replace(".", "").replace(",",".");

                    empreendimento = data.content.values[i].cpEmpreendimento;
                    empreendimento2 = data.content.values[i].cpEmpreendimento;

                    arrValorTotal.push(cpValorTotalDeComissao);
                    arrValorDistr.push(cpValordeDistrato);
                    // FIM TABELA BRUTO

                    // INICIO TABELA 1 PARCELA
                    if(data.content.values[i].cpValor1parcelacomissao && data.content.values[i].cpValor1parcelacomissao != "0,00" && data.content.values[i].cpValor1parcelacomissao != 0){
                        

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
                    // FIM TABELA 1 PARCELA

                    // INICIO TABELA 2 PARCELA
                    if(data.content.values[i].cpValor2parcelacomissao && data.content.values[i].cpValor2parcelacomissao != "0,00" && data.content.values[i].cpValor2parcelacomissao != 0){
                        date2 = data.content.values[i].dtAgregacao;
                        if(date2){
                            date2 = date2.split("-").reverse();
                            date2 = date2[0]+"/"+date2[1]+"/"+date2[2];        
                        }

                        rowsColumnsParc2.push([
                            date,
                            date2 || "",
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
                    // FIM TABELA 2 PARCELA

                    // INICIO TABELA PARCELA UNICA
                    if(data.content.values[i].cpConfirmParcelUnic == "true"){
                        rowsColumnsParcU.push([
                            date,
                            date2 || "",
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
                    // FIM TABELA PARCELA UNICA

                    // INICIO TABELA DISTRATO
                    if(data.content.values[i].cpValordeDistrato && data.content.values[i].cpValordeDistrato != "0,00" && data.content.values[i].cpValordeDistrato != 0){
                        nf1 = data.content.values[i].cpNF1ParcelaComissao || ''; 
                        nf2 = data.content.values[i].cpNF2ParcelaComissao || ''; 
                        nf3 = data.content.values[i].cpNFParcelaBonificacao || ''; 
                        nf4 = data.content.values[i].cpNFParcelaDemandaMinima || ''; 
                        nf5 = data.content.values[i].cpNFParceladeMandaMaxima || ''; 

                        nf = nf1+" - "+nf2+" - "+nf3+" - "+nf4+" - "+nf5;

                        if(nf == ' -  -  -  - ') nf = "";

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
                    // FIM TABELA DISTRATO

                    documentid.push(data.content.values[i].documentid);
                }
            } // fim do for
            
            var ValorTotal        = arrValorTotal.reduce((a,b) => parseFloat(a) + parseFloat(b), 0);
            var ValorDistr        = arrValorDistr.reduce((a,b) => parseFloat(a) + parseFloat(b), 0);
            var ValorTotalLiquido = parseFloat(ValorTotal) - parseFloat(ValorDistr);

            ValorTotal        = ValorTotal.toFixed(2);
            ValorDistr        = ValorDistr.toFixed(2);
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

            // INICIO TABELA BRUTO
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
                    txt += '<h1>Prezados,<br>Liberado emissão de nota fiscal referente ao período <strong class="dtInicio">'+dataInicio+'</strong> a <strong class="dtFim">'+dataFim+'</strong> do empreendimento <strong class="emp">'+empreendimento2+'</strong>:</h1>';
                    txt += '</div>';

                $("#Reports_table > .row").append( txt + columnsBruto);

                var titleBruto = [
                    { title: 'Valor BRUTO a pagar NF BRZ '+dataFim},
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

                $("#tableBruto_"+x+" tbody tr td").each(function(i){
                    if($(this).text()){
                        $(this).mask('#.##0,00', { reverse: true });
                    }
                });
            // FIM TABELA BRUTO

            // INICIO TABELA 1 PARCELA
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
                        if(valLiq.indexOf(",") === -1 && valLiq != "" && valLiq != undefined && valLiq != null && valLiq != 0.00 && valLiq != "0,00" && valLiq != 0 && valLiq != 'undefined' && valLiq != 'null'){
                            valLiq = valLiq.split(".");
                            if(valLiq[1].length == 4){
                                valLiq = valLiq[0] +"."+ valLiq[1].substr(0, 2);
                                $(this).text(valLiq);
                            }
                        }
                    $(this).mask('#.##0,00', { reverse: true });
                });

                var tr = "<tr class='total'><td colspan='9'>Total</td><td>"+Valor1Parc+"</td> <td>"+ValorBonus+"</td></tr>";
                $(tr).insertAfter("#table1Parc_"+x+" tbody tr:last-child");

                var h1 = "<div id='tbl1Name_"+x+"' class='col-xs-12 col-sm-12 col-md-12 col-lg-12'><h1>1ª Parcela para as unidades:</h1></div>";
                $(h1).insertBefore("#table1Parc_"+x);

                $("#table1Parc_"+x+" tbody tr td:nth-child(10), #table1Parc_"+x+" tbody tr td:last-child, #table1Parc_"+x+" tbody tr.total td:nth-child(2)").each(function(){
                    if($(this).text()){
                        $(this).mask('#.##0,00', { reverse: true });
                    }
                });
            // FIM TABELA 1 PARCELA

            // INICIO TABELA 2 PARCELA
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

                $("#table2Parc_"+x+" tbody tr td:nth-child(11), #table2Parc_"+x+" tbody tr td:nth-child(12), #table2Parc_"+x+" tbody tr td:nth-child(13), #table2Parc_"+x+" tbody tr td:last-child").each(function(){
                    if($(this).text()){
                        $(this).mask('#.##0,00', { reverse: true });
                    }
                });

                $("#table2Parc_"+x+" tbody tr td:nth-child(10)").each(function(){
                    var valLiq = $(this).text().trim();
                    if(valLiq.indexOf(",") === -1 && valLiq != "" && valLiq != undefined && valLiq != null && valLiq != 0.00 && valLiq != "0,00" && valLiq != 0 && valLiq != 'undefined' && valLiq != 'null'){
                        valLiq = valLiq.split(".");
                        if(valLiq[1].length == 4){
                            valLiq = valLiq[0] +"."+ valLiq[1].substr(0, 2);
                            $(this).text(valLiq);
                        }
                    }
                    $(this).mask('#.##0,00', { reverse: true });
                });

                var tr = "<tr class='total'><td colspan='10'>Total</td><td>"+Valor2Parc+"</td> <td>"+ValorDemMin+"</td> <td>"+ValorDemMax+"</td> <td>"+ValorBonus+"</td> </tr>";
                $(tr).insertAfter("#table2Parc_"+x+" tbody tr:last-child");

                var h1 = "<div id='tbl2Name_"+x+"'><h1>2ª Parcela para as unidades:</h1></div>";
                $(h1).insertBefore("#table2Parc_"+x);

                $("#table2Parc_"+x+" tbody tr.total td:nth-child(2), #table2Parc_"+x+" tbody tr.total td:nth-child(3),#table2Parc_"+x+" tbody tr.total td:nth-child(4), #table2Parc_"+x+" tbody tr.total td:last-child").each(function(){
                    if($(this).text()){
                        $(this).mask('#.##0,00', { reverse: true });
                    }
                });
            // FIM TABELA 2 PARCELA

            // INICIO TABELA PARCELA UNICA
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
                    }
                });
                $("#tableParcU_"+x+" tbody tr td:nth-child(10)").each(function(){
                    var valLiq = $(this).text().trim();
                        if(valLiq.indexOf(",") === -1 && valLiq != "" && valLiq != undefined && valLiq != null && valLiq != 0.00 && valLiq != "0,00" && valLiq != 0 && valLiq != 'undefined' && valLiq != 'null'){
                            valLiq = valLiq.split(".");
                            if(valLiq[1].length == 4){
                                valLiq = valLiq[0] +"."+ valLiq[1].substr(0, 2);
                                $(this).text(valLiq);
                            }
                        }
                    $(this).mask('#.##0,00', { reverse: true });
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
            // FIM TABELA PARCELA UNICA

            // INICIO TABELA DISTRATO
                var ValorDist = arrValorDist.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
                    ValorDist = ValorDist.toFixed(2);

                columnsDistr += '</table>';
                columnsDistr = columnsDistr.replace('undefined', '').replace('null', '');

                
                var Despesas    = '<div id="ReportsDesp_'+x+'" class="col-xs-12 col-sm-6 col-md-6 col-lg-6">';
                    Despesas   += ' <div class="row">';
                    Despesas   += ' <label>Despesas</label>';
                    Despesas   += ' <input name="cpDesp_'+x+'" id="cpDesp'+x+'" class="form-control money">';
                    Despesas   += '</div></div>';

                var Observacao  = '<div id="ReportsObs_'+x+'" class="col-xs-12 col-sm-8 col-md-8 col-lg-8 m-b-10">';
                    Observacao += ' <div class="row">';
                    Observacao += ' <label>Observação</label>';
                    Observacao += ' <textarea name="cpObs_'+x+'" id="cpObs_'+x+'" cols="30" rows="10" class="form-control"></textarea>';
                    Observacao += '</div></div>';
                    Observacao += '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12"></div>';
                
                $("#Reports_table > .row").append(columnsDistr + Despesas);
                
                $(Observacao).insertAfter("#tableBruto_"+x);

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
                    div += '            <a class="collapse-icon down" data-toggle="collapse" data-parent="#div" href="#collapse_'+x+'"><span class="imobiliaria-title">'+imobiliaria+'</span> - <span class="emp-title"></span></a>';
                    div += '        </h4>';
                    div += '    </div>';
                    div += '    <div id="collapse_'+x+'" class="panel-collapse collapse">';
                    div += '        <div class="panel-body">';
                    div += '            <div id="BlocoConsolidado_'+x+'"></div>';
                    div += '        </div>';
                    div += '    </div>';
                    div += '</div>';


                $(div).insertAfter("#ReportsDesp_"+x);

                for(y=0; y<=x; y++){
                    $('#chk_'+x+', #msg_'+x+',#tableBruto_'+x+', #table1Parc_'+x+', #table2Parc_'+x+', #tableParcU_'+x+', #tableDist_'+x+', #ReportsDesp_'+x+', #ReportsObs_'+x+', #tbl1Name_'+x+', #tbl2Name_'+x+', #tbl3Name_'+x+', #tbl4Name_'+x).appendTo('#BlocoConsolidado_'+x);
                }

                $("#tableDist_"+x+" tbody tr td:last-child").each(function(){
                    if($(this).text()){
                        $(this).mask('#.##0,00', { reverse: true });
                    }
                });
            // FIM TABELA DISTRATO

        }
    });
}




function getConsolidated1Parc(val1, val2, val3, val4, imobiliaria, x){

    

    if (val3 && !val4) {
        dados = {
            "name": "dsCalculaComissao", //dataset's id 
            "constraints": [{ //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDate1ParcelaComissao", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
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
                    "_field": "cpDate1ParcelaComissao", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
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
    } else if (!val3 && val4) {
        dados = {
            "name": "dsCalculaComissao", //dataset's id 
            "constraints": [{ //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDate1ParcelaComissao", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
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
                "_field": "cpDate1ParcelaComissao", //name of the field used in the constraint 
                "_initialValue": val1, //value to be filtered 
                "_finalValue": val2, //final value to be filtered 
                "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
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
            console.log("Erro Ajax Monta select", x, e);
        },
        success: function(data) {

            
            var date;
            var base;
            var empreendimento;
            var valVenda;
            var documentid = [];


            for (var i = 0; i < data.content.values.length; i++) {
                empreendimento = data.content.values[i].cpEmpreendimento;
                valComissao    = data.content.values[i].cpValor1parcelacomissao;

                console.log("imobiliaria", imobiliaria,"-",data.content.values[i].cpNomeimobiliaria);
                console.log("empreendimento", empreendimento);
                console.log("valComissao", valComissao);

                if(documentid.indexOf(data.content.values[i].documentid) === -1 && imobiliaria == data.content.values[i].cpNomeimobiliaria && empreendimento && empreendimento != "undefined" && valComissao && valComissao != "0,00"){

                    
                }
            } // fim do for
            
            
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
                    "_field": "cpDate2ParcelaComissao", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
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
                    "_field": "cpDate2ParcelaComissao", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
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
    } else if (!val3 && val4) {
        dados = {
            "name": "dsCalculaComissao", //dataset's id 
            "constraints": [{ //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDate2ParcelaComissao", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
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
                "_field": "cpDate2ParcelaComissao", //name of the field used in the constraint 
                "_initialValue": val1, //value to be filtered 
                "_finalValue": val2, //final value to be filtered 
                "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
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
            console.log("Erro Ajax Monta select", x, e);
        },
        success: function(data) {

            columns2Parc += '<table id="table2Parc_'+x+'" class="table-consolided">';
            var date;
            var date2;
            var base;
            var empreendimento;
            var valVenda;
            var documentid = [];


            for (var i = 0; i < data.content.values.length; i++) {
                empreendimento = data.content.values[i].cpEmpreendimento;
                valComissao    = data.content.values[i].cpValor2parcelacomissao;

                if(documentid.indexOf(data.content.values[i].documentid) === -1 && imobiliaria == data.content.values[i].cpNomeimobiliaria && empreendimento && empreendimento != "undefined" && valComissao && valComissao != "0,00"){

                    (!data.content.values[i].cpValorReferenciaComissao && data.content.values[i].cpValorReferenciaComissao != "0,00" ) ? base = data.content.values[i].cpValorReferenciaComissao : base = data.content.values[i].cpValorliquidovenda;

                    date = data.content.values[i].dtVenda;
                    date = date.split("-").reverse();
                    date = date[0]+"/"+date[1]+"/"+date[2];

                    date2 = data.content.values[i].dtAgregacao;
                    if(date2){
                        date2 = date2.split("-").reverse();
                        date2 = date2[0]+"/"+date2[1]+"/"+date2[2];        
                    }

                    rowsColumnsParc2.push([
                        date,
                        date2 || "",
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

                    documentid.push(data.content.values[i].documentid);


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

            $("#table2Parc_"+x+" tbody tr td:nth-child(11), #table2Parc_"+x+" tbody tr td:nth-child(12), #table2Parc_"+x+" tbody tr td:nth-child(13), #table2Parc_"+x+" tbody tr td:last-child").each(function(){
                if($(this).text()){
                    $(this).mask('#.##0,00', { reverse: true });
                }
            });

            $("#table2Parc_"+x+" tbody tr td:nth-child(10)").each(function(){
                var valLiq = $(this).text().trim();
                if(valLiq.indexOf(",") === -1 && valLiq != "" && valLiq != undefined && valLiq != null && valLiq != 0.00 && valLiq != "0,00" && valLiq != 0 && valLiq != 'undefined' && valLiq != 'null'){
                    valLiq = valLiq.split(".");
                    if(valLiq[1].length == 4){
                        valLiq = valLiq[0] +"."+ valLiq[1].substr(0, 2);
                        $(this).text(valLiq);
                    }
                }
                $(this).mask('#.##0,00', { reverse: true });
            });

            var tr = "<tr class='total'><td colspan='10'>Total</td><td>"+Valor2Parc+"</td> <td>"+ValorDemMin+"</td> <td>"+ValorDemMax+"</td> <td>"+ValorBonus+"</td> </tr>";
            $(tr).insertAfter("#table2Parc_"+x+" tbody tr:last-child");

            var h1 = "<div id='tbl2Name_"+x+"'><h1>2ª Parcela para as unidades:</h1></div>";
            $(h1).insertBefore("#table2Parc_"+x);

            $("#table2Parc_"+x+" tbody tr.total td:nth-child(2), #table2Parc_"+x+" tbody tr.total td:nth-child(3),#table2Parc_"+x+" tbody tr.total td:nth-child(4), #table2Parc_"+x+" tbody tr.total td:last-child").each(function(){
                if($(this).text()){
                    $(this).mask('#.##0,00', { reverse: true });
                }
            });

        }
    });
}
function getConsolidatedParcU(val1, val2, val3, val4, imobiliaria, x){

    

    if (val3 && !val4) {
        dados = {
            "name": "dsCalculaComissao", //dataset's id 
            "constraints": [{ //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDate1ParcelaComissao", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
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
                    "_field": "cpDate1ParcelaComissao", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
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
    } else if (!val3 && val4) {
        dados = {
            "name": "dsCalculaComissao", //dataset's id 
            "constraints": [{ //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDate1ParcelaComissao", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
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
                "_field": "cpDate1ParcelaComissao", //name of the field used in the constraint 
                "_initialValue": val1, //value to be filtered 
                "_finalValue": val2, //final value to be filtered 
                "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
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
            console.log("Erro Ajax Monta select", x, e);
        },
        success: function(data) {

            columnsParcU += '<table id="tableParcU_'+x+'" class="table-consolided">';
            var date;
            var date2;
            var base;
            var empreendimento;
            var valVenda;

            var documentid = [];
            

            for (var i = 0; i < data.content.values.length; i++) {

                empreendimento = data.content.values[i].cpEmpreendimento;
                valComissao    = data.content.values[i].cpValor1parcelacomissao;
                ConfParUnic    = data.content.values[i].cpConfirmParcelUnic;

                if(documentid.indexOf(data.content.values[i].documentid) === -1 && imobiliaria == data.content.values[i].cpNomeimobiliaria && empreendimento && empreendimento != "undefined" && valComissao && valComissao != "0,00" && ConfParUnic == "true"){

                    (!data.content.values[i].cpValorReferenciaComissao && data.content.values[i].cpValorReferenciaComissao != "0,00" ) ? base = data.content.values[i].cpValorReferenciaComissao : base = data.content.values[i].cpValorliquidovenda;

                    date = data.content.values[i].dtVenda;
                    date = date.split("-").reverse();
                    date = date[0]+"/"+date[1]+"/"+date[2];

                    date2 = data.content.values[i].dtAgregacao;
                    if(date2){
                        date2 = date2.split("-").reverse();
                        date2 = date2[0]+"/"+date2[1]+"/"+date2[2];    
                    }

                    rowsColumnsParcU.push([
                        date,
                        date2 || "",
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

                    documentid.push(data.content.values[i].documentid);

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
                }
            });
            $("#tableParcU_"+x+" tbody tr td:nth-child(10)").each(function(){
                var valLiq = $(this).text().trim();
                    if(valLiq.indexOf(",") === -1 && valLiq != "" && valLiq != undefined && valLiq != null && valLiq != 0.00 && valLiq != "0,00" && valLiq != 0 && valLiq != 'undefined' && valLiq != 'null'){
                        valLiq = valLiq.split(".");
                        if(valLiq[1].length == 4){
                            valLiq = valLiq[0] +"."+ valLiq[1].substr(0, 2);
                            $(this).text(valLiq);
                        }
                    }
                $(this).mask('#.##0,00', { reverse: true });
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
    
    var arr = [];

    if (val3 && !val4) {
        dados = {
            "name": "dsCalculaComissao", //dataset's id 
            "constraints": [{ //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDateDistrato", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
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
                    "_field": "cpDateDistrato", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
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
    } else if (!val3 && val4) {
        dados = {
            "name": "dsCalculaComissao", //dataset's id 
            "constraints": [{ //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDateDistrato", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
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
                "_field": "cpDateDistrato", //name of the field used in the constraint 
                "_initialValue": val1, //value to be filtered 
                "_finalValue": val2, //final value to be filtered 
                "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
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
            console.log("Erro Ajax Monta select", x, e);
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
            var empreendimento2;
            var valVenda;

            var documentid = [];


            for (var i = 0; i < data.content.values.length; i++) {

                empreendimento = data.content.values[i].cpEmpreendimento;
                valDist        = data.content.values[i].cpValordeDistrato;

                if(documentid.indexOf(data.content.values[i].documentid) === -1 && imobiliaria == data.content.values[i].cpNomeimobiliaria && empreendimento && empreendimento != "undefined" && valDist && valDist != "0,00"){

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

                    documentid.push(data.content.values[i].documentid);
                }
            } // fim do for
            
            var ValorDist = arrValorDist.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
                ValorDist = ValorDist.toFixed(2);

            columnsDistrato += '</table>';

            
            var Despesas    = '<div id="ReportsDesp_'+x+'" class="col-xs-12 col-sm-6 col-md-6 col-lg-6">';
                Despesas   += ' <div class="row">';
                Despesas   += ' <label>Despesas</label>';
                Despesas   += ' <input name="cpDesp_'+x+'" id="cpDesp'+x+'" class="form-control money">';
                Despesas   += '</div></div>';

            var Observacao  = '<div id="ReportsObs_'+x+'" class="col-xs-12 col-sm-8 col-md-8 col-lg-8 m-b-10">';
                Observacao += ' <div class="row">';
                Observacao += ' <label>Observação</label>';
                Observacao += ' <textarea name="cpObs_'+x+'" id="cpObs_'+x+'" cols="30" rows="10" class="form-control"></textarea>';
                Observacao += '</div></div>';
                Observacao += '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12"></div>';
                

            columnsDistrato = columnsDistrato.replace('undefined', '').replace('null', '');
            $("#Reports_table > .row").append(columnsDistrato + Despesas);
            
            $(Observacao).insertAfter("#tableBruto_"+x);

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
                div += '            <a class="collapse-icon down" data-toggle="collapse" data-parent="#div" href="#collapse_'+x+'"><span class="imobiliaria-title">'+imobiliaria+'</span> - <span class="emp-title"></span></a>';
                div += '        </h4>';
                div += '    </div>';
                div += '    <div id="collapse_'+x+'" class="panel-collapse collapse">';
                div += '        <div class="panel-body">';
                div += '            <div id="BlocoConsolidado_'+x+'"></div>';
                div += '        </div>';
                div += '    </div>';
                div += '</div>';


            $(div).insertAfter("#ReportsDesp_"+x);

            for(y=0; y<=x; y++){
                $('#chk_'+x+', #msg_'+x+',#tableBruto_'+x+', #table1Parc_'+x+', #table2Parc_'+x+', #tableParcU_'+x+', #tableDist_'+x+', #ReportsDesp_'+x+', #ReportsObs_'+x+', #tbl1Name_'+x+', #tbl2Name_'+x+', #tbl3Name_'+x+', #tbl4Name_'+x).appendTo('#BlocoConsolidado_'+x);
            }

            $("#tableDist_"+x+" tbody tr td:last-child").each(function(){
                if($(this).text()){
                    $(this).mask('#.##0,00', { reverse: true });
                }
            });

        }
    });
}