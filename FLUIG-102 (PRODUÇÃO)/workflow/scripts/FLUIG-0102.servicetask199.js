function servicetask199(attempt, message) {
	try
	{
		log.warn('servicetask199'); //TODO: retirar ao subir para produção
		
		RegisterWorkstation();
	}
	catch(erro)
	{
		throw 'OCORREU UM ERRO NA INTEGRAÇÃO DO POSTO DE TRABALHO COM O RM FLUIG-0102 :( GOD DAMMIT. ERRO: ' + erro.message;
	}
}