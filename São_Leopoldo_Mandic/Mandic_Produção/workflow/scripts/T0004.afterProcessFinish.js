function afterProcessFinish(processId){

	 var atv = hAPI.getCardValue("ATIVIDADEATUAL");

	  if (atv == 2 ) {
      var reprovado    = hAPI.getCardValue("QTDREPROVADOFIN");
      var aprovado     = hAPI.getCardValue("QTDAPROVADOFIN");

    } else if (atv == 8 ) {
          var reprovado    = hAPI.getCardValue("QTDREPROVADOMAN");
          var aprovado     = hAPI.getCardValue("QTDAPROVADOMAN");
            }

  var qtditens     = parseFloat(reprovado) + parseFloat(aprovado);
  var numProcess   = getValue("WKNumProces");
  var itens        = hAPI.getCardData(numProcess);
  var codcoligada  = hAPI.getCardValue("CODCOLIGADA");
  var codcotacao   = hAPI.getCardValue("txtCodCotacao");
  var codfilial    = hAPI.getCardValue("CODFILIAL");
  var codloc       = "001";
  var codtmv       = "1.1.18";
 
        
    if (aprovado == '0000') {

          desbloqueiaCotacao( codcoligada, codcotacao);
            
    } else {

          log.info("*** CRM *** - Iniciando Geração de Movimento para o Processo >> "+numProcess);

            geraMov (numProcess, codcoligada, codfilial, codloc, codtmv);
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

function geraMov (numProcess, codcoligada, codfilial,codloc,codtmv){
    
    var NOME_DATASERVER = "MovMovimentoTBCData";  
    var usuario         = "mestre"; 
    var senha           = "FR5G1I2EmFdNkE00SUYO";          
    var authService     = getWebService(usuario, senha);  
    var context         = "CodUsuario=mestre;CodSistema=T;CodColigada="+codcoligada;
    var nseq            = 0;
    var historicoMOV    = "";
    var codcolcfo       = hAPI.getCardValue("CODCOLCFO");
    var codcfo          = hAPI.getCardValue("CODCFO");
    var codcpg          = hAPI.getCardValue("CODCPG");
    var codcotacao   	  = hAPI.getCardValue("txtCodCotacao");
    var CODVEN          = hAPI.getCardValue("CODVEN");

    
    var XML = 
            "<MovMovimento >" +   
            "  <TMOV>" +   
            "    <CODCOLIGADA>"+codcoligada+"</CODCOLIGADA>" +   
            "    <IDMOV>-1</IDMOV>" +   
            "    <CODFILIAL>"+codfilial+"</CODFILIAL>" +   
            "    <CODLOC>"+codloc+"</CODLOC>" +    
            "    <CODLOCDESTINO>"+codloc+"</CODLOCDESTINO>" +   
            "    <CODTMV>"+codtmv+"</CODTMV>" +   
            "    <TIPO>A</TIPO>" +   
            "    <DATAEMISSAO>"+dataAtualFormatada()+"</DATAEMISSAO>" +   
            "    <DATABASEMOV>"+dataAtualFormatada()+"</DATABASEMOV>" +  
            "    <DATAENTREGA>"+dataentrega()+"</DATAENTREGA>"+ 
            "    <DATAMOVIMENTO>"+dataAtualFormatada()+"</DATAMOVIMENTO>" +   
            "    <CODFILIALDESTINO>"+codfilial+"</CODFILIALDESTINO>" +      
            "    <DATALANCAMENTO>"+dataAtualFormatada()+"</DATALANCAMENTO>" +   
            "    <CODCOLCFO>"+codcolcfo+"</CODCOLCFO>"+
            "    <CODCFO>"+codcfo+"</CODCFO>"+
            "    <CODCPG>"+codcpg+"</CODCPG>"+
            "    <CODCCUSTO>4.01.07.006</CODCCUSTO>"+
            "	   <CAMPOLIVRE1>"+codcotacao+"</CAMPOLIVRE1>"+
            "    <CODVEN1>"+CODVEN+"</CODVEN1>" +
            "    <CODVEN2>9999</CODVEN2>" +
            "    <CODVEN3>9999</CODVEN3>" +
            "    <CODVEN4>9999</CODVEN4>" +
            "    <HISTORICOLONGO>"+historicoMOV+"</HISTORICOLONGO>" +
            "  </TMOV>" +  
            
            "  <TNFE>" +   
            "    <CODCOLIGADA>"+codcoligada+"</CODCOLIGADA>" +   
            "    <IDMOV>-1</IDMOV>" +   
            "  </TNFE>" +   
            "  <TMOVFISCAL>" +   
            "    <CODCOLIGADA>"+codcoligada+"</CODCOLIGADA>" +   
            "    <IDMOV>-1</IDMOV>" +   
            "  </TMOVFISCAL>" ;


    var itens = hAPI.getCardData(numProcess);
    var keys = itens.keySet().toArray();
    for (var key in keys) {
      var field = keys[key];

      if (field.indexOf("comAprMantenedora___") > -1) {
        
          var index = field.replace("comAprMantenedora___", ""); 
          var aprovado = hAPI.getCardValue("comAprMantenedora___"+index);

            log.info("============ MOVIMENTO APROVADO "+aprovado);
          
          if (aprovado == "S"){

              log.info("*** CRM *** ITEM APROVADO ");
          
              var idprd = hAPI.getCardValue("IDPRD___"+index);

              var qtdSolicitada = hAPI.getCardValue("txtQuantidade___"+index);
              
              var precounitario = hAPI.getCardValue("txtPrecoUnitario___"+index);
              var codccusto = hAPI.getCardValue("CODCCUSTO___"+index);
              var historicoITMMOV = hAPI.getCardValue("txtHistoricoITMMOV___"+index);
              var IDMOVORIGEM = hAPI.getCardValue("IDMOVORIGEM___"+index);
              var NSEQITMMOV = hAPI.getCardValue("NSEQITMMOV___"+index);
              var RASTRIABILIDADE = IDMOVORIGEM+";"+NSEQITMMOV;

                qtd = qtdSolicitada.replace( ".", "" );
                qtd = qtd.replace( ".", "" );
                qtd = qtd.replace( ".", "" );

                  log.info("*** CRM *** Quantidade "+qtd);

                  precounit = precounitario.replace( ".", "" );
                  precounit = precounit.replace( ".", "" );
                  precounit = precounit.replace( ".", "" );
                  
                  if ((qtdSolicitada != null) || (qtdSolicitada != 0)) {

                  var nseq = index; 

                  XML = XML +    
                        "  <TITMMOV>" +   
                        "    <CODCOLIGADA>"+codcoligada+"</CODCOLIGADA>" +   
                        "    <IDMOV>-1</IDMOV>" +   
                        "    <NSEQITMMOV>"+nseq+"</NSEQITMMOV>" +   
                        "    <CODFILIAL>"+codfilial+"</CODFILIAL>" +   
                        "    <NUMEROSEQUENCIAL>"+nseq+"</NUMEROSEQUENCIAL>" +   
                        "    <IDPRD>"+idprd+"</IDPRD>" +
                        "    <QUANTIDADE>"+qtd+"</QUANTIDADE>" +   
                        "    <PRECOUNITARIO>"+precounit+"</PRECOUNITARIO>" +   
                        "    <DATAEMISSAO>"+dataAtualFormatada()+"</DATAEMISSAO>" +     
                        "    <CODLOC>"+codloc+"</CODLOC>" +   
                        "    <CODCCUSTO>"+codccusto+"</CODCCUSTO>"+
                        "    <CAMPOLIVRE>"+RASTRIABILIDADE+"</CAMPOLIVRE>"+
                        "    <HISTORICOLONGO>"+historicoITMMOV+"</HISTORICOLONGO>"+     
                        "  </TITMMOV>"; 
                  }

              }
            
        }              
    }

       log.info( "*** CRM ***  NSEQ - "+nseq+"  XML do movimnto é "+XML);

   if (nseq > 0){

        XML = XML +    
           "  <TMOVCOMPL>" +   
           "    <CODCOLIGADA>"+codcoligada+"</CODCOLIGADA>" +      
           "    <IDMOV>-1</IDMOV>" +   
           "    <NUMFLUIG>"+numProcess+"</NUMFLUIG>" +
           "  </TMOVCOMPL>"+                      
           "</MovMovimento>";
        
        log.info( "*** CRM *** XML do movimnto é "+XML);
       
       
       try{
          
           var result = new String(authService.saveRecord(NOME_DATASERVER, XML, context));

           log.info("*** CRM *** Fluig "+numProcess+".integracao com RM resultado  VER IDMOV - "+result);
           
           
           if (result.length > 20){
             var mensagemErro = result;  
             throw mensagemErro; 
           } else {

                  var idmov = result.substring(result.search(";")+1,result.length);
                  hAPI.setCardValue("IDMOV",idmov);
                }
        }  
      
       
        catch (e)   
        {  
            if (e == null) e = "*** CRM *** Erro desconhecido!";  
            
            var mensagemErro = "*** CRM *** Ocorreu um erro ao salvar dados no RM (coligada "+codcoligada+" ): " + e;  
            
            throw mensagemErro;  
        }
    }

}

function dataentrega(){
    
    var data = new Date();
    data.setDate(data.getDate()+ 15 );
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
