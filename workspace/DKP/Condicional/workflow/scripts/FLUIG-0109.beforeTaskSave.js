function beforeTaskSave(colleagueId,nextSequenceId,userList){
    
    var atividadeAtual = getValue("WKNumState");
    var funcao = hAPI.getCardValue('cpFuncao');
    var Antecipa13Salario = hAPI.getCardValue('cpAntecipar13Salario');
    
    
	function isEstagiario(funcao) 
	{
		return funcao.search('ESTAGIARIO') > -1;
	};
    
    if ((atividadeAtual == 0 || atividadeAtual == 1 ) && !isEstagiario(funcao) && Antecipa13Salario == 1)
    {
        if (hAPI.listAttachments() == "[]") 
        {
            throw "Favor anexar ao o Termo de Adiantamento do 13º salário";
        }
    }
   
}

