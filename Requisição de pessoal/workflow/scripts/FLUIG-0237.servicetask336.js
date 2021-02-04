function servicetask336(attempt, message) 
{
	try
	{
		var arvorePastas = null;
		var cpf = hAPI.getCardValue("cpCadExternoCpf");
		var secao = hAPI.getCardValue("cpReqDepartamentoObra");
		var processoDescricao = 'Cadastro de colaboradores'

		var	arvorePastas = [cpf,secao,processoDescricao];

		var idPastaPai = retornaPastaPai(getValue("WKDef"));

		var array = criarArvorePastasGed(arvorePastas, idPastaPai);

		hAPI.setCardValue("cpIdPastaPai", array[array.length - 1]);
		
		hAPI.setCardValue("cpIntegracaoOcrCriarGed", "1");
	}
	catch(e)
	{
		hAPI.setCardValue("cpIntegracaoOcrCriarGed", "0");
		throw "ERRO NA CRIAÇÃO DE PASTAS NO GED"
	}
	
}