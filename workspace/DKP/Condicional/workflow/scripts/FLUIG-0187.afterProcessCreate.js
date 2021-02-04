function afterProcessCreate(a)
{
	hAPI.setCardValue("cpNumSolicitacao",getValue("WKNumProces")),
	hAPI.setCardValue("cpDtAbertura",dateObjToStr(new Date))
}

function dateObjToStr(dtObj) {

	var d = dtObj.getDate() < 10 ? '0' + dtObj.getDate() : dtObj.getDate(),
	 m = dtObj.getMonth();
  			m = parseFloat(m)+parseFloat(1);
        m = m < 10 ? '0' + m : m;
	return d + '/' + m + '/' + dtObj.getFullYear();
}