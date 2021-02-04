var beforeSendValidate = function(numState,nextState){
    var campos = [];
    var tabela = 0;
    var msgErro = "";
    
	$(".obrigatorio").each(function(){
		
    	if (this.value == "" || this.value == null){
    		campos.push($(this).siblings("label")[0].innerText.replace("*",""));
    	}
    	
    });
	
	if($(".TabObrigatoria").length > 0){
		$(".obrigatorioTab").each(function(){
			$(this).removeAttr("style");
			tabela = (tabela == 0 ? 1 : tabela);
			
	    	if (this.value == "" || this.value == null){
	    		$(this).attr("style","border-color:red");
	    		$(this).siblings("span").find("span[role='combobox']").attr("style","border-color:red")
	    		tabela = 2;
	    	}
	    	
	    });
	}else{
		tabela = 1;
	}
	
	if (campos.length > 0){
		msgErro = "Os campos abaixo são obrigatórios: </br></br><ul>";
		
		for(var i=0 ; i<campos.length ; i++){
			msgErro += "<li>"+campos[i]+"</li>"
		}
		msgErro + "</ul>";
	
	}
	
	if(tabela == 0 || tabela == 2){
		msgErro += (tabela == 0 ? "</br>É necessário inserir ao menos uma Ação no Plano de Ação" : (tabela == 2 ? "</br> Verifique os campos destacados em vermelho no Plano de Ação": ""));
		
	}

	if (msgErro != "") throw msgErro;

}