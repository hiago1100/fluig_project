<!DOCTYPE html>
<html>
<head>
<link type="text/css" rel="stylesheet" href="/style-guide/css/fluig-style-guide.min.css"/>
<meta charset='utf-8' />

<style>


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

    <div class="col-md-12">
	  <table class="table">
        <thead>
            <tr class="success">                        
                <th class="text-center">Adicionar Agenda</th>
                <th class="text-center">Remover Agenda</th>                           
            </tr>
        </thead>
        <tbody>
            <tr>                                                              
                <td align="center">
                <a href="http://201.30.92.104:9080/portal/p/ethosx/pageworkflowview?processID=cadastro_agenda" _blank>	
				<img src="http://201.30.92.104:9080/webdesk/streamcontrol/addAgenda.png?WDCompanyId=1&WDNrDocto=73&WDNrVersao=1000">
				</a>
                </td>
                <td align="center">
                <a href="">	
				<img src="http://201.30.92.104:9080/webdesk/streamcontrol/delAgenda.png?WDCompanyId=1&WDNrDocto=74&WDNrVersao=1000" style="width: 81px;">
				</a>
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
</html>
