<style>

  body {
    margin: 40px 10px;
    padding: 0;
    font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
    font-size: 14px;
  }

 
  #calendar {
    max-width: 900px;
    margin: 0 auto;
  }

  #cabecalho{
  	background-color: #2c3e50;
  	align-items: center;
  }

  #titulo{
  	color: #FFFF;
  }

</style>
</head>
<body>

  <div id="cabecalho">
  	<h4 id="titulo">Agenda Ethos X</h4>
  </div>

    <div class="col-md-12" >
	  <table class="">
        <thead>
            <tr class="success">                        
                <th class="text-center">Colaborador</th>                           
            </tr>
        </thead>
        <tbody>
            <tr>                                                              
                <td>
                    <select id="slcUser" class="form-control">
                    	<option value="">Selecione Colaborador</option>
                    	<option value="1">Hiago Oliveira</option>
                    	<option value="2">Maria de Paula</option>
                    </select>
                </td>                                                
            </tr>
        </tbody>
    </table>
    </div> 


  <div id='calendar'>
  	
  </div>

</body>

<script type="text/javascript">
	
	$("#dataAtual").val(moment().format('DD/MM/YYYY'));
</script>
