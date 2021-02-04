function setSelectedZoomItem(selectedItem) {
    switch(selectedItem.inputId){
        case "tipo_produto":
            $('#codTipo_produto').val(selectedItem["CODIGO"]);
            $('#descTipo_produto').val(selectedItem["DESCRICAO"]);
            break;
        case "formulacao_produto":
            $('#codFormula_produto').val(selectedItem["CODIGO"]);
            $('#descFormula_produto').val(selectedItem["DESCRICAO"]);
            break;
        case "classe_produto":
            $('#codClasse_produto').val(selectedItem["CODIGO"]);
            $('#descClasse_produto').val(selectedItem["DESCRICAO"]);
            break;
        case "uniMedida_Produto":
            $('#codUniMed_produto').val(selectedItem["CODIGO"]);
            $('#descUniMed_produto').val(selectedItem["DESCRICAO"]);
            break;
        case "segUniMedida_Produto":
            $('#codSegUniMed_produto').val(selectedItem["CODIGO"]);
            $('#descSegUniMed_produto').val(selectedItem["DESCRICAO"]);
            break;
        case "fabric_produto":
            $('#codFabric_produto').val(selectedItem["CODIGO"]);
            $('#descFabric_produto').val(selectedItem["DESCRICAO"]);
            break;
        case "registrante_produto":
            $('#codRegistrante_produto').val(selectedItem["CODIGO"]);
            $('#descRegistrante_produto').val(selectedItem["DESCRICAO"]);
            break;
        case "origem_produto":
            $('#codOrigem_produto').val(selectedItem["CODIGO"]);
            $('#descOrigem_produto').val(selectedItem["DESCRICAO"]); 
            break;
        case "grupoTrib_produto":
            $('#codGrupTrib_produto').val(selectedItem["CODIGO"]);
            $('#descGrupTrib_produto').val(selectedItem["DESCRICAO"]);
            break;
        case "exNcm_produto":
            $('#codExNcm_produto').val(selectedItem["CODIGO"]);
            $('#descExNcm_produto').val(selectedItem["DESCRICAO"]);
            break;
        case "armazem_produto":
            $('#codArmazem_produto').val(selectedItem["CODIGO"]);
            $('#descArmazem_produto').val(selectedItem["DESCRICAO"]);
            break;
        case "grupo_produto":
            $('#codGrupo_produto').val(selectedItem["CODIGO"]);
            $('#descGrupo_produto').val(selectedItem["DESCRICAO"]);
            break;
        case "princpAtivo_produto":
            $('#codPrincpAtivo_produto').val(selectedItem["CODIGO"]);
            $('#descPrincpAtivo_produto').val(selectedItem["DESCRICAO"]);
            break;
        case "preProd_produto":
            $('#codPreProd_produto').val(selectedItem["CODIGO"]);
            $('#descPreProd_produto').val(selectedItem["DESCRICAO"]);
            break;
        case "contaContb_produto":
            $('#codContaContb_produto').val(selectedItem["CODIGO"]);
            $('#descContaContb_produto').val(selectedItem["DESCRICAO"]); 
            break;
        case "itemContb_produto":
            $('#codItemContb_produto').val(selectedItem["CODIGO"]);
            $('#descItemContb_produto').val(selectedItem["DESCRICAO"]);
            break;
        case "ncm_produto":
            $('#codNcm_produto').val(selectedItem["CODIGO"]);
            $('#descNcm_produto').val(selectedItem["DESCRICAO"]); 
            break;
        case "servIss_produto":
            $('#codServIss_produto').val(selectedItem["CODIGO"]);
            $('#descServIss_produto').val(selectedItem["DESCRICAO"]); 
            break;
        case "tabNatRec_produto":
            $('#codTabNatRec_produto').val(selectedItem["CODIGO"]);
            $('#descTabNatRec_produto').val(selectedItem["DESCRICAO"]);
            break;
        case "ccusto_produto":
            $('#codCCusto_produto').val(selectedItem["CODIGO"]);
            $('#descCCusto_produto').val(selectedItem["Centro de Custo"]); 
            break;
    }
}

function removedZoomItem(removedItem) {
    switch(removedItem.inputId){
        case  "tipo_produto":
            $('#codTipo_produto').val("");
            $('#descTipo_produto').val("");
            break;
        case "formulacao_produto":
            $('#codFormula_produto').val("");
            $('#descFormula_produto').val("");
            break;
        case "classe_produto":
            $('#codClasse_produto').val("");
            $('#descClasse_produto').val("");
            break;
        case "uniMedida_Produto":
            $('#codUniMed_produto').val("");
            $('#descUniMed_produto').val("");
            break;
        case "segUniMedida_Produto":
            $('#codSegUniMed_produto').val("");
            $('#descSegUniMed_produto').val("");
            break;
        case "fabric_produto":
            $('#codFabric_produto').val("");
            $('#descFabric_produto').val("");
            break;
        case "registrante_produto":
            $('#codRegistrante_produto').val("");
            $('#descRegistrante_produto').val("");
            break;
        case "origem_produto":
            $('#codOrigem_produto').val("");
            $('#descOrigem_produto').val("");
            break;
        case "grupoTrib_produto":
            $('#codGrupTrib_produto').val("");
            $('#descGrupTrib_produto').val("");
            break;
        case "exNcm_produto":
            $('#codExNcm_produto').val("");
            $('#descExNcm_produto').val("");
            break;
        case "armazem_produto":
            $('#codArmazem_produto').val("");
            $('#descArmazem_produto').val("");
            break;
        case "grupo_produto":
            $('#codGrupo_produto').val("");
            $('#descGrupo_produto').val("");
            break;
        case "princpAtivo_produto":
            $('#codPrincpAtivo_produto').val("");
            $('#descPrincpAtivo_produto').val("");
            break;
        case "preProd_produto":
            $('#codPreProd_produto').val("");
            $('#descPreProd_produto').val("");
            break;
        case "contaContb_produto":
            $('#codContaContb_produto').val("");
            $('#descContaContb_produto').val("");
            break;
        case "itemContb_produto":
            $('#codItemContb_produto').val("");
            $('#descItemContb_produto').val("");
            break;
        case "ncm_produto":
            $('#codNcm_produto').val("");
            $('#descNcm_produto').val("");
            break;
        case "servIss_produto":
            $('#codServIss_produto').val("");
            $('#descServIss_produto').val("");
            break;
        case "tabNatRec_produto":
            $('#codTabNatRec_produto').val("");
            $('#descTabNatRec_produto').val("");
            break;
        case "ccusto_produto":
            $('#codCCusto_produto').val("");
            $('#descCCusto_produto').val("");
            break;
    }
}