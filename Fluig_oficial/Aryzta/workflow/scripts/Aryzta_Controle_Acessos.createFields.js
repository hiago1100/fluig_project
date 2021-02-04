function createFields(param){
	var fields = [];
	
	for(i in param) {
		fields[i] = {};
		fields[i]['name'] = param[i];
		fields[i]['label'] = param[i];
		fields[i]['type'] = 'character';
	}
	
	return fields;
}