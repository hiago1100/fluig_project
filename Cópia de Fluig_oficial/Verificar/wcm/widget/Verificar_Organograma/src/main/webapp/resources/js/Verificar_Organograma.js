var Verificar_Organograma = SuperWidget.extend({
	datasetName: 'Verificar_OrgChart',
	myOrgChart: null,
	orgData: [],
	
    editMode: false,
    viewMode: false,
    
    bindings: {
        local: {
        	'save': ['click_save'],
        	'zoom': ['click_zoom']
        },
        global: {}
    },
    
    createOrgChart: function() {
    	var _this = this;
    	var data = [];
    	var target = $("#target_orgChart", _this.getContext()).selector;
    	
    	_this.loadData();
    	
    	if (_this.orgData.length == 0) {
    		_this.toast('', 'Não há dados para gerar o organograma.', 'info');
    	}
    	else {
    		$.each(_this.orgData, function(key, user) {
    			
    			data.push({
        			id: user['metadata#id'],
        			name: user.nome,
        			parent: user.chefe_codigo == '' ? 0 : user.chefe_codigo,
    				cargo: user.cargo,
    				email: user.email,
    				telefone: user.telefone,
    				img: user.perfil
        		});
        	});
        	
            _this.myOrgChart = FLUIGC.orgChart(target, {
            	data: data,
            	template: '.orgChartTemplate'
            });
    	}
    },
    
    getContext: function() {
    	if (!this.context) {
    		this.context = $("#orgchart_" + this.instanceId);
    	}
    	return this.context;
    },
    
    init: function() {
    	if (this.editMode) {
    		// -> do something
    	} else if (this.viewMode) {
    		this.createOrgChart();
    	}
    },
    
    loadData: function() {
    	var _this = this;
    	
    	
    	var constraints = [
            DatasetFactory.createConstraint('metadata#active', true, true, ConstraintType.SHOULD),
            DatasetFactory.createConstraint('org_id', _this.org_id, _this.org_id, ConstraintType.SHOULD)
        ];
    	var order = ['chefe_nome','nome'];
    	var data = (DatasetFactory.getDataset("Verificar_OrgChart", null, constraints, null)).values;
    	
    	this.orgData = data;
    },
    
    save: function() {
    	var $context = this.getContext();
    	var orgId = $('#org_id', $context).val().trim();
    	var orgName = $('#org_name', $context).val().trim();
    	var title = $('#title', $context).val().trim();
    	
    	if (orgId == '' || orgName == '' || title == '') {
    		this.toast('Atenção', 'Todos os campos da widget devem ser preenchidos.', 'warning');
    	} else {
    		var result = WCMSpaceAPI.PageService.UPDATEPREFERENCES({ async:false }, this.instanceId, {
    			org_id: orgId,
    			org_name: orgName,
    			title: title
    		});
    		
    		if (result) {
    			this.toast('', 'Operação realizada com sucesso.', 'success');
    		} else {
    			this.toast('Atenção', 'Não foi possível completar esta operação.', 'danger');
    		}
    	}
    },
    
    toast: function(title, message, type) {
    	FLUIGC.toast({
    		title: title,
    		message: message,
    		type: type
    	});
    },
    
    zoom: function() {
    	this.zoomFormulario('title', 'Verificar_OrgBase', 'org_name,Organograma','documentid,org_name', 'base');
    },
    
    zoomFormulario: function(titulo, dataset, campos, resultFields, type) {
        window.open("/webdesk/zoom.jsp?datasetId="+dataset+"&dataFields="+campos+
        "&resultFields="+resultFields+"&type="+type+"&title="+titulo, "zoom", "status , scrollbars=no ,width=600, height=350 , top=0 , left=0");
    },
});

function setSelectedZoomItem(selectedItem) {
	if (selectedItem.type == 'base') {
		$('#org_name').val(selectedItem.org_name);
		$('#org_id').val(selectedItem.documentid);
	}
}