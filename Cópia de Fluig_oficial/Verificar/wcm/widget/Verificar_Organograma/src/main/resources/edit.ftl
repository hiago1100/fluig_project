<div id="orgchart_${instanceId}" 
	 class="super-widget wcm-widget-class fluig-style-guide" 
	 data-params="Verificar_Organograma.instance({editMode:true})">

	<div class="panel panel-default">
		<div class="panel-heading fs-cursor-move">
			<h3 class="panel-title">${i18n.getTranslation('application.title')}</h3>
		</div>
		<div class="panel-body">
			<div class="row">
				<div class="col-xs-12 col-md-6">
					<div class="form-group">
						<label for="org_base">${i18n.getTranslation('edit.label.orgbase')}:</label>
						<div class="input-group">
				            <input type="text" name="org_name" id="org_name" class="form-control" value="${org_name!}" />
				            <div class="input-group-addon fs-cursor-pointer" data-zoom>
				            	<span class="fluigicon fluigicon-search"></span>
				            </div>
				        </div>
					</div>
				</div>
				
				<div class="col-xs-12 col-md-6">
					<div class="form-group">
						<label for="title">${i18n.getTranslation('edit.label.title')}</label>
						<input type="text" class="form-control" id="title" name="title" value="${title!'OrgChart'}" />
					</div>
				</div>
				
				<div class="col-xs-12 col-md-6">
					<button type="button" class="btn btn-default" data-save>${i18n.getTranslation('edit.label.save')}</button>
				</div>
			</div>
			
			<input type="hidden" name="org_id" id="org_id" value="${org_id!}" />
		</div>
	</div>
</div>

