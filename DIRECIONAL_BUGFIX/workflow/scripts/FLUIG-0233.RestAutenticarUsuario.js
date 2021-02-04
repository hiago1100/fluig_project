function AutenticarUsuarioCorporativo(cpCampoStatus) {
	var clientService = fluigAPI.getAuthorizeClientService();
	var data =
	{
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

	var vo = clientService.invoke(JSON.stringify(data));
	
	if (vo.getResult() == null || vo.getResult().isEmpty()) {
		hAPI.setCardValue(cpCampoStatus, 'ERRO')
		throw new Exception("Retorno está vazio");
	} else if (vo.getHttpStatusResult() != 200) {
		hAPI.setCardValue(cpCampoStatus, 'ERRO')
		var msgErro = vo.getDescription() + ' - ' + (vo.getResult().substring(vo.getResult().indexOf('Exception'), vo.getResult().indexOf("\r\n\tat")));
		throw (new Error(msgErro));
	}
	else {
        return vo.getResult()               
	}
}

									