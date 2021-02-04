<html>
<head>
<meta name="author" content="Hiago Oliveira">
</head>
<body>
</div>
<div id="MyWidget_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="MyWidget.instance()">
<div class="fluig-style-guide">
<div class="row">

<div class="panel-heading text-center no-border-radius">
  <h3><i class="fas fa-tachometer-alt"></i> PAINEL INDICADORES FLUIG</h3>
</div> <!-- /.panel-header -->

<!-- Nav tabs -->

<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-t-10 m-b-10">
  <ul class="nav nav-pills list-inline text-center" role="tablist" id="myTabs">
    <li role="presentation" class="active">
    	<div class="mask"></div>
    	<a href="#ChartPie" aria-controls="ChartPie" role="pill" data-toggle="pill" class="btn btn-lg btn-primary">
    		<i class="glyphicon glyphicon-gift"></i> Solicitações por áreas
    	</a>
    </li>
    <li role="presentation">
    	<div class="mask"></div>
    	<a href="#GeralChamados" aria-controls="GeralChamados" role="pill" data-toggle="pill" class="btn btn-lg btn-primary" data-tabReports>
    		<i class="fas fa-share-square"></i> Visão Geral de solicitações.
    	</a>
    </li>
  </ul>
</div>
<!-- Tab panes -->
<div class="tab-content">
<!-- chart pie -->
<div role="tabpanel" class="tab-pane fade in active" id="ChartPie" >
<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 margin-top-button">
<div class="row">
<div id="indicador">
</div>
<table class="table">
	<tbody id="recebeIndicadorPapel">		
	</tbody>
</table>	
</div>
</div>
</div>
<!-- FIM chart pie -->
<div role="tabpanel" class="tab-pane fade" id="GeralChamados" >
<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 margin-top-button">
<div class="row">
<div id="indicadorPie">	
</div>
<table class="table">
	<tbody id="representacaoPi">	
	</tbody>
</table>	
</div>
</div>
</div>
</div><!-- Tab panes -->
</div> <!-- /.row -->	
</div><!-- /.fluig-style-guide -->
</div><!-- /#BRZ_Panel -->
</body>
</html>