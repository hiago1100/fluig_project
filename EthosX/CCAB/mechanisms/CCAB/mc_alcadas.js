function resolve(process,colleague){

	var cAprovadores = hAPI.getCardValue("matAprovador");
	var aAprovadores = cAprovadores.split(",");
	var userList = new java.util.ArrayList();

	for (var i = 0; i < aAprovadores.length; i++){

		userList.add(aAprovadores[i]);
	}

	return userList;

}