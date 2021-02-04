function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	
	log.info("entrou ds_varre_hierarquia")
	
	var dataset = DatasetBuilder.newDataset();
	
	dataset.addColumn("nomeFunc");
	dataset.addColumn("codFunc");
	dataset.addColumn("hierarquia");
	
	var nomeFunc;
	var codFunc;
	var hierarquia;
	
	if (constraints != null || constraints != []){
    	
    	for(var i = 0; i<constraints.length; i++){
    		log.info("Constraint "+i+" = "+ constraints[i].initialValue)
    	}
    	
    	//Pega a hierarquia passada na constraint - constraint vem como "hierarquia/nivel"
    	var busca = String(constraints[0].initialValue);
    	
    	busca = busca.split("/")
    	
    	nivel = busca[1]
    	busca = busca[0]
    	
    	log.info("Busca = "+busca)
    	
    	var c1 = DatasetFactory.createConstraint("userSecurityId", "admin", "admin", ConstraintType.MUST);
    	
    	var constr = new Array(c1);

		var datasetResult = DatasetFactory.getDataset('ds_parametrizacao_colab_area',null,constr,null);
    	
    	var listaElem = []
    	var objs = []
    	
		if(datasetResult.rowsCount > 0){
			for(var i=0;i<datasetResult.rowsCount;i++){
				nomeFunc = datasetResult.getValue(i, "NomeFunc")
				codFunc = datasetResult.getValue(i, "CodFunc")
				hierarquia = datasetResult.getValue(i,"hierarquia")
				
				var func = {
					nomeFunc: nomeFunc,
					codFunc: codFunc,
					hierarquia: hierarquia
				}
				
				log.info(String(hierarquia))
				
				objs.push(func)
				
				listaElem.push(String(hierarquia))
			}
		}
    	
    	var buscaHierarquia = geraHierarquia(listaElem, busca, nivel)
    	
    	var objs2 = []
    	
    	for(var i = 0; i < objs.length; i++){
    		for(var j=0;j<buscaHierarquia.length;j++)
    		if(buscaHierarquia[j] == objs[i].hierarquia){
    			objs2.push(objs[i])
    		}
    	}
    	
    	for(var i = 0; i < objs2.length; i++){
    		dataset.addRow( new Array(objs2[i].nomeFunc, objs2[i].codFunc, objs2[i].hierarquia))
    	}
    }
    
    return dataset;   
	
}function onMobileSync(user) {

}

//Função que pega a hirarquia a ser buscada
function geraHierarquia(lista, busca, nivel){
	
	var busca1 = busca;

	var busca = busca1.split(".")

	for(var i = busca.length-1; i >= 0; i--){
	  if(busca[i] != "0"){
	    posBreak = i;
	    break;
	  }
	}

	var listaElem = []

	listaElem.push(busca1)

	var control =  false;
	var tamanhoPercorrer = posBreak + parseInt(nivel)
	if(tamanhoPercorrer<=busca.length){
	  for(var i = 0; i<lista.length; i++){
	    var elem = lista[i].split(".")
	    for(var j = 0; j<elem.length;j++){
	      if(j<=posBreak){
	        if(busca[j] != elem[j]){
	          control = false
	          break;
	        }
	      }else{
	        if(j<=tamanhoPercorrer){
	          if(elem[j] != "0") control = true;
	        }else{
	          if(elem[j] != "0") control = false;
	        }
	      }
	    }
	    
	    if(control){
	      listaElem.push(lista[i])
	    }

	  }
	}
	
	return listaElem;
}