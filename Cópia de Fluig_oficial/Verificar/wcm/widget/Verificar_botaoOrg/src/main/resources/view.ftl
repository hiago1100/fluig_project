<!DOCTYPE>
<html>
<head>





	<style type="text/css">
		a{
			text-decoration: none;
			text-decoration-color: black;
		}

 


.modalDialog {
    position: fixed;
    font-family: Arial, Helvetica, sans-serif;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 99999;
    opacity:0;
    -webkit-transition: opacity 400ms ease-in;
    -moz-transition: opacity 400ms ease-in;
    transition: opacity 400ms ease-in;
    pointer-events: none;
}
.modalDialog:target {
    opacity:1;
    pointer-events: auto;
}
.modalDialog > div {
    width: 100%;
  	height: 100%;
    position: relative;
  
    border-radius: 10px;
    padding: -1px 5px 13px 20px;   
    
}
.close {
     background: #C0C0C0;
    color: #FFFFFF;
    line-height: 25px;
    position: absolute;
    right: -5px;
    text-align: center;
    top: 15px;
    width: 24px;
    
    text-decoration: none;
    font-weight: bold;
    -webkit-border-radius: 12px;
    -moz-border-radius: 12px;
    border-radius: 12px;
    -moz-box-shadow: 1px 1px 3px #000;
    -webkit-box-shadow: 1px 1px 3px #000;
    box-shadow: 1px 1px 3px #000;
}
.close:hover {
    background: #808080;

}

.centralDeBotoesDediq{
padding-bottom:2%;
}


.centralDeBotoesDediq img{
	cursor:pointer;
	position:relative;
   }
   
   .centralDeBotoesDediq img:hover{
	 -moz-transform: scale(1.2);
	 -webkit-transform: scale(1.2);
	 -o-transform: scale(1.2);
   }

</style>

</head>

<body >

<div class="centralDeBotoesDediq" align="center"  style="padding-bottom:2%;">
<div class="fluig-style-guide">
<div class="panel panel-default">
      <div class="panel-heading" align="center">

<h4 align="center">Organograma  </h4>
</div></div></div>

<table align="center" >
<tr id="mostra" onClick="mostraDiv()">
			
		<td align="center" style="cursor: pointer;">
		<a href="#openModal">
			<img src="http://viaportal.com.br/volume/stream/Rmx1aWc=/P3Q9MSZ2b2w9RGVmYXVsdCZpZD03NDY5NiZ2ZXI9MTAwMCZmaWxlPWNvbm5lY3Rpb24ucG5nJmNyYz0xNzcyMDU5MTU5JnNpemU9MC4wMDE4ODM1MSZ1SWQ9MzI4JmZTSWQ9MSZ1U0lkPTE=.png"></a>
			
		</td>
		
	</tr>

<div id="openModal" class="modalDialog">
    <div> <a href="#close" title="Close" class="close">X</a>

    <!-- Tamanho da modal -->
<div id="testeDiv">
    <!-- Tamanho da modal -->


<iframe width="100%" height="850" src="http://viaportal.com.br/portal/p/1/Verificar_Org"></iframe>



</table>
</div>

</body>
</html>