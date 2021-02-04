//Mostra a janela de Zoom, baseando-se nos parâmetros informados:
//zoomDataSet('título para a janela', 'dataset', 'campos do dataset','coluna do dataset','filtro', 'tipo');
function zoomDataSet(titulo, dataset, campos, resultFields, filterValues, type){	
	window.open("/webdesk/zoom.jsp?datasetId="+dataset+"&dataFields="+campos+"&resultFields="+resultFields+"&filterValues="+filterValues+"&type="+type+"&title="+titulo, "zoom" , "status , scrollbars=no ,width=650, height=350 , top=0 , left=0");
};

//Prepara o Zoom referente aos centros de custo (dataset "ds_centroCusto"):
function zoomCentroDeCusto(strType) {
	var FV = ""; //FV = campo,valor
	zoomDataSet('Zoom Centro de custo','ds_centroCusto','CODIGO,Código,DESCRICAO,Descrição', 'CODIGO,DESCRICAO', FV, strType);	
};

/*function setSelectedZoomItem(selectedItem){
	
	var type = selectedItem.type.split("___")[0];
	var index = selectedItem.type.split("___")[1];
	
	if (selectedItem.type == "zoomPreAprovador") {

		$('#pre_aprovador').val(selectedItem['colleagueId']);

	}
		
	if(type == "centroDeCusto"){ 
	
		$('#DescCentroCusto').val(selectedItem.DESCRICAO);
		$('#CodCentroCusto').val(selectedItem.CODIGO);
		
		$('#zoomCentroCusto').val($('#zoomCentroCusto').val() + selectedItem.CODIGO + "; ");
		$('#DescCentroCusto').val($('#DescCentroCusto').val() + selectedItem.CODIGO + " - " + selectedItem.DESCRICAO + "; ");
		
	}
	

}
*/	