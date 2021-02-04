function calculaPrazo(atividade){
	var dataInicioAtividade = (atividade == "implementacao" ? hAPI.getCardValue("inicioVerificaImplementacao") : hAPI.getCardValue("inicioVerificaEficacia"));
	
	
}

function returnFormattedDate(days){
	importPackage(java.util)
	importPackage(java.text)
	var data = new java.util.Date();
    var formatter = new SimpleDateFormat("dd/MM/yyyy");
    
    var calendario = Calendar.getInstance();
    calendario.setTime(data);
    calendario.add(Calendar.DATE, 7);
    data = calendario.getTime();
    
    return formatter.format(data).toString();
}