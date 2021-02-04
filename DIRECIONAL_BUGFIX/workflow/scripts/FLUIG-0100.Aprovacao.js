var tipoExcecao = hAPI.getCardValue("cpTipoExcecao");
var tipoMaoDeObra = hAPI.getCardValue("cpCodTipoMaoObra");
var ehObra = hAPI.getCardValue("cpEhObra");
var gestor = hAPI.getCardValue('cpNivelHierarquiaGestor');
var gerenteGeral = hAPI.getCardValue('cpNivelHierarquiaGG');
var superintendente = hAPI.getCardValue('cpNivelHierarquiaSuper');
var diretor = hAPI.getCardValue('cpNivelHierarquiaDiretor');

function Reaberto() {
    var aprovado = hAPI.getCardValue("cpReaberturaChamado");
    if (aprovado == '1') return 1; //aprovação do solicitante da excecao
    else return 2; //fim
}

function AprovSolicExcecao() {
 	var transferencia = hAPI.getCardValue("cpHaveraTransferencia");
    var solicitante = hAPI.getCardValue("cpMatriculaSolicitante");
    var aprovacao = hAPI.getCardValue("cpAprovacaoSolicitanteExcecao");
    var consultor = hAPI.getCardValue("cpConsultorRH");
    if (aprovacao == '1') {
        if (((tipoMaoDeObra == "3") || (tipoMaoDeObra == "4")) && ((tipoExcecao == "1") || (tipoExcecao == "5"))) {
            if (solicitante == consultor) return 1;//parecer da area remuneração
            else return 4; // parecer da consultoria de rh da excecao ok
        } else {
            if (gestor == 'NAO_ENTRAR') {
                if (gerenteGeral == 'NAO_ENTRAR') {
                    if (superintendente == 'NAO_ENTRAR' || superintendente == '') {
                        if (diretor == 'NAO_ENTRAR' || diretor == '') {
                            if (tipoExcecao == '1') return 5;//aprovacao gestor rh
                            else if (tipoExcecao == '3') return 6;//Aprovacao gestor csc
                            else if (tipoExcecao == '5') {
                                if (transferencia == '1') return 7;//aprovacao gestor destino
                                else return 5;//aprovacao gestor rh
                            }
                        } else return 8; //manda para diretor
                    } else return 9;//vai para superintendente
                } else return 10;//vai para gerente geral
            } else return 2;// vai para gestor
        }
    } else return 3;//reabertura
}

function AprovConsultRH() {

    var aprovacao = hAPI.getCardValue("cpAprovacaoConsultoriaExcecao");

    if (aprovacao == '1') {
        if (((tipoMaoDeObra == "3") || (tipoMaoDeObra == "4")) && ((tipoExcecao == '1') || (tipoExcecao == '5'))) return 1;//parecer da area remuneração
        else {
            if (gestor == 'NAO_ENTRAR') {
                if (gerenteGeral == 'NAO_ENTRAR') {
                    if (superintendente == 'NAO_ENTRAR' || superintendente == '')
                        if (diretor == 'NAO_ENTRAR' || diretor == '') {
                            if (tipoExcecao == '1') return 7; //aprovacao gestor rh
                            else if (tipoExcecao == '3') return 8; //Aprovacao gestor csc
                            else if (tipoExcecao == '5') {
                                if (transferencia == '1') return 9; //aprovacao gestor destino
                                else return 7; //aprovacao gestor rh
                            }
                        } else return 4; //manda para diretor
                    else return 6;//vai para superintendente
                } else return 5;//vai para gerente geral
            } else return 2;// vai para gestor
        }
    } else return 3;//reabertura
}

function ParecerAreaRemun() {
    var aprovacao = hAPI.getCardValue("cpAprovacaoRemuneracao");
    var transferencia = hAPI.getCardValue("cpHaveraTransferencia");

    if (aprovacao == '1') {
        if (gestor == 'NAO_ENTRAR') {
            if (gerenteGeral == 'NAO_ENTRAR') {
                if (superintendente == 'NAO_ENTRAR' || superintendente == '') {
                    if (diretor == 'NAO_ENTRAR' || diretor == '') {
                        if (tipoExcecao == '1') return 6;//aprovacao gestor rh
                        else if (tipoExcecao == '3') return 7;//Aprovacao gestor csc
                        else if (tipoExcecao == '5') {
                            if (transferencia == '1') return 8;//aprovacao gestor destino
                            else return 9;//aprovacao gestor rh
                        }
                    } else return 3; //manda para diretor
                } else return 4;//vai para superintendente
            } else return 5;//vai para gerente geral
        } else return 1;// vai para gestor
    } else return 2;//rebaertura
}

//Aprovação N1
function AprovGestorExc() {
    var aprovacao = hAPI.getCardValue("cpAprovacaoGestorAreaExcecao");
    var transferencia = hAPI.getCardValue("cpHaveraTransferencia");
    if (aprovacao == '1') {
        if ((gerenteGeral == 'NAO_ENTRAR' || gerenteGeral == '')){
            if (superintendente == 'NAO_ENTRAR' || superintendente == '') {
                if (diretor == 'NAO_ENTRAR' || diretor == '') {
                    if (tipoExcecao == '1'){
                        return 6;//aprovacao gestor rh
                    }
                    else if (tipoExcecao == '3'){
                        return 7;//Aprovacao gestor csc
                    }
                    else if (tipoExcecao == '5') {
                        if (transferencia == '1'){
                            return 8;//aprovacao gestor destino
                        }
                        else{
                            return 5;//aprovacao gestor rh
                        }
                    }
                }
                else{
                    return 4;//diretor
                }
            }
            else{
                return 3;//superintendente
            }
        }
        else{
             return 1;//gerente geral
        }
    }
    else{
         return 2;//reabertura
    }
}

function AprovGGIntExc() {

    var aprovacao = hAPI.getCardValue("cpAprovacaoGerenteAreaExcecao");
    var transferencia = hAPI.getCardValue("cpHaveraTransferencia");
    if (aprovacao == '1') {
        if ((superintendente == 'NAO_ENTRAR' || superintendente == '') /* || (superinten == '') */) {
            if (diretor == 'NAO_ENTRAR' || diretor == '') {
                if (tipoExcecao == '1') return 6;//aprovacao gestor rh
                else if (tipoExcecao == '3') return 7;//Aprovacao gestor csc
                else if (tipoExcecao == '5') {
                    if (transferencia == '1') return 8;//aprovacao gestor destino
                    else return 5;//aprovacao gestor rh
                }
            } else return 4;//diretor
            return 3;//diretor
        } else return 1;//SUPERINTENDENTE
    } else return 2;//reabertura
}

function AprovSuperInIntExc() {
    var aprovacao = hAPI.getCardValue("cpAprovacaoSupAreaExcecao");
    var transferencia = hAPI.getCardValue("cpHaveraTransferencia");
    if (aprovacao == '1') {
        if ((diretor == 'NAO_ENTRAR' || diretor == '') /* || (superinten == '') */) {
            if (tipoExcecao == '1') return 6;//aprovacao gestor rh
            else if (tipoExcecao == '3') return 3;//Aprovacao gestor csc
            else if (tipoExcecao == '5') {
                if (transferencia == '1') return 4;//aprovacao gestor destino
                else return 5;//aprovacao gestor rh
            }
        } else return 1;//DIRETOR
    } else return 2;
}

function AprovDiretorIntExc() {
    var aprovacao = hAPI.getCardValue("cpAprovacaoDiretorAreaExcecao");
    var transferencia = hAPI.getCardValue("cpHaveraTransferencia");
    if (aprovacao == '1') {
        if (tipoExcecao == '1') {
            return 2;//aprovacao gestor rh
        } else if (tipoExcecao == '3') {
            return 3;//Aprovacao gestor csc
        } else if (tipoExcecao == '5') {
            if (transferencia == '1') {
                return 4;//aprovacao gestor destino
            } else {
                return 2;//aprovacao gestor rh
            }
        }
    } else {
        return 1;//reabertura
    }
}

function AprovGestorDestino() {
    var aprovacao = hAPI.getCardValue("cpAprovacaoGestorDestino");
    if (aprovacao == '1') {
        if (tipoExcecao == '3') {
            return 1;//Aprovação da Gestor CSC"
        } else {
            return 3;// Aprovação da Gestor RH"
        }
    }
    else {
        return 2;
    }
}

function AprovGestorCSC() {
    var aprovacao = hAPI.getCardValue("cpAprovacaoGestorCSC");
    if (aprovacao == '1') {
        return 1;//processamento da excecao area csc
    }
    else {
        return 2;//reabertura
    }
}

function AprovGestorRH() {
    var aprovacao = hAPI.getCardValue("cpAprovacaoGestorRH");
    var obraMov = hAPI.getCardValue("cpEhObraM");
    if (aprovacao == '1') {
        if ((tipoExcecao == '1') || ((tipoExcecao == '5') && (obraMov == 'SIM'))) {
            return 1;//Recolhimento da documentação
        } else {
            return 3;//PROCESSAMENTO DA EXCECAO AREA CSC
        }
    } else {
        return 2;//reabertura
    }
}

function RecolhimentoDoc() {
    var aprovacao = hAPI.getCardValue("cpAprovacaoRecolhimentoDoc");
    if (aprovacao == '1') {
        return 1;// processamento da excecao area csc
    }
    else {
        return 2;//reabertura
    }
}

function ProcExecCSC() {

    var aprovacao = hAPI.getCardValue("cpAprovacaoExcecaoCSC");

    if (aprovacao == '1') {
        return 1;//conferencia da solicitação
    }
    else {
        return 2;//reabertura
    }
}

function ConfProcessamento() {
    var aprovacao = hAPI.getCardValue("cpAprovacaoConferencia");
    if (aprovacao == '1') {
        return 1; //fim
    }
    else {
        return 2; //ajuste
    }
}

function IsGestor() {
    var hieraquia;

    if (hAPI.getCardValue("cpMatriculaSolicitanteExcecao") == hAPI.getCardValue("cpChapaDiretor")) hieraquia = 'IsDiretor'
    else if (hAPI.getCardValue("cpMatriculaSolicitanteExcecao") == hAPI.getCardValue("cpChapaSuper")) hieraquia = 'IsSuper'
    else if (hAPI.getCardValue("cpMatriculaSolicitanteExcecao") == hAPI.getCardValue("cpChapaGerGeral")) hieraquia = 'IsGG'
    else if (hAPI.getCardValue("cpMatriculaSolicitanteExcecao") == hAPI.getCardValue("cpChapaGestor")) hieraquia = 'IsGestor'

    return hieraquia;
}
