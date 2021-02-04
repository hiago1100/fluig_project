/****** 
** Enable customization script to change agreement calculation. 
** Input: 
**	stateId -> Current state, whose agreement percentage is being calculated. 
**	agreementData.get("currentPercentage") -> Current percentage, calculated by the workflow engine
**	agreementData.get("currentDestState") -> Current destination state. Zero, if process won't move
**	agreementData.get("currentDestUsers") -> Current destination users. Empty if process won't move
**/
function calculateAgreement(currentState, agreementData) {
    log.info("CurrentState: "+ currentState);
    log.info("PROXIMA Atividade:" +getValue("WKNextState"));
	log.info("Consenso Atual: " 		 +  agreementData.get("currentPercentage"));
    log.info("Atividade Destino Atual: " +  agreementData.get("currentDestState"));
    log.info("Atividade Atual: "+ getValue("WKNumState"));
    log.info("Usuario Destino Atual: " 	 +  agreementData.get("currentDestUsers"));
    log.info("Aprovadores: " + hAPI.getCardValue("aprovadores"));

    if(getValue("WKNextState") == '47'){
        // ALTERA O CONSENSO
        agreementData.put("currentPercentage", 100);
        agreementData.put("currentDestState", 47);
        agreementData.put("currentDestUsers", "System:Auto");
    }

    if(getValue("WKNumState") == '13' && getValue("WKNextState") == '69'){
        // ALTERA O CONSENSO
        agreementData.put("currentPercentage", 100);
        agreementData.put("currentDestState", 69);
        agreementData.put("currentDestUsers", "System:Auto");
    }
    
    if(getValue("WKNumState") == '30' && getValue("WKNextState") == '65'){
        // ALTERA O CONSENSO
        agreementData.put("currentPercentage", 100);
        agreementData.put("currentDestState", 65);
        agreementData.put("currentDestUsers", "System:Auto");
    }

    if(getValue("WKNumState") == '30' && getValue("WKNextState") == '38'){
        // ALTERA O CONSENSO
        agreementData.put("currentPercentage", 100);
        agreementData.put("currentDestState", 38);
        agreementData.put("currentDestUsers", "System:Auto");
    }
}