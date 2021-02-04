function afterProcessFinish(processId){

var numProcess   = getValue("WKNumProces");
  
    log.info("*** CRM *** -Finalizando a geração do Processo T0004 - Processo número: "+numProcess);
     
     var reprovado    = hAPI.getCardValue("QTDREPROVADOCCU");
     var aprovado     = hAPI.getCardValue("QTDAPROVADOCCU");
     var qtditens     = parseFloat(reprovado) + parseFloat(aprovado);
     var codcoligada  = hAPI.getCardValue("CODCOLIGADA");
     var codcotacao   = hAPI.getCardValue("txtCodCotacao");
     var codcfo       = hAPI.getCardValue("CODCFO");
     var codcolcfo    = hAPI.getCardValue("CODCOLCFO");
     var itens        = hAPI.getCardData(numProcess);
     var soma         = 0;
     
     if(aprovado == "0000"){
    	
        	 log.info("*** CRM *** -Cotação Reaberta - "+codcotacao );
        	 desbloqueiaCotacao( codcoligada, codcotacao);
        	 
        	 
        	 
         } else {

                    var c1 = DatasetFactory.createConstraint("CODCOLIGADA", codcoligada, codcoligada, ConstraintType.MUST);
                    var c2 = DatasetFactory.createConstraint("CODCOTACAO", codcotacao, codcotacao, ConstraintType.MUST);

                    var constraints   = new Array(c1,c2);

                    var datasetCOT = DatasetFactory.getDataset("dsNumAprCotacoes", null, constraints, null);

                    var processos = datasetCOT.getValue(0,"SEGUNDONUMERO");

                      log.info("*** CRM *** - Entrei no num Processo "+numProcess);
                      log.info("*** CRM *** - Segundo Numero COTACAO "+processos);



                    var c3 = DatasetFactory.createConstraint("PROCESSOS", processos, processos, ConstraintType.MUST);
                    var c4 = DatasetFactory.createConstraint("CODCOLCFO", codcolcfo, codcolcfo, ConstraintType.MUST);
                    var c5 = DatasetFactory.createConstraint("CODCFO", codcfo, codcfo, ConstraintType.MUST);

                     var constraints   = new Array(c1,c2,c3,c4,c5);

                      var dataset = DatasetFactory.getDataset("dsAprCotacoes", null, constraints, null);

                      var CotacaoAbertas = dataset.getValue(0,"NUMERO");

                       log.info("*** CRM *** - Variavel quantas Cotações "+CotacaoAbertas);
                  
    if ((CotacaoAbertas <= 1) || (CotacaoAbertas == null))  {
                  
                      log.info("*** CRM *** - Junta todas as Cotações "+numProcess);

                      log.info("*** CRM *** T003 processos>> "+processos);

                      var c3 = DatasetFactory.createConstraint("PROCESSOS", processos, processos, ConstraintType.MUST);
                      
                      var constraints   = new Array(c1,c2,c3,c4,c5);

                      var datasetFIN = DatasetFactory.getDataset("dsAprCotacoesFIN", null, constraints, null);

                      var users = new java.util.ArrayList();
                      users.add("d112e810-e496-49f8-81d3-f51917e879cb"); //matricula da Susana

                      var rowsCount = datasetFIN.values.length;

                      log.info("*** CRM *** - Linhas do Itens "+rowsCount);

                       var i = 0;
              
                    while (i<rowsCount){

                      var formData = new java.util.HashMap();

                      formData.put("txtCodCotacao", datasetFIN.getValue(i,"txtCodCotacao"));
                      formData.put("CODCOLCFO", datasetFIN.getValue(i,"CODCOLCFO"));
                      formData.put("CODCFO",datasetFIN.getValue(i,"CODCFO"));
                      formData.put("CODCOLIGADA", datasetFIN.getValue(i,"CODCOLIGADA"));
                      
                      
                     log.info("*** CRM *** Fornecedor >>"+datasetFIN.getValue(i,"CODCFO"));

                     log.info("*** CRM *** Inicio a Inclusao por Fornecedor >>"+formData);

                    var New_process = hAPI.startProcess("T0004", 0,users, "Gerado T003", true, formData, false);                 

                    log.info("*** CRM *** T0004 - CRIADO COM SUCESSO NUMERO : " + New_process);
                    
                    i = i + 1;
                    }
            
    }
  }
}

function desbloqueiaCotacao(codcoligada, codcotacao){

 var NOME_DATASERVER = "CmpCotacaoData";  
  
      var usuario = "mestre";  
      var senha = "FR5G1I2EmFdNkE00SUYO";  
      var context = "CodUsuario=mestre;CodSistema=G;CodColigada="+codcoligada;  
      var authService = getWebService(usuario, senha);  
      
           text = 
              "<CmpCotacao>" +   
              "  <TCCOTACAO>" +   
              "    <CODCOTACAO>"+codcotacao+"</CODCOTACAO>" +   
              "    <CODCOLIGADA>"+codcoligada+"</CODCOLIGADA>" + 
              "    <STSCOTACAO>5</STSCOTACAO>"+  
              "    <SEGUNDONUMERO>FLUIG</SEGUNDONUMERO>" +   
              "  </TCCOTACAO>" +   
              "</CmpCotacao>";  
        
        log.info("*** CRM ***  xml da cotacao "+text);

        var result = new String(authService.saveRecord(NOME_DATASERVER, text, context));   

        log.info("*** CRM ***  xml da cotacao "+result);
     
}  
function dataAtualFormatada(){
    
    var data = new Date();
    var dia = data.getDate();
    if (dia.toString().length == 1)
      dia = "0"+dia;
    var mes = data.getMonth()+1;
    if (mes.toString().length == 1)
      mes = "0"+mes;
    var ano = data.getFullYear();  
    return ano+"-"+mes+"-"+dia;
}


/**'
* A API de autenticação da Totvs baseia no "Basic access authentication" do HTTP.
* Código Java para autenticação 
* Programa responsável por integrar com os Webservices do RM 
*  Exemplo dev valores para os parâmetros 
*       @param string Usuario = "mestre";
*       @param string Senha = "totvs";
*/

function getWebService(Usuario, Senha){

 var Nome_Servico = "WS";
 var Caminho_Servico = "com.totvs.WsDataServer";
 
    var dataServerService = ServiceManager.getServiceInstance(Nome_Servico);
    if(dataServerService == null){
        throw "Servico nao encontrado: " + Nome_Servico;
    }
    
    var serviceLocator = dataServerService.instantiate(Caminho_Servico);
    if(serviceLocator == null){
        throw "Instancia do servico nao encontrada: " + Nome_Servico + " - " + Caminho_Servico;
    }

    var service = serviceLocator.getRMIwsDataServer();  
    if(service == null){
        throw "Instancia do dataserver do invalida: " + Nome_Servico + " - " + Caminho_Servico;
    }

    var serviceHelper = dataServerService.getBean();
    if(serviceHelper == null){
        throw "Instancia do service helper invalida: " + Nome_Servico + " - " + Caminho_Servico;
    }

    var authService = serviceHelper.getBasicAuthenticatedClient(service, "com.totvs.IwsDataServer", Usuario, Senha);      
    if(serviceHelper == null){
        throw "Instancia do auth service invalida: " + Nome_Servico + " - " + Caminho_Servico;
    }
    
    return authService;
}


function dcReadView(dataservername, context, usuario, senha, filtro)
{    
   // carrega o webservice...
      var authService = getWebService(usuario, senha);
      
   // lê os dados da visão respeitando o filtro passado
      var viewData = new String(authService.readView(dataservername, filtro, context));

      return viewData;
}


function dcReadRecord(dataservername, context, usuario, senha, primaryKey)
{    
   // carrega o webservice...
      var authService = getWebService(usuario, senha);

   // lê os dados do registro respeitando a pk passada
      try
      {
        var recordData = new String(authService.readRecord(dataservername, primaryKey, context));
      }
      catch (e) 
      {
          var recordData = new String(authService.getSchema(dataservername, context));
      }
      
      return recordData;
}


function dcSaveRecord(dataservername, context, usuario, senha, xml)
{    
   // carrega o webservice...
      var authService = getWebService(usuario, senha);

   // salva o registro de acordo com o xml passado
      var pk = new String(authService.readRecord(dataservername, xml, context));
          
      return pk;
}


//Transforma o conceito de constraints do Fluig para o Filtro do TBC.
function parseConstraints(constraints, filterRequired)
{
    // inicializa o resultado...
    var result = [];
    result.context = "";
    
    // inicializa o filtro...
    var filter = "";
    
    // varre as contraints...
 for    (con in constraints) {
    var fieldName = con.getFieldName().toUpperCase();
    if (fieldName == "RMSCONTEXT")
    {
        result.context = con.getInitialValue();
        continue;
    }
    
    filter += "(";
    
    if (fieldName == "RMSFILTER")
        {
        filter += con.getInitialValue();
        }
    else
        {
        if (con.getInitialValue() == con.getFinalValue() || isEmpty(con.getFinalValue()))
            {
                filter += con.getFieldName();
                var isLike = false;
                switch(con.getConstraintType())
                {
                    case ConstraintType.MUST:
                        filter += " = ";
                    break;
                    case ConstraintType.MUST_NOT:
                        filter += " = ";
                    break;
                    case ConstraintType.SHOULD:
                        filter += " LIKE ";
                        isLike = true;
                    break;
                    case ConstraintType.SHOULD_NOT:
                        filter += " NOT LIKE ";
                        isLike = true;
                    break;
                }
                filter += getFormattedValue(con.getInitialValue(), isLike);
            }
        else
            {
            filter += con.getFieldName();
            filter += " BETWEEN ";
            filter += getFormattedValue(con.getInitialValue(), false);
            filter += " AND ";
            filter += getFormattedValue(con.getFinalValue(), false);
            }
        }
    
        filter += ") AND ";
    }
 
 if (filter.length == 0)
 {
    if(filterRequired){
      filter = "1=1";
    }
    else{
      filter = "1=1";
    }
 }
 else
    filter = filter.substring(0, filter.length-5);
 
 // guarda o filtro...
 result.filter = filter;
 
 // retorna o resultado...
 return result;
}

function isEmpty(str) {
 return (!str || 0 === str.length);
}

function getFormattedValue(value, isLike){
    if(isLike){
      return "'%" + value + "%'";
    }
    else{
      return "'" + value + "'";
    }
}



function getXMLFromString(xmlString) {
    var factory = javax.xml.parsers.DocumentBuilderFactory.newInstance();
    var parser = factory.newDocumentBuilder();
    var is = new org.xml.sax.InputSource();
 is.setCharacterStream(new java.io.StringReader(xmlString));
    return parser.parse(is);
}


function abrirPesquisa(DATASET_ID, dataFields, resultFields, type, title){  
    window.open("/webdesk/zoom.jsp" +
    "?datasetId=" +
    DATASET_ID +
    "&dataFields=" +
    dataFields +
    "&resultFields=" +
    resultFields +
    "&type=" +
    type+
    "&title=" +
    title   
    , "zoom", "status,scroolbars=no,width=600,height=350,top=0,left=0");
}

function checkIsPK(result, qtd){
    var lines = result.split('\r');
    
    if(lines.length == 1){
        var pk = result.split(';');
        if(pk.length == qtd)
            return;
    }
        throw result;
    
}

function ChekExist(result)
{
     var lines = result.split('\r');
    if(lines.length > 1)
        return true
    else
        return false;
}


function replaceValue(text, columnName, newValue){

    
    if ((newValue != null) && (newValue.trim() != ""))
    {
        var regex = new RegExp("<" + columnName + ">(.*?)<\\/" + columnName + ">", "g");
        var replaceText = "<" + columnName + ">" + newValue + "</" + columnName + ">";
        
        return text.replace(regex, replaceText);
    }
    else
        return text;
}


function isEmpty(str) {
 return (!str || 0 === str.length);
}
function GetXml()  
{  
 return "<MovMovimento >" +   
"  <TMOV>" +   
"    <CODCOLIGADA>1</CODCOLIGADA>" +   
"    <IDMOV>0</IDMOV>" +   
"    <CODFILIAL>1</CODFILIAL>" +   
"    <CODLOC>001</CODLOC>" +   
"    <CODLOCENTREGA>001</CODLOCENTREGA>" +   
"    <CODLOCDESTINO>001</CODLOCDESTINO>" +   
"    <CODTMV>1.1.15</CODTMV>" +   
"    <TIPO>A</TIPO>" +   
"    <DATAEMISSAO>2017-12-22T00:00:00</DATAEMISSAO>" +   
"    <VALORBRUTO>6500.0000</VALORBRUTO>" +   
"    <VALORLIQUIDO>6500.0000</VALORLIQUIDO>" +   
"    <DATABASEMOV>2017-12-22T00:00:00</DATABASEMOV>" +   
"    <DATAMOVIMENTO>2017-12-22T00:00:00</DATAMOVIMENTO>" +   
"    <CODFILIALDESTINO>1</CODFILIALDESTINO>" +   
"    <CAMPOLIVRE1> ADM <CAMPOLIVRE1 />" +   
"    <HORULTIMAALTERACAO>2017-12-22T11:04:44</HORULTIMAALTERACAO>" +   
"    <DATALANCAMENTO>2017-12-22T00:00:00</DATALANCAMENTO>" +   
"  </TMOV>" +   
"  <TNFE>" +   
"    <CODCOLIGADA>1</CODCOLIGADA>" +   
"    <IDMOV>0</IDMOV>" +   
"  </TNFE>" +   
"  <TMOVFISCAL>" +   
"    <CODCOLIGADA>1</CODCOLIGADA>" +   
"    <IDMOV>0</IDMOV>" +   
"  </TMOVFISCAL>" +   
"  <TITMMOV>" +   
"    <CODCOLIGADA>1</CODCOLIGADA>" +   
"    <IDMOV>0</IDMOV>" +   
"    <NSEQITMMOV>1</NSEQITMMOV>" +   
"    <CODFILIAL>1</CODFILIAL>" +   
"    <NUMEROSEQUENCIAL>1</NUMEROSEQUENCIAL>" +   
"    <CODIGOPRD>01.02.03.0050</CODIGOPRD>" +   
"    <NOMEFANTASIA>PERFILADO 19X38 3MTS</NOMEFANTASIA>" +   
"    <QUANTIDADE>10.0000</QUANTIDADE>" +   
"    <PRECOUNITARIO>630.0000000000</PRECOUNITARIO>" +   
"    <DATAEMISSAO>2017-12-22T00:00:00</DATAEMISSAO>" +   
"    <CODUND>UN</CODUND>" +   
"    <CODLOC>001</CODLOC>" +   
"    <NSEQITMMOV1>1</NSEQITMMOV1>" +   
"  </TITMMOV>"+   
"  <TMOVCOMPL>" +   
"    <CODCOLIGADA>1</CODCOLIGADA>" +   
"    <IDMOV>0</IDMOV>" +   
"  </TMOVCOMPL>"+   
"</MovMovimento>";  
   
}  
