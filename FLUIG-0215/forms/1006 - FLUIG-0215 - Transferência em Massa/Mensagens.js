var Mensagens = (function ()
{
    let M0001 = "Este colaborador não poderá ser transferido por este chamado. Colaboradores PCD só podem ser transferidos através do chamado de 'Movimentação de pessoal'";
    let M0002 = "Este colaborador possui ferias marcadas e não pode ser movimentado por este chamado!";
    var M0003 = "Ocorreu erro no sistema. favor informar ao administrador";
    var M0004 = "Erro na function {0} - Descrição do erro: {1}";
    let M0005 = "O CNPJ das seções de origem e destinos, devem ser o mesmo!";
    let M0006 = "A seção de destino não pode ser a mesma de origem";
    let M0007 = "O usuario escolhido já foi selecionado para ser movimentado.";
    let M0008 = "Este colaborador não se encontra na situação 'Ativo' e não pode ser movimentado por este chamado!";
    let M0009 = "O colaborador não poderá ser transferido por ser de Obra Parceira. Favor abrir um chamado de Desligamento e em seguida um chamado de Requisição de Pessoal para este colaborador";

    return {
        M0001: M0001,
        M0002: M0002,
        M0003: M0003,
        M0004: M0004,
        M0005: M0005,
        M0006: M0006,
        M0007: M0007
    };
})();