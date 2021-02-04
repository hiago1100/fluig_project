function VerificaSalario(){
	var Inicio = 0;
	
	for(var i = 1; i <= parseInt(hAPI.getCardValue("tbSalarioTotal")); i++){
		var salario = hAPI.getCardValue("itmSalario___"+i);
		var index = hAPI.getCardValue("itmIndexSalario___"+i);
		
		if(salario != null){
			var quantidade = parseInt(hAPI.getCardValue("itmQuantidade___"+i));
			
			for(var j = Inicio + 1; j <= Inicio + quantidade; j++){
				var salario_interno = hAPI.getCardValue("itmNovoSalarioCCO___"+j);
				var index_salario = hAPI.getCardValue("itmIndexCandidato___"+j);
				var tipo = hAPI.getCardValue("itmTipo___"+j);
				
				if(tipo == "1" || tipo == "2"){
					if(salario_interno != null){
						if(index_salario == index){
							if(salario != salario_interno){
								return 2;
							} 
						} 
					}
				}
			}
			
			Inicio += quantidade;
		}
	}
	
	return 1;
	
}