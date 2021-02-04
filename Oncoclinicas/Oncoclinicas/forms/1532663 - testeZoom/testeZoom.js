function setSelectedZoomItem(selectedItem) {

	if(selectedItem.inputId == "cpFilial"){
		console.log("------ Limpando zoom de e-mail --------------");
		$("#cpBanco").val('');
		console.log("------ Atualizando zoom de e-mail --------------");
		reloadZoomFilterValues("cpBanco", "FILIAL," + selectedItem.filial_protheus);  
	}
}
