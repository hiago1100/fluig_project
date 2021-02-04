<html>
<head>

<meta name="author" content="Jonathan Canavieira">

<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css">
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.16/css/jquery.dataTables.min.css">
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/css/select2.min.css"/>
<link rel="stylesheet" type="text/css" href="/portal/resources/style-guide/css/fluig-style-guide.min.css">
<script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>

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

<!-- fontAwesome -->
<script defer src="https://use.fontawesome.com/releases/v5.0.6/js/all.js"></script>
<!-- fontAwesome -->

<!-- select2 -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/js/select2.min.js"></script>
<!-- select2 -->

<!-- datetimepicker -->
<script type="text/javascript" src="https://cdn.rawgit.com/Eonasdan/bootstrap-datetimepicker/e8bddc60e73c1ec2475f827be36e1957af72e2ea/src/js/bootstrap-datetimepicker.js"></script>
<link rel="stylesheet" href="https://cdn.rawgit.com/Eonasdan/bootstrap-datetimepicker/e8bddc60e73c1ec2475f827be36e1957af72e2ea/build/css/bootstrap-datetimepicker.css" />
<!-- datetimepicker -->

<!-- mask -->
<script type="text/javascript" src="https://res.cloudinary.com/dtftedo2t/raw/upload/v1538140887/BRZ/jquery.mask.js"></script>
<!-- mask -->

<!-- excellentexport -->
<script src="https://res.cloudinary.com/dtftedo2t/raw/upload/v1540835041/BRZ/excellentexport.js"></script>
<!-- excellentexport -->

</head>
<body>

<div id="loader" class="fa-3x loader-absolute"> 
<div class="center"><i class="fas fa-spinner fa-pulse"></i></div>
</div>

<div id="BRZ_Panel_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="brz_panel.instance()">

<div class="no-border-radius col-xs-12 col-sm-12 col-md-12 col-lg-12">
<button id="consultar" class="btn btn-danger hide" onclick="consultDB('', 'consultSale')">Consultar Bruto</button>
<button id="consultar" class="btn btn-danger hide" onclick="consultDB('', 'parc1')">Consultar 1 parc</button>
<button id="consultar" class="btn btn-danger hide" onclick="consultDB('', 'parc2')">Consultar 2 parc</button>
<button id="consultar" class="btn btn-danger hide" onclick="consultDB('', 'parcU')">Consultar Parc U</button>
<button id="consultar" class="btn btn-danger hide" onclick="consultDB('', 'dist') ">Consultar Distrat</button>
<button id="consultar" class="btn btn-danger hide" onclick="consultDB('', 'distratoConsulta')">Consultar saldo distrato</button>

<button id="consultar" class="btn btn-warning hide" onclick="consultDB('', 'remove_bruto')">Remover Bruto </button>
<button id="consultar" class="btn btn-warning hide" onclick="consultDB('', 'remove_parc1')">Remover 1 parc</button>
<button id="consultar" class="btn btn-warning hide" onclick="consultDB('', 'remove_parc2')">Remover 2 parc</button>
<button id="consultar" class="btn btn-warning hide" onclick="consultDB('', 'remove_parcU')">Remover Parc U</button>
<button id="consultar" class="btn btn-warning hide" onclick="consultDB('', 'remove_dist')">Remover  Distrat</button>
<button id="consultar" class="btn btn-warning hide" onclick="consultDB('', 'remove_dist_saldo')">Remover  Distrato saldo</button>
</div>

<input type="text" name="horaSinc" id="horaSinc" class="hide">
<input type="text" name="horaMovto" id="horaMovto" class="hide">

<div class="fluig-style-guide">
<div class="panel panel-primary no-border-radius col-xs-12 col-sm-12 col-md-12 col-lg-12">
<div class="row">

<div class="panel-heading text-center no-border-radius">
  <h3><i class="fas fa-tachometer-alt"></i> PAINEL DE VENDAS E COMISSÕES</h3>
</div> <!-- /.panel-header -->

<!-- Nav tabs -->
<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-t-10 m-b-10">
  <ul class="nav nav-pills list-inline text-center" role="tablist" id="myTabs">
    <li role="presentation" class="active">
    	<div class="mask"></div>
    	<a href="#Bonification" aria-controls="Bonification" role="pill" data-toggle="pill" class="btn btn-lg btn-primary">
    		<i class="glyphicon glyphicon-gift"></i> Bonificações
    	</a>
    </li>
    <li role="presentation">
    	<div class="mask"></div>
    	<a href="#Reports" aria-controls="reports" role="pill" data-toggle="pill" class="btn btn-lg btn-primary" data-tabReports>
    		<i class="fas fa-share-square"></i> Envio para Imobiliárias
    	</a>
    </li>
    <li role="presentation">
    	<div class="mask"></div>
    	<a href="#NFS" aria-controls="NFS" role="pill" data-toggle="pill" class="btn btn-lg btn-primary" data-tabNFS>
    		<i class="glyphicon glyphicon-paperclip"></i> Associar NFs
    	</a>
    </li>
    <li role="presentation">
    	<div class="mask"></div>
    	<a href="#Cube" aria-controls="Cube" role="pill" data-toggle="pill" class="btn btn-lg btn-primary" data-tabCube>
    		<i class="fluigicon fluigicon-file"></i> Relatórios
    	</a>
    </li>
    <li role="presentation">
    	<div class="mask"></div>
    	<a href="#ComissionBRZ" aria-controls="ComissionBRZ" role="pill" data-toggle="pill" class="btn btn-lg btn-primary" data-tabComissionBRZ>
    		<i class="glyphicon glyphicon-usd"></i> Comissões BRZ
    	</a>
    </li>

    <li role="presentation">
    	<div class="mask"></div>
    	<a href="#Parameters" aria-controls="Parameters" role="pill" data-toggle="pill" class="btn btn-lg btn-primary" data-tabParameters>
    		<i class="fluigicon fluigicon-cog"></i> Configurações
    	</a>
    </li>
  </ul>
</div>

<!-- Tab panes -->
<div class="tab-content">
	<div role="tabpanel" class="tab-pane fade in active" id="Bonification">
		<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
			<div class="row">
		    	<div id="Bonification_buttons">
					<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-t-10 m-b-10">
					  <ul class="nav nav-tabs list-inline text-center" role="tablist" id="Bonification-type">
					    <li role="presentation" class="active">
					    	<a href="#awards" aria-controls="awards" role="tab" data-toggle="tab" class="btn btn-lg btn-primary">
					    		<i class="glyphicon glyphicon-gift"></i> Prêmio
					    	</a>
					    </li>
					    <li role="presentation">
					    	<a href="#demand-min" aria-controls="demand-min" role="tab" data-toggle="tab" class="btn btn-lg btn-primary">
					    		<i class="fluigicon fluigicon-download"></i> Demanda Mínima
					    	</a>
					    </li>
					    <li role="presentation">
					    	<a href="#demand-max" aria-controls="demand-max" role="tab" data-toggle="tab" class="btn btn-lg btn-primary">
					    		<i class="fluigicon fluigicon-upload"></i> Demanda Máxima
					    	</a>
					    </li>
					  </ul>
					</div>
					<div class="tab-content">
						<div id="awards" class="tab-panel fade in active" role="tabpanel">
							<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
								<div class="row">
									<div class="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12 m-t-10">
										<div class="row">

											<div class="col-xs-12 col-sm-12 col-md-5 col-lg-5">
												<div class="row">
													<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
														<label>Escolha o período das vendas ativas</label>
													</div>
													<div class="form-group col-xs-12 col-sm-6 col-md-6 col-lg-6">
									    				<div class="input-group">
										    				<input type="text" name="dtIniBonification" id="dtIniBonification" class="form-control data">
										    				<span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
										    			</div>
									    			</div>
									    			<div class="form-group col-xs-12 col-sm-6 col-md-6 col-lg-6">
									    				<div class="input-group">
										    				<input type="text" name="dtFinBonification" id="dtFinBonification" class="form-control dataFim">
										    				<span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
										    			</div>
									    			</div>	
												</div>
											</div>

							    			<div class="col-xs-12 col-sm-12 col-md-7 col-lg-7">
							    				<div class="row">
							    					<div id="hold_slEmprBoni" class="form-group col-xs-12 col-sm-5 col-md-5 col-lg-5">
									    				<label>Empreendimentos</label>
										    			<select name="slEmprBoni" id="slEmprBoni" class="form-control"></select>
									    			</div>
									    			<div id="hold_slImoBoni" class="form-group col-xs-12 col-sm-5 col-md-5 col-lg-5">
									    				<label>Imobiliárias</label>
										    			<select name="slImoBoni" id="slImoBoni" class="form-control"></select>
									    			</div>
									    			<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2">
														<button id="btBonification" class="btn btn-success btn-execute" data-Bonification>
															<i class="glyphicon glyphicon-search"></i>
														</button>
													</div>
							    				</div>
							    			</div>
							    			
							    		</div>
						    		</div>
							    	<hr>
							    	<div class="holdTable">
										<div id="Awards_filter" class="col-xs-12 col-sm-11 col-md-11 col-lg-11"></div>
										<div id="Awards_send" class="col-xs-12 col-sm-1 col-md-1 col-lg-1 pull-right hide text-right">
							    			<button id="btSendFormAwards" class="btn btn-primary" data-sendDbAwards>Enviar</button>
							    		</div>
								    	<div id="Awards_table" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 table-responsive"></div>
								    	<div id="Awards_pag" class="col-xs-12 col-sm-12 col-md-12 col-lg-12"></div>
								    </div>
								</div>
							</div>
						</div>

						<div id="demand-min" class="tab-panel fade" role="tabpanel">
							<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
								<div class="row">
									<div class="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12 m-t-10">
										<div class="row">
											<div class="col-xs-12 col-sm-12 col-md-5 col-lg-5">
												<div class="row">
													<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
														<label>Escolha o período dos cálculos de comissões</label>
													</div>
													<div class="form-group col-xs-12 col-sm-6 col-md-6 col-lg-6">
									    				<div class="input-group">
										    				<input type="text" name="dtIniDemandMin" id="dtIniDemandMin" class="form-control data">
										    				<span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
										    			</div>
									    			</div>
									    			<div class="form-group col-xs-12 col-sm-6 col-md-6 col-lg-6">
									    				<div class="input-group">
										    				<input type="text" name="dtFinDemandMin" id="dtFinDemandMin" class="form-control dataFim">
										    				<span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
										    			</div>
									    			</div>	
												</div>
											</div>

							    			<div class="col-xs-12 col-sm-12 col-md-7 col-lg-7">
							    				<div class="row">
							    					<div id="hold_slEmprDemandMin" class="form-group col-xs-12 col-sm-5 col-md-5 col-lg-5">
									    				<label>Empreendimentos</label>
										    			<select name="slEmprDemandMin" id="slEmprDemandMin" class="form-control"></select>
									    			</div>
									    			<div id="hold_slImoDemandMin" class="form-group col-xs-12 col-sm-5 col-md-5 col-lg-5">
									    				<label>Imobiliárias</label>
										    			<select name="slImoDemandMin" id="slImoDemandMin" class="form-control"></select>
									    			</div>
									    			<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2">
														<button id="btDemandMin" class="btn btn-success btn-execute" data-DemandMin>
															<i class="glyphicon glyphicon-search"></i>
														</button>
													</div>
							    				</div>
							    			</div>
							    			
							    		</div>
						    		</div>
							    	<hr>
							    	<div class="holdTable">
										<div id="DemandMin_filter" class="col-xs-12 col-sm-11 col-md-11 col-lg-11"></div>
										<div id="DemandMin_send" class="col-xs-12 col-sm-1 col-md-1 col-lg-1 pull-right hide text-right">
							    			<button id="btSendFormDemandMin" class="btn btn-primary" data-sendDbDemandMin>Enviar</button>
							    		</div>
								    	<div id="DemandMin_table" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 table-responsive"></div>
								    	<div id="DemandMin_pag" class="col-xs-12 col-sm-12 col-md-12 col-lg-12"></div>
								    </div>
								</div>
							</div>
						</div>

						<div id="demand-max" class="tab-panel fade" role="tabpanel">
							<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
								<div class="row">
									<div class="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12 m-t-10">
										<div class="row">
											<div class="col-xs-12 col-sm-12 col-md-5 col-lg-5">
												<div class="row">
													<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
														<label>Escolha o período dos cálculos de comissões</label>
													</div>
													<div class="form-group col-xs-12 col-sm-6 col-md-6 col-lg-6">
									    				<div class="input-group">
										    				<input type="text" name="dtIniDemandMax" id="dtIniDemandMax" class="form-control data">
										    				<span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
										    			</div>
									    			</div>
									    			<div class="form-group col-xs-12 col-sm-6 col-md-6 col-lg-6">
									    				<div class="input-group">
										    				<input type="text" name="dtFinDemandMax" id="dtFinDemandMax" class="form-control dataFim">
										    				<span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
										    			</div>
									    			</div>	
												</div>
											</div>

							    			<div class="col-xs-12 col-sm-12 col-md-7 col-lg-7">
							    				<div class="row">
							    					<div id="hold_slEmprDemandMax" class="form-group col-xs-12 col-sm-5 col-md-5 col-lg-5">
									    				<label>Empreendimentos</label>
										    			<select name="slEmprDemandMax" id="slEmprDemandMax" class="form-control"></select>
									    			</div>
									    			<div id="hold_slImoDemandMax" class="form-group col-xs-12 col-sm-5 col-md-5 col-lg-5">
									    				<label>Imobiliárias</label>
										    			<select name="slImoDemandMax" id="slImoDemandMax" class="form-control"></select>
									    			</div>
									    			<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2">
														<button id="btDemandMax" class="btn btn-success btn-execute" data-DemandMax>
															<i class="glyphicon glyphicon-search"></i>
														</button>
													</div>
							    				</div>
							    			</div>
							    			
							    		</div>
						    		</div>
							    	<hr>
							    	<div class="holdTable">
										<div id="DemandMax_filter" class="col-xs-12 col-sm-11 col-md-11 col-lg-11"></div>
										<div id="DemandMax_send" class="col-xs-12 col-sm-1 col-md-1 col-lg-1 pull-right hide text-right">
							    			<button id="btSendFormDemandMax" class="btn btn-primary" data-sendDbDemandMax>Enviar</button>
							    		</div>
								    	<div id="DemandMax_table" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 table-responsive"></div>
								    	<div id="DemandMax_pag" class="col-xs-12 col-sm-12 col-md-12 col-lg-12"></div>
								    </div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
	    </div>
	</div><!-- /#Bonification-->

	<div role="tabpanel" class="tab-pane fade" id="Reports">
		<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 margin-top-button">
			<div class="row">
			
	    		<div class="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12 m-t-10">
					<div class="row">
						
						<div class="col-xs-12 col-sm-12 col-md-5 col-lg-5">
							<div class="row">
								<div class="col-xs-12 col-sm-12 col-md	-12 col-lg-12">
									<label>Escolha o período dos cálculos de comissões</label>
								</div>
								<div class="form-group col-xs-12 col-sm-6 col-md-6 col-lg-6">
				    				<div class="input-group">
					    				<input type="text" name="dtIniReports" id="dtIniReports" class="form-control data">
					    				<span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
					    			</div>
				    			</div>
				    			<div class="form-group col-xs-12 col-sm-6 col-md-6 col-lg-6">
				    				<div class="input-group">
					    				<input type="text" name="dtFinReports" id="dtFinReports" class="form-control dataFim">
					    				<span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
					    			</div>
				    			</div>	
							</div>
						</div>

		    			<div class="col-xs-12 col-sm-12 col-md-7 col-lg-7">
		    				<div class="row">
		    					<div id="hold_slEmprReports" class="form-group col-xs-12 col-sm-5 col-md-5 col-lg-5">
				    				<label>Empreendimentos</label>
					    			<select name="slEmprReports" id="slEmprReports" class="form-control"></select>
				    			</div>
				    			<div id="hold_slImoReports" class="form-group col-xs-12 col-sm-5 col-md-5 col-lg-5">
				    				<label>Imobiliárias</label>
					    			<select name="slImoReports" id="slImoReports" class="form-control"></select>
				    			</div>
				    			<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2">
									<button id="btReports" class="btn btn-success btn-execute" data-Reports onclick="loader(1)">
										<i class="glyphicon glyphicon-search"></i>
									</button>
								</div>
		    				</div>
		    			</div>

		    		</div>
	    		</div>
	    		<hr>		
		    	<div class="holdTable">
		    		<div id="Reports_send" class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
		    			<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
		    				<label>
		    					<input type="checkbox" id="selectAllConsolided"> Selecionar todos
		    				</label>
		    			</div>
		    			<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 text-right">
		    				<button id="btSendFormReports" class="btn btn-primary" data-sendDbReports>Enviar</button>
		    			</div>
		    		</div>
					
					<hr>
			    	<div id="Reports_table" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 panel-group">
			    		<div class="row"></div>
			    	</div>

			    </div>
		   </div>
	    </div>
	</div><!-- /#Reports-->

	<div role="tabpanel" class="tab-pane fade" id="NFS">
		<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 margin-top-button">
			<div class="row">
				<div class="col-xs-12 col-sm-12 col-md-5 col-lg-5">
					<div class="row">
						<label>Escolha o período dos consolidados</label>
		    			<select name="dtConsolidados" id="dtConsolidados" class="form-control"></select>
					</div>
				</div>
				<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2">
					<button id="btNFS" class="btn btn-success btn-execute" data-NFS>
						<i class="glyphicon glyphicon-search"></i>
					</button>
				</div>
				<hr>
		    	<div class="holdTable">
					<div id="NFS_filter" class="col-xs-12 col-sm-11 col-md-11 col-lg-11"></div>
					<div id="NFS_send" class="col-xs-12 col-sm-1 col-md-1 col-lg-1 pull-right hide text-right">
		    			<button id="btSendFormNFS" class="btn btn-primary" data-sendDbNFS>Enviar</button>
		    		</div>
			    	<div id="NFS_table" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 table-responsive"></div>
			    	<div id="NFS_pag" class="col-xs-12 col-sm-12 col-md-12 col-lg-12"></div>
			    </div>
	    	</div>
	    </div>
	</div><!-- /#NFS-->

	<div role="tabpanel" class="tab-pane fade" id="Cube">
    	<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 margin-top-button">
	    	<div class="row">

    			<div class="col-xs-12 col-sm-12 col-md-5 col-lg-5">
					<div class="row">
						<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
							<label>Escolha o período das vendas ativas</label>
						</div>
						<div class="form-group col-xs-12 col-sm-6 col-md-6 col-lg-6">
		    				<div class="input-group">
			    				<input type="text" name="dtIniCube" id="dtIniCube" class="form-control data">
			    				<span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
			    			</div>
		    			</div>
		    			<div class="form-group col-xs-12 col-sm-6 col-md-6 col-lg-6">
		    				<div class="input-group">
			    				<input type="text" name="dtFinCube" id="dtFinCube" class="form-control dataFim">
			    				<span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
			    			</div>
		    			</div>	
					</div>
				</div>

    			<div class="col-xs-12 col-sm-12 col-md-7 col-lg-7">
    				<div class="row">
    					<div class="form-group col-xs-12 col-sm-5 col-md-5 col-lg-5">
		    				<label>Empreendimentos</label>
			    			<select name="slEmprCube" id="slEmprCube" class="form-control"></select>
		    			</div>
		    			<div class="form-group col-xs-12 col-sm-5 col-md-5 col-lg-5">
		    				<label>Imobiliárias</label>
			    			<select name="slImoCube" id="slImoCube" class="form-control"></select>
		    			</div>
		    			<div class="form-group col-xs-12 col-sm-4 col-md-4 col-lg-4 hide">
		    				<label>NF</label>
			    			<input name="cpNFSearch" id="cpNFSearch" class="form-control" onkeydown="upperCase(this)">
		    			</div>
		    			<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2">
							<button id="btCube" class="btn btn-success btn-execute" data-Cube>
								<i class="glyphicon glyphicon-search"></i>
							</button>
						</div>
    				</div>
    			</div>
    			<hr>
		    	<div class="holdTable">
					<div id="Cube_filter" class="col-xs-12 col-sm-12 col-md-12 col-lg-12"></div>
			    	<div id="Cube_table" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 table-responsive"></div>
			    	<div id="Cube_pag" class="col-xs-12 col-sm-12 col-md-12 col-lg-12"></div>
			    </div>
	    	</div>
		</div> <!-- #tab-Cube -->
	</div><!-- /#Cube-->

	<div role="tabpanel" class="tab-pane fade" id="ComissionBRZ">
		<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-t-10 m-b-10">
		  <ul class="nav nav-pills list-inline text-center" role="tablist" id="Cube-type">
		    <li role="presentation" class="active ">
		    	<a href="#Comission_CorOnline" aria-controls="Comission_CorOnline" role="pill" data-toggle="pill" class="btn btn-lg btn-primary">
		    		<i class="fluigicon fluigicon-file" aria-hidden="true"></i> Corretor Online
		    	</a>
		    </li>
		    <li role="presentation" class="col-md-3">
		    	<a href="#Comission_Supervisor" aria-controls="Comission_Supervisor" role="pill" data-toggle="pill" class="btn btn-lg btn-primary" data-tabSuper>
		    		<i class="fluigicon fluigicon-file-default" aria-hidden="true"></i> Supervisor
		    	</a>
		    </li>
		  </ul>
		</div>
		
		<div class="tab-content">
			<div role="tabpanel" class="tab-pane in fade active" id="Comission_CorOnline">
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
			    	<div class="row">
			    		<div class="col-xs-12 col-sm-12 col-md-5 col-lg-5">
							<div class="row">
								<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
									<label>Escolha o período das vendas ativas</label>
								</div>
								<div class="form-group col-xs-12 col-sm-6 col-md-6 col-lg-6">
				    				<div class="input-group">
					    				<input type="text" name="dtIniComissionBRZ" id="dtIniComissionBRZ" class="form-control data">
					    				<span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
					    			</div>
				    			</div>
				    			<div class="form-group col-xs-12 col-sm-6 col-md-6 col-lg-6">
				    				<div class="input-group">
					    				<input type="text" name="dtFinComissionBRZ" id="dtFinComissionBRZ" class="form-control dataFim">
					    				<span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
					    			</div>
				    			</div>	
							</div>
						</div>

						<div class="col-xs-12 col-sm-12 col-md-7 col-lg-7">
							<div class="row">
								<div id="hold_slEmprComissionBRZ" class="form-group col-xs-12 col-sm-5 col-md-5 col-lg-5">
				    				<label>Empreendimentos</label>
					    			<select name="slEmprComissionBRZ" id="slEmprComissionBRZ" class="form-control"></select>
				    			</div>
				    			<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2">
									<button id="btComissionBRZ" class="btn btn-success btn-execute" data-ComissionBRZ>
										<i class="glyphicon glyphicon-search"></i>
									</button>
								</div>
							</div>
						</div>
						<hr>
				    	<div class="holdTable">
							<div id="ComissionBRZ_filter" class="col-xs-12 col-sm-11 col-md-11 col-lg-11"></div>
							<div id="ComissionBRZ_send" class="col-xs-12 col-sm-1 col-md-1 col-lg-1 pull-right hide text-right">
				    			<button id="btSendFormComissionBRZ" class="btn btn-primary" data-sendDbComissionBRZ>Enviar</button>
				    		</div>
				    		<div id="ComissionBRZ_tableTot" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-b-10 hide">
				    			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-b-10">
				    				<div class="row">
				    					<a class="btn btn-default" data-ExportExcel>Excel</a>
				    				</div>
				    			</div>
				    			<table id="tableComissoesBRZTotal" class="tableComissoesBRZTotal tableComissoesBRZ">
				    				<thead>
				    					<tr>
				    						<th>Quantidade de Vendas</th>
				    						<th>Valor Total de Comissão</th>
				    					</tr>
				    				</thead>
				    				<tbody>
				    					<tr>
				    						<td id="rowVendas"></td>
				    						<td id="rowValor"></td>
				    					</tr>
				    				</tbody>
				    			</table>
				    			<table id="tableComissoesBRZTotal_fake" class="hide">
				    				<thead>
				    					<tr>
				    						<th>Quantidade de Vendas</th>
				    						<th>Valor Total de Comissão</th>
				    					</tr>
				    				</thead>
				    				<tbody>
				    					<tr>
				    						<td id="rowVendas_fake"></td>
				    						<td id="rowValor_fake"></td>
				    					</tr>
				    				</tbody>
				    			</table>
				    		</div>
					    	<div id="ComissionBRZ_table" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 table-responsive"></div>
					    	<div id="ComissionBRZ_pag" class="col-xs-12 col-sm-12 col-md-12 col-lg-12"></div>
					    </div>
			    	</div>
			    </div>
			</div>
			<div role="tabpanel" class="tab-pane fade" id="Comission_Supervisor">
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
			    	<div class="row">
			    		<div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
				    		<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
								<div class="row">
									<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
										<label>Escolha o período das Vendas</label>
									</div>
									<div class="form-group col-xs-12 col-sm-6 col-md-6 col-lg-6">
					    				<div class="input-group">
						    				<input type="text" name="dtIniSuper" id="dtIniSuper" class="form-control data">
						    				<span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
						    			</div>
					    			</div>
					    			<div class="form-group col-xs-12 col-sm-6 col-md-6 col-lg-6">
					    				<div class="input-group">
						    				<input type="text" name="dtFinSuper" id="dtFinSuper" class="form-control dataFim">
						    				<span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
						    			</div>
					    			</div>	
								</div>
							</div>

							<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
								<div class="row">
									<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
										<label>Escolha o período de Distrato</label>
									</div>
									<div class="form-group col-xs-12 col-sm-6 col-md-6 col-lg-6">
					    				<div class="input-group">
						    				<input type="text" name="dtIniSuperDist" id="dtIniSuperDist" class="form-control data">
						    				<span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
						    			</div>
					    			</div>
					    			<div class="form-group col-xs-12 col-sm-6 col-md-6 col-lg-6">
					    				<div class="input-group">
						    				<input type="text" name="dtFinSuperDist" id="dtFinSuperDist" class="form-control dataFim">
						    				<span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
						    			</div>
					    			</div>	
								</div>
							</div>
						</div>

						<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
							<div class="row">
								<div id="hold_slEmprSuper" class="form-group col-xs-12 col-sm-10 col-md-10 col-lg-10">
				    				<label>Empreendimentos</label>
					    			<select name="slEmprSuper" id="slEmprSuper" class="form-control" multiple></select>
				    			</div>
				    			<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2">
									<button id="btSuper" class="btn btn-success btn-execute" data-Super>
										<i class="glyphicon glyphicon-search"></i>
									</button>
								</div>
							</div>
						</div>
						<hr>
				    	<div class="holdTable">
				    		<div id="Super_tableTot" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 hide">
				    			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-b-10">
				    				<div class="row">
				    					<a class="btn btn-default" data-exportExcelSuper>Excel</a>
				    				</div>
				    			</div>
				    			<div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 m-b-10">
				    				<div class="row">
						    			<table id="TableTotalSuper" class="tableComissoesBRZ m-b-10">
						    				<thead>
						    					<tr>
						    						<th>Total de Vendas</th>
						    						<th>Total de Distratos</th>
						    						<th>Total de $ Vendidos</th>
						    						<th>% Comissão</th>
						    						<th>Valor Total de Comissão</th>
						    					</tr>
						    				</thead>
						    				<tbody>
						    					<tr>
						    						<td id="rowQtdVendas"></td>
						    						<td id="rowQtdDistrato"></td>
						    						<td id="rowVendidos"></td>
						    						<td id="rowPercentual">
						    							<input type="text" name="cpValVendidos" id="cpValVendidos" class="form-control hide">
						    							<input type="text" name="cpPercentComissaoSuper" id="cpPercentComissaoSuper" class="form-control" maxlength="6">
						    							<span id="rowPercentualVal" class="hide"></span>
						    						</td>
						    						<td id="rowValorTotal"></td>
						    					</tr>
						    				</tbody>
						    			</table>
						    			<table id="TableTotalSuper_fake" class="hide">
						    				<thead>
						    					<tr>
						    						<th>Total de Vendas</th>
						    						<th>Total de Distratos</th>
						    						<th>Total de $ Vendidos</th>
						    						<th>% Comissão</th>
						    						<th>Valor Total de Comissão</th>
						    					</tr>
						    				</thead>
						    				<tbody>
						    					<tr>
						    						<td id="rowQtdVendas_fake"></td>
						    						<td id="rowQtdDistrato_fake"></td>
						    						<td id="rowVendidos_fake"></td>
						    						<td id="rowPercentual_fake"></td>
						    						<td id="rowValorTotal_fake"></td>
						    					</tr>
						    				</tbody>
						    			</table>
						    		</div>
					    		</div>
				    			<div id="Super_filter" class="col-xs-12 col-sm-11 col-md-4 col-lg-4"></div>
				    		</div>
					    	<div id="Super_table" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 table-responsive"></div>
					    	<div id="SuperDist_table" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 table-responsive"></div>
					    	<div id="Super_pag" class="col-xs-12 col-sm-12 col-md-12 col-lg-12"></div>
					    </div>
			    	</div>
			    </div>
			</div>
		</div>
	</div><!-- /#Commissions-->



<!-- TRETA TODA COMEÇA AQUI -->

	<div role="tabpanel" class="tab-pane fade" id="Parameters">
		<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-t-10 m-b-10">
		  <ul class="nav nav-pills list-inline text-center" role="tablist" id="Cube-type">
		    <li role="presentation" class="active ">
		    	<a href="#tab-changeComission" aria-controls="tab-changeComission" role="pill" data-toggle="pill" class="btn btn-lg btn-primary">
		    		<span class="icon-circle">%</span> de Comissões
		    	</a>
		    </li>
		    <li role="presentation" class="col-md-3">
		    	<a href="#tab-changeEmail" aria-controls="tab-changeEmail" role="pill" data-toggle="pill" class="btn btn-lg btn-primary" data-tabParametersEmail>
		    		<i class="fluigicon fluigicon-envelopes" aria-hidden="true"></i> Cadastro de E-mail
		    	</a>
		    </li>
		<li role="presentation">
    	<a href="#movsSincro" aria-controls="movsSincro" role="pill" data-toggle="pill" class="btn btn-lg btn-primary" data-tEu abmovsSincro>
    		<i class="fluigicon fluigicon-process icon-sm"></i> Movimentação e Sincronização
    	</a>
    </li>
 </ul>
</div>

<div id="tab-changeComission" class="tab-panel in fade active" role="tabpanel">
			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 margin-top-button">
				<div class="row">
					<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2">
	    				<label>
	    					1&ordf; Parcela de Comissão &nbsp;
	    					<i class="fluigicon fluigicon-question-sign bs-docs-popover-hover" data-toggle="popover" data-content="Preencha 1 ou mais valores antes de enviar." data-original-title="Aviso"></i>
	    				</label>
		    			<input name="cpParameters1Parcela" id="cpParameters1Parcela" class="form-control percent" maxlength="6">
	    			</div>
	    			<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2">
	    				<label>2&ordf; Parcela de Comissão &nbsp;</label>
		    			<input name="cpParameters2Parcela" id="cpParameters2Parcela" class="form-control percent" maxlength="6">
	    			</div>
	    			<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2">
	    				<label>Parcela Única de Comissão &nbsp;</label>
		    			<input name="cpParametersParcelaUnica" id="cpParametersParcelaUnica" class="form-control percent" maxlength="6">
	    			</div>
	    			<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2">
	    				<label>Demanda Mínima &nbsp;</label>
		    			<input name="cpParametersDemandaMin" id="cpParametersDemandaMin" class="form-control percent" maxlength="6">
	    			</div>
	    			<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2">
	    				<label>Demanda Máxima &nbsp;</label>
		    			<input name="cpParametersDemandaMax" id="cpParametersDemandaMax" class="form-control percent" maxlength="6">
	    			</div>
	    			<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 text-center">
						<button id="btParameters" class="btn btn-success btn-execute" data-Parameters>
							Enviar <i class="fluigicon fluigicon-pointer-right"></i>
						</button>
					</div>
				</div>
			</div>
		</div>

		<div id="tab-changeEmail" class="tab-panel fade" role="tabpanel">
			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 margin-top-button">
				<div class="row">
					<div id="hold_slEmprParametersEmail" class="form-group col-xs-12 col-sm-4 col-md-4 col-lg-4">
	    				<label>Imobiliárias</label>
		    			<select name="slImoParametersEmail" id="slImoParametersEmail" class="form-control"></select>
	    			</div>
	    			<div id="hold_slImoParametersEmail" class="form-group col-xs-12 col-sm-6 col-md-6 col-lg-6">
	    				<label>
	    					Email &nbsp;
	    					<i class="fluigicon fluigicon-question-sign bs-docs-popover-hover" data-toggle="popover" data-content="Para gravar mais de um email, separar com ';'." data-original-title="Aviso"></i>
	    				</label>
		    			<input type="text" name="cpImoParametersEmail" id="cpImoParametersEmail" class="form-control">
	    			</div>
	    			<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2">
						<button id="btParametersEmail" class="btn btn-success btn-execute" data-ParametersEmail>
							Enviar <i class="fluigicon fluigicon-pointer-right"></i>
						</button>
					</div>
				</div>
			</div>
    	</div>

    	<!-- TRETA TODA TERMINA AQUI -->

			

		

<div role="tabpanel" class="tab-pane fade" id="movsSincro">
	<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-t-10 m-b-10">
		  <ul class="nav nav-pills list-inline text-center" role="tablist" id="Cube-type">
		    <li role="presentation" class="active col-md-2">
		    	<a href="#historicoSinc" aria-controls="historicoSinc" role="pill" data-toggle="pill" class="btn btn-lg btn-primary">
		    		<i class="fluigicon fluigicon-file" aria-hidden="true"></i> Histórico - Sincronização de vendas
		    	</a>
		    </li>
		    <li role="presentation" class="col-md-2">
		    	<a href="#historicoMov" aria-controls="historicoMov" role="pill" data-toggle="pill" class="btn btn-lg btn-primary" data-tabSuper>
		    		<i class="fluigicon fluigicon-file-default" aria-hidden="true"></i> Histórico - Movimentação de fluxos
		    	</a>
		    </li>
		    <li role="presentation" class="col-md-2">
		    	<a href="#movimentacaoVenda" aria-controls="movimentacaoVenda" role="pill" data-toggle="pill" class="btn btn-lg btn-primary" data-tabSuper>
		    		<i class="fluigicon fluigicon-file-default" aria-hidden="true"></i>Movimentação de fluxos
		    	</a>
		    </li>
		  </ul>
		</div>
		
		<div class="tab-content">
			<div role="tabpanel" class="tab-pane in fade active" id="historicoSinc">
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
			    	<div class="row">
			    		<div class="col-xs-12 col-sm-12 col-md-5 col-lg-5">
							<div class="row">
								
							</div>
						</div>
						<h2 align="center" style="color:#0000FF;" id="proxSinc"></h2>
						<hr>
				    	<table class="table table-striped" id="table-history">  							

				    	<thead>					
						<tr>
						<th style="text-align: center;font-weight: bold;">Item</th>
						<th style="text-align: center;font-weight: bold;">Data/Hora</th>
						<th style="text-align: center;font-weight: bold;">Data/Hora(Fim)</th>
						<th style="text-align: center;font-weight: bold;">Descrição</th>
						<th style="text-align: center;font-weight: bold;">Número de sincronizações</th>
						</tr>
						</thead>		

						<tbody>
							
						
						</tbody>
							

							</table>
			    	</div>
			    </div>
			</div>

				<!-- FIM ABA DE SINCRONIZAÇAO -->


			<div role="tabpanel" class="tab-pane fade" id="historicoMov">
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
			    	<div class="row">
			    		<div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
				    		<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
								<div class="row">
									
								</div>
							</div>

							
						</div>
						<h2 align="center" style="color:#0000FF;" id="proxMovto"></h2>
				
						<hr>
				    	
						<table class="table table-striped" id="table-movto">	
						<thead>									
						<tr>
						<th style="text-align: center;font-weight: bold;">Item</th>
						<th style="text-align: center;font-weight: bold;">Data/Hora (Inicio)</th>
						<th style="text-align: center;font-weight: bold;">Hora (Ultimo movto.)</th>
						<th style="text-align: center;font-weight: bold;">Descrição</th>
						<th style="text-align: center;font-weight: bold;">Número de movimentações</th>
						</tr>
						</thead>

						<tbody>
							
						</tbody>

						</table>
			    	</div>
			    </div>
			</div>

			<!-- FIM HISTORICO MOVIMENTAÇAO -->


	<div role="tabpanel" class="tab-pane fade" id="movimentacaoVenda">
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
			    	<div class="row">
			    		<div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
				    		<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
								<div class="row">
							
								<div id="hold_slEmprSuper" class="form-group col-xs-12 col-sm-10 col-md-10 col-lg-10">
				    				<label>Empreendimentos</label>
					    			<select name="slctEmpreendimento" id="slctEmpreendimento" class="form-control">

					    			<!-- <select name="slctEmpreendimento" id="slctEmpreendimento" class="form-control" onchange="protoType(this.value)"> -->
<!-- 					    				
					    				<option value="n">Selecione...</option>
					    				<option value="a">Empreendimento A</option>
					    				<option value="b">Empreendimento B</option>
					    				<option value="c">Empreendimento C</option>
					    				<option value="d">Empreendimento D</option> -->

					    			</select>
				    			</div>
				    			<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2">
									<button id="btBuscaVenda" class="btn btn-success btn-execute" onclick="protoType()">
										<i class="glyphicon glyphicon-search"></i>
									</button>
								  </div>		  
								<div>
									<table class="table table-striped" id="recebeTable">
									
									</table>										
								</div>	
								<hr>
								</div>
							</div>		
					    </div>
			    	</div>
			    </div>
			</div>



	</div><!-- /#Commissions-->



</div>






	</div><!-- /#Parameters-->













</div><!-- Tab panes -->

</div> <!-- /.row -->
</div> <!-- /.panel -->
</div><!-- /.fluig-style-guide -->
</div><!-- /#BRZ_Panel -->
</body>
</html>