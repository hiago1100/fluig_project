/**
 * @name getTokenUAU
 * @description Retorna o token para autenticar os serviços do UAU
 * @return {[string]}               [token ou mensagem de erro]
 */
function getTokenUAU(){
	var client_service = fluigAPI.getAuthorizeClientService();
	var msg_erro;
	var vo;
	var retorno_api = '';
	var http_cod;
	var data = {
		companyId: getValue("WKCompany") + '',
		serviceCode: "UAU_AutenticarUsuarioCorporativo",
		endpoint: "/api/v1.0/Autenticador/AutenticarUsuarioCorporativo",
		method: "post",
		timeoutService: "100",
		params: {
			"login_ad": "Srv_Uau",
			"senha": "U@UQ!W@16",
			"login_uau": "prouau"
		},
		options:
		{
			encoding: "UTF-8",
			mediaType: "application/json"
		},
		headers:
		{
			'X-INTEGRATION-Authorization': "eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..ZDdhitIz4xq6vaNlM5g5WQ.CE2EK4_oz7GJ6kHJYvXsx4id-ogXiTq298jAj_u7ZKzc6HkysDfEhlD-mUVKtSc_k1NUkNEJTBNma5rdSXMHYsqN5-AgDs16QB7yhBG71pDSsZNqea0C9VYwXIwN9RdSBB6YYZM3AIuGd28C39j3DS78tZI02UB_h5eRBVOwLE8.y0vmHmblqDUYhVF88hXZ6A",
			'Content-Type': 'application/json; charset=utf-8'
		}
	}

	vo = client_service.invoke(JSON.stringify(data));
	http_cod = parseInt(vo.getHttpStatusResult());

	if(http_cod == 200){
		//Sucesso na chamada
		retorno_api = vo.getResult();

		return new String(retorno_api.replace('"', ''));
	}
	else{
		//Algum erro ocorreu
		retorno_api = JSON.parse(retorno_api).Descricao;

		return retorno_api;
	}
}
