var ultimaLinha = 0;
var ultimaLinhaProg = 0;
var ultimaLinhaConf = 0;
var UltimaLinhaConcat = 0;
var indexObs = 0;
var myLoading2  = FLUIGC.loading(window);
var carregaProg = FLUIGC.loading("#home");
var carregaConf = FLUIGC.loading("#menu1");





var controle = [];
var ARYForms = {
		params: {},
		initForm: function(params) {    
			this.params = params;
			var $this = this;   
			$(function () {
				if (params.formMode == "ADD" || params.formMode == "MOD") { 
					$this.onEdit(params);
				} else {
					$this.onView(params);
				}
			});
		},
		onView: function(params) { //Visualização do formulário sem a possibilidade de edição (consulta)

				var cod_grupo_revisao = $("#codGrupo").val();

				console.log(cod_grupo_revisao);

				carregaConflitos(cod_grupo_revisao);
				carregaUsuarios(cod_grupo_revisao);


		},
		onEdit: function(params) {  //Edição do formulário

			//reloadZoomFilterValues("removeGrupo", "cod_grupo_remove," + $("#selectProgramaRemove :selected").val());




			setaUltimaLinha();


			$(".aprova").prop("checked", false);
			$("#aprovacaoProg").val('');


			$(".codGrupoDesc").hide();
			$(".addGrupo").hide();
			$(".removeGrupoDesc").hide();

			$("#obsIndex").val("0");

			$("#selectGrupo").on('change',function(){
				console.log($("#selectGrupo").val());
				if($("#selectGrupo").val() == 'cod'){
					$(".codGrupoDesc").hide();
					$(".codGrupo").show();
				}else {
					$(".codGrupoDesc").show();
					$(".codGrupo").hide();
				}
			});

			$("#selectPrograma").on('change',function(){
				if($("#selectPrograma").val() == 'cod'){
					$(".addGrupoCod").show();
					$(".addGrupo").hide();
				} else {
					$(".addGrupoCod").hide();
					$(".addGrupo").show();
				}
			});

			$("#selectProgramaRemove").on('change',function(){
				console.log($("#selectProgramaRemove").val());
				if($("#selectProgramaRemove").val() == 'cod'){
					$(".removeGrupoDesc").hide();
					$(".removeGrupo").show();
				}else {
					$(".removeGrupoDesc").show();
					$(".removeGrupo").hide();
				}
			});



			$("input[name='aprova']").change(
					function(e)
					{           	  
						if ($(this).val() === 'sim') {
							$("#aprovacaoProg").val("sim");
							// alert('sim : '+$("#aprovacaoProg").val());
						} else if ($(this).val() === 'nao') {
							$("#aprovacaoProg").val("nao");
							// alert('nao : '+$("#aprovacaoProg").val());
						}     
					});







			carregaProgramasAll($("#codDoGrupo").val());
			carregaUsuariosAll($("#codDoGrupo").val());
			carregaTela($("#codDoGrupo").val());  


			var numRegistros = $("#tabela_programas3 tr").length - 2;

			// Comentado para retirada de contador da ultima aba
			//$(".numProg").text(numRegistros);



			$("#aprov").click(function(){


				$("#aprov").attr('disabled','disabled');
				$("#aprov").attr('style','border-style: groove; border-width: 3px; border-color: black; padding-botton:1px;');
				$("input[name=aprova][value='sim']").prop("checked",true);
				$("#reprov").removeAttr('disabled');
				$("#aprovacaoProg").val("sim");

				$("#reprov").removeAttr('style');
				// alert("Radio sim: "+$("input[name='aprova']:checked").val());
			});


			$("#reprov").click(function(){


				$("#reprov").attr('disabled','disabled');
				$("#reprov").attr('style','border-style: groove; border-width: 3px; border-color: black; padding-botton:1px;');
				$("input[name=aprova][value='nao']").prop("checked",true);
				$("#aprov").removeAttr('disabled');
				$("#aprov").removeAttr('style');
				$("#aprovacaoProg").val("nao");
				// alert("Radio não: "+$("input[name='aprova']:checked").val());
			});

			$('input[type="text"][id^="nomeGestorModuloTwo___"]').each(function(){
				var contexto = $(this);
				var linha = contexto.attr('id').split('___')[1];
				console.log("---linha---"+linha);
				//console.log("valor hide: "+$("#validaCheck2___"+linha).val());

				$("ZoomNomeGestorModuloTwo___"+linha).addClass("hide");



			});


			var WKNumState = params.WKNumState;

			$('#tabela_programas2 tr').find('img[src="rubbish-bin.png"]').addClass('hide');
			$('#tabela_programas3 tr').find('img[src="rubbish-bin.png"]').addClass('hide');
			$(".checkExclusao").css('display','none');
			$(".checkInclusao").css('display','none');

			$(".aba2Obs").attr('readonly','readonly');
			$(".aba3Obs").attr('readonly','readonly');
			//$(".aba4Obs").attr('readonly','readonly');
			$(".aba5Obs").attr('readonly','readonly');


			var index2 = 0;
			var index3 = 0;
			var index5 = 0;


			// Atividade gestor Usuário - Aprovar
			if (WKNumState == 0 ) {  

				carregaTela($("#codDoGrupo").val());

				$(".btnAprov").hide();
				$("#cont").val('0');


				// Controle de bloqueio de botão na aba 2 após incluir um filho
				$('#btnNovo').removeAttr('disabled');
				$(".aba2Obs").removeAttr('readonly');
                //$(".validaCheck").addClass("hide");

				$('#tabela_programas2 tr').find('img[src="rubbish-bin.png"]').removeClass('hide');
				$('#tabela_programas3 tr').find('img[src="rubbish-bin.png"]').removeClass('hide');

				$(".checkExclusao").css('display','block');
				$(".checkInclusao").css('display','block');

				$('#btnNovo').click(function(){

					if($("#aba2Index").val() != '' || $("#aba2Index").val() != 0){
						$('#btnNovo').attr('disabled','disabled');
					}
				});


				$('#tabelaAba2').arqmasterdetail({
					buttonNewRow: "#btnNovo",
					onCustomizeRow: function($tr, index){

						index2++;
						$("#aba2Index").val(index2);
					}   
				});

				index2 = 0;
				$("#aba2Index").val(index2);


				$('input[type="checkbox"][id^="manterTwo___"]').each(function(){
					var contexto = $(this);
					var linha = contexto.attr('id').split('___')[1];
					// console.log("---linha---"+linha);
					// console.log("valor checkbox: "+$("#manterTwo___"+linha).val());

					if ( $("#manterTwo___"+linha).val() == 'on'){
						$("#validaCheck2___"+linha).val("on");
						//console.log("Entrou no ON : "+$("#validaCheck2___"+linha).val());

					}else{
						$("#validaCheck2___"+linha).val("off");
						// console.log("Entrou no OFF : "+$("#validaCheck2___"+linha).val());
					}

					// Adição de index de tabela pai-filho
					ultimaLinhaProg++;
					//console.log("INDEX ADIÇÃO DE LINHAS : "+ultimaLinhaProg);

				});




				$("#temConflito").change(function(){
					$("#validaConflito").val($("#temConflito"));
				});

			} else {
				$("#selectGrupo").attr('readonly','readonly');
				$("#codGrupo").attr('readonly','readonly');
				$("#selectPrograma").attr('readonly','readonly');
				$("#addGrupo").attr('readonly','readonly');
				$("#selectProgramaRemove").attr('readonly','readonly');
				$("#removeGrupo").attr('readonly','readonly');

				//Esconder campos de exclusão e inclusão em atividades diferentes da inicial
				$(".hideZooms").addClass('hide');
				$("#temConflito").val($("#validaConflito"));


			}   

			if (WKNumState == 4) {


				$(".btnAprov").hide();
				$("#cont").val('0');

				// Controle de bloqueio de botão na aba 2 após incluir um filho
				$('#btnNovo').removeAttr('disabled');
				$(".aba2Obs").removeAttr('readonly');

				$('#tabela_programas2 tr').find('img[src="rubbish-bin.png"]').removeClass('hide');
				$('#tabela_programas3 tr').find('img[src="rubbish-bin.png"]').removeClass('hide');

				$(".checkExclusao").css('display','block');
				$(".checkInclusao").css('display','block');
                

				$('#btnNovo').click(function(){

					if($("#aba2Index").val() != '' || $("#aba2Index").val() != 0){
						$('#btnNovo').attr('disabled','disabled');
					}
				});


				$('#tabelaAba2').arqmasterdetail({
					buttonNewRow: "#btnNovo",
					onCustomizeRow: function($tr, index){

						index2++;
						$("#aba2Index").val(index2);
					}   
				});

				index2 = 0;
				$("#aba2Index").val(index2);


				$('input[type="checkbox"][id^="manterTwo___"]').each(function(){
					var contexto = $(this);
					var linha = contexto.attr('id').split('___')[1];
					// console.log("---linha---"+linha);
					// console.log("valor checkbox: "+$("#manterTwo___"+linha).val());

					if ( $("#manterTwo___"+linha).val() == 'on'){
						$("#validaCheck2___"+linha).val("on");
						//console.log("Entrou no ON : "+$("#validaCheck2___"+linha).val());

					}else{
						$("#validaCheck2___"+linha).val("off");
						// console.log("Entrou no OFF : "+$("#validaCheck2___"+linha).val());
					}

					// Adição de index de tabela pai-filho
					ultimaLinhaProg++;
					//console.log("INDEX ADIÇÃO DE LINHAS : "+ultimaLinhaProg);

				});




				$("#temConflito").change(function(){
					$("#validaConflito").val($("#temConflito"));
				});

                $(".hideZooms").removeClass('hide');

                $("#selectGrupo").removeAttr('readonly');
                $("#codGrupo").removeAttr('readonly');
                $("#selectPrograma").removeAttr('readonly');
                $("#addGrupo").removeAttr('readonly');
                $("#selectProgramaRemove").removeAttr('readonly');
                $("#removeGrupo").removeAttr('readonly');

			} 



			if (WKNumState == 29){


			//var remover  = "ERRO"+linha;
				
				
				
				$(".btnAprov").addClass('hide');
				$(".selectDestino").removeClass('hide');

				$(".tiraStyle").css("margin-left","0%");
				$(".tiraStyle").css("margin-top","0%");
				$("#cont_aprovador").val('');
				$("#cont").val('0');
				$("#recebeCod1").val('');
				$(".zoomGestor").removeClass('hide');
				// $("#cont").val('1');

				$('input[type="text"][id^="nomeGestorModuloTwo___"]').each(function(){
					var contexto = $(this);
					var linha = contexto.attr('id').split('___')[1];
					var aspa = "'";

					console.log("---linha--- Ativ 29 :"+linha);

					$("#nomeGestorModuloTwo___"+linha).addClass('hide');

					if( $("#ZoomNomeGestorModuloTwo___"+linha).val() != ''){

						$("#ZoomNomeGestorModuloTwo___"+linha).attr('readonly','readonly');       
						//$("#ZoomNomeGestorModuloTwo___"+linha).removeClass("hide");
					};

				});    





			}



			// $(".zoomGestor").on('change',function(){ 
			//     $('input[type="text"][id^="nomeGestorModuloTwo___"]').each(function(){
			//         var contexto = $(this);
			//         var linha = contexto.attr('id').split('___')[1];
			//         var aspa = "'";

			//         console.log("---linha--- onChange: "+linha);
			//         //console.log("valor hide: "+$("#validaCheck2___"+linha).val());


			//             arr2.push($("#ZoomCodGestorModuloTwo___"+linha).val());
			//                 //aspa+$("#nomeProgAuxTwo___"+linha).val()+aspa
			//                 //var contador = arr.length;
			//                // console.log(arr2);
			//             console.log("Teste dentro do change");
			//             console.log(arr2);
			//             $("#cont_aprovador").val(arr2);

			//     });
			// });





			// Tarefa Gestor Grupo


			// Tarefa Segurança da Infomação




			//$(':input').prop('disabled', true);
			$('#tipoAcao').prop('disabled', false); 
			$('.selecioneHid').addClass('hide');  

			$('.revisa').removeClass('hide');
			$('#copia').addClass('hide');
			$('.selecioneHid').removeClass('hide');
			$(".allProgramas").addClass('hide'); 



			// ESTOU POR AQUI

			$('#addGrupoUser').click(function(){
				//  setSelectedZoomItem('codGrupo');

				$("#incluirOk").val("Ok");

				var context = $('#addGrupo');
				var contextCod = $('#addGrupoCod');

				if (context.val() != '' || contextCod.val() != ''){
					wdkAddChild('tabela_programas3');
					ultimaLinhaProg = ultimaLinhaProg +1 ;

					$("#nomeProgAuxTwo___"+ultimaLinhaProg).val($('#codProgramaCopiaAux').val());
					$("#descProgAuxTwo___"+ultimaLinhaProg).val($('#nomeProgramaCopiaAux').val());
					$("#codGestorModuloTwo___"+ultimaLinhaProg).val($('#codGestorModuloCopiaAux').val());
					$("#nomeGestorModuloTwo___"+ultimaLinhaProg).val($('#nomeGestorModuloCopiaAux').val());
					$("#codModuloTwo___"+ultimaLinhaProg).val($('#codModuloCopiaAux').val());
					$("#ZoomNomeGestorModuloTwo___"+ultimaLinhaProg).val($("#nomeGestorModuloTwo___"+ultimaLinhaProg).val());

				}

				    concatFirst();


				var cod_grupo_revisao = $("#codDoGrupo").val();

				carregaUsuarios(cod_grupo_revisao);

				var numRegistros = $("#tabela_programas3 tr").length - 2;


				// Comentado para retirada de contador da ultima aba
				//$(".numProg").text(numRegistros);

				$("#recebeContAux").val(numRegistros);


			});




			$('#btnRemoveGrupo').click(function(){
				var context  = $('#removeGrupo');
                var context2 = $("#removeGrupoDesc");    

				if(context.val() != '' || context2.val() != ''){
					$("#retirarOk").val("Ok");
					wdkAddChild('tabela_programas2');
					ultimaLinha = ultimaLinha + 1;

                   var codigo_program = $('#codProgramaRemoveAux').val();
                   var nome_program   = $('#descProgramaRemoveAux').val() ;   


					//console.log($('#removeGrupo').val());
					$("#nomeProgAux___"+ultimaLinha).val(codigo_program);
					$("#descProgAux___"+ultimaLinha).val(nome_program);

				}
			});


			$("#populaCombo").change(function(){
				var context = $(this);

				console.log('context', context.val());
				$('input[id^="moduloPrograma___"]').each(function(){
					var context1 = $(this);
					context1.parent().parent('tr').removeClass('hide');
					if(context.val() != 'Todos'){
						if (context1.val() != context.val() )
							context1.parent().parent('tr').addClass('hide');
					}
				});

			});

		}                           
};


function carregaTela(cod_grupo,cod_grupo_all){



	carregaConflitos(cod_grupo);
	carregaProgramasAll(cod_grupo_all);
	carregaUsuarios(cod_grupo);


}

setTimeout(carregaTela, 0);

function carregaConflitos(cod_grupo_revisao){

	var dadoss2 = '';
	cod_grupo_revisao =  $("#codDoGrupo").val();


	var dados = {"name": "ARY-sql2dataset-programa-conflito-inclusao2","fields":null,"constraints":[
		{"_field":"cod_grupo","_initialValue":cod_grupo_revisao,"_finalValue": cod_grupo_revisao,"_type":1}
		]};
	$.ajax({
		method: "POST",
		url: "/api/public/ecm/dataset/datasets/",
		data: JSON.stringify(dados),
		contentType: "application/json", 
		async: true,
		error: function(x, e) {
			if (x.status == 500) {
				alert("Erro Interno do Servidor: entre em contato com o Administrador.");
			}
		},
		beforeSend: function(){

			carregaConf.show();

		},
		success:function(model) {


			$.each(model.content.values, function(index, value){

				// wdkAddChild('tabela_programas2');

				// ultimaLinha = ultimaLinha + 1;

				var confAux          =   value.APPMAIN;
				var grupoAux         =   value.APPCONFLITO; 
				var progConfAux      =   value.DESCCONFLITO;
				var grupoConfAux     =   value.COD_GRUPO; 
				var descConfAux      =   value.GRUPO_CONFLITO;
				var riscoAux         =   value.APPRISCO;  


				dadoss2 += '<table width="100%" class="table">';
				if(riscoAux == "alto"){
					dadoss2 += '<tr style="background-color:F2DEDE;">';
				}
				if(riscoAux == "medio"){
					dadoss2 += '<tr style="background-color:FCF8E3;">';
				}
				if(riscoAux == "baixo"){
					dadoss2 += '<tr style="background-color:DFF0D8">';
				}

				dadoss2 += '<td style="text-align: center;" class="col-sm-2">' + confAux +      '</td>';     
				dadoss2 += '<td style="text-align: center;" class="col-sm-2">' + grupoConfAux.concat(' - ',$("#nomeGrupo").val()) + '</td>';     
				dadoss2 += '<td style="text-align: center;" class="col-sm-2">' + grupoAux +     '</td>';     
				dadoss2 += '<td style="text-align: center;" class="col-sm-2">' + descConfAux.concat(' - ',$("#nomeGrupo").val()) +  '</td>';     
				dadoss2 += '<td style="text-align: center;" class="col-sm-2">' + progConfAux +  '</td>';     
				dadoss2 += '<td style="text-align: center;" class="col-sm-2">' + riscoAux +     '</td>';
				dadoss2 += '</tr>';

				dadoss2 += '</table>';

				// console.log(dadoss2);

			});
			$(".testeColappse2").html(dadoss2);
			carregaConf.hide();         }

	});

}

/*
function carregaProgramas(cod_grupo){

 if (cod_grupo != ""){  

    var dados = {"name": "ARY-sql2dataset-programas","fields":null,"constraints":[
                      {"_field":"cod_grupo","_initialValue":cod_grupo,"_finalValue": cod_grupo,"_type":1}
               ]};
   $.ajax({
       method: "POST",
       url: "/api/public/ecm/dataset/datasets/",
       data: JSON.stringify(dados),
       contentType: "application/json", 
       async: true,
       error: function(x, e) {
        if (x.status == 500) {
         alert("Erro Interno do Servidor: entre em contato com o Administrador.");
        }
         },
            beforeSend: function(){

            },
         success:function(model) {



            $.each(model.content.values, function(index, value){

                 wdkAddChild('tabela_programas2');

                 ultimaLinha = ultimaLinha + 1;

                var codigo_program = value.COD_PROGRAM;
                var descricao_Program = value.DESCRIPTION_PROGRAM;

                $("#nomeProgAux___"+ultimaLinha).val(codigo_program);
                $("#descProgAux___"+ultimaLinha).val(descricao_Program);

            });




            setaUltimaLinha();

 //           return model;
         }
      });
 }
 }  // Fim da function carregaProgramas
 */


function carregaProgramasAll(cod_grupo_all){

	var cod_grupo_all = $("#codDoGrupo").val()


	if (cod_grupo_all != ""){  

		console.log(cod_grupo_all);

		var dados = {"name": "ARY-sql2dataset-programas","fields":null,"constraints":[
			{"_field":"cod_grupo_all","_initialValue":cod_grupo_all,"_finalValue": cod_grupo_all,"_type":1}
			]};
		$.ajax({
			method: "POST",
			url: "/api/public/ecm/dataset/datasets/",
			data: JSON.stringify(dados),
			contentType: "application/json", 
			async: true,
			error: function(x, e) {
				if (x.status == 500) {
					alert("Erro Interno do Servidor: entre em contato com o Administrador. cod_grupo_all");
				}
			},
			beforeSend: function(){

			},
			success:function(model) {

				var progAll = model.content.values.length;
				console.log(progAll);


				// $("#contaProgramas").text(progAll);


				//           return model;
			}
		});
	}
}

function carregaUsuariosAll(cod_grupo_all){



	if (cod_grupo_all != ""){  

		var dados = {"name": "ARY-sql2dataset-usuario-grupos","fields":null,"constraints":[
			{"_field":"cod_grupo_revisao","_initialValue":cod_grupo_all,"_finalValue": cod_grupo_all,"_type":1}
			]};
		$.ajax({
			method: "POST",
			url: "/api/public/ecm/dataset/datasets/",
			data: JSON.stringify(dados),
			contentType: "application/json", 
			async: true,
			error: function(x, e) {
				if (x.status == 500) {
					alert("Erro Interno do Servidor: entre em contato com o Administrador.");
				}
			},
			beforeSend: function(){

			},
			success:function(model) {

				//var userAll = model.content.values.length;
				//console.log(userAll);


				// $("#contaUser").text(userAll);


				//           return model;
			}
		});
	}
}

function carregaUsuarios(cod_grupo_revisao){

	//alert("chamou a carrega user");


	if (cod_grupo_revisao != ""){ 

		var dadoss = "";    
		var parametros = "";
		var teste = concatenaDesc();
		var cod_progAux = teste;

		console.log("COD_PROGAUX");
		console.log(cod_progAux);


		var dados = {"name": "ARY-sql2dataset-usuario-grupos","fields":null,"constraints":[
			{"_field":"cod_grupo_revisao","_initialValue":cod_grupo_revisao,"_finalValue": cod_grupo_revisao,"_type":1}
			]};



		$.ajax({
			method: "POST",
			url: "/api/public/ecm/dataset/datasets/",
			data: JSON.stringify(dados),
			contentType: "application/json", 
			async: true,
			error: function(x, e) {
				if (x.status == 500) {
					alert("Erro Interno do Servidor: entre em contato com o Administrador.");
				}
			},
			beforeSend: function(){

			},
			success:function(model) {
				// contaUser = model.content.values.length;




				parametros = model.content.values;


				$.each(model.content.values, function(index, value){




					// var cod_progAux = $("#cont_aprovador").val();
					// console.log("codigo do maldito : " , cod_progAux);

					var nomeUsuario          =   value.NOME_USUARIO;
					var nomeGestor           =   value.NOME_GESTOR;
					var codigoUser          =   value.COD_USUARIO;
					var codUserAux =    codigoUser.replace(".","_");
					// alert(codUserAux);


					var dados1 = {"name": "ARY-sql2dataset-programa-conflito-inclusao2","fields":null,"constraints":[
						{"_field":"cod_usuarioAux","_initialValue":codigoUser,"_finalValue": codigoUser,"_type":1},
						{"_field":"cod_progAux","_initialValue":cod_progAux,"_finalValue": cod_progAux,"_type":1}
						]};

					$.ajax({
						method: "POST",
						url: "/api/public/ecm/dataset/datasets/",
						data: JSON.stringify(dados1),
						contentType: "application/json", 
						async: true,
						error: function(x, e) {
							if (x.status == 500) {
								alert("Erro Interno do Servidor: entre em contato com o Administrador.");
							}
						},
						beforeSend: function(){
							myLoading2.show(); 
						},
						success:function(modelo1) {

							var contador = modelo1.content.values.length ;
							// Retirado variável "contador" do ajax abaixo para retirar o contador da aba, exemplo abaixo
							// '<span align="center" class="badge badge-sucess">'+contador+'</span>';


							console.log("tem comConflito Index: "+modelo1.content.values.length);

							var contadorConf = modelo1.content.values.length ;

							if (contadorConf > 0){

								$("#temConflito").val("sim");


							} else {

								$("#temConflito").val("nao");

							}


							dadoss += '<table width="100%" class="table">';
							dadoss += '<tr width="100%">';
							dadoss += '<td align="center">'; 
							dadoss += '';

							dadoss += '<a style="text-decoration: none;" class="collapse-icon up" data-toggle="collapse" data-parent="#accordion" href="#unidade'+ index+'">';
							if (contador < 1) {
								dadoss += '<span align="center" class="badge badge-sucess"></span>';
								dadoss += '<button class="valordoDia form-control" style="width:100%;background-color: rgba(0, 255, 0, 0.3);">';
								dadoss += ''+ nomeUsuario + '</button></a>';
							}
							if (contador > 0) {
								dadoss += '<span align="center" class="badge badge-danger"></span>';    
								dadoss += '<button class="valordoDia form-control" style="width:100%;background-color: rgba(255, 0, 0, 0.3);">';
								dadoss += ''+ nomeUsuario + '</button></a>';
							}

							dadoss += '<div id="unidade'+ index+'" class="panel-collapse collapse">';

							dadoss += '<table class="table table-bordered text-center" id="tt-usuarios" width="100%">';

							dadoss += '<thead>';
							dadoss += '<tr  id="desc" style="background-color: #f0f0f5;" width="100%">';
							dadoss += '<th style="text-align: center;">Gestor   </th></tr>';              
							dadoss += '<tr class="concat" id="concatUser">';     
							dadoss += '<td class="col-sm-12">' + nomeGestor + ' </td></tr>';
							dadoss += '<table width="100%" class="table">';
							dadoss += '<tr>';
							dadoss += '<th class="col-sm-2" style="text-align: center;">Programa conflito   </th>';
							dadoss += '<th class="col-sm-2" style="text-align: center;">Grupo               </th>';
							dadoss += '<th class="col-sm-2" style="text-align: center;">Programa Conflitante</th>';
							dadoss += '<th class="col-sm-2" style="text-align: center;">Grupo Conflitante   </th>';
							dadoss += '<th class="col-sm-2" style="text-align: center;">Descrição conflito  </th>';
							dadoss += '<th class="col-sm-2" style="text-align: center;">Risco               </th></tr></table>';


							$.each(modelo1.content.values, function(index1, value1){   
								var contadorConf = modelo1.content.values.length ;
								// Comentado Linha do contador da primeira ABA
								//$("#contConfli").html(contadorConf);
								//console.log("#### DENTRO DO EACH");
								/*
                    if (contadorConf > 0){

                         $("#temConflito").val("sim");
                         console.log("Tem Conflito");
                         alert("tem Conflito");

                    } else {

                         $("#temConflito").val("nao");
                         console.log("Não Tem Conflito");
                         alert("Não Tem Conflito");
                    }
								 */


								/*          if(tamanhoAux > 0 ){
                    $("#imgConflito").css("visibility","visible");
                } else {
                    $("#imgConflito").css("visibility","hidden");
                }
								 */

								var confAux          =   value1.APPMAIN;
								var grupoAux         =   value1.APPCONFLITO; 
								var progConfAux      =   value1.DESCCONFLITO;
								var grupoConfAux     =   value1.COD_GRUPO; 
								var descConfAux      =   value1.GRUPO_CONFLITO;
								var riscoAux         =   value1.APPRISCO; 
								var descGrupoConfl	 =   value1.DESC_GRUPO;

								// Alteração para ajuste de query
								if (grupoConfAux == 'Grupo Em Alteracao'){

									var tabCodGrupo = $('#codGrupo').val();
									var tabDescGrupo = $('#nomeGrupo').val();

									grupoConfAux = tabCodGrupo.concat(' - ',tabDescGrupo);

								}

								if (descConfAux == 'Grupo Em Alteracao'){

									var tabCodGrupo = $('#codGrupo').val();
									var tabDescGrupo = $('#nomeGrupo').val();

									descConfAux = tabCodGrupo.concat(' - ',tabDescGrupo);


								}else {
									descConfAux = descConfAux.concat(' - ',descGrupoConfl);
								}

								// FIM ajuste de query

								dadoss += '<table width="100%" class="table" >';

								if(riscoAux == "alto"){
									dadoss += '<tr style="background-color:F2DEDE;">';
								}
								if(riscoAux == "medio"){
									dadoss += '<tr style="background-color:FCF8E3;">';
								}
								if(riscoAux == "baixo"){
									dadoss += '<tr style="background-color:DFF0D8">';
								}

								if (confAux == ""){
									$(".valordoDia").css('background-color','red');
								}

								dadoss += '<td style="text-align: center;" class="col-sm-2">' + confAux +      '</td>';     
								dadoss += '<td style="text-align: center;" class="col-sm-2">' + grupoConfAux + '</td>';     
								dadoss += '<td style="text-align: center;" class="col-sm-2">' + grupoAux +     '</td>';     
								dadoss += '<td style="text-align: center;" class="col-sm-2">' + descConfAux +  '</td>';     
								dadoss += '<td style="text-align: center;" class="col-sm-2">' + progConfAux +  '</td>';     
								dadoss += '<td style="text-align: center;" class="col-sm-2">' + riscoAux +     '</td>';
								dadoss += '</tr>';
								dadoss += '</table>';









							}); // Segundo Each

							dadoss += '</table></thead></table></td></tr></table></table></tr></div>';
							$(".testeColappse").html(dadoss);
							myLoading2.hide();          
						} // Segundo Sucess

					}); // Segundo ajax


				}); //primeiro each

			} // Primeiro Sucess

		}); // Primeiro Ajax


	}



}


function setSelectedZoomItem(selectedItem) {     

	var removeGrupo = "removeGrupo"; 
	var arr1 = [];
	console.log(selectedItem);
	if(selectedItem.inputName == 'codGrupo'){  


		//reloadZoomFilterValues("removeGrupo", "cod_grupo_remove," + $("#codGrupo").val());
		//reloadZoomFilterValues("removeGrupoDesc", "desc_grupo_remove," + $("#codGrupo").val());

		// $('input[id^="nomeUsuarioAux___"]').parent().parent('tr').remove(); 
		// $('input[id^="nomeProgAuxTwo___"]').parent().parent('tr').remove(); 
		$('input[id^="nomeProgAux___"]').parent().parent('tr').remove();
		$('input[id^="appConflitoC___"]').parent().parent('tr').remove();         
		$('#nomeGrupo').val(selectedItem['desc_grupo']);
		$('#gestorGrupo').val(selectedItem['NOME_GESTOR']);
		$("#recebeCod").val(selectedItem["GESTOR"]);
		$("#codGest").val(selectedItem["GESTOR"]);

		var cod_grupo = selectedItem['cod_grupo'];
		//carregaScroll();
		$("#codDoGrupo").val(cod_grupo);
		$(".grupoSetado").text(cod_grupo);

		var cod_grupo = $("#codDoGrupo").val();
		var cod_grupo_all = $("#codDoGrupo").val();
		var indiceGrupo = 0;
		var indiceScroll = 0;

		/*
        $("#content").scroll(function(){
            //alert("passa do scroll");      

            indiceScroll = indiceScroll+1;   


    var  idUsuario = $("#codGest").val();

    var dados = {"name": "ARY-sql2dataset-usuario-grupos","fields":null,"constraints":[
                      {"_field":"cod_usuario","_initialValue":idUsuario,"_finalValue": idUsuario,"_type":1}
               ]};
   $.ajax({
       method: "POST",
       url: "/api/public/ecm/dataset/datasets/",
       data: JSON.stringify(dados),
       contentType: "application/json", 
       async: true,
       error: function(x, e) {
        if (x.status == 500) {
         alert("Erro Interno do Servidor: entre em contato com o Administrador.");
        }
         },
            beforeSend: function(){

            },
         success:function(model) {

            if(indiceScroll > 1){
                indiceGrupo = ultimaLinha / model.content.values.length;  
              }
                  var cod_grupo = $("#codDoGrupo").val();


    var dados = {"name": "ARY-sql2dataset-programas","fields":null,"constraints":[
                      {"_field":"cod_grupo","_initialValue":cod_grupo,"_finalValue": cod_grupo,"_type":1},
                      {"_field":"indice","_initialValue":indiceGrupo,"_finalValue": indiceGrupo,"_type":1}
               ]};
   $.ajax({
       method: "POST",
       url: "/api/public/ecm/dataset/datasets/",
       data: JSON.stringify(dados),
       contentType: "application/json", 
       async: true,
       error: function(x, e) {
        if (x.status == 500) {
         alert("Erro Interno do Servidor: entre em contato com o Administrador.");
        }
         },
            beforeSend: function(){


              carregaProg.show(); 

            },
         success:function(modelo2) {
            $.each(modelo2.content.values, function(index1, value1){

                var codPrograma      =   value1.COD_PROGRAM;
                var descricaoProgram =   value1.DESCRIPTION_PROGRAM;                    
                    wdkAddChild('tabela_programas2');
                    ultimaLinha = ultimaLinha + 1;
                    $("#nomeProgAux___"+ultimaLinha).val(codPrograma);
                    $("#descProgAux___"+ultimaLinha).val(descricaoProgram);


            });

            setaUltimaLinha();
            carregaProg.hide(); 


 //           return model;
         }
      });

 //           return model;
         }
      });
            //}    
    }); // Fim do Scroll
		 */    

		carregaTela(cod_grupo,cod_grupo_all); 
		//  carregaProgramas(cod_grupo);
		carregaProgramasAll(cod_grupo_all);
		carregaUsuariosAll(cod_grupo_all);

	} else if(selectedItem.inputName == "codGrupoDesc"){

		$('input[id^="nomeProgAux___"]').parent().parent('tr').remove();
		$('input[id^="appConflitoC___"]').parent().parent('tr').remove();         
		$('#nomeGrupo').val(selectedItem['desc_grupo']);
		$('#gestorGrupo').val(selectedItem['NOME_GESTOR']);
		$("#recebeCod").val(selectedItem["GESTOR"]);
		$("#codGest").val(selectedItem["GESTOR"]);

		var cod_grupo = selectedItem['cod_grupo'];
		//carregaScroll();
		$("#codDoGrupo").val(cod_grupo);
		$(".grupoSetado").text(cod_grupo);

		var cod_grupo = $("#codDoGrupo").val();
		var cod_grupo_all = $("#codDoGrupo").val();
		var indiceGrupo = 0;
		var indiceScroll = 0;

		carregaTela(cod_grupo,cod_grupo_all); 
		//  carregaProgramas(cod_grupo);
		carregaProgramasAll(cod_grupo_all);
		carregaUsuariosAll(cod_grupo_all);


	} else if(selectedItem.inputName == "addGrupo") {

		$("#codProgramaCopiaAux").val(selectedItem['cod_program']);
		$("#nomeProgramaCopiaAux").val(selectedItem['description_program']);
		$("#codGestorModuloCopiaAux").val(selectedItem['COD_GESTOR']);
		$("#nomeGestorModuloCopiaAux").val(selectedItem['NOME_GESTOR']);
		$("#codModuloCopiaAux").val(selectedItem['COD_MODULO']);

		$("#addGrupoCod").val('');

	} else if (selectedItem.inputName == "addGrupoCod"){ 
		//console.log("addGrupoCod");
		console.log(selectedItem);
		$("#codProgramaCopiaAux").val(selectedItem['cod_program']);
		$("#nomeProgramaCopiaAux").val(selectedItem['description_program']);
		$("#codGestorModuloCopiaAux").val(selectedItem['COD_GESTOR']);
		$("#nomeGestorModuloCopiaAux").val(selectedItem['NOME_GESTOR']);
		$("#codModuloCopiaAux").val(selectedItem['COD_MODULO']);

		$("#addGrupo").val('');

	} 
     if(selectedItem.inputName == "removeGrupo" || selectedItem.inputName == "removeGrupoDesc"){

		console.log("------ Atualizando zoom de removeGrupo --------------");
//		reloadZoomFilterValues("removeGrupo", "cod_grupo_remove," + selectedItem["codGrupo"]);

		//console.log("SelectedItem: "+selectedItem['COD_PROGRAM'])
		//console.log(selectedItem);

        var cod_program = selectedItem['cod_program'];
        var nome_program = selectedItem['description_program'];

		$("#codProgramaRemoveAux").val(cod_program);
		$("#descProgramaRemoveAux").val(nome_program);



		console.log("codProgramaRemoveAux: ", $("#codProgramaRemoveAux").val() + "nome programa", $("#descProgramaRemoveAux").val());

	}
//      else if(){

// 		console.log("------ Atualizando zoom de removeGrupoDesc --------------");
// //		reloadZoomFilterValues("removeGrupo", "cod_grupo_remove," + selectedItem["codGrupo"]);

// 		//$("#codProgramaRemoveAux").val(selectedItem['cod_program']);
// 		//$("#descProgramaRemoveAux").val(selectedItem['description_program']);

//         $("#codProgramaRemoveAux").val(selectedItem['COD_PROGRAM']);
//         $("#descProgramaRemoveAux").val(selectedItem['DESCRIPTION_PROGRAM']);;

// 	}



	$('input[type="text"][id^="nomeGestorModuloTwo___"]').each(function(){
		var contexto = $(this);
		var linha = contexto.attr('id').split('___')[1];
		// console.log("---linha---"+linha);

		//console.log("valor hide: "+$("#validaCheck2___"+linha).val());


		if( selectedItem.inputName == "ZoomNomeGestorModuloTwo___"+linha){




			// var arrayTeste = $("#cont_aprovador").val();

			// console.log("CADE O MEU LOG?", arrayTeste);

			// achar function
			


			var nome_gest = selectedItem['nome_usuario'];
			var cod_gest  =  selectedItem['cod_gestor'];



			$("#nomeGestorModuloTwo___"+linha).val(nome_gest);			
			$("#ZoomCodGestorModuloTwo___"+linha).val(cod_gest);
			$("#codGestorModuloTwo___"+linha).val(cod_gest);

//			$("#recebeCod1").val(arr1[0]);





			concatenaGest();

		}




	});  




}

//$(document).on('change', '.codGrupo', function(){		
//var grupo = $('#codGrupo').val();
//console.log("GRUPO: "+grupo);
//reloadZoomFilterValues('removeGrupo', 'cod_grupo_remove,' + grupo );
//});

function carregaTabelaProgramasCopia(campo, valor){
	var c1 = DatasetFactory.createConstraint(campo, valor ,valor ,ConstraintType.MUST);
	var dsProgramas = DatasetFactory.getDataset('ARY-sql2dataset-programas', null, [c1],null);

	if (dsProgramas.values.length > 0){
		for(var i = 0; i < dsProgramas.values.length; i++){
			var j = i + 1;
			wdkAddChild('tabela_programas');
			$("#codProgramaCopia___"+j).val(dsProgramas.values[i]['COD_PROGRAM']);
			$("#nomeProgramaCopia___"+j).val(dsProgramas.values[i]['DESCRIPTION_PROGRAM']);
			$("#descProgramaCopia___"+j).val(dsProgramas.values[i]['OBS_UPC']);         
		}
		validaConflito();
	}
}


function displayConlitos(mostrar){
//	console.log('displayConlitos', mostrar);    
	$('input[id^="codConflito___"]').each(function(){
		var context = $(this);
		if (context.val() == ''){
			var objLinha = context.parent().parent('tr');
			if (!mostrar) {
				objLinha.removeClass('hide');
			} else {
				objLinha.addClass('hide');
			}
		}
	});
}


function setaUltimaLinha(){
	$('input[id^="nomedoseugrupo___"]').each(function(){
		var context = $(this);
		ultimaLinha = parseInt(context.attr('id').split('___')[1]);     
	});

}

function setaUltimaLinhaProg(){
	$('input[id^="descRotina___"]').each(function(){
		var context1 = $(this);
		ultimaLinhaProg = parseInt(context1.attr('id').split('___')[1]);     
	});

}

function setaUltimaLinhaConflitos(){
	$('input[id^="codConflitoC___"]').each(function(){
		var context = $(this);
		ultimaLinhaConf = parseInt(context.attr('id').split('___')[1]);     
	});
}

function setaUltimaLinhaConcat(){
	$('input[id^="gestorHide___"]').each(function(){
		var context = $(this);
		UltimaLinhaConcat = parseInt(context.attr('id').split('___')[1]);     
	});
}

function concatenaDesc(){
	var arr = [] ;
	var arr2 = [] ;

	$('input[id^="descProgAuxTwo___"]').each(function(x){
		var context = $(this);
		var linha = context.attr('id').split("___")[1];
		var aspa = "'";
		arr.push(aspa+$("#nomeProgAuxTwo___"+linha).val()+aspa);  
		var contador = arr.length;

	});



	return arr;

}


function carregaScroll() {

	setaUltimaLinha();

}

function fnCustomDelete(oElement){

	// Chamada a funcao padrao, NAO RETIRAR
	fnWdkRemoveChild(oElement);
	var numRegistros = $("#tabela_programas3 tr").length  - 2;
	$(".numProg").text(numRegistros);

	$("#recebeContAux").val(numRegistros);
	concatenaDesc();

	concatFirst();


	var cod_grupo_revisao = $("#codDoGrupo").val();

	carregaUsuarios(cod_grupo_revisao);

}

function getIDUserResp(idElemento){
	idElemento = idElemento.replace(/[^0-9]/g,'');
	if ($("#NomUserResp___" + idElemento).val() == "" || $("#NomUserResp___" + idElemento).val() == null){
		var UserRespTrick = $("#NomUserResptrick").val();
		$("#NomUserResp___" + idElemento).val(UserRespTrick);
	}
}



function getID(idElemento){
	idElemento = idElemento.replace(/[^0-9]/g,'');
	if ($("#HoraResp___" + idElemento).val() == "" || $("#HoraResp___" + idElemento).val() == null){
		var dataResp = new Date();
		$("#HoraResp___" + idElemento).val(dataResp.toLocaleDateString() + " " + dataResp.toLocaleTimeString());
	}
}

function respbtn(){

	if( indexObs == 0 ){
		wdkAddChild('respoCham');

		indexObs++;
		$("#obsIndex").val("1");
	}

}

function ReadInputArea(){

	$('.respArea').each(function(i){
		if ($(this).val() !="" || $(this).val() == null){
			$(this).attr('readonly', true);
		}
	});
}



function concatenaGest(){

	var arr1 = [] ;




	$('input[id^="descProgAuxTwo___"]').each(function(x){
		var context = $(this);
		var linha = context.attr('id').split("___")[1];

		if($("#ZoomCodGestorModuloTwo___"+linha).val() != ""){

			arr1.push($("#ZoomCodGestorModuloTwo___"+linha).val());          
		}       
	});

	var novaArr =  arr1.filter(function(teste, i) { 

		return arr1.indexOf(teste) == i ;

	}); 


	// var itemtoRemove = ["ERRO1"];

	// novaArr.splice($.inArray(itemtoRemove, novaArr),1);

	// console.log("NOVA ARR: "+ novaArr);

	$("#cont_aprovador").val(novaArr);



}

function concatFirst(){

	var arr1 = [] ;


	$('input[id^="descProgAuxTwo___"]').each(function(x){
		var context = $(this);
		var linha = context.attr('id').split("___")[1];

		if($("#codGestorModuloTwo___"+linha).val() != ""){
			arr1.push($("#codGestorModuloTwo___"+linha).val());  
			var contador = arr1.length;

		} 

	});    

	$('input[id^="descProgAuxTwo___"]').each(function(x){
		var context = $(this);
		var linha = context.attr('id').split("___")[1];

		if($("#codGestorModuloTwo___"+linha).val() == ""){

			arr1.push("ERRO"); 
			var contador = arr1.length;            
		}       
	});

	var novaArr =  arr1.filter(function(teste, i) { 

		return arr1.indexOf(teste) == i ;

	}); 


	$("#cont_aprovador").val(novaArr);


}





