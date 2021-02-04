function beforeTaskSave(colleagueId,nextSequenceId,userList) {
	
    if(!isMesmoCNPJ()) {
        throw "O departamento de origem e destino, devem possuir o mesmo numero de CNPJ";
    }

    if(isMesmaSecao()) {
        throw "A seção de destino não pode ser a mesma de origem";
    }
    
    function isMesmoCNPJ() {
        return hAPI.getCardValue('cpIsMesmoCNPJ') == 'true';
    }

    function isMesmaSecao() {
        return hAPI.getCardValue('cpIsMesmaSecao') == 'true';
    }
}