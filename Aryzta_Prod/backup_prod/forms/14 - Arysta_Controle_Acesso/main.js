var ultimaLinha = 0;
var carregaConf = FLUIGC.loading("#divProgramas");
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

		},
		onEdit: function(params) {  //Edição do formulário
			
			



			//$(':input').prop('disabled', true);
			$('#tipoAcao').prop('disabled', false); 
			$('.selecioneHid').addClass('hide');  

			$('.revisa').removeClass('hide');
			$('#copia').addClass('hide');
			$('.selecioneHid').removeClass('hide');
			$(".allProgramas").addClass('hide'); 

			$(".semAcesso").hide();
			$(".hideTabela").hide();




			$('#mostraConf').click(function(){
				context = $(this);
				if (context.is(':checked')){
					displayConlitos(true);
				} else {
					displayConlitos(false);
				}
			});

			$('#addPrograma').click(function(){
				var context = $('#allProgramas');
				if (context.val() != ''){
					wdkAddChild('tabela_programas');

					var index = [];

					$('input[id^="codPrograma___"]').each(function(){
						index.push($(this).attr('id').split('___')[1]);
					});

					var linha = index[index.length - 1];

					$("#codPrograma___"+linha).val($('#codProgramaCopiaAux').val());
					$("#nomePrograma___"+linha).val($('#nomeProgramaCopiaAux').val());
					$("#descPrograma___"+linha).val($('#descProgramaCopiaAux').val());
					$('#codProgramaCopiaAux, #nomeProgramaCopiaAux, #descProgramaCopiaAux').val('');
					validaConflito();
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

			$(".aba2Obs").attr('readonly','readonly');
			$(".aba3Obs").attr('readonly','readonly');
			//$(".aba4Obs").attr('readonly','readonly');
			$(".aba5Obs").attr('readonly','readonly');

			concatenaDesc();

			var index2 = 0;
			var index3 = 0;
			var index5 = 0;
			var WKNumState = params.WKNumState;
			
			if(WKNumState != 0 || WKNumState != 5  ){
				
					
				$('.manterGrupo').prop('disabled', true);
				$('#bloquear').prop('disabled', true);
			}
			

			if(WKNumState == 0 || WKNumState == 5  ){
				
				console.log($("#tabela_conflitos tr").length);
				$('.manterGrupo').prop('disabled', false);
				$('#bloquear').prop('disabled', false);
				

				$(".aba2Obs").removeAttr('readonly');

				var indiceScroll = 0;

				carregaProgramas();

				// $("#content").scroll(function(){ 

				// 	indiceScroll = indiceScroll+1;

				// 	carregaProgramas(indiceScroll);
						
					

				// });







				var coduser = $("#idUsuario").val();
				var c4 = DatasetFactory.createConstraint('cod_usuario',coduser,coduser, ConstraintType.MUST);
				var dsConflitos = DatasetFactory.getDataset('ARY-sql2dataset-programa-conflito-inclusao2', null, [c4],null);

				//$("#countConf").html(dsConflitos.values.length);
								
				if(dsConflitos.values.length == '0'){
					$(".semAcesso").show();
					$(".hideTabela").hide();
					$("#temConflito").val("nao");
				}else{
					$(".semAcesso").hide();
					$(".hideTabela").show();
					$("#temConflito").val("sim");
				}

				var linha = 0;
				for(var i=0; i < dsConflitos.values.length; i++){
					linha = i + 1;
					wdkAddChild('tabela_conflitos');
					console.log("ENTROU NO IF "+ linha);
					
					$("#appConflitoC___"+linha).val(dsConflitos.values[i]['APPMAIN']);
					$("#descConflitoC___"+linha).val(dsConflitos.values[i]['APPCONFLITO']);
					$("#descMainC___"+linha).val(dsConflitos.values[i]['DESCCONFLITO']);
					$("#codConflitoC___"+linha).val(dsConflitos.values[i]['COD_GRUPO']);
					$("#grupoConfito___"+linha).val(dsConflitos.values[i]['GRUPO_CONFLITO']);

					if(dsConflitos.values[i]['APPRISCO'] == "alto"){
						$("#farol___"+linha).parent().parent('tr').addClass('danger');
						$("#farol___"+linha).val("Alto");
					}
					if(dsConflitos.values[i]['APPRISCO'] == "medio"){
						$("#farol___"+linha).parent().parent('tr').addClass('warning');
						$("#farol___"+linha).val("Médio");
					}
					if(dsConflitos.values[i]['APPRISCO'] == "baixo"){
						$("#farol___"+linha).parent().parent('tr').addClass('success');
						$("#farol___"+linha).val("Baixo");
					}

				}



				$("#tabela_programas2 tbody tr").each(function(i,tr){
					$("#manterGrupo___"+i).prop("checked","checked");
				});


				var myLoading1 = FLUIGC.loading('#carregaTela');
				// We can show the message of loading
				myLoading1.show();


				$('.mostraMod').hide();    

				$(".chBloqueioDstv").click(function() {         
					var valor = $('input[name="chBloqueioDstv"]').is(':checked');   
					if (valor == true) {                    
						$(".chBloqueio").prop("checked",true);          
					} else {                    
						$(".chBloqueio").attr("checked",false);         
					}           
				}); 

				$('input[id^="chBloqueio___"]').click(function(){
					var context = $(this);
					if (!context.is(':checked')){                   
						context.parent().parent('tr').addClass('warning');
					}else{
						context.parent().parent('tr').removeClass('warning');
					}

				});

				// Controle de bloqueio de botão na aba 2 após incluir um filho
				$('#btnNovo').removeAttr('disabled');
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



			} else{
				$('.selecioneHid').removeClass('hide');
				$('#form').find('input, textarea, button, select').prop('readonly', true);
				//$('#form').find('input, textarea, button, select').prop('disabled', true);

				$('input[id^="codConflito___"]').each(function(){
					var context = $(this);
					if (context.val() != '')
						context.parent().parent('tr').addClass('danger');
				});

				$('input[id^="chBloqueio___"]').each(function(){
					var context = $(this);
					if (!context.is(':checked'))
						context.parent().parent('tr').addClass('warning');
				});
			}     

			// Tarefa Validar Grupo - Gestor Grupos
			if (WKNumState == 9) {

				$('.aba3Obs').removeAttr('readonly');
				$('#btnNovo3').removeAttr('disabled');
				$('.hideTabela').show();
				
				var index =0;
				$("#tabela_conflitos tbody tr").each(function(i){
					index = index+1;
					var farol = $("#farol___"+ index).val();
					
					if(farol == "Médio"){
						
						$("#farol___"+index).parent().parent('tr').addClass('warning');
					}
					if(farol == "Alto"){
						$("#farol___"+index).parent().parent('tr').addClass('danger');
					}
					
					if(farol == "Baixo"){
						$("#farol___"+index).parent().parent('tr').addClass('success');
					}
				});
				
				
				
				$('#btnNovo3').click(function(){
					if($("#aba3Index").val() != '' || $("#aba3Index").val() != 0){
						$('#btnNovo3').attr('disabled','disabled');
					}
				});

				$('#tabelaAba3').arqmasterdetail({
					buttonNewRow: "#btnNovo3",
					onCustomizeRow: function($tr, index){

						index3++;
						$("#aba3Index").val(index3);
					}   
				});

				index3 = 0;
				$("#aba3Index").val(index3);

			}

			// Tarefa Validar acessos - SI
			if (WKNumState == 37) {
				$('.aba5Obs').removeAttr('readonly');
				$('#btnNovo5').removeAttr('disabled');
				$('.hideTabela').show();
				$(".semAcesso").hide();
				
				
				$('#btnNovo5').click(function(){

					if($("#aba5Index").val() != '' || $("#aba5Index").val() != 0){
						$('#btnNovo5').attr('disabled','disabled');
					}
				});

				$('#tabelaAba5').arqmasterdetail({
					buttonNewRow: "#btnNovo5",
					onCustomizeRow: function($tr, index){

						index5++;
						$("#aba5Index").val(index5);
					}   
				});

				index5 = 0;
				$("#aba5Index").val(index5);

				// $('.aba5Obs').removeAttr('disabled');
			}

			if(WKNumState == 36){
				$(".aba2Obs").attr('readonly','readonly');
				$(".aba3Obs").attr('readonly','readonly');
				//$(".aba4Obs").attr('readonly','readonly');
				$(".aba5Obs").attr('readonly','readonly');
				$('#hideTabela').show();
			}

		}                           
};


//INICIO CARREGA TABELA DE  PROGRMAS //
function carregaProgramas(indiceScroll){

	console.log("Entrou na function");

var dadoss2 = "";
var indice = 0;
var indiceGrupo = 0;
var indiceScroll = 0;

var  idUsuario = $("#idUsuario").val();

var c4 = DatasetFactory.createConstraint('cod_usuario', idUsuario ,idUsuario ,ConstraintType.MUST);
var dsGrupo = DatasetFactory.getDataset('ARY-sql2dataset-usuario-grupos', null, [c4],null);

if(indiceScroll > 1){
	indiceGrupo = indice / dsGrupo.values.length;  
}

for(var i=0;i<dsGrupo.values.length;i++){		

var codGrupo = dsGrupo.values[i]['COD_GRUPO'];				

var dados = {"name": "ARY-sql2dataset-programas","fields":null,"constraints":[
		{"_field":"cod_grupo","_initialValue":codGrupo,"_finalValue": codGrupo,"_type":1},
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

		carregaConf.show();

	},
	success:function(model) {


		$.each(model.content.values, function(index, value){

			var moduloProgramas         =   value.DESCRIPTION_MODULO;
			var codProgram         		=   value.COD_PROGRAM; 
			var descProgramas  		    =   value.DESCRIPTION_PROGRAM;
			var obs_upc 		        =   value.OBS_UPC; 

			if (obs_upc == "" || obs_upc == null) {
				obs_upc = "";

			}
			var descRotina  		    =   value.DESCRICAO_ROTINA;

			dadoss2 += '<tr>';
			dadoss2 += '<td class="col-sm-2">' + codGrupo +        '</td>';     
			dadoss2 += '<td class="col-sm-2">' + descRotina +      '</td>';
			dadoss2 += '<td class="col-sm-2">' + codProgram +      '</td>';
			dadoss2 += '<td class="col-sm-2">' + descProgramas +   '</td>'; 
			dadoss2 += '<td class="col-sm-2">' + moduloProgramas + '</td>';          
			dadoss2 += '<td class="col-sm-2">' + obs_upc +         '</td>';     
			dadoss2 += '</tr>';

		});

		$("#divProgramas").html(dadoss2);
		carregaConf.hide();  

	 }

});
}
}
//FIM CARREGA TABELA DE  PROGRMAS //



function setaUltimaLinha(){
	$('input[id^="codPrograma___"]').each(function(){
		var context = $(this);
		ultimaLinha = parseInt(context.attr('id').split('___')[1]);     
	});

}


function concatenaDesc(){

	var arr = [] ;

	$('input[id^="grupoCod___"]').each(function(x){
		var context = $(this);
		var linha = context.attr('id').split("___")[1];
		arr.push($("#gestorHide___" + linha).val());  

		var contador = arr.length;

	});

	$("#cont_aprovador").val(arr);

}


