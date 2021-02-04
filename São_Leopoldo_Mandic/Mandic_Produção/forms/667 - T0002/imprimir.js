function printDiv(divName) {
	//var printContents = document.getElementById(divName).innerHTML;
	var originalContents = document.body.innerHTML;
	
	HTML = 
		 '<HTML align="top">'+
		 ' <head>	'+
		 /*'  <link type="text/css" rel="stylesheet" href="/portal/resources/style-guide/css/fluig-style-guide.min.css"/>	'+
		 '	<script type="text/javascript" src="/portal/resources/js/jquery/jquery.js"></script>	'+
		 '	<script type="text/javascript" src="/portal/resources/js/jquery/jquery-ui.min.js"></script>	'+
		 ' 	<script type="text/javascript" src="/portal/resources/js/mustache/mustache-min.js"></script>	'+
		 '	<script type="text/javascript" src="/portal/resources/style-guide/js/fluig-style-guide.min.js" charset="utf-8"></script>	'+*/
		 //'  <link rel="stylesheet" href="print-style.css" type="text/css" media="print" />'+
		 ' <link rel="stylesheet" href="css/style.css"/> ' +
		 '  <style type="text/css" media="print">'+

		 '    @page {'+
		 '       size: landscape;'+
		 '       margin: 0.5cm;'+

		 ' }  '+
		 
		 ' 		 @media print {'+
		 ' 			  * { margin: 0 !important; padding: 0 !important; }'+
		 ' 			  #controls, .footer, .footerarea{ display: none; }'+
		 ' 			  html, body {'+
		 ' 			    height:100%; '+
		 ' 			    overflow: hidden;'+
		 ' 			    background: #FFF; '+
		 ' 			    font-size: 9.5pt;'+
		 ' 			  }'+

		 ' 			  .template { width: auto; left:0; top:0; }'+
		 ' 			  img { width:100%; }'+
		 ' 			  li { margin: 10px 10px 10px 20px !important;}'+
		 ' 	}		 '+

		 		 
		 '  </style>'+


		 ' </head>	'+	

		 '<BODY align="top"> '+
		 //'  <div id="logo2" name="logo2"><img src="logo.png" height="100" width="300"></div>'+
		 '  <div id="logo2" name="logo2"><img src="logo2.png" class="print"  style="width:10%"></div>'+
		 '  <table style="width:100%">'+
		 '  <tr>'+
		 '     <td style="text-align:left;"> REQUISIÇÃO DE MATERIAIS</th>'+
		 '     <td style="text-align:left;"> Requisição No <B>'+$('input[name="txtNumeroProcesso"]').val()+'</B></th>'+
		 '  </tr>'+
		 '  <tr>'+
		 '     <td style="text-align:left;">SOCIEDADE REGIONAL DE ENSINO E SAÚDE LTDA</th>'+
		 '     <td style="text-align:left;">Data: '+$('input[name="txtData"]').val()+'</th>'+
		 '  </tr>'+		 
		 '  <tr>'+
		 '     <td style="text-align:left;">RUA: ABOLIÇÃO, 1827 - BAIRRO: SWIFT</th>'+
		 '     <td style="text-align:left;">Solicitante: '+$('input[name="txtSolicitanteRM"]').val()+'</th>'+
		 '  </tr>'+		
		 '  <tr>'+
		 '     <td style="text-align:left;">CEP: 13045620 Campinas/SP</th>'+
		 '     <td style="text-align:left;">Telefone: </th>'+
		 '  </tr>'+		
		 '  <tr>'+
		 '     <td style="text-align:left;">CNPJ: 04.600.555/0001-25 IE: ISENTO</th>'+
		 '     <td style="text-align:left;">E-mail: </th>'+
		 '  </tr>'+		
		 
		 '  </table>'+
		 '  <table style="border:1px solid black;border-collapse:collapse;" >'+
		 '	<thead> '+
		 '		<tr class="tableHeadRow"> '+
		 '			<th class="tableColumn" style="border:1px solid black;text-align:center;width:5%;">SEQ</th> '+
		 '			<th class="tableColumn" style="border:1px solid black;text-align:center;width:40%;">CENTRO CUSTO</th> '+		 
		 '			<th class="tableColumn" style="border:1px solid black;text-align:center;width:10%;">CÓDIGO</th> '+
		 '			<th class="tableColumn" style="border:1px solid black;text-align:center;width:35%;">DESCRIÇÃO DO MATERIAL/SERVIÇO</th> '+
		 '			<th class="tableColumn" style="border:1px solid black;text-align:center;width:5%;">UN</th> '+
		 '			<th class="tableColumn" style="border:1px solid black;width:5%;">QTDE</th> '+		
		 '			<th class="tableColumn" style="border:1px solid black;width:5%;">CHECK</th> '+	
		 '		</tr> '+
		 '	</thead> '+	 
		 '  <tbody> ';
	
		$("input").each( function(index, value) {
			 var name = $(this).attr('id');
			                           
			 if ( Left( name, 10 ) == "CODIGOPRD_" ){
				 item = name.substring(9,20);
				 centrocusto = $("[name='txtCodCCusto"+item+"']").val();
				 codprod     = $("[name='CODIGOPRD"+item+"']").val();
				 descricao   = $("[name='txtcodigoPRD"+item+"']").val().replace(codprod+' - ',"");
				 unidade     = 'UN';
				 quantidade  = $("[name='txtEstoque"+item+"']").val();
				 HTML = HTML +
					 '	  <tr class="tableBodyRow">	 '+	
					 '		<td style="border:1px solid black;text-align:center;width:5%;">'+item.replace("___","")+'</td> '+ 
					 '		<td style="border:1px solid black;text-align:center;width:40%;">'+centrocusto+'</td> '+
					 '		<td style="border:1px solid black;text-align:center;width:10%;">'+codprod+'</td> '+		 
					 '		<td style="border:1px solid black;text-align:left;width:35%;">'+descricao+'</td> '+		
					 '		<td style="border:1px solid black;text-align:center;width:5%;">'+unidade+'</td> '+		
					 '		<td style="border:1px solid black;text-align:right;width:5%;">'+quantidade+'</td> '+		
					 '		<td style="border:1px solid black;text-align:right;width:5%;"></td> '+	
					 '    </tr> ' ;	
			 }
		});

		 
		HTML = HTML +	 

	     '  </tbody> '+
		 '  </table> '+		
		 ' <br/> <br/> <br/> <br/> <br/> <br/>'+
		 '  <table style="width:100%">'+
			 
			 '  <tr>'+
			 '     <td style="width:70%"></th>'+
			 '     <td style="text-align:center;">______________________________</th>'+
			 '  </tr>'+
			 '  <tr>'+
			 '     <td style="width:70%"></th>'+			 
			 '     <td style="text-align:center;"><B>Solicitante</B></th>'+
			 '  </tr>'+
			 '  <tr>'+
			 '     <td style="width:70%"></th>'+			 
			 '     <td style="text-align:center;">'+$('input[name="txtSolicitanteRM"]').val()+'</th>'+
			 '  </tr>'+		 
		 '  </table>'+
		 
	 
	     '</BODY>'+
		 '</HTML>';
     
    document.body.innerHTML = HTML; 

    window.print();

    document.body.innerHTML = originalContents;
}