var viewDragAndDrop = function() {
	$("#zerar_drag_and_drop").hide();
};

var viewMode = function() {
	$(function() {
		var $perfil = $("#perfil");
		
		if ($perfil.val().trim() != "") {
			var $image = $("<img>", {
	        	"src": $perfil.val().trim()
	        }).addClass("img-responsive");
	        $(".drag_and_drop").empty().append($image).removeClass("drag_and_drop");
		}
	});	
};

$(function() {
	var $email = $('#email');
	var $nome = $('#nome');
	var $cargo = $('#cargo');
	var $telefone = $('#telefone');
	var $chefe = $("select#chefe");
	var $alias = $('#useralias');
	
	var zerarDragAndDrop = function() {
		$("#drag_and_drop").addClass("drag_and_drop").empty().append(
			$("<p>", {text:"Arraste a imagem do perfil aqui."})
		);
		$("img").attr("src", "");
		$("#perfil").val("");
	};
	
	$email.blur(function() {
		var login = '';
		var mail = $(this).val().trim();
		var loading = FLUIGC.loading(window);
		loading.show();
		
		var constraints = [DatasetFactory.createConstraint('mail', mail, mail, ConstraintType.MUST)];
		var colleague = (DatasetFactory.getDataset('colleague', null, constraints, null)).values;
		
		if (colleague.length > 0) {				
			$.ajax({
				complete: function() {
					loading.hide();
				},
				success: function(user) {
					if ($nome.val().trim() == '')
						$nome.val(user.name);
					
					if ($cargo.val().trim() == '')
						$cargo.val(user['userData'].UserSpecialization);
					
					if ($telefone.val().trim() == '')
						$telefone.val(user['userData'].UserRamal);
					
					$alias.val(colleague[0].login);
					
					if ($("#perfil").val().trim() == '') {
						// -> image
						zerarDragAndDrop();
						var src_small = '/social/api/rest/social/image/profile/'+ colleague[0].login +'/X_SMALL_PICTURE';
						var src_large = '/social/api/rest/social/image/profile/'+ colleague[0].login +'/LARGE_PICTURE';
				        var $image = $("<img>", {
				        	"src": src_large
				        }).addClass("img-responsive");
				        $(".drag_and_drop").empty().append($image).removeClass("drag_and_drop");
				        $("#perfil").val(src_large);
					}
				},
				type: 'get',
				url: '/api/public/social/user/' + colleague[0].login
			});
		} else {
			loading.hide();
			$alias.val('');
		}
	});
		
	$("#zerar_drag_and_drop").click(function() {
		zerarDragAndDrop();
	});
	
	$('.drag_and_drop').fileDrop(function(fileCollection) {
	    $.each(fileCollection, function(){
	        var base64 = this.data;
	        var $image = $("<img>", {
	        	"src": base64
	        }).addClass("img-responsive");
	        $(".drag_and_drop").empty().append($image).removeClass("drag_and_drop");
	        $("#perfil").val(base64);
	    });
	});
	
	$("#chefe_nome").blur(function() {
		if ($(this).val().trim() == '') {
			$("#chefe_codigo").val('');
			$("#chefe_email").val('');
		}
	});
});

function zoomFormulario(titulo, dataset, campos, resultFields, type){
    window.open("/webdesk/zoom.jsp?datasetId="+dataset+"&dataFields="+campos+
    "&resultFields="+resultFields+"&type="+type+"&title="+titulo, "zoom", "status , scrollbars=no ,width=600, height=350 , top=0 , left=0");
} 

function setSelectedZoomItem(selectedItem) {
	if (selectedItem.type == 'base') {
		$('#org_name').val(selectedItem.org_name);
		$('#org_id').val(selectedItem.documentid);
	} else {
		console.log(selectedItem);
		$("#chefe_nome").val(selectedItem['nome']);
		$("#chefe_codigo").val(selectedItem['documentid']);
		$("#chefe_email").val(selectedItem['email']);
	}
}