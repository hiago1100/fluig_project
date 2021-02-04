function afterTaskCreate(colleagueId) 
{
	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
	log.error('afterTaskCreate'); //TODO: retirar ao subir para produção
	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
	
	//CENTRAL DE TAREFAS
	addCentralTarefasInfo(getValue("WKDef"),getValue("WKNumProces"));  
	
	var nrProxAtividade = getValue("WKNextState");
	var dataInicioFerias = '';
	var indexes = getIndexes('cpDataInicioFerias'); // quantidade pai x filho
    var iterator = indexes.iterator();

    while(iterator.hasNext())
    {
        var index = iterator.next();
        
        if(hAPI.getCardValue("cpFeriasIntegradaRM___"+index) == '0')
        {
        	dataInicioFerias = hAPI.getCardValue("cpDataInicioFerias___"+index);
        	
        	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
        	log.error('cpDataInicioFerias___'+ index + ' ' + dataInicioFerias); //TODO: retirar ao subir para produção
        	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
        	
        	break;
        }
    }
    
    log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
	log.error('nrProxAtividade: ' + nrProxAtividade); //TODO: retirar ao subir para produção
	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
    
	try
	{
		 if (nrProxAtividade == "11") 
		    {
		    	SetaPrazoAtividade(dataInicioFerias, colleagueId, -17, -43);
		    }
		    else if (nrProxAtividade == "16") 
		    {
		    	SetaPrazoAtividade(dataInicioFerias, colleagueId, -15, -42);
		    }
		    else if(nrProxAtividade == 20)
			{
		    	SetaPrazoAtividade(dataInicioFerias, colleagueId, -10, -35);
			}
		    else if(nrProxAtividade == 24)
			{
		    	SetaPrazoAtividade(dataInicioFerias, colleagueId, -10, -35);
			}
		    else if(nrProxAtividade == 26)
			{
		    	SetaPrazoAtividade(dataInicioFerias, colleagueId, -10, -35);
			}
	}
	catch(erro)
	{
		throw 'FLUIG-0109 - ERRO AO ATRIBUIR O PRAZO NA ATIVIDADE. ERRO:' + erro.message;
	}
   
}

function SetaPrazoAtividade(dataInicioFerias, colleagueId,diasEstagiario, diasColaboradores)
{
	var dataPrazo = new Date();
	var isEstagiario = hAPI.getCardValue("cpFuncao").indexOf('ESTAGIARIO') > -1;
	
	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
	log.error('dataInicioFerias: ' + dataInicioFerias); //TODO: retirar ao subir para produção
	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
		
	var prazo = isEstagiario ? addDays(dataInicioFerias, diasEstagiario) : addDays(dataInicioFerias, diasColaboradores);
	
	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
	log.error('prazo: ' + prazo); //TODO: retirar ao subir para produção
	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
	
	dataPrazo.setDate(prazo.split("/")[0]);
	dataPrazo.setMonth(prazo.split("/")[1] - 1);
	dataPrazo.setFullYear(prazo.split("/")[2]);
	
	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
	log.error('dataPrazo: ' + dataPrazo); //TODO: retirar ao subir para produção
	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
	
	hAPI.setDueDate(getValue("WKNumProces"), 
			hAPI.getActualThread(getValue("WKCompany"), getValue("WKNumProces"), getValue("WKNextState")), 
			colleagueId, dataPrazo, 64800);
}

