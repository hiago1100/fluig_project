<script src="/webdesk/vcXMLRPC.js"></script>
<div id="orgchart_${instanceId}" 
	 class="super-widget wcm-widget-class fluig-style-guide" 
	 data-params="Verificar_Organograma.instance({org_id:${org_id!},viewMode:true})">

	<div class="panel panel-default">
		<div class="panel-heading">
			<h3 class="panel-title">${title!'OrgChart'}</h3>
		</div>
		
		<div id="target_orgChart"></div>
	</div>
	
	
	<script type="text/template" class="orgChartTemplate">
	    <div class="media">
	        {{#img}}<a class="pull-left" href="#"><img class="img-rounded media-object" src="{{img}}"></a>{{/img}}
	        <div class="media-body">
	            {{#name}}
	            <h4 class="media-heading">
	            	{{#email}}<a href="mailto:{{email}}">{{/email}} {{name}} {{#email}}</a>{{/email}}
            	</h4>
	            {{/name}}
	            
            	{{#cargo}} <i>{{cargo}}</i> <br /> {{/cargo}}
            	{{#telefone}} Tel: {{telefone}} <br /> {{/telefone}}
	        </div>
	    </div>
	</script>
</div>

