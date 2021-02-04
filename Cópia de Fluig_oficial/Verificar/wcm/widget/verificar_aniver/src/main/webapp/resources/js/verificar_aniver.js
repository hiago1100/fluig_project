var verificar_aniver = SuperWidget.extend({
    
    init: function () {

    	var listaAniversariantes = verificar_aniver.carregarListaGED();

    	if(listaAniversariantes == ""){
    		listaAniversariantes = "<h3>Nenhum Aniversáriante este mês</h3>";
    	}
    	$("#tbl_aniversariantes tbody").html(listaAniversariantes);
    },

    carregarListaGED: function(){
    	
    	var idPastaMae = 132497;
       	var tblAniversariantes = "";
       	
  		$.ajax({
      		method: "GET",
      		url: WCMAPI.getServerURL() +"/api/public/ecm/document/listDocumentWithChildren/"+idPastaMae,
      		contentType: "application/json", 
      		async: false,
      		error: function(x, e) {
      			if (x.status == 500) {
      				alert("Erro Interno do Servidor: entre em contato com o Administrador.");
      			}
      	   },
      	   success:function(model) {      
      		   var dadosarray = "";
      		   var imagem = "";
      		   var nome = "";
      		   var dtnasc = "";
      		   var cargo = "";
      		   var mes = new Date().getMonth()+1;
      		   var dia = new Date().getDate();
      		   var dados = [];
      		   $.each(model.content[0].children, function(index, value){
      			   dadosarray = value.description.split(";");
     			   dtnasc = dadosarray[0];
      			   diaDoMes = dtnasc.split("-")[0];
      			  // alert(diaDoMes);
      			   diaDoMes = diaDoMes.trim();
      			   diaDoMes = parseInt(diaDoMes);
      			   dados[diaDoMes] = value;
      			 dados.sort();
      		   });
      		   
      		   $.each(dados, function(index, value){     			   
      			   dadosarray = value.description.split(";");
      			   imagem = value.id;
      			   nome = dadosarray[1];
      			   dtnasc = dadosarray[0];
      			   cargo = dadosarray[2];
      			   diaDoMes = dtnasc.split("-")[0];
      			      			   
      			   if (dtnasc.split("-")[1] == mes){

      				   if (dtnasc.split("-")[0] == dia) {
          					
          					tblAniversariantes += '<tr>';
          					tblAniversariantes += '<td>';
          					tblAniversariantes += '<img class="img-thumbnail" style="width: 70px;border-radius: 55px;" src="'+ verificar_aniver.gerarLinkImagem(imagem) +'">';
          					tblAniversariantes += '</td>';
          					tblAniversariantes += '<td>';
          					tblAniversariantes += 'Hoje é Aniversário de ';
          					tblAniversariantes += '</td>';
          					tblAniversariantes += '<td><strong>'+ nome +'</strong></td>';        					
          					tblAniversariantes += '<td>';
          					tblAniversariantes += '</td>';
          					tblAniversariantes += '</tr>'; 		
          					
          				} else if (dtnasc.split("-")[0] >= dia){
          					
          					tblAniversariantes += '<tr >';
          					tblAniversariantes += '<td>';
          					tblAniversariantes += '<img class="img-thumbnail" style="width: 70px;border-radius: 55px;" src="'+ verificar_aniver.gerarLinkImagem(imagem) +'">';
          					tblAniversariantes += '</td>';
          					tblAniversariantes += '<td>'+ nome +'</td>';
          					tblAniversariantes += '<td>'+ diaDoMes +'</td>';
          					tblAniversariantes += '<td>'+ cargo +'</td>';
          					tblAniversariantes += '</tr>'; 	      					      					
          				}   
      			   }
      		   });
      	   }
      	});
  		return tblAniversariantes;
  		
    	
    },
    
    
    
    gerarLinkImagem: function(idImagem){
    	var link = "";
    	
  		$.ajax({
      		method: "GET",
      		url: WCMAPI.getServerURL() +"/api/public/ecm/document/downloadURL/"+idImagem,
      		contentType: "application/json", 
      		async: false,
      		error: function(x, e) {
      			if (x.status == 500) {
      				alert("Erro Interno do Servidor: entre em contato com o Administrador.");
      			}
      	   },
      	   success:function(model) {      
      		   link = model.content;
      	   }
      	});
  		return link;
    },
    
    bindings: {
        local: {}
    },
    
    

});

