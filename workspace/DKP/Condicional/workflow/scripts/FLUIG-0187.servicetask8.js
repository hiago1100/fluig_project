function servicetask8(attempt, message) {
	try 
	{
		gerarAvaliacoes();
	} 
	catch(error) 
	{ 
		throw error.message;
	}
}