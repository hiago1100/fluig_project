function defineStructure() {
	addColumn("_classname");
	addColumn("CROPLINE");
	addColumn("DESCGRUPOVENDAS");
    addColumn("GESTOR");    
	addColumn("GRUPOVENDAS");
	addColumn("LIMITECALCULADO");
	addColumn("LIMITECLEAN");
	addColumn("LIMITEDISPONIVEL");
	addColumn("LIMITETEMPORARIO");
	addColumn("MOEDA");
	addColumn("PEDIDOSBLOQUEADOS");
	addColumn("PEDIDOSCARTEIRA");
	addColumn("PEDIDOSLIBERADOS");
	addColumn("SAFRA");	
	addColumn("SALDODUPLICATAS");
	addColumn("SALDOVENCIDO");
	addColumn("APROVADO");

	setKey([ "SAFRA", "GRUPOVENDAS"]);
    addIndex([ "SAFRA", "GRUPOVENDAS"]);
}

function onSync(lastSyncDate) {		
	var dataset = DatasetBuilder.newDataset();									
	dataset = criaDataset(dataset, "");				
	return dataset;
}

function createDataset(fields, constraints, sortFields) {
    var param = setParams(constraints); 
	var dataset = DatasetBuilder.newDataset();				
	dataset = criaDataset(dataset, param);	
	return dataset;
}

function onMobileSync(user) {	
	var sortingFields = [];
	var fields = [
		"_classname",
		"CROPLINE",
    	"DESCGRUPOVENDAS",    
		"GESTOR",
		"GRUPOVENDAS",
		"LIMITECALCULADO",
		"LIMITECLEAN",
		"LIMITEDISPONIVEL",
		"LIMITETEMPORARIO",
		"MOEDA",
		"PEDIDOSBLOQUEADOS",
		"PEDIDOSCARTEIRA",
		"PEDIDOSLIBERADOS",	
		"SAFRA",
		"SALDODUPLICATAS",
		"SALDOVENCIDO"		
	];
	var constraints = [];
	var result = {
		'fields': fields,
		'constraints': constraints,
		'sortingFields': sortingFields
	};
	return result;
}

// ================================================================

function criaDataset(dataset, param){
	dataset.addColumn("_classname");
	dataset.addColumn("CROPLINE");
	dataset.addColumn("DESCGRUPOVENDAS");
    dataset.addColumn("GESTOR");
	dataset.addColumn("GRUPOVENDAS");
	dataset.addColumn("LIMITECALCULADO");
	dataset.addColumn("LIMITECLEAN");
	dataset.addColumn("LIMITEDISPONIVEL");
	dataset.addColumn("LIMITETEMPORARIO");
	dataset.addColumn("MOEDA");
	dataset.addColumn("PEDIDOSBLOQUEADOS");
	dataset.addColumn("PEDIDOSCARTEIRA");
	dataset.addColumn("PEDIDOSLIBERADOS");
	dataset.addColumn("SAFRA");	
	dataset.addColumn("SALDODUPLICATAS");	
	dataset.addColumn("SALDOVENCIDO");		
	dataset.addColumn("APROVADO");
    dataset = chamaApi(dataset, param);    
    return dataset;
}


function chamaApi(dataset,  param) {

	var endpoint =  "/api/aprovcredito";
	var SAFRAID = [];
	var GRUPOVENDASID = [];
	
	if(param != ""){
		endpoint = endpoint + "?" + param;
	}
	                
    try{
		var clientService = fluigAPI.getAuthorizeClientService();
		var dados = {
			companyId : getValue("WKCompany") + '',
			serviceCode: 'RESTPROTHEUS', //RESTPROTHEUS PROD
			endpoint: endpoint,
			method: 'get',
		}
		
		var vo = clientService.invoke(JSON.stringify(dados));		
		if(vo.getResult() == null || vo.getResult().isEmpty()){
            dataset.addRow(new Array("Retorno está vazio"));            
		}else{
            var json = JSON.parse(vo.getResult());			
                        
            if(json["APROVACOES"]){
                for(var i=0; i < json["APROVACOES"].length; i++){

					var APROVADO = checkAprovacoes( json["APROVACOES"][i]["GESTOR"], json["APROVACOES"][i]["SAFRA"], json["APROVACOES"][i]["GRUPOVENDAS"] );
					APROVADO = (APROVADO) ? "1" : "0";

					SAFRAID.push(json["APROVACOES"][i]["SAFRA"]);
					GRUPOVENDASID.push(json["APROVACOES"][i]["GRUPOVENDAS"]);

					log.info("********************************* VALOR"+ json["APROVACOES"][i]["_classname"]);
					log.info("********************************* VALOR"+ json["APROVACOES"][i]["CROPLINE"]);
					log.info("********************************* VALOR"+ json["APROVACOES"][i]["DESCGRUPOVENDAS"]);
					log.info("********************************* VALOR"+ json["APROVACOES"][i]["GESTOR"]);
					log.info("********************************* VALOR"+ json["APROVACOES"][i]["GRUPOVENDAS"]);
					log.info("********************************* VALOR"+ json["APROVACOES"][i]["LIMITECALCULADO"]);
					log.info("********************************* VALOR"+ json["APROVACOES"][i]["LIMITECLEAN"]);
					log.info("********************************* VALOR"+ json["APROVACOES"][i]["LIMITEDISPONIVEL"]);
					log.info("********************************* VALOR"+ json["APROVACOES"][i]["LIMITETEMPORARIO"]);
					log.info("********************************* VALOR"+ json["APROVACOES"][i]["MOEDA"]);
					log.info("********************************* VALOR"+ json["APROVACOES"][i]["PEDIDOSBLOQUEADOS"]);
					log.info("********************************* VALOR"+ json["APROVACOES"][i]["PEDIDOSCARTEIRA"]);
					log.info("********************************* VALOR"+ json["APROVACOES"][i]["PEDIDOSLIBERADOS"]);
					log.info("********************************* VALOR"+ json["APROVACOES"][i]["SAFRA"]);
					log.info("********************************* VALOR"+ json["APROVACOES"][i]["SALDODUPLICATAS"]);
					log.info("********************************* VALOR"+ json["APROVACOES"][i]["SALDOVENCIDO"]);
					log.info("********************************* VALOR"+ APROVADO);



					var col = [];
					col.push(json["APROVACOES"][i]["_classname"]);
					col.push("" + json["APROVACOES"][i]["CROPLINE"] + "");
					col.push(json["APROVACOES"][i]["DESCGRUPOVENDAS"]);
					col.push(json["APROVACOES"][i]["GESTOR"]);
					col.push(json["APROVACOES"][i]["GRUPOVENDAS"]);
					col.push(json["APROVACOES"][i]["LIMITECALCULADO"]);
					col.push(json["APROVACOES"][i]["LIMITECLEAN"]);
					col.push(json["APROVACOES"][i]["LIMITEDISPONIVEL"]);
					col.push(json["APROVACOES"][i]["LIMITETEMPORARIO"]);
					col.push(json["APROVACOES"][i]["MOEDA"]);
					col.push(json["APROVACOES"][i]["PEDIDOSBLOQUEADOS"]);
					col.push(json["APROVACOES"][i]["PEDIDOSCARTEIRA"]);
					col.push(json["APROVACOES"][i]["PEDIDOSLIBERADOS"]);					
					col.push(json["APROVACOES"][i]["SAFRA"]);					
					col.push(json["APROVACOES"][i]["SALDODUPLICATAS"]);
					col.push(json["APROVACOES"][i]["SALDOVENCIDO"]);
					col.push(APROVADO); //verifica se foi aprovado
                    dataset.addOrUpdateRow(col);
                }
            }
            else{
                dataset.addRow(new Array('ERRO DE CONEXAO',vo.getResult()));
			}

		}      
        
	}catch(err){
        err = err.toString();
		dataset.addRow(new Array('ERRO NA CONSULTA',err));
    }
	
	dataset = clearDataset(dataset,SAFRAID,GRUPOVENDASID);

    return dataset;
}

var setParams = function (constraints){
	var str = "";
	
	if(constraints.length > 0){
	  for (var i = 0; i < constraints.length; i++) {		
		if(str.trim() != ""){
		    str += "&";
		}
        str +=  constraints[i].fieldName + "=" + constraints[i].initialValue.toString().trim();		
	  }
    } 
    
	return str;			
}

var clearDataset = function(newdataset,SAFRAID, GRUPOVENDASID){	
		
	var dataset = DatasetFactory.getDataset("ds_consultaAprovacaoDeCredito", null, null, null); // busca o dataset completo
	if(dataset != null && dataset.rowsCount > 0){ //se o dataset tem registros 
		for(var i=0; i < dataset.getRowsCount(); i++) {   							
			if ((SAFRAID.indexOf(dataset.getValue(i, "SAFRA") == -1)) && (GRUPOVENDASID.indexOf(dataset.getValue(i, "GRUPOVENDAS") == -1))) {
				newdataset.deleteRow([
					ifNull(dataset.getValue(i, "_classname"), ""),
					ifNull(dataset.getValue(i, "CROPLINE"), ""),
					ifNull(dataset.getValue(i, "DESCGRUPOVENDAS"), ""),
					ifNull(dataset.getValue(i, "GESTOR"), ""),
					ifNull(dataset.getValue(i, "GRUPOVENDAS"), ""),
					ifNull(dataset.getValue(i, "LIMITECALCULADO"), ""),
					ifNull(dataset.getValue(i, "LIMITECLEAN"), ""),
					ifNull(dataset.getValue(i, "LIMITEDISPONIVEL"), ""),
					ifNull(dataset.getValue(i, "LIMITETEMPORARIO"), ""),
					ifNull(dataset.getValue(i, "MOEDA"), ""),
					ifNull(dataset.getValue(i, "PEDIDOSBLOQUEADOS"), ""),
					ifNull(dataset.getValue(i, "PEDIDOSCARTEIRA"), ""),
					ifNull(dataset.getValue(i, "PEDIDOSLIBERADOS"), ""),
					ifNull(dataset.getValue(i, "SAFRA"), ""),			
					ifNull(dataset.getValue(i, "SALDODUPLICATAS"), ""),			
					ifNull(dataset.getValue(i, "SALDOVENCIDO"), ""),
					ifNull(dataset.getValue(i, "APROVADO"), "")
				]);
			}
		}		
	}	
	
	return newdataset;
	
}

var verificaDataset = function(gestor, safra,  grupo){	
	var c1 = DatasetFactory.createConstraint('GESTOR', gestor, gestor, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint('GRUPOVENDAS', grupo, grupo, ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint('SAFRA', safra, safra, ConstraintType.MUST);
	var dataset = DatasetFactory.getDataset('ds_consultaAprovacaoDeCredito', null, new Array(c1, c2, c3), null);
	if (dataset.getRowsCount() > 0) {
		return true;
	}
	return false;
}


// =================================================================
// VALIDA APROVAÇÕES JÁ REALIZADAS
// =================================================================

function checkAprovacoes(gestor, safra, grupo) {  
	
	log.info(">>> VERIFICA SE FOI APROVADO >>");
	log.info(gestor+"|"+safra+"|"+grupo);

    var c1 = DatasetFactory.createConstraint('totvsid', gestor.trim(), gestor.trim(), ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint('metadata#active', 'true', 'true', ConstraintType.MUST);
    var dataset = DatasetFactory.getDataset('dsAprovacaoCredito', null, new Array(c1, c2), null);
    var retorno  = false;         
    for (var i = 0; i < dataset.getRowsCount(); i++) {
        var documentid = dataset.getValue(i,'documentid');
        var version = dataset.getValue(i,"version");                  
        var check = searchAprovacoes(documentid, version, safra.trim(), grupo.trim());                        
        if(check){
            retorno = true; 
            break;
		}
		
		log.info(documentid+"|"+version);
	}
	
	
	log.info(retorno);
	log.info(">>> FIM VERIFICA SE FOI APROVADO >>");

    return retorno;

}

//Busca informações da tabela PAIxFILHO
function searchAprovacoes(documentId, documentVersion, safra, grupo){        
    var tbfilho = "itensCredito";
    
    //Cria as constraints para buscar os campos filhos, passando o tablename, número da formulário e versão    
    var c1 = DatasetFactory.createConstraint("tdsafra", safra, safra, ConstraintType.MUST); 
    var c2 = DatasetFactory.createConstraint("tdaprovacao", grupo, grupo, ConstraintType.MUST);             
    var c3 = DatasetFactory.createConstraint("tablename", tbfilho, tbfilho, ConstraintType.MUST);     
    var c4 = DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST); 
    var c5 = DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST); 
    var c6 = DatasetFactory.createConstraint('metadata#active', true, true, ConstraintType.MUST);
    var filho = DatasetFactory.getDataset("dsAprovacaoCredito", null, new Array(c1, c2, c3, c4, c5, c6),  null); 
                  
    if(filho.getRowsCount() > 0 ) return true;
    
    return false; 
}

var ifNull = function(value, ifNullValue) {
    return value === null || value === "" ? ifNullValue : value;
}