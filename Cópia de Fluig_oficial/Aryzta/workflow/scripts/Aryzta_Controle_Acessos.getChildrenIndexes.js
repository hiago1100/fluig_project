function getChildrenIndexes(fieldName){
	var dados = hAPI.getCardData(getValue("WKNumProces"));
	var entries = dados.entrySet().iterator();
	var indexes = [];
	
	while (entries.hasNext()) {
		var e = entries.next();
		if (e.getKey().startWith(fieldName + "___")) {
			indexes.push(e.getey().split("___")[1])
		}
	}
	return indexes;
};