function validateForm(form){

	 var msg = "";
	   var indice = form.getChildrenIndexes("dsItens");

      if (indice.length != 0) {
          for (var i = 0; i < indice.length; i++) {
                 var iditem = "___"+indice[i];

                 var l = i+1; 
                 
                	 if ( (form.getValue("comAprovado"+iditem )== null) || (form.getValue("comAprovado"+iditem ) )==""){
                         msg = msg +  "O Campo Aprovado deve ser Preenchido na Linha "+l+" ";
                       }else if(form.getValue("comAprovado"+iditem )!= "S"){
			                	 if ( (form.getValue("txtJustificativa"+iditem )== null) | (form.getValue("txtJustificativa"+iditem ) )==""){
			                         msg = msg +  "Para Itens Não Aprovados a Justificativa deve ser Preenchida na Linha "+l+" ";
			                       }
                 				}
                 }     
              }
  

  if (msg != "") {
        throw msg;
     }

}