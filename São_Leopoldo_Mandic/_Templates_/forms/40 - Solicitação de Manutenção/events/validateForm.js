function validateForm(form){

log.info("===============Validate (inicio)===============");
	var numAtividade = getValue("WKNumState");
	var message = "";


	// obrigatoriedade dos campos
	if(numAtividade == 0 || numAtividade == 4){

		if(form.getValue("solicitante") == "")
			message += "</br>- Solicitante";
			
		if(form.getValue("descricaoEquipamento") == "" || form.getValue("descricaoEquipamento") == null)
			message += "</br>- Equipamentos";



		if(form.getValue("descSituacao") == "")
			message += "</br>- Descrição da Situação/Problema";
		}

	if(numAtividade == 16){
		if(form.getValue("auxAprovador") == "reprovado" && form.getValue("motivo") == "")
			message += "</br>- Motivo da Reprovação";

		if(form.getValue("equipe") == "" || form.getValue("equipe") == null)
			message += "</br>- Equipe";

		if(form.getValue("manutencao") == "" || form.getValue("manutencao") == null)
			message += "</br>- Manutenção";
	}

	if (numAtividade == 59) {
		if (form.getValue("aAprovado") == "") {
			message += "</br>- Compra ainda não foi efetuada";
		}
	}

	if (numAtividade == 22) {
		if(form.getValue("dtManutencao") == "")
			message += "</br>- Data Prevista Manutenção";
			
		if(form.getValue("planejador") == "" || form.getValue("planejador") == null)
			message += "</br>- Planejador";


		if(form.getValue("dtTermino") == "")
			message += "</br>- Data Prevista Término";

		if(form.getValue("dtTermino") < form.getValue("dtManutencao"))
			message += "</br>- A data de termino não pode ser menor do que a data de manutenção";
	}	
	
	if (message != "") throw "<br/><strong>Os campos abaixo são de preencimento obrigatório:</strong><br/>" + message;

	log.info("===============ValidateFields (Fim)===============");
}