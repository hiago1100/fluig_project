<!DOCTYPE>
<html>
<head>
	
  

<link rel="stylesheet" type="text/css" href="/portal/resources/style-guide/css/fluig-style-guide.min.css">


  <script type="text/javascript" src="http://viaportal.com.br/webdesk/vcXMLRPC.js"></script>


  <script type="text/javascript">
  	


  	function telefonesUteis(){


  var tituloAux;
  var telefoneAux;
  var textAux = "";
  var sortingFields = null;
  var fields = null;		 

  		 try {


          
     var constraints = DatasetFactory.createConstraint('sqlLimit', '5', '5', ConstraintType.MUST);

     var dataset = DatasetFactory.getDataset("verificar_tel", fields,new Array(constraints), sortingFields);

          for(i = 0; i < dataset.values.length; i++) {

          
           var row = dataset.values[i];

            tituloAux = row["titulo"];
            telefoneAux = row["telefone"]; 

           

            textAux += "<tr align=\"center\" class=\"telefones\">";
            textAux += "<td>";
            textAux += "" + tituloAux + "";
            textAux += "</td>";
            textAux += "<td>";
            textAux += "" + telefoneAux + "";
            textAux += "</td>";
            textAux += "</tr>";


           } 
       }catch(erro) {
    	     	alert(erro);
   		   } 
		

   		   $("#tableTel").html(textAux);
   	

   		   	return textAux;
		}

	
		function Modal(){

  var textoHtml = "";


textoHtml += "<iframe width=\"100%\" height=\"850\" src=\"http://viaportal.com.br/webdesk/zoom.jsp?datasetId=Dediq_telefones&dataFields=titulo,titulo,telefone,telefone&resultFields=titulo,titulo,telefone,telefone&type=transportadores&filterValues=metadata_active,true&title=Transportadores\"></iframe>";


	var myModal = FLUIGC.modal({
    title: 'Telefones Úteis',
    content: textoHtml ,
    id: 'fluig-modal',
    size: 'large',
   
}, function(err, data) {
    if(err) {
        // do error handling
    } else {
        // do something with data
    }
});


		            
       
   		}

function inicializar(){
telefonesUteis();
	
}

  </script>



<style type="text/css">
	
.telefones{
	border-bottom: #C0C0C0 1px solid;
	

}

.telefones:hover{
	background-color: 	#DCDCDC	;
}

.telefones,td{
	padding: 2%;
}

.wcm_title_widget{
	display: none;
}



</style>

</head>
<body onload="inicializar()">
<form>
	<div class="fluig-style-guide">
      <div class="panel panel-default">
	    <div class="panel-heading" align="center">
	        <h3 class="panel-title">Telefones Úteis <span class="fluigicon fluigicon-phone fluigicon-md"></span></h3>
	    </div>
	    <div class="panel-body" align="center">

	    <table width="100%">	
	    <tbody id="tableTel">
	    	
	    </tbody>
	     </table> 
	
	    
	    </div>
	    <div align="right">
	<button onclick="Modal()" class="btn btn-default btn-xs" type="button" data-myModal-modal>Ver tudo</button>  
	</div> 
</div>
    </div>
		
</form>





</body>

<script type="text/javascript">
	



</script>
</html>