function afterTaskCreate(colleagueId){

var numEmpresa = getValue("WKCompany")
var numProcesso = getValue("WKNumProces");
var nrProxAtividade = getValue("WKNextState");
  

    if (nrProxAtividade=="70"){//Altera data da Atividade 12
        var dateAux = hAPI.getCardValue("dtPrevisaoReg");
        var dt = dateAux.split("/");
        var completa = dt[2] +"/"+ dt[1] +"/"+ dt[0];
        var data = new Date(completa);
        hAPI.setDueDate(numProcesso, hAPI.getActualThread(numEmpresa, numProcesso, nrProxAtividade), colleagueId, data,86399);
    } 

    if (nrProxAtividade=="74"){//Altera data da Atividade 12
        var dateAux = hAPI.getCardValue("dtPrevRegCont");
        var dt = dateAux.split("/");
        var completa = dt[2] +"/"+ dt[1] +"/"+ dt[0];
        var data = new Date(completa);
        hAPI.setDueDate(numProcesso, hAPI.getActualThread(numEmpresa, numProcesso, nrProxAtividade), colleagueId, data,86399);
    }

    if (nrProxAtividade=="78"){//Altera data da Atividade 12
        var dateAux = hAPI.getCardValue("dtSuprVer");
        var dt = dateAux.split("/");
        var completa = dt[2] +"/"+ dt[1] +"/"+ dt[0];
        var data = new Date(completa);
        hAPI.setDueDate(numProcesso, hAPI.getActualThread(numEmpresa, numProcesso, nrProxAtividade), colleagueId, data,86399);
    }    

    if (nrProxAtividade=="82"){//Altera data da Atividade 12
        var dateAux = hAPI.getCardValue("dtFisVer");
        var dt = dateAux.split("/");
        var completa = dt[2] +"/"+ dt[1] +"/"+ dt[0];
        var data = new Date(completa);
        hAPI.setDueDate(numProcesso, hAPI.getActualThread(numEmpresa, numProcesso, nrProxAtividade), colleagueId, data,86399);
    }

    if (nrProxAtividade=="86"){//Altera data da Atividade 12
        var dateAux = hAPI.getCardValue("dtAdmVer");
        var dt = dateAux.split("/");
        var completa = dt[2] +"/"+ dt[1] +"/"+ dt[0];
        var data = new Date(completa);
        hAPI.setDueDate(numProcesso, hAPI.getActualThread(numEmpresa, numProcesso, nrProxAtividade), colleagueId, data,86399);
    }

    if (nrProxAtividade=="90"){//Altera data da Atividade 12
        var dateAux = hAPI.getCardValue("dtDepVer");
        var dt = dateAux.split("/");
        var completa = dt[2] +"/"+ dt[1] +"/"+ dt[0];
        var data = new Date(completa);
        hAPI.setDueDate(numProcesso, hAPI.getActualThread(numEmpresa, numProcesso, nrProxAtividade), colleagueId, data,86399);
    }


    if (nrProxAtividade=="94"){//Altera data da Atividade 12
        var dateAux = hAPI.getCardValue("dtCpVer");
        var dt = dateAux.split("/");
        var completa = dt[2] +"/"+ dt[1] +"/"+ dt[0];
        var data = new Date(completa);
        hAPI.setDueDate(numProcesso, hAPI.getActualThread(numEmpresa, numProcesso, nrProxAtividade), colleagueId, data,86399);
    }   

    if (nrProxAtividade=="109"){//Altera data da Atividade 12
        var dateAux = hAPI.getCardValue("dtAssVer");
        var dt = dateAux.split("/");
        var completa = dt[2] +"/"+ dt[1] +"/"+ dt[0];
        var data = new Date(completa);
        hAPI.setDueDate(numProcesso, hAPI.getActualThread(numEmpresa, numProcesso, nrProxAtividade), colleagueId, data,86399);
    } 

    if (nrProxAtividade=="114"){//Altera data da Atividade 12
        var dateAux = hAPI.getCardValue("dtCrVer");
        var dt = dateAux.split("/");
        var completa = dt[2] +"/"+ dt[1] +"/"+ dt[0];
        var data = new Date(completa);
        hAPI.setDueDate(numProcesso, hAPI.getActualThread(numEmpresa, numProcesso, nrProxAtividade), colleagueId, data,86399);
    } 


    if (nrProxAtividade=="119"){//Altera data da Atividade 12
        var dateAux = hAPI.getCardValue("dtGesVer");
        var dt = dateAux.split("/");
        var completa = dt[2] +"/"+ dt[1] +"/"+ dt[0];
        var data = new Date(completa);
        hAPI.setDueDate(numProcesso, hAPI.getActualThread(numEmpresa, numProcesso, nrProxAtividade), colleagueId, data,86399);
    } 
} 