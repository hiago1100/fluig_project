function addDays(data, days) 
{
	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
	log.warn('addDays: ' + data);
	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
	
	var Ferias = data.substring(3,5) + '/' + data.substring(0,2) + '/' + data.substring(6,10);
	
	var date = new Date(Ferias);
	date.setDate(date.getDate() + days);
	var dia = date.getDate();
	if(parseFloat(dia)<parseFloat(10))
	{
		dia = '0'+dia;
	}
	else
	{
		dia = dia;
	}
	
	var mes = date.getMonth();
	mes = parseFloat(mes)+parseFloat(1);
	
	if(parseFloat(mes)<parseFloat(10))
	{
		mes = '0'+mes;
	}
	else
	{
		mes = mes;
	}
	
	var ano = date.getFullYear();
	
	return (dia+'/'+mes+'/'+ano);
}


function getIndexes(fieldReference)
{
    var regex = new RegExp(fieldReference+'___');
    var map = hAPI.getCardData(parseInt(getValue('WKNumProces')));
    var iterator = map.keySet().iterator();
    var indexes = new java.util.TreeSet();  
    
    while(iterator.hasNext()){
                   var id = iterator.next();
                   if(id.match(regex) == null) continue;
                   else indexes.add(id.split('___')[1]);
    }
    return indexes;
}


