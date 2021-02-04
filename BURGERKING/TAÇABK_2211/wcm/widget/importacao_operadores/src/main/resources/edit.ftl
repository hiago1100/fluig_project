<script src="../webapp/resources/js/importacao_operadores.js"></script>
<div class="super-widget wcm-widget-class fluig-style-guide">

    <form name="form" role="form">

		<div class="panel panel-default	">
			<div class="tab-content">
				<!-- Definição de campos -->
				<div class="tab-pane fade in active" id="configuracoes">

					<div class="row" id="cabecalho"><!-- Início da Row -->

						<!-- Título do Formulário -->
						<div class="col-md-8 col-md-offset-2 title" id="id_titulo_pagina">
							<h1>Importação de Operadores de Transporte</h1>
						</div><!-- Título do Formulário -->

					</div>
					<div class="row">
						<div class="col-md-8 col-md-offset-1 title" >
							<h2>Importar Operadores</h2>
							<input type="file" class="form-control" id="arquivoOperadores" name="fileuploaderOperadores" />


						</div>

						<div class="col-md-2">
							<h2>&nbsp;</h2>
							<button type="button" class="btn btn-primary btn-block" id="arquivoOperadoresImportar">Importar</button>
						</div>
					</div>

					<div class="row">
						<div class="col-md-8 col-md-offset-1 title" >
							<div class="checkbox">
								<label>
									<input type="checkbox" name="atualizar_operadores" id="atualizarOperadores"> Atualizar dados dos operadores já existentes
								</label>
							</div>
						</div>
					</div>

					<div class="row">
						<div class="col-md-10 col-md-offset-1">

							<div class="progress" id="barraOperadores" style="margin-top: 10px;display: none;">
								<div class="progress-bar progress-bar-striped active"  role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="">
									<span class="sr-only"></span>
								</div>
							</div>

						</div>
					</div>

					<div class="row">

						<div class="col-md-8  col-md-offset-1">
							<h2>Importar Sub-Grupo de Operadores </h2>
							<input type="file" class="form-control" id="arquivoOperadoresSubgrupos" name="fileuploader" />
						</div>

						<div class="col-md-2">
							<h2>&nbsp;</h2>
							<button type="button" class="btn btn-primary btn-block" id="arquivoOperadoresSubgruposImportar">Importar</button>
						</div>
					</div>

					<div class="row">
						<div class="col-md-10 col-md-offset-1">

							<div class="progress" id="barraOperadoresSubgrupos" style="margin-top: 10px;display: none;">
								<div class="progress-bar progress-bar-striped active"  role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
									<span class="sr-only"></span>
								</div>
							</div>

						</div>
					</div>

				</div>

			</div>
		</div>




	</form>
    
    

</div>
