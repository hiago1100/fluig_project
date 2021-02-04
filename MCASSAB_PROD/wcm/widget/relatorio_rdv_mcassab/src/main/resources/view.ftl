<!DOCTYPE>
<html>
<head>
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
<!-- Optional theme -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
<!-- Latest compiled and minified JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
<!-- BIBLIOTECAS FLUIG -->
<link rel="stylesheet" type="text/css" href="/style-guide/css/fluig-style-guide.min.css">

<!-- BIBLIOTECAS FLUIG -->
<script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>
<link rel="stylesheet" type="text/css" href="/style-guide/css/fluig-style-guide-filter.min.css">
<script src="/style-guide/js/fluig-style-guide-filter.min.js"></script>
<!-- datatable -->
<script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.js"></script>
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css">  

<script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/buttons/1.5.2/js/dataTables.buttons.min.js"></script>
<script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/buttons/1.5.2/js/buttons.flash.min.js"></script>
<script type="text/javascript" charset="utf8" src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
<script type="text/javascript" charset="utf8" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/pdfmake.min.js"></script>
<script type="text/javascript" charset="utf8" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/vfs_fonts.js"></script>
<script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/buttons/1.5.2/js/buttons.html5.min.js"></script>
<script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/buttons/1.5.2/js/buttons.print.min.js"></script>
<!-- datatable -->

</head>
<body>	
<div class="fluig-style-guide">
<!-- HIDE -->
<input type="hidden" name="codUser" id="codUser" class="form-control">
<!-- /HIDE -->
<div id="RDV_Panel_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="rdv_panel.instance()">

<div class="panel-heading text-center no-border-radius">
  <h3><i class="fas fa-tachometer-alt"></i> Relat&oacute;rio de Despesas</h3>
</div> <!-- /.panel-header -->


<div class="panel panel-primary no-border-radius col-xs-12 col-sm-12 col-md-12 col-lg-12">
<div class="row">

<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-t-10 m-b-10 text-center center">
  <ul class="nav nav-pills list-inline text-center" role="tablist" id="myTabs">
    <li role="presentation" class="active">
    	<div class="mask"></div>
    	<a href="#porData" aria-controls="porData" role="pill" data-toggle="pill" class="btn btn-lg btn-primary">
    		<i class="glyphicon glyphicon-gift"></i> Despesas por Data
    	</a>
    </li>
    <li role="presentation">
    	<div class="mask"></div>
    	<a href="#porUsuario" aria-controls="porUsuario" role="pill" data-toggle="pill" class="btn btn-lg btn-primary" data-tabReports>
    		<i class="fas fa-share-square"></i> Despesas por usuário
    	</a>
    </li>

  </ul>
</div>



<div class="tab-content">

<div  class="tab-pane fade in active" id="porData" role="tabpanel">
<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
	<table class="table table-hover">
		<tr>
			<td>Data in&iacute;cio:</td>
			<td>Data Fim:</td>
		</tr>
		<tr>
			<td><input type="date" name="dtInicio" id="dtInicio" class="form-control"></td>
			<td><input type="date" name="dtFim" id="dtFim" class="form-control"></td>
			<td><button type="button" class="btn btn-success" onclick="getDespesa()">Pesquisar</button></td>
		</tr>
	</table>
 </div>
 <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
 	<div id="valorTotal"></div>
	<table id='relatorio' class="table table-striped">
		<thead>									
			<tr>
			 <th style="text-align: center;font-weight: bold;">Solicitação</th>
			 <th style="text-align: center;font-weight: bold;">Solicitante</th>
			 <th style="text-align: center;font-weight: bold;">Viajante</th>
			 <th style="text-align: center;font-weight: bold;">Estab.</th>
			 <th style="text-align: center;font-weight: bold;">Centro de custo</th>
			 <th style="text-align: center;font-weight: bold;">Valor Total</th>
			</tr>
		</thead>		
	 	<tbody></tbody>	
	</table>
 </div>
</div>

								<!-- SEGUNDO BOTAO -->

<div class="tab-pane fade" id="porUsuario" role="tabpanel">

 <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
	<table class="table table-hover">
		<tr>
			<td>Data in&iacute;cio:</td>
			<td>Data fim:</td>
			<td>Nome do usu&aacute;rio:</td>
			<td></td>		
		</tr>
		<tr>
			<td><input type="date" name="dtInicioUser" id="dtInicioUser" class="form-control"></td>
			<td><input type="date" name="dtFimUser" id="dtFimUser" class="form-control"></td>	
			<td><input type="text" id="nomeUsuario" name="nomeUsuario" class="nomeUsuario form-control"></td>
			<td><button type="button" class="btn btn-success" onclick="getDespesaUser()">Pesquisar</button></td>
		</tr>
	</table>
 </div>
 <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
 	<div id="valorTotalUser"></div>
	<table id='relatorioUser' class="table table-striped">
		<thead>									
			<tr>
			 <th style="text-align: center;font-weight: bold;">Solicitação</th>
			 <th style="text-align: center;font-weight: bold;">Solicitante</th>
			 <th style="text-align: center;font-weight: bold;">Viajante</th>
			 <th style="text-align: center;font-weight: bold;">Estab.</th>
			 <th style="text-align: center;font-weight: bold;">Centro de custo</th>
			 <th style="text-align: center;font-weight: bold;">Valor Total</th>
			</tr>
		</thead>		
	 	<tbody></tbody>	
	</table>
 </div>
</div>
</div>
</div>
</div>
</div>
</div>	
</body>
</html>